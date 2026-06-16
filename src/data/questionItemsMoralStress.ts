/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { QuestionItem } from "../types";

export const questionItemsMoralStress: QuestionItem[] = [
  {
    id: "mor_001",
    kind: "singleChoice",
    domain: "moral_dilemma_cheat",
    prompt: "Jika kamu tak sengaja menemukan celah sistem perbankan murni yang salah mentransfer sejumlah dana cukup besar ke rekening pribadi milikmu secara rahasia tanpa nama pelapor, apa rute tindakan nuranimu?",
    instruction: "Pilih skenario integritas moral yang mewakili dirimu.",
    reliability: 0.94,
    targetSystems: ["moral", "hexaco", "values", "decision"],
    options: [
      {
        id: "a",
        text: "Segera melapor resmi ke kantor bank terdekat untuk mengembalikan dana penuh; aku tidak mau memakan harta yang bukan merupakan hak keringat orisinalku.",
        subtleMeaning: "Moralitas berbasis kepatuhan aturan absolut dan kebersihan integritas batin (ruleBased, honestyHumility tinggi).",
        weights: {
          moral: { ruleBased: 1.4, libertarian: -1.0 },
          hexaco: { honestyHumility: 1.4 },
          values: { integrousInception: 1.3, security: 0.5 },
          decision: { riskAware: 1.1 },
          evidence: { absoluteRuleBasedMorality: 1.3 },
          positive: { ruleIncorruptibility: 1.2 }
        }
      },
      {
        id: "b",
        text: "Mendiamkannya dulu di dalam tabungan terpisah selama beberapa bulan; jika tidak ada klaim keluhan penelusuran hukum barulah kugunakan perlahan untuk aksi sosial kemanusiaan.",
        subtleMeaning: "Moralitas berbasis kemaslahatan praktis terdistribusi, pragmatisme pemihakan (altruist/pragmatist, moderate honestyHumility).",
        weights: {
          moral: { altruist: 1.1, pragmatist: 1.1 },
          hexaco: { honestyHumility: 0.4 },
          values: { benevolence: 0.9 },
          decision: { analytical: 1.0 },
          evidence: { utilitarianMoralityDistribute: 1.2 }
        }
      },
      {
        id: "c",
        text: "Menganggapnya sebagai ganti rugi semesta atas kesengsaraan nasib perjuanganku selama ini; aku menariknya langsung demi melunasi impian pribadi tersembunyi.",
        subtleMeaning: "Moralitas otonomi personal terisolasi, pembenaran kepemilikan keuntungan sekunder (libertarian, low honestyHumility).",
        weights: {
          moral: { libertarian: 1.4, ruleBased: -1.2 },
          hexaco: { honestyHumility: -1.2 },
          values: { autonomy: 1.1, survivalEgo: 1.3 },
          decision: { fastAction: 0.8 },
          evidence: { libertarianSovereigntyMorality: 1.3 },
          negative: { selfServingBias: -0.8 }
        }
      }
    ]
  },
  {
    id: "mor_002",
    kind: "singleChoice",
    domain: "moral_dilemma_lie",
    prompt: "Ketika ada anggota keluarga dekatmu tersangkut masalah utang piutang tidak berbobot, lalu rentenir kasar datang ke rumah menuntut penjelasan kesaksian palsu darimu bahwa mereka tidak sedang di rumah. Apa tindakan spontanmu?",
    instruction: "Pilih jalur pemihakan relasi vs integritas moral.",
    reliability: 0.91,
    targetSystems: ["moral", "conflict", "enneagram", "values"],
    options: [
      {
        id: "a",
        text: "Aku berbohong asertif menyelamatkan keluargaku dari kekerasan fisik detik itu juga; bagiku loyalitas darah relasi mengungguli kesucian teori kejujuran.",
        subtleMeaning: "Moralitas altruistik loyalitas cinta kelompok, mengesampingkan hukum formal (altruist, loving acts, so).",
        weights: {
          moral: { altruist: 1.3, ruleBased: -1.0 },
          hexaco: { honestyHumility: 0.5 },
          values: { loyaltyBenevolence: 1.3 },
          conflict: { accommodating: 0.9 },
          evidence: { tribalTribalLoyaltyMorality: 1.3 }
        }
      },
      {
        id: "b",
        text: "Aku memberitahukan posisi aslinya dengan nada bersalah/asertif; aku benci ketidakjujuran verbal dan berbohong adalah beban yang mengotori kesucian sistem nilaiku.",
        subtleMeaning: "Tegaknya kebenaran aturan verbal absolut di atas ancaman keselamatan (ruleBased, direct, Enneagram 1).",
        weights: {
          moral: { ruleBased: 1.4 },
          hexaco: { honestyHumility: 1.3 },
          values: { truthfulness: 1.3 },
          communication: { direct: 1.1 },
          evidence: { rigidFactFirstVeracity: 1.3 }
        }
      },
      {
        id: "c",
        text: "Menolak berbicara atau bertengkar langsung menyuruh rentenir itu pergi secara hukum kepolisian dengan taktik asertif tanpa menjelaskan apakah keluargaku ada di dalam.",
        subtleMeaning: "Taktik pertahanan hukum taktis otonom menjegal konfrontasi kasar (libertarian, J, competitive).",
        weights: {
          moral: { libertarian: 1.1 },
          conflict: { competitive: 1.1 },
          enneagram: { "8": 1.1, "5": 0.6 },
          evidence: { legalistTacticalWall: 1.2 }
        }
      }
    ]
  },
  {
    id: "mor_003",
    kind: "singleChoice",
    domain: "moral_secret",
    prompt: "Seorang sahabat karirmu melisankan sebuah rahasia dagang rahasia perusahaan yang tidak sengaja mencederai operasional publik, apa caramu merawat mandat rahasia tersebut?",
    instruction: "Pilih cara penahanan rahasia yang paling mewakili dirimu.",
    reliability: 0.93,
    targetSystems: ["hexaco", "enneagram", "values"],
    options: [
      {
        id: "a",
        text: "Menguburnya sangat dalam selamanya; mandat persahabatan adalah segel sakral batin yang tidak akan kubocorkan bahkan di bawah tekanan interogasi tersulit.",
        subtleMeaning: "Loyalitas tak berasas rahasia murni (Enneagram 6, high honesty-humility, secureLeaning relationship).",
        weights: {
          hexaco: { honestyHumility: 1.3, agreeableness: 0.8 },
          enneagram: { "6": 1.3, "9": 0.8 },
          values: { trustSecretKeep: 1.3 },
          evidence: { inviolableTombSecretKeeping: 1.3 }
        }
      },
      {
        id: "b",
        text: "Membeberkannya secara anonim ke divisi kepatuhan (compliancy) demi merawat keselamatan masyarakat luas; rahasia tidak boleh membentengi kejahatan terencana.",
        subtleMeaning: "Keadilan integritas moral melampaui loyalitas klan pertemanan (ruleBased, altruist, Enneagram 1).",
        weights: {
          moral: { ruleBased: 1.3, altruist: 0.8 },
          enneagram: { "1": 1.3, "8": -0.4 },
          values: { publicSafetyEthics: 1.3 },
          evidence: { whistleblowingForSocialEthic: 1.3 }
        }
      },
      {
        id: "c",
        text: "Hanya menceritakannya ke satu orang terkasih yang sangat kupercayai di bawah sumpah rahasia baru, sekadar pengurang beban kecemasan batinku.",
        subtleMeaning: "Pembagian beban emosional batin secara selektif intim (sx, Enneagram 2/4/6).",
        weights: {
          instinct: { sx: 1.1, sp: -0.5 },
          enneagram: { "6": 0.7, "2": 0.5, "4": 0.5 },
          evidence: { selectiveLeakToBondPartner: 1.2 }
        }
      }
    ]
  },
  {
    id: "mor_004",
    kind: "singleChoice",
    domain: "moral_weak_blaming",
    prompt: "Ketika ada peristiwa hukum di kantormu di mana kolega bawahan magang yang lemah dijadikan tumbal kesalahan operasional oleh atasan elit, apa reaksi spontanmu?",
    instruction: "Pilih kontribusi nyata nyali moralmu menghadapi ketidakadilan.",
    reliability: 0.92,
    targetSystems: [" enneagram", "moral", "conflict"],
    options: [
      {
        id: "a",
        text: "Mendampingi korban magang secara tertutup, mengumpulkan bukti korespondensi digital, dan membantunya mengunggah pengungkapan asertif (viral) agar publik membela kemanusiaannya.",
        subtleMeaning: "Mobilisasi pemberontakan pelindung lemah (altruist, competitive, Enneagram 8).",
        weights: {
          moral: { altruist: 1.3 },
          conflict: { competitive: 1.1 },
          enneagram: { "8": 1.4, "4": 0.6 },
          values: { justiceAltruism: 1.3 },
          evidence: { activistAdvocacyOfWeaker: 1.3 }
        }
      },
      {
        id: "b",
        text: "Bersuara asertif secara langsung di forum rapat operasional resmi membela hak kebenaran magang tersebut dengan argumen struktur data murni tanpa emosi.",
        subtleMeaning: "Penegakan keadilan struktur operasional formal tak terbantahkan (ruleBased, direct, Enneagram 1).",
        weights: {
          moral: { ruleBased: 1.3 },
          communication: { direct: 1.1 },
          enneagram: { "1": 1.4 },
          values: { proceduralIntegrity: 1.2 },
          evidence: { formalRighteousTruthSayer: 1.3 }
        }
      },
      {
        id: "c",
        text: "Mendiamkannya sembari prihatin sepi; aku merasa iba namun melawan penindasan korporasi raksasa adalah tindakan bunuh diri karir yang tidak berfaedah bagiku.",
        subtleMeaning: "Penghindaran benturan demi perlindungan kelestarian energi hidup dinamis (avoiding, flight/freeze, Enneagram 5/9).",
        weights: {
          conflict: { avoiding: 1.3 },
          stress: { freeze: 1.0 },
          enneagram: { "5": 1.1, "9": 1.0 },
          evidence: { pragmaticMoralSpectator: 1.2 }
        }
      }
    ]
  },
  {
    id: "mor_005",
    kind: "singleChoice",
    domain: "moral_failure",
    prompt: "Bagaimana cara batinmu berdialog dengan diri sendiri sesaat setelah kamu mengalami kegagalan fatal mementahkan impian yang telah kau perjuangkan bertahun-tahun?",
    instruction: "Pilih gaya coping mekanisme atau pertahanan batin pertamamu.",
    reliability: 0.90,
    targetSystems: ["stress", "defense", "enneagram", "bigFive"],
    options: [
      {
        id: "a",
        text: "Aku mendiamkannya sangat panjang, merasa bahwa kesedihan ini adalah takdir yang harus kuraba penderitaannya lekat-lekat, merasa terisolasi dari kebahagiaan luar.",
        subtleMeaning: "Komersialisasi kesedihan mendalam, identitas melankoli kegagalan (freeze, Enneagram 4, introversion).",
        weights: {
          stress: { freeze: 1.3, fight: -0.9 },
          enneagram: { "4": 1.4 },
          bigFive: { neuroticism: 0.9 },
          defense: { repression: 0.8 },
          evidence: { melancholicGriefAssimilation: 1.3 }
        }
      },
      {
        id: "b",
        text: "Aku segera menganalisis kegagalan tersebut secara beralasan logis, menuliskan evaluasi kegagalan sistemik di catatan jurnalku, dan merancang 3 taktik baru.",
        subtleMeaning: "Analisis logis struktural meredam gejolak duka emosional (rationalization, Ti/Te, Enneagram 5, bigFive: conscientiousness).",
        weights: {
          cognitive: { Ti: 0.9, Te: 0.9 },
          defense: { rationalization: 1.4 },
          enneagram: { "5": 1.2, "3": 0.6 },
          bigFive: { conscientiousness: 0.9, neuroticism: -0.8 },
          evidence: { rationalCopingAnalytical: 1.3 }
        }
      },
      {
        id: "c",
        text: "Aku mengabaikannya seketika, pergi bersenang-senang menghibur hati dengan traveling, bernyanyi, mengobrol, menolak merenungi luka agar lekas pulih gembira.",
        subtleMeaning: "Pelarian dari rasa sakit emosional lewat stimulasi kesenangan instan (flight, denial, Enneagram 7).",
        weights: {
          stress: { flight: 1.3 },
          defense: { denial: 1.2 },
          enneagram: { "7": 1.4 },
          bigFive: { extraversion: 0.8, openness: 0.5 },
          evidence: { hedonisticDistractionCoping: 1.3 }
        }
      }
    ]
  },
  {
    id: "mor_006",
    kind: "singleChoice",
    domain: "moral_criticism_response",
    prompt: "Saat seseorang mendeclare penilaian kasar secara terbuka bahwa hasil karyamu buruk rupa dan tidak berkarakter, bagian batinmu mana yang berdenyut kencang?",
    instruction: "Pilih getaran luka ego orisinalmu.",
    reliability: 0.88,
    targetSystems: ["enneagram", "bigFive", "defense"],
    options: [
      {
        id: "a",
        text: "Merasa terluka harga diriku karena jati diriku disalahpahami secara kasar ketulusannya; aku ingin mempertahankan keunikan visiku dengan dingin.",
        subtleMeaning: "Kerentanan jati diri orisinal disalahpahami (Enneagram 4, heart triad identity protect).",
        weights: {
          enneagram: { "4": 1.4, "3": 0.4 },
          bigFive: { neuroticism: 0.8 },
          defense: { projection: 0.5 },
          evidence: { identityWoundFromCriticism: 1.3 }
        }
      },
      {
        id: "b",
        text: "Merasa tersulut amarah; hasrat bertarung untuk membungkam kebodohan analitis penilai tersebut berkobar hebat hingga aku ingin mendeclarea balik kelemahan karyanya.",
        subtleMeaning: "Mobilisasi hasrat perlawanan menentang ancaman dominansi (fight, Enneagram 8).",
        weights: {
          stress: { fight: 1.3 },
          enneagram: { "8": 1.3 },
          conflict: { competitive: 1.1 },
          evidence: { oppositionalAggressiveDefiance: 1.3 }
        }
      },
      {
        id: "c",
        text: "Merasa kesucian idealitasku ternoda; aku merujuk ulang ke detail metodologi normatif kerjaku untuk membuktikan bahwa pilar pekerjaanku sudah benar murni hukumnya.",
        subtleMeaning: "Penyanderaan integritas normatif yang terancam salah (Enneagram 1, ruleBased).",
        weights: {
          enneagram: { "1": 1.3 },
          bigFive: { conscientiousness: 0.8 },
          values: { correctness: 1.1 },
          evidence: { ethicalDefenseUnderCriticism: 1.2 }
        }
      }
    ]
  },
  {
    id: "mor_007",
    kind: "singleChoice",
    domain: "moral_giving",
    prompt: "Ketika kamu berniat memberikan donasi finansial ke panti asuhan atau pengungsi bencana, dorongan terdalam apa yang sebenarnya mendeclarea langkah muliamu?",
    instruction: "Pilih motif altruistik orisinalmu.",
    reliability: 0.87,
    targetSystems: ["values", "enneagram", "hexaco"],
    options: [
      {
        id: "a",
        text: "Mendengar panggilan nurani rasa bersalah-empati batin yang duka cita melihat penderitaan sesama; aku merasa sesak jika mengacuhkannya.",
        subtleMeaning: "Empati humanistik murni, pembebasan duka emosional murni (Enneagram 4/2, high agreeableness).",
        weights: {
          enneagram: { "4": 1.0, "2": 1.2 },
          bigFive: { agreeableness: 1.1 },
          values: { empathyBenevolence: 1.3 },
          evidence: { visceralEmpatheticDonation: 1.3 }
        }
      },
      {
        id: "b",
        text: "Memastikan kewajiban normatifku sebagai manusia beragama/beretika lurus dipatuhi secara adil demi menyeimbangkan keharmonisan tatanan semesta.",
        subtleMeaning: "Kepatuhan kode etika spiritualitas/tatanan sosial (Enneagram 1/6, ruleBased).",
        weights: {
          enneagram: { "1": 1.3, "6": 0.8 },
          moral: { ruleBased: 1.1 },
          values: { integrityDuty: 1.2 },
          evidence: { systemicCosmicDutyDonation: 1.3 }
        }
      },
      {
        id: "c",
        text: "Keinginan taktis murni melenyapkan hulu kemiskinan dengan menyalurkan dana langsung ke sasaran yang terbukti akurat mengelola program jangka panjang di lapangan.",
        subtleMeaning: "Filantropi berbasis kemangkatan fungsional empiris (Te, Investigative, pragmatist).",
        weights: {
          cognitive: { Te: 1.1 },
          moral: { pragmatist: 1.3 },
          values: { utilityEfficiency: 1.1 },
          evidence: { surgicalUtilityDonation: 1.2 }
        }
      }
    ]
  },
  {
    id: "mor_008",
    kind: "singleChoice",
    domain: "rejection_fear",
    prompt: "Ketika kamu menyatakan hasrat cinta orisinalmu kepada sahabat dekat yang sangat kau kagumi lalu dia menolaknya secara halus dengan alasan pertemanan biasa, apa skenario mental berlindungmu?",
    instruction: "Pilih coping mekanisme menghadapi luka penolakan cinta.",
    reliability: 0.89,
    targetSystems: ["stress", "defense", "relationship"],
    options: [
      {
        id: "a",
        text: "Rasionalisasi: “Ini wajar. Selera manusianya sekarang memang tidak sedang mengarah ke profilku. Ini melindungiku dari masa depan rumah tangga rapuh yang dipaksakan.”",
        subtleMeaning: "Menggunakan pelindung kebenaran pemikiran menormalisasi luka (rationalization, Ti/Te, Enneagram 5).",
        weights: {
          defense: { rationalization: 1.4 },
          enneagram: { "5": 1.2 },
          relationship: { avoidantLeaning: 0.6 },
          evidence: { analyticalCopingRejection: 1.3 }
        }
      },
      {
        id: "b",
        text: "Represi: Memarkirnya sepi dalam gudang kesedihan batin rahasia, merenungi rasa sunyi berbulan-bulan, sembari mencatatkan puisi nestapa bernuansa melankoli.",
        subtleMeaning: "Asimilasi duka cita, asimilasi kepedihan orisinal (freeze, repression, Enneagram 4).",
        weights: {
          stress: { freeze: 1.3 },
          defense: { repression: 1.3 },
          enneagram: { "4": 1.4 },
          evidence: { poeticRepressiveMelancholy: 1.3 }
        }
      },
      {
        id: "c",
        text: "Proyeksi: “Dia menolaku karena seleranya rendah atau terlalu dangkal menilai kemurnian intisari kepribadianku. Dia yang merugi kehilangan berlian berharga.”",
        subtleMeaning: "Proteksi kebanggaan diri lewat pelemparan kesalahan kognitif (projection, Enneagram 3/8).",
        weights: {
          defense: { projection: 1.3 },
          enneagram: { "3": 1.1, "8": 0.8 },
          evidence: { projectionEgoGuardRejection: 1.2 }
        }
      }
    ]
  },
  {
    id: "mor_009",
    kind: "singleChoice",
    domain: "core_fear_trigger",
    prompt: "Kondisi penderitaan batin seperti apa yang membayangkan jalurnya saja sudah sanggup membuat lututmu bergemetar ngeri seketika?",
    instruction: "Pilih skenario trigger ketakutan eksistensial terdalammu.",
    reliability: 0.93,
    targetSystems: ["enneagram", "values", "bigFive"],
    options: [
      {
        id: "a",
        text: "Menjadi sosok yang tidak kompeten, bodoh, tidak berdaya guna secara kognitif, dan menggantungkan keputusan hidup kepada kepintaran belas kasih orang lain.",
        subtleMeaning: "Memicu ketakutan uselessness, inkompentesi intelektual (coreFear: uselessness, Enneagram 5, values: competence).",
        weights: {
          enneagram: { "5": 1.5 },
          values: { competence: 1.3 },
          coreFear: { uselessness: 1.5, conflictBoundary: 0.4 },
          evidence: { uselessnessCoreFearTrigger: 1.3 }
        }
      },
      {
        id: "b",
        text: "Menjadi sosok pengkhianat moralitas, melakukan kebobrokan dosa kotor rahasia, dan dicap seumur hidup sebagai koruptor yang merusak kebenaran suci.",
        subtleMeaning: "Memicu ketakutan kebobrokan moralitas, kekejian dosa kaku (coreFear: corruptness, Enneagram 1, values: correctMoral).",
        weights: {
          enneagram: { "1": 1.5 },
          values: { correctMoral: 1.3 },
          coreFear: { corruptness: 1.5 },
          evidence: { corruptnessCoreFearTrigger: 1.3 }
        }
      },
      {
        id: "c",
        text: "Menjadi sosok yang sangat hampa ciri khas pribadinya, membaur datar dengan massa robotik tanpa keunikan estetik, dan dilupakan seolah tak pernah ada.",
        subtleMeaning: "Memicu ketakutan insignifikan identitas diri murni (coreFear: insignificance, Enneagram 4, values: individuality).",
        weights: {
          enneagram: { "4": 1.5 },
          values: { individuality: 1.3 },
          coreFear: { insignificance: 1.5 },
          evidence: { insignificanceCoreFearTrigger: 1.3 }
        }
      },
      {
        id: "d",
        text: "Menjadi sasaran empuk kebiadaban dominansi konfrontatif, dijajah otonomi keinginanku secara kasar tanpa sanggup melakukan serangan perlawanan bela diri.",
        subtleMeaning: "Memicu ketakutan kerentanan terjajah, ditindas tanpa taring (coreFear: vulnerability, Enneagram 8).",
        weights: {
          enneagram: { "8": 1.5 },
          values: { powerAutonomy: 1.3 },
          coreFear: { vulnerability: 1.5 },
          evidence: { vulnerabilityCoreFearTrigger: 1.3 }
        }
      }
    ]
  },
  {
    id: "mor_010",
    kind: "singleChoice",
    domain: "moral_conflict_with_society",
    prompt: "Ketika adat lokal tempat tinggalmu melakukan kegiatan ritual adat tradisional tahunan yang menurut penalaran akal sehatmu merusak kelestarian lingkungan, apa rute etikamu?",
    instruction: "Pilih rute aksi moralitas kemanusiaan vs kerukunan kelompok.",
    reliability: 0.90,
    targetSystems: ["moral", "conflict", "values"],
    options: [
      {
        id: "a",
        text: "Tetap berpartisipasi dengan wajah gembira demi menjaga harmoni politik kerukunan warga; bagiku persatuan komunal lebih sakral daripada kebenaran teoritis kaku.",
        subtleMeaning: "Penyelarasan harmoni mosi komunal di atas kemantapan ekologi (altruist komunal, accommodating, Enneagram 9/2).",
        weights: {
          moral: { altruist: 1.2 },
          conflict: { accommodating: 1.3 },
          enneagram: { "9": 1.3, "2": 0.8 },
          values: { socialPeaceConformity: 1.2 },
          evidence: { communityConformityAltruist: 1.3 }
        }
      },
      {
        id: "b",
        text: "Menolak hadir secara asertif, menulis esai kritis membedah kepunahan fauna/flora akibat pembakaran sesajen tersebut, dan menyuarakannya di sosial media.",
        subtleMeaning: "Pemberontakan asertif kebenaran fakta objektif, idealisme rasional (ruleBased, competitive, direct).",
        weights: {
          moral: { ruleBased: 1.3 },
          conflict: { competitive: 1.1 },
          communication: { direct: 1.1 },
          values: { ecologicalTruth: 1.3 },
          evidence: { activeEnvironmentReformerRule: 1.3 }
        }
      },
      {
        id: "c",
        text: "Membayar denda ketidakhadiran secara diam-diam lalu menghabiskan akhir pekan di dalam rumah menikmati kesunyian; menolak ribut namun juga enggan merusak nurani diri.",
        subtleMeaning: "Menjaga kebersihan wilayah moral diri tanpa memosisikan diri sebagai musuh warga (libertarian, avoided status, Enneagram 5).",
        weights: {
          moral: { libertarian: 1.3 },
          conflict: { avoiding: 1.3 },
          enneagram: { "5": 1.3, "9": 0.4 },
          evidence: { cleanIsolativePacifistLibertarian: 1.3 }
        }
      }
    ]
  }
];
