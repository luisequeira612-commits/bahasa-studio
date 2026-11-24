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
const u10=[
vocab(10,1,'globalização','globalización','A globalização aproximou mercados, mas também ampliou algumas desigualdades.','La globalización acercó mercados, pero también amplió algunas desigualdades.'),
vocab(10,2,'comércio exterior','comercio exterior','O comércio exterior depende de acordos e regras entre países.','El comercio exterior depende de acuerdos y reglas entre países.'),
vocab(10,3,'cadeia de abastecimento','cadena de suministro','A cadeia de abastecimento foi afetada pelo fechamento dos portos.','La cadena de suministro se vio afectada por el cierre de los puertos.'),
vocab(10,4,'tarifa alfandegária','arancel aduanero','A tarifa alfandegária pode alterar o preço de um produto importado.','El arancel aduanero puede cambiar el precio de un producto importado.'),
vocab(10,5,'acordo comercial','acuerdo comercial','O acordo comercial reduziu barreiras entre os dois países.','El acuerdo comercial redujo las barreras entre los dos países.'),
vocab(10,6,'migração internacional','migración internacional','A migração internacional transforma comunidades de origem e destino.','La migración internacional transforma comunidades de origen y destino.'),
vocab(10,7,'diáspora','diáspora','A diáspora mantém vínculos culturais com o país de origem.','La diáspora mantiene vínculos culturales con el país de origen.'),
vocab(10,8,'cooperação internacional','cooperación internacional','A cooperação internacional facilita respostas a problemas compartilhados.','La cooperación internacional facilita respuestas a problemas compartidos.'),
vocab(10,9,'organismo multilateral','organismo multilateral','Um organismo multilateral reúne vários países para negociar soluções.','Un organismo multilateral reúne a varios países para negociar soluciones.'),
vocab(10,10,'soberania nacional','soberanía nacional','A soberania nacional orienta decisões sobre o próprio território.','La soberanía nacional orienta decisiones sobre el propio territorio.')
];
const u11=[
vocab(11,1,'responsabilidade cívica','responsabilidad cívica','A responsabilidade cívica inclui conhecer direitos e cumprir deveres na vida coletiva.','La responsabilidad cívica incluye conocer los derechos y cumplir los deberes en la vida colectiva.'),
vocab(11,2,'participação popular','participación ciudadana','A participação popular contribuiu para rever o projeto.','La participación ciudadana contribuyó a revisar el proyecto.'),
vocab(11,3,'consulta pública','consulta pública','A consulta pública recebeu sugestões de moradores e especialistas.','La consulta pública recibió sugerencias de vecinos y especialistas.'),
vocab(11,4,'política pública','política pública','Uma política pública precisa considerar as necessidades da população.','Una política pública debe tener en cuenta las necesidades de la población.'),
vocab(11,5,'orçamento público','presupuesto público','O orçamento público define como os recursos serão distribuídos.','El presupuesto público define cómo se distribuirán los recursos.'),
vocab(11,6,'transparência','transparencia','A transparência permite acompanhar decisões e gastos.','La transparencia permite seguir las decisiones y los gastos.'),
vocab(11,7,'controle social','control ciudadano','O controle social acompanha a execução de programas públicos.','El control ciudadano supervisa la ejecución de programas públicos.'),
vocab(11,8,'órgão público','organismo público','O órgão público divulgou os critérios para solicitar o benefício.','El organismo público publicó los criterios para solicitar el beneficio.'),
vocab(11,9,'prestação de serviços','prestación de servicios','A prestação de serviços deve atender a diferentes comunidades.','La prestación de servicios debe atender a distintas comunidades.'),
vocab(11,10,'interesse coletivo','interés colectivo','O interesse coletivo deve orientar decisões sobre espaços comuns.','El interés colectivo debe orientar las decisiones sobre espacios comunes.')
];
const u12=[
vocab(12,1,'crise climática','crisis climática','A crise climática exige medidas coordenadas em diferentes escalas.','La crisis climática exige medidas coordinadas a distintas escalas.'),
vocab(12,2,'emissão de gases','emisión de gases','A emissão de gases de efeito estufa está ligada a várias atividades humanas.','La emisión de gases de efecto invernadero está vinculada a varias actividades humanas.'),
vocab(12,3,'efeito estufa','efecto invernadero','O efeito estufa natural mantém a temperatura do planeta adequada à vida.','El efecto invernadero natural mantiene la temperatura del planeta adecuada para la vida.'),
vocab(12,4,'matriz energética','matriz energética','A matriz energética do país ainda depende de combustíveis fósseis.','La matriz energética del país todavía depende de combustibles fósiles.'),
vocab(12,5,'energia renovável','energía renovable','A energia renovável pode reduzir a dependência de fontes poluentes.','La energía renovable puede reducir la dependencia de fuentes contaminantes.'),
vocab(12,6,'transição energética','transición energética','A transição energética requer investimento e planejamento de longo prazo.','La transición energética requiere inversión y planificación a largo plazo.'),
vocab(12,7,'evento extremo','fenómeno extremo','Um evento extremo pode provocar perdas humanas e materiais.','Un fenómeno extremo puede provocar pérdidas humanas y materiales.'),
vocab(12,8,'mitigação','mitigación','A mitigação busca reduzir as causas do aquecimento global.','La mitigación busca reducir las causas del calentamiento global.'),
vocab(12,9,'adaptação climática','adaptación climática','A adaptação climática prepara cidades para impactos já inevitáveis.','La adaptación climática prepara a las ciudades para impactos ya inevitables.'),
vocab(12,10,'resiliência','resiliencia','A resiliência comunitária ajuda a recuperar serviços após uma emergência.','La resiliencia comunitaria ayuda a recuperar servicios después de una emergencia.')
];
const unit10=makeUnit(10,'Globalización y relaciones internacionales','Analiza cómo circulan bienes, personas y decisiones entre países, así como los efectos de la interdependencia global.','A globalização intensifica relações entre países. O comércio exterior, a cadeia de abastecimento e os acordos comerciais podem ser descritos com a voz passiva; conectores concessivos ajudam a apresentar limites e contrastes.','Interdependencia y soberanía','Comércio exterior trata de trocas entre países; cadeia de abastecimento descreve etapas de produção e distribuição. Um acordo comercial não elimina automaticamente todas as tarifas alfandegárias nem as decisões ligadas à soberania nacional.',u10,[
['Lección 1: Mercados conectados','Explica cómo la globalización modifica las relaciones económicas.','A globalização conecta mercados e sociedades; o comércio exterior reúne operações de compra e venda entre países. Usa embora para apresentar um contraste entre benefícios e limites.',[0,1],['ptbr_a2_u24_v03']],
['Lección 2: Producción y barreras','Describe etapas de distribución y medidas que afectan las importaciones.','A cadeia de abastecimento inclui produção, transporte e distribuição; a tarifa alfandegária é cobrada sobre determinados produtos que entram ou saem de um território.',[2,3],['ptbr_a2_u24_v04']],
['Lección 3: Acuerdos y negociación','Explica cómo los países establecen reglas para intercambiar bienes.','O acordo comercial define condições de troca entre países; um organismo multilateral pode apoiar a negociação. Na voz passiva, o foco recai sobre a medida: as regras foram negociadas pelos governos.',[4,8],['ptbr_a2_u23_v04']],
['Lección 4: Migración y diáspora','Relaciona movimientos de población con vínculos culturales transnacionales.','A migração internacional envolve deslocamentos entre países; a diáspora mantém vínculos sociais e culturais com a região de origem.',[5,6],['ptbr_a2_u22_v01']],
['Lección 5: Cooperación y soberanía','Debate la cooperación entre países y la autonomía de sus decisiones.','A cooperação internacional pode ocorrer por meio de um organismo multilateral; a soberania nacional continua relevante, embora os países negociem compromissos comuns.',[7,9],['ptbr_a2_u23_v02']]
]);
const unit11=makeUnit(11,'Ciudadanía y políticas públicas','Describe mecanismos de participación, transparencia y evaluación de servicios que afectan a la vida colectiva.','O exercício da cidadania envolve direitos e responsabilidades. Construções impessoais com se aparecem em textos institucionais; expressões como é necessário que e embora podem exigir o subjuntivo.','Participación y responsabilidad pública','Consulta pública é um mecanismo de escuta; não substitui todas as etapas de decisão. Transparência e controle social permitem acompanhar políticas, mas não significam que toda decisão seja tomada por votação direta.',u11,[
['Lección 1: Derechos y participación','Explica cómo las personas participan en decisiones colectivas.','A cidadania reúne direitos e responsabilidades; a participação popular permite que grupos apresentem demandas e acompanhem decisões. Em textos gerais, usa-se se para indicar ações sem agente específico.',[0,1],['ptbr_a2_u22_v03']],
['Lección 2: Consultas y propuestas','Describe procesos para escuchar a la población antes de una decisión.','A consulta pública recebe contribuições antes de uma decisão; uma política pública pode ser ajustada a partir dessas propostas. É importante que os participantes apresentem sugestões claras; depois da consulta, elas podem ser avaliadas.',[2,3],['ptbr_a2_u23_v02']],
['Lección 3: Recursos y prioridades','Explica cómo se planifican y distribuyen recursos públicos.','O orçamento público organiza receitas e despesas; uma política pública define objetivos e ações. Embora os recursos sejam limitados, prioridades podem ser revistas.',[4,9],['ptbr_a2_u24_v05']],
['Lección 4: Transparencia y supervisión','Relaciona acceso a la información con el seguimiento ciudadano.','A transparência facilita o acesso a informações; o controle social acompanha resultados e gastos. Usa-se é fundamental que os dados sejam divulgados com clareza.',[5,6],['ptbr_a2_u24_v06']],
['Lección 5: Servicios e instituciones','Describe instituciones y la calidad de los servicios para la comunidad.','Um órgão público executa funções definidas; a prestação de serviços deve considerar o interesse coletivo. Em descrições formais, o pronome se pode indicar procedimentos gerais.',[7,8],['ptbr_a2_u30_v09']]
]);
const unit12=makeUnit(12,'Crisis climática y transición energética','Explica causas e impactos climáticos y compara medidas de mitigación, adaptación y recuperación comunitaria.','A crise climática está relacionada às emissões e ao uso de energia. Conectores causais e consecutivos explicam relações entre fatores e impactos; o futuro do subjuntivo aparece em condições e planos de resposta.','Mitigación y adaptación','O efeito estufa é um fenômeno natural intensificado pelo excesso de gases; mitigação reduz causas, enquanto adaptação prepara comunidades para impactos. Resiliência descreve a capacidade de enfrentar e recuperar-se de perturbações.',u12,[
['Lección 1: Causas y emisiones','Explica algunos factores que intensifican el calentamiento global.','A crise climática exige respostas coordenadas; a emissão de gases de efeito estufa aumenta por atividades humanas. Usa porque e por isso para ligar causas e consequências.',[0,1],['ptbr_a2_u24_v03']],
['Lección 2: Procesos atmosféricos','Distingue el efecto natural de su intensificación por actividades humanas.','O efeito estufa natural retém parte do calor; quando a concentração de gases aumenta, o equilíbrio climático pode ser alterado. A expressão de modo que introduz uma consequência.',[2,1],['ptbr_a2_u24_v04']],
['Lección 3: Energía y transformación','Compara fuentes de energía y cambios necesarios en su uso.','A matriz energética reúne fontes usadas em um país; energia renovável vem de fontes que se recompõem naturalmente. A transição energética depende de investimentos e políticas de longo prazo.',[3,4],['ptbr_a2_u30_v01']],
['Lección 4: Riesgos y reducción de impactos','Describe fenómenos extremos y acciones para reducir sus daños.','Um evento extremo pode causar danos; a mitigação reduz fatores que agravam o problema. Se houver planejamento, os riscos podem ser menores: o futuro do subjuntivo apresenta essa condição.',[6,7],['ptbr_a2_u28_v06']],
['Lección 5: Adaptación y recuperación','Explica cómo comunidades se preparan y recuperan después de impactos climáticos.','A adaptação climática prepara serviços e comunidades para impactos; a resiliência ajuda a recuperar atividades após uma crise. Embora os riscos não desapareçam, a preparação pode reduzir perdas.',[8,9],['ptbr_a2_u30_v09']]
]);
root.GUARDI_CURRICULUM_BLOCKS=root.GUARDI_CURRICULUM_BLOCKS||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR']=root.GUARDI_CURRICULUM_BLOCKS['pt-BR']||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].B1=root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].B1||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].B1['10-12']={units:[unit10,unit11,unit12]};
})(typeof window!=='undefined'?window:globalThis);
