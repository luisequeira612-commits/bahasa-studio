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
    if (!filename.startsWith(root + path.sep) && filename !== path.join(root, 'index.html')) {
      res.writeHead(403).end('Forbidden');
      return;
    }
    fs.readFile(filename, (err, content) => {
      if (err) return res.writeHead(404).end('Not found');
      const ext = path.extname(filename);
      const types = { '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.json':'application/json; charset=utf-8', '.css':'text/css; charset=utf-8', '.svg':'image/svg+xml' };
      res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream' });
      res.end(content);
    });
  });
  return new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => resolve({
      server,
      url: 'http://127.0.0.1:' + server.address().port + '/'
    }));
  });
}

test('phase four learning screen works at 360px, preserves controls, sticky sections and unit sheet', async () => {
  const { server, url } = await startServer();
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 360, height: 800 },
    serviceWorkers: 'block',
    reducedMotion: 'no-preference'
  });
  const page = await context.newPage();
  const artifacts = path.join(root, 'artifacts', 'phase-4');
  fs.mkdirSync(artifacts, { recursive: true });

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => typeof App !== 'undefined' && typeof DB !== 'undefined' && DB.db);
    await page.waitForSelector('.learning-unit-node.node-current');

    assert.equal(await page.locator('.current-unit-start-bubble').count(), 1);
    assert.equal(await page.locator('.current-unit-title').count(), 1);
    assert.match(await page.locator('#learningLevelTrigger').getAttribute('aria-label'), /A1 seleccionado/);
    assert.equal(await page.locator('.node-progress-value').getAttribute('stroke-dashoffset'), '207.35');
    assert.equal(await page.locator('.unit-path-section-banner h3').first().innerText(), 'Sección 1');

    await page.screenshot({ path: path.join(artifacts, 'learning-screen-360.png'), fullPage: true });
    await page.locator('.unit-path-stage').first().screenshot({ path: path.join(artifacts, 'current-node-bubble-and-ring.png') });

    const toolIds = ['aiGeneratorDrawer', 'writingPracticeDrawer', 'conversationPracticeDrawer'];
    for (const [index, id] of toolIds.entries()) {
      await page.locator('.unit-tools-trigger').first().click();
      await page.waitForFunction(() => !document.getElementById('learningToolsSheetOverlay').hidden);
      await page.locator('.learning-tool-sheet-row').nth(index).click();
      await page.waitForFunction(id => document.getElementById(id).open, id);
      assert.notEqual(await page.locator('#' + id).evaluate(el => getComputedStyle(el).display), 'none');
      await page.evaluate(id => App.toggleLearningTool(id), id);
    }

    await page.locator('.current-unit-start-bubble').click();
    await page.waitForFunction(() => !document.getElementById('unitSheetOverlay').hidden);
    assert.match(await page.locator('#unitSheetTitle').innerText(), /.+/);
    await page.screenshot({ path: path.join(artifacts, 'unit-bottom-sheet.png') });
    await page.locator('.unit-sheet-close').click();
    await page.waitForFunction(() => document.getElementById('unitSheetOverlay').hidden, null, { timeout: 2000 });

    await page.evaluate(() => window.scrollTo(0, 480));
    await page.waitForTimeout(120);
    const stickyTop = await page.locator('.unit-path-section-banner').first().evaluate(el => el.getBoundingClientRect().top);
    assert.ok(stickyTop >= 108 && stickyTop <= 116, 'first section banner should stick below the top bar and level selector: ' + stickyTop);
    await page.screenshot({ path: path.join(artifacts, 'sticky-section-banner.png') });

    for (const [group, view] of [['review','srs'],['tutor','ai'],['profile','profile'],['learn','route']]) {
      await page.locator('.nav-btn[data-nav-group="' + group + '"]').click();
      assert.equal(await page.locator('.nav-btn.active').getAttribute('data-nav-group'), group);
      assert.equal(await page.locator('#view-' + view).evaluate(el => el.classList.contains('active')), true);
    }

    const cdp = await context.newCDPSession(page);
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
    await page.evaluate(() => {
      App.selectLearningLevel('B1');
      window.scrollTo(0, 0);
    });
    const renderMs = await page.evaluate(() => {
      const start = performance.now();
      App.renderCourseRoute();
      return performance.now() - start;
    });
    assert.ok(renderMs < 3000, 'B1 50-unit render exceeded 3 seconds under 4x CPU throttle: ' + renderMs.toFixed(1) + 'ms');

    const secondBanner = page.locator('.unit-path-section-banner').nth(1);
    const secondDocumentTop = await secondBanner.evaluate(el => el.getBoundingClientRect().top + window.scrollY);
    await page.evaluate(y => window.scrollTo(0, y - 112), secondDocumentTop);
    await page.waitForTimeout(120);
    const secondTop = await secondBanner.evaluate(el => el.getBoundingClientRect().top);
    assert.ok(secondTop >= 108 && secondTop <= 116, 'next section banner should replace the previous sticky banner: ' + secondTop);
    await page.screenshot({ path: path.join(artifacts, 'sticky-next-section-banner.png') });
    await cdp.detach();
  } finally {
    await context.close();
    await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
});


test('phase four path geometry is collision-free at 360px across levels and zigzag positions', async () => {
  const { server, url } = await startServer();
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 360, height: 800 },
    serviceWorkers: 'block',
    reducedMotion: 'reduce'
  });
  const page = await context.newPage();

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => typeof App !== 'undefined' && typeof DB !== 'undefined' && DB.db);
    await page.waitForSelector('.learning-unit-node');
    const layouts = await page.evaluate(() => {
      const levels = CourseData.levels;
      const prerequisite = {
        A2: levels.find(level => level.id === 'A1').units.at(-1).id,
        B1: levels.find(level => level.id === 'A2').units.at(-1).id,
        B2: levels.find(level => level.id === 'B1').units.at(-1).id
      };
      const scenarios = [];
      for (const levelId of ['A1', 'A2', 'B1', 'B2']) {
        const level = levels.find(entry => entry.id === levelId);
        const indices = levelId === 'B2' ? [0] : level.units.length > 15 ? [0, 1, 2, 3, 7, 8, 15] : [0, 1, 2, 3, 7];
        for (const index of indices) {
          App.selectedLearningLevel = levelId;
          App.completedUnits = [
            ...(prerequisite[levelId] ? [prerequisite[levelId]] : []),
            ...level.units.slice(0, index).map(unit => unit.id)
          ];
          App.completedLessons = [];
          window.scrollTo(0, 0);
          App.renderCourseRoute();
          const current = [...document.querySelectorAll('#courseContainer .learning-unit-node')].find(node => node.dataset.pathState === 'current');
          const stage = current.closest('.unit-path-stage');
          const nodes = [...stage.querySelectorAll('.learning-unit-node')];
          const bubble = stage.querySelector('.current-unit-start-bubble');
          const title = stage.querySelector('.current-unit-title');
          const banner = current.closest('.unit-path-section').querySelector('.unit-path-section-banner');
          const rect = node => {
            const r = node.getBoundingClientRect();
            return { left:r.left, right:r.right, top:r.top, bottom:r.bottom, width:r.width, height:r.height };
          };
          const currentIndex = nodes.indexOf(current);
          const neighbors = [nodes[currentIndex - 1], nodes[currentIndex + 1]].filter(Boolean);
          const bubbleRect = rect(bubble);
          const titleRect = rect(title);
          const currentRect = rect(current);
          const ringRect = rect(current.querySelector('.node-progress-ring'));
          const ringGap = ringRect.top + 2.5 - bubbleRect.bottom;
          const horizontalBubbleClearance = neighbors.map(node => {
            const r = rect(node);
            return Math.max(r.left - bubbleRect.right, bubbleRect.left - r.right);
          });
          const horizontalTitleClearance = neighbors.map(node => {
            const r = rect(node);
            return Math.max(r.left - titleRect.right, titleRect.left - r.right);
          });
          const next = nodes[currentIndex + 1];
          const nextRect = next ? rect(next) : null;
          const nodeEdgeGaps = nodes.slice(1).map((node, i) => rect(node).top - rect(nodes[i]).bottom);
          scenarios.push({
            levelId, index, currentIndex, currentId:current.dataset.unitId,
            expectedId:level.units[index].id,
            documentWidth:document.documentElement.scrollWidth,
            stageWidth:current.parentElement.clientWidth,
            bubble: bubbleRect, title:titleRect, node:currentRect,
            ringGap, horizontalBubbleClearance, horizontalTitleClearance, nodeEdgeGaps,
            titleNextGap:nextRect ? nextRect.top - titleRect.bottom : null,
            firstNodeGap:rect(nodes[0]).top - rect(banner).bottom,
            bannerGap:index === 0 ? bubbleRect.top - rect(banner).bottom : null,
            nodeSize:{width:currentRect.width,height:currentRect.height}
          });
        }
      }
      return scenarios;
    });

    assert.equal(layouts.length, 22);
    for (const layout of layouts) {
      assert.equal(layout.currentId, layout.expectedId, layout.levelId + ' current unit should be at zigzag index ' + layout.index);
      assert.ok(layout.documentWidth <= 360, layout.levelId + ' must not overflow horizontally: ' + JSON.stringify({
        documentWidth: layout.documentWidth,
        viewportWidth: 360,
        offenders: [...document.querySelectorAll('body *')].map(el => {
          const r = el.getBoundingClientRect();
          return { tag: el.tagName, id: el.id, className: typeof el.className === 'string' ? el.className : '', left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width) };
        }).filter(item => item.width > 0 && (item.right > 360 || item.left < 0)).sort((a,b) => b.right - a.right).slice(0, 12)
      }));
      assert.equal(layout.nodeSize.width, 56);
      assert.equal(layout.nodeSize.height, 56);
      assert.ok(layout.ringGap >= 10, layout.levelId + ' bubble must stay 10px clear of the outer ring');
      assert.ok(layout.horizontalBubbleClearance.every(gap => gap >= 9),
        layout.levelId + ' bubble must not overlap adjacent zigzag nodes: ' + JSON.stringify(layout.horizontalBubbleClearance));
      assert.ok(layout.horizontalTitleClearance.every(gap => gap >= 9),
        layout.levelId + ' title must not invade adjacent zigzag columns: ' + JSON.stringify(layout.horizontalTitleClearance));
      for (const [gapIndex, gap] of layout.nodeEdgeGaps.entries()) {
        const expectedGap = gapIndex === layout.currentIndex - 1 ? 74 : gapIndex === layout.currentIndex ? 56 : 18;
        assert.ok(Math.abs(gap - expectedGap) <= 1,
          layout.levelId + ' node edge gap should be 18px, with only the current-title allowance: ' + gap);
      }
      if (layout.titleNextGap !== null) assert.ok(layout.titleNextGap >= 15,
        layout.levelId + ' next node must leave space below the one-line title');
      const expectedFirstNodeGap = layout.currentIndex === 0 ? 80 : 24;
      assert.ok(Math.abs(layout.firstNodeGap - expectedFirstNodeGap) <= 1,
        layout.levelId + ' first node should reserve the bubble clearance only when it is current');
      if (layout.bannerGap !== null) assert.ok(Math.abs(layout.bannerGap - 18) <= 1,
        layout.levelId + ' first bubble should have a visible 18px gap after the section banner');
    }

    const progress = await page.evaluate(() => {
      const level = CourseData.levels.find(entry => entry.id === 'A1');
      const current = level.units[2];
      App.selectedLearningLevel = 'A1';
      App.completedUnits = level.units.slice(0, 2).map(unit => unit.id);
      App.completedLessons = [current.id + '::0'];
      App.renderCourseRoute();
      const node = document.querySelector('.learning-unit-node.node-current');
      const ring = node.querySelector('.node-progress-value');
      const longest = CourseData.levels.flatMap(entry => entry.units).reduce((best, unit) =>
        String(unit.title || '').length > String(best.title || '').length ? unit : best);
      const originalTitle = current.title;
      current.title = longest.title;
      App.renderCourseRoute();
      const title = document.querySelector('.current-unit-title');
      const titleResult = {
        text:title.textContent,
        width:title.clientWidth,
        scrollWidth:title.scrollWidth,
        whiteSpace:getComputedStyle(title).whiteSpace,
        lineClamp:getComputedStyle(title).webkitLineClamp,
        height:title.getBoundingClientRect().height,
        overflow:getComputedStyle(title).overflow,
        textOverflow:getComputedStyle(title).textOverflow
      };
      current.title = originalTitle;
      App.renderCourseRoute();
      return {
        dashOffset:ring.getAttribute('stroke-dashoffset'),
        circumference:ring.getAttribute('stroke-dasharray'),
        titleResult,
        fullTitle:originalTitle
      };
    });
    assert.equal(progress.circumference, '207.35');
    assert.ok(Math.abs(Number(progress.dashOffset) - 103.68) < 0.02,
      'one of two completed lessons should fill exactly half the ring from the top');
    assert.equal(progress.titleResult.whiteSpace, 'normal');
    assert.equal(progress.titleResult.lineClamp, '2');
    assert.ok(progress.titleResult.height <= 30, 'longest curriculum title must be clamped to two lines');
    assert.ok(progress.titleResult.width <= 106, 'the longest title must fit within the 106px column limit');
    assert.equal(progress.titleResult.overflow, 'hidden');
    assert.equal(progress.titleResult.textOverflow, 'ellipsis');
    assert.doesNotMatch(progress.titleResult.text, /^Unidad\s+\d+\s*:/i);
    const sheetTitle = await page.evaluate(id => {
      App.openUnitSheet(id);
      return document.getElementById('unitSheetTitle').textContent;
    }, 'a1_u3');
    assert.equal(sheetTitle, progress.fullTitle,
      'the bottom sheet must retain the complete unit title');
    const sheetStyle = await page.evaluate(id => {
      App.openUnitSheet(id);
      const sheet = document.getElementById('unitBottomSheet');
      const track = document.querySelector('.unit-sheet-lesson-track');
      const fill = track.querySelector('.progress-fill');
      const description = document.querySelector('.unit-sheet-description');
      const primary = document.querySelector('.unit-sheet-primary');
      const secondary = document.querySelector('.unit-sheet-grammar-toggle');
      return {
        background:getComputedStyle(sheet).backgroundColor,
        text:getComputedStyle(sheet).color,
        description:getComputedStyle(description).color,
        border:getComputedStyle(sheet).borderTopWidth,
        bottomPadding:sheet.style.paddingBottom,
        trackBackground:getComputedStyle(track).backgroundColor,
        trackHeight:track.getBoundingClientRect().height,
        fillBackground:getComputedStyle(fill).backgroundColor,
        primaryBackground:getComputedStyle(primary).backgroundColor,
        secondaryBorder:getComputedStyle(secondary).borderTopWidth,
        trackContrast:(() => {
          const c=track.getBoundingClientRect();
          const color=getComputedStyle(track).backgroundColor.match(/[\d.]+/g).slice(0,3).map(Number);
          const lum=color.map(v=>{const x=v/255;return x<=.04045?x/12.92:((x+.055)/1.055)**2.4;});
          const l=lum[0]*.2126+lum[1]*.7152+lum[2]*.0722;
          return 1.05/(l+.05);
        })()
      };
    }, 'a1_u3');
    assert.equal(sheetStyle.background, 'rgb(255, 255, 255)');
    assert.equal(sheetStyle.text, 'rgb(31, 41, 55)');
    assert.equal(sheetStyle.description, 'rgb(75, 85, 99)');
    assert.equal(sheetStyle.border, '1px');
    assert.match(sheetStyle.bottomPadding, /safe-area-inset-bottom/);
    assert.equal(sheetStyle.trackBackground, 'rgb(139, 139, 139)');
    assert.equal(sheetStyle.trackHeight, 8);
    assert.ok(sheetStyle.trackContrast >= 3, 'gray track must meet 3:1 contrast');
    assert.equal(sheetStyle.fillBackground, 'rgb(201, 42, 64)');
    assert.ok(sheetStyle.primaryBackground !== 'rgba(0, 0, 0, 0)');
    assert.ok(Number.parseFloat(sheetStyle.secondaryBorder) >= 1, 'secondary action must retain its outline');
    await page.evaluate(() => App.closeUnitSheet());

    const scrollCheck = await page.evaluate(() => {
      App.selectLearningLevel('A1');
      App.scrollToCurrentUnit(false);
      const current=document.querySelector('.learning-unit-node.node-current');
      const bubble=document.querySelector('.current-unit-start-bubble');
      const banner=current.closest('.unit-path-section').querySelector('.unit-path-section-banner');
      return { bubbleTop:bubble.getBoundingClientRect().top, bannerBottom:banner.getBoundingClientRect().bottom,
        nodeTop:current.getBoundingClientRect().top, nodeBottom:current.getBoundingClientRect().bottom,
        stickyTop:parseFloat(getComputedStyle(banner).top) };
    });
    assert.ok(scrollCheck.bubbleTop >= scrollCheck.bannerBottom + 10,
      'automatic scroll must leave the complete start bubble below the sticky banner: ' + JSON.stringify(scrollCheck));
    assert.ok(scrollCheck.nodeTop >= scrollCheck.bannerBottom + 50,
      'automatic scroll must leave the current node below the sticky banner: ' + JSON.stringify(scrollCheck));

    const contrast = await page.evaluate(() => {
      const rgb = value => value.match(/[\d.]+/g).slice(0, 3).map(Number);
      const lum = color => {
        const channels = rgb(color).map(v => {
          const c = v / 255;
          return c <= .04045 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4;
        });
        return channels[0] * .2126 + channels[1] * .7152 + channels[2] * .0722;
      };
      const ratio = (a,b) => {
        const x=lum(a), y=lum(b);
        return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);
      };
      const banner=document.querySelector('.unit-path-section-banner');
      const chip=document.querySelector('.topbar-chip');
      const active=document.querySelector('.nav-btn.active');
      const bannerStyle=getComputedStyle(banner);
      const chipStyle=getComputedStyle(chip);
      const pill=active.querySelector('.nav-pill-content');
      const pillStyle=getComputedStyle(pill);
      const result={
        banner:ratio(bannerStyle.color,bannerStyle.backgroundColor),
        chip:ratio(chipStyle.color,chipStyle.backgroundColor),
        activePill:ratio(pillStyle.color,pillStyle.backgroundColor),
        activeIcon:ratio(getComputedStyle(pill.querySelector('svg')).color,pillStyle.backgroundColor),
        navHeight:active.getBoundingClientRect().height,
        navHeights:[...document.querySelectorAll('.nav-btn')].map(button => button.getBoundingClientRect().height),
        chipIcon:ratio(getComputedStyle(chip.querySelector('svg')).color,chipStyle.backgroundColor),
        chipGap:getComputedStyle(document.querySelector('.topbar-metrics')).gap
      };
      document.body.classList.add('dark-mode');
      const darkChip=getComputedStyle(chip);
      result.darkChip=ratio(darkChip.color,darkChip.backgroundColor);
      result.darkChipIcon=ratio(getComputedStyle(chip.querySelector('svg')).color,darkChip.backgroundColor);
      document.body.classList.remove('dark-mode');
      return result;
    });
    assert.ok(contrast.banner >= 4.5, 'petroleum banner text contrast: ' + contrast.banner);
    assert.ok(contrast.chip >= 4.5 && contrast.darkChip >= 4.5, 'topbar chip text contrast in both themes: ' + JSON.stringify(contrast));
    assert.ok(contrast.chipIcon >= 3 && contrast.darkChipIcon >= 3, 'topbar chip icons need 3:1 contrast: ' + JSON.stringify(contrast));
    assert.ok(contrast.activePill >= 4.5 && contrast.activeIcon >= 3, 'active tab pill contrast: ' + JSON.stringify(contrast));
    assert.equal(contrast.chipGap, '5px', 'topbar chips should have 5px separation at 360px');
    assert.ok(contrast.navHeight >= 44, 'bottom navigation touch target must be at least 44px high');
    assert.ok(contrast.navHeights.every(height => height === contrast.navHeights[0]), 'all bottom tabs must have the same height');
  } finally {
    await context.close();
    await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
});
