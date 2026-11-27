(function(root){
'use strict';
const rows=[
["a long-term strategic objective","un objetivo estratégico a largo plazo","The board approved a long-term strategic objective for the company.","La junta aprobó un objetivo estratégico a largo plazo para la empresa."],
["a newly appointed regional director","un director regional recién nombrado","A newly appointed regional director will oversee the expansion.","Un director regional recién nombrado supervisará la expansión."],
["the rapidly changing economic climate","el entorno económico, que cambia rápidamente","The rapidly changing economic climate requires flexible planning.","El entorno económico en rápido cambio exige una planificación flexible."],
["a carefully worded public statement","una declaración pública cuidadosamente redactada","The company released a carefully worded public statement.","La empresa publicó una declaración pública redactada cuidadosamente."],
["the evidence gathered during the investigation","las pruebas recopiladas durante la investigación","The evidence gathered during the investigation was presented to the panel.","Las pruebas recopiladas durante la investigación se presentaron al comité."],
["a widely held assumption","una suposición ampliamente aceptada","A widely held assumption turned out to be incorrect.","Una suposición ampliamente aceptada resultó ser incorrecta."],
["the proposed changes to the approval process","los cambios propuestos al proceso de aprobación","The proposed changes to the approval process will take effect in June.","Los cambios propuestos al proceso de aprobación entrarán en vigor en junio."],
["a series of unexpected technical difficulties","una serie de dificultades técnicas inesperadas","A series of unexpected technical difficulties delayed the launch.","Una serie de dificultades técnicas inesperadas retrasó el lanzamiento."],
["the first publicly available figures","las primeras cifras disponibles al público","The first publicly available figures showed a steady increase.","Las primeras cifras disponibles al público mostraron un aumento constante."],
["a highly controversial policy decision","una decisión política muy controvertida","The highly controversial policy decision prompted public debate.","La decisión política muy controvertida provocó un debate público."],
["the people directly affected by the decision","las personas directamente afectadas por la decisión","The people directly affected by the decision were invited to comment.","Se invitó a opinar a las personas directamente afectadas por la decisión."],
["a detailed analysis of consumer behavior","un análisis detallado del comportamiento del consumidor","The report includes a detailed analysis of consumer behavior.","El informe incluye un análisis detallado del comportamiento del consumidor."],
["a potentially significant long-term impact","un impacto potencialmente importante a largo plazo","The change could have a potentially significant long-term impact.","El cambio podría tener un impacto potencialmente importante a largo plazo."],
["the underlying causes of the problem","las causas subyacentes del problema","We need to identify the underlying causes of the problem.","Debemos identificar las causas subyacentes del problema."],
["a shortage of qualified personnel","una escasez de personal calificado","The project was delayed by a shortage of qualified personnel.","El proyecto se retrasó por una escasez de personal cualificado."],
["the extent of the damage caused","el alcance de los daños causados","Investigators are still assessing the extent of the damage caused.","Los investigadores siguen evaluando el alcance de los daños causados."],
["a range of practical alternatives","una variedad de alternativas prácticas","The committee considered a range of practical alternatives.","El comité consideró una variedad de alternativas prácticas."],
["the measures necessary to prevent recurrence","las medidas necesarias para evitar que se repita","The review identified the measures necessary to prevent recurrence.","La revisión identificó las medidas necesarias para evitar que se repita."],
["the relationship between price and perceived value","la relación entre el precio y el valor percibido","The study examined the relationship between price and perceived value.","El estudio examinó la relación entre el precio y el valor percibido."],
["a matter of considerable public concern","un asunto de considerable preocupación pública","Data privacy has become a matter of considerable public concern.","La privacidad de los datos se ha convertido en un asunto de considerable preocupación pública."],
["the resources available to local communities","los recursos disponibles para las comunidades locales","The program will expand the resources available to local communities.","El programa ampliará los recursos disponibles para las comunidades locales."],
["a clearly defined set of responsibilities","un conjunto de responsabilidades claramente definido","Each team needs a clearly defined set of responsibilities.","Cada equipo necesita un conjunto de responsabilidades claramente definido."]
];
const lessons=[
["Premodificadores y orden","Organiza adjetivos, adverbios y nombres antes del sustantivo sin crear secuencias confusas.","Los premodificadores suelen ir antes del núcleo; los adverbios como rapidly y carefully modifican adjetivos o participios.",[0,1,2,3],"The rapidly changing economic climate requires flexible planning."],
["Postmodificación con frases y relativas","Añade información después del núcleo mediante frases preposicionales y cláusulas reducidas.","Of-phrases, participle clauses y relative clauses amplían el sustantivo; coloca el modificador junto a su referente.",[4,5,6,7],"The evidence gathered during the investigation was presented to the panel."],
["Sustantivos abstractos y precisión","Usa grupos nominales densos para resumir conceptos, procesos y evaluaciones.","Nominalizaciones como analysis, impact y decision permiten condensar ideas; no sacrifiques claridad por densidad.",[8,9,10,11],"The report includes a detailed analysis of consumer behavior."],
["Complementos y relaciones complejas","Expresa causas, alcance, relaciones y requisitos dentro de grupos nominales.","Los complementos con of, between, to y caused by especifican relaciones; comprueba qué sustantivo gobierna la preposición.",[12,13,14,15],"We need to identify the underlying causes of the problem."],
["Densidad informativa con claridad","Integra modificadores y complementos en lenguaje académico y profesional.","Un grupo nominal complejo debe tener un núcleo identificable; divide la frase si los modificadores dificultan la comprensión.",[16,17,18,19,20,21],"The measures necessary to prevent recurrence were included in the report."]
];
const vocab=rows.map((r,i)=>({id:"en_b2_u29_v"+String(i+1).padStart(2,"0"),target:r[0],esp:r[1],ex:r[2],exEsp:r[3],verification:{status:"not_checked",sources:[]}}));
const mc=(w,opts)=>({vocabId:w.id,type:"mc",prompt:"¿Qué significa «"+w.target+"»?",options:opts,answer:0,explanation:"Identifica el núcleo del grupo nominal y la relación entre sus modificadores."});
const order=(w,s)=>{const words=s.split(" ");return {vocabId:w.id,type:"order",prompt:"Ordena la frase.",words,correctOrder:words.slice(),explanation:"Reconstruye el grupo nominal dentro de una oración natural."};};
const lessonObjects=lessons.map(l=>({title:l[0],objective:l[1],grammar:l[2],vocabIds:l[3].map(i=>vocab[i].id),reviewVocabIds:[],exercises:[mc(vocab[l[3][0]],[vocab[l[3][0]].esp,vocab[(l[3][0]+7)%22].esp,vocab[(l[3][0]+14)%22].esp]),order(vocab[l[3][1]],l[4])]}));
const exercises=[];for(let i=0;i<5;i++)exercises.push(mc(vocab[i],[vocab[i].esp,vocab[(i+8)%22].esp,vocab[(i+15)%22].esp]));
for(let i=0;i<5;i++)exercises.push(order(vocab[i+5],lessons[i][4]));
const unit29={unitNumber:29,id:"en_b2_u29",title:"Unidad 29: Complex noun phrases — grupos nominales complejos",desc:"Construye grupos nominales precisos y densos mediante premodificación, postmodificación, nominalización y complementos.",grammar:"Premodification, postmodification, participle clauses, relative clauses, nominalization and noun complements.",trap:{title:"Densidad frente a claridad",detail:"Identifica siempre el núcleo del grupo nominal. Evita colocar modificadores lejos del sustantivo al que describen; una frase más larga no siempre es más precisa."},vocab,lessons:lessonObjects,exercises};
const reviewRefs=[
["en_b2_u21_v01","it is widely believed","se cree ampliamente","It is widely believed that early support improves outcomes."],
["en_b2_u22_v01","to have something repaired","mandar a reparar algo","I had my laptop repaired last week."],
["en_b2_u23_v02","having finished","habiendo terminado","Having finished the report, she sent it to the director."],
["en_b2_u24_v02","the report submitted yesterday","el informe presentado ayer","The report submitted yesterday contains updated figures."],
["en_b2_u25_v03","what matters most is","lo que más importa es","What matters most is how we respond."],
["en_b2_u26_v01","rarely do we see","rara vez vemos","Rarely do we see such a rapid improvement."],
["en_b2_u27_v01","as for","en cuanto a","As for the budget, we need another estimate."],
["en_b2_u28_v03","I hope so","eso espero","Will the delivery arrive today? I hope so."],
["en_b2_u29_v01","a long-term strategic objective","un objetivo estratégico a largo plazo","The board approved a long-term strategic objective for the company."]
];
const reviewLessons=[
["Voz pasiva y causativas","Recupera cómo presentar información atribuida y servicios encargados.","Reporting passive, impersonal constructions and have/get something done.",[0,1],"It is widely believed that early support improves outcomes."],
["Participios y relativas reducidas","Condensa información temporal, activa y pasiva.","Present/perfect participle clauses and reduced relative clauses.",[2,3],"The report submitted yesterday contains updated figures."],
["Énfasis mediante clefts e inversión","Destaca información y reconoce patrones de inversión.","It-clefts, what-clefts and inversion after negative adverbials.",[4,5],"Rarely do we see such a rapid improvement."],
["Tema y sustitución","Organiza el discurso y evita repeticiones innecesarias.","Fronting, topicalisation, so/not substitution and auxiliary agreement.",[6,7],"As for the budget, we need another estimate."],
["Síntesis de sintaxis compleja","Integra estructuras complejas en una explicación profesional.","Choose a structure according to focus, register and information flow.",[1,4,8],"The board approved a long-term strategic objective for the company."]
];
const reviewObjects=reviewLessons.map(l=>({title:l[0],objective:l[1],grammar:l[2],vocabIds:[],reviewVocabIds:l[3].map(i=>reviewRefs[i][0]),exercises:[{vocabId:reviewRefs[l[3][0]][0],type:"mc",prompt:"Repasa «"+reviewRefs[l[3][0]][1]+"».",options:[reviewRefs[l[3][0]][2],"una expresión de obligación futura","una comparación de cantidad"],answer:0,explanation:"Recuperación de estructuras de U21–U29."},(()=>{const s=l[4],w=s.split(" ");return {vocabId:reviewRefs[l[3][Math.min(1,l[3].length-1)]][0],type:"order",prompt:"Ordena la frase.",words:w,correctOrder:w.slice(),explanation:"Reconstruye la estructura y reconoce su función discursiva."};})()]}));
const reviewBank=reviewLessons.map(l=>l[4]);
const reviewExercises=reviewRefs.slice(0,5).map(v=>({vocabId:v[0],type:"mc",prompt:"Repasa «"+v[1]+"».",options:[v[2],"una expresión de posibilidad futura","un conector de consecuencia"],answer:0,explanation:"Actividad de recuperación del bloque de sintaxis compleja y voz."}));
for(let i=0;i<5;i++){const s=reviewBank[i],w=s.split(" ");reviewExercises.push({vocabId:reviewRefs[i+4][0],type:"order",prompt:"Ordena la frase.",words:w,correctOrder:w.slice(),explanation:"Reconstruye el patrón sintáctico revisado."});}
const unit30={unitNumber:30,id:"en_b2_u30",title:"Unidad 30: Repaso III — sintaxis compleja y énfasis",desc:"Consolida U21–U29. No introduce vocabulario nuevo.",grammar:"Repaso integrado de voz pasiva avanzada, causativas, participle clauses, reduced relatives, cleft sentences, inversión, fronting, ellipsis y complex noun phrases.",trap:{title:"Elegir la estructura según el propósito",detail:"No uses una estructura compleja solo por sonar formal. Decide qué información quieres destacar, qué puede omitirse y quién realiza o recibe la acción."},vocab:[],lessons:reviewObjects,exercises:reviewExercises};
root.GUARDI_CURRICULUM_BLOCKS=root.GUARDI_CURRICULUM_BLOCKS||{};root.GUARDI_CURRICULUM_BLOCKS.en=root.GUARDI_CURRICULUM_BLOCKS.en||{};root.GUARDI_CURRICULUM_BLOCKS.en.B2=root.GUARDI_CURRICULUM_BLOCKS.en.B2||{};
root.GUARDI_CURRICULUM_BLOCKS.en.B2["29-30"]={units:[unit29,unit30]};
})(typeof window!=="undefined"?window:globalThis);
