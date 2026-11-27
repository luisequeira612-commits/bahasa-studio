(function(root){
'use strict';
const vocab=(unit,rows)=>rows.map((row,index)=>{const [target,esp,ex,exEsp]=row.split('~');return {id:'en_a1_u'+unit+'_v'+String(index+1).padStart(2,'0'),target,esp,ex,exEsp,verification:{status:'not_checked',sources:[]}};});
const mc=(word,prompt,options)=>({vocabId:word.id,type:'mc',prompt,options,answer:0,explanation:'Selecciona el significado correcto.'});
const order=(word,prompt,sentence)=>{const words=sentence.split(' ');return {vocabId:word.id,type:'order',prompt,words,correctOrder:words.slice(),explanation:'Orden básico de la frase.'};};
const lesson=(title,objective,grammar,words,reviewVocabIds,model)=>({title,objective,grammar,vocabIds:words.map(w=>w.id),reviewVocabIds,exercises:[mc(words[0],'¿Qué significa «'+words[0].target+'»?',[words[0].esp,words[2].esp,words[3].esp]),order(words[1],'Ordena la frase.',model)]});
const unit=(number,title,desc,grammar,trapTitle,trapDetail,rows,lessonSpecs,bankModels)=>{
 const words=vocab(number,rows);
 const lessons=lessonSpecs.map(spec=>lesson(spec[0],spec[1],spec[2],spec[3].map(i=>words[i]),[],spec[4]));
 const exercises=[];
 for(let i=0;i<5;i++) exercises.push(mc(words[i],'Elige la traducción de «'+words[i].target+'».',[words[i].esp,words[(i+7)%22].esp,words[(i+13)%22].esp]));
 for(let i=0;i<5;i++) exercises.push(order(words[5+i],'Ordena la frase.',bankModels[i]));
 return {unitNumber:number,id:'en_a1_u'+number,title:'Unidad '+number+': '+title,desc,grammar,trap:{title:trapTitle,detail:trapDetail},vocab:words,lessons,exercises};
};
const units=[
unit(1,'Alfabeto y deletreo','Reconoce los nombres de las letras, distingue vocales y consonantes y deletrea palabras sencillas.','El nombre de una letra no siempre coincide con el sonido que representa. Para deletrear se usa la estructura “How do you spell…?”.','Nombre de letra y sonido','El alfabeto nombra letras; la pronunciación de una palabra no se deduce siempre por su nombre. Las vocales inglesas pueden representar varios sonidos.',[
'alphabet~alfabeto~The English alphabet has twenty-six letters.~El alfabeto inglés tiene veintiséis letras.',
'letter~letra~The first letter is A.~La primera letra es A.',
'vowel~vocal~A is a vowel.~A es una vocal.',
'consonant~consonante~B is a consonant.~B es una consonante.',
'capital letter~letra mayúscula~Write your name with a capital letter.~Escribe tu nombre con mayúscula.',
'lowercase letter~letra minúscula~The word is in lowercase letters.~La palabra está en minúsculas.',
'spell~deletrear~Can you spell your name?~¿Puedes deletrear tu nombre?',
'spelling~deletreo / ortografía~The spelling is easy.~El deletreo es fácil.',
'name~nombre~My name is Ana.~Mi nombre es Ana.',
'first name~nombre de pila~My first name is Luis.~Mi nombre de pila es Luis.',
'last name~apellido~My last name is García.~Mi apellido es García.',
'full name~nombre completo~Please write your full name.~Por favor, escribe tu nombre completo.',
'word~palabra~This word is short.~Esta palabra es corta.',
'sound~sonido~Listen to the first sound.~Escucha el primer sonido.',
'write~escribir~Write the letter A.~Escribe la letra A.',
'read~leer~Read the word aloud.~Lee la palabra en voz alta.',
'repeat~repetir~Please repeat the word.~Por favor, repite la palabra.',
'listen~escuchar~Listen and repeat.~Escucha y repite.',
'say~decir~Say your name, please.~Di tu nombre, por favor.',
'please~por favor~Spell it, please.~Deletrea eso, por favor.',
'how~cómo~How do you spell it?~¿Cómo se deletrea?',
'again~otra vez~Please say it again.~Por favor, dilo otra vez.'
],[
['Lección 1: Las letras','Identifica el alfabeto inglés y reconoce letras individuales.','El alfabeto inglés tiene 26 letras. Se escriben con mayúscula al inicio de una oración y en nombres propios.',[0,1,2,3],'The English alphabet has twenty-six letters.'],
['Lección 2: Vocales y consonantes','Clasifica las letras como vocales o consonantes.','Las letras A, E, I, O y U suelen funcionar como vocales; Y también puede representar un sonido vocálico.',[2,3,13,14],'A is a vowel. B is a consonant.'],
['Lección 3: Mayúsculas y minúsculas','Distingue capital letters y lowercase letters.','Los nombres propios empiezan con mayúscula: Ana, Luis, García.',[4,5,8,9,10],'Write your first name with a capital letter.'],
['Lección 4: Deletrear nombres','Pregunta y responde cómo se deletrea un nombre.','How do you spell…? pregunta por las letras de una palabra. Spell es el verbo “deletrear”.',[6,7,11,20],'How do you spell your last name?'],
['Lección 5: Escuchar y repetir','Sigue instrucciones breves para leer y repetir palabras.','Listen, read, say y repeat son instrucciones frecuentes en clase.',[12,14,15,16,17,18,19,21],'Listen and repeat the word, please.']
],['Write the letter A.','Read the word aloud.','Please repeat the word.','Say your name, please.','Please say it again.']),
unit(2,'Saludos y presentaciones','Saluda, responde a saludos y se presenta usando pronombres personales y el verbo to be en afirmativo.','Pronombres sujeto: I, you, he, she, it, we, they. To be afirmativo: I am; you/we/they are; he/she/it is. Contracciones: I’m, you’re, he’s, she’s.','Pronombre sujeto obligatorio','En inglés estándar el sujeto normalmente debe aparecer: “I am Ana”, no solo “am Ana”. “Good evening” saluda; “good night” suele despedir o expresar que alguien se va a dormir.',[
'hello~hola~Hello, I am Ana.~Hola, soy Ana.',
'hi~hola informal~Hi, Luis!~¡Hola, Luis!',
'good morning~buenos días~Good morning, everyone.~Buenos días a todos.',
'good afternoon~buenas tardes~Good afternoon, Ms. Lee.~Buenas tardes, señora Lee.',
'good evening~buenas noches (saludo)~Good evening, Mr. Brown.~Buenas noches, señor Brown.',
'goodbye~adiós~Goodbye, Ana.~Adiós, Ana.',
'bye~chao / adiós~Bye, see you tomorrow.~Chao, nos vemos mañana.',
'see you~nos vemos~See you later!~¡Nos vemos luego!',
'greeting~saludo~This is a greeting.~Este es un saludo.',
'thank you~gracias~Thank you for your help.~Gracias por tu ayuda.',
'thanks~gracias (informal)~Thanks, Luis!~¡Gracias, Luis!',
'you’re welcome~de nada~You’re welcome, Ana.~De nada, Ana.',
'sorry~lo siento / disculpa~Sorry, I am late.~Lo siento, llego tarde.',
'excuse me~disculpe / con permiso~Excuse me, are you Ana?~Disculpe, ¿eres Ana?',
'nice~agradable~It is nice to meet you.~Es agradable conocerte.',
'meet~conocer~I meet my new teacher today.~Hoy conozco a mi nuevo profesor.',
'I~yo~I am Luis.~Yo soy Luis.',
'you~tú / usted / ustedes~You are my friend.~Tú eres mi amigo.',
'he~él~He is Daniel.~Él es Daniel.',
'she~ella~She is Ana.~Ella es Ana.',
'we~nosotros / nosotras~We are students.~Somos estudiantes.',
'they~ellos / ellas~They are friends.~Ellos son amigos.'
],[
['Lección 1: Saludos básicos','Usa hello y hi en situaciones cotidianas.','Hello es un saludo neutro; hi es más informal. Ambos sirven al iniciar una conversación.',[0,1,2,3],'Hello, I am Ana.'],
['Lección 2: Saludos según el momento','Distingue saludos de mañana, tarde y noche.','Good morning, good afternoon y good evening dependen del momento del día.',[2,3,4,5],'Good evening, Luis. Goodbye, Ana.'],
['Lección 3: Cortesía y despedidas','Agradece, pide disculpas y se despide.','Thank you / thanks expresan agradecimiento; you’re welcome responde a thank you.',[5,6,7,8,9,10,11,12,13],'Thank you. You’re welcome.'],
['Lección 4: Pronombres sujeto','Identifica I, you, he y she.','I corresponde a quien habla; you a la persona interlocutora; he y she a una persona masculina o femenina.',[16,17,18,19],'I am Luis. She is Ana.'],
['Lección 5: To be afirmativo','Forma presentaciones sencillas con am, are e is.','I am; you are; he is; she is; we are; they are. Las contracciones I’m, you’re y she’s son comunes.',[16,17,18,19,20,21,14,15],'We are friends. They are students.']
],['I am Luis.','You are my friend.','He is Daniel.','She is Ana.','They are friends.']),
unit(3,'Información personal','Da información básica sobre edad, origen, ciudad, ocupación y datos personales.','To be negativo: am not, isn’t, aren’t. Preguntas: Am I…? Are you…? Is he…? Respuestas breves: Yes, I am. / No, I’m not. Preguntas con what, where y how old.','How old no usa have','Para la edad se usa “How old are you?” y “I am 20 years old”, no “I have 20 years”. “From” indica origen; “live” indica residencia.',[
'age~edad~What is your age?~¿Cuál es tu edad?',
'old~de edad~I am twenty years old.~Tengo veinte años.',
'from~de / procedente de~I am from Nicaragua.~Soy de Nicaragua.',
'country~país~Nicaragua is my country.~Nicaragua es mi país.',
'city~ciudad~Managua is a city.~Managua es una ciudad.',
'live~vivir / residir~I live in Managua.~Vivo en Managua.',
'address~dirección~This is my address.~Esta es mi dirección.',
'phone number~número de teléfono~What is your phone number?~¿Cuál es tu número de teléfono?',
'email~correo electrónico~My email is on the form.~Mi correo está en el formulario.',
'student~estudiante~I am a student.~Soy estudiante.',
'teacher~profesor / profesora~She is a teacher.~Ella es profesora.',
'job~trabajo / empleo~What is your job?~¿Cuál es tu trabajo?',
'work~trabajar~I work in a school.~Trabajo en una escuela.',
'nationality~nacionalidad~What is your nationality?~¿Cuál es tu nacionalidad?',
'married~casado / casada~They are married.~Ellos están casados.',
'single~soltero / soltera~I am single.~Soy soltero.',
'where~dónde~Where are you from?~¿De dónde eres?',
'what~qué / cuál~What is your name?~¿Cómo te llamas?',
'who~quién~Who is your teacher?~¿Quién es tu profesor?',
'how old~qué edad~How old are you?~¿Cuántos años tienes?',
'year~año~I am twenty years old.~Tengo veinte años.',
'address book~agenda de direcciones~Her address is in my address book.~Su dirección está en mi agenda.'
],[
['Lección 1: Edad y años','Pregunta y responde sobre la edad.','How old are you? — I am twenty years old. El verbo to be expresa la edad.',[0,1,19,20],'I am twenty years old.'],
['Lección 2: Origen y nacionalidad','Indica de dónde eres y tu nacionalidad.','Be + from + lugar expresa origen. What is your nationality? pregunta por nacionalidad.',[2,3,4,13],'I am from Nicaragua.'],
['Lección 3: Ciudad y dirección','Da información sencilla sobre residencia y contacto.','Live in + ciudad indica residencia. Address y phone number son datos de contacto.',[5,6,7,8,21],'I live in Managua.'],
['Lección 4: Estudios y trabajo','Nombra ocupación y actividad laboral.','I am a student / a teacher usa a antes de un sustantivo contable singular. I work… expresa actividad.',[9,10,11,12],'I am a student.'],
['Lección 5: Preguntas y respuestas','Formula preguntas personales y responde de forma breve.','Are you…? — Yes, I am. / No, I’m not. Where, what, who y how old introducen preguntas.',[14,15,16,17,18,19],'Are you a student? Yes, I am.']
],['I am from Nicaragua.','I live in Managua.','I am a student.','She is a teacher.','Are you a student?']),
unit(4,'Números y datos de contacto','Reconoce números básicos y los usa para comunicar teléfono, dirección y códigos sencillos.','Los números cardinales se usan en teléfonos y direcciones. En un número telefónico, los dígitos suelen decirse uno por uno; zero puede pronunciarse “oh” en algunos contextos informales.','Número no es ordinal','Esta unidad enseña cardinales y dígitos. No confundas “one” con “first”: los ordinales se estudiarán más adelante.',[
'zero~cero~My room number is zero.~El número de mi habitación es cero.',
'one~uno~I have one phone.~Tengo un teléfono.',
'two~dos~I have two keys.~Tengo dos llaves.',
'three~tres~The address has three numbers.~La dirección tiene tres números.',
'four~cuatro~Four people are here.~Hay cuatro personas aquí.',
'five~cinco~My phone number starts with five.~Mi número de teléfono empieza con cinco.',
'six~seis~The bus is number six.~El autobús es el número seis.',
'seven~siete~I live at number seven.~Vivo en el número siete.',
'eight~ocho~The code has eight digits.~El código tiene ocho dígitos.',
'nine~nueve~Nine is the last number.~Nueve es el último número.',
'ten~diez~The room is number ten.~La habitación es la número diez.',
'eleven~once~Eleven is my bus number.~Once es el número de mi autobús.',
'twelve~doce~The address is number twelve.~La dirección es el número doce.',
'thirteen~trece~The code has thirteen digits.~El código tiene trece dígitos.',
'fourteen~catorce~Fourteen is the house number.~Catorce es el número de la casa.',
'fifteen~quince~My class is room fifteen.~Mi clase está en el salón quince.',
'sixteen~dieciséis~The bus number is sixteen.~El número del autobús es dieciséis.',
'seventeen~diecisiete~The apartment is number seventeen.~El apartamento es el número diecisiete.',
'eighteen~dieciocho~The code ends in eighteen.~El código termina en dieciocho.',
'nineteen~diecinueve~The house number is nineteen.~El número de la casa es diecinueve.',
'twenty~veinte~My phone has twenty contacts.~Mi teléfono tiene veinte contactos.',
'digit~dígito~Say each digit slowly.~Di cada dígito despacio.'
],[
['Lección 1: Del cero al cinco','Reconoce y pronuncia los números del 0 al 5.','Los números zero, one, two, three, four y five son cardinales.',[0,1,2,3,4,5],'I have two keys.'],
['Lección 2: Del seis al diez','Reconoce los números del 6 al 10.','Six, seven, eight, nine y ten completan los primeros diez números.',[6,7,8,9,10],'The bus is number six.'],
['Lección 3: Del once al quince','Reconoce los números del 11 al 15.','Eleven, twelve, thirteen, fourteen y fifteen tienen formas que conviene memorizar.',[11,12,13,14,15],'The address is number twelve.'],
['Lección 4: Del dieciséis al veinte','Reconoce los números del 16 al 20.','Sixteen, seventeen, eighteen, nineteen y twenty forman el tramo final de esta secuencia.',[16,17,18,19,20],'The apartment is number seventeen.'],
['Lección 5: Dígitos y contacto','Usa números al dar un número de teléfono o código.','Para comunicar un teléfono, di los dígitos despacio y confirma que la otra persona los entendió.',[7,8,9,20,21],'Say each digit slowly, please.']
],['I have one phone.','The bus is number six.','The address is number twelve.','The house number is nineteen.','Say each digit slowly.']),
unit(5,'Artículos a y an','Usa a y an delante de sustantivos contables singulares según el sonido inicial.','A va antes de sonido consonántico; an va antes de sonido vocálico. La elección depende del sonido, no solo de la letra: an hour, a university.','No es solo la primera letra','Se elige a/an por el primer sonido: “an hour” porque la h no suena; “a university” porque empieza con sonido /y/.',[
'article~artículo~An article comes before a noun.~Un artículo va antes de un sustantivo.',
'a~un / una~I have a book.~Tengo un libro.',
'an~un / una~She has an apple.~Ella tiene una manzana.',
'apple~manzana~I eat an apple.~Como una manzana.',
'book~libro~This is a book.~Este es un libro.',
'bag~bolso / mochila~I have a bag.~Tengo una mochila.',
'pen~bolígrafo~It is a pen.~Es un bolígrafo.',
'pencil~lápiz~I need a pencil.~Necesito un lápiz.',
'umbrella~paraguas~She has an umbrella.~Ella tiene un paraguas.',
'banana~banano / plátano~I want a banana.~Quiero un banano.',
'egg~huevo~He eats an egg.~Él come un huevo.',
'idea~idea~That is an idea.~Esa es una idea.',
'hour~hora~It takes an hour.~Toma una hora.',
'uniform~uniforme~I wear a uniform.~Llevo un uniforme.',
'university~universidad~She studies at a university.~Ella estudia en una universidad.',
'computer~computadora~This is a computer.~Esta es una computadora.',
'phone~teléfono~I have a phone.~Tengo un teléfono.',
'table~mesa~The book is on a table.~El libro está sobre una mesa.',
'chair~silla~It is a chair.~Es una silla.',
'key~llave~I have a key.~Tengo una llave.',
'ID card~documento de identidad~This is an ID card.~Esta es una identificación.',
'object~objeto~Choose an object.~Elige un objeto.'
],[
['Lección 1: Qué es un artículo','Reconoce a y an antes de sustantivos singulares.','A y an acompañan a sustantivos contables singulares cuando se habla de algo no específico.',[0,1,2,3],'I have a book.'],
['Lección 2: A antes de sonido consonántico','Usa a con palabras que comienzan con sonido consonántico.','A book, a bag, a pen, a pencil. Importa el primer sonido, no la letra escrita.',[4,5,6,7],'I need a pencil.'],
['Lección 3: An antes de sonido vocálico','Usa an con palabras que comienzan con sonido vocálico.','An apple, an umbrella, an orange, an egg, an idea.',[8,9,10,11],'She has an umbrella.'],
['Lección 4: Casos especiales','Reconoce an hour y a university.','Hour empieza con sonido vocálico; university empieza con sonido consonántico /y/.',[12,13,14,15],'It takes an hour.'],
['Lección 5: Objetos cotidianos','Describe objetos sencillos usando a/an.','Usa a/an + sustantivo contable singular: a phone, a table, a chair, a key.',[16,17,18,19,20,21],'This is an ID card.']
],['I have a bag.','It is a pen.','I want an orange.','She studies at a university.','This is an ID card.']),
unit(6,'Singular y plural','Forma plurales regulares y reconoce algunos plurales irregulares frecuentes.','La mayoría añade -s; se añade -es tras sonidos sibilantes; consonante + y cambia a -ies. Algunos plurales son irregulares: child/children, person/people, man/men, woman/women, foot/feet, tooth/teeth, mouse/mice.','Plurales irregulares','No todos los sustantivos forman el plural con -s. Aprende las formas irregulares como pares y úsalas en frases completas.',[
'singular~singular~This noun is singular.~Este sustantivo está en singular.',
'plural~plural~The plural is different.~El plural es diferente.',
'animal~animal~The animal is small.~El animal es pequeño.',
'animals~animales~The animals are small.~Los animales son pequeños.',
'box~caja~There is one box.~Hay una caja.',
'class~clase~My classes are small.~Mis clases son pequeñas.',
'bus~autobús~The buses are here.~Los autobuses están aquí.',
'watch~reloj~I have two watches.~Tengo dos relojes.',
'baby~bebé~The babies are sleeping.~Los bebés están durmiendo.',
'village~pueblo~The village is small.~El pueblo es pequeño.',
'family~familia~Our families are here.~Nuestras familias están aquí.',
'child~niño / niña~The children are happy.~Los niños están felices.',
'children~niños / niñas~The children are at school.~Los niños están en la escuela.',
'man~hombre~The men are teachers.~Los hombres son profesores.',
'men~hombres~Two men are here.~Dos hombres están aquí.',
'woman~mujer~The women are students.~Las mujeres son estudiantes.',
'women~mujeres~The women are at home.~Las mujeres están en casa.',
'person~persona~One person is here.~Una persona está aquí.',
'people~personas / gente~Many people are here.~Hay muchas personas aquí.',
'foot~pie~My feet are cold.~Tengo los pies fríos.',
'tooth~diente~I brush my teeth.~Me cepillo los dientes.',
'teeth~dientes~My teeth are clean.~Mis dientes están limpios.'
],[
['Lección 1: Singular y plural','Distingue un sustantivo singular de uno plural.','One book es singular; two books es plural. La mayoría de sustantivos añade -s.',[0,1,2,3],'I have two books.'],
['Lección 2: Plurales en -es','Forma plurales de palabras terminadas en sonidos sibilantes.','Box/boxes, class/classes, bus/buses y watch/watches añaden -es.',[4,5,6,7],'The buses are here.'],
['Lección 3: Consonante + y','Forma plurales como baby/babies y city/cities.','Cuando una consonante precede a -y, cambia y por -ies: baby/babies, city/cities.',[8,9,10,11],'The babies are sleeping.'],
['Lección 4: Personas y plurales irregulares','Reconoce child/children, man/men y woman/women.','Algunos sustantivos cambian por completo: child/children, man/men, woman/women, person/people.',[11,12,13,14,15,16,17,18],'The children are at school.'],
['Lección 5: Partes del cuerpo','Reconoce foot/feet y tooth/teeth.','Foot/feet y tooth/teeth son plurales irregulares. Memoriza cada pareja.',[19,20,21,2,3],'I brush my teeth.']
],['There is one box.','My classes are small.','These cities are big.','Two men are here.','My teeth are clean.'])
];
root.GUARDI_CURRICULUM_BLOCKS=root.GUARDI_CURRICULUM_BLOCKS||{};
root.GUARDI_CURRICULUM_BLOCKS.en=root.GUARDI_CURRICULUM_BLOCKS.en||{};
root.GUARDI_CURRICULUM_BLOCKS.en.A1=root.GUARDI_CURRICULUM_BLOCKS.en.A1||{};
root.GUARDI_CURRICULUM_BLOCKS.en.A1['01-06']={units};
})(typeof window!=='undefined'?window:globalThis);
