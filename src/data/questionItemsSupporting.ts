/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { QuestionItem } from "../types";

export const questionItemsSupporting: QuestionItem[] = [
  {
    id: "sup_001",
    kind: "singleChoice",
    domain: "enneagram_gut",
    prompt: "Bagaimana cara batinmu berurusan dengan ketidaksempurnaan atau kegagalan kendali atas nasib dirimu sendiri?",
    instruction: "Pilih kecenderungan respons terdalammu.",
    reliability: 0.94,
    targetSystems: ["enneagram", "bigFive"],
    options: [
      {
        id: "a",
        text: "Sangat gelisah dan mengkritik diri secara keras; berupaya memperbaiki segala hal secara disiplin agar sesuai standar moral yang benar.",
        subtleMeaning: "Tipe 1 (Reformer) - Penyandaran integritas moral.",
        weights: {
          enneagram: { "1": 1.5, "9": -0.5 },
          bigFive: { conscientiousness: 1.1 }
        }
      },
      {
        id: "b",
        text: "Memilih menjaga kedamaian dan menyelaraskan diri; melunakkan ketegangan di dalam pikiran agar tidak menimbulkan riak gelombang konflik.",
        subtleMeaning: "Tipe 9 (Peacemaker) - Kelenturan harmoni batin sadar.",
        weights: {
          enneagram: { "9": 1.5, "8": -0.5 },
          bigFive: { agreeableness: 1.2 }
        }
      },
      {
        id: "c",
        text: "Mengambil alih tindakan secara mandiri dan tegas; memastikan kedaulatan diri terjaga sepenuhnya tanpa bergantung pada belas kasihan orang lain.",
        subtleMeaning: "Tipe 8 (Challenger) - Penjagaan kedaulatan perlindungan.",
        weights: {
          enneagram: { "8": 1.5, "1": -0.5 },
          bigFive: { extraversion: 1.0 }
        }
      }
    ]
  },
  {
    id: "sup_002",
    kind: "singleChoice",
    domain: "enneagram_heart",
    prompt: "Bagaimana caramu memetakan identitas sosialmu agar merasa bernilai dan dihargai seutuhnya oleh lingkungan sekitar?",
    instruction: "Pilih motif batin primer Anda.",
    reliability: 0.93,
    targetSystems: ["enneagram", "bigFive"],
    options: [
      {
        id: "a",
        text: "Dengan menawarkan pertolongan dan perhatian tulus; memastikan kehadiran saya membawa manfaat nyata bagi perlindungan emosional sesama.",
        subtleMeaning: "Tipe 2 (Helper) - Pencarian penerimaan lewat kontribusi kasih.",
        weights: {
          enneagram: { "2": 1.5 },
          bigFive: { agreeableness: 1.1 }
        }
      },
      {
        id: "b",
        text: "Dengan mengejar prestasi, kemandirian profesional, dan kompetensi tinggi; memastikan saya diakui lewat reputasi karya yang kredibel.",
        subtleMeaning: "Tipe 3 (Achiever) - Unjuk harga diri lewat pencapaian nyata.",
        weights: {
          enneagram: { "3": 1.5 },
          bigFive: { conscientiousness: 1.0 }
        }
      },
      {
        id: "c",
        text: "Dengan mengekspresikan karakter diri yang autentik, unik, dan mendalam; tidak sudi menjadi jiplakan orang lain sekalipun tampak berbeda sendiri.",
        subtleMeaning: "Tipe 4 (Individualist) - Ekspresi keunikan identitas batin.",
        weights: {
          enneagram: { "4": 1.5 },
          bigFive: { openness: 1.2 }
        }
      }
    ]
  },
  {
    id: "sup_003",
    kind: "singleChoice",
    domain: "enneagram_head",
    prompt: "Ketika dihadapkan pada ancaman ketidakpastian masa depan, ke arah mana perlindungan rasa aman pikiranmu bersandar secara otomatis?",
    instruction: "Pilih taktik pengamanan kognitif Anda.",
    reliability: 0.95,
    targetSystems: ["enneagram", "bigFive"],
    options: [
      {
        id: "a",
        text: "Menarik diri ke ruang privat untuk menganalisis data secara tenang; mengumpulkan peta pengetahuan filosofis demi menguasai duduk rincian persoalan.",
        subtleMeaning: "Tipe 5 (Investigator) - Kemandirian intelek perlindungan data.",
        weights: {
          enneagram: { "5": 1.5 },
          bigFive: { openness: 1.1 }
        }
      },
      {
        id: "b",
        text: "Memetakan potensi risiko secara waspada dan membangun jejaring pendukung; mencari kepastian dari sistem atau figur yang dapat dipercaya.",
        subtleMeaning: "Tipe 6 (Loyalist) - Kewaspadaan kepatuhan jaminan.",
        weights: {
          enneagram: { "6": 1.5 },
          bigFive: { neuroticism: 0.9 }
        }
      },
      {
        id: "c",
        text: "Mengalihkan kecemasan ke berbagai skenario opsi yang positif dan petualangan baru; mengemas keadaan serba dinamis agar tidak terperangkap dalam duka.",
        subtleMeaning: "Tipe 7 (Enthusiast) - Pelataran imajinasi stimulus bahagia.",
        weights: {
          enneagram: { "7": 1.5 },
          bigFive: { extraversion: 1.1 }
        }
      }
    ]
  },
  {
    id: "sup_004",
    kind: "singleChoice",
    domain: "relationship_style",
    prompt: "Saat orang terdekatmu berangsur-angsur menjadi begitu sibuk dan menjaga jarak karena urusan pribadinya, bagaimana batinmu bereaksi?",
    instruction: "Pilih kecenderungan dinamika ikatan Anda.",
    reliability: 0.92,
    targetSystems: ["relationship", "stress"],
    options: [
      {
        id: "a",
        text: "Tetap tenang dan memberinya ruang penuh tanpa curiga; yakin bahwa ikatan batin kami tetap kokoh di balik kesibukan sementara.",
        subtleMeaning: "Ikatan aman (Secure) - Kepercayaan otonom seimbang.",
        weights: {
          relationship: { secureLeaning: 1.5 },
          stress: { freeze: -0.5 }
        }
      },
      {
        id: "b",
        text: "Merasa cemas dan terancam diabaikan; berupaya keras menghubunginya atau mencari kepastian bahwa relasi kami baik-baik saja.",
        subtleMeaning: "Ikatan anxious (Anxious) - Kepekaan tinggi akan penolakan.",
        weights: {
          relationship: { anxiousLeaning: 1.5 },
          stress: { hypervigilant: 1.1 }
        }
      },
      {
        id: "c",
        text: "Seketika mempertebal benteng kemandirian pribadi; melarikan fokus sepenuhnya pada kesibukan produktif seolah tidak terpengaruh sama sekali.",
        subtleMeaning: "Ikatan menghindar (Avoidant) - Kemandirian defensif murni.",
        weights: {
          relationship: { avoidantLeaning: 1.5 },
          stress: { flight: 0.9 }
        }
      }
    ]
  },
  {
    id: "sup_005",
    kind: "singleChoice",
    domain: "volition_emotion",
    prompt: "Bagaimana cara terbaik Anda dalam menyatakan sebuah tekad besar atau menuntun bimbingan perasaan kepada orang lain?",
    instruction: "Pilih kecenderungan interaksi kepemimpinan batin.",
    reliability: 0.91,
    targetSystems: ["attitudinalPsyche", "bigFive"],
    options: [
      {
        id: "a",
        text: "Menyuarakan pendirian saya secara asertif, mantap, dan berdaulat tinggi tanpa keraguan; bertindak sebagai penggerak visi yang tangguh.",
        subtleMeaning: "Confidence Volition (1V) - Kedaulatan energi kehendak primer.",
        weights: {
          attitudinalPsyche: { V: { confident: 1.5, flexible: 0.0, insecure: 0.0, indifferent: 0.0 } },
          bigFive: { extraversion: 0.9 }
        }
      },
      {
        id: "b",
        text: "Mengutamakan rembukan dan kelenturan diplomatis yang akomodatif; bersedia melaraskan ritme langkah kerja agar kenyamanan perasaan bersama tetap terjaga.",
        subtleMeaning: "Flexible Volition & Emotion (2V/2E) - Diplomasi cair.",
        weights: {
          attitudinalPsyche: { 
            V: { confident: 0.0, flexible: 1.2, insecure: 0.0, indifferent: 0.0 },
            E: { confident: 0.0, flexible: 1.2, insecure: 0.0, indifferent: 0.0 }
          },
          bigFive: { agreeableness: 1.2 }
        }
      },
      {
        id: "c",
        text: "Memilih menyimpan idealisme tekad dan emosi saya di dalam keheningan batin yang privat; sangat hati-hati dan enggan memaksakan kehendak ke ruang sosial umum.",
        subtleMeaning: "Insecure/Private (3V/3E) - Penyimpanan intasi batin privat.",
        weights: {
          attitudinalPsyche: { 
            V: { confident: 0.0, flexible: 0.0, insecure: 1.5, indifferent: 0.0 }
          },
          bigFive: { extraversion: -0.8 }
        }
      }
    ]
  },
  {
    id: "sup_006",
    kind: "singleChoice",
    domain: "moral_choices",
    prompt: "Dalam mempertahankan suatu konsistensi ketulusan moral di tengah situasi kritis, apa kompas kebenaran primer yang Anda pegang tegap?",
    instruction: "Pilih kompas integritas batin Anda.",
    reliability: 0.93,
    targetSystems: ["moral", "values"],
    options: [
      {
        id: "a",
        text: "Mengejar kemaslahatan praktis dan dampak nyata; kebaikan sejati dinilai dari seberapa besar buah manfaat riil yang dirasakan oleh banyak orang.",
        subtleMeaning: "Pragmatist (Pragmatis) - Keluhuran nilai konsekuensi riil.",
        weights: {
          moral: { pragmatist: 1.5 },
          values: { competence: 0.9 }
        }
      },
      {
        id: "b",
        text: "Tunduk patuh pada aturan moralitas, norma komunal, dan kesepakatan etika yang baku; konsistensi tatanan sosial adalah pilar ketertiban peradaban.",
        subtleMeaning: "Rule-Based (Normatif) - Penghormatan kepatuhan hukum.",
        weights: {
          moral: { ruleBased: 1.5 },
          values: { security: 1.0 }
        }
      },
      {
        id: "c",
        text: "Merujuk sepenuhnya pada otonomi kebebasan berpikir dan kedaulatan nurani pribadi; tidak sudi diatur oleh doktrin luar jika itu mencederai orisinalitas jiwa.",
        subtleMeaning: "Autonomous/Libertarian (Otonom) - Kebebasan hakiki nurani.",
        weights: {
          moral: { libertarian: 1.5 },
          values: { autonomy: 1.2 }
        }
      }
    ]
  },
  {
    id: "sup_007",
    kind: "singleChoice",
    domain: "communication_conflict",
    prompt: "Ketika terjadi sengketa pandangan dengan rekan sejawat, bagaimana cara terbaik Anda dalam menyeimbangkan energi komunikasi?",
    instruction: "Pilih skenario dinamika dialog Anda.",
    reliability: 0.94,
    targetSystems: ["communication", "conflict"],
    options: [
      {
        id: "a",
        text: "Berbicara secara langsung, lugas, bersandar pada fakta kebenaran logis, dan mengesampingkan basa-basi yang memperlambat penyelesaian masalah.",
        subtleMeaning: "Direct & Competitive - Komunikasi lugas asertif logis.",
        weights: {
          communication: { direct: 1.5, analytical: 0.8 },
          conflict: { competitive: 1.1 }
        }
      },
      {
        id: "b",
        text: "Menggunakan bahasa yang santun, diplomatis, peka terhadap batas emosi lawan bicara, dan merawat ruang diskusi agar senantiasa dingin berdampingan.",
        subtleMeaning: "Diplomatic & Accommodating - Penjagaan batas emosional sejuk.",
        weights: {
          communication: { diplomatic: 1.5 },
          conflict: { compromising: 1.0, accommodating: 1.0 }
        }
      },
      {
        id: "c",
        text: "Mengalirkan ekspresi yang hangat, antusias, memikat, dan mencairkan kaku lewat pendekatan kemanusiaan kreatif sebelum membedah perselisihan.",
        subtleMeaning: "Expressive & Collaborative - Pendekatan emosi cair hangat.",
        weights: {
          communication: { expressive: 1.5 },
          conflict: { collaborative: 1.2 }
        }
      }
    ]
  },
  {
    id: "sup_008",
    kind: "singleChoice",
    domain: "stress_catarsis",
    prompt: "Saat hantaman problem bertubi-tubi membuat batinmu begitu lelah, taktik perlindungan mental apa yang spontan menyelamatkan jiwamu?",
    instruction: "Pilih tameng penyelarasan mental Anda.",
    reliability: 0.92,
    targetSystems: ["defense", "stress"],
    options: [
      {
        id: "a",
        text: "Meringankan kepedihan lewat analisis obyektif ke depan; meredam sisa emosi melalui jaminan pemikiran logis dan pembuktian rasional.",
        subtleMeaning: "Rationalization - Penyelarasan logika penenang luka rasa.",
        weights: {
          defense: { rationalization: 1.5 },
          stress: { hypervigilant: 1.0 }
        }
      },
      {
        id: "b",
        text: "Mengendapkan persoalan dalam keheningan batin murni; memarkir seluruh keletihan tersebut rapat-rapat dalam laci ingatan rahasia demi stamina batin.",
        subtleMeaning: "Repression - Penyandaran ketenangan batin dalam diam.",
        weights: {
          defense: { repression: 1.5 },
          stress: { freeze: 1.1 }
        }
      },
      {
        id: "c",
        text: "Mengalihkan energi ketegangan batin menjadi aktivitas kreatif, karya inspiratif, tulisan reflektif, atau dedikasi produktif lainnya yang bernilai guna.",
        subtleMeaning: "Sublimation - Penyaluran karya transformasi duka.",
        weights: {
          defense: { sublimation: 1.5 },
          stress: { flight: 0.6 }
        }
      }
    ]
  }
];
