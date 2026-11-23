(function(root){
'use strict';
const vocab=(unit,index,target,esp,ex,exEsp)=>({id:'ptbr_b1_u'+unit+'_v'+String(index).padStart(2,'0'),target,esp,ex,exEsp,verification:{status:'not_checked',sources:[]}});
const exercise=(words,index)=>{const word=words[index],choices=[word.esp,words[(index+3)%10].esp,words[(index+6)%10].esp],answer=index%3;return {vocabId:word.id,type:'mc',prompt:'¿Qué significa «'+word.target+'»?',options:choices.slice(3-answer).concat(choices.slice(0,3-answer)),answer,explanation:'Relaciona la expresión con su significado en español.'};};
const makeUnit=(number,title,desc,grammar,trapTitle,trapDetail,words,specs)=>({
 unitNumber:number,id:'ptbr_b1_u'+number,title:'Unidad '+number+': '+title,desc,grammar,
 trap:{title:trapTitle,detail:trapDetail},vocab:words,
 lessons:specs.map(spec=>({title:spec[0],objective:spec[1],grammar:spec[2],vocabIds:spec[3].map(i=>words[i].id),reviewVocabIds:spec[4],exercises:[exercise(words,spec[3][0]),exercise(words,spec[3][1])]})),
 exercises:words.map((_,i)=>exercise(words,i))
});
const u4=[
vocab(4,1,'incumbência','responsabilidad / tarea asignada','A organização do evento ficou sob minha incumbência.','La organización del evento quedó bajo mi responsabilidad.'),
vocab(4,2,'atribuição','función / atribución','A análise de dados é uma das atribuições da equipe.','El análisis de datos es una de las funciones del equipo.'),
vocab(4,3,'autonomia','autonomía','A equipe ganhou autonomia para definir o cronograma.','El equipo ganó autonomía para definir el calendario.'),
vocab(4,4,'eficiência','eficiencia','A nova rotina aumentou a eficiência do setor.','La nueva rutina aumentó la eficiencia del departamento.'),
vocab(4,5,'produtividade','productividad','Pausas bem planejadas podem melhorar a produtividade.','Las pausas bien planificadas pueden mejorar la productividad.'),
vocab(4,6,'impasse','punto muerto / bloqueo','A negociação chegou a um impasse durante a reunião.','La negociación llegó a un punto muerto durante la reunión.'),
vocab(4,7,'conciliar','conciliar / compatibilizar','É preciso conciliar os horários de todos os participantes.','Es necesario conciliar los horarios de todos los participantes.'),
vocab(4,8,'priorizar','priorizar','A coordenação decidiu priorizar as tarefas urgentes.','La coordinación decidió priorizar las tareas urgentes.'),
vocab(4,9,'pendência','asunto pendiente','Ainda existe uma pendência antes da entrega final.','Todavía hay un asunto pendiente antes de la entrega final.'),
vocab(4,10,'prestação de contas','rendición de cuentas','A prestação de contas será apresentada ao conselho.','La rendición de cuentas se presentará al consejo.')
];
const u5=[
vocab(5,1,'título','titular / título','O título da reportagem resume o tema sem exageros.','El titular del reportaje resume el tema sin exageraciones.'),
vocab(5,2,'desinformação','desinformación','A desinformação pode se espalhar rapidamente nas redes.','La desinformación puede difundirse rápidamente en las redes.'),
vocab(5,3,'veracidade','veracidad','A equipe investigou a veracidade das declarações.','El equipo investigó la veracidad de las declaraciones.'),
vocab(5,4,'fonte primária','fuente primaria','O documento original funciona como fonte primária.','El documento original funciona como fuente primaria.'),
vocab(5,5,'checagem','verificación de datos','A checagem das informações exige comparar fontes.','La verificación de la información exige comparar fuentes.'),
vocab(5,6,'repercussão','repercusión','A entrevista teve grande repercussão pública.','La entrevista tuvo gran repercusión pública.'),
vocab(5,7,'viés','sesgo','O texto apresenta um viés que precisa ser identificado.','El texto presenta un sesgo que debe identificarse.'),
vocab(5,8,'distorção','distorsión','A edição provocou uma distorção do contexto original.','La edición provocó una distorsión del contexto original.'),
vocab(5,9,'rumor','rumor','O rumor foi compartilhado antes de qualquer confirmação.','El rumor se compartió antes de cualquier confirmación.'),
vocab(5,10,'credibilidade','credibilidad','A transparência fortalece a credibilidade do veículo.','La transparencia fortalece la credibilidad del medio.')
];
const u6=[
vocab(6,1,'mobilidade','movilidad','A mobilidade urbana depende de opções de transporte acessíveis.','La movilidad urbana depende de opciones de transporte accesibles.'),
vocab(6,2,'acessibilidade','accesibilidad','A acessibilidade deve ser considerada desde o projeto.','La accesibilidad debe tenerse en cuenta desde el diseño.'),
vocab(6,3,'infraestrutura','infraestructura','A infraestrutura do bairro precisa de manutenção.','La infraestructura del barrio necesita mantenimiento.'),
vocab(6,4,'saneamento','saneamiento','O saneamento adequado reduz riscos para a população.','El saneamiento adecuado reduce los riesgos para la población.'),
vocab(6,5,'adensamento','densificación urbana','O adensamento exige planejamento dos serviços públicos.','La densificación exige planificar los servicios públicos.'),
vocab(6,6,'zoneamento','zonificación','O zoneamento define os usos permitidos em cada área.','La zonificación define los usos permitidos en cada zona.'),
vocab(6,7,'arborização','arbolado urbano','A arborização melhora o conforto térmico das ruas.','El arbolado urbano mejora el confort térmico de las calles.'),
vocab(6,8,'deslocamento','desplazamiento','O deslocamento diário ficou mais rápido após a mudança.','El desplazamiento diario se volvió más rápido después del cambio.'),
vocab(6,9,'revitalização','revitalización','A revitalização da praça recuperou um espaço de convivência.','La revitalización de la plaza recuperó un espacio de convivencia.'),
vocab(6,10,'pertencimento','sentido de pertenencia','A participação dos moradores fortalece o pertencimento ao bairro.','La participación de los vecinos fortalece el sentido de pertenencia al barrio.')
];
const unit4=makeUnit(4,'Gestión y colaboración profesional','Organiza responsabilidades, negocia prioridades y evalúa el trabajo colectivo.','Em contextos profissionais, expressa responsabilidade e resultados com incumbência, atribuição, eficiência e produtividade. Usa construções com ficar sob, ser responsável por e conseguir + infinitivo para distribuir tarefas.', 'Responsabilidades y resultados','Incumbência indica uma responsabilidade atribuída; atribuição descreve uma função. Eficiência mede o uso adequado de recursos, enquanto produtividade se relaciona com o volume de resultados.',u4,[
['Lección 1: Funciones y responsabilidades','Describe quién responde por cada tarea.','Incumbência indica a tarefa sob responsabilidade de alguém; atribuição nomeia uma função definida. As expressões ficar sob e ser da responsabilidade de ajudam a distribuir funções.',[0,1],['ptbr_a2_u30_v03']],
['Lección 2: Autonomía y eficiencia','Explica cómo un equipo organiza su trabajo.','Autonomia descreve a capacidade de decidir; eficiência avalia como os recursos são usados. Usa ter autonomia para e trabalhar com eficiência em contextos profissionais.',[2,3],['ptbr_a2_u30_v05']],
['Lección 3: Productividad y bloqueos','Explica cómo se mantienen los resultados ante una dificultad.','Produtividade se refere aos resultados produzidos; impasse indica um bloqueio que exige uma nova estratégia. Melhorar a produtividade não significa ignorar a qualidade.',[4,5],['ptbr_a2_u28_v06']],
['Lección 4: Conciliar y priorizar','Propone alternativas y ordena tareas según su importancia.','Conciliar significa compatibilizar interesses ou horários; priorizar significa definir o que vem primeiro.',[6,7],['ptbr_a2_u20_v08']],
['Lección 5: Pendencias y rendición de cuentas','Comunica asuntos pendientes y presenta resultados con transparencia.','Pendência é um assunto ainda não resolvido; prestação de contas apresenta resultados e recursos de forma transparente.',[8,9],['ptbr_a2_u30_v09']]
]);
const unit5=makeUnit(5,'Lectura crítica de medios','Analiza contenidos informativos, comprueba afirmaciones y reconoce sesgos y distorsiones.','Para avaliar uma notícia, distingue título, fonte primária e checagem. Substantivos como veracidade, repercussão, viés e credibilidade ajudam a discutir a qualidade da informação.', 'Información y evaluación crítica','Não confundas repercussão com veracidade: uma informação pode ter grande repercussão sem estar confirmada. Um rumor não equivale a uma fonte primária.',u5,[
['Lección 1: Títulos y contenidos','Compara un titular con la información desarrollada.','Título resume ou destaca o assunto; desinformação apresenta conteúdo enganoso ou falso que circula como informação.',[0,1],['ptbr_a2_u10_v01']],
['Lección 2: Verificar afirmaciones','Comprueba una afirmación antes de compartirla.','Veracidade indica se uma afirmação corresponde aos fatos; fonte primária é um registro ou testemunho direto. Checagem compara evidências antes de confirmar.',[2,3],['ptbr_a2_u10_v03']],
['Lección 3: Verificación y repercusión','Explica cómo se comprueba una información y se mide su impacto.','Checagem é o processo de verificar dados; repercussão descreve o impacto público de uma publicação.',[4,5],['ptbr_a2_u10_v02']],
['Lección 4: Sesgos y distorsiones','Reconoce puntos de vista parciales y cambios en el contexto.','Viés indica uma inclinação que pode influenciar a apresentação dos fatos; distorção altera o sentido de um conteúdo.',[6,7],['ptbr_a2_u10_v06']],
['Lección 5: Rumores y credibilidad','Evalúa información no confirmada y la confianza que merece una fuente.','Rumor circula sem confirmação suficiente; credibilidade depende de transparência, consistência e evidências.',[8,9],['ptbr_a2_u10_v08']]
]);
const unit6=makeUnit(6,'Movilidad y vida urbana','Describe desafíos de la ciudad y evalúa propuestas para mejorar los espacios comunes.','Debates urbanos usam termos como mobilidade, acessibilidade e infraestrutura. Construções com depender de, exigir planejamento e contribuir para ajudam a explicar relações entre políticas e qualidade de vida.', 'Planificación de la ciudad','Mobilidade trata das condições de deslocamento; acessibilidade considera se pessoas diferentes conseguem usar os espaços e serviços. Infraestrutura inclui redes e equipamentos urbanos.',u6,[
['Lección 1: Movilidad y desplazamientos','Describe cómo las personas se desplazan por la ciudad.','Mobilidade trata das condições gerais de circulação; acessibilidade considera quem consegue usar os espaços e serviços.',[0,1],['ptbr_a2_u9_v04']],
['Lección 2: Infraestructura y saneamiento','Explica qué redes y servicios necesita una ciudad.','Infraestrutura reúne estruturas e serviços essenciais; saneamento inclui serviços como água e esgoto.',[2,3],['ptbr_a2_u28_v02']],
['Lección 3: Crecimiento y densificación','Explica cómo aumenta la concentración de personas y edificios.','Adensamento descreve o aumento da concentração de pessoas ou construções; zoneamento estabelece regras para o uso do solo.',[4,5],['ptbr_a2_u27_v09']],
['Lección 4: Arbolado y desplazamientos','Explica cómo los árboles y las rutas influyen en la vida urbana.','Arborização amplia a presença de árvores nas áreas urbanas; deslocamento é o trajeto realizado entre dois lugares.',[6,7],['ptbr_a2_u23_v08']],
['Lección 5: Espacios verdes y comunidad','Valora proyectos que mejoran los espacios compartidos.','Arborização amplia a presença de árvores nas áreas urbanas; revitalização recupera espaços; pertencimento expressa a ligação das pessoas com a comunidade.',[8,9],['ptbr_a2_u22_v06']]
]);
root.GUARDI_CURRICULUM_BLOCKS=root.GUARDI_CURRICULUM_BLOCKS||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR']=root.GUARDI_CURRICULUM_BLOCKS['pt-BR']||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].B1=root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].B1||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].B1['04-06']={units:[unit4,unit5,unit6]};
})(typeof window!=='undefined'?window:globalThis);
