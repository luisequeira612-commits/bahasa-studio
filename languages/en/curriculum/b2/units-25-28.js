(function(root){
'use strict';
const defs=[
{n:25,title:"Cleft sentences: it-clefts y what-clefts",desc:"Usa estructuras hendidas para destacar personas, causas, momentos y acciones sin alterar la información esencial.",grammar:"It is/was + focused element + that/who-clause; What-clause + be + focused information; all-clause clefts.",trap:"It was the timing that caused the problem. What matters is the timing. En it-clefts, that puede omitirse en algunos contextos informales, pero no confundas el foco con el sujeto de la subordinada.",rows:[
["it was the timing that","fue el momento lo que","It was the timing that caused the problem.","Fue el momento lo que causó el problema."],
["it is the lack of funding that","es la falta de fondos lo que","It is the lack of funding that limits the project.","Es la falta de fondos lo que limita el proyecto."],
["what is crucial is","lo crucial es","What is crucial is how we respond.","Lo crucial es cómo respondemos."],
["what I find surprising is","lo que me sorprende es","What I find surprising is the lack of evidence.","Lo que me sorprende es la falta de pruebas."],
["it was not until","no fue hasta que","It was not until Monday that we received a reply.","No fue hasta el lunes cuando recibimos una respuesta."],
["it is precisely because","es precisamente porque","It is precisely because costs have risen that we need a review.","Es precisamente porque los costos han subido que necesitamos una revisión."],
["what we need is","lo que necesitamos es","What we need is a clear decision.","Lo que necesitamos es una decisión clara."],
["all I want is","todo lo que quiero es","All I want is an honest explanation.","Todo lo que quiero es una explicación honesta."],
["the reason why","la razón por la que","The reason why I called was to confirm the appointment.","La razón por la que llamé fue para confirmar la cita."],
["it was John who","fue John quien","It was John who suggested the alternative.","Fue John quien sugirió la alternativa."],
["what happened was","lo que ocurrió fue","What happened was that the file had been deleted.","Lo que ocurrió fue que se había eliminado el archivo."],
["what concerns me is","lo que me preocupa es","What concerns me is the lack of preparation.","Lo que me preocupa es la falta de preparación."],
["it is only when","es solo cuando","It is only when we compare the data that the pattern becomes clear.","Solo cuando comparamos los datos el patrón queda claro."],
["what makes it difficult is","lo que lo hace difícil es","What makes it difficult is the limited time available.","Lo que lo hace difícil es el poco tiempo disponible."],
["it was in 2022 that","fue en 2022 cuando","It was in 2022 that the policy was introduced.","Fue en 2022 cuando se introdujo la política."],
["the thing I appreciate is","lo que valoro es","The thing I appreciate is your willingness to listen.","Lo que valoro es tu disposición a escuchar."],
["what we cannot ignore is","lo que no podemos ignorar es","What we cannot ignore is the impact on families.","Lo que no podemos ignorar es el impacto en las familias."],
["it is not the cost but the risk that","no es el costo sino el riesgo lo que","It is not the cost but the risk that worries me.","No es el costo sino el riesgo lo que me preocupa."],
["what the report shows is","lo que muestra el informe es","What the report shows is a steady decline.","Lo que muestra el informe es un descenso constante."],
["it was because of","fue debido a","It was because of a technical issue that the launch was delayed.","Fue debido a un problema técnico que se retrasó el lanzamiento."],
["what surprised everyone was","lo que sorprendió a todos fue","What surprised everyone was how quickly she adapted.","Lo que sorprendió a todos fue lo rápido que se adaptó."],
["the main point is that","el punto principal es que","The main point is that we need reliable information.","El punto principal es que necesitamos información fiable."]],
lessons:[
["It-clefts: foco y contraste","Destaca el elemento que explica o identifica una situación.","It + be + foco + that/who; usa who para personas y that para cosas o situaciones.",[0,1,2,3],"It was the timing that caused the problem."],
["Foco temporal y causal","Resalta cuándo o por qué ocurrió algo.","It was not until + time/clause + that; it is precisely because + clause + that.",[4,5,6,7],"It was not until Monday that we received a reply."],
["What-clefts","Presenta una acción, necesidad o evaluación como foco informativo.","What + clause + be + focus; what funciona como aquello que se identifica.",[8,9,10,11],"What we need is a clear decision."],
["Clefts para evaluación","Organiza opiniones y preocupaciones con énfasis controlado.","What concerns/surprises me is...; evita usar una cleft si el énfasis no aporta contraste.",[12,13,14,15],"What concerns me is the lack of preparation."],
["Énfasis integrado","Combina foco, contraste y síntesis en argumentos.","Contrasta it-cleft con what-cleft; el foco debe coincidir con la información que quieres corregir o destacar.",[16,17,18,19,20,21],"What the report shows is a steady decline."]]},
{n:26,title:"Inversion after negative adverbials",desc:"Emplea inversión auxiliar-sujeto después de expresiones negativas o restrictivas para dar énfasis y controlar el registro.",grammar:"Negative/restrictive adverbial + auxiliary + subject + main verb; past simple uses did; present simple uses do/does.",trap:"Rarely do we see such results. No sooner had we arrived than it started. No uses inversión cuando el adverbial no está al inicio.",rows:[
["rarely do we see","rara vez vemos","Rarely do we see such a rapid improvement.","Rara vez vemos una mejora tan rápida."],
["seldom have I encountered","pocas veces me he encontrado con","Seldom have I encountered such a complex case.","Pocas veces me he encontrado con un caso tan complejo."],
["never before had","nunca antes había","Never before had the team faced this level of pressure.","Nunca antes el equipo había enfrentado este nivel de presión."],
["hardly had we","apenas habíamos","Hardly had we started when the power went out.","Apenas habíamos empezado cuando se fue la luz."],
["not until the meeting ended did","no fue hasta que terminó la reunión cuando","Not until the meeting ended did we understand the impact.","No fue hasta que terminó la reunión cuando entendimos el impacto."],
["under no circumstances should","bajo ninguna circunstancia debería","Under no circumstances should personal data be shared.","Bajo ninguna circunstancia deberían compartirse datos personales."],
["at no point did","en ningún momento","At no point did the witness change her account.","En ningún momento la testigo cambió su versión."],
["not until later did","no fue hasta más tarde que","Not until later did we understand the impact.","No fue hasta más tarde que entendimos el impacto."],
["only after + noun + inversion","solo después de... se...","Only after the review did the errors become clear.","Solo después de la revisión quedaron claros los errores."],
["little did I know","ni me imaginaba que","Little did I know that the decision would change everything.","Poco sabía yo que la decisión lo cambiaría todo."],
["not only does","no solo","Not only does the plan save time, but it also reduces costs.","El plan no solo ahorra tiempo, sino que también reduce los costos."],
["only when + clause + inversion","solo cuando... se puede...","Only when the data is complete can we draw a conclusion.","Solo cuando los datos estén completos podremos sacar una conclusión."],
["in no way does","de ninguna manera","In no way does this guarantee success.","Esto de ninguna manera garantiza el éxito."],
["nowhere else can","en ningún otro lugar se puede","Nowhere else can you find the same level of support.","En ningún otro lugar puedes encontrar el mismo nivel de apoyo."],
["not once did","ni una sola vez","Not once did he apologize for the mistake.","Ni una sola vez se disculpó por el error."],
["only then did","solo entonces","Only then did I realize what had happened.","Solo entonces me di cuenta de lo que había ocurrido."],
["barely had","apenas había","Barely had the announcement ended when questions began.","Apenas había terminado el anuncio cuando comenzaron las preguntas."],
["scarcely had","apenas había","Scarcely had we sat down when the fire alarm rang.","Apenas nos habíamos sentado cuando sonó la alarma."],
["on no account should","por ningún motivo debería","On no account should the files be deleted.","Por ningún motivo deberían eliminarse los archivos."],
["little attention was paid","se prestó poca atención","Little attention was paid to the long-term effects.","Se prestó poca atención a los efectos a largo plazo."],
["only by working together can","solo trabajando juntos podemos","Only by working together can we solve the problem.","Solo trabajando juntos podemos resolver el problema."],
["not until the end was","no fue hasta el final cuando","Not until the end was the real reason revealed.","No fue hasta el final cuando se reveló la verdadera razón."]],
lessons:[
["Adverbios de frecuencia negativos","Invierte auxiliar y sujeto para enfatizar frecuencia excepcional.","Rarely, seldom y never al inicio requieren inversión; conserva el tiempo verbal correcto.",[0,1,2,3],"Rarely do we see such a rapid improvement."],
["Hardly, scarcely y no sooner","Expresa dos sucesos consecutivos con inversión y conectores temporales.","Hardly/scarcely + past perfect + when; no sooner + past perfect + than.",[4,5,6,7],"No sooner had she arrived than the meeting began."],
["Restricciones y prohibiciones","Da énfasis formal a límites y prohibiciones.","Under no circumstances, at no point, in no way y on no account requieren inversión.",[8,9,10,11],"Under no circumstances should personal data be shared."],
["Only y not until","Resalta condiciones o momentos que hacen posible un resultado.","Only after/when/then + inversion; not until al inicio también requiere inversión en la principal.",[12,13,14,15],"Only after the review did the errors become clear."],
["Inversión en discurso formal","Integra inversión para destacar consecuencias y argumentos.","Only by + -ing, little did I know y not only...but also; revisa el auxiliar según el tiempo.",[16,17,18,19,20,21],"Only by working together can we solve the problem."]]},
{n:27,title:"Fronting y topicalisation",desc:"Coloca información al inicio para establecer tema, contraste o marco discursivo sin perder la estructura gramatical.",grammar:"Fronted object/complement/adverbial; topicalisation; fronted negative or evaluative phrase; preserve subject-verb agreement and required inversion only where triggered.",trap:"This issue, we can deal with later (topicalised object). Into the room came the manager (locative inversion, literary). No toda frase inicial exige inversión.",rows:[
["as for","en cuanto a","As for the budget, we need another estimate.","En cuanto al presupuesto, necesitamos otra estimación."],
["with regard to","con respecto a","With regard to your request, we will reply by Friday.","Con respecto a tu solicitud, responderemos antes del viernes."],
["when it comes to","cuando se trata de","When it comes to safety, shortcuts are unacceptable.","Cuando se trata de seguridad, los atajos son inaceptables."],
["that said","dicho eso","That said, we should consider the alternative.","Dicho eso, deberíamos considerar la alternativa."],
["this issue","este asunto","This issue, we can discuss at the next meeting.","Este asunto podemos discutirlo en la próxima reunión."],
["the rest of the proposal","el resto de la propuesta","The rest of the proposal, I'll send tomorrow.","El resto de la propuesta lo enviaré mañana."],
["particularly important","especialmente importante","Particularly important is the need for clear instructions.","Especialmente importante es la necesidad de instrucciones claras."],
["even more concerning","aún más preocupante","Even more concerning is the lack of independent oversight.","Aún más preocupante es la falta de supervisión independiente."],
["as far as I am concerned","por lo que a mí respecta","As far as I am concerned, the matter is settled.","Por lo que a mí respecta, el asunto está resuelto."],
["in terms of","en términos de","In terms of cost, the second option is better.","En términos de costo, la segunda opción es mejor."],
["the main point","el punto principal","The main point, we should not lose sight of it.","El punto principal no deberíamos perderlo de vista."],
["for one thing","para empezar","For one thing, we have not checked the figures.","Para empezar, no hemos comprobado las cifras."],
["more importantly","más importante aún","More importantly, the change protects users.","Más importante aún, el cambio protege a los usuarios."],
["equally significant","igualmente importante","Equally significant is the effect on local businesses.","Igualmente importante es el efecto en los negocios locales."],
["as regards","en lo que respecta a","As regards staffing, no decision has been made.","En lo que respecta al personal, no se ha tomado ninguna decisión."],
["the problem with that","el problema con eso","The problem with that is the extra cost.","El problema con eso es el costo adicional."],
["what is less clear","lo que está menos claro","What is less clear is who will take responsibility.","Lo que está menos claro es quién asumirá la responsabilidad."],
["on the other hand","por otro lado","On the other hand, the proposal could save time.","Por otro lado, la propuesta podría ahorrar tiempo."],
["in the first place","en primer lugar","In the first place, we need accurate information.","En primer lugar, necesitamos información precisa."],
["as a starting point","como punto de partida","As a starting point, let's review the original plan.","Como punto de partida, revisemos el plan original."],
["the key question","la pregunta clave","The key question is whether the system is reliable.","La pregunta clave es si el sistema es fiable."],
["above all","sobre todo","Above all, we must keep the process transparent.","Sobre todo, debemos mantener transparente el proceso."]],
lessons:[
["Establecer el tema","Introduce el asunto antes de desarrollar un comentario.","As for, with regard to y as regards establecen el marco temático; no son sujetos gramaticales.",[0,1,2,3],"As for the budget, we need another estimate."],
["Topicalisation del objeto","Coloca un objeto conocido al inicio para conectar con el contexto.","El objeto topicalizado se retoma o se entiende por el contexto; conserva el orden normal en la cláusula principal.",[4,5,6,7],"This issue, we can discuss at the next meeting."],
["Complementos fronted","Destaca una evaluación o prioridad al comienzo.","Particularly important is... puede llevar inversión estilística; distingue esta forma de la inversión negativa obligatoria.",[8,9,10,11],"Particularly important is the need for clear instructions."],
["Organización y contraste","Ordena argumentos con marcos y conectores iniciales.","For one thing, more importantly y on the other hand guían al lector; evita acumular marcadores.",[12,13,14,15],"More importantly, the change protects users."],
["Foco y claridad discursiva","Combina topicalisation y fronting para presentar una postura clara.","El elemento inicial debe enlazar con el discurso y no dejar ambigua su función.",[16,17,18,19,20,21],"The key question is whether the system is reliable."]]},
{n:28,title:"Ellipsis y substitution",desc:"Evita repeticiones innecesarias con omisión recuperable y sustitutos naturales en conversación y escritura.",grammar:"Auxiliary ellipsis; so/not substitution after think/hope/suppose; do so; one/ones; so/neither/nor; comparative ellipsis.",trap:"I hope so = espero que sí; I hope not = espero que no. So do I = yo también; Neither do I = yo tampoco. No uses so para sustituir cualquier verbo.",rows:[
["so do I","yo también","My colleagues enjoy working outdoors, and so do I.","Mis compañeros disfrutan trabajar al aire libre, y yo también."],
["neither do I","yo tampoco","My colleagues don't agree with the proposal, and neither do I.","Mis compañeros no están de acuerdo con la propuesta, y yo tampoco."],
["I hope so","eso espero","Will the delivery arrive today? I hope so.","¿Llegará hoy el envío? Eso espero."],
["I hope not","espero que no","Is the road closed? I hope not.","¿Está cerrada la carretera? Espero que no."],
["I suppose so","supongo que sí","Is this the correct form? I suppose so.","¿Es este el formulario correcto? Supongo que sí."],
["I don't think so","no lo creo","Will they extend the deadline? I don't think so.","¿Ampliarán el plazo? No lo creo."],
["do so","hacerlo","If you need to update the file, please do so today.","Si necesitas actualizar el archivo, hazlo hoy."],
["one / ones","uno / unos","I prefer the blue ones to the black ones.","Prefiero los azules a los negros."],
["the former","el primero / la primera de dos","Both routes are possible, but the former is shorter.","Ambas rutas son posibles, pero la primera es más corta."],
["the latter","el segundo / la segunda de dos","We could call or email; the latter is more convenient.","Podríamos llamar o escribir; lo segundo es más práctico."],
["if so","si es así","Are you available tomorrow? If so, let's meet at ten.","¿Estás disponible mañana? Si es así, reunámonos a las diez."],
["if you can't","si no puedes","Please confirm today; if you can't, we'll choose another supplier.","Confirma hoy; si no puedes, elegiremos otro proveedor."],
["so am I","yo también","They're concerned about the delay, and so am I.","A ellos les preocupa el retraso, y a mí también."],
["nor can we","ni nosotros podemos","They cannot change the terms, nor can we.","Ellos no pueden cambiar las condiciones, ni nosotros tampoco."],
["the same goes for","lo mismo ocurre con","The rule applies to staff; the same goes for contractors.","La regla se aplica al personal; lo mismo ocurre con los contratistas."],
["as much as","tanto como","I value accuracy as much as speed.","Valoro la precisión tanto como la rapidez."],
["rather than repeat","en vez de repetir","Rather than repeat the details, I'll send you the report.","En vez de repetir los detalles, te enviaré el informe."],
["to avoid doing so","para evitar hacerlo","The team agreed not to share the draft publicly and took steps to avoid doing so.","El equipo acordó no compartir públicamente el borrador y tomó medidas para evitar hacerlo."],
["not necessarily","no necesariamente","A higher price does not necessarily mean better quality.","Un precio más alto no significa necesariamente mejor calidad."],
["the same is true of","lo mismo ocurre con","The same is true of smaller suppliers.","Lo mismo ocurre con los proveedores más pequeños."],
["as did","al igual que","The first group improved, as did the second.","El primer grupo mejoró, al igual que el segundo."],
["than expected","de lo esperado","The process took longer than expected.","El proceso tardó más de lo esperado."]],
lessons:[
["So y not como sustitutos","Responde y expresa opiniones sin repetir toda la proposición.","Think/hope/suppose + so/not; so sustituye una afirmación y not una negativa o duda.",[0,1,2,3],"Will the delivery arrive today? I hope so."],
["Respuestas de acuerdo","Expresa coincidencia positiva y negativa con auxiliares.","So + auxiliary + subject; neither/nor + auxiliary + subject. El auxiliar coincide con el tiempo y la persona.",[4,5,6,7],"I enjoy working outdoors, and so do I."],
["Do so y sustitución nominal","Evita repetir verbos y sustantivos ya mencionados.","Do so sustituye una acción; one/ones sustituye un sustantivo contable mencionado.",[8,9,10,11],"If you need to update the file, please do so today."],
["Referencia y alternativas","Retoma opciones o proposiciones sin repetirlas.","The former/the latter solo son claros cuando hay dos referentes; if so/if not retoman una condición.",[12,13,14,15],"We could call or email; the latter is more convenient."],
["Elipsis en comparación y discurso","Integra omisión y sustitución para mejorar la fluidez.","As did, than expected y the same goes for permiten evitar repeticiones; conserva un referente claro.",[16,17,18,19,20,21],"The first group improved, as did the second."]]}
];
function build(d){
 const vocab=d.rows.map((r,i)=>({id:"en_b2_u"+d.n+"_v"+String(i+1).padStart(2,"0"),target:r[0],esp:r[1],ex:r[2],exEsp:r[3],verification:{status:"not_checked",sources:[]}}));
 const mc=(w,opts)=>{const correct=opts[0];const match=String(w.id).match(/v(\d+)$/);const offset=match?Number(match[1])%opts.length:1;const options=opts.slice(offset).concat(opts.slice(0,offset));return {vocabId:w.id,type:"mc",prompt:"¿Qué significa «"+w.target+"»?",options,answer:options.indexOf(correct),explanation:"Elige la equivalencia que conserva el sentido en contexto."};};
 const order=(w,s)=>{const correctOrder=s.replace(/[.,!?;:]/g,"").trim().split(/\s+/).filter(Boolean);let words=correctOrder.length>1?correctOrder.slice(1).concat(correctOrder.slice(0,1)):correctOrder.slice();if(words.join(" ")===correctOrder.join(" "))words=correctOrder.slice().reverse();return {vocabId:w.id,type:"order",prompt:"Ordena la frase.",words,correctOrder,explanation:"Reconstruye la frase y observa el patrón sintáctico."};};
 const lessons=d.lessons.map(l=>({title:l[0],objective:l[1],grammar:l[2],vocabIds:l[3].map(i=>vocab[i].id),reviewVocabIds:[],exercises:[mc(vocab[l[3][0]],[vocab[l[3][0]].esp,vocab[(l[3][0]+7)%22].esp,vocab[(l[3][0]+14)%22].esp]),order(vocab[l[3][1]],l[4])]}));
 const bank=d.lessons.map(l=>l[4]),exercises=[];
 for(let i=0;i<5;i++){const w=vocab[i];exercises.push(mc(w,[w.esp,vocab[(i+8)%22].esp,vocab[(i+15)%22].esp]));}
 for(let i=0;i<5;i++)exercises.push(order(vocab[i+5],bank[i]));
 return {unitNumber:d.n,id:"en_b2_u"+d.n,title:"Unidad "+d.n+": "+d.title,desc:d.desc,grammar:d.grammar,trap:{title:"Control del énfasis y la estructura",detail:d.trap},vocab,lessons,exercises};
}
root.GUARDI_CURRICULUM_BLOCKS=root.GUARDI_CURRICULUM_BLOCKS||{};root.GUARDI_CURRICULUM_BLOCKS.en=root.GUARDI_CURRICULUM_BLOCKS.en||{};root.GUARDI_CURRICULUM_BLOCKS.en.B2=root.GUARDI_CURRICULUM_BLOCKS.en.B2||{};
root.GUARDI_CURRICULUM_BLOCKS.en.B2["25-28"]={units:defs.map(build)};
})(typeof window!=="undefined"?window:globalThis);
