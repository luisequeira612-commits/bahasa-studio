(function(root){
'use strict';
const makeVocab=(n,rows)=>rows.map((r,i)=>({id:"en_b2_u"+n+"_v"+String(i+1).padStart(2,"0"),target:r[0],esp:r[1],ex:r[2],exEsp:r[3],verification:{status:"not_checked",sources:[]}}));
const mc=(w,opts)=>{const correct=opts[0];const match=String(w.id).match(/v(\d+)$/);const offset=match?Number(match[1])%opts.length:1;const options=opts.slice(offset).concat(opts.slice(0,offset));return {vocabId:w.id,type:"mc",prompt:"¿Qué significa «"+w.target+"»?",options,answer:options.indexOf(correct),explanation:"Elige la equivalencia que conserva el matiz de la expresión."};};
const order=(w,s)=>{const correctOrder=s.replace(/[.,!?;:]/g,"").trim().split(/\s+/).filter(Boolean);let words=correctOrder.length>1?correctOrder.slice(1).concat(correctOrder.slice(0,1)):correctOrder.slice();if(words.join(" ")===correctOrder.join(" "))words=correctOrder.slice().reverse();return {vocabId:w.id,type:"order",prompt:"Ordena la frase.",words,correctOrder,explanation:"Reconstruye la frase y comprueba cómo funciona la estructura."};};
const build=d=>{
 const vocab=makeVocab(d.n,d.rows);
 const lessons=d.lessons.map(l=>({title:l[0],objective:l[1],grammar:l[2],vocabIds:l[3].map(i=>vocab[i].id),reviewVocabIds:[],exercises:[mc(vocab[l[3][0]],[vocab[l[3][0]].esp,vocab[(l[3][0]+7)%22].esp,vocab[(l[3][0]+14)%22].esp]),order(vocab[l[3][1]],l[4])]}));
 const exercises=[];
 for(let i=0;i<5;i++)exercises.push(mc(vocab[i],[vocab[i].esp,vocab[(i+8)%22].esp,vocab[(i+15)%22].esp]));
 for(let i=0;i<5;i++)exercises.push(order(vocab[i+5],d.bank[i]));
 return {unitNumber:d.n,id:"en_b2_u"+d.n,title:"Unidad "+d.n+": "+d.title,desc:d.desc,grammar:d.grammar,trap:{title:d.trap[0],detail:d.trap[1]},vocab,lessons,exercises};
};
const data=[
{n:11,title:"Deducción y especulación avanzada",desc:"Deduce qué es probable, posible o imposible a partir de indicios, distinguiendo el grado de certeza y la fuerza de la evidencia.",grammar:"Must, may, might, could y can't para deducción presente; be bound to, be unlikely to, presumably y apparently.",trap:["Must no expresa obligación en una deducción","She must be at work (deduzco que está trabajando). You must be at work by nine (obligación). El contexto distingue los usos."],rows:[
["must be","debe de ser / seguramente es","That can't be the correct address; the building number is different.","Las luces están encendidas, así que alguien debe de estar en casa."],
["can't be","no puede ser","That can't be the correct address; the building number is different.","Esa no puede ser la dirección correcta; el número del edificio es diferente."],
["may be","puede que sea","The delay may be due to bad weather.","Puede que el retraso se deba al mal tiempo."],
["might be","quizá sea","The figures might be incomplete.","Quizá las cifras estén incompletas."],
["could be","podría ser","They must have missed the last announcement.","Esta podría ser la fuente del problema."],
["must have","debe de haber","They must have missed the last announcement.","Deben de haberse perdido el último anuncio."],
["can't have","no puede haber","She can't have forgotten the appointment; I reminded her twice.","No puede haber olvidado la cita; se la recordé dos veces."],
["may well","bien puede que","The proposal may well attract further interest.","Bien puede que la propuesta atraiga más interés."],
["might possibly","quizá podría","The change might possibly affect older devices.","Quizá el cambio podría afectar a dispositivos antiguos."],
["be bound to","tener muchas probabilidades de","A decision is bound to cause some disagreement.","Es casi seguro que una decisión causará cierto desacuerdo."],
["be unlikely to","ser poco probable que","The figures are unlikely to improve this quarter.","Es poco probable que las cifras mejoren este trimestre."],
["be highly likely to","ser muy probable que","A decision is bound to cause some disagreement.","Es muy probable que el comité apruebe el plan."],
["apparently","al parecer","Apparently, the office has changed its opening hours.","Al parecer, la oficina ha cambiado su horario."],
["presumably","presumiblemente","Presumably, the missing files were backed up elsewhere.","Presumiblemente, los archivos perdidos tenían una copia en otro lugar."],
["evidently","evidentemente","The team has evidently misunderstood the instructions.","Evidentemente, el equipo ha entendido mal las instrucciones."],
["there is little doubt that","hay pocas dudas de que","There is little doubt that costs will rise.","Hay pocas dudas de que los costos aumentarán."],
["it seems reasonable to assume","parece razonable suponer","It seems reasonable to assume that demand will remain stable.","Parece razonable suponer que la demanda se mantendrá estable."],
["to rule out","descartar","We cannot rule out a technical fault.","No podemos descartar un fallo técnico."],
["to point to","apuntar a / indicar","We cannot rule out a technical fault.","Todas las pruebas apuntan a un problema de software."],
["to suggest","sugerir / indicar","The latest results suggest a gradual recovery.","Los últimos resultados indican una recuperación gradual."],
["to be consistent with","ser compatible con","Her account is consistent with the available evidence.","Su relato es compatible con las pruebas disponibles."],
["to be at odds with","estar en contradicción con","That explanation is at odds with the timeline.","Esa explicación contradice la cronología."]
],lessons:[
["Certeza y deducción presente","Expresa conclusiones firmes basadas en indicios actuales.","Must be y can't be expresan deducciones opuestas; no equivalen a obligación y prohibición en estos contextos.",[0,1,2,3],"That can't be the correct address; the building number is different."],
["Posibilidad y alternativas","Compara distintos grados de posibilidad sin presentar una hipótesis como hecho.","May, might y could expresan posibilidad; el grado exacto depende del contexto y la entonación.",[4,5,6,7],"They must have missed the last announcement."],
["Probabilidad y expectativas","Evalúa si un resultado parece probable o poco probable.","Be bound to y be highly likely to son más fuertes que might; be unlikely to indica baja probabilidad.",[8,9,10,11],"A decision is bound to cause some disagreement."],
["Fuentes e inferencias prudentes","Atribuye una inferencia y deja claro que no es conocimiento directo.","Apparently, presumably y evidently señalan la base o el carácter inferido de la información.",[12,13,14,15],"Presumably, the missing files were backed up elsewhere."],
["Evaluación de evidencia","Contrasta una hipótesis con pruebas y descarta explicaciones.","Point to, suggest, rule out, consistent with y at odds with sirven para evaluar evidencias.",[16,17,18,19,20,21],"We cannot rule out a technical fault."]
],bank:["They must have missed the last announcement.","She can't have forgotten the appointment; I reminded her twice.","The proposal may well attract further interest.","The change might possibly affect older devices.","A decision is bound to cause some disagreement."]},
{n:12,title:"Modales perfectos y evaluación retrospectiva",desc:"Evalúa acciones pasadas para expresar crítica, arrepentimiento, posibilidad, expectativa incumplida o conclusiones sobre lo que pudo ocurrir.",grammar:"Must have, might have, could have, can't have, should have, ought to have, needn't have y was/were supposed to have.",trap:["Could have puede expresar capacidad o posibilidad no realizada","She could have won (tenía la posibilidad, pero no ganó necesariamente). She could have been injured (es posible que se lesionara). El contexto determina la lectura."],rows:[
["should have","debería haber","They ought to have informed us about the change.","Deberías haber revisado las cifras antes de enviar el informe."],
["ought to have","debería haber","They ought to have informed us about the change.","Deberían habernos informado del cambio."],
["shouldn't have","no debería haber","I shouldn't have shared that information.","No debería haber compartido esa información."],
["needn't have","no hacía falta que","You needn't have brought any food; everything was provided.","No hacía falta que trajeras comida; ya estaba todo preparado."],
["didn't need to","no necesitó / no hizo falta","He might have misunderstood the deadline.","No hizo falta reservar porque el local estaba vacío."],
["might have","quizá haya / podría haber","He might have misunderstood the deadline.","Quizá haya entendido mal la fecha límite."],
["couldn't have","no pudo haber / es imposible que haya","They couldn't have completed the audit in one day.","No es posible que hayan completado la auditoría en un solo día."],
["could conceivably have","podría haber llegado a","The email could conceivably have gone to the wrong address.","El correo podría haber llegado a la dirección equivocada."],
["could have","podría haber","We could have avoided the delay with better planning.","Podríamos haber evitado el retraso con una mejor planificación."],
["would have","habría","I would have helped if I had known.","Habría ayudado si lo hubiera sabido."],
["was supposed to have","se suponía que ya había","The repairs were supposed to have been completed by Monday.","Se suponía que las reparaciones ya estarían terminadas para el lunes."],
["was meant to have","se suponía que ya habría","I would have helped if I had known.","Se suponía que el pago ya habría llegado ayer."],
["to regret doing","arrepentirse de haber hecho","She regrets accepting the offer without reading the terms.","Se arrepiente de haber aceptado la oferta sin leer las condiciones."],
["to wish one had","desear haber","I wish I had asked for clarification.","Ojalá hubiera pedido una aclaración."],
["to blame someone for","culpar a alguien por","They blamed the supplier for the delay.","Culparon al proveedor por el retraso."],
["to take responsibility for","asumir la responsabilidad de","The manager took responsibility for the mistake.","El gerente asumió la responsabilidad del error."],
["to be accountable for","ser responsable de","The contractor is accountable for the quality of the work.","El contratista es responsable de la calidad del trabajo."],
["to miss an opportunity","perder una oportunidad","We missed an opportunity to negotiate a better price.","Perdimos la oportunidad de negociar un mejor precio."],
["to make up for","compensar","The team worked late to make up for lost time.","El equipo trabajó hasta tarde para recuperar el tiempo perdido."],
["in hindsight","visto en retrospectiva","We missed an opportunity to negotiate a better price.","Visto en retrospectiva, deberíamos haber esperado."],
["with the benefit of hindsight","con la perspectiva que da el tiempo","With the benefit of hindsight, the warning was obvious.","Con la perspectiva que da el tiempo, la advertencia era evidente."],
["there was no need to","no había necesidad de","There was no need to cancel the entire event.","No había necesidad de cancelar todo el evento."]
],lessons:[
["Crítica y arrepentimiento","Evalúa decisiones pasadas y expresa qué habría sido mejor hacer.","Should have/ought to have para crítica; shouldn't have para acción equivocada.",[0,1,2,3],"They ought to have informed us about the change."],
["Ausencia de necesidad","Distingue una acción innecesaria realizada de una acción que no fue necesaria.","Needn't have + participio implica que se hizo; didn't need to no afirma por sí solo si se hizo.",[4,5,6,7],"He might have misunderstood the deadline."],
["Deducciones sobre el pasado","Expresa conclusiones con distintos grados de certeza sobre hechos pasados.","Must/can't have + participio para deducción; might/could have para posibilidad.",[8,9,10,11],"I would have helped if I had known."],
["Resultados hipotéticos y expectativas","Explica resultados alternativos y expectativas incumplidas.","Would have suele aparecer en condicionales; was supposed to have expresa expectativa previa.",[12,13,14,15],"I wish I had asked for clarification."],
["Responsabilidad y retrospectiva","Explica consecuencias, responsabilidades y oportunidades perdidas.","Regret doing, take responsibility for y in hindsight ayudan a evaluar decisiones.",[16,17,18,19,20,21],"We missed an opportunity to negotiate a better price."]
],bank:["He might have misunderstood the deadline.","They couldn't have completed the audit in one day.","The email could conceivably have gone to the wrong address.","We could have avoided the delay with better planning.","I would have helped if I had known."]},
{n:13,title:"Obligación, necesidad y ausencia de obligación",desc:"Distingue obligación externa, necesidad práctica, recomendación, permiso y ausencia de obligación en registros formales y cotidianos.",grammar:"Must, have to, need to, be required to, be obliged to, should, ought to, don't have to, needn't y mustn't.",trap:["Don't have to no significa mustn't","You don't have to attend (no es obligatorio). You mustn't attend (está prohibido). La diferencia cambia por completo el mensaje."],rows:[
["be required to","estar obligado a / ser requisito","The company is obliged to report the incident.","Se exige que los solicitantes proporcionen dos referencias."],
["be obliged to","estar obligado a","The company is obliged to report the incident.","La empresa está obligada a informar del incidente."],
["have to","tener que","We have to submit the form by Friday.","Tenemos que entregar el formulario antes del viernes."],
["need to","necesitar","You need to update your contact details.","Necesitas actualizar tus datos de contacto."],
["must","deber","All visitors must sign in at reception.","Todos los visitantes deben registrarse en recepción."],
["mustn't","no deber / tener prohibido","You mustn't disclose confidential information.","No debes revelar información confidencial."],
["don't have to","no tener que","You mustn't disclose confidential information.","No tienes que imprimir el documento."],
["needn't","no necesitar","You needn't wait for me.","No necesitas esperarme."],
["be under no obligation to","no tener ninguna obligación de","Customers are under no obligation to renew.","Los clientes no tienen ninguna obligación de renovar."],
["be expected to","esperarse que","Staff are expected to arrive on time.","Se espera que el personal llegue puntual."],
["be supposed to","se supone que debe","You're supposed to keep your receipt.","Se supone que debes guardar el recibo."],
["be allowed to","tener permiso para","Staff are expected to arrive on time.","Los empleados tienen permiso para trabajar a distancia dos veces por semana."],
["be permitted to","estar autorizado a","Visitors are not permitted to enter this area.","Los visitantes no están autorizados a entrar en esta zona."],
["be entitled to","tener derecho a","You are entitled to a full refund.","Tienes derecho a un reembolso completo."],
["be free to","tener libertad para","Participants are free to leave at any time.","Los participantes pueden marcharse cuando quieran."],
["be advisable to","ser aconsejable","You are entitled to a full refund.","Sería aconsejable guardar una copia."],
["be essential to","ser esencial","It is essential to follow the safety procedure.","Es esencial seguir el procedimiento de seguridad."],
["be necessary for","ser necesario para","A valid ID is necessary for entry.","Es necesario presentar una identificación válida para entrar."],
["at one's discretion","a discreción de alguien","Refunds may be granted at the manager's discretion.","Los reembolsos pueden concederse a discreción del gerente."],
["unless otherwise stated","salvo que se indique lo contrario","Payment is due within 30 days unless otherwise stated.","El pago vence en un plazo de 30 días, salvo que se indique lo contrario."],
["in accordance with","de conformidad con","The process must be carried out in accordance with the policy.","El proceso debe llevarse a cabo de conformidad con la política."],
["to comply with","cumplir con","Payment is due within 30 days unless otherwise stated.","Todos los proveedores deben cumplir con las normas de seguridad."]
],lessons:[
["Obligación y requisito externo","Expresa normas y obligaciones impuestas por una autoridad o situación.","Must suele expresar obligación fuerte del hablante o norma; have to y be required to presentan necesidad externa.",[0,1,2,3],"The company is obliged to report the incident."],
["Prohibición y ausencia de obligación","Separa claramente lo prohibido de lo opcional.","Mustn't expresa prohibición; don't have to y needn't expresan ausencia de obligación.",[4,5,6,7],"You mustn't disclose confidential information."],
["Expectativa, permiso y derecho","Describe lo que se espera, permite o reconoce como derecho.","Be supposed to y be expected to son expectativas; be allowed/permitted/entitled to expresan permiso o derecho.",[8,9,10,11],"Staff are expected to arrive on time."],
["Recomendación y necesidad","Matiza recomendaciones y requisitos imprescindibles.","It is advisable/essential/necessary to permite graduar la fuerza de una recomendación.",[12,13,14,15],"Visitors are not permitted to enter this area."],
["Lenguaje normativo y cumplimiento","Interpreta cláusulas y reglas en contextos profesionales.","At one's discretion, unless otherwise stated, in accordance with y comply with son frecuentes en normas y políticas.",[16,17,18,19,20,21],"A valid ID is necessary for entry."]
],bank:["You mustn't disclose confidential information.","You don't have to print the document.","You needn't wait for me.","Customers are under no obligation to renew.","Staff are expected to arrive on time."]},
{n:14,title:"Probabilidad, certeza y expectativa",desc:"Gradúa afirmaciones, interpreta probabilidades y comunica expectativas sin confundir evidencia, predicción y certeza.",grammar:"Adjetivos y adverbios de probabilidad; likely, unlikely, bound, certain, probable; probability phrases y patrones con infinitivo o that-clause.",trap:["Likely y probably no siguen el mismo patrón","It is likely that prices will rise / Prices are likely to rise. Probably suele modificar la cláusula: Prices will probably rise."],rows:[
["likely to","probable que","The team is unlikely to finish today.","Es probable que la nueva política reduzca los costos."],
["unlikely to","poco probable que","The team is unlikely to finish today.","Es poco probable que el equipo termine hoy."],
["highly likely","muy probable","A delay is highly likely given the weather.","Es muy probable que haya un retraso dadas las condiciones meteorológicas."],
["almost certain to","casi seguro que","The changes are almost certain to affect smaller firms.","Es casi seguro que los cambios afectarán a las empresas pequeñas."],
["bound to","seguro que / destinado a","Someone is bound to notice the difference.","Alguien seguramente notará la diferencia."],
["it is probable that","es probable que","It is probable that demand will increase.","Es probable que la demanda aumente."],
["there is a strong possibility that","hay una gran posibilidad de que","It is probable that demand will increase.","Hay una gran posibilidad de que el lanzamiento se retrase."],
["there is a slight chance that","hay una pequeña posibilidad de que","There is a slight chance that we may need extra staff.","Hay una pequeña posibilidad de que necesitemos personal adicional."],
["in all likelihood","con toda probabilidad","She will more than likely accept the invitation.","Con toda probabilidad, la reunión se pospondrá."],
["more than likely","muy probablemente","She will more than likely accept the invitation.","Lo más probable es que acepte la invitación."],
["by all accounts","según todos los indicios","By all accounts, the event was a success.","Según todos los indicios, el evento fue un éxito."],
["to be expected to","esperarse que","The figures are expected to improve next year.","Se espera que las cifras mejoren el próximo año."],
["to be forecast to","preverse que","The population is projected to grow steadily.","Se prevé que las ventas aumenten un cinco por ciento."],
["to be projected to","proyectarse que","The population is projected to grow steadily.","Se proyecta que la población crezca de forma constante."],
["to stand a good chance of","tener buenas posibilidades de","The proposal stands a good chance of being approved.","La propuesta tiene buenas posibilidades de ser aprobada."],
["it is unlikely that","ser poco probable que","It is unlikely that the road will reopen today.","Es poco probable que la carretera vuelva a abrir hoy."],
["to be on course to","ir camino de","The company is on course to meet its annual target.","La empresa va camino de alcanzar su objetivo anual."],
["to fall short of","no alcanzar","The final result fell short of expectations.","El resultado final no alcanzó las expectativas."],
["to exceed expectations","superar las expectativas","The service has exceeded expectations so far.","El servicio ha superado las expectativas hasta ahora."],
["to meet expectations","cumplir las expectativas","The candidate met most of our expectations.","El candidato cumplió la mayoría de nuestras expectativas."],
["to expect","esperar","We expect a gradual increase in demand.","Esperamos un aumento gradual de la demanda."],
["to be subject to change","estar sujeto a cambios","All dates are subject to change.","Todas las fechas están sujetas a cambios."]
],lessons:[
["Probabilidad con adjetivos","Formula predicciones usando likely, unlikely y estructuras con be.","Be likely/unlikely to + infinitivo; it is likely that + oración.",[0,1,2,3],"The team is unlikely to finish today."],
["Certeza y fuerza de la afirmación","Gradúa una predicción desde posibilidad hasta casi certeza.","Bound to y almost certain to son fuertes; evita presentarlos como certeza absoluta cuando son predicciones.",[4,5,6,7],"It is probable that demand will increase."],
["Expresiones de expectativa","Comunica expectativas con adverbios y expresiones de atribución.","In all likelihood, more than likely y by all accounts modifican la fuerza o fuente de una afirmación.",[8,9,10,11],"She will more than likely accept the invitation."],
["Pronósticos y proyecciones","Interpreta predicciones oficiales y estimaciones.","Be expected/forecast/projected to suelen atribuir el pronóstico a una fuente o modelo.",[12,13,14,15],"Sales are forecast to rise by five percent."],
["Resultados frente a expectativas","Compara previsiones, objetivos y resultados observados.","Stand a good chance of + -ing; fall short of, exceed y meet expectations describen resultados.",[16,17,18,19,20,21],"The final result fell short of expectations."]
],bank:["It is probable that demand will increase.","There is a strong possibility that the launch will be delayed.","There is a slight chance that we may need extra staff.","In all likelihood, the meeting will be postponed.","She will more than likely accept the invitation."]}
];
root.GUARDI_CURRICULUM_BLOCKS=root.GUARDI_CURRICULUM_BLOCKS||{};
root.GUARDI_CURRICULUM_BLOCKS.en=root.GUARDI_CURRICULUM_BLOCKS.en||{};
root.GUARDI_CURRICULUM_BLOCKS.en.B2=root.GUARDI_CURRICULUM_BLOCKS.en.B2||{};
root.GUARDI_CURRICULUM_BLOCKS.en.B2["11-14"]={units:data.map(build)};
})(typeof window!=="undefined"?window:globalThis);
