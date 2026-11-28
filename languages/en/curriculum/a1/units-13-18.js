(function(root){
'use strict';
const vocab=(unit,rows)=>rows.map((row,index)=>{const [target,esp,ex,exEsp]=row;return {id:'en_a1_u'+unit+'_v'+String(index+1).padStart(2,'0'),target,esp,ex,exEsp,verification:{status:'not_checked',sources:[]}};});
const mc=(word,prompt,options)=>({vocabId:word.id,type:'mc',prompt,options,answer:0,explanation:'Selecciona el significado correcto.'});
const order=(word,prompt,sentence)=>{const words=sentence.split(' ');return {vocabId:word.id,type:'order',prompt,words,correctOrder:words.slice(),explanation:'Orden básico de la frase.'};};
const lesson=(title,objective,grammar,words,model)=>({title,objective,grammar,vocabIds:words.map(w=>w.id),reviewVocabIds:[],exercises:[mc(words[0],'¿Qué significa «'+words[0].target+'»?',[words[0].esp,words[1].esp,words[2].esp]),order(words[1],'Ordena la frase.',model)]});
const unit=(number,title,desc,grammar,trapTitle,trapDetail,rows,specs,bankModels)=>{
 const words=vocab(number,rows);
 const lessons=specs.map(spec=>lesson(spec[0],spec[1],spec[2],spec[3].map(i=>words[i]),spec[4]));
 const exercises=[];
 for(let i=0;i<5;i++) exercises.push(mc(words[i],'Elige la traducción de «'+words[i].target+'».',[words[i].esp,words[(i+7)%22].esp,words[(i+13)%22].esp]));
 for(let i=0;i<5;i++) exercises.push(order(words[5+i],'Ordena la frase.',bankModels[i]));
 return {unitNumber:number,id:'en_a1_u'+number,title:'Unidad '+number+': '+title,desc,grammar,trap:{title:trapTitle,detail:trapDetail},vocab:words,lessons,exercises};
};
const units=[
unit(13,'Presente simple I: rutinas','Habla de rutinas y hábitos con I, you, we y they en afirmativo.','El presente simple usa la forma base del verbo con I/you/we/they: I work; they study. En afirmativas no se añade do como auxiliar.','No uses -s con I/you/we/they','La -s de tercera persona aparece con he/she/it, no con I/you/we/they: I work, we work.',[
['wake up','despertarse','I wake up at six.','Me despierto a las seis.'],
['get up','levantarse','We get up early.','Nos levantamos temprano.'],
['wash','lavarse / lavar','I wash my face.','Me lavo la cara.'],
['take a shower','ducharse','They take a shower in the morning.','Se duchan por la mañana.'],
['brush','cepillarse','I brush my hair.','Me cepillo el cabello.'],
['get dressed','vestirse','We get dressed quickly.','Nos vestimos rápido.'],
['have breakfast','desayunar','I have breakfast at home.','Desayuno en casa.'],
['leave','salir / irse','They leave at seven.','Salen a las siete.'],
['arrive','llegar','We arrive on time.','Llegamos a tiempo.'],
['start','empezar','I start work at eight.','Empiezo a trabajar a las ocho.'],
['finish','terminar','They finish school at three.','Terminan la escuela a las tres.'],
['study','estudiar','We study English every day.','Estudiamos inglés todos los días.'],
['practice','practicar','I practice after class.','Practico después de clase.'],
['cook','cocinar','We cook at home.','Cocinamos en casa.'],
['clean','limpiar','They clean the kitchen.','Limpian la cocina.'],
['walk','caminar','I walk to school.','Camino a la escuela.'],
['commute','desplazarse al trabajo','We commute by train.','Nos desplazamos al trabajo en tren.'],
['weekday','día laborable','I work on weekdays.','Trabajo los días laborables.'],
['weekend','fin de semana','We relax on the weekend.','Nos relajamos el fin de semana.'],
['early','temprano','They get up early.','Se levantan temprano.'],
['late','tarde','We arrive late sometimes.','A veces llegamos tarde.'],
['routine','rutina','Our routine is simple.','Nuestra rutina es sencilla.']
],[
['Lección 1: Despertarse y levantarse','Describe el inicio de tu día.','Usa la forma base con I/we: I wake up; we get up.',[0,1,19,20],'We get up early.'],
['Lección 2: Aseo y preparación','Habla de acciones personales de la mañana.','El sujeto se expresa normalmente: I wash, we take a shower, they get dressed.',[2,3,4,5],'They take a shower in the morning.'],
['Lección 3: Desayuno y salida','Describe cómo empiezas y sales de casa.','Have breakfast es una expresión fija; el verbo principal va en forma base.',[6,7,8,21],'They leave at seven.'],
['Lección 4: Estudio y trabajo','Expresa horarios sencillos de estudio y trabajo.','Con I/you/we/they se usa study, practice, start y finish sin -s.',[9,10,11,12],'They finish school at three.'],
['Lección 5: Actividades y rutina semanal','Describe tareas y desplazamientos habituales.','El presente simple expresa hábitos; weekday y weekend indican cuándo ocurren.',[13,14,15,16,17,18],'They clean the kitchen.']
],['We get dressed quickly.','I have breakfast at home.','They leave at seven.','We arrive on time.','I start work at eight.']),
unit(14,'Presente simple II: he, she e it','Describe rutinas de otras personas y profesiones usando la tercera persona singular.','Con he/she/it se añade -s o -es al verbo: works, teaches, watches. Algunas formas cambian: study → studies; have → has.','La tercera persona lleva marca verbal','No omitas la terminación en afirmativas: She works. La forma has es irregular; no se dice haves.',[
['doctor','médico / médica','She is a doctor.','Ella es médica.'],
['nurse','enfermero / enfermera','He is a nurse.','Él es enfermero.'],
['engineer','ingeniero / ingeniera','She works as an engineer.','Ella trabaja como ingeniera.'],
['mechanic','mecánico / mecánica','He fixes cars.','Él repara carros.'],
['artist','artista','She paints every day.','Ella pinta todos los días.'],
['manager','gerente','He manages a small team.','Él dirige un equipo pequeño.'],
['receptionist','recepcionista','She answers the phone.','Ella contesta el teléfono.'],
['chef','chef / cocinero profesional','He cooks in a restaurant.','Él cocina en un restaurante.'],
['driver','conductor / conductora','She drives a bus.','Ella conduce un autobús.'],
['cashier','cajero / cajera','He works at a store.','Él trabaja en una tienda.'],
['farmer','agricultor / agricultora','She grows vegetables.','Ella cultiva verduras.'],
['dentist','dentista','He helps his patients.','Él ayuda a sus pacientes.'],
['office','oficina','She works in an office.','Ella trabaja en una oficina.'],
['hospital','hospital','He works at a hospital.','Él trabaja en un hospital.'],
['company','empresa','She works for a company.','Ella trabaja para una empresa.'],
['factory','fábrica','He works in a factory.','Él trabaja en una fábrica.'],
['store','tienda','She opens the store at nine.','Ella abre la tienda a las nueve.'],
['clinic','clínica','He works at a clinic.','Él trabaja en una clínica.'],
['teach','enseñar','She teaches math.','Ella enseña matemáticas.'],
['fix','reparar','He fixes computers.','Él repara computadoras.'],
['grow','cultivar / crecer','She grows flowers.','Ella cultiva flores.'],
['manage','dirigir / gestionar','He manages the office.','Él dirige la oficina.']
],[
['Lección 1: Profesiones y personas','Nombra profesiones y describe quién es alguien.','Usa he/she + is para profesiones: She is a doctor; he is a nurse.',[0,1,2,3],'He is a nurse.'],
['Lección 2: Trabajos y lugares','Relaciona profesiones con lugares de trabajo.','El lugar se introduce con in/at: in an office, at a hospital.',[12,13,14,15],'He works at a hospital.'],
['Lección 3: Verbos en tercera persona','Aplica -s/-es a verbos regulares frecuentes.','La tercera persona singular añade -s/-es: teaches, manages, fixes.',[4,5,6,18,21],'He is a manager and manages a small team.'],
['Lección 4: Servicios y comercios','Describe trabajos en servicios y tiendas.','Con he/she el verbo afirmativo lleva la terminación de tercera persona.',[7,8,9,16,17],'She is a driver and drives a bus.'],
['Lección 5: Actividades y producción','Describe acciones de profesiones diversas.','Fixes, grows y manages muestran cambios ortográficos de tercera persona.',[10,11,19,20],'He is a dentist and helps his patients.']
],['He is a manager.','She is a receptionist.','He is a chef.','She is a driver.','He is a cashier.']),
unit(15,'Presente simple III: negativas','Niega hábitos y rutinas usando don’t y doesn’t.','Usa don’t + verbo base con I/you/we/they y doesn’t + verbo base con he/she/it. Después de doesn’t, el verbo pierde la -s: she doesn’t work.','Después de doesn’t va la forma base','No combines doesn’t con una forma terminada en -s: “doesn’t works” es incorrecto; usa “doesn’t work”.',[
['always','siempre','I always eat breakfast.','Siempre desayuno.'],
['usually','normalmente','She usually walks to work.','Normalmente ella camina al trabajo.'],
['often','a menudo','We often play outside.','A menudo jugamos afuera.'],
['sometimes','a veces','He sometimes cooks dinner.','A veces él prepara la cena.'],
['never','nunca','They never drink coffee.','Nunca toman café.'],
['rarely','raramente','I rarely watch TV.','Rara vez veo televisión.'],
['once','una vez','We exercise once a week.','Hacemos ejercicio una vez por semana.'],
['twice','dos veces','She calls twice a day.','Ella llama dos veces al día.'],
['every week','cada semana','They visit us every week.','Nos visitan cada semana.'],
['exercise','hacer ejercicio','I don’t exercise on Sunday.','No hago ejercicio el domingo.'],
['sleep','dormir','He doesn’t sleep late.','Él no duerme hasta tarde.'],
['visit','visitar','We don’t visit the museum every week.','No visitamos el museo todas las semanas.'],
['play','jugar / tocar','She doesn’t play tennis.','Ella no juega tenis.'],
['travel','viajar','They don’t travel in winter.','No viajan en invierno.'],
['drive','conducir','I don’t drive to work.','No conduzco al trabajo.'],
['stay','quedarse','He doesn’t stay at home.','Él no se queda en casa.'],
['drink','beber / tomar','She doesn’t drink tea.','Ella no toma té.'],
['eat','comer','We don’t eat meat.','No comemos carne.'],
['take a nap','tomar una siesta','I don’t take a nap every day.','No tomo una siesta todos los días.'],
['go out','salir','They don’t go out on weekdays.','No salen los días laborables.'],
['at night','por la noche','He doesn’t work at night.','Él no trabaja por la noche.'],
['habit','hábito','This habit is healthy.','Este hábito es saludable.']
],[
['Lección 1: Frecuencia','Indica con qué frecuencia haces algo.','Los adverbios de frecuencia suelen ir antes del verbo principal: I often walk.',[0,1,2,3,4],'She usually walks to work.'],
['Lección 2: Don’t','Niega hábitos con I, you, we y they.','Don’t + verbo base: we don’t play; they don’t travel.',[9,6,5,7,8],'We don’t exercise once a week; we exercise twice a week.'],
['Lección 3: Doesn’t','Niega hábitos con he, she e it.','Doesn’t + verbo base: she doesn’t play; he doesn’t sleep.',[12,10,11,15],'He doesn’t sleep late.'],
['Lección 4: Comida y actividades','Niega hábitos de comida, bebida y ocio.','Después de don’t/doesn’t el verbo permanece en forma base.',[17,16,14,13],'She doesn’t drink tea.'],
['Lección 5: Hábitos cotidianos','Combina frecuencia, hábitos y expresiones de tiempo.','At night suele aparecer al final; go out funciona como verbo frasal.',[18,19,20,21],'They don’t go out on weekdays.']
],['I rarely watch TV.','We exercise once a week.','She calls twice a day.','They visit us every week.','I don’t exercise on Sunday.']),
unit(16,'Presente simple IV: preguntas','Formula preguntas sobre hábitos, horarios y datos cotidianos con do/does y palabras interrogativas.','Do/does preceden al sujeto en preguntas de presente simple. Con does, el verbo principal va en forma base. Las palabras interrogativas van al inicio.','Do y does no se traducen como verbos','Do/does funcionan como auxiliares en preguntas; no añadas una -s al verbo principal después de does.',[
['when','cuándo','When do you study?','¿Cuándo estudias?'],
['why','por qué','Why does she work here?','¿Por qué trabaja ella aquí?'],
['which','cuál / cuáles','Which class do you like?','¿Qué clase te gusta?'],
['how often','con qué frecuencia','How often do they travel?','¿Con qué frecuencia viajan?'],
['how many','cuántos / cuántas','How many lessons do you have?','¿Cuántas lecciones tienes?'],
['how much','cuánto / cuánta','How much water do you drink?','¿Cuánta agua tomas?'],
['what time','a qué hora','What time does he start?','¿A qué hora empieza él?'],
['question','pregunta','This question is easy.','Esta pregunta es fácil.'],
['answer','respuesta / responder','Her answer is correct.','Su respuesta es correcta.'],
['schedule','horario','My schedule is busy.','Mi horario está ocupado.'],
['appointment','cita','I have an appointment today.','Tengo una cita hoy.'],
['meeting','reunión','The meeting starts at ten.','La reunión empieza a las diez.'],
['lesson','lección','The lesson is short.','La lección es corta.'],
['break','descanso / pausa','We have a break at noon.','Tenemos un descanso al mediodía.'],
['available','disponible','Are you available today?','¿Estás disponible hoy?'],
['busy','ocupado / ocupada','Is she busy now?','¿Está ella ocupada ahora?'],
['free','libre / disponible','Are they free tomorrow?','¿Están libres mañana?'],
['today','hoy','Do you work today?','¿Trabajas hoy?'],
['tomorrow','mañana','Does he study tomorrow?','¿Estudia él mañana?'],
['this afternoon','esta tarde','Do you work this afternoon?','¿Trabajas esta tarde?'],
['date','fecha','What is the date today?','¿Cuál es la fecha de hoy?'],
['calendar','calendario','The calendar is on the wall.','El calendario está en la pared.']
],[
['Lección 1: Preguntar cuándo y por qué','Pregunta por el momento y la razón de una actividad.','When/why + do/does + sujeto + verbo base.',[0,1,7,8],'Why does she work here?'],
['Lección 2: Elegir y cuantificar','Pregunta por opciones y cantidades.','Which + sustantivo; how many con contables y how much con incontables.',[2,4,5,12],'How many lessons do you have?'],
['Lección 3: Horarios y frecuencia','Pregunta por horas y frecuencia.','What time y how often preceden a do/does + sujeto.',[3,6,9,11,13],'What time does he start?'],
['Lección 4: Disponibilidad','Pregunta por citas, reuniones y tiempo libre.','Be se usa en preguntas de estado: Are you available? Do se usa con verbos: Do you work?',[10,14,15,16],'Are you available today?'],
['Lección 5: Fechas y agenda','Habla de hoy, mañana, ayer y fechas.','Today/tomorrow suelen acompañar presente simple para horarios; yesterday normalmente requiere pasado.',[17,18,19,20,21],'Does he study tomorrow?']
],['How much water do you drink?','What time does he start?','This question is easy.','Her answer is correct.','My schedule is busy.']),
unit(17,'La hora, el calendario y las comidas','Expresa horas, días, meses y momentos habituales de comida.','Usa at con horas: at seven o’clock. Los días y meses se escriben con mayúscula. Para horas: o’clock, half past, quarter past y quarter to.','Mayúsculas en días y meses','En inglés los nombres de días y meses llevan mayúscula inicial: Monday, January. No se usa “the” delante del día para una fecha ordinaria.',[
['Monday','lunes','I work on Monday.','Trabajo el lunes.'],
['Tuesday','martes','She studies on Tuesday.','Ella estudia el martes.'],
['Wednesday','miércoles','We meet on Wednesday.','Nos reunimos el miércoles.'],
['Thursday','jueves','He works on Thursday.','Él trabaja el jueves.'],
['Friday','viernes','They travel on Friday.','Ellos viajan el viernes.'],
['Saturday','sábado','The store opens on Saturday.','La tienda abre el sábado.'],
['Sunday','domingo','I rest on Sunday.','Descanso el domingo.'],
['January','enero','My birthday is in January.','Mi cumpleaños es en enero.'],
['February','febrero','February is a short month.','Febrero es un mes corto.'],
['March','marzo','The course starts in March.','El curso empieza en marzo.'],
['April','abril','It rains in April.','Llueve en abril.'],
['May','mayo','We travel in May.','Viajamos en mayo.'],
['June','junio','School ends in June.','La escuela termina en junio.'],
['July','julio','July is warm here.','Julio es cálido aquí.'],
['August','agosto','We visit family in August.','Visitamos a la familia en agosto.'],
['September','septiembre','Classes start in September.','Las clases empiezan en septiembre.'],
['October','octubre','October is a busy month.','Octubre es un mes ocupado.'],
['November','noviembre','My birthday is in November.','Mi cumpleaños es en noviembre.'],
['December','diciembre','December is the last month.','Diciembre es el último mes.'],
['lunch','almuerzo','We have lunch at noon.','Almorzamos al mediodía.'],
['dinner','cena','They have dinner at seven.','Cenan a las siete.'],
['snack','merienda / tentempié','I have a snack in the afternoon.','Como una merienda por la tarde.']
],[
['Lección 1: Días de la semana','Nombra los siete días y habla de actividades semanales.','Usa on con los días: on Monday, on the weekend (uso americano frecuente).',[0,1,2,3,4],'She studies on Tuesday.'],
['Lección 2: Fin de semana','Habla de actividades de sábado y domingo.','Saturday y Sunday llevan mayúscula y suelen ir con on.',[5,6,0,4],'I rest on Sunday.'],
['Lección 3: Meses I','Nombra meses del año y usa in con ellos.','Usa in + mes: in January, in February. Los meses llevan mayúscula.',[7,8,9,10],'February is a short month.'],
['Lección 4: Meses II','Completa el calendario anual.','Usa in + mes para situar eventos: in July, in December.',[11,12,13,14,15,16,17,18],'School ends in June.'],
['Lección 5: Comidas y momentos','Habla del almuerzo, la cena y las meriendas.','At noon indica mediodía; at + hora expresa el momento de una comida.',[19,20,21,2],'They have dinner at seven.']
],['I rest on Saturday.','The store opens on Sunday.','My birthday is in January.','February is a short month.','The course starts in March.']),
unit(18,'Habilidades y permiso con can','Expresa habilidades, posibilidades y permisos sencillos usando can y can’t.','Can + verbo base expresa capacidad o permiso. No cambia con he/she/it y no usa do en preguntas: Can she swim? Can’t expresa incapacidad o prohibición.','Can no lleva to ni -s','Después de can/can’t va la forma base: he can swim, no “he can swims” ni “can to swim”.',[
['swim','nadar','I can swim.','Sé nadar.'],
['dance','bailar','She can dance well.','Ella sabe bailar bien.'],
['sing','cantar','He can sing.','Él sabe cantar.'],
['draw','dibujar','We can draw animals.','Podemos dibujar animales.'],
['run','correr','They can run fast.','Ellos pueden correr rápido.'],
['jump','saltar','The child can jump.','El niño puede saltar.'],
['ride a bike','montar en bicicleta','I can ride a bike.','Sé montar en bicicleta.'],
['speak','hablar','She can speak English.','Ella puede hablar inglés.'],
['understand','entender','We can understand the question.','Podemos entender la pregunta.'],
['remember','recordar','He can remember names.','Él puede recordar nombres.'],
['forget','olvidar','I can’t forget this word.','No puedo olvidar esta palabra.'],
['use','usar','Can I use your phone?','¿Puedo usar tu teléfono?'],
['borrow','pedir prestado','Can I borrow a pen?','¿Puedo pedir prestado un bolígrafo?'],
['open','abrir','Can you open the window?','¿Puedes abrir la ventana?'],
['close','cerrar','She can close the door.','Ella puede cerrar la puerta.'],
['try','intentar / probar','I can try again.','Puedo intentarlo otra vez.'],
['climb','trepar / escalar','They can climb a tree.','Pueden trepar a un árbol.'],
['skate','patinar','He can skate.','Él sabe patinar.'],
['skill','habilidad','Swimming is a useful skill.','Nadar es una habilidad útil.'],
['possible','posible','Is it possible?','¿Es posible?'],
['well','bien','She sings well.','Ella canta bien.'],
['fast','rápido / rápidamente','He can run fast.','Él puede correr rápido.']
],[
['Lección 1: Actividades físicas','Expresa habilidades físicas con can.','Can + verbo base: can swim, can dance, can run.',[0,1,2,3,4],'She can dance well.'],
['Lección 2: Movimiento y deporte','Habla de saltar, montar en bici y patinar.','Can no cambia con el sujeto: she can, they can.',[5,6,16,17],'I can ride a bike.'],
['Lección 3: Idiomas y comprensión','Expresa habilidades para hablar y entender.','Can speak / can understand + objeto o idioma.',[7,8,9,10],'We can understand the question.'],
['Lección 4: Pedir permiso','Pide permiso y solicita objetos de forma sencilla.','Can I…? pregunta por permiso; Can you…? puede pedir ayuda.',[11,12,13,14],'Can I borrow a pen?'],
['Lección 5: Posibilidad y capacidad','Habla de intentos, habilidades y posibilidad.','Can/can’t + verbo base; well y fast describen cómo se realiza la acción.',[15,18,19,20,21],'Swimming is a useful skill.']
],['The child can jump.','I can ride a bike.','She can speak English.','We can understand the question.','He can remember names.'])
];
root.GUARDI_CURRICULUM_BLOCKS=root.GUARDI_CURRICULUM_BLOCKS||{};
root.GUARDI_CURRICULUM_BLOCKS.en=root.GUARDI_CURRICULUM_BLOCKS.en||{};
root.GUARDI_CURRICULUM_BLOCKS.en.A1=root.GUARDI_CURRICULUM_BLOCKS.en.A1||{};
root.GUARDI_CURRICULUM_BLOCKS.en.A1['13-18']={units};
})(typeof window!=='undefined'?window:globalThis);
