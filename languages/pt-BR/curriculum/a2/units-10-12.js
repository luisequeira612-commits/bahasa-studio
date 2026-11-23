(function(root){
'use strict';
const vocab=(unit,index,target,esp,ex,exEsp)=>({id:'ptbr_a2_u'+unit+'_v'+String(index).padStart(2,'0'),target,esp,ex,exEsp,verification:{status:'not_checked',sources:[]}});
const lesson=(spec,words)=>({
 title:spec[0],objective:spec[1],grammar:spec[2],
 vocabIds:spec[3].map(n=>words[n].id),reviewVocabIds:spec[4]||[],
 exercises:[makeExercise(words,spec[3][0]),makeExercise(words,spec[3][1])]
});
const makeExercise=(words,index)=>{
 const correct=words[index], candidates=[correct.esp,words[(index+3)%10].esp,words[(index+6)%10].esp];
 const answer=index%3, options=candidates.slice(3-answer).concat(candidates.slice(0,3-answer));
 return {vocabId:correct.id,type:'mc',prompt:'¿Qué significa «'+correct.target+'»?',options,answer,explanation:'Relaciona la expresión con su significado en español.'};
};
const makeUnit=(number,title,desc,grammar,trapTitle,trapDetail,words,specs)=>({
 unitNumber:number,id:'ptbr_a2_u'+number,title:'Unidad '+number+': '+title,desc,grammar,
 trap:{title:trapTitle,detail:trapDetail},vocab:words,
 lessons:specs.map(spec=>lesson(spec,words)),
 exercises:words.map((word,index)=>makeExercise(words,index))
});
const u10=[
vocab(10,1,'notícia','noticia','A notícia apareceu no jornal esta manhã.','La noticia apareció en el periódico esta mañana.'),
vocab(10,2,'manchete','titular','A manchete resume o assunto principal.','El titular resume el tema principal.'),
vocab(10,3,'reportagem','reportaje','A reportagem apresenta diferentes opiniões.','El reportaje presenta diferentes opiniones.'),
vocab(10,4,'fonte','fuente','É importante verificar a fonte da informação.','Es importante verificar la fuente de la información.'),
vocab(10,5,'boato','rumor','Não compartilhe um boato sem confirmar os fatos.','No compartas un rumor sin confirmar los hechos.'),
vocab(10,6,'divulgar','difundir / divulgar','O jornal vai divulgar os resultados amanhã.','El periódico va a difundir los resultados mañana.'),
vocab(10,7,'compartilhar','compartir','Ela gosta de compartilhar notícias úteis.','A ella le gusta compartir noticias útiles.'),
vocab(10,8,'comentário','comentario','Li um comentário sobre a reportagem.','Leí un comentario sobre el reportaje.'),
vocab(10,9,'público','público / audiencia','O programa tem um público muito diverso.','El programa tiene un público muy diverso.'),
vocab(10,10,'entrevista','entrevista','A entrevista começa às nove horas.','La entrevista comienza a las nueve.')
];
const u11=[
vocab(11,1,'exposição','exposición','A exposição apresenta obras de artistas locais.','La exposición presenta obras de artistas locales.'),
vocab(11,2,'espetáculo','espectáculo','O espetáculo começa às oito da noite.','El espectáculo comienza a las ocho de la noche.'),
vocab(11,3,'bilheteria','taquilla','Compramos os ingressos na bilheteria.','Compramos las entradas en la taquilla.'),
vocab(11,4,'plateia','público / espectadores','A plateia aplaudiu no final.','El público aplaudió al final.'),
vocab(11,5,'apresentação','presentación / actuación','A apresentação dos músicos foi excelente.','La presentación de los músicos fue excelente.'),
vocab(11,6,'ensaio','ensayo','O grupo tem um ensaio antes do evento.','El grupo tiene un ensayo antes del evento.'),
vocab(11,7,'participar','participar','Vou participar de uma atividade cultural.','Voy a participar en una actividad cultural.'),
vocab(11,8,'convidado','invitado','Cada convidado recebeu um programa.','Cada invitado recibió un programa.'),
vocab(11,9,'comemorar','celebrar / festejar','Vamos comemorar o aniversário juntos.','Vamos a celebrar el cumpleaños juntos.'),
vocab(11,10,'celebrar','celebrar','A comunidade vai celebrar a tradição.','La comunidad va a celebrar la tradición.')
];
const u12=[
vocab(12,1,'meio ambiente','medio ambiente','Precisamos proteger o meio ambiente.','Necesitamos proteger el medio ambiente.'),
vocab(12,2,'poluição','contaminación','A poluição do rio preocupa os moradores.','La contaminación del río preocupa a los habitantes.'),
vocab(12,3,'reciclar','reciclar','É possível reciclar papel e vidro.','Es posible reciclar papel y vidrio.'),
vocab(12,4,'desperdício','desperdicio','O desperdício de água deve diminuir.','El desperdicio de agua debe disminuir.'),
vocab(12,5,'energia','energía','A escola usa energia solar.','La escuela usa energía solar.'),
vocab(12,6,'consumo','consumo','O consumo consciente reduz o lixo.','El consumo responsable reduce la basura.'),
vocab(12,7,'sustentável','sostenible','A cidade procura um transporte sustentável.','La ciudad busca un transporte sostenible.'),
vocab(12,8,'preservar','preservar','É importante preservar as florestas.','Es importante preservar los bosques.'),
vocab(12,9,'recurso','recurso','A água é um recurso essencial.','El agua es un recurso esencial.'),
vocab(12,10,'coleta seletiva','recogida selectiva','A coleta seletiva começa na segunda-feira.','La recogida selectiva comienza el lunes.')
];
const unit10=makeUnit(10,'Noticias y medios de comunicación','Comprende noticias, identifica fuentes y comparte información con criterio.',
'Notícia, reportagem y entrevista nombran formatos informativos. Fonte identifica el origen de un dato; boato es información no confirmada. Divulgar y compartilhar describen la difusión de contenido.',
'Notícia y boato','Notícia es una información presentada como hecho; boato es un rumor que todavía necesita confirmación. Comprueba la fonte antes de compartilhar.',
u10,[
['Lección 1: Noticias y titulares','Identifica una noticia y su titular.','Notícia presenta un hecho; manchete resume el tema principal.',[0,1],['ptbr_a2_u8_v08']],
['Lección 2: Reportajes y entrevistas','Reconoce formatos que desarrollan información.','Reportagem desarrolla un tema; entrevista recoge respuestas de una persona.',[2,9],['ptbr_a2_u6_v04']],
['Lección 3: Comprobar las fuentes','Distingue información comprobable de rumores.','Fonte señala el origen; boato requiere verificación antes de difundirse.',[3,4],['ptbr_a2_u7_v10']],
['Lección 4: Compartir información','Habla de la difusión de noticias.','Divulgar y compartilhar indican hacer circular información.',[5,6],['ptbr_a2_u8_v07']],
['Lección 5: Opiniones y audiencia','Comprende comentarios y públicos de los medios.','Comentário expresa una reacción; público puede nombrar a la audiencia.',[7,8],['ptbr_a2_u5_v04']]
]);
const unit11=makeUnit(11,'Cultura, espectáculos y eventos','Habla de actividades culturales, actuaciones y participación en eventos.',
'Exposição y espetáculo nombran eventos; bilheteria es el lugar de venta de entradas. Plateia es el conjunto de espectadores. Ensaio prepara una apresentação.',
'Plateia y apresentação','Plateia se refiere a las personas que observan; apresentação es el acto o actuación que se presenta.',
u11,[
['Lección 1: Exposiciones y espectáculos','Identifica eventos culturales.','Exposição muestra obras; espetáculo es una actuación o evento escénico.',[0,1],['ptbr_a2_u9_v03']],
['Lección 2: Entradas y espectadores','Compra entradas y habla del público.','Bilheteria es la taquilla; plateia es el grupo de espectadores.',[2,3],['ptbr_a2_u9_v04']],
['Lección 3: Presentaciones y ensayos','Describe cómo se prepara una actuación.','Ensaio es la preparación; apresentação es el acto presentado.',[4,5],['ptbr_a2_u8_v01']],
['Lección 4: Participar y recibir invitados','Explica quién participa en un evento.','Participar de indica tomar parte; convidado es quien recibe una invitación.',[6,7],['ptbr_a2_u7_v05']],
['Lección 5: Celebraciones','Habla de fiestas y tradiciones.','Comemorar y celebrar expresan festejar un acontecimiento.',[8,9],['ptbr_a2_u4_v05']]
]);
const unit12=makeUnit(12,'Medio ambiente y sostenibilidad','Describe problemas ambientales y acciones para cuidar los recursos.',
'Poluição y desperdício nombran problemas; reciclar y preservar describen acciones. Sustentável caracteriza prácticas que reducen impactos. Coleta seletiva separa residuos para su tratamiento.',
'Reciclar y coleta seletiva','Reciclar es transformar materiales para volver a utilizarlos; coleta seletiva es la recogida separada de residuos.',
u12,[
['Lección 1: El medio ambiente','Habla de la naturaleza y su protección.','Meio ambiente nombra el entorno natural y social que nos rodea.',[0,7],['ptbr_a2_u9_v10']],
['Lección 2: Contaminación y desperdicio','Describe problemas que afectan al entorno.','Poluição es contaminación; desperdício es uso innecesario o pérdida de recursos.',[1,3],['ptbr_a2_u6_v06']],
['Lección 3: Reciclaje y separación','Explica cómo separar materiales.','Reciclar es procesar materiales; coleta seletiva organiza su recogida por tipo.',[2,9],['ptbr_a2_u7_v06']],
['Lección 4: Energía y consumo','Habla del uso responsable de recursos.','Energia y consumo aparecen en expresiones como energia solar y consumo consciente.',[4,5],['ptbr_a2_u5_v08']],
['Lección 5: Recursos y sostenibilidad','Propone acciones para conservar recursos.','Sustentável describe prácticas sostenibles; recurso nombra un bien útil que debe preservarse.',[6,8],['ptbr_a2_u7_v02']]
]);
root.GUARDI_CURRICULUM_BLOCKS=root.GUARDI_CURRICULUM_BLOCKS||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR']=root.GUARDI_CURRICULUM_BLOCKS['pt-BR']||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].A2=root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].A2||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].A2['10-12']={units:[unit10,unit11,unit12]};
})(typeof window!=='undefined'?window:globalThis);
