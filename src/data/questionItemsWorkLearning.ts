/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { QuestionItem } from "../types";

export const questionItemsWorkLearning: QuestionItem[] = [
  {
    id: "work_001",
    kind: "singleChoice",
    domain: "deadline_crisis",
    prompt: "Ketika tenggat waktu (deadline) proyek besar tinggal 2 hari lagi sementara masih banyak revisi mengantre, bagaimana caramu menyandera kepanikan?",
    instruction: "Pilih skenario taktis eksekusi kerjamu under pressure.",
    reliability: 0.91,
    targetSystems: ["work", "disc", "bigFive", "cognitive"],
    options: [
      {
        id: "a",
        text: "Membuat daftar prioritas super ketat, menutup mata dari kesempurnaan estetik, dan mengeksekusi urusan mendesak satu demi satu dengan ritme mekanis kilat.",
        subtleMeaning: "Gaya eksekusi prioritas terfokus, pragmatisme efisien (Te, executor, DISC D/C).",
        weights: {
          cognitive: { Te: 1.4, Si: 0.5 },
          work: { executor: 1.4, planner: 0.5 },
          disc: { D: 1.1, C: 0.8 },
          bigFive: { conscientiousness: 1.1 },
          evidence: { priorityPragmaticExecution: 1.3 },
          positive: { actionBias: 1.1 }
        }
      },
      {
        id: "b",
        text: "Menyendiri mengumpulkan konsentrasi penuh, menganalisis struktur kesalahan mendalam secara teliti, serta memastikan revisi dikerjakan dengan presisi tinggi tanpa cacat.",
        subtleMeaning: "Gaya ketelitian analisis kualitas, penyelesaian arsitektur logis (Ti, planner, DISC C).",
        weights: {
          cognitive: { Ti: 1.3, Si: 0.6 },
          work: { planner: 1.3 },
          disc: { C: 1.3 },
          bigFive: { openness: 0.4 },
          evidence: { meticulousLogicalPrecision: 1.3 },
          positive: { qualityControl: 1.2 }
        }
      },
      {
        id: "c",
        text: "Mendatangi rekan-rekan setim, menjalin koordinasi moral, melisankan pembagian tugas baru dengan ramah agar beban kerja terpecah adil dan saling menguatkan batin.",
        subtleMeaning: "Gaya kepemimpinan kemanusiaan relasional, perawat energi tim (Fe, caretaker, DISC S/I).",
        weights: {
          cognitive: { Fe: 1.3 },
          work: { caretaker: 1.4 },
          disc: { S: 1.2, I: 0.8 },
          bigFive: { agreeableness: 1.1 },
          evidence: { cooperativeStressManagement: 1.3 }
        }
      },
      {
        id: "d",
        text: "Mencari jalan pintas kreatif (shortcut) non-konvensional atau melompati alur birokrasi kaku sembari melontarkan ide radikal baru yang mempermudah proses kilat.",
        subtleMeaning: "Gaya inovator otonom pendobrak hambatan baku (Ne/Se, innovator, DISC I/D).",
        weights: {
          cognitive: { Ne: 1.3, Se: 0.6 },
          work: { innovator: 1.4 },
          disc: { I: 1.1, D: 0.6 },
          bigFive: { conscientiousness: -0.7, openness: 1.1 },
          evidence: { creativeBypassShortcuts: 1.2 }
        }
      }
    ]
  },
  {
    id: "work_002",
    kind: "singleChoice",
    domain: "teammate_slacking",
    prompt: "Menghadapi rekan setim dalam proyek berbayar yang kinerjanya sangat lambat, tidak responsif, dan menunda deliverable miliknya, apa tindakan nyatamu?",
    instruction: "Pilih gaya konfrontasi produktif-relasionalmu dalam dunia kerja.",
    reliability: 0.89,
    targetSystems: ["conflict", "communication", "enneagram", "disc"],
    options: [
      {
        id: "a",
        text: "Menghubunginya secara langsung dengan ultimatum asertif, merinci sanksi keterlambatan, dan menuntutnya menyetorkan tugas detik itu juga.",
        subtleMeaning: "Eksploitasi kendali langsung sanksi konkrit tanpa belas kasihan palsu (competitive, direct, DISC D, Enneagram 8).",
        weights: {
          conflict: { competitive: 1.3 },
          communication: { direct: 1.3 },
          disc: { D: 1.4 },
          enneagram: { "8": 1.2 },
          evidence: { ironFistPerformanceDemand: 1.3 }
        }
      },
      {
        id: "b",
        text: "Mendekatinya berdua saja, menanyakan apakah ada kendala kesehatan atau personal yang sedang menyandera kemampuannya, sembari menawarkan bantuan ringan.",
        subtleMeaning: "Pendekatan asuhan diplomatis yang merangkul batin (collaborative, diplomatic, DISC S, Enneagram 2/9).",
        weights: {
          conflict: { collaborative: 1.2, accommodating: 0.8 },
          communication: { diplomatic: 1.3 },
          disc: { S: 1.3 },
          enneagram: { "2": 1.1, "9": 0.9 },
          evidence: { softRelationalIntercession: 1.3 }
        }
      },
      {
        id: "c",
        text: "Mengambil alih pekerjaannya secara diam-diam dan menuntaskannya sendiri karena malas berdebat panjang, demi mengamankan skor kelulusan proyek batin pribadi.",
        subtleMeaning: "Penyelamatan pragmatis otonom sepi, mengorbankan relasi sehat demi hasil (avoiding, Te, Enneagram 5/3).",
        weights: {
          conflict: { avoiding: 1.2 },
          communication: { analytical: 0.7 },
          cognitive: { Te: 1.0 },
          enneagram: { "5": 0.9, "3": 0.9 },
          evidence: { pragmaticSelfOverloadToAvoidConflict: 1.2 }
        }
      }
    ]
  },
  {
    id: "work_003",
    kind: "singleChoice",
    domain: "learning_method",
    prompt: "Jika kamu diwajibkan menguasai sebuah software pemrograman, analisis data, atau bahasa asing baru dalam waktu 1 bulan, rute kurikulum apa yang paling cepat menyangkut di otakmu?",
    instruction: "Pilih metode asimilasi pengetahuan yang paling sesuai tipe kognisimu.",
    reliability: 0.92,
    targetSystems: ["learning", "cognitive", "riasec"],
    options: [
      {
        id: "a",
        text: "Membaca manual book, buku teori dasar komprehensif, atau tutorial berseri terstruktur semenjak bab 1 demi memahami fondasi arsitektur logisnya secara utuh dahulu.",
        subtleMeaning: "Pembelajaran terstruktur linier, pengumpulan teori kredensial (learning: structured, Ti/Si, RIASEC Investigative).",
        weights: {
          cognitive: { Ti: 1.1, Si: 0.9 },
          learning: { structured: 1.4, projectBased: -0.6 },
          riasec: { Investigative: 1.2 },
          evidence: { theoreticalSystematicLearning: 1.3 }
        }
      },
      {
        id: "b",
        text: "Langsung melompat ke latihan membuat proyek mini (misal mendesain satu website kecil langsung), membiarkan trial-error menuntunku menemukan teori di tengah jalan.",
        subtleMeaning: "Pembelajaran berbasis eksperimen taktis, integrasi induktif instan (learning: projectBased, Se/Ne, RIASEC Realistic/Artistic).",
        weights: {
          cognitive: { Se: 0.9, Ne: 1.0 },
          learning: { projectBased: 1.4, structured: -0.8 },
          riasec: { Realistic: 1.0, Artistic: 0.8 },
          evidence: { experientialInductiveLearning: 1.3 }
        }
      },
      {
        id: "c",
        text: "Menonton video tutorial animasi interaktif bersuara merdu atau mengikuti workshop langsung di mana aku bisa mencatat analogi-analogi indrawi berselera seni.",
        subtleMeaning: "Pembelajaran berbasis visual metaforis, analogi dinamis (learning: visual/verbal, Ne/Fi).",
        weights: {
          cognitive: { Ne: 0.8, Fi: 0.5 },
          learning: { visual: 1.3, verbal: 0.7 },
          riasec: { Artistic: 1.1 },
          evidence: { multisensoryAnalogicalLearning: 1.2 }
        }
      }
    ]
  },
  {
    id: "work_004",
    kind: "singleChoice",
    domain: "upgrade_skill",
    prompt: "Ketika memutuskan mengupgrade kapasitas dirimu di waktu senggang, ranah ilmu seperti apa yang paling kencang memanggil hasrat eksistensimu?",
    instruction: "Pilih muara rasa ingin tahu ilmiahmu.",
    reliability: 0.88,
    targetSystems: ["riasec", "bigFive", "enneagram"],
    options: [
      {
        id: "a",
        text: "Sains teoretis, filsafat kritis, koding komputer, filsafat eksistensial, atau fisika teoretis yang menuntut konsentrasi logika otak tinggi.",
        subtleMeaning: "Investigasi ilmu abstrak mendalam (RIASEC Investigative, Enneagram 5, openness tinggi).",
        weights: {
          riasec: { Investigative: 1.4 },
          bigFive: { openness: 1.1 },
          enneagram: { "5": 1.4 },
          cognitive: { Ti: 0.8, Ni: 0.7 },
          evidence: { deepAbstractCerebrationInterest: 1.3 }
        }
      },
      {
        id: "b",
        text: "Seni ilustrasi, teknik penulisan naratif, desain grafis, tata musik, akting panggung, atau arsitektur estetik.",
        subtleMeaning: "Asosiasi ekspresi estetik kreatif (RIASEC Artistic, Enneagram 4, openness tinggi).",
        weights: {
          riasec: { Artistic: 1.4 },
          bigFive: { openness: 1.1 },
          enneagram: { "4": 1.3 },
          cognitive: { Fi: 0.8, Ne: 0.8 },
          evidence: { aestheticArtisticInterest: 1.3 }
        }
      },
      {
        id: "c",
        text: "Psikologi relasi, kepemimpinan tim, ilmu fasilitasi masyarakat, resolusi konflik, atau ilmu mediasi kemanusiaan.",
        subtleMeaning: "Eksplorasi interpersonal mediasi kesejahteraan (RIASEC Social/Enterprising, Enneagram 2/9).",
        weights: {
          riasec: { Social: 1.4, Enterprising: 0.5 },
          bigFive: { agreeableness: 0.8 },
          enneagram: { "2": 1.1, "9": 0.8 },
          cognitive: { Fe: 0.9 },
          evidence: { empatheticSocietalInterest: 1.3 }
        }
      },
      {
        id: "d",
        text: "Keahlian teknik tangan langsung, pertukangan kayu modern, perakitan mesin robotika, memanah, atau berkebun hidroponik taktis.",
        subtleMeaning: "Pengolahan instrumental material kriya fisik nyata (RIASEC Realistic, Se/Si).",
        weights: {
          riasec: { Realistic: 1.4 },
          bigFive: { openness: -0.4 },
          cognitive: { Se: 0.8, Si: 0.8 },
          evidence: { physicalInstrumentalCraftInterest: 1.3 }
        }
      }
    ]
  },
  {
    id: "work_005",
    kind: "singleChoice",
    domain: "career_orientation",
    prompt: "Jika kamu melamar suatu pekerjaan dan ditawari dua jenis format penugasan kerja dengan upah setara, mana pilihan naluriahmu?",
    instruction: "Pilih format petualangan karir yang paling selaras dengan kenyamanan jiwamu.",
    reliability: 0.90,
    targetSystems: ["work", "mbtiAxis", "values"],
    options: [
      {
        id: "a",
        text: "Analis/Perencana Strategis di balik layar: merancang struktur, SOP, menganalisis peluang data tren 5 tahun ke depan, minim keharusan berotasi publik.",
        subtleMeaning: "Perencana arsitektur teoritis sunyi otonom (planner, I, N, values: competence).",
        weights: {
          mbtiAxis: { I: 0.9, N: 0.8, J: 0.8 },
          work: { planner: 1.4, executor: 0.3 },
          values: { competence: 1.1 },
          evidence: { strategicBehindStagePlanner: 1.3 }
        }
      },
      {
        id: "b",
        text: "Eksekutif Hubungan Publik/Negosiator Lapangan: menemui puluhan klien baru tiap pekan, menyelesaikan krisis mendadak secara taktis, mempresentasikan ide kelompok di depan sorotan.",
        subtleMeaning: "Pengelola aksi visual eksternal tangguh (executor, E, S/N, values: impact/influence).",
        weights: {
          mbtiAxis: { E: 1.1, P: 0.6 },
          work: { executor: 1.4, innovator: 0.5 },
          values: { achievement: 1.1, power: 0.8 },
          evidence: { highProfilePublicNegotiator: 1.3 }
        }
      }
    ]
  },
  {
    id: "work_006",
    kind: "singleChoice",
    domain: "interview_strategy",
    prompt: "Ketika menghadapi sesi wawancara kerja yang sangat penting untuk karir impianmu, citra diri seperti apa yang paling kamu upayakan terpancar keluar?",
    instruction: "Pilih bahasa pemasaran diri yang paling orisinal kau siapkan.",
    reliability: 0.87,
    targetSystems: ["enneagram", "values", "disc"],
    options: [
      {
        id: "a",
        text: "Citra profesional tangguh, berprestasi cemerlang, memiliki deretan piala kinerja terhitung, serta jaminan akselerasi target bisnis kemakmuran perusahaan.",
        subtleMeaning: "Eksposisi nilai hasil kerja berdaya saing elit (Enneagram 3, DISC D, values: achievement).",
        weights: {
          enneagram: { "3": 1.4 },
          values: { achievement: 1.2, recognition: 0.9 },
          disc: { D: 1.1, I: 0.5 },
          evidence: { highVelocityCompetencyImage: 1.3 }
        }
      },
      {
        id: "b",
        text: "Citra pemikir orisinal pelontar ide segar masa depan yang out-of-the-box, mengutamakan otentisitas solusi dan komitmen memajukan nilai kemanusiaan.",
        subtleMeaning: "Eksposisi integritas visi, pembaharuan konseptual (Enneagram 4/7, openness tinggi, values: innovation).",
        weights: {
          enneagram: { "4": 1.0, "7": 1.0 },
          values: { autonomy: 0.9, innovation: 1.2 },
          bigFive: { openness: 1.0 },
          evidence: { authenticInnovatorVisionImage: 1.3 }
        }
      },
      {
        id: "c",
        text: "Citra pekerja loyal yang bersahaja, teliti merujuk prosedur baku, sanggup beradaptasi dengan budaya tim tanpa rewel membuat kekacauan politik baru.",
        subtleMeaning: "Eksposisi stabilitas kepatuhan, keandalan sistemik (Enneagram 6/9, DISC S, values: loyalty).",
        weights: {
          enneagram: { "6": 1.1, "9": 1.0 },
          values: { security: 0.9, benevolentLoyalty: 1.1 },
          disc: { S: 1.3 },
          evidence: { reliableLowMaintenanceAnchor: 1.3 }
        }
      }
    ]
  },
  {
    id: "work_007",
    kind: "singleChoice",
    domain: "unsupportive_boss",
    prompt: "Ketika mendapatkan atasan kerja baru yang ternyata memiliki gaya komunikasi yang tidak mendengarkan emosi bawahan, apa refleks pertahanan karirmu?",
    instruction: "Pilih taktik bertahan yang paling sering membungkus tindakan kerjamu.",
    reliability: 0.89,
    targetSystems: ["stress", "defense", "relationship"],
    options: [
      {
        id: "a",
        text: "Bekerja seakurat SOP murni demi mereduksi titik kesalahanku di matanya sembari membatasi obrolan emosi secara steril.",
        subtleMeaning: "Pengebalan fungsional prosedur pengaman otonomi diri (rationalization, Si, Enneagram 6/1).",
        weights: {
          cognitive: { Si: 0.9, Te: 0.5 },
          defense: { rationalization: 1.1 },
          relationship: { avoidantLeaning: 0.8 },
          evidence: { clinicalSopShield: 1.3 }
        }
      },
      {
        id: "b",
        text: "Bekerja mengalir dengan performa standar minimal (quiet quitting) demi memarkir sisa energi mentalku untuk hobi atau keluarga hangat di luar kantor.",
        subtleMeaning: "Isolasi diri mundur sepi demi kelestarian energi emosi privat (flight, Enneagram 9/5).",
        weights: {
          stress: { flight: 1.2 },
          enneagram: { "9": 1.2, "5": 1.0 },
          values: { peace: 1.2 },
          evidence: { energeticEmigrationQuietQuit: 1.3 }
        }
      },
      {
        id: "c",
        text: "Secara taktis terus menyenangkan hatinya, menebak kesenangannya lewat perlakuan prima agar karirku di bawah kepemimpinannya tetap aman melesat.",
        subtleMeaning: "Penerapan faun untuk mengamankan sirkulasi kesemakmuran relasi (fawn, Enneagram 2/3).",
        weights: {
          stress: { fawn: 1.3 },
          enneagram: { "2": 0.9, "3": 0.9 },
          evidence: { brownNosingSurvivalFawn: 1.2 }
        }
      }
    ]
  },
  {
    id: "work_008",
    kind: "singleChoice",
    domain: "workspace_layout",
    prompt: "Jika diberi wewenang mendesain meja kerjamu secara kustom, asisten digital atau kelengkapan fisik apa yang paling wajib mendampingi langkahmu?",
    instruction: "Pilih instrumen yang paling melambangkan efisiensi kerjamu.",
    reliability: 0.86,
    targetSystems: ["cognitive", "riasec", "values"],
    options: [
      {
        id: "a",
        text: "Aplikasi pengelola tugas digital (task manager timeline) yang terintegrasi rapi dengan notifikasi alarm ponsel pintar demi mengejar efisiensi jam-menit.",
        subtleMeaning: "Manajer keterlinieran logistik waktu, keteraturan determinasi (planner Te/Si, Conventional).",
        weights: {
          cognitive: { Te: 1.2, Si: 0.8 },
          riasec: { Conventional: 1.4 },
          values: { competence: 0.9, control: 1.1 },
          evidence: { digitalTimeManagerFocus: 1.3 }
        }
      },
      {
        id: "b",
        text: "Papan mading inspirasional (vision board) penuh potongan gambar estetik, kutipan pemicu orisinalitas ide, dan modul corak berseni tinggi.",
        subtleMeaning: "Pemicu visual orisinalitas representasi artistik (innovator Ne/Fi, Artistic).",
        weights: {
          cognitive: { Ne: 1.1, Fi: 0.8 },
          riasec: { Artistic: 1.4 },
          values: { innovation: 1.0, beauty: 1.1 },
          evidence: { inspirationalVisionBoardFocus: 1.3 }
        }
      },
      {
        id: "c",
        text: "Asisten suara AI interaktif yang bisa diajak berdiskusi tawa murni mencairkan stres, melisankan info cuaca hangat, atau memutar musik tenang pengantar keteduhan.",
        subtleMeaning: "Asisten relasional pencipta keharmonisan atmosfer batin sepi (caretaker Fe/Si, Social).",
        weights: {
          cognitive: { Fe: 0.8, Si: 0.8 },
          riasec: { Social: 1.3 },
          values: { peace: 1.1 },
          evidence: { atmosphericCaretakerFocus: 1.2 }
        }
      }
    ]
  },
  {
    id: "work_009",
    kind: "singleChoice",
    domain: "handling_mistakes",
    prompt: "Ketika mendapati dirimu melakukan kesalahan fatal estimasi anggaran dalam laporan resmi bisnis yang terlanjur terkirim ke dewan direksi, apa reaksi insting pertamamu?",
    instruction: "Pilih rute kepedulian batin pertamamu merespons kecerobohan.",
    reliability: 0.90,
    targetSystems: ["hexaco", "decision", "enneagram"],
    options: [
      {
        id: "a",
        text: "Langsung melapor secara asertif ke atasan sebelum ada orang lain menyadarinya, menyatakan tanggung jawab penuh, dan melampirkan file koreksi revisi tuntas.",
        subtleMeaning: "Transparansi berintegritas ksatria tinggi (honestyHumility tinggi, risk-aware, Enneagram 1).",
        weights: {
          hexaco: { honestyHumility: 1.4 },
          decision: { riskAware: 1.1 },
          enneagram: { "1": 1.3 },
          evidence: { proactiveConfessionResponsibility: 1.3 }
        }
      },
      {
        id: "b",
        text: "Mencari kambing hitam celah sistemik pengolahan data atau kesalahan software kalkulator sebagai tameng penyelamat kredibilitas karirku.",
        subtleMeaning: "Penyandingan citra lewat manipulasi kelemahan luar demi proteksi ego (low honestyHumility, projection, Enneagram 3).",
        weights: {
          hexaco: { honestyHumility: -1.0 },
          defense: { projection: 1.1 },
          enneagram: { "3": 1.2 },
          evidence: { defensiveProjectionShield: 1.2 }
        }
      },
      {
        id: "c",
        text: "Merasakan kepanikan badai luar biasa hingga perut mulas; membiarkannya dulu sembari berdoa semoga dewan direksi terlalu sibuk hingga tidak teliti membacanya.",
        subtleMeaning: "Penghindaran katastrofe rasa cemas lewat pengabaian nasib pasif (high neuroticism, Enneagram 6/9).",
        weights: {
          bigFive: { neuroticism: 1.2 },
          enneagram: { "6": 1.1, "9": 0.9 },
          defense: { denial: 0.8 },
          evidence: { passiveDenialPrayers: 1.2 }
        }
      }
    ]
  },
  {
    id: "work_010",
    kind: "singleChoice",
    domain: "competitiveness",
    prompt: "Ketika kamu bersaing ketat dengan seorang kolega tangguh demi memperebutkan satu slot promosi berbayar prestisius, apa filosofi batin perjuanganmu?",
    instruction: "Pilih bahasa ambisi berdaya saing orisinalmu.",
    reliability: 0.89,
    targetSystems: ["values", "conflict", "enneagram"],
    options: [
      {
        id: "a",
        text: "Bekerja gila-gilaan melipatgandakan output resmi kinerjaku untuk melampaui metrik milik mereka secara objektif tanpa celah bantahan.",
        subtleMeaning: "Keandalan daya saing metrik fungsional (competitive, Enneagram 3, Te).",
        weights: {
          cognitive: { Te: 1.1 },
          conflict: { competitive: 1.3 },
          enneagram: { "3": 1.3 },
          values: { achievement: 1.2 },
          evidence: { rawPerformanceCompetition: 1.3 }
        }
      },
      {
        id: "b",
        text: "Tetap bekerja dengan integritas normatif biasa sembari memperkokoh sirkulasi koalisi pertemanan politik lobi dengan orang-orang penting dewan pemutus.",
        subtleMeaning: "Daya saing lobi relasi interpersonal (influence-based Enterprising, Enneagram 2/3/7).",
        weights: {
          conflict: { compromising: 1.0 },
          enneagram: { "3": 0.8, "2": 0.7, "7": 0.6 },
          values: { relationalInfluence: 1.1 },
          evidence: { geopoliticalLobbyCompetition: 1.2 }
        }
      },
      {
        id: "c",
        text: "Melakukan dialog bertukar visi asertif dengan kompetitorku agar siapa pun yang terpilih nanti tetap mendukung persaudaraan tim jangka panjang.",
        subtleMeaning: "Keseimbangan harmoni altruistik membingkai persaingan (collaborative, secureLeaning, Enneagram 9/1).",
        weights: {
          conflict: { collaborative: 1.4 },
          relationship: { secureLeaning: 1.0 },
          enneagram: { "9": 1.1, "1": 0.5 },
          evidence: { ethicalCollaborativeCompetition: 1.3 }
        }
      }
    ]
  }
];
