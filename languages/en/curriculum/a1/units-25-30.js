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
const refs=[
{id:'en_a1_u7_v01',target:'this',esp:'este / esta / esto'},
{id:'en_a1_u7_v02',target:'that',esp:'ese / esa / aquel / aquella'},
{id:'en_a1_u7_v03',target:'these',esp:'estos / estas'},
{id:'en_a1_u7_v04',target:'those',esp:'esos / esas'},
{id:'en_a1_u8_v02',target:'red',esp:'rojo / roja'},
{id:'en_a1_u8_v13',target:'big',esp:'grande'},
{id:'en_a1_u9_v01',target:'my',esp:'mi / mis'},
{id:'en_a1_u9_v03',target:'his',esp:'su / sus (de él)'},
{id:'en_a1_u9_v04',target:'her',esp:'su / sus (de ella)'},
{id:'en_a1_u9_v06',target:'our',esp:'nuestro / nuestra / nuestros / nuestras'},
{id:'en_a1_u10_v01',target:'mother',esp:'madre'},
{id:'en_a1_u10_v06',target:'brother',esp:'hermano'},
{id:'en_a1_u11_v01',target:'mine',esp:'mío / mía / míos / mías'},
{id:'en_a1_u12_v01',target:'house',esp:'casa'},
{id:'en_a1_u12_v03',target:'bedroom',esp:'dormitorio'},
{id:'en_a1_u12_v13',target:'sofa',esp:'sofá'},
{id:'en_a1_u6_v05',target:'box',esp:'caja'},
{id:'en_a1_u6_v06',target:'class',esp:'clase'},
{id:'en_a1_u5_v01',target:'article',esp:'artículo'},
{id:'en_a1_u5_v02',target:'a',esp:'un / una'}
];
const reviewUnit=()=>{
 const specs=[
 ['Lección 1: Demostrativos','Integra demostrativos singulares y plurales en contexto.','Distingue this/that de these/those según número y distancia.',[0,1,2,3],'That is my book.'],
 ['Lección 2: Artículos y descripciones','Combina artículos, colores y adjetivos básicos.','Usa a/an según el sonido inicial; el adjetivo precede al sustantivo.',[4,5,18,19],'This box is big and red.'],
 ['Lección 3: Posesión','Integra adjetivos y pronombres posesivos.','My/her/our preceden al sustantivo; mine lo sustituye.',[6,7,8,9,12],'This is his house.'],
 ['Lección 4: Familia y relaciones','Describe familiares con adjetivos posesivos.','Combina posesivo + familiar: my mother, his brother.',[6,7,10,11],'His brother is here.'],
 ['Lección 5: La casa y lo que hay','Describe habitaciones y muebles con there is/are.','There is + singular; there are + plural. Reutiliza demostrativos y posesivos.',[13,14,15,16,17],'There is a sofa in the bedroom.']
 ];
 const lessons=specs.map(s=>{const selected=s[3].map(i=>refs[i]);return {title:s[0],objective:s[1],grammar:s[2],vocabIds:[],reviewVocabIds:selected.map(w=>w.id),exercises:[mc(selected[0],'¿Qué significa «'+selected[0].target+'»?',[selected[0].esp,'otra opción','una opción diferente']),order(selected[1],'Ordena la frase.',s[4])]};});
 const exercises=[];
 for(let i=0;i<5;i++)exercises.push(mc(refs[i],'Repasa el significado de «'+refs[i].target+'».',[refs[i].esp,refs[(i+5)%refs.length].esp,refs[(i+10)%refs.length].esp]));
 const models=['This house is big.','My mother is here.','His brother is here.','Her mother is here.','Our house is big.'];
 for(let i=0;i<5;i++)exercises.push(order(refs[5+i],'Ordena la frase.',models[i]));
 return {unitNumber:30,id:'en_a1_u30',title:'Unidad 30: Repaso A1 I',desc:'Repasa artículos, demostrativos, posesivos, familia y descripciones de la casa sin introducir vocabulario nuevo.',grammar:'Integra be, a/an, this/that/these/those, adjetivos y pronombres posesivos, y there is/are.',trap:{title:'Revisar concordancia y orden',detail:'Comprueba artículo + adjetivo + sustantivo, concordancia singular/plural y la diferencia entre adjetivos posesivos y pronombres posesivos.'},vocab:[],lessons,exercises};
};
const units=[
unit(25,'Dar indicaciones','Da instrucciones sencillas para caminar por una ciudad y localizar lugares.','Usa imperativos para instrucciones: turn left, go straight. Las preposiciones y expresiones de lugar indican posición: between, behind, across from.','Imperativo sin sujeto','En instrucciones directas se usa la forma base del verbo: Turn left. No es necesario añadir you.',[
['turn','girar / doblar','Turn left at the corner.','Gira a la izquierda en la esquina.'],
['left','izquierda','The bank is on the left.','El banco está a la izquierda.'],
['right','derecha','Turn right at the light.','Gira a la derecha en el semáforo.'],
['straight','recto / derecho','Go straight for two blocks.','Sigue recto dos cuadras.'],
['north','norte','The airport is north of town.','El aeropuerto está al norte del pueblo.'],
['south','sur','The beach is south of the city.','La playa está al sur de la ciudad.'],
['east','este','The station is east of the park.','La estación está al este del parque.'],
['west','oeste','The hotel is west of the bank.','El hotel está al oeste del banco.'],
['block','cuadra / manzana','Walk one block.','Camina una cuadra.'],
['intersection','intersección / cruce','Stop at the intersection.','Detente en la intersección.'],
['cross','cruzar','Cross the street here.','Cruza la calle aquí.'],
['follow','seguir','Follow this road.','Sigue esta carretera.'],
['past','pasando / más allá de','Walk past the hotel.','Pasa caminando el hotel.'],
['between','entre','The bank is between the hotel and the store.','El banco está entre el hotel y la tienda.'],
['behind','detrás de','The pharmacy is behind the bank.','La farmacia está detrás del banco.'],
['in front of','delante de','Wait in front of the station.','Espera delante de la estación.'],
['next to','al lado de','The café is next to the bank.','El café está al lado del banco.'],
['across from','enfrente de','The hotel is across from the park.','El hotel está enfrente del parque.'],
['on the left','a la izquierda','The school is on the left.','La escuela está a la izquierda.'],
['on the right','a la derecha','The store is on the right.','La tienda está a la derecha.'],
['go straight','seguir recto','Go straight and turn left.','Sigue recto y gira a la izquierda.'],
['direction','dirección / indicación','Can you give me directions?','¿Puedes darme indicaciones?']
],[
['Lección 1: Giros y orientación','Da instrucciones para girar y seguir recto.','Usa imperativos: turn left, turn right, go straight.',[0,1,2,3],'Turn left at the corner.'],
['Lección 2: Puntos cardinales','Describe dónde queda un lugar según los puntos cardinales.','North/south/east/west pueden ir seguidos de of para ubicar un lugar.',[4,5,6,7],'The beach is south of the city.'],
['Lección 3: Cruces y cuadras','Da indicaciones usando cuadras e intersecciones.','Usa walk/cross + objeto y expresiones como one block.',[8,9,10,11],'Stop at the intersection.'],
['Lección 4: Posición de lugares','Explica dónde queda un sitio respecto a otro.','Between requiere dos referencias; behind, in front of, next to y across from indican posición.',[12,13,14,15,16],'The bank is between the hotel and the store.'],
['Lección 5: Dar una ruta completa','Combina giros, orientación y expresiones de ubicación.','Las instrucciones se encadenan con and: Go straight and turn left.',[17,18,19,20,21],'The school is on the left.']
],['The beach is south of the city.','The station is east of the park.','The hotel is west of the bank.','Walk one block.','Stop at the intersection.']),
unit(26,'Dinero y compras','Pregunta precios, compara productos y realiza compras sencillas.','How much is/are…? pregunta el precio. Usa can I have…? y I’d like… para pedir productos; cheap/expensive describen el precio.','How much para el precio','How much pregunta por el precio o una cantidad incontable; how many se usa con sustantivos contables plurales.',[
['money','dinero','I need some money.','Necesito algo de dinero.'],
['price','precio','What is the price?','¿Cuál es el precio?'],
['cost','costar / costo','How much does it cost?','¿Cuánto cuesta?'],
['dollar','dólar','It costs five dollars.','Cuesta cinco dólares.'],
['cent','centavo','This is fifty cents.','Esto cuesta cincuenta centavos.'],
['cash','efectivo','I pay in cash.','Pago en efectivo.'],
['credit card','tarjeta de crédito','Can I pay by credit card?','¿Puedo pagar con tarjeta de crédito?'],
['debit card','tarjeta de débito','I use a debit card.','Uso una tarjeta de débito.'],
['receipt','recibo / comprobante','Keep the receipt.','Guarda el recibo.'],
['change','cambio / vuelto','The customer receives the change.','Aquí está tu cambio.'],
['customer','cliente','The customer is waiting.','El cliente está esperando.'],
['sale','rebaja / oferta','The shoes are on sale.','Los zapatos están en oferta.'],
['discount','descuento','Is there a discount?','¿Hay algún descuento?'],
['size','talla / tamaño','What size do you need?','¿Qué talla necesitas?'],
['cheap','barato / barata','This shirt is cheap.','Esta camisa es barata.'],
['expensive','caro / cara','That phone is expensive.','Ese teléfono es caro.'],
['pay','pagar','I want to pay now.','Quiero pagar ahora.'],
['try on','probarse (ropa)','Can I try on this jacket?','¿Puedo probarme esta chaqueta?'],
['fitting room','probador','The fitting room is there.','El probador está allí.'],
['product','producto','This product is new.','Este producto es nuevo.'],
['total','total','The total is ten dollars.','El total es diez dólares.'],
['tax','impuesto','The tax is included.','El impuesto está incluido.']
],[
['Lección 1: Dinero y precios','Nombra dinero y pregunta cuánto cuesta algo.','How much does it cost? usa does + sujeto + verbo base.',[0,1,2,3],'What is the price?'],
['Lección 2: Formas de pago','Habla de efectivo y tarjetas.','Pay in cash / pay by card son expresiones frecuentes.',[4,5,6,7],'I pay in cash.'],
['Lección 3: Recibos y ofertas','Pregunta por recibos, cambio y descuentos.','Usa is/are para preguntar por precios y disponibilidad.',[8,9,10,11,12],'Here is your change.'],
['Lección 4: Ropa y tallas','Pregunta por tallas y prueba prendas.','Can I try on…? pide permiso; what size…? pregunta por una talla.',[13,14,15,17,18],'This shirt is cheap.'],
['Lección 5: Pagar la compra','Habla del producto, total e impuestos.','I want to pay usa want + to-infinitive; el total se expresa con is.',[16,19,20,21],'This product is new.']
],['I pay in cash.','Can I pay by credit card?','I use a debit card.','Keep the receipt.','Here is your change.']),
unit(27,'Contables e incontables I: some y any','Distingue alimentos contables e incontables y usa some/any en frases sencillas.','Some suele aparecer en afirmativas; any, en preguntas y negativas. Los incontables no llevan plural regular: some rice, some milk.','No pluralices los incontables','Bread, rice, milk y water suelen ser incontables: no añadas -s para hablar de una cantidad general.',[
['bread','pan','We have some bread.','Tenemos algo de pan.'],
['rice','arroz','I eat rice every day.','Como arroz todos los días.'],
['milk','leche','There is some milk.','Hay algo de leche.'],
['water','agua','Do you have any water?','¿Tienes agua?'],
['cheese','queso','I want some cheese.','Quiero algo de queso.'],
['butter','mantequilla','There is some butter in the fridge.','Hay mantequilla en el refrigerador.'],
['sugar','azúcar','Do we have any sugar?','¿Tenemos azúcar?'],
['salt','sal','Add some salt.','Añade un poco de sal.'],
['flour','harina','We need some flour.','Necesitamos harina.'],
['meat','carne','They don’t eat meat.','No comen carne.'],
['chicken','pollo','I want some chicken.','Quiero algo de pollo.'],
['fish','pescado','There is some fish for dinner.','Hay pescado para la cena.'],
['fruit','fruta','We have some fruit.','Tenemos fruta.'],
['vegetables','verduras / vegetales','Do you eat any vegetables?','¿Comes verduras?'],
['tomato','tomate','There is a tomato on the table.','Hay un tomate en la mesa.'],
['potato','papa / patata','I need a potato.','Necesito una papa.'],
['onion','cebolla','She cuts an onion.','Ella corta una cebolla.'],
['juice','jugo / zumo','Would you like some juice?','¿Te gustaría un poco de jugo?'],
['coffee','café','I don’t drink coffee.','No tomo café.'],
['tea','té','Would you like some tea?','¿Te gustaría un poco de té?'],
['cup','taza','There is a cup on the table.','Hay una taza sobre la mesa.'],
['glass','vaso / vidrio','Can I have a glass of water?','¿Me das un vaso de agua?']
],[
['Lección 1: Alimentos básicos','Nombra alimentos incontables comunes.','Usa some en afirmativas con incontables: some bread, some rice.',[0,1,2,3],'I eat rice every day.'],
['Lección 2: Ingredientes','Habla de ingredientes y cantidades no específicas.','Some puede preceder a nombres incontables sin artículo.',[4,5,6,7,8],'There is some butter in the fridge.'],
['Lección 3: Carne y vegetales','Nombra alimentos y pregunta si hay alguno.','Any aparece en preguntas y negativas: do you have any…?', [9,10,11,12,13],'I want some chicken.'],
['Lección 4: Frutas y verduras','Nombra productos contables individuales.','Un sustantivo contable singular suele llevar a/an: a tomato, a potato, an onion.',[14,15,16,17],'I need a potato.'],
['Lección 5: Bebidas y recipientes','Habla de bebidas y recipientes sencillos.','Some tea/juice; a cup of tea; a glass of water.',[18,19,20,21],'Would you like some tea?']
],['There is some butter in the fridge.','Do we have any sugar?','Add some salt.','We need some flour.','They don’t eat meat.']),
unit(28,'Cantidades: much, many y expresiones','Pregunta y responde sobre cantidades con much, many y expresiones frecuentes.','Much se usa con incontables; many con contables plurales. A lot of funciona con ambos. A few acompaña contables; a little, incontables.','Much frente a many','How many apples? pero how much water? Elige según el tipo de sustantivo, no según la traducción española.',[
['much','mucho / mucha','How much milk do we need?','¿Cuánta leche necesitamos?'],
['many','muchos / muchas','How many apples are there?','¿Cuántas manzanas hay?'],
['piece','trozo / pieza','I want a piece of cheese.','Quiero un trozo de queso.'],
['slice','rebanada / rodaja','Would you like a slice of bread?','¿Te gustaría una rebanada de pan?'],
['a lot of','mucho / muchos','There is a lot of food.','Hay mucha comida.'],
['a few','unos pocos / unas pocas','I have a few questions.','Tengo unas pocas preguntas.'],
['a little','un poco de','Add a little sugar.','Añade un poco de azúcar.'],
['enough','suficiente','We have enough water.','Tenemos suficiente agua.'],
['too much','demasiado / demasiada','There is too much salt.','Hay demasiada sal.'],
['too many','demasiados / demasiadas','There are too many people.','Hay demasiadas personas.'],
['plenty of','mucho / abundante','We have plenty of time.','Tenemos bastante tiempo.'],
['several','varios / varias','She buys several oranges.','Ella compra varias naranjas.'],
['few','pocos / pocas','There are few chairs.','Hay pocas sillas.'],
['little','poco / poca','There is little coffee.','Hay poco café.'],
['half','medio / mitad','I want half a sandwich.','Quiero medio sándwich.'],
['kilo','kilo','I need a kilo of rice.','Necesito un kilo de arroz.'],
['gram','gramo','Add one hundred grams of cheese.','Añade cien gramos de queso.'],
['liter','litro','We need a liter of milk.','Necesitamos un litro de leche.'],
['dozen','docena','I want a dozen eggs.','Quiero una docena de huevos.'],
['packet','paquete / sobre','Buy a packet of sugar.','Compra un paquete de azúcar.'],
['bunch','manojo / racimo','She buys a bunch of bananas.','Ella compra un racimo de bananos.'],
['pair','par','I need a pair of shoes.','Necesito un par de zapatos.']
],[
['Lección 1: Much y many','Distingue cantidades de incontables y contables.','Much + incontable; many + contable plural.',[0,1,2,3],'How many apples are there?'],
['Lección 2: A lot of y suficiente','Expresa cantidades grandes o suficientes.','A lot of funciona con contables e incontables; enough significa suficiente.',[4,5,6,7],'I have a few questions.'],
['Lección 3: Demasiado y pocos','Describe cantidades excesivas o pequeñas.','Too much + incontable; too many + plural contable; few/little indican cantidad pequeña.',[8,9,12,13],'There are too many people.'],
['Lección 4: Medidas y unidades','Expresa cantidades con medidas comunes.','Usa a/an + medida + of: a kilo of rice, a liter of milk.',[14,15,16,17],'I need a kilo of rice.'],
['Lección 5: Paquetes y grupos','Habla de docenas, paquetes y pares.','Dozen, packet, bunch y pair permiten cuantificar grupos de objetos.',[18,19,20,21],'Buy a packet of sugar.']
],['I have a few apples.','Add a little sugar.','We have enough water.','There is too much salt.','There are too many people.']),
unit(29,'En un restaurante','Lee un menú, pide comida y bebida y solicita la cuenta con expresiones corteses.','Usa I’d like… para pedir; Can I have…? para solicitar; Could we have the bill? para pedir la cuenta.','Pedir con cortesía','En un restaurante, I’d like… suena más cortés que I want… para hacer un pedido.',[
['menu','menú / carta','Can I see the menu?','¿Puedo ver el menú?'],
['server','mesero / camarero','The server is friendly.','El mesero es amable.'],
['order','pedido / pedir','Are you ready to order?','¿Están listos para pedir?'],
['bill','cuenta','Could we have the bill?','¿Nos trae la cuenta?'],
['tip','propina','The tip is on the table.','La propina está sobre la mesa.'],
['meal','comida','The meal is delicious.','La comida está deliciosa.'],
['dish','plato','This dish is popular.','Este plato es popular.'],
['soup','sopa','I’d like some soup.','Quisiera un poco de sopa.'],
['salad','ensalada','She orders a salad.','Ella pide una ensalada.'],
['sandwich','sándwich / emparedado','He wants a sandwich.','Él quiere un sándwich.'],
['burger','hamburguesa','I’d like a burger.','Quisiera una hamburguesa.'],
['fries','papas fritas','Can I have fries?','¿Me puede traer papas fritas?'],
['dessert','postre','Would you like dessert?','¿Le gustaría un postre?'],
['lemonade','limonada','I’d like a lemonade.','Quisiera una limonada.'],
['fork','tenedor','Can I have a fork?','¿Me puede dar un tenedor?'],
['knife','cuchillo','The knife is next to the plate.','El cuchillo está junto al plato.'],
['spoon','cuchara','I need a spoon.','Necesito una cuchara.'],
['plate','plato','The plate is clean.','El plato está limpio.'],
['napkin','servilleta','Can I have a napkin?','¿Me puede dar una servilleta?'],
['hungry','hambriento / con hambre','I am hungry.','Tengo hambre.'],
['thirsty','sediento / con sed','She is thirsty.','Ella tiene sed.'],
['delicious','delicioso / deliciosa','The soup is delicious.','La sopa está deliciosa.']
],[
['Lección 1: El menú y el pedido','Pide el menú y realiza un pedido sencillo.','I’d like + sustantivo y be ready to order son expresiones funcionales.',[0,1,2,3],'The server is friendly.'],
['Lección 2: Platos y comidas','Nombra comidas y platos habituales.','Some puede preceder a un nombre incontable; a/an precede a un contable singular.',[4,5,6,7],'The meal is delicious.'],
['Lección 3: Pedir comida','Pide ensaladas, sándwiches y hamburguesas.','I’d like… y Can I have…? son fórmulas corteses para pedir.',[8,9,10,11],'He wants a sandwich.'],
['Lección 4: Bebidas y cubiertos','Pide bebidas y utensilios.','Can I have + objeto? permite solicitar algo con cortesía.',[12,13,14,15,16],'I’d like a lemonade.'],
['Lección 5: La cuenta y el servicio','Describe cómo te sientes y solicita la cuenta.','Hungry/thirsty se combinan con be; Could we have…? es una petición cortés.',[17,18,19,20,21],'Can I have a napkin?']
],['The meal is delicious.','This dish is popular.','I’d like some soup.','She orders a salad.','He wants a sandwich.'])
];
units.push(reviewUnit());
root.GUARDI_CURRICULUM_BLOCKS=root.GUARDI_CURRICULUM_BLOCKS||{};
root.GUARDI_CURRICULUM_BLOCKS.en=root.GUARDI_CURRICULUM_BLOCKS.en||{};
root.GUARDI_CURRICULUM_BLOCKS.en.A1=root.GUARDI_CURRICULUM_BLOCKS.en.A1||{};
root.GUARDI_CURRICULUM_BLOCKS.en.A1['25-30']={units};
})(typeof window!=='undefined'?window:globalThis);
