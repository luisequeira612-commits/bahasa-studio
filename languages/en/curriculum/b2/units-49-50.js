(function(root){
'use strict';
const rows=[
["to differentiate between","diferenciar entre","It is important to differentiate between correlation and causation.","Es importante diferenciar entre correlación y causalidad."],
["to be synonymous with","ser sinónimo de","Efficiency is not necessarily synonymous with quality.","La eficiencia no es necesariamente sinónimo de calidad."],
["to use something interchangeably","usar algo indistintamente","These terms should not be used interchangeably.","Estos términos no deberían usarse indistintamente."],
["to be vulnerable to","ser vulnerable a","The system is vulnerable to errors under heavy load.","El sistema es vulnerable a errores con cargas elevadas."],
["to be susceptible to","ser susceptible a","Older devices are more susceptible to failure.","Los dispositivos antiguos son más susceptibles a fallos."],
["to be subject to","estar sujeto a","All applications are subject to review.","Todas las solicitudes están sujetas a revisión."],
["to be inherent in","ser inherente a","Some uncertainty is inherent in the process.","Cierta incertidumbre es inherente al proceso."],
["to be attributable to","ser atribuible a","The improvement is partly attributable to better training.","La mejora es atribuible en parte a una mejor formación."],
["to be indicative of","ser indicativo de","A sudden increase may be indicative of a wider problem.","Un aumento repentino puede ser indicativo de un problema más amplio."],
["to match","coincidir con","The pattern matches previous findings.","El patrón coincide con hallazgos anteriores."],
["to be incompatible with","ser incompatible con","The statement is incompatible with the available evidence.","La afirmación es incompatible con las pruebas disponibles."],
["to be equivalent to","ser equivalente a","The two procedures are not equivalent to each other.","Los dos procedimientos no son equivalentes."],
["to amount to","equivaler a / ascender a","The additional costs amount to nearly ten percent.","Los costos adicionales ascienden a casi el diez por ciento."],
["to fail to meet","no cumplir","The final result failed to meet expectations.","El resultado final no cumplió las expectativas."],
["to surpass expectations","superar las expectativas","The new service surpassed expectations.","El nuevo servicio superó las expectativas."],
["to make a distinction","establecer una distinción","We need to make a clear distinction between the two cases.","Necesitamos establecer una distinción clara entre los dos casos."],
["to avoid ambiguity","evitar la ambigüedad","The instructions were rewritten to avoid ambiguity.","Las instrucciones se reescribieron para evitar la ambigüedad."],
["to be precise","para ser precisos","To be precise, the trial lasted eleven weeks.","Para ser precisos, el ensayo duró once semanas."],
["roughly speaking","a grandes rasgos","Roughly speaking, costs have doubled.","A grandes rasgos, los costos se han duplicado."],
["more precisely","más precisamente / más concretamente","More precisely, the figures are estimates rather than final totals.","Más concretamente, las cifras son estimaciones y no totales definitivos."],
["a subtle difference","una diferencia sutil","There is a subtle difference in meaning between the terms.","Hay una diferencia sutil de significado entre los términos."],
["a misleading impression","una impresión engañosa","The headline creates a misleading impression of the findings.","El titular crea una impresión engañosa de los hallazgos."]
];
const lessonDefs=[
["Distinciones semánticas","Evita tratar palabras relacionadas como equivalentes exactos.","Differentiate between, be synonymous with y use something interchangeably ayudan a explicar diferencias de significado.",[0,1,2,3],"It is important to differentiate between correlation and causation."],
["Condiciones y relaciones","Expresa susceptibilidad, condiciones y relaciones inherentes.","Be susceptible to, be subject to, be inherent in y be attributable to describen condiciones y relaciones; no son intercambiables.",[4,5,6,7],"Older devices are more susceptible to failure."],
["Evidencia y equivalencia","Relaciona observaciones con explicaciones sin exagerar la certeza.","Indicative of, match, incompatible with y equivalent to expresan relaciones distintas; ninguna demuestra por sí sola una causa.",[8,9,10,11],"The statement is incompatible with the available evidence."],
["Grado y evaluación","Compara resultados con expectativas y establece diferencias claras.","Amount to, fail to meet y surpass expectations expresan cantidad y evaluación; make a distinction separa categorías o casos.",[12,13,14,15],"The new service surpassed expectations."],
["Precisión y ambigüedad","Ajusta el nivel de detalle y evita interpretaciones engañosas.","To be precise delimita; roughly speaking resume; subtle difference y misleading impression advierten sobre matices.",[16,17,18,19,20,21],"The headline creates a misleading impression of the findings."]
];
const vocab=rows.map((r,i)=>({id:"en_b2_u49_v"+String(i+1).padStart(2,"0"),target:r[0],esp:r[1],ex:r[2],exEsp:r[3],verification:{status:"not_checked",sources:[]}}));
const mc=(w,opts)=>{const correct=opts[0];const match=String(w.id).match(/v(\d+)$/);const offset=match?Number(match[1])%opts.length:1;const options=opts.slice(offset).concat(opts.slice(0,offset));return {vocabId:w.id,type:"mc",prompt:"¿Qué significa «"+w.target+"»?",options,answer:options.indexOf(correct),explanation:"Elige la opción que conserva el matiz semántico."};};
const order=(w,s)=>{const correctOrder=s.replace(/[.,!?;:]/g,"").trim().split(/\s+/).filter(Boolean);let words=correctOrder.length>1?correctOrder.slice(1).concat(correctOrder.slice(0,1)):correctOrder.slice();if(words.join(" ")===correctOrder.join(" "))words=correctOrder.slice().reverse();return {vocabId:w.id,type:"order",prompt:"Ordena la frase.",words,correctOrder,explanation:"Reconstruye la oración y observa la precisión léxica."};};
const lessons=lessonDefs.map(l=>({title:l[0],objective:l[1],grammar:l[2],vocabIds:l[3].map(i=>vocab[i].id),reviewVocabIds:[],exercises:[mc(vocab[l[3][0]],[vocab[l[3][0]].esp,vocab[(l[3][0]+7)%22].esp,vocab[(l[3][0]+14)%22].esp]),order(vocab[l[3][1]],l[4])]}));
const exercises=[];for(let i=0;i<5;i++)exercises.push(mc(vocab[i],[vocab[i].esp,vocab[(i+8)%22].esp,vocab[(i+15)%22].esp]));
for(let i=0;i<5;i++)exercises.push(order(vocab[i+5],lessonDefs[i][4]));
const unit49={unitNumber:49,id:"en_b2_u49",title:"Unidad 49: Precision in vocabulary — precisión léxica",desc:"Evita falsos equivalentes, vaguedad, redundancia y ambigüedad mediante distinciones semánticas y colocaciones precisas.",grammar:"Near-synonyms, semantic distinctions, lexical precision, collocation and careful qualification.",trap:{title:"Palabras cercanas no siempre intercambiables",detail:"Prone to y susceptible to se parecen, pero no son idénticos en todos los contextos. Consistent with indica compatibilidad, no prueba causalidad. Elige la palabra según la relación exacta."},vocab,lessons,exercises};
const refs=[
["en_b2_u41_v01","to pose a threat","representar una amenaza","The lack of maintenance poses a serious threat to safety."],
["en_b2_u42_v06","to look into","investigar","The department will look into the complaint."],
["en_b2_u43_v05","to comply with","cumplir con","All suppliers must comply with safety regulations."],
["en_b2_u44_v01","reliability","fiabilidad","System reliability is essential for public services."],
["en_b2_u45_v01","cost-effective","rentable","The new system is a cost-effective solution for small teams."],
["en_b2_u46_v01","to get the ball rolling","poner algo en marcha","Let's get the ball rolling with a short introduction."],
["en_b2_u47_v03","to achieve","lograr","The team achieved its main objective."],
["en_b2_u48_v01","to lay the groundwork","sentar las bases","The pilot program laid the groundwork for wider reform."],
["en_b2_u49_v01","to distinguish between","distinguir entre","It is important to distinguish between correlation and causation."]
];
const reviewDefs=[
["Colocaciones y phrasal verbs","Recupera combinaciones naturales y verbos con partícula.","Advanced collocations and phrasal verbs with object placement.",[0,1],"The department will look into the complaint."],
["Preposiciones y formación de palabras","Aplica patrones preposicionales y familias léxicas.","Dependent prepositions, nominalization and derivation.",[2,3],"All suppliers must comply with safety regulations."],
["Connotación e idioms","Distingue valoración y expresiones figuradas frecuentes.","Connotation, evaluative language and useful idioms.",[4,5],"Let's get the ball rolling with a short introduction."],
["Sinónimos y metáforas","Reconoce diferencias semánticas y metáforas convencionales.","Near-synonyms, collocations and figurative language.",[6,7],"The pilot program laid the groundwork for wider reform."],
["Precisión léxica integrada","Evalúa significado, registro y colocación antes de elegir una palabra.","Precision, ambiguity, redundancy and semantic qualification.",[7,8],"It is important to distinguish between correlation and causation."]
];
const reviewLessons=reviewDefs.map(l=>({title:l[0],objective:l[1],grammar:l[2],vocabIds:[],reviewVocabIds:l[3].map(i=>refs[i][0]),exercises:[{vocabId:refs[l[3][0]][0],type:"mc",prompt:"Repasa «"+refs[l[3][0]][1]+"».",options:[refs[l[3][0]][2],refs[(l[3][0]+1)%refs.length][2],refs[(l[3][0]+2)%refs.length][2]],answer:0,explanation:"Recuperación de vocabulario de U41–U49."},(()=>{const correctOrder=l[4].replace(/[.,!?;:]/g,"").trim().split(/\s+/).filter(Boolean);let w=correctOrder.length>1?correctOrder.slice(1).concat(correctOrder.slice(0,1)):correctOrder.slice();if(w.join(" ")===correctOrder.join(" "))w=correctOrder.slice().reverse();return {vocabId:refs[l[3][Math.min(1,l[3].length-1)]][0],type:"order",prompt:"Ordena la frase.",words:w,correctOrder,explanation:"Reconstruye el ejemplo y reconoce el patrón léxico."};})()]}));
const reviewExercises=refs.slice(0,5).map(v=>({vocabId:v[0],type:"mc",prompt:"Repasa «"+v[1]+"».",options:[v[2],refs[(refs.indexOf(v)+1)%refs.length][2],refs[(refs.indexOf(v)+2)%refs.length][2]],answer:0,explanation:"Actividad de recuperación del bloque 5."}));
for(let i=0;i<5;i++){const correctOrder=reviewDefs[i][4].replace(/[.,!?;:]/g,"").trim().split(/\s+/).filter(Boolean);let w=correctOrder.length>1?correctOrder.slice(1).concat(correctOrder.slice(0,1)):correctOrder.slice();if(w.join(" ")===correctOrder.join(" "))w=correctOrder.slice().reverse();reviewExercises.push({vocabId:refs[i+4][0],type:"order",prompt:"Ordena la frase.",words:w,correctOrder,explanation:"Reconstruye la oración de repaso."});}
const unit50={unitNumber:50,id:"en_b2_u50",title:"Unidad 50: Repaso V — léxico, colocaciones y registro",desc:"Consolida U41–U49. No introduce vocabulario nuevo.",grammar:"Repaso integrado de collocations, phrasal verbs, dependent prepositions, word formation, connotation, idioms, near-synonyms, metaphor and precision.",trap:{title:"Precisión antes que complejidad",detail:"La palabra más avanzada no siempre es la más adecuada. Prioriza significado exacto, colocación natural, registro y claridad."},vocab:[],lessons:reviewLessons,exercises:reviewExercises};
root.GUARDI_CURRICULUM_BLOCKS=root.GUARDI_CURRICULUM_BLOCKS||{};root.GUARDI_CURRICULUM_BLOCKS.en=root.GUARDI_CURRICULUM_BLOCKS.en||{};root.GUARDI_CURRICULUM_BLOCKS.en.B2=root.GUARDI_CURRICULUM_BLOCKS.en.B2||{};
for(const [index,exercise] of [...(unit50.exercises||[]),...(unit50.lessons||[]).flatMap(lesson=>lesson.exercises||[])].entries()){if(exercise.type==="mc"&&Array.isArray(exercise.options)&&exercise.options.length>1){const suffix=Number(String(exercise.vocabId||"").match(/v(\d+)$/)?.[1]||1);const offset=(suffix+index)%exercise.options.length;exercise.options=exercise.options.slice(offset).concat(exercise.options.slice(0,offset));exercise.answer=(exercise.options.length-offset)%exercise.options.length;}}root.GUARDI_CURRICULUM_BLOCKS.en.B2["49-50"]={units:[unit49,unit50]};
})(typeof window!=="undefined"?window:globalThis);
