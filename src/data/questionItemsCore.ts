/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { QuestionItem } from "../types";

export const questionItemsCore: QuestionItem[] = [
  {
    id: "core_001",
    kind: "singleChoice",
    domain: "cognitive_problem_solving",
    prompt: "Bagaimana cara pertamamu merancang jalan keluar saat tiba-tiba menghadapi masalah rumit yang belum pernah terjadi sebelumnya?",
    instruction: "Pilih skenario yang paling menggambarkan kecenderungan spontanmu.",
    reliability: 0.95,
    targetSystems: ["cognitive", "mbtiAxis", "bigFive", "decision"],
    options: [
      {
        id: "a",
        text: "Mendiamkannya sejenak, membiarkan pikiran mengantre secara alami sampai sebuah gambaran pola besar atau solusi 'Aha!' muncul di kepalaku.",
        subtleMeaning: "Mengandalkan sintesis bawah sadar, pengenalan pola abstrak (Ni).",
        weights: {
          cognitive: { Ni: 1.5, Ne: 0.2, Se: -0.5, Si: -0.3 },
          mbtiAxis: { I: 0.6, N: 0.9, J: 0.5 },
          bigFive: { openness: 0.7, extraversion: -0.4 },
          decision: { analytical: 1.0, valueBased: 0.2, fastAction: -0.5 },
          values: { autonomy: 0.8 },
          evidence: { patternSynthesis: 1.2 },
          positive: { foresight: 1.1 },
          negative: { hesitation: -0.3 }
        }
      },
      {
        id: "b",
        text: "Berdiskusi dengan beberapa orang atau melakukan curah pikiran (brainstorming), memicu sebanyak mungkin ide mentah yang tidak biasa.",
        subtleMeaning: "Mengeksplorasi kemungkinan eksternal, korelasi acak (Ne).",
        weights: {
          cognitive: { Ne: 1.5, Ni: 0.1, Si: -0.5, Se: 0.3 },
          mbtiAxis: { E: 0.7, N: 0.9, P: 0.7 },
          bigFive: { extraversion: 0.8, openness: 1.0 },
          decision: { fastAction: 0.5, consensus: 0.6 },
          values: { competence: 0.5 },
          evidence: { brainstorming: 1.3 },
          positive: { ideation: 1.2 },
          negative: { lackOfFocus: -0.4 }
        }
      },
      {
        id: "c",
        text: "Mengingat-ingat kembali kejadian serupa di masa lalu, merujuk pada taktik yang terbukti berhasil dan prosedur yang sudah baku.",
        subtleMeaning: "Mengandalkan memori sensorik komparatif, preseden aman (Si).",
        weights: {
          cognitive: { Si: 1.5, Se: 0.2, Ne: -0.6, Ni: -0.4 },
          mbtiAxis: { I: 0.4, S: 0.9, J: 0.8 },
          bigFive: { conscientiousness: 1.1, openness: -0.6 },
          decision: { riskAware: 1.3, analytical: 0.4 },
          values: { security: 1.2 },
          evidence: { precedentRecall: 1.4 },
          positive: { detailPrecision: 1.2 },
          negative: { rigidity: -0.5 }
        }
      },
      {
        id: "d",
        text: "Segera turun tangan langsung menguji coba apa pun yang ada di depan mata secara praktis untuk melihat respons nyatanya detik itu juga.",
        subtleMeaning: "Interaksi taktis langsung dengan realitas fisik saat ini (Se).",
        weights: {
          cognitive: { Se: 1.5, Si: 0.1, Ni: -0.6, Ne: 0.2 },
          mbtiAxis: { E: 0.6, S: 0.9, P: 0.8 },
          bigFive: { extraversion: 0.6, conscientiousness: -0.3 },
          decision: { fastAction: 1.4, riskAware: -0.6 },
          values: { autonomy: 0.7 },
          evidence: { directAction: 1.4 },
          positive: { adaptability: 1.2 },
          negative: { impulsiveness: -0.6 }
        }
      }
    ]
  },
  {
    id: "core_002",
    kind: "singleChoice",
    domain: "cognitive_evaluation",
    prompt: "Saat harus memutuskan apakah suatu klaim atau aturan itu logis dan bisa diterima, apa yang matamu telusuri terlebih dulu?",
    instruction: "Pilih sudut pandang penjelajahan logis yang paling melekat padamu.",
    reliability: 0.94,
    targetSystems: ["cognitive", "mbtiAxis", "disc", "values"],
    options: [
      {
        id: "a",
        text: "Kecocokan internalnya secara murni. Apakah definisi dan alur argumennya memiliki kontradiksi internal, tak peduli apakah praktis atau tidak.",
        subtleMeaning: "Analisis arsitektur logika internal yang terisolasi dan universal (Ti).",
        weights: {
          cognitive: { Ti: 1.5, Te: -0.5, Fe: -0.6, Fi: 0.2 },
          mbtiAxis: { I: 0.5, T: 1.1 },
          bigFive: { openness: 0.6, agreeableness: -0.4 },
          disc: { C: 1.2 },
          values: { competence: 0.9, autonomy: 0.7 },
          evidence: { truthDeduction: 1.4 },
          positive: { criticalThinking: 1.2 },
          negative: { disconnection: -0.4 }
        }
      },
      {
        id: "b",
        text: "Hasil nyata, metrik empiris, dan kegunaannya secara konkret. Apakah aturan ini menghemat waktu, tenaga, atau meningkatkan output resmi.",
        subtleMeaning: "Analisis logis berdasarkan hukum eksternal, efisiensi, dan objektivitas (Te).",
        weights: {
          cognitive: { Te: 1.5, Ti: -0.4, Fi: -0.6, Fe: 0.1 },
          mbtiAxis: { E: 0.4, T: 1.1, J: 0.7 },
          bigFive: { conscientiousness: 1.1 },
          disc: { D: 1.1, C: 0.5 },
          values: { achievement: 1.1 },
          evidence: { operationalEfficiency: 1.3 },
          positive: { structureOrganization: 1.1 },
          negative: { impatience: -0.3 }
        }
      },
      {
        id: "c",
        text: "Apakah klaim ini selaras dengan nilai-nilai pribadiku tentang apa yang benar, autentik, dan tidak mencederai integritas batinku.",
        subtleMeaning: "Analisis moralitas internal, kesetaraan emosional personal (Fi).",
        weights: {
          cognitive: { Fi: 1.5, Fe: -0.5, Te: -0.6, Ti: 0.2 },
          mbtiAxis: { I: 0.6, F: 1.1 },
          bigFive: { agreeableness: 0.6, openness: 0.5 },
          values: { autonomy: 1.0, empathy: 0.9 },
          evidence: { identityAlignment: 1.4 },
          positive: { authenticity: 1.3 },
          negative: { subjectiveBias: -0.4 }
        }
      },
      {
        id: "d",
        text: "Bagaimana keputusan ini mempengaruhi harmoni antarpribadi kelompok, perasaan bersama, dan suasana emosional kolektif di sekitar.",
        subtleMeaning: "Analisis nilai eksternal, keseimbangan relasional (Fe).",
        weights: {
          cognitive: { Fe: 1.5, Fi: -0.5, Ti: -0.6, Te: 0.2 },
          mbtiAxis: { E: 0.6, F: 1.1, J: 0.4 },
          bigFive: { agreeableness: 1.2, extraversion: 0.5 },
          disc: { S: 1.0, I: 0.5 },
          values: { empathy: 1.1, benevolence: 1.0 },
          evidence: { relationalHarmony: 1.4 },
          positive: { diplomaticGrace: 1.2 },
          negative: { peerDependence: -0.4 }
        }
      }
    ]
  },
  {
    id: "core_003",
    kind: "singleChoice",
    domain: "cognitive_energy_focus",
    prompt: "Saat berada di tengah keramaian atau acara sosial yang panjang, apa yang biasanya terjadi pada fokus pikiranmu?",
    instruction: "Pilih gambaran energi yang paling jujur menurutmu.",
    reliability: 0.92,
    targetSystems: ["cognitive", "mbtiAxis", "bigFive", "hexaco"],
    options: [
      {
        id: "a",
        text: "Pikiran bergulir ke dalam batin; aku mulai berdialog dengan diri sendiri, mengamati orang lain sebagai penonton pasif, dan merasa energiku menipis perlahan.",
        subtleMeaning: "Orientasi energi introvert (I) dominan.",
        weights: {
          mbtiAxis: { I: 1.4, E: -1.4 },
          bigFive: { extraversion: -1.2 },
          hexaco: { extraversion: -1.1 },
          cognitive: { Ni: 0.4, Fi: 0.4, Ti: 0.4, Si: 0.3 },
          stress: { flight: 0.6 },
          evidence: { energyDrainSocial: 1.3 },
          positive: { introspectivePower: 1.1 },
          negative: { socialWithdrawal: -0.5 }
        }
      },
      {
        id: "b",
        text: "Energiku terstimulasi kuat oleh percakapan luar, suara, dan interaksi langsung; aku merasa makin bersemangat dan gemar menimpali sekeliling secara spontan.",
        subtleMeaning: "Orientasi energi ekstrovert (E) dominan.",
        weights: {
          mbtiAxis: { E: 1.4, I: -1.4 },
          bigFive: { extraversion: 1.3 },
          hexaco: { extraversion: 1.2 },
          cognitive: { Ne: 0.4, Se: 0.4, Fe: 0.4, Te: 0.3 },
          evidence: { socialStimulation: 1.3 },
          positive: { conversationalPresence: 1.2 },
          negative: { overSharing: -0.3 }
        }
      }
    ]
  },
  {
    id: "core_004",
    kind: "singleChoice",
    domain: "cognitive_perception_nature",
    prompt: "Saat menghadiri presentasi atau membaca buku baru, apa yang paling menarik bagimu dan tanpa sadar kamu cari tahu?",
    instruction: "Pilih ketertarikan yang paling alami muncul di benakmu.",
    reliability: 0.95,
    targetSystems: ["cognitive", "mbtiAxis", "bigFive"],
    options: [
      {
        id: "a",
        text: "Kemungkinan di masa depan, teori besar di balik layarnya, atau implikasi makna yang tidak tertulis secara kasat mata.",
        subtleMeaning: "Ketertarikan konsep abstrak, representasi intuitif (N).",
        weights: {
          mbtiAxis: { N: 1.4, S: -1.4 },
          cognitive: { Ni: 0.8, Ne: 1.0, Si: -0.8, Se: -0.6 },
          bigFive: { openness: 1.3 },
          evidence: { abstractPreference: 1.3 },
          positive: { conceptualSight: 1.2 },
          negative: { abstractDisconnection: -0.4 }
        }
      },
      {
        id: "b",
        text: "Data mentah, studi kasus nyata yang sudah dijalankan, rincian fakta, dan langkah-langkah praktis yang bisa segera dipraktikkan saat ini.",
        subtleMeaning: "Ketertarikan data konkret, representasi sensoris (S).",
        weights: {
          mbtiAxis: { S: 1.4, N: -1.4 },
          cognitive: { Si: 0.9, Se: 1.0, Ni: -0.8, Ne: -0.7 },
          bigFive: { openness: -0.8, conscientiousness: 0.5 },
          evidence: { concretePreference: 1.3 },
          positive: { factualPrecision: 1.2 },
          negative: { creativeScopeLimit: -0.4 }
        }
      }
    ]
  },
  {
    id: "core_005",
    kind: "singleChoice",
    domain: "cognitive_decision_basis",
    prompt: "Jika ada perdebatan kelompok, apa yang menurutmu harus menjadi pilar utama dalam merumuskan kesepakatan?",
    instruction: "Pilih kriteria keputusan yang paling mendasar bagi jiwamu.",
    reliability: 0.93,
    targetSystems: ["cognitive", "mbtiAxis", "bigFive"],
    options: [
      {
        id: "a",
        text: "Analisis kritis yang tidak memihak siapa pun, mengutamakan kejelasan objek dan struktur kebenaran murni tanpa melibatkan emosionalitas.",
        subtleMeaning: "Orientasi keputusan berbasis rasionalitas logis (T).",
        weights: {
          mbtiAxis: { T: 1.4, F: -1.4 },
          cognitive: { Ti: 0.9, Te: 1.0, Fi: -0.9, Fe: -0.8 },
          bigFive: { agreeableness: -0.7 },
          evidence: { objectiveDecisions: 1.3 },
          positive: { analyticalClarity: 1.2 },
          negative: { relationalChill: -0.4 }
        }
      },
      {
        id: "b",
        text: "Kesejahteraan psikologis anggota kelompok, keselarasan nilai-nilai kemanusiaan, serta bagaimana semua orang merasa dihargai secara emosional.",
        subtleMeaning: "Orientasi keputusan berbasis relasi/nilai emosional (F).",
        weights: {
          mbtiAxis: { F: 1.4, T: -1.4 },
          cognitive: { Fi: 0.9, Fe: 1.0, Ti: -0.9, Te: -0.7 },
          bigFive: { agreeableness: 1.1 },
          evidence: { collectiveEmpathy: 1.3 },
          positive: { relationalCare: 1.2 },
          negative: { logicalInconsistency: -0.4 }
        }
      }
    ]
  },
  {
    id: "core_006",
    kind: "singleChoice",
    domain: "cognitive_lifestyle_structure",
    prompt: "Bagaimana cara khasmu dalam mengelola rencana liburan atau agenda pekanan?",
    instruction: "Pilih gaya hidup atau persiapan yang paling nyaman bagimu.",
    reliability: 0.92,
    targetSystems: ["cognitive", "mbtiAxis", "bigFive"],
    options: [
      {
        id: "a",
        text: "Menyusun jadwal kegiatan dengan target waktu yang cukup rinci, merasa cemas jika membiarkan segalanya mengalir tanpa kepastian.",
        subtleMeaning: "Gaya penutupan rencana lebih awal, penataan luar (J).",
        weights: {
          mbtiAxis: { J: 1.4, P: -1.4 },
          cognitive: { Si: 0.6, Te: 0.8, Ni: 0.5, Ne: -0.8 },
          bigFive: { conscientiousness: 1.2 },
          evidence: { structuredPlanning: 1.3 },
          positive: { goalCommitment: 1.2 },
          negative: { lowFlexibility: -0.5 }
        }
      },
      {
        id: "b",
        text: "Hanya menentukan garis besar atau destinasi utama, lalu membiarkan keputusan teknis dinegosiasikan secara mendadak mengikuti mood atau peluang baru.",
        subtleMeaning: "Gaya pencarian opsi tak berujung, penyesuaian fleksibel (P).",
        weights: {
          mbtiAxis: { P: 1.4, J: -1.4 },
          cognitive: { Ne: 0.7, Se: 0.8, Fi: 0.4, Te: -0.8 },
          bigFive: { conscientiousness: -1.0 },
          evidence: { openAdaptability: 1.3 },
          positive: { spontaneousFlow: 1.2 },
          negative: { lackOfExecution: -0.4 }
        }
      }
    ]
  },
  {
    id: "core_007",
    kind: "singleChoice",
    domain: "cognitive_subtle_ne_versus_ni",
    prompt: "Ketika melihat sebuah pola atau simbol yang misterius, apa gerakan instingtif yang terjadi di kepalamu?",
    instruction: "Pilih kecenderungan asosiatif pikiran yang paling sering terjadi.",
    reliability: 0.91,
    targetSystems: ["cognitive", "bigFive"],
    options: [
      {
        id: "a",
        text: "Pikiranku melompat-lompat liar dari satu ide ke ide lain, mengaitkannya dengan berbagai hal acak di tempat lain yang tampaknya tidak ada hubungannya.",
        subtleMeaning: "Fungsi Ne (Intuisi ekstrovert) memancar ke luar mengumpulkan variasi korelasi.",
        weights: {
          cognitive: { Ne: 1.4, Ni: -0.4 },
          mbtiAxis: { N: 0.6, P: 0.4 },
          bigFive: { openness: 0.8 },
          evidence: { divergentAssociation: 1.2 },
          positive: { associativeLeap: 1.1 }
        }
      },
      {
        id: "b",
        text: "Pikiranku memadat ke dalam seolah ditarik magnet, mengerucutkan simbol tersebut menjadi satu makna inti yang paling dalam dan fundamental.",
        subtleMeaning: "Fungsi Ni (Intuisi introvert) mengerucut menyatukan pola menjadi satu visi besar.",
        weights: {
          cognitive: { Ni: 1.4, Ne: -0.4 },
          mbtiAxis: { N: 0.6, J: 0.4 },
          bigFive: { openness: 0.6 },
          evidence: { convergentSynthesis: 1.2 },
          positive: { visionSingularity: 1.1 }
        }
      }
    ]
  },
  {
    id: "core_008",
    kind: "singleChoice",
    domain: "cognitive_subtle_fi_versus_fe",
    prompt: "Jika ada seseorang di dekatmu terlihat sedih tanpa berbicara, bagaimana respons alamiah hatimu?",
    instruction: "Pilih arus emosi pertama yang membasahi sanubarimu.",
    reliability: 0.93,
    targetSystems: ["cognitive", "bigFive", "values"],
    options: [
      {
        id: "a",
        text: "Aku segera merefleksikan rasa sedih itu ke dalam dadaku sendiri, membayangkan jika posisi tersakit itu terjadi padaku agar aku memahami keaslian lukanya.",
        subtleMeaning: "Fungsi Fi (Perasaan introvert) mencocokkan empati lewat emosionalitas internal autentik.",
        weights: {
          cognitive: { Fi: 1.4, Fe: -0.3 },
          mbtiAxis: { F: 0.5, I: 0.3 },
          bigFive: { agreeableness: 0.7 },
          values: { empathy: 1.1 },
          evidence: { internalEmpatheticReflection: 1.2 },
          positive: { moralIntegrousEmp: 1.0 }
        }
      },
      {
        id: "b",
        text: "Aku merasa terpanggil untuk menyesuaikan aura emosiku dengan mereka, merangkulnya lewat interaksi hangat, atau memecah ketegangan agar dia merasa nyaman.",
        subtleMeaning: "Fungsi Fe (Perasaan ekstrovert) bergerak menyelaraskan dan merawat ekosistem emosional luar.",
        weights: {
          cognitive: { Fe: 1.4, Fi: -0.3 },
          mbtiAxis: { F: 0.5, E: 0.4 },
          bigFive: { agreeableness: 0.9 },
          values: { benevolence: 1.0 },
          evidence: { socialAtmosphereHarmony: 1.2 },
          positive: { interpersonalWarmth: 1.1 }
        }
      }
    ]
  },
  {
    id: "core_009",
    kind: "singleChoice",
    domain: "cognitive_subtle_ti_versus_te",
    prompt: "Ketika kamu berniat merapikan lemari buku, lemari baju, atau file komputer, prinsip apa yang paling kamu agungkan?",
    instruction: "Pilih pola keteraturan batin yang paling jujur representasinya.",
    reliability: 0.92,
    targetSystems: ["cognitive", "mbtiAxis", "disc"],
    options: [
      {
        id: "a",
        text: "Mengklasifikasikannya berdasarkan teori kegunaan praktis, kepraktisan akses tercepat, atau kemudahan navigasi bagi siapa saja yang menggunakannya.",
        subtleMeaning: "Fungsi Te (Berpikir ekstrovert) menyusun struktur demi hasil eksternal, objektivitas, dan sistemisasi.",
        weights: {
          cognitive: { Te: 1.4, Ti: -0.4 },
          mbtiAxis: { T: 0.5, J: 0.5 },
          disc: { D: 0.4, C: 0.6 },
          evidence: { externalUtilityStructure: 1.2 },
          positive: { systematicEfficiency: 1.1 }
        }
      },
      {
        id: "b",
        text: "Membuat kategori berdasarkan kerangka berpikir logis kustom ciptaanku sendiri yang terasa sangat rapi secara konseptual, meskipun mungkin rumit bagi orang lain.",
        subtleMeaning: "Fungsi Ti (Berpikir introvert) mendesain kategori dengan taksonomi presisi internal yang memuaskan kognisinya.",
        weights: {
          cognitive: { Ti: 1.4, Te: -0.4 },
          mbtiAxis: { T: 0.5, I: 0.3 },
          disc: { C: 1.0 },
          evidence: { internalLogisticalElegance: 1.2 },
          positive: { customCategorization: 1.1 }
        }
      }
    ]
  },
  {
    id: "core_010",
    kind: "singleChoice",
    domain: "cognitive_subtle_se_versus_si",
    prompt: "Ketika kamu berada di suatu tempat dengan pemandangan alam yang indah, sensasi batin seperti apa yang menguasaimu?",
    instruction: "Pilih getaran indrawi yang menyapu perhatian terbesarmu.",
    reliability: 0.94,
    targetSystems: ["cognitive", "mbtiAxis", "bigFive"],
    options: [
      {
        id: "a",
        text: "Aku ingin meresapinya dengan ketenangan, mengingat kesyahduan masa lalu, membandingkan suasananya dengan kenangan manis, dan menjaga rasa nyaman batin.",
        subtleMeaning: "Fungsi Si (Sensorik introvert) memetakan stimulus luar ke dalam katalog kenyamanan, sejarah, dan sensasi internal.",
        weights: {
          cognitive: { Si: 1.4, Se: -0.4 },
          mbtiAxis: { S: 0.5, J: 0.3 },
          bigFive: { conscientiousness: 0.4 },
          evidence: { nostalgicMemorySensory: 1.2 },
          positive: { internalSensoryPreservation: 1.1 }
        }
      },
      {
        id: "b",
        text: "Aku ingin mengeksplorasi setiap jengkal tekstur udaranya sekarang, memanjat bebatuannya, menikmati detail fisiknya langsung secara intens tanpa refleksi rumit.",
        subtleMeaning: "Fungsi Se (Sensorik ekstrovert) melebur menyatu dengan lingkungan fisik real-time tanpa penundaan konseptual.",
        weights: {
          cognitive: { Se: 1.4, Si: -0.4 },
          mbtiAxis: { S: 0.5, P: 0.4 },
          bigFive: { extraversion: 0.4 },
          evidence: { immersiveSensoryExperience: 1.2 },
          positive: { presentPresence: 1.1 }
        }
      }
    ]
  }
];
