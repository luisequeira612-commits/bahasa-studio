(function(root){
'use strict';
const mk=(n,rows)=>rows.map((r,i)=>({id:'en_a2_u'+n+'_v'+String(i+1).padStart(2,'0'),target:r[0],esp:r[1],ex:r[2],exEsp:r[3],verification:{status:'not_checked',sources:[]}}));
const mc=(w,p,o)=>({vocabId:w.id,type:'mc',prompt:p,options:o,answer:0,explanation:'Selecciona el significado correcto.'});
const order=(w,s)=>{const words=s.split(' ');return {vocabId:w.id,type:'order',prompt:'Ordena la frase.',words,correctOrder:words.slice(),explanation:'Ordena la frase y observa la estructura.'};};
const makeUnit=d=>{
 const words=mk(d.n,d.rows);
 const lessons=d.lessons.map(s=>({title:s[0],objective:s[1],grammar:s[2],vocabIds:s[3].map(i=>words[i].id),reviewVocabIds:[],exercises:[mc(words[s[3][0]],'¿Qué significa «'+words[s[3][0]].target+'»?',[words[s[3][0]].esp,'otra opción','una opción diferente']),order(words[s[3][1]],s[4])]}));
 const exercises=[];for(let i=0;i<5;i++)exercises.push(mc(words[i],'Elige la traducción de «'+words[i].target+'».',[words[i].esp,words[(i+7)%22].esp,words[(i+13)%22].esp]));for(let i=0;i<5;i++)exercises.push(order(words[5+i],d.bank[i]));
 return {unitNumber:d.n,id:'en_a2_u'+d.n,title:'Unidad '+d.n+': '+d.title,desc:d.desc,grammar:d.grammar,trap:{title:d.trap[0],detail:d.trap[1]},vocab:words,lessons,exercises};
};
const data=[
{n:7,title:'Historias e incidentes',desc:'Combina pasado simple y pasado continuo para narrar incidentes y explicar qué estaba ocurriendo.',grammar:'Usa pasado continuo para el contexto en progreso y pasado simple para el hecho puntual. When suele introducir el hecho; while suele introducir la acción en progreso.',trap:['Acción en progreso e interrupción','I was walking when I slipped. / While I was walking, I saw the accident.'],rows:[
['slip','resbalar','I slipped on the wet floor.','Me resbalé en el suelo mojado.'],
['trip over','tropezar con','She tripped over a small stone.','Ella tropezó con una piedra pequeña.'],
['fall over','caerse','He fell over while he was running.','Él se cayó mientras corría.'],
['stumble','tropezar','I stumbled but did not fall.','Tropecé, pero no me caí.'],
['bump into','chocar con','I bumped into a chair in the dark.','Choqué con una silla en la oscuridad.'],
['injury','lesión','The injury was not serious.','La lesión no fue grave.'],
['bruise','moretón','She had a bruise on her arm.','Tenía un moretón en el brazo.'],
['ankle','tobillo','He hurt his ankle during the game.','Se lastimó el tobillo durante el partido.'],
['wrist','muñeca','I was carrying a box when I hurt my wrist.','Llevaba una caja cuando me lastimé la muñeca.'],
['elbow','codo','She hit her elbow on the door.','Se golpeó el codo con la puerta.'],
['knee','rodilla','He fell and hurt his knee.','Se cayó y se lastimó la rodilla.'],
['painful','doloroso','The cut was painful.','El corte era doloroso.'],
['sore','adolorido','My arm was sore after the fall.','Me dolía el brazo después de la caída.'],
['bleed','sangrar','His finger started to bleed.','Su dedo empezó a sangrar.'],
['bandage','vendaje','She put a bandage on the cut.','Ella puso un vendaje sobre el corte.'],
['first aid','primeros auxilios','He learned basic first aid at school.','Aprendió primeros auxilios básicos en la escuela.'],
['carefully','con cuidado','I was walking carefully on the wet path.','Caminaba con cuidado por el sendero mojado.'],
['nearly','casi','I nearly fell when the bus stopped.','Casi me caigo cuando el autobús se detuvo.'],
['almost','casi','She almost dropped the glass.','Ella casi dejó caer el vaso.'],
['fortunately','afortunadamente','Fortunately, nobody was hurt.','Afortunadamente, nadie resultó herido.'],
['unfortunately','desafortunadamente','Unfortunately, the road was closed.','Desafortunadamente, la carretera estaba cerrada.'],
['recover','recuperarse','He recovered quickly from the injury.','Se recuperó rápidamente de la lesión.']],
lessons:[
['Resbalones y tropiezos','Cuenta cómo ocurrió un tropiezo o una caída.','Pasado simple para el hecho; pasado continuo para el contexto.',[0,1,2,3,4],'I was running when I tripped over a stone.'],
['Lesiones leves','Describe lesiones y partes del cuerpo afectadas.','Usa have/had + lesión y pasado simple para el resultado.',[5,6,7,8,9],'She had a bruise on her arm.'],
['Dolor y molestias','Explica cómo se sentía una lesión.','Was/were + adjetivo para describir estados pasados.',[10,11,12,13],'My knee was sore after the fall.'],
['Primeros auxilios','Describe cómo alguien atendió una lesión.','Usa pasado continuo para acciones de fondo y pasado simple para la intervención.',[14,15,16],'He was bleeding, so we used a bandage.'],
['Resultados y recuperación','Cuenta qué casi ocurrió y cómo terminó la situación.','Nearly y almost expresan que algo estuvo a punto de suceder.',[17,18,19,20,21],'I nearly fell when the bus stopped.']],
bank:['The injury was not serious.','She had a bruise on her arm.','He hurt his ankle during the game.','I hurt my wrist when I was carrying a box.','She hit her elbow on the door.']},
{n:8,title:'Secuenciar relatos y viajes',desc:'Organiza experiencias pasadas en orden y cuenta viajes con información sobre recorridos, alojamiento y visitas.',grammar:'Usa first of all, afterwards, later on y at last para ordenar acontecimientos. Combina los conectores con pasado simple.',trap:['Orden temporal','First of all, we checked in. Afterwards, we went sightseeing. Finally, we returned to the hotel.'],rows:[
['first of all','antes que nada','First of all, we bought the tickets.','Antes que nada, compramos los boletos.'],
['afterwards','después','We visited the museum and afterwards had lunch.','Visitamos el museo y después almorzamos.'],
['later on','más tarde','Later on, we walked along the river.','Más tarde, caminamos junto al río.'],
['at last','por fin','At last, the bus arrived.','Por fin, llegó el autobús.'],
['before long','poco después','Before long, the weather changed.','Poco después, cambió el clima.'],
['at the beginning','al principio','At the beginning, the town was quiet.','Al principio, el pueblo estaba tranquilo.'],
['towards the end','hacia el final','Towards the end, we visited the old market.','Hacia el final, visitamos el mercado antiguo.'],
['sightseeing','hacer turismo','We went sightseeing every morning.','Hicimos turismo todas las mañanas.'],
['tour','recorrido / excursión','The guided tour lasted two hours.','El recorrido guiado duró dos horas.'],
['tourist','turista','A tourist asked us for directions.','Un turista nos pidió indicaciones.'],
['tour guide','guía turístico','Our tour guide spoke clearly.','Nuestro guía turístico habló con claridad.'],
['guidebook','guía de viaje','I used a guidebook to find the museum.','Usé una guía de viaje para encontrar el museo.'],
['itinerary','itinerario','Our itinerary included three cities.','Nuestro itinerario incluía tres ciudades.'],
['journey','trayecto / viaje','The journey took five hours.','El viaje duró cinco horas.'],
['destination','destino','Our destination was a small coastal town.','Nuestro destino era un pequeño pueblo costero.'],
['departure','salida','The departure time changed.','La hora de salida cambió.'],
['arrival','llegada','Our arrival was later than expected.','Nuestra llegada fue más tarde de lo esperado.'],
['overnight','durante la noche','We stayed overnight near the airport.','Pasamos la noche cerca del aeropuerto.'],
['accommodation','alojamiento','The accommodation was clean and quiet.','El alojamiento estaba limpio y tranquilo.'],
['booking','reserva','I checked the hotel booking.','Revisé la reserva del hotel.'],
['check in','registrarse','We checked in at the hotel at noon.','Nos registramos en el hotel al mediodía.'],
['check out','dejar la habitación','We checked out early on Sunday.','Dejamos la habitación temprano el domingo.']],
lessons:[
['Conectores de secuencia','Ordena los primeros y últimos acontecimientos de un relato.','First of all introduce el inicio; afterwards y later on indican pasos posteriores.',[0,1,2,3,4],'First of all, we bought the tickets. Afterwards, we left.'],
['Inicio y final de un viaje','Describe qué hiciste al principio y hacia el final.','At the beginning y towards the end sitúan etapas del relato.',[5,6,7,8],'Towards the end, we visited the old market.'],
['Recorridos y guías','Habla de visitas, recorridos y materiales de orientación.','Usa pasado simple para contar qué hizo el guía o el turista.',[9,10,11,12],'Our tour guide used a guidebook.'],
['Trayecto y destino','Explica cuánto duró un viaje y cuál era el destino.','Journey y destination son sustantivos; departure y arrival nombran momentos.',[13,14,15,16],'Our journey ended at the destination.'],
['Alojamiento','Cuenta cómo te registraste y dejaste el alojamiento.','Check in y check out son expresiones verbales de viaje.',[17,18,19,20,21],'Our arrival was later than expected.']],
bank:['At the beginning, the town was quiet.','Towards the end, we visited the old market.','We went sightseeing every morning.','The guided tour lasted two hours.','A tourist asked us for directions.']},
{n:9,title:'Infancia y cambios personales',desc:'Compara hábitos y estados de la infancia con la vida actual usando used to.',grammar:'Used to + verbo base expresa hábitos o estados pasados que ya no son habituales. En preguntas y negativas se usa did/didn’t use to.',trap:['Used to no es el pasado de be used to','I used to play outside. / I did not use to have a phone. Después de did usa use to, sin -d.'],rows:[
['childhood','infancia','My childhood was very happy.','Mi infancia fue muy feliz.'],
['teenager','adolescente','As a teenager, I loved music.','Cuando era adolescente, me encantaba la música.'],
['teenage','adolescente / juvenil','She has many teenage memories.','Ella tiene muchos recuerdos de su adolescencia.'],
['grow up','crecer','As a teenager, I loved music.','Crecí en un pueblo pequeño.'],
['upbringing','crianza','His upbringing was very strict.','Su crianza fue muy estricta.'],
['schoolmate','compañero de escuela','I met an old schoolmate yesterday.','Ayer me encontré con un antiguo compañero de escuela.'],
['playground','patio de juegos','We used to play in the playground.','Solíamos jugar en el patio de juegos.'],
['nursery','guardería','My brother went to nursery at age three.','Mi hermano fue a la guardería a los tres años.'],
['primary school','escuela primaria','I started primary school in August.','Empecé la escuela primaria en agosto.'],
['secondary school','escuela secundaria','She changed schools in secondary school.','Ella cambió de escuela en secundaria.'],
['cartoon','dibujo animado','I started secondary school when I was twelve.','Solíamos ver dibujos animados después de la escuela.'],
['comic book','historieta / cómic','He collected comic books as a child.','Coleccionaba cómics cuando era niño.'],
['outdoor game','juego al aire libre','Our favorite outdoor game was hide-and-seek.','Nuestro juego favorito al aire libre era el escondite.'],
['family tradition','tradición familiar','My first teacher was strict.','El almuerzo del domingo era una tradición familiar.'],
['old-fashioned','anticuado','My parents had an old-fashioned radio.','Mis padres tenían una radio anticuada.'],
['strict','estricto / estricta','My first teacher was strict.','Mi primer maestro era estricto.'],
['naughty','travieso / traviesa','I was a naughty child sometimes.','A veces era un niño travieso.'],
['shy','tímido / tímida','She was shy when she was young.','Ella era tímida cuando era pequeña.'],
['confident','seguro de sí mismo','He is more confident now.','Ahora tiene más confianza en sí mismo.'],
['imagine','imaginar','We used to imagine exciting adventures.','Solíamos imaginar aventuras emocionantes.'],
['pretend','fingir','The children pretended to be explorers.','Los niños fingían ser exploradores.'],
['memory','recuerdo / memoria','That song brings back a happy memory.','Esa canción trae de vuelta un recuerdo feliz.']],
lessons:[
['Etapas de la vida','Habla de tu infancia y adolescencia.','Used to + verbo base para hábitos pasados.',[0,1,2,3],'I grew up in a small town.'],
['Escuela y compañeros','Describe la escuela y las personas que conocías.','Did not use to + verbo base para hábitos que no existían.',[4,5,6,7],'I used to meet my schoolmates at the playground.'],
['Juegos y entretenimiento','Compara juegos y actividades de antes.','Used to puede describir acciones repetidas en el pasado.',[8,9,10,11],'We used to watch cartoons after school.'],
['Costumbres familiares','Describe tradiciones y normas de la infancia.','Was/were + adjetivo para estados pasados; used to para costumbres.',[12,13,14,15],'Sunday lunch was a family tradition.'],
['Personalidad y recuerdos','Explica cómo eras y cómo has cambiado.','En preguntas usa Did + sujeto + use to + verbo.',[16,17,18,19,20,21],'I am more confident now.']],
bank:['I met an old schoolmate yesterday.','We used to play in the playground.','My brother went to nursery at age three.','I started primary school in August.','She changed schools in secondary school.']}
];
const units=data.map(makeUnit);
const mcReview=(id,target,translation)=>({vocabId:id,type:'mc',prompt:'¿Qué significa «'+target+'»?',options:[translation,'otra opción','una opción diferente'],answer:0,explanation:'Recupera vocabulario de unidades anteriores.'});
const orderReview=(id,s)=>{const words=s.split(' ');return {vocabId:id,type:'order',prompt:'Ordena la frase de repaso.',words,correctOrder:words.slice(),explanation:'Recupera una estructura ya estudiada.'};};
const reviewLessons=[
{title:'Hábitos y cambios',objective:'Contrasta hábitos y situaciones temporales.',grammar:'Presente simple frente a presente continuo.',ids:[[1,1],[1,22],[1,21],[1,18]],model:'They usually train indoors.',mcTarget:'lifestyle',mcEsp:'estilo de vida'},
{title:'Frecuencia y horarios',objective:'Recupera adverbios de frecuencia y expresiones temporales.',grammar:'Posición de adverbios y expresiones de tiempo.',ids:[[2,1],[2,17],[2,14],[2,21]],model:'I occasionally check my timetable in advance.',mcTarget:'occasionally',mcEsp:'ocasionalmente'},
{title:'Aficiones y preferencias',objective:'Recupera patrones de intereses y aficiones.',grammar:'Enjoy + -ing; want to + verbo.',ids:[[3,1],[3,4],[3,12],[3,9]],model:'I am interested in taking up pottery.',mcTarget:'be interested in',mcEsp:'estar interesado en'},
{title:'Relatos y celebraciones',objective:'Integra pasado simple con experiencias y eventos.',grammar:'Pasado simple afirmativo, negativo e interrogativo.',ids:[[4,11],[5,4],[4,13],[5,14]],model:'We celebrated the wedding last month.',mcTarget:'celebrate',mcEsp:'celebrar'},
{title:'Acciones e interrupciones',objective:'Integra acciones en progreso y hechos puntuales.',grammar:'Pasado continuo frente a pasado simple.',ids:[[6,2],[6,17],[6,8],[6,21]],model:'All of a sudden, the storm began.',mcTarget:'all of a sudden',mcEsp:'de repente'}
];
const lessons=reviewLessons.map(l=>({title:l.title,objective:l.objective,grammar:l.grammar,vocabIds:[],reviewVocabIds:l.ids.map(([u,i])=>'en_a2_u'+u+'_v'+String(i).padStart(2,'0')),exercises:[mcReview('en_a2_u'+l.ids[0][0]+'_v'+String(l.ids[0][1]).padStart(2,'0'),l.mcTarget,l.mcEsp),orderReview('en_a2_u'+l.ids[1][0]+'_v'+String(l.ids[1][1]).padStart(2,'0'),l.model)]}));
const idOf=([u,i])=>'en_a2_u'+u+'_v'+String(i).padStart(2,'0');const bank=[];for(const l of reviewLessons)bank.push(mcReview(idOf(l.ids[0]),l.mcTarget,l.mcEsp));for(const l of reviewLessons)bank.push(orderReview(idOf(l.ids[1]),l.model));
units.push({unitNumber:10,id:'en_a2_u10',title:'Unidad 10: Repaso integrado I',desc:'Integra hábitos, frecuencia, aficiones, relatos pasados y acciones en progreso. No introduce vocabulario nuevo.',grammar:'Recuperación espaciada de presente simple/continuo, pasado simple y pasado continuo.',trap:{title:'Elegir el tiempo según el contexto',detail:'Distingue hábitos, situaciones temporales, hechos pasados y acciones que estaban en progreso.'},vocab:[],lessons,exercises:bank});
root.GUARDI_CURRICULUM_BLOCKS=root.GUARDI_CURRICULUM_BLOCKS||{};root.GUARDI_CURRICULUM_BLOCKS.en=root.GUARDI_CURRICULUM_BLOCKS.en||{};root.GUARDI_CURRICULUM_BLOCKS.en.A2=root.GUARDI_CURRICULUM_BLOCKS.en.A2||{};root.GUARDI_CURRICULUM_BLOCKS.en.A2['07-10']={units};
})(typeof window!=='undefined'?window:globalThis);
