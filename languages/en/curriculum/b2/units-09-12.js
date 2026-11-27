(function(root){
'use strict';
const rows=[
["what matters most is","lo que más importa es","What matters most is how the evidence is interpreted.","Lo que más importa es cómo se interpreta la evidencia."],
["it is the timing that","es el momento lo que","It is the timing that makes the decision difficult.","Es el momento lo que hace difícil la decisión."],
["the main reason why","la razón principal por la que","The main reason why sales fell was the price increase.","La razón principal por la que cayeron las ventas fue el aumento de precio."],
["not until","no fue hasta que","Not until the final stage did we notice the error.","No fue hasta la etapa final que notamos el error."],
["only after","solo después de","Only after the review did the team understand the risk.","Solo después de la revisión entendió el equipo el riesgo."],
["little did","poco imaginaba","Little did we know that the figures were incomplete.","Poco imaginábamos que las cifras estaban incompletas."],
["for the first time","por primera vez","For the first time, the results have exceeded expectations.","Por primera vez, los resultados han superado las expectativas."],
["ever since","desde entonces","Ever since the merger, the company has operated differently.","Desde la fusión, la empresa ha operado de manera diferente."],
["time and again","una y otra vez","We have explained the procedure time and again.","Hemos explicado el procedimiento una y otra vez."],
["to this day","hasta el día de hoy","To this day, nobody has explained the discrepancy.","Hasta el día de hoy, nadie ha explicado la discrepancia."],
["not once","ni una sola vez","Not once did he mention the missing documents.","Ni una sola vez mencionó los documentos que faltaban."],
["no longer","ya no","The old system is no longer meeting our needs.","El sistema antiguo ya no satisface nuestras necesidades."],
["all along","desde el principio","She had known the answer all along.","Ella había sabido la respuesta desde el principio."],
["for much of the time","durante gran parte del tiempo","For much of the time, the team had been working remotely.","Durante gran parte del tiempo, el equipo había estado trabajando a distancia."],
["as soon as","tan pronto como","As soon as the figures had been checked, we shared them.","Tan pronto como se revisaron las cifras, las compartimos."],
["the moment","en cuanto","The moment I saw the results, I knew something was wrong.","En cuanto vi los resultados, supe que algo iba mal."],
["hardly had","apenas había","Hardly had we started when the power went out.","Apenas habíamos comenzado cuando se fue la electricidad."],
["no sooner had","apenas había / no bien","No sooner had the meeting begun than the alarm rang.","Apenas había comenzado la reunión cuando sonó la alarma."],
["at no point","en ningún momento","At no point had anyone warned us about the change.","En ningún momento nos habían advertido del cambio."],
["through no fault of","sin que fuera culpa de","Through no fault of her own, she missed the deadline.","Sin que fuera culpa suya, no cumplió el plazo."],
["far from","lejos de","Far from solving the issue, the update made it worse.","Lejos de resolver el problema, la actualización lo empeoró."],
["much as","por mucho que","Much as I respect the decision, I disagree with it.","Por mucho que respete la decisión, no estoy de acuerdo con ella."]
];
const vocab=rows.map((r,i)=>({id:"en_b2_u9_v"+String(i+1).padStart(2,"0"),target:r[0],esp:r[1],ex:r[2],exEsp:r[3],verification:{status:"not_checked",sources:[]}}));
const lessonData=[
["Énfasis con estructuras cleft","Destaca la información nueva o contrastiva sin alterar el significado básico.","It-cleft: It is/was + foco + that/who. What-cleft: What + clause + be + foco.",[0,1,2,3],"It is the timing that makes the decision difficult."],
["Inversión tras expresiones negativas","Da énfasis formal a límites temporales y hechos inesperados.","Not until, only after y little did pueden exigir inversión auxiliar-sujeto en la cláusula principal.",[4,5,6,7],"Not until the final stage did we notice the error."],
["Frecuencia y continuidad enfáticas","Refuerza que una situación se repite o continúa hasta el presente.","Time and again, ever since y to this day aportan duración o repetición; el tiempo verbal depende del marco temporal.",[8,9,10,11],"To this day, nobody has explained the discrepancy."],
["Secuencia e inmediatez","Organiza acciones muy próximas en relatos y explicaciones.","Hardly had...when y no sooner had...than usan inversión y past perfect para secuencias inmediatas.",[12,13,14,15],"Hardly had we started when the power went out."],
["Contraste y evaluación","Matiza una conclusión y destaca qué no ocurrió o qué empeoró.","At no point y far from crean énfasis negativo; much as introduce concesión.",[16,17,18,19,20,21],"Far from solving the issue, the update made it worse."]
];
const mc=(w,opts)=>{const correct=opts[0];const match=String(w.id).match(/v(\d+)$/);const offset=match?Number(match[1])%opts.length:1;const options=opts.slice(offset).concat(opts.slice(0,offset));return {vocabId:w.id,type:"mc",prompt:"¿Qué significa «"+w.target+"»?",options,answer:options.indexOf(correct),explanation:"Selecciona la equivalencia adecuada en este contexto."};};
const order=(w,s)=>{const correctOrder=s.replace(/[.,!?;:]/g,"").trim().split(/\s+/).filter(Boolean);let words=correctOrder.length>1?correctOrder.slice(1).concat(correctOrder.slice(0,1)):correctOrder.slice();if(words.join(" ")===correctOrder.join(" "))words=correctOrder.slice().reverse();return {vocabId:w.id,type:"order",prompt:"Ordena la frase.",words,correctOrder,explanation:"Reconstruye la frase y observa el énfasis."};};
const lessons=lessonData.map(l=>({title:l[0],objective:l[1],grammar:l[2],vocabIds:l[3].map(i=>vocab[i].id),reviewVocabIds:[],exercises:[mc(vocab[l[3][0]],[vocab[l[3][0]].esp,vocab[(l[3][0]+7)%22].esp,vocab[(l[3][0]+14)%22].esp]),order(vocab[l[3][1]],l[4])]}));
const bank=["What matters most is how the evidence is interpreted.","Only after the review did the team understand the risk.","We have explained the procedure time and again.","No sooner had the meeting begun than the alarm rang.","Far from solving the issue, the update made it worse."];
const exercises=[];for(let i=0;i<5;i++)exercises.push(mc(vocab[i],[vocab[i].esp,vocab[(i+8)%22].esp,vocab[(i+15)%22].esp]));for(let i=0;i<5;i++)exercises.push(order(vocab[i+5],bank[i]));
const unit={unitNumber:9,id:"en_b2_u9",title:"Unidad 9: Énfasis mediante tiempos y aspecto",desc:"Usa estructuras de énfasis, inversión y expresiones temporales para controlar el foco informativo y la perspectiva en narraciones y argumentos.",grammar:"Cleft sentences, inversión con expresiones negativas y temporales, present perfect para continuidad y past perfect para anterioridad.",trap:{title:"Énfasis sin perder la estructura",detail:"Not until the final stage did we notice the error. La inversión aparece en la cláusula principal después de not until; no inviertas la subordinada temporal."},vocab,lessons,exercises};
const block={units:[unit]};
root.GUARDI_CURRICULUM_BLOCKS=root.GUARDI_CURRICULUM_BLOCKS||{};root.GUARDI_CURRICULUM_BLOCKS.en=root.GUARDI_CURRICULUM_BLOCKS.en||{};root.GUARDI_CURRICULUM_BLOCKS.en.B2=root.GUARDI_CURRICULUM_BLOCKS.en.B2||{};
root.GUARDI_CURRICULUM_BLOCKS.en.B2["09-12"]=block;
const reviewVocab=[
["en_b2_u1_v01","have a track record","tener una trayectoria demostrable","The team has a track record of delivering projects on time."],
["en_b2_u2_v05","to have been waiting","haber estado esperando","They had been waiting for over an hour before the doors opened."],
["en_b2_u3_v04","to come to light","salir a la luz","New evidence came to light during the inquiry."],
["en_b2_u4_v01","by then","para entonces","By then, the team will have completed the first stage."],
["en_b2_u5_v01","was going to","iba a","I was going to apply, but the position closed."],
["en_b2_u6_v03","to admit that","admitir que","She admitted that she had made a mistake."],
["en_b2_u7_v05","used to","solía","We used to meet every Friday."],
["en_b2_u8_v02","to be thinking about","estar considerando","We're thinking about moving closer to work."],
["en_b2_u9_v04","not until","no fue hasta que","Not until the final stage did we notice the error."]
];
const reviewLessons=[
["Experiencias y resultados","Recupera formas para conectar resultados previos con el presente.","Contrasta present perfect simple y continuous.",[0,1],"The team has a track record of delivering projects on time."],
["Antecedentes y duración","Integra past perfect simple y continuous para explicar causas y duración.","Distingue resultado completado de actividad previa prolongada.",[1,2],"They had been waiting for over an hour before the doors opened."],
["Narración y proyección","Organiza acontecimientos y expectativas desde distintos puntos de referencia.","Combina tiempos narrativos, futuro perfecto y futuro en el pasado.",[2,3],"By then, the team will have completed the first stage."],
["Discurso reportado y aspecto","Recupera cómo atribuir ideas y describir hábitos o procesos mentales.","Usa backshift cuando cambia el punto de referencia; contrasta estado y actividad.",[4,5,6,7],"She admitted that she had made a mistake."],
["Énfasis y síntesis","Integra estructuras de énfasis y selección verbal en un texto breve.","Elige tiempo, aspecto e inversión según la intención comunicativa.",[7,8],"Not until the final stage did we notice the error."]
];
const reviewObjects=reviewLessons.map((l,i)=>({title:l[0],objective:l[1],grammar:l[2],vocabIds:[],reviewVocabIds:l[3].map(n=>reviewVocab[n][0]),exercises:[{vocabId:reviewVocab[l[3][0]][0],type:"mc",prompt:"Repasa «"+reviewVocab[l[3][0]][1]+"».",options:[reviewVocab[l[3][0]][2],"tener una obligación formal","retrasarse respecto al plazo"],answer:0,explanation:"Actividad de repaso: recupera el significado en contexto."},order({id:reviewVocab[l[3][Math.min(1,l[3].length-1)]][0]},l[4])]}));
const reviewBank=["The team has a track record of delivering projects on time.","They had been waiting for over an hour before the doors opened.","New evidence came to light during the inquiry.","By then, the team will have completed the first stage.","Not until the final stage did we notice the error."];
const reviewExercises=reviewVocab.slice(0,5).map((v,i)=>({vocabId:v[0],type:"mc",prompt:"Repasa «"+v[1]+"».",options:[v[2],"una posibilidad hipotética","un resultado aún no confirmado"],answer:0,explanation:"Actividad de recuperación de vocabulario de unidades anteriores."}));
for(let i=0;i<5;i++)reviewExercises.push(order({id:reviewVocab[i+4][0]},reviewBank[i]));
const review={unitNumber:10,id:"en_b2_u10",title:"Unidad 10: Repaso I — precisión temporal y narración",desc:"Consolida las unidades B2 U1–U9. No introduce vocabulario nuevo.",grammar:"Repaso integrado de present perfect, past perfect, tiempos narrativos, futuro, discurso indirecto, aspecto y énfasis.",trap:{title:"Seleccionar el tiempo según la perspectiva",detail:"Primero identifica el punto de referencia; después decide si necesitas expresar resultado, duración, anterioridad, hábito o énfasis."},vocab:[],lessons:reviewObjects,exercises:reviewExercises};
for(const [index,exercise] of [...(review.exercises||[]),...(review.lessons||[]).flatMap(lesson=>lesson.exercises||[])].entries()).entries()){if(exercise.type==="mc"&&Array.isArray(exercise.options)&&exercise.options.length>1){const suffix=Number(String(exercise.vocabId||"").match(/v(\d+)$/)?.[1]||1);const offset=(suffix+index)%exercise.options.length;exercise.options=exercise.options.slice(offset).concat(exercise.options.slice(0,offset));exercise.answer=(exercise.options.length-offset)%exercise.options.length;}}block.units.push(review);
})(typeof window!=="undefined"?window:globalThis);
