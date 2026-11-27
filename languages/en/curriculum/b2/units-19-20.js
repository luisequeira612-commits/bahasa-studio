(function(root){
'use strict';
const rows=[
["even if","incluso si","Even if the offer is attractive, we should read the contract carefully.","Incluso si la oferta es atractiva, deberíamos leer el contrato con cuidado."],
["whether or not","tanto si... como si no","Whether or not you agree, the decision has been made.","Tanto si estás de acuerdo como si no, la decisión ya está tomada."],
["regardless of","independientemente de","The policy applies regardless of age or experience.","La política se aplica independientemente de la edad o la experiencia."],
["no matter what","pase lo que pase","No matter what happens, keep a copy of the documents.","Pase lo que pase, guarda una copia de los documentos."],
["unless","a menos que","We won't proceed unless the figures are verified.","No procederemos a menos que se verifiquen las cifras."],
["if that is not the case","si ese no es el caso","Please reply today; if that is not the case, we may miss the deadline.","Responde hoy; si ese no es el caso, podríamos incumplir el plazo."],
["even so","aun así","The route was difficult. Even so, they reached the summit.","La ruta era difícil. Aun así, llegaron a la cima."],
["nevertheless","sin embargo / no obstante","The evidence was limited; nevertheless, the panel reached a decision.","Las pruebas eran limitadas; no obstante, el panel tomó una decisión."],
["nonetheless","aun así / sin embargo","The task was demanding. Nonetheless, everyone completed it.","La tarea era exigente. Aun así, todos la completaron."],
["in any case","en cualquier caso","In any case, we need written confirmation.","En cualquier caso, necesitamos una confirmación por escrito."],
["come what may","pase lo que pase","Come what may, the team intends to finish the work.","Pase lo que pase, el equipo tiene la intención de terminar el trabajo."],
["whatever the outcome","sea cual sea el resultado","Whatever the outcome, we will learn from the process.","Sea cual sea el resultado, aprenderemos del proceso."],
["irrespective of","sin tener en cuenta","The service is available irrespective of location.","El servicio está disponible sin tener en cuenta la ubicación."],
["on the proviso that","con la condición de que","You can leave early on the proviso that your tasks are complete.","Puedes salir temprano con la condición de que hayas terminado tus tareas."],
["so long as","siempre que","The arrangement is acceptable so long as the terms remain clear.","El acuerdo es aceptable siempre que los términos sigan siendo claros."],
["on the understanding that","con el entendimiento de que","We agreed on the understanding that costs would be shared.","Aceptamos con el entendimiento de que los costos serían compartidos."],
["if that is not possible","si eso no es posible","We can meet on Thursday; if that is not possible, Friday would work.","Podemos reunirnos el jueves; si eso no es posible, el viernes serviría."],
["in spite of","a pesar de","In spite of the delay, the project stayed within budget.","A pesar del retraso, el proyecto se mantuvo dentro del presupuesto."],
["despite the fact that","a pesar de que","Despite the fact that demand fell, revenue remained stable.","A pesar de que la demanda cayó, los ingresos se mantuvieron estables."],
["to make provision for","prever / contemplar","The schedule makes provision for unexpected delays.","El calendario contempla retrasos imprevistos."],
["to make allowances for","hacer concesiones por / tener en cuenta","We should make allowances for different levels of experience.","Deberíamos tener en cuenta los distintos niveles de experiencia."],
["under any circumstances","bajo ninguna circunstancia","The data must not be shared under any circumstances.","Los datos no deben compartirse bajo ninguna circunstancia."]
];
const vocab=rows.map((r,i)=>({id:"en_b2_u19_v"+String(i+1).padStart(2,"0"),target:r[0],esp:r[1],ex:r[2],exEsp:r[3],verification:{status:"not_checked",sources:[]}}));
const lessonData=[
["Concesión hipotética","Reconoce que una condición no cambia necesariamente el resultado.","Even if introduce una condición que no altera la conclusión; whether or not presenta dos posibilidades equivalentes.",[0,1,2,3],"Even if the offer is attractive, we should read the contract carefully."],
["Condiciones y excepciones","Expresa condiciones necesarias y alternativas posibles.","Unless equivale a if...not; otherwise presenta la consecuencia si no se cumple la condición.",[4,5,6,7],"We won't proceed unless the figures are verified."],
["Conectores concesivos","Mantén el argumento pese a una dificultad o evidencia contraria.","Even so, nevertheless y nonetheless conectan ideas contrastivas; no sustituyen una conjunción subordinante.",[8,9,10,11],"The evidence was limited; nevertheless, the panel reached a decision."],
["Condiciones sin excepciones","Formula reglas que se mantienen sea cual sea la circunstancia.","Come what may, whatever the outcome e irrespective of refuerzan la independencia respecto de una condición.",[12,13,14,15],"Whatever the outcome, we will learn from the process."],
["Concesión y previsión de alternativas","Integra condiciones, concesiones y planes alternativos en contextos formales.","On the understanding that y failing that delimit acuerdos y alternativas; in spite of va seguido de nombre o -ing.",[16,17,18,19,20,21],"We agreed on the understanding that costs would be shared."]
];
const mc=(w,opts)=>{const correct=opts[0];const match=String(w.id).match(/v(\d+)$/);const offset=match?Number(match[1])%opts.length:1;const options=opts.slice(offset).concat(opts.slice(0,offset));return {vocabId:w.id,type:"mc",prompt:"¿Qué significa «"+w.target+"»?",options,answer:options.indexOf(correct),explanation:"Selecciona la equivalencia que conserva el matiz de concesión o condición."};};
const order=(w,s)=>{const correctOrder=s.replace(/[.,!?;:]/g,"").trim().split(/\s+/).filter(Boolean);let words=correctOrder.length>1?correctOrder.slice(1).concat(correctOrder.slice(0,1)):correctOrder.slice();if(words.join(" ")===correctOrder.join(" "))words=correctOrder.slice().reverse();return {vocabId:w.id,type:"order",prompt:"Ordena la frase.",words,correctOrder,explanation:"Reconstruye la frase y comprueba cómo se relacionan las ideas."};};
const lessons=lessonData.map(l=>({title:l[0],objective:l[1],grammar:l[2],vocabIds:l[3].map(i=>vocab[i].id),reviewVocabIds:[],exercises:[mc(vocab[l[3][0]],[vocab[l[3][0]].esp,vocab[(l[3][0]+7)%22].esp,vocab[(l[3][0]+14)%22].esp]),order(vocab[l[3][1]],l[4])]}));
const bank=["Whether or not you agree, the decision has been made.","Please reply today; otherwise, we may miss the deadline.","The task was demanding. Nonetheless, everyone completed it.","The service is available irrespective of location.","We can meet on Thursday; failing that, Friday would work."];
const exercises=[];for(let i=0;i<5;i++)exercises.push(mc(vocab[i],[vocab[i].esp,vocab[(i+8)%22].esp,vocab[(i+15)%22].esp]));for(let i=0;i<5;i++)exercises.push(order(vocab[i+5],bank[i]));
const unit={unitNumber:19,id:"en_b2_u19",title:"Unidad 19: Concesión hipotética y alternativas",desc:"Expresa condiciones, concesiones y alternativas sin perder precisión sobre qué circunstancias cambian o no cambian una conclusión.",grammar:"Even if, whether or not, unless, otherwise, regardless of, no matter what, provided that y conectores concesivos.",trap:{title:"Even if frente a even though",detail:"Even if presenta una condición hipotética o abierta: Even if it rains, we'll go. Even though presenta un hecho real: Even though it rained, we went."},vocab,lessons,exercises};
const reviewV=[
["en_b2_u11_v01","must be","debe de ser","The lights are on, so someone must be home."],
["en_b2_u12_v01","should have","debería haber","You should have checked the figures before sending the report."],
["en_b2_u13_v07","don't have to","no tener que","You don't have to print the document."],
["en_b2_u14_v01","likely to","probable que","The new policy is likely to reduce costs."],
["en_b2_u15_v01","if I had known","si lo hubiera sabido","If I had known about the change, I would be better prepared now."],
["en_b2_u16_v01","Had I known","si lo hubiera sabido","Had I known the risks, I would have acted differently."],
["en_b2_u17_v01","I wish I knew","ojalá supiera","I wish I knew what they were planning."],
["en_b2_u18_v01","as if","como si","He talks as if he knew everything."],
["en_b2_u19_v01","even if","incluso si","Even if the offer is attractive, we should read the contract carefully."]
];
const reviewLessons=[
["Deducción y crítica","Recupera cómo inferir y evaluar decisiones pasadas.","Must/might/can't para deducción; should have y perfect modals para retrospectiva.",[0,1],"The lights are on, so someone must be home."],
["Obligación y probabilidad","Distingue obligación, permiso y expectativa.","Don't have to no equivale a mustn't; likely to introduce probabilidad.",[2,3],"The new policy is likely to reduce costs."],
["Condiciones mixtas","Relaciona condiciones irreales pasadas con resultados presentes.","If + past perfect, would + infinitive; identifica el tiempo de cada consecuencia.",[4,5],"If I had known about the change, I would be better prepared now."],
["Inversión y deseos","Recupera inversión condicional y estructuras de deseo.","Had I known equivale a If I had known; wish + past simple expresa deseo presente.",[5,6],"I wish I knew what they were planning."],
["Hipótesis y concesión","Integra unreal past, as if y concesión hipotética.","As if + past simple para distancia; even if presenta condición hipotética.",[7,8],"Even if the offer is attractive, we should read the contract carefully."]
];
const reviewObjects=reviewLessons.map((l,i)=>({title:l[0],objective:l[1],grammar:l[2],vocabIds:[],reviewVocabIds:l[3].map(n=>reviewV[n][0]),exercises:[{vocabId:reviewV[l[3][0]][0],type:"mc",prompt:"Repasa «"+reviewV[l[3][0]][1]+"».",options:[reviewV[l[3][0]][2],"una obligación legal","una concesión de resultado"],answer:0,explanation:"Recuperación de vocabulario de U11–U19."},order({id:reviewV[l[3][Math.min(1,l[3].length-1)]][0]},l[4])]}));
const reviewBank=["The lights are on, so someone must be home.","You don't have to print the document.","Had I known the risks, I would have acted differently.","He talks as if he knew everything.","Even if the offer is attractive, we should read the contract carefully."];
const reviewExercises=reviewV.slice(0,5).map((v,i)=>({vocabId:v[0],type:"mc",prompt:"Repasa «"+v[1]+"».",options:[v[2],reviewV[(i+7)%reviewV.length][2],reviewV[(i+8)%reviewV.length][2]],answer:0,explanation:"Actividad de recuperación del bloque de modalidad e hipótesis."}));
for(let i=0;i<5;i++)reviewExercises.push(order({id:reviewV[i+4][0]},reviewBank[i]));
const review={unitNumber:20,id:"en_b2_u20",title:"Unidad 20: Repaso II — modalidad e hipótesis",desc:"Consolida U11–U19. No introduce vocabulario nuevo.",grammar:"Repaso integrado de deducción, modales perfectos, obligación, probabilidad, condicionales mixtos, inversión, wish, unreal past y concesión hipotética.",trap:{title:"Elegir el patrón según la intención",detail:"Distingue certeza, posibilidad, obligación, arrepentimiento y condición; una forma modal parecida puede cambiar mucho el significado."},vocab:[],lessons:reviewObjects,exercises:reviewExercises};
root.GUARDI_CURRICULUM_BLOCKS=root.GUARDI_CURRICULUM_BLOCKS||{};root.GUARDI_CURRICULUM_BLOCKS.en=root.GUARDI_CURRICULUM_BLOCKS.en||{};root.GUARDI_CURRICULUM_BLOCKS.en.B2=root.GUARDI_CURRICULUM_BLOCKS.en.B2||{};
for(const [index,exercise] of [...(review.exercises||[]),...(review.lessons||[]).flatMap(lesson=>lesson.exercises||[])].entries()){if(exercise.type==="mc"&&Array.isArray(exercise.options)&&exercise.options.length>1){const suffix=Number(String(exercise.vocabId||"").match(/v(\d+)$/)?.[1]||1);const offset=(suffix+index)%exercise.options.length;exercise.options=exercise.options.slice(offset).concat(exercise.options.slice(0,offset));exercise.answer=(exercise.options.length-offset)%exercise.options.length;}}root.GUARDI_CURRICULUM_BLOCKS.en.B2["19-20"]={units:[unit,review]};
})(typeof window!=="undefined"?window:globalThis);
