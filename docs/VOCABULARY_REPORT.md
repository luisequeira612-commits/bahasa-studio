# Informe local de vocabulario A1+A2

Generado por `node scripts/vocabulary-report.mjs`. Inventario estructural local; no certifica corrección lingüística ni dominio.

## 1. Entradas distintas

| Ámbito | Entradas distintas |
| --- | --- |
| A1 | 253 |
| A2 | 60 |
| Total A1+A2 (unión) | 313 |
| Compartidas A1/A2 | 0 |

La normalización reproduce `getUniqueLearningVocabulary()`: convertir `idn` a texto, aplicar `trim()` y `toLocaleLowerCase()`, excluir valores vacíos y conservar primera aparición. El informe se limita al currículo A1/A2 del repositorio. La app puede incluir lecciones locales IA guardadas en el dispositivo; esas entradas no se encuentran en los archivos del repositorio.

**Comprobación del total mostrado:** 313 calculadas frente a 801 esperadas. **DISCREPANCIA**: revisar currículo o cifra esperada. Se reproduce la lógica con los datos curriculares; no se ejecuta navegador ni se leen lecciones locales del dispositivo.

**Discrepancia estructural importante:** los archivos curriculares de `main` contienen actualmente 26 unidades A1 (faltan U12–U17) y 4 unidades A2 (U1–U4), no las 32 y 40 comunicadas como estado del curso. El tracker A2 conserva 492 filas, pero 432 IDs no aparecen en el currículo A2 actual. Por eso el inventario del repositorio arroja 253 formas A1 + 60 A2 = 313, no 309 + 492 = 801. Este informe no corrige ni reconstruye contenido; hace visible la diferencia para investigarla en un PR separado antes de añadir vocabulario.

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

## 3. Palabras simples y expresiones

| Tipo | Criterio | Entradas |
| --- | --- | --- |
| Palabras/formas de un token | Sin espacios internos | 261 |
| Expresiones de varias palabras | Al menos un espacio | 52 |
| Total | Suma | 313 |

Clasificación ortográfica: las expresiones multi-palabra cuentan como una entrada, igual que en la métrica de la app.

## 4. Candidatos morfológicos para revisión manual

**Advertencia:** coincidencias de patrones de texto, NO análisis morfológico ni recuento lingüístico. Incluyen falsos positivos (nombres, préstamos y raíces que empiezan o terminan con esas letras). No interpretar como cobertura de afijos.

### ber- — 10 candidatos

`Berapa`, `Berapa harganya?`, `Berbelanja`, `Berenang`, `Berikutnya`, `Beristirahat`, `Berjalan`, `Bermain`, `Bersih`, `Bertemu`

### meN- — 14 candidatos

`Membaca`, `Menari`, `Mengajak`, `Mengapa`, `Mengerti`, `Mengunjungi`, `Menit`, `Menjawab`, `Menonton`, `Menu`, `Menulis`, `Menyanyi`, `Menyapu`, `Menyikat gigi`

### di- — 4 candidatos

`Di mana`, `Di sini`, `Dia`, `Dinding`

### ter- — 3 candidatos

`Teratur`, `Terima kasih`, `Terlambat`

### se- — 34 candidatos

`Sebelas`, `Sebelum`, `Sebelumnya`, `Sebentar`, `Sebentar lagi`, `Seberang`, `Sedang`, `Sehat`, `Sekarang`, `Sekolah`, `Selalu`, `Selama`, `Selamat datang`, `Selamat pagi`, `Selanjutnya`, `Selasa`, `Selesai`, `Sembilan belas`, `Sembilan puluh sembilan`, `Senang bertemu dengan Anda`, `Senang bertemu denganmu`, `Senin`, `Senyum`, `Sepak bola`, `Sepatu`, `September`, `Sepuluh`, `Seratus`, `Sering`, `Sesudah`, `Setelah`, `Setelah itu`, `Setengah`, `Setiap hari`

### ke- — 8 candidatos

`Ke mana`, `Kegiatan`, `Kelas`, `Keluarga`, `Kembalian`, `Kemudian`, `Kepala`, `Ketika`

### -an — 28 candidatos

`Akan`, `Akhir pekan`, `Bantuan`, `Berjalan`, `Bukan`, `Bulan`, `Bulan depan`, `Delapan puluh sembilan`, `Depan`, `Ikan`, `Jalan`, `Kanan`, `Kegiatan`, `Kembalian`, `Kemudian`, `Lima puluh delapan`, `Makan`, `Minggu depan`, `Musim hujan`, `Pelan-pelan`, `Pesan`, `Restoran`, `Sembilan puluh sembilan`, `Silakan`, `Tagihan`, `Tangan`, `Teman`, `Ukuran`

## 5. Estado de verificación por entrada

Se usa la columna `KBBI_status` de los CSV actuales. Esto no valida por sí solo naturalidad, nivel ni respuestas aceptadas.

### A1 (tracker U24–U32)

| Indicador | Entradas |
| --- | --- |
| Entradas curriculares | 268 |
| Con registro CSV | 91 |
| Sin registro CSV | 177 |
| not_checked | 57 |
| verified_primary | 34 |
| Filas CSV sin ID curricular correspondiente | 0 |

### A2 (tracker completo)

| Indicador | Entradas |
| --- | --- |
| Entradas curriculares | 60 |
| Con registro CSV | 60 |
| Sin registro CSV | 0 |
| not_checked | 58 |
| verified_primary | 2 |
| Filas CSV sin ID curricular correspondiente | 432 |

**Cobertura:** A1 U1–U23 carece de tracker; toda entrada A1 sin fila coincidente se cuenta como “sin registro”. A2 se contrasta por ID. Si un ID aparece duplicado en CSV, la última fila determina su estado y las filas huérfanas se informan aparte.

Estados aprobados para el flujo editorial: `cross_checked_secondary` (dos fuentes secundarias independientes coinciden; no equivale a verificación primaria) y `doubtful`. Este informe no asigna esos estados porque los CSV actuales no aportan evidencia suficiente. Solo revisión humana de fuente primaria permite `verified_primary`.

## 6. Límites y decisiones aplicadas

- Las formas derivadas con ID canónico propio cuentan como entradas; las familias léxicas se reportan aparte. No se calculan familias porque no existe taxonomía morfológica validada por ID.
- `not_checked` solo puede ser respuesta obligatoria si es básica, frecuente y supera las pruebas automáticas. `doubtful` nunca puede ser obligatoria.
- No hay hablante nativo disponible y KBBI oficial requiere iniciar sesión; servicios externos opcionales, nunca bloqueantes.
- El informe no usa red ni modifica currículo, vocabulario, ejercicios, CSV, IndexedDB o backup JSON v3.
