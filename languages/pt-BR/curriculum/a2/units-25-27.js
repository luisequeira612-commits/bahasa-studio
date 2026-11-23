(function(root){
'use strict';
const vocab=(unit,index,target,esp,ex,exEsp)=>({id:'ptbr_a2_u'+unit+'_v'+String(index).padStart(2,'0'),target,esp,ex,exEsp,verification:{status:'not_checked',sources:[]}});
const exercise=(words,index)=>{const word=words[index],answer=index%3,choices=[word.esp,words[(index+3)%10].esp,words[(index+6)%10].esp];return {vocabId:word.id,type:'mc',prompt:'¿Qué significa «'+word.target+'»?',options:choices.slice(3-answer).concat(choices.slice(0,3-answer)),answer,explanation:'Relaciona la expresión con su significado en español.'};};
const makeUnit=(number,title,desc,grammar,trap,words,lessons)=>({unitNumber:number,id:'ptbr_a2_u'+number,title:'Unidad '+number+': '+title,desc,grammar,trap,vocab:words,lessons:lessons.map(s=>({title:s[0],objective:s[1],grammar:s[2],vocabIds:s[3].map(i=>words[i].id),reviewVocabIds:s[4],exercises:[exercise(words,s[3][0]),exercise(words,s[3][1])]})),exercises:words.map((_,i)=>exercise(words,i))});
const u25=[
vocab(25,1,'tempero','condimento / sazón','O tempero da sopa leva alho, cebola e ervas frescas.','El sazón de la sopa lleva ajo, cebolla y hierbas frescas.'),
vocab(25,2,'condimento','condimento','Este condimento realça o sabor dos legumes.','Este condimento realza el sabor de las verduras.'),
vocab(25,3,'especiaria','especia','A canela é uma especiaria usada em pratos doces.','La canela es una especia que se usa en platos dulces.'),
vocab(25,4,'alho','ajo','Ela picou o alho antes de preparar o molho.','Ella picó el ajo antes de preparar la salsa.'),
vocab(25,5,'cebola','cebolla','A cebola precisa dourar um pouco na panela.','La cebolla necesita dorarse un poco en la sartén.'),
vocab(25,6,'pimenta','pimienta / chile','Coloque pouca pimenta para não deixar o prato muito picante.','Añade poco chile para que el plato no quede demasiado picante.'),
vocab(25,7,'erva','hierba aromática','A receita pede uma erva fresca para finalizar o prato.','La receta pide una hierba fresca para terminar el plato.'),
vocab(25,8,'picar','picar / cortar en trozos pequeños','É melhor picar os ingredientes antes de ligar o fogão.','Es mejor picar los ingredientes antes de encender la estufa.'),
vocab(25,9,'refogar','sofreír','Vamos refogar a cebola em fogo baixo.','Vamos a sofreír la cebolla a fuego bajo.'),
vocab(25,10,'ferver','hervir','Deixe a água ferver antes de acrescentar o macarrão.','Deja que el agua hierva antes de añadir la pasta.')
];
const u26=[
vocab(26,1,'alívio','alivio','Senti um grande alívio quando recebi a notícia.','Sentí un gran alivio cuando recibí la noticia.'),
vocab(26,2,'frustração','frustración','Ela demonstrou frustração por não conseguir terminar o projeto.','Ella mostró frustración por no poder terminar el proyecto.'),
vocab(26,3,'decepção','decepción','A mudança de planos causou decepção.','El cambio de planes causó decepción.'),
vocab(26,4,'orgulho','orgullo','Tenho orgulho do esforço que fizemos juntos.','Estoy orgulloso del esfuerzo que hicimos juntos.'),
vocab(26,5,'gratidão','gratitud','Ele expressou gratidão pela ajuda recebida.','Él expresó gratitud por la ayuda recibida.'),
vocab(26,6,'carinho','cariño / afecto','Ela fala dos avós com muito carinho.','Ella habla de sus abuelos con mucho cariño.'),
vocab(26,7,'saudade','nostalgia / añoranza','Sinto saudade dos amigos que moram longe.','Extraño a los amigos que viven lejos.'),
vocab(26,8,'solidão','soledad','A mudança para outra cidade trouxe momentos de solidão.','La mudanza a otra ciudad trajo momentos de soledad.'),
vocab(26,9,'admiração','admiración','Tenho admiração pela dedicação da equipe.','Siento admiración por la dedicación del equipo.'),
vocab(26,10,'acolhimento','acogida / apoyo afectuoso','O acolhimento dos colegas tornou o primeiro dia mais fácil.','La acogida de los compañeros hizo más fácil el primer día.')
];
const u27=[
vocab(27,1,'enchente','inundación','A enchente atingiu várias ruas depois da chuva forte.','La inundación afectó varias calles después de la lluvia intensa.'),
vocab(27,2,'alagamento','anegamiento / inundación localizada','O alagamento impediu a passagem dos carros.','El anegamiento impidió el paso de los automóviles.'),
vocab(27,3,'deslizamento','deslizamiento de tierra','O deslizamento bloqueou a estrada da região.','El deslizamiento de tierra bloqueó la carretera de la zona.'),
vocab(27,4,'tempestade','tormenta','A tempestade provocou ventos fortes durante a madrugada.','La tormenta provocó vientos fuertes durante la madrugada.'),
vocab(27,5,'seca','sequía','A seca prolongada afetou o abastecimento de água.','La sequía prolongada afectó el suministro de agua.'),
vocab(27,6,'abrigo','refugio','As famílias foram encaminhadas para um abrigo temporário.','Las familias fueron trasladadas a un refugio temporal.'),
vocab(27,7,'evacuação','evacuación','A evacuação começou depois do alerta das autoridades.','La evacuación comenzó después de la alerta de las autoridades.'),
vocab(27,8,'alerta','alerta / aviso','O alerta recomendou evitar as áreas próximas ao rio.','La alerta recomendó evitar las zonas cercanas al río.'),
vocab(27,9,'resgate','rescate','As equipes de resgate chegaram ao local pela manhã.','Los equipos de rescate llegaron al lugar por la mañana.'),
vocab(27,10,'desabamento','derrumbe / colapso','O desabamento danificou parte do prédio antigo.','El derrumbe dañó parte del edificio antiguo.')
];
const unit25=makeUnit(25,'Condimentos y técnicas de cocina','Describe ingredientes aromáticos y técnicas sencillas de preparación de alimentos.','Tempero puede referirse al sazón; condimento es un ingrediente que modifica el sabor. Refogar significa cocinar brevemente en grasa caliente; ferver describe la ebullición.',['Tempero y condimento','Tempero puede nombrar la combinación o el resultado del sazón; condimento suele ser cada ingrediente que aporta sabor.'],u25,[
['Lección 1: Sazón y condimentos','Identifica los ingredientes que aportan sabor a una preparación.','Tempero puede ser la mezcla que sazona; condimento nombra un ingrediente usado para dar sabor.',[0,1],['ptbr_a2_u23_v05','ptbr_a2_u23_v10']],
['Lección 2: Especias y hierbas','Distingue especias y hierbas aromáticas en recetas.','Especiaria suele ser una parte aromática seca de una planta; erva puede usarse fresca o seca.',[2,6],['ptbr_a2_u23_v08','ptbr_a2_u23_v09']],
['Lección 3: Aromáticos básicos','Habla de ingredientes habituales para iniciar una preparación.','Alho y cebola aparecen con frecuencia como base de salsas y platos.',[3,4],['ptbr_a2_u23_v03','ptbr_a2_u23_v04']],
['Lección 4: Preparar ingredientes','Describe cómo cortar los ingredientes antes de cocinarlos.','Picar indica cortar en trozos pequeños; pimenta puede aportar picor y debe dosificarse.',[7,5],['ptbr_a2_u23_v01','ptbr_a2_u23_v02']],
['Lección 5: Cocción en la sartén y en agua','Explica dos técnicas básicas de cocción.','Refogar cocina brevemente en una sartén; ferver lleva un líquido al punto de ebullición.',[8,9],['ptbr_a2_u23_v06','ptbr_a2_u23_v07']]
]);
const unit26=makeUnit(26,'Emociones y vínculos personales','Expresa emociones más matizadas y describe el afecto, la nostalgia y el apoyo entre personas.','Alívio expresa la desaparición de una preocupación; frustração y decepção describen reacciones distintas ante dificultades o expectativas no cumplidas.',['Frustração y decepção','Frustração se relaciona con un obstáculo que impide lograr algo; decepção aparece cuando el resultado no cumple una expectativa.'],u26,[
['Lección 1: Alivio y frustración','Describe cómo reaccionamos ante dificultades y su resolución.','Alívio aparece cuando disminuye una preocupación; frustração cuando un obstáculo impide avanzar.',[0,1],['ptbr_a2_u20_v02','ptbr_a2_u20_v03']],
['Lección 2: Expectativas y orgullo','Expresa decepción y satisfacción por los propios logros.','Decepção se relaciona con una expectativa incumplida; orgulho puede expresar satisfacción por un logro.',[2,3],['ptbr_a2_u20_v04']],
['Lección 3: Gratitud y cariño','Habla de agradecimiento y afecto hacia otras personas.','Gratidão expresa reconocimiento por algo recibido; carinho comunica afecto.',[4,5],['ptbr_a2_u20_v05']],
['Lección 4: Nostalgia y soledad','Describe la ausencia de personas y los sentimientos asociados.','Saudade expresa la añoranza de alguien o algo ausente; solidão describe la sensación de estar solo.',[6,7],['ptbr_a2_u20_v01']],
['Lección 5: Admiración y acogida','Expresa reconocimiento y apoyo en las relaciones personales.','Admiração reconoce cualidades de alguien; acolhimento es la recepción atenta y afectuosa de una persona.',[8,9],['ptbr_a2_u20_v09']]
]);
const unit27=makeUnit(27,'Fenómenos naturales y gestión de riesgos','Comprende términos para describir fenómenos naturales, sus consecuencias y las medidas de protección.','Enchente y alagamento describen acumulaciones de agua, pero no siempre tienen el mismo alcance. Evacuação, abrigo y resgate aparecen en contextos de emergencia.',['Enchente y alagamento','Enchente suele referirse al desbordamiento o aumento del nivel del agua; alagamento es la acumulación de agua en un área.'],u27,[
['Lección 1: Agua y zonas inundadas','Distingue inundaciones y anegamientos en una comunidad.','Enchente suele implicar la subida o el desbordamiento de un curso de agua; alagamento describe un área cubierta de agua.',[0,1],['ptbr_a2_u12_v02','ptbr_a2_u22_v02']],
['Lección 2: Movimientos de tierra y tormentas','Describe deslizamientos y tormentas intensas.','Deslizamento puede desplazar tierra o rocas por una ladera; tempestade incluye fenómenos atmosféricos intensos.',[2,3],['ptbr_a2_u23_v06']],
['Lección 3: Tormentas y sequías','Describe fenómenos atmosféricos intensos y períodos de escasez de lluvia.','Tempestade describe una perturbación atmosférica intensa; seca es un período prolongado con escasez de lluvia y agua disponible.',[3,4],['ptbr_a2_u23_v06','ptbr_a2_u23_v07']],
['Lección 4: Avisos y evacuaciones','Comprende alertas y procedimientos para dejar una zona de riesgo.','Alerta comunica un peligro posible o inminente; evacuação es la salida organizada de una zona.',[7,6],['ptbr_a2_u22_v09']],
['Lección 5: Refugios y rescates','Describe la protección temporal y la ayuda en emergencias.','Abrigo ofrece protección temporal; resgate es la acción de sacar a alguien de una situación peligrosa.',[5,8],['ptbr_a2_u20_v08']]
]);
root.GUARDI_CURRICULUM_BLOCKS=root.GUARDI_CURRICULUM_BLOCKS||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR']=root.GUARDI_CURRICULUM_BLOCKS['pt-BR']||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].A2=root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].A2||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].A2['25-27']={units:[unit25,unit26,unit27]};
})(typeof window!=='undefined'?window:globalThis);
