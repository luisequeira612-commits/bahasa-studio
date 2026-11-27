(function(root){
'use strict';
const v=(id,target,esp,ex,exEsp)=>({id,target,esp,ex,exEsp,verification:{status:'not_checked',sources:[]}});
const mc=(vocabId,prompt,options,answer,explanation)=>({vocabId,type:'mc',prompt,options,answer,explanation});
const lesson=(title,objective,grammar,vocabIds,reviewVocabIds,exercises)=>({title,objective,grammar,vocabIds,reviewVocabIds,exercises});
const makeUnit=(number,title,desc,grammar,trapTitle,trapDetail,vocab,specs)=>{
 const lessons=specs.map(spec=>lesson(spec[0],spec[1],spec[2],spec[3].map(i=>vocab[i].id),spec[4],spec[5]));
 return {unitNumber:number,id:'en_a1_u'+number,title:'Unit '+number+': '+title,desc,grammar,trap:{title:trapTitle,detail:trapDetail},vocab,lessons,exercises:vocab.map((word,index)=>mc(word.id,'What does '+word.target+' mean?',[word.esp,vocab[(index+3)%10].esp,vocab[(index+6)%10].esp],0,'Introductory practice; linguistic review pending.'))};
};
const u1=[
v('en_a1_u1_v01','hello','hola','Hello!','¡Hola!'),
v('en_a1_u1_v02','hi','hola','Hi, Ana!','¡Hola, Ana!'),
v('en_a1_u1_v03','good morning','buenos días','Good morning, everyone.','Buenos días a todos.'),
v('en_a1_u1_v04','good afternoon','buenas tardes','Good afternoon, Mr. Lee.','Buenas tardes, señor Lee.'),
v('en_a1_u1_v05','good evening','buenas noches (al saludar)','Good evening.','Buenas noches.'),
v('en_a1_u1_v06','goodbye','adiós','Goodbye, see you tomorrow.','Adiós, nos vemos mañana.'),
v('en_a1_u1_v07','see you later','hasta luego','See you later!','¡Hasta luego!'),
v('en_a1_u1_v08','please','por favor','Please, sit down.','Por favor, siéntate.'),
v('en_a1_u1_v09','thank you','gracias','Thank you for your help.','Gracias por tu ayuda.'),
v('en_a1_u1_v10','you're welcome','de nada','You're welcome!','¡De nada!')
];
const u2=[
v('en_a1_u2_v01','I','yo','I am Luis.','Soy Luis.'),
v('en_a1_u2_v02','you','tú / usted / ustedes','You are Ana.','Eres Ana.'),
v('en_a1_u2_v03','he','él','He is from Nicaragua.','Él es de Nicaragua.'),
v('en_a1_u2_v04','she','ella','She is my friend.','Ella es mi amiga.'),
v('en_a1_u2_v05','we','nosotros/as','We are students.','Somos estudiantes.'),
v('en_a1_u2_v06','they','ellos/as','They are at home.','Ellos están en casa.'),
v('en_a1_u2_v07','my','mi','My name is Luis.','Me llamo Luis.'),
v('en_a1_u2_v08','your','tu / su','What is your name?','¿Cómo te llamas?'),
v('en_a1_u2_v09','name','nombre','My name is Ana.','Me llamo Ana.'),
v('en_a1_u2_v10','from','de / procedente de','I am from Nicaragua.','Soy de Nicaragua.')
];
const u3=[
v('en_a1_u3_v01','am','soy / estoy','I am happy.','Estoy feliz.'),
v('en_a1_u3_v02','are','eres / estás / somos / están','You are ready.','Estás listo/a.'),
v('en_a1_u3_v03','is','es / está','She is tired.','Ella está cansada.'),
v('en_a1_u3_v04','happy','feliz','We are happy.','Estamos felices.'),
v('en_a1_u3_v05','tired','cansado/a','He is tired.','Él está cansado.'),
v('en_a1_u3_v06','ready','listo/a','I am ready.','Estoy listo/a.'),
v('en_a1_u3_v07','busy','ocupado/a','She is busy today.','Ella está ocupada hoy.'),
v('en_a1_u3_v08','at home','en casa','They are at home.','Ellos están en casa.'),
v('en_a1_u3_v09','here','aquí','I am here.','Estoy aquí.'),
v('en_a1_u3_v10','there','allí / ahí','He is there.','Él está allí.')
];
const u4=[
v('en_a1_u4_v01','yes','sí','Yes, I am.','Sí.'),
v('en_a1_u4_v02','no','no','No, she isn't.','No, ella no lo está.'),
v('en_a1_u4_v03','not','no','I am not tired.','No estoy cansado/a.'),
v('en_a1_u4_v04','isn't','no es / no está','He isn't here.','Él no está aquí.'),
v('en_a1_u4_v05','aren't','no eres / no estás / no somos / no están','They aren't busy.','Ellos no están ocupados.'),
v('en_a1_u4_v06','okay','bien / de acuerdo','I'm okay.','Estoy bien.'),
v('en_a1_u4_v07','fine','bien','I'm fine, thanks.','Estoy bien, gracias.'),
v('en_a1_u4_v08','sorry','lo siento','Sorry, I am late.','Lo siento, llego tarde.'),
v('en_a1_u4_v09','late','tarde / retrasado/a','She is late.','Ella llega tarde.'),
v('en_a1_u4_v10','right','correcto/a','Yes, that's right.','Sí, eso es correcto.')
];
const u5=[
v('en_a1_u5_v01','one','uno','One book.','Un libro.'),
v('en_a1_u5_v02','two','dos','Two students.','Dos estudiantes.'),
v('en_a1_u5_v03','three','tres','Three books.','Tres libros.'),
v('en_a1_u5_v04','four','cuatro','Four chairs.','Cuatro sillas.'),
v('en_a1_u5_v05','five','cinco','Five people.','Cinco personas.'),
v('en_a1_u5_v06','six','seis','Six days.','Seis días.'),
v('en_a1_u5_v07','seven','siete','Seven days.','Siete días.'),
v('en_a1_u5_v08','eight','ocho','Eight students.','Ocho estudiantes.'),
v('en_a1_u5_v09','nine','nueve','Nine books.','Nueve libros.'),
v('en_a1_u5_v10','ten','diez','Ten minutes.','Diez minutos.')
];
const u6=[
v('en_a1_u6_v01','what','qué / cuál','What is your name?','¿Cómo te llamas?'),
v('en_a1_u6_v02','where','dónde','Where are you from?','¿De dónde eres?'),
v('en_a1_u6_v03','who','quién','Who is she?','¿Quién es ella?'),
v('en_a1_u6_v04','how','cómo','How are you?','¿Cómo estás?'),
v('en_a1_u6_v05','how are you?','¿cómo estás?','How are you today?','¿Cómo estás hoy?'),
v('en_a1_u6_v06','what is your name?','¿cómo te llamas?','What is your name?','¿Cómo te llamas?'),
v('en_a1_u6_v07','where are you from?','¿de dónde eres?','Where are you from?','¿De dónde eres?'),
v('en_a1_u6_v08','who is he?','¿quién es él?','Who is he?','¿Quién es él?'),
v('en_a1_u6_v09','how old','qué edad','How old are you?','¿Cuántos años tienes?'),
v('en_a1_u6_v10','I am ... years old','tengo ... años','I am twenty-nine years old.','Tengo veintinueve años.')
];

const unit1=makeUnit(1,'Greetings and politeness','Saluda, se despide y usa expresiones básicas de cortesía.',
'Saludos básicos; diferencias entre hello/hi y good morning/good afternoon/good evening; please y thank you.',
'Good evening no significa good night al saludar','Good evening se usa al encontrarse o saludar por la noche. Good night se usa normalmente al despedirse o antes de dormir.',
u1,[
['Lesson 1: Hello and hi','Reconoce y usa dos saludos cotidianos.','Hello y hi funcionan como saludos; hi es más informal.',[0,1],[],[mc(u1[0].id,'Choose the greeting.',['Hello','Goodbye','Thank you'],0,'Hello es un saludo.')]],
['Lesson 2: Greetings by time','Saluda según el momento del día.','Good morning y good afternoon se usan para saludar; good evening también es un saludo.',[2,3],[],[mc(u1[2].id,'Which greeting fits the morning?',['Good morning','Good evening','Goodbye'],0,'Good morning se usa por la mañana.')]],
['Lesson 3: Evening and goodbye','Se despide de forma natural.','Good evening y good night no cumplen exactamente la misma función.',[4,5],[],[mc(u1[5].id,'Choose a goodbye.',['Goodbye','Good morning','Please'],0,'Goodbye es una despedida.')]],
['Lesson 4: Please and thank you','Usa cortesía básica.','Please suaviza una petición y thank you expresa agradecimiento.',[7,8],[],[mc(u1[7].id,'Which word makes a request polite?',['please','goodbye','hello'],0,'Please añade cortesía a una petición.')]],
['Lesson 5: Short polite exchanges','Responde a un agradecimiento y combina saludos y despedidas.',"You're welcome responde normalmente a thank you.",[6,9],['en_a1_u1_v08','en_a1_u1_v09'],[mc(u1[9].id,'What do you say after Thank you?',["You're welcome",'Good morning','Sorry'],0,"You're welcome es una respuesta natural a thank you.")]]
]);

const unit2=makeUnit(2,'Introducing yourself','Da y pide información personal muy básica.',
'Pronombres sujeto; posesivos my/your; be para presentarse; from para indicar procedencia.',
'You puede ser tú, usted o ustedes','El inglés usa you para singular y plural; el contexto indica cuál es el sentido.',
u2,[
['Lesson 1: I and you','Identifica I y you en frases simples.','I es primera persona singular y siempre se escribe con mayúscula.',[0,1],[],[mc(u2[0].id,'Choose the correct pronoun: ___ am Luis.',['I','You','She'],0,'I corresponde a la primera persona.')]],
['Lesson 2: He and she','Habla de otra persona.', 'He se refiere normalmente a un hombre y she a una mujer.',[2,3],[],[mc(u2[3].id,'Choose the pronoun for Ana.',['she','he','they'],0,'She se usa para Ana.')]],
['Lesson 3: We and they','Habla de grupos.', 'We incluye al hablante; they se refiere a otras personas o cosas.',[4,5],[],[mc(u2[4].id,'Which pronoun includes the speaker?',['we','they','he'],0,'We incluye al hablante.')]],
['Lesson 4: My and your','Indica pertenencia básica.', 'My significa mi y your puede significar tu, su o sus según el contexto.',[6,7],[],[mc(u2[6].id,'Choose the possessive: ___ name is Luis.',['My','Your','They'],0,'My indica que el nombre pertenece al hablante.')]],
['Lesson 5: Name and origin','Pregunta y responde nombre y procedencia.', 'What is your name? y I am from... son estructuras iniciales muy frecuentes.',[8,9],['en_a1_u1_v08','en_a1_u1_v09'],[mc(u2[9].id,'Complete: I am ___ Nicaragua.',['from','at','to'],0,'From indica procedencia.')]]
]);

const unit3=makeUnit(3,'The verb be: am, are, is','Construye afirmaciones básicas con be.',
'Be en presente: am con I; are con you/we/they; is con he/she/it. Equivalencias ser/estar dependen del contexto.',
'Be no se traduce siempre como una sola palabra','En español ser y estar se separan; en inglés be cubre ambos valores en estas estructuras básicas.',
u3,[
['Lesson 1: I am','Usa am con I.','La combinación estándar es I am; también aparece la contracción I’m.',[0,3],[],[mc(u3[0].id,'Choose the correct form: I ___ happy.',['am','are','is'],0,'I va con am.')]],
['Lesson 2: You are','Usa are con you.', 'You are puede significar eres, estás, es usted o está usted según el contexto.',[1,6],[],[mc(u3[1].id,'Choose: You ___ ready.',['are','am','is'],0,'You va con are.')]],
['Lesson 3: He is and she is','Describe a otras personas.', 'He is y she is corresponden a tercera persona singular.',[2,4],[],[mc(u3[2].id,'Choose: She ___ tired.',['is','are','am'],0,'She va con is.')]],
['Lesson 4: We and they are','Habla de grupos y lugares.', 'We are y they are usan are.',[5,7],[],[mc(u3[5].id,'Choose: They ___ at home.',['are','is','am'],0,'They va con are.')]],
['Lesson 5: Here and there','Combina be con lugares básicos.', 'Here significa aquí y there puede significar allí o ahí según el contexto.',[8,9],['en_a1_u2_v09','en_a1_u2_v10'],[mc(u3[8].id,'Choose: I am ___.',['here','there','from'],0,'Here significa aquí.')]]
]);

const unit4=makeUnit(4,'Be: negatives and simple responses','Niega afirmaciones y responde de forma breve.',
'Negación con not; contracciones isn’t y aren’t; respuestas cortas con be.',
'No uses don’t con be','La negación de I am/you are/she is se construye con not, no con do/does.',
u4,[
['Lesson 1: Not','Forma negaciones sencillas.', 'Be + not crea la negación: I am not, you are not, she is not.',[2,3],[],[mc(u4[2].id,'Choose the negative: I am ___ tired.',['not','no','don’t'],0,'La negación de be usa not.')]],
['Lesson 2: Isn’t','Usa la contracción de is not.', 'Isn’t = is not y se usa con he, she e it.',[3,8],[],[mc(u4[3].id,'What is the contraction of is not?',["isn't","aren't","don't"],0,"Isn't significa is not.")]],
['Lesson 3: Aren’t','Usa la contracción de are not.', 'Aren’t = are not y se usa con you, we y they.',[4,5],[],[mc(u4[4].id,'Choose: They ___ busy.',["aren't","isn't","don't"],0,"Aren't se usa con they.")]],
['Lesson 4: Short answers','Responde yes/no con be.', 'Las respuestas cortas repiten el auxiliar: Yes, I am. / No, she isn’t.',[0,1],[],[mc(u4[0].id,'Choose the short answer: Are you okay?',['Yes, I am.','Yes, I is.','Yes, I are.'],0,'I se combina con am.')]],
['Lesson 5: Everyday responses','Combina negación y respuestas naturales.', 'Okay y fine son respuestas frecuentes a How are you?; sorry introduce una disculpa.',[6,7],['en_a1_u1_v09'],[mc(u4[6].id,'Choose a natural response: How are you?',['I’m fine.','I’m from Nicaragua.','Goodbye.'],0,'I’m fine es una respuesta natural.')]]
]);

const unit5=makeUnit(5,'Numbers 1–10','Reconoce y usa los números del 1 al 10.',
'Números cardinales 1–10; cantidades simples; pronunciación y reconocimiento escrito.',
'Los números no llevan plural','One book pero two books: el sustantivo normalmente sí cambia al plural.',
u5,[
['Lesson 1: One to three','Reconoce los tres primeros números.', 'One, two y three expresan cantidades básicas.',[0,1,2],[],[mc(u5[2].id,'Which number is three?',['3','2','5'],0,'Three corresponde a 3.')]],
['Lesson 2: Four and five','Reconoce four y five.', 'Four y five se usan para contar personas, objetos y otras cantidades.',[3,4],[],[mc(u5[4].id,'Which number is five?',['5','4','6'],0,'Five corresponde a 5.')]],
['Lesson 3: Six and seven','Reconoce six y seven.', 'Six y seven continúan la secuencia cardinal.',[5,6],[],[mc(u5[5].id,'Which number is six?',['6','7','8'],0,'Six corresponde a 6.')]],
['Lesson 4: Eight and nine','Reconoce eight y nine.', 'Eight y nine se usan como números cardinales.',[7,8],[],[mc(u5[7].id,'Which number is eight?',['8','9','7'],0,'Eight corresponde a 8.')]],
['Lesson 5: Ten and review','Consolida del 1 al 10.', 'Ten completa la primera serie de números.',[9,0],['en_a1_u5_v01','en_a1_u5_v05'],[mc(u5[9].id,'Which number is ten?',['10','9','8'],0,'Ten corresponde a 10.')]]
]);

const unit6=makeUnit(6,'Basic questions','Pregunta y responde información personal elemental.',
'Wh-words what, where, who, how; patrones What is your name?, Where are you from?, How old are you?',
'How old no significa cómo viejo','How old? pregunta por la edad; en inglés se expresa la edad con be: I am 29 years old.',
u6,[
['Lesson 1: What','Pregunta qué o cuál.', 'What aparece en preguntas como What is your name?',[0,5],[],[mc(u6[0].id,'What does what mean here?',['qué / cuál','dónde','quién'],0,'What suele preguntar qué o cuál.')]],
['Lesson 2: Where','Pregunta por un lugar o procedencia.', 'Where are you from? pregunta por el lugar de origen.',[1,6],[],[mc(u6[1].id,'Complete: ___ are you from?',['Where','What','Who'],0,'Where pregunta por un lugar.')]],
['Lesson 3: Who','Pregunta por una persona.', 'Who significa quién y normalmente pregunta por una persona o personas.',[2,7],[],[mc(u6[2].id,'Choose the question word for a person.',['Who','Where','What'],0,'Who pregunta por una persona.')]],
['Lesson 4: How are you?','Pregunta por el estado de alguien.', 'How are you? es una expresión fija para preguntar cómo está alguien.',[3,4],['en_a1_u3_v04'],[mc(u6[4].id,'Choose a natural answer to How are you?',['I’m fine.','I’m from Nicaragua.','My name is Ana.'],0,'I’m fine responde sobre el estado de la persona.')]],
['Lesson 5: Age and personal information','Pregunta y responde la edad.', 'How old are you? / I am ... years old. usan be, no have.',[8,9],['en_a1_u2_v08','en_a1_u2_v09'],[mc(u6[8].id,'Choose the correct question about age.',['How old are you?','How are old you?','What old are you?'],0,'La estructura correcta es How old are you?')]]
]);

root.GUARDI_CURRICULUM_BLOCKS=root.GUARDI_CURRICULUM_BLOCKS||{};
root.GUARDI_CURRICULUM_BLOCKS.en=root.GUARDI_CURRICULUM_BLOCKS.en||{};
root.GUARDI_CURRICULUM_BLOCKS.en.A1=root.GUARDI_CURRICULUM_BLOCKS.en.A1||{};
root.GUARDI_CURRICULUM_BLOCKS.en.A1['01-06']={units:[unit1,unit2,unit3,unit4,unit5,unit6]};
})(typeof window!=='undefined'?window:globalThis);
