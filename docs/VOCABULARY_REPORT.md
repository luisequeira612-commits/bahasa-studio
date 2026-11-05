# Informe local de vocabulario A1+A2

Generado por `node scripts/vocabulary-report.mjs`. Inventario estructural local; no certifica corrección lingüística ni dominio.

## 1. Entradas distintas

| Ámbito | Entradas distintas |
| --- | --- |
| A1 | 301 |
| A2 | 492 |
| Total A1+A2 (unión) | 793 |
| Compartidas A1/A2 | 0 |

La normalización reproduce `getUniqueLearningVocabulary()`: convertir `idn` a texto, aplicar `trim()` y `toLocaleLowerCase()`, excluir valores vacíos y conservar primera aparición. Se incluyen A1 y A2 habilitado del repositorio; no B1/B2. La app también puede incluir lecciones locales IA guardadas en el dispositivo, no disponibles para este informe.

**Comprobación del total mostrado:** 793 calculadas frente a 801 esperadas. **DISCREPANCIA**: el total es 8 menor. A1 aporta 301 frente a 309 comunicadas (−8); A2 coincide en 492. Revisar el origen de las 8 entradas de diferencia. Se reproduce la lógica con datos del repositorio; no se ejecuta navegador ni se leen lecciones locales del dispositivo.

## 2. Entradas nuevas por unidad

Cada forma se atribuye a su primera aparición dentro del nivel. Se marcan unidades con menos de 8 entradas nuevas; no es una cuota pedagógica.

| Nivel | Unidad | Título | Nuevas | Menos de 8 |
| --- | --- | --- | --- | --- |
| A1 | a1_u1 | Unidad 1: Primeras palabras, saludos y pronombres | 10 | — |
| A1 | a1_u2 | Unidad 2: Decir no y construir frases básicas | 8 | — |
| A1 | a1_u3 | Unidad 3: Presentarse y decir de dónde eres | 5 | SÍ (<8) |
| A1 | a1_u4 | Unidad 4: Números y edad | 9 | — |
| A1 | a1_u5 | Unidad 5: Familia y personas | 4 | SÍ (<8) |
| A1 | a1_u6 | Unidad 6: Comida y bebida | 1 | SÍ (<8) |
| A1 | a1_u7 | Unidad 7: Lugares y ubicación | 5 | SÍ (<8) |
| A1 | a1_u8 | Unidad 8: Tiempo, rutina e integración | 5 | SÍ (<8) |
| A1 | a1_u9 | Unidad 9: Números del 11 al 100 | 22 | — |
| A1 | a1_u10 | Unidad 10: Dinero y precios | 12 | — |
| A1 | a1_u11 | Unidad 11: La hora y partes del día | 13 | — |
| A1 | a1_u12 | Unidad 12: Rutina diaria | 9 | — |
| A1 | a1_u13 | Unidad 13: El tiempo y el clima | 8 | — |
| A1 | a1_u14 | Unidad 14: Transporte y desplazamientos | 8 | — |
| A1 | a1_u15 | Unidad 15: Acciones cotidianas | 8 | — |
| A1 | a1_u16 | Unidad 16: Querer, poder y preferencias | 8 | — |
| A1 | a1_u17 | Unidad 17: Tener, haber y preguntas básicas | 7 | SÍ (<8) |
| A1 | a1_u18 | Unidad 18: Esto, aquello y posesión | 11 | — |
| A1 | a1_u19 | Unidad 19: En el restaurante | 14 | — |
| A1 | a1_u20 | Unidad 20: En el mercado y de compras | 9 | — |
| A1 | a1_u21 | Unidad 21: El cuerpo y la salud | 12 | — |
| A1 | a1_u22 | Unidad 22: Ropa y colores | 12 | — |
| A1 | a1_u23 | Unidad 23: Las habitaciones y la casa | 12 | — |
| A1 | a1_u24 | Unidad 24: La escuela y el estudio | 10 | — |
| A1 | a1_u25 | Unidad 25: Aficiones y tiempo libre | 10 | — |
| A1 | a1_u26 | Unidad 26: Cómo llegar a un lugar | 10 | — |
| A1 | a1_u27 | Unidad 27: Invitaciones y planes | 10 | — |
| A1 | a1_u28 | Unidad 28: Viajes y alojamiento | 10 | — |
| A1 | a1_u29 | Unidad 29: Frecuencia y hábitos | 10 | — |
| A1 | a1_u30 | Unidad 30: Pedir ayuda con cortesía | 10 | — |
| A1 | a1_u31 | Unidad 31: Describir personas | 10 | — |
| A1 | a1_u32 | Unidad 32: Conversaciones prácticas | 9 | — |
| A2 | a2_u1 | Unidad 1: Días, meses y fechas | 24 | — |
| A2 | a2_u2 | Unidad 2: Expresar cuándo ocurre una acción | 14 | — |
| A2 | a2_u3 | Unidad 3: Ordenar acontecimientos y contar secuencias | 12 | — |
| A2 | a2_u4 | Unidad 4: Narrar una jornada cotidiana | 10 | — |
| A2 | a2_u5 | Unidad 5: Actividades y acciones con ber- | 12 | — |
| A2 | a2_u6 | Unidad 6: Verbos activos con men- | 12 | — |
| A2 | a2_u7 | Unidad 7: Verbos activos con meng- | 12 | — |
| A2 | a2_u8 | Unidad 8: Verbos activos con mem- y meny- | 12 | — |
| A2 | a2_u9 | Unidad 9: Expresar opiniones y preferencias | 12 | — |
| A2 | a2_u10 | Unidad 10: Normas, permisos y obligaciones | 12 | — |
| A2 | a2_u11 | Unidad 11: Problemas y soluciones | 12 | — |
| A2 | a2_u12 | Unidad 12: Experiencia, capacidades y objetivos | 12 | — |
| A2 | a2_u13 | Unidad 13: Compras, pagos y productos | 12 | — |
| A2 | a2_u14 | Unidad 14: Viajes y transporte | 12 | — |
| A2 | a2_u15 | Unidad 15: Invitaciones y planes | 12 | — |
| A2 | a2_u16 | Unidad 16: Relatar experiencias y vacaciones | 12 | — |
| A2 | a2_u17 | Unidad 17: Salud, consultas y cuidados | 12 | — |
| A2 | a2_u18 | Unidad 18: Vivienda y comunidad | 12 | — |
| A2 | a2_u19 | Unidad 19: Trabajo y vida profesional | 12 | — |
| A2 | a2_u20 | Unidad 20: Medio ambiente y comunidad | 12 | — |
| A2 | a2_u21 | Unidad 21: Cultura y tradiciones | 12 | — |
| A2 | a2_u22 | Unidad 22: Comunicación digital y medios | 12 | — |
| A2 | a2_u23 | Unidad 23: Servicios bancarios y trámites | 12 | — |
| A2 | a2_u24 | Unidad 24: Formación y aprendizaje | 12 | — |
| A2 | a2_u25 | Unidad 25: Cocina y gastronomía | 12 | — |
| A2 | a2_u26 | Unidad 26: Sentimientos y relaciones | 12 | — |
| A2 | a2_u27 | Unidad 27: Vida cívica y espacios públicos | 12 | — |
| A2 | a2_u28 | Unidad 28: Ciencia y tecnología | 12 | — |
| A2 | a2_u29 | Unidad 29: Atención al cliente y compras | 12 | — |
| A2 | a2_u30 | Unidad 30: Arte, cine y espectáculos | 12 | — |
| A2 | a2_u31 | Unidad 31: Excursiones y actividades al aire libre | 12 | — |
| A2 | a2_u32 | Unidad 32: Celebraciones y acontecimientos familiares | 12 | — |
| A2 | a2_u33 | Unidad 33: Regiones y geografía | 12 | — |
| A2 | a2_u34 | Unidad 34: Cortesía y comunicación social | 12 | — |
| A2 | a2_u35 | Unidad 35: Presupuesto y finanzas personales | 12 | — |
| A2 | a2_u36 | Unidad 36: Evaluar opciones y tomar decisiones | 12 | — |
| A2 | a2_u37 | Unidad 37: Emergencias y preparación ante desastres | 12 | — |
| A2 | a2_u38 | Unidad 38: Turismo y alojamiento | 12 | — |
| A2 | a2_u39 | Unidad 39: Trabajo remoto y colaboración digital | 12 | — |
| A2 | a2_u40 | Unidad 40: Resumir, aclarar y responder | 12 | — |

## 3. Palabras simples y expresiones

| Tipo | Criterio | Entradas |
| --- | --- | --- |
| Palabras/formas de un token | Sin espacios internos | 668 |
| Expresiones de varias palabras | Al menos un espacio | 125 |
| Total | Suma | 793 |

Clasificación ortográfica: las expresiones multi-palabra cuentan como una entrada, igual que en la métrica de la app.

## 4. Candidatos morfológicos para revisión manual

**Advertencia:** coincidencias de patrones de texto, NO análisis morfológico ni recuento lingüístico. Incluyen falsos positivos (nombres, préstamos y raíces que empiezan o terminan con esas letras). No interpretar como cobertura de afijos.

### ber- — 37 candidatos

`Berangkat`, `Berapa`, `Berapa harganya?`, `berbagi layar`, `Berbahaya`, `Berbeda`, `Berbelanja`, `Berbicara`, `berdamai`, `Berdiri`, `Berdoa`, `Berenang`, `berfoto`, `berhalangan`, `Berharap`, `Berhasil`, `Berhenti`, `Berikutnya`, `Beristirahat`, `berita`, `Berjalan`, `berjanji`, `berjumpa`, `berkemah`, `Berkumpul`, `Berkunjung`, `Berlari`, `Berlatih`, `Bermain`, `Bernyanyi`, `Bersama`, `Bersantai`, `Bersepeda`, `Bersih`, `bersyukur`, `Bertanya`, `Bertemu`

### meN- — 83 candidatos

`Memakai`, `memanggang`, `Memasak`, `Mematuhi`, `Membaca`, `membandingkan`, `Membantu`, `membatalkan`, `Membawa`, `membayar`, `Membeli`, `Memesan`, `Memilih`, `Meminta`, `Memperbaiki`, `mempertimbangkan`, `Memulai`, `Memutuskan`, `menabung`, `Menari`, `menawar`, `Mencari`, `Mencatat`, `Mencoba`, `Mencuci`, `Mendapat`, `mendarat`, `mendatangi`, `Mendengar`, `mendukung`, `Mendung`, `menemani`, `Menemukan`, `Menetap`, `Mengajak`, `Mengajar`, `Mengambil`, `Mengangkat`, `Mengapa`, `Mengatur`, `Mengembangkan`, `Mengerti`, `mengevaluasi`, `Menggambar`, `Menggoreng`, `Menggunakan`, `Menghapus`, `menghargai`, `menghormati`, `Menghubungi`, `menginap`, `Mengirim`, `mengiris`, `Mengisi`, `mengukus`, `Mengunci`, `Mengundang`, `Mengunjungi`, `mengusulkan`, `Meningkatkan`, `Menit`, `Menjadi`, `Menjaga`, `Menjawab`, `Menjelaskan`, `Menjemput`, `Menjual`, `Menonton`, `Menu`, `Menulis`, `Menunggu`, `Menurut`, `Menutup`, `Menyanyi`, `Menyapu`, `Menyarankan`, `Menyediakan`, `menyela`, `menyenangkan`, `Menyewa`, `Menyikat gigi`, `Menyimpan`, `Menyusun`

### di- — 8 candidatos

`Di mana`, `Di sini`, `Dia`, `Diizinkan`, `Dilarang`, `Dinding`, `Dingin`, `diskon`

### ter- — 8 candidatos

`teras`, `Teratur`, `Terima kasih`, `terjangkau`, `Terlambat`, `Terminal`, `tersinggung`, `tertunda`

### se- — 44 candidatos

`Sebelas`, `Sebelum`, `Sebelumnya`, `Sebentar`, `Sebentar lagi`, `Seberang`, `Sedang`, `Sedikit`, `Segera`, `Sehat`, `Sekarang`, `Sekolah`, `Selalu`, `Selama`, `Selamat datang`, `Selamat pagi`, `Selanjutnya`, `Selasa`, `selat`, `Selesai`, `semalam`, `Sembilan belas`, `Sembilan puluh sembilan`, `Senang`, `Senang bertemu dengan Anda`, `Senang bertemu denganmu`, `Senin`, `Senyum`, `Sepak bola`, `Sepatu`, `Sepeda`, `September`, `Sepuluh`, `Seratus`, `Sering`, `sertifikat`, `sesuai`, `Sesudah`, `sesudahnya`, `Setelah`, `Setelah itu`, `Setengah`, `Setiap hari`, `Setuju`

### ke- — 44 candidatos

`Ke mana`, `keberangkatan`, `kebersihan`, `kebiasaan`, `kebocoran`, `kebutuhan`, `kecamatan`, `Kecewa`, `Kegiatan`, `kegiatan sosial`, `kehadiran`, `Kehilangan`, `keinginan`, `kekeringan`, `kelahiran`, `Kelas`, `kelas daring`, `Keluarga`, `keluhan`, `kelulusan`, `kelurahan`, `Kemampuan`, `kemarin`, `kemasan`, `Kembalian`, `Kemudian`, `kenangan`, `Kenapa`, `kendaraan`, `Kepala`, `kerajinan`, `Kereta`, `kerja bakti`, `kerugian`, `Kerusakan`, `Keselamatan`, `Kesempatan`, `kesepakatan`, `kesepian`, `kesimpulan`, `Keterampilan`, `keterangan`, `Ketika`, `keuntungan`

### -an — 184 candidatos

`adegan`, `adonan`, `Akan`, `Akhir pekan`, `Alasan`, `Aman`, `anggaran`, `angkutan`, `antrean`, `atasan`, `Aturan`, `Bantuan`, `bepergian`, `berhalangan`, `Berjalan`, `Bukan`, `Bulan`, `Bulan depan`, `cicilan`, `contoh tambahan`, `dataran`, `Delapan puluh sembilan`, `Depan`, `Diizinkan`, `halaman`, `hidangan`, `Hujan`, `hutan`, `Ikan`, `ilmuwan`, `jadwal kunjungan`, `Jalan`, `jaringan`, `Kanan`, `Kapan`, `keberangkatan`, `kebersihan`, `kebiasaan`, `kebocoran`, `kebutuhan`, `kecamatan`, `Kegiatan`, `kehadiran`, `Kehilangan`, `keinginan`, `kekeringan`, `kelahiran`, `keluhan`, `kelulusan`, `kelurahan`, `Kemampuan`, `kemasan`, `Kembalian`, `Kemudian`, `kenangan`, `kendaraan`, `kerajinan`, `kerugian`, `Kerusakan`, `Keselamatan`, `Kesempatan`, `kesepakatan`, `kesepian`, `kesimpulan`, `Keterampilan`, `keterangan`, `keuntungan`, `lamaran`, `lampiran`, `laporan`, `Larangan`, `layanan`, `layanan pelanggan`, `liburan`, `Lima puluh delapan`, `lingkungan`, `lowongan`, `lukisan`, `Makan`, `Melanjutkan`, `Melaporkan`, `membandingkan`, `membatalkan`, `Memesan`, `mempertimbangkan`, `Memutuskan`, `Menemukan`, `Mengembangkan`, `Menggunakan`, `mengusulkan`, `Meningkatkan`, `Menjelaskan`, `Menyarankan`, `Menyediakan`, `menyenangkan`, `Menyimpan`, `merencanakan`, `Minggu depan`, `Musim hujan`, `pameran`, `pedalaman`, `pegunungan`, `pelabuhan`, `Pelan-pelan`, `pelanggan`, `pelatihan`, `pemandangan`, `pemasukan`, `pembahasan`, `pembaruan`, `pemborosan`, `pementasan`, `pemeriksaan`, `pemesanan`, `pemulihan`, `penanaman`, `pendaftaran`, `pendakian`, `penegasan`, `penelitian`, `penemuan`, `Pengalaman`, `pengeluaran`, `pengembalian`, `penggantian`, `penginapan`, `pengiriman`, `penyeberangan`, `penyimpanan awan`, `perasaan`, `Peraturan`, `perawatan`, `perbatasan`, `percobaan`, `peresmian`, `peringatan`, `perjalanan`, `perkemahan`, `perlengkapan`, `pernikahan`, `pernyataan`, `persediaan`, `persediaan makanan`, `perselisihan`, `persiapan`, `pertemuan`, `pertimbangan`, `pertunangan`, `pertunjukan`, `Pesan`, `pesanan`, `Pilihan`, `pinjaman`, `pusat bantuan`, `rencana cadangan`, `resep masakan`, `Restoran`, `rincian`, `ringkasan`, `sanggahan`, `sapaan`, `Sarapan`, `Sembilan puluh sembilan`, `siaran`, `Silakan`, `sukarelawan`, `tabungan`, `Tagihan`, `tamu undangan`, `tanaman`, `Tangan`, `tanggapan`, `tarian`, `tautan`, `Teman`, `tempat pengungsian`, `Tujuan`, `ujian`, `Ukuran`, `ulasan`, `undangan`, `unggahan`, `uraian`, `wisatawan`

## 5. Estado de verificación por entrada

Se usa la columna `KBBI_status` de los CSV actuales. Esto no valida por sí solo naturalidad, nivel ni respuestas aceptadas.

### A1 (tracker U24–U32)

| Indicador | Entradas |
| --- | --- |
| Entradas curriculares (registros) | 317 |
| Con registro CSV | 91 |
| Sin registro CSV | 226 |
| not_checked | 57 |
| verified_primary | 34 |
| Filas CSV sin ID curricular correspondiente | 0 |

### A2 (tracker completo)

| Indicador | Entradas |
| --- | --- |
| Entradas curriculares (registros) | 492 |
| Con registro CSV | 492 |
| Sin registro CSV | 0 |
| not_checked | 490 |
| verified_primary | 2 |
| Filas CSV sin ID curricular correspondiente | 0 |

**Cobertura:** A1 U1–U23 carece de tracker; el informe cuenta cada registro curricular A1 sin fila coincidente como “sin registro”. A2 se contrasta por ID. Si un ID aparece duplicado en CSV, la última fila determina su estado y las filas huérfanas se informan aparte.

Estados aprobados para el flujo editorial: `cross_checked_secondary` (dos fuentes secundarias independientes coinciden; no equivale a verificación primaria) y `doubtful`. Este informe no asigna esos estados porque los CSV actuales no aportan evidencia suficiente. Solo revisión humana de fuente primaria permite `verified_primary`.

## 6. Límites y decisiones aplicadas

- Las formas derivadas con ID canónico propio cuentan como entradas; las familias léxicas se reportan aparte. No se calculan familias porque no existe taxonomía morfológica validada por ID.
- `not_checked` solo puede ser respuesta obligatoria si es básica, frecuente y supera las pruebas automáticas. `doubtful` nunca puede ser obligatoria.
- No hay hablante nativo disponible y KBBI oficial requiere iniciar sesión; servicios externos opcionales, nunca bloqueantes.
- El informe no usa red ni modifica currículo, vocabulario, ejercicios, CSV, IndexedDB o backup JSON v3.
