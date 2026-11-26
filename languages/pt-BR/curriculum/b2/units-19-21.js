(function(root){
'use strict';
const vocab=(unit,index,target,esp,ex,exEsp)=>({id:'ptbr_b2_u'+unit+'_v'+String(index).padStart(2,'0'),target,esp,ex,exEsp,verification:{status:'not_checked',sources:[]}});
const exercise=(words,index)=>{
 const word=words[index],choices=[word.esp,words[(index+3)%10].esp,words[(index+6)%10].esp],answer=index%3;
 return {vocabId:word.id,type:'mc',prompt:'En «'+word.ex+'», ¿qué expresa «'+word.target+'»?',options:choices.slice(3-answer).concat(choices.slice(0,3-answer)),answer,explanation:'Interpreta el sentido de la expresión dentro de la situación y del registro.'};
};
const orderExercise=(word,index)=>{
 const correctOrder=word.ex.replace(/[.,!?;:]/g,'').trim().split(/\s+/).filter(Boolean);
 const offset=(index%(correctOrder.length-1))+1;
 let words=correctOrder.slice(offset).concat(correctOrder.slice(0,offset));
 if(words.join(' ')===correctOrder.join(' '))words=correctOrder.slice().reverse();
 return {vocabId:word.id,type:'order',prompt:'Reconstruye el ejemplo que ilustra «'+word.target+'».',words,correctOrder,explanation:'Ordena las palabras para reconstruir el ejemplo en portugués brasileño.'};
};
const makeUnit=(number,title,desc,grammar,trapTitle,trapDetail,words,specs)=>({
 unitNumber:number,id:'ptbr_b2_u'+number,title:'Unidad '+number+': '+title,desc,grammar,
 trap:{title:trapTitle,detail:trapDetail},vocab:words,
 lessons:specs.map(spec=>({title:spec[0],objective:spec[1],grammar:spec[2],vocabIds:spec[3].map(i=>words[i].id),reviewVocabIds:spec[4],exercises:[exercise(words,spec[3][0]),exercise(words,spec[3][1])]})),
 exercises:words.map((word,i)=>orderExercise(word,i))
});
const u19=[
vocab(19,1,'viabilidade','viabilidad','O estudo avaliou a viabilidade financeira da proposta.','El estudio evaluó la viabilidad financiera de la propuesta.'),
vocab(19,2,'inviável','inviable','Sem recursos adicionais, o cronograma torna-se inviável.','Sin recursos adicionales, el cronograma se vuelve inviable.'),
vocab(19,3,'sustentabilidade','sostenibilidad','A sustentabilidade do projeto depende de financiamento contínuo.','La sostenibilidad del proyecto depende de financiación continua.'),
vocab(19,4,'exequível','factible / realizable','A proposta é exequível desde que haja recursos e um prazo adequado.','La propuesta es factible siempre que haya recursos y un plazo adecuado.'),
vocab(19,5,'mensurabilidade','mensurabilidad','A mensurabilidade dos resultados depende de indicadores definidos e critérios comparáveis.','La mensurabilidad de los resultados depende de indicadores definidos y criterios comparables.'),
vocab(19,6,'transparente','transparente','O processo seletivo precisa ser transparente para todos.','El proceso de selección debe ser transparente para todos.'),
vocab(19,7,'responsabilização','rendición de cuentas','A responsabilização dos gestores exige regras claras.','La rendición de cuentas de los gestores exige reglas claras.'),
vocab(19,8,'responsável','responsable','O órgão responsável divulgará os resultados amanhã.','El organismo responsable divulgará los resultados mañana.'),
vocab(19,9,'efetividade','efectividad','A efetividade da política será medida por indicadores públicos.','La efectividad de la política se medirá mediante indicadores públicos.'),
vocab(19,10,'efetivo','efectivo','O programa só será efetivo se alcançar o público previsto.','El programa solo será efectivo si llega al público previsto.')
];
const u20=[
vocab(20,1,'dar conta de','ser capaz de / dar abasto','A equipe não conseguiu dar conta de todas as solicitações.','El equipo no consiguió atender todas las solicitudes.'),
vocab(20,2,'levar em conta','tener en cuenta','A avaliação deve levar em conta as condições locais.','La evaluación debe tener en cuenta las condiciones locales.'),
vocab(20,3,'fazer vista grossa','hacer la vista gorda','A fiscalização não pode fazer vista grossa diante das irregularidades.','La inspección no puede hacer la vista gorda ante las irregularidades.'),
vocab(20,4,'pôr em prática','poner en práctica','O município pretende pôr em prática as medidas aprovadas.','El municipio pretende poner en práctica las medidas aprobadas.'),
vocab(20,5,'estar por dentro de','estar al tanto de','A porta-voz está por dentro das mudanças no regulamento.','La portavoz está al tanto de los cambios en el reglamento.'),
vocab(20,6,'sair pela tangente','salirse por la tangente','Durante a entrevista, o candidato tentou sair pela tangente.','Durante la entrevista, el candidato intentó salirse por la tangente.'),
vocab(20,7,'ficar a par de','ponerse al corriente de','Os participantes precisam ficar a par das novas orientações.','Los participantes necesitan ponerse al corriente de las nuevas directrices.'),
vocab(20,8,'ter em mente','tener presente','É preciso ter em mente os limites dos dados disponíveis.','Es necesario tener presentes los límites de los datos disponibles.'),
vocab(20,9,'perder de vista','perder de vista','O debate não deve perder de vista o objetivo principal.','El debate no debe perder de vista el objetivo principal.'),
vocab(20,10,'não dar margem a','no dejar lugar a','O comunicado foi redigido para não dar margem a interpretações ambíguas.','El comunicado se redactó para no dejar lugar a interpretaciones ambiguas.')
];
const u21=[
vocab(21,1,'ponderar','sopesar','Antes de decidir, é necessário ponderar os custos e os benefícios.','Antes de decidir, es necesario sopesar los costos y los beneficios.'),
vocab(21,2,'condicionante','condición determinante','A falta de recursos é uma condicionante que precisa ser considerada antes da aprovação.','La falta de recursos es una condición que debe considerarse antes de la aprobación.'),
vocab(21,3,'contraproposta','contrapropuesta','A equipe apresentou uma contraproposta para reduzir os custos.','El equipo presentó una contrapropuesta para reducir los costos.'),
vocab(21,4,'entendimento mútuo','entendimiento mutuo','O entendimento mútuo permitiu que as partes avançassem mesmo sem concordar em todos os pontos.','El entendimiento mutuo permitió que las partes avanzaran incluso sin estar de acuerdo en todos los puntos.'),
vocab(21,5,'entrave','obstáculo / impedimento','A falta de dados atualizados tornou-se um entrave para a negociação.','La falta de datos actualizados se convirtió en un obstáculo para la negociación.'),
vocab(21,6,'divergência','divergencia','A divergência sobre o orçamento ainda precisa ser resolvida.','La divergencia sobre el presupuesto todavía debe resolverse.'),
vocab(21,7,'convergência','convergencia','Houve convergência entre as equipes quanto às prioridades.','Hubo convergencia entre los equipos respecto a las prioridades.'),
vocab(21,8,'ceder','ceder','Nenhuma das partes quis ceder durante a primeira rodada.','Ninguna de las partes quiso ceder durante la primera ronda.'),
vocab(21,9,'reivindicar','reivindicar / exigir','Os moradores reivindicam melhorias no transporte público.','Los vecinos reivindican mejoras en el transporte público.'),
vocab(21,10,'mediar','mediar','Uma comissão independente foi convidada a mediar o conflito.','Se invitó a una comisión independiente a mediar el conflicto.')
];
const unit19=makeUnit(19,'Derivación y familias léxicas','Interpreta familias de palabras y selecciona derivados según precisión, contexto y registro.','La derivación nominal y adjetival permite expresar cualidades, procesos y resultados. Compara viabilidade con inviável y exequível; sustentabilidade con sustentável (retomado de A2); mensurabilidade y critérios de medição; responsabilização con responsável; y efetividade con efetivo. Transparência se retoma de B1 y transparente muestra su forma adjetival. El sufijo y la categoría gramatical cambian la función de la palabra; no todos los derivados son intercambiables.','Confundir familia léxica y equivalencia','Compartir una raíz no significa compartir categoría gramatical ni significado exacto. Elige el derivado que encaja en la estructura y en la intención. ',u19,[
['Sufijos y nombres abstractos','Reconocer procesos y cualidades nominalizadas.','En un informe, viabilidade nombra una cualidad; sustentabilidade y transparência también funcionan como nombres abstractos. Distingue viabilidade de inviável por categoría y sentido.',[0,2],['ptbr_a2_u22_v09','ptbr_a2_u22_v10']],
['Adjetivos y polaridad','Elegir adjetivos derivados y sus matices.','Inviável expresa imposibilidad práctica; exequível caracteriza una propuesta que puede llevarse a cabo bajo condiciones definidas. Contrasta cada adjetivo con el sentido y la familia léxica correspondiente.',[1,3],['ptbr_a2_u22_v09','ptbr_a2_u22_v10']],
['Familias de responsabilidad','Relacionar agentes, cualidades y procesos.','Responsabilização nombra el proceso de exigir cuentas; responsável identifica a quien responde o tiene una función. No sustituyas uno por otro.',[6,7],['ptbr_a2_u22_v09','ptbr_a2_u22_v10']],
['Efectividad y evaluación','Describir resultados y valorar políticas.','Efetividade nombra el grado de logro; efetivo caracteriza aquello que produce el efecto esperado. Usa cada forma según el sustantivo o verbo que acompaña.',[8,9],['ptbr_a2_u22_v09','ptbr_a2_u22_v10']],
['Precisión en textos formales','Revisar una familia léxica en un argumento completo.','Mensurabilidade indica que un resultado puede expresarse mediante indicadores comparables; transparente califica un procedimiento claro y verificable. Distingue la posibilidad de medir un resultado de la claridad del proceso.',[4,5],['ptbr_a2_u22_v09','ptbr_a2_u22_v10']]
]);
const unit20=makeUnit(20,'Expresiones idiomáticas y uso contextual','Comprende expresiones figuradas frecuentes y adapta su uso a situaciones formales e informales.','Las expresiones dar conta de, levar em conta, fazer vista grossa, pôr em prática y sair pela tangente tienen significados que no se obtienen traduciendo palabra por palabra. El contexto determina si el registro es neutral, coloquial o crítico. Compara estar por dentro de con ficar a par de y ter em mente con perder de vista.','Traducir literalmente una expresión fija','No deduzcas el sentido solo por cada palabra. Identifica la situación, el complemento y la intención comunicativa antes de elegir una equivalencia en español.',u20,[
['Comprender expresiones de capacidad','Interpretar dar conta de en contextos de carga y responsabilidad.','Dar conta de puede expresar capacidad para atender una tarea o demanda. Distingue ese uso de levar em conta, que significa considerar un factor.',[0,1],['ptbr_a2_u22_v09','ptbr_a2_u22_v10']],
['Expresiones de conducta','Reconocer crítica e implementación.','Fazer vista grossa implica ignorar deliberadamente algo; pôr em prática significa ejecutar una idea o medida. El contexto aporta la valoración.',[2,3],['ptbr_a2_u22_v09','ptbr_a2_u22_v10']],
['Información y actualización','Distinguir conocimiento previo y actualización.','Estar por dentro de indica conocer bien un asunto; ficar a par de destaca ponerse al corriente. Ter em mente significa mantener algo presente.',[4,6],['ptbr_a2_u22_v09','ptbr_a2_u22_v10']],
['Evasión y foco','Identificar respuestas evasivas y pérdida del objetivo.','Sair pela tangente describe una evasión; perder de vista señala que se deja de considerar algo importante. No son expresiones intercambiables.',[5,8],['ptbr_a2_u22_v09','ptbr_a2_u22_v10']],
['Evitar ambigüedad','Usar expresiones fijas con intención precisa.','Ter em mente significa mantener presente una idea o condición; não dar margem a significa evitar que algo permita determinada interpretación. Revisa el complemento de cada expresión y distingue la intención que aporta.',[7,9],['ptbr_a2_u22_v09','ptbr_a2_u22_v10']]
]);
const unit21=makeUnit(21,'Debate público y negociación avanzada','Media desacuerdos, formula contrapropuestas y construye acuerdos con reservas explícitas.','En una negociación, ponderar alternativas permite formular una contraproposta; las partes pueden señalar uma condicionante, superar um entrave y construir entendimento mútuo. Divergência y convergência describen relaciones entre posiciones; ceder, reivindicar y mediar expresan acciones distintas dentro del proceso.','Confundir entendimento mútuo con unanimidad','Um entendimento mútuo permite avanzar sin que todas las partes compartan cada argumento. Explicita las condicionantes y los puntos que siguen abiertos.',u21,[
['Evaluar posiciones','Sopesar opciones y formular reservas.','Ponderar implica evaluar factores; condicionante identifica una condición que limita o determina una decisión. Presenta una valoración y explica qué condición permanece abierta.',[0,1],['ptbr_a2_u22_v09','ptbr_a2_u22_v10']],
['Construir propuestas','Proponer alternativas y buscar acuerdo.','Contraproposta ofrece una alternativa a la propuesta inicial; entendimento mútuo describe una comprensión compartida que permite avanzar hacia un acuerdo. Distingue propuesta, proceso y resultado.',[2,3],['ptbr_a2_u22_v09','ptbr_a2_u22_v10']],
['Gestionar desacuerdos','Describir bloqueos y diferencias entre posiciones.','Entrave describe un obstáculo que retrasa o impide el avance; divergência identifica diferencias y convergência señala puntos compartidos. Precisa cuál de estas situaciones ocurre.',[4,5],['ptbr_a2_u22_v09','ptbr_a2_u22_v10']],
['Concesiones y demandas','Expresar concesiones y reivindicaciones.','Ceder implica aceptar una parte de la posición ajena; reivindicar es exigir o defender un derecho o interés. No confundas concesión con renuncia total.',[7,8],['ptbr_a2_u22_v09','ptbr_a2_u22_v10']],
['Mediación y cierre','Facilitar un diálogo y resumir acuerdos.','Mediar consiste en facilitar la comunicación entre partes. Resume los puntos de convergência, registra condicionantes y aclara qué medidas permitirán superar los entraves.',[6,9],['ptbr_a2_u22_v09','ptbr_a2_u22_v10']]
]);
root.GUARDI_CURRICULUM_BLOCKS=root.GUARDI_CURRICULUM_BLOCKS||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR']=root.GUARDI_CURRICULUM_BLOCKS['pt-BR']||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].B2=root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].B2||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].B2['19-21']={units:[unit19,unit20,unit21]};
})(typeof window!=='undefined'?window:globalThis);
