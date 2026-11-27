(function(root){
'use strict';
const mkV=(n,rows)=>rows.map((r,i)=>({id:"en_b2_u"+n+"_v"+String(i+1).padStart(2,"0"),target:r[0],esp:r[1],ex:r[2],exEsp:r[3],verification:{status:"not_checked",sources:[]}}));
const mc=(w,opts)=>{const correct=opts[0];const match=String(w.id).match(/v(\d+)$/);const offset=match?Number(match[1])%opts.length:1;const options=opts.slice(offset).concat(opts.slice(0,offset));return {vocabId:w.id,type:"mc",prompt:"¿Qué significa «"+w.target+"»?",options,answer:options.indexOf(correct),explanation:"Selecciona la equivalencia que conserva el sentido en contexto."};};
const order=(w,s)=>{const correctOrder=s.replace(/[.,!?;:]/g,"").trim().split(/\s+/).filter(Boolean);let words=correctOrder.length>1?correctOrder.slice(1).concat(correctOrder.slice(0,1)):correctOrder.slice();if(words.join(" ")===correctOrder.join(" "))words=correctOrder.slice().reverse();return {vocabId:w.id,type:"order",prompt:"Ordena la frase.",words,correctOrder,explanation:"Reconstruye la frase y comprueba la relación hipotética."};};
const build=d=>{const vocab=mkV(d.n,d.rows);const lessons=d.lessons.map(l=>({title:l[0],objective:l[1],grammar:l[2],vocabIds:l[3].map(i=>vocab[i].id),reviewVocabIds:[],exercises:[mc(vocab[l[3][0]],[vocab[l[3][0]].esp,vocab[(l[3][0]+7)%22].esp,vocab[(l[3][0]+14)%22].esp]),order(vocab[l[3][1]],l[4])]}));const exercises=[];for(let i=0;i<5;i++)exercises.push(mc(vocab[i],[vocab[i].esp,vocab[(i+8)%22].esp,vocab[(i+15)%22].esp]));for(let i=0;i<5;i++)exercises.push(order(vocab[i+5],d.bank[i]));return {unitNumber:d.n,id:"en_b2_u"+d.n,title:"Unidad "+d.n+": "+d.title,desc:d.desc,grammar:d.grammar,trap:{title:d.trap[0],detail:d.trap[1]},vocab,lessons,exercises};};
const data=[
{n:15,title:"Mixed conditionals: pasado y presente",desc:"Relaciona situaciones irreales del pasado con consecuencias presentes y condiciones actuales con resultados pasados.",grammar:"Mixed conditionals: if + past perfect, would + infinitive; if + past simple, would have + past participle; could/might en ambas cláusulas.",trap:["El tiempo de cada cláusula depende de su referencia","If I had taken the job, I would live abroad now (condición pasada, resultado presente). If I were more organized, I wouldn't have missed the deadline (condición presente, resultado pasado)."],rows:[
["if I had known","si lo hubiera sabido","If I had known about the change, I would be better prepared now.","Si hubiera sabido del cambio, ahora estaría mejor preparado."],
["if it hadn't been for","si no hubiera sido por","If it hadn't been for your advice, I would still be struggling.","Si no hubiera sido por tu consejo, todavía tendría dificultades."],
["would be doing","estaría haciendo","If she had accepted the role, she would be working abroad now.","Si hubiera aceptado el puesto, ahora estaría trabajando en el extranjero."],
["would have been","habría sido / estado","If I were more patient, the discussion would have been easier.","Si fuera más paciente, la conversación habría sido más fácil."],
["could have avoided","podría haber evitado","If we were more careful, we could have avoided the mistake.","Si fuéramos más cuidadosos, podríamos haber evitado el error."],
["might still be","quizá todavía estaría","If he had taken the earlier train, he might still be here by now.","Si hubiera tomado el tren anterior, quizá todavía estaría aquí."],
["otherwise","de lo contrario","The offer included a relocation package; otherwise, I would still be working here.","La oferta incluía un paquete de reubicación; de lo contrario, seguiría trabajando aquí."],
["to be in a better position","estar en mejor situación","With more support, we would be in a better position now.","Con más apoyo, ahora estaríamos en mejor situación."],
["to have a different outcome","tener un resultado diferente","If the team had communicated, the project might have had a different outcome.","Si el equipo se hubiera comunicado, el proyecto podría haber tenido otro resultado."],
["to affect the outcome","afectar el resultado","A small change could have affected the outcome.","Un pequeño cambio podría haber afectado el resultado."],
["to look back on","recordar / mirar atrás y recordar","If I had stayed, I would look back on a very different career.","Si me hubiera quedado, recordaría una trayectoria profesional muy distinta."],
["to regret not doing","arrepentirse de no haber hecho","I regret not taking the opportunity when it arose.","Me arrepiento de no haber aprovechado la oportunidad cuando surgió."],
["to be better off","estar mejor","We would be better off now if we had planned ahead.","Ahora estaríamos mejor si hubiéramos planificado con anticipación."],
["to have been able to","haber podido","If the files were accessible, we would have been able to check them.","Si los archivos fueran accesibles, habríamos podido revisarlos."],
["to make a difference","marcar la diferencia","A little more time would have made a difference.","Un poco más de tiempo habría marcado la diferencia."],
["to have no effect on","no tener efecto en","The warning has had no effect on the final decision so far.","Hasta ahora, la advertencia no ha tenido ningún efecto en la decisión final."],
["to be in this situation","estar en esta situación","If we had acted sooner, we wouldn't be in this situation.","Si hubiéramos actuado antes, no estaríamos en esta situación."],
["to have turned out differently","haber resultado diferente","Things might have turned out differently if we had asked for help.","Las cosas podrían haber resultado diferentes si hubiéramos pedido ayuda."],
["to wish things were","desear que las cosas fueran","I wish things were easier, but we have to adapt.","Ojalá las cosas fueran más fáciles, pero tenemos que adaptarnos."],
["to wish I had","desear haber","I wish I had listened to your advice.","Ojalá hubiera escuchado tu consejo."],
["in different circumstances","en otras circunstancias","In different circumstances, I would have accepted the offer.","En otras circunstancias, habría aceptado la oferta."],
["given the chance","si tuviera la oportunidad","Given the chance, I would make a different decision.","Si tuviera la oportunidad, tomaría una decisión diferente."]
],lessons:[
["Condición pasada y resultado presente","Explica cómo una decisión pasada afecta la situación actual.","If + past perfect, would + infinitive/continuous para consecuencias presentes.",[0,1,2,3],"If it hadn't been for your advice, I would still be struggling."],
["Condición presente y resultado pasado","Relaciona una característica o situación actual con un resultado anterior.","If + past simple, would/could have + participio para resultados pasados.",[4,5,6,7],"If he had taken the earlier train, he might still be here by now."],
["Consecuencias alternativas","Evalúa cómo habría cambiado un resultado bajo otra condición.","Might/could expresan resultados menos seguros; otherwise introduce la alternativa.",[8,9,10,11],"A small change could have affected the outcome."],
["Resultados, capacidad y efectos","Describe cómo una condición afecta los resultados y las posibilidades de acción.","Be better off, be able to, make a difference y have no effect on expresan consecuencias y efectos de decisiones o condiciones.",[12,13,14,15],"If the files were accessible, we would have been able to check them."],
["Síntesis de situaciones irreales","Integra condiciones mixtas en una explicación de decisiones y consecuencias.","Identifica primero el tiempo real de la condición y el de la consecuencia; no fuerces ambos al mismo patrón.",[16,17,18,19,20,21],"Things might have turned out differently if we had asked for help."]
],bank:["If he had taken the earlier train, he might still be here by now.","The offer included a relocation package; otherwise, I would still be working here.","With more support, we would be in a better position now.","If the team had communicated, the project might have had a different outcome.","A small change could have affected the outcome."]},
{n:16,title:"Inversión en condicionales",desc:"Usa estructuras condicionales formales sin if para expresar hipótesis, contingencias y condiciones de manera concisa.",grammar:"Had + subject + past participle; Were + subject + to-infinitive; Should + subject + infinitive; were it not for y had it not been for.",trap:["La inversión sustituye if, no cambia la lógica condicional","Had I known = If I had known. No uses did después de Had en esta estructura."],rows:[
["Had I known","si lo hubiera sabido","Had I known the risks, I would have acted differently.","Si hubiera conocido los riesgos, habría actuado de otra manera."],
["Had it not been for","si no hubiera sido por","Had it not been for their support, we would have failed.","Si no hubiera sido por su apoyo, habríamos fracasado."],
["Were I to","si yo aceptara","Were I to accept the offer, I would need to relocate.","Si aceptara la oferta, tendría que mudarme."],
["Were it not for","si no fuera por","Were it not for the backup system, the data would be lost.","Si no fuera por el sistema de respaldo, se perderían los datos."],
["Should you need","si necesita / si llegara a necesitar","Should you need further assistance, contact the help desk.","Si necesita más ayuda, contacte con soporte."],
["Should anything go wrong","si algo llegara a salir mal","Should anything go wrong, we have a contingency plan.","Si algo llegara a salir mal, tenemos un plan de contingencia."],
["Had they been informed","si les hubieran informado","Had they been informed earlier, they could have prepared.","Si les hubieran informado antes, podrían haberse preparado."],
["Were the situation to change","si la situación cambiara","Were the situation to change, we would review the agreement.","Si la situación cambiara, revisaríamos el acuerdo."],
["Should the need arise","si surgiera la necesidad","Should the need arise, additional staff will be available.","Si surgiera la necesidad, habrá personal adicional disponible."],
["Had the opportunity arisen","si hubiera surgido la oportunidad","Had the opportunity arisen, she would have taken it.","Si hubiera surgido la oportunidad, la habría aprovechado."],
["were it not for the fact that","si no fuera por el hecho de que","Were it not for the fact that costs have risen, we would expand.","Si no fuera por el hecho de que los costos han aumentado, nos expandiríamos."],
["on condition that","con la condición de que","We will proceed on condition that the terms are clear.","Procederemos con la condición de que los términos estén claros."],
["provided that","siempre que","You may use the room provided that you leave it tidy.","Puedes usar la sala siempre que la dejes ordenada."],
["as long as","siempre que","The plan should work as long as everyone cooperates.","El plan debería funcionar siempre que todos colaboren."],
["in the event that","en caso de que","In the event that the system fails, use the manual process.","En caso de que falle el sistema, utiliza el proceso manual."],
["failing that","si eso falla","We could take the train; failing that, we can rent a car.","Podríamos tomar el tren; si eso falla, podemos rentar un auto."],
["if not","si no","Please confirm by noon; if not, we will postpone the launch.","Confirma antes del mediodía; si no, pospondremos el lanzamiento."],
["under no circumstances","bajo ninguna circunstancia","Under no circumstances should the password be shared.","Bajo ninguna circunstancia debe compartirse la contraseña."],
["in any event","en cualquier caso","In any event, the final decision rests with the board.","En cualquier caso, la decisión final corresponde a la junta."],
["subject to approval","sujeto a aprobación","The proposal is subject to approval by the director.","La propuesta está sujeta a la aprobación del director."],
["unless stated otherwise","a menos que se indique lo contrario","The fee is non-refundable unless stated otherwise.","La tarifa no es reembolsable, a menos que se indique lo contrario."],
["contingency plan","plan de contingencia","The team prepared a contingency plan for delays.","El equipo preparó un plan de contingencia para los retrasos."]
],lessons:[
["Had + sujeto: hipótesis pasada","Transforma condicionales irreales pasados a una estructura formal invertida.","Had + sujeto + participio sustituye if + past perfect; incluye had it not been for y sus variantes con participio.",[0,1,6,9],"Had it not been for their support, we would have failed."],
["Were + sujeto: hipótesis presente o futura","Presenta situaciones hipotéticas de manera formal.","Were I to, were it not for y were it not for the fact that introducen hipótesis; no añadas if.",[2,3,7,10],"Were it not for the backup system, the data would be lost."],
["Should + sujeto: contingencia posible","Formula condiciones futuras formales y ofrecimientos de ayuda.","Should you need..., should anything go wrong y should the need arise introducen contingencias; el orden es auxiliar + sujeto.",[4,5,8],"Should anything go wrong, we have a contingency plan."],
["Condiciones y restricciones","Expresa requisitos y condiciones de validez.","On condition that, provided that y as long as introducen requisitos; in the event that, subject to approval y unless stated otherwise delimitan contingencias y restricciones.",[11,12,13,14,19,20],"You may use the room provided that you leave it tidy."],
["Alternativas y cláusulas de contingencia","Organiza alternativas, excepciones y consecuencias en contextos formales.","Failing that e if not introducen alternativas; under no circumstances expresa una prohibición enfática; in any event y contingency plan ayudan a gestionar escenarios.",[15,16,17,18,21],"Please confirm by noon; if not, we will postpone the launch."]
],bank:["Should anything go wrong, we have a contingency plan.","Had they been informed earlier, they could have prepared.","Were the situation to change, we would review the agreement.","Should the need arise, additional staff will be available.","Had the opportunity arisen, she would have taken it."]},
{n:17,title:"Wish, if only y would rather",desc:"Expresa arrepentimiento, deseos sobre situaciones presentes o pasadas, frustración ante conductas y preferencias sobre acciones propias o ajenas.",grammar:"Wish/if only + past simple, past perfect y would; would rather + infinitive o past simple; it's time + past simple.",trap:["Wish y hope no comparten el mismo patrón","I wish I knew (deseo irreal presente). I hope I find out (esperanza posible). Wish + past perfect expresa arrepentimiento pasado."],rows:[
["I wish I knew","ojalá supiera","I wish I knew what they were planning.","Ojalá supiera qué están planeando."],
["if only I had","si tan solo hubiera","If only I had saved a copy.","Si tan solo hubiera guardado una copia."],
["I wish you would","ojalá quisieras / dejaras de","I wish you would listen before responding.","Ojalá escucharas antes de responder."],
["I wish it would stop","ojalá dejara de","I wish it would stop raining.","Ojalá dejara de llover."],
["would rather","preferiría","I'd rather discuss this tomorrow.","Preferiría hablar de esto mañana."],
["would rather someone did","preferiría que alguien hiciera","I'd rather you stayed here for now.","Preferiría que te quedaras aquí por ahora."],
["would prefer to","preferiría","We would prefer to receive the documents by email.","Preferiríamos recibir los documentos por correo."],
["would sooner","preferiría","I'd sooner wait than make a rushed decision.","Preferiría esperar antes que tomar una decisión apresurada."],
["it's time","ya es hora de","It's time we addressed the issue.","Ya es hora de que abordemos el problema."],
["it's high time","ya va siendo hora de","It's high time the company reviewed its policy.","Ya va siendo hora de que la empresa revise su política."],
["if only things were","si tan solo las cosas fueran","If only things were a little simpler.","Si tan solo las cosas fueran un poco más sencillas."],
["to wish someone would","desear que alguien hiciera","I wish the neighbors would turn the music down.","Ojalá los vecinos bajaran la música."],
["to regret having done","arrepentirse de haber hecho","He regrets having ignored the warning.","Se arrepiente de haber ignorado la advertencia."],
["to feel guilty about","sentirse culpable por","She feels guilty about missing the meeting.","Se siente culpable por haberse perdido la reunión."],
["to long for","anhelar","They long for a more stable future.","Anhelan un futuro más estable."],
["to be fed up with","estar harto de","I'm fed up with having to repeat the same instructions.","Estoy harto de tener que repetir las mismas instrucciones."],
["to put up with","soportar","We shouldn't have to put up with this level of service.","No deberíamos tener que soportar este nivel de servicio."],
["to make an exception","hacer una excepción","Would you make an exception in this case?","¿Harías una excepción en este caso?"],
["to have reservations about","tener reservas sobre","She has reservations about moving.","Tiene reservas sobre la mudanza."],
["to change one's mind","cambiar de opinión","I changed my mind after hearing the explanation.","Cambié de opinión después de escuchar la explicación."],
["if it were up to me","si dependiera de mí","If it were up to me, we'd postpone the launch.","Si dependiera de mí, pospondríamos el lanzamiento."],
["given my preference for","dada mi preferencia por","Given my preference for quiet environments, I would work independently.","Dada mi preferencia por los entornos tranquilos, trabajaría de forma independiente."]
],lessons:[
["Deseos sobre el presente","Expresa situaciones presentes que se desean diferentes.","Wish/if only + past simple para estados irreales presentes; wish + would expresa el deseo de que cambie una conducta; were es formal en todas las personas.",[0,2,3,10],"I wish you would listen before responding."],
["Preferencias y elecciones","Expresa preferencias propias y preferencias sobre acciones de otras personas.","Would rather + infinitivo para el mismo sujeto; would rather + sujeto + past simple para otro sujeto; would prefer to y would sooner expresan preferencias.",[4,5,6,7],"I'd rather you stayed here for now."],
["Urgencia y cambio deseado","Expresa que una situación debería cambiar o que una acción ya debería haberse realizado.","It's time/it's high time + past simple expresa urgencia presente; wish + would suele referirse a la conducta que se desea que cambie.",[8,9,11],"It's high time the company reviewed its policy."],
["Arrepentimiento y estados emocionales","Expresa arrepentimiento, culpa, anhelo y cansancio ante situaciones no deseadas.","If only + past perfect expresa arrepentimiento pasado; regret + -ing/having + participio, feel guilty about + -ing, long for + sustantivo y be fed up with + -ing expresan reacciones emocionales.",[1,12,13,14,15],"He regrets having ignored the warning."],
["Decisiones y preferencias personales","Expresa reservas, tolerancia, cambios de opinión y decisiones basadas en preferencias personales.","Have reservations about, change one's mind, if it were up to me y given my preference for permiten expresar dudas y justificar decisiones personales.",[16,17,18,19,20,21],"Would you make an exception in this case?"]
],bank:["If only I had saved a copy.","I wish you would listen before responding.","We would prefer to receive the documents by email.","I'd sooner wait than make a rushed decision.","It's time we addressed the issue."]},
{n:18,title:"Unreal past y estructuras hipotéticas",desc:"Usa formas de pasado para expresar distancia, comparación irreal, cortesía, preferencias y situaciones que deberían cambiar.",grammar:"As if/as though + past simple o past perfect; it's time; would rather; suppose/supposing; imagine; unreal past con wish.",trap:["El pasado puede marcar distancia, no tiempo","He talks as if he knew everything (no afirma que lo sepa). She looked as though she had seen a ghost (anterioridad irreal o inferida)."],rows:[
["as if","como si","He talks as if he knew everything.","Habla como si lo supiera todo."],
["as though","como si","She looked as though she had seen a ghost.","Parecía como si hubiera visto un fantasma."],
["suppose","supongamos que","Suppose you were offered the job. What would you do?","Supongamos que te ofrecieran el trabajo. ¿Qué harías?"],
["supposing","suponiendo que","Supposing the figures were wrong, how would we respond?","Suponiendo que las cifras fueran incorrectas, ¿cómo responderíamos?"],
["imagine","imagina","Imagine you had unlimited time to complete the project.","Imagina que tuvieras tiempo ilimitado para completar el proyecto."],
["it's about time","ya va siendo hora de","It's about time we made a decision.","Ya va siendo hora de que tomemos una decisión."],
["would prefer not to","preferiría no","I'd prefer not to discuss the matter in public.","Preferiría no hablar del asunto en público."],
["as if nothing had happened","como si no hubiera pasado nada","He carried on as if nothing had happened.","Siguió como si no hubiera pasado nada."],
["to behave as though","comportarse como si","She behaves as though she owned the place.","Se comporta como si fuera la dueña del lugar."],
["to sound as if","sonar como si","It sounds as if the situation is getting worse.","Suena como si la situación estuviera empeorando."],
["to look as though","parecer que","They look as though they need a break.","Parece que necesitan un descanso."],
["to act as if","actuar como si","Don't act as if you had no choice.","No actúes como si no tuvieras opción."],
["to wish things had been different","desear que las cosas hubieran sido diferentes","She wished things had been different before she made the decision.","Ella deseaba que las cosas hubieran sido diferentes antes de tomar la decisión."],
["it is improbable that","es improbable que","It is improbable that he would agree without further details.","Es improbable que aceptara sin más detalles."],
["to put oneself in someone's shoes","ponerse en el lugar de alguien","Try to put yourself in her shoes.","Intenta ponerte en su lugar."],
["to take something for granted","dar algo por sentado","Don't take their support for granted.","No des por sentado su apoyo."],
["to make believe","hacer creer / fingir","The children made believe they were explorers.","Los niños fingieron que eran exploradores."],
["to pretend to","fingir","He pretended to understand the instructions.","Fingió entender las instrucciones."],
["to be under the impression","tener la impresión","I was under the impression that the meeting had been canceled.","Tenía la impresión de que la reunión se había cancelado."],
["to give the impression","dar la impresión","The response gives the impression that no action is planned.","La respuesta da la impresión de que no se planea ninguna acción."],
["for argument's sake","para efectos de la discusión","For argument's sake, let's assume the budget is fixed.","Para efectos de la discusión, supongamos que el presupuesto es fijo."],
["in an ideal world","en un mundo ideal","In an ideal world, everyone would have equal access.","En un mundo ideal, todos tendrían el mismo acceso."]
],lessons:[
["As if y as though","Compara situaciones reales con apariencias o comportamientos irreales.","As if/as though + past simple para distancia presente; past perfect para una situación anterior.",[0,1,7,8],"She looked as though she had seen a ghost."],
["Suposiciones y escenarios","Explora hipótesis para anticipar respuestas y alternativas.","Suppose, supposing e imagine introducen escenarios hipotéticos; for argument's sake plantea una suposición para desarrollar una discusión.",[2,3,4,20],"Supposing the figures were wrong, how would we respond?"],
["Apariencia y comportamiento","Describe cómo alguien parece, suena o actúa sin confirmar que la impresión sea cierta.","Sound as if, look as though y act as if describen impresiones y comportamientos sin confirmar que sean reales.",[9,10,11],"They look as though they need a break."],
["Distancia, arrepentimiento y perspectiva","Usa el pasado irreal para expresar urgencia, preferencias, arrepentimiento y empatía.","It's about time expresa urgencia; would prefer not to indica preferencia; wish + past perfect expresa arrepentimiento; improbable that y put oneself in someone's shoes añaden cautela y empatía.",[5,6,12,13,14,15],"I'd prefer not to discuss the matter in public."],
["Perspectiva y cautela","Expresa impresiones, supuestos provisionales y escenarios ideales.","Make believe y pretend to presentan una ficción; be under the impression y give the impression describen percepciones; in an ideal world plantea una situación deseable.",[16,17,18,19,21],"He pretended to understand the instructions."]
],bank:["It's about time we made a decision.","I'd prefer not to discuss the matter in public.","He carried on as if nothing had happened.","She behaves as though she owned the place.","It sounds as if the situation is getting worse."]}
];
root.GUARDI_CURRICULUM_BLOCKS=root.GUARDI_CURRICULUM_BLOCKS||{};root.GUARDI_CURRICULUM_BLOCKS.en=root.GUARDI_CURRICULUM_BLOCKS.en||{};root.GUARDI_CURRICULUM_BLOCKS.en.B2=root.GUARDI_CURRICULUM_BLOCKS.en.B2||{};
root.GUARDI_CURRICULUM_BLOCKS.en.B2["15-18"]={units:data.map(build)};
})(typeof window!=="undefined"?window:globalThis);
