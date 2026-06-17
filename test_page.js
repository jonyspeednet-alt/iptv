const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const failedResources = [];
  const consoleErrors = [];
  page.on('console', msg => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
  page.on('pageerror', err => consoleErrors.push(err.message));
  page.on('response', resp => { if (resp.status() >= 400) failedResources.push(resp.url() + ' => ' + resp.status()); });
  await page.goto('https://jonyspeednet-alt.github.io/iptv/', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(5000);
  console.log('=== FAILED RESOURCES ===');
  failedResources.forEach(e => console.log(e));
  console.log('=== CONSOLE ERRORS ===');
  consoleErrors.forEach(e => console.log(e));
  const hasNoChannels = await page.evaluate(() => document.body.innerText.includes('No channels found'));
  const channelButtons = await page.evaluate(() => {
    const buttons = document.querySelectorAll('button');
    let visible = 0;
    buttons.forEach(b => {
      if (b.offsetParent !== null || (b.getBoundingClientRect().width > 0 && b.getBoundingClientRect().height > 0)) {
        visible++;
      }
    });
    return { total: buttons.length, visible };
  });
  console.log('=== CHANNELS:', JSON.stringify(channelButtons), '===')
  console.log('=== SHOWING NO CHANNELS FOUND:', hasNoChannels, '===');
  // Count list items (channels are rendered as list items)
  const items = await page.evaluate(() => {
    return document.querySelectorAll('li, [role="listitem"], .channel-item, [class*="channel"]').length;
  });
  console.log('=== LIST ITEMS:', items, '===');
  await browser.close();
})();
