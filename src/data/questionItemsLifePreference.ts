/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { QuestionItem } from "../types";

export const questionItemsLifePreference: QuestionItem[] = [
  {
    id: "life_001",
    kind: "singleChoice",
    domain: "money",
    prompt: "Jika kamu mendapatkan rezeki berupa uang lebih yang cukup besar setelah berbulan-bulan berhemat, apa hal pertama yang terlintas ingin kamu lakukan?",
    instruction: "Pilih jawaban yang mewakili suara hati terdalammu, bukan norma ideal luar.",
    reliability: 0.88,
    targetSystems: ["instinct", "values", "attitudinalPsyche", "bigFive"],
    options: [
      {
        id: "a",
        text: "Menyimpannya sebagian besar di tabungan atau investasi darurat agar hatiku merasa tenang dan memiliki jaminan keamanan.",
        subtleMeaning: "Memprioritaskan pertahanan diri, rasa aman, mitigasi risiko (sp, values: security).",
        weights: {
          instinct: { sp: 1.4, sx: -0.4 },
          values: { security: 1.3, autonomy: 0.3 },
          bigFive: { conscientiousness: 0.8 },
          attitudinalPsyche: { F: { confident: 0.5, flexible: 0.2, insecure: 0.5, indifferent: 0.0 } },
          evidence: { physicalSafetyFocus: 1.2 },
          positive: { futureCare: 1.0 },
          negative: { overCaution: -0.4 }
        }
      },
      {
        id: "b",
        text: "Membeli barang kenyamanan berkualitas tinggi untuk kamar tidur atau tubuhku (misal kasur empuk, aromaterapi premium, atau makanan lezat).",
        subtleMeaning: "Mencari kenyamanan fisik langsung, kepuasan indrawi berkualitas (sp, Physics confident/luxurious).",
        weights: {
          instinct: { sp: 1.1 },
          values: { peace: 1.0, beauty: 0.6 },
          cognitive: { Si: 0.8 },
          attitudinalPsyche: { F: { confident: 1.2, flexible: 0.3, insecure: 0.0, indifferent: 0.0 } },
          evidence: { bodyComfortFocus: 1.3 },
          positive: { selfSoothing: 1.1 }
        }
      },
      {
        id: "c",
        text: "Mengupgrade alat kerja sekunder atau membeli modul belajar berbobot yang bisa melipatgandakan kapasitas keahlianku ke depan.",
        subtleMeaning: "Meningkatkan daya guna, otonomi kompetensi, efisiensi masa depan (Te, values: competence).",
        weights: {
          cognitive: { Te: 1.0, Ti: 0.4 },
          values: { competence: 1.3, achievement: 0.9 },
          bigFive: { openness: 0.6, conscientiousness: 0.8 },
          evidence: { skillUpgradeFocus: 1.2 },
          positive: { selfInvestment: 1.1 }
        }
      },
      {
        id: "d",
        text: "Mengajak orang terkasih atau sahabat terdekat makan bersama di tempat langganan yang hangat sembari bertukar cerita santai.",
        subtleMeaning: "Mentransformasikan uang menjadi kebersamaan intim, penajaman relasi cinta (so/sx, loveStyle: qualityTime).",
        weights: {
          instinct: { sx: 0.8, so: 0.8, sp: -0.5 },
          values: { benevolence: 1.1, belonging: 1.0 },
          loveStyle: { qualityTime: 1.3 },
          bigFive: { agreeableness: 0.9, extraversion: 0.5 },
          evidence: { bondingSharedExp: 1.3 },
          positive: { relationalGenerosity: 1.0 }
        }
      }
    ]
  },
  {
    id: "life_002",
    kind: "singleChoice",
    domain: "gift_appreciation",
    prompt: "Hadiah seperti apa yang paling bisa meluluhkan hatimu dan membuatmu merasa benar-benar dicintai kekasih atau sahabat?",
    instruction: "Pilih skenario penghargaan yang terasa paling berkesan.",
    reliability: 0.87,
    targetSystems: ["loveStyle", "instinct", "enneagram", "values"],
    options: [
      {
        id: "a",
        text: "Barang fungsional yang memang sedang kubutuhkan, persis dengan model atau kegunaan yang sempat tak sengaja kuucapkan.",
        subtleMeaning: "Menghargai perhatian mendalam pada detail praktis keseharian (actsOfService, Si).",
        weights: {
          loveStyle: { actsOfService: 1.3, receivingGifts: 0.6 },
          cognitive: { Si: 0.7 },
          enneagram: { "6": 0.5, "1": 0.4 },
          values: { utility: 1.0 },
          evidence: { functionalCareGift: 1.2 },
          positive: { attentionToDailyFactuals: 1.0 }
        }
      },
      {
        id: "b",
        text: "Sepucuk surat tulisan tangan orisinal yang menceritakan betapa berartinya kehadiranku dalam hidup badai mereka selama ini.",
        subtleMeaning: "Menghargai keintiman emosional, pengakuan autentik (wordsOfAffirmation, Fi, Enneagram 4).",
        weights: {
          loveStyle: { wordsOfAffirmation: 1.4, emotionalDepth: 1.1 },
          cognitive: { Fi: 0.8 },
          enneagram: { "4": 1.2, "2": 0.8 },
          values: { empathy: 1.0 },
          evidence: { authenticAuraGift: 1.3 },
          positive: { affirmationValidation: 1.2 }
        }
      },
      {
        id: "c",
        text: "Kunjungan mendadak tanpa barang mewah, melainkan jaminan kehadiran mereka seharian penuh menemani kegiatanku yang sepi.",
        subtleMeaning: "Menghargai kehadiran utuh, pelukan waktu bersama, ketenangan relasi (sp/so, qualityTime).",
        weights: {
          loveStyle: { qualityTime: 1.4 },
          instinct: { so: 0.6, sx: 0.5 },
          enneagram: { "9": 1.1 },
          values: { peace: 1.0 },
          evidence: { absolutePresenceGift: 1.3 }
        }
      },
      {
        id: "d",
        text: "Sesuatu yang romantis, sedikit berani, berselera seni tinggi, atau sebuah petualangan seru berdua saja yang tak terlupakan.",
        subtleMeaning: "Menghargai gairah, intensitas eksklusif, getaran estetik (sx, Physics flexible/confident).",
        weights: {
          loveStyle: { physicalTouch: 0.5, emotionalDepth: 1.2 },
          instinct: { sx: 1.3, sp: -0.6 },
          enneagram: { "7": 0.9, "3": 0.4 },
          values: { beauty: 1.0, freedom: 0.8 },
          evidence: { highAestheticThrillGift: 1.2 }
        }
      }
    ]
  },
  {
    id: "life_003",
    kind: "singleChoice",
    domain: "aesthetic_pets",
    prompt: "Jika kamu mengamati kucing dan anjing, perilaku hewan peliharaan seperti apa yang lebih memikat kriteria kedamaianmu?",
    instruction: "Ini bukan tentang menyukai hewannya secara mutlak, tapi getaran cara mereka berelasi.",
    reliability: 0.86,
    targetSystems: ["relationship", "instinct", "values"],
    options: [
      {
        id: "a",
        text: "Kucing: Ia sangat otonom, memiliki batas diri yang tegas, bisa ditinggal santai tanpa manja berlebihan, namun sesekali merapat penuh kehangatan saat ia mau.",
        subtleMeaning: "Mencari relasi otonom yang menghargai ruang privat, bebas dari ketergantungan (I, avoidantLeaning/secureLeaning, sp).",
        weights: {
          mbtiAxis: { I: 0.8, E: -0.5 },
          relationship: { avoidantLeaning: 0.7, secureLeaning: 0.4 },
          instinct: { sp: 0.9 },
          values: { autonomy: 1.1 },
          evidence: { boundariedPrivacyPreference: 1.1 }
        }
      },
      {
        id: "b",
        text: "Anjing: Ia sangat tulus menyambut hangat kepulangan kita, ekspresif menunjukkan loyalitas tanpa malu-malu, dan senang bermanja bersama dalam ritme aktif.",
        subtleMeaning: "Mencari relasi ekspresif, inklusif, hangat, penegasan afeksi terus menerus (E, anxiousLeaning/secureLeaning, so/sx).",
        weights: {
          mbtiAxis: { E: 0.8, I: -0.5 },
          relationship: { anxiousLeaning: 0.6, secureLeaning: 0.5 },
          instinct: { so: 0.8, sx: 0.5 },
          values: { belonging: 1.0 },
          evidence: { expressiveWarmthPreference: 1.1 }
        }
      }
    ]
  },
  {
    id: "life_004",
    kind: "singleChoice",
    domain: "novel_vs_film",
    prompt: "Saat mengisi waktu senggang yang sunyi, dalam format apa kamu paling suka merajut imajinasi?",
    instruction: "Pilih preferensi pengolahan informasi imajinatifmu.",
    reliability: 0.85,
    targetSystems: ["cognitive", "bigFive", "learning"],
    options: [
      {
        id: "a",
        text: "Membaca novel atau tulisan panjang, di mana aku bebas membangun lanskap wajah tokoh dan nada suara fiktif menggunakan struktur imajinasiku sendiri.",
        subtleMeaning: "Pengolahan berbasis verbal, imajinasi internal mendalam (N, Ni, introverted visualization).",
        weights: {
          cognitive: { Ni: 0.9, Ne: 0.5 },
          mbtiAxis: { I: 0.5, N: 0.7 },
          learning: { verbal: 1.3, visual: -0.3 },
          bigFive: { openness: 0.9 },
          evidence: { internalCreativeRendering: 1.2 }
        }
      },
      {
        id: "b",
        text: "Menonton film atau serial berselera estetika tinggi, menyerap komposisi visual, tata musik, akting langsung, dan dinamika gerakan fisik yang tersaji presisi.",
        subtleMeaning: "Pengolahan berbasis visual konkrit indrawi (S, Se, extroverting sensation, rich external graphics).",
        weights: {
          cognitive: { Se: 0.8, Si: 0.4 },
          mbtiAxis: { E: 0.2, S: 0.6 },
          learning: { visual: 1.3, verbal: -0.4 },
          bigFive: { openness: 0.5 },
          evidence: { externalSensoryRichConsumption: 1.1 }
        }
      }
    ]
  },
  {
    id: "life_005",
    kind: "singleChoice",
    domain: "room_decor",
    prompt: "Ketika harus menata meja kerja atau ruangan privat tempatmu menghabiskan malam, suasana apa yang paling ingin kamu hadirkan?",
    instruction: "Pilih getaran ruang yang paling menenangkan sirkulasi pikiranmu.",
    reliability: 0.89,
    targetSystems: ["bigFive", "hexaco", "environment"],
    options: [
      {
        id: "a",
        text: "Sangat rapi, minimalis, hanya ada barang-barang penting berdesain modern, serba estetik, dan setiap benda diletakkan di koordinatnya masing-masing.",
        subtleMeaning: "Kebutuhan estetika visual presisi, kontrol fisik teratur (conscientiousness tinggi, low entropy).",
        weights: {
          bigFive: { conscientiousness: 1.3 },
          hexaco: { conscientiousness: 1.2 },
          cognitive: { Si: 0.5, Te: 0.4 },
          environment: { pristineMinimalist: 1.4 },
          evidence: { systematicCleanPreference: 1.3 }
        }
      },
      {
        id: "b",
        text: "Hangat, dipenuhi bantal empuk, mainan hiasan kesukaan, foto kenangan, buku berserakan yang siap dibuka, dan pencahayaan temaram yang nyaman.",
        subtleMeaning: "Kebutuhan kenyamanan pribadi emosional, kehangatan intim (sp, emotional warmth, soft cozy).",
        weights: {
          bigFive: { conscientiousness: -0.5, agreeableness: 0.5 },
          cognitive: { Fi: 0.6, Si: 0.7 },
          instinct: { sp: 1.1 },
          environment: { softCozySpace: 1.4 },
          evidence: { emotionallyNurturingSpace: 1.2 }
        }
      },
      {
        id: "c",
        text: "Penuh dengan layar monitor, perangkat teknologi terbaru yang tersambung rapi, whiteboard penuh coretan core core pemikiran, serta referensi ilmu berkeliaran.",
        subtleMeaning: "Kebutuhan laboratorium ide, eksplorasi kognitif (Ti/Ne/Te, Physics/Logic AP).",
        weights: {
          cognitive: { Ti: 0.8, Ne: 0.6, Te: 0.6 },
          bigFive: { openness: 1.0 },
          environment: { functionalLabWorkspace: 1.4 },
          evidence: { cognitivePlaygroundSpace: 1.2 }
        }
      }
    ]
  },
  {
    id: "life_006",
    kind: "singleChoice",
    domain: "clothes_preference",
    prompt: "Bagaimana cara bawah sadarmu memilih pakaian yang akan kamu gunakan di hari-hari santai beraktivitas luar rumahtangga?",
    instruction: "Pilih alasan pemilihan gaya yang paling dekat dengan realitasmu.",
    reliability: 0.84,
    targetSystems: ["bigFive", "hexaco", "values"],
    options: [
      {
        id: "a",
        text: "Utamanya kenyamanan bahan nomor satu; aku tidak terlalu peduli tren atau pandangan orang lain, asalkan gerak tubuhku leluasa dan kulitku nyaman.",
        subtleMeaning: "Utamakan kenyamanan sensoris internal, kepribadian acuh sosial (sp, low extraversion, low peer-oriented).",
        weights: {
          instinct: { sp: 1.2, so: -0.6 },
          cognitive: { Si: 0.7 },
          bigFive: { extraversion: -0.4, agreeableness: 0.2 },
          values: { autonomy: 0.9, comfort: 1.2 },
          evidence: { physicalComfortSovereignty: 1.2 }
        }
      },
      {
        id: "b",
        text: "Memiliki keunikan karakter tertentu atau sentuhan estetik yang merepresentasikan jati diriku secara autentik, walau terkadang agak mencolok.",
        subtleMeaning: "Pakaian sebagai perpanjangan ekspresi identitas orisinal (Fi, Enneagram 4, sx).",
        weights: {
          cognitive: { Fi: 1.0, Se: 0.5 },
          instinct: { sx: 1.1 },
          enneagram: { "4": 1.3 },
          bigFive: { openness: 0.8 },
          values: { individuality: 1.1 },
          evidence: { aestheticSelfExpression: 1.2 }
        }
      },
      {
        id: "c",
        text: "Rapi, sopan, membaur sempurna dengan lingkungan di mana aku berada, agar aku dihargai secara profesional tanpa memicu pergunjingan penonton.",
        subtleMeaning: "Pakaian untuk adaptasi sosial, penerimaan, kepatuhan norma (so, Fe/Si, conscientiousness).",
        weights: {
          cognitive: { Fe: 0.6, Si: 0.7 },
          instinct: { so: 1.2, sx: -0.5 },
          bigFive: { conscientiousness: 0.8, agreeableness: 0.5 },
          values: { conformity: 1.1, security: 0.7 },
          evidence: { socialConformityDress: 1.2 }
        }
      }
    ]
  },
  {
    id: "life_007",
    kind: "singleChoice",
    domain: "short_holiday_destination",
    prompt: "Jika diberi kesempatan liburan pendek 3 hari secara kustom, petualangan apa yang paling memulihkan jiwamu dari kepenatan kerja?",
    instruction: "Pilih lanskap pelarian yang paling kamu butuhkan.",
    reliability: 0.86,
    targetSystems: ["instinct", "bigFive", "environment"],
    options: [
      {
        id: "a",
        text: "Menyendiri di villa sunyi di tengah hutan atau lereng gunung kabut, tenggelam menikmati buku, kopi, tanpa gangguan komunikasi kerja apa pun.",
        subtleMeaning: "Pemulihan isolasi privat (sp, I, high recovery, low social noise).",
        weights: {
          mbtiAxis: { I: 1.0, E: -0.9 },
          instinct: { sp: 1.3, so: -0.8 },
          bigFive: { extraversion: -1.0, openness: 0.5 },
          environment: { natureSolitary: 1.4 },
          evidence: { deepHermitInsolation: 1.3 }
        }
      },
      {
        id: "b",
        text: "Pergi bersama sekelompok sahabat dekat, menyewa penginapan luas untuk kumpul masak, bernyanyi bersama, mengobrol semalaman bertukar tawa hangat.",
        subtleMeaning: "Pemulihan kebersamaan sosial akrab (so/sx, Fe, extraversion).",
        weights: {
          mbtiAxis: { E: 0.9, I: -0.8 },
          instinct: { so: 1.2, sx: 0.6 },
          bigFive: { extraversion: 1.0, agreeableness: 0.7 },
          cognitive: { Fe: 0.6, Se: 0.3 },
          environment: { socialCompanionSpace: 1.3 },
          evidence: { communalJoyRecovery: 1.2 }
        }
      },
      {
        id: "c",
        text: "Menjelajahi museum seni kuno, situs peninggalan eksotik, atau kota tua asing sendirian demi menyerap makna sejarah dan nuansa budaya unik.",
        subtleMeaning: "Eksplorasi wawasan estetika, rasa ingin tahu teoritis (openness tinggi, Ni/Ne/Ti).",
        weights: {
          mbtiAxis: { I: 0.4, N: 0.8 },
          bigFive: { openness: 1.3 },
          cognitive: { Ni: 0.5, Ti: 0.4, Ne: 0.4 },
          environment: { intellectualCulturalSpace: 1.3 },
          evidence: { cognitiveAcquisitionTour: 1.2 }
        }
      }
    ]
  },
  {
    id: "life_008",
    kind: "singleChoice",
    domain: "cafe_seating",
    prompt: "Saat memasuki sebuah kafe yang cukup ramai, tempat duduk bagian mana yang paling instingtif matamu bidik dan hampiri?",
    instruction: "Pilih posisi spatial kafe yang paling membuatmu merasa nyaman.",
    reliability: 0.85,
    targetSystems: ["instinct", "mbtiAxis", "bigFive"],
    options: [
      {
        id: "a",
        text: "Meja di sudut paling belakang, bersandar pada tembok kokoh dengan pandangan yang bisa menyapu dan mengamati seluruh ruangan di depanku.",
        subtleMeaning: "Kebutuhan kontrol taktis defensif, ruang aman, monitoring (sp, I, riskAware).",
        weights: {
          instinct: { sp: 1.3, so: -0.5 },
          mbtiAxis: { I: 0.8, J: 0.4 },
          bigFive: { extraversion: -0.6 },
          decision: { riskAware: 0.9 },
          evidence: { strategicCornerSeating: 1.3 }
        }
      },
      {
        id: "b",
        text: "Meja komunal besar di tengah ruangan, atau area dekat barista yang terbuka lebar, bersiap sewaktu-waktu bertegur sapa dengan pengunjung lain.",
        subtleMeaning: "Keterbukaan keterlibatan sosial, dinamika interaksi (so, E, extraversion).",
        weights: {
          instinct: { so: 1.3, sp: -0.7 },
          mbtiAxis: { E: 0.9, P: 0.3 },
          bigFive: { extraversion: 1.1 },
          evidence: { sociallyExposedSeating: 1.3 }
        }
      },
      {
        id: "c",
        text: "Area lesehan luar (outdoor) yang menyatu dekat taman rindang atau kolam ikan kecil, menikmati tiupan angin segar secara alami.",
        subtleMeaning: "Menyatu dengan alam, relaksasi sensorik sensorik (Se/Si, values: peace).",
        weights: {
          cognitive: { Se: 0.6, Si: 0.6 },
          values: { peace: 1.1 },
          environment: { natureOutdoor: 1.3 },
          evidence: { biophilicSeatingPreference: 1.2 }
        }
      }
    ]
  },
  {
    id: "life_009",
    kind: "singleChoice",
    domain: "upgrade_object",
    prompt: "Jika kamu ingin mengupgrade performa barang milikmu yang mulai berumur, sektor mana yang paling kencang ingin kamu benahi pertamaku?",
    instruction: "Pilih filosofi upgrade kualitas yang paling dominan di matamu.",
    reliability: 0.86,
    targetSystems: ["values", "attitudinalPsyche", "cognitive"],
    options: [
      {
        id: "a",
        text: "Performa kecepatan sistem prosesor, RAM, atau mesin dasar di dalamnya, agar semuanya berjalan kilat tanpa kendala loading detik ini.",
        subtleMeaning: "Efisiensi fungsional logis, akselerasi kecepatan penyelesaian tugas (Te, Logic/Volition AP).",
        weights: {
          cognitive: { Te: 1.2, Ti: 0.4 },
          values: { competence: 1.0, speedEfficiency: 1.2 },
          attitudinalPsyche: { V: { confident: 0.5, flexible: 0.3, insecure: 0.0, indifferent: 0.0 } },
          evidence: { velocityUpgradeFocus: 1.3 }
        }
      },
      {
        id: "b",
        text: "Estetika desain luar, kelengkapan pixel layar (display), serta kejernihan speakernya, agar setiap konten yang kurasakan memanjakan mata-telingaku.",
        subtleMeaning: "Estetika sensoris eksternal, getaran kemewahan perasaan (Se, Physics/Emotion AP).",
        weights: {
          cognitive: { Se: 1.1, Fi: 0.4 },
          values: { beauty: 1.3, enjoyment: 1.0 },
          attitudinalPsyche: { F: { confident: 0.9, flexible: 0.3, insecure: 0.0, indifferent: 0.0 } },
          evidence: { sensoryUpgradeFocus: 1.3 }
        }
      },
      {
        id: "c",
        text: "Kapasitas baterai jumbo, bodi tahan banting antidebu-air, serta jaminan ketahanan garansi resmi jangka panjang agar tidak rewel di masa depan.",
        subtleMeaning: "Keandalan jangka panjang, ketahanan fisik, perawatan keamanan (Si, sp).",
        weights: {
          cognitive: { Si: 1.1, Te: 0.3 },
          instinct: { sp: 1.2 },
          values: { security: 1.1, durability: 1.2 },
          evidence: { staminaUpgradeFocus: 1.3 }
        }
      }
    ]
  },
  {
    id: "life_010",
    kind: "singleChoice",
    domain: "how_to_accept_praise",
    prompt: "Ketika ada seseorang berkredensial tinggi memuji hasil karyamu secara tulus di khalayak ramai, apa reaksi batin yang spontan menyergapmu?",
    instruction: "Pilih respons terdalam yang paling akurat dari caramu memandang pujian.",
    reliability: 0.87,
    targetSystems: ["enneagram", "bigFive", "hexaco"],
    options: [
      {
        id: "a",
        text: "Merasa sangat tersanjung dan bangga; ini meningkatkan motivasiku dan langsung kurayakan dengan memberi tahu lingkar orang penting lainnya.",
        subtleMeaning: "Menyerap validasi luar untuk merawat citra bernilai diri (Enneagram 3, extraversion).",
        weights: {
          enneagram: { "3": 1.4, "2": 0.4, "4": -0.3 },
          bigFive: { extraversion: 0.8 },
          values: { recognition: 1.2, achievement: 1.0 },
          evidence: { exteriorImageBoost: 1.3 }
        }
      },
      {
        id: "b",
        text: "Merasa canggung, salah tingkah, bahkan mencurigai apakah mereka hanya basa-basi atau ada maksud terselubung di balik kemurahan hatinya.",
        subtleMeaning: "Kecurigaan, ketidaknyamanan disorot, perlindungan diri (Enneagram 6 atau 5, neuroticism).",
        weights: {
          enneagram: { "6": 1.2, "5": 0.9 },
          bigFive: { neuroticism: 0.8, extraversion: -0.6 },
          hexaco: { extraversion: -0.5 },
          values: { trust: -0.5, safety: 0.9 },
          evidence: { praiseSkepticismAlert: 1.3 }
        }
      },
      {
        id: "c",
        text: "Menerimanya dengan senyuman santun biasa, lalu langsung mereduksi pujian itu dengan mengembalikan fokus ke kontribusi tim atau aspek keberuntungan.",
        subtleMeaning: "Penurunan ego, kerendahan hati orisinal, moderasi pembawaan (Honility, Enneagram 9 atau 1).",
        weights: {
          enneagram: { "9": 1.2, "1": 0.8 },
          hexaco: { honestyHumility: 1.4 },
          bigFive: { agreeableness: 1.0 },
          evidence: { modestPraiseDeflection: 1.3 }
        }
      }
    ]
  }
];
