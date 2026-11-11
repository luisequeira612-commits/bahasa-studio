'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const { test } = require('node:test');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..');

function startServer() {
  const server = http.createServer((req, res) => {
    const pathname = new URL(req.url, 'http://127.0.0.1').pathname;
    const requested = pathname === '/' ? 'index.html' : decodeURIComponent(pathname.slice(1));
    const filename = path.resolve(root, requested);
    if (!filename.startsWith(root + path.sep)) return res.writeHead(403).end();
    fs.readFile(filename, (err, content) => {
      if (err) return res.writeHead(404).end();
      const ext = path.extname(filename);
      const types = { '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.json':'application/json; charset=utf-8', '.css':'text/css; charset=utf-8', '.svg':'image/svg+xml' };
      res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream' });
      res.end(content);
    });
  });
  return new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => resolve({ server, url: 'http://127.0.0.1:' + server.address().port + '/' }));
  });
}

test('phase 5B learning screen is compact, blue and preserves all level/tool entry points', async () => {
  const { server, url } = await startServer();
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 360, height: 740 }, serviceWorkers: 'block', reducedMotion: 'reduce' });
  const page = await context.newPage();

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => typeof App !== 'undefined' && typeof DB !== 'undefined' && DB.db);
    await page.waitForSelector('.learning-unit-node.node-current');

    assert.equal(await page.locator('#learningLevelSelector').count(), 0, 'legacy level selector should be removed from the compact Phase 5B DOM');
    assert.equal(await page.locator('.learning-tools-row').count(), 0, 'legacy tools row should be removed from the compact Phase 5B DOM');
    assert.equal(await page.locator('.level-progress-trigger').getAttribute('aria-haspopup'), 'dialog');
    assert.ok((await page.locator('.level-progress-trigger').boundingBox()).height >= 44);
    const toolTriggers = page.locator('.unit-tools-trigger');
    assert.equal(await toolTriggers.count(), await page.locator('.unit-path-section-banner').count(), 'each section banner should expose its own tools trigger');
    for (const trigger of await toolTriggers.all()) assert.ok((await trigger.boundingBox()).height >= 44);

    const banner = page.locator('.unit-path-section-banner').first();
    const current = page.locator('.learning-unit-node.node-current').first();
    const before = await current.boundingBox();
    const bannerBox = await banner.boundingBox();
    console.log('[phase5B 360x740] first current node y=' + before.y.toFixed(1) + 'px (' + (before.y / 740 * 100).toFixed(1) + '% viewport height); banner=' + bannerBox.height.toFixed(1) + 'px');
    assert.ok(before.y < 0.35 * 740, 'first current node should begin above 35% of viewport: ' + before.y);
    assert.ok(bannerBox.height <= 72, 'section banner must stay within 72px');

    const levelRows = page.locator('.learning-level-sheet-row');
    await page.locator('.level-progress-trigger').click();
    await page.waitForSelector('#learningLevelSheetOverlay:not([hidden])');
    const levelSheet = page.locator('#learningLevelSheet');
    const levelClose = levelSheet.locator('.learning-sheet-close');
    const levelSheetBox = await levelSheet.boundingBox();
    const levelCloseBox = await levelClose.boundingBox();
    const chipBox = await page.locator('#learningLevelTrigger').boundingBox();
    const levelBannerBox = await page.locator('.unit-path-section-banner').first().boundingBox();
    assert.ok(levelCloseBox.width >= 44 && levelCloseBox.height >= 44, 'level-sheet close target must be at least 44×44px');
    assert.ok(levelCloseBox.x >= levelSheetBox.x && levelCloseBox.y >= levelSheetBox.y && levelCloseBox.x + levelCloseBox.width <= levelSheetBox.x + levelSheetBox.width && levelCloseBox.y + levelCloseBox.height <= levelSheetBox.y + levelSheetBox.height, 'level-sheet close button must stay inside the sheet');
    assert.ok(levelSheetBox.y > Math.max(chipBox.y + chipBox.height, levelBannerBox.y + levelBannerBox.height), 'level sheet must not cover the topbar chip or section banner');
    const safeBottom = await levelSheet.evaluate(el => ({ padding:parseFloat(getComputedStyle(el).paddingBottom), bottom:el.getBoundingClientRect().bottom }));
    const lastLevelRowBox = await levelRows.nth(3).boundingBox();
    assert.ok(safeBottom.padding >= 22, 'level sheet must retain bottom breathing room');
    assert.ok(safeBottom.bottom - (lastLevelRowBox.y + lastLevelRowBox.height) >= safeBottom.padding - 1, 'last level row must remain above safe bottom padding');
    const progressLabels = await Promise.all([0,1,2,3].map(i => levelRows.nth(i).locator('small').innerText()));
    assert.deepEqual(progressLabels, ['0 de 32 unidades', '0 de 40 unidades', '0 de 50 unidades', 'En desarrollo']);
    assert.equal(await levelRows.count(), 4);
    const languageBadge = page.locator('#learningLevelLanguageLabel');
    assert.equal(await languageBadge.innerText(), 'Indonesio');
    assert.equal(await languageBadge.getAttribute('aria-label'), 'Idioma: Indonesio');
    assert.equal(await languageBadge.evaluate(el => el.tagName), 'SPAN', 'the language label must be informational, not a control');
    assert.equal(await languageBadge.getAttribute('role'), null);
    assert.equal(await languageBadge.getAttribute('tabindex'), null);
    const labelLayout = await page.evaluate(() => {
      const heading = document.getElementById('learningLevelSheetTitle').getBoundingClientRect();
      const title = document.createRange();
      title.selectNodeContents(document.getElementById('learningLevelSheetTitle').firstChild);
      const titleBox = title.getBoundingClientRect();
      const badge = document.getElementById('learningLevelLanguageLabel').getBoundingClientRect();
      const close = document.querySelector('#learningLevelSheet .learning-sheet-close').getBoundingClientRect();
      const style = getComputedStyle(document.getElementById('learningLevelLanguageLabel'));
      return {
        heading: { x:heading.x, y:heading.y, width:heading.width, right:heading.right },
        title: { x:titleBox.x, y:titleBox.y, right:titleBox.right },
        badge: { x:badge.x, y:badge.y, right:badge.right, height:badge.height },
        close: { x:close.x, y:close.y, right:close.right },
        background: style.backgroundColor, color: style.color, border: style.borderWidth,
        shadow: style.boxShadow, radius: style.borderRadius
      };
    });
    const contrast = (foreground, background) => {
      const luminance = value => {
        const channels = value.match(/[\d.]+/g).slice(0,3).map(Number).map(channel => {
          const normalized = channel / 255;
          return normalized <= .04045 ? normalized / 12.92 : ((normalized + .055) / 1.055) ** 2.4;
        });
        return .2126 * channels[0] + .7152 * channels[1] + .0722 * channels[2];
      };
      const values = [luminance(foreground), luminance(background)].sort((a,b) => b-a);
      return (values[0] + .05) / (values[1] + .05);
    };
    const labelContrast = contrast(labelLayout.color, labelLayout.background);
    console.log('[phase5B language label 360x740] ' + JSON.stringify({ ...labelLayout, contrast:labelContrast.toFixed(2) + ':1' }));
    assert.equal(labelLayout.background, 'rgb(244, 245, 247)');
    assert.equal(labelLayout.color, 'rgb(91, 100, 114)');
    assert.equal(labelLayout.border, '0px');
    assert.equal(labelLayout.shadow, 'none');
    assert.ok(labelContrast >= 4.5, 'language label text contrast must be at least 4.5:1');
    assert.ok(labelLayout.badge.x >= labelLayout.title.right + 7, 'badge must not collide with title text');
    assert.ok(labelLayout.badge.right <= labelLayout.close.x - 2, 'badge must not collide with close button');
    assert.ok(Math.abs(labelLayout.badge.y - labelLayout.title.y) < 8, 'badge should share the title line at 360px');
    console.log('[phase5B 360x740] levels: ' + JSON.stringify(await levelRows.allInnerTexts()));
    for (let i = 0; i < 4; i++) assert.ok((await levelRows.nth(i).boundingBox()).height >= 44);
    assert.ok((await page.locator('.learning-level-sheet-row.selected').count()) === 1);
    const a2Progress = await page.locator('.learning-level-sheet-row').nth(1).locator('small').innerText();
    assert.match(a2Progress, /^\d+ de 40 unidades$/);
    await page.locator('.learning-level-sheet-row').nth(1).click();
    await page.waitForFunction(() => document.getElementById('learningLevelSheetOverlay').hidden);
    await page.waitForSelector('.learning-unit-node');
    assert.equal(await page.locator('#levelProgressLevel').innerText(), 'A2', 'the compact selector should switch the selected level to A2');

    await page.locator('.unit-tools-trigger').first().click();
    await page.waitForSelector('#learningToolsSheetOverlay:not([hidden])');
    const toolsSheet = page.locator('#learningToolsSheet');
    const toolsClose = toolsSheet.locator('.learning-sheet-close');
    const toolsSheetBox = await toolsSheet.boundingBox();
    const toolsCloseBox = await toolsClose.boundingBox();
    const toolsBannerBox = await page.locator('.unit-path-section-banner').first().boundingBox();
    assert.ok(toolsCloseBox.width >= 44 && toolsCloseBox.height >= 44, 'tools-sheet close target must be at least 44×44px');
    assert.ok(toolsCloseBox.x >= toolsSheetBox.x && toolsCloseBox.y >= toolsSheetBox.y && toolsCloseBox.x + toolsCloseBox.width <= toolsSheetBox.x + toolsSheetBox.width && toolsCloseBox.y + toolsCloseBox.height <= toolsSheetBox.y + toolsSheetBox.height, 'tools-sheet close button must stay inside the sheet');
    assert.ok(toolsSheetBox.y > Math.max(chipBox.y + chipBox.height, toolsBannerBox.y + toolsBannerBox.height), 'tools sheet must not cover the topbar chip or section banner');
    assert.equal(await page.locator('.learning-tool-sheet-row').count(), 3);
    console.log('[phase5B 360x740] tools: ' + JSON.stringify(await page.locator('.learning-tool-sheet-row strong').allInnerTexts()));
    for (const row of await page.locator('.learning-tool-sheet-row').all()) assert.ok((await row.boundingBox()).height >= 44);
    await page.locator('.learning-tool-sheet-row').nth(1).click();
    await page.waitForFunction(() => document.getElementById('learningToolsSheetOverlay').hidden);
    await page.waitForFunction(() => document.getElementById('writingPracticeDrawer').open);
    assert.equal(await page.locator('#writingPracticeDrawer').evaluate(el => el.open), true);
    await page.locator('#writingPracticeDrawer').evaluate(el => el.open = false);

    const colors = await page.evaluate(() => {
      App.selectedLearningLevel = 'A1';
      App.renderCourseRoute();
      return {
      brand: getComputedStyle(document.documentElement).getPropertyValue('--brand-red').trim(),
      current: getComputedStyle(document.querySelector('.learning-unit-node.node-current')).backgroundColor,
      completed: (() => {
        const node = document.createElement('div');
        node.className = 'learning-unit-node node-completed';
        document.body.appendChild(node);
        const color = getComputedStyle(node).backgroundColor;
        node.remove();
        return color;
      })(),
      banner: getComputedStyle(document.querySelector('.unit-path-section-banner')).backgroundColor,
      lessonProgress: getComputedStyle(document.querySelector('#view-lesson .progress-fill')).backgroundColor
      };
    });
    assert.equal(colors.brand, '#0067C6');
    assert.ok(colors.current.includes('0, 103, 198'));
    assert.ok(colors.completed.includes('0, 78, 154'));
    assert.ok(colors.banner.includes('0, 78, 154'));

    const speakerCount = await page.locator('.lesson-speaker-icon').count();
    assert.ok(speakerCount >= 2, 'lesson speaker controls should use inline SVG icons');
    assert.equal(await page.locator('text=🔊').count(), 0);
    assert.equal(await page.locator('.nav-btn.active').getAttribute('data-nav-group'), 'learn');
    for (const group of ['learn','review','tutor','profile']) {
      const button = page.locator('.nav-btn[data-nav-group="' + group + '"]');
      await button.click();
      assert.equal(await button.evaluate(el => el.classList.contains('active')), true);
      const activeIcon = button.locator('svg');
      const activeStyle = await activeIcon.evaluate(el => ({ background:getComputedStyle(el).backgroundColor, fill:getComputedStyle(el).fill, stroke:getComputedStyle(el).stroke, color:getComputedStyle(el).color }));
      assert.equal(activeStyle.background, 'rgba(0, 0, 0, 0)', group + ' active icon must not have its own background');
      assert.equal(activeStyle.fill, 'none', group + ' active icon must remain outline-only');
      assert.equal(activeStyle.stroke, 'rgb(0, 74, 145)');
      for (const nav of await page.locator('.nav-btn:not(.active)').all()) {
        const inactiveBackground = await nav.locator('svg').evaluate(el => getComputedStyle(el).backgroundColor);
        assert.equal(inactiveBackground, 'rgba(0, 0, 0, 0)', 'inactive icons must not have their own background');
      }
    }
    await page.locator('.nav-btn[data-nav-group="learn"]').click();
    const compactTopbar = await page.evaluate(() => ({
      right: document.querySelector('.app-topbar').getBoundingClientRect().right,
      logoRight: document.querySelector('.app-topbar .logo').getBoundingClientRect().right,
      leftPadding: document.querySelector('.app-topbar .logo').getBoundingClientRect().left - document.querySelector('.app-topbar').getBoundingClientRect().left,
      trigger: (() => { const r=document.querySelector('#learningLevelTrigger').getBoundingClientRect(); return {left:r.left,right:r.right,width:r.width,height:r.height}; })(),
      streak: document.getElementById('studyStreakText').textContent,
      xp: document.getElementById('studyDailyXpText').textContent,
      ariaStreak: document.querySelector('.topbar-streak').getAttribute('aria-label'),
      ariaXp: document.querySelector('.topbar-xp').getAttribute('aria-label'),
      levelChevron: getComputedStyle(document.querySelector('.level-progress-chevron')).display,
      levelBorder: getComputedStyle(document.querySelector('#learningLevelTrigger')).borderTopWidth,
      levelBorderColor: getComputedStyle(document.querySelector('#learningLevelTrigger')).borderTopColor,
      ringTrack: getComputedStyle(document.querySelector('#levelProgressRing')).backgroundImage
    }));
    assert.equal(compactTopbar.streak, '0');
    assert.equal(compactTopbar.xp, '0/30 XP');
    assert.equal(compactTopbar.levelChevron, 'block');
    assert.ok(compactTopbar.trigger.height >= 44);
    assert.ok(compactTopbar.logoRight <= compactTopbar.trigger.left, 'Guardi brand must fit beside the level chip at 360px');
    assert.equal(compactTopbar.levelBorderColor, 'rgb(138, 148, 163)', 'chip border must reach at least 3:1 against white');
    assert.ok(compactTopbar.ringTrack.includes('138, 148, 163'), 'progress ring track must reach at least 3:1 against white');
    assert.ok(compactTopbar.trigger.right <= 346, 'level chip must keep 14px right margin: ' + compactTopbar.trigger.right);
    assert.equal(compactTopbar.ariaStreak, 'Racha actual: 0 días');
    assert.equal(compactTopbar.ariaXp, 'XP de hoy frente a tu meta: Meta: 0/30 XP');
    await page.evaluate(() => App.addXp(10));
    await page.waitForFunction(async () => {
      const activity = await DB.get('settings', 'studyActivity');
      return activity && activity.todayXp === 10 && activity.currentStreak === 1;
    });
    assert.equal(await page.locator('#studyStreakText').innerText(), '1');
    assert.equal(await page.locator('#studyDailyXpText').innerText(), '10/30 XP');
    assert.equal(await page.locator('.topbar-streak').getAttribute('aria-label'), 'Racha actual: 1 día');
    assert.equal(await page.locator('.topbar-xp').getAttribute('aria-label'), 'XP de hoy frente a tu meta: Meta: 10/30 XP');
    const brandFit = await page.evaluate(() => {
      const logo = document.querySelector('.app-topbar .logo span');
      logo.textContent = 'Guardi';
      const chip = document.querySelector('#learningLevelTrigger').getBoundingClientRect();
      const logoBox = document.querySelector('.app-topbar .logo').getBoundingClientRect();
      const rightEdge = document.querySelector('.app-topbar').getBoundingClientRect().right;
      const leftEdge = document.querySelector('.app-topbar').getBoundingClientRect().left;
      return { logoRight:logoBox.right, chipLeft:chip.left, chipRight:chip.right, rightMargin:rightEdge-chip.right, leftMargin:logoBox.left-leftEdge };
    });
    assert.ok(brandFit.logoRight <= brandFit.chipLeft, 'Guardi brand and level chip must not overlap at 360px');
    assert.ok(Math.abs(brandFit.rightMargin - 14) <= 1, 'right margin must match 14px logo margin: ' + brandFit.rightMargin);
    assert.ok(Math.abs(brandFit.leftMargin - 14) <= 1);
    assert.equal(await page.locator('.unit-tools-trigger').first().getAttribute('aria-label'), 'Herramientas');
    assert.ok((await page.locator('.unit-tools-trigger').first().boundingBox()).width >= 44);
    const toolsIcon = page.locator('.unit-tools-trigger').first().locator('svg');
    assert.equal(await toolsIcon.locator('rect').count(), 4, 'tools icon must be a 2×2 grid');
    assert.equal(await toolsIcon.evaluate(el => getComputedStyle(el).fill), 'none');
    assert.equal(await toolsIcon.evaluate(el => getComputedStyle(el).stroke), 'rgb(255, 255, 255)');
  } finally {
    await context.close();
    await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
});
