/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TypologyDetail {
  title: string;
  badge: string;
  shortDesc: string;
  detailedDesc: string;
  strength: string;
  vulnerability: string;
  advice: string;
}

export const MORAL_DESCRIPTIONS: Record<string, TypologyDetail> = {
  "Moralis Idealis (Menjunjung Keaslian Integritas)": {
    title: "Moralis Idealis",
    badge: "Keaslian & Integritas",
    shortDesc: "Prinsip moral di mana kebenaran batin dan kejujuran nurani diletakkan di atas kegunaan praktis.",
    detailedDesc: "Anda menavigasi kehidupan dengan kompas moral yang kaku namun tulus. Bagi Anda, integritas batin tidak bisa ditawar atau dibeli dengan kepraktisan sementara. Anda menuntut keselarasan mutlak antara apa yang Anda yakini dengan apa yang Anda lakukan secara riil.",
    strength: "Kejujuran ekstrem, loyalitas prinsip, dan kemampuan memimpin dengan teladan integritas sejati.",
    vulnerability: "Rawan kecewa berat pada inkonsistensi duniawi serta rentan bersikap menghakimi orang lain.",
    advice: "Sadari bahwa manusia memiliki prosesnya masing-masing. Berikan ruang toleransi tanpa harus melunturkan prinsip pribadi Anda."
  },
  "Moralis Altruis (Menjunjung Kemanusiaan & Kepedulian)": {
    title: "Moralis Altruis",
    badge: "Kemanusiaan & Empati",
    shortDesc: "Prinsip moral yang mengutamakan pengurangan penderitaan sesama dan penyembuhan relasi.",
    detailedDesc: "Kompas hidup Anda digerakkan oleh satu pertanyaan dasar: 'Bagaimana tindakan ini membantu meringankan beban orang lain?' Anda memiliki kepekaan tinggi terhadap kepedihan sosial dan selalu siap mengorbankan sebagian otonomi demi kesembuhan jiwa sesama.",
    strength: "Kehangatan tiada tara, kepedulian tulus, dan magnet penyejuk kedamaian dalam komunitas.",
    vulnerability: "Rentan mengalami kelelahan empati (compassion fatigue) dan melupakan batas perlindungan diri sendiri.",
    advice: "Ingatlah bahwa Anda tidak bisa menolong orang lain jika cangkir energi dalam diri Anda sendiri kosong kering."
  },
  "Moralis Pragmatis (Menjunjung Kemaslahatan Praktis)": {
    title: "Moralis Pragmatis",
    badge: "Kemaslahatan & Hasil Nyata",
    shortDesc: "Prinsip moral berbasis kegunaan nyata dan efek praktis dari suatu tindakan.",
    detailedDesc: "Anda memandang moralitas bukan sebagai hukum abstrak yang mengawang-awang, melainkan sebagai alat kerja yang fungsional. Kebenaran dinilai dari seberapa besar manfaat nyata yang dihasilkan dari suatu keputusan bagi kelangsungan hidup kelompok.",
    strength: "Fleksibilitas solusi, orientasi pemecahan masalah yang cepat, dan ketahanan dalam situasi darurat.",
    vulnerability: "Rentan dicap oportunis atau dingin karena bersedia mengorbankan standar etika kaku demi hasil akhir.",
    advice: "Selaraskan kepraktisan Anda dengan nilai filosofis jangka panjang agar tidak kehilangan arah tujuan utama."
  },
  "Moralis Normatif (Menjunjung Aturan & Kepatuhan)": {
    title: "Moralis Normatif",
    badge: "Ketertiban & Adab",
    shortDesc: "Prinsip moral yang menyandarkan keselamatan peradaban pada kepatuhan aturan bersama.",
    detailedDesc: "Bagi Anda, aturan, sopan santun, dan struktur hukum adalah pilar utama pelindung masyarakat dari keruntuhan adab. Kepatuhan operasional pada kontrak sosial yang ada adalah simbol keluhuran batin yang mutlak dipenuhi.",
    strength: "Kedisiplinan tinggi, keandalan komitmen kelompok, dan pelindung ketertiban publik.",
    vulnerability: "Kaku dalam menghadapi transisi perubahan baru dan kesulitan bertoleransi pada pelanggaran kecil.",
    advice: "Aturan dibuat untuk keselamatan manusia, bukan sebaliknya. Berikan ruang kelenturan kontekstual dalam memandang hukum."
  },
  "Moralis Otonom (Menjunjung Kedaulitan Diri & Kebebasan)": {
    title: "Moralis Otonom",
    badge: "Kedaulatan & Kebebasan",
    shortDesc: "Prinsip moral yang menekankan kebebasan individu dan otonomi hakiki setiap jiwa.",
    detailedDesc: "Anda meyakini bahwa kedaulatan diri adalah hak tertinggi manusia. Tidak ada institusi, aturan, atau paksaan luar yang berhak menjajah hak pilih sadar seseorang selama tidak merugikan otonomi makhluk hidup lainnya secara sepihak.",
    strength: "Kemandirian berpikir revolusioner, keberanian mendobrak tyranni, dan penghormatan batas privasi tinggi.",
    vulnerability: "Kesulitan beradaptasi dalam organisasi kaku dan rentan dicap individualis egois.",
    advice: "Bangun jembatan kolaboratif sukarela dengan sesama agar kemandirian Anda tidak menjelma menjadi isolasi sepi."
  }
};

export const DECISION_DESCRIPTIONS: Record<string, TypologyDetail> = {
  "Risk-Aware (Prinsip Mitigasi Resiko Tinggi)": {
    title: "Risk-Aware Style",
    badge: "Mitigasi Resiko",
    shortDesc: "Gaya pengambilan keputusan yang mementingkan keselamatan jangka panjang melalui kalkulasi mitigasi resiko.",
    detailedDesc: "Anda adalah navigator yang sabar. Sebelum melangkah, Anda menyisir setiap lubang jebakan, menghitung skenario terburuk, dan merancang sekoci penyelamat. Anda menolak spekulasi buta demi kepastian operasional.",
    strength: "Keamanan sistematis terjamin, meminimalkan kerugian finansial/emosional secara berkala.",
    vulnerability: "Rentan kehilangan momentum peluang emas karena terlalu lama menganalisis bahaya khayalan.",
    advice: "Terkadang, ketidakpastian adalah gerbang keberuntungan. Beranikan diri melompat dalam kepalsuan resiko terukur."
  },
  "Fast-Action (Orientasi Kecepatan Eksekusi Spontan)": {
    title: "Fast-Action Style",
    badge: "Kecepatan Eksekusi",
    shortDesc: "Gaya pengambilan keputusan kilat berdasarkan refleks intuitif dan pembacaan peluang dinamis.",
    detailedDesc: "Kecepatan adalah taring Anda. Anda meyakini bahwa keputusan lambat adalah keputusan mati. Anda mendeteksi celah peluang secara instan dan mengandalkan ketangkasan adaptasi lapangan untuk membereskan sisa kendala nanti.",
    strength: "Daya tangkap momentum luar biasa, pelopor eksekusi awal, dan ketangkasan adaptasi tinggi.",
    vulnerability: "Rentan melakukan kecerobohan taktis akibat abai terhadap detail kecil yang krusial.",
    advice: "Luangkan waktu 5 menit untuk bernapas dan memverifikasi data vital sebelum meluncurkan keputusan besar."
  },
  "Analytical (Mendasarkan Data & Validitas Logis)": {
    title: "Analytical Style",
    badge: "Data & Validitas",
    shortDesc: "Gaya pengambilan keputusan berbasis riset mendalam, kebenaran fakta, dan struktur argumen logis.",
    detailedDesc: "Anda adalah pengumpul informasi yang teliti. Putusan Anda tidak boleh digerakkan oleh gosip sosial atau rayuan emosional sementara, melainkan harus lolos audit validitas data dan struktur logika yang tidak terbantahkan.",
    strength: "Akurasi analitis yang tajam, minim bias sentimen emosional, dan kredibilitas kesimpulan tinggi.",
    vulnerability: "Terjebak dalam kelumpuhan analisis (analysis paralysis) yang mematikan gerak aksi.",
    advice: "Ingatlah bahwa 'cukup data' sudah memadai. Tidak ada data yang 100% sempurna di dunia fana ini."
  },
  "Value-Based (Penyelarasan Nilai Batin & Autentisitas)": {
    title: "Value-Based Style",
    badge: "Otentisitas & Rasa",
    shortDesc: "Gaya pengambilan keputusan yang disaring lewat resonansi nilai batin batiniah dan harmoni nurani.",
    detailedDesc: "Bagi Anda, keputusan terbaik adalah keputusan yang membuat Anda bisa tidur nyenyak di malam hari tanpa merusak kesucian batin. Anda menyaring segala opsi lewat getaran rasa autentik: 'Apakah ini benar-benar mencerminkan rasi diriku?'",
    strength: "Keselarasan hidup tinggi (autentik), keteguhan batin jangka panjang, dan keluhuran jiwa murni.",
    vulnerability: "Kesulitan mendedah argumen kuantitatif objektif kepada orang-orang rasional luar.",
    advice: "Sediakan data penunjang agar nilai batin mulia Anda dapat dimengerti dan diterima oleh lingkaran rasional."
  },
  "Consensus (Mengejar Mufakat Relasional Kelompok)": {
    title: "Consensus Style",
    badge: "Mufakat Sosial",
    shortDesc: "Gaya pengambilan keputusan yang menitikberatkan pada penyelarasan kesepakatan semua anggota hubungan.",
    detailedDesc: "Anda percaya bahwa persatuan hubungan adalah segalanya. Anda bersedia meluncurkan dialog diplomasi, mendengarkan keluhan terkecil, dan memandu penyelarasan mufakat agar tidak ada satu jiwa pun yang terluka oleh putusan sepihak.",
    strength: "Solidaritas hubungan sangat kokoh, keterlibatan kelompok maksimal, dan minim resistensi eksternal.",
    vulnerability: "Proses koordinasi yang bertele-tele dan rawan melahirkan putusan kompromistis yang tawar.",
    advice: "Dalam badai krisis, kepemimpinan asertif satu arah terkadang diperlukan untuk menyelamatkan kapal bersama."
  }
};

export const CONFLICT_DESCRIPTIONS: Record<string, TypologyDetail> = {
  "Competitive (Mengarahkan Dominansi & Argumentasi)": {
    title: "Competitive Style",
    badge: "Dominansi & Ketegasan",
    shortDesc: "Respon konflik asertif yang mengejar penegakan kebenaran argumentasi dan kepemimpinan solusi.",
    detailedDesc: "Bagi Anda, konflik bukanlah malapetaka sosial yang harus dihindari, melainkan arena pertarungan ide untuk menemukan navigasi terbaik. Anda berdebat dengan antusiasme tinggi, menyodorkan argumentasi, dan mengarahkan konfrontasi secara asertif.",
    strength: "Kejelasan posisi, perlindungan batas otonom yang kuat, dan kemampuan membersihkan hambatan sengketa.",
    vulnerability: "Rawan mencederai kepekaan emosional lawan bicara dan memicu resistensi dendam sosial.",
    advice: "Turunkan intonasi suara dan hargai ruang ego lawan bicara agar pertarungan ide Anda melahirkan mufakat sejati."
  },
  "Collaborative (Dialog Asertif & Solusi Menang-Menang)": {
    title: "Collaborative Style",
    badge: "Solusi Menang-Menang",
    shortDesc: "Respon konflik yang berpartner dengan lawan untuk membongkar akar masalah demi mufakat terdalam.",
    detailedDesc: "Anda memandang konflik sebagai kran pembuka komunikasi yang macet. Alih-alih bertarung menang-kalah atau melarikan diri, Anda mengajak semua pihak duduk satu meja, mengurai duka, dan merakit arsitektur solusi integratif baru.",
    strength: "Ikatan hubungan pasca-konflik semakin berkilau matang, memecahkan akar penyumbat fungsional.",
    vulnerability: "Memakan pasokan energi batin dan waktu yang sangat besar; tidak efektif untuk urusan sepele.",
    advice: "Pilihlah medan perang Anda. Hal-hal remeh terkadang cukup dilewati dengan senyuman kelenturan."
  },
  "Compromising (Kelenturan Diplomasi Saling Mengalah)": {
    title: "Compromising Style",
    badge: "Saling Mengalah",
    shortDesc: "Respon konflik diplomasi pragmatis di mana kedua belah pihak rela memotong ego masing-masing demi mufakat.",
    detailedDesc: "Anda adalah penengah yang gesit. Anda menolak drama berkepanjangan dan memilih jalan tengah taktis: 'Mari kita sama-sama memotong tuntutan agar masalah ini lekas beres dan kita bisa maju melanjutkan hidup.'",
    strength: "Kecepatan penuntasan sengketa relasional yang fungsional dan meredakan tensi secara mendesak.",
    vulnerability: "Kedua pihak berisiko menyimpan duka terpendam karena tidak ada penyelesaian akar masalah secara mendasar.",
    advice: "Jangan gunakan kompromi kilat untuk menutupi konflik hubungan utama yang memerlukan operasi bedah mendalam."
  },
  "Avoiding (Penghindaran Demi Keselamatan Energi Batin)": {
    title: "Avoiding Style",
    badge: "Penyelamatan Energi",
    shortDesc: "Respon konflik yang memarkir konfrontasi, menjauh sementara demi menyelamatkan sterilitas batin privat.",
    detailedDesc: "Anda sadar betul akan batasan kuota energi emosional Anda. Ketika badai permusuhan sosial bergolak tanpa panduan nalar yang jernih, Anda memilih mundur teratur, mematikan notifikasi, atau mengunci diri dalam kesepian sunyi.",
    strength: "Sterilitas batin privat terjaga dari polusi emosi luar, menolak terseret dalam pertengkaran konyol.",
    vulnerability: "Masalah terbengkalai membesar diam-diam di bawah tanah, dituding dingin atau tidak bertanggung jawab.",
    advice: "Sampaikan penolakan Anda secara tertulis/lisan yang singkat agar lawan tahu Anda sedang memulihkan diri, bukan kabur."
  },
  "Accommodating (Mengalah Merawat Harmoni Sosial)": {
    title: "Accommodating Style",
    badge: "Perawat Harmoni",
    shortDesc: "Respon konflik yang merelakan posisi personal batin demi keselamatan kenyamanan pihak lawan.",
    detailedDesc: "Bagi Anda, keutuhan jalinan emosi dengan sesama berharga jauh di atas kepuasan memenangkan argumen. Anda bersedia berkata 'Maaf, mari ikuti caramu' demi meredakan gemuruh kesedihan lawan dan menstabilkan harmoni relasi.",
    strength: "Kemampuan hebat meredakan amarah badai ekstrem, disukai kelompok karena kelenturan asuhan sosial.",
    vulnerability: "Ego personal terjajah secara berkala, rawan melahirkan dendam tumpukan bawah sadar (resentment).",
    advice: "Mulailah menyuarakan batasan toleransi Anda. Maaf yang tulus tidak boleh dibeli dengan penindasan kedaulatan diri."
  }
};

export const COMMUNICATION_DESCRIPTIONS: Record<string, TypologyDetail> = {
  "Direct (Bicara Jujur, Lugas, Tanpa Tedeng Aling-Aling)": {
    title: "Direct Communication",
    badge: "Lugas & Jujur",
    shortDesc: "Menyampaikan maksud batin secara presisi rujukan langsung tanpa basa-basi manipulatif.",
    detailedDesc: "Bagi Anda, kejujuran adalah mata uang komunikasi paling suci. Anda benci membuang energi batin penerima untuk menebak-nebak kode rahasia. Pesan ditekankan secara jujur, efektif, dan menuntut aksi penyelesaian.",
    strength: "Sangat fungsional, memutus distorsi kabar burung, dan memperjelas instruksi kerja secara cepat.",
    vulnerability: "Rawan ditakuti atau dicap kejam dan kering sentuhan rasa empati oleh tipe emosional sensitif.",
    advice: "Bungkus kejujuran Anda dengan kalimat pembuka yang apresiatif untuk meredakan benturan emosi penerima."
  },
  "Diplomatic (Sopan, Santun, Menghargai Ruang Emosional)": {
    title: "Diplomatic Communication",
    badge: "Sopan & Berempati",
    shortDesc: "Komunikasi santun yang melunakkan benturan pesan demi menjaga harga diri relasi sosial.",
    detailedDesc: "Anda adalah pesulap kata yang tenang. Anda mengerti bahwa cara menyampaikan pesan sama pentingnya dengan isi pesan itu sendiri. Anda menyisipkan sapaan akrab, merawat tata krama, dan menyaring bahasa agar empati memancar hangat.",
    strength: "Membangun kedekatan emosional mendalam, disukai komunal, dan merawat kelestarian damai hubungan.",
    vulnerability: "Maksud instruksi aslimu rentan kabur tertimbun hiasan basa-basi sopan santun yang tebal.",
    advice: "Setelah memperhangat suasana, pastikan ada satu kalimat tegas yang menegaskan aksi nyata yang diharapkan."
  },
  "Expressive (Hangat, Antusias, Penuh Lelucon & Aura)": {
    title: "Expressive Communication",
    badge: "Antusias & Hangat",
    shortDesc: "Komunikasi ekspresif dinamis bernada warna yang menularkan gairah energi batin kepada penerima.",
    detailedDesc: "Obrolan bersama Anda laksana api unggun yang menyala hangat. Anda berbicara dengan binar mata, variasi intonasi, analogi cerita imajinatif, dan lelucon spontan demi menghibur serta menyatukan sirkulasi energi audiens.",
    strength: "Daya pengaruh karismatik tinggi, motivator alami, dan pencair ketegangan suasana luar biasa.",
    vulnerability: "Sering mendominasi panggung obrolan dan meluputkan jeda mendengarkan reflektif lawan.",
    advice: "Cobalah berlatih memberikan hening sejenak agar lawan bicara Anda memiliki kesempatan mendedahkan jiwanya."
  },
  "Analytical (Tenang, Rinci, Berbasis Struktur Argumen)": {
    title: "Analytical Communication",
    badge: "Tenang & Terstruktur",
    shortDesc: "Komunikasi hening berbasis pembuktian rasional, bagan urutan, dan presisi akurasi verbal.",
    detailedDesc: "Anda menolak lompatan klaim yang tidak berakar data kuat. Komunikasi Anda tenang, bernada sedang, tersusun secara linier sebab-akibat, dan menuntut verifikasi detail faktual agar steril dari dramatisasi opini sentimen.",
    strength: "Keandalan tinggi, sanggup menjelaskan konsep kerumitan sistematis dengan struktur jernih.",
    vulnerability: "Terdengar kaku laksana membaca manual mesin, rawan membosankan dalam interaksi kasual santai.",
    advice: "Selipkan analogi manusiawi sederhana atau visual metaforis agar penjelasan rumit Anda lekas dicerna publik."
  }
};

export const RELATIONSHIP_DESCRIPTIONS: Record<string, TypologyDetail> = {
  "Secure Leaning (Kemandirian Matang Berpadu Keaslian)": {
    title: "Secure Leaning Attachment",
    badge: "Kemandirian & Keaslian",
    shortDesc: "Gaya hubungan dewasa sehat yang menyeimbangkan kemandirian otonom dengan kedekatan intim emosional.",
    detailedDesc: "Anda adalah ruang perlindungan yang kokoh. Anda nyaman mencurahkan cinta, mempercayai komitmen pasangan, namun tetap memelihara batas kedaulatan otonom pribadi Anda tanpa ketakutan paranoia kehilangan eksistensi duka.",
    strength: "Ketahanan relasional tinggi, komunikasi asertif lancar, dan minim drama manipulasi psikologis.",
    vulnerability: "Terkadang terlalu mandiri sehingga pasangan merasa kurang dibutuhkan keberadaannya secara mendesak.",
    advice: "Mendedahkan kerentanan batin kecil adalah bentuk pembuktian kepercayaan tinggi Anda pada pasangan."
  },
  "Anxious Leaning (Kehangatan Rawan Tersulut Kecemasan)": {
    title: "Anxious Leaning Attachment",
    badge: "Kehangatan & Validitas",
    shortDesc: "Gaya hubungan hangat penuh afeksi namun rawan didera kecemasan kecurigaan akan penolakan.",
    detailedDesc: "Cinta bagi Anda adalah samudra kedalaman emosi. Anda mendambakan penyatuan batin batiniah yang intim, namun radar batin Anda begitu sensitif mendeteksi perubahan nada bicara pasangan sebagai sinyal ancaman penolakan atau kehilangan kasih.",
    strength: "Empati luar biasa peka, perawat kehangatan yang ekspresif, dan kesediaan berkorban tinggi.",
    vulnerability: "Membebani pasangan dengan tuntutan penenteraman verbal (reassurance) yang tiada henti.",
    advice: "Belajarlah menenangkan sistem saraf mandiri Anda. Ketidakhadiran fisik pasangan bukan berarti hilangnya cinta mereka."
  },
  "Avoidant Leaning (Kemandirian Baja Tirai Privat)": {
    title: "Avoidant Leaning Attachment",
    badge: "Kemandirian & Proteksi",
    shortDesc: "Gaya hubungan mandiri teguh yang menjaga tirai batas privasi batin dari ancaman kedekatan yang menjajah.",
    detailedDesc: "Bagi Anda, kemandirian adalah perisai keselamatan dari luka penolakan masa lalu. Ketika hubungan mulai menyentuh duka terdalam atau menuntut pendedahan batin yang rentan, Anda terdorong mundur membangun benteng tirai privat pembatasan.",
    strength: "Kemandirian baja dalam krisis, fungsionalitas hidup maksimal, dan pelindung andal dari drama sosial.",
    vulnerability: "Membuat pasangan merasa hancur kesepian tertolak di luar gerbang benteng tirai hati Anda.",
    advice: "Mulailah membuka gerbang jendela kecil. Izinkan pasangan Anda melangkah masuk melihat kerapuhan Anda secara bersahaja."
  },
  "Fearful Leaning (Kerinduan Kedalaman yang Rawan Terluka)": {
    title: "Fearful Leaning Attachment",
    badge: "Kerinduan & Ketakutan",
    shortDesc: "Gaya hubungan ambivalen: merindukan keintiman sejati namun ketakutan parah akan disalahgunakan.",
    detailedDesc: "Jiwa Anda terjebak dalam badai duka internal: 'Dekati aku karena aku kesepian, tapi menjauhlah jika terlalu dekat karena kamu pasti menyakitiku.' Tarik-ulur komunikasi emosional ini melelahkan saraf batin Anda sendiri dan juga kekasih.",
    strength: "Kedalaman emosional kosmik sublim, pemahaman kompleksitas penderitaan, dan kesetiaan rahasia.",
    vulnerability: "Siklus merusak diri (self-sabotage) yang membubarkan jalinan cinta sesaat sebelum kebahagiaan tiba.",
    advice: "Sembuhkan luka kepedihan masa lalu bersama bantuan profesional psikolog, atau pelan-pelan bangun rasa aman bersama kekasih."
  }
};

export const STRESS_DESCRIPTIONS: Record<string, TypologyDetail> = {
  "Hypervigilant (Kewaspadaan Tinggi & Hiper-Analisis)": {
    title: "Hypervigilant Stress",
    badge: "Hiper-Analisis & Cemas",
    shortDesc: "Respon stres berupa mobilisasi radar kewaspadaan tinggi, hiper-analisis bahaya, dan obsesi kendali.",
    detailedDesc: "Saat stres melanda, otak Anda menyalakan lampu sirine darurat merah. Anda mengulang skenario buruk di pikiran batin ratusan kali, mengaudit kesalahan berulang, mencari jaminan sekuritas di luar batas, dan kesulitan memejamkan mata malam hari.",
    strength: "Kesiapsiagaan mengantisipasi bencana terburuk dengan persiapan mitigasi operasional darurat.",
    vulnerability: "Menguras energi vital saraf, memicu psikosomatis tubuh, dan menciptakan ketegangan toksik.",
    advice: "Hentikan hiro-analisis Anda sejenak. Mandilah dengan air hangat, hirup napas dalam-dalam, pasrahkan apa yang tak bisa Anda kendalikan."
  },
  "Freeze (Kebekuan Respon & Penutupan Komunikasi)": {
    title: "Freeze Stress",
    badge: "Kebekuan & Penutupan",
    shortDesc: "Respon stres berupa kelumpuhan operasional sementara, kebisuan emosional, dan isolasi pertahanan diri.",
    detailedDesc: "Anda laksana laptop yang kehabisan memori RAM saat didera tekanan bertubi-tubi. Batin Anda lumpuh memicu kebisuan (shut down). Anda menderita dalam kesepian sunyi, mengabaikan percakapan sosial, dan memarkir duka dengan tidur panjang.",
    strength: "Menyelamatkan sirkulasi energi vital agar tidak bocor rusak lebih jauh oleh serangan luar berantakan.",
    vulnerability: "Menunda aksi nyata penyembuhan masalah kronis, membuat orang tersayang merasa bingung dicampakkan.",
    advice: "Lakukan satu tindakan kecil yang nyata: bereskan tempat tidur Anda atau berjalan kaki 100 meter luar ruangan untuk mencairkan tubuh batin."
  },
  "Flight (Pelarian Spontan Mencari Ruang Kebahagiaan Lain)": {
    title: "Flight Stress",
    badge: "Pelarian & Distraksi",
    shortDesc: "Respon stres berupa dorongan pelarian spontan mencari distraksi kenyamanan pemicu dopamin luar.",
    detailedDesc: "Tekanan masalah membuat Anda sesak napas. Respons instan Anda adalah melayangkan pelarian: berbelanja impulsif, makan cokelat berlebihan, bepergian jauh mendadak tanpa rencana, atau tenggelam dalam petualangan dunia gim semalam suntuk.",
    strength: "Mencegah stres melahirkan keputusasaan fatal (depression) dengan rajutan harapan stimulasi segar.",
    vulnerability: "Hambatan masalah asli tetap utuh membayangi di belakang saat pelarian dopamin Anda meredup.",
    advice: "Gunakan liburan pelarian Anda murni sebagai ruang pemulihan paru-paru batin, bukan sebagai tempat tinggal permanen kabur."
  },
  "Fight (Mobilisasi Amarah Melawan Ancaman Dominasi)": {
    title: "Fight Stress",
    badge: "Mobilisasi & Amarah",
    shortDesc: "Respon stres berupa pengerahan energi agresi amarah asertif untuk menghancurkan musuh kendala.",
    detailedDesc: "Stres melahirkan amarah ksatria dalam diri Anda. Anda tidak akan mengalah diam atau meringkuk menangis. Batin Anda memobilisasi amarah untuk menegakkan batasan kedaulatan kaku, menghancurkan hambatan lewat konfrontasi frontal.",
    strength: "Daya juang meledak tinggi, keberanian membersihkan manipulasi lawan, dan pelindung otonomi kokoh.",
    vulnerability: "Kerusakan kolateral hubungan parah akibat lontaran kata atau tindakan pembalasan kemarahan yang kasar.",
    advice: "Salurkan energi agresi amarah badai Anda ke latihan fisik kardio berat sebelum merespon pesan darurat relasional."
  },
  "Fawn (Penaklukan Ego untuk Merawat Penerimaan Sosial)": {
    title: "Fawn Stress",
    badge: "Penaklukan Ego & Harmoni",
    shortDesc: "Respon stres berupa pemusnahan posisi ego, setuju merawat harmoni agar disukai demi benteng rasa aman.",
    detailedDesc: "Stres memicu ketakutan purba Anda akan ditinggalkan kelompok. Anda bertransformasi menjadi penurut yang sangat manis: merawat kebutuhan lawan konflik, bersedia menanggung beban kesalahan demi mempertahankan benteng penerimaan tulus mereka.",
    strength: "Pencegah perselisihan fisik nomor satu, menciptakan kedamaian sekejap mata dalam situasi bahaya batin.",
    vulnerability: "Pemusnahan otentisitas batiniah diri yang memicu kebencian mendalam pada kelemahan diri sendiri.",
    advice: "Berlatihlah berkata 'Tidak' pada hal kecil. Penyelarasan sejati tidak menuntut pengorbanan otonomi Anda."
  }
};

export const DEFENSE_DESCRIPTIONS: Record<string, TypologyDetail> = {
  "Rationalization (Menutupi Luka dengan Logika Rasional)": {
    title: "Rationalization Defense",
    badge: "Rasionalisasi",
    shortDesc: "Melindungi ego dari pedih duka dengan membungkus luka lewat narasi penjelasan akademis rasional.",
    detailedDesc: "Saat hati Anda hancur atau terluka oleh penolakan, sistem pertahanan kognitif Anda lekas menulis makalah penjelasan teoritis panjang. Anda membungkus rasa berduka murni dengan argumen sebab-akibat sosiologis atau medis logis.",
    strength: "Ketahanan kendali emosi yang tenang teratur dalam badai kegilaan duniawi.",
    vulnerability: "Penolakan mencicipi esensi rasa duka yang sesungguhnya membuat emosimu mati beku mengeras.",
    advice: "Luka emosional disembuhkan dengan sirkulasi air mata tulus dan pelukan hangat, bukan dengan makalah logika kaku."
  },
  "Projection (Melempar Ancaman Ego ke Kesalahan Orang Lain)": {
    title: "Projection Defense",
    badge: "Proyeksi Ego",
    shortDesc: "Menolak mengakui kelemahan terlarang batin dengan mendedah kelemahan itu pada sifat orang lain.",
    detailedDesc: "Saat Anda merasa tidak aman (insecure) atau bersalah, radar pertahanan ego Anda secara tidak sadar melempar bayang-bayang kegelapan Anda sendiri kepada orang sekeliling: menuduh pasangan egois atau rekan kerja licik.",
    strength: "Melindungi keutuhan harga diri dari keputusasaan bersalah parah secara kilat darurat.",
    vulnerability: "Merusak jalinan kepercayaan hubungan sosial dengan tuduhan fiktif imajinasi ego Anda sendiri.",
    advice: "Akui ketakutan dan noda batin Anda dalam jurnal privat rahasia. Memiliki sisi gelap adalah hal manusiawi seutuhnya."
  },
  "Repression (Memarkir Duka dalam Gudang Rahasia Sanubari)": {
    title: "Repression Defense",
    badge: "Represi Batin",
    shortDesc: "Memetieskan kenangan pedih duka dan trauma batin ke dalam gudang rahasia bawah sadar terdalam.",
    detailedDesc: "Anda memiliki tombol penghapus duka instan. Ketika tragedi melatarbelakangi perjalanan hidup Anda, Anda memilih memetieskannya rapat-rapat dalam gudang sepi batiniah, tersenyum cerah luar ruangan laksana tidak ada bencana melanda.",
    strength: "Sanggup terus fungsional memimpin kinerja operasional hidup tanpa terganggu sisa puing patah hati.",
    vulnerability: "Tumpukan duka yang membeku rentan meluap berantakan berupa psikosomatis tubuh atau kecemasan tanpa sebab.",
    advice: "Izinkan sesekali tirai gudang sepi batin dibuka perlahan. Sembuhkan duka masa lalu dengan bimbingan rohani yang teduh."
  },
  "Sublimation (Mengalihkan Amarah Menjadi Karya Berguna)": {
    title: "Sublimation Defense",
    badge: "Sublimasi Positif",
    shortDesc: "Membelokkan energi destruktif duka atau amarah menjadi karya seni, prestasi, atau aktivitas berguna.",
    detailedDesc: "Anda adalah alkemis batin terbaik. Alih-alih merusak diri saat terluka atau murka, Anda menyalurkan energi gejolak tersebut menjadi lukisan puitis indah, melahirkan kesucian tulisan buku, atau memacu intensitas kerja olahraga keras.",
    strength: "Mata bor kreativitas luar biasa matang dan produktivitas fungsional tingkat tinggi dari luka kehidupan.",
    vulnerability: "Rawan mengesampingkan resolusi penyembuhan masalah relasi nyata karena terlalu asyik berkarya sublim.",
    advice: "Gunakan hasil keindahan karya sublim Anda sekaligus untuk meluluhkan kebekuan interaksi asertif dengan lawan duka."
  },
  "Denial (Penolakan Realitas Pahit untuk Melindungi Jiwa)": {
    title: "Denial Defense",
    badge: "Penolakan Realitas",
    shortDesc: "Menyensor kehadiran fakta terpahit kehidupan seakan-akan kejian itu tidak pernah terjadi.",
    detailedDesc: "Ketika kenyataan menubruk hidup Anda dengan kepahitan yang meletihkan jiwa (misal duka kematian kekasih atau pengkhianatan), sistem proteksi darurat Anda melakukan sensor mutlak: 'Ini tidak nyata, esok pagi ia akan kembali mengetuk pintu.'",
    strength: "Mencegah goncangan saraf mental terbelah dari tragedi mengejutkan awal yang melumpuhkan jiwa.",
    vulnerability: "Terputusnya jembatan koneksi rujukan dengan realitas fungsional yang membuat Anda terjebak delusi sepi.",
    advice: "Hadapi realitas pahit setapak demi setapak secara perlahan bersama teman terpercaya yang setulus hati menjaga Anda."
  }
};
