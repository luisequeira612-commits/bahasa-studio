'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const workflow = fs.readFileSync(path.join(root, '.github/workflows/regression.yml'), 'utf8');

test('static preview artifact includes every local script referenced by the app entry point', () => {
    const packageStep = workflow.match(/- name: Package a downloadable static preview[\s\S]*?\n          path: \|\n([\s\S]*?)\n          if-no-files-found:/);
    assert.ok(packageStep, 'preview artifact upload step and path list exist');

    const artifactFiles = packageStep[1]
        .split(/\r?\n/)
        .map(line => line.trim())
        .filter(Boolean);

    const localScripts = [...html.matchAll(/<script\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi)]
        .map(match => match[1].split(/[?#]/)[0])
        .filter(src => !/^[a-z][a-z0-9+.-]*:/i.test(src))
        .map(src => src.replace(/^\.\//, ''));

    assert.ok(localScripts.length > 0, 'app entry point references local scripts');
    for (const script of localScripts) {
        assert.ok(
            artifactFiles.includes(script),
            'preview artifact must include ' + script
        );
    }
});
