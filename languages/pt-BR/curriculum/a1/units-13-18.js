(function(root){
'use strict';
const v=(id,target,esp,ex,exEsp)=>({id,target,esp,ex,exEsp,verification:{status:'not_checked',sources:[]}});
const mc=(vocabId,prompt,options,answer)=>({vocabId,type:'mc',prompt,options,answer,explanation:'Práctica introductoria; pendiente de cotejo lingüístico.'});
const order=(vocabId,prompt,words,correctOrder)=>({vocabId,type:'order',prompt,words,correctOrder,explanation:'Orden básico de la frase.'});
const write=(vocabId,prompt,modelAnswer)=>({vocabId,type:'order',prompt,words:modelAnswer.replace(/[.!?]/g,'').split(' '),correctOrder:modelAnswer.replace(/[.!?]/g,'').split(' '),explanation:'Construye la frase con las palabras disponibles; el modelo no es la única respuesta posible.'});
const lesson=(title,objective,grammar,vocabIds,reviewVocabIds,exercises)=>({title,objective,grammar,vocabIds,reviewVocabIds,exercises});


const u13=[
v('ptbr_a1_u13_v01','ler','leer','Eu gosto de ler.','Me gusta leer.'),
v('ptbr_a1_u13_v02','livro','libro','Este livro é interessante.','Este libro es interesante.'),
v('ptbr_a1_u13_v03','escrever','escribir','Eu escrevo no caderno.','Escribo en el cuaderno.'),
v('ptbr_a1_u13_v04','desenhar','dibujar','Ela gosta de desenhar.','A ella le gusta dibujar.'),
v('ptbr_a1_u13_v05','pintar','pintar','Eu gosto de pintar.','Me gusta pintar.'),
v('ptbr_a1_u13_v06','cantar','cantar','Nós gostamos de cantar.','Nos gusta cantar.'),
v('ptbr_a1_u13_v07','dançar','bailar','Ele gosta de dançar.','A él le gusta bailar.'),
v('ptbr_a1_u13_v08','tocar','tocar (instrumento)','Eu sei tocar violão.','Sé tocar la guitarra.'),
v('ptbr_a1_u13_v09','violão','guitarra acústica','O violão é novo.','La guitarra acústica es nueva.'),
v('ptbr_a1_u13_v10','fotografia','fotografía','A fotografia é bonita.','La fotografía es bonita.')
];
const u13Lessons=[
lesson('Lección 1: Leer y escribir','Nombra actividades de lectura y escritura.','Ler y escrever son verbos en infinitivo; livro es el objeto que puedes leer.',u13.slice(0,3).map(x=>x.id),[],[mc(u13[0].id,'¿Qué significa ler?',['leer','escribir','dibujar'],0),mc(u13[1].id,'¿Qué significa livro?',['cuaderno','libro','lápiz'],1)]),
lesson('Lección 2: Dibujar y pintar','Habla de actividades artísticas.','Desenhar es dibujar y pintar es pintar; ambos pueden expresar aficiones.',u13.slice(3,5).map(x=>x.id),[],[mc(u13[3].id,'¿Qué significa desenhar?',['cantar','dibujar','bailar'],1),mc(u13[4].id,'¿Qué significa pintar?',['pintar','leer','tocar'],0)]),
lesson('Lección 3: Cantar y bailar','Nombra actividades con música.','Cantar y dançar son verbos regulares en -ar; música ya apareció en U3 y aquí se reutiliza como contexto.',u13.slice(5,8).map(x=>x.id),['ptbr_a1_u3_v10'],[mc(u13[5].id,'¿Qué significa cantar?',['bailar','cantar','escribir'],1),mc(u13[6].id,'¿Qué significa dançar?',['bailar','pintar','leer'],0)]),
lesson('Lección 4: Tocar un instrumento','Expresa que sabes tocar un instrumento.','Tocar puede referirse a un instrumento; violão es una guitarra acústica de cuerdas.',[u13[7].id,u13[8].id,u13[5].id],[],[mc(u13[8].id,'¿Qué significa violão?',['violín','guitarra acústica','piano'],1),order(u13[7].id,'Ordena: «Sé tocar la guitarra».',['violão','tocar','sei','Eu'],['Eu','sei','tocar','violão'])]),
lesson('Lección 5: Mis aficiones','Combina actividades creativas y culturales.','Puedes expresar una afición con gostar de + infinitivo: gosto de ler, gosto de cantar.',u13.map(x=>x.id),['ptbr_a1_u3_v05'],[write(u13[0].id,'Construye: «Me gusta leer».','Eu gosto de ler.'),mc(u13[9].id,'¿Qué significa fotografia?',['pintura','fotografía','música'],1)])
];
const unit13={unitNumber:13,id:'ptbr_a1_u13',title:'Unidad 13: Lectura y aficiones creativas',desc:'Habla de lectura, escritura, dibujo, música y otras aficiones.',grammar:'Infinitivos de actividades; gostar de + infinitivo; tocar un instrumento.',trap:{title:'Gostar de + infinitivo',detail:'Para expresar una afición se usa gostar de + verbo en infinitivo: gosto de ler, gosto de cantar.'},vocab:u13,lessons:u13Lessons,exercises:[
mc(u13[0].id,'¿Qué significa ler?',['leer','escribir','dibujar'],0),mc(u13[1].id,'¿Qué significa livro?',['libro','cuaderno','lápiz'],0),mc(u13[2].id,'¿Qué significa escrever?',['pintar','escribir','cantar'],1),mc(u13[3].id,'¿Qué significa desenhar?',['dibujar','bailar','leer'],0),mc(u13[4].id,'¿Qué significa pintar?',['leer','pintar','tocar'],1),mc(u13[5].id,'¿Qué significa cantar?',['cantar','dibujar','escribir'],0),mc(u13[6].id,'¿Qué significa dançar?',['bailar','cantar','pintar'],0),mc(u13[7].id,'¿Qué significa tocar?',['tocar','leer','correr'],0),mc(u13[8].id,'¿Qué significa violão?',['piano','guitarra acústica','violín'],1),mc(u13[9].id,'¿Qué significa fotografia?',['música','fotografía','pintura'],1)
]};
const u14=[
v('ptbr_a1_u14_v01','esporte','deporte','O futebol é um esporte.','El fútbol es un deporte.'),
v('ptbr_a1_u14_v02','futebol','fútbol','Eu gosto de futebol.','Me gusta el fútbol.'),
v('ptbr_a1_u14_v03','vôlei','voleibol','Ela joga vôlei.','Ella juega voleibol.'),
v('ptbr_a1_u14_v04','basquete','baloncesto','Nós jogamos basquete.','Jugamos baloncesto.'),
v('ptbr_a1_u14_v05','jogar','jugar','Eu gosto de jogar bola.','Me gusta jugar a la pelota.'),
v('ptbr_a1_u14_v06','nadar','nadar','Eu gosto de nadar.','Me gusta nadar.'),
v('ptbr_a1_u14_v07','correr','correr','Ele gosta de correr.','A él le gusta correr.'),
v('ptbr_a1_u14_v08','caminhar','caminar','Nós caminhamos no parque.','Caminamos en el parque.'),
v('ptbr_a1_u14_v09','bicicleta','bicicleta','Minha bicicleta é azul.','Mi bicicleta es azul.'),
v('ptbr_a1_u14_v10','bola','pelota','A bola é grande.','La pelota es grande.')
];
const u14Lessons=[
lesson('Lección 1: Deportes de equipo','Reconoce nombres de deportes populares.','Esporte es la categoría; futebol, vôlei y basquete son deportes.',u14.slice(0,4).map(x=>x.id),[],[mc(u14[0].id,'¿Qué significa esporte?',['deporte','equipo','pelota'],0),mc(u14[2].id,'¿Qué significa vôlei?',['fútbol','voleibol','baloncesto'],1)]),
lesson('Lección 2: El verbo jogar','Habla de jugar a un deporte.','Jogar se usa con juegos y deportes: jogar futebol, jogar vôlei, jogar basquete.',[u14[4].id,u14[1].id,u14[2].id,u14[3].id],[],[mc(u14[4].id,'¿Qué significa jogar?',['jugar','nadar','caminar'],0),order(u14[1].id,'Ordena: «Me gusta el fútbol».',['futebol','de','gosto','Eu'],['Eu','gosto','de','futebol'])]),
lesson('Lección 3: Nadar y correr','Nombra actividades físicas individuales.','Nadar y correr son verbos en infinitivo que pueden seguir a gostar de.',[u14[5].id,u14[6].id,u13[0].id],[],[mc(u14[5].id,'¿Qué significa nadar?',['correr','nadar','caminar'],1),mc(u14[6].id,'¿Qué significa correr?',['cantar','correr','nadar'],1)]),
lesson('Lección 4: Caminar y andar en bicicleta','Describe movimiento y transporte recreativo.','Caminhar significa caminar; bicicleta es un sustantivo femenino: a bicicleta.',[u14[7].id,u14[8].id,u14[9].id],[],[mc(u14[7].id,'¿Qué significa caminhar?',['caminar','correr','jugar'],0),mc(u14[8].id,'¿Qué significa bicicleta?',['pelota','bicicleta','cancha'],1)]),
lesson('Lección 5: Mis deportes','Combina deportes, actividades y objetos.','Jogar + deporte y gostar de + infinitivo permiten expresar preferencias sencillas.',u14.map(x=>x.id),[u13[4].id],[write(u14[5].id,'Construye: «Me gusta nadar».','Eu gosto de nadar.'),mc(u14[9].id,'¿Qué significa bola?',['bicicleta','pelota','deporte'],1)])
];
const unit14={unitNumber:14,id:'ptbr_a1_u14',title:'Unidad 14: Deportes y movimiento',desc:'Nombra deportes, actividades físicas y objetos para jugar.',grammar:'Esportes; jogar + deporte; gostar de + infinitivo; verbos nadar, correr y caminhar.',trap:{title:'Jogar y tocar',detail:'Jogar se usa para jugar a deportes o juegos; tocar se usa, entre otros sentidos, para tocar un instrumento.'},vocab:u14,lessons:u14Lessons,exercises:[
mc(u14[0].id,'¿Qué significa esporte?',['deporte','pelota','equipo'],0),mc(u14[1].id,'¿Qué significa futebol?',['voleibol','fútbol','baloncesto'],1),mc(u14[2].id,'¿Qué significa vôlei?',['voleibol','fútbol','baloncesto'],0),mc(u14[3].id,'¿Qué significa basquete?',['fútbol','baloncesto','voleibol'],1),mc(u14[4].id,'¿Qué significa jogar?',['nadar','jugar','correr'],1),mc(u14[5].id,'¿Qué significa nadar?',['caminar','nadar','correr'],1),mc(u14[6].id,'¿Qué significa correr?',['correr','bailar','nadar'],0),mc(u14[7].id,'¿Qué significa caminhar?',['jugar','caminar','cantar'],1),mc(u14[8].id,'¿Qué significa bicicleta?',['pelota','bicicleta','deporte'],1),mc(u14[9].id,'¿Qué significa bola?',['bicicleta','pelota','cancha'],1)
]};
const u15=[
v('ptbr_a1_u15_v01','cinema','cine','Vamos ao cinema.','Vamos al cine.'),
v('ptbr_a1_u15_v02','filme','película','O filme é divertido.','La película es divertida.'),
v('ptbr_a1_u15_v03','assistir','ver (película/programa)','Eu gosto de assistir a filmes.','Me gusta ver películas.'),
v('ptbr_a1_u15_v04','parque','parque','O parque é bonito.','El parque es bonito.'),
v('ptbr_a1_u15_v05','praia','playa','A praia está perto.','La playa está cerca.'),
v('ptbr_a1_u15_v06','passear','pasear','Nós gostamos de passear.','Nos gusta pasear.'),
v('ptbr_a1_u15_v07','amigo','amigo','Meu amigo está aqui.','Mi amigo está aquí.'),
v('ptbr_a1_u15_v08','convidar','invitar','Vou convidar meu amigo.','Voy a invitar a mi amigo.'),
v('ptbr_a1_u15_v09','ingresso','entrada (boleto)','O ingresso custa dez reais.','La entrada cuesta diez reales.'),
v('ptbr_a1_u15_v10','divertido','divertido','O passeio é divertido.','El paseo es divertido.')
];
const u15Lessons=[
lesson('Lección 1: Ir al cine','Nombra el cine y las películas.','Cinema es el lugar; filme es lo que puedes assistir.',u15.slice(0,3).map(x=>x.id),[],[mc(u15[0].id,'¿Qué significa cinema?',['cine','película','parque'],0),mc(u15[1].id,'¿Qué significa filme?',['entrada','película','playa'],1)]),
lesson('Lección 2: Assistir a filmes','Habla de ver películas.','En el uso cuidado, assistir a algo lleva la preposición a: assistir a um filme.',[u15[2].id,u15[1].id,u13[0].id],[],[mc(u15[2].id,'¿Qué significa assistir en este contexto?',['invitar','ver una película','pasear'],1),order(u15[1].id,'Ordena: «Me gusta ver películas».',['filmes','a','assistir','de','gosto','Eu'],['Eu','gosto','de','assistir','a','filmes'])]),
lesson('Lección 3: Parque y playa','Nombra lugares para salir.','Parque es masculino (o parque) y praia es femenino (a praia).',u15.slice(3,6).map(x=>x.id),[],[mc(u15[3].id,'¿Qué significa parque?',['playa','parque','cine'],1),mc(u15[4].id,'¿Qué significa praia?',['parque','cine','playa'],2)]),
lesson('Lección 4: Invitar a un amigo','Organiza una salida con otra persona.','Amigo es masculino; convidar significa invitar. Vou convidar expresa una intención próxima.',[u15[6].id,u15[7].id,u15[8].id],[],[mc(u15[7].id,'¿Qué significa convidar?',['invitar','pasear','ver'],0),mc(u15[6].id,'¿Qué significa amigo?',['entrada','amigo','película'],1)]),
lesson('Lección 5: Planes divertidos','Combina lugares, planes y preferencias.','Puedes combinar ir a + lugar, gostar de + infinitivo y adjetivos como divertido.',u15.map(x=>x.id),['ptbr_a1_u12_v06','ptbr_a1_u10_v05'],[write(u15[0].id,'Construye: «Vamos al cine».','Vamos ao cinema.'),mc(u15[9].id,'¿Qué significa divertido?',['aburrido','divertido','caro'],1)])
];
const unit15={unitNumber:15,id:'ptbr_a1_u15',title:'Unidad 15: Cine, salidas e invitaciones',desc:'Habla de películas, lugares de ocio y planes con amigos.',grammar:'Cinema e filme; assistir a; ir a + lugar; convidar alguém; adjetivo divertido.',trap:{title:'Assistir a',detail:'En el uso cuidado, assistir a significa ver un espectáculo o una película: assistir a um filme.'},vocab:u15,lessons:u15Lessons,exercises:[
mc(u15[0].id,'¿Qué significa cinema?',['cine','película','parque'],0),mc(u15[1].id,'¿Qué significa filme?',['entrada','película','playa'],1),mc(u15[2].id,'¿Qué significa assistir en este contexto?',['invitar','ver una película','pasear'],1),mc(u15[3].id,'¿Qué significa parque?',['playa','parque','cine'],1),mc(u15[4].id,'¿Qué significa praia?',['parque','cine','playa'],2),mc(u15[5].id,'¿Qué significa passear?',['pasear','invitar','correr'],0),mc(u15[6].id,'¿Qué significa amigo?',['entrada','amigo','película'],1),mc(u15[7].id,'¿Qué significa convidar?',['invitar','pasear','ver'],0),mc(u15[8].id,'¿Qué significa ingresso?',['parque','entrada','película'],1),mc(u15[9].id,'¿Qué significa divertido?',['aburrido','divertido','caro'],1)
]};

root.GUARDI_CURRICULUM_BLOCKS=root.GUARDI_CURRICULUM_BLOCKS||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR']=root.GUARDI_CURRICULUM_BLOCKS['pt-BR']||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].A1=root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].A1||{};


const exerciseFor=(vocab,index,all)=> {
 const options=[vocab.esp,all[(index+1)%all.length].esp,all[(index+2)%all.length].esp];
 const answer=index%3;
 [options[0],options[answer]]=[options[answer],options[0]];
 return mc(vocab.id,'¿Qué significa '+vocab.target+'?',options,answer);
};
const addUnit=(number,title,desc,grammar,trapTitle,trapDetail,vocab,lessonSpecs)=>{
 const lessons=lessonSpecs.map((spec,index)=>lesson(
  spec[0],spec[1],spec[2],spec[3].map(i=>vocab[i].id),spec[4],
  [exerciseFor(vocab[spec[3][0]],index,vocab),exerciseFor(vocab[spec[3][1]],index+1,vocab)]
 ));
 return {
  unitNumber:number,id:'ptbr_a1_u'+number,title:'Unidad '+number+': '+title,desc,grammar,
  trap:{title:trapTitle,detail:trapDetail},vocab,lessons,
  exercises:vocab.map((word,index)=>exerciseFor(word,index,vocab))
 };
};

const u16=[
v('ptbr_a1_u16_v01','cabeça','cabeza','Minha cabeça está aqui.','Mi cabeza está aquí.'),
v('ptbr_a1_u16_v02','rosto','rostro / cara','Meu rosto está aqui.','Mi cara está aquí.'),
v('ptbr_a1_u16_v03','olho','ojo','Meu olho é grande.','Mi ojo es grande.'),
v('ptbr_a1_u16_v04','nariz','nariz','Meu nariz é pequeno.','Mi nariz es pequeño.'),
v('ptbr_a1_u16_v05','boca','boca','Minha boca é pequena.','Mi boca es pequeña.'),
v('ptbr_a1_u16_v06','orelha','oreja','Minha orelha é pequena.','Mi oreja es pequeña.'),
v('ptbr_a1_u16_v07','mão','mano','Minha mão é grande.','Mi mano es grande.'),
v('ptbr_a1_u16_v08','braço','brazo','Meu braço é grande.','Mi brazo es grande.'),
v('ptbr_a1_u16_v09','perna','pierna','Minha perna é grande.','Mi pierna es grande.'),
v('ptbr_a1_u16_v10','pé','pie','Meu pé é pequeno.','Mi pie es pequeño.')
];
const unit16=addUnit(16,'El cuerpo y sus partes','Nombra partes básicas del cuerpo y usa posesivos para identificarlas.',
'Partes del cuerpo; meu/minha + sustantivo; adjetivos sencillos ya estudiados para describir rasgos.',
'Meu o minha','El posesivo concuerda con el sustantivo: meu rosto, meu nariz, meu braço; minha cabeça, minha boca, minha mão.',
u16,[
['Lección 1: La cabeza y la cara','Reconoce partes principales de la cabeza.','Cabeça y rosto nombran la cabeza y la cara; olho, nariz y boca son partes del rostro.',[0,1,2,3,4],[]],
['Lección 2: Orejas y brazos','Nombra orelha, mão y braço.','Orelha y mão son femeninos; braço es masculino. Usa minha orelha y meu braço.',[5,6,7],[]],
['Lección 3: Piernas y pies','Identifica las partes inferiores del cuerpo.','Perna es femenino y pé es masculino: minha perna, meu pé.',[8,9],[]],
['Lección 4: Los posesivos del cuerpo','Combina partes del cuerpo con meu y minha.','El posesivo concuerda con el sustantivo, no con la persona que habla.',[0,2,6,7,8],['ptbr_a1_u4_v08','ptbr_a1_u4_v09']],
['Lección 5: Descripción sencilla','Recupera vocabulario del cuerpo en frases breves.','Combina meu/minha con partes del cuerpo y adjetivos conocidos como grande y pequeno.',[1,3,4,5,9],['ptbr_a1_u6_v05','ptbr_a1_u6_v06']]
]);

const u17=[
v('ptbr_a1_u17_v01','feliz','feliz','Eu estou feliz hoje.','Estoy feliz hoy.'),
v('ptbr_a1_u17_v02','triste','triste','Ela está triste.','Ella está triste.'),
v('ptbr_a1_u17_v03','cansado / cansada','cansado / cansada','Estou cansado hoje.','Estoy cansado hoy.'),
v('ptbr_a1_u17_v04','com fome','con hambre','Estou com fome.','Tengo hambre.'),
v('ptbr_a1_u17_v05','com sede','con sed','Estou com sede.','Tengo sed.'),
v('ptbr_a1_u17_v06','sono','sueño','Estou com sono.','Tengo sueño.'),
v('ptbr_a1_u17_v07','medo','miedo','Estou com medo.','Tengo miedo.'),
v('ptbr_a1_u17_v08','preocupado / preocupada','preocupado / preocupada','Estou preocupado hoje.','Estoy preocupado hoy.'),
v('ptbr_a1_u17_v09','calmo / calma','tranquilo / tranquila','Ela está calma.','Ella está tranquila.'),
v('ptbr_a1_u17_v10','nervoso / nervosa','nervioso / nerviosa','Ele está nervoso.','Él está nervioso.')
];
const unit17=addUnit(17,'Emociones y sensaciones','Expresa emociones, estados personales y sensaciones físicas cotidianas.',
'Estar + adjetivo para estados; estar com + sustantivo para sensaciones como fome, sede, sono y medo; concordancia de género.',
'Estar feliz o estar com fome','En portugués se dice estou feliz, pero estou com fome / com sede / com sono. No traduzcas literalmente «tengo» en estas expresiones.',
u17,[
['Lección 1: Alegría y tristeza','Recupera dos emociones básicas ya presentadas y las usa con estar.','Feliz y triste pueden seguir a estar: estou feliz, ela está triste. Son términos de repaso, introducidos en A1 U9.',[0,1],['ptbr_a1_u9_v08','ptbr_a1_u9_v09']],
['Lección 2: Cansancio y concordancia','Recupera cansado y ajusta el género según la persona.','Cansado se usa en masculino y cansada en femenino: estou cansado / estou cansada. Es vocabulario de repaso, ya presentado en A1 U9.',[2,0],['ptbr_a1_u9_v07','ptbr_a1_u9_v08']],
['Lección 3: Hambre y sed','Expresa dos sensaciones comunes.','Las expresiones son estar com fome y estar com sede.',[3,4],['ptbr_a1_u5_v03']],
['Lección 4: Sueño y miedo','Nombra sueño y miedo con estar com.','Se dice estou com sono y estou com medo; com forma parte de la expresión.',[5,6],[]],
['Lección 5: Preocupación y calma','Describe estados personales con adjetivos.','Preocupado, calmo y nervoso concuerdan con la persona descrita.',[7,8,9],['ptbr_a1_u7_v07']]
]);

const u18=[
v('ptbr_a1_u18_v01','saúde','salud','A saúde é importante.','La salud es importante.'),
v('ptbr_a1_u18_v02','doente','enfermo / enferma','Estou doente hoje.','Estoy enfermo hoy.'),
v('ptbr_a1_u18_v03','febre','fiebre','Estou com febre.','Tengo fiebre.'),
v('ptbr_a1_u18_v04','tosse','tos','Estou com tosse.','Tengo tos.'),
v('ptbr_a1_u18_v05','médico','médico','Vou ao médico.','Voy al médico.'),
v('ptbr_a1_u18_v06','remédio','medicamento','Preciso de um remédio.','Necesito un medicamento.'),
v('ptbr_a1_u18_v07','farmácia','farmacia','A farmácia está perto.','La farmacia está cerca.'),
v('ptbr_a1_u18_v08','dor','dolor','Estou com dor.','Tengo dolor.'),
v('ptbr_a1_u18_v09','consulta','consulta médica','Minha consulta é hoje.','Mi consulta es hoy.'),
v('ptbr_a1_u18_v10','precisar de','necesitar','Eu preciso de um remédio.','Necesito un medicamento.')
];
const unit18=addUnit(18,'Salud y necesidades básicas','Comunica malestar sencillo y reconoce palabras útiles para pedir atención.',
'Estar doente; estar com + síntoma; ir ao médico; precisar de + sustantivo.',
'Estar com síntomas y precisar de','Para síntomas se usa estar com: estou com febre, tosse ou dor. Precisar de lleva la preposición de.',
u18,[
['Lección 1: Salud y malestar','Reconoce salud y enfermedad.','Saúde es un sustantivo; doente describe a una persona que está enferma.',[0,1],['ptbr_a1_u17_v03']],
['Lección 2: Síntomas comunes','Nombra fiebre, tos y dolor.','Las expresiones habituales son estar com febre, estar com tosse y estar com dor.',[2,3,7],['ptbr_a1_u17_v04','ptbr_a1_u17_v05']],
['Lección 3: Médico y consulta','Habla de acudir al médico.','Ir ao médico combina ir a + o; minha consulta é hoje ofrece un ejemplo sencillo de uso de consulta.',[4,8],['ptbr_a1_u8_v01','ptbr_a1_u7_v07']],
['Lección 4: Medicamento y farmacia','Reconoce lugares y objetos de atención.','Remédio es el medicamento y farmácia es el lugar donde se compra.',[5,6],['ptbr_a1_u6_v08']],
['Lección 5: Necesitar algo','Expresa una necesidad sencilla.','Precisar de + sustantivo expresa necesidad: preciso de um remédio.',[9,5,4],['ptbr_a1_u5_v03']]
]);


root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].A1['13-18']={units:[unit13,unit14,unit15,unit16,unit17,unit18]};
})(typeof window!=='undefined'?window:globalThis);
