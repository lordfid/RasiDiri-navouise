/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Compass, Award, Heart, ShieldAlert, Sparkles, SlidersHorizontal, 
  Undo2, Bug, BookOpen, Smile, ChevronRight, CheckCircle, Download,
  Share2, X, AlertTriangle, Sparkle, Brain, Zap, HelpCircle, Layers
} from "lucide-react";
import { FinalQuizResult } from "../types";
import { ConstellationCanvas } from "./ConstellationCanvas";
import { auditScoring, AuditReport } from "../utils/auditScoring";
import { drawStoryCanvas } from "../utils/drawStoryCanvas";
import {
  TypologyDetail,
  MORAL_DESCRIPTIONS,
  DECISION_DESCRIPTIONS,
  CONFLICT_DESCRIPTIONS,
  COMMUNICATION_DESCRIPTIONS,
  RELATIONSHIP_DESCRIPTIONS,
  STRESS_DESCRIPTIONS,
  DEFENSE_DESCRIPTIONS,
  LOVE_STYLE_DESCRIPTIONS,
  RIASEC_DESCRIPTIONS,
  CORE_FEAR_DESCRIPTIONS
} from "../data/typologyDescriptions";

const SUBSCALE_EXPLANATIONS: Record<string, Record<string, { label: string; desc: string; stereotype: string }>> = {
  cognitive: {
    Ni: { label: "Ni (Introverted Intuition)", desc: "Membaca pola tersembunyi, visi jangka panjang, dan korelasi abstrak.", stereotype: "Firasat sunyi 'ini bakal kacau' padahal belum kejadian, tebakan pola besarnya tajam." },
    Ne: { label: "Ne (Extraverted Intuition)", desc: "Menghubungkan kemungkinan liar, eksplorasi ide melompat, dan inovasi.", stereotype: "Otak meledak ngeluarin belasan ide seliar alien, lompat topik pembicaraan dalam 3 detik." },
    Si: { label: "Si (Introverted Sensing)", desc: "Menaruh data kenyamanan, arsip ingatan detail masa lalu, dan rutinitas.", stereotype: "Arsip memori detail luar biasa, cemas berlebih jika rutinitas nyaman diubah mendadak." },
    Se: { label: "Se (Extraverted Sensing)", desc: "Menguji sensasi fisik, peleburan real-time pasrah dengan lingkungan luar.", stereotype: "Spontanitas luar biasa, hajar dulu urusan belakangan, mager akut kalo gak ada aksi." },
    Ti: { label: "Ti (Introverted Thinking)", desc: "Akurasi arsitektur logika murni untuk konsistensi konseptual internal.", stereotype: "Rela utak-atik coding or teka-teki sendirian di kamar, gemes jika ada argumen tak konsisten." },
    Te: { label: "Te (Extraverted Thinking)", desc: "Efisiensi terarah, metrik konkret, produktivitas kerja taktis sistematis.", stereotype: "Eksekusi brutal, perasaan dikesampingkan demi tugas cepat beres seefisien mungkin." },
    Fi: { label: "Fi (Introverted Feeling)", desc: "Menjaga kemurnian batin pribadi, keaslian nilai moral nurani otentik.", stereotype: "Batin sangat sensitif sama kepura-puraan sosial, ogah 'fake' demi sekadar dapet pujian." },
    Fe: { label: "Fe (Extraverted Feeling)", desc: "Merawat kehangatan relasi sosial, menyelaraskan atmosfer emosional luar.", stereotype: "Sangat peka iklim kelompok, refleks mengalah demi kenyamanan bersama dan menghindari drama." }
  },
  enneagram: {
    "1": { label: "Tipe 1 (The Reformer)", desc: "Integritas moral tinggi, disiplin ketat, bermental mengejar kesempurnaan lurus.", stereotype: "Perfeksionis akut, tersiksa kritik batin sendiri jika ada tugas atau sudut barang kurang rapi." },
    "2": { label: "Tipe 2 (The Helper)", desc: "Mencurahkan perhatian tulus demi menjaga perasaan orang lain agar dicintai.", stereotype: "Senang menolong tapi rawan capek batin sendiri dan gengsi setengah mati buat minta bantuan balik." },
    "3": { label: "Tipe 3 (The Achiever)", desc: "Kerja keras mengejar reputasi sukses, validasi, dan produktivitas nyata.", stereotype: "Ambisius mengejar status kerja, merasa tidak berharga jika seharian tidak menghasilkan apa-apa." },
    "4": { label: "Tipe 4 (The Individualist)", desc: "Mencari keunikan jati diri, mengekspresikan sisi melankolis puitis.", stereotype: "Suka menyendiri dengan selera estetika tinggi, diam-diam mendramatisir kesedihan agar autentik." },
    "5": { label: "Tipe 5 (The Investigator)", desc: "Mengumpulkan peta teori pengetahuan privat, irit energi interaksi sosial.", stereotype: "Ku-per cerdas pencinta kedalaman teori murni, anti-basa-basi, benci jika privasinya diinvasi." },
    "6": { label: "Tipe 6 (The Loyalist)", desc: "Menguji loyalitas persahabatan, waspada, menyusun jaring mitigasi cemas.", stereotype: "Skeptis pencari sekuritas, selalu panik diam-diam dan otomatis bikin skenario cadangan." },
    "7": { label: "Tipe 7 (The Enthusiast)", desc: "Memburu kesenangan petualangan baru, anti-stres, benci terikat aturan.", stereotype: "Mood booster kelompok, fobia kebosanan, otak isinya planning liburan, jajan, dan bersenang-senang." },
    "8": { label: "Tipe 8 (The Challenger)", desc: "Kemandirian mutlak, pelindung keadilan tegak melawan penindasan.", stereotype: "Mental baja tak kenal takut, gak sudi disetir kekuasaan, tameng pelindung teman-teman terdekat." },
    "9": { label: "Tipe 9 (The Peacemaker)", desc: "Mengalir menyelaraskan energi tenang, menghindari konfrontasi tegang.", stereotype: "Sangat pasif-selow mengikuti arus, menunda keputusan penting, memendam kesal dalam diam." }
  },
  instinct: {
    sp: { label: "sp (Self-Preservation)", desc: "Fokus keselamatan jasmani, kenyamanan pangan-papan, keuangan tabungan.", stereotype: "Sangat peduli kenyamanan kasur, stok makanan, dana darurat aman, mager keluar sarang." },
    sx: { label: "sx (Sexual/Intimacy)", desc: "Memburu getaran koneksi intim 1-on-1 intens dan gairah kimiawi batin.", stereotype: "Pencinta deep-talk berdua sampai subuh, menuntut ikatan emosional intens yang membakar jiwa." },
    so: { label: "so (Social)", desc: "Membaca penempatan diri dalam dinamika jejaring kelompok komunal.", stereotype: "Peduli tempatnya di lingkungan kelompok, senang berorganisasi, butuh kontribusi di masyarakat." }
  },
  bigFive: {
    openness: { label: "Openness (Keterbukaan Ide)", desc: "Kemauan mengeksplorasi konsep seni abstrak, filsafat, teori konseptual.", stereotype: "Suka berimajinasi liar, menyukai pembicaraan bertema eksistensial, hobi mencoba hal yang tidak biasa." },
    conscientiousness: { label: "Conscientiousness (Keteraturan Rapi)", desc: "Disiplin melunasi tanggung jawab, ketepatan jadwal, kerapian tata kelola.", stereotype: "Tepat waktu, risih jika meja berantakan, stres jika rencana harian digeser tiba-tiba." },
    extraversion: { label: "Extraversion (Simfoni Komunal)", desc: "Ekspresif menyerap dan mengalirkan energi ke luar, memimpin relasi sosial.", stereotype: "Cepat akrab sama orang baru, baterai diri langsung dicas penuh setelah kumpul di pesta seru." },
    agreeableness: { label: "Agreeableness (Kehangatan Empati)", desc: "Kecenderungan mendahulukan rasa percaya, pemaaf, dan menolong sesama.", stereotype: "Mudah iba melihat kucing terlantar, paling tersiksa kalau harus berkata tidak pada permintaan orang gila kerja." },
    neuroticism: { label: "Neuroticism (Sensitivitas Badai)", desc: "Tingkat kerentanan emosional menyerap kekhawatiran dan stres panik batin.", stereotype: "Overthinking chat WhatsApp dibaca doang, panik berlebih, mood swing drastis dalam sekejap." }
  },
  decision: {
    analytical: { label: "Analytical (Gaya Logis)", desc: "Penimbangan logis berdasarkan data kuantitatif akurat objektif.", stereotype: "Membuat tabel pro-kontra or riset review berjam-jam sebelum membeli barang sepele." },
    valueBased: { label: "Value-Based (Gaya Moral)", desc: "Keputusan harus selaras dengan nilai kebenaran nurani terdalam.", stereotype: "Harus terasa selaras di hati meskipun ditentang majoritas kelompok atau tidak menguntungkan." },
    fastAction: { label: "Fast-Action (Gaya Spontan)", desc: "Mengutamakan kecepatan kelincahan eksekusi daripada membuang waktu berpikir.", stereotype: "Tancap gas instan begitu dapet ide, urusan salah diperbaiki sambil jalan berkendara." },
    consensus: { label: "Consensus (Gaya Kolektif)", desc: "Mengejar kemufakatan kelompok, memastikan semua anggota sejalan.", stereotype: "Grup WA harus sepakat 100% dan merasa senang dulu sebelum berani melangkah memutuskan." },
    riskAware: { label: "Risk-Aware (Gaya Mitigatif)", desc: "Mengutamakan keselamatan jangka panjang, menghindari kerugian fatal.", stereotype: "Selalu berasumsi skenario terburuk bakal terjadi, penuh kecurigaan teoretis sebelum menyetujui." }
  },
  relationship: {
    secureLeaning: { label: "Secure Leaning", desc: "Ikatan emosional hangat mandiri, minim ketakutan penolakan.", stereotype: "Nyaman saling percaya, memberi ruang pribadi tanpa cemas ditinggal pergi." },
    anxiousLeaning: { label: "Anxious Leaning", desc: "Ketakutan akut akan ditinggalkan, butuh afirmasi kasih konstan.", stereotype: "Spam chat jika tidak dibalas cepat, sensitif terhadap perubahan dingin pasangan." },
    avoidantLeaning: { label: "Avoidant Leaning", desc: "Menutup benteng privasi ketat, mengandalkan kemandirian ekstrem.", stereotype: "Mundur pelan-pelan menjauh jika relasi terasa terlalu intim atau menuntut komitmen." },
    fearfulLeaning: { label: "Fearful Leaning", desc: "Pertarungan batin antara rindu keintiman dan trauma takut terluka.", stereotype: "Maju merapat tapi refleks mencakar, fluktuatif menarik-ulur emosional pasangan." }
  },
  stress: {
    flight: { label: "Flight (Pelarian Aman)", desc: "Dorongan melarikan energi batin keluar dari episentrum konflik.", stereotype: "Mundur dari grup, menyalakan game semalaman, mengurung diri melupakan beban." },
    freeze: { label: "Freeze (Membeku Lumpuh)", desc: "Kelumpuhan respon saraf, ketidakmampuan berpikir atau mengambil tindakan.", stereotype: "Natap tembok kosong berjam-jam, pikiran mendadak blank tak bisa berkata-kata." },
    hypervigilant: { label: "Hypervigilant (Hiper-Waspada)", desc: "Menaikkan sensitivitas mendeteksi ancaman di sekeliling lingkungan.", stereotype: "Jantung berdegup kencang, over-analisis raut muka lawan bicara, cemas mendadak." },
    fawn: { label: "Fawn (Penundukan Pasrah)", desc: "Mengorbankan ego menyakiti diri demi menyingkirkan kemarahan luar.", stereotype: "Jadi penurut manis pengalah, langsung minta maaf berkali-kali padahal gak salah." },
    fight: { label: "Fight (Konfrontasi Amarah)", desc: "Menggerakkan energi agresi kemarahan melindungi batas pertahanan.", stereotype: "Suara meninggi berani berdebat brutal langsung demi membela keadilan pribadinya." }
  }
};

interface ResultProps {
  results: FinalQuizResult;
  onRestart: () => void;
}

export function ResultScreen({ results, onRestart }: ResultProps) {
  const [showDevAudit, setShowDevAudit] = useState(false);
  const [activeTab, setActiveTab] = useState<"cahaya" | "perilaku" | "ekosistem">("cahaya");
  const [auditReport] = useState<AuditReport>(() => auditScoring());
  
  // Interactive Explanation States
  const [selectedTypology, setSelectedTypology] = useState<TypologyDetail | null>(null);
  const [selectedPoints, setSelectedPoints] = useState<string | null>(null);
  const [selectedStereotype, setSelectedStereotype] = useState<string | null>(null);

  const getStereotype = (titleOrKey: string): string => {
    const key = titleOrKey.toLowerCase();
    
    // Attachment leaning
    if (key.includes("avoidant") || key.includes("tirai privat")) return "Gue mending kelaparan seminggu daripada harus nge-text 'Kamu di mana?' saat lagi kangen atau minta tolong ke orang lain.";
    if (key.includes("anxious") || key.includes("tersulut kecemasan")) return "Spam chat bertubi-tubi kalau tidak dibalas cepat, sensitif setengah mati terhadap perubahan nada dingin ketikan pasangan.";
    if (key.includes("secure") || key.includes("matang berpadu")) return "Nyaman saling percaya, memberi ruang pribadi penuh tanpa cemas ditinggal pergi karena sadar nilai diri utuh.";
    if (key.includes("fearful") || key.includes("terluka")) return "Pengen deket banget tapi trauma takut terluka, jadinya hobi tarik-ulur kayak main layangan sampai pasangannya pusing.";
    
    // Stress response
    if (key.includes("freeze") || key.includes("kebekuan")) return "Pas masalah nuklir meledak, gue bakal mutusin hubungan dengan tidur 14 jam seharian dan pura-pura dunia fiksi laptop adalah realitas nyata.";
    if (key.includes("flight") || key.includes("pelarian")) return "Otak isinya langsung pengen beli tiket pesawat liburan, belanja impulsif pemicu dopamin, atau main gim sampai subuh biar lupa beban.";
    if (key.includes("fight") || key.includes("mobilisasi")) return "Mental ksatria langsung bangun, suaraku meninggi berani berdebat frontal habis-habisan demi menegakkan batasan kedaulatan!";
    if (key.includes("fawn") || key.includes("penaklukan")) return "Jadi penurut manis yang mengalah, langsung chat minta maaf berkali-kali padahal gak salah sama sekali demi merawat damai.";
    if (key.includes("hypervigilant") || key.includes("kewaspadaan")) return "Jantung berdegup kencang, over-analisis raut muka lawan bicara, siaga 1 mendeteksi bahaya pengkhianatan sekeliling.";

    // Conflict style
    if (key.includes("competit") || key.includes("dominansi")) return "Konflik adalah kompetisi argumen. Tidak ada kata menyerah sampai fakta logis dan kemenangan solusi ada di tangan gue!";
    if (key.includes("collabor") || key.includes("dialog asertif")) return "Mengajak semua pihak mendedah unek-unek dasar, membongkar akar sengketa demi merajut mufakat sejati yang menang-menang.";
    if (key.includes("comprom") || key.includes("kelenturan diplomasi")) return "Jalan tengah kilat taktis: 'Mari kita sama-sama ngalah dikit yang penting masalah cepat selesai dan kita bisa lanjut hidup.'";
    if (key.includes("avoiding") || key.includes("penghindaran demi")) return "Silakan ngoceh sendiri sampai berbusa, gue pasang earphone dengerin musik lo-fi dan masuk ke dalam kestabilan batin sunyi gue.";
    if (key.includes("accommodat") || key.includes("merawat harmoni")) return "Mengalah demi rukun tetangga, memendam unek-unek dalam hati asal lingkaran relasi tetap tersenyum hangat.";

    // Decision style
    if (key.includes("analytic")) return "Membuat tabel perbandingan pro-kontra Excel atau riset review YouTube berjam-jam sebelum membeli barang sepele.";
    if (key.includes("value")) return "Keputusan harus terasa selaras di getaran hati kebenaran nurani, meskipun tidak masuk akas or ditentang majoritas.";
    if (key.includes("fast") || key.includes("eksekusi spontan")) return "Tancap gas instan begitu ada ide, hajar urusan belakangan yang penting melangkah; perbaikan celah dilakukan sambil jalan berkendara.";
    if (key.includes("consens") || key.includes("mufakat")) return "Grup WA rasan-rasan harus sepakat 100% dan merasa senang dulu sebelum berani meluncurkan keputusan besar bersama.";
    if (key.includes("risk") || key.includes("mitigasi")) return "Selalu berasumsi skenario terburuk krisis bakal terjadi, penuh kalkulasi sekoci darurat sebelum melangkah setapak.";

    // Moral style
    if (key.includes("idealist") || key.includes("keaslian integritas")) return "Integritas moral nomor satu, anti-basa-basi cari muka. Menuntut keselarasan mutlak antara ucapan mulut dan aksi nyata.";
    if (key.includes("altruist") || key.includes("kepedulian")) return "Sensitif dengan penderitaan komunal, rela berkorban waktu & dana harian demi meringankan pedih umat manusia.";
    if (key.includes("pragmat") || key.includes("praktis")) return "Moralitas itu harus berguna menghasilkan solusi nyata harian, bukan sekedar khotbah teori suci mengawang-awang.";
    if (key.includes("normatif") || key.includes("rule") || key.includes("kepatuhan")) return "Ketertiban peradaban bergantung pada kepatuhan tertulis aturan bersama; melanggar kesepakatan adab adalah aib batin terbesar.";
    if (key.includes("otonom") || key.includes("libertarian") || key.includes("kedaulitan")) return "Kedaulatan diri adalah mutlak; institusi or aturan luar dilarang keras menjajah pilihan hidup sadarku!";

    // Love style
    if (key.includes("quality") || key.includes("waktu berkualitas") || key.includes("penyandingan")) return "Gak usah sok-sokan ngasih kado mahal or nulis puisi panjang jika pas bertemu matamu masih nempel di FYP TikTok. Taruh HP-mu, tatap mataku!";
    if (key.includes("affirmation") || key.includes("kata-kata") || key.includes("verbal")) return "Ucapan kecil 'Aku bangga dengan daya juangmu' bisa bikin baterai batinku terisi penuh seminggu. Tapi kalau dicuekin sedetik, langsung mikir jadi beban bumi.";
    if (key.includes("touch") || key.includes("fisik") || key.includes("pelukan")) return "Genggaman erat tangan di tengah jalan riuh atau usapan kepala kala lelah adalah stabilizer stres biologis terampuh buat gue.";
    if (key.includes("acts") || key.includes("bakti") || key.includes("tindakan")) return "Tunjukkan cintamu lewat tindakan praktis tanpa harus gue minta: benerin wastafel, cuci mobil, seduh kopi hangat kala fajar.";
    if (key.includes("gifts") || key.includes("hadiah") || key.includes("kejutan")) return "Hadiah kecil kejutan berselera yang membuktikan lu mengingat detil terkecil kesukaanku saat sedang berjarak jauh.";
    if (key.includes("depth") || key.includes("pendedahan kedalaman")) return "Benci obrolan kasual basa-basi cuaca. Kasih gue percakapan tengah malam membongkar rahasia terdalam batin sambil nangis bareng.";

    // Defense mechanisms
    if (key.includes("rational") || key.includes("logika rasional")) return "Melindungi ego dari luka sakit hati dengan menulis esai penjelasan teoritis sosiologis/medis logis panjang lebar di otak.";
    if (key.includes("project") || key.includes("melempar ancaman")) return "Menolak mengakui sisi insecure/iri hati batiniah diri sendiri dengan menuduh orang sekeliling jahat or bermuka dua.";
    if (key.includes("repress") || key.includes("memarkir")) return "Menyimpan rapat trauma masa lalu di memori peti es sanubari terdalam, lalu tersenyum lelucon ceria cerah di panggung sosial.";
    if (key.includes("sublima") || key.includes("karya berguna")) return "Menyalurkan letupan murka or duka patah hati menjadi mahakarya lukisan puitis, novel best seller, or rekor lari maraton.";
    if (key.includes("denial") || key.includes("penolakan realitas")) return "Menolak fakta pahit kematian or pengkhianatan seakan itu tidak pernah terjadi; yakin esok pagi semuanya kembali normal fiktif.";

    // Core Fear
    if (key.includes("uselessness") || key.includes("kompetensi") || key.includes("inkompetensi")) return "Mimpi buruk terburuk batin gue adalah keliatan bloon, gagu, or tidak berdaya fungsi di depan forum ahli bidang.";
    if (key.includes("corrupt") || key.includes("dosa") || key.includes("moral")) return "Tiap malam sebelum tidur, batin gue mengadakan audit etika ketat mencemaskan apakah riak kesalahan tadi siang bikin masuk neraka.";
    if (key.includes("insignifican") || key.includes("identitas") || key.includes("hampanya")) return "Mending mati gaya daripada harus pakai seragam sejuta umat or dibilang kepribadiannya pasaran mirip si X.";
    if (key.includes("vulner") || key.includes("terjajah") || key.includes("kerentanan")) return "Menolak keras disetir or dilarang berdaulat; menunjukkan tangisan kerentanan adalah tabu karena taring kelaki-lakian/keperempuanan gue harus tegak.";
    if (key.includes("reject") || key.includes("penolakan") || key.includes("kehilangan cinta")) return "Refleks memotong opini pribadi demi keselarasan komunal kompromi agar pancaran kasih kelompok terus mengalir nyaman.";
    if (key.includes("fail") || key.includes("kegagalan") || key.includes("harga diri")) return "Rela begadang 3 hari tanpa tidur demi dapet pujian: 'Gila, lu emang gak pernah gagal! Selalu melampaui limit prestasi!'";
    if (key.includes("conflict") || key.includes("kekacauan") || key.includes("kedamaian")) return "Tiap kali denger bentakan tegang or melihat sengketa piring pecah di luar, jiwaku bergetar kencang ingin sirna meloloskan diri.";

    // Work / Learning style
    if (key.includes("planner") || key.includes("perencana")) return "Merancang arsitektur peta jalan sistematis lengkap dengan tenggat waktu, riset sekoci mitigasi kendala di awal.";
    if (key.includes("executor") || key.includes("eksekutor")) return "Anti-koordinasi bertele-tele; bagikan prioritas tugas, lu tinggal terima beres dengan target kilat selesai.";
    if (key.includes("innovator") || key.includes("inovator")) return "Pembuat konsep radikal pendobrak, melompati aturan usang kaku demi melahirkan efisiensi or keindahan visi baru.";
    if (key.includes("caretaker") || key.includes("pemberi")) return "Memastikan kesehatan mental & harmoni relasi rekan tim terjaga hangat agar performa tumbuh alami.";
    if (key.includes("visual")) return "Menangkap peta konsep melompat melalui ilustrasi coretan whiteboard, analogi metaforis, & peta mental kaya rupa.";
    if (key.includes("verbal")) return "Merenungkan kedalaman aksara teks bergizi panjang, mengunyah kalimat filosofis secara privat dalam keheningan.";
    if (key.includes("structured") || key.includes("struktural")) return "Membedah manual operasional setapak demi setapak dari bab pendahuluan fondasi dasar agar valid terarah.";
    if (key.includes("project") || key.includes("eksperimen")) return "Langsung menceburkan diri praktek trial-error di lapangan, dapet pelajaran murni justru dari benturan kesalahan riil.";

    // Temperament
    if (key.includes("melancholic")) return "Sangat sensitif, analitis, idealis, berstandar tinggi, tapi rentan overthinking memikirkan kelemahan dunia.";
    if (key.includes("sanguine")) return "Ceria, ekspresif, ceria pemicu tawa relasi, menyerap energi dari panggung komunal hangat, benci rutinitas klerikal.";
    if (key.includes("choleric")) return "Pendobrak asertif penuh bertenaga, orientasi hasil asalkan target terlaksana kilat tanpa drama cengeng perasaan.";
    if (key.includes("phlegmatic")) return "Meneduhkan selow, penyeimbang energi sunyi damai, menolak konfrontasi benturan, andalan penengah krisis relasi.";

    return "Memiliki relasi stereotip yang sangat relate dengan kebiasaan spontan keseharian Anda.";
  };

  const getLoveStyleDetail = (fullLabel: string): TypologyDetail => {
    const lbl = fullLabel.toLowerCase();
    let key = "qualityTime";
    if (lbl.includes("words") || lbl.includes("kata-kata") || lbl.includes("affirmation")) key = "wordsOfAffirmation";
    else if (lbl.includes("touch") || lbl.includes("kedekatan fisik") || lbl.includes("physic") || lbl.includes("fisik")) key = "physicalTouch";
    else if (lbl.includes("acts") || lbl.includes("bakti") || lbl.includes("service") || lbl.includes("tindakan")) key = "actsOfService";
    else if (lbl.includes("gifts") || lbl.includes("hadiah") || lbl.includes("receiving") || lbl.includes("kejutan")) key = "receivingGifts";
    else if (lbl.includes("depth") || lbl.includes("pendedahan") || lbl.includes("emotional") || lbl.includes("kedalaman")) key = "emotionalDepth";
    
    return LOVE_STYLE_DESCRIPTIONS[key] || LOVE_STYLE_DESCRIPTIONS["qualityTime"];
  };

  const getCoreFearDetail = (fullLabel: string): TypologyDetail => {
    const lbl = fullLabel.toLowerCase();
    let key = "uselessness";
    if (lbl.includes("corrupt") || lbl.includes("dosa") || lbl.includes("moral") || lbl.includes("kebobrokan")) key = "corruptness";
    else if (lbl.includes("insignifican") || lbl.includes("identitas") || lbl.includes("hampanya")) key = "insignificance";
    else if (lbl.includes("vulnerab") || lbl.includes("terjajah") || lbl.includes("kerentanan")) key = "vulnerability";
    else if (lbl.includes("reject") || lbl.includes("penolakan") || lbl.includes("kehilangan cinta")) key = "rejection";
    else if (lbl.includes("fail") || lbl.includes("kegagalan") || lbl.includes("harga diri")) key = "failure";
    else if (lbl.includes("conflict") || lbl.includes("kekacauan") || lbl.includes("kedamaian")) key = "conflictBoundary";
    
    return CORE_FEAR_DESCRIPTIONS[key] || CORE_FEAR_DESCRIPTIONS["uselessness"];
  };

  const getRIASECDetail = (interestName: string): TypologyDetail => {
    const name = interestName.split(" (")[0].trim();
    return RIASEC_DESCRIPTIONS[name] || RIASEC_DESCRIPTIONS["Realistic"];
  };

  const generateAPDetail = (apType: string): TypologyDetail => {
    const code = apType?.toUpperCase() || "ELVF";
    const aspects: Record<string, string> = {
      E: "Emotion (Kedalaman Rasa & Ekspresi Afeksi)",
      L: "Logic (Arsitektur Nalar & Analisis Teori)",
      V: "Volition (Denda Ego & Pengaruh Daya Kehendak)",
      F: "Physics (Kebutuhan Praktis & Sensasi Jasmani)"
    };
    
    const positions = [
      { name: "Confident (Kukuh Utama)", desc: "kekuatan otonom utama Anda yang bertenaga penuh tanpa beban sosial" },
      { name: "Flexible (Lentur Diskusi)", desc: "ruang kolaborasi asyik di mana Anda komunikatif dan dinamis menerimanya" },
      { name: "Insecure (Khawatir Waspada)", desc: "sisi rapuh yang sensitif, butuh pembuktian, dan waspada terhadap kritik" },
      { name: "Indifferent (Abai Selow)", desc: "aspek pasif-selow yang Anda serahkan ke panduan luar atau anggap rileks" }
    ];

    const listItems = code.split("").map((letter, idx) => {
      const aspName = aspects[letter] || letter;
      const pos = positions[idx];
      return `${idx + 1}${letter} - ${aspName} berada di posisi ${pos.name}. Ini adalah ${pos.desc}.`;
    });

    return {
      title: `Attitudinal Psyche - Tipe ${code}`,
      badge: "Rasi Sikap Mental",
      shortDesc: `Rasi sikap mental fungsional di mana Anda menyusun prioritas energi Logic, Emotion, Physics, dan Volition.`,
      detailedDesc: `Tipe ${code} menyusun energi psikis Anda dengan konfigurasi:\n\n${listItems.join("\n\n")}`,
      strength: `Kemampuan memimpin bidang ${aspects[code[0]]?.split(" (")[0]} dengan otonom kukuh, serta kelenturan diskusi sehat di ${aspects[code[1]]?.split(" (")[0]}.`,
      vulnerability: `Rawan mengalami kecemasan berlebih atau rasa risih yang menuntut pembuktian di bidang ${aspects[code[2]]?.split(" (")[0]}.`,
      advice: `Fokuslah melatih penerimaan asertif pada bidang ${code[2]} (posisi 3) agar kestabilan ego Anda tidak mudah terguncang kritik luar.`
    };
  };
  
  // Share IG Story States
  const [showShareModal, setShowShareModal] = useState(false);
  const [storyImageSrc, setStoryImageSrc] = useState<string>("");
  const [isGeneratingStory, setIsGeneratingStory] = useState(false);
  const storyCanvasRef = useRef<HTMLCanvasElement>(null);

  // Helper translations for Enneagram explanations based on primary type
  const getEnneagramPoem = (type: string) => {
    const maps: Record<string, { title: string; desc: string }> = {
      "1": { title: "Sang Penjaga Prasaja", desc: "Mengejar kesucian moral dan kebenaran normatif, rawan tersiksa kritikus internal." },
      "2": { title: "Sang Perawat Kehangatan", desc: "Mencurahkan kasih sayang demi penerimaan tulus, rawan melupakan otonomi diri." },
      "3": { title: "Sang Arsitek Kejayaan", desc: "Mengejar prestasi nyata dan reputasi kinerja tinggi, rawan diperbudak topeng ego." },
      "4": { title: "Sang Penjaga Originalitas", desc: "Merenungi keunikan estetik dan kedalaman batin murni, rawan dipenjara melankoli." },
      "5": { title: "Sang Penjelajah Teori", desc: "Mengumpulkan arsitektur pengetahuan fungsional privat, rawan membekukan diri dari rasa." },
      "6": { title: "Sang Penjaga Sekuritas", desc: "Menguji keandalan sistem dan loyalitas persahabatan, rawan dicengkeram kecemasan." },
      "7": { title: "Sang Pemburu Sinar", desc: "Merajut petualangan kebahagiaan bebas dari nestapa, rawan lari dari luka mendalam." },
      "8": { title: "Sang Singa Otonom", desc: "Melindungi kedaulatan hakiri dan mematikan ketertundukan, rawan membenci kerentanan batin." },
      "9": { title: "Sang Penyemai Damai", desc: "Merawat keharmonisan tanpa turbulensi hubungan, rawan membiarkan diri hanyut sepi." },
    };
    return maps[type] || { title: "Jiwa Penjelajah", desc: "Mencari keselarasan batin" };
  };

  const getDichotomyLabelValue = (axis: string, val: number) => {
    if (axis === "IE") {
      return val >= 55 ? "Introvert (Pusat Energi Privat)" : val <= 45 ? "Extrovert (Sirkulasi Energi Sosial)" : "Ambivert (Penyeimbang Lentur)";
    }
    if (axis === "SN") {
      return val >= 55 ? "Intuisi (Orientasi Pola & Visi)" : val <= 45 ? "Sensoris (Orientasi Data Riil)" : "Perspektif Seimbang";
    }
    if (axis === "TF") {
      return val >= 55 ? "Thinking (Logika & Kebenaran Objektif)" : val <= 45 ? "Feeling (Nilai Rasa & Kemanusiaan)" : "Pertimbangan Proporsional";
    }
    return val >= 55 ? "Judging (Sistem Kepatuhan Struktur)" : val <= 45 ? "Perceiving (Sistem Spontanitas Kelenturan)" : "Gaya Eksekusi Fleksibel";
  };

  const enneagramInfo = getEnneagramPoem(results.enneagram.primaryType);

  const constellationSummaryInfo = {
    mbti: results.top3Mbti[0].type,
    enneagram: results.enneagram.wing,
    instinct: results.enneagram.instinctualStack,
    value: results.valuesRanking[0] || "Aspek Batin",
    fear: results.coreFear,
    love: results.preferredLoveStyle,
    comfort: results.preferredEnvironment
  };

  // Generate Instagram Story Image
  const generateIGStory = async () => {
    setIsGeneratingStory(true);
    setShowShareModal(true);
    // Give time to render the canvas element in the hidden virtual tree
    setTimeout(async () => {
      if (storyCanvasRef.current) {
        try {
          const imgData = await drawStoryCanvas(
            storyCanvasRef.current,
            results,
            enneagramInfo.title
          );
          setStoryImageSrc(imgData);
        } catch (err) {
          console.error("Gagal menggambar Rasi Story: ", err);
        } finally {
          setIsGeneratingStory(false);
        }
      }
    }, 400);
  };

  const triggerTypologyDetail = (
    styleString: string, 
    typeSource: Record<string, TypologyDetail>,
    pointsVal?: string,
    customStereo?: string
  ) => {
    setSelectedPoints(pointsVal || null);
    setSelectedStereotype(customStereo || getStereotype(styleString));

    const detail = typeSource[styleString];
    if (detail) {
      setSelectedTypology(detail);
    } else {
      setSelectedTypology({
        title: styleString.split(" (")[0],
        badge: "Detail Rasi",
        shortDesc: "Bagian penting dari kepribadian komprehensif Anda.",
        detailedDesc: `Tipe perilaku kognitif ${styleString} merelasikan bagaimana psikologi internal Anda merespon pemicu pendedahan dunia luar.`,
        strength: "Keselarasan aksi, adaptasi lingkungan yang solid.",
        vulnerability: "Rentang fluktuasi kenyamanan dalam situasi krisis tinggi.",
        advice: "Gunakan panduan bimbingan yang seimbang untuk melatih kesadaran emosional diri secara berkala."
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between overflow-x-hidden">
      
      {/* BACKGROUND FLOATING STAR DECORE */}
      <div className="absolute inset-0 bg-cosmic-grid opacity-20 pointer-events-none" />

      {/* TOP GLOWING ATMOSPHERE */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-indigo-950/40 via-transparent to-transparent pointer-events-none" />

      {/* RESULT CONTAINER MAIN */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">
        
        {/* HEADER BAR RESULT */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800/80 pb-6">
          <div className="text-left">
            <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-widest bg-indigo-950/45 px-3 py-1 rounded-full border border-indigo-500/10">
              Hasil Interpretasi Tipologi
            </span>
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight mt-3">
              Rasi {results.top3Mbti[0].type} ({results.enneagram.wing})
            </h1>
            <p className="text-sm text-slate-400 mt-1 select-none font-sans max-w-lg leading-relaxed">
              Sebuah rasi kognitif berlapis dari rasi {results.top3Mbti[0].type} yang dipandu oleh rasi jiwa {enneagramInfo.title}.
            </p>
          </div>

          <div className="flex items-center flex-wrap gap-2 sm:gap-3">
            <button
              onClick={onRestart}
              className="flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-mono font-bold tracking-wider text-slate-300 hover:text-white uppercase bg-slate-900 border border-slate-800 hover:border-slate-700/80 rounded-xl transition-all cursor-pointer"
            >
              <Undo2 className="w-3.5 h-3.5" />
              Uji Ulang
            </button>
            <button
              onClick={generateIGStory}
              className="flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-mono font-bold tracking-wider text-white uppercase bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all cursor-pointer shadow-lg shadow-indigo-500/10"
            >
              <Share2 className="w-3.5 h-3.5" />
              Bagikan Rasi (IG Story)
            </button>
            <button
              onClick={() => setShowDevAudit(!showDevAudit)}
              className="flex items-center gap-1.5 px-3 py-2.5 text-xs font-mono font-bold tracking-wider text-teal-350 hover:text-teal-200 uppercase bg-teal-950/25 border border-teal-500/20 rounded-xl transition-all cursor-pointer"
            >
              <Bug className="w-3.5 h-3.5" />
              Audit
            </button>
          </div>
        </div>

        {/* METADATA DIAGNOSTIC DRAWER DEVS */}
        <AnimatePresence>
          {showDevAudit && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full bg-slate-900/40 border border-teal-500/15 rounded-3xl p-6 overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Bug className="w-5 h-5 text-teal-400" />
                  <p className="font-display font-bold text-teal-300 tracking-wider">Laboratorium Audit Diagnostik Kuesioner</p>
                </div>
                <span className="text-[10px] font-mono bg-teal-950 border border-teal-500/20 text-teal-300 px-2 py-0.5 rounded-md">
                  Status: Compliant
                </span>
              </div>

              {/* Grid content audit */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left text-xs font-mono mt-4 leading-normal">
                
                {/* Visual points summary */}
                <div className="backdrop-blur-md bg-slate-950/40 border border-slate-850 p-4 rounded-2xl flex flex-col gap-2">
                  <h4 className="text-teal-400 font-bold uppercase tracking-wider text-[10px]">Points Per Subscale</h4>
                  <div className="space-y-1 text-[10px] overflow-y-auto max-h-48 pr-1 mt-1 text-slate-300">
                    {Object.keys(auditReport.measurementPoints).map(sys => {
                      const keys = Object.keys(auditReport.measurementPoints[sys]);
                      return (
                        <div key={sys} className="pb-1 border-b border-slate-900">
                          <span className="text-indigo-300">{sys}:</span>
                          <div className="grid grid-cols-2 gap-1 pl-2 text-[9px] text-slate-400">
                            {keys.slice(0, 8).map(k => (
                              <div key={k}>{k}: {auditReport.measurementPoints[sys][k].toFixed(0)}pt</div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Audit Warnings and Success Logs */}
                <div className="backdrop-blur-md bg-slate-950/40 border border-slate-850 p-4 rounded-2xl flex flex-col gap-2">
                  <h4 className="text-teal-400 font-bold uppercase tracking-wider text-[10px]">Sinyal & Integritas Item</h4>
                  <div className="space-y-2 mt-1 max-h-48 overflow-y-auto pr-1">
                    <div className="text-[10px] text-slate-400">
                      Total Item Berjalan: <span className="text-white">{auditReport.totalQuestions}</span>
                    </div>
                    {auditReport.duplicateIDs.length > 0 ? (
                      <div className="text-red-400 text-[10px]">Duplicate IDs: {auditReport.duplicateIDs.join(", ")}</div>
                    ) : (
                      <div className="text-emerald-400 text-[10px] flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" /> ID unik berantai lengkap
                      </div>
                    )}
                    {auditReport.uiLeaks.length > 0 ? (
                      <div className="text-amber-400 text-[10px]">UI Leaks Deteksi ({auditReport.uiLeaks.length})</div>
                    ) : (
                      <div className="text-emerald-400 text-[10px] flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" /> Bersih dari bocoran teori di UI
                      </div>
                    )}
                    {auditReport.incompleteOptions.length > 0 ? (
                      <div className="text-red-400 text-[10px]">Incomplete Option structure: {auditReport.incompleteOptions.length} errors found.</div>
                    ) : (
                      <div className="text-emerald-400 text-[10px] flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" /> Struktur bobot options 100% lengkap
                      </div>
                    )}
                  </div>
                </div>

                {/* System targets metrics summary */}
                <div className="backdrop-blur-md bg-slate-950/40 border border-slate-850 p-4 rounded-2xl flex flex-col gap-2">
                  <h4 className="text-teal-400 font-bold uppercase tracking-wider text-[10px]">Target Coverage Status</h4>
                  <div className="space-y-1.5 mt-1 overflow-y-auto max-h-48 pr-1 text-[9px] text-slate-400">
                    <div className="text-emerald-400 font-semibold mb-1">Success Checklist:</div>
                    {auditReport.coverageSuccess.slice(0, 10).map((succ, sIdx) => (
                      <div key={sIdx} className="truncate">✓ {succ}</div>
                    ))}
                    {auditReport.coverageWarnings.length > 0 && (
                      <div className="text-amber-400 mt-2 font-semibold">Warnings:</div>
                    )}
                    {auditReport.coverageWarnings.map((warn, wIdx) => (
                      <div key={wIdx}>! {warn}</div>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* BENTO VIEW TABS SELECTOR - Responsive layout with 3 tabs */}
        <div className="flex flex-wrap sm:flex-nowrap gap-1.5 p-1 bg-slate-900/60 border border-slate-800 rounded-2xl w-full max-w-xl mx-auto justify-center select-none">
          {[
            { id: "cahaya", label: "Rasi Jiwa & Kognisi", icon: Sparkles },
            { id: "perilaku", label: "Kompas Perilaku", icon: SlidersHorizontal },
            { id: "ekosistem", label: "Ekosistem Kinerja", icon: BookOpen }
          ].map(tab => {
            const Icon = tab.icon;
            const isAct = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-[10px] sm:text-xs font-display font-semibold uppercase tracking-wider transition-all cursor-pointer flex-1 min-w-[100px] sm:min-w-0 ${
                  isAct 
                    ? "bg-indigo-600 font-bold text-white shadow-lg shadow-indigo-500/10" 
                    : "text-slate-400 hover:text-white bg-slate-950/20"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* CLICKABLE INFO BOX TIP TO HELP USER EXPAND DETAILS */}
        <div className="max-w-xl mx-auto -mb-1 flex items-center justify-center gap-2 bg-indigo-950/20 border border-indigo-500/10 rounded-full px-4 py-1.5 text-center text-[10px] sm:text-xs text-indigo-300">
          <Sparkle className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '4s' }} />
          <span>Klik salah satu rasi kartu tipologi di bawah ini untuk mendedah rahasia stereotip & panduan batin lengkap.</span>
        </div>

        {/* VIEW SHIFT CHANNELS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          
          {/* TAB 1: CAHAYA UTAMA */}
          {activeTab === "cahaya" && (
            <>
              {/* CONSTELATION CANVAS bento card */}
              <div className="relative md:col-span-2 aspect-square md:aspect-auto md:h-[520px] border border-slate-900/80 rounded-3xl overflow-hidden flex flex-col justify-end p-6 bg-slate-950/45 shadow-2xl">
                <ConstellationCanvas interactive={true} results={constellationSummaryInfo} />
              </div>

              {/* COGNITIVE STACK DETAILS */}
              <div className="backdrop-blur-md bg-slate-900/15 border border-slate-800/80 rounded-3xl p-6 flex flex-col gap-4 justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
                    <Layers className="w-5 h-5 text-indigo-400" />
                    <h3 className="font-display font-semibold text-white tracking-wide">Arsitektur Cognitive Stack</h3>
                  </div>
                  
                  <p className="text-[10px] font-mono text-slate-400 leading-normal">
                    Peta urutan pengolahan data kognitif dari kesadaran primer hingga rasi terdalam batin:
                  </p>

                  <div className="space-y-2.5 pt-1 text-xs">
                    <div className="flex justify-between items-center p-2 rounded-xl bg-indigo-950/20 border border-indigo-500/15">
                      <div>
                        <p className="font-mono text-[9px] uppercase tracking-wider text-indigo-300 font-bold">Dominant (Hulu Utama)</p>
                        <p className="font-display font-bold text-white mt-0.5">{results.mbtiStack.dominant}</p>
                      </div>
                      <span className="text-[10px] font-mono bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded-md font-bold">1st</span>
                    </div>

                    <div className="flex justify-between items-center p-2 rounded-xl bg-indigo-950/10 border border-indigo-500/5">
                      <div>
                        <p className="font-mono text-[9px] uppercase tracking-wider text-slate-400">Auxiliary (Pendukung Aksi)</p>
                        <p className="font-display font-bold text-slate-200 mt-0.5">{results.mbtiStack.auxiliary}</p>
                      </div>
                      <span className="text-[10px] font-mono bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded-md">2nd</span>
                    </div>

                    <div className="flex justify-between items-center p-2 rounded-xl bg-slate-950/40 border border-slate-850">
                      <div>
                        <p className="font-mono text-[9px] uppercase tracking-wider text-slate-400">Tertiary (Sisi Kreatif/Labil)</p>
                        <p className="font-display font-bold text-slate-300 mt-0.5">{results.mbtiStack.tertiary}</p>
                      </div>
                      <span className="text-[10px] font-mono bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded-md">3rd</span>
                    </div>

                    <div className="flex justify-between items-center p-2 rounded-xl bg-slate-950/40 border border-slate-850">
                      <div>
                        <p className="font-mono text-[9px] uppercase tracking-wider text-rose-450/80">Inferior (Titik Rentan)</p>
                        <p className="font-display font-bold text-rose-300/80 mt-0.5">{results.mbtiStack.inferior}</p>
                      </div>
                      <span className="text-[10px] font-mono bg-rose-950/20 text-rose-400 px-1.5 py-0.5 rounded-md">4th</span>
                    </div>
                  </div>
                </div>

                {/* Shadows roles link */}
                <div className="mt-2 p-3 bg-rose-950/10 border border-rose-500/10 rounded-2xl text-[10px] leading-relaxed text-slate-400">
                  <span className="font-bold text-rose-400 uppercase font-mono text-[9px] tracking-wide block mb-1">Rasi Arsitektur Bayangan (Shadow):</span>
                  <p>
                    Saat Anda dipojokkan krisis, rasi bayangan menghadirkan <span className="text-slate-300 font-semibold">{results.mbtiStack.opposing}</span> sebagai tameng otonom, 
                    diikuti suara kejam <span className="text-slate-300 font-semibold">{results.mbtiStack.critical}</span>, trik perangkap <span className="text-slate-300 font-semibold">{results.mbtiStack.trickster}</span>, 
                    hingga bahaya pembersihan hubungan dari <span className="text-slate-300 font-semibold">{results.mbtiStack.demon}</span>.
                  </p>
                </div>
              </div>

              {/* SECTION: CLICKABLE CORE TYPOLOGY BENTO CARDS */}
              <div className="md:col-span-3 mt-2">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <h4 className="font-display font-semibold text-xs text-slate-300 uppercase tracking-widest">Detail Seluk-Beluk Rasi Utama</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                  
                  {/* Card 1: MBTI */}
                  <div
                    onClick={() => {
                      triggerTypologyDetail(
                        results.top3Mbti[0].type,
                        {},
                        `${results.top3Mbti[0].score?.toFixed(0) || "50"} pt`,
                        `Mental batin dominan menyerap informasi lewat fungsi ${results.mbtiStack.dominant} (1st) didukung aksi ${results.mbtiStack.auxiliary} (2nd).`
                      );
                    }}
                    className="p-4 bg-slate-900/40 border border-slate-800 hover:border-indigo-500/35 rounded-2xl cursor-pointer transition-all hover:bg-slate-900/80 group flex flex-col justify-between focus:outline-none"
                  >
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-mono text-indigo-400 uppercase tracking-widest font-bold">Rasi Karakter Utama</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
                      </div>
                      <p className="text-lg font-bold text-white mt-1.5 font-display">{results.top3Mbti[0].type}</p>
                      <p className="text-[10px] text-slate-400 mt-1 lines-clamp-2">
                        Pilar kesadaran kognitif kustom dengan Dominant {results.mbtiStack.dominant} dan Auxiliary {results.mbtiStack.auxiliary}.
                      </p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-850 flex justify-between text-[8px] font-mono text-indigo-300">
                      <span>RATING KESELARASAN</span>
                      <span className="font-bold">{results.top3Mbti[0].score?.toFixed(0) || "50"} Poin</span>
                    </div>
                  </div>

                  {/* Card 2: Enneagram */}
                  <div
                    onClick={() => {
                      const desc = SUBSCALE_EXPLANATIONS.enneagram?.[results.enneagram.primaryType];
                      triggerTypologyDetail(
                        results.enneagram.wing,
                        {
                          [results.enneagram.wing]: {
                            title: `Enneagram ${results.enneagram.wing} - ${enneagramInfo.title}`,
                            badge: "Sayap Motivasi Jiwa",
                            shortDesc: enneagramInfo.desc,
                            detailedDesc: desc?.desc || "Menggali arsitektur motivasi dasar yang menggerakkan hasrat dan penolakan terdalam diri Anda harian.",
                            strength: "Konsistensi energi perlindungan diri, sensitivitas kebenaran arah batin.",
                            vulnerability: "Rawan tersulut kecemasan buta batin saat ditekan ketakutan tersembunyi.",
                            advice: "Latihlah menghirup nafas kesadaran penuh saat dorongan motivasi buta ego mulai menuntut dominasi mutlak."
                          }
                        },
                        `${results.enneagram.score?.toFixed(0) || "50"} pt`,
                        desc?.stereotype || "Selaras dengan hasrat terdalam motivasi jiwa Anda."
                      );
                    }}
                    className="p-4 bg-slate-900/40 border border-slate-800 hover:border-indigo-500/35 rounded-2xl cursor-pointer transition-all hover:bg-slate-900/80 group flex flex-col justify-between focus:outline-none"
                  >
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-mono text-indigo-300 uppercase tracking-widest font-bold">Jiwa Enneagram</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
                      </div>
                      <p className="text-lg font-bold text-white mt-1.5 font-display">{results.enneagram.wing}</p>
                      <p className="text-[10px] text-slate-400 mt-1 lines-clamp-2">
                        {enneagramInfo.title}. Tritype: {results.enneagram.tritype}. Instinct: {results.enneagram.instinctualStack}.
                      </p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-850 flex justify-between text-[8px] font-mono text-indigo-300">
                      <span>KEKUATAN MOTIVASI</span>
                      <span className="font-bold">{results.enneagram.score?.toFixed(0) || "50"} Poin</span>
                    </div>
                  </div>

                  {/* Card 3: Attitudinal Psyche */}
                  <div
                    onClick={() => {
                      const detail = generateAPDetail(results.attitudinalPsyche?.type);
                      triggerTypologyDetail(
                        results.attitudinalPsyche?.type || "ELVF",
                        { [results.attitudinalPsyche?.type || "ELVF"]: detail },
                        "40 pt",
                        getStereotype(results.attitudinalPsyche?.type || "ELVF")
                      );
                    }}
                    className="p-4 bg-slate-900/40 border border-slate-800 hover:border-indigo-500/35 rounded-2xl cursor-pointer transition-all hover:bg-slate-900/80 group flex flex-col justify-between focus:outline-none"
                  >
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-mono text-indigo-400 uppercase tracking-widest font-bold">Attitudinal Psyche</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
                      </div>
                      <p className="text-lg font-bold text-white mt-1.5 font-display">{results.attitudinalPsyche?.type || "ELVF"}</p>
                      <p className="text-[10px] text-slate-400 mt-1 lines-clamp-2">
                        Sikap mental terhadap Logic ({results.attitudinalPsyche?.L}), Emotion ({results.attitudinalPsyche?.E}), Physics ({results.attitudinalPsyche?.F}), dan Volition ({results.attitudinalPsyche?.V}).
                      </p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-850 flex justify-between text-[8px] font-mono text-indigo-300">
                      <span>RASI SIKAP MENTAL</span>
                      <span className="font-bold">AKTIF</span>
                    </div>
                  </div>

                  {/* Card 4: Core Fear */}
                  <div
                    onClick={() => {
                      const detail = getCoreFearDetail(results.coreFear);
                      triggerTypologyDetail(
                        results.coreFear,
                        { [results.coreFear]: detail },
                        "45 pt",
                        getStereotype(results.coreFear)
                      );
                    }}
                    className="p-4 bg-slate-900/40 border border-slate-800 hover:border-indigo-500/35 rounded-2xl cursor-pointer transition-all hover:bg-slate-900/80 group flex flex-col justify-between focus:outline-none"
                  >
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-mono text-indigo-400 uppercase tracking-widest font-bold">Bintang Gerhana (Core Fear)</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
                      </div>
                      <p className="text-lg font-bold text-rose-350 mt-1.5 font-display truncate">{results.coreFear.split(" (")[0]}</p>
                      <p className="text-[10px] text-slate-400 mt-1 lines-clamp-2">
                        Ketakutan batin paling purba yang diam-diam membelenggu kebebasan gerak ekspresi diri Anda.
                      </p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-850 flex justify-between text-[8px] font-mono text-rose-450/80">
                      <span>KEWASPADAAN BATIN</span>
                      <span className="font-bold">SANGAT TINGGI</span>
                    </div>
                  </div>

                </div>
              </div>
            </>
          )}

          {/* TAB 2: SPEKTRUM KUTUB KOGNITIF & INTERPERSONAL */}
          {activeTab === "perilaku" && (
            <>
              {/* MBTI AXIS DICHOTOMY CONTRAST PANEL */}
              <div className="backdrop-blur-md bg-slate-900/15 border border-slate-800/80 rounded-3xl p-6 flex flex-col gap-5 justify-between md:col-span-2">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
                  <Compass className="w-5 h-5 text-indigo-400" />
                  <h3 className="font-display font-semibold text-white tracking-wide">Spektrum Kutub Kognitif</h3>
                </div>

                <div className="space-y-5 py-2">
                  {/* I vs E */}
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between font-mono text-[10px] uppercase text-indigo-300">
                      <span>Introversi (I): {results.mbtiDichotomy.I_E}%</span>
                      <span>Ekstraversi (E): {100 - results.mbtiDichotomy.I_E}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden flex">
                      <div className="h-full bg-indigo-500" style={{ width: `${results.mbtiDichotomy.I_E}%` }} />
                      <div className="h-full bg-slate-800" style={{ width: `${100 - results.mbtiDichotomy.I_E}%` }} />
                    </div>
                    <p className="text-[10px] text-slate-400 select-none pt-0.5 leading-normal">
                      Kutub rasi mengarah ke: <span className="text-indigo-200 font-semibold">{getDichotomyLabelValue("IE", results.mbtiDichotomy.I_E)}</span>.
                    </p>
                  </div>

                  {/* S vs N */}
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between font-mono text-[10px] uppercase text-emerald-300">
                      <span>Intuitif (N): {results.mbtiDichotomy.S_N}%</span>
                      <span>Sensoris (S): {100 - results.mbtiDichotomy.S_N}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden flex">
                      <div className="h-full bg-emerald-500" style={{ width: `${results.mbtiDichotomy.S_N}%` }} />
                      <div className="h-full bg-slate-800" style={{ width: `${100 - results.mbtiDichotomy.S_N}%` }} />
                    </div>
                    <p className="text-[10px] text-slate-400 select-none pt-0.5 leading-normal">
                      Kutub rasi mengarah ke: <span className="text-emerald-200 font-semibold">{getDichotomyLabelValue("SN", results.mbtiDichotomy.S_N)}</span>.
                    </p>
                  </div>

                  {/* T vs F */}
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between font-mono text-[10px] uppercase text-amber-300">
                      <span>Logika & Struktur (T): {results.mbtiDichotomy.T_F}%</span>
                      <span>Nilai & Simpati (F): {100 - results.mbtiDichotomy.T_F}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden flex">
                      <div className="h-full bg-amber-500" style={{ width: `${results.mbtiDichotomy.T_F}%` }} />
                      <div className="h-full bg-slate-800" style={{ width: `${100 - results.mbtiDichotomy.T_F}%` }} />
                    </div>
                    <p className="text-[10px] text-slate-400 select-none pt-0.5 leading-normal">
                      Kutub rasi mengarah ke: <span className="text-amber-200 font-semibold">{getDichotomyLabelValue("TF", results.mbtiDichotomy.T_F)}</span>.
                    </p>
                  </div>

                  {/* J vs P */}
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between font-mono text-[10px] uppercase text-rose-300">
                      <span>Kepatuhan Rencana (J): {results.mbtiDichotomy.J_P}%</span>
                      <span>Fleksibilitas Spontan (P): {100 - results.mbtiDichotomy.J_P}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden flex">
                      <div className="h-full bg-rose-500" style={{ width: `${results.mbtiDichotomy.J_P}%` }} />
                      <div className="h-full bg-slate-800" style={{ width: `${100 - results.mbtiDichotomy.J_P}%` }} />
                    </div>
                    <p className="text-[10px] text-slate-400 select-none pt-0.5 leading-normal">
                      Kutub rasi mengarah ke: <span className="text-rose-200 font-semibold">{getDichotomyLabelValue("JP", results.mbtiDichotomy.J_P)}</span>.
                    </p>
                  </div>
                </div>

                {/* Additional metrics info */}
                <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-800 text-[10px] font-mono text-slate-400">
                  <div>Model Socionics: <span className="text-indigo-300 font-bold">{results.socionicsEstimate}</span></div>
                  <div>Grup Quadra: <span className="text-emerald-300 font-bold">{results.quadraTendency}</span></div>
                </div>
              </div>

              {/* CORE ENNEAGRAM AND TRITYPE BANNER */}
              <div className="backdrop-blur-md bg-slate-900/15 border border-slate-800/80 rounded-3xl p-6 flex flex-col gap-4">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
                  <Award className="w-5 h-5 text-rose-400" />
                  <h3 className="font-display font-semibold text-white tracking-wide">Jiwa Enneagram & Tritype</h3>
                </div>

                <div className="text-center bg-slate-950/40 p-5 rounded-2xl border border-rose-500/10">
                  <span className="text-[10px] font-mono tracking-widest text-slate-405 uppercase">Arah Rasi Utama</span>
                  <p className="text-4xl font-display font-bold text-rose-300 mt-1">{results.enneagram.wing}</p>
                  <p className="text-xs font-display font-semibold text-white tracking-wider mt-2 uppercase">{enneagramInfo.title}</p>
                </div>

                <div className="space-y-3 pt-1 text-xs leading-relaxed text-slate-300">
                  <div className="flex justify-between items-center p-2 rounded-xl bg-slate-950/40 border border-slate-850">
                    <span className="text-slate-400 font-mono text-[10px] uppercase">Stacking Naluri:</span>
                    <span className="text-white font-mono font-bold tracking-wider">{results.enneagram.instinctualStack}</span>
                  </div>

                  <div className="flex justify-between items-center p-2 rounded-xl bg-slate-950/40 border border-slate-850">
                    <span className="text-slate-400 font-mono text-[10px] uppercase">Tritype Model:</span>
                    <span className="text-white font-mono font-bold tracking-wider">{results.enneagram.tritype}</span>
                  </div>
                </div>

                <p className="text-[10px] text-slate-400 leading-relaxed mt-1 p-3 bg-rose-950/10 border border-rose-500/5 rounded-2xl">
                  💡 <span className="font-bold text-rose-400 font-display">Pantulan Jiwa:</span> {enneagramInfo.desc}
                </p>
              </div>

              {/* 8 INTERPERSONAL & BEHAVIORAL BENTO CARDS */}
              <div className="md:col-span-3 mt-4">
                <div className="flex items-center gap-2 mb-3">
                  <Heart className="w-4 h-4 text-emerald-400" />
                  <h4 className="font-display font-semibold text-xs text-indigo-300 uppercase tracking-widest">Kompas Perilaku & Interpersonal</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                  
                  {/* Card 1: Attachment */}
                  <div 
                    onClick={() => triggerTypologyDetail(results.relationshipTendency, RELATIONSHIP_DESCRIPTIONS, "33 pt")}
                    className="p-4 bg-slate-900/40 border border-slate-800 hover:border-indigo-500/35 rounded-2xl cursor-pointer transition-all hover:bg-slate-900/85 group flex flex-col justify-between focus:outline-none"
                  >
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="text-[8px] font-mono text-indigo-400 uppercase tracking-wider font-bold">Attachment</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
                      </div>
                      <p className="text-sm font-bold text-white mt-2 font-display">{results.relationshipTendency.split(" (")[0]}</p>
                      <p className="text-[10px] text-slate-450 mt-1.5 leading-relaxed line-clamp-2">
                        {RELATIONSHIP_DESCRIPTIONS[results.relationshipTendency]?.shortDesc || "Mengukur cara Anda menjalin kedekatan emosional dan batas privat."}
                      </p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-850 flex justify-between text-[8px] font-mono text-indigo-400">
                      <span>RATING POIN</span>
                      <span className="font-bold">33 Poin</span>
                    </div>
                  </div>

                  {/* Card 2: Stress Response */}
                  <div 
                    onClick={() => triggerTypologyDetail(results.stressResponse, STRESS_DESCRIPTIONS, "36 pt")}
                    className="p-4 bg-slate-900/40 border border-slate-800 hover:border-indigo-500/35 rounded-2xl cursor-pointer transition-all hover:bg-slate-900/85 group flex flex-col justify-between focus:outline-none"
                  >
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="text-[8px] font-mono text-rose-400 uppercase tracking-wider font-bold">Respon Stres</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-rose-400 group-hover:translate-x-0.5 transition-all" />
                      </div>
                      <p className="text-sm font-bold text-rose-300 mt-2 font-display">{results.stressResponse.split(" (")[0]}</p>
                      <p className="text-[10px] text-slate-455 mt-1.5 leading-relaxed line-clamp-2">
                        {STRESS_DESCRIPTIONS[results.stressResponse]?.shortDesc || "Mengukur aksi saraf otonom saat ditekan krisis."}
                      </p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-850 flex justify-between text-[8px] font-mono text-rose-450/80">
                      <span>RATING POIN</span>
                      <span className="font-bold">36 Poin</span>
                    </div>
                  </div>

                  {/* Card 3: Conflict Style */}
                  <div 
                    onClick={() => triggerTypologyDetail(results.conflictStyle, CONFLICT_DESCRIPTIONS, "30 pt")}
                    className="p-4 bg-slate-900/40 border border-slate-800 hover:border-indigo-500/35 rounded-2xl cursor-pointer transition-all hover:bg-slate-900/85 group flex flex-col justify-between focus:outline-none"
                  >
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="text-[8px] font-mono text-indigo-400 uppercase tracking-wider font-bold">Gaya Konflik</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
                      </div>
                      <p className="text-sm font-bold text-white mt-2 font-display">{results.conflictStyle.split(" (")[0]}</p>
                      <p className="text-[10px] text-slate-450 mt-1.5 leading-relaxed line-clamp-2">
                        {CONFLICT_DESCRIPTIONS[results.conflictStyle]?.shortDesc || "Bagaimana Anda mempertahankan ego atau berkompromi dalam perselisihan."}
                      </p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-850 flex justify-between text-[8px] font-mono text-indigo-400">
                      <span>RATING POIN</span>
                      <span className="font-bold">30 Poin</span>
                    </div>
                  </div>

                  {/* Card 4: Defense Mechanism */}
                  <div 
                    onClick={() => triggerTypologyDetail(results.defensePattern, DEFENSE_DESCRIPTIONS, "35 pt")}
                    className="p-4 bg-slate-900/40 border border-slate-800 hover:border-indigo-500/35 rounded-2xl cursor-pointer transition-all hover:bg-slate-900/85 group flex flex-col justify-between focus:outline-none"
                  >
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="text-[8px] font-mono text-indigo-400 uppercase tracking-wider font-bold">Defense Mechanism</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
                      </div>
                      <p className="text-sm font-bold text-white mt-2 font-display">{results.defensePattern.split(" (")[0]}</p>
                      <p className="text-[10px] text-slate-455 mt-1.5 leading-relaxed line-clamp-2">
                        {DEFENSE_DESCRIPTIONS[results.defensePattern]?.shortDesc || "Saringan penenang batin psikologis dari luka hantaman luar."}
                      </p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-850 flex justify-between text-[8px] font-mono text-indigo-400">
                      <span>RATING POIN</span>
                      <span className="font-bold">35 Poin</span>
                    </div>
                  </div>

                  {/* Card 5: Decision Style */}
                  <div 
                    onClick={() => triggerTypologyDetail(results.decisionStyle, DECISION_DESCRIPTIONS, "30 pt")}
                    className="p-4 bg-slate-900/40 border border-slate-800 hover:border-indigo-500/35 rounded-2xl cursor-pointer transition-all hover:bg-slate-900/85 group flex flex-col justify-between focus:outline-none"
                  >
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="text-[8px] font-mono text-indigo-400 uppercase tracking-wider font-bold">Gaya Memutuskan</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
                      </div>
                      <p className="text-sm font-bold text-white mt-2 font-display">{results.decisionStyle.split(" (")[0]}</p>
                      <p className="text-[10px] text-slate-455 mt-1.5 leading-relaxed line-clamp-2">
                        {DECISION_DESCRIPTIONS[results.decisionStyle]?.shortDesc || "Formula taktis pemetaan opsi dan penentuan langkah."}
                      </p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-850 flex justify-between text-[8px] font-mono text-indigo-400">
                      <span>RATING POIN</span>
                      <span className="font-bold">30 Poin</span>
                    </div>
                  </div>

                  {/* Card 6: Moral Style */}
                  <div 
                    onClick={() => triggerTypologyDetail(results.moralStyle, MORAL_DESCRIPTIONS, "39 pt")}
                    className="p-4 bg-slate-900/40 border border-slate-800 hover:border-indigo-500/35 rounded-2xl cursor-pointer transition-all hover:bg-slate-900/85 group flex flex-col justify-between focus:outline-none"
                  >
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="text-[8px] font-mono text-indigo-400 uppercase tracking-wider font-bold">Integritas Moral</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
                      </div>
                      <p className="text-sm font-bold text-white mt-2 font-display">{results.moralStyle.split(" (")[0]}</p>
                      <p className="text-[10px] text-slate-455 mt-1.5 leading-relaxed line-clamp-2">
                        {MORAL_DESCRIPTIONS[results.moralStyle]?.shortDesc || "Kompas nilai ketulusan dan integritas hidup bersosialisasi."}
                      </p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-850 flex justify-between text-[8px] font-mono text-indigo-400">
                      <span>RATING POIN</span>
                      <span className="font-bold">39 Poin</span>
                    </div>
                  </div>

                  {/* Card 7: Communication Style */}
                  <div 
                    onClick={() => triggerTypologyDetail(results.communicationStyle, COMMUNICATION_DESCRIPTIONS, "36 pt")}
                    className="p-4 bg-slate-900/40 border border-slate-800 hover:border-indigo-500/35 rounded-2xl cursor-pointer transition-all hover:bg-slate-900/85 group flex flex-col justify-between focus:outline-none"
                  >
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="text-[8px] font-mono text-indigo-400 uppercase tracking-wider font-bold">Gaya Komunikasi</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
                      </div>
                      <p className="text-sm font-bold text-white mt-2 font-display">{results.communicationStyle.split(" (")[0]}</p>
                      <p className="text-[10px] text-slate-455 mt-1.5 leading-relaxed line-clamp-2">
                        {COMMUNICATION_DESCRIPTIONS[results.communicationStyle]?.shortDesc || "Mengukur ritme asertif, ekspresi linguistik batin Anda."}
                      </p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-850 flex justify-between text-[8px] font-mono text-indigo-400">
                      <span>RATING POIN</span>
                      <span className="font-bold">36 Poin</span>
                    </div>
                  </div>

                  {/* Card 8: Love Style */}
                  <div 
                    onClick={() => {
                      const detail = getLoveStyleDetail(results.preferredLoveStyle);
                      triggerTypologyDetail(
                        results.preferredLoveStyle, 
                        { [results.preferredLoveStyle]: detail }, 
                        "48 pt"
                      );
                    }}
                    className="p-4 bg-slate-900/40 border border-slate-800 hover:border-indigo-500/35 rounded-2xl cursor-pointer transition-all hover:bg-slate-900/85 group flex flex-col justify-between focus:outline-none"
                  >
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="text-[8px] font-mono text-emerald-400 uppercase tracking-wider font-bold">Seni Afeksi (Love Style)</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
                      </div>
                      <p className="text-sm font-bold text-white mt-2 font-display">{results.preferredLoveStyle.split(" (")[0]}</p>
                      <p className="text-[10px] text-slate-455 mt-1.5 leading-relaxed line-clamp-2">
                        Sensasi afeksi paling subur yang dapat menyembuhkan dan mengisi ulang baterai batin Anda.
                      </p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-850 flex justify-between text-[8px] font-mono text-emerald-400">
                      <span>RATING POIN</span>
                      <span className="font-bold">48 Poin</span>
                    </div>
                  </div>

                </div>

                {/* Love and Partner narration box */}
                <div className="p-4 bg-emerald-950/10 border border-emerald-500/10 rounded-2xl text-[11px] leading-relaxed text-slate-300 mt-5">
                  <span className="font-bold text-emerald-400 font-display">Ruang Afeksi & Pemulihan Seimbang:</span>
                  <p className="mt-1">
                    Anda paling subur memercikkan kebaikan saat menerima ekspresi kasih <span className="font-semibold text-white">{results.preferredLoveStyle}</span>, 
                    paling selaras tumbuh mendampingi partner berjiwa <span className="font-semibold text-white">{results.idealPartnerTendency}</span>, 
                    serta kembali melaraskan energi batin di dalam lingkungan <span className="font-semibold text-white">{results.preferredEnvironment}</span>.
                  </p>
                </div>
              </div>
            </>
          )}

          {/* TAB 3: EKOSISTEM KINERJA & KARIR */}
          {activeTab === "ekosistem" && (
            <>
              {/* INTERACTIVE RIASEC INTEREST ORBIT CARD */}
              <div className="backdrop-blur-md bg-slate-900/15 border border-slate-800/80 rounded-3xl p-6 flex flex-col gap-5 justify-between md:col-span-2 shadow-2xl">
                <div>
                  <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
                    <Compass className="w-5 h-5 text-emerald-400" />
                    <h3 className="font-display font-semibold text-white tracking-wide">Peta Minat Karir & Vokasi (Holland RIASEC)</h3>
                  </div>
                  <p className="text-[11px] text-slate-405 leading-normal mt-2">
                    Skor minat Holland RIASEC mengukur arah keselarasan profesi ideal. Klik pada baris minat untuk mendedah rahasia tipe dan saran batin karirnya.
                  </p>
                </div>

                <div className="space-y-4 py-2">
                  {results.riasec.map((item) => {
                    const percent = Math.min(100, Math.max(8, (item.score / 50) * 100));
                    const colors: Record<string, string> = {
                      Realistic: "bg-amber-500",
                      Investigative: "bg-indigo-500",
                      Artistic: "bg-rose-500",
                      Social: "bg-emerald-500",
                      Enterprising: "bg-orange-500",
                      Conventional: "bg-slate-400"
                    };
                    const colorClass = colors[item.interest] || "bg-indigo-500";
                    return (
                      <div 
                        key={item.interest} 
                        onClick={() => {
                          const rDetail = getRIASECDetail(item.interest);
                          triggerTypologyDetail(
                            item.interest, 
                            { [item.interest]: rDetail }, 
                            `${item.score.toFixed(0)} pt`,
                            getStereotype(item.interest)
                          );
                        }}
                        className="space-y-1 p-2.5 rounded-xl bg-slate-950/45 border border-slate-850 hover:border-indigo-500/25 hover:bg-slate-950/80 transition-all cursor-pointer group select-none"
                      >
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-semibold text-slate-200 group-hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                            {item.interest}
                            <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
                          </span>
                          <span className="font-mono text-[10px] text-indigo-400 font-bold bg-indigo-950/30 px-1.5 py-0.5 rounded border border-indigo-900/10">
                            {item.score.toFixed(0)} pt
                          </span>
                        </div>
                        <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden">
                          <div className={`h-full ${colorClass} rounded-full transition-all`} style={{ width: `${percent}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* OPERATIONAL SATELLITES PANEL */}
              <div className="backdrop-blur-md bg-slate-900/15 border border-slate-800/80 rounded-3xl p-6 flex flex-col gap-4 justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
                    <Smile className="w-5 h-5 text-indigo-400" />
                    <h3 className="font-display font-semibold text-white tracking-wide">Analisis Gaya Kinerja & Nilai</h3>
                  </div>

                  <p className="text-[11px] text-slate-405 leading-relaxed">
                    Arsitektur praktis bagaimana Anda menggerakkan aksi tugas harian dan nilai penuntun teratas hidup:
                  </p>

                  <div className="space-y-3">
                    
                    {/* Work Style Clickable Card */}
                    <div 
                      onClick={() => {
                        triggerTypologyDetail(
                          results.workStyle, 
                          {}, 
                          "44 pt", 
                          getStereotype(results.workStyle)
                        );
                      }}
                      className="backdrop-blur-md bg-slate-950/40 border border-slate-850 p-4 rounded-2xl hover:border-indigo-500/20 hover:bg-slate-950/80 transition-all cursor-pointer group"
                    >
                      <div className="flex justify-between items-center text-[9px] font-mono text-slate-450 uppercase font-bold">
                        <span>Gaya Kinerja Terkuat</span>
                        <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
                      </div>
                      <p className="text-xs font-display font-bold text-white mt-1 leading-snug group-hover:text-indigo-300 transition-colors">{results.workStyle}</p>
                    </div>

                    {/* Learning Style Clickable Card */}
                    <div 
                      onClick={() => {
                        triggerTypologyDetail(
                          results.learningStyle, 
                          {}, 
                          "38 pt", 
                          getStereotype(results.learningStyle)
                        );
                      }}
                      className="backdrop-blur-md bg-slate-950/40 border border-slate-850 p-4 rounded-2xl hover:border-indigo-500/20 hover:bg-slate-950/80 transition-all cursor-pointer group"
                    >
                      <div className="flex justify-between items-center text-[9px] font-mono text-slate-450 uppercase font-bold font-bold">
                        <span>Gaya Belajar Efektif</span>
                        <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
                      </div>
                      <p className="text-xs font-display font-bold text-white mt-1 leading-snug group-hover:text-indigo-300 transition-colors">{results.learningStyle}</p>
                    </div>

                    {/* Temperament Clickable Card */}
                    <div 
                      onClick={() => {
                        triggerTypologyDetail(
                          results.temperament.primary, 
                          {}, 
                          `${results.temperament.scorePrimary.toFixed(0)}%`, 
                          getStereotype(results.temperament.primary)
                        );
                      }}
                      className="backdrop-blur-md bg-slate-950/40 border border-slate-850 p-4 rounded-2xl hover:border-indigo-500/20 hover:bg-slate-950/80 transition-all cursor-pointer group"
                    >
                      <div className="flex justify-between items-center text-[9px] font-mono text-slate-450 uppercase font-bold">
                        <span>Karakter Temperament Klasik Urutan 1</span>
                        <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
                      </div>
                      <p className="text-xs font-display font-bold text-indigo-300 mt-1 uppercase leading-snug group-hover:text-indigo-200 transition-colors">
                        {results.temperament.primary} - {results.temperament.secondary} ({results.temperament.scorePrimary.toFixed(0)}%)
                      </p>
                    </div>

                  </div>
                </div>

                {/* Values Satellites mini section */}
                <div 
                  onClick={() => {
                    const top3 = results.valuesRanking.slice(0, 3).map((v, i) => `${i + 1}. ${v.charAt(0).toUpperCase() + v.slice(1)}`).join("\n");
                    triggerTypologyDetail(
                      "Gugusan Nilai Teratas",
                      {
                        "Gugusan Nilai Teratas": {
                          title: "Gugusan Nilai Teratas",
                          badge: "Satelit Integritas Hidup",
                          shortDesc: "Tiga nilai hidup fundamental paling bertenaga yang mengunci arah kemudi tindakan.",
                          detailedDesc: `Secara berurutan, prioritas pilar integritas Anda dituntun oleh:\n\n${top3}\n\nNilai-nilai ini menjadi jangkar tegar penyusun rasa aman & kelayakan eksistensi Anda.`,
                          strength: "Kemandirian prinsip ekstrem, integritas lurus, daya tahan tinggi terhadap penyetiran luar.",
                          vulnerability: "Rawan mengalami stres moral akut jika berada di ekosistem kerja toxic.",
                          advice: "Gunakan kemudi nilai ini sebagai jangkar sejati, bertoleransilah sewajarnya tanpa perlu mengorbankan damai nurani."
                        }
                      },
                      "45 pt",
                      "Integritas hidup nomor satu, mending diasingkan daripada mengorbankan kompas nilai orisinil batin gue."
                    );
                  }}
                  className="backdrop-blur-md bg-slate-950/20 border border-slate-850 hover:border-indigo-500/30 hover:bg-slate-950/60 transition-all p-3.5 rounded-2xl mt-2 cursor-pointer group"
                >
                  <p className="text-[9px] font-mono text-emerald-450 uppercase tracking-wider font-bold mb-1.5 pb-1.5 border-b border-indigo-950/60 flex justify-between items-center">
                    <span>Gugusan Nilai Teratas</span>
                    <ChevronRight className="w-3 h-3 text-slate-650 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {results.valuesRanking.slice(0, 3).map((val, idx) => {
                      const capped = val.charAt(0).toUpperCase() + val.slice(1);
                      return (
                        <span key={val} className="text-[9px] font-sans font-semibold bg-slate-900 border border-slate-800 text-slate-300 px-2.5 py-1 rounded-full group-hover:text-white transition-colors">
                          {idx + 1}. {capped}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          )}

        </div>

        {/* BOTTOM VALIDITY CONFIDENCE AREA */}
        <div className="backdrop-blur-md bg-slate-900/40 border border-slate-800 rounded-3xl p-6 text-left flex flex-col md:flex-row items-start md:items-center gap-6 justify-between mt-4">
          <div className="flex gap-4 items-start max-w-2xl text-xs sm:text-sm">
            <ShieldAlert className="w-8 h-8 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-display font-bold text-white text-base">Tingkat Keandalan Sinyal (Confidence)</p>
              <div className="flex items-center gap-2 mt-1 select-none">
                <span className="text-[10px] font-mono bg-indigo-950 text-indigo-305 px-2 py-0.5 rounded-md border border-indigo-500/10 uppercase font-bold text-indigo-300">
                  {results.confidence.category}
                </span>
                <span className="text-slate-400 font-mono text-[10px]">Skor Validitas: {results.confidence.score}%</span>
              </div>
              <ul className="list-disc list-inside mt-2 text-[10px] sm:text-xs text-slate-400 space-y-1 pl-1 leading-relaxed">
                {results.confidence.notes.map((note, idx) => (
                  <li key={idx}>{note}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2 shrink-0 w-full md:w-auto">
            <p className="text-[9px] font-mono text-slate-500 uppercase select-none tracking-wider font-bold">Rasi Diri Core Engine v2.5.0</p>
            <p className="text-[10px] text-slate-400 text-center md:text-right font-sans leading-normal max-w-xs select-none">
              Integritas data dijamin melalui andil analisis modular matematis secara lurus lokal tanpa sensor.
            </p>
          </div>
        </div>

      </div>

      {/* TYPOLOGY EXPLANATORY OVERLAY MODAL */}
      <AnimatePresence>
        {selectedTypology && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4"
          >
            {/* Modal Body Container */}
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="max-w-2xl w-full backdrop-blur-xl bg-slate-900/90 border border-indigo-500/20 rounded-3xl p-6 sm:p-8 flex flex-col gap-5 shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <div className="flex justify-between items-start border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-mono font-bold tracking-widest text-indigo-400 bg-indigo-950/60 border border-indigo-500/10 px-2.5 py-1 rounded-full uppercase">
                      {selectedTypology.badge}
                    </span>
                    {selectedPoints && (
                      <span className="text-[9px] font-mono font-bold tracking-widest text-emerald-400 bg-emerald-950/60 border border-emerald-500/10 px-2.5 py-1 rounded-full uppercase">
                        Skor: {selectedPoints}
                      </span>
                    )}
                  </div>
                  <h3 className="font-display font-bold text-2xl text-white tracking-wide mt-2">{selectedTypology.title}</h3>
                </div>
                <button 
                  onClick={() => setSelectedTypology(null)}
                  className="p-1.5 bg-slate-800 hover:bg-slate-750 text-slate-400 hover:text-white rounded-lg transition-all cursor-pointer focus:outline-none"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Descriptions block */}
              <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed text-left">
                <p className="font-semibold text-white text-sm sm:text-base leading-normal">{selectedTypology.shortDesc}</p>
                
                {selectedStereotype && (
                  <div className="p-4 bg-indigo-950/30 border border-indigo-500/20 rounded-2xl relative overflow-hidden select-none">
                    <span className="font-mono text-[9px] font-bold text-indigo-400 uppercase tracking-widest block mb-1">
                      Stereotip Riil Kuat (&ldquo;Ini Gue Banget&rdquo;)
                    </span>
                    <p className="text-xs sm:text-sm text-indigo-200 font-display italic leading-relaxed">
                      &ldquo;{selectedStereotype}&rdquo;
                    </p>
                  </div>
                )}

                <p className="text-slate-400 leading-relaxed">{selectedTypology.detailedDesc}</p>

                {/* Strength / Vulnerability 2 Column block */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
                  <div className="p-4 bg-emerald-950/10 border border-emerald-500/10 rounded-2xl">
                    <span className="font-mono text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                      <CheckCircle className="w-3.5 h-3.5" /> Kekuatan Utama
                    </span>
                    <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed">{selectedTypology.strength}</p>
                  </div>

                  <div className="p-4 bg-amber-950/10 border border-amber-500/10 rounded-2xl">
                    <span className="font-mono text-[10px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" /> Titik Kerentanan
                    </span>
                    <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed">{selectedTypology.vulnerability}</p>
                  </div>
                </div>

                {/* Advice block with glowing lightbulb */}
                <div className="p-4 bg-indigo-950/15 border border-indigo-500/10 rounded-2xl flex gap-3 items-start mt-1">
                  <div className="w-8 h-8 rounded-full bg-indigo-950/50 flex items-center justify-center border border-indigo-500/10 text-indigo-400 shrink-0 mt-0.5">
                    <Sparkle className="w-4 h-4 text-indigo-300" />
                  </div>
                  <div>
                    <span className="font-display font-bold text-white text-xs sm:text-sm block">Saran Penyelarasan Batin</span>
                    <p className="text-[11px] sm:text-xs text-slate-300 mt-1 leading-relaxed">{selectedTypology.advice}</p>
                  </div>
                </div>
              </div>

              {/* Close Button footer bar */}
              <button
                onClick={() => setSelectedTypology(null)}
                className="w-full mt-2 py-3 font-display font-semibold text-xs uppercase tracking-widest text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-750 rounded-xl transition-all cursor-pointer focus:outline-none"
              >
                Tutup Analisis
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* INSTAGRAM STORY EXPORTER DIALOG OVERLAY */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 text-center flex flex-col gap-4 shadow-2xl relative"
            >
              <button 
                onClick={() => setShowShareModal(false)}
                className="absolute top-4 right-4 p-1.5 bg-slate-800 text-slate-400 hover:text-white rounded-lg cursor-pointer focus:outline-none"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 bg-indigo-950/50 border border-indigo-500/20 text-indigo-400 rounded-full flex items-center justify-center">
                  <Share2 className="w-4 h-4" />
                </div>
                <h3 className="font-display font-bold text-lg text-white">Bagikan Rasi ke IG Story</h3>
                <p className="text-[11px] text-slate-400 max-w-xs mt-0.5 leading-relaxed">
                  Gunakan panel kognitif resolusi tinggi yang kami rakit di bawah ini untuk menjadi latar belakang Instagram Story Anda.
                </p>
              </div>

              {/* 9:16 Preview Card Box */}
              <div className="relative aspect-[9/16] w-[210px] mx-auto border border-slate-800 rounded-2xl overflow-hidden shadow-lg bg-slate-950">
                {isGeneratingStory ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-slate-950/80">
                    <Brain className="w-8 h-8 text-indigo-400 animate-pulse" />
                    <p className="text-[10px] font-mono text-slate-400">Merajut Rasi Keindahan...</p>
                  </div>
                ) : (
                  storyImageSrc && (
                    <img 
                      src={storyImageSrc} 
                      alt="Pratinjau IG Story" 
                      className="w-full h-full object-cover select-none" 
                      referrerPolicy="no-referrer"
                    />
                  )
                )}
              </div>

              {/* Hidden Working Graphic Canvas */}
              <canvas ref={storyCanvasRef} className="hidden" />

              {/* CTA Action Buttons and Instructions */}
              <div className="space-y-2 mt-2">
                {!isGeneratingStory && storyImageSrc ? (
                  <a
                    href={storyImageSrc}
                    download={`Rasi_Diri_${results.top3Mbti[0].type}_${results.enneagram.wing}_IG_Story.png`}
                    className="w-full py-3 font-display font-bold text-xs uppercase tracking-widest text-center text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all cursor-pointer shadow-lg shadow-indigo-500/10 flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Unduh Gambar (PNG)
                  </a>
                ) : (
                  <button
                    disabled
                    className="w-full py-3 font-display font-bold text-xs uppercase tracking-widest text-slate-500 bg-slate-800 rounded-xl flex items-center justify-center gap-2"
                  >
                    Menggambar...
                  </button>
                )}
                <p className="text-[9px] font-mono text-slate-500 leading-normal">
                  *Setelah mengunduh, unggah file PNG ini sebagai foto latar di Instagram Story Anda.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
