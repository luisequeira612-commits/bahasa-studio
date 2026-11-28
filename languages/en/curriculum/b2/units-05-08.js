(function(root){
'use strict';
const makeWords=(n,rows)=>rows.map((r,i)=>({id:"en_b2_u"+n+"_v"+String(i+1).padStart(2,"0"),target:r[0],esp:r[1],ex:r[2],exEsp:r[3],verification:{status:"not_checked",sources:[]}}));
const mc=(w,opts)=>{const correct=opts[0];const match=String(w.id).match(/v(\d+)$/);const offset=match?Number(match[1])%opts.length:1;const options=opts.slice(offset).concat(opts.slice(0,offset));return {vocabId:w.id,type:"mc",prompt:"¿Qué significa «"+w.target+"»?",options,answer:options.indexOf(correct),explanation:"Selecciona la equivalencia adecuada en este contexto."};};
const order=(w,s)=>{const correctOrder=s.replace(/[.,!?;:]/g,"").trim().split(/\s+/).filter(Boolean);let words=correctOrder.length>1?correctOrder.slice(1).concat(correctOrder.slice(0,1)):correctOrder.slice();if(words.join(" ")===correctOrder.join(" "))words=correctOrder.slice().reverse();return {vocabId:w.id,type:"order",prompt:"Ordena la frase.",words,correctOrder,explanation:"Reconstruye la frase y observa el uso contextual."};};
const build=d=>{const vocab=makeWords(d.n,d.rows);const makeMc=(word,candidates)=>{const options=[word.esp];for(const candidate of candidates)if(candidate&& !options.includes(candidate)&&options.length<3)options.push(candidate);for(const item of vocab)if(item.id!==word.id&&!options.includes(item.esp)&&options.length<3)options.push(item.esp);return mc(word,options);};const lessons=d.lessons.map(l=>({title:l[0],objective:l[1],grammar:l[2],vocabIds:l[3].map(i=>vocab[i].id),reviewVocabIds:[],exercises:[makeMc(vocab[l[3][0]],[vocab[(l[3][0]+7)%22].esp,vocab[(l[3][0]+14)%22].esp]),order(vocab[l[3][1]],l[4])]}));const exercises=[];for(let i=0;i<5;i++)exercises.push(makeMc(vocab[i],[vocab[(i+8)%22].esp,vocab[(i+15)%22].esp]));for(let i=0;i<5;i++)exercises.push(order(vocab[i+5],d.bank[i]));return {unitNumber:d.n,id:"en_b2_u"+d.n,title:"Unidad "+d.n+": "+d.title,desc:d.desc,grammar:d.grammar,trap:{title:d.trap[0],detail:d.trap[1]},vocab,lessons,exercises};};
const data=[
{n:5,title:"Future in the past: planes y expectativas retrospectivas",desc:"Explica lo que alguien esperaba, planeaba o estaba a punto de hacer desde un punto de vista pasado, incluyendo planes que no se cumplieron.",grammar:"Was/were going to, would, was/were about to, was/were due to y was/were supposed to; contraste entre intención, predicción e inminencia.",trap:["Un plan pasado no garantiza que ocurriera","I was going to call you, but I got distracted. Was going to presenta una intención pasada; no significa que la llamada se realizara."],rows:[
["was going to","iba a","I was going to apply, but the position closed.","Iba a postularme, pero cerraron la vacante."],
["would eventually","finalmente llegaría a","She would eventually become the department head.","Con el tiempo, ella llegaría a ser la jefa del departamento."],
["was about to","estaba a punto de","We were about to leave when the phone rang.","Estábamos a punto de salir cuando sonó el teléfono."],
["was due to","estaba previsto que","The train was due to arrive at six.","Estaba previsto que el tren llegara a las seis."],
["was supposed to","se suponía que","The package was supposed to arrive yesterday.","Se suponía que el paquete llegaría ayer."],
["had planned to","había planeado","They had planned to open a second office.","Habían planeado abrir una segunda oficina."],
["intended to","tenía la intención de","I intended to explain the change in person.","Tenía la intención de explicar el cambio en persona."],
["expected to","esperaba que / se esperaba que","We expected the talks to continue.","Esperábamos que las conversaciones continuaran."],
["was unlikely to","era poco probable que","The deal was unlikely to succeed.","Era poco probable que el acuerdo tuviera éxito."],
["was certain to","era seguro que","The delay was certain to affect the schedule.","Era seguro que el retraso afectaría el calendario."],
["was on the verge of","estaba a punto de","The firm was on the verge of closing.","La empresa estaba a punto de cerrar."],
["was meant to","estaba destinado a / se suponía que","The meeting was meant to resolve the dispute.","La reunión estaba destinada a resolver la disputa."],
["was due for","ya le tocaba","The system was due for an upgrade.","Al sistema ya le tocaba una actualización."],
["would later find out","más tarde descubriría","We would later find out why the alarm had failed.","Más tarde descubriríamos por qué había fallado la alarma."],
["was hoping to","esperaba poder","She was hoping to secure a place on the course.","Ella esperaba conseguir una plaza en el curso."],
["was thinking of","estaba pensando en","He was thinking of moving abroad.","Estaba pensando en mudarse al extranjero."],
["was on track to","iba camino de","The project was on track to finish early.","El proyecto iba camino de terminar antes de tiempo."],
["was set to","tenía previsto","The company was set to announce the results.","La empresa tenía previsto anunciar los resultados."],
["was preparing to","se estaba preparando para","The team was preparing to launch the service.","El equipo se estaba preparando para lanzar el servicio."],
["never got around to","nunca llegó a","I never got around to sending the application.","Nunca llegué a enviar la solicitud."],
["failed to materialize","no llegó a concretarse","The promised investment failed to materialize.","La inversión prometida no llegó a concretarse."],
["in retrospect","en retrospectiva","In retrospect, the warning signs were clear.","En retrospectiva, las señales de advertencia eran claras."]
],lessons:[
["Intenciones y planes","Relata planes e intenciones que existían en un momento pasado.","Was/were going to y had planned to expresan intención previa, no cumplimiento.",[0,1,2,3],"She would eventually become the department head."],
["Expectativas y predicciones","Explica lo que alguien esperaba que sucediera.","Would + infinitivo puede expresar futuro visto desde el pasado; expected to presenta expectativa.",[4,5,6,7],"They had planned to open a second office."],
["Probabilidad e inminencia","Matiza si un hecho parecía probable o inminente.","Was likely/unlikely to y was about to no significan lo mismo: probabilidad frente a inminencia.",[8,9,10,11],"The delay was certain to affect the schedule."],
["Planes previstos y preparación","Describe calendarios y preparativos desde una perspectiva pasada.","Was due to, was set to y was preparing to señalan previsión o preparación.",[12,13,14,15],"We would later find out why the alarm had failed."],
["Planes incumplidos y retrospectiva","Explica qué no llegó a suceder y evalúa la situación después.","Never got around to y failed to materialize expresan falta de realización.",[16,17,18,19,20,21],"The company was set to announce the results."]
],bank:["They had planned to open a second office.","I intended to explain the change in person.","We expected the talks to continue.","The deal was unlikely to succeed.","The delay was certain to affect the schedule."]},
{n:6,title:"Tiempos verbales en discurso indirecto",desc:"Resume declaraciones, preguntas y promesas manteniendo clara la relación temporal entre el mensaje original y el momento de reportarlo.",grammar:"Reported speech y backshift; reporting verbs; cambios de pronombres y referencias temporales; cuándo no es necesario retroceder el tiempo verbal.",trap:["El retroceso verbal depende del punto de referencia","She said she was busy (discurso reportado en pasado). She says she is busy (marco presente). Los hechos aún vigentes pueden conservar el presente."],rows:[
["to point out that","señalar que","The report pointed out that costs had increased.","El informe señaló que los costos habían aumentado."],
["to claim that","afirmar que","He claimed that he had never received the email.","Afirmó que nunca había recibido el correo."],
["to admit that","admitir que","She admitted that she had made a mistake.","Admitió que había cometido un error."],
["to deny that","negar que","The company denied that it had changed the policy.","La empresa negó que hubiera cambiado la política."],
["to insist that","insistir en que","They insisted that the figures were accurate.","Insistieron en que las cifras eran correctas."],
["to explain that","explicar que","He explained that he would be working remotely.","Explicó que trabajaría a distancia."],
["to promise to","prometer","She promised to send the revised version.","Prometió enviar la versión revisada."],
["to warn someone that","advertir a alguien que","They warned us that the road was closed.","Nos advirtieron que la carretera estaba cerrada."],
["to remind someone to","recordar a alguien que","I reminded him to submit the form.","Le recordé que entregara el formulario."],
["to encourage someone to","animar a alguien a","The manager encouraged us to share ideas.","El gerente nos animó a compartir ideas."],
["to accuse someone of","acusar a alguien de","They accused the firm of hiding information.","Acusaron a la empresa de ocultar información."],
["to recommend doing","recomendar hacer","She recommended booking in advance.","Recomendó reservar con anticipación."],
["to suggest that","sugerir que","He suggested that we should wait.","Sugirió que esperáramos."],
["to wonder whether","preguntarse si","I wondered whether they had received the file.","Me pregunté si habían recibido el archivo."],
["to inquire whether","preguntar si","She inquired whether the position was still available.","Preguntó si el puesto seguía disponible."],
["to confirm that","confirmar que","They confirmed that the order had been dispatched.","Confirmaron que el pedido había sido enviado."],
["to deny having done","negar haber hecho","He denied having shared the document.","Negó haber compartido el documento."],
["to regret saying","arrepentirse de haber dicho","She regretted saying that in the meeting.","Se arrepintió de haber dicho eso en la reunión."],
["to urge someone to","instar a alguien a","The panel urged the agency to act quickly.","El panel instó a la agencia a actuar rápidamente."],
["to acknowledge that","reconocer que","The director acknowledged that mistakes had been made.","El director reconoció que se habían cometido errores."],
["according to","según","According to the witness, the lights were already off.","Según el testigo, las luces ya estaban apagadas."],
["as far as I recall","hasta donde recuerdo","As far as I recall, she said the meeting was optional.","Hasta donde recuerdo, dijo que la reunión era opcional."]
],lessons:[
["Afirmaciones y cambios temporales","Reporta afirmaciones y explica cómo cambia el punto de referencia temporal.","Backshift habitual: present→past, present perfect→past perfect, will→would; no es automático.",[0,1,2,3],"He claimed that he had never received the email."],
["Posturas y matices","Distingue afirmar, admitir, negar e insistir.","Claim, admit, deny e insist suelen ir seguidos de that-clause; conserva el matiz del hablante.",[4,5,6,7],"He explained that he would be working remotely."],
["Órdenes, consejos y advertencias","Resume promesas, advertencias y recomendaciones sin copiar la estructura original.","Promise to, warn someone that, remind someone to y encourage someone to tienen patrones distintos.",[8,9,10,11],"The manager encouraged us to share ideas."],
["Preguntas indirectas","Reporta preguntas y dudas con orden afirmativo y sin do/does/did.","Wonder/inquire whether o if; no uses inversión en una pregunta indirecta.",[12,13,14,15],"I wondered whether they had received the file."],
["Síntesis fiel de declaraciones","Resume una conversación atribuyendo correctamente las ideas.","Acknowledge that, urge someone to y according to ayudan a atribuir información y postura.",[16,17,18,19,20,21],"She regretted saying that in the meeting."]
],bank:["He explained that he would be working remotely.","She promised to send the revised version.","They warned us that the road was closed.","I reminded him to submit the form.","The manager encouraged us to share ideas."]},
{n:7,title:"Aspecto y elección verbal",desc:"Elige entre formas simples, continuas y perfectas para expresar hábitos, cambios, repetición, duración y resultados con el foco adecuado.",grammar:"Contraste de aspecto simple, continuous y perfect; used to, would para hábitos pasados; present simple frente a present continuous para tendencias y comportamientos temporales.",trap:["La forma verbal cambia el foco","He works from home (rutina). He is working from home this week (situación temporal). He has been working from home since May (duración hasta ahora)."],rows:[
["to tend to","tender a","Prices tend to rise during the summer.","Los precios tienden a subir durante el verano."],
["to be prone to","ser propenso a","The system is prone to errors under heavy use.","El sistema es propenso a errores con mucho uso."],
["to be accustomed to","estar acostumbrado a","She is accustomed to working under pressure.","Ella está acostumbrada a trabajar bajo presión."],
["to get used to","acostumbrarse a","I'm getting used to the new schedule.","Me estoy acostumbrando al nuevo horario."],
["used to","solía","We used to meet every Friday.","Solíamos reunirnos todos los viernes."],
["would often","solía (repetidamente)","He would often stay late to finish the work.","A menudo se quedaba hasta tarde para terminar el trabajo."],
["to keep doing","seguir haciendo","They keep changing the requirements.","Siguen cambiando los requisitos."],
["to go on doing","continuar haciendo","She went on explaining despite the interruption.","Continuó explicando pese a la interrupción."],
["to gradually become","ir volviéndose","The task is gradually becoming easier.","La tarea se está volviendo más fácil poco a poco."],
["to increasingly rely on","depender cada vez más de","Businesses are increasingly relying on digital tools.","Las empresas dependen cada vez más de herramientas digitales."],
["repeatedly","repetidamente","The alarm has repeatedly gone off at night.","La alarma ha sonado repetidamente por la noche."],
["once in a while","de vez en cuando","Once in a while, I work from the library.","De vez en cuando, trabajo desde la biblioteca."],
["on a regular basis","de manera habitual","The equipment is checked on a regular basis.","El equipo se revisa de manera habitual."],
["for the time being","por el momento","For the time being, we are using the old system.","Por el momento, estamos usando el sistema antiguo."],
["at present","actualmente","At present, the team is reviewing the proposal.","Actualmente, el equipo está revisando la propuesta."],
["to remain unchanged","permanecer sin cambios","The policy has remained unchanged for years.","La política ha permanecido sin cambios durante años."],
["to gradually fade","desvanecerse gradualmente","The sound was gradually fading.","El sonido se estaba desvaneciendo gradualmente."],
["to be constantly doing","estar constantemente haciendo","He is constantly checking his phone.","Está constantemente revisando el teléfono."],
["to have a habit of","tener la costumbre de","She has a habit of interrupting people.","Tiene la costumbre de interrumpir a la gente."],
["to break a habit","romper un hábito","He has finally broken the habit of arriving late.","Por fin ha roto el hábito de llegar tarde."],
["to take place regularly","tener lugar regularmente","The meetings take place regularly.","Las reuniones se celebran regularmente."],
["to be in the process of","estar en proceso de","The company is in the process of updating its website.","La empresa está en proceso de actualizar su sitio web."]
],lessons:[
["Hábitos y rutinas","Distingue hábitos actuales, pasados y acciones repetidas.","Present simple para rutinas; used to y would para hábitos pasados, con límites distintos.",[0,1,2,3],"The system is prone to errors under heavy use."],
["Cambios y adaptación","Expresa procesos graduales y adaptación a nuevas condiciones.","Get used to + noun/-ing; be accustomed to + noun/-ing; no confundas con used to + infinitivo.",[4,5,6,7],"He would often stay late to finish the work."],
["Tendencias y repetición","Describe tendencias crecientes y acciones repetidas con matices.","Continuous para tendencias temporales; adverbios como increasingly y repeatedly ajustan el foco.",[8,9,10,11],"Businesses are increasingly relying on digital tools."],
["Situaciones temporales y estados","Separa una condición estable de una situación limitada al presente.","At present y for the time being suelen acompañar situaciones temporales; remain + adjective describe continuidad.",[12,13,14,15],"For the time being, we are using the old system."],
["Énfasis en hábitos y procesos","Integra frecuencia, duración y cambio en descripciones naturales.","Always/constantly + continuous puede expresar repetición molesta o llamativa.",[16,17,18,19,20,21],"He is constantly checking his phone."]
],bank:["He would often stay late to finish the work.","They keep changing the requirements.","She went on explaining despite the interruption.","The task is gradually becoming easier.","Businesses are increasingly relying on digital tools."]},
{n:8,title:"Verbos de estado y usos dinámicos",desc:"Interpreta cómo cambia el significado de verbos como think, have, see, taste y feel cuando describen estados o actividades.",grammar:"Stative y dynamic meanings; verbos con doble uso; present simple frente a present continuous; verbos de percepción, pensamiento, posesión y apariencia.",trap:["El mismo verbo puede cambiar de significado","I think you're right (opinión, estado). I'm thinking about the offer (proceso mental). No todos los verbos de estado son siempre estáticos: importa el significado contextual."],rows:[
["to think","pensar / opinar","I think the proposal is realistic.","Creo que la propuesta es realista."],
["to be thinking about","estar considerando","We're thinking about moving closer to work.","Estamos considerando mudarnos más cerca del trabajo."],
["to have","tener","She has two younger brothers.","Ella tiene dos hermanos menores."],
["to be having","estar pasando / tomando","We're having a difficult week.","Estamos pasando una semana difícil."],
["to see","ver / comprender","I see what you mean.","Entiendo lo que quieres decir."],
["to be seeing","estar saliendo con / reuniéndose con","He's seeing a client this afternoon.","Se reunirá con un cliente esta tarde."],
["to taste","saber a / tener sabor a","The soup tastes slightly salty.","La sopa sabe un poco salada."],
["to be tasting","estar probando","The chef is tasting the sauce.","El chef está probando la salsa."],
["to feel","sentirse","I feel exhausted after the trip.","Me siento agotado después del viaje."],
["to be feeling","sentirse (temporalmente)","She's feeling much better today.","Hoy se siente mucho mejor."],
["to look","parecer","The plan looks reasonable.","El plan parece razonable."],
["to be looking","estar mirando","Why are you looking at me like that?","¿Por qué me estás mirando así?"],
["to weigh","pesar","The package weighs almost ten pounds.","El paquete pesa casi diez libras."],
["to be weighing","estar sopesando","The committee is weighing several options.","El comité está sopesando varias opciones."],
["to smell","oler","The room smells of fresh paint.","La habitación huele a pintura fresca."],
["to be smelling","estar oliendo","He is smelling the coffee to check whether it is fresh.","Está oliendo el café para comprobar si está fresco."],
["to appear","parecer","The figures appear accurate.","Las cifras parecen correctas."],
["to be appearing","estar actuando / apareciendo","The band is appearing at the festival tonight.","La banda actuará en el festival esta noche."],
["to depend on","depender de","The outcome depends on several factors.","El resultado depende de varios factores."],
["to be depending on","estar dependiendo de","We're depending on the backup system today.","Hoy estamos dependiendo del sistema de respaldo."],
["to own","ser propietario de","They own a small apartment downtown.","Son propietarios de un apartamento pequeño en el centro."],
["to belong to","pertenecer a","This folder belongs to the finance team.","Esta carpeta pertenece al equipo de finanzas."]
],lessons:[
["Pensamiento y opinión","Distingue una opinión estable de un proceso de reflexión.","Think = opinar suele ser stative; be thinking about = considerar es dinámico.",[0,1,2,3],"We're thinking about moving closer to work."],
["Posesión, experiencia y percepción","Interpreta have y see según indiquen estado o actividad.","Have = poseer es estático; have a meeting/meal = participar en una actividad.",[4,5,6,7],"He's seeing a client this afternoon."],
["Sentidos y sensaciones","Diferencia propiedades percibidas y acciones deliberadas.","Taste/smell/look como percepción suelen ser stative; probar, oler o mirar deliberadamente son dinámicos.",[8,9,10,11],"She's feeling much better today."],
["Medición y apariencia","Describe propiedades estables y procesos de evaluación.","Weigh = tener un peso; be weighing = sopesar opciones. Appear = parecer o presentarse.",[12,13,14,15],"The committee is weighing several options."],
["Estados, dependencia y propiedad","Usa verbos de estado con precisión y reconoce excepciones contextuales.","Depend on y belong to expresan relaciones; evita formas continuas cuando el significado es puramente estático.",[16,17,18,19,20,21],"The band is appearing at the festival tonight."]
],bank:["He's seeing a client this afternoon.","The soup tastes slightly salty.","The chef is tasting the sauce.","I feel exhausted after the trip.","She's feeling much better today."]}
];
root.GUARDI_CURRICULUM_BLOCKS=root.GUARDI_CURRICULUM_BLOCKS||{};
root.GUARDI_CURRICULUM_BLOCKS.en=root.GUARDI_CURRICULUM_BLOCKS.en||{};
root.GUARDI_CURRICULUM_BLOCKS.en.B2=root.GUARDI_CURRICULUM_BLOCKS.en.B2||{};
root.GUARDI_CURRICULUM_BLOCKS.en.B2["05-08"]={units:data.map(build)};
})(typeof window!=="undefined"?window:globalThis);
