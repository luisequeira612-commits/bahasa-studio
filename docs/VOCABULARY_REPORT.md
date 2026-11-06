# Informe local de vocabulario A1+A2 — PR2

Clasificación estructural adicional. No modifica el inventario ni certifica corrección lingüística.

## 1. Conteo base

| Nivel | Entradas distintas |
| --- | ---: |
| A1 | 309 |
| A2 | 492 |
| Total | 801 |
| Compartidas A1/A2 | 0 |

**Comprobación:** 801 calculadas frente a 801 esperadas. **COINCIDE**.

La normalización reproduce la lógica de getUniqueLearningVocabulary(): idn, trim(), toLocaleLowerCase(), exclusión de vacíos y primera aparición.

## 2. Expresiones: 125 entradas multi-palabra

| Grupo | Criterio | Cantidad |
| --- | --- | ---: |
| Frases completas | Terminan en ?/. o tienen 4+ tokens | 3 |
| Colocaciones/expresiones cortas | 2–3 tokens, no numéricas | 103 |
| Compuestos numéricos | Solo tokens numéricos (belas, puluh, ratus, ribu y unidades) | 19 |
| **Total** | | **125** |

### Frases completas

- Apa kabar? — a1_u1 (v465)
- Berapa harganya? — a1_u6 (v115)
- Senang bertemu dengan Anda — a1_u32 (v470)

### Colocaciones o expresiones cortas

- Selamat pagi — a1_u1 (v4)
- Terima kasih — a1_u1 (v45)
- Senang bertemu denganmu — a1_u3 (v14)
- Di mana — a1_u7 (v32)
- Di sini — a1_u7 (v34)
- Hari ini — a1_u8 (v36)
- Setiap hari — a1_u8 (v44)
- Tidak ada — a1_u17 (v303)
- Nasi goreng — a1_u19 (v324)
- Satu kilo — a1_u20 (v344)
- Kamar mandi — a1_u23 (v375)
- Tempat tidur — a1_u23 (v380)
- Sepak bola — a1_u25 (v398)
- Akhir pekan — a1_u25 (v402)
- Malam ini — a1_u27 (v423)
- Menyikat gigi — a1_u29 (v441)
- Tidak mengerti — a1_u30 (v452)
- Sampai jumpa — a1_u32 (v469)
- Ke mana — a1_u32 (v473)
- Selamat datang — a1_u32 (v474)
- Musim hujan — a2_u1 (a2u1_musim_hujan)
- Musim kemarau — a2_u1 (a2u1_musim_kemarau)
- Tadi pagi — a2_u2 (a2u2_tadi_pagi)
- Tadi malam — a2_u2 (a2u2_tadi_malam)
- Baru saja — a2_u2 (a2u2_baru_saja)
- Sebentar lagi — a2_u2 (a2u2_sebentar_lagi)
- Minggu depan — a2_u2 (a2u2_minggu_depan)
- Minggu lalu — a2_u2 (a2u2_minggu_lalu)
- Bulan lalu — a2_u2 (a2u2_bulan_lalu)
- Bulan depan — a2_u2 (a2u2_bulan_depan)
- Setelah itu — a2_u3 (a2u3_setelah_itu)
- Tidak setuju — a2_u9 (a2u9_tidak_setuju)
- pusat belanja — a2_u13 (a2u13_pusat_belanja)
- pada akhirnya — a2_u16 (a2u16_pada_akhirnya)
- tekanan darah — a2_u17 (a2u17_tekanan_darah)
- saluran air — a2_u18 (a2u18_saluran_air)
- ruang tamu — a2_u18 (a2u18_ruang_tamu)
- pemilik rumah — a2_u18 (a2u18_pemilik_rumah)
- rekan kerja — a2_u19 (a2u19_rekan_kerja)
- pengalaman kerja — a2_u19 (a2u19_pengalaman_kerja)
- daur ulang — a2_u20 (a2u20_daur_ulang)
- hemat energi — a2_u20 (a2u20_hemat_energi)
- kerja bakti — a2_u20 (a2u20_kerja_bakti)
- penghematan air — a2_u20 (a2u20_penghematan_air)
- pakaian adat — a2_u21 (a2u21_pakaian_adat)
- musik tradisional — a2_u21 (a2u21_musik_tradisional)
- warisan budaya — a2_u21 (a2u21_warisan_budaya)
- media sosial — a2_u22 (a2u22_media_sosial)
- pesan suara — a2_u22 (a2u22_pesan_suara)
- kata sandi — a2_u22 (a2u22_kata_sandi)
- kartu debit — a2_u23 (a2u23_kartu_debit)
- biaya admin — a2_u23 (a2u23_biaya_admin)
- kelas daring — a2_u24 (a2u24_kelas_daring)
- resep masakan — a2_u25 (a2u25_resep_masakan)
- rasa pedas — a2_u25 (a2u25_rasa_pedas)
- percaya diri — a2_u26 (a2u26_percaya_diri)
- balai kota — a2_u27 (a2u27_balai_kota)
- fasilitas umum — a2_u27 (a2u27_fasilitas_umum)
- taman kota — a2_u27 (a2u27_taman_kota)
- rambu lalu lintas — a2_u27 (a2u27_rambu_lalu_lintas)
- kegiatan sosial — a2_u27 (a2u27_kegiatan_sosial)
- layar sentuh — a2_u28 (a2u28_layar_sentuh)
- pengisian daya — a2_u28 (a2u28_pengisian_daya)
- data pribadi — a2_u28 (a2u28_data_pribadi)
- layanan pelanggan — a2_u29 (a2u29_layanan_pelanggan)
- alur cerita — a2_u30 (a2u30_alur_cerita)
- karya seni — a2_u30 (a2u30_karya_seni)
- ucapan selamat — a2_u32 (a2u32_ucapan_selamat)
- tamu undangan — a2_u32 (a2u32_tamu_undangan)
- acara keluarga — a2_u32 (a2u32_acara_keluarga)
- sopan santun — a2_u34 (a2u34_sopan_santun)
- permintaan maaf — a2_u34 (a2u34_permintaan_maaf)
- ucapan terima kasih — a2_u34 (a2u34_ucapan_terima_kasih)
- giliran bicara — a2_u34 (a2u34_giliran_bicara)
- kontak mata — a2_u34 (a2u34_kontak_mata)
- biaya tak terduga — a2_u35 (a2u35_biaya_tak_terduga)
- dana darurat — a2_u35 (a2u35_dana_darurat)
- rencana cadangan — a2_u36 (a2u36_rencana_cadangan)
- langkah berikutnya — a2_u36 (a2u36_langkah_berikutnya)
- gempa bumi — a2_u37 (a2u37_gempa_bumi)
- letusan gunung — a2_u37 (a2u37_letusan_gunung)
- tanah longsor — a2_u37 (a2u37_tanah_longsor)
- gelombang tinggi — a2_u37 (a2u37_gelombang_tinggi)
- peringatan dini — a2_u37 (a2u37_peringatan_dini)
- tempat pengungsian — a2_u37 (a2u37_tempat_pengungsian)
- persediaan makanan — a2_u37 (a2u37_persediaan_makanan)
- pertolongan pertama — a2_u37 (a2u37_pertolongan_pertama)
- jalur evakuasi — a2_u37 (a2u37_jalur_evakuasi)
- relawan bencana — a2_u37 (a2u37_relawan_bencana)
- pusat bantuan — a2_u37 (a2u37_pusat_bantuan)
- pemandu wisata — a2_u38 (a2u38_pemandu_wisata)
- peta wisata — a2_u38 (a2u38_peta_wisata)
- biaya masuk — a2_u38 (a2u38_biaya_masuk)
- jam kunjung — a2_u38 (a2u38_jam_kunjung)
- tiket masuk — a2_u38 (a2u38_tiket_masuk)
- objek wisata — a2_u38 (a2u38_objek_wisata)
- jadwal kunjungan — a2_u38 (a2u38_jadwal_kunjungan)
- rapat daring — a2_u39 (a2u39_rapat_daring)
- konferensi video — a2_u39 (a2u39_konferensi_video)
- berbagi layar — a2_u39 (a2u39_berbagi_layar)
- dokumen bersama — a2_u39 (a2u39_dokumen_bersama)
- penyimpanan awan — a2_u39 (a2u39_penyimpanan_awan)
- contoh tambahan — a2_u40 (a2u40_contoh_tambahan)

### Compuestos numéricos

- Dua belas — a1_u9 (v125)
- Tiga belas — a1_u9 (v126)
- Empat belas — a1_u9 (v127)
- Lima belas — a1_u9 (v128)
- Enam belas — a1_u9 (v129)
- Tujuh belas — a1_u9 (v130)
- Delapan belas — a1_u9 (v131)
- Sembilan belas — a1_u9 (v132)
- Dua puluh — a1_u9 (v133)
- Tiga puluh — a1_u9 (v134)
- Dua puluh satu — a1_u9 (v271)
- Dua puluh lima — a1_u9 (v272)
- Tiga puluh dua — a1_u9 (v273)
- Empat puluh tujuh — a1_u9 (v274)
- Lima puluh delapan — a1_u9 (v275)
- Enam puluh empat — a1_u9 (v276)
- Tujuh puluh enam — a1_u9 (v277)
- Delapan puluh sembilan — a1_u9 (v278)
- Sembilan puluh sembilan — a1_u9 (v279)

## 3. Variantes casi duplicadas

Criterio: normalización de mayúsculas/signos y sustitución de pronombres por un marcador. Solo informa; no borra.

- Senang bertemu denganmu ↔ Senang bertemu dengan Anda — a1_u3:v14, a1_u32:v470

## 4. Unidades con menos de 8 entradas nuevas

Proxy estructural: formas del bloque que reaparecen en otras unidades. No demuestra por sí solo que el hueco temático sea real.

| Nivel | Unidad | Nuevas | Repetidas en otras unidades |
| --- | --- | ---: | --- |
| A1 | a1_u5 — Unidad 5: Familia y personas | 5 | teman → a1_u2 |
| A1 | a1_u6 — Unidad 6: Comida y bebida | 4 | makan → a1_u1; minum → a1_u1; air → a1_u2; nasi → a1_u2; teh → a1_u10; berapa harganya? → a1_u10 |
| A1 | a1_u7 — Unidad 7: Lugares y ubicación | 5 | kota → a1_u3 |
| A1 | a1_u8 — Unidad 8: Tiempo, rutina e integración | 6 | hari → a1_u11; hari ini → a1_u11; tidur → a1_u2; besok → a1_u11 |
| A1 | a1_u17 — Unidad 17: Tener, haber y preguntas básicas | 7 | siapa → a1_u3 |

## 5. Señal de posible generación por cuota

Umbral: mismo número de entradas nuevas durante 10 o más unidades consecutivas. Advertencia editorial, no error.
- A2 U5–U40: 12 entradas nuevas por unidad durante 36 unidades.
- A1 U24–U31 tiene 10 entradas nuevas durante 8 unidades: no alcanza el umbral de 10.

## 6. Candidatas a nominalizaciones A2

Patrón aproximado pe-/peN-an, per-an y ke-an. Puede contener falsos positivos.
- a2_u3: Kemudian (a2u3_kemudian)
- a2_u4: Kegiatan (a2u4_kegiatan)
- a2_u10: Peraturan (a2u10_peraturan)
- a2_u10: Keselamatan (a2u10_keselamatan)
- a2_u11: Kehilangan (a2u11_kehilangan)
- a2_u11: Kerusakan (a2u11_kerusakan)
- a2_u12: Pengalaman (a2u12_pengalaman)
- a2_u12: Kemampuan (a2u12_kemampuan)
- a2_u12: Kesempatan (a2u12_kesempatan)
- a2_u12: Keterampilan (a2u12_keterampilan)
- a2_u14: perjalanan (a2u14_perjalanan)
- a2_u14: pelabuhan (a2u14_pelabuhan)
- a2_u14: kendaraan (a2u14_kendaraan)
- a2_u14: keberangkatan (a2u14_keberangkatan)
- a2_u15: pertemuan (a2u15_pertemuan)
- a2_u16: pemandangan (a2u16_pemandangan)
- a2_u17: pemeriksaan (a2u17_pemeriksaan)
- a2_u17: pemulihan (a2u17_pemulihan)
- a2_u17: perawatan (a2u17_perawatan)
- a2_u18: kebocoran (a2u18_kebocoran)
- a2_u20: penanaman (a2u20_penanaman)
- a2_u20: kekeringan (a2u20_kekeringan)
- a2_u20: kebersihan (a2u20_kebersihan)
- a2_u21: kerajinan (a2u21_kerajinan)
- a2_u21: pertunjukan (a2u21_pertunjukan)
- a2_u24: pelatihan (a2u24_pelatihan)
- a2_u24: pendaftaran (a2u24_pendaftaran)
- a2_u24: kelulusan (a2u24_kelulusan)
- a2_u26: perasaan (a2u26_perasaan)
- a2_u26: kesepian (a2u26_kesepian)
- a2_u26: perselisihan (a2u26_perselisihan)
- a2_u27: kecamatan (a2u27_kecamatan)
- a2_u27: kelurahan (a2u27_kelurahan)
- a2_u27: penyeberangan (a2u27_penyeberangan)
- a2_u28: penemuan (a2u28_penemuan)
- a2_u28: percobaan (a2u28_percobaan)
- a2_u28: penelitian (a2u28_penelitian)
- a2_u29: pelanggan (a2u29_pelanggan)
- a2_u29: keluhan (a2u29_keluhan)
- a2_u29: pengembalian (a2u29_pengembalian)
- a2_u29: pesanan (a2u29_pesanan)
- a2_u29: pengiriman (a2u29_pengiriman)
- a2_u29: kemasan (a2u29_kemasan)
- a2_u29: penggantian (a2u29_penggantian)
- a2_u30: pementasan (a2u30_pementasan)
- a2_u31: pendakian (a2u31_pendakian)
- a2_u31: perkemahan (a2u31_perkemahan)
- a2_u31: perlengkapan (a2u31_perlengkapan)
- a2_u31: persediaan (a2u31_persediaan)
- a2_u32: pernikahan (a2u32_pernikahan)
- a2_u32: kelahiran (a2u32_kelahiran)
- a2_u32: pertunangan (a2u32_pertunangan)
- a2_u32: peresmian (a2u32_peresmian)
- a2_u32: peringatan (a2u32_peringatan)
- a2_u32: kenangan (a2u32_kenangan)
- a2_u32: kehadiran (a2u32_kehadiran)
- a2_u32: persiapan (a2u32_persiapan)
- a2_u33: perbatasan (a2u33_perbatasan)
- a2_u33: pedalaman (a2u33_pedalaman)
- a2_u33: pegunungan (a2u33_pegunungan)
- a2_u34: kebiasaan (a2u34_kebiasaan)
- a2_u35: pengeluaran (a2u35_pengeluaran)
- a2_u35: pemasukan (a2u35_pemasukan)
- a2_u35: kebutuhan (a2u35_kebutuhan)
- a2_u35: keinginan (a2u35_keinginan)
- a2_u35: pemborosan (a2u35_pemborosan)
- a2_u36: pertimbangan (a2u36_pertimbangan)
- a2_u36: keuntungan (a2u36_keuntungan)
- a2_u36: kerugian (a2u36_kerugian)
- a2_u36: kesepakatan (a2u36_kesepakatan)
- a2_u38: penginapan (a2u38_penginapan)
- a2_u38: pemesanan (a2u38_pemesanan)
- a2_u39: pembaruan (a2u39_pembaruan)
- a2_u40: kesimpulan (a2u40_kesimpulan)
- a2_u40: penegasan (a2u40_penegasan)
- a2_u40: keterangan (a2u40_keterangan)
- a2_u40: pernyataan (a2u40_pernyataan)
- a2_u40: pembahasan (a2u40_pembahasan)

Total: **78** candidatas por patrón.

## 7. Verificación disponible en CSV

| Nivel | Filas tracker | verified_primary | not_checked |
| --- | ---: | ---: | ---: |
| A1 U1–U23 | 238 | 0 | 238 |
| A1 U24–U32 | 90 | 34 | 56 |
| A1 combinado | 328 | 34 | 294 |
| A2 U1–U40 | 492 | 2 | 490 |
| A1+A2 combinado | 820 | 36 | 784 |

El inventario bruto de A1 U1–U23 contiene 239 registros: 238 no tenían fila en el tracker anterior y `v465` ya estaba representado en el tracker U24–U32. Los IDs repetidos dentro de U1–U23 se conservan como filas separadas porque la tarea pide una fila por registro curricular.

En PR2 los trackers sumaban 582 filas CSV: 36 `verified_primary` y 546 `not_checked`. El 57 del informe anterior contaba registros curriculares, no filas CSV: 91 registros de A1 U24–U32 corresponden a 90 filas de tracker porque `v465` es un registro duplicado ya representado en el conjunto A1. Por eso A1 aporta 56 filas `not_checked`, y 56 + 490 de A2 = 546. La misma deduplicación explica que A1 U1–U23 tenga 239 registros curriculares, pero solo 238 filas nuevas, porque `v465` ya estaba representado en U24–U32.

El corte combinado actual tras PR3 es de 820 filas: 36 `verified_primary` + 784 `not_checked`; A1 combinado es 34 + 294 = 328 y A2 es 2 + 490 = 492.

## 8. Hallazgos para PR posteriores

- A1 U5–U8: 5, 4, 5 y 6 entradas nuevas.
- A2 U5–U40: 12 entradas nuevas en 36 unidades consecutivas; señal fuerte de cuota editorial.
- La morfología se mantiene como candidato para revisión posterior; este PR no toca contenido.
- No se crean estados de verificación nuevos.

**Este PR no añade, elimina ni modifica vocabulario, ejercicios, CSV ni contenido curricular.**
