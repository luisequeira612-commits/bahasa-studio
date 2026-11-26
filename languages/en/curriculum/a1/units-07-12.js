(function(root){
'use strict';
const vocab=(unit,rows)=>rows.map((row,index)=>{const [target,esp,ex,exEsp]=row.split('~');return {id:'en_a1_u'+unit+'_v'+String(index+1).padStart(2,'0'),target,esp,ex,exEsp,verification:{status:'not_checked',sources:[]}};});
const mc=(word,prompt,options)=>({vocabId:word.id,type:'mc',prompt,options,answer:0,explanation:'Selecciona el significado correcto.'});
const order=(word,prompt,sentence)=>{const words=sentence.split(' ');return {vocabId:word.id,type:'order',prompt,words,correctOrder:words.slice(),explanation:'Orden básico de la frase.'};};
const lesson=(title,objective,grammar,words,model)=>({title,objective,grammar,vocabIds:words.map(w=>w.id),reviewVocabIds:[],exercises:[mc(words[0],'¿Qué significa «'+words[0].target+'»?',[words[0].esp,'otra opción','una opción diferente']),order(words[1],'Ordena la frase.',model)]});
const unit=(number,title,desc,grammar,trapTitle,trapDetail,rows,specs,bankModels)=>{
 const words=vocab(number,rows);
 const lessons=specs.map(spec=>lesson(spec[0],spec[1],spec[2],spec[3].map(i=>words[i]),spec[4]));
 const exercises=[];
 for(let i=0;i<5;i++) exercises.push(mc(words[i],'Elige la traducción de «'+words[i].target+'».',[words[i].esp,words[(i+7)%22].esp,words[(i+13)%22].esp]));
 for(let i=0;i<5;i++) exercises.push(order(words[5+i],'Ordena la frase.',bankModels[i]));
 return {unitNumber:number,id:'en_a1_u'+number,title:'Unidad '+number+': '+title,desc,grammar,trap:{title:trapTitle,detail:trapDetail},vocab:words,lessons,exercises};
};
const units=[
unit(7,'Demostrativos this, that, these y those','Señala objetos cercanos y lejanos, distinguiendo singular y plural.','This/that acompañan o sustituyen sustantivos singulares; these/those se usan en plural. This/these indican cercanía; that/those, distancia.','Demostrativo y número','No uses this con un sustantivo plural ni these con uno singular: this book / these books. La distancia se expresa con el contraste this/that.',[
'this~este / esta / esto~This is a book.~Este es un libro.',
'that~ese / esa / aquel / aquella~That is a house.~Esa es una casa.',
'these~estos / estas~These are my books.~Estos son mis libros.',
'those~esos / esas / aquellos / aquellas~Those are chairs.~Esas son sillas.',
'here~aquí~The bag is here.~La bolsa está aquí.',
'there~allí / allá~The house is there.~La casa está allá.',
'near~cerca~The school is near.~La escuela está cerca.',
'far~lejos~The city is far.~La ciudad está lejos.',
'object~objeto~This object is small.~Este objeto es pequeño.',
'thing~cosa~What is that thing?~¿Qué es esa cosa?',
'notebook~cuaderno~This notebook is new.~Este cuaderno es nuevo.',
'desk~escritorio / pupitre~That desk is brown.~Ese escritorio es marrón.',
'door~puerta~The door is open.~La puerta está abierta.',
'window~ventana~This window is big.~Esta ventana es grande.',
'key~llave~These keys are here.~Estas llaves están aquí.',
'bag~bolso / mochila~That bag is blue.~Esa mochila es azul.',
'book~libro~This book is mine.~Este libro es mío.',
'pen~bolígrafo~These pens are black.~Estos bolígrafos son negros.',
'chair~silla~Those chairs are white.~Esas sillas son blancas.',
'picture~imagen / cuadro~That picture is beautiful.~Ese cuadro es bonito.',
'map~mapa~This map is new.~Este mapa es nuevo.',
'place~lugar~This place is quiet.~Este lugar es tranquilo.'
],[
['Lección 1: Cerca y lejos','Distingue this de that al señalar un objeto.','This indica cercanía; that indica distancia. Ambos se usan con sustantivos singulares.',[0,1,4,5],'This is a book.'],
['Lección 2: Singular y plural','Distingue this/that de these/those.','This/that se usan en singular; these/those se usan en plural.',[0,1,2,3],'These are my books.'],
['Lección 3: Ubicación','Usa here, there, near y far para indicar ubicación.','Here significa aquí; there significa allí. Near y far describen distancia.',[4,5,6,7],'The house is there.'],
['Lección 4: Objetos del aula','Señala objetos cotidianos con demostrativos.','Usa demostrativo + sustantivo: this notebook, that desk, these keys.',[8,9,10,11,12,13],'This notebook is new.'],
['Lección 5: Describir lo que señalas','Combina demostrativos con objetos y lugares.','El demostrativo concuerda en número con el sustantivo: those chairs, this map.',[14,15,16,17,18,19,20,21],'Those chairs are white.']
],['That is a house.','These are my books.','The bag is here.','This notebook is new.','Those chairs are white.']),
unit(8,'Colores y descripciones','Describe objetos y personas con colores, tamaño, forma y adjetivos básicos.','En inglés el adjetivo normalmente va antes del sustantivo: a red bag, a small room. El adjetivo no cambia por género ni número.','Orden del adjetivo','Se dice “a blue book”, no “a book blue”. El adjetivo inglés no lleva marca de plural: two red bags.',[
'color~color~What color is the bag?~¿De qué color es la mochila?',
'red~rojo / roja~The apple is red.~La manzana es roja.',
'blue~azul~The book is blue.~El libro es azul.',
'green~verde~The door is green.~La puerta es verde.',
'yellow~amarillo / amarilla~The flower is yellow.~La flor es amarilla.',
'black~negro / negra~The phone is black.~El teléfono es negro.',
'white~blanco / blanca~The table is white.~La mesa es blanca.',
'gray~gris~The cat is gray.~El gato es gris.',
'brown~marrón / café~The desk is brown.~El escritorio es marrón.',
'orange~naranja~The orange bag is small.~La mochila naranja es pequeña.',
'purple~morado / morada~The flower is purple.~La flor es morada.',
'pink~rosado / rosa~The room is pink.~La habitación es rosa.',
'big~grande~The house is big.~La casa es grande.',
'small~pequeño / pequeña~The bag is small.~La mochila es pequeña.',
'long~largo / larga~The street is long.~La calle es larga.',
'short~corto / corta~The pencil is short.~El lápiz es corto.',
'tall~alto / alta~The building is tall.~El edificio es alto.',
'new~nuevo / nueva~The phone is new.~El teléfono es nuevo.',
'old~viejo / vieja~The book is old.~El libro es viejo.',
'round~redondo / redonda~The table is round.~La mesa es redonda.',
'square~cuadrado / cuadrada~The window is square.~La ventana es cuadrada.',
'beautiful~bonito / bonita~The picture is beautiful.~El cuadro es bonito.'
],[
['Lección 1: Colores básicos','Reconoce y nombra colores frecuentes.','Los nombres de colores funcionan como adjetivos: a red apple, a blue book.',[0,1,2,3,4],'The apple is red.'],
['Lección 2: Más colores','Describe objetos con colores adicionales.','El adjetivo va antes del sustantivo: a black phone, a white table.',[5,6,7,8,9],'The phone is black.'],
['Lección 3: Colores y objetos','Combina colores con objetos conocidos.','Los adjetivos no cambian por género ni número: a purple flower / two purple flowers.',[10,11,1,2,5],'The flower is purple.'],
['Lección 4: Tamaño y longitud','Describe tamaño, altura y longitud.','Big, small, long, short y tall preceden al sustantivo cuando lo describen.',[12,13,14,15,16],'The house is big.'],
['Lección 5: Edad, forma y valoración','Describe objetos con new, old, round, square y beautiful.','Puedes combinar dos adjetivos simples antes del sustantivo: a small red bag.',[17,18,19,20,21],'The table is round.']
],['The book is blue.','The table is white.','The flower is purple.','The building is tall.','The picture is beautiful.']),
unit(9,'Adjetivos posesivos','Indica a quién pertenece algo usando my, your, his, her, its, our y their.','Los adjetivos posesivos preceden al sustantivo y no llevan artículo: my book, her bag. His/her dependen del poseedor; its se usa para animales o cosas.','His y her indican al poseedor','El posesivo concuerda con quien posee, no con el objeto: Ana and her book; Luis and his book. Its no lleva apóstrofo.',[
'my~mi / mis~My book is new.~Mi libro es nuevo.',
'your~tu / tus / su / sus~Your bag is blue.~Tu mochila es azul.',
'his~su / sus (de él)~His phone is black.~Su teléfono es negro.',
'her~su / sus (de ella)~Her room is small.~Su habitación es pequeña.',
'its~su / sus (de un animal o cosa)~The dog has its bed.~El perro tiene su cama.',
'our~nuestro / nuestra / nuestros / nuestras~Our house is big.~Nuestra casa es grande.',
'their~su / sus (de ellos)~Their parents are here.~Sus padres están aquí.',
'owner~dueño / dueña~The owner is here.~El dueño está aquí.',
'belong~pertenecer~This book belongs to Ana.~Este libro pertenece a Ana.',
'pet~mascota~Our pet is small.~Nuestra mascota es pequeña.',
'dog~perro~His dog is friendly.~Su perro es amigable.',
'cat~gato~Her cat is gray.~Su gato es gris.',
'home~hogar / casa~Our home is quiet.~Nuestro hogar es tranquilo.',
'team~equipo~Their team is new.~Su equipo es nuevo.',
'group~grupo~Our group is small.~Nuestro grupo es pequeño.',
'friend~amigo / amiga~My friend is Ana.~Mi amiga es Ana.',
'parents~padres~Her parents are teachers.~Sus padres son profesores.',
'brother~hermano~My brother is tall.~Mi hermano es alto.',
'sister~hermana~Your sister is nice.~Tu hermana es agradable.',
'car~coche / carro~His car is red.~Su carro es rojo.',
'room~habitación / cuarto~Our room is clean.~Nuestra habitación está limpia.',
'computer~computadora~Their computer is new.~Su computadora es nueva.'
],[
['Lección 1: My y your','Expresa posesión desde la perspectiva de quien habla y quien escucha.','My significa mi/mis; your puede significar tu/tus o su/sus según el contexto.',[0,1,15,18],'My friend is Ana.'],
['Lección 2: His y her','Distingue el poseedor masculino y femenino.','His se refiere a un poseedor masculino; her a uno femenino. El objeto poseído puede ser cualquiera.',[2,3,10,11],'His dog is friendly.'],
['Lección 3: Its','Usa its para pertenencias de animales o cosas.','Its es un adjetivo posesivo; no lleva apóstrofo. It’s significa it is o it has.',[4,9,10,11],'The dog has its bed.'],
['Lección 4: Our y their','Habla de pertenencias de un grupo.','Our significa nuestro/a(s); their significa su/sus cuando el poseedor es plural.',[5,6,12,13,14,16],'Our house is big.'],
['Lección 5: Posesión en contexto','Combina posesivos con personas, mascotas y objetos.','Estructura: adjetivo posesivo + sustantivo. No se usa a/an delante del posesivo: my car, no a my car.',[7,8,17,18,19,20,21],'Their computer is new.']
],['Your bag is blue.','Her room is small.','The dog has its bed.','Their parents are here.','My brother is tall.']),
unit(10,'Familia y relaciones','Nombra familiares y describe relaciones cercanas con vocabulario básico.','Los sustantivos de familia pueden combinarse con adjetivos posesivos: my mother, his brother, their children. Para presentar a alguien: This is my…','Family es singular colectivo','Family suele tratarse como sustantivo singular en inglés americano: “My family is here”. Para hablar de varias familias: families.',[
'mother~madre~My mother is Ana.~Mi madre es Ana.',
'father~padre~His father is tall.~Su padre es alto.',
'parent~progenitor / padre o madre~A parent is here.~Un padre está aquí.',
'son~hijo~Their son is a student.~Su hijo es estudiante.',
'daughter~hija~Her daughter is nice.~Su hija es agradable.',
'brother~hermano~My brother is Luis.~Mi hermano es Luis.',
'sister~hermana~My sister is a teacher.~Mi hermana es profesora.',
'husband~esposo / marido~Her husband is Daniel.~Su esposo es Daniel.',
'wife~esposa~His wife is Ana.~Su esposa es Ana.',
'child~niño / niña / hijo~The child is happy.~El niño está feliz.',
'children~niños / niñas / hijos~Their children are at home.~Sus hijos están en casa.',
'family~familia~My family is big.~Mi familia es grande.',
'grandmother~abuela~My grandmother is kind.~Mi abuela es amable.',
'grandfather~abuelo~Her grandfather is old.~Su abuelo es mayor.',
'aunt~tía~My aunt is here.~Mi tía está aquí.',
'uncle~tío~His uncle is a teacher.~Su tío es profesor.',
'cousin~primo / prima~My cousin is young.~Mi primo es joven.',
'baby~bebé~The baby is small.~El bebé es pequeño.',
'grandparents~abuelos~Our grandparents are nice.~Nuestros abuelos son agradables.',
'relative~pariente~A relative is here.~Un pariente está aquí.',
'parents~padres~My parents are at home.~Mis padres están en casa.',
'couple~pareja~The couple is happy.~La pareja está feliz.'
],[
['Lección 1: Padres e hijos','Nombra a mother, father, parent, son y daughter.','Mother y father son padres; son y daughter indican hijos por género.',[0,1,2,3,4],'My mother is Ana.'],
['Lección 2: Hermanos y pareja','Nombra hermanos, esposo y esposa.','Brother y sister son hermanos; husband y wife describen a los cónyuges.',[5,6,7,8],'His wife is Ana.'],
['Lección 3: Child y children','Distingue child de children.','Child es singular; children es plural irregular. No se añade -s a child.',[9,10,11,17],'Their children are at home.'],
['Lección 4: Abuelos y otros parientes','Nombra abuelos, tíos y primos.','Grandmother/grandfather; aunt/uncle; cousin puede ser primo o prima.',[12,13,14,15,16,18,19],'My grandmother is kind.'],
['Lección 5: Familia en contexto','Describe a la familia y a una pareja.','Family suele llevar verbo singular en inglés americano: my family is. Parents y grandparents son plurales.',[11,18,19,20,21],'My family is big.']
],['His father is tall.','My sister is a teacher.','The child is happy.','My aunt is here.','The couple is happy.']),
unit(11,'Pronombres posesivos','Sustituye un grupo posesivo completo con mine, yours, his, hers, ours y theirs.','Los pronombres posesivos sustituyen al sustantivo: This book is mine. No llevan sustantivo después. Whose pregunta por el dueño.','No confundas my y mine','My es adjetivo posesivo y necesita un sustantivo (my bag); mine es pronombre y lo sustituye (the bag is mine).',[
'mine~mío / mía / míos / mías~This book is mine.~Este libro es mío.',
'yours~tuyo / tuya / suyos / suyas~The blue bag is yours.~La mochila azul es tuya.',
'his~suyo / suya (de él)~The phone is his.~El teléfono es suyo.',
'hers~suyo / suya (de ella)~The room is hers.~La habitación es suya.',
'ours~nuestro / nuestra / nuestros / nuestras~The house is ours.~La casa es nuestra.',
'theirs~suyo / suya (de ellos)~The keys are theirs.~Las llaves son suyas.',
'whose~de quién / cuyo~Whose book is this?~¿De quién es este libro?',
'belonging~pertenencia~This is my belonging.~Esta es mi pertenencia.',
'same~mismo / misma~We have the same bag.~Tenemos la misma mochila.',
'different~diferente~Our books are different.~Nuestros libros son diferentes.',
'wallet~billetera / cartera~The wallet is mine.~La billetera es mía.',
'purse~bolso pequeño / monedero~The purse is hers.~El bolso es suyo.',
'laptop~computadora portátil~The laptop is yours.~La computadora portátil es tuya.',
'charger~cargador~The charger is his.~El cargador es suyo.',
'glasses~gafas / anteojos~The glasses are mine.~Las gafas son mías.',
'scarf~bufanda~The scarf is hers.~La bufanda es suya.',
'coat~abrigo~The coat is ours.~El abrigo es nuestro.',
'suitcase~maleta~The suitcase is theirs.~La maleta es suya.',
'passport~pasaporte~The passport is mine.~El pasaporte es mío.',
'ticket~boleto / billete~The ticket is yours.~El boleto es tuyo.',
'owner~dueño / dueña~Who is the owner?~¿Quién es el dueño?',
'belong~pertenecer~These keys belong to us.~Estas llaves nos pertenecen.'
],[
['Lección 1: Mine y yours','Usa mine y yours para sustituir my/your + sustantivo.','Mine = my + sustantivo; yours = your + sustantivo. El pronombre aparece sin sustantivo después.',[0,1,6,8],'This book is mine.'],
['Lección 2: His y hers','Distingue posesión de él y de ella.','His y hers pueden funcionar como pronombres posesivos; hers lleva -s, his no cambia.',[2,3,11,15],'The room is hers.'],
['Lección 3: Ours y theirs','Expresa posesión de un grupo.','Ours y theirs sustituyen our/their + sustantivo.',[4,5,16,17],'The house is ours.'],
['Lección 4: Preguntar por el dueño','Usa whose y owner para identificar pertenencias.','Whose + sustantivo pregunta “¿de quién…?”. Whose book is this? — It is mine.',[6,7,20,21],'Whose book is this?'],
['Lección 5: Pertenencias personales','Identifica objetos y expresa a quién pertenecen.','El pronombre posesivo concuerda con el poseedor, no con el objeto: the glasses are mine.',[12,13,14,15,18,19],'The laptop is yours.']
],['The blue bag is yours.','The phone is his.','The keys are theirs.','Who is the owner?','The passport is mine.']),
unit(12,'La casa y there is / there are','Describe habitaciones y muebles e indica qué existe en un lugar.','There is se usa con un sustantivo singular o incontable; there are con plural. Preguntas: Is there…? / Are there…? Negativas: there isn’t / there aren’t.','There is no equivale a “allí está”','En “There is a bed in the room”, there is introduce la existencia de algo. No se traduce palabra por palabra como “allí está”.',[
'house~casa~Our house is big.~Nuestra casa es grande.',
'apartment~apartamento~The apartment is small.~El apartamento es pequeño.',
'bedroom~dormitorio~There is a bed in the bedroom.~Hay una cama en el dormitorio.',
'bathroom~baño~There is a mirror in the bathroom.~Hay un espejo en el baño.',
'kitchen~cocina~The kitchen is clean.~La cocina está limpia.',
'living room~sala de estar~There is a sofa in the living room.~Hay un sofá en la sala.',
'dining room~comedor~The table is in the dining room.~La mesa está en el comedor.',
'hallway~pasillo~The hallway is long.~El pasillo es largo.',
'floor~suelo / piso~The bag is on the floor.~La mochila está en el suelo.',
'wall~pared~The picture is on the wall.~El cuadro está en la pared.',
'ceiling~techo~The lamp is on the ceiling.~La lámpara está en el techo.',
'bed~cama~There is a bed in the room.~Hay una cama en la habitación.',
'sofa~sofá~There is a sofa in the living room.~Hay un sofá en la sala.',
'cupboard~armario / alacena~There is a cupboard in the kitchen.~Hay un armario en la cocina.',
'lamp~lámpara~There are two lamps.~Hay dos lámparas.',
'mirror~espejo~There is a mirror in the bathroom.~Hay un espejo en el baño.',
'shelf~estante~There is a shelf on the wall.~Hay un estante en la pared.',
'fridge~refrigerador~The fridge is in the kitchen.~El refrigerador está en la cocina.',
'stove~estufa~The stove is in the kitchen.~La estufa está en la cocina.',
'sink~fregadero / lavabo~There is a sink in the bathroom.~Hay un lavabo en el baño.',
'garden~jardín~There is a garden behind the house.~Hay un jardín detrás de la casa.',
'balcony~balcón~The apartment has a balcony.~El apartamento tiene un balcón.'
],[
['Lección 1: Tipos de vivienda','Nombra house y apartment y sus espacios principales.','House es casa; apartment es apartamento. Bedroom, bathroom y kitchen nombran habitaciones.',[0,1,2,3],'The apartment is small.'],
['Lección 2: Habitaciones comunes','Identifica kitchen, living room, dining room y hallway.','Los nombres de habitaciones suelen aparecer después de in: in the kitchen, in the living room.',[4,5,6,7],'The kitchen is clean.'],
['Lección 3: Partes de la habitación','Nombra floor, wall y ceiling.','Floor es suelo/piso; wall es pared; ceiling es techo. No confundas ceiling con roof.',[8,9,10,11],'The picture is on the wall.'],
['Lección 4: Muebles y objetos','Identifica muebles y objetos básicos de la casa.','There is + singular: there is a sofa. There are + plural: there are two lamps.',[12,13,14,15,16],'There is a sofa in the living room.'],
['Lección 5: Describir lo que hay','Usa there is/there are en afirmaciones y preguntas sencillas.','Is there a…? pregunta por un elemento singular; are there…? pregunta por varios.',[17,18,19,20,21],'There are two lamps.']
],['There is a bed in the bedroom.','The kitchen is clean.','The lamp is on the ceiling.','There is a mirror in the bathroom.','There is a garden behind the house.'])
];
root.GUARDI_CURRICULUM_BLOCKS=root.GUARDI_CURRICULUM_BLOCKS||{};
root.GUARDI_CURRICULUM_BLOCKS.en=root.GUARDI_CURRICULUM_BLOCKS.en||{};
root.GUARDI_CURRICULUM_BLOCKS.en.A1=root.GUARDI_CURRICULUM_BLOCKS.en.A1||{};
root.GUARDI_CURRICULUM_BLOCKS.en.A1['07-12']={units};
})(typeof window!=='undefined'?window:globalThis);
