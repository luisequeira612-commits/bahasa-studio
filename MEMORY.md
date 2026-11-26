'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const {test}=require('node:test');
const repo=path.join(__dirname,'..');
const managerSource=fs.readFileSync(path.join(repo,'language-manager.js'),'utf8');
const loaderSource=fs.readFileSync(path.join(repo,'curriculum-loader.js'),'utf8');
const manifestSource=fs.readFileSync(path.join(repo,'languages/en/curriculum/a1/index.js'),'utf8');
const blockSource=fs.readFileSync(path.join(repo,'languages/en/curriculum/a1/units-01-06.js'),'utf8');
const blockSource2=fs.readFileSync(path.join(repo,'languages/en/curriculum/a1/units-07-12.js'),'utf8');
const blockSource3=fs.readFileSync(path.join(repo,'languages/en/curriculum/a1/units-13-18.js'),'utf8');
function createEnglishPilot(){
 const sources={
  './languages/en/curriculum/a1/index.js':manifestSource,
  './languages/en/curriculum/a1/units-01-06.js':blockSource,
  './languages/en/curriculum/a1/units-07-12.js':blockSource2,
  './languages/en/curriculum/a1/units-13-18.js':blockSource3
 };
 const window={localStorage:{getItem(){return 'id';},setItem(){}},document:{createElement(){return {};},head:{appendChild(script){
  const source=sources[script.src];
  if(!source){script.onerror();return;}
  vm.runInNewContext(source,sandbox);
  script.onload();
 }}}};
 const sandbox={window,Object,Map,Set,Promise,Error,String,Array,Number};
 vm.runInNewContext(managerSource,sandbox);
 vm.runInNewContext(loaderSource,sandbox);
 return {window,loader:window.CurriculumLoader};
}
test('English en-US is registered but remains unavailable until release approval',async()=>{
 const {window,loader}=createEnglishPilot();
 assert.equal(window.LanguageManager.getLocale('en'),'en-US');
 assert.equal(window.LanguageManager.isSupported('en'),true);
 assert.equal(window.LanguageManager.isAvailable('en'),false);
 assert.equal(loader.resolve('en','A1'),null);
 await assert.rejects(window.LanguageManager.setActiveLanguage('en'),/todavía no está disponible/);
});
test('English A1 manifest exposes the authored U1-U18 blocks',async()=>{
 const {loader}=createEnglishPilot();
 const curriculum=await loader.loadUnits('en','A1',[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]);
 assert.equal(curriculum.language,'en');
 assert.equal(curriculum.totalUnits,32);
 assert.deepEqual(Array.from(curriculum.units,u=>u.unitNumber),[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]);
});
test('each English A1 unit has five explicit lessons, 22 new words and 20 supported exercises',async()=>{
 const {loader}=createEnglishPilot();
 const {units}=await loader.loadUnits('en','A1',[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]);
 for(const unit of units){
  assert.equal(unit.lessons.length,5,unit.id);
  assert.equal(unit.vocab.length,22,unit.id);
  assert.equal(unit.exercises.length,10,unit.id);
  assert.equal(unit.lessons.reduce((n,lesson)=>n+lesson.exercises.length,0),10,unit.id);
  assert.equal(new Set(unit.vocab.map(word=>word.id)).size,22,unit.id);
  for(const word of unit.vocab){
   assert.equal(word.verification.status,'not_checked');
   assert.deepEqual(Array.from(word.verification.sources),[]);
   assert.ok(word.target&&word.esp&&word.ex&&word.exEsp);
  }
  const ids=new Set(units.flatMap(item=>item.vocab.map(word=>word.id)));
  for(const lesson of unit.lessons){
   assert.ok(lesson.title&&lesson.objective&&lesson.grammar);
   assert.equal(lesson.exercises.length,2);
   for(const id of [...lesson.vocabIds,...lesson.reviewVocabIds]) assert.ok(ids.has(id),unit.id+' invalid reference '+id);
   for(const exercise of lesson.exercises) assert.ok(['mc','order'].includes(exercise.type));
  }
  for(const exercise of unit.exercises) assert.ok(['mc','order'].includes(exercise.type));
 }
});
test('English A1 curriculum uses the established vocabulary shape without changing storage contracts',async()=>{
 const {loader}=createEnglishPilot();
 const {units}=await loader.loadUnits('en','A1',[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]);
 for(const word of units.flatMap(unit=>unit.vocab)){
  assert.deepEqual(Object.keys(word).sort(),['ex','exEsp','esp','id','target','verification'].sort());
 }
});
test('English A1 vocabulary introduces no duplicate targets across U1-U12',async()=>{
 const {loader}=createEnglishPilot();
 const {units}=await loader.loadUnits('en','A1',[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]);
 const seen=new Set();
 for(const word of units.flatMap(unit=>unit.vocab)){
  const key=word.target.toLocaleLowerCase();
  assert.equal(seen.has(key),false,'duplicate vocabulary target: '+word.target);
  seen.add(key);
 }
});

## 2026-11-26 — Inglés A1 U19–U24 en PR apilada
- Rama feat/en-us-a1-u19-u24 y PR prevista U19–U24: gustos/pasatiempos; deseos y planes; preguntas WH de seguimiento; presente continuo; ropa/clima; lugares de ciudad.
- 6 unidades, 5 lecciones, 22 términos nuevos y 20 ejercicios por unidad. Manifiesto y pruebas amplían inventario a U1–U24; mantener en unavailable/«Próximamente».
- Esta PR depende de #893 → #892 → #891. Retargetear a main y repetir CI solo después de integrar manualmente las anteriores; no fusionar sin aprobación expresa.
- Vocabulario not_checked; sin POS/audio ni cambios a IndexedDB v1, backup JSON v3 u otros idiomas. Auditoría estática de los cuatro bloques: 528 entradas en U1–U24 y 0 targets duplicados.

## 2026-11-26 — Inglés A1 U25–U30 en PR apilada
- Rama feat/en-us-a1-u25-u30 y PR prevista U25–U30: indicaciones; dinero/compras; some/any y contables/incontables; cantidades; restaurante; U30 repaso integrador sin vocabulario nuevo.
- U25–U29 tienen 22 entradas nuevas cada una; U30 tiene 0 y recicla IDs anteriores. Cada unidad mantiene 5 lecciones y 20 ejercicios. Manifiesto y prueba estructural amplían inventario hasta U1–U30.
- Esta PR depende de #894 → #893 → #892 → #891. Integrar manualmente en orden, retargetear a main y repetir CI; no fusionar sin aprobación expresa.
- Mantener inglés unavailable/«Próximamente», vocabulario not_checked, sin POS/audio ni cambios a IndexedDB v1, backup JSON v3 u otros idiomas.
