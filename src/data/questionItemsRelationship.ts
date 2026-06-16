/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { QuestionItem } from "../types";

export const questionItemsRelationship: QuestionItem[] = [
  {
    id: "rel_001",
    kind: "singleChoice",
    domain: "unanswered_chats",
    prompt: "Ketika pesan pentingmu diabaikan (hanya dibaca tanpa dibalas) selama lebih dari setengah hari oleh seseorang yang dekat denganmu, apa narasi batin yang pertama berputar?",
    instruction: "Pilih narasi batin yang paling spontan muncul di kepalamu.",
    reliability: 0.89,
    targetSystems: ["relationship", "stress", "enneagram", "bigFive"],
    options: [
      {
        id: "a",
        text: "“Mungkin dia sedang sibuk atau kelelahan. Aku akan menunggunya dengan santai tanpa mengirimkan pesan tambahan.”",
        subtleMeaning: "Gaya hubungan aman, tidak mudah tersulut kecemasan penolakan (secureLeaning, low neuroticism).",
        weights: {
          relationship: { secureLeaning: 1.4, anxiousLeaning: -0.8 },
          bigFive: { neuroticism: -0.8, agreeableness: 0.6 },
          stress: { freeze: 0.2 },
          evidence: { secureAttachmentSignal: 1.3 },
          positive: { relationalTrust: 1.1 }
        }
      },
      {
        id: "b",
        text: "“Apakah aku telah salah menulis sesuatu di chat sebelumnya? Aku terus mengecek waktu aktifnya dan bersiap meminta maaf.”",
        subtleMeaning: "Gaya hubungan cemas, internalisasi kesalahan, hipervigilansi penolakan (anxiousLeaning, Enneagram 6/2).",
        weights: {
          relationship: { anxiousLeaning: 1.4, secureLeaning: -0.8 },
          bigFive: { neuroticism: 1.1 },
          enneagram: { "6": 1.0, "2": 0.8 },
          stress: { hypervigilant: 1.2, fawn: 0.8 },
          evidence: { rejectionAnxietySignal: 1.3 },
          negative: { reassuranceSeeking: -0.5 }
        }
      },
      {
        id: "c",
        text: "“Terserahlah. Kalau ia mengabaikanku, aku juga akan mengabaikannya sekalian dan menyibukkan diri mencari kesibukan lain.”",
        subtleMeaning: "Gaya hubungan menghindar defensif, pemutusan sirkulasi emosional (avoidantLeaning, Enneagram 8/5).",
        weights: {
          relationship: { avoidantLeaning: 1.4, secureLeaning: -0.7 },
          enneagram: { "8": 0.8, "5": 0.7 },
          stress: { flight: 1.0 },
          defense: { denial: 0.6 },
          evidence: { defensiveDetachmentSignal: 1.3 }
        }
      },
      {
        id: "d",
        text: "Merasa campur aduk antara panik dan marah; ingin melabrak mereka agar berterus terang tetapi juga terdorong menarik diri secara total.",
        subtleMeaning: "Gaya hubungan ketakutan-cemas, kebingungan antara butuh dan benci kedekatan (fearfulLeaning, high split response).",
        weights: {
          relationship: { fearfulLeaning: 1.4, secureLeaning: -1.0 },
          bigFive: { neuroticism: 1.2 },
          stress: { fight: 0.6, flight: 0.6 },
          evidence: { disorganizedAttachmentSignal: 1.3 }
        }
      }
    ]
  },
  {
    id: "rel_002",
    kind: "singleChoice",
    domain: "partner_cheating",
    prompt: "Jika pasangan yang sangat kamu percayai ketahuan melakukan perselingkuhan, apa reaksi pertamamu sebelum mengambil keputusan akhir?",
    instruction: "Pilih muara badai emosi pertama yang mengepung pertahananmu.",
    reliability: 0.92,
    targetSystems: ["conflict", "stress", "defense", "enneagram"],
    options: [
      {
        id: "a",
        text: "Aku merasa sedih mendalam, mendiamkan badai sendirian, menolak berbicara dengan siapa pun sampai badai kesedihan ini mereda.",
        subtleMeaning: "Mengubur luka ke dalam batin secara sepi, proteksi isolasi (freeze, repression, Enneagram 4/5/9).",
        weights: {
          stress: { freeze: 1.4, fight: -0.8 },
          defense: { repression: 1.2 },
          conflict: { avoiding: 1.0 },
          enneagram: { "4": 1.0, "9": 0.8, "5": 0.8 },
          evidence: { internalDepressiveShutDown: 1.3 }
        }
      },
      {
        id: "b",
        text: "Aku langsung memutuskan hubungan seketika itu juga, menghapus semua kontaknya, dan menghilang dari dunianya seolah dia tak pernah ada.",
        subtleMeaning: "Pemutusan radikal ekstrem, penolakan kompromi penolakan (flight, denial, Enneagram 8).",
        weights: {
          stress: { flight: 1.4, fawn: -1.0 },
          defense: { denial: 0.9 },
          conflict: { competitive: 0.8 },
          enneagram: { "8": 1.1, "7": 0.5 },
          evidence: { radicalRelationalSeverance: 1.3 }
        }
      },
      {
        id: "c",
        text: "Aku meledak di hadapannya, mengguncang fondasi harga diri mereka, dan menuntut mereka menjelaskan mengapa bisa setega itu melakukan hal keji ini.",
        subtleMeaning: "Mobilisasi kemarahan luar, konfrontasi ekspresif (fight, Enneagram 8/3/1).",
        weights: {
          stress: { fight: 1.4, freeze: -1.0 },
          conflict: { competitive: 1.1 },
          enneagram: { "8": 1.0, "3": 0.7, "1": 0.6 },
          evidence: { expressiveAuraConfrontation: 1.3 }
        }
      },
      {
        id: "d",
        text: "Aku meminta penjelasan detail kronologis kejadiannya berulang kali, bukan untuk memaafkan, melainkan untuk membangun kepastian logis mengapa ini terjadi.",
        subtleMeaning: "Intelektualisasi tragedi emosional, pencarian data objektif untuk meredam rasa hancur (rationalization, analytical Ti/Te).",
        weights: {
          cognitive: { Ti: 0.8, Te: 0.6 },
          defense: { rationalization: 1.4 },
          enneagram: { "5": 1.1, "6": 0.8 },
          evidence: { analyticalIntellectualizationOfTrauma: 1.3 }
        }
      }
    ]
  },
  {
    id: "rel_003",
    kind: "singleChoice",
    domain: "parental_unloved",
    prompt: "Ketika tersadar semasa kecil bahwa orang tuamu mungkin tidak mencintaimu sesempurna yang kamu butuhkan, apa simpulan terdalammu saat dewasa?",
    instruction: "Pilih penyelarasan batin utama terhadap luka pengasuhan masa lalu.",
    reliability: 0.90,
    targetSystems: ["enneagram", "defense", "values"],
    options: [
      {
        id: "a",
        text: "Mewajarkannya dengan kognitif logis. Mereka manusia biasa dengan keterbatasan informasi saat itu. Aku mengikhlaskannya walau luka itu tetap ada samar.",
        subtleMeaning: "Rasionalisasi trauma, adaptasi kognitif dewasa (rationalization, Enneagram 9/5).",
        weights: {
          defense: { rationalization: 1.2 },
          enneagram: { "9": 1.1, "5": 0.8 },
          values: { empathy: 0.9 },
          evidence: { cognitiveReparativeness: 1.2 }
        }
      },
      {
        id: "b",
        text: "Membangun benteng pertahanan baja yang kokoh: aku berjanji tidak akan pernah merepotkan mereka atau bergantung kepada siapa pun lagi di dunia ini.",
        subtleMeaning: "Defensive hyper-independence, pembentukan antipatologi (avoidantLeaning, Enneagram 8/5).",
        weights: {
          relationship: { avoidantLeaning: 1.2 },
          enneagram: { "8": 1.2, "5": 1.0 },
          values: { autonomy: 1.3 },
          evidence: { hyperIndependenceArmor: 1.3 }
        }
      },
      {
        id: "c",
        text: "Berusaha mati-matian menjadi anak tersukses, paling berbakti, atau paling patuh agar suatu hari mereka menyadari betapa berharganya kehadiranku.",
        subtleMeaning: "Pencapaian konpensatoris, fawning untuk mendapatkan restu (fawn, Enneagram 3/2/1).",
        weights: {
          stress: { fawn: 1.2 },
          enneagram: { "3": 1.1, "2": 0.9, "1": 0.7 },
          values: { achievement: 1.0 },
          evidence: { compensatoryAchievingFawn: 1.3 }
        }
      },
      {
        id: "d",
        text: "Memutuskan hubungan komunikasi minimal, menjauh, dan membangun keluarga atau lingkaran relasi sendiri yang jauh lebih sehat secara mental.",
        subtleMeaning: "Penyeleksian sirkulasi sehat, penolakan lingkungan usang (secureLeaning / healthy self preservation).",
        weights: {
          relationship: { secureLeaning: 0.8 },
          values: { freedom: 1.0 },
          evidence: { proactiveSanctuaryBuilding: 1.3 }
        }
      }
    ]
  },
  {
    id: "rel_004",
    kind: "singleChoice",
    domain: "friend_teasing",
    prompt: "Bagaimana caramu bersikap saat menyadari seorang rekan di dalam grup pergaulanmu sering memberi sindiran tajam berbalut lelucon?",
    instruction: "Pilih gaya penanganan konflik relasi interpersonal yang mencerminkan dirimu.",
    reliability: 0.87,
    targetSystems: ["conflict", "communication", "enneagram"],
    options: [
      {
        id: "a",
        text: "Aku segera mendiamkannya, menghindar dari lingkaran obrolan mereka, karena benci memicu pertengkaran publik yang memalukan.",
        subtleMeaning: "Penghindaran konflik langsung demi harmoni/menghindari konfrontasi (compromising/avoiding, Enneagram 9/6).",
        weights: {
          conflict: { avoiding: 1.3, collaborative: -0.5 },
          communication: { diplomatic: 0.8, direct: -0.8 },
          enneagram: { "9": 1.2, "6": 0.6 },
          evidence: { conflictAvoidantDefense: 1.1 }
        }
      },
      {
        id: "b",
        text: "Aku membalasnya langsung detik itu juga dengan sindiran balik yang jauh lebih tajam dan dingin diiringi senyuman tenang agar dia sadar dia salah sasaran.",
        subtleMeaning: "Konfrontasi tidak langsung namun agresif, unjuk taring perlindungan diri (competitive, direct, Enneagram 8/5/3).",
        weights: {
          conflict: { competitive: 1.3, accommodating: -1.0 },
          communication: { direct: 0.9, diplomatic: -0.6 },
          enneagram: { "8": 0.9, "5": 0.7, "3": 0.6 },
          evidence: { sharpWittyRetaliation: 1.2 }
        }
      },
      {
        id: "c",
        text: "Aku mengajak mereka berbicara empat mata secara santai namun asertif di luar acara, menanyakan apa sebenarnya motif di balik ucapannya.",
        subtleMeaning: "Komunikasi asertif, kolaborasi penyelesaian relasi sehat (collaborative, diplomatic, secureLeaning).",
        weights: {
          conflict: { collaborative: 1.4, avoiding: -0.8 },
          communication: { diplomatic: 1.1, direct: 0.5 },
          relationship: { secureLeaning: 1.0 },
          evidence: { assertiveBilateralDialogue: 1.2 }
        }
      }
    ]
  },
  {
    id: "rel_005",
    kind: "singleChoice",
    domain: "partner_chilling",
    prompt: "Ketika pasanganmu tiba-tiba terlihat murung, dingin, dan tertutup tanpa memberi alasan yang jelas selama berhari-hari, apa refleks pertamamu?",
    instruction: "Pilih gerakan batin terdalammu menghadapi kebekuan hubungan.",
    reliability: 0.89,
    targetSystems: ["relationship", "stress", "enneagram"],
    options: [
      {
        id: "a",
        text: "Mendekatinya berulang kali, merawat dan menawarkan makanan hangat, serta mencari cara agar suasana hatinya lekas membaik.",
        subtleMeaning: "Respons menenangkan pihak lain, pengurang ketegangan relasi (fawn/anxiousLeaning, Enneagram 2/9).",
        weights: {
          relationship: { anxiousLeaning: 0.9, secureLeaning: 0.3 },
          stress: { fawn: 1.2 },
          enneagram: { "2": 1.3, "9": 0.8 },
          evidence: { proactiveRelationalNurturing: 1.2 }
        }
      },
      {
        id: "b",
        text: "Menjamin bahwa aku ada jika dia butuh bercerita, lalu memberinya ruang privat penuh tanpa mendesaknya menceritakan masalah sebelum ia siap.",
        subtleMeaning: "Pemberian ruang yang aman, peletakan batas relasi yang berbobot (secureLeaning, Enneagram 5/9).",
        weights: {
          relationship: { secureLeaning: 1.4, anxiousLeaning: -0.8 },
          enneagram: { "5": 0.9, "9": 0.9 },
          evidence: { matureBoundariedEmpathy: 1.3 }
        }
      },
      {
        id: "c",
        text: "Merasa kesal, terancam, lalu ikut-ikutan mendiamkan mereka agar adil dan tidak terlihat lemah di hadapannya.",
        subtleMeaning: "Penghindaran defensif cermin, pengerasan ego dari ancaman penolakan (avoidantLeaning, Enneagram 8/4/6).",
        weights: {
          relationship: { avoidantLeaning: 1.1, secureLeaning: -0.8 },
          enneagram: { "8": 0.7, "4": 0.5 },
          stress: { flight: 0.8 },
          evidence: { mirrorDefensiveWithdrawal: 1.2 }
        }
      }
    ]
  },
  {
    id: "rel_006",
    kind: "singleChoice",
    domain: "making_amends",
    prompt: "Saat tersadar bahwa tindakan khilafmu telah mencederai kepercayaan teman baikmu, bagaimana cara khasmu mendekati mereka kembali?",
    instruction: "Pilih pendekatan pemulihan relasi yang paling jujur kau lakukan.",
    reliability: 0.90,
    targetSystems: ["communication", "conflict", "hexaco", "values"],
    options: [
      {
        id: "a",
        text: "Mendatangi mereka langsung, meminta maaf secara jernih, membedah letak kesalahanku tanpa pembelaan diri, dan menanyakan bagaimana ganti untungnya.",
        subtleMeaning: "Permintaan maaf berintegritas tinggi, asertivitas, kejujuran batin (honestyHumility, direct, collaborative).",
        weights: {
          communication: { direct: 1.1 },
          conflict: { collaborative: 1.3 },
          hexaco: { honestyHumility: 1.4 },
          values: { empathy: 1.0 },
          evidence: { standardClearAtonement: 1.3 }
        }
      },
      {
        id: "b",
        text: "Menunggu suasana mendingin dulu sembari mengirimkan hadiah bermanfaat atau melunasi tugas-tugas bantuanku tanpa banyak berteori kata.",
        subtleMeaning: "Permintaan maaf tidak langsung berbasis tindakan nyata (actsOfService, Si).",
        weights: {
          communication: { diplomatic: 0.8, analytical: 0.4 },
          conflict: { compromising: 0.9 },
          loveStyle: { actsOfService: 1.1 },
          evidence: { indirectFunctionalAtonement: 1.2 }
        }
      },
      {
        id: "c",
        text: "Menghilang lama karena didera rasa bersalah-malu yang mendalam; aku takut melihat keretakan lukaku di mata mereka.",
        subtleMeaning: "Isolasi rasa malu, pelarian dari konfrontasi realitas dosa (avoiding, neuroticism, Enneagram 4/5/6).",
        weights: {
          conflict: { avoiding: 1.3, collaborative: -0.9 },
          bigFive: { neuroticism: 0.9 },
          enneagram: { "4": 1.1, "5": 0.8 },
          evidence: { guiltAvoidanceIsolation: 1.2 }
        }
      }
    ]
  },
  {
    id: "rel_007",
    kind: "singleChoice",
    domain: "family_sensitivity",
    prompt: "Ketika pertemuan reuni keluarga besar melemparkan pertanyaan sensitif yang tidak nyaman bagimu (misal jodoh, karir, keturunan), apa rute relasimu?",
    instruction: "Pilih taktik bertahan hidup interpersonal di tengah desakan keluarga.",
    reliability: 0.86,
    targetSystems: ["communication", "conflict", "enneagram"],
    options: [
      {
        id: "a",
        text: "Menjawabnya sembari bercanda kocak, mengalihkan mic ke orang lain dengan gesit, lalu lekas berpindah ke meja makanan.",
        subtleMeaning: "Pembelokan humoristik santai, pengabaian gesit (P, Enneagram 7, extraversion).",
        weights: {
          mbtiAxis: { P: 0.7 },
          enneagram: { "7": 1.3 },
          bigFive: { extraversion: 0.7 },
          communication: { expressive: 0.9 },
          evidence: { jovialDeflectionTactics: 1.3 }
        }
      },
      {
        id: "b",
        text: "Menjawabnya dengan senyum dingin, singkat, padat, datar tanpa penjelasan detail tambahan agar penanya merasa bosan mengajukan pertanyaan lanjutan.",
        subtleMeaning: "Sovereignty pembawaan, tembok asertif sunyi (I, Ti/Ni, Enneagram 5/8).",
        weights: {
          mbtiAxis: { I: 0.8 },
          cognitive: { Ti: 0.6, Ni: 0.5 },
          enneagram: { "5": 1.1, "8": 0.6 },
          communication: { analytical: 0.9, direct: 0.4 },
          evidence: { flatMinimalistAnswer: 1.2 }
        }
      },
      {
        id: "c",
        text: "Tersenyum sopan dan menjelaskan situasi aslinya secara diplomatis dengan kata-kata indah agar mereka terpuaskan dan tidak khawatir salah sangka.",
        subtleMeaning: "Fawning sosiabel diplomatis, menjaga harmoni batin keluarga (Fe, diplomatic, Enneagram 2/9).",
        weights: {
          cognitive: { Fe: 0.9 },
          communication: { diplomatic: 1.2 },
          conflict: { accommodating: 1.0 },
          enneagram: { "2": 0.9, "9": 1.1 },
          evidence: { courteousDiplomaticPacifier: 1.3 }
        }
      }
    ]
  },
  {
    id: "rel_008",
    kind: "singleChoice",
    domain: "friendship_loss",
    prompt: "Saat menyadari jalinan persahabatan lama perlahan-lahan merenggang secara alami karena perbedaan prinsip hidup yang tajam, apa sikap batinmu?",
    instruction: "Pilih penyelarasan emosional relasi masa lalu.",
    reliability: 0.88,
    targetSystems: ["values", "enneagram", "relationship"],
    options: [
      {
        id: "a",
        text: "Aku merelakannya pergi dengan tabah; kehidupan berputar dalam musim-musim dinamis, dan tidak semua orang ditakdirkan mengawal rasi perjalananku hingga akhir.",
        subtleMeaning: "Penerimaan yang dewasa, ketabahan realitas eksistensial (secureLeaning, Enneagram 9/5).",
        weights: {
          relationship: { secureLeaning: 1.3 },
          enneagram: { "9": 1.2, "5": 0.8 },
          values: { maturity: 1.1 },
          evidence: { sereneLettingGoRelational: 1.3 }
        }
      },
      {
        id: "b",
        text: "Aku merasa dirundung kesedihan yang getir, mengenang momen-momen emas yang terbuang, kerap memandang foto masa lalu, merasa terbuang.",
        subtleMeaning: "Sentimentalitas nostalgia batin yang erat, kepedihan pelepasan (anxiousLeaning, Fi, Enneagram 4).",
        weights: {
          relationship: { anxiousLeaning: 1.0 },
          cognitive: { Fi: 0.8, Si: 0.8 },
          enneagram: { "4": 1.3 },
          bigFive: { neuroticism: 0.8 },
          evidence: { nostalgicRelationalMelancholy: 1.3 }
        }
      },
      {
        id: "c",
        text: "Aku menutup hati seketika dan mengencangkan aktivitas lain; tidak ada gunanya menangisi relasi usang yang tidak lagi kompatibel dengan tujuanku.",
        subtleMeaning: "Rasionalisasi utilitas hidup, pemotongan melankoli (avoidantLeaning, Te, Enneagram 3/8).",
        weights: {
          relationship: { avoidantLeaning: 1.1 },
          cognitive: { Te: 0.8 },
          enneagram: { "3": 1.0, "8": 0.7 },
          evidence: { pragmaticEmotionalDetachment: 1.2 }
        }
      }
    ]
  },
  {
    id: "rel_009",
    kind: "singleChoice",
    domain: "relationship_boundaries",
    prompt: "Apa syarat utama bagimu sebelum memberikan akses intim ke dalam lubuk pikiran terdalammu kepada kenalan baru?",
    instruction: "Pilih kriteria selektivitas hubungan batinmu.",
    reliability: 0.91,
    targetSystems: ["relationship", "instinct", "values"],
    options: [
      {
        id: "a",
        text: "Waktu pengujian yang sangat panjang dan riwayat kesetiaan tindakan nyata yang terbukti berkali-kali tanpa celah.",
        subtleMeaning: "Penyeleksian lambat, pembuktian keamanan empiris (Si, sp/so, Enneagram 6).",
        weights: {
          cognitive: { Si: 0.8 },
          instinct: { sp: 1.1 },
          enneagram: { "6": 1.1 },
          values: { security: 1.2 },
          evidence: { highDurationSecurityGate: 1.3 }
        }
      },
      {
        id: "b",
        text: "Adanya 'klik' getaran kimia jiwa, keterbukaan orisinal seketika, dan kedalaman bahasan emosi tanpa kepalsuan topeng.",
        subtleMeaning: "Pengenalan kimiawi intuitif-emosional intens (sx, Fi/Ni, Enneagram 4).",
        weights: {
          cognitive: { Fi: 0.9, Ni: 0.6 },
          instinct: { sx: 1.4, sp: -0.6 },
          enneagram: { "4": 1.2 },
          loveStyle: { emotionalDepth: 1.3 },
          evidence: { magneticSoulClickGate: 1.3 }
        }
      },
      {
        id: "c",
        text: "Kecocokan visi akademis intelektual, hobi, proyek kerja sama, atau cara memandang taktik dunia modern secara rasional.",
        subtleMeaning: "Asosiasi fungsional berbasis pemikiran, kolaborasi ide (so, Ti/Ne/Te, Enneagram 5).",
        weights: {
          cognitive: { Ti: 0.7, Ne: 0.7, Te: 0.5 },
          instinct: { so: 1.2, sx: -0.4 },
          enneagram: { "5": 1.0 },
          evidence: { cognitiveAllianceGate: 1.2 }
        }
      }
    ]
  },
  {
    id: "rel_010",
    kind: "singleChoice",
    domain: "parental_comfort",
    prompt: "Ketika kamu berada di lingkungan keluarga inti dan atmosfer batin terasa agak hampa atau bersitegang, peran apa yang biasa kamu emban secara bawah sadar?",
    instruction: "Pilih pola adaptasi yang paling mendekati respons emosionalmu.",
    reliability: 0.88,
    targetSystems: ["stress", "conflict", "enneagram"],
    options: [
      {
        id: "a",
        text: "Menjadi peredam badai; berusaha bersikap netral, mendengarkan semua pihak, mendamaikan percikan amarah semampuku.",
        subtleMeaning: "Respons moderasi mediasi harmoni kelompok (accommodating/collaborative, fawn, Enneagram 9).",
        weights: {
          conflict: { collaborative: 1.1, accommodating: 1.0 },
          stress: { fawn: 1.2 },
          enneagram: { "9": 1.4 },
          evidence: { naturalRelationalMediator: 1.3 }
        }
      },
      {
        id: "b",
        text: "Menarik diri ke ruang kamar secepatnya; aku menolak menjadi bagian dari kebisingan drama yang bukan merupakan urusan langsungku.",
        subtleMeaning: "Isolasi diri menjangkau ketenangan, penyelamatan energi (avoiding, flight, Enneagram 5).",
        weights: {
          conflict: { avoiding: 1.3 },
          stress: { flight: 1.1 },
          enneagram: { "5": 1.3, "9": 0.4 },
          evidence: { escapeRelationalTurbulence: 1.2 }
        }
      },
      {
        id: "c",
        text: "Menolak tunduk; aku akan berdiri tegak menyuarakan kebenaran secara terus terang agar dinamika kebohongan atau manipulasi dihentikan saat itu juga.",
        subtleMeaning: "Konfrontasi tegak lurus demi integritas fakta (competitive, direct, Enneagram 8/1).",
        weights: {
          conflict: { competitive: 1.1 },
          communication: { direct: 1.1 },
          enneagram: { "8": 1.1, "1": 1.1 },
          evidence: { integrousRelationalConfront: 1.2 }
        }
      }
    ]
  }
];
