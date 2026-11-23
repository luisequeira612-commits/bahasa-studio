(function(root){
'use strict';
const vocab=(unit,index,target,esp,ex,exEsp)=>({id:'ptbr_a2_u'+unit+'_v'+String(index).padStart(2,'0'),target,esp,ex,exEsp,verification:{status:'not_checked',sources:[]}});
const makeExercise=(words,index)=>{
 const correct=words[index], candidates=[correct.esp,words[(index+3)%10].esp,words[(index+6)%10].esp];
 const answer=index%3, options=candidates.slice(3-answer).concat(candidates.slice(0,3-answer));
 return {vocabId:correct.id,type:'mc',prompt:'¿Qué significa «'+correct.target+'»?',options,answer,explanation:'Relaciona la expresión con su significado en español.'};
};
const lesson=(spec,words)=>({
 title:spec[0],objective:spec[1],grammar:spec[2],
 vocabIds:spec[3].map(n=>words[n].id),reviewVocabIds:spec[4]||[],
 exercises:[makeExercise(words,spec[3][0]),makeExercise(words,spec[3][1])]
});
const makeUnit=(number,title,desc,grammar,trapTitle,trapDetail,words,specs)=>({
 unitNumber:number,id:'ptbr_a2_u'+number,title:'Unidad '+number+': '+title,desc,grammar,
 trap:{title:trapTitle,detail:trapDetail},vocab:words,
 lessons:specs.map(spec=>lesson(spec,words)),
 exercises:words.map((word,index)=>makeExercise(words,index))
});
const u4=[
vocab(4,1,'já','ya','Eu já visitei Salvador.','Ya he visitado Salvador.'),
vocab(4,2,'ainda não','todavía no','Ainda não conheci o Rio.','Todavía no he conocido Río.'),
vocab(4,3,'nunca','nunca','Nunca viajei de avião.','Nunca he viajado en avión.'),
vocab(4,4,'recentemente','recientemente','Recentemente, comecei um curso.','Recientemente empecé un curso.'),
vocab(4,5,'experiência','experiencia','Foi uma experiência interessante.','Fue una experiencia interesante.'),
vocab(4,6,'conhecer','conocer','Quero conhecer outras cidades.','Quiero conocer otras ciudades.'),
vocab(4,7,'acontecer','suceder / pasar','O que aconteceu ontem?','¿Qué pasó ayer?'),
vocab(4,8,'perder','perder','Perdi o ônibus esta manhã.','Perdí el autobús esta mañana.'),
vocab(4,9,'ganhar','ganar / recibir','Ganhei um presente.','Recibí un regalo.'),
vocab(4,10,'conseguir','conseguir / lograr','Consegui terminar o trabalho.','Logré terminar el trabajo.')
];
const u5=[
vocab(5,1,'mais ... do que','más ... que','Este hotel é mais barato do que aquele.','Este hotel es más barato que aquel.'),
vocab(5,2,'menos ... do que','menos ... que','O ônibus é menos rápido do que o trem.','El autobús es menos rápido que el tren.'),
vocab(5,3,'tão ... quanto','tan ... como','A sala é tão grande quanto a outra.','La sala es tan grande como la otra.'),
vocab(5,4,'melhor','mejor','Este caminho é melhor.','Este camino es mejor.'),
vocab(5,5,'pior','peor','O trânsito está pior hoje.','El tráfico está peor hoy.'),
vocab(5,6,'maior','mayor / más grande','Minha cidade é maior.','Mi ciudad es más grande.'),
vocab(5,7,'menor','menor / más pequeño','Quero uma mesa menor.','Quiero una mesa más pequeña.'),
vocab(5,8,'barato','barato','O mercado é barato.','El mercado es barato.'),
vocab(5,9,'caro','caro','Este restaurante é caro.','Este restaurante es caro.'),
vocab(5,10,'confortável','cómodo / confortable','O quarto é confortável.','La habitación es cómoda.')
];
const u6=[
vocab(6,1,'problema','problema','Tenho um problema com a reserva.','Tengo un problema con la reserva.'),
vocab(6,2,'ajuda','ayuda','Preciso de ajuda, por favor.','Necesito ayuda, por favor.'),
vocab(6,3,'favor','favor','Você pode me fazer um favor?','¿Puedes hacerme un favor?'),
vocab(6,4,'explicar','explicar','Pode explicar o problema?','¿Puede explicar el problema?'),
vocab(6,5,'funcionar','funcionar','O telefone não está funcionando.','El teléfono no está funcionando.'),
vocab(6,6,'quebrado','roto / averiado','Meu computador está quebrado.','Mi computadora está averiada.'),
vocab(6,7,'consertar','reparar / arreglar','Preciso consertar a bicicleta.','Necesito reparar la bicicleta.'),
vocab(6,8,'tentar','intentar','Vou tentar novamente.','Voy a intentarlo de nuevo.'),
vocab(6,9,'possível','posible','É possível trocar o horário?','¿Es posible cambiar la hora?'),
vocab(6,10,'resolver','resolver / solucionar','Vamos resolver isso juntos.','Vamos a resolverlo juntos.')
];
const unit4=makeUnit(4,'Experiencias y acontecimientos','Cuenta experiencias personales, acontecimientos recientes y cosas que todavía no has hecho.',
'Já, ainda não y nunca expresan experiencias hasta el presente. Recentemente sitúa un hecho cercano. El pretérito perfeito cuenta el acontecimiento; el imperfeito puede describir el contexto.',
'Já y ainda não','Já suele indicar que algo ocurrió; ainda não indica que no ha ocurrido hasta ahora. Nunca expresa ausencia de experiencia.',
u4,[
['Lección 1: Experiencias que ya tuviste','Expresa experiencias realizadas.','Já + pretérito perfeito: eu já visitei; ya hice esa actividad.',[0,4],[]],
['Lección 2: Lo que todavía no hiciste','Habla de experiencias pendientes.','Ainda não + pretérito perfeito negativo: ainda não conheci.',[1,5],[]],
['Lección 3: Experiencias nunca vividas','Expresa que nunca has realizado una actividad.','Nunca puede preceder al verbo en pretérito perfeito.',[2,5],[]],
['Lección 4: Acontecimientos recientes','Pregunta y cuenta qué ocurrió.','Recentemente sitúa un hecho cercano; aconteceu es pretérito perfeito.',[3,6],['ptbr_a2_u1_v01','ptbr_a2_u1_v06']],
['Lección 5: Ganar, perder y conseguir','Cuenta resultados de experiencias.','Perdi, ganhei y consegui son formas de pretérito perfeito.',[7,8,9],['ptbr_a2_u1_v07']]
]);
const unit5=makeUnit(5,'Comparar personas, lugares y cosas','Compara precios, tamaños, calidad y comodidad en situaciones cotidianas.',
'Mais ... do que expresa superioridad; menos ... do que, inferioridad; tão ... quanto, igualdad. Melhor y pior son comparativos irregulares de bom y ruim.',
'Comparativos','No uses tão ... do que para igualdad: la estructura es tão ... quanto. Melhor y pior no se forman con mais.',
u5,[
['Lección 1: Más y menos','Compara dos opciones.','Mais/menos + adjetivo + do que establece una comparación.',[0,1],['ptbr_a2_u3_v01']],
['Lección 2: Igual de','Expresa que dos cosas tienen una cualidad similar.','Tão + adjetivo + quanto indica igualdad.',[2,9],[]],
['Lección 3: Mejor y peor','Valora dos alternativas.','Melhor y pior son comparativos irregulares.',[3,4],[]],
['Lección 4: Tamaño y precio','Compara dimensiones y precios.','Maior y menor comparan tamaño; barato y caro describen precio.',[5,6,7],[]],
['Lección 5: Elegir una opción cómoda','Compara comodidad y coste antes de elegir.','El adjetivo concuerda con el sustantivo: quarto confortável, mesa confortável.',[8,9],['ptbr_a2_u3_v05']]
]);
const unit6=makeUnit(6,'Pedir ayuda y resolver problemas','Explica un inconveniente, solicita ayuda y propone una solución.',
'Poder + infinitivo sirve para pedir algo con cortesía: pode explicar? Precisar + infinitivo expresa necesidad; tentar y conseguir describen intentos y resultados.',
'Poder y precisar','Después de poder, precisar y tentar se usa el infinitivo: pode explicar, preciso consertar, vou tentar.',
u6,[
['Lección 1: Explicar un problema','Presenta un inconveniente de forma clara.','Tenho um problema introduce la situación; explicar describe lo que necesitas comunicar.',[0,3],[]],
['Lección 2: Pedir ayuda y un favor','Solicita apoyo de manera educada.','Preciso de ajuda y você pode me fazer um favor? son fórmulas habituales.',[1,2],['ptbr_a2_u3_v04']],
['Lección 3: Algo no funciona','Describe un objeto averiado.','Não está funcionando describe un fallo actual; quebrado significa roto.',[4,5],[]],
['Lección 4: Reparar e intentar de nuevo','Habla de acciones para solucionar el fallo.','Consertar y tentar van seguidos de un objeto o de una acción.',[6,7],[]],
['Lección 5: Buscar una solución','Pregunta si un cambio es posible y propone resolverlo.','É possível + infinitivo formula una petición; resolver indica encontrar una solución.',[8,9],['ptbr_a2_u3_v06']]
]);
root.GUARDI_CURRICULUM_BLOCKS=root.GUARDI_CURRICULUM_BLOCKS||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR']=root.GUARDI_CURRICULUM_BLOCKS['pt-BR']||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].A2=root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].A2||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].A2['04-06']={units:[unit4,unit5,unit6]};
})(typeof window!=='undefined'?window:globalThis);
