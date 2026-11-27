(function(root){
'use strict';
const rows=[
["to be in a position to","estar en condiciones de","We are now in a position to make a final recommendation.","Ahora estamos en condiciones de hacer una recomendación final."],
["to request that","solicitar que","We request that all visitors sign in at reception.","Solicitamos que todos los visitantes se registren en recepción."],
["to be of the opinion that","ser de la opinión de que","I am of the opinion that further review is necessary.","Considero que se necesita una revisión adicional."],
["to get in touch","ponerse en contacto","Please get in touch if you need further assistance.","Ponte en contacto si necesitas más ayuda."],
["to give someone a heads-up","avisar a alguien","Just giving you a heads-up that the meeting may run late.","Solo te aviso que la reunión podría alargarse."],
["to sort something out","resolver algo","We'll sort the details out before Friday.","Resolveremos los detalles antes del viernes."],
["to be delighted to","estar encantado de","We would be delighted to discuss the proposal further.","Estaríamos encantados de seguir hablando de la propuesta."],
["to be happy to","estar dispuesto a / encantado de","I'd be happy to send you another copy.","Con gusto puedo enviarte otra copia."],
["to require","requerir / exigir","The application requires additional documentation.","La solicitud requiere documentación adicional."],
["to need","necesitar","We need a response by the end of the day.","Necesitamos una respuesta antes de que termine el día."],
["to commence","dar comienzo a","The inspection will commence at 9 a.m.","La inspección dará comienzo a las 9."],
["to start","empezar","The inspection will start at 9 a.m.","La inspección empezará a las 9."],
["to terminate an agreement","dar por terminado un acuerdo","We may need to end the arrangement early.","Cualquiera de las partes puede dar por terminado el acuerdo mediante aviso escrito."],
["to end an arrangement","poner fin a un acuerdo","We may need to end the arrangement early.","Puede que tengamos que poner fin al acuerdo antes de tiempo."],
["to purchase","adquirir / comprar","The department plans to purchase new equipment.","El departamento planea adquirir equipo nuevo."],
["to buy","comprar","We need to buy a replacement cable.","Necesitamos comprar un cable de repuesto."],
["to apologize for","disculparse por","We apologize for any inconvenience caused.","Nos disculpamos por cualquier inconveniente ocasionado."],
["sorry about","perdón por","Sorry about the delay; the system was down.","Perdón por el retraso; el sistema estaba caído."],
["to inform someone that","informar a alguien de que","We are writing to inform you that your request has been approved.","Le escribimos para informarle que su solicitud ha sido aprobada."],
["just to let you know","solo para avisarte","Just to let you know, the room has changed.","Solo para avisarte, la sala ha cambiado."],
["to inquire about","consultar acerca de","Sorry about the delay; the system was down.","Le escribo para consultar acerca de los puestos disponibles."],
["to ask about","preguntar por","I wanted to ask about the schedule for next week.","Quería preguntar por el horario de la próxima semana."]
];
const lessonDefs=[
["Formalidad y cortesía","Selecciona expresiones adecuadas para solicitudes y recomendaciones formales.","Be in a position to, request that y be of the opinion that aparecen en contextos profesionales y escritos.",[0,1,2,3],"We request that all visitors sign in at reception."],
["Registro informal y conversación","Reconoce expresiones naturales para coordinar y avisar en situaciones cotidianas.","Give someone a heads-up, sort something out, be delighted to y be happy to son expresiones conversacionales y corteses.",[4,5,6,7],"We'll sort the details out before Friday."],
["Alternativas formales y neutras","Compara verbos formales con equivalentes más directos y neutrales.","Require frente a need; commence frente a start. La forma formal no siempre es más clara.",[8,9,10,11],"We need a response by the end of the day."],
["Acuerdos y disculpas","Ajusta el registro al comunicar cambios, terminaciones y disculpas.","Terminate an agreement y end an arrangement expresan el cierre de un acuerdo; purchase y buy contrastan formalidad y neutralidad.",[12,13,14,15],"We may need to end the arrangement early."],
["Correspondencia y consultas","Redacta avisos, consultas y mensajes con el grado de formalidad apropiado.","Apologize for y sorry about contrastan formalidad; inform someone that, just to let you know, inquire about y ask about ajustan el tono de avisos y consultas.",[16,17,18,19,20,21],"Sorry about the delay; the system was down."]
];
const vocab=rows.map((r,i)=>({id:"en_b2_u39_v"+String(i+1).padStart(2,"0"),target:r[0],esp:r[1],ex:r[2],exEsp:r[3],verification:{status:"not_checked",sources:[]}}));
const mc=(w,opts)=>{const correct=opts[0];const match=String(w.id).match(/v(\d+)$/);const offset=match?Number(match[1])%opts.length:1;const options=opts.slice(offset).concat(opts.slice(0,offset));return {vocabId:w.id,type:"mc",prompt:"¿Qué significa «"+w.target+"»?",options,answer:options.indexOf(correct),explanation:"Elige la opción que corresponde al registro y al contexto."};};
const order=(w,s)=>{const correctOrder=s.replace(/[.,!?;:]/g,"").trim().split(/\s+/).filter(Boolean);let words=correctOrder.length>1?correctOrder.slice(1).concat(correctOrder.slice(0,1)):correctOrder.slice();if(words.join(" ")===correctOrder.join(" "))words=correctOrder.slice().reverse();return {vocabId:w.id,type:"order",prompt:"Ordena la frase.",words,correctOrder,explanation:"Reconstruye la frase y observa el nivel de formalidad."};};
const lessons=lessonDefs.map(l=>({title:l[0],objective:l[1],grammar:l[2],vocabIds:l[3].map(i=>vocab[i].id),reviewVocabIds:[],exercises:[mc(vocab[l[3][0]],[vocab[l[3][0]].esp,vocab[(l[3][0]+7)%22].esp,vocab[(l[3][0]+14)%22].esp]),order(vocab[l[3][1]],l[4])]}));
const exercises=[];for(let i=0;i<5;i++)exercises.push(mc(vocab[i],[vocab[i].esp,vocab[(i+8)%22].esp,vocab[(i+15)%22].esp]));
for(let i=0;i<5;i++)exercises.push(order(vocab[lessonDefs[i][3][1]],lessonDefs[i][4]));
const unit39={unitNumber:39,id:"en_b2_u39",title:"Unidad 39: Register shifts — cambios de registro",desc:"Adapta el tono y la elección léxica a situaciones formales, neutrales e informales sin perder naturalidad.",grammar:"Formal, neutral and informal register; lexical alternatives, correspondence frames and pragmatic appropriateness.",trap:{title:"Formal no siempre significa mejor",detail:"Commence y purchase son más formales que start y buy, pero el registro debe responder al contexto. Evita expresiones demasiado ceremoniosas en mensajes cotidianos."},vocab,lessons,exercises};
const refs=[
["en_b2_u31_v01","conversely","por el contrario","The first approach reduces costs; conversely, the second improves flexibility."],
["en_b2_u32_v01","the evidence suggests","las pruebas sugieren","The evidence suggests that the policy has had a positive effect."],
["en_b2_u33_v01","highly effective","muy eficaz","The new procedure has proved highly effective."],
["en_b2_u34_v01","the report argues that","el informe sostiene que","The report argues that public transport needs further investment."],
["en_b2_u35_v01","to put forward an argument","presentar un argumento","The researchers put forward an argument for stricter standards."],
["en_b2_u36_v01","to acknowledge an objection","reconocer una objeción","We should acknowledge the objection before responding."],
["en_b2_u37_v01","to pick up on that","retomar ese punto","I'd like to pick up on that point about costs."],
["en_b2_u38_v01","I was wondering if","me preguntaba si","I was wondering if you could send the details today."],
["en_b2_u39_v01","to be in a position to","estar en condiciones de","We are now in a position to make a final recommendation."]
];
const reviewDefs=[
["Cohesión y conexión lógica","Recupera conectores de contraste, consecuencia y reformulación.","Conjunctive adverbs, concession, result and topic organization.",[0,1],"The evidence suggests that the policy has had a positive effect."],
["Cautela y fuerza expresiva","Ajusta certeza e intensidad a la evidencia disponible.","Hedging, cautious claims, boosters and downtoners.",[2,3],"The report argues that public transport needs further investment."],
["Argumentación y refutación","Evalúa afirmaciones, evidencia y objeciones.","Claims, reasons, evidence, concession, rebuttal and qualification.",[4,5],"We should acknowledge the objection before responding."],
["Interacción y pragmática","Gestiona turnos, cortesía y significado implícito.","Discourse markers, indirect requests and context-dependent meaning.",[6,7],"I was wondering if you could send the details today."],
["Registro y síntesis","Integra tono, claridad y propósito en comunicación profesional.","Register shifts, source attribution and balanced synthesis.",[7,8],"We are now in a position to make a final recommendation."]
];
const reviewLessons=reviewDefs.map(l=>({title:l[0],objective:l[1],grammar:l[2],vocabIds:[],reviewVocabIds:l[3].map(i=>refs[i][0]),exercises:[{vocabId:refs[l[3][0]][0],type:"mc",prompt:"Repasa «"+refs[l[3][0]][1]+"».",options:[refs[l[3][0]][2],refs[(l[3][0]+1)%refs.length][2],refs[(l[3][0]+2)%refs.length][2]],answer:0,explanation:"Recuperación del bloque de cohesión, argumentación y pragmática."},(()=>{const correctOrder=l[4].replace(/[.,!?;:]/g,"").trim().split(/\s+/).filter(Boolean);let w=correctOrder.length>1?correctOrder.slice(1).concat(correctOrder.slice(0,1)):correctOrder.slice();if(w.join(" ")===correctOrder.join(" "))w=correctOrder.slice().reverse();return {vocabId:refs[l[3][Math.min(1,l[3].length-1)]][0],type:"order",prompt:"Ordena la frase.",words:w,correctOrder,explanation:"Reconstruye el patrón y reconoce su propósito comunicativo."};})()]}));
const reviewExercises=refs.slice(0,5).map(v=>({vocabId:v[0],type:"mc",prompt:"Repasa «"+v[1]+"».",options:[v[2],refs[(refs.indexOf(v)+1)%refs.length][2],refs[(refs.indexOf(v)+2)%refs.length][2]],answer:0,explanation:"Actividad de recuperación del bloque 4."}));
const reviewBank=refs.slice(4,9).map(v=>v[3]);
for(let i=0;i<5;i++){const correctOrder=reviewBank[i].replace(/[.,!?;:]/g,"").trim().split(/\s+/).filter(Boolean);let w=correctOrder.length>1?correctOrder.slice(1).concat(correctOrder.slice(0,1)):correctOrder.slice();if(w.join(" ")===correctOrder.join(" "))w=correctOrder.slice().reverse();reviewExercises.push({vocabId:refs[[0,1,5,7,8][i]][0],type:"order",prompt:"Ordena la frase.",words:w,correctOrder,explanation:"Reconstruye la oración de repaso."});}
const unit40={unitNumber:40,id:"en_b2_u40",title:"Unidad 40: Repaso IV — cohesión y discurso persuasivo",desc:"Consolida U31–U39. No introduce vocabulario nuevo.",grammar:"Repaso de linking devices, hedging, intensification, reporting ideas, argument structure, refutation, discourse markers, implicature and register.",trap:{title:"La forma debe servir al propósito",detail:"Elige conectores, matizadores y expresiones según la relación lógica, la evidencia, el interlocutor y el registro. No confundas una opinión cautelosa con una afirmación demostrada."},vocab:[],lessons:reviewLessons,exercises:reviewExercises};
root.GUARDI_CURRICULUM_BLOCKS=root.GUARDI_CURRICULUM_BLOCKS||{};root.GUARDI_CURRICULUM_BLOCKS.en=root.GUARDI_CURRICULUM_BLOCKS.en||{};root.GUARDI_CURRICULUM_BLOCKS.en.B2=root.GUARDI_CURRICULUM_BLOCKS.en.B2||{};
for(const [index,exercise] of [...(unit40.exercises||[]),...(unit40.lessons||[]).flatMap(lesson=>lesson.exercises||[])].entries()){if(exercise.type==="mc"&&Array.isArray(exercise.options)&&exercise.options.length>1){const suffix=Number(String(exercise.vocabId||"").match(/v(\d+)$/)?.[1]||1);const offset=(suffix+index)%exercise.options.length;exercise.options=exercise.options.slice(offset).concat(exercise.options.slice(0,offset));exercise.answer=(exercise.options.length-offset)%exercise.options.length;}}root.GUARDI_CURRICULUM_BLOCKS.en.B2["39-40"]={units:[unit39,unit40]};
})(typeof window!=="undefined"?window:globalThis);
