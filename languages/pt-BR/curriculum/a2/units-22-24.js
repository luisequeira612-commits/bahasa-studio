(function(root){
'use strict';
const vocab=(unit,index,target,esp,ex,exEsp)=>({id:'ptbr_a2_u'+unit+'_v'+String(index).padStart(2,'0'),target,esp,ex,exEsp,verification:{status:'not_checked',sources:[]}});
const exercise=(words,index)=>{const word=words[index],choices=[word.esp,words[(index+3)%10].esp,words[(index+6)%10].esp],answer=index%3;return {vocabId:word.id,type:'mc',prompt:'¿Qué significa «'+word.target+'»?',options:choices.slice(3-answer).concat(choices.slice(0,3-answer)),answer,explanation:'Relaciona la expresión con su significado en español.'};};
const makeUnit=(number,title,desc,grammar,trap,words,lessons)=>({unitNumber:number,id:'ptbr_a2_u'+number,title:'Unidad '+number+': '+title,desc,grammar,trap,vocab:words,lessons:lessons.map(s=>({title:s[0],objective:s[1],grammar:s[2],vocabIds:s[3].map(i=>words[i].id),reviewVocabIds:s[4],exercises:[exercise(words,s[3][0]),exercise(words,s[3][1])]})),exercises:words.map((_,i)=>exercise(words,i))});
const u22=[
vocab(22,1,'cidadania','ciudadanía','A cidadania também envolve participar das decisões locais.','La ciudadanía también implica participar en las decisiones locales.'),
vocab(22,2,'prefeitura','alcaldía / ayuntamiento','A prefeitura anunciou mudanças no transporte do bairro.','La alcaldía anunció cambios en el transporte del barrio.'),
vocab(22,3,'morador','residente / vecino','Cada morador pode apresentar sugestões.','Cada residente puede presentar sugerencias.'),
vocab(22,4,'conselho','consejo','O conselho municipal discutiu a proposta.','El consejo municipal discutió la propuesta.'),
vocab(22,5,'assembleia','asamblea','A assembleia começou com a leitura da pauta.','La asamblea comenzó con la lectura del orden del día.'),
vocab(22,6,'votação','votación','A votação será realizada no fim da reunião.','La votación se realizará al final de la reunión.'),
vocab(22,7,'proposta','propuesta','A proposta recebeu apoio de vários moradores.','La propuesta recibió el apoyo de varios vecinos.'),
vocab(22,8,'participação','participación','A participação da comunidade é importante.','La participación de la comunidad es importante.'),
vocab(22,9,'reivindicação','reivindicación / petición','Os moradores apresentaram uma reivindicação por mais iluminação.','Los vecinos presentaron una petición de más iluminación.'),
vocab(22,10,'representante','representante','O representante explicou as necessidades da comunidade.','El representante explicó las necesidades de la comunidad.')
];
const u23=[
vocab(23,1,'agricultura','agricultura','A agricultura familiar abastece muitas comunidades.','La agricultura familiar abastece a muchas comunidades.'),
vocab(23,2,'colheita','cosecha','A colheita começa no início do verão.','La cosecha comienza al inicio del verano.'),
vocab(23,3,'plantação','plantación / cultivo','A plantação precisa de água durante a estação seca.','El cultivo necesita agua durante la estación seca.'),
vocab(23,4,'cultivo','cultivo','O cultivo de frutas exige cuidados constantes.','El cultivo de frutas exige cuidados constantes.'),
vocab(23,5,'produtor','productor','O produtor vende os alimentos na feira local.','El productor vende los alimentos en el mercado local.'),
vocab(23,6,'safra','cosecha / temporada agrícola','A safra deste ano foi menor por causa da seca.','La cosecha de este año fue menor debido a la sequía.'),
vocab(23,7,'irrigação','riego','A irrigação ajuda a economizar água.','El riego ayuda a ahorrar agua.'),
vocab(23,8,'fertilizante','fertilizante / abono','O agricultor escolheu um fertilizante adequado ao solo.','El agricultor eligió un fertilizante adecuado para el suelo.'),
vocab(23,9,'orgânico','orgánico','O mercado oferece produtos orgânicos da região.','El mercado ofrece productos orgánicos de la región.'),
vocab(23,10,'feira livre','mercado al aire libre','Compramos verduras frescas na feira livre.','Compramos verduras frescas en el mercado al aire libre.')
];
const u24=[
vocab(24,1,'pesquisador','investigador','O pesquisador apresentou os resultados do estudo.','El investigador presentó los resultados del estudio.'),
vocab(24,2,'laboratório','laboratorio','As amostras foram analisadas no laboratório.','Las muestras fueron analizadas en el laboratorio.'),
vocab(24,3,'experimento','experimento','O experimento foi repetido para confirmar os dados.','El experimento se repitió para confirmar los datos.'),
vocab(24,4,'hipótese','hipótesis','A equipe formulou uma hipótese antes do teste.','El equipo formuló una hipótesis antes de la prueba.'),
vocab(24,5,'amostra','muestra','Uma amostra do material foi enviada ao laboratório.','Una muestra del material fue enviada al laboratorio.'),
vocab(24,6,'análise','análisis','A análise dos dados levou algumas semanas.','El análisis de los datos llevó varias semanas.'),
vocab(24,7,'descoberta','descubrimiento','A descoberta abriu novas possibilidades de pesquisa.','El descubrimiento abrió nuevas posibilidades de investigación.'),
vocab(24,8,'evidência','evidencia','Os pesquisadores procuraram evidência para apoiar a hipótese.','Los investigadores buscaron evidencia para apoyar la hipótesis.'),
vocab(24,9,'resultado','resultado','O resultado foi diferente do esperado.','El resultado fue distinto de lo esperado.'),
vocab(24,10,'conclusão','conclusión','A conclusão resume o que foi observado.','La conclusión resume lo que se observó.')
];
const unit22=makeUnit(22,'Ciudadanía y participación comunitaria','Comprende cómo los residentes participan en decisiones locales, reuniones y propuestas para su comunidad.','Prefeitura es la administración municipal; conselho y assembleia designan espacios de deliberación. Proposta y reivindicação expresan ideas o peticiones colectivas.',['Conselho y assembleia','Conselho suele ser un órgano o grupo de representación; assembleia es una reunión de participantes para debatir o decidir.'],u22,[
['Lección 1: La comunidad y sus residentes','Habla de ciudadanía y de las personas que viven en un barrio.','Cidadania se relaciona con derechos y participación; morador es quien vive en un lugar.',[0,2],['ptbr_a2_u20_v01','ptbr_a2_u15_v03']],
['Lección 2: Administración local','Identifica instituciones y representantes municipales.','Prefeitura es la administración del municipio; representante habla en nombre de un grupo.',[1,9],['ptbr_a2_u15_v01']],
['Lección 3: Reuniones y consejos','Comprende reuniones comunitarias y órganos de consulta.','Conselho es un grupo que asesora o decide; assembleia reúne a sus participantes.',[3,4],['ptbr_a2_u20_v08']],
['Lección 4: Propuestas y votaciones','Expresa ideas y decisiones tomadas en grupo.','Proposta presenta una idea; votação registra una decisión mediante votos.',[6,5],['ptbr_a2_u20_v04']],
['Lección 5: Participación y peticiones','Describe formas de intervenir en asuntos colectivos.','Participação es la intervención en una actividad; reivindicação es una petición para reclamar o mejorar algo.',[7,8],['ptbr_a2_u21_v07']]
]);
const unit23=makeUnit(23,'Agricultura y producción de alimentos','Describe actividades agrícolas, temporadas de cosecha y formas de producción y venta de alimentos.','Plantação nombra el terreno o conjunto de plantas; cultivo es la actividad de producirlas. Safra se refiere a la cosecha de una temporada.',['Colheita y safra','Colheita es la recolección de los productos; safra puede referirse a la producción de una temporada agrícola.'],u23,[
['Lección 1: Agricultura familiar','Habla de la producción agrícola y sus participantes.','Agricultura es la actividad de cultivar la tierra; produtor es quien produce y vende.',[0,4],['ptbr_a2_u12_v09','ptbr_a2_u12_v07']],
['Lección 2: Plantaciones y cultivos','Describe qué se planta y cómo se cultiva.','Plantação puede nombrar el área plantada; cultivo se refiere al producto o a su producción.',[2,3],['ptbr_a2_u12_v06']],
['Lección 3: Cosechas y temporadas','Habla de la recolección y de los ciclos agrícolas.','Colheita es la recolección; safra es la producción obtenida durante una temporada.',[1,5],['ptbr_a2_u12_v04']],
['Lección 4: Agua y fertilizantes','Comprende recursos utilizados en la producción agrícola.','Irrigação distribuye agua a los cultivos; fertilizante aporta nutrientes al suelo.',[6,7],['ptbr_a2_u12_v05']],
['Lección 5: Productos orgánicos y mercados','Describe productos y lugares de venta local.','Orgânico caracteriza productos obtenidos bajo prácticas específicas; feira livre es un mercado abierto.',[8,9],['ptbr_a2_u11_v01']]
]);
const unit24=makeUnit(24,'Ciencia e investigación','Comprende vocabulario básico para describir investigaciones, pruebas, observaciones y conclusiones.','Pesquisador realiza una investigación; hipótese es una explicación que se pone a prueba. Amostra y evidência apoyan el análisis.',['Hipótese y conclusão','Hipótese es una explicación provisional que se comprueba; conclusão resume lo que indican los resultados.'],u24,[
['Lección 1: Personas y espacios de investigación','Identifica quién investiga y dónde trabaja.','Pesquisador es quien investiga; laboratório es un espacio preparado para análisis y experimentos.',[0,1],['ptbr_a2_u17_v07','ptbr_a2_u17_v09']],
['Lección 2: Experimentos e hipótesis','Describe pruebas y explicaciones provisionales.','Experimento permite comprobar una idea; hipótese es una explicación que debe ponerse a prueba.',[2,3],['ptbr_a2_u10_v03']],
['Lección 3: Muestras y análisis','Habla de materiales y procedimientos de observación.','Amostra es una parte representativa; análise examina datos o materiales.',[4,5],['ptbr_a2_u18_v04']],
['Lección 4: Descubrimientos y evidencias','Comprende hallazgos y datos que los respaldan.','Descoberta es un hallazgo; evidência es un dato que apoya o contradice una explicación.',[6,7],['ptbr_a2_u10_v04']],
['Lección 5: Resultados y conclusiones','Resume lo observado y las conclusiones de un estudio.','Resultado es lo que se obtiene; conclusão interpreta y resume los hallazgos.',[8,9],['ptbr_a2_u17_v06']]
]);
root.GUARDI_CURRICULUM_BLOCKS=root.GUARDI_CURRICULUM_BLOCKS||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR']=root.GUARDI_CURRICULUM_BLOCKS['pt-BR']||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].A2=root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].A2||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].A2['22-24']={units:[unit22,unit23,unit24]};
})(typeof window!=='undefined'?window:globalThis);
