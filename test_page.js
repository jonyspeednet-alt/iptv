const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const errors = [];
  const failedResources = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', err => errors.push(err.message));
  page.on('response', resp => {
    if (resp.status() >= 400) failedResources.push(resp.url() + ' => HTTP ' + resp.status());
  });
  await page.goto('https://jonyspeednet-alt.github.io/iptv/', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(5000);
  console.log('=== FAILED RESOURCES ===');
  failedResources.forEach(e => console.log(e));
  console.log('=== CONSOLE ERRORS ===');
  errors.forEach(e => console.log(e));
  const visibleChannels = await page.evaluate(() => {
    const buttons = document.querySelectorAll('button');
    let count = 0;
    buttons.forEach(b => {
      const spans = b.querySelectorAll('span');
      spans.forEach(s => {
        if (/^\d+$/.test(s.textContent.trim()) && parseInt(s.textContent.trim()) > 0 && parseInt(s.textContent.trim()) < 100) {
          count++;
        }
      });
    });
    return count;
  });
  console.log('=== VISIBLE CHANNEL COUNT:', visibleChannels, '===');
  const hasNoChannels = await page.evaluate(() => document.body.innerText.includes('No channels found'));
  console.log('=== SHOWING NO CHANNELS FOUND:', hasNoChannels, '===');
  await browser.close();
})();
