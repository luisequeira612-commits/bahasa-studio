'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const http=require('node:http');
const path=require('node:path');
const {test}=require('node:test');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..');

function startServer(){
 const server=http.createServer((req,res)=>{
  const pathname=decodeURIComponent(new URL(req.url,'http://127.0.0.1').pathname);
  const file=path.resolve(root,'.'+pathname);
  if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}
  fs.readFile(file,(error,bytes)=>{
   if(error){res.writeHead(404).end();return;}
   const ext=path.extname(file);
   const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json'};
   res.writeHead(200,{'Content-Type':types[ext]||'application/octet-stream','Cache-Control':'no-store'});
   res.end(bytes);
  });
 });
 return new Promise(resolve=>server.listen(0,'127.0.0.1',()=>resolve(server)));
}

test('Playwright: carga A1 U1-U24, A2 U1-U30 y B1 U1-U3 offline, aislando el progreso pt-BR del indonesio', {timeout:120000}, async()=>{
 const server=await startServer();
 const address=server.address();
 const browser=await chromium.launch({headless:true});
 try{
  const context=await browser.newContext();
  const page=await context.newPage();
  await page.goto('http://127.0.0.1:'+address.port+'/tests/pt-br-curriculum-harness.html');
  await page.evaluate(()=>window.pilotHarnessReady);
  await page.evaluate(async()=>{
   await navigator.serviceWorker.register('/service-worker.js');
   await navigator.serviceWorker.ready;
  });
  await page.reload();
  await page.waitForFunction(()=>Boolean(navigator.serviceWorker.controller));
  const cacheReady=await page.evaluate(async()=>{
   const cache=await caches.open('bahasa-studio-v3.8.140');
   return Boolean(await cache.match(new URL('/languages/pt-BR/curriculum/a1/index.js',location.href).href)) &&
     Boolean(await cache.match(new URL('/languages/pt-BR/curriculum/a1/units-01-06.js',location.href).href)) &&
     Boolean(await cache.match(new URL('/languages/pt-BR/curriculum/a1/units-13-18.js',location.href).href)) &&
     Boolean(await cache.match(new URL('/languages/pt-BR/curriculum/a1/units-19-21.js',location.href).href)) &&
     Boolean(await cache.match(new URL('/languages/pt-BR/curriculum/a1/units-22-24.js',location.href).href)) &&
     Boolean(await cache.match(new URL('/languages/pt-BR/curriculum/a2/index.js',location.href).href)) &&
     Boolean(await cache.match(new URL('/languages/pt-BR/curriculum/a2/units-01-03.js',location.href).href)) &&
     Boolean(await cache.match(new URL('/languages/pt-BR/curriculum/a2/units-04-06.js',location.href).href)) &&
     Boolean(await cache.match(new URL('/languages/pt-BR/curriculum/a2/units-07-09.js',location.href).href)) &&
     Boolean(await cache.match(new URL('/languages/pt-BR/curriculum/a2/units-10-12.js',location.href).href)) &&
     Boolean(await cache.match(new URL('/languages/pt-BR/curriculum/a2/units-13-15.js',location.href).href)) &&
     Boolean(await cache.match(new URL('/languages/pt-BR/curriculum/a2/units-16-18.js',location.href).href)) &&
     Boolean(await cache.match(new URL('/languages/pt-BR/curriculum/a2/units-19-21.js',location.href).href)) &&
     Boolean(await cache.match(new URL('/languages/pt-BR/curriculum/a2/units-22-24.js',location.href).href)) &&
     Boolean(await cache.match(new URL('/languages/pt-BR/curriculum/a2/units-25-27.js',location.href).href)) &&
     Boolean(await cache.match(new URL('/languages/pt-BR/curriculum/a2/units-28-30.js',location.href).href)) &&
     Boolean(await cache.match(new URL('/languages/pt-BR/curriculum/b1/index.js',location.href).href)) &&
     Boolean(await cache.match(new URL('/languages/pt-BR/curriculum/b1/units-01-03.js',location.href).href));
  });
  assert.equal(cacheReady,true,'manifest and curriculum block must be in the app-shell cache');
  await context.setOffline(true);
  const result=await page.evaluate(async()=>{
   const curriculum=await CurriculumLoader.loadUnits('pt-BR','A1',[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]);
   const a2=await CurriculumLoader.loadUnits('pt-BR','A2',[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]);
   const b1=await CurriculumLoader.loadUnits('pt-BR','B1',[1,2,3]);
   const u3=curriculum.units[2];
   const previous=new Set(curriculum.units[0].vocab.map(word=>word.id));
   const recycled=u3.exercises.filter(ex=>previous.has(ex.vocabId)).map(ex=>ex.vocabId);
   const now=new Date(2026,10,23,12);
   const ptKey=ProgressNamespace.storageKey('progress','unit_1','pt-BR');
   const idKey=ProgressNamespace.storageKey('progress','unit_1','id');
   const progressRecords=[{key:ptKey,val:{completed:false}},{key:idKey,val:{completed:true}}];
   const ptProgress=ProgressNamespace.filterRecords('progress',progressRecords,'pt-BR');
   const idProgress=ProgressNamespace.filterRecords('progress',progressRecords,'id');
   await StudyHistory.record('points',12,now,'pt-BR');
   await StudyHistory.record('points',5,now,'id');
   return {
    units:curriculum.units.map(unit=>({id:unit.id,lessons:unit.lessons.length})),
    a2Units:a2.units.map(unit=>({id:unit.id,lessons:unit.lessons.length,vocab:unit.vocab.length})),
    a2TotalUnits:a2.totalUnits,
    b1Units:b1.units.map(unit=>({id:unit.id,lessons:unit.lessons.length,vocab:unit.vocab.length})),
    b1TotalUnits:b1.totalUnits,
    recycled,
    ptKey,idKey,
    ptProgress:ptProgress.map(record=>record.val.completed),
    idProgress:idProgress.map(record=>record.val.completed),
    ptHistory:localStorage.getItem(StudyHistory.storageKey('pt-BR')),
    idHistory:localStorage.getItem(StudyHistory.storageKey('id')),
    available:LanguageManager.isAvailable('pt-BR')
   };
  });
  assert.deepEqual(result.units,Array.from({length:24},(_,index)=>({id:'ptbr_a1_u'+(index+1),lessons:5})));
  assert.deepEqual(result.recycled,['ptbr_a1_u1_v01','ptbr_a1_u1_v02']);
  assert.deepEqual(result.a2Units,Array.from({length:30},(_,index)=>({id:'ptbr_a2_u'+(index+1),lessons:5,vocab:10})));
  assert.equal(result.a2TotalUnits,30);
  assert.deepEqual(result.b1Units,Array.from({length:3},(_,index)=>({id:'ptbr_b1_u'+(index+1),lessons:5,vocab:10})));
  assert.equal(result.b1TotalUnits,36);
  assert.equal(result.ptKey,'pt-BR::unit_1');
  assert.equal(result.idKey,'unit_1');
  assert.deepEqual(result.ptProgress,[false]);
  assert.deepEqual(result.idProgress,[true]);
  assert.match(result.ptHistory,/12/);
  assert.match(result.idHistory,/5/);
  assert.equal(result.available,false);
  await context.close();
 }finally{
  await browser.close();
  await new Promise(resolve=>server.close(resolve));
 }
});
