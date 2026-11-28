(function(root){
'use strict';
const vocab=(unit,index,target,esp,ex,exEsp)=>({id:'ptbr_b2_u'+unit+'_v'+String(index).padStart(2,'0'),target,esp,ex,exEsp,verification:{status:'not_checked',sources:[]}});
const exercise=(words,index)=>{
 const word=words[index],choices=[word.esp,words[(index+3)%10].esp,words[(index+6)%10].esp],answer=index%3;
 return {vocabId:word.id,type:'mc',prompt:'En «'+word.ex+'», ¿qué expresa «'+word.target+'»?',options:choices.slice(3-answer).concat(choices.slice(0,3-answer)),answer,explanation:'Interpreta la expresión dentro del contexto completo, no como una traducción aislada.'};
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
const u10=[
vocab(10,1,'sob essa perspectiva','desde esta perspectiva','Sob essa perspectiva, a medida deve ser avaliada em conjunto com seus efeitos.','Desde esta perspectiva, la medida debe evaluarse junto con sus efectos.'),
vocab(10,2,'em termos de','en términos de','Em termos de custo, a alternativa apresenta vantagens claras.','En términos de costo, la alternativa presenta ventajas claras.'),
vocab(10,3,'tal constatação','tal constatación','Tal constatação reforça a necessidade de rever os critérios.','Tal constatación refuerza la necesidad de revisar los criterios.'),
vocab(10,4,'daí decorre','de ahí se desprende','Daí decorre a obrigação de divulgar os dados completos.','De ahí se desprende la obligación de divulgar los datos completos.'),
vocab(10,5,'cabe destacar','cabe destacar','Cabe destacar que os resultados variam conforme a região.','Cabe destacar que los resultados varían según la región.'),
vocab(10,6,'quanto a esse ponto','en cuanto a este punto','Quanto a esse ponto, os pareceres apresentam posições distintas.','En cuanto a este punto, los dictámenes presentan posiciones distintas.'),
vocab(10,7,'em linhas gerais','en líneas generales','Em linhas gerais, o estudo confirma a tendência observada.','En líneas generales, el estudio confirma la tendencia observada.'),
vocab(10,8,'no decorrer da análise','a lo largo del análisis','No decorrer da análise, surgiram questões que exigem esclarecimento.','A lo largo del análisis, surgieron cuestiones que requieren aclaración.'),
vocab(10,9,'a esse respeito','al respecto','A esse respeito, a comissão publicou uma nota complementar.','Al respecto, la comisión publicó una nota complementaria.'),
vocab(10,10,'essa distinção','esta distinción','Essa distinção orienta a leitura dos resultados apresentados.','Esta distinción orienta la lectura de los resultados presentados.')
];
const u11=[
vocab(11,1,'mais precisamente','más precisamente','O problema está na etapa final, mais precisamente na revisão dos dados.','El problema está en la etapa final, más precisamente en la revisión de los datos.'),
vocab(11,2,'em sentido estrito','en sentido estricto','Em sentido estrito, o termo se aplica apenas aos casos previstos na norma.','En sentido estricto, el término se aplica solo a los casos previstos en la norma.'),
vocab(11,3,'em termos mais precisos','en términos más precisos','Em termos mais precisos, a proposta altera o prazo, não o objetivo.','En términos más precisos, la propuesta modifica el plazo, no el objetivo.'),
vocab(11,4,'convém esclarecer que','conviene aclarar que','Convém esclarecer que a estimativa não inclui os custos indiretos.','Conviene aclarar que la estimación no incluye los costos indirectos.'),
vocab(11,5,'cabe fazer uma ressalva','cabe hacer una salvedad','Cabe fazer uma ressalva: os dados abrangem somente o primeiro semestre.','Cabe hacer una salvedad: los datos abarcan solamente el primer semestre.'),
vocab(11,6,'reformular a hipótese','reformular la hipótesis','Foi necessário reformular a hipótese após a segunda etapa do estudo.','Fue necesario reformular la hipótesis después de la segunda etapa del estudio.'),
vocab(11,7,'delimitar o alcance','delimitar el alcance','O documento procura delimitar o alcance da autorização concedida.','El documento procura delimitar el alcance de la autorización concedida.'),
vocab(11,8,'retificar a informação','rectificar la información','A instituição publicou uma nota para retificar a informação divulgada.','La institución publicó una nota para rectificar la información divulgada.'),
vocab(11,9,'qualificar a afirmação','matizar la afirmación','É preciso qualificar a afirmação para evitar uma conclusão absoluta.','Es necesario matizar la afirmación para evitar una conclusión absoluta.'),
vocab(11,10,'na acepção jurídica','en la acepción jurídica','Na acepção jurídica, a expressão possui um significado mais restrito.','En la acepción jurídica, la expresión tiene un significado más restringido.')
];
const u12=[
vocab(12,1,'em maior medida','en mayor medida','A mudança afetou os municípios menores em maior medida.','El cambio afectó en mayor medida a los municipios más pequeños.'),
vocab(12,2,'em menor proporção','en menor proporción','Os custos indiretos cresceram em menor proporção que os custos operacionais.','Los costos indirectos crecieron en menor proporción que los costos operativos.'),
vocab(12,3,'na mesma medida em que','en la misma medida en que','A procura aumenta na mesma medida em que o serviço se torna mais acessível.','La demanda aumenta en la misma medida en que el servicio se vuelve más accesible.'),
vocab(12,4,'à diferença de','a diferencia de','À diferença dos dados anteriores, a nova amostra inclui áreas rurais.','A diferencia de los datos anteriores, la nueva muestra incluye zonas rurales.'),
vocab(12,5,'em grau semelhante','en grado semejante','As duas regiões foram afetadas em grau semelhante pela mudança.','Las dos regiones se vieron afectadas en grado semejante por el cambio.'),
vocab(12,6,'mais do que propriamente','más que propiamente','O relatório descreve uma mudança de procedimento, mais do que propriamente uma reforma.','El informe describe un cambio de procedimiento, más que propiamente una reforma.'),
vocab(12,7,'longe de ser','lejos de ser','A solução, longe de ser definitiva, exige acompanhamento contínuo.','La solución, lejos de ser definitiva, requiere seguimiento continuo.'),
vocab(12,8,'de forma desigual','de forma desigual','Os benefícios foram distribuídos de forma desigual entre os setores.','Los beneficios se distribuyeron de forma desigual entre los sectores.'),
vocab(12,9,'em comparação direta com','en comparación directa con','Em comparação direta com o ano anterior, houve redução das despesas.','En comparación directa con el año anterior, hubo una reducción de los gastos.'),
vocab(12,10,'não na mesma proporção','no en la misma proporción','A receita aumentou, mas não na mesma proporção que a procura.','Los ingresos aumentaron, pero no en la misma proporción que la demanda.')
];
const unit10=makeUnit(10,'Cohesión y progresión temática','Conecta párrafos, retoma información conocida y añade contenido nuevo sin perder el hilo argumental.','La cohesión no depende solo de conectores: también requiere gestionar el tema y el rema, recuperar referentes y organizar la información conocida antes de introducir datos nuevos. Expresiones como sob essa perspectiva, tal constatação y essa distinção retoman elementos anteriores; em termos de y quanto a esse ponto delimitan el aspecto tratado. Daí decorre presenta una consecuencia que debe poder rastrearse en el argumento.', 'Un conector no crea por sí solo una relación lógica','Comprueba qué idea se retoma y qué información nueva se añade. Tal constatação debe remitir a un hecho anterior; daí decorre exige una consecuencia identificable. Evita conectores que prometen una relación que el párrafo no desarrolla.',u10,[
['Lección 1: Enmarcar una perspectiva','Presenta el enfoque desde el que se organiza un argumento y delimita su dimensión.','Sob essa perspectiva introduce un marco interpretativo; em termos de especifica la dimensión sobre la que se formula una observación.',[0,1],['ptbr_a2_u23_v01','ptbr_a2_u23_v02']],
['Lección 2: Retomar una idea y derivar consecuencias','Recupera un dato anterior y formula la consecuencia que se desprende de él.','Tal constatação retoma una información ya presentada; daí decorre introduce una consecuencia lógica que debe estar sustentada por el contexto.',[2,3],['ptbr_a2_u23_v03','ptbr_a2_u23_v04']],
['Lección 3: Jerarquizar información','Destaca un elemento relevante y delimita el punto específico que se va a tratar.','Cabe destacar señala información importante; quanto a esse ponto restringe el foco a un aspecto concreto del tema.',[4,5],['ptbr_a2_u23_v05','ptbr_a2_u23_v06']],
['Lección 4: Resumir y desarrollar un argumento','Ofrece una síntesis inicial y muestra cómo se desarrolla una idea a lo largo del análisis.','Em linhas gerais anticipa una síntesis; no decorrer da análise organiza la progresión temporal o argumentativa del contenido.',[6,7],['ptbr_a2_u23_v07','ptbr_a2_u23_v08']],
['Lección 5: Mantener referentes y contrastes','Retoma un asunto y usa una distinción para orientar la lectura de la información nueva.','A esse respeito recupera el tema desde una referencia explícita; essa distinção organiza la comparación entre dos elementos previamente introducidos.',[8,9],['ptbr_a2_u23_v09','ptbr_a2_u23_v10']]
]);
const unit11=makeUnit(11,'Reformulación y precisión discursiva','Aclara, corrige y delimita formulaciones para evitar generalizaciones, ambigüedades o afirmaciones demasiado amplias.','La reformulación puede precisar un término, corregir una información o restringir el alcance de una afirmación. Mais precisamente y em termos mais precisos focalizan el ajuste; em sentido estrito y na acepção jurídica delimitan el significado; convém esclarecer que y cabe fazer uma ressalva introducen aclaraciones o límites. Retificar y reformular describen operaciones discursivas, no simples repeticiones.', 'Reformular no significa repetir con sinónimos','Una reformulación útil modifica el grado de precisión, corrige un dato o restringe una interpretación. Explica qué cambia y conserva la distinción entre corregir una información y añadir una reserva.',u11,[
['Lección 1: Precisar un referente','Reduce la ambigüedad y formula con exactitud el elemento al que se refiere.','Mais precisamente añade una delimitación concreta; em sentido estrito restringe la interpretación a su significado más riguroso.',[0,1],['ptbr_a2_u23_v01','ptbr_a2_u23_v02']],
['Lección 2: Delimitar una formulación','Expresa con mayor exactitud qué cambia y qué permanece igual en una propuesta.','Em termos mais precisos introduce una formulación más exacta; convém esclarecer que anuncia una explicación necesaria para evitar una lectura errónea.',[2,3],['ptbr_a2_u23_v03','ptbr_a2_u23_v04']],
['Lección 3: Introducir límites y reservas','Añade una salvedad que restringe el alcance de una afirmación.','Cabe fazer uma ressalva introduce una limitación relevante; reformular a hipótese presenta el ajuste de una premisa a partir de nueva información.',[4,5],['ptbr_a2_u23_v05','ptbr_a2_u23_v06']],
['Lección 4: Corregir y acotar','Delimita una autorización y corrige un dato divulgado anteriormente.','Delimitar o alcance precisa hasta dónde llega una autorización; retificar a informação corrige un contenido que se había comunicado de forma inexacta.',[6,7],['ptbr_a2_u23_v07','ptbr_a2_u23_v08']],
['Lección 5: Matizar términos y afirmaciones','Evita conclusiones absolutas mediante una definición y una afirmación más limitada.','Qualificar a afirmação añade condiciones o límites a una tesis; na acepção jurídica especifica el sentido técnico de una expresión.',[8,9],['ptbr_a2_u23_v09','ptbr_a2_u23_v10']]
]);
const unit12=makeUnit(12,'Comparación matizada','Expresa diferencias de grado, proporción y excepción sin reducir comparaciones complejas a una oposición binaria.','Las comparaciones avanzadas pueden referirse a intensidad, proporción, alcance o semejanza. Em maior medida y em menor proporção comparan grados; na mesma medida em que relaciona dos variaciones; à diferença de marca una divergencia. Mais do que propriamente corrige una clasificación demasiado fuerte; longe de ser niega que algo alcance un grado esperado. No confundas una diferencia de grado con una diferencia absoluta.', 'Una comparación proporcional necesita una referencia clara','Indica qué magnitudes se comparan y cuál es el punto de referencia. Na mesma medida em que expresa una relación paralela; não na mesma proporção señala que el cambio de una variable no acompaña exactamente al de la otra.',u12,[
['Lección 1: Comparar intensidad','Explica qué grupo o fenómeno resulta afectado con mayor o menor intensidad.','Em maior medida y em menor proporção expresan diferencias de grado o de cantidad; identifica siempre el elemento usado como referencia.',[0,1],['ptbr_a2_u23_v01','ptbr_a2_u23_v02']],
['Lección 2: Relacionar cambios proporcionales','Describe dos variaciones que avanzan de forma relacionada.','Na mesma medida em que conecta dos cambios paralelos. Em grau semelhante significa que dos grupos o fenómenos presentan una intensidad, magnitud o nivel parecido, pero no necesariamente idéntico. Se usa para comparar el grado en que ocurre algo: «As duas regiões foram afetadas em grau semelhante». No significa «en la misma proporción» ni demuestra que exista una relación causal.',[2,4],['ptbr_a2_u23_v03','ptbr_a2_u23_v04']],
['Lección 3: Marcar diferencias relevantes','Compara dos grupos o periodos y señala una divergencia concreta.','À diferença de introduce un contraste; em comparação direta com fija una base explícita para la comparación.',[3,8],['ptbr_a2_u23_v05','ptbr_a2_u23_v06']],
['Lección 4: Evitar clasificaciones exageradas','Matiza una descripción y niega que una solución alcance el grado esperado.','Mais do que propriamente corrige una clasificación demasiado fuerte; longe de ser niega que el elemento cumpla una expectativa o categoría.',[5,6],['ptbr_a2_u23_v07','ptbr_a2_u23_v08']],
['Lección 5: Comparar distribución y proporción','Describe una distribución desigual y distingue crecimiento absoluto de crecimiento proporcional.','De forma desigual señala una distribución no uniforme; não na mesma proporção indica que dos variaciones no mantienen una relación cuantitativa equivalente.',[7,9],['ptbr_a2_u23_v09','ptbr_a2_u23_v10']]
]);
root.GUARDI_CURRICULUM_BLOCKS=root.GUARDI_CURRICULUM_BLOCKS||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR']=root.GUARDI_CURRICULUM_BLOCKS['pt-BR']||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].B2=root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].B2||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].B2['10-12']={units:[unit10,unit11,unit12]};
})(typeof window!=='undefined'?window:globalThis);
