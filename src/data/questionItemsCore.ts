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
    prompt: "Dikasih tugas mendadak yang aneh banget dan ga ada contohnya di Google atau ChatGPT. Gaya pertamamu?",
    instruction: "Pilih skenario yang paling menggambarkan kecenderungan spontanmu.",
    reliability: 1.0,
    targetSystems: ["cognitive", "mbtiAxis", "bigFive", "decision", "values", "enneagram", "disc"],
    options: [
      {
        id: "a",
        text: "Merenung sendirian sambil denger lagu, sampai tiba-tiba dapet firasat 'Aha!' yang ngerangkum benang merahnya di kepala.",
        subtleMeaning: "Mengandalkan sintesis bawah sadar, pengenalan pola abstrak (Ni).",
        weights: {
          cognitive: { Ni: 4.5, Ne: 1.0, Se: -1.5, Si: -0.5 },
          mbtiAxis: { I: 3.5, N: 4.0, J: 2.5 },
          bigFive: { openness: 3.0, extraversion: -2.0 },
          decision: { analytical: 3.5, valueBased: 1.0, fastAction: -1.5 },
          values: { autonomy: 3.0, competence: 1.5 },
          enneagram: { "5": 3.5, "4": 2.0 },
          disc: { C: 2.5, S: 1.5 },
          evidence: { patternSynthesis: 1.5 },
          positive: { foresight: 1.5 },
          negative: { hesitation: -0.5 },
          reliability: 1.0
        }
      },
      {
        id: "b",
        text: "Nge-chat temen-temen buat ngebahas ide-ide gila yang di luar nalar, meskipun ga nyambung tapi seru buat dicoba.",
        subtleMeaning: "Mengeksplorasi kemungkinan eksternal, korelasi acak (Ne).",
        weights: {
          cognitive: { Ne: 4.5, Ni: 1.0, Si: -1.5, Se: 1.0 },
          mbtiAxis: { E: 3.5, N: 4.0, P: 3.5 },
          bigFive: { extraversion: 3.5, openness: 3.5 },
          decision: { fastAction: 2.5, consensus: 2.0 },
          values: { competence: 1.5, freedom: 3.0 },
          enneagram: { "7": 4.0, "3": 1.5 },
          disc: { I: 3.5, D: 1.5 },
          evidence: { brainstorming: 1.5 },
          positive: { ideation: 1.5 },
          negative: { lackOfFocus: -0.5 },
          reliability: 1.0
        }
      },
      {
        id: "c",
        text: "Nyari arsip tugas angkatan lama atau aturan SOP tertulis biar ngerjainnya lurus, aman, dan ga dapet omelan.",
        subtleMeaning: "Mengandalkan memori sensorik komparatif, preseden aman (Si).",
        weights: {
          cognitive: { Si: 4.5, Se: 1.0, Ne: -1.5, Ni: -0.5 },
          mbtiAxis: { I: 2.5, S: 4.0, J: 4.0 },
          bigFive: { conscientiousness: 3.5, openness: -1.5 },
          decision: { riskAware: 4.0, analytical: 1.5 },
          values: { security: 3.5, conformity: 2.5 },
          enneagram: { "6": 3.5, "1": 2.5 },
          disc: { C: 3.5, S: 2.0 },
          evidence: { precedentRecall: 1.5 },
          positive: { detailPrecision: 1.5 },
          negative: { rigidity: -0.5 },
          reliability: 1.0
        }
      },
      {
        id: "d",
        text: "Langsung hajar ngerjain asal-asalan apa yang ada di depan mata biar cepet tau kesalahannya dari respon lapangan langsung.",
        subtleMeaning: "Interaksi taktis langsung dengan realitas fisik saat ini (Se).",
        weights: {
          cognitive: { Se: 4.5, Si: 1.0, Ni: -1.5, Ne: 1.0 },
          mbtiAxis: { E: 3.5, S: 4.0, P: 4.0 },
          bigFive: { extraversion: 2.5, conscientiousness: -1.0 },
          decision: { fastAction: 4.0, riskAware: -1.5 },
          values: { autonomy: 2.5, freedom: 3.0 },
          enneagram: { "8": 3.5, "7": 2.0 },
          disc: { D: 3.5, I: 1.5 },
          evidence: { directAction: 1.5 },
          positive: { adaptability: 1.5 },
          negative: { impulsiveness: -0.5 },
          reliability: 1.0
        }
      }
    ]
  },
  {
    id: "core_002",
    kind: "singleChoice",
    domain: "cognitive_evaluation",
    prompt: "Saat ada aturan baru dari atasan atau guru yang kedengarannya aneh, fokus kritik utamamu?",
    instruction: "Pilih sudut pandang penjelajahan logis yang paling melekat padamu.",
    reliability: 1.0,
    targetSystems: ["cognitive", "mbtiAxis", "disc", "values", "enneagram", "decision"],
    options: [
      {
        id: "a",
        text: "Analisis konsistensi kalimatnya. Kalo logikanya cacat atau kontradiktif, aku gemes banget dan ga bakal mau nerima.",
        subtleMeaning: "Analisis arsitektur logika internal yang terisolasi dan universal (Ti).",
        weights: {
          cognitive: { Ti: 4.5, Te: -1.2, Fe: -1.5, Fi: 0.5 },
          mbtiAxis: { I: 2.5, T: 4.0 },
          bigFive: { openness: 2.0, agreeableness: -1.0 },
          disc: { C: 3.5 },
          values: { competence: 3.0, autonomy: 2.0 },
          enneagram: { "5": 4.0, "1": 1.5 },
          decision: { analytical: 3.5 },
          evidence: { truthDeduction: 1.5 },
          positive: { criticalThinking: 1.5 },
          negative: { disconnection: -0.5 },
          reliability: 1.0
        }
      },
      {
        id: "b",
        text: "Lihat efisiensinya secara nyata. Aturan ini buang-buang waktu or nambah profit / kuota beresin tugas secara cepat?",
        subtleMeaning: "Analisis logis berdasarkan hukum eksternal, efisiensi, dan objektivitas (Te).",
        weights: {
          cognitive: { Te: 4.5, Ti: -1.0, Fi: -1.5, Fe: 0.5 },
          mbtiAxis: { E: 2.5, T: 4.0, J: 3.0 },
          bigFive: { conscientiousness: 3.5 },
          disc: { D: 3.5, C: 1.5 },
          values: { achievement: 3.5, competence: 2.0 },
          enneagram: { "3": 4.0, "8": 3.0 },
          decision: { fastAction: 3.0, analytical: 2.0 },
          evidence: { operationalEfficiency: 1.5 },
          positive: { structureOrganization: 1.5 },
          negative: { impatience: -0.5 },
          reliability: 1.0
        }
      },
      {
        id: "c",
        text: "Menyelaraskan dengan prinsip moral dan rasa kejujuranku sendiri. Kalo bertentangan sama hati nurani, ku-skip keras.",
        subtleMeaning: "Analisis moralitas internal, kesetaraan emosional personal (Fi).",
        weights: {
          cognitive: { Fi: 4.5, Fe: -1.2, Te: -1.5, Ti: 0.5 },
          mbtiAxis: { I: 3.0, F: 4.0 },
          bigFive: { agreeableness: 2.0, openness: 2.0 },
          values: { autonomy: 3.0, empathy: 2.5 },
          enneagram: { "4": 4.0, "1": 2.0 },
          decision: { valueBased: 4.0 },
          evidence: { identityAlignment: 1.5 },
          positive: { authenticity: 1.5 },
          negative: { subjectiveBias: -0.5 },
          reliability: 1.0
        }
      },
      {
        id: "d",
        text: "Melihat dampaknya ke hubungan anak-anak. Mending diikutin aja demi harmoni kelas dari pada bikin perpecahan tegang.",
        subtleMeaning: "Analisis nilai eksternal, keseimbangan relasional (Fe).",
        weights: {
          cognitive: { Fe: 4.5, Fi: -1.2, Ti: -1.5, Te: 0.5 },
          mbtiAxis: { E: 3.0, F: 4.0, J: 2.0 },
          bigFive: { agreeableness: 3.5, extraversion: 2.0 },
          disc: { S: 3.5, I: 2.0 },
          values: { empathy: 3.0, benevolence: 3.0 },
          enneagram: { "9": 4.0, "2": 3.0 },
          decision: { consensus: 4.0 },
          evidence: { relationalHarmony: 1.5 },
          positive: { diplomaticGrace: 1.5 },
          negative: { peerDependence: -0.5 },
          reliability: 1.0
        }
      }
    ]
  },
  {
    id: "core_003",
    kind: "singleChoice",
    domain: "cognitive_energy_focus",
    prompt: "Baru pulang dari pesta kondangan atau reuni sekolah yang rame dan panjang berjam-jam. Kondisi energimu?",
    instruction: "Pilih gambaran energi yang paling jujur menurutmu.",
    reliability: 1.0,
    targetSystems: ["cognitive", "mbtiAxis", "bigFive", "hexaco", "stress", "enneagram", "disc"],
    options: [
      {
        id: "a",
        text: "Baterai sosial minus persen. Pengen buru-buru ngunci diri di kamar buat ngegame atau bengong tanpa denger suara orang lain.",
        subtleMeaning: "Orientasi energi introvert (I) dominan.",
        weights: {
          mbtiAxis: { I: 5.0, E: -5.0 },
          bigFive: { extraversion: -4.0 },
          hexaco: { extraversion: -4.0 },
          cognitive: { Ni: 2.5, Fi: 2.0, Ti: 2.5, Si: 2.0 },
          stress: { flight: 2.5, freeze: 1.5 },
          enneagram: { "5": 3.5, "9": 2.0 },
          disc: { C: 2.5, S: 1.5 },
          evidence: { energyDrainSocial: 1.5 },
          positive: { introspectivePower: 1.5 },
          negative: { socialWithdrawal: -0.5 },
          reliability: 1.0
        }
      },
      {
        id: "b",
        text: "Malah makin on dan seger! Rasanya siap lanjut nongkrong di warkop bareng temen-temen sampai subuh buat denger cerita baru.",
        subtleMeaning: "Orientasi energi ekstrovert (E) dominan.",
        weights: {
          mbtiAxis: { E: 5.0, I: -5.0 },
          bigFive: { extraversion: 4.0 },
          hexaco: { extraversion: 4.0 },
          cognitive: { Ne: 2.5, Se: 2.5, Fe: 2.0, Te: 1.5 },
          enneagram: { "7": 3.5, "2": 2.0 },
          disc: { I: 3.5, D: 1.5 },
          evidence: { socialStimulation: 1.5 },
          positive: { conversationalPresence: 1.5 },
          negative: { overSharing: -0.5 },
          reliability: 1.0
        }
      }
    ]
  },
  {
    id: "core_004",
    kind: "singleChoice",
    domain: "cognitive_perception_nature",
    prompt: "Ketika diajak nonton film fiksi ilmiah (Sci-Fi) yang kompleks atau baca teori konspirasi terbaru. Pikiranmu?",
    instruction: "Pilih ketertarikan yang paling alami muncul di benakmu.",
    reliability: 1.0,
    targetSystems: ["cognitive", "mbtiAxis", "bigFive", "hexaco", "values", "enneagram"],
    options: [
      {
        id: "a",
        text: "Otak langsung melayang memikirkan pesan filosofis rahasia di baliknya, makna masa depan, dan implikasi metaforis tak terlihat.",
        subtleMeaning: "Ketertarikan konsep abstrak, representasi intuitif (N).",
        weights: {
          mbtiAxis: { N: 5.0, S: -5.0 },
          cognitive: { Ni: 3.5, Ne: 3.5, Si: -2.0, Se: -2.0 },
          bigFive: { openness: 4.0 },
          hexaco: { openness: 3.5 },
          values: { autonomy: 2.0, competence: 1.5 },
          enneagram: { "5": 3.0, "4": 3.0 },
          evidence: { abstractPreference: 1.5 },
          positive: { conceptualSight: 1.5 },
          negative: { abstractDisconnection: -0.5 },
          reliability: 1.0
        }
      },
      {
        id: "b",
        text: "Lebih fokus ke akting, visual efek yang keren, rincian plot yang logis, atau seberapa masuk akalnya film itu dibanding dunia riil.",
        subtleMeaning: "Ketertarikan data konkret, representasi sensoris (S).",
        weights: {
          mbtiAxis: { S: 5.0, N: -5.0 },
          cognitive: { Si: 3.5, Se: 3.5, Ni: -2.0, Ne: -2.0 },
          bigFive: { openness: -2.5, conscientiousness: 2.0 },
          hexaco: { openness: -2.0, conscientiousness: 2.0 },
          values: { security: 2.0 },
          enneagram: { "6": 2.5, "8": 2.0 },
          evidence: { concretePreference: 1.5 },
          positive: { factualPrecision: 1.5 },
          negative: { creativeScopeLimit: -0.5 },
          reliability: 1.0
        }
      }
    ]
  },
  {
    id: "core_005",
    kind: "singleChoice",
    domain: "cognitive_decision_basis",
    prompt: "Temen curhat sambil nangis karena baru putus cinta, tapi ternyata dia yang selingkuh dari pacarnya. Respon spontanmu?",
    instruction: "Pilih kriteria keputusan yang paling mendasar bagi jiwamu.",
    reliability: 1.0,
    targetSystems: ["cognitive", "mbtiAxis", "bigFive", "decision", "enneagram", "disc"],
    options: [
      {
        id: "a",
        text: "Langsung nunjukin kesalahannya secara logis dan menyuruh dia sadar diri, emosi itu nomor dua yang penting kejelasan objek masalah.",
        subtleMeaning: "Orientasi keputusan berbasis rasionalitas logis (T).",
        weights: {
          mbtiAxis: { T: 5.0, F: -5.0 },
          cognitive: { Ti: 3.5, Te: 3.5, Fi: -2.0, Fe: -2.0 },
          bigFive: { agreeableness: -3.0 },
          decision: { analytical: 4.5, fastAction: 1.5 },
          enneagram: { "5": 3.5, "8": 2.5, "1": 2.5 },
          disc: { D: 3.0, C: 2.0 },
          evidence: { objectiveDecisions: 1.5 },
          positive: { analyticalClarity: 1.5 },
          negative: { relationalChill: -0.5 },
          reliability: 1.0
        }
      },
      {
        id: "b",
        text: "Ngerangkul atau nemenin dengerin curhatnya dulu biar dia tenang, urusan siapa yang salah dipikir belakangan yang penting dia ga stres.",
        subtleMeaning: "Orientasi keputusan berbasis relasi/nilai emosional (F).",
        weights: {
          mbtiAxis: { F: 5.0, T: -5.0 },
          cognitive: { Fi: 3.5, Fe: 3.5, Ti: -2.0, Te: -2.0 },
          bigFive: { agreeableness: 4.0 },
          decision: { valueBased: 3.5, consensus: 2.5 },
          enneagram: { "2": 3.5, "9": 3.5, "4": 2.0 },
          disc: { S: 3.5, I: 2.0 },
          evidence: { collectiveEmpathy: 1.5 },
          positive: { relationalCare: 1.5 },
          negative: { logicalInconsistency: -0.5 },
          reliability: 1.0
        }
      }
    ]
  },
  {
    id: "core_006",
    kind: "singleChoice",
    domain: "cognitive_lifestyle_structure",
    prompt: "Gaya khasmu pas hari Minggu menjelang pekan kerja atau liburan besok?",
    instruction: "Pilih gaya hidup atau persiapan yang paling nyaman bagimu.",
    reliability: 1.0,
    targetSystems: ["cognitive", "mbtiAxis", "bigFive", "enneagram", "values", "disc"],
    options: [
      {
        id: "a",
        text: "Jadwal sudah rapi tercatat per jam di binder atau aplikasi kalender, stres berat kalo ada agenda mendadak ngerusak timeline-ku.",
        subtleMeaning: "Gaya penutupan rencana lebih awal, penataan luar (J).",
        weights: {
          mbtiAxis: { J: 5.5, P: -5.5 },
          cognitive: { Si: 2.5, Te: 3.0, Ni: 1.5, Ne: -2.5 },
          bigFive: { conscientiousness: 4.5 },
          enneagram: { "1": 4.0, "6": 2.5, "3": 2.0 },
          values: { security: 3.0, competence: 1.5 },
          disc: { C: 4.0, D: 1.5 },
          evidence: { structuredPlanning: 1.5 },
          positive: { goalCommitment: 1.5 },
          negative: { lowFlexibility: -0.5 },
          reliability: 1.0
        }
      },
      {
        id: "b",
        text: "Ga ada jadwal sama sekali, lihat mood besok pagi aja mau berbuat apa, kelenturan dan kebebasan adalah kunci keselamatan jiwaku.",
        subtleMeaning: "Gaya pencarian opsi tak berujung, penyesuaian fleksibel (P).",
        weights: {
          mbtiAxis: { P: 5.5, J: -5.5 },
          cognitive: { Ne: 3.0, Se: 3.0, Fi: 1.5, Te: -2.5 },
          bigFive: { conscientiousness: -4.0 },
          enneagram: { "7": 4.5, "9": 2.5, "4": 2.0 },
          values: { autonomy: 3.0, freedom: 3.5 },
          disc: { I: 3.5, C: -2.0 },
          evidence: { openAdaptability: 1.5 },
          positive: { spontaneousFlow: 1.5 },
          negative: { lackOfExecution: -0.5 },
          reliability: 1.0
        }
      }
    ]
  },
  {
    id: "core_007",
    kind: "singleChoice",
    domain: "cognitive_subtle_ne_versus_ni",
    prompt: "Melihat awan berbentuk aneh atau coretan grafiti misterius di jalan. Otakmu refleks ngapain?",
    instruction: "Pilih kecenderungan asosiatif pikiran yang paling sering terjadi.",
    reliability: 1.0,
    targetSystems: ["cognitive", "bigFive", "enneagram", "riasec"],
    options: [
      {
        id: "a",
        text: "Asosiasi melompat ke 10 hal konyol yang ga nyambung (alien, resep seblak, anime masa kecil, kepunahan dinosaurus) secara cepat.",
        subtleMeaning: "Fungsi Ne (Intuisi ekstrovert) memancar ke luar mengumpulkan variasi korelasi.",
        weights: {
          cognitive: { Ne: 5.0, Ni: -2.0 },
          mbtiAxis: { N: 3.0, P: 2.0 },
          bigFive: { openness: 3.5 },
          enneagram: { "7": 4.0, "4": 1.5 },
          riasec: { Artistic: 3.5 },
          evidence: { divergentAssociation: 1.5 },
          positive: { associativeLeap: 1.5 },
          reliability: 1.0
        }
      },
      {
        id: "b",
        text: "Mata langsung menyipit, mencari satu rahasia makna tersirat yang mendalam dan esensi tunggal di balik coretan misterius tersebut.",
        subtleMeaning: "Fungsi Ni (Intuisi introvert) mengerucut menyatukan pola menjadi satu visi besar.",
        weights: {
          cognitive: { Ni: 5.5, Ne: -2.0 },
          mbtiAxis: { N: 3.0, J: 2.0 },
          bigFive: { openness: 3.0 },
          enneagram: { "5": 4.0, "4": 3.0 },
          riasec: { Investigative: 3.5 },
          evidence: { convergentSynthesis: 1.5 },
          positive: { visionSingularity: 1.5 },
          reliability: 1.0
        }
      }
    ]
  },
  {
    id: "core_008",
    kind: "singleChoice",
    domain: "cognitive_subtle_fi_versus_fe",
    prompt: "Ada orang di sebelahmu di MRT terlihat menahan tangis seharian. Dorongan terdalammu?",
    instruction: "Pilih arus emosi pertama yang membasahi sanubarimu.",
    reliability: 1.0,
    targetSystems: ["cognitive", "bigFive", "values", "enneagram"],
    options: [
      {
        id: "a",
        text: "Aku ikut ngerasain sesak di dadaku sendiri, membayangkan seberapa hancurnya hatiku kalo di posisinya agar aku dapet kesucian lukanya.",
        subtleMeaning: "Fungsi Fi (Perasaan introvert) mencocokkan empati lewat emosionalitas internal autentik.",
        weights: {
          cognitive: { Fi: 5.5, Fe: -2.0 },
          mbtiAxis: { F: 2.5, I: 2.0 },
          bigFive: { agreeableness: 3.0 },
          values: { empathy: 3.5 },
          enneagram: { "4": 4.5, "1": 1.5 },
          evidence: { internalEmpatheticReflection: 1.5 },
          positive: { moralIntegrousEmp: 1.5 },
          reliability: 1.0
        }
      },
      {
        id: "b",
        text: "Pengen nawarin tisu atau menepuk bahunya hangat agar atmosfer kesedihan di MRT ini segera mencair dan dia ngerasa diselamatkan.",
        subtleMeaning: "Fungsi Fe (Perasaan ekstrovert) bergerak menyelaraskan dan merawat ekosistem emosional luar.",
        weights: {
          cognitive: { Fe: 5.5, Fi: -2.0 },
          mbtiAxis: { F: 2.5, E: 2.0 },
          bigFive: { agreeableness: 4.0 },
          values: { benevolence: 3.5 },
          enneagram: { "2": 4.5, "9": 3.0 },
          evidence: { socialAtmosphereHarmony: 1.5 },
          positive: { interpersonalWarmth: 1.5 },
          reliability: 1.0
        }
      }
    ]
  },
  {
    id: "core_009",
    kind: "singleChoice",
    domain: "cognitive_subtle_ti_versus_te",
    prompt: "Ketika memilah puluhan folder dokumen di laptop atau menyortir barang di gudang...",
    instruction: "Pilih pola keteraturan batin yang paling jujur representasinya.",
    reliability: 1.0,
    targetSystems: ["cognitive", "mbtiAxis", "disc", "enneagram"],
    options: [
      {
        id: "a",
        text: "Merapikannya berdasarkan folder fungsional standar tercepat biar semua orang gampang cari dan kerjaan cepet kelar.",
        subtleMeaning: "Fungsi Te (Berpikir ekstrovert) menyusun struktur demi hasil eksternal, objektivitas, dan sistemisasi.",
        weights: {
          cognitive: { Te: 5.5, Ti: -2.0 },
          mbtiAxis: { T: 2.5, J: 2.0 },
          disc: { D: 2.5, C: 2.0 },
          enneagram: { "3": 4.0, "1": 2.5 },
          evidence: { externalUtilityStructure: 1.5 },
          positive: { systematicEfficiency: 1.5 },
          reliability: 1.0
        }
      },
      {
        id: "b",
        text: "Mendesain kategori logika custom yang super rapi dan estetik versiku sendiri, biarpun orang lain bingung tapi batin rasanya puas.",
        subtleMeaning: "Fungsi Ti (Berpikir introvert) mendesain kategori dengan taksonomi presisi internal yang memuaskan kognisinya.",
        weights: {
          cognitive: { Ti: 5.5, Te: -2.0 },
          mbtiAxis: { T: 2.5, I: 2.0 },
          disc: { C: 4.5 },
          enneagram: { "5": 4.0, "1": 2.0 },
          evidence: { internalLogisticalElegance: 1.5 },
          positive: { customCategorization: 1.5 },
          reliability: 1.0
        }
      }
    ]
  },
  {
    id: "core_010",
    kind: "singleChoice",
    domain: "cognitive_subtle_se_versus_si",
    prompt: "Nongkrong di puncak gunung atau pinggir pantai yang pemandangannya super eksotis...",
    instruction: "Pilih getaran indrawi yang menyapu perhatian terbesarmu.",
    reliability: 1.0,
    targetSystems: ["cognitive", "mbtiAxis", "bigFive", "enneagram", "values"],
    options: [
      {
        id: "a",
        text: "Menyeruput kopi hangat, meresapi memori kedamaian masa lalu, mengingat kenangan indah yang mirip di otakku, menyelimuti diri dengan rileks.",
        subtleMeaning: "Fungsi Si (Sensorik introvert) memetakan stimulus luar ke dalam katalog kenyamanan, sejarah, dan sensasi internal.",
        weights: {
          cognitive: { Si: 5.5, Se: -2.0 },
          mbtiAxis: { S: 2.5, J: 2.0 },
          bigFive: { conscientiousness: 2.5 },
          enneagram: { "6": 3.0, "9": 3.5, "1": 1.5 },
          values: { security: 2.5, peace: 3.5 },
          evidence: { nostalgicMemorySensory: 1.5 },
          positive: { internalSensoryPreservation: 1.5 },
          reliability: 1.0
        }
      },
      {
        id: "b",
        text: "Pengen langsung lari ke pantai main air, teriak kencang, pegang bebatuan kasar, menyatu dengan getaran fisik real-time ditiup angin.",
        subtleMeaning: "Fungsi Se (Sensorik ekstrovert) melebur menyatu dengan lingkungan fisik real-time tanpa penundaan konseptual.",
        weights: {
          cognitive: { Se: 5.5, Si: -2.0 },
          mbtiAxis: { S: 2.5, P: 2.0 },
          bigFive: { extraversion: 2.5 },
          enneagram: { "8": 3.5, "7": 4.0 },
          values: { freedom: 3.5 },
          evidence: { immersiveSensoryExperience: 1.5 },
          positive: { presentPresence: 1.5 },
          reliability: 1.0
        }
      }
    ]
  }
];
