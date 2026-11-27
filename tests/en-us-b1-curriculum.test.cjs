'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),{test}=require('node:test'),root=path.join(__dirname,'..');
const files=[
'languages/en/curriculum/a1/index.js','languages/en/curriculum/a1/units-01-06.js','languages/en/curriculum/a1/units-07-12.js','languages/en/curriculum/a1/units-13-18.js','languages/en/curriculum/a1/units-19-24.js','languages/en/curriculum/a1/units-25-30.js','languages/en/curriculum/a1/units-31-32.js',
'languages/en/curriculum/a2/index.js','languages/en/curriculum/a2/units-01-06.js','languages/en/curriculum/a2/units-07-10.js','languages/en/curriculum/a2/units-11-14.js','languages/en/curriculum/a2/units-15-18.js','languages/en/curriculum/a2/units-19-22.js','languages/en/curriculum/a2/units-23-26.js','languages/en/curriculum/a2/units-27-30.js','languages/en/curriculum/a2/units-31-34.js','languages/en/curriculum/a2/units-35-38.js','languages/en/curriculum/a2/units-39-40.js',
'languages/en/curriculum/b1/index.js','languages/en/curriculum/b1/units-01-04.js','languages/en/curriculum/b1/units-05-08.js','languages/en/curriculum/b1/units-09-12.js','languages/en/curriculum/b1/units-13-16.js','languages/en/curriculum/b1/units-17-20.js','languages/en/curriculum/b1/units-21-24.js','languages/en/curriculum/b1/units-25-28.js','languages/en/curriculum/b1/units-29-32.js','languages/en/curriculum/b1/units-33-36.js','languages/en/curriculum/b1/units-37-40.js','languages/en/curriculum/b1/units-41-44.js','languages/en/curriculum/b1/units-45-48.js','languages/en/curriculum/b1/units-49-52.js'
];
const sources=Object.fromEntries(files.map(f=>['./'+f,fs.readFileSync(path.join(root,f),'utf8')]));
function loader(){const s={};s.window=s;s.LanguageManager={getLanguage:c=>c==='en'?{curriculum:{A1:'./languages/en/curriculum/a1/index.js',A2:'./languages/en/curriculum/a2/index.js',B1:'./languages/en/curriculum/b1/index.js'}}:null,isSupported:c=>c==='en',isAvailable:()=>false,getLocale:()=>'en-US'};s.document={createElement:()=>({}),head:{appendChild(script){if(!sources[script.src])return script.onerror();vm.runInNewContext(sources[script.src],s);script.onload();}}};vm.runInNewContext(fs.readFileSync(path.join(root,'curriculum-loader.js'),'utf8'),s);return s.CurriculumLoader;}
test('B1 manifest declares 52 planned units and publishes the authored U1-U52 blocks',()=>{const l=loader(),s={};s.window=s;vm.runInNewContext(sources['./languages/en/curriculum/b1/index.js'],s);const m=s.GUARDI_CURRICULUM_MANIFESTS.en.B1;assert.equal(m.totalUnits,52);assert.deepEqual(Array.from(m.publishedUnits),[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52]);assert.equal(l.validateManifest(m).valid,true);});
test('B1 U1-U52 each have five explicit lessons and twenty exercises',async()=>{const {units,totalUnits}=await loader().loadUnits('en','B1',[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52]);assert.equal(totalUnits,52);assert.equal(units.length,52);for(const u of units){assert.equal(u.lessons.length,5,u.id);assert.equal(u.exercises.length,10,u.id);assert.equal(u.lessons.reduce((n,l)=>n+l.exercises.length,0),10,u.id);assert.equal(u.vocab.length,u.unitNumber===10||u.unitNumber===20||u.unitNumber===30||u.unitNumber===40||u.unitNumber===50||u.unitNumber===52?0:22,u.id);assert.ok(u.trap&&u.trap.title&&u.trap.detail,u.id);assert.ok(u.vocab.every(w=>w.verification.status==='not_checked'&&w.verification.sources.length===0),u.id);for(const l of u.lessons)assert.ok(l.title&&l.objective&&l.grammar,u.id);}});
test('B1 U10 is a review unit with zero new vocabulary',async()=>{const {units}=await loader().loadUnits('en','B1',[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52]);const u=units.find(x=>x.unitNumber===10);assert.equal(u.vocab.length,0);assert.equal(u.lessons.length,5);for(const lesson of u.lessons){assert.equal(lesson.vocabIds.length,0);assert.ok(lesson.reviewVocabIds.length>=4);assert.equal(lesson.exercises.length,2);}});
test('B1 U1-U52 add 1,012 unique targets without exact A1/A2 overlap',async()=>{const l=loader(),a1=await l.loadUnits('en','A1',Array.from({length:32},(_,i)=>i+1)),a2=await l.loadUnits('en','A2',Array.from({length:40},(_,i)=>i+1)),b1=await l.loadUnits('en','B1',[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52]);const prior=new Set([...a1.units,...a2.units].flatMap(u=>u.vocab.map(w=>w.target.toLocaleLowerCase('en-US')))),targets=b1.units.flatMap(u=>u.vocab.map(w=>w.target.toLocaleLowerCase('en-US')));assert.equal(targets.length,1012);assert.equal(new Set(targets).size,1012);assert.deepEqual(targets.filter(t=>prior.has(t)),[]);});
test('all B1 lesson and bank exercise references resolve to B1 vocabulary IDs',async()=>{const {units}=await loader().loadUnits('en','B1',[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52]);const ids=new Set(units.flatMap(u=>u.vocab.map(w=>w.id)));for(const u of units){for(const lesson of u.lessons){for(const id of [...lesson.vocabIds,...lesson.reviewVocabIds])assert.ok(ids.has(id),u.id+' missing lesson ref '+id);for(const e of lesson.exercises)assert.ok(ids.has(e.vocabId),u.id+' missing lesson exercise ref '+e.vocabId);}for(const e of u.exercises)assert.ok(ids.has(e.vocabId),u.id+' missing bank exercise ref '+e.vocabId);}});
test('English remains unavailable while B1 is being authored',()=>{const m=fs.readFileSync(path.join(root,'language-manager.js'),'utf8');assert.match(m,/en: Object\.freeze\(\{ code: 'en', locale: 'en-US'[^]*available: false \}\)/);});

test('B1 U20 is a review unit with zero new vocabulary',async()=>{const {units}=await loader().loadUnits('en','B1',[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52]);const u=units.find(x=>x.unitNumber===20);assert.equal(u.vocab.length,0);assert.equal(u.lessons.length,5);for(const lesson of u.lessons){assert.equal(lesson.vocabIds.length,0);assert.ok(lesson.reviewVocabIds.length>=4);assert.equal(lesson.exercises.length,2);}});

test('B1 U30 is a review unit with zero new vocabulary',async()=>{const {units}=await loader().loadUnits('en','B1',[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52]);const u=units.find(x=>x.unitNumber===30);assert.equal(u.vocab.length,0);assert.equal(u.lessons.length,5);for(const lesson of u.lessons){assert.equal(lesson.vocabIds.length,0);assert.ok(lesson.reviewVocabIds.length>=4);assert.equal(lesson.exercises.length,2);}});

test('B1 U40 is Review IV with zero new vocabulary and five review lessons',async()=>{const {units,totalUnits}=await loader().loadUnits('en','B1',[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52]);assert.equal(totalUnits,52);const u=units.find(x=>x.unitNumber===40);assert.equal(u.vocab.length,0);assert.equal(u.lessons.length,5);for(const lesson of u.lessons){assert.equal(lesson.vocabIds.length,0);assert.ok(lesson.reviewVocabIds.length>=4);assert.equal(lesson.exercises.length,2);}});

test('B1 U50 is Review V with zero new vocabulary',async()=>{const {units}=await loader().loadUnits('en','B1',Array.from({length:52},(_,i)=>i+1));const u=units.find(x=>x.unitNumber===50);assert.equal(u.vocab.length,0);assert.equal(u.lessons.length,5);for(const lesson of u.lessons){assert.equal(lesson.vocabIds.length,0);assert.ok(lesson.reviewVocabIds.length>=4);assert.equal(lesson.exercises.length,2);}});
test('B1 U52 is the final check with zero new vocabulary',async()=>{const {units,totalUnits}=await loader().loadUnits('en','B1',Array.from({length:52},(_,i)=>i+1));const u=units.find(x=>x.unitNumber===52);assert.equal(totalUnits,52);assert.equal(u.vocab.length,0);assert.equal(u.lessons.length,5);for(const lesson of u.lessons){assert.equal(lesson.vocabIds.length,0);assert.ok(lesson.reviewVocabIds.length>=4);assert.equal(lesson.exercises.length,2);}});

test('B1 U1-U4 vocabulary examples match their English and Spanish meanings', async () => {
  const { units } = await loader().loadUnits('en', 'B1', Array.from({ length: 52 }, (_, i) => i + 1));
  const expected = [
    [1, 'lifelong', 'He has had a lifelong interest in music.', 'Él ha tenido un interés por la música durante toda su vida.'],
    [1, 'personal growth', 'Travel has contributed to my personal growth.', 'Viajar ha contribuido a mi crecimiento personal.'],
    [2, 'guided tour', 'Have you ever taken a guided tour?', '¿Alguna vez has hecho una visita guiada?'],
    [2, 'connecting flight', 'She has missed her connecting flight twice.', 'Ella ha perdido su vuelo de conexión dos veces.'],
    [2, 'delayed baggage', 'They have reported their delayed baggage.', 'Han reportado su equipaje retrasado.'],
    [3, 'concentrate', "I've been trying to concentrate all morning.", 'He estado intentando concentrarme toda la mañana.'],
    [3, 'productivity', 'Our productivity has been increasing gradually.', 'Nuestra productividad ha ido aumentando gradualmente.'],
    [3, 'take regular breaks', 'We have been taking regular breaks this week.', 'Hemos estado haciendo pausas regulares esta semana.'],
    [3, 'catch up on', "I've been catching up on my emails.", 'He estado poniéndome al día con mis correos.'],
    [4, 'investigation', 'The investigation had begun before dawn.', 'La investigación había comenzado antes del amanecer.'],
    [4, 'by then', 'By then, the rain had stopped.', 'Para entonces, la lluvia ya había parado.'],
    [4, 'turn up', 'The missing document had turned up in a drawer.', 'El documento perdido había aparecido en un cajón.'],
    [4, 'timeline', 'They had reviewed the timeline before the interview.', 'Habían revisado la cronología antes de la entrevista.'],
  ];
  for (const [unitNumber, target, example, translation] of expected) {
    const unit = units.find((item) => item.unitNumber === unitNumber);
    const word = unit?.vocab?.find((item) => item.target === target);
    assert.ok(word, 'expected B1 vocabulary target must exist: U' + unitNumber + ' ' + target);
    assert.equal(word.ex, example, 'English example must match U' + unitNumber + ' ' + target);
    assert.equal(word.exEsp, translation, 'Spanish example must match U' + unitNumber + ' ' + target);
  }
});

test('B1 vocabulary examples retain natural American English and aligned Spanish', async () => {
  const { units } = await loader().loadUnits('en', 'B1', Array.from({ length: 52 }, (_, i) => i + 1));
  const expected = [
    [6, 'ride a bicycle', 'montar en bicicleta', 'I used to ride a bicycle along the river.', 'Solía montar en bicicleta junto al río.'],
    [8, 'retake an exam', 'repetir un examen', 'He had to retake the exam because he missed the original date.', 'Tuvo que repetir el examen porque no pudo presentarse en la fecha original.'],
    [8, 'work experience program', 'programa de experiencia laboral', 'She completed a work experience program during her final semester.', 'Completó un programa de experiencia laboral durante su último semestre.'],
    [11, 'anticipated demand', 'demanda prevista', 'Anticipated demand is expected to rise during the summer.', 'Se espera que la demanda prevista aumente durante el verano.'],
    [11, 'availability window', 'periodo de disponibilidad', "The technician's availability window tomorrow is only two hours.", 'La franja de disponibilidad del técnico mañana será de solo dos horas.'],
    [11, 'target date', 'fecha prevista', 'The target date may change if the supplier is delayed.', 'La fecha prevista podría cambiar si el proveedor se retrasa.'],
    [12, 'conference call', 'llamada grupal de trabajo', 'At noon, I will be joining a conference call with the regional team.', 'Al mediodía, estaré en una llamada grupal con el equipo regional.'],
    [12, 'connection time', 'tiempo de conexión', 'Our connection time in Dallas will be two hours.', 'Nuestro tiempo de conexión en Dallas será de dos horas.'],
    [12, 'boarding area', 'zona de embarque', 'Passengers will be waiting in the boarding area shortly.', 'Los pasajeros estarán esperando pronto en la zona de embarque.'],
    [12, 'on assignment', 'en una asignación de trabajo', 'The reporter will be working on assignment in Chicago next week.', 'El reportero estará cubriendo una asignación en Chicago la próxima semana.'],
    [18, 'the next time', 'la próxima vez que', 'The next time you visit, the gallery will be open.', 'La próxima vez que vengas, la galería estará abierta.'],
    [42, 'so that no one is left out', 'para que nadie quede excluido', 'The instructions were translated so that no one would be left out.', 'Las instrucciones se tradujeron para que nadie quedara excluido.'],
    [43, 'Do you have any idea how much it costs?', '¿Tiene idea de cuánto cuesta?', 'Do you have any idea how much the replacement part costs?', '¿Tiene idea de cuánto cuesta la pieza de repuesto?'],
    [47, 'a successful negotiation', 'una negociación exitosa', 'The negotiation between the two sides was successful.', 'La negociación entre las dos partes fue exitosa.'],
    [49, 'follow up on an action item', 'dar seguimiento a un punto de acción', 'I will follow up on an action item after the meeting.', 'Daré seguimiento a un punto de acción después de la reunión.'],
  ];
  for (const [unitNumber, target, gloss, example, translation] of expected) {
    const unit = units.find((item) => item.unitNumber === unitNumber);
    const word = unit?.vocab?.find((item) => item.target === target);
    assert.ok(word, 'expected B1 vocabulary target must exist: U' + unitNumber + ' ' + target);
    assert.equal(word.esp, gloss, 'Spanish gloss must match U' + unitNumber + ' ' + target);
    assert.equal(word.ex, example, 'English example must match U' + unitNumber + ' ' + target);
    assert.equal(word.exEsp, translation, 'Spanish example must match U' + unitNumber + ' ' + target);
  }
});
