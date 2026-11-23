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
const u7=[
vocab(7,1,'patrimônio','patrimonio','O patrimônio histórico da cidade recebe visitantes durante todo o ano.','El patrimonio histórico de la ciudad recibe visitantes durante todo el año.'),
vocab(7,2,'acervo','colección / fondo documental','O museu ampliou seu acervo com fotografias antigas.','El museo amplió su colección con fotografías antiguas.'),
vocab(7,3,'legado','legado','A obra deixou um legado importante para a literatura brasileira.','La obra dejó un legado importante para la literatura brasileña.'),
vocab(7,4,'preservação','preservación','A preservação dos edifícios exige recursos e planejamento.','La preservación de los edificios exige recursos y planificación.'),
vocab(7,5,'memória coletiva','memoria colectiva','As festas populares fazem parte da memória coletiva do bairro.','Las fiestas populares forman parte de la memoria colectiva del barrio.'),
vocab(7,6,'manifestação cultural','manifestación cultural','A dança é uma manifestação cultural transmitida entre gerações.','La danza es una manifestación cultural transmitida entre generaciones.'),
vocab(7,7,'expressão artística','expresión artística','A fotografia tornou-se uma expressão artística reconhecida.','La fotografía se convirtió en una expresión artística reconocida.'),
vocab(7,8,'intercâmbio cultural','intercambio cultural','O intercâmbio cultural aproximou artistas de diferentes regiões.','El intercambio cultural acercó a artistas de distintas regiones.'),
vocab(7,9,'pluralidade','pluralidad','A pluralidade de tradições enriquece a vida cultural.','La pluralidad de tradiciones enriquece la vida cultural.'),
vocab(7,10,'representatividade','representatividad','A representatividade amplia a participação de diferentes grupos.','La representatividad amplía la participación de distintos grupos.')
];
const u8=[
vocab(8,1,'pesquisa aplicada','investigación aplicada','A pesquisa aplicada procura soluções para problemas concretos.','La investigación aplicada busca soluciones para problemas concretos.'),
vocab(8,2,'ensaio clínico','ensayo clínico','O ensaio clínico avalia a segurança de um novo tratamento.','El ensayo clínico evalúa la seguridad de un nuevo tratamiento.'),
vocab(8,3,'protocolo experimental','protocolo experimental','A equipe seguiu o protocolo experimental definido no projeto.','El equipo siguió el protocolo experimental definido en el proyecto.'),
vocab(8,4,'grupo de controle','grupo de control','O grupo de controle permite comparar os resultados do estudo.','El grupo de control permite comparar los resultados del estudio.'),
vocab(8,5,'resultado preliminar','resultado preliminar','O resultado preliminar ainda precisa de confirmação independente.','El resultado preliminar todavía necesita confirmación independiente.'),
vocab(8,6,'reprodutibilidade','reproducibilidad','A reprodutibilidade fortalece a confiança nos resultados científicos.','La reproducibilidad fortalece la confianza en los resultados científicos.'),
vocab(8,7,'revisão por pares','revisión por pares','A revisão por pares avalia a qualidade de um artigo científico.','La revisión por pares evalúa la calidad de un artículo científico.'),
vocab(8,8,'patente','patente','A empresa registrou uma patente para proteger a invenção.','La empresa registró una patente para proteger el invento.'),
vocab(8,9,'inovação tecnológica','innovación tecnológica','A inovação tecnológica pode transformar processos industriais.','La innovación tecnológica puede transformar procesos industriales.'),
vocab(8,10,'transferência de tecnologia','transferencia de tecnología','A transferência de tecnologia conecta a pesquisa ao setor produtivo.','La transferencia de tecnología conecta la investigación con el sector productivo.')
];
const u9=[
vocab(9,1,'inflação','inflación','A inflação reduziu o valor real de parte dos salários.','La inflación redujo el valor real de parte de los salarios.'),
vocab(9,2,'poder aquisitivo','poder adquisitivo','O aumento dos preços diminuiu o poder aquisitivo das famílias.','El aumento de los precios redujo el poder adquisitivo de las familias.'),
vocab(9,3,'distribuição de renda','distribución de ingresos','A distribuição de renda influencia as oportunidades de cada região.','La distribución de ingresos influye en las oportunidades de cada región.'),
vocab(9,4,'tributação','tributación','A tributação financia serviços e políticas públicas.','La tributación financia servicios y políticas públicas.'),
vocab(9,5,'subsídio','subsidio','O subsídio ajuda a reduzir o custo de um serviço essencial.','El subsidio ayuda a reducir el costo de un servicio esencial.'),
vocab(9,6,'endividamento','endeudamiento','O endividamento das famílias exige atenção ao orçamento.','El endeudamiento de las familias exige prestar atención al presupuesto.'),
vocab(9,7,'inadimplência','morosidad / incumplimiento de pago','A inadimplência aumentou depois da perda de empregos.','La morosidad aumentó después de la pérdida de empleos.'),
vocab(9,8,'custo de vida','costo de vida','O custo de vida varia bastante entre as capitais.','El costo de vida varía bastante entre las capitales.'),
vocab(9,9,'proteção social','protección social','A proteção social oferece apoio em períodos de vulnerabilidade.','La protección social ofrece apoyo en períodos de vulnerabilidad.'),
vocab(9,10,'vulnerabilidade econômica','vulnerabilidad económica','A vulnerabilidade econômica pode limitar o acesso a oportunidades.','La vulnerabilidad económica puede limitar el acceso a oportunidades.')
];
const unit7=makeUnit(7,'Cultura, patrimonio e identidad','Analiza cómo se conserva el patrimonio y cómo circulan las expresiones culturales entre comunidades.','O debate cultural distingue patrimônio, acervo e legado. Termos como preservação, memória coletiva e manifestação cultural ajudam a explicar como práticas e obras atravessam gerações.','Patrimonio y diversidad cultural','Patrimônio inclui bens materiais e imateriais; acervo é uma coleção organizada. Memória coletiva e legado tratam da transmissão de referências entre gerações.',u7,[
['Lección 1: Patrimonio y colecciones','Describe bienes culturales y colecciones que documentan una comunidad.','Patrimônio nomeia bens de valor histórico ou cultural; acervo é o conjunto organizado de obras, documentos ou objetos reunidos por uma instituição.',[0,1],['ptbr_a2_u22_v01']],
['Lección 2: Legado y preservación','Explica por qué se conservan obras y edificios para el futuro.','Legado é aquilo que uma geração transmite às seguintes; preservação reúne ações para proteger bens culturais. O legado pode depender da preservação contínua.',[2,3],['ptbr_a2_u22_v03']],
['Lección 3: Memoria y manifestaciones','Relaciona celebraciones y prácticas con la memoria de una comunidad.','Memória coletiva reúne lembranças compartilhadas; manifestação cultural é uma prática ou celebração que expressa valores de um grupo.',[4,5],['ptbr_a2_u23_v02']],
['Lección 4: Expresiones e intercambios','Compara expresiones artísticas y encuentros entre culturas.','Expressão artística é uma forma de criação; intercâmbio cultural promove contato e colaboração entre pessoas de contextos diferentes.',[6,7],['ptbr_a2_u23_v04']],
['Lección 5: Pluralidad y representación','Debate cómo distintas comunidades aparecen en la vida cultural.','Pluralidade reconhece a coexistência de tradições e perspectivas; representatividade considera a presença e a participação de diferentes grupos.',[8,9],['ptbr_a2_u24_v05']]
]);
const unit8=makeUnit(8,'Investigación científica e innovación','Describe procesos de investigación, evaluación de evidencias y aplicación de descubrimientos.','Na ciência, pesquisa aplicada busca resolver problemas concretos. Um protocolo experimental organiza procedimentos; resultados precisam de reprodutibilidade e revisão por pares antes de serem aceitos amplamente.','Método y evidencia científica','Resultado preliminar não é conclusão definitiva. Grupo de controle permite comparação; revisão por pares examina métodos e argumentos, mas não garante ausência de erros.',u8,[
['Lección 1: Investigación aplicada','Explica cómo una investigación busca resolver un problema práctico.','Pesquisa aplicada direciona conhecimentos para necessidades concretas; ensaio clínico avalia intervenções com participantes sob condições definidas.',[0,1],['ptbr_a2_u24_v03']],
['Lección 2: Protocolos y comparación','Describe procedimientos y grupos de comparación en un estudio.','Protocolo experimental define etapas e condições do estudo; grupo de controle oferece uma referência para comparar os resultados observados.',[2,3],['ptbr_a2_u24_v04']],
['Lección 3: Resultados y reproducibilidad','Distingue resultados iniciales de hallazgos que pueden repetirse.','Resultado preliminar é uma observação inicial; reprodutibilidade indica se outros pesquisadores conseguem obter resultados compatíveis usando métodos equivalentes.',[4,5],['ptbr_a2_u24_v06']],
['Lección 4: Revisión y patentes','Explica cómo se evalúa un artículo y se protege una invención.','Revisão por pares é a avaliação de um trabalho por especialistas; patente concede proteção legal a uma invenção conforme as regras aplicáveis.',[6,7],['ptbr_a2_u24_v08']],
['Lección 5: Innovación y transferencia','Relaciona nuevos desarrollos con su aplicación en la sociedad.','Inovação tecnológica introduz produtos ou processos novos; transferência de tecnologia leva conhecimentos e técnicas da pesquisa a organizações que podem aplicá-los.',[8,9],['ptbr_a2_u24_v09']]
]);
const unit9=makeUnit(9,'Economía cotidiana y desigualdad','Explica cambios en los precios, decisiones financieras y políticas que afectan el bienestar económico.','A inflação afeta o poder aquisitivo e o custo de vida. Distribuição de renda, tributação e proteção social ajudam a analisar desigualdades e respostas públicas.', 'Precios, ingresos y protección','Inflação descreve o aumento generalizado dos preços; poder aquisitivo indica quanto se pode comprar. Endividamento não é sinônimo de inadimplência: o segundo envolve pagamentos em atraso.',u9,[
['Lección 1: Precios y poder adquisitivo','Explica cómo los precios afectan el presupuesto de una familia.','Inflação é o aumento generalizado dos preços; poder aquisitivo indica a quantidade de bens e serviços que a renda consegue comprar.',[0,1],['ptbr_a2_u30_v01']],
['Lección 2: Ingresos y tributación','Analiza diferencias de ingresos y el papel de los impuestos.','Distribuição de renda descreve como os rendimentos se repartem; tributação é a cobrança de impostos para financiar responsabilidades públicas.',[2,3],['ptbr_a2_u30_v03']],
['Lección 3: Subsidios y deudas','Describe ayudas económicas y riesgos de acumular deudas.','Subsídio é um apoio financeiro destinado a reduzir custos; endividamento é o acúmulo de obrigações financeiras que precisam ser pagas.',[4,5],['ptbr_a2_u30_v05']],
['Lección 4: Incumplimiento y costo de vida','Explica cómo los pagos atrasados y los gastos cotidianos afectan a las personas.','Inadimplência ocorre quando uma obrigação não é paga no prazo; custo de vida reúne despesas necessárias para manter determinado padrão de vida.',[6,7],['ptbr_a2_u28_v06']],
['Lección 5: Protección y vulnerabilidad','Debate medidas de apoyo para personas en situación económica difícil.','Proteção social reúne políticas e serviços de apoio; vulnerabilidade econômica descreve uma situação de maior exposição a perdas e dificuldades financeiras.',[8,9],['ptbr_a2_u30_v09']]
]);
root.GUARDI_CURRICULUM_BLOCKS=root.GUARDI_CURRICULUM_BLOCKS||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR']=root.GUARDI_CURRICULUM_BLOCKS['pt-BR']||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].B1=root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].B1||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].B1['07-09']={units:[unit7,unit8,unit9]};
})(typeof window!=='undefined'?window:globalThis);
