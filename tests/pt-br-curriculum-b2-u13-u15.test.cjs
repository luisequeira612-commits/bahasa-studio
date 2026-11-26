'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const {test}=require('node:test');
const repo=path.join(__dirname,'..');
const managerSource=fs.readFileSync(path.join(repo,'language-manager.js'),'utf8');
const loaderSource=fs.readFileSync(path.join(repo,'curriculum-loader.js'),'utf8');
const a2Files=['units-01-03.js','units-04-06.js','units-07-09.js','units-10-12.js','units-13-15.js','units-16-18.js','units-19-21.js','units-22-24.js','units-25-27.js','units-28-30.js'];
const b2Files=['units-01-03.js','units-04-06.js','units-07-09.js','units-10-12.js','units-13-15.js','units-16-18.js','units-19-21.js','units-22-24.js','units-25-27.js'];
const sources={
 './languages/pt-BR/curriculum/b2/index.js':fs.readFileSync(path.join(repo,'languages/pt-BR/curriculum/b2/index.js'),'utf8'),
 './languages/pt-BR/curriculum/a2/index.js':fs.readFileSync(path.join(repo,'languages/pt-BR/curriculum/a2/index.js'),'utf8')
};
for(const file of a2Files)sources['./languages/pt-BR/curriculum/a2/'+file]=fs.readFileSync(path.join(repo,'languages/pt-BR/curriculum/a2',file),'utf8');
for(const file of b2Files)sources['./languages/pt-BR/curriculum/b2/'+file]=fs.readFileSync(path.join(repo,'languages/pt-BR/curriculum/b2',file),'utf8');
function createPilot(){
 const window={localStorage:{getItem(){return 'id';},setItem(){}},document:{createElement(){return {};},head:{appendChild(script){const source=sources[script.src];if(!source){script.onerror();return;}vm.runInNewContext(source,sandbox);script.onload();}}}};
 const sandbox={window,Object,Map,Set,Promise,Error,String,Array,Number};
 vm.runInNewContext(managerSource,sandbox);vm.runInNewContext(loaderSource,sandbox);
 vm.runInNewContext(sources['./languages/pt-BR/curriculum/b2/index.js'],sandbox);
 return {window,loader:window.CurriculumLoader};
}
test('pt-BR B2 U13-U15 load as a partial internal block while the course remains unavailable',async()=>{
 const {window,loader}=createPilot();
 assert.equal(window.LanguageManager.isSupported('pt-BR'),true);
 assert.equal(window.LanguageManager.isAvailable('pt-BR'),false);
 assert.equal(loader.resolve('pt-BR','B2'),null);
 const {units,totalUnits}=await loader.loadUnits('pt-BR','B2',[13,14,15]);
 assert.equal(totalUnits,40);assert.deepEqual(Array.from(units,u=>u.unitNumber),[13,14,15]);
 for(const unit of units){
  assert.equal(unit.vocab.length,10,unit.id);assert.equal(unit.lessons.length,5,unit.id);assert.equal(unit.exercises.length,10,unit.id);
  assert.equal(new Set(unit.vocab.map(word=>word.id)).size,10,unit.id);
  for(const word of unit.vocab){assert.equal(word.verification.status,'not_checked',word.id);assert.ok(word.ex&&word.exEsp,word.id);}
  for(const lesson of unit.lessons){
   assert.equal(lesson.vocabIds.length,2,unit.id);assert.equal(lesson.exercises.length,2,unit.id);
   const grammar=lesson.grammar.toLocaleLowerCase('pt-BR');
   for(const id of lesson.vocabIds){const word=unit.vocab.find(item=>item.id===id);assert.ok(word,id);assert.ok(grammar.includes(word.target.toLocaleLowerCase('pt-BR')),unit.id+' '+lesson.title+' must explain '+word.target);}
  }
  for(const ex of [...unit.exercises,...unit.lessons.flatMap(lesson=>lesson.exercises)]){
   assert.equal(ex.type,'mc',unit.id);const word=unit.vocab.find(item=>item.id===ex.vocabId);assert.ok(word,ex.vocabId);
   assert.equal(ex.options.length,3,ex.vocabId);assert.equal(ex.options[ex.answer],word.esp,ex.vocabId);
  }
 }
});
test('B2 manifest declares 40 units and publishes only the authored U1-U15 blocks',()=>{
 const {window}=createPilot(),manifest=window.GUARDI_CURRICULUM_MANIFESTS['pt-BR'].B2;
 assert.equal(manifest.totalUnits,40);assert.deepEqual(Array.from(manifest.publishedUnits),Array.from({length:27},(_,i)=>i+1));
 assert.deepEqual(Array.from(manifest.blocks.map(block=>Array.from(block.units))),[[1,2,3],[4,5,6],[7,8,9],[10,11,12],[13,14,15],[16,17,18],[19,20,21],[22,23,24],[25,26,27]]);
 assert.equal(window.LanguageManager.isAvailable('pt-BR'),false);
});
test('B2 U13-U15 review references resolve to existing A2 vocabulary IDs',async()=>{
 const {loader}=createPilot(),{units}=await loader.loadUnits('pt-BR','B2',[13,14,15]);
 const {units:a2}=await loader.loadUnits('pt-BR','A2',Array.from({length:30},(_,i)=>i+1));
 const ids=new Set(a2.flatMap(unit=>unit.vocab.map(word=>word.id)));
 for(const unit of units)for(const lesson of unit.lessons)for(const id of lesson.reviewVocabIds)assert.ok(ids.has(id),id);
});
test('B2 U13-U15 add no exact normalized vocabulary duplicates against A1, A2, B1 or prior B2',()=>{
 const prior=[];
 const a1Files=['units-01-06.js','units-07-12.js','units-13-18.js','units-19-21.js','units-22-24.js'];
 const b1Files=['units-01-03.js','units-04-06.js','units-07-09.js','units-10-12.js','units-13-15.js','units-16-18.js','units-19-21.js','units-22-24.js','units-25-27.js','units-28-30.js','units-31-33.js','units-34-36.js'];
 for(const file of a1Files){const source=fs.readFileSync(path.join(repo,'languages/pt-BR/curriculum/a1',file),'utf8');for(const match of source.matchAll(/v\('(?:[^']+)'\s*,\s*'([^']+)'/g))prior.push(match[1]);}
 for(const file of a2Files){const source=fs.readFileSync(path.join(repo,'languages/pt-BR/curriculum/a2',file),'utf8');for(const match of source.matchAll(/vocab\(\s*\d+\s*,\s*\d+\s*,\s*'([^']+)'/g))prior.push(match[1]);}
 for(const file of b1Files){const source=fs.readFileSync(path.join(repo,'languages/pt-BR/curriculum/b1',file),'utf8');for(const match of source.matchAll(/vocab\(\s*\d+\s*,\s*\d+\s*,\s*'([^']+)'/g))prior.push(match[1]);}
 for(const file of b2Files.slice(0,5)){const source=fs.readFileSync(path.join(repo,'languages/pt-BR/curriculum/b2',file),'utf8');for(const match of source.matchAll(/vocab\(\d+,\d+,'([^']+)'/g))prior.push(match[1]);}
 const source=fs.readFileSync(path.join(repo,'languages/pt-BR/curriculum/b2/units-13-15.js'),'utf8');
 const added=[...source.matchAll(/vocab\(\d+,\d+,'([^']+)'/g)].map(match=>match[1]);
 const normalize=value=>value.toLocaleLowerCase('pt-BR').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\s+/g,' ').trim();
 const previous=new Set(prior.map(normalize)),normalized=added.map(normalize);
 assert.equal(added.length,30);assert.equal(new Set(normalized).size,30);
 assert.deepEqual(normalized.filter(word=>previous.has(word)),[]);
});
test('service worker precaches B2 U1-U15 and advances the app-shell cache',()=>{
 const source=fs.readFileSync(path.join(repo,'service-worker.js'),'utf8');
 assert.ok(source.includes("./languages/pt-BR/curriculum/b2/index.js"));
 for(const file of b2Files)assert.ok(source.includes('./languages/pt-BR/curriculum/b2/'+file));
 assert.match(source,/bahasa-studio-v3\.8\.161/);
});
