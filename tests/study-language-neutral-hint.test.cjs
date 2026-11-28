'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

test('lesson vocabulary hint follows the active course without hardcoding Indonesian', () => {
    const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
    assert.ok(
        html.includes('💡 Toca una palabra en ${App.escapeHtml(languageName.toLowerCase())} para consultar su significado sin salir de la lección.'),
        'the lesson hint should use the active course language rather than a fixed Indonesian label'
    );
    assert.equal(
        html.includes('Toca una palabra en indonesio para consultar su significado sin salir de la lección.'),
        false,
        'the old Indonesian-only hint must not return'
    );
});
