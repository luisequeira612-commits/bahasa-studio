(function(root){
'use strict';
const vocab=(unit,index,target,esp,ex,exEsp)=>({id:'ptbr_b2_u'+unit+'_v'+String(index).padStart(2,'0'),target,esp,ex,exEsp,verification:{status:'not_checked',sources:[]}});
const exercise=(words,index)=>{
 const word=words[index],choices=[word.esp,words[(index+3)%10].esp,words[(index+6)%10].esp],answer=index%3;
 return {vocabId:word.id,type:'mc',prompt:'En «'+word.ex+'», ¿qué expresa «'+word.target+'»?',options:choices.slice(3-answer).concat(choices.slice(0,3-answer)),answer,explanation:'Interpreta la expresión dentro del contexto completo, no como una traducción aislada.'};
};
const makeUnit=(number,title,desc,grammar,trapTitle,trapDetail,words,specs)=>({
 unitNumber:number,id:'ptbr_b2_u'+number,title:'Unidad '+number+': '+title,desc,grammar,
 trap:{title:trapTitle,detail:trapDetail},vocab:words,
 lessons:specs.map(spec=>({title:spec[0],objective:spec[1],grammar:spec[2],vocabIds:spec[3].map(i=>words[i].id),reviewVocabIds:spec[4],exercises:[exercise(words,spec[3][0]),exercise(words,spec[3][1])]})),
 exercises:words.map((_,i)=>exercise(words,i))
});
const u4=[
vocab(4,1,'aprimoramento','mejora / perfeccionamiento','O aprimoramento dos processos reduziu o retrabalho.','La mejora de los procesos redujo el retrabajo.'),
vocab(4,2,'descontinuação','interrupción / discontinuación','A descontinuação do serviço foi anunciada com antecedência.','La discontinuación del servicio se anunció con antelación.'),
vocab(4,3,'readequação','reajuste / readecuación','A readequação do orçamento exige novas prioridades.','La readecuación del presupuesto exige nuevas prioridades.'),
vocab(4,4,'consolidação','consolidación','A consolidação dos dados permitiu comparar os resultados.','La consolidación de los datos permitió comparar los resultados.'),
vocab(4,5,'dimensionamento','dimensionamiento / cálculo de la magnitud','O dimensionamento da equipe deve considerar a demanda.','El dimensionamiento del equipo debe considerar la demanda.'),
vocab(4,6,'viabilização','viabilización','A viabilização do projeto depende de recursos adicionais.','La viabilización del proyecto depende de recursos adicionales.'),
vocab(4,7,'redirecionamento','reorientación / redirección','O redirecionamento dos recursos foi aprovado pelo conselho.','La reorientación de los recursos fue aprobada por el consejo.'),
vocab(4,8,'monitoramento','seguimiento / monitoreo','O monitoramento contínuo identificou uma falha recorrente.','El seguimiento continuo identificó un fallo recurrente.'),
vocab(4,9,'substituição','sustitución / reemplazo','A substituição do equipamento será feita no próximo mês.','La sustitución del equipo se hará el próximo mes.'),
vocab(4,10,'reformulação','reformulación','A reformulação das diretrizes será discutida em audiência.','La reformulación de las directrices se debatirá en una audiencia.')
];
const u5=[
vocab(5,1,'foi instituído','fue instituido / se estableció','Foi instituído um novo procedimento de avaliação.','Se estableció un nuevo procedimiento de evaluación.'),
vocab(5,2,'será submetido','será sometido / se someterá','O relatório será submetido à análise da comissão.','El informe será sometido al análisis de la comisión.'),
vocab(5,3,'é considerado','es considerado','O documento é considerado parte integrante do processo.','El documento es considerado parte integrante del proceso.'),
vocab(5,4,'ficou estabelecido','quedó establecido','Ficou estabelecido que os dados seriam divulgados em etapas.','Quedó establecido que los datos se divulgarían por etapas.'),
vocab(5,5,'foi constatado','se constató / fue constatado','Foi constatado um aumento no número de solicitações.','Se constató un aumento en el número de solicitudes.'),
vocab(5,6,'será implementado','será implementado','O novo sistema será implementado após a fase de testes.','El nuevo sistema será implementado después de la fase de pruebas.'),
vocab(5,7,'é regulamentado','está regulado / es reglamentado','O acesso ao arquivo é regulamentado por norma específica.','El acceso al archivo está regulado por una norma específica.'),
vocab(5,8,'foi suspenso','fue suspendido / se suspendió','O processo foi suspenso até a conclusão da auditoria.','El proceso fue suspendido hasta que concluya la auditoría.'),
vocab(5,9,'permanece assegurado','permanece garantizado','O direito de resposta permanece assegurado aos participantes.','El derecho de respuesta permanece garantizado a los participantes.'),
vocab(5,10,'foi encaminhado','fue remitido / se envió','O pedido foi encaminhado ao setor responsável.','La solicitud fue remitida al departamento responsable.')
];
const u6=[
vocab(6,1,'cujo conteúdo','cuyo contenido','O conselho publicou o parecer cujo conteúdo orientou a decisão.','El consejo publicó el dictamen cuyo contenido orientó la decisión.'),
vocab(6,2,'cuja execução','cuya ejecución','Foi aprovada uma medida cuja execução será acompanhada por técnicos.','Se aprobó una medida cuya ejecución será supervisada por técnicos.'),
vocab(6,3,'em cujo relatório','en cuyo informe','A equipe citou o estudo em cujo relatório constam os dados completos.','El equipo citó el estudio en cuyo informe constan los datos completos.'),
vocab(6,4,'por intermédio do qual','por intermedio del cual','Foi criado um canal por intermédio do qual os usuários podem enviar sugestões.','Se creó un canal por intermedio del cual los usuarios pueden enviar sugerencias.'),
vocab(6,5,'com base no qual','con base en el cual','O critério com base no qual a proposta foi avaliada será divulgado.','El criterio con base en el cual se evaluó la propuesta será divulgado.'),
vocab(6,6,'à qual','a la que / a la cual','A instituição à qual encaminhamos o pedido respondeu hoje.','La institución a la que enviamos la solicitud respondió hoy.'),
vocab(6,7,'no âmbito da qual','en cuyo ámbito','Foi criada uma comissão no âmbito da qual serão discutidas as propostas.','Se creó una comisión en cuyo ámbito se debatirán las propuestas.'),
vocab(6,8,'em face da qual','frente a la cual','A decisão em face da qual apresentamos recurso será reavaliada.','La decisión frente a la cual presentamos un recurso será reevaluada.'),
vocab(6,9,'para a qual','para la cual','A medida para a qual solicitamos recursos será analisada.','La medida para la cual solicitamos recursos será analizada.'),
vocab(6,10,'de cuja análise','de cuyo análisis','O documento, de cuja análise depende a decisão, será divulgado.','El documento, de cuyo análisis depende la decisión, será divulgado.')
];
const unit4=makeUnit(4,'Nominalización y densidad informativa','Condensa procesos y acciones en sustantivos para organizar textos formales, sin ocultar relaciones lógicas ni sobrecargar las frases.','La nominalización transforma procesos en nombres: aprimorar → aprimoramento; reformular → reformulação. Permite empaquetar información y convertirla en tema de la oración. En B2 hay que controlar quién realiza la acción, qué complementos exige el nombre y cuándo una forma nominal vuelve el texto demasiado abstracto.','Más sustantivos no siempre significan más claridad','Una nominalización puede condensar información, pero varias seguidas pueden ocultar quién actúa y qué ocurre. Alterna estructuras nominales y verbales, y conserva los complementos necesarios.',u4,[
['Lección 1: Nombrar procesos','Transforma acciones en conceptos que pueden funcionar como tema de una oración.','Aprimoramento nombra el proceso de aprimorar; descontinuação convierte descontinuar en un acontecimiento o decisión. La nominalización permite presentar el proceso como información conocida.',[0,1],['ptbr_a2_u24_v01','ptbr_a2_u24_v02']],
['Lección 2: Expresar ajustes y reorganizaciones','Describe cambios institucionales con sustantivos precisos.','Readequação expresa el ajuste de algo a nuevas condiciones; consolidação presenta la integración o estabilización de elementos. Los complementos aclaran qué se reajusta o consolida.',[2,3],['ptbr_a2_u24_v03','ptbr_a2_u24_v04']],
['Lección 3: Precisar escala y viabilidad','Explica cómo se calcula el alcance de una acción y qué permite realizarla.','Dimensionamento indica el cálculo de la escala o los recursos necesarios; viabilização expresa las condiciones que hacen posible una iniciativa.',[4,5],['ptbr_a2_u24_v05']],
['Lección 4: Describir asignación y seguimiento','Resume decisiones sobre recursos y procesos de control.','Redirecionamento nombra el cambio de destino de recursos; monitoramento designa la observación sistemática de un proceso.',[6,7],['ptbr_a2_u24_v06']],
['Lección 5: Sintetizar cambios y decisiones','Redacta una síntesis formal de sustituciones y revisiones.','Substituição nombra el reemplazo de un elemento; reformulação indica una nueva formulación de criterios o propuestas. La nominalización no elimina la necesidad de indicar el objeto del cambio.',[8,9],['ptbr_a2_u24_v07']]
]);
const unit5=makeUnit(5,'Voz pasiva y enfoque informativo','Elige el elemento que ocupa el foco de una oración y distingue entre pasiva analítica, construcciones con se y estados resultantes.','La pasiva analítica combina ser + participio y hace concordar el participio con el sujeto paciente: o relatório será submetido. La construcción con se puede presentar un proceso sin agente explícito. Estar/ficar + participio suele destacar un estado o resultado; no todas estas formas son intercambiables.','No confundas acción, resultado y agente','Foi suspenso presenta una acción en pasiva; permanece assegurado describe una situación que continúa vigente. Si el agente importa, puede expresarse con por; si no aporta información, puede omitirse.',u5,[
['Lección 1: Presentar una decisión institucional','Desplaza el foco hacia la medida o el procedimiento establecido.','Foi instituído usa ser en pretérito más participio concordado; el foco recae en o procedimento, no en la autoridad que lo creó. Será submetido proyecta una acción futura sobre el informe.',[0,1],['ptbr_a2_u18_v01','ptbr_a2_u18_v02']],
['Lección 2: Describir categorías y acuerdos','Distingue una clasificación vigente de una decisión que quedó fijada.','É considerado presenta una clasificación o valoración; ficou estabelecido comunica el resultado de una decisión. La forma verbal y el contexto ayudan a separar estado y acontecimiento.',[2,3],['ptbr_a2_u18_v03']],
['Lección 3: Informar hallazgos','Redacta resultados sin inventar ni ocultar la fuente de evidencia.','Foi constatado presenta un hallazgo en pasiva y puede omitir al observador si no es relevante. É regulamentado describe una norma que establece cómo se organiza el acceso. La construcción no demuestra por sí sola quién realizó la constatación.',[4,6],['ptbr_a2_u18_v04']],
['Lección 4: Explicar implementación y suspensión','Describe etapas administrativas y sus condiciones.','Será implementado sitúa una acción futura; foi suspenso presenta una acción concluida cuyo efecto puede seguir vigente. No confundas el tiempo verbal con la duración del resultado.',[5,7],['ptbr_a2_u18_v05']],
['Lección 5: Garantizar derechos y tramitar solicitudes','Comunica garantías y circulación formal de documentos.','Permanece assegurado describe continuidad de una garantía; foi encaminhado informa que una solicitud fue remitida. Si el agente es relevante, puede añadirse explícitamente.',[8,9],['ptbr_a2_u18_v06']]
]);
const unit6=makeUnit(6,'Oraciones relativas complejas','Precisa referentes, integra información secundaria y evita ambigüedades mediante pronombres relativos y expresiones preposicionales.','Los relativos conectan una oración con un antecedente. Cujo expresa posesión y concuerda con el elemento poseído; las formas o qual/la qual aparecen con preposición cuando la relación lo exige. Onde se reserva para lugares; para relaciones abstractas conviene em que, na qual u otra forma adecuada. O que puede retomar una oración completa como consecuencia o comentario.', 'El relativo debe concordar con su función, no con la palabra más cercana','Cujo concuerda en género y número con el sustantivo poseído, no con el antecedente. La preposición depende del verbo o nombre de la subordinada. No uses onde como comodín para cualquier antecedente abstracto.',u6,[
['Lección 1: Expresar posesión con cuyo','Relaciona un antecedente con un elemento que le pertenece.','Cujo conteúdo concuerda con conteúdo; cuja execução concuerda con execução. Cujo y cuja no concuerdan con el antecedente, sino con el nombre que aparece después.',[0,1],['ptbr_a2_u24_v08','ptbr_a2_u24_v09']],
['Lección 2: Integrar información dentro de un referente','Construye relativas con preposición y mantiene claro el antecedente.','Em cujo relatório combina la preposición exigida por el contexto con cuyo; por intermédio do qual retoma un canal o instrumento y mantiene la preposición requerida por intermédio de.',[2,3],['ptbr_a2_u24_v10']],
['Lección 3: Justificar criterios y decisiones','Explica qué criterio sustenta una evaluación y qué institución recibe una acción.','Com base no qual conserva la preposición exigida por com base em; à qual usa la forma femenina de o qual tras la preposición a.',[4,5],['ptbr_a2_u24_v05','ptbr_a2_u24_v06']],
['Lección 4: Delimitar etapas y consecuencias','Añade información precisa sobre una fase y comenta el resultado de una oración.','No âmbito da qual delimita el espacio institucional en el que ocurre una acción; em face da qual introduce la referencia a una decisión ante la que se actúa.',[6,7],['ptbr_a2_u23_v08','ptbr_a2_u23_v09']],
['Lección 5: Identificar destinatarios y premisas','Construye relativas con preposición sin perder el vínculo entre antecedente y subordinada.','Para a qual retoma un antecedente femenino con la preposición para; de cuja análise combina de con cujo y concuerda con análise. La preposición forma parte de la relación.',[8,9],['ptbr_a2_u24_v07','ptbr_a2_u24_v10']]
]);
root.GUARDI_CURRICULUM_BLOCKS=root.GUARDI_CURRICULUM_BLOCKS||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR']=root.GUARDI_CURRICULUM_BLOCKS['pt-BR']||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].B2=root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].B2||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].B2['04-06']={units:[unit4,unit5,unit6]};
})(typeof window!=='undefined'?window:globalThis);
