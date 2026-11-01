(function (root) {
    'use strict';
    const tasks = Object.freeze([
        {
            id: 'profile',
            level: 'A1',
            title: 'Un pequeño perfil de una amistad',
            situation: 'Escribe un perfil breve de una persona que conoces. Incluye su nombre, dos características físicas o de personalidad y una afición. Intenta escribir tres o cuatro frases.',
            checklist: ['Mencioné quién es la persona y cómo se llama.', 'Incluí al menos dos características.', 'Añadí una afición o actividad que le gusta.', 'Separé las ideas en frases claras.'],
            example: 'Teman saya bernama Rina. Dia tinggi dan ramah. Rambutnya panjang. Dia suka membaca buku.'
        },
        {
            id: 'travel',
            level: 'A1',
            title: 'Mi diario de viaje',
            situation: 'Imagina que acabas de llegar a una ciudad. Escribe una nota breve sobre dónde estás, cuándo llegaste, qué llevas y adónde irás después. Intenta escribir tres o cuatro frases.',
            checklist: ['Dije dónde estoy.', 'Mencioné cuándo llegué o cuándo saldré.', 'Incluí un objeto de viaje o equipaje.', 'Expliqué cuál será mi siguiente destino.'],
            example: 'Hari ini saya di hotel. Saya tiba pukul tiga. Koper saya ada di kamar. Besok saya pergi ke pantai naik bus.'
        },
        {
            id: 'directions',
            level: 'A1',
            title: 'Una nota para indicar el camino',
            situation: 'Un amigo quiere visitar una tienda cerca de tu casa. Escríbele indicaciones sencillas: por dónde caminar, dónde girar y qué lugar verá. Intenta escribir tres o cuatro frases.',
            checklist: ['Indiqué desde dónde debe empezar.', 'Usé una instrucción para seguir o girar.', 'Mencioné izquierda o derecha.', 'Expliqué qué lugar encontrará.'],
            example: 'Dari rumah saya, berjalan lurus. Belok kiri di jalan besar. Toko ada di sebelah kanan. Toko itu dekat sekolah.'
        },
        {
            id: 'budget',
            level: 'A2',
            title: 'Mi presupuesto personal',
            situation: 'Explica cómo organizas tu presupuesto: qué registras, qué priorizas y para qué ahorras. Intenta escribir cinco o seis frases y conecta tus ideas.',
            vocabulary: ['anggaran', 'bulan', 'pemasukan', 'pengeluaran', 'mencatat', 'menabung', 'dana darurat', 'kebutuhan', 'prioritas', 'pemborosan'],
            checklist: ['Expliqué cuál es mi presupuesto.', 'Mencioné ingresos y gastos.', 'Dije para qué ahorro.', 'Expliqué qué considero una prioridad.', 'Conecté las ideas en cinco o seis frases.'],
            example: 'Saya punya anggaran untuk bulan ini. Saya mencatat pemasukan dan pengeluaran. Saya menabung untuk dana darurat. Saya memilih kebutuhan sebagai prioritas. Pemborosan bukan prioritas saya.'
        },
        {
            id: 'online-meeting',
            level: 'A2',
            title: 'Una reunión de trabajo en línea',
            situation: 'Describe una reunión en línea desde el inicio hasta el final. Menciona las herramientas que utilizas, los archivos que compartes y qué haces después. Intenta escribir cinco o seis frases.',
            vocabulary: ['rapat daring', 'konferensi video', 'berbagi layar', 'dokumen bersama', 'tautan', 'lampiran', 'mengirim', 'unduh', 'penyimpanan awan', 'pembaruan'],
            checklist: ['Expliqué cuándo y por qué hay una reunión.', 'Mencioné la videoconferencia.', 'Describí cómo comparto pantalla o documentos.', 'Incluí un enlace o archivo adjunto.', 'Conté qué hago después de la reunión.'],
            example: 'Hari ini kami ada rapat daring. Kami menggunakan konferensi video. Saya berbagi layar dan membuka dokumen bersama. Saya mengirim tautan dan lampiran. Setelah rapat, saya unduh dokumen dari penyimpanan awan. Saya melihat pembaruan.'
        },
        {
            id: 'compare-decisions',
            level: 'A2',
            title: 'Comparar opciones y tomar una decisión',
            situation: 'Compara dos opciones. Explica sus ventajas, riesgos o consecuencias y termina con una conclusión clara. Intenta escribir cinco a siete frases.',
            vocabulary: ['alternatif', 'mempertimbangkan', 'mengevaluasi', 'risiko', 'keuntungan', 'kerugian', 'konsekuensi', 'kesimpulan', 'memilih', 'tujuan', 'menjelaskan', 'langkah berikutnya'],
            checklist: ['Presenté dos alternativas.', 'Mencioné una ventaja y una desventaja.', 'Expliqué al menos un riesgo o consecuencia.', 'Justifiqué mi elección.', 'Terminé con una conclusión y el siguiente paso.'],
            example: 'Saya mempertimbangkan dua alternatif. Saya mengevaluasi risiko dan keuntungan. Saya juga melihat kerugian dan konsekuensi. Menurut saya, alternatif pertama sesuai dengan tujuan. Saya memilih alternatif pertama. Saya menjelaskan langkah berikutnya.'
        },
    ]);
    function isA1Complete() {
        const app = root.App;
        const levels = root.CourseData && root.CourseData.levels;
        const a1 = Array.isArray(levels) ? levels.find(level => level && level.id === 'A1') : null;
        if (!a1 || !Array.isArray(a1.units) || !Array.isArray(app && app.completedUnits)) return false;
        return a1.units.length > 0 && a1.units.every(unit =>
            unit && typeof unit.id === 'string' && app.completedUnits.includes(unit.id));
    }
    function make(tag, text, className) {
        const node = document.createElement(tag);
        if (text !== undefined) node.textContent = text;
        if (className) node.className = className;
        return node;
    }
    const WritingPractice = {
        tasks,
        getAvailableTasks() {
            const a1Complete = isA1Complete();
            return tasks.filter(task => task.level === 'A1' || (task.level === 'A2' && a1Complete));
        },
        getTask(taskId) {
            return this.getAvailableTasks().find(task => task.id === taskId) || null;
        },
        showView(viewId) {
            document.querySelectorAll('.app-view').forEach(view => view.classList.remove('active'));
            document.querySelectorAll('.nav-btn').forEach(button => button.classList.remove('active'));
            const view = document.getElementById('view-' + viewId);
            if (view) view.classList.add('active');
            if (viewId === 'route') {
                const courseButton = document.querySelector('.nav-btn');
                if (courseButton) courseButton.classList.add('active');
            }
        },
        open() {
            this.renderList();
            this.showView('writing-practice');
        },
        close() {
            this.showView('route');
        },
        renderList() {
            const host = document.getElementById('writingPracticeContent');
            if (!host) return;
            host.replaceChildren();
            host.appendChild(make('p', 'Escritura progresiva A1–A2: empieza con tres o cuatro frases y avanza hacia textos de cinco a siete. No se califican ni modifican tu XP o SRS.', 'text-muted'));
            const availableTasks = this.getAvailableTasks();
            availableTasks.forEach(task => {
                const card = make('section', undefined, 'card');
                const heading = make('h3', task.level + ' · ' + task.title);
                const description = make('p', task.situation);
                description.style.color = 'var(--text-muted)';
                const button = make('button', 'Empezar a escribir');
                button.type = 'button';
                button.className = 'btn';
                button.addEventListener('click', () => this.renderTask(task.id));
                card.append(heading, description, button);
                host.appendChild(card);
            });
            if (!isA1Complete()) {
                host.appendChild(make('p', 'Completa las 32 unidades de A1 para desbloquear las situaciones de escritura A2.', 'text-muted'));
            }
        },
        renderTask(taskId) {
            const task = this.getTask(taskId);
            const host = document.getElementById('writingPracticeContent');
            if (!task || !host) return;
            host.replaceChildren();
            const back = make('button', 'Ver otras situaciones');
            back.type = 'button';
            back.className = 'btn btn-outline btn-sm';
            back.addEventListener('click', () => this.renderList());
            const levelLabel = make('p', task.level + ' · Escritura progresiva', 'text-muted');
            const heading = make('h3', task.title);
            const situation = make('p', task.situation);
            const label = make('label', 'Tu borrador en indonesio');
            label.htmlFor = 'freeWritingDraft';
            const textarea = make('textarea');
            textarea.id = 'freeWritingDraft';
            textarea.className = 'input-field';
            textarea.rows = 6;
            textarea.maxLength = 2000;
            textarea.placeholder = 'Escribe aquí tus propias frases…';
            const checklistHeading = make('h4', 'Antes de terminar, revisa tu texto');
            const checklist = make('div');
            checklist.className = 'writing-self-review';
            const checklistStatus = make('p', '0 de ' + task.checklist.length + ' criterios revisados.', 'text-muted');
            checklistStatus.setAttribute('role', 'status');
            checklistStatus.setAttribute('aria-live', 'polite');
            let checkedItems = 0;
            task.checklist.forEach((item, index) => {
                const row = make('label', item);
                row.style.display = 'flex';
                row.style.alignItems = 'center';
                row.style.gap = '10px';
                row.style.padding = '8px 0';
                const checkbox = make('input');
                checkbox.type = 'checkbox';
                checkbox.id = 'writingCheck-' + index;
                checkbox.addEventListener('change', () => {
                    checkedItems += checkbox.checked ? 1 : -1;
                    checklistStatus.textContent = checkedItems + ' de ' + task.checklist.length + ' criterios revisados.';
                });
                row.appendChild(checkbox);
                checklist.appendChild(row);
            });
            const note = make('p', 'No corregimos ni puntuamos automáticamente el texto. Las listas sirven para revisar si respondiste a la situación; puede haber otras respuestas válidas.', 'text-muted');
            const reveal = make('button', 'Mostrar ejemplo orientativo');
            let practiceRecorded = false;
            reveal.type = 'button';
            reveal.className = 'btn btn-outline';
            const status = make('p', '');
            status.setAttribute('role', 'status');
            status.setAttribute('aria-live', 'polite');
            const example = make('section');
            example.hidden = true;
            example.className = 'card';
            example.append(make('h4', 'Un ejemplo posible'), make('p', task.example),
                make('p', 'Es solo una referencia, no una respuesta única ni una corrección de tu borrador. El contenido es orientativo y no ha sido validado por un hablante nativo.', 'text-muted'));
            reveal.addEventListener('click', () => {
                if (!textarea.value.trim()) {
                    status.textContent = 'Escribe primero un borrador; después podrás compararlo con el ejemplo.';
                    textarea.focus();
                    return;
                }
                example.hidden = false;
                status.textContent = 'Ejemplo visible. Compara las ideas y la claridad; no se ha asignado ninguna nota.';
                if (!practiceRecorded && typeof App !== 'undefined' && typeof App.recordSkillSession === 'function') {
                    practiceRecorded = true;
                    App.recordSkillSession('writing').catch(error => console.error('No se pudo registrar la práctica de escritura:', error));
                }
            });
            const disclaimer = make('p', 'Sin nota, sin XP ni registro SRS. Solo se cuenta una sesión al comparar tu borrador con el ejemplo; el texto no se guarda ni se incluye en las copias de seguridad.', 'text-muted');
            host.append(back, levelLabel, heading, situation, label, textarea, checklistHeading, checklist, checklistStatus, note, reveal, status, example, disclaimer);
        }
    };
    root.WritingPractice = WritingPractice;
})(typeof window !== 'undefined' ? window : globalThis);
