(function(root){
'use strict';
const vocab=(unit,rows)=>rows.map((row,index)=>{const [target,esp,ex,exEsp]=row;return {id:'en_a1_u'+unit+'_v'+String(index+1).padStart(2,'0'),target,esp,ex,exEsp,verification:{status:'not_checked',sources:[]}};});
const mc=(word,prompt,options)=>({vocabId:word.id,type:'mc',prompt,options,answer:0,explanation:'Selecciona el significado correcto.'});
const order=(word,prompt,sentence)=>{const words=sentence.split(' ');return {vocabId:word.id,type:'order',prompt,words,correctOrder:words.slice(),explanation:'Orden básico de la frase.'};};
const lesson=(title,objective,grammar,words,model)=>({title,objective,grammar,vocabIds:words.map(w=>w.id),reviewVocabIds:[],exercises:[mc(words[0],'¿Qué significa «'+words[0].target+'»?',[words[0].esp,words[1].esp,words[2].esp]),order(words[1],'Ordena la frase.',model)]});
const unit=(number,title,desc,grammar,trapTitle,trapDetail,rows,specs,bankModels)=>{
 const words=vocab(number,rows);
 const lessons=specs.map(spec=>lesson(spec[0],spec[1],spec[2],spec[3].map(i=>words[i]),spec[4]));
 const exercises=[];
 for(let i=0;i<5;i++) exercises.push(mc(words[i],'Elige la traducción de «'+words[i].target+'».',[words[i].esp,words[(i+7)%22].esp,words[(i+13)%22].esp]));
 for(let i=0;i<5;i++) exercises.push(order(words[5+i],'Ordena la frase.',bankModels[i]));
 return {unitNumber:number,id:'en_a1_u'+number,title:'Unidad '+number+': '+title,desc,grammar,trap:{title:trapTitle,detail:trapDetail},vocab:words,lessons,exercises};
};
const units=[
unit(19,'Gustos y pasatiempos','Expresa gustos y preferencias sobre música, deportes y actividades de tiempo libre.','Like/love + sustantivo expresa gusto por algo; like/love + verbo en -ing expresa gusto por una actividad: I like music; I like playing chess.','Like + -ing para actividades','Para hablar de una actividad después de like/love, usa la forma -ing: I like painting, no “I like paint” en este sentido.',[
['hobby','pasatiempo','My hobby is photography.','Mi pasatiempo es la fotografía.'],
['music','música','I love music.','Me encanta la música.'],
['football','fútbol','We like football.','Nos gusta el fútbol.'],
['basketball','baloncesto','She likes basketball.','A ella le gusta el baloncesto.'],
['tennis','tenis','They love tennis.','Les encanta el tenis.'],
['volleyball','voleibol','He likes volleyball.','A él le gusta el voleibol.'],
['guitar','guitarra','I like playing the guitar.','Me gusta tocar la guitarra.'],
['piano','piano','She loves the piano.','A ella le encanta el piano.'],
['movie','película','We like this movie.','Nos gusta esta película.'],
['concert','concierto','They love concerts.','Les encantan los conciertos.'],
['camera','cámara','His camera is new.','Su cámara es nueva.'],
['photograph','fotografía / foto','I take a photograph.','Tomo una fotografía.'],
['chess','ajedrez','He likes playing chess.','A él le gusta jugar ajedrez.'],
['puzzle','rompecabezas','We enjoy this puzzle.','Disfrutamos este rompecabezas.'],
['painting','pintura / pintar','She likes painting.','A ella le gusta pintar.'],
['photography','fotografía','Photography is my hobby.','La fotografía es mi pasatiempo.'],
['video game','videojuego','I play a video game.','Juego un videojuego.'],
['board game','juego de mesa','They enjoy this board game.','Disfrutan este juego de mesa.'],
['favorite','favorito / favorita','My favorite sport is tennis.','Mi deporte favorito es el tenis.'],
['fun','diversión / divertido','This game is fun.','Este juego es divertido.'],
['enjoy','disfrutar','We enjoy music.','Disfrutamos la música.'],
['collect','coleccionar','I collect photographs.','Colecciono fotografías.']
],[
['Lección 1: Música y deportes','Expresa gustos sobre música y deportes.','Like/love + sustantivo: I love music; she likes basketball.',[0,1,2,3,4],'I love music.'],
['Lección 2: Instrumentos y conciertos','Habla de instrumentos y eventos musicales.','Like/love + verbo en -ing para actividades: I like playing the guitar.',[5,6,7,8,9],'I like playing the guitar.'],
['Lección 3: Juegos y pasatiempos','Nombra juegos y expresa qué disfrutas.','Enjoy suele ir seguido de sustantivo o verbo en -ing.',[12,13,16,17],'We enjoy this puzzle.'],
['Lección 4: Arte y fotografía','Describe intereses artísticos y fotográficos.','Painting y photography pueden funcionar como nombres de actividades.',[10,11,14,15],'I take a photograph.'],
['Lección 5: Preferencias personales','Habla de favoritos y colecciones.','Favorite precede al sustantivo; enjoy + -ing describe una actividad que disfrutas.',[18,19,20,21],'This game is fun.']
],['He likes volleyball.','I like playing the guitar.','She loves the piano.','We like this movie.','They love concerts.']),
unit(20,'Deseos y planes','Expresa deseos y planes sencillos con want to + verbo y vocabulario de salidas.','Want/need/plan/hope + to-infinitive: I want to visit the museum. Después de want to va la forma base del verbo.','No omitas to después de want','La estructura básica es want + to + verbo: “I want to go”, no “I want go”.',[
['want','querer','I want to visit the zoo.','Quiero visitar el zoológico.'],
['need','necesitar','We need to buy a map.','Necesitamos comprar un mapa.'],
['plan','planear','They plan to travel in June.','Planean viajar en junio.'],
['hope','esperar / tener esperanza','I hope to see the beach.','Espero ver la playa.'],
['decide','decidir','She decides to go camping.','Ella decide ir de campamento.'],
['learn','aprender','He wants to learn English.','Él quiere aprender inglés.'],
['explore','explorar','We want to explore a museum.','Queremos explorar un museo.'],
['buy','comprar','I need to buy a ticket.','Necesito comprar un boleto.'],
['save','ahorrar / guardar','They save money for a trip.','Ahorran dinero para un viaje.'],
['spend','gastar / pasar tiempo','We spend a day at the beach.','Pasamos un día en la playa.'],
['trip','viaje','The trip is short.','El viaje es corto.'],
['museum','museo','The museum is open.','El museo está abierto.'],
['park','parque','We walk in the park.','Caminamos en el parque.'],
['beach','playa','The beach is beautiful.','La playa es bonita.'],
['zoo','zoológico','The zoo has many animals.','El zoológico tiene muchos animales.'],
['library','biblioteca','I study at the library.','Estudio en la biblioteca.'],
['camping','acampar / campamento','We like camping.','Nos gusta acampar.'],
['fishing','pescar / pesca','He enjoys fishing.','Él disfruta pescar.'],
['picnic','día de campo / pícnic','They have a picnic in the park.','Hacen un pícnic en el parque.'],
['vacation','vacaciones','My vacation starts in July.','Mis vacaciones empiezan en julio.'],
['reservation','reserva','We have a hotel reservation.','Tenemos una reserva de hotel.'],
['souvenir','recuerdo / souvenir','I buy a souvenir.','Compro un recuerdo.']
],[
['Lección 1: Querer y necesitar','Expresa deseos y necesidades.','Want/need + to + verbo base: I want to visit; we need to buy.',[0,1,5,7],'We need to buy a map.'],
['Lección 2: Hacer planes','Describe planes y esperanzas.','Plan/hope/decide + to-infinitive.',[2,3,4,6],'I hope to see the beach.'],
['Lección 3: Lugares para visitar','Nombra destinos y lugares de ocio.','Want to + verbo permite expresar el propósito de una salida.',[11,12,13,14,15],'We walk in the park.'],
['Lección 4: Actividades al aire libre','Habla de acampar, pescar y hacer pícnics.','Like/enjoy + sustantivo o verbo en -ing; camping y fishing nombran actividades.',[16,17,18,19],'He enjoys fishing.'],
['Lección 5: Viajes y compras','Habla de viajes, reservas y recuerdos.','Buy/save/spend son verbos en forma base después de want/need to.',[8,9,10,20,21],'We spend a day at the beach.']
],['He wants to learn English.','We want to explore a museum.','I need to buy a ticket.','They save money for a trip.','We spend a day at the beach.']),
unit(21,'Preguntas sobre gustos y tiempo libre','Formula preguntas abiertas y de seguimiento sobre personas, actividades y preferencias.','Las preguntas WH comienzan con what/where/who/when/why/how y continúan con el auxiliar y el sujeto: What do you like? Who does she play with?','Orden de la pregunta','En preguntas con do/does, el auxiliar va antes del sujeto: Where do they play? No uses orden afirmativo.',[
['classmate','compañero / compañera de clase','My classmate likes tennis.','A mi compañero de clase le gusta el tenis.'],
['neighbor','vecino / vecina','Our neighbor plays chess.','Nuestro vecino juega ajedrez.'],
['guest','invitado / invitada','The guest likes music.','A la invitada le gusta la música.'],
['coach','entrenador / entrenadora','The coach teaches tennis.','El entrenador enseña tenis.'],
['player','jugador / jugadora','The player practices every day.','El jugador practica todos los días.'],
['club','club','She joins a music club.','Ella se une a un club de música.'],
['match','partido','The match starts at six.','El partido empieza a las seis.'],
['competition','competencia','He likes the competition.','A él le gusta la competencia.'],
['winner','ganador / ganadora','Who is the winner?','¿Quién es el ganador?'],
['score','marcador / puntuación','What is the score?','¿Cuál es el marcador?'],
['rule','regla / norma','What is the rule?','¿Cuál es la regla?'],
['interview','entrevista','The interview is short.','La entrevista es corta.'],
['interviewer','entrevistador / entrevistadora','The interviewer asks questions.','La entrevistadora hace preguntas.'],
['hometown','ciudad natal','Where is your hometown?','¿Dónde está tu ciudad natal?'],
['kind','tipo / clase','What kind of music do you like?','¿Qué tipo de música te gusta?'],
['type','tipo','Which type do you prefer?','¿Qué tipo prefieres?'],
['reason','razón / motivo','Why do you like this game?','¿Por qué te gusta este juego?'],
['subject','materia / asignatura','What is your favorite subject?','¿Cuál es tu materia favorita?'],
['topic','tema','The topic is music.','El tema es la música.'],
['detail','detalle','Can you give one detail?','¿Puedes dar un detalle?'],
['opinion','opinión','What is your opinion?','¿Cuál es tu opinión?'],
['information','información','I need more information.','Necesito más información.']
],[
['Lección 1: Personas y actividades','Pregunta por compañeros, vecinos e invitados.','Usa who para preguntar por personas y what para preguntar por actividades.',[0,1,2,3],'Our neighbor plays chess.'],
['Lección 2: Clubes y deportes','Pregunta por clubes, partidos y competencias.','What/when + do/does + sujeto + verbo base.',[4,5,6,7],'She joins a music club.'],
['Lección 3: Resultados y reglas','Pregunta por ganadores, marcadores y reglas.','Who/what pueden ser sujeto de la pregunta: Who is the winner?',[8,9,10,11],'What is the score?'],
['Lección 4: Entrevistas y preferencias','Pregunta por gustos, tipos y razones.','What kind/type of + sustantivo pregunta por una categoría; why pregunta por una razón.',[14,13,12,15,16],'Where is your hometown?'],
['Lección 5: Temas y opiniones','Pide información y expresa opiniones.','What/which + sustantivo y can you…? permiten pedir detalles y opiniones.',[17,18,19,20,21],'The topic is music.']
],['She joins a music club.','The match starts at six.','He likes the competition.','Who is the winner?','What is the score?']),
unit(22,'Presente continuo I: acciones ahora','Describe acciones que ocurren en este momento con be + verbo en -ing.','El presente continuo se forma con am/is/are + verbo-ing. Se usa para acciones en progreso ahora; la forma negativa añade not después de be.','No olvides el verbo be','La forma continua necesita am/is/are: “She is talking”. El verbo con -ing no funciona solo como verbo principal.',[
['talk','hablar / conversar','They are talking now.','Están conversando ahora.'],
['wait','esperar','I am waiting for the bus.','Estoy esperando el autobús.'],
['sit','sentarse / estar sentado','She is sitting by the window.','Ella está sentada junto a la ventana.'],
['stand','estar de pie','He is standing near the door.','Él está de pie cerca de la puerta.'],
['hold','sostener / sujetar','I am holding a cup.','Estoy sosteniendo una taza.'],
['smile','sonreír','The baby is smiling and has a smile.','El bebé está sonriendo.'],
['cry','llorar','The child is crying.','El niño está llorando.'],
['laugh','reír','They are laughing.','Se están riendo.'],
['look','mirar','She is looking at the picture.','Ella está mirando el cuadro.'],
['point','señalar','He is pointing at the map.','Él está señalando el mapa.'],
['push','empujar','I am pushing the door.','Estoy empujando la puerta.'],
['pull','tirar / jalar','They are pulling the box.','Están jalando la caja.'],
['carry','llevar / cargar','She is carrying a bag.','Ella está cargando una bolsa.'],
['wear','llevar puesto','He is wearing a jacket.','Él lleva puesta una chaqueta.'],
['shine','brillar','The sun is shining.','El sol está brillando.'],
['fall','caer','The leaves are falling.','Las hojas están cayendo.'],
['blow','soplar','The wind is blowing.','El viento está soplando.'],
['happen','suceder / pasar','What is happening?','¿Qué está pasando?'],
['move','mover(se)','The bus is moving.','El autobús está en movimiento.'],
['hurry','apresurarse','We are hurrying now.','Nos estamos apresurando ahora.'],
['knock','tocar (la puerta)','Someone is knocking.','Alguien está tocando la puerta.'],
['wave','saludar con la mano','She is waving hello.','Ella está saludando con la mano.']
],[
['Lección 1: Hablar y esperar','Describe acciones de comunicación y espera.','Am/is/are + verbo-ing expresa acciones en progreso.',[0,1,2,3],'I am waiting for the bus.'],
['Lección 2: Gestos y emociones','Describe sonrisas, llanto y risa.','Los verbos terminados en -e suelen perder la e: smile → smiling; los de una sílaba pueden duplicar consonante: sit → sitting.',[4,5,6,7],'The baby is smiling.'],
['Lección 3: Mirar y señalar','Describe acciones con objetos y lugares.','Usa am/is/are según el sujeto: she is looking; he is pointing.',[8,9,10,11],'He is pointing at the map.'],
['Lección 4: Acciones con objetos','Describe cargar, vestir y mover objetos.','El verbo principal lleva -ing: carrying, wearing, moving.',[12,13,18,19],'He is wearing a jacket.'],
['Lección 5: Lo que sucede afuera','Describe movimientos y acciones visibles.','El presente continuo también describe cambios en progreso: the sun is shining; the leaves are falling.',[14,15,16,17,20,21],'The leaves are falling.']
],['The baby is smiling.','The child is crying.','They are laughing.','She is looking at the picture.','He is pointing at the map.']),
unit(23,'Ropa y clima','Nombra prendas y describe el tiempo atmosférico y lo que alguien lleva puesto.','Usa wear para prendas habituales y be wearing para lo que alguien lleva puesto ahora. It is + adjetivo describe el clima: It is sunny/hot.','Wear y be wearing','Wear suele expresar lo que alguien lleva puesto; be wearing destaca la ropa que tiene puesta en este momento.',[
['shirt','camisa','He is wearing a white shirt.','Él lleva puesta una camisa blanca.'],
['T-shirt','camiseta','I am wearing a T-shirt.','Llevo puesta una camiseta.'],
['pants','pantalones','These pants are black.','Estos pantalones son negros.'],
['jeans','vaqueros / jeans','She is wearing jeans.','Ella lleva jeans.'],
['skirt','falda','The skirt is blue.','La falda es azul.'],
['dress','vestido','Her dress is beautiful.','Su vestido es bonito.'],
['shoes','zapatos','My shoes are new.','Mis zapatos son nuevos.'],
['socks','calcetines','These socks are white.','Estos calcetines son blancos.'],
['jacket','chaqueta','He is wearing a jacket.','Él lleva puesta una chaqueta.'],
['hat','sombrero / gorra','The hat is red.','El sombrero es rojo.'],
['sweater','suéter / jersey','I need a sweater.','Necesito un suéter.'],
['boots','botas','Her boots are brown.','Sus botas son marrones.'],
['sneakers','zapatillas deportivas','My sneakers are comfortable.','Mis zapatillas son cómodas.'],
['shorts','pantalones cortos','He wears shorts in summer.','Él usa pantalones cortos en verano.'],
['weather','clima / tiempo','The weather is nice today.','El clima está agradable hoy.'],
['sunny','soleado','It is sunny now.','Está soleado ahora.'],
['cloudy','nublado','It is cloudy this morning.','Está nublado esta mañana.'],
['rainy','lluvioso','It is rainy today.','Hoy está lluvioso.'],
['windy','ventoso','It is windy outside.','Hace viento afuera.'],
['snowy','nevado','It is snowy in the mountains.','Hay nieve en las montañas.'],
['hot','caliente / caluroso','It is hot today.','Hoy hace calor.'],
['cold','frío','It is cold outside.','Hace frío afuera.']
],[
['Lección 1: Prendas de arriba','Nombra camisas, camisetas y chaquetas.','Be wearing + prenda describe la ropa que alguien lleva puesta ahora.',[0,1,8,9],'I am wearing a T-shirt.'],
['Lección 2: Pantalones y otras prendas','Describe pantalones, faldas y vestidos.','Pants y jeans tienen forma plural; usa are: these pants are black.',[2,3,4,5],'She is wearing jeans.'],
['Lección 3: Calzado y abrigo','Nombra zapatos, calcetines y prendas para el frío.','Shoes, socks, boots y sneakers suelen usarse en plural.',[6,7,10,11,12,13],'These socks are white.'],
['Lección 4: Describir el clima','Describe sol, nubes, lluvia, viento y nieve.','It is + adjetivo: it is sunny, cloudy, rainy, windy o snowy.',[14,15,16,17,18],'It is sunny now.'],
['Lección 5: Temperatura y ropa','Combina ropa y temperatura en descripciones sencillas.','Hot/cold describen temperatura; be wearing describe lo que una persona tiene puesto ahora.',[19,20,21,8,10],'It is hot today.']
],['She is wearing a dress.','My shoes are new.','These socks are white.','I need a jacket.','The hat is blue.']),
unit(24,'Lugares de la ciudad','Reconoce lugares y elementos urbanos comunes para describir dónde están.','Usa there is/are para indicar existencia y preposiciones básicas para situar lugares: on the corner, next to, across from.','Street, road y avenue','Street, road y avenue se relacionan con vías, pero no son intercambiables en todos los nombres propios. Aprende las expresiones como unidades.',[
['street','calle','The bank is on this street.','El banco está en esta calle.'],
['avenue','avenida','The hotel is on the avenue.','El hotel está en la avenida.'],
['road','carretera / camino','The road is long.','La carretera es larga.'],
['corner','esquina','The store is on the corner.','La tienda está en la esquina.'],
['traffic light','semáforo','Turn at the traffic light.','Gira en el semáforo.'],
['crosswalk','paso peatonal','Use the crosswalk.','Usa el paso peatonal.'],
['sidewalk','acera / banqueta','Walk on the sidewalk.','Camina por la acera.'],
['bridge','puente','The bridge is near the station.','El puente está cerca de la estación.'],
['town square','plaza central','The town square is in the center.','La plaza central está en el centro.'],
['bank','banco','The bank is next to the hotel.','El banco está junto al hotel.'],
['post office','oficina de correos','The post office is across from the bank.','La oficina de correos está enfrente del banco.'],
['police station','estación de policía','The police station is on this street.','La estación de policía está en esta calle.'],
['fire station','estación de bomberos','The fire station is near the bridge.','La estación de bomberos está cerca del puente.'],
['supermarket','supermercado','The supermarket is open.','El supermercado está abierto.'],
['pharmacy','farmacia','The pharmacy is next to the clinic.','La farmacia está junto a la clínica.'],
['bakery','panadería','The bakery is on the corner.','La panadería está en la esquina.'],
['restaurant','restaurante','The restaurant is across from the hotel.','El restaurante está enfrente del hotel.'],
['hotel','hotel','The hotel is near the airport.','El hotel está cerca del aeropuerto.'],
['airport','aeropuerto','The airport is far from the city.','El aeropuerto está lejos de la ciudad.'],
['train station','estación de tren','The train station is in the center.','La estación de tren está en el centro.'],
['church','iglesia','The church is near the town square.','La iglesia está cerca de la plaza.'],
['gas station','gasolinera','The gas station is on the road.','La gasolinera está en la carretera.']
],[
['Lección 1: Calles y vías','Reconoce calles, avenidas, carreteras y esquinas.','Street, avenue y road nombran vías; corner indica el punto donde se encuentran.',[0,1,2,3],'The hotel is on the avenue.'],
['Lección 2: Seguridad peatonal','Nombra semáforos, pasos peatonales y aceras.','Usa imperativos breves para instrucciones: turn, use, walk.',[4,5,6,7],'Use the crosswalk.'],
['Lección 3: Servicios públicos','Ubica bancos, correos y estaciones de emergencia.','There is/are introduce existencia; next to y across from indican relación espacial.',[8,9,10,11,12],'The post office is across from the bank.'],
['Lección 4: Compras y comida','Nombra supermercados, farmacias, panaderías y restaurantes.','Usa the con lugares específicos: the pharmacy, the restaurant.',[13,14,15,16],'The pharmacy is next to the clinic.'],
['Lección 5: Viajes y lugares públicos','Ubica hoteles, aeropuertos, estaciones e iglesias.','Near/far y on/in ayudan a describir la ubicación de lugares.',[17,18,19,20,21],'The airport is far from the city.']
],['Use the crosswalk.','Walk on the sidewalk.','The fire station is near the bridge.','The bank is next to the hotel.','The post office is across from the bank.'])
];
root.GUARDI_CURRICULUM_BLOCKS=root.GUARDI_CURRICULUM_BLOCKS||{};
root.GUARDI_CURRICULUM_BLOCKS.en=root.GUARDI_CURRICULUM_BLOCKS.en||{};
root.GUARDI_CURRICULUM_BLOCKS.en.A1=root.GUARDI_CURRICULUM_BLOCKS.en.A1||{};
root.GUARDI_CURRICULUM_BLOCKS.en.A1['19-24']={units};
})(typeof window!=='undefined'?window:globalThis);
