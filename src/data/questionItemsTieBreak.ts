/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { QuestionItem } from "../types";

export const questionItemsTieBreak: QuestionItem[] = [
  {
    id: "tie_001",
    kind: "singleChoice",
    domain: "scheduling_surprise",
    prompt: "Ketika jadwal pertemuan penting yang sudah kamu siapkan rapi dibatalkan sepihak oleh klien hanya 15 menit sebelum acara, bagaimana sirkulasi batinmu bereaksi?",
    instruction: "Pilih muara ketenangan kustom batinmu.",
    reliability: 0.93,
    targetSystems: ["cognitive", "bigFive", "enneagram"],
    options: [
      {
        id: "a",
        text: "Merasakan kekesalan mendalam; penataan waktu hidupku jadi porak-poranda dan aku harus menjadwal ulang elemen-elemen harianku yang berharga.",
        subtleMeaning: "Tingginya ketergantungan pada penutupan rencana teratur, low openness to disruption (J, Si/Te).",
        weights: {
          mbtiAxis: { J: 1.2, P: -1.2 },
          cognitive: { Si: 0.8, Te: 0.8 },
          bigFive: { conscientiousness: 0.8 },
          evidence: { lowDisruptionTolerance: 1.2 }
        }
      },
      {
        id: "b",
        text: "Menghela napas santai; bagiku slot waktu kosong ini adalah berkah tak terhindarkan untuk beristirahat sunyi atau mengulik hal liar lain.",
        subtleMeaning: "Toleransi tinggi pada fluktuasi agenda harian, fleksibilitas spontan (P, Ne/Se).",
        weights: {
          mbtiAxis: { P: 1.2, J: -1.2 },
          cognitive: { Ne: 0.8, Se: 0.8 },
          bigFive: { conscientiousness: -0.7 },
          evidence: { highDisruptionTolerance: 1.2 }
        }
      }
    ]
  },
  {
    id: "tie_002",
    kind: "singleChoice",
    domain: "sudden_double_date",
    prompt: "Sahabatmu mengajakmu mendadak menemani mereka double-date dengan kenalan baru mereka malam ini. Apa putusan naluriah tersembunyimu?",
    instruction: "Pilih respon spontan sosiabelmu.",
    reliability: 0.89,
    targetSystems: ["bigFive", "instinct", "disc"],
    options: [
      {
        id: "a",
        text: "Menolaknya; aku benci bertransaksi basa-basi yang dipaksakan di meja makan sosial malam ini bersama orang asing.",
        subtleMeaning: "Penghindaran pendedahan energi sosial, kenyamanan isolasi (I, sp, low extraversion).",
        weights: {
          mbtiAxis: { I: 1.1, E: -1.0 },
          bigFive: { extraversion: -1.0 },
          instinct: { sp: 1.0, so: -0.9 },
          evidence: { avoidSuddenSocialTable: 1.2 }
        }
      },
      {
        id: "b",
        text: "Menyetujuinya seketika; kesempatan mencicipi restoran baru sembari mengamati karakter pasangan baru terasa seru dan memantik energi obrolan.",
        subtleMeaning: "Keterbukaan tinggi pada asimilasi kegembiraan eksternal (E, so/sx, extraversion tinggi).",
        weights: {
          mbtiAxis: { E: 1.1, I: -1.0 },
          bigFive: { extraversion: 1.0 },
          instinct: { so: 0.9, sx: 0.7 },
          evidence: { embraceSuddenSocialTable: 1.2 }
        }
      }
    ]
  },
  {
    id: "tie_003",
    kind: "singleChoice",
    domain: "intellectual_scrutiny",
    prompt: "Ketika ada orang yang mengajukan argumen filsafat atau fakta sains yang sangat cacat logikanya di media sosial, apa hasrat pertama jemarimu?",
    instruction: "Pilih kecenderungan respons kognitifmu.",
    reliability: 0.91,
    targetSystems: ["cognitive", "enneagram", "communication"],
    options: [
      {
        id: "a",
        text: "Mengetik sanggahan detail, menyodorkan rujukan studi, mematikan cacat pikirnya agar distorsi kebenaran tidak menyebar luas.",
        subtleMeaning: "Dorongan mendalam meluruskan arsitektur kebenaran eksternal (Ti/Te, direct, Enneagram 1/5).",
        weights: {
          cognitive: { Ti: 0.9, Te: 0.8 },
          communication: { direct: 1.0, analytical: 1.0 },
          enneagram: { "1": 0.9, "5": 0.8 },
          evidence: { activeTruthCorrection: 1.2 }
        }
      },
      {
        id: "b",
        text: "Mengabaikannya sembari tersenyum kecut; aku merasa tidak dibayar korporasi mana pun untuk memintarkan kepala orang asing di internet.",
        subtleMeaning: "Penyelamatan kemapanan batin privat, pengabaian tak acuh (indifferent AP, sp, Enneagram 9/5).",
        weights: {
          communication: { analytical: -0.5 },
          enneagram: { "9": 1.1, "5": 1.0 },
          instinct: { sp: 1.1 },
          evidence: { detachedTruthSpectator: 1.2 }
        }
      }
    ]
  },
  {
    id: "tie_004",
    kind: "singleChoice",
    domain: "group_belonging",
    prompt: "Apa hal yang paling menyakitkan jika kamu sadar bahwa kamu ditinggalkan dari obrolan grup rahasia batin teman sekantor?",
    instruction: "Pilih getaran rasa sakit sosial terbesarmu.",
    reliability: 0.90,
    targetSystems: ["enneagram", "instinct", "relationship"],
    options: [
      {
        id: "a",
        text: "Kehilangan rasa memiliki (belonging); aku merasa tidak disukai, terbuang dari benteng rasa aman kelompok yang kuanggap rumah kedua.",
        subtleMeaning: "Trisula hati anxious, penolakan ikatan kebersamaan (anxiousLeaning, so, Enneagram 2/6/9).",
        weights: {
          relationship: { anxiousLeaning: 1.2 },
          instinct: { so: 1.2 },
          enneagram: { "2": 0.8, "6": 0.8, "9": 0.8 },
          evidence: { groupBelongingFrustration: 1.2 }
        }
      },
      {
        id: "b",
        text: "Kehilangan otonomi pengaruh; aku merasa ketiadaan kehadiranku tidak bergaung bagi mereka, mencederai kredibilitas bernilai diriku.",
        subtleMeaning: "Dampak status, kebanggaan diri atas visibilitas kompetensi (avoidantLeaning, Enneagram 3/8).",
        weights: {
          relationship: { avoidantLeaning: 1.0 },
          enneagram: { "3": 1.2, "8": 0.8 },
          evidence: { groupInfluenceFrustration: 1.2 }
        }
      }
    ]
  },
  {
    id: "tie_005",
    kind: "singleChoice",
    domain: "gossip_ethics",
    prompt: "Seorang kolega kerja menceritakan gosip perselingkuhan pimpinan perusahaan kepadamu. Bagaimana respon batinmu menyeimbangkan fakta itu?",
    instruction: "Pilih rute asimilasi info sosial sensitif.",
    reliability: 0.88,
    targetSystems: ["hexaco", "values", "cognitive"],
    options: [
      {
        id: "a",
        text: "Sangat berselera menyaring rincian ceritanya; ini adalah data sosiologis relasi kekuasaan yang sangat menarik ditelisik polanya.",
        subtleMeaning: "Navigasi rasa ingin tahu relasi manusiawi (openness, Ne, Investigative).",
        weights: {
          cognitive: { Ne: 0.8 },
          bigFive: { openness: 0.8 },
          hexaco: { honestyHumility: -0.4 },
          evidence: { rawSocialCuriosityStimulation: 1.1 }
        }
      },
      {
        id: "b",
        text: "Merasakan kekurangnyamanan moral; aku menyela obrolan secara dingin agar menghentikan pergunjingan pribadi yang tidak ada hubungannya dengan hasil kerja.",
        subtleMeaning: "Tindakan sterilitas moral, pembersihan asertif sirkulasi gosip (Honesty-Humility tinggi, Enneagram 1).",
        weights: {
          hexaco: { honestyHumility: 1.3 },
          enneagram: { "1": 1.2 },
          communication: { direct: 0.8 },
          values: { cleanBehavior: 1.2 },
          evidence: { standardGossipRefusal: 1.2 }
        }
      }
    ]
  },
  {
    id: "tie_006",
    kind: "singleChoice",
    domain: "aesthetic_pulp_vs_art",
    prompt: "Ketika mengunjungi pameran komik populer vs pameran lukisan abstrak klasik modern, mana yang sebenarnya lebih menyalakan detak jantung keindahanmu?",
    instruction: "Pilih gravitasi getaran estetik batinmu.",
    reliability: 0.87,
    targetSystems: ["cognitive", "bigFive"],
    options: [
      {
        id: "a",
        text: "Pameran lukisan abstrak klasik modern: setiap sapuan kuas membawa makna sublim, interpretasi berlapis, konsep murni filosofis yang tidak mudah didefinisikan.",
        subtleMeaning: "Kebutuhan interpretasi metaforis mendalam (Ni, openness tinggi).",
        weights: {
          cognitive: { Ni: 1.0, Ne: 0.5 },
          bigFive: { openness: 1.2 },
          evidence: { deepAbstractAestheticGratification: 1.2 }
        }
      },
      {
        id: "b",
        text: "Pameran komik populer: gambaran visual ekspresif, aksi laga langsung yang membakar semangat, alur petualangan terperinci yang menghibur indrawi.",
        subtleMeaning: "Kepuasan visual sensoris interaktif dinamis (Se, extraversion).",
        weights: {
          cognitive: { Se: 1.0, Si: 0.5 },
          bigFive: { openness: 0.3 },
          evidence: { concreteDirectSensoryGratification: 1.2 }
        }
      }
    ]
  },
  {
    id: "tie_007",
    kind: "singleChoice",
    domain: "rule_breaking_minor",
    prompt: "Ketika melihat tanda larangan dilarang menginjak rumput taman kota yang sepi sementara jalan setapak memutar sangat jauh dan kamu sedang terburu-buru, bagaimana nuranimu bertarung?",
    instruction: "Pilih rute kepatuhan operasionalmu.",
    reliability: 0.90,
    targetSystems: ["moral", "hexaco", "values"],
    options: [
      {
        id: "a",
        text: "Aku memutar jauh melewati jalan setapak dengan patuh; aturan kecil adalah pilar moral ketertiban publik, melanggarnya adalah bibit kemunduran adab bangsamu.",
        subtleMeaning: "Integritas moral kaku ruleBased, disiplin tata tertib (ruleBased, Enneagram 1/6, high honesty).",
        weights: {
          moral: { ruleBased: 1.4 },
          hexaco: { honestyHumility: 1.2, conscientiousness: 1.0 },
          enneagram: { "1": 1.3, "6": 0.8 },
          values: { civilityDiscipline: 1.3 },
          evidence: { absoluteRuleCompliance: 1.2 }
        }
      },
      {
        id: "b",
        text: "Aku melompati rumput tersebut secara cepat; tidak ada polisi, tanah tidak merugi hanya dengan injakan selintas kaki penolong, dan tujuanku jauh melesat cepat.",
        subtleMeaning: "Pragmatisme utilitas waktu otonom libertarian (libertarian, pragmatist, low honesty).",
        weights: {
          moral: { libertarian: 1.3, pragmatist: 1.0 },
          hexaco: { honestyHumility: -0.8 },
          values: { efficiencySpeed: 1.2 },
          evidence: { pragmaticRuleBypass: 1.2 }
        }
      }
    ]
  },
  {
    id: "tie_008",
    kind: "singleChoice",
    domain: "unexpected_emotional_appeal",
    prompt: "Seseorang yang sering menyindirmu tiba-tiba memelukmu sembari menangis histeris meminta pengampunan dosa darimu di hari buruknya. Apa sirkulasi nalurimu?",
    instruction: "Pilih rute pengolahan emosional darurat interpersonal.",
    reliability: 0.92,
    targetSystems: ["stress", "relationship", "enneagram"],
    options: [
      {
        id: "a",
        text: "Aku merangkulnya balik dengan rasa iba murni, melupakan segala dosanya detik itu juga, tenggelam bersama merawat air matanya.",
        subtleMeaning: "Respons faun cinta asuhan altruistik lekas (fawn, Enneagram 2/9, high agreeableness).",
        weights: {
          stress: { fawn: 1.4, freeze: 0.4 },
          relationship: { secureLeaning: 0.5, anxiousLeaning: 0.5 },
          enneagram: { "2": 1.3, "9": 1.1 },
          bigFive: { agreeableness: 1.2 },
          evidence: { absoluteVisceralEmpathyForgiveness: 1.2 }
        }
      },
      {
        id: "b",
        text: "Aku mematung kaku (freeze) karena risih, melepaskan pelukan kasarnya secara asertif diplomatis, lalu menjanjikan obrolan tenang setelah ia mendingin.",
        subtleMeaning: "Pemberian sekat proteksi ruang batin privat dari kejutan emosi luar (freeze, analytical Ti/Fi, Enneagram 5/8/1).",
        weights: {
          stress: { freeze: 1.4, fawn: -1.2 },
          relationship: { avoidantLeaning: 0.9 },
          enneagram: { "5": 1.2, "8": 0.5, "1": 0.5 },
          evidence: { boundaryProtectiveCoping: 1.2 }
        }
      }
    ]
  },
  {
    id: "tie_009",
    kind: "singleChoice",
    domain: "cognitive_clarity_ti_te",
    prompt: "Bagian mana yang paling memicu kekaguman matamu ketika memandang arsitektur katedral kuno atau gedung pencakar langit modern?",
    instruction: "Pilih sudut apresiasi kognitif paling murni.",
    reliability: 0.91,
    targetSystems: ["cognitive", "values"],
    options: [
      {
        id: "a",
        text: "Keaslian desain penemuannya secara teoretis; detail arsitektur simitris dalam cetak biru matematika yang memecahkan masalah keseimbangan fisika.",
        subtleMeaning: "Apresiasi keindahan presisi logika spasial konsep internal (Ti, Investigative).",
        weights: {
          cognitive: { Ti: 1.3, Te: -0.4 },
          values: { theoreticalSymmetry: 1.2 },
          evidence: { internalArchitecturalGrasp: 1.1 }
        }
      },
      {
        id: "b",
        text: "Bagaimana gedung kokoh itu fungsional memproses ribuan manusia setiap harinya, sistem lift cepatnya, kelestarian energi organiknya secara global.",
        subtleMeaning: "Apresiasi efisiensi utilitas eksternal pemrosesan fungsi (Te, Enterprising/Conventional).",
        weights: {
          cognitive: { Te: 1.3, Ti: -0.4 },
          values: { operationalEfficiency: 1.2 },
          evidence: { macroOperationGrasp: 1.1 }
        }
      }
    ]
  },
  {
    id: "tie_010",
    kind: "singleChoice",
    domain: "nostalgia_versus_future",
    prompt: "Pukul 2 pagi di hari menjelang tahun baru, ke arah mana rasi pikiran bawah sadarmu berlayar?",
    instruction: "Pilih arah penjelajahan waktu jiwamu.",
    reliability: 0.92,
    targetSystems: ["cognitive", "enneagram", "bigFive"],
    options: [
      {
        id: "a",
        text: "Menelusuri riwayat kenangan-kenangan manis masa lalu, menimang barang sejarah lama, menyisakan kesyahduan memori masa kecil.",
        subtleMeaning: "Fokus koordinat pemeliharaan kenyamanan sejarah indrawi (Si, Enneagram 4/9/6).",
        weights: {
          cognitive: { Si: 1.3, Ni: -0.5 },
          enneagram: { "4": 1.0, "9": 0.8, "6": 0.6 },
          evidence: { anchorHistoryNostalgia: 1.2 }
        }
      },
      {
        id: "b",
        text: "Memproyeksikan cita-cita besar 5 tahun ke depan, menyusun skenario transformasi karir, merakit visi kejayaan otonomi otonomi.",
        subtleMeaning: "Fokus koordinat penajaman kemajuan masa depan teoritis (Ni/Ne, Enneagram 3/7/8).",
        weights: {
          cognitive: { Ni: 1.2, Ne: 0.8, Si: -1.0 },
          enneagram: { "3": 1.2, "7": 0.9, "8": 0.7 },
          evidence: { focusFutureProjection: 1.2 }
        }
      }
    ]
  }
];
