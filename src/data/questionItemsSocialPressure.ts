/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { QuestionItem } from "../types";

export const questionItemsSocialPressure: QuestionItem[] = [
  {
    id: "soc_001",
    kind: "singleChoice",
    domain: "karaoke",
    prompt: "Kamu ditawari bernyanyi karaoke di depan kolega kantor lama atau sekelompok kenalan baru. Apa tindakan spontan yang paling menggambarkan dirimu?",
    instruction: "Pilih skenario aksi panggung yang paling natural bagimu.",
    reliability: 0.88,
    targetSystems: ["bigFive", "disc", "attitudinalPsyche", "instinct"],
    options: [
      {
        id: "a",
        text: "Menolaknya dengan senyum santun, hanya bersedia bernyanyi di depan sahabat dekat, keluarga intim, atau pasangan cinta saja.",
        subtleMeaning: "Penyandingan kenyamanan terbatas, proteksi penampilan sosial (introversion, sp/sx, AP Emotion insecure/private).",
        weights: {
          mbtiAxis: { I: 1.0, E: -0.9 },
          bigFive: { extraversion: -0.9 },
          instinct: { sp: 0.9, sx: 0.5, so: -0.8 },
          disc: { C: 0.8 },
          evidence: { absoluteSocialReservation: 1.2 }
        }
      },
      {
        id: "b",
        text: "Segera merebut mic-nya dengan tawa gembira, bernyanyi lepas lagu apa saja asalkan suasananya seru dan mencairkan suasana beku.",
        subtleMeaning: "Kenyamanan ekspresif panggung terbuka tinggi, peleburan sosial (extraversion, so/sx, DISC I, Emotion confident).",
        weights: {
          mbtiAxis: { E: 1.1, I: -1.0 },
          bigFive: { extraversion: 1.2 },
          instinct: { so: 1.1, sx: 0.7, sp: -0.8 },
          disc: { I: 1.4 },
          attitudinalPsyche: { E: { confident: 1.1, flexible: 0.3, insecure: 0.0, indifferent: 0.0 } },
          evidence: { extrovertedSocialEase: 1.3 }
        }
      },
      {
        id: "c",
        text: "Menyanyi seadanya jika ditunjuk beramai-ramai agar membaur, namun merasa jantung berdegup kencang dan ingin lekas meletakkan mic setelah beres.",
        subtleMeaning: "Penyesuaian terpaksa demi harmoni kepatuhan norma, ketidaknyamanan sorotan panggung (introversion, fawn, DISC S).",
        weights: {
          mbtiAxis: { I: 0.6, E: -0.5 },
          bigFive: { extraversion: -0.4, neuroticism: 0.6 },
          disc: { S: 1.1 },
          stress: { fawn: 0.9 },
          evidence: { compliantSocialParticipation: 1.2 }
        }
      },
      {
        id: "d",
        text: "Membuat candaan menggelitik mementahkan tawaran, lalu dengan ahli mengalihkan mic tersebut ke orang lain yang tampak lebih pandai berbakat bernyanyi.",
        subtleMeaning: "Taktik membelokkan sorotan sosial bermartabat lewat keahlian komunikasi (diplomatic, P, Enneagram 7).",
        weights: {
          mbtiAxis: { P: 0.7, E: 0.4 },
          enneagram: { "7": 1.2 },
          communication: { diplomatic: 1.0 },
          disc: { I: 0.8, C: 0.4 },
          evidence: { wittySocialPivot: 1.2 }
        }
      }
    ]
  },
  {
    id: "soc_002",
    kind: "singleChoice",
    domain: "bridesmaid",
    prompt: "Kamu diminta menjadi pengiring pengantin (bridesmaid/groomsmen) di pesta pernikahan kenalan dekat, yang memaksamu berdiri sepanjang acara di depan ratusan mata. Bagaimana batinmu bereaksi?",
    instruction: "Pilih gambaran kenyamanan batinmu terhadap sorotan formal.",
    reliability: 0.86,
    targetSystems: ["bigFive", "instinct", "stress"],
    options: [
      {
        id: "a",
        text: "Aku merasa senang dan tersanjung; kesempatan mendampingi sahabat sekaligus bersolek tampil anggun/tampan adalah momen visual yang kutunggu.",
        subtleMeaning: "Penyandingan sorotan formal, kepuasan citra visual murni (extraversion, sx/so, Enneagram 3).",
        weights: {
          mbtiAxis: { E: 0.8 },
          bigFive: { extraversion: 0.9 },
          instinct: { sx: 0.9, so: 0.9 },
          enneagram: { "3": 1.1 },
          evidence: { polishedExteriorEnjoyment: 1.2 }
        }
      },
      {
        id: "b",
        text: "Aku merasa lelah hanya dengan membayangkannya; aku ingin membantu sahabat lewat jalur logistik di balik tirai atau panitia dapur saja.",
        subtleMeaning: "Kenyamanan otonomi di balik panggung tersembunyi (introversion, sp, actsOfService).",
        weights: {
          mbtiAxis: { I: 1.0 },
          bigFive: { extraversion: -0.9 },
          instinct: { sp: 1.2, so: -0.7 },
          loveStyle: { actsOfService: 1.2 },
          evidence: { behindTheScenesPreference: 1.3 }
        }
      },
      {
        id: "c",
        text: "Aku bersedia melakukannya dengan patuh demi menghargai hari bahagianya, walau sepanjang acara batinku terus berhitung mundur kapan pesta formal ini bubar.",
        subtleMeaning: "Kepatuhan altruistik, memikul ketidaknyamanan demi ikatan relasi (agreeableness, Fe, Enneagram 9/2).",
        weights: {
          bigFive: { agreeableness: 1.1, extraversion: -0.3 },
          cognitive: { Fe: 0.8 },
          enneagram: { "9": 1.0, "2": 0.5 },
          evidence: { altruisticSocialDuty: 1.2 }
        }
      }
    ]
  },
  {
    id: "soc_003",
    kind: "singleChoice",
    domain: "public_presentation",
    prompt: "Saat didesak memimpin presentasi ringan mendadak karena ketua kelompokmu mendadak sakit, apa refleks komunikasi pertamamu?",
    instruction: "Pilih tindakan darurat yang paling menggambarkan caramu bertransaksi komunikasi.",
    reliability: 0.89,
    targetSystems: ["communication", "disc", "attitudinalPsyche"],
    options: [
      {
        id: "a",
        text: "Membaca teks outline secara cepat, menyampaikan data kunci, fungsionalitas murni, dan lekas menutup sesi tanya-jawab seefisien mungkin.",
        subtleMeaning: "Akselerasi kebenaran objektif praktis, hemat komunikasi (Te, analytical, DISC C/D).",
        weights: {
          cognitive: { Te: 1.1 },
          communication: { analytical: 1.2, direct: 0.6 },
          disc: { C: 1.0, D: 0.5 },
          evidence: { directFactLedPresentation: 1.2 }
        }
      },
      {
        id: "b",
        text: "Membukanya dengan lelucon pencair suasana, mengandalkan karisma interaktif spontan, dan membuat audiens terhibur walau materinya agak tipis.",
        subtleMeaning: "Penyandingan kemudahan interaksi sosial, ekspresivitas dinamis (extraversion, expressive, DISC I).",
        weights: {
          mbtiAxis: { E: 0.9, P: 0.5 },
          bigFive: { extraversion: 1.1 },
          communication: { expressive: 1.4 },
          disc: { I: 1.3 },
          evidence: { charismaticCharakterPresentation: 1.3 }
        }
      },
      {
        id: "c",
        text: "Menyampaikan pesan secara terstruktur, runut, santun, dan berkali-kali menanyakan kesepahaman anggota agar penjelasan tidak menyinggung kompetensi audiens.",
        subtleMeaning: "Penyampaian diplomatis, penyelarasan psikologis audiens (Fe/Si, diplomatic, DISC S).",
        weights: {
          cognitive: { Fe: 0.7, Si: 0.7 },
          communication: { diplomatic: 1.3 },
          disc: { S: 1.2 },
          evidence: { consensusDiplomaticPresentation: 1.2 }
        }
      }
    ]
  },
  {
    id: "soc_004",
    kind: "singleChoice",
    domain: "standing_out",
    prompt: "Ketika mengenakan pakaian atau potongan rambut baru yang tidak sengaja menarik perhatian banyal orang di ruangan, bagaimana rasa tubuhmu?",
    instruction: "Pilih sensitivitas sensoris emosional yang menyelimutimu.",
    reliability: 0.85,
    targetSystems: ["bigFive", "enneagram", "instinct"],
    options: [
      {
        id: "a",
        text: "Aku merasa risih, terganggu, menundukkan pandangan seolah-olah dipandangi dengan tatapan menghakimi yang negatif.",
        subtleMeaning: "Ketakutan dihakimi kelompok, sensitivitas neurotik tinggi (high neuroticism, social anxiety profile).",
        weights: {
          bigFive: { neuroticism: 1.3, extraversion: -0.6 },
          enneagram: { "6": 1.0, "5": 0.8 },
          instinct: { so: 0.8 },
          evidence: { exposedSocialDiscomfort: 1.3 }
        }
      },
      {
        id: "b",
        text: "Aku merasa percaya diri, seolah berjalan di atas catwalk model; perhatian adalah bumbu yang menyalakan semangat dinamis dalam langkahku.",
        subtleMeaning: "Tingginya kebanggaan diri atas visibilitas sosial (extraversion, Enneagram 3, sx/so).",
        weights: {
          mbtiAxis: { E: 0.9 },
          bigFive: { extraversion: 1.1 },
          enneagram: { "3": 1.3, "7": 0.5 },
          instinct: { sx: 1.0, so: 0.8 },
          evidence: { extrovertedGlamourComfort: 1.3 }
        }
      },
      {
        id: "c",
        text: "Aku tidak terlalu menyadarinya atau menganggap pandangan orang lain hanya refleks lalu lintas mata biasa, tidak mengambil pusing maknanya.",
        subtleMeaning: "Kemandirian tak acuh atas stimulasi luar, stabilitas psikologis (indifferent, low neuroticism).",
        weights: {
          bigFive: { neuroticism: -1.0 },
          enneagram: { "9": 1.1, "5": 0.7 },
          evidence: { socialAuraDetachment: 1.2 }
        }
      }
    ]
  },
  {
    id: "soc_005",
    kind: "singleChoice",
    domain: "acquaintance_initiation",
    prompt: "Bagaimana cara pertamamu bertransaksi kata-kata di tengah lingkaran kenalan baru di suatu kafe atau pesta kecil?",
    instruction: "Pilih taktik komunikasi sosial yang paling orisinal kau lakukan.",
    reliability: 0.87,
    targetSystems: ["communication", "disc", "bigFive"],
    options: [
      {
        id: "a",
        text: "Aku diam mendengarkan terlebih dahulu, memetakan karakter-karakter orang di meja lewat pengamatan mata sebelum melapiskan buah pikiran pas.",
        subtleMeaning: "Penyandingan pengamatan, penyeleksian navigasi sosial (analytical communication, introversion).",
        weights: {
          mbtiAxis: { I: 1.1, E: -1.0 },
          bigFive: { extraversion: -0.9 },
          communication: { analytical: 1.3, expressive: -0.9 },
          disc: { C: 1.1 },
          evidence: { observationalSocialEntry: 1.3 }
        }
      },
      {
        id: "b",
        text: "Aku menyapa duluan dengan jabatan hangat, langsung mencari benang merah obrolan segar, humoris, dan memperkenalkan diriku secara bersahabat.",
        subtleMeaning: "Sosialis melompat lekas mencairkan kepasifan (expressive, extraversion, DISC I).",
        weights: {
          mbtiAxis: { E: 1.2, I: -1.1 },
          bigFive: { extraversion: 1.2 },
          communication: { expressive: 1.3 },
          disc: { I: 1.3 },
          evidence: { proactiveInterpersonalLaunch: 1.3 }
        }
      },
      {
        id: "c",
        text: "Aku hanya berbicara jika disenggol atau ditanya langsung, menjawabnya sehangat mungkin demi menghormati kesopanan, lalu kembali tersenyum ramah mendengarkan.",
        subtleMeaning: "Kebaikan pembawaan pasif yang berempati tinggi (diplomatic, agreeableness, DISC S).",
        weights: {
          mbtiAxis: { I: 0.7 },
          bigFive: { agreeableness: 1.0, extraversion: -0.4 },
          communication: { diplomatic: 1.1 },
          disc: { S: 1.2 },
          evidence: { politeResponsiveSilence: 1.2 }
        }
      }
    ]
  },
  {
    id: "soc_006",
    kind: "singleChoice",
    domain: "conflict_handling",
    prompt: "Ketika ada rapat atau percakapan kelompok yang mendadak memanas karena benturan emosi dua arah, apa refleks fisikmu?",
    instruction: "Pilih skenario refleks tubuhmu merespons letupan amarah sosiabel.",
    reliability: 0.88,
    targetSystems: ["stress", "conflict", "enneagram"],
    options: [
      {
        id: "a",
        text: "Merasakan otot tenggorokan atau perut menegang; ingin lekas mendamaikan ketegangan atau langsung mengalihkan obrolan ke hal menyenangkan lainnya.",
        subtleMeaning: "Refleks fawn untuk meredam kekerasan emosional lingkungan (fawn, Enneagram 9/2).",
        weights: {
          stress: { fawn: 1.3 },
          conflict: { accommodating: 1.0 },
          enneagram: { "9": 1.2, "2": 0.6 },
          evidence: { peaceEnforcementFawn: 1.2 }
        }
      },
      {
        id: "b",
        text: "Sangat berselera taktis; membiarkan mereka adu argumen sembari memetakan argumen mana yang keliru dan merancang simpulan logis untuk menengahi secara jernih.",
        subtleMeaning: "Ketenangan kognitif di tengah ketegangan relasi (analytical, logic-led Ti/Te, Enneagram 5).",
        weights: {
          cognitive: { Ti: 0.9, Te: 0.6 },
          conflict: { collaborative: 1.1 },
          enneagram: { "5": 1.2 },
          stress: { freeze: -0.4 },
          evidence: { composureAmidConflict: 1.2 }
        }
      },
      {
        id: "c",
        text: "Merasakan gairah untuk ikut campur memihak kubu yang benar secara moral atau memarahi sang provokator agar tidak merusak ketertiban umum.",
        subtleMeaning: "Aksi mobilisasi pembetulan, penegakan keadilan aktif (fight, Enneagram 8/1).",
        weights: {
          stress: { fight: 1.2 },
          conflict: { competitive: 0.8 },
          enneagram: { "8": 0.9, "1": 1.1 },
          evidence: { righteousInterposition: 1.2 }
        }
      }
    ]
  },
  {
    id: "soc_007",
    kind: "singleChoice",
    domain: "group_role",
    prompt: "Di dalam kerja kelompok atau kepanitiaan santai, peran mana yang paling natural jatuh kepadamu tanpa perlu kamu paksakan?",
    instruction: "Pilih peran sosial yang paling sering kamu mainkan secara organik.",
    reliability: 0.86,
    targetSystems: ["disc", "work", "enneagram"],
    options: [
      {
        id: "a",
        text: "Penyemangat dinamis, pemecah keheningan, dan perancang keseruan-keseruan agar tim tidak stres mengejar target.",
        subtleMeaning: "Konektor ceria, perawat energi kreatif (expressive, DISC I, Enneagram 7).",
        weights: {
          disc: { I: 1.4 },
          work: { innovator: 1.1 },
          enneagram: { "7": 1.2 },
          bigFive: { extraversion: 0.9 },
          evidence: { communalEnergizerRole: 1.3 }
        }
      },
      {
        id: "b",
        text: "Pengurus detail administratif, perancang lini masa (schedule), dan pengingat tanggal tenggat waktu yang andal.",
        subtleMeaning: "Perencana bersetia tulus, penjamin akurasi target (planner, DISC C, Enneagram 6/1).",
        weights: {
          disc: { C: 1.3 },
          work: { planner: 1.3 },
          enneagram: { "6": 1.0, "1": 0.9 },
          bigFive: { conscientiousness: 1.2 },
          evidence: { logisticalSentinelRole: 1.3 }
        }
      },
      {
        id: "c",
        text: "Pengambil keputusan utama, berani memotong perdebatan panjang yang tidak ada ujungnya, dan menetapkan rute aksi nyata.",
        subtleMeaning: "Pemimpin eksekusi tangguh (executor, DISC D, Enneagram 8/3).",
        weights: {
          disc: { D: 1.4 },
          work: { executor: 1.2 },
          enneagram: { "8": 1.2, "3": 0.9 },
          values: { leadership: 1.1 },
          evidence: { tacticalCommanderRole: 1.3 }
        }
      },
      {
        id: "d",
        text: "Penyangga batin; pendengar keluh kesah anggota yang lelah, merapikan gesekan psikologis, dan mendukung kelompok di balik layar.",
        subtleMeaning: "Penjaga kedamaian batin relasi (caretaker, DISC S, Enneagram 9/2).",
        weights: {
          disc: { S: 1.4 },
          work: { caretaker: 1.3 },
          enneagram: { "9": 1.2, "2": 1.0 },
          bigFive: { agreeableness: 1.1 },
          evidence: { emotionalBackdropRole: 1.3 }
        }
      }
    ]
  },
  {
    id: "soc_008",
    kind: "singleChoice",
    domain: "authority_confrontation",
    prompt: "Ketika seorang pemimpin atau figur otoritas mengeluarkan pendapat yang menurut analisamu salah besar secara konseptual, apa langkah pertama yang kamu ambil?",
    instruction: "Pilih taktik penyelarasan otoritas batinmu.",
    reliability: 0.89,
    targetSystems: ["conflict", "communication", "enneagram", "hexaco"],
    options: [
      {
        id: "a",
        text: "Membeberkan sanggahan logis secara terbuka di forum dengan bahasa yang tajam, lugas, mengandalkan kekuatan argumen murni tak terbantahkan.",
        subtleMeaning: "Kekuatan argumen menegasikan posisi hirarki (competitive, direct, Enneagram 8/5/1).",
        weights: {
          conflict: { competitive: 1.3 },
          communication: { direct: 1.2 },
          enneagram: { "8": 1.0, "1": 0.8, "5": 0.8 },
          hexaco: { honestyHumility: 0.4 },
          evidence: { transparentAuthorityConform: 1.2 }
        }
      },
      {
        id: "b",
        text: "Mendekatinya secara perlahan setelah forum dibubarkan, menyampaikan koreksi konseptual secara empat mata demi menjaga reputasi beliau di depan massa.",
        subtleMeaning: "Diplomasi tinggi merawat martabat otoritas sekaligus memperbaiki kesalahan (collaborative, diplomatic, Enneagram 9/2/3).",
        weights: {
          conflict: { collaborative: 1.3 },
          communication: { diplomatic: 1.3 },
          enneagram: { "9": 1.1, "3": 0.5, "2": 0.5 },
          evidence: { diplomaticBilateralCorrective: 1.3 }
        }
      },
      {
        id: "c",
        text: "Mendiamkannya saja; aku merasa tidak memiliki kewajiban merawat kecerdasan orang lain, apalagi jika itu mendatangkan ancaman kerenggangan posisi amanku.",
        subtleMeaning: "Eksklusivitas batin tak peduli, penyelamatan posisi aman pribadi (avoiding, sp, Enneagram 5/9).",
        weights: {
          conflict: { avoiding: 1.3 },
          instinct: { sp: 1.2 },
          enneagram: { "5": 1.2, "9": 0.5 },
          evidence: { detachedSovereigntyAuth: 1.2 }
        }
      }
    ]
  },
  {
    id: "soc_009",
    kind: "singleChoice",
    domain: "social_drainage",
    prompt: "Jika kamu terperangkap dalam percakapan sangat membosankan dengan seseorang yang baru kamu kenal namun dia sangat cerewet, bagaimana cara khasmu pamit?",
    instruction: "Pilih cara pelepasan interpersonal terseleksimu.",
    reliability: 0.85,
    targetSystems: ["communication", "conflict", "hexaco"],
    options: [
      {
        id: "a",
        text: "Mengarang alasan darurat (misal ada panggilan masuk palsu, kepunahan baterai, atau tugas mendadak) agar bisa berlari pergi dengan sopan.",
        subtleMeaning: "Taktik membelokkan realitas demi menghindari canggung (diplomatic, low honesty-humility in soft white lie scenarios, High adaptability).",
        weights: {
          communication: { diplomatic: 1.1, expressive: 0.5 },
          conflict: { avoiding: 1.1 },
          hexaco: { honestyHumility: -0.6 },
          evidence: { softWhiteLieEscape: 1.2 }
        }
      },
      {
        id: "b",
        text: "Menyela omongannya dengan santun, menyatakan secara tegas bahwa aku harus pamit melanjutkan urusan lain tanpa perlu mengarang alasan palsu.",
        subtleMeaning: "Ketajaman asertif memegang kendali otonom waktu hidup (direct, Enneagram 8/1, high honesty).",
        weights: {
          communication: { direct: 1.2 },
          conflict: { compromising: 0.8 },
          hexaco: { honestyHumility: 1.2 },
          enneagram: { "8": 0.9, "1": 0.8 },
          evidence: { transparentAssertiveExit: 1.3 }
        }
      },
      {
        id: "c",
        text: "Terus mengangguk sembari sesekali tersenyum pasif sampai mereka lelah sendiri mengobrol, tak tega memotong ucapan satu arahnya.",
        subtleMeaning: "Mengorbankan kenyamanan diri demi kelancaran ekspresi orang lain (accommodating, fawn, Enneagram 9/2).",
        weights: {
          conflict: { accommodating: 1.3 },
          stress: { fawn: 1.1 },
          enneagram: { "9": 1.1, "2": 0.7 },
          evidence: { submissiveListenerDuration: 1.2 }
        }
      }
    ]
  },
  {
    id: "soc_010",
    kind: "singleChoice",
    domain: "public_praise_giving",
    prompt: "Bagaimana cara batinmu memilih cara memuji kawan akrabmu yang menuntaskan pencapaian membanggakan?",
    instruction: "Pilih bahasa apresiasi orisinalmu.",
    reliability: 0.87,
    targetSystems: ["loveStyle", "communication", "values"],
    options: [
      {
        id: "a",
        text: "Melisankan ucapan penuh penghargaan detail di grup obrolan atau di depan khalayak, menyanjung dedikasi kerja kerasnya setinggi langit.",
        subtleMeaning: "Bahasa apresiasi verbal formal ekspresif (wordsOfAffirmation, expressive).",
        weights: {
          loveStyle: { wordsOfAffirmation: 1.3 },
          communication: { expressive: 1.2 },
          values: { recognition: 0.9 },
          evidence: { declarativeVerbalPraise: 1.2 }
        }
      },
      {
        id: "b",
        text: "Mentraktir mereka makan besar berdua saja secara spesial, meluangkan waktu sunyi merayakan ketekunan langkah perjuangan berdua tanpa bising sosial.",
        subtleMeaning: "Bahasa apresiasi waktu berkualitas intim (qualityTime, sx).",
        weights: {
          loveStyle: { qualityTime: 1.4 },
          instinct: { sx: 1.1 },
          communication: { diplomatic: 0.5 },
          evidence: { intimateBilateralCelebration: 1.2 }
        }
      },
      {
        id: "c",
        text: "Mengirimkan hadiah fungsional yang bisa mempermudah langkah kerja barunya, atau melingkarkan bantuan langsung merapikan sisa urusannya.",
        subtleMeaning: "Bahasa apresiasi pemudahan fungsional perbuatan (actsOfService, receivingGifts).",
        weights: {
          loveStyle: { actsOfService: 1.3, receivingGifts: 0.8 },
          evidence: { supportiveUtilityToken: 1.2 }
        }
      }
    ]
  }
];
