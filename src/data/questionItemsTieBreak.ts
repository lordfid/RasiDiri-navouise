/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { QuestionItem } from "../types";

export const questionItemsTieBreak: QuestionItem[] = [
  {
    id: "tie_001",
    kind: "singleChoice",
    domain: "ni_vs_ne",
    prompt: "Ketika merenungkan suatu misteri kehidupan atau arah masa depan, bagaimana rasi pikiran bawah sadarmu beroperasi secara naluriah?",
    instruction: "Pilih muara jelajah intuisi primalmu.",
    reliability: 0.95,
    targetSystems: ["cognitive", "bigFive"],
    options: [
      {
        id: "a",
        text: "Mengerucutkan perhatian ke satu visi atau makna mendalam; bersandar pada rabaan intuisi sejati yang melihat struktur 'kebenaran tunggal' di balik layar.",
        subtleMeaning: "Introverted Intuition (Ni) - Pemusatan visi abstrak teoretis.",
        weights: {
          cognitive: { Ni: 1.5, Ne: -1.0 },
          bigFive: { openness: 1.1 }
        }
      },
      {
        id: "b",
        text: "Melentingkan pikiran ke jaring alternatif kemungkinan yang bercabang lebar; gemar bereksperimen dengan berbagai ide tak terduga secara dinamis.",
        subtleMeaning: "Extroverted Intuition (Ne) - Divergensi eksplorasi skenario spekulatif.",
        weights: {
          cognitive: { Ne: 1.5, Ni: -1.0 },
          bigFive: { openness: 1.1 }
        }
      }
    ]
  },
  {
    id: "tie_002",
    kind: "singleChoice",
    domain: "si_vs_se",
    prompt: "Bagaimana caramu memetakan realitas indrawi yang paling murni dan membuatmu merasa hidup seutuhnya?",
    instruction: "Pilih penjelajahan stimulasi ragamu.",
    reliability: 0.94,
    targetSystems: ["cognitive", "bigFive"],
    options: [
      {
        id: "a",
        text: "Menyandarkan kenyamanan pada presisi memori dan pengalaman pribadi; merujuk pada kenyamanan historis yang akrab dan detail yang terbukti konsisten.",
        subtleMeaning: "Introverted Sensing (Si) - Pengarsipan data sensoris subyektif historis.",
        weights: {
          cognitive: { Si: 1.5, Se: -1.0 },
          bigFive: { conscientiousness: 0.9 }
        }
      },
      {
        id: "b",
        text: "Menenggelamkan diri langsung dalam dinamika raga saat ini; menyukai refleks spontan dari petualangan nyata dan sentuhan indrawi dunia apa adanya.",
        subtleMeaning: "Extroverted Sensing (Se) - Koneksi indrawi dinamis tak berjarak.",
        weights: {
          cognitive: { Se: 1.5, Si: -1.0 },
          bigFive: { extraversion: 0.8 }
        }
      }
    ]
  },
  {
    id: "tie_003",
    kind: "singleChoice",
    domain: "ti_vs_te",
    prompt: "Saat harus membedah dan menyelesaikan suatu masalah analisis yang berat, mana yang merupakan muara kepuasan logismu?",
    instruction: "Pilih rute perakitan arsitektur penalaranmu.",
    reliability: 0.96,
    targetSystems: ["cognitive", "values"],
    options: [
      {
        id: "a",
        text: "Membangun cetak biru pemikiran mandiri; membongkar prasangka demi menemukan keselarasan struktur penalaran yang logis secara presisi.",
        subtleMeaning: "Introverted Thinking (Ti) - Validitas deduktif struktural internal.",
        weights: {
          cognitive: { Ti: 1.5, Te: -1.0 },
          values: { competence: 1.2 }
        }
      },
      {
        id: "b",
        text: "Mengandalkan kelancaran prosedur operasional luar; mengatur langkah taktis yang efisien serta menggerakkan berbagai sumber daya demi penyelesaian riil.",
        subtleMeaning: "Extroverted Thinking (Te) - Utilitas induktif efisiensi operasional.",
        weights: {
          cognitive: { Te: 1.5, Ti: -1.0 },
          values: { achievement: 1.1 }
        }
      }
    ]
  },
  {
    id: "tie_004",
    kind: "singleChoice",
    domain: "fi_vs_fe",
    prompt: "Ketika batinmu memproses nilai kebaikan moral di tengah lingkungan sosial, kearah mana kompas empatimu condong?",
    instruction: "Pilih garis penyeimbang getaran rasa.",
    reliability: 0.95,
    targetSystems: ["cognitive", "bigFive"],
    options: [
      {
        id: "a",
        text: "Setia pada kejujuran emosi batin dan jati diri; mempertahankan keyakinan moral pribadi sekalipun berbeda arah dengan standar sosial umum.",
        subtleMeaning: "Introverted Feeling (Fi) - Kejujuran individualitas nilai batin.",
        weights: {
          cognitive: { Fi: 1.5, Fe: -1.0 },
          bigFive: { agreeableness: 0.5 }
        }
      },
      {
        id: "b",
        text: "Mengutamakan keharmonisan relasional komunal; peka menyerap atmosfer emosional kelompok dan melaraskan kepentingan bersama secara damai.",
        subtleMeaning: "Extroverted Feeling (Fe) - Empati interpersonal relasional eksternal.",
        weights: {
          cognitive: { Fe: 1.5, Fi: -1.0 },
          bigFive: { agreeableness: 1.2 }
        }
      }
    ]
  },
  {
    id: "tie_005",
    kind: "singleChoice",
    domain: "dom_aux_axis",
    prompt: "Dalam eksekusi misi hidupmu, bagaimana caramu menggabungkan dorongan intuisi dengan keputusan fungsionalmu?",
    instruction: "Pilih rute sinergi penyelesaian masalah Anda.",
    reliability: 0.93,
    targetSystems: ["cognitive", "mbtiTypeSupport"],
    options: [
      {
        id: "a",
        text: "Menerapkan kerangka analisis logis terencana guna menerjemahkan ide-ide abstrak saya menjadi sistem karya nyata yang terstruktur.",
        subtleMeaning: "Sinergi Intuisi + Analitis (XNTX cluster).",
        weights: {
          cognitive: { Ni: 0.8, Ne: 0.5, Te: 0.8, Ti: 0.5 },
          mbtiTypeSupport: { INTJ: 1.5, INTP: 1.2, ENTJ: 1.2, ENTP: 0.9 }
        }
      },
      {
        id: "b",
        text: "Melaraskan kepekaan perasaan dan empati interpersonal guna mengiringi visi kemanusiaan saya demi menggerakkan kebaikan bersama.",
        subtleMeaning: "Sinergi Intuisi + Nilai Rasa (XNFX cluster).",
        weights: {
          cognitive: { Ni: 0.8, Ne: 0.5, Fe: 0.8, Fi: 0.5 },
          mbtiTypeSupport: { INFJ: 1.5, INFP: 1.2, ENFJ: 1.2, ENFP: 0.9 }
        }
      }
    ]
  },
  {
    id: "tie_006",
    kind: "singleChoice",
    domain: "tert_vs_inf",
    prompt: "Kondisi mana yang menggambarkan dinamika batinmu saat bertransisi dari kestabilan kreatif menuju kecemasan di bawah tekanan tinggi?",
    instruction: "Pilih skenario fluktuasi ketegangan Anda.",
    reliability: 0.92,
    targetSystems: ["cognitive", "stress", "relationship"],
    options: [
      {
        id: "a",
        text: "Nyaman bermain dengan penalaran konseptual atau gagasan idealis mandiri, namun rentan merasakan kepanikan fisik spontan atau kecemasan ekstrem saat keadaan kacau.",
        subtleMeaning: "Pola Peredam Tertiary Introverted + Inferior Extroverted Grip.",
        weights: {
          cognitive: { Ti: 0.9, Fi: 0.9, Se: -0.8, Ne: -0.8 },
          stress: { freeze: 1.1, hypervigilant: 0.9 }
        }
      },
      {
        id: "b",
        text: "Nyaman merajut relasi yang hangat atau kesenangan estetika interaktif, namun rentan terjebak dalam pemikiran kritis yang kaku atau kecurigaan batin yang obsesif saat tertekan.",
        subtleMeaning: "Pola Peredam Tertiary Extroverted + Inferior Introverted Grip.",
        weights: {
          cognitive: { Fe: 0.9, Se: 0.9, Ti: -0.8, Fi: -0.8 },
          stress: { fight: 1.0, fawn: 1.0 }
        }
      }
    ]
  },
  {
    id: "tie_007",
    kind: "singleChoice",
    domain: "opposing_shadow",
    prompt: "Saat ada orang lain yang menyerang pandangan hidup dasarmu secara terang-terangan, refleks pertahanan bawah sadar apa yang paling pertama bangkit?",
    instruction: "Pilih tameng pertahanan batin Anda.",
    reliability: 0.91,
    targetSystems: ["cognitive", "conflict"],
    options: [
      {
        id: "a",
        text: "Membangun benteng pertahanan kritis yang tertutup; mempersoalkan motif tersembunyi penyerang dan menarik diri secara dingin dari jalur diskusi demi keutuhan otonomi.",
        subtleMeaning: "Opposing Role (5th function shadow) - Defense argumen sinis.",
        weights: {
          cognitive: { Ni: -0.5, Ne: -0.5 },
          conflict: { competitive: 1.2, avoiding: 0.8 }
        }
      },
      {
        id: "b",
        text: "Mengupayakan pemulihan suasana secepatnya; melunakkan tensi lewat kelenturan diplomasi relasional guna mengembalikan ketenangan sosial bersama.",
        subtleMeaning: "Kelenturan diplomasi relasional taktis.",
        weights: {
          conflict: { compromising: 1.3, accommodating: 0.8 }
        }
      }
    ]
  },
  {
    id: "tie_008",
    kind: "singleChoice",
    domain: "critical_parent",
    prompt: "Dengan cara bagaimana suara kritikus batin dalam sanubarimu menghakimi Anda saat mengalami kegagalan?",
    instruction: "Pilih rute sasaran sensor batin.",
    reliability: 0.93,
    targetSystems: ["cognitive", "defense"],
    options: [
      {
        id: "a",
        text: "Menyasar ketulusan hati: merasa diri egois, mementingkan ego pribadi, tidak tulus, atau dituduh merusak ketenangan spritual sesama.",
        subtleMeaning: "Critical Parent menyasar ranah Perasaan (F).",
        weights: {
          cognitive: { Fi: -0.8, Fe: -0.8 },
          defense: { projection: 1.1, repression: 1.0 }
        }
      },
      {
        id: "b",
        text: "Menyasar kemampuan logis: merasa gagal merumuskan rencana secara matang, tidak kompeten, ceroboh, atau dituduh memiliki alur pikir yang cacat.",
        subtleMeaning: "Critical Parent menyasar ranah Berpikir (T).",
        weights: {
          cognitive: { Ti: -0.8, Te: -0.8 },
          defense: { rationalization: 1.2, projection: 0.8 }
        }
      }
    ]
  },
  {
    id: "tie_009",
    kind: "singleChoice",
    domain: "trickster_shadow",
    prompt: "Dalam hal apa kecerobohan atau ilusi kognitif Anda yang paling sering membuat Anda keliru mengambil keputusan?",
    instruction: "Pilih rute kerentanan operasional Anda.",
    reliability: 0.90,
    targetSystems: ["cognitive", "decision"],
    options: [
      {
        id: "a",
        text: "Sering abai terhadap aturan praktis atau detail fisik nyata di sekeliling; terlalu hanyut meraba kemungkinan abstrak sampai menabrak kenyataan masa kini.",
        subtleMeaning: "Trickster Se/Si - Kecerobohan detail operasional.",
        weights: {
          cognitive: { Se: -1.2, Si: -1.2 },
          decision: { fastAction: 1.1, riskAware: -0.8 }
        }
      },
      {
        id: "b",
        text: "Sering abai terhadap dinamika relasi kekuasaan atau diplomasi basa-basi pergaulan umum; terlalu kaku memegang idealisme murni batin hingga rawan terisolasi.",
        subtleMeaning: "Trickster Te/Fe - Kecerobohan navigasi eksternal.",
        weights: {
          cognitive: { Te: -1.2, Fe: -1.2 },
          decision: { valueBased: 1.1, consensus: -0.8 }
        }
      }
    ]
  },
  {
    id: "tie_010",
    kind: "singleChoice",
    domain: "demon_transformation",
    prompt: "Ketika ego milikmu benar-benar dipojokkan habis-habisan dalam krisis ekstrem, reaksi pelepasan amarah mana yang spontan terjadi?",
    instruction: "Pilih katarsis emosional pelepasan ketegangan Anda.",
    reliability: 0.94,
    targetSystems: ["cognitive", "stress"],
    options: [
      {
        id: "a",
        text: "Pemutusan ikatan emosi secara dingin dan tajam; membongkar kelemahan fundamental lawan secara verbal dan menghentikan interaksi relasional seutuhnya.",
        subtleMeaning: "Katarsis Demon Introverted yang dingin dan memutuskankan hubungan mutlak.",
        weights: {
          cognitive: { Ti: -1.0, Fi: -1.0 },
          stress: { fight: 1.2, freeze: 1.0 }
        }
      },
      {
        id: "b",
        text: "Ledakan aksi reaktif di dunia nyata; meluapkan kekesalan lewat respons fisik spontan atas benda-benda sekitar, atau melakukan tindakan reaktif penentangan langsung.",
        subtleMeaning: "Katarsis Demon Extroverted yang meledak menyasar fisik operasional luar.",
        weights: {
          cognitive: { Se: -1.0, Te: -1.0 },
          stress: { fight: 1.5, flight: 0.9 }
        }
      }
    ]
  }
];
