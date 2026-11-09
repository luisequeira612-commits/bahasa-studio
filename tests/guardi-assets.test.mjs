import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const assets=['guardi-normal.svg','guardi-feliz.svg','guardi-triste.svg','guardi-celebrando.svg','guardi-pensando.svg','guardi-mark.svg','guardi-icon.svg'];
test('Guardi SVG assets retain valid boundaries and approved viewBoxes',()=>{
 for(const name of assets){
  const source=fs.readFileSync(path.join(root,'assets/guardi',name),'utf8');
  assert.ok(source.startsWith('<svg'),name+' must start with <svg');
  assert.ok(source.endsWith('</svg>'),name+' must end with </svg>');
  assert.match(source,/<svg[^>]*viewBox=/,name+' viewBox missing');
 }
 for(const name of assets.slice(0,5)) assert.match(fs.readFileSync(path.join(root,'assets/guardi',name),'utf8'),/viewBox="-90 -80 180 180"/);
 assert.match(fs.readFileSync(path.join(root,'assets/guardi/guardi-mark.svg'),'utf8'),/viewBox="-54 -58 108 116"/);
 assert.match(fs.readFileSync(path.join(root,'assets/guardi/guardi-icon.svg'),'utf8'),/viewBox="0 0 120 120"/);
});
test('PWA icon purposes are separated and mascot assets are precached',()=>{
 const m=JSON.parse(fs.readFileSync(path.join(root,'manifest.json'),'utf8'));
 for(const [src,size,purpose] of [['icon-192.png','192x192','any'],['icon-512-any.png','512x512','any'],['icon-512-maskable.png','512x512','maskable']]) assert.ok(m.icons.some(i=>i.src==='./'+src&&i.sizes===size&&i.purpose===purpose));
 const sw=fs.readFileSync(path.join(root,'service-worker.js'),'utf8');
 for(const name of assets) assert.ok(sw.includes('./assets/guardi/'+name),name+' absent from precache');
 for(const name of ['icon-192.png','icon-512-any.png','icon-512-maskable.png','apple-touch-icon.png']) assert.ok(sw.includes('./'+name),name+' absent from precache');
});
test('Tutor welcome preserves useful guidance; Repasar uses zero-due state',()=>{
 const h=fs.readFileSync(path.join(root,'index.html'),'utf8');
 assert.match(h,/¿Qué quieres practicar hoy?/);
 assert.match(h,/Soy tu asistente de idiomas. Puedes hacerme preguntas/);
 assert.match(h,/Todo al día. Guardi está orgulloso./);
 assert.match(h,/guardi-normal.svg/);
 assert.match(h,/guardi-pensando.svg/);
 assert.doesNotMatch(h,/guardi-triste.svg/);
});
