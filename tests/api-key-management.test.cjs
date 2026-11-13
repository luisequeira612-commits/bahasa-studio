const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

function loadForgetMethod(overrides = {}) {
    const match = html.match(/async forgetApiKey\(\) \{[\s\S]*?\n            \}/);
    assert.ok(match, 'App.forgetApiKey must exist');
    const alerts = [];
    const errors = [];
    const input = { value: 'stored-key' };
    const context = {
        DB: { delete: async (...args) => {
            if (overrides.delete) return overrides.delete(...args);
            return true;
        } },
        document: { getElementById: id => id === 'apiKeyInput' ? input : null },
        alert: message => alerts.push(message),
        console: { error: (...args) => errors.push(args) }
    };
    const method = vm.runInNewContext('({' + match[0] + '})', context).forgetApiKey;
    return { method, input, alerts, errors };
}

test('DB.delete elimina una clave por key en una transacción readwrite sin cambiar el esquema', async () => {
    const start = html.indexOf('const DB = {');
    const end = html.indexOf('/* 2. CURRICULO COMPLETO A1 CON ESTRUCTURA A2-B2 */', start);
    assert.ok(start >= 0 && end > start, 'DB wrapper block must exist');
    const dbSource = html.slice(start, end);
    const db = vm.runInNewContext(dbSource + '\nDB', { Promise, Error });
    let transactionArgs;
    let deleted;
    const tx = {
        objectStore: store => ({
            delete: key => { deleted = { store, key }; }
        })
    };
    db.db = {
        transaction: (...args) => { transactionArgs = args; return tx; }
    };
    const pending = db.delete('settings', 'geminiApiKey');
    assert.deepEqual(transactionArgs, ['settings', 'readwrite']);
    assert.deepEqual(deleted, { store: 'settings', key: 'geminiApiKey' });
    tx.oncomplete();
    await pending;
});

test('Olvidar clave borra el valor en memoria, limpia el campo y elimina IndexedDB', async () => {
    let deleted;
    const setup = loadForgetMethod({ delete: async (...args) => { deleted = args; } });
    const app = { apiKey: 'stored-key' };
    await setup.method.call(app);
    assert.equal(app.apiKey, '');
    assert.equal(setup.input.value, '');
    assert.deepEqual(deleted, ['settings', 'geminiApiKey']);
    assert.match(setup.alerts[0], /Clave eliminada/);
    assert.equal(setup.errors.length, 0);
});

test('si falla el borrado, la clave deja de usarse en memoria y se informa del fallo persistente', async () => {
    const setup = loadForgetMethod({ delete: async () => { throw new Error('storage unavailable'); } });
    const app = { apiKey: 'stored-key' };
    await setup.method.call(app);
    assert.equal(app.apiKey, '');
    assert.equal(setup.input.value, '');
    assert.match(setup.alerts[0], /No se pudo borrar la clave guardada/);
    assert.equal(setup.errors.length, 1);
});

test('la interfaz ofrece olvidar la clave y la copia JSON v3 no la exporta', () => {
    assert.match(html, /onclick="App\.forgetApiKey\(\)">Olvidar clave/);
    const start = html.indexOf('async exportProgress()');
    const end = html.indexOf('validateBackup(parsed)', start);
    assert.ok(start >= 0 && end > start);
    assert.doesNotMatch(html.slice(start, end), /geminiApiKey|apiKey/);
    assert.match(html.slice(start, end), /version:\s*3/);
});
