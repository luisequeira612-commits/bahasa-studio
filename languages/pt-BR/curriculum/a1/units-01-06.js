(function(root){
'use strict';
const v=(id,target,esp,ex,exEsp)=>({id,target,esp,ex,exEsp,verification:{status:'not_checked',sources:[]}});
const mc=(vocabId,prompt,options,answer)=>({vocabId,type:'mc',prompt,options,answer,explanation:'Práctica introductoria; pendiente de cotejo lingüístico.'});
const match=(prompt,pairs)=>({type:'mc',prompt:prompt+' '+pairs[0].left,options:pairs.map(pair=>pair.right),answer:0,explanation:'Selecciona la correspondencia correcta.'});
const order=(vocabId,prompt,words,correctOrder)=>({vocabId,type:'order',prompt,words,correctOrder,explanation:'Orden básico de la frase.'});
const write=(vocabId,prompt,modelAnswer)=>({vocabId,type:'order',prompt,words:modelAnswer.replace(/[.!?]/g,'').split(' '),correctOrder:modelAnswer.replace(/[.!?]/g,'').split(' '),explanation:'Construye la frase con las palabras disponibles; el modelo no es la única respuesta posible.'});
const u1=[
v('ptbr_a1_u1_v01','eu','yo','Eu sou Ana.','Yo soy Ana.'),
v('ptbr_a1_u1_v02','você','tú / usted','Você é Luis.','Tú eres Luis.'),
v('ptbr_a1_u1_v03','ele / ela','él / ella','Ela é Ana.','Ella es Ana.'),
v('ptbr_a1_u1_v04','olá','hola','Olá, eu sou Ana.','Hola, soy Ana.'),
v('ptbr_a1_u1_v05','oi','hola informal','Oi, você é Luis?','Hola, ¿eres Luis?'),
v('ptbr_a1_u1_v06','bom dia','buenos días','Bom dia!','¡Buenos días!'),
v('ptbr_a1_u1_v07','boa tarde','buenas tardes','Boa tarde!','¡Buenas tardes!'),
v('ptbr_a1_u1_v08','boa noite','buenas noches','Boa noite!','¡Buenas noches!'),
v('ptbr_a1_u1_v09','tchau','adiós','Tchau, Ana!','¡Adiós, Ana!'),
v('ptbr_a1_u1_v10','obrigado / obrigada','gracias','Obrigado pela ajuda.','Gracias por la ayuda.')
];

const u2=[
v('ptbr_a1_u2_v01','estar','estar','Eu estou bem.','Estoy bien.'),
v('ptbr_a1_u2_v02','estou','estoy','Eu estou aqui.','Estoy aquí.'),
v('ptbr_a1_u2_v03','está','estás / está','Você está aqui.','Estás aquí.'),
v('ptbr_a1_u2_v04','brasileiro','brasileño','Ele é brasileiro.','Él es brasileño.'),
v('ptbr_a1_u2_v05','brasileira','brasileña','Ela é brasileira.','Ella es brasileña.'),
v('ptbr_a1_u2_v06','nicaraguense','nicaragüense','Eu sou nicaraguense.','Soy nicaragüense.'),
v('ptbr_a1_u2_v07','mexicano','mexicano','Ele é mexicano.','Él es mexicano.'),
v('ptbr_a1_u2_v08','mexicana','mexicana','Ela é mexicana.','Ella es mexicana.'),
v('ptbr_a1_u2_v09','o / a / os / as','el / la / los / las','O brasileiro e a brasileira estão aqui.','El brasileño y la brasileña están aquí.'),
v('ptbr_a1_u2_v10','bem','bien','Eu estou bem.','Estoy bien.')
];

const u3=[
v('ptbr_a1_u3_v01','falar','hablar','Eu falo português.','Yo hablo portugués.'),
v('ptbr_a1_u3_v02','estudar','estudiar','Você estuda português.','Tú estudias portugués.'),
v('ptbr_a1_u3_v03','trabalhar','trabajar','Ela trabalha aqui.','Ella trabaja aquí.'),
v('ptbr_a1_u3_v04','morar','vivir / residir','Eu moro aqui.','Yo vivo aquí.'),
v('ptbr_a1_u3_v05','gostar','gustar','Eu gosto de música.','Me gusta la música.'),
v('ptbr_a1_u3_v06','embaraçada','avergonzada / incómoda','Estou embaraçada.','Estoy avergonzada.'),
v('ptbr_a1_u3_v07','embaraçado','avergonzado / incómodo','Ele está embaraçado.','Él está avergonzado.'),
v('ptbr_a1_u3_v08','grávida','embarazada','Ela está grávida.','Ella está embarazada.')
];

const numbers='um,dois,três,quatro,cinco,seis,sete,oito,nove,dez,onze,doze,treze,quatorze,quinze,dezesseis,dezessete,dezoito,dezenove,vinte'.split(',');
const numberVocab=numbers.map((target,index)=>v('ptbr_a1_u3_n'+String(index+1).padStart(2,'0'),target,String(index+1),target+'!',String(index+1)));

const lesson=(title,objective,grammar,vocabIds,reviewVocabIds,exercises)=>({title,objective,grammar,vocabIds,reviewVocabIds,exercises});
const u1Lessons=[
lesson('Lección 1: Saludos cotidianos','Reconoce saludos de mañana, tarde y noche.','Olá y oi son saludos generales; bom dia, boa tarde y boa noite dependen del momento.',u1.slice(3,8).map(x=>x.id),[],[
match('Empareja cada saludo con su significado.',[{left:'bom dia',right:'buenos días'},{left:'boa tarde',right:'buenas tardes'},{left:'boa noite',right:'buenas noches'}]),
mc(u1[4].id,'¿Cuál es un saludo informal?', ['oi','tchau','obrigado'],0)
]),
lesson('Lección 2: Pronombres','Distingue eu, você y ele/ela.','Eu habla de quien habla; você se dirige a la otra persona y usa forma verbal de tercera persona.',u1.slice(0,3).map(x=>x.id),[],[
match('Relaciona los pronombres.',[{left:'eu',right:'yo'},{left:'você',right:'tú / usted'},{left:'ela',right:'ella'}]),
mc(u1[1].id,'¿Qué pronombre significa «tú / usted»?',['eu','você','ela'],1)
]),
lesson('Lección 3: El verbo ser','Forma presentaciones con ser.','En presente: eu sou; você é; ele/ela é. La forma de você coincide con la tercera persona.',[u1[0].id,u1[1].id,u1[2].id],[],[
mc(u1[1].id,'Completa: Você ___ Luis.',['sou','é','somos'],1),
order(u1[0].id,'Ordena: «Yo soy Ana».',['Ana','sou','Eu'],['Eu','sou','Ana'])
]),
lesson('Lección 4: Un primer diálogo','Comprende un intercambio breve de presentación.','Lee el diálogo y reconoce quién saluda y quién se presenta; no se reproduce audio en este piloto.',u1.map(x=>x.id),[],[
mc(u1[3].id,'Lee en voz alta: «Oi! Eu sou Ana. Você é Luis?» ¿Qué ocurre?',['Ana se presenta y pregunta el nombre','Ana se despide','Ana da las gracias'],0)
]),
lesson('Lección 5: Repaso y producción','Combina saludos, pronombres y ser en una presentación.','Usa un saludo, un pronombre y la forma correcta de ser.',u1.map(x=>x.id),[],[
write(u1[0].id,'Escribe una presentación breve con eu y ser.','Eu sou Ana.'),
mc(u1[9].id,'¿Qué expresión se usa para dar las gracias?',['tchau','obrigado / obrigada','boa noite'],1)
])
];
const unit1={
unitNumber:1,id:'ptbr_a1_u1',title:'Unidad 1: Saludos, pronombres y ser',
desc:'Saluda, reconoce eu y você y preséntate con el verbo ser.',
grammar:'Ser en presente: eu sou; você é; ele/ela é. En portugués brasileño, você lleva la forma verbal de tercera persona.',
trap:{title:'Atención a você',detail:'Aunque você se traduce como «tú», se dice você é, no você és.'},
vocab:u1,lessons:u1Lessons,
exercises:[
mc(u1[0].id,'¿Qué significa eu?',['yo','tú','ella'],0),
mc(u1[1].id,'¿Qué pronombre significa «tú / usted»?',['eu','você','ele'],1),
mc(u1[1].id,'Completa: Você ___ Luis.',['sou','é','são'],1),
mc(u1[3].id,'¿Qué significa olá?',['adiós','hola','gracias'],1),
mc(u1[5].id,'¿Qué saludo corresponde a la mañana?',['boa noite','bom dia','boa tarde'],1),
mc(u1[6].id,'¿Qué significa boa tarde?',['buenas tardes','buenas noches','buenos días'],0),
mc(u1[8].id,'¿Qué significa tchau?',['hola','gracias','adiós'],2),
mc(u1[9].id,'¿Qué expresión da las gracias?',['obrigado / obrigada','oi','olá'],0),
order(u1[0].id,'Ordena: «Yo soy Ana».',['Ana','sou','Eu'],['Eu','sou','Ana']),
write(u1[1].id,'Escribe una frase de presentación con você.','Você é Luis.')
]
};

const u2Lessons=[
lesson('Lección 1: Estados con estar','Expresa cómo te encuentras y dónde estás.','Estar se conjuga: eu estou; você está. Se usa aquí para estados y ubicación.',u2.slice(0,3).map(x=>x.id).concat([u2[9].id]),[],[
match('Empareja las formas de estar.',[{left:'eu estou',right:'yo estoy'},{left:'você está',right:'tú estás' }]),
mc(u2[1].id,'Completa: Eu ___ bem.',['estou','está','sou'],0)
]),
lesson('Lección 2: Nacionalidades','Nombra nacionalidades en masculino y femenino.','Las terminaciones de nacionalidades suelen concordar con la persona: brasileiro / brasileira; nicaraguense mantiene la misma forma.',u2.slice(3,8).map(x=>x.id),[],[
match('Relaciona las nacionalidades.',[{left:'brasileiro',right:'brasileño'},{left:'brasileira',right:'brasileña'},{left:'nicaraguense',right:'nicaragüense'}]),
mc(u2[5].id,'¿Cómo se dice «nicaragüense»?',['nicaraguense','nicaraguensa','nicaraguenses'],0)
]),
lesson('Lección 3: Artículos definidos','Reconoce o, a, os y as.','O y a son singulares; os y as son plurales. El artículo concuerda con el sustantivo.',[u2[8].id],[],[
match('Empareja los artículos.',[{left:'o',right:'el'},{left:'a',right:'la'},{left:'os',right:'los'},{left:'as',right:'las'}]),
mc(u2[8].id,'¿Qué artículo significa «los»?',['a','os','as'],1)
]),
lesson('Lección 4: Ser o estar','Distingue nacionalidad de estado o ubicación.','Ser identifica nacionalidad: ela é brasileira. Estar expresa estado o ubicación: ela está aqui.',u2.map(x=>x.id),[],[
mc(u2[4].id,'Completa: Ela ___ brasileira.',['está','é','sou'],1),
mc(u2[2].id,'Completa: Você ___ aqui.',['está','é','são'],0)
]),
lesson('Lección 5: Repaso contextual','Combina estar, nacionalidades y artículos.','Lee las frases completas y recupera el vocabulario de saludos de U1.',u2.map(x=>x.id),[u1[0].id,u1[1].id],[
mc(u2[3].id,'Lee: «O brasileiro está aqui». ¿Qué significa?',['El brasileño está aquí','La brasileña está aquí','Los brasileños están aquí'],0),
mc(u1[0].id,'¿Qué significa eu?',['yo','tú','ella'],0)
])
];
const unit2={
unitNumber:2,id:'ptbr_a1_u2',title:'Unidad 2: Estar, nacionalidades y artículos',
desc:'Expresa estados y ubicación, nombra nacionalidades y usa artículos definidos.',
grammar:'Estar: eu estou, você está. Ser expresa identidad o nacionalidad; estar expresa estado o ubicación. O/a/os/as concuerdan con el sustantivo.',
trap:{title:'Ser no es estar',detail:'Para nacionalidad se usa ser (ela é brasileira); para ubicación o estado se usa estar (ela está aqui).'},
vocab:u2,lessons:u2Lessons,
exercises:[
mc(u2[1].id,'Completa: Eu ___ bem.',['estou','está','é'],0),
mc(u2[2].id,'Completa: Você ___ aqui.',['sou','está','são'],1),
mc(u2[3].id,'¿Qué significa brasileiro?',['brasileño','brasileña','mexicano'],0),
mc(u2[5].id,'¿Qué significa nicaraguense?',['mexicano','nicaragüense','brasileña'],1),
mc(u2[4].id,'Completa: Ela é ___.',['brasileiro','brasileira','brasileiros'],1),
mc(u2[8].id,'¿Qué artículo significa «el»?',['o','a','as'],0),
mc(u2[8].id,'¿Qué artículo significa «las»?',['os','a','as'],2),
mc(u2[3].id,'Completa: ___ brasileiro fala português.',['A','O','As'],1),
mc(u2[4].id,'Completa: ___ brasileira fala português.',['O','Os','A'],2),
order(u2[1].id,'Ordena: «Yo estoy aquí».',['aqui','estou','Eu'],['Eu','estou','aqui'])
]
};

const u3Lessons=[
lesson('Lección 1: Verbos regulares en -ar','Forma frases sencillas con verbos regulares en -ar.','En presente, muchos verbos regulares en -ar usan -o con eu y -a con você: eu falo, você fala.',u3.slice(0,5).map(x=>x.id),[],[
match('Relaciona cada verbo con su significado.',[{left:'falar',right:'hablar'},{left:'estudar',right:'estudiar'},{left:'trabalhar',right:'trabajar'},{left:'morar',right:'vivir'}]),
mc(u3[0].id,'Completa: Eu ___ português.',['fala','falo','falam'],1)
]),
lesson('Lección 2: Números del 1 al 10','Reconoce y ordena los números del uno al diez.','Practica la secuencia oral y escrita del 1 al 10; este piloto no reproduce audio.',numberVocab.slice(0,10).map(x=>x.id),[],[
match('Empareja los primeros números.',[{left:'um',right:'1'},{left:'dois',right:'2'},{left:'três',right:'3'},{left:'dez',right:'10'}]),
mc(numberVocab[4].id,'¿Qué número significa cinco?',['três','cinco','sete'],1)
]),
lesson('Lección 3: Números del 11 al 20','Reconoce los números del once al veinte.','Los números del 11 al 19 tienen formas propias; veinte es vinte.',numberVocab.slice(10,20).map(x=>x.id),[],[
match('Empareja números del 11 al 20.',[{left:'onze',right:'11'},{left:'doze',right:'12'},{left:'quinze',right:'15'},{left:'vinte',right:'20'}]),
mc(numberVocab[19].id,'¿Cómo se dice veinte?',['dezenove','vinte','doze'],1)
]),
lesson('Lección 4: Un falso amigo importante','Distingue embaraçada de grávida.','Embaraçada significa avergonzada o incómoda; grávida significa embarazada. No traduzcas embarazada como embaraçada.',u3.slice(5,8).map(x=>x.id),[],[
mc(u3[5].id,'Si alguien dice «Estou embaraçada», ¿qué quiere decir?',['Estoy embarazada','Estoy avergonzada','Estoy trabajando'],1),
mc(u3[7].id,'¿Qué palabra significa «embarazada»?',['embaraçada','grávida','falar'],1)
]),
lesson('Lección 5: Repaso acumulativo','Recupera pronombres y saludos de U1 junto con el contenido nuevo.','Combina una presentación breve con un verbo en -ar y vocabulario ya estudiado.',u3.map(x=>x.id),[u1[0].id,u1[1].id],[
mc(u1[0].id,'¿Qué significa eu?',['yo','tú','ella'],0),
mc(u1[1].id,'¿Qué pronombre significa «tú / usted»?',['eu','você','ela'],1),
write(u3[0].id,'Escribe una frase con eu y un verbo regular en -ar.','Eu falo português.')
])
];
const unit3={
unitNumber:3,id:'ptbr_a1_u3',title:'Unidad 3: Verbos en -ar, números y falsos amigos',
desc:'Usa verbos regulares en -ar, cuenta del 1 al 20 y evita un falso amigo frecuente.',
grammar:'En presente, los verbos regulares en -ar forman eu falo / você fala. Números: 1–20. Embaraçada significa avergonzada; grávida significa embarazada.',
trap:{title:'Falso amigo: embaraçada',detail:'Embaraçada no significa embarazada; significa avergonzada o incómoda. Para «embarazada» usa grávida.'},
vocab:u3.concat(numberVocab),lessons:u3Lessons,
exercises:[
mc(u1[0].id,'Repaso U1: ¿Qué significa eu?',['yo','tú','ella'],0),
mc(u1[1].id,'Repaso U1: ¿Qué significa você?',['él','tú / usted','nosotros'],1),
mc(u3[0].id,'¿Qué significa falar?',['hablar','estudiar','vivir'],0),
mc(u3[1].id,'Completa: Você ___ português.',['estuda','estudo','estudam'],0),
mc(numberVocab[0].id,'¿Cómo se dice uno?',['um','dois','três'],0),
mc(numberVocab[9].id,'¿Cómo se dice diez?',['doze','dez','vinte'],1),
mc(numberVocab[10].id,'¿Cómo se dice once?',['onze','treze','quinze'],0),
mc(numberVocab[19].id,'¿Cómo se dice veinte?',['dezenove','vinte','dezesseis'],1),
mc(u3[5].id,'¿Qué significa embaraçada?',['embarazada','avergonzada','mexicana'],1),
mc(u3[7].id,'¿Qué palabra significa embarazada?',['grávida','embaraçada','trabalhar'],0)
]
};
root.GUARDI_CURRICULUM_BLOCKS=root.GUARDI_CURRICULUM_BLOCKS||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR']=root.GUARDI_CURRICULUM_BLOCKS['pt-BR']||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].A1=root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].A1||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].A1['01-06']={units:[unit1,unit2,unit3]};
})(typeof window!=='undefined'?window:globalThis);
