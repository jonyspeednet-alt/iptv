const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const failedResources = [];
  const consoleErrors = [];
  page.on('console', msg => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
  page.on('pageerror', err => consoleErrors.push(err.message));
  page.on('response', resp => { if (resp.status() >= 400) failedResources.push(resp.url().substring(0,100) + ' => ' + resp.status()); });
  await page.goto('https://jonyspeednet-alt.github.io/iptv/', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(5000);
  console.log('=== FAILED RESOURCES (' + failedResources.length + ') ===');
  failedResources.forEach(e => console.log(e));
  console.log('=== CONSOLE ERRORS ===');
  consoleErrors.forEach(e => console.log(e));
  const hasNoChannels = await page.evaluate(() => document.body.innerText.includes('No channels found'));
  const visibleButtons = await page.evaluate(() => {
    const buttons = document.querySelectorAll('button');
    let visible = 0;
    buttons.forEach(b => { if (b.offsetParent !== null) visible++; });
    return visible;
  });
  console.log('=== VISIBLE BUTTONS:', visibleButtons, '===');
  console.log('=== NO CHANNELS FOUND:', hasNoChannels, '===');
  // Check channel names visible
  const channelNames = await page.evaluate(() => {
    const btns = document.querySelectorAll('button');
    const names = [];
    btns.forEach(b => { const t = b.textContent.trim(); if (t && t.length > 2 && t.length < 30) names.push(t); });
    return names.slice(0, 15);
  });
  console.log('=== FIRST 15 CHANNEL NAMES:', channelNames, '===');
  await browser.close();
})();
