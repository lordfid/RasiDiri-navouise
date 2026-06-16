/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { QuestionItem } from "../types";

export const questionItemsSupporting: QuestionItem[] = [
  {
    id: "sup_001",
    kind: "singleChoice",
    domain: "chat_silence",
    prompt: "Ketika sebuah pesan penting yang Anda kirimkan kepada seseorang yang dekat hanya dibaca (read) tanpa balasan dalam waktu berjam-jam, bagaimana batin Anda merespons pertama kali?",
    instruction: "Pilih kecenderungan reaksi otomatis batin Anda.",
    reliability: 0.94,
    targetSystems: ["relationship", "stress", "enneagram", "bigFive"],
    options: [
      {
        id: "a",
        text: "Tenang dan tidak ambil pusing; saya langsung mengalihkan perhatian ke aktivitas produktif lain, berasumsi dia sedang sibuk.",
        subtleMeaning: "Tipe hubungan Secure. Karakter mandiri yang tenang.",
        weights: {
          relationship: { secureLeaning: 1.5, avoidantLeaning: -0.5 },
          stress: { freeze: -0.5, hypervigilant: -1.0 },
          bigFive: { neuroticism: -1.0 },
          enneagram: { "9": 1.0, "5": 0.8 }
        }
      },
      {
        id: "b",
        text: "Batin berdenyut cemas; saya mulai mengecek status 'online', membaca ulang obrolan terakhir, dan khawatir ada kata-kata saya yang salah.",
        subtleMeaning: "Tipe hubungan Anxious. Sensitivitas penolakan tinggi.",
        weights: {
          relationship: { anxiousLeaning: 1.6, secureLeaning: -0.8 },
          stress: { hypervigilant: 1.5 },
          bigFive: { neuroticism: 1.4 },
          enneagram: { "6": 1.2, "4": 1.0, "2": 0.8 }
        }
      },
      {
        id: "c",
        text: "Batin merasa terusik namun seketika menutup diri; saya memutuskan untuk cuek sekalian, mematikan notifikasi, atau bersumpah akan mendiamkannya balik.",
        subtleMeaning: "Tipe hubungan Avoidant defensif.",
        weights: {
          relationship: { avoidantLeaning: 1.5, secureLeaning: -0.8 },
          stress: { flight: 1.2, fight: 0.6 },
          enneagram: { "8": 0.8, "5": 1.0, "7": -0.6 }
        }
      }
    ]
  },
  {
    id: "sup_002",
    kind: "singleChoice",
    domain: "tone_monitoring",
    prompt: "Dalam sebuah panggilan, Anda mendengar nada bicara teman dekat Anda mendadak berangsur dingin atau tidak sekembali biasanya. Bagaimana refleks sosial Anda memproses hal ini?",
    instruction: "Pilih cara Anda menyerap getaran emosi sosial.",
    reliability: 0.95,
    targetSystems: ["cognitive", "bigFive", "enneagram"],
    options: [
      {
        id: "a",
        text: "Sangat peka dan langsung menyerap perubahan atmosfer tersebut; saya spontan melunakkan nada bicara saya agar dia merasa nyaman dan didengar.",
        subtleMeaning: "Aktivitas dominan/auxiliary Fe (Extroverted Feeling). Fokus pada harmoni emosional kelompok/interpersonal.",
        weights: {
          cognitive: { Fe: 1.6, Fi: -0.5, Ti: -0.8 },
          bigFive: { agreeableness: 1.5 },
          enneagram: { "2": 1.4, "9": 1.1 },
          hexaco: { agreeableness: 1.2 }
        }
      },
      {
        id: "b",
        text: "Merasakan kejanggalan itu secara sunyi; saya tetap bersikap apa adanya namun di dalam hati saya merenungkan apakah ada nilai kejujuran hubungan yang tercederai.",
        subtleMeaning: "Aktivitas Fi (Introverted Feeling). Kejujuran internal.",
        weights: {
          cognitive: { Fi: 1.6, Fe: -0.5, Te: -0.8 },
          bigFive: { agreeableness: 0.8 },
          enneagram: { "4": 1.3, "1": 0.5 }
        }
      },
      {
        id: "c",
        text: "Saya fokus pada isi pembicaraan objektifnya saja beralaskan logika; jika ia tidak mengeluh secara verbal, saya anggap tidak ada masalah apa-apa.",
        subtleMeaning: "Aktivitas Ti/Te (Thinking). Mengedepankan logika fungsional objektif.",
        weights: {
          cognitive: { Ti: 1.2, Te: 1.2, Fe: -1.2 },
          bigFive: { agreeableness: -0.8 },
          enneagram: { "5": 1.2, "3": 0.6 }
        }
      }
    ]
  },
  {
    id: "sup_003",
    kind: "singleChoice",
    domain: "social_room",
    prompt: "Saat Anda harus memasuki ruangan yang dipenuhi oleh orang banyak yang tidak ada satu pun Anda kenal sebelumnya, kecenderungan raga dan batin Anda adalah...",
    instruction: "Pilih cara Anda memproses stimulus energi komunal.",
    reliability: 0.93,
    targetSystems: ["mbtiAxis", "bigFive", "instinct"],
    options: [
      {
        id: "a",
        text: "Merasa tersulut bersemangat dan bergairah; saya suka mematut vibe ruangan, mencari mata yang bersahabat, lalu mulai menyapa dan membuka obrolan ringan secara spontan.",
        subtleMeaning: "Ekstraversi dominan (E). Pencarian stimulus sosial luar.",
        weights: {
          mbtiAxis: { E: 1.6, I: -1.2 },
          bigFive: { extraversion: 1.5 },
          instinct: { so: 1.4, sp: -0.6 },
          disc: { I: 1.5 }
        }
      },
      {
        id: "b",
        text: "Merasa waspada atau lelah duluan; saya lebih suka meposisikan diri di pinggir atau dekat pintu selagi mengamati situasi, berteduh dalam keheningan privat saya.",
        subtleMeaning: "Introversi dominan (I). Penghematan energi psikologis.",
        weights: {
          mbtiAxis: { I: 1.6, E: -1.2 },
          bigFive: { extraversion: -1.2 },
          instinct: { sp: 1.4, so: -0.8 },
          disc: { C: 0.9, S: 0.9 }
        }
      },
      {
        id: "c",
        text: "Saya mencari satu atau dua individu yang terlihat memiliki daya pikat atau kecocokan mendalam (chemistry) untuk diajak berbicara empat mata dengan intensitas penuh.",
        subtleMeaning: "Insting Sexual/Intimate (sx) dominan.",
        weights: {
          instinct: { sx: 1.6, sp: -0.2, so: -0.8 },
          bigFive: { extraversion: 0.5 }
        }
      }
    ]
  },
  {
    id: "sup_004",
    kind: "singleChoice",
    domain: "sudden_assignment",
    prompt: "Atasan atau koordinator Anda mendadak melimpahkan satu tugas baru yang sangat kompleks dengan tenggat waktu ketat, namun ia tidak menyertakan panduan atau instruksi tertulis apa pun. Apa respons otomatis Anda?",
    instruction: "Pilih cara Anda beraliansi dengan ketidakpastian kerja.",
    reliability: 0.95,
    targetSystems: ["cognitive", "work", "enneagram", "values"],
    options: [
      {
        id: "a",
        text: "Segera membuat sebuah bagan jadwal kerja sederhana, menetapkan rute aksi yang efisien, dan langsung menggerakkan apa pun yang ada agar cepat selesai.",
        subtleMeaning: "Fungsi Te (Extroverted Thinking) fungsional terarah.",
        weights: {
          cognitive: { Te: 1.6, Ti: -0.6, Si: 0.7 },
          work: { planner: 1.2, executor: 1.2 },
          enneagram: { "3": 1.2, "8": 0.8, "1": 0.8 },
          values: { competence: 1.1 }
        }
      },
      {
        id: "b",
        text: "Menarik napas tenang, membongkar struktur masalah tersebut sendiri di pikiran saya, dan mencari formula keselarasan logis yang mendasar sebelum melangkah.",
        subtleMeaning: "Fungsi Ti (Introverted Thinking) pemetaan logis mandiri.",
        weights: {
          cognitive: { Ti: 1.6, Te: -0.6, Ne: 0.8 },
          work: { innovator: 1.1 },
          enneagram: { "5": 1.4 },
          values: { truth: 1.1 }
        }
      },
      {
        id: "c",
        text: "Merasa tertantang untuk berimprovisasi dengan cara-cara kreatif yang tak terduga; saya merasa bebas berkembang tanpa terkungkung oleh prosedur baku.",
        subtleMeaning: "Fungsi Ne/Se improvisatif bebas.",
        weights: {
          cognitive: { Ne: 1.4, Se: 1.4, Si: -1.2 },
          work: { innovator: 1.4 },
          enneagram: { "7": 1.3 },
          values: { freedom: 1.3 }
        }
      }
    ]
  },
  {
    id: "sup_005",
    kind: "singleChoice",
    domain: "harmless_rule_break",
    prompt: "Di jalan sunyi dini hari tanpa kendaraan satu pun, Anda melihat seseorang melompati pagar pembatas jalan kecil untuk melintas demi menghemat jalan kaki. Reaksi batin Anda...",
    instruction: "Pilih letak keselarasan moralitas sosial Anda.",
    reliability: 0.93,
    targetSystems: ["enneagram", "bigFive", "moral"],
    options: [
      {
        id: "a",
        text: "Batin terusik dingin; aturan ada dan harus ditaati demi ketertiban serta kelayakan sosial bersama, sekecil apa pun situasinya.",
        subtleMeaning: "Enneagram Tipe 1 (Reformer) - Penjagaan ketertiban moral berasaskan kepatuhan aturan.",
        weights: {
          enneagram: { "1": 1.6, "9": -0.6 },
          bigFive: { conscientiousness: 1.5 },
          moral: { ruleBased: 1.6 }
        }
      },
      {
        id: "b",
        text: "Sangat acuh dan pragmatis; bagi saya itu hal yang wajar dan cerdas selama tidak membahayakan atau merugikan keselamatan jiwa orang lain.",
        subtleMeaning: "Pola moralitas pragmatis fungsional.",
        weights: {
          enneagram: { "7": 1.0, "9": 0.8, "1": -1.2 },
          bigFive: { conscientiousness: -1.0 },
          moral: { pragmatist: 1.5, libertarian: 1.0 }
        }
      },
      {
        id: "c",
        text: "Batin merasa terganggu namun saya langsung meredam penilaian tersebut agar emosi saya tetap damai tanpa riak amarah tidak penting.",
        subtleMeaning: "Enneagram Tipe 9 (Peacemaker) - Penjagaan keharmonisan batin.",
        weights: {
          enneagram: { "9": 1.6, "1": -0.5 },
          bigFive: { agreeableness: 1.2 },
          moral: { altruist: 0.8 }
        }
      }
    ]
  },
  {
    id: "sup_006",
    kind: "singleChoice",
    domain: "safe_vs_risky",
    prompt: "Apabila hidup menawarkan Anda dua buah pilihan: sebuah posisi aman di perusahaan impian yang menjamin stabilitas seumur hidup, ATAU proyek mandiri penuh fluktuasi namun menawarkan kemandirian radikal yang sangat menantang jiwa. Anda condong memilih ke arah mana?",
    instruction: "Pilih letak pertaruhan rasa aman Anda.",
    reliability: 0.94,
    targetSystems: ["instinct", "enneagram", "bigFive", "values"],
    options: [
      {
        id: "a",
        text: "Posisi aman yang stabil; bagi saya kenyamanan fisik, kecukupan finansial tertata, kesehatan, dan ketenangan hidup rutin adalah pondasi paling suci.",
        subtleMeaning: "Insting Self-Preservation (sp). Menjaga ketertiban hidup riil.",
        weights: {
          instinct: { sp: 1.6, sx: -0.8 },
          enneagram: { "6": 1.4, "9": 1.0 },
          bigFive: { openness: -1.0 },
          values: { security: 1.5 }
        }
      },
      {
        id: "b",
        text: "Proyek mandiri yang menantang; saya butuh hidup yang bergelora, menyalakan gairah obsesi, merasakan kedalaman intensitas, dan tidak takut goyah demi kebebasan.",
        subtleMeaning: "Insting Sexual/Intimate (sx). Mengutamakan intensitas kehidupan.",
        weights: {
          instinct: { sx: 1.6, sp: -0.8 },
          enneagram: { "7": 1.4, "8": 1.1, "4": 0.8 },
          bigFive: { openness: 1.4 },
          values: { freedom: 1.5 }
        }
      }
    ]
  },
  {
    id: "sup_007",
    kind: "singleChoice",
    domain: "partner_drifting",
    prompt: "Saat orang terdekat Anda perlahan terlihat menjaga jarak dan mengurangi komunikasi tanpa sebab yang jelas belakangan ini, respons relasional bawah sadar Anda adalah...",
    instruction: "Pilih kecenderungan emosional intim Anda.",
    reliability: 0.92,
    targetSystems: ["relationship", "stress", "enneagram"],
    options: [
      {
        id: "a",
        text: "Batin didera pikiran buruk dan saya terus-menerus mengecek apakah saya melakukan salah, berulang kali mencari kepastian padanya secara emosional.",
        subtleMeaning: "Gaya ikatan Anxious-Preoccupied. Ketakutan ditinggalkan tinggi.",
        weights: {
          relationship: { anxiousLeaning: 1.6, secureLeaning: -0.8 },
          stress: { hypervigilant: 1.3 },
          enneagram: { "6": 1.2, "2": 1.1, "4": 1.1 }
        }
      },
      {
        id: "b",
        text: "Saya membalas menarik diri demi harga diri; saya merasionalisasi bahwa jika ia ingin pergi saya tidak akan memohon, memosisikan diri mandiri seolah tidak butuh.",
        subtleMeaning: "Gaya ikatan Dismissive-Avoidant. Kemandirian defensif.",
        weights: {
          relationship: { avoidantLeaning: 1.6, secureLeaning: -0.8 },
          stress: { flight: 1.2 },
          enneagram: { "5": 1.3, "8": 1.0, "3": 0.8 }
        }
      },
      {
        id: "c",
        text: "Mendekatinya secara jujur, bersikap hangat namun proporsional, serta mengomunikasikan batas rasa aman tanpa menuduh atau dilingkupi panik berlebihan.",
        subtleMeaning: "Gaya ikatan Secure seimbang.",
        weights: {
          relationship: { secureLeaning: 1.6 },
          stress: { fawn: -0.5 },
          bigFive: { agreeableness: 1.1 }
        }
      }
    ]
  },
  {
    id: "sup_008",
    kind: "singleChoice",
    domain: "public_criticism",
    prompt: "Ketika draf pekerjaan atau ucapan Anda dikritik secara tajam dan terbuka di depan forum rapat/kelompok oleh seseorang yang berpengaruh, di manakah letak kepedihan utama batin Anda?",
    instruction: "Pilih muara sensitivitas luka ego Anda.",
    reliability: 0.94,
    targetSystems: ["enneagram", "bigFive", "defense"],
    options: [
      {
        id: "a",
        text: "Luka citra kebanggaan diri; saya merasa reputasi kompetensi atau keorisinilan karya saya dinodai sehingga jatuh di mata khalayak.",
        subtleMeaning: "Sensitivitas trias Jantung (Heart Triad: 2, 3, 4) terkait harga diri.",
        weights: {
          enneagram: { "3": 1.5, "4": 1.1, "2": 0.8 },
          bigFive: { neuroticism: 0.9 },
          defense: { projection: 0.8 }
        }
      },
      {
        id: "b",
        text: "Luka pemikiran; saya cemas argumen saya dinilai tidak masuk akal atau dituduh bodoh, sehingga saya buru-buru merancang pembelaan logis beralasan rasional.",
        subtleMeaning: "Sensitivitas trias Kepala (Head Triad: 5, 6, 7) terkait kebenaran intelektual.",
        weights: {
          enneagram: { "5": 1.4, "6": 1.2 },
          defense: { rationalization: 1.5 }
        }
      },
      {
        id: "c",
        text: "Luka kedaulatan/kemarahan; saya merasa wewenang dan batasan diri saya dilewati secara sewenang-wenang oleh orang tersebut.",
        subtleMeaning: "Sensitivitas trias Perut (Gut Triad: 8, 9, 1) terkait kontrol diri.",
        weights: {
          enneagram: { "8": 1.5, "1": 1.1 },
          defense: { denial: 0.8 }
        }
      }
    ]
  },
  {
    id: "sup_009",
    kind: "singleChoice",
    domain: "risky_opportunity",
    prompt: "Sebuah tawaran kepemimpinan besar dibuka. Peluang keberhasilannya tinggi namun membutuhkan ketegasan, keberanian tampil menonjol, dan kesiapan menerima badai kritik dari lawan. Bagaimana Anda melangkah?",
    instruction: "Pilih cara Anda menyikapi kekuasaan batin.",
    reliability: 0.95,
    targetSystems: ["attitudinalPsyche", "disc", "values", "enneagram"],
    options: [
      {
        id: "a",
        text: "Langsung mengambil alih kemudi keputusan dengan mantap; saya yakin dengan arah kehendak saya dan tidak takut berkonfrontasi dengan siapa pun.",
        subtleMeaning: "Posisi Volition Pertama (1V). Karakter asertif tangguh.",
        weights: {
          attitudinalPsyche: { V: { confident: 1.6, flexible: 0.0, insecure: 0.0, indifferent: 0.0 } },
          disc: { D: 1.5 },
          values: { power: 1.4 },
          enneagram: { "8": 1.5, "3": 1.1 }
        }
      },
      {
        id: "b",
        text: "Menjadi pendorong layar yang fleksibel; saya mau memimpin asalkan ada ruang musyawarah yang ramah, cair, dan semua keputusan diambil demi kenyamanan bersama.",
        subtleMeaning: "Posisi Volition Kedua (2V) yang akomodatif.",
        weights: {
          attitudinalPsyche: { V: { flexible: 1.5, confident: 0.0, insecure: 0.0, indifferent: 0.0 } },
          disc: { S: 1.2 },
          values: { peace: 1.3 },
          enneagram: { "9": 1.4, "2": 0.9 }
        }
      },
      {
        id: "c",
        text: "Memilih menghindari posisi terdepan karena bayang-bayang kegagalan batin sangat sensitif; saya cemas dikritik atau diserang balik sehingga merasa tidak siap memimpin.",
        subtleMeaning: "Posisi Volition Ketiga (3V) yang rentan/insecure.",
        weights: {
          attitudinalPsyche: { V: { insecure: 1.6, confident: 0.0, flexible: 0.0, indifferent: 0.0 } },
          disc: { C: 1.1 },
          enneagram: { "6": 1.2, "4": 1.0, "5": 0.9 }
        }
      }
    ]
  },
  {
    id: "sup_010",
    kind: "singleChoice",
    domain: "distressed_peer",
    prompt: "Saat seseorang di dekat Anda tiba-tiba meneteskan air mata atau terlihat begitu hancur bersedih, apa refleks paling pertama dari lubuk kemanusiaan Anda?",
    instruction: "Pilih pancaran etika empatik Anda.",
    reliability: 0.94,
    targetSystems: ["cognitive", "bigFive", "hexaco", "moral"],
    options: [
      {
        id: "a",
        text: "Seketika dilingkupi gelombang getaran rasa sedihnya; saya langsung memeluk, merawat, atau melontarkan validasi emosional yang hangat tanpa berpikir panjang.",
        subtleMeaning: "Refleks empathy terikat Fe komunal.",
        weights: {
          cognitive: { Fe: 1.6, Fi: -0.5 },
          bigFive: { agreeableness: 1.5 },
          hexaco: { emotionality: 1.4 },
          moral: { altruist: 1.5 }
        }
      },
      {
        id: "b",
        text: "Merasakan kesedihan itu secara tenang di dalam batin saya sendiri; saya memberikan ruang hening bagisnya tanpa mendominasi pembicaraan, menghormati privasi lukanya.",
        subtleMeaning: "Refleks empathy autentik terikat Fi indiviual.",
        weights: {
          cognitive: { Fi: 1.6, Fe: -0.5 },
          bigFive: { agreeableness: 0.9 },
          hexaco: { openness: 1.0 },
          moral: { idealist: 1.1 }
        }
      },
      {
        id: "c",
        text: "Berusaha menenangkan perasaannya dengan menyodorkan opsi solusi nyata, menganalisis sebab duka, atau membantu meringankan masalah konkretnya.",
        subtleMeaning: "Pendekatan empatik rasional/solutif.",
        weights: {
          cognitive: { Te: 1.2, Ti: 1.2, Fe: -1.0 },
          bigFive: { agreeableness: -0.4 },
          moral: { pragmatist: 1.5 }
        }
      }
    ]
  },
  {
    id: "sup_011",
    kind: "singleChoice",
    domain: "group_panic",
    prompt: "Terjadi sebuah kepanikan mendadak dalam pengerjaan proyek kelompok karena sistem data terhapus. Refleks operasional diri Anda saat situasi kacau ini adalah...",
    instruction: "Pilih kran kemudi stres taktis Anda.",
    reliability: 0.95,
    targetSystems: ["stress", "cognitive", "disc", "enneagram"],
    options: [
      {
        id: "a",
        text: "Menghentikan gejolak emosi batin seketika; saya langsung menyalakan dorongan mengontrol keadaan, memerintahkan orang melakukan langkah penyelamatan.",
        subtleMeaning: "Perilaku Overcontrol / Fight stres. Penjagaan kendali operasional langsung.",
        weights: {
          stress: { fight: 1.5, freeze: -1.0 },
          cognitive: { Te: 1.5, Fe: -0.8 },
          disc: { D: 1.4 },
          enneagram: { "8": 1.4, "3": 1.0 }
        }
      },
      {
        id: "b",
        text: "Tubuh atau pikiran sempat kaku berserakan sesaat (blank); saya membutuhkan beberapa waktu menyendiri untuk menenangkan badai kepanikan sebelum kembali mengambil keputusan logis.",
        subtleMeaning: "Respons Freeze stres. Penyandaran pengolahan batin yang mendalam.",
        weights: {
          stress: { freeze: 1.6, fight: -1.0 },
          cognitive: { Ti: 1.1, Fi: 1.1 },
          disc: { C: 1.0 },
          enneagram: { "5": 1.4, "9": 1.2, "4": 1.0 }
        }
      },
      {
        id: "c",
        text: "Buru-buru melunakkan suasana kelompok agar emosi semua orang dingin terlebih dahulu; saya merasa mustahil bekerja di tengah kepanikan dan keretakan kemanusiaan.",
        subtleMeaning: "Respons Fawn stres relasional.",
        weights: {
          stress: { fawn: 1.6 },
          cognitive: { Fe: 1.4, Ti: -0.8 },
          disc: { S: 1.3 },
          enneagram: { "2": 1.3, "9": 1.2 }
        }
      }
    ]
  },
  {
    id: "sup_012",
    kind: "singleChoice",
    domain: "plan_disruption",
    prompt: "Satu jam sebelum keberangkatan liburan panjang yang sudah diatur rapi berbulan-bulan, maskapai mengumumkan penundaan jadwal (delay) selama satu hari penuh. Apa getaran reaksi Anda?",
    instruction: "Pilih cara Anda menyikapi struktur kehidupan.",
    reliability: 0.94,
    targetSystems: ["mbtiAxis", "cognitive", "bigFive"],
    options: [
      {
        id: "a",
        text: "Batin didera kekecewaan mendalam dan amarah dingin; saya merasa hidup menjadi kacau balau karena seluruh urutan jadwal yang sudah tertata hancur.",
        subtleMeaning: "Kekuatan kutub Judging (J) dan Introverted Sensing (Si). Kebutuhan stabilitas kronologis.",
        weights: {
          mbtiAxis: { J: 1.6, P: -1.2 },
          cognitive: { Si: 1.5, Ne: -1.0 },
          bigFive: { conscientiousness: 1.3 }
        }
      },
      {
        id: "b",
        text: "Seketika tertawa kecil memaklumi keadaan dan beradaptasi; saya spontan merancang rute liburan alternatif di kota keberangkatan tanpa merasa terbebani.",
        subtleMeaning: "Kekuatan kutub Perceiving (P) dan Extroverted Intuition/Sensing.",
        weights: {
          mbtiAxis: { P: 1.6, J: -1.2 },
          cognitive: { Ne: 1.4, Se: 1.4, Si: -1.2 },
          bigFive: { conscientiousness: -0.8 }
        }
      }
    ]
  },
  {
    id: "sup_013",
    kind: "singleChoice",
    domain: "unappreciated_effort",
    prompt: "Setelah sekian lama mendedikasikan waktu, pikiran, dan tenaga ekstra demi menyelamatkan proyek atau hubungan seseorang, ternyata mereka menyikapinya seolah itu kewajiban biasa tanpa rasa terima kasih nyata. Rasa hati Anda yang paling kuat adalah...",
    instruction: "Pilih saringan pelindung batin Anda.",
    reliability: 0.93,
    targetSystems: ["enneagram", "values", "defense"],
    options: [
      {
        id: "a",
        text: "Kecewa besar, merasa ditolak, tidak dihargai, dan batin diam-diam menangis kepedihan di balik senyuman tulus yang saya paksakan di luar.",
        subtleMeaning: "Pola penolakan emosional Enneagram Tipe 2 (Helper) / Tipe 4.",
        weights: {
          enneagram: { "2": 1.6, "4": 1.2 },
          values: { love: 1.4 },
          defense: { repression: 1.3 }
        }
      },
      {
        id: "b",
        text: "Merasa kesal lalu seketika menegakkan batasan diri yang sangat kaku dan dingin; saya memutuskan tidak akan pernah sudi membantu mereka lagi sepeser pun.",
        subtleMeaning: "Penolakan agresif pelindung otonomi Enneagram Tipe 8 (Challenger) / Tipe 5.",
        weights: {
          enneagram: { "8": 1.5, "5": 1.2 },
          values: { autonomy: 1.4 },
          defense: { denial: 1.0 }
        }
      },
      {
        id: "c",
        text: "Meredam kecewa melalui pembuktian logis atau merasionalisasi keadaan; bagi saya itu bagian dari dinamika risiko sosial yang wajar dalam berbuat baik.",
        subtleMeaning: "Pola penyelesaian Rationalization.",
        weights: {
          enneagram: { "9": 1.1, "1": 0.8 },
          defense: { rationalization: 1.5 }
        }
      }
    ]
  },
  {
    id: "sup_014",
    kind: "singleChoice",
    domain: "intuitive_prediction",
    prompt: "Ketika sebuah rencana bersama sedang dirapatkan dengan penuh optimisme, tiba-tiba Anda menangkap kilasan firasat kuat, sunyi, namun sangat mendalam bahwa rencana ini membawa kegagalan besar, sekalipun saat itu belum ada data kegagalan konkret di atas meja rapat. Bagaimana intuisi Anda bekerja?",
    instruction: "Pilih rute pancaran penglihatan batin Anda.",
    reliability: 0.95,
    targetSystems: ["cognitive", "enneagram", "bigFive"],
    options: [
      {
        id: "a",
        text: "Firasat itu berupa sebuah simpulan visioner tunggal yang mengakar kuat di kepala saya; saya diam memperhatikan polanya, tahu 'ada yang salah' tanpa bisa menjabarkan segunung rincian datanya.",
        subtleMeaning: "Letupan Introverted Intuition (Ni). Sintesis pola bawah sadar tunggal.",
        weights: {
          cognitive: { Ni: 1.7, Ne: -1.0 },
          enneagram: { "4": 1.0, "5": 1.1, "6": 0.8 },
          bigFive: { openness: 1.2 }
        }
      },
      {
        id: "b",
        text: "Pikiran saya seketika bergelora melompat-lompat membayangkan sepuluh kemungkin skenario buruk yang bercabang; saya langsung menyuarakan berbagai alternatif antisipasi kegagalan.",
        subtleMeaning: "Eksplorasi Extroverted Intuition (Ne). Divergensi skenario kemungkinan.",
        weights: {
          cognitive: { Ne: 1.6, Ni: -1.0 },
          enneagram: { "7": 1.2, "6": 1.0 },
          bigFive: { openness: 1.2 }
        }
      },
      {
        id: "c",
        text: "Saya menolak bersandar pada firasat abstrak; saya memilih setia meninjau riwayat data lama dari arsip pengalaman nyata yang sudah terbukti di masa lalu.",
        subtleMeaning: "Pendekatan sensorik terarsip Introverted Sensing (Si).",
        weights: {
          cognitive: { Si: 1.6, Ni: -1.0, Ne: -1.0 },
          enneagram: { "6": 1.0, "1": 0.8 },
          bigFive: { conscientiousness: 1.2 }
        }
      }
    ]
  },
  {
    id: "sup_015",
    kind: "singleChoice",
    domain: "bound_setting",
    prompt: "Saat stamina batin Anda sudah diambang kepunahan (exhausted) dan Anda sangat butuh pulang menepi sendirian, tiba-tiba seorang teman dekat yang tertimpa malapetaka batin mengejar Anda meminta Anda mendengarkan duka hidupnya malam itu. Apa jalan keluar tulus yang Anda pilih?",
    instruction: "Pilih letak penyeimbang etika orisinalitas diri Anda.",
    reliability: 0.94,
    targetSystems: ["cognitive", "enneagram", "values", "bigFive"],
    options: [
      {
        id: "a",
        text: "Memikul duka tersebut malam itu juga demi persahabatan, sekalipun raga dan emosi saya sendiri harus babak belur melayani kenyamanannya.",
        subtleMeaning: "Dominasi Fe komunal atau penahanan batas ego demi penyelamatan relasi (Tipe 2/9).",
        weights: {
          cognitive: { Fe: 1.5, Fi: -0.8 },
          enneagram: { "2": 1.5, "9": 1.2 },
          values: { love: 1.4 },
          bigFive: { agreeableness: 1.4 }
        }
      },
      {
        id: "b",
        text: "Memohon maaf secara jujur, asertif, dan lembut bahwa saya sedang kehabisan energi spiritual; saya menegakkan batas suci saya demi kesehatan jiwa namun berjanji melayaninya esok hari.",
        subtleMeaning: "Kejujuran integritas nilai Fi individual atau batas energi suci Tipe 4/5.",
        weights: {
          cognitive: { Fi: 1.5, Fe: -0.8 },
          enneagram: { "4": 1.4, "5": 1.2 },
          values: { truth: 1.2, autonomy: 1.2 },
          bigFive: { agreeableness: 0.5 }
        }
      }
    ]
  },
  {
    id: "sup_016",
    kind: "singleChoice",
    domain: "emotional_secrecy",
    prompt: "Bila Anda memendam satu beban rahasia duka yang sangat sensitif di batin Anda, bagaimana mekanisme pertahanan Anda mengelolanya sehari-hari?",
    instruction: "Pilih taktik pengelolaan duka di balik bayang-bayang.",
    reliability: 0.93,
    targetSystems: ["enneagram", "defense", "bigFive"],
    options: [
      {
        id: "a",
        text: "Menenggelamkan luka itu rapat-rapat dalam ruang keheningan batin terdalam; saya bersikap seolah semuanya ceria dan baik-baik saja demi kestabilan dunia luar.",
        subtleMeaning: "Mekanisme Repression stres / Penyelarasan batin Enneagram Tipe 9/2.",
        weights: {
          enneagram: { "9": 1.5, "2": 1.1 },
          defense: { repression: 1.6 },
          bigFive: { extraversion: 0.6 }
        }
      },
      {
        id: "b",
        text: "Meratapi dan memeluk kedalaman luka itu sendirian secara intens; saya merasa pusing jika duka saya yang unik ini diintervensi oleh pemikiran orang biasa.",
        subtleMeaning: "Mekanisme identifikasi duka Enneagram Tipe 4 (Individualist).",
        weights: {
          enneagram: { "4": 1.6 },
          defense: { sublimation: 0.7 },
          bigFive: { extraversion: -0.8 }
        }
      },
      {
        id: "c",
        text: "Menarik garis pembatas yang ketat dari interaksi emosional sosial; saya melarikan fokus duka ke dalam analisis pustaka data konseptual, sains, hobi, atau riset filosofis privat.",
        subtleMeaning: "Mekanisme isolasi emosional Enneagram Tipe 5 (Investigator).",
        weights: {
          enneagram: { "5": 1.6 },
          defense: { rationalization: 1.4 },
          bigFive: { extraversion: -1.0 }
        }
      }
    ]
  },
  {
    id: "sup_017",
    kind: "singleChoice",
    domain: "emotional_verbalization",
    prompt: "Ketika ada orang yang mendesak atau melontarkan pertanyaan paksa agar Anda menguraikan secara verbal apa yang sebenarnya sedang Anda rasakan saat itu juga, bagaimana reaksi kognitif batin Anda?",
    instruction: "Pilih rute perakitan ekspresi perasaan Anda.",
    reliability: 0.92,
    targetSystems: ["cognitive", "attitudinalPsyche", "values"],
    options: [
      {
        id: "a",
        text: "Merasa sangat tersiksa, buntu, atau canggung; emosi batin saya bagaikan kabut samudera yang sangat dalam, tidak bisa dengan kasar diredusir ke dalam kata-kata begitu saja.",
        subtleMeaning: "Kekuatan Perasaan Introvert (Fi) yang pekat. Posisi Emosi Ketiga (3E) yang sensitif.",
        weights: {
          cognitive: { Fi: 1.6, Fe: -1.0 },
          attitudinalPsyche: { E: { insecure: 1.5, confident: 0.0, flexible: 0.0, indifferent: 0.0 } },
          values: { autonomy: 1.1 }
        }
      },
      {
        id: "b",
        text: "Merasa mudah dan lancar menuangkan warna emosi saya; saya pandai menerjemahkan getaran hati saya atau menyelaraskannya dengan ekspresi sosial eksternal secara adaptif.",
        subtleMeaning: "Kekuatan Perasaan Ekstrovert (Fe) yang lancar. Posisi Emosi Kedua (2E) yang komunikatif.",
        weights: {
          cognitive: { Fe: 1.5, Fi: -0.8 },
          attitudinalPsyche: { E: { flexible: 1.5, confident: 0.0, insecure: 0.0, indifferent: 0.0 } },
          values: { love: 1.2 }
        }
      }
    ]
  },
  {
    id: "sup_018",
    kind: "singleChoice",
    domain: "blank_check_freedom",
    prompt: "Apabila Anda diberikan kebebasan fungsional mutlak berupa ruang gerak tanpa batas dan ketiadaan garis arahan apa pun dalam menjalankan sebuah misi, bagaimana hal tersebut memengaruhi produktivitas Anda?",
    instruction: "Pilih kecenderungan rasi pemikiran operasional Anda.",
    reliability: 0.94,
    targetSystems: ["mbtiAxis", "cognitive", "work"],
    options: [
      {
        id: "a",
        text: "Batin merasa cemas, hampa, atau kehilangan pijakan; saya membutuhkan sebentuk urutan, batasan operasional yang jelas, serta kebiasaan baku agar dapat menelurkan karya berkualitas.",
        subtleMeaning: "Kebutuhan kutub Judging (J) dan Introverted Sensing (Si) akan garis arah yang kokoh.",
        weights: {
          mbtiAxis: { J: 1.5, P: -1.0 },
          cognitive: { Si: 1.4, Ne: -1.0 },
          work: { planner: 1.4 }
        }
      },
      {
        id: "b",
        text: "Merasa sangat berenergi, merdeka, dan kreatif; kemandirian total dan ketiadaan arahan baku justru memicu ide-ide spekulatif dan keliaran potensi fungsional saya.",
        subtleMeaning: "Sinyal kutub Perceiving (P) dan kekuatan intuisi kognitif orisinal.",
        weights: {
          mbtiAxis: { P: 1.5, J: -1.0 },
          cognitive: { Ne: 1.5, Se: 1.2, Si: -1.4 },
          work: { innovator: 1.4 }
        }
      }
    ]
  },
  {
    id: "sup_019",
    kind: "singleChoice",
    domain: "messy_system",
    prompt: "Saat Anda memasuki ranah kepengurusan sebuah organisasi atau proyek baru, dan Anda melihat sistem kerja, pemetaan data, dan administrasi internal di dalamnya berantakan tanpa struktur yang jelas, refleks mental Anda adalah...",
    instruction: "Pilih kompas penertiban data Anda.",
    reliability: 0.95,
    targetSystems: ["cognitive", "enneagram", "bigFive", "disc"],
    options: [
      {
        id: "a",
        text: "Seketika merasa terusik dan gemas; saya bergairah menyingsingkan lengan baju, merancang SOP baru, merapikan data, dan menyusun target-target fungsional yang efisien.",
        subtleMeaning: "Pancaran fungsional Te (Extroverted Thinking). Hambatan pembuangan waktu.",
        weights: {
          cognitive: { Te: 1.6, Ti: -0.6, Si: 0.9 },
          enneagram: { "1": 1.3, "3": 1.2, "8": 0.8 },
          bigFive: { conscientiousness: 1.5 },
          disc: { C: 1.4, D: 0.9 }
        }
      },
      {
        id: "b",
        text: "Saya membiarkannya berjalan mengalir selagi saya menjaga otonomi kerja saya sendiri; bagi saya kerapian administrasi terlalu memakan banyak energi spiritual jika diributkan.",
        subtleMeaning: "Karakter otonom damai mandiri.",
        weights: {
          cognitive: { Te: -1.2, Si: -0.5 },
          enneagram: { "9": 1.4, "7": 1.1, "4": 0.8 },
          bigFive: { conscientiousness: -1.0 },
          disc: { S: 1.2 }
        }
      }
    ]
  },
  {
    id: "sup_020",
    kind: "singleChoice",
    domain: "shaping_authenticity",
    prompt: "Ketika tuntutan pergaulan sosial di lingkaran pertemanan Anda menuntut Anda untuk menceritakan rahasia atau mengikuti tren gaya hidup tertentu demi kelayakan penerimaan obrolan, kompas batin Anda merespons...",
    instruction: "Pilih sumbu jati diri moral Anda.",
    reliability: 0.94,
    targetSystems: ["cognitive", "enneagram", "values", "bigFive"],
    options: [
      {
        id: "a",
        text: "Sangat menentang secara diam-diam atau asertif; saya tidak sudi berpura-pura atau menyembelih jati diri otentik saya hanya demi kenyamanan berteduh di pelukan komunal.",
        subtleMeaning: "Kekuatan Fi (Introverted Feeling). Karakter kemurnian moral individual.",
        weights: {
          cognitive: { Fi: 1.6, Fe: -1.2 },
          enneagram: { "4": 1.6, "1": 0.8, "8": 0.8 },
          values: { truth: 1.4, autonomy: 1.4 },
          bigFive: { agreeableness: -0.5 }
        }
      },
      {
        id: "b",
        text: "Memaklumi perbedaan dan melaraskan diri; saya bersedia beradaptasi meramaikan obrolan tersebut demi kenyamanan bersama dan menghindari keterasingan atau kekakuan suasana.",
        subtleMeaning: "Kekuatan Fe (Extroverted Feeling). Penjagaan kelenturan kohesi sosial berkelompok.",
        weights: {
          cognitive: { Fe: 1.5, Fi: -1.0 },
          enneagram: { "2": 1.4, "9": 1.3, "3": 0.9 },
          values: { love: 1.3, peace: 1.3 },
          bigFive: { agreeableness: 1.4 }
        }
      }
    ]
  }
];
