(function(root){
'use strict';
const vocab=[
["have a track record","tener una trayectoria demostrada","The team has a track record of delivering projects on time.","El equipo cuenta con una trayectoria demostrada en la entrega puntual de proyectos."],
["ongoing","en curso","The investigation is still ongoing.","La investigación sigue en curso."],
["to date","hasta la fecha","To date, we have received more than 200 applications.","Hasta la fecha, hemos recibido más de 200 solicitudes."],
["so far","hasta ahora","So far, the results have been encouraging.","Hasta ahora, los resultados han sido alentadores."],
["recently","recientemente","She has recently taken on a leadership role.","Ella ha asumido recientemente un puesto de liderazgo."],
["lately","últimamente","I've been sleeping poorly lately.","Últimamente he estado durmiendo mal."],
["over the past decade","durante la última década","Over the past decade, the city has changed considerably.","Durante la última década, la ciudad ha cambiado considerablemente."],
["since then","desde entonces","He joined the company in 2020 and has led the team since then.","Se incorporó a la empresa en 2020 y ha dirigido el equipo desde entonces."],
["as of now","hasta el momento","As of now, no major issues have emerged.","Hasta el momento no han surgido problemas importantes."],
["to undergo","someterse a / experimentar","The building has undergone extensive renovations.","El edificio ha experimentado amplias renovaciones."],
["to evolve","evolucionar","Our approach has evolved over time.","Nuestro enfoque ha evolucionado con el tiempo."],
["to expand","ampliarse / expandir","The company has expanded into three new markets.","La empresa se ha expandido a tres mercados nuevos."],
["to address","abordar","We have addressed the main concerns.","Hemos abordado las principales preocupaciones."],
["to achieve","lograr","The project has achieved most of its goals.","El proyecto ha logrado la mayoría de sus objetivos."],
["to fall behind","quedarse rezagado","We have fallen behind schedule this month.","Nos hemos retrasado este mes."],
["to make progress","progresar","The researchers have been making steady progress.","Los investigadores han estado progresando de forma constante."],
["to work toward","trabajar para conseguir","They have been working toward a solution for months.","Llevan meses trabajando para conseguir una solución."],
["to remain","seguir / permanecer","The issue has remained unresolved.","El problema sigue sin resolverse."],
["to experience","experimentar","The region has experienced rapid growth.","La región ha experimentado un crecimiento rápido."],
["to demonstrate","demostrar","The latest figures have demonstrated a clear improvement.","Las últimas cifras han demostrado una mejora clara."],
["to gain recognition","obtener reconocimiento","The approach has gained recognition among researchers.","El enfoque ha obtenido reconocimiento entre los investigadores."],
["to set a precedent","sentar un precedente","The ruling has set a precedent for similar cases.","El fallo ha sentado un precedente para casos similares."]
].map((r,i)=>({id:"en_b2_u1_v"+String(i+1).padStart(2,"0"),target:r[0],esp:r[1],ex:r[2],exEsp:r[3],verification:{status:"not_checked",sources:[]}}));
const lessons=[
{title:"Resultados y experiencias acumuladas",objective:"Distingue experiencias y resultados conectados con el presente de hechos situados en un pasado terminado.",grammar:"Present perfect simple: have/has + past participle. Úsalo para experiencias sin fecha concreta y resultados relevantes ahora. Con un momento pasado terminado, usa past simple.",ids:[0,1,2,3],sentences:["The investigation is still ongoing.","So far, the results have been encouraging."]},
{title:"Duración y actividad reciente",objective:"Explica cuánto tiempo lleva desarrollándose una actividad y qué evidencia deja en el presente.",grammar:"Present perfect continuous: have/has been + -ing. Destaca duración o actividad repetida; el simple suele destacar resultado, cantidad o estado.",ids:[4,5,6,7],sentences:["I've been sleeping poorly lately.","Researchers have been making steady progress."]},
{title:"Cambios y evolución",objective:"Describe procesos de cambio que comenzaron antes y siguen siendo relevantes.",grammar:"El present perfect simple suele presentar el cambio como hecho o resultado; el continuous enfoca el proceso. Since marca el inicio; over the past decade indica un periodo que llega al presente.",ids:[8,9,10,11],sentences:["The building has undergone extensive renovations.","The company has expanded into three new markets."]},
{title:"Logros, objetivos y dificultades",objective:"Comunica avances, objetivos alcanzados y retrasos con precisión.",grammar:"Usa el simple para logros y resultados; el continuous para esfuerzos en desarrollo. No combines present perfect con fechas pasadas cerradas.",ids:[12,13,14,15],sentences:["The project has achieved most of its goals.","The researchers have been making steady progress."]},
{title:"Síntesis y contraste temporal",objective:"Integra ambas formas al resumir tendencias y situaciones que continúan.",grammar:"Contrasta I have worked here for five years (hecho/estado) con I have been working on this report all morning (actividad). Los verbos de estado suelen preferir el simple.",ids:[16,17,18,19,20,21],sentences:["The issue has remained unresolved.","The latest figures have demonstrated a clear improvement."]}
];
const mc=(w,opts)=>{const correct=opts[0];const match=String(w.id).match(/v(\d+)$/);const offset=match?Number(match[1])%opts.length:1;const options=opts.slice(offset).concat(opts.slice(0,offset));return {vocabId:w.id,type:"mc",prompt:"¿Qué significa «"+w.target+"»?",options,answer:options.indexOf(correct),explanation:"Elige la equivalencia que corresponde al contexto."};};
const order=(w,s)=>{const correctOrder=s.replace(/[.,!?;:]/g,"").trim().split(/\s+/).filter(Boolean);let words=correctOrder.length>1?correctOrder.slice(1).concat(correctOrder.slice(0,1)):correctOrder.slice();if(words.join(" ")===correctOrder.join(" "))words=correctOrder.slice().reverse();return {vocabId:w.id,type:"order",prompt:"Ordena la frase.",words,correctOrder,explanation:"Reconstruye la frase y observa el uso del tiempo verbal."};};
const lessonData=lessons.map((l,i)=>({title:l.title,objective:l.objective,grammar:l.grammar,vocabIds:l.ids.map(n=>vocab[n].id),reviewVocabIds:[],exercises:[mc(vocab[l.ids[0]],[vocab[l.ids[0]].esp,vocab[(l.ids[0]+5)%20].esp,vocab[(l.ids[0]+9)%20].esp]),order(vocab[l.ids[1]],l.sentences[0])]}));
const exercises=[];
for(let i=0;i<10;i++){const w=vocab[i];exercises.push(i%2===0?mc(w,[w.esp,vocab[(i+6)%20].esp,vocab[(i+12)%20].esp]):order(w,lessons[Math.floor(i/2)].sentences[i%2]));}
const unit={unitNumber:1,id:"en_b2_u1",title:"Unidad 1: Resultados, duración y evolución",desc:"Explica experiencias, resultados y procesos que conectan el pasado con el presente en contextos personales, académicos y profesionales.",grammar:"Contraste avanzado entre present perfect simple y present perfect continuous; uso de for, since, lately, recently, so far y periodos que llegan al presente.",trap:{title:"Resultado frente a actividad",detail:"I have written three reports (resultado/cantidad). I have been writing reports all morning (actividad/duración). No uses present perfect con un momento pasado terminado: I finished it yesterday, no I have finished it yesterday."},vocab:vocab,lessons:lessonData,exercises:exercises};
root.GUARDI_CURRICULUM_BLOCKS=root.GUARDI_CURRICULUM_BLOCKS||{};
root.GUARDI_CURRICULUM_BLOCKS.en=root.GUARDI_CURRICULUM_BLOCKS.en||{};
root.GUARDI_CURRICULUM_BLOCKS.en.B2=root.GUARDI_CURRICULUM_BLOCKS.en.B2||{};
root.GUARDI_CURRICULUM_BLOCKS.en.B2["01-04"]={units:[unit]};
})(typeof window!=="undefined"?window:globalThis);
(function(root){
'use strict';
const mk=(n,rows)=>rows.map((r,i)=>({id:"en_b2_u"+n+"_v"+String(i+1).padStart(2,"0"),target:r[0],esp:r[1],ex:r[2],exEsp:r[3],verification:{status:"not_checked",sources:[]}}));
const mc=(w,opts)=>{const correct=opts[0];const match=String(w.id).match(/v(\d+)$/);const offset=match?Number(match[1])%opts.length:1;const options=opts.slice(offset).concat(opts.slice(0,offset));return {vocabId:w.id,type:"mc",prompt:"¿Qué significa «"+w.target+"»?",options,answer:options.indexOf(correct),explanation:"Selecciona la equivalencia adecuada para este contexto."};};
const order=(w,s)=>{const correctOrder=s.replace(/[.,!?;:]/g,"").trim().split(/\s+/).filter(Boolean);let words=correctOrder.length>1?correctOrder.slice(1).concat(correctOrder.slice(0,1)):correctOrder.slice();if(words.join(" ")===correctOrder.join(" "))words=correctOrder.slice().reverse();return {vocabId:w.id,type:"order",prompt:"Ordena la frase.",words,correctOrder,explanation:"Reconstruye la frase y observa la estructura verbal."};};
const makeUnit=d=>{const words=mk(d.n,d.rows);const lessons=d.lessons.map(s=>({title:s[0],objective:s[1],grammar:s[2],vocabIds:s[3].map(i=>words[i].id),reviewVocabIds:[],exercises:[mc(words[s[3][0]],[words[s[3][0]].esp,words[(s[3][0]+7)%22].esp,words[(s[3][0]+13)%22].esp]),order(words[s[3][1]],s[4])]}));const exercises=[];for(let i=0;i<5;i++){const w=words[i];exercises.push(mc(w,[w.esp,words[(i+8)%22].esp,words[(i+15)%22].esp]));}for(let i=0;i<5;i++)exercises.push(order(words[5+i],d.bank[i]));return {unitNumber:d.n,id:"en_b2_u"+d.n,title:"Unidad "+d.n+": "+d.title,desc:d.desc,grammar:d.grammar,trap:{title:d.trap[0],detail:d.trap[1]},vocab:words,lessons,exercises};};
const data=[
{n:2,title:"Precisión en experiencias y resultados",desc:"Matiza experiencias recientes, cambios acumulados y resultados visibles con expresiones temporales propias del nivel B2.",grammar:"Contraste entre present perfect simple y continuous; verbos de estado y de actividad; for, since, throughout, over the course of y up to now.",trap:["Duración, estado y resultado","I have known her for years (estado, simple). I have been discussing the proposal all morning (actividad, continuous). No fuerces la forma continua con verbos de estado como know, own o believe."],rows:[
["throughout","a lo largo de","Throughout the process, the team has kept detailed records.","A lo largo del proceso, el equipo ha mantenido registros detallados."],
["over the course of","a lo largo de","Over the course of the year, demand has increased steadily.","A lo largo del año, la demanda ha aumentado de forma constante."],
["up to now","hasta ahora","Up to now, the evidence has supported our initial view.","Hasta ahora, las pruebas han respaldado nuestra opinión inicial."],
["to have a lasting impact","tener un impacto duradero","The policy has had a lasting impact on local businesses.","La política ha tenido un impacto duradero en los negocios locales."],
["to gain ground","ganar terreno","The alternative approach has been gaining ground.","El enfoque alternativo ha ido ganando terreno."],
["to keep pace with","mantener el ritmo de","Small firms have struggled to keep pace with demand.","A las pequeñas empresas les ha costado mantener el ritmo de la demanda."],
["to build up","acumular","She has built up considerable experience in the field.","Ella ha acumulado bastante experiencia en el campo."],
["to bring about","provocar","The reforms have brought about significant changes.","Las reformas han provocado cambios importantes."],
["to account for","explicar / representar","Online sales have accounted for half of the total.","Las ventas en línea han representado la mitad del total."],
["to be under way","estar en marcha","Several improvements are already under way.","Varias mejoras ya están en marcha."],
["to date back to","remontarse a","The tradition dates back to the eighteenth century.","La tradición se remonta al siglo XVIII."],
["to be inclined to","tender a","People have been inclined to trust familiar sources.","La gente ha tendido a confiar en fuentes conocidas."],
["to persist","persistir","The same concerns have persisted for years.","Las mismas preocupaciones han persistido durante años."],
["to fluctuate","fluctuar","Prices have fluctuated throughout the summer.","Los precios han fluctuado durante todo el verano."],
["to peak","alcanzar un máximo","Demand has peaked earlier than expected.","La demanda ha alcanzado su máximo antes de lo esperado."],
["to level off","estabilizarse","Growth has started to level off.","El crecimiento ha empezado a estabilizarse."],
["to gain momentum","cobrar impulso","The campaign has been gaining momentum recently.","La campaña ha ido cobrando impulso últimamente."],
["to be reluctant to","mostrarse reacio a","The board has been reluctant to change its policy.","La junta se ha mostrado reacia a cambiar su política."],
["to pave the way for","allanar el camino para","The agreement has paved the way for further talks.","El acuerdo ha allanado el camino para nuevas conversaciones."],
["to remain consistent","mantenerse constante","The results have remained consistent across age groups.","Los resultados se han mantenido constantes entre los grupos de edad."],
["to undergo a shift","experimentar un cambio","Public attitudes have undergone a major shift.","La opinión pública ha experimentado un cambio importante."],
["to show signs of","dar señales de","The market has shown signs of recovery.","El mercado ha dado señales de recuperación."]
],lessons:[
["Tendencias a lo largo del tiempo","Describe cambios graduales y tendencias que llegan al presente.","Present perfect simple para cambios/resultados; continuous para procesos en curso.",[0,1,2,3],"Over the course of the year, demand has increased steadily."],
["Impacto y acumulación","Explica consecuencias y experiencia acumulada.","Have/has had + noun; build up y bring about como colocaciones.",[4,5,6,7],"The reforms have brought about significant changes."],
["Cifras y explicaciones","Resume datos, proporciones y variaciones.","Account for puede significar explicar o representar una proporción.",[8,9,10,11],"Online sales have accounted for half of the total."],
["Persistencia y variación","Explica problemas persistentes y cambios cuantificables.","Los verbos dinámicos pueden aparecer en simple o continuous con distinto enfoque.",[12,13,14,15],"Prices have fluctuated throughout the summer."],
["Síntesis de cambios complejos","Integra tendencias, actitudes y consecuencias.","Usa colocaciones precisas y expresiones de duración para evitar repeticiones.",[16,17,18,19,20,21],"The agreement has paved the way for further talks."]
],bank:["The same concerns have persisted for years.","Prices have fluctuated throughout the summer.","Demand has peaked earlier than expected.","Growth has started to level off.","The market has shown signs of recovery."]},
{n:3,title:"Tiempos narrativos y cambios de perspectiva",desc:"Organiza relatos complejos y aclara qué ocurrió primero, qué estaba en progreso y qué interrumpió una acción.",grammar:"Past perfect simple y continuous; past simple y continuous; when, while, by the time, no sooner...than y hardly...when.",trap:["Past perfect no significa simplemente pasado lejano","By the time we arrived, the meeting had started. El past perfect marca anterioridad respecto a otro punto pasado; no lo uses solo para hacer que una acción parezca más antigua."],rows:[
["by the time","para cuando","By the time we reached the station, the train had left.","Para cuando llegamos a la estación, el tren ya se había ido."],
["to have been doing","haber estado haciendo","She had been doing research for months before the results came in.","Llevaba meses investigando antes de que llegaran los resultados."],
["to take place","tener lugar","The incident took place shortly before midnight.","El incidente tuvo lugar poco antes de medianoche."],
["to come to light","salir a la luz","New evidence came to light during the inquiry.","Nuevas pruebas salieron a la luz durante la investigación."],
["to turn out","resultar","The task turned out to be more difficult than expected.","La tarea resultó ser más difícil de lo esperado."],
["to set off","emprender el viaje","They had set off before sunrise.","Habían emprendido el viaje antes del amanecer."],
["to look into","investigar","The company was looking into the complaint when new details emerged.","La empresa estaba investigando la queja cuando surgieron nuevos detalles."],
["to run into","encontrarse con","I ran into an old colleague while I was traveling.","Me encontré con un antiguo compañero mientras viajaba."],
["to be on the verge of","estar a punto de","The negotiations were on the verge of collapsing.","Las negociaciones estaban a punto de fracasar."],
["to have second thoughts","empezar a tener dudas","He was having second thoughts before he signed the contract.","Estaba empezando a tener dudas antes de firmar el contrato."],
["to interrupt","interrumpir","A phone call interrupted the presentation.","Una llamada interrumpió la presentación."],
["to resume","reanudar","After the break, the committee resumed its discussion.","Después del descanso, el comité reanudó el debate."],
["to recall","recordar","She recalled having seen the document before.","Recordó haber visto el documento antes."],
["to witness","presenciar","Several residents witnessed the incident.","Varios vecinos presenciaron el incidente."],
["to overlook","pasar por alto","We had overlooked one important detail.","Habíamos pasado por alto un detalle importante."],
["to misjudge","calcular/juzgar mal","I had misjudged how long the journey would take.","Había calculado mal cuánto duraría el viaje."],
["in the aftermath","a raíz de / después de","In the aftermath of the storm, roads remained closed.","Después de la tormenta, las carreteras siguieron cerradas."],
["all of a sudden","de repente","All of a sudden, the lights went out.","De repente, se apagaron las luces."],
["meanwhile","mientras tanto","Meanwhile, the rescue team was searching the area.","Mientras tanto, el equipo de rescate buscaba en la zona."],
["eventually","finalmente","Eventually, the missing files were recovered.","Finalmente, se recuperaron los archivos perdidos."],
["to have barely started","apenas haber comenzado","The event had barely started when the alarm went off.","El evento apenas había comenzado cuando sonó la alarma."],
["to be taken aback","quedarse desconcertado","I was taken aback by how quickly things changed.","Me desconcertó lo rápido que cambiaron las cosas."]
],lessons:[
["Establecer el orden de los hechos","Aclara qué acción ocurrió antes de otra en una narración.","Past perfect simple para la acción anterior; by the time fija el punto de referencia.",[0,1,2,3],"By the time we reached the station, the train had left."],
["Procesos e interrupciones","Describe una actividad en curso cuando ocurrió otro hecho.","Past perfect continuous enfoca duración previa; past simple presenta la interrupción.",[4,5,6,7],"The company was looking into the complaint when new details emerged."],
["Expectativas y decisiones","Relata dudas, cambios de opinión y situaciones al borde de ocurrir.","Was/were about to y was/were on the verge of expresan inminencia pasada.",[8,9,10,11],"The negotiations were on the verge of collapsing."],
["Memoria y errores de juicio","Explica recuerdos, pruebas y detalles que no se detectaron.","Recall + -ing refiere a recordar una experiencia; past perfect marca anterioridad.",[12,13,14,15],"We had overlooked one important detail."],
["Narración integrada","Construye una secuencia coherente con conectores y cambios de ritmo.","No sooner...than y hardly...when requieren inversión en registros formales.",[16,17,18,19,20,21],"The event had barely started when the alarm went off."]
],bank:["The incident took place shortly before midnight.","They had set off before sunrise.","A phone call interrupted the presentation.","Several residents witnessed the incident.","Eventually, the missing files were recovered."]},
{n:4,title:"Future perfect y future continuous",desc:"Habla de planes vistos desde el pasado, predicciones con duración y acciones que estarán completadas antes de un plazo futuro.",grammar:"Future perfect simple (will have + participle), future perfect continuous (will have been + -ing), future in the past (was/were going to; would) y was/were about to.",trap:["No confundas finalización y duración","By June, I will have completed the course (resultado). By June, I will have been studying for a year (duración). Para un plan pasado que no necesariamente se cumplió, usa was going to, no will."],rows:[
["by then","para entonces","By then, the team will have completed the first stage.","Para entonces, el equipo habrá completado la primera etapa."],
["by the end of","para finales de","By the end of the month, we will have reached a decision.","Para finales de mes, habremos tomado una decisión."],
["in the meantime","mientras tanto","In the meantime, we will continue testing the system.","Mientras tanto, seguiremos probando el sistema."],
["to be due to","estar previsto que","The report is due to be published next week.","Está previsto que el informe se publique la próxima semana."],
["to be set to","estar a punto de / tener previsto","The company is set to launch a new service.","La empresa tiene previsto lanzar un servicio nuevo."],
["to be on track","ir según lo previsto","The project is on track to finish in December.","El proyecto va según lo previsto para terminar en diciembre."],
["to be behind schedule","ir con retraso","We are already behind schedule.","Ya vamos con retraso."],
["to meet a deadline","cumplir un plazo","They are confident they will meet the deadline.","Confían en que cumplirán el plazo."],
["to anticipate","prever","We anticipate that costs will rise next year.","Prevemos que los costos aumentarán el próximo año."],
["to foresee","prever","Nobody foresaw how quickly demand would grow.","Nadie previó lo rápido que crecería la demanda."],
["to intend to","tener la intención de","I intended to call you, but I ran out of time.","Tenía la intención de llamarte, pero me quedé sin tiempo."],
["to be about to","estar a punto de","The train is about to leave.","El tren está a punto de salir."],
["to be on the point of","estar a punto de","She was on the point of resigning when the offer arrived.","Estaba a punto de renunciar cuando llegó la oferta."],
["to look ahead","mirar hacia el futuro","We need to look ahead and plan for growth.","Tenemos que mirar hacia el futuro y planificar el crecimiento."],
["to allow for","tener en cuenta / prever","The schedule allows for unexpected delays.","El horario tiene en cuenta retrasos imprevistos."],
["to come up","surgir","A few issues may come up during implementation.","Pueden surgir algunos problemas durante la implementación."],
["to carry out","llevar a cabo","The team will have carried out the review by Friday.","El equipo habrá llevado a cabo la revisión para el viernes."],
["to phase in","introducir gradualmente","The new rules will be phased in over six months.","Las nuevas reglas se introducirán gradualmente durante seis meses."],
["to roll out","lanzar / implementar","They are going to roll out the update in stages.","Van a implementar la actualización por etapas."],
["to wrap up","concluir","We should be wrapping up by lunchtime.","Deberíamos estar terminando para la hora del almuerzo."],
["to have completed","haber completado","By next spring, she will have completed her training.","Para la próxima primavera, habrá completado su formación."],
["to have been working","llevar trabajando","In July, I will have been working here for ten years.","En julio, llevaré diez años trabajando aquí."]
],lessons:[
["Plazos y resultados futuros","Expresa acciones que estarán terminadas antes de un momento futuro.","Future perfect simple: will have + participio; by y by the time señalan el límite.",[0,1,2,3],"By the end of the month, we will have reached a decision."],
["Duración hasta un punto futuro","Destaca cuánto tiempo llevará desarrollándose una actividad.","Future perfect continuous: will have been + -ing; suele acompañar for + duración.",[4,5,6,7],"The project is on track to finish in December."],
["Predicciones y expectativas","Comunica previsiones, planes y expectativas con distintos grados de certeza.","Anticipate/foresee + cláusula; be due to y be set to presentan previsiones.",[8,9,10,11],"Nobody foresaw how quickly demand would grow."],
["Futuro visto desde el pasado","Relata intenciones y acciones inminentes desde un punto de vista pasado.","Was/were going to y would expresan futuro en el pasado; no garantizan que el plan se cumpliera.",[12,13,14,15],"She was on the point of resigning when the offer arrived."],
["Planificación y ejecución","Integra plazos, fases y acciones previstas en contextos profesionales.","Distingue will have completed (resultado) de will have been working (duración).",[16,17,18,19,20,21],"The team will have carried out the review by Friday."]
],bank:["The report is due to be published next week.","The project is on track to finish in December.","They are confident they will meet the deadline.","She was on the point of resigning when the offer arrived.","The team will have carried out the review by Friday."]}
];
const rootBlocks=root.GUARDI_CURRICULUM_BLOCKS&&root.GUARDI_CURRICULUM_BLOCKS.en&&root.GUARDI_CURRICULUM_BLOCKS.en.B2;
if(!rootBlocks||!rootBlocks["01-04"]||!Array.isArray(rootBlocks["01-04"].units))throw new Error("B2 U1-04 base block missing");
for(const d of data)rootBlocks["01-04"].units.push(makeUnit(d));
})(typeof window!=="undefined"?window:globalThis);
(function(root){
'use strict';
const rows=[
["previously","anteriormente","The site had previously been used as a warehouse.","Anteriormente, el lugar se había utilizado como almacén."],
["before the guests arrived","antes de que llegaran los invitados","We had finished dinner before the guests arrived.","Habíamos terminado de cenar antes de que llegaran los invitados."],
["up until then","hasta ese momento","Up until then, nobody had questioned the figures.","Hasta ese momento, nadie había cuestionado las cifras."],
["to have already left","ya haberse ido","She had already left when I called.","Ella ya se había ido cuando llamé."],
["to have been waiting","haber estado esperando","They had been waiting for over an hour before the doors opened.","Habían estado esperando más de una hora antes de que abrieran las puertas."],
["to have been working on","llevar trabajando en","He had been working on the proposal for weeks before he submitted it.","Llevaba semanas trabajando en la propuesta antes de entregarla."],
["to explain","explicar","That detail explained the unusual result.","Ese detalle explicaba el resultado inusual."],
["to stem from","tener su origen en","The disagreement stemmed from a misunderstanding.","El desacuerdo tuvo su origen en un malentendido."],
["to be unaware of","no estar al tanto de","We were unaware of the changes that had been made.","No estábamos al tanto de los cambios que se habían realizado."],
["to assume","suponer","I had assumed the meeting was still going ahead.","Había supuesto que la reunión seguía en pie."],
["to postpone","posponer","They postponed the launch because testing had revealed a fault.","Pospusieron el lanzamiento porque las pruebas habían revelado un fallo."],
["to reveal","revelar","The audit revealed that several payments had been missed.","La auditoría reveló que se habían pasado por alto varios pagos."],
["to have been considering","haber estado considerando","The board had been considering the proposal for months.","La junta llevaba meses considerando la propuesta."],
["to have intended","haber tenido la intención","I had intended to contact you earlier.","Había tenido la intención de contactarte antes."],
["to have no idea","no tener ni idea","She had no idea that the deadline had changed.","Ella no tenía ni idea de que el plazo había cambiado."],
["to have overlooked","haber pasado por alto","We had overlooked a key requirement.","Habíamos pasado por alto un requisito clave."],
["to have dealt with","haber gestionado","The team had dealt with similar cases before.","El equipo ya había gestionado casos similares."],
["to have been exposed to","haber estado expuesto a","The material had been exposed to extreme temperatures.","El material había estado expuesto a temperaturas extremas."],
["to have grown accustomed to","haberse acostumbrado a","He had grown accustomed to working under pressure.","Se había acostumbrado a trabajar bajo presión."],
["to have taken place","haber tenido lugar","The first meeting had taken place weeks earlier.","La primera reunión había tenido lugar semanas antes."],
["in the run-up to","en el periodo previo a","In the run-up to the election, tensions had been rising.","En el periodo previo a las elecciones, las tensiones habían ido aumentando."],
["prior to","antes de","Prior to the merger, both firms had operated independently.","Antes de la fusión, ambas empresas habían operado de forma independiente."]
];
const vocab=rows.map((r,i)=>({id:"en_b2_u2_v"+String(i+1).padStart(2,"0"),target:r[0],esp:r[1],ex:r[2],exEsp:r[3],verification:{status:"not_checked",sources:[]}}));
const lessons=[
["Antecedentes y punto de referencia","Sitúa una acción anterior a otro momento pasado y explica su relevancia.","Past perfect simple: had + past participle. By the time y up until then fijan el punto de referencia.",[0,1,2,3],"By the time the guests arrived, we had finished dinner."],
["Duración antes de un hecho pasado","Enfatiza cuánto tiempo llevaba desarrollándose una actividad antes de otro evento.","Past perfect continuous: had been + -ing. Destaca duración, esfuerzo o repetición previa.",[4,5,6,7],"He had been working on the proposal for weeks before he submitted it."],
["Causas y conocimiento previo","Explica causas, suposiciones y falta de información en retrospectiva.","Past perfect simple para estados y hechos previos; no lo uses si el orden ya queda claro y no aporta contraste.",[8,9,10,11],"We were unaware of the changes that had been made."],
["Intenciones y situaciones prolongadas","Describe planes, consideraciones y condiciones que precedieron a un resultado.","Past perfect simple frente a continuous: intención/resultado frente a proceso en desarrollo.",[12,13,14,15],"The board had been considering the proposal for months."],
["Síntesis retrospectiva","Integra antecedentes, duración y contexto en una explicación coherente.","Prior to, in the run-up to y before ayudan a organizar referencias temporales sin repetir then.",[16,17,18,19,20,21],"Prior to the merger, both firms had operated independently."]
];
const mc=(w,opts)=>{const correct=opts[0];const match=String(w.id).match(/v(\d+)$/);const offset=match?Number(match[1])%opts.length:1;const options=opts.slice(offset).concat(opts.slice(0,offset));return {vocabId:w.id,type:"mc",prompt:"¿Qué significa «"+w.target+"»?",options,answer:options.indexOf(correct),explanation:"Selecciona la equivalencia que corresponde al contexto."};};
const order=(w,s)=>{const correctOrder=s.replace(/[.,!?;:]/g,"").trim().split(/\s+/).filter(Boolean);let words=correctOrder.length>1?correctOrder.slice(1).concat(correctOrder.slice(0,1)):correctOrder.slice();if(words.join(" ")===correctOrder.join(" "))words=correctOrder.slice().reverse();return {vocabId:w.id,type:"order",prompt:"Ordena la frase.",words,correctOrder,explanation:"Reconstruye la frase y observa cómo se expresa la anterioridad."};};
const lessonObjects=lessons.map((l,i)=>({title:l[0],objective:l[1],grammar:l[2],vocabIds:l[3].map(n=>vocab[n].id),reviewVocabIds:[],exercises:[mc(vocab[l[3][0]],[vocab[l[3][0]].esp,vocab[(l[3][0]+7)%22].esp,vocab[(l[3][0]+14)%22].esp]),order(vocab[l[3][1]],l[4])]}));
const bank=["The site had previously been used as a warehouse.","They had been waiting for over an hour before the doors opened.","The disagreement stemmed from a misunderstanding.","I had intended to contact you earlier.","Prior to the merger, both firms had operated independently."];
const exercises=[];
for(let i=0;i<5;i++)exercises.push(mc(vocab[i],[vocab[i].esp,vocab[(i+8)%22].esp,vocab[(i+15)%22].esp]));
for(let i=0;i<5;i++)exercises.push(order(vocab[i+5],bank[i]));
const unit={unitNumber:2,id:"en_b2_u2",title:"Unidad 2: Past perfect simple y continuous",desc:"Explica antecedentes, causas y actividades prolongadas que ocurrieron antes de otro punto del pasado.",grammar:"Past perfect simple y past perfect continuous; had + participio frente a had been + -ing; by the time, up until then, before y prior to.",trap:{title:"Hecho anterior frente a duración previa",detail:"The team had completed the review before the deadline (resultado). The team had been reviewing the files for hours before the deadline (duración). Elige según el foco, no solo por el orden cronológico."},vocab,lessons:lessonObjects,exercises};
const block=root.GUARDI_CURRICULUM_BLOCKS.en.B2["01-04"];
block.units[1]=unit;
})(typeof window!=="undefined"?window:globalThis);
