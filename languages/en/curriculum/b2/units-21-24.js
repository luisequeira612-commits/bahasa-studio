(function(root){
'use strict';
const definitions=[
{n:21,title:"Passive voice avanzada: reporting e impersonalidad",desc:"Presenta información, creencias y afirmaciones sin destacar al agente, y atribuye con precisión lo que se comunica.",grammar:"It is said/believed/reported that...; subject + is said/believed/thought to...; verb + object + to-infinitive; passive reporting verbs.",trap:"It is believed that the plan will work / The plan is believed to work. No uses is said + that después del sujeto pasivo.",rows:[
["it is widely believed","se cree ampliamente","It is widely believed that early support improves outcomes.","Se cree ampliamente que el apoyo temprano mejora los resultados."],
["it has been reported","se ha informado","It has been reported that several roads remain closed.","Se ha informado que varias carreteras siguen cerradas."],
["it is generally assumed","se suele suponer","It is generally assumed that the figures are accurate.","Se suele suponer que las cifras son exactas."],
["it remains to be seen","está por verse","It remains to be seen whether the changes will be effective.","Está por verse si los cambios serán eficaces."],
["to be widely regarded as","ser ampliamente reconocido como","The novel is widely regarded as a modern classic.","La novela es ampliamente reconocida como un clásico moderno."],
["to be slated to","tener previsto / estar previsto que","The new system is slated to reduce waiting times.","Está previsto que el nuevo sistema reduzca los tiempos de espera."],
["to be thought to","se cree que","The painting is thought to date from the 18th century.","Se cree que la pintura data del siglo XVIII."],
["to be alleged to","se alega que","The company is alleged to have concealed the losses.","Se alega que la empresa ocultó las pérdidas."],
["to be known to","se sabe que","The drug is known to cause mild side effects.","Se sabe que el medicamento causa efectos secundarios leves."],
["to be believed to have","se cree que fue / ha sido","The bridge is believed to have been built in 1890.","Se cree que el puente fue construido en 1890."],
["is reported to be","se informa que es","The area is reported to be safe for visitors.","Se informa que la zona es segura para los visitantes."],
["to be understood to","se entiende que","The agreement is understood to include a review clause.","Se entiende que el acuerdo incluye una cláusula de revisión."],
["to claim","afirmar / alegar","The witness claims to have seen the vehicle.","El testigo afirma haber visto el vehículo."],
["to deny","negar","The firm denies having received the warning.","La empresa niega haber recibido la advertencia."],
["to acknowledge","reconocer","The minister acknowledged that mistakes had been made.","El ministro reconoció que se habían cometido errores."],
["to confirm","confirmar","Officials confirmed that the road had reopened.","Las autoridades confirmaron que la carretera había reabierto."],
["to estimate","calcular / estimar","The damage is estimated to exceed two million dollars.","Se estima que los daños superan los dos millones de dólares."],
["to be scheduled to","estar previsto que","The committee is scheduled to meet next Tuesday.","Está previsto que el comité se reúna el próximo martes."],
["to be required to","tener que / estar obligado a","Applicants are required to provide two references.","Los solicitantes tienen que proporcionar dos referencias."],
["to be permitted to","tener permiso para","Visitors are not permitted to enter this section.","Los visitantes no tienen permitido entrar en esta sección."],
["to be deemed","considerarse","The proposal was deemed unsuitable for the project.","La propuesta se consideró inadecuada para el proyecto."],
["to emerge","surgir","Further details emerged during the inquiry.","Surgieron más detalles durante la investigación."]],
lessons:[
["Reporting impersonal con it","Introduce afirmaciones sin presentar una fuente como protagonista.","It + passive reporting verb + that-clause; usa believed, reported, assumed y expected según la certeza o la fuente.",[0,1,2,3],"It has been reported that several roads remain closed."],
["Pasiva personal con infinitivo","Coloca el tema de la afirmación como sujeto de la oración.","Subject + be + reporting verb + to-infinitive; usa to have + participle para anterioridad.",[4,5,6,7],"The new system is slated to reduce waiting times."],
["Certeza, alegaciones y conocimiento","Distingue hechos conocidos, afirmaciones y acusaciones no verificadas.","Be known/believed/alleged to no expresan el mismo grado de certeza; alleged mantiene distancia respecto de la acusación.",[8,9,10,11],"The bridge is believed to have been built in 1890."],
["Verbos de atribución","Atribuye declaraciones, negaciones y reconocimientos con precisión.","Claim, deny, acknowledge y confirm pueden ir con that-clause o gerundio/infinitivo según el patrón.",[12,13,14,15],"The firm denies having received the warning."],
["Pasiva en informes y procedimientos","Resume estimaciones, requisitos y resultados de investigaciones.","Be estimated + to-infinitive; be scheduled/required/permitted + to-infinitive; be deemed + adjective. Emerge es intransitivo y no forma una pasiva.",[16,17,18,19,20,21],"The committee is scheduled to meet next Tuesday."]]},
{n:22,title:"Have/get something done: causativas",desc:"Explica servicios, reparaciones y experiencias en las que otra persona realiza una acción por encargo o el sujeto la sufre.",grammar:"Have/get + object + past participle; have/get someone to do something; get something done puede sugerir logro o esfuerzo.",trap:"I had my phone repaired = otra persona lo reparó. I repaired my phone = yo lo reparé. No confundas el objeto con quien realiza la acción.",rows:[
["to have something repaired","mandar a reparar algo","I had my laptop repaired last week.","Mandé a reparar mi computadora portátil la semana pasada."],
["to get the roof inspected","hacer que inspeccionen el techo","We're getting the roof inspected before the rainy season.","Vamos a hacer que inspeccionen el techo antes de la temporada de lluvias."],
["to have a document translated","mandar a traducir un documento","She had the contract translated into Spanish.","Mandó a traducir el contrato al español."],
["to get one's hair cut","hacerse cortar el cabello","I'm getting my hair cut on Saturday.","El sábado voy a hacer que me corten el cabello."],
["to have the brakes checked","hacer que revisen los frenos","You should have the brakes checked before the trip.","Deberías hacer que revisen los frenos antes del viaje."],
["to get the heating fixed","hacer reparar la calefacción","They finally got the heating fixed.","Por fin lograron que repararan la calefacción."],
["to have a room redecorated","mandar a redecorar una habitación","We had the guest room redecorated.","Mandamos a redecorar la habitación de invitados."],
["to get a suit tailored","mandar a ajustar un traje","He got his suit tailored for the ceremony.","Mandó a ajustar su traje para la ceremonia."],
["to have one's photo taken","hacerse una foto","We had our photo taken outside the museum.","Nos tomamos una foto fuera del museo."],
["to get one's eyes tested","hacerse revisar la vista","I need to get my eyes tested.","Necesito hacerme revisar la vista."],
["to have the locks changed","mandar a cambiar las cerraduras","The tenants had the locks changed after the break-in.","Los inquilinos mandaron a cambiar las cerraduras después del robo."],
["to get the package delivered","conseguir que entreguen el paquete","Can you get the package delivered by Friday?","¿Puedes conseguir que entreguen el paquete antes del viernes?"],
["to have someone install something","pedirle a alguien que instale algo","We had a technician install the new router.","Le pedimos a un técnico que instalara el nuevo router."],
["to get someone to look into","conseguir que alguien investigue","I'll get the manager to look into the complaint.","Haré que el gerente investigue la queja."],
["to have someone show you something","pedirle a alguien que te muestre algo","I had the guide show us the emergency exits.","Le pedí al guía que nos mostrara las salidas de emergencia."],
["to get something sorted out","conseguir que algo se resuelva","We need to get the paperwork sorted out.","Tenemos que conseguir que se resuelva el papeleo."],
["to have access restored","hacer que se restablezca el acceso","They had access restored within an hour.","Consiguieron que se restableciera el acceso en una hora."],
["to get a refund issued","conseguir que emitan un reembolso","She got a refund issued after contacting support.","Consiguió que emitieran un reembolso después de contactar con soporte."],
["to have a claim assessed","mandar a evaluar una reclamación","We had the insurance claim assessed independently.","Mandamos a evaluar la reclamación del seguro de forma independiente."],
["to get the job done","lograr terminar el trabajo","We have a tight deadline, but we'll get the job done.","Tenemos un plazo ajustado, pero lograremos terminar el trabajo."],
["to have something stolen","que te roben algo","He had his wallet stolen on the train.","Le robaron la cartera en el tren."],
["to get caught in","verse atrapado en","They got caught in a sudden storm.","Quedaron atrapados en una tormenta repentina."]],
lessons:[
["Servicios y encargos","Describe servicios que otra persona realiza para ti.","Have + object + past participle es neutral; get + object + past participle es más conversacional.",[0,1,2,3],"We're getting the roof inspected before the rainy season."],
["Mantenimiento y cuidado personal","Habla de revisiones, arreglos y servicios personales.","El objeto recibe la acción: have the brakes checked, get your eyes tested.",[4,5,6,7],"They finally got the heating fixed."],
["Experiencias y resultados","Expresa acciones encargadas y resultados que se consiguen.","Have/get + object + past participle; el contexto aclara quién encarga el servicio.",[8,9,10,11],"I need to get my eyes tested."],
["Causativa con persona","Indica quién realiza una tarea por encargo.","Have + person + base verb; get + person + to-infinitive. No uses to después de have en este patrón.",[12,13,14,15],"I'll get the manager to look into the complaint."],
["Causativa y experiencias no deseadas","Distingue servicios voluntarios de sucesos que afectan al sujeto.","Have something done también puede describir experiencias negativas: have something stolen; get caught in no es causativa.",[16,17,18,19,20,21],"He had his wallet stolen on the train."]]},
{n:23,title:"Participle clauses: reducción y condensación",desc:"Condensa información temporal, causal, condicional y descriptiva mediante participios sin perder claridad.",grammar:"Present participle (-ing) para acciones simultáneas/causa; past participle para pasiva; perfect participle (having + past participle) para anterioridad.",trap:"El sujeto implícito de la participle clause debe coincidir con el sujeto de la oración principal. Evita dangling participles.",rows:[
["while waiting","mientras esperaba","While waiting for the train, I reviewed my notes.","Mientras esperaba el tren, repasé mis notas."],
["having finished","habiendo terminado","Having finished the report, she sent it to the director.","Después de terminar el informe, se lo envió al director."],
["having been warned","habiendo sido advertido","Having been warned about the risk, they changed the route.","Después de haber sido advertidos del riesgo, cambiaron la ruta."],
["based on","basado en","Based on the available evidence, the claim seems reasonable.","Según las pruebas disponibles, la afirmación parece razonable."],
["given the circumstances","dadas las circunstancias","Given the circumstances, postponing the event was sensible.","Dadas las circunstancias, posponer el evento fue sensato."],
["assuming that","suponiendo que","Assuming that the figures are correct, the project is affordable.","Suponiendo que las cifras sean correctas, el proyecto es asequible."],
["strictly speaking","estrictamente hablando","Strictly speaking, the deadline is tomorrow.","Estrictamente hablando, el plazo vence mañana."],
["judging by","a juzgar por","Judging by the response, the audience enjoyed the talk.","A juzgar por la reacción, el público disfrutó la charla."],
["compared with","comparado con","Compared with last year, sales have increased.","En comparación con el año pasado, las ventas han aumentado."],
["considering","considerando","Considering the cost, this is a reasonable option.","Considerando el costo, esta es una opción razonable."],
["unless specified otherwise","salvo que se especifique lo contrario","Unless specified otherwise, all prices include tax.","Salvo que se especifique lo contrario, todos los precios incluyen impuestos."],
["when asked","cuando se le preguntó","When asked about the delay, she referred to the supplier.","Cuando se le preguntó por el retraso, se refirió al proveedor."],
["if necessary","si es necesario","If necessary, we can extend the trial period.","Si es necesario, podemos ampliar el periodo de prueba."],
["once completed","una vez terminado","Once completed, the form should be sent to HR.","Una vez completado, el formulario debe enviarse a Recursos Humanos."],
["left unchecked","si se deja sin control","Left unchecked, the problem could spread quickly.","Si se deja sin control, el problema podría extenderse rápidamente."],
["not knowing","al no saber","Not knowing the answer, he asked for clarification.","Como no sabía la respuesta, pidió una aclaración."],
["turning to","pasando a","Turning to the final point, we need to discuss the budget.","Pasando al último punto, debemos hablar del presupuesto."],
["taking everything into account","teniendo todo en cuenta","Taking everything into account, we should consider the proposal.","Teniendo todo en cuenta, vale la pena considerar la propuesta."],
["having said that","dicho esto","Having said that, we should not ignore the risks.","Dicho esto, no deberíamos ignorar los riesgos."],
["provided with","si se proporciona","Provided with clear instructions, the team can work independently.","Si se le proporcionan instrucciones claras, el equipo puede trabajar de forma autónoma."],
["surrounded by","rodeado de","Surrounded by reporters, the actor left through a side door.","Rodeado de periodistas, el actor salió por una puerta lateral."],
["born and raised","nacido y criado","Born and raised in Chicago, she knows the city well.","Nacida y criada en Chicago, conoce bien la ciudad."]],
lessons:[
["Participios y cláusulas reducidas","Condensa cláusulas activas y pasivas mediante participios presentes, pasados y perfectos.","V-ing expresa acción activa o simultánea; having + participle marca anterioridad; having been + participle expresa anterioridad pasiva; past participles pueden reducir relativas o cláusulas pasivas.",[0,1,2,3],"Having finished the report, she sent it to the director."],
["Marcos de contexto y evaluación","Expresa condiciones supuestas y evalúa información con frases adverbiales compactas.","Given, assuming, strictly speaking y judging by introducen marcos de contexto; comprueba que el sujeto implícito y la relación lógica sean claros.",[4,5,6,7],"Assuming that the figures are correct, the project is affordable."],
["Comparación y condiciones de contexto","Compara información y añade condiciones o referencias temporales sin repetir una cláusula completa.","Compared with, considering, unless specified otherwise y when asked funcionan como marcos adverbiales; el contexto determina su alcance.",[8,9,10,11],"Considering the cost, this is a reasonable option."],
["Reducciones temporales y condicionales","Condensa referencias temporales y condiciones explícitas.","When asked, once completed, if necessary y unless otherwise stated dependen del contexto.",[12,13,14,15],"Once completed, the form should be sent to HR."],
["Cohesión y control del sujeto","Integra participle clauses sin crear sujetos implícitos ambiguos.","En las cláusulas participiales, el sujeto implícito normalmente coincide con el sujeto principal; having said that es un marcador discursivo fijo y no una cláusula participial literal.",[16,17,18,19,20,21],"Taking everything into account, the proposal is worth considering."]]},
{n:24,title:"Reduced relative clauses: relativas reducidas",desc:"Reduce cláusulas relativas para identificar personas, objetos y procesos con una sintaxis más compacta.",grammar:"Active relative → present participle; passive relative → past participle; infinitive relative after first/only/next/superlative or obligation.",trap:"The people waiting outside = people who are waiting. The documents submitted yesterday = documents that were submitted. No reduzcas si el referente o el tiempo queda ambiguo.",rows:[
["the people involved","las personas involucradas","The people involved will be contacted directly.","Se contactará directamente a las personas involucradas."],
["the report submitted yesterday","el informe presentado ayer","The report submitted yesterday contains updated figures.","El informe presentado ayer contiene cifras actualizadas."],
["the candidates selected","los candidatos seleccionados","The candidates selected will receive an email.","Los candidatos seleccionados recibirán un correo."],
["the issues raised","los problemas planteados","The issues raised during the meeting need attention.","Los problemas planteados durante la reunión requieren atención."],
["the staff working remotely","el personal que trabaja a distancia","Staff working remotely must follow the same policy.","El personal que trabaja a distancia debe seguir la misma política."],
["the devices connected","los dispositivos conectados","Devices connected to the network are monitored.","Los dispositivos conectados a la red son supervisados."],
["the documents required","los documentos requeridos","Please attach all documents required for the application.","Adjunta todos los documentos requeridos para la solicitud."],
["the first person to arrive","la primera persona en llegar","She was the first person to arrive.","Fue la primera persona en llegar."],
["the only option available","la única opción disponible","This is the only option available at short notice.","Esta es la única opción disponible con tan poca antelación."],
["the next train to leave","el próximo tren en salir","The next train to leave is the 8:15 service.","El próximo tren en salir es el de las 8:15."],
["the information provided","la información proporcionada","The information provided was incomplete.","La información proporcionada estaba incompleta."],
["the company responsible","la empresa responsable","The company responsible must cover the repair costs.","La empresa responsable debe cubrir los costos de reparación."],
["the changes made","los cambios realizados","The changes made last month improved performance.","Los cambios realizados el mes pasado mejoraron el rendimiento."],
["the issue being discussed","el asunto que se está debatiendo","The issue being discussed is highly sensitive.","El asunto que se está debatiendo es muy delicado."],
["the materials needed","los materiales necesarios","The materials needed are listed below.","Los materiales necesarios aparecen a continuación."],
["the person in charge","la persona a cargo","Please speak to the person in charge.","Habla con la persona a cargo."],
["the products manufactured locally","los productos fabricados localmente","Products manufactured locally are often cheaper to ship.","Los productos fabricados localmente suelen ser más baratos de transportar."],
["the evidence collected","las pruebas recopiladas","The evidence collected points to a different conclusion.","Las pruebas recopiladas apuntan a una conclusión diferente."],
["the questions remaining","las preguntas pendientes","The questions remaining will be addressed tomorrow.","Las preguntas pendientes se abordarán mañana."],
["the work to be completed","el trabajo que debe completarse","The work to be completed is listed in the schedule.","El trabajo que debe completarse aparece en el calendario."],
["the best place to start","el mejor lugar para empezar","This is the best place to start your research.","Este es el mejor lugar para empezar tu investigación."],
["the amount paid","la cantidad pagada","The amount paid will be refunded within five days.","La cantidad pagada se reembolsará en cinco días."]],
lessons:[
["Relativas pasivas reducidas","Identifica información adicional sobre personas y objetos que reciben una acción.","Who/that + be + past participle puede reducirse al participio pasado.",[0,1,2,3],"The report submitted yesterday contains updated figures."],
["Participios y formas infinitivas en relativas","Combina modificadores activos, pasivos e infinitivos para identificar referentes.","Present participle para relaciones activas, past participle para pasivas y to-infinitive después de first/only/next.",[4,5,6,7],"Devices connected to the network are monitored."],
["Infinitivo y modificadores de referencia","Usa infinitivos y modificadores para identificar opciones, secuencias y responsabilidades.","The first/only/next + noun + to-infinitive identifica orden o función; otras frases reducidas precisan el sustantivo.",[8,9,10,11],"The next train to leave is the 8:15 service."],
["Modificadores y responsables","Integra modificadores compactos en descripciones profesionales.","Participios y frases preposicionales pueden modificar sustantivos; comprueba qué elemento describen.",[12,13,14,15],"The issue being discussed is highly sensitive."],
["Precisión y límites de reducción","Decide cuándo una relativa reducida resulta clara y natural.","No reduzcas si el tiempo, el agente o el referente se vuelven ambiguos; to be completed expresa obligación pendiente.",[16,17,18,19,20,21],"The evidence collected points to a different conclusion."]]}
];
const makeUnit=d=>{
 const vocab=d.rows.map((r,i)=>({id:"en_b2_u"+d.n+"_v"+String(i+1).padStart(2,"0"),target:r[0],esp:r[1],ex:r[2],exEsp:r[3],verification:{status:"not_checked",sources:[]}}));
 const mc=(w,opts)=>{const correct=opts[0];const match=String(w.id).match(/v(\d+)$/);const offset=match?Number(match[1])%opts.length:1;const options=opts.slice(offset).concat(opts.slice(0,offset));return {vocabId:w.id,type:"mc",prompt:"¿Qué significa «"+w.target+"»?",options,answer:options.indexOf(correct),explanation:"Elige la equivalencia que conserva el sentido y el registro del contexto."};};
 const order=(w,s)=>{const correctOrder=s.replace(/[.,!?;:]/g,"").trim().split(/\s+/).filter(Boolean);let words=correctOrder.length>1?correctOrder.slice(1).concat(correctOrder.slice(0,1)):correctOrder.slice();if(words.join(" ")===correctOrder.join(" "))words=correctOrder.slice().reverse();return {vocabId:w.id,type:"order",prompt:"Ordena la frase.",words,correctOrder,explanation:"Reconstruye la frase y observa la estructura gramatical."};};
 const lessons=d.lessons.map((l,j)=>({title:l[0],objective:l[1],grammar:l[2],vocabIds:l[3].map(i=>vocab[i].id),reviewVocabIds:[],exercises:[mc(vocab[l[3][0]],[vocab[l[3][0]].esp,vocab[(l[3][0]+7)%22].esp,vocab[(l[3][0]+14)%22].esp]),order(vocab[l[3][1]],l[4])]}));
 const exercises=[];
 for(let i=0;i<5;i++){const w=vocab[i];exercises.push(mc(w,[w.esp,vocab[(i+8)%22].esp,vocab[(i+15)%22].esp]));}
 for(let i=0;i<5;i++){const w=vocab[i+5];exercises.push(order(w,w.ex));}
 return {unitNumber:d.n,id:"en_b2_u"+d.n,title:"Unidad "+d.n+": "+d.title,desc:d.desc,grammar:d.grammar,trap:{title:"Precisión y uso",detail:d.trap},vocab,lessons,exercises};
};
root.GUARDI_CURRICULUM_BLOCKS=root.GUARDI_CURRICULUM_BLOCKS||{};
root.GUARDI_CURRICULUM_BLOCKS.en=root.GUARDI_CURRICULUM_BLOCKS.en||{};
root.GUARDI_CURRICULUM_BLOCKS.en.B2=root.GUARDI_CURRICULUM_BLOCKS.en.B2||{};
root.GUARDI_CURRICULUM_BLOCKS.en.B2["21-24"]={units:definitions.map(makeUnit)};
})(typeof window!=="undefined"?window:globalThis);
