'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

test('lesson vocabulary hint is neutral across active course languages', () => {
    const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
    assert.ok(
        html.includes('💡 Toca una palabra para consultar su significado sin salir de la lección.'),
        'the lesson hint should not name a specific course language'
    );
    assert.equal(
        html.includes('Toca una palabra en indonesio para consultar su significado sin salir de la lección.'),
        false,
        'the old Indonesian-only hint must not return'
    );
});
