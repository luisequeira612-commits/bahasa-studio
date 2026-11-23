      'Mock Indonesian A (id-ID)',
      'Mock Indonesian B (id-ID)'
    ]);
    await page.locator('#audioVoiceSelect').selectOption('mock-id-b');
    await page.evaluate(() => AudioEngine.speak('frase de respaldo sin clip'));
    await page.waitForFunction(() => window.__spokenVoices.length === 1);
    assert.deepEqual(await page.evaluate(() => window.__spokenVoices), ['mock-id-b']);
    await page.waitForFunction(async () => (await DB.get('settings', 'audioVoiceURI')) === 'mock-id-b');
    assert.equal(await page.locator('#audioVoiceSelect').inputValue(), 'mock-id-b');
    assert.match(await page.locator('#audioVoiceStatus').innerText(), /Voz del dispositivo disponible como respaldo para indonesio: Mock Indonesian B/);

    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => typeof App !== 'undefined' && typeof DB !== 'undefined' && DB.db);
    await page.waitForFunction(() => document.querySelectorAll('#audioVoiceSelect option').length === 3);
    await page.locator('.nav-btn').filter({ hasText: 'Perfil' }).click();
    await page.locator('#view-profile button[onclick*="settings"]').click();
    assert.equal(await page.locator('#audioVoiceSelect').inputValue(), 'mock-id-b',
      'the selected Indonesian voice should be restored after reload');
    await page.evaluate(() => AudioEngine.speak('frase de respaldo sin clip'));
    await page.waitForFunction(() => window.__spokenVoices.length === 1);
    assert.deepEqual(await page.evaluate(() => window.__spokenVoices), ['mock-id-b']);
  } finally {
    await context.close();
    await new Promise(resolve => server.close(resolve));
  }
});

test('voice selector remains optional when no Indonesian device voice exists', async () => {
  const { server, url } = await startServer();
  const context = await browser.newContext({ serviceWorkers: 'block' });
  const page = await context.newPage();
  await page.addInitScript(() => {
    window.__audioPlayback = { played: [], fail: true };
    window.Audio = function (src) {
      this.src = src;
      this.playbackRate = 1;
      this.play = () => {
        window.__audioPlayback.played.push(this.src);
        if (this.onerror) this.onerror();
        return Promise.reject(new Error('recording unavailable in this test'));
      };
      this.pause = () => {};
    };
    Object.defineProperty(window, 'speechSynthesis', {
      configurable: true,
      value: {
        cancel() {},
        getVoices() { return [{ name: 'Mock English', lang: 'en-US', voiceURI: 'mock-en' }]; },
        speak() {},
        onvoiceschanged: null
      }
    });
    window.SpeechSynthesisUtterance = function (text) { this.text = text; };
  });

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => typeof App !== 'undefined' && typeof DB !== 'undefined' && DB.db);
    assert.equal(await page.locator('#audioVoiceSelect option').count(), 1);
    assert.equal(await page.locator('#audioVoiceSelect').inputValue(), 'auto');
    assert.ok((await page.locator('#audioVoiceStatus').innerText()).includes('grabaciones Piper del curso'));
    await page.evaluate(() => AudioEngine.speak('frase sin grabación disponible'));
    await page.waitForFunction(() => document.getElementById('audioVoiceStatus').textContent.includes('No se encontró una grabación'));
    assert.equal(await page.evaluate(() => AudioEngine.selectedVoice === null), true);
  } finally {
    await context.close();
    await new Promise(resolve => server.close(resolve));
  }
});

test('Indonesian voices discovered asynchronously refresh the selector', async () => {
  const { server, url } = await startServer();
  const context = await browser.newContext({ serviceWorkers: 'block' });
  const page = await context.newPage();
  await page.addInitScript(() => {
    let voices = [];
    window.__publishIndonesianVoices = () => {
      voices = [{ name: 'Late Indonesian', lang: 'id-ID', voiceURI: 'late-id' }];
      window.speechSynthesis.onvoiceschanged();
    };
    Object.defineProperty(window, 'speechSynthesis', {
      configurable: true,
      value: {
        cancel() {},
        getVoices() { return voices; },
        speak() {},
        onvoiceschanged: null
      }
    });
    window.SpeechSynthesisUtterance = function (text) { this.text = text; };
  });

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => typeof App !== 'undefined' && typeof DB !== 'undefined' && DB.db);
    assert.equal(await page.locator('#audioVoiceSelect option').count(), 1);
    await page.evaluate(() => window.__publishIndonesianVoices());
    await page.waitForFunction(() => document.querySelectorAll('#audioVoiceSelect option').length === 2);
    assert.equal(await page.locator('#audioVoiceSelect option').nth(1).textContent(), 'Late Indonesian (id-ID)');
    assert.match(await page.locator('#audioVoiceStatus').innerText(), /Voz del dispositivo disponible como respaldo para indonesio: Late Indonesian/);
  } finally {
    await context.close();
    await new Promise(resolve => server.close(resolve));
  }
});
