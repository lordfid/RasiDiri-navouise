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
  DEFENSE_DESCRIPTIONS
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
  const [activeTab, setActiveTab] = useState<"cahaya" | "perilaku" | "ekosistem" | "metrik">("cahaya");
  const [auditReport] = useState<AuditReport>(() => auditScoring());
  
  // Interactive Explanation States
  const [selectedTypology, setSelectedTypology] = useState<TypologyDetail | null>(null);
  
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

  const triggerTypologyDetail = (styleString: string, typeSource: Record<string, TypologyDetail>) => {
    const detail = typeSource[styleString];
    if (detail) {
      setSelectedTypology(detail);
    } else {
      // Fallback fallback detail
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

        {/* BENTO VIEW TABS SELECTOR - Responsive layout including Metrik Poin */}
        <div className="flex flex-wrap sm:flex-nowrap gap-1.5 p-1 bg-slate-900/60 border border-slate-800 rounded-2xl w-full max-w-xl mx-auto justify-center select-none">
          {[
            { id: "cahaya", label: "Cahaya Utama", icon: Sparkles },
            { id: "perilaku", label: "Kutub Kognitif", icon: SlidersHorizontal },
            { id: "ekosistem", label: "Kompas Perilaku", icon: BookOpen },
            { id: "metrik", label: "Metrik Poin", icon: Layers }
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
          <span>Klik tanda panah atau nama tipologi untuk mendedah analisis lengkap & saran batin.</span>
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
            </>
          )}

          {/* TAB 2: SPEKTRUM KUTUB KOGNITIF */}
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
                  <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">Arah Rasi Utama</span>
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
            </>
          )}

          {/* TAB 3: KOMPAS PERILAKU & EKOSISTEM */}
          {activeTab === "ekosistem" && (
            <>
              {/* PRIMARY INTERPERSONAL COMPASS - DARI AUDIT MEMBUAT MEREKA BISA KLIKS */}
              <div className="backdrop-blur-md bg-slate-900/15 border border-slate-800/80 rounded-3xl p-6 flex flex-col gap-4 md:col-span-2 shadow-2xl">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
                  <Heart className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-display font-semibold text-white tracking-wide">Peta Kompas Perilaku & Interpersonal</h3>
                </div>

                {/* GRID OF CLICKABLE TYPOLOGY CARD ITEMS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  
                  {/* Attachment Leaning Card (Avoidant, Secure, Anxious etc) */}
                  <div 
                    onClick={() => triggerTypologyDetail(results.relationshipTendency, RELATIONSHIP_DESCRIPTIONS)}
                    className="p-4 bg-slate-950/45 border border-slate-850 hover:border-indigo-500/35 rounded-2xl cursor-pointer transition-all hover:bg-slate-900/40 group flex flex-col justify-between gap-3 focus:outline-none"
                  >
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-mono text-indigo-400 uppercase tracking-widest font-bold">Gaya Hubungan (Attachment)</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
                      </div>
                      <p className="text-sm font-semibold text-white mt-2 font-display">{results.relationshipTendency.split(" (")[0]}</p>
                      <p className="text-[10px] text-slate-400 mt-1.5 leading-relaxed line-clamp-2">
                        {RELATIONSHIP_DESCRIPTIONS[results.relationshipTendency]?.shortDesc || "Mengukur cara Anda menjalin kedekatan emosional dan batas privat."}
                      </p>
                    </div>
                  </div>

                  {/* Stress Response Card */}
                  <div 
                    onClick={() => triggerTypologyDetail(results.stressResponse, STRESS_DESCRIPTIONS)}
                    className="p-4 bg-slate-950/45 border border-slate-850 hover:border-indigo-500/35 rounded-2xl cursor-pointer transition-all hover:bg-slate-900/40 group flex flex-col justify-between gap-3 focus:outline-none"
                  >
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-mono text-indigo-400 uppercase tracking-widest font-bold">Respon Stres (Saraf)</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
                      </div>
                      <p className="text-sm font-semibold text-rose-350 mt-2 font-display">{results.stressResponse.split(" (")[0]}</p>
                      <p className="text-[10px] text-slate-400 mt-1.5 leading-relaxed line-clamp-2">
                        {STRESS_DESCRIPTIONS[results.stressResponse]?.shortDesc || "Mengukur aksi saraf otonom saat ditekan krisis."}
                      </p>
                    </div>
                  </div>

                  {/* Conflict Style Card */}
                  <div 
                    onClick={() => triggerTypologyDetail(results.conflictStyle, CONFLICT_DESCRIPTIONS)}
                    className="p-4 bg-slate-950/45 border border-slate-850 hover:border-indigo-500/35 rounded-2xl cursor-pointer transition-all hover:bg-slate-900/40 group flex flex-col justify-between gap-3 focus:outline-none"
                  >
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-mono text-indigo-400 uppercase tracking-widest font-bold">Model Konflik (Sengketa)</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
                      </div>
                      <p className="text-sm font-semibold text-white mt-2 font-display">{results.conflictStyle.split(" (")[0]}</p>
                      <p className="text-[10px] text-slate-400 mt-1.5 leading-relaxed line-clamp-2">
                        {CONFLICT_DESCRIPTIONS[results.conflictStyle]?.shortDesc || "Bagaimana Anda mempertahankan ego atau berkompromi dalam perselisihan."}
                      </p>
                    </div>
                  </div>

                  {/* Defense Pattern Card */}
                  <div 
                    onClick={() => triggerTypologyDetail(results.defensePattern, DEFENSE_DESCRIPTIONS)}
                    className="p-4 bg-slate-950/45 border border-slate-850 hover:border-indigo-500/35 rounded-2xl cursor-pointer transition-all hover:bg-slate-900/40 group flex flex-col justify-between gap-3 focus:outline-none"
                  >
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-mono text-indigo-400 uppercase tracking-widest font-bold">Pilar Pertahanan (Defense)</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
                      </div>
                      <p className="text-sm font-semibold text-white mt-2 font-display">{results.defensePattern.split(" (")[0]}</p>
                      <p className="text-[10px] text-slate-400 mt-1.5 leading-relaxed line-clamp-2">
                        {DEFENSE_DESCRIPTIONS[results.defensePattern]?.shortDesc || "Saringan penenang batin psikologis dari luka hantaman luar."}
                      </p>
                    </div>
                  </div>

                  {/* Decision Style Card */}
                  <div 
                    onClick={() => triggerTypologyDetail(results.decisionStyle, DECISION_DESCRIPTIONS)}
                    className="p-4 bg-slate-950/45 border border-slate-850 hover:border-indigo-500/35 rounded-2xl cursor-pointer transition-all hover:bg-slate-900/40 group flex flex-col justify-between gap-3 focus:outline-none"
                  >
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-mono text-indigo-400 uppercase tracking-widest font-bold">Gaya Memutuskan (Decision)</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
                      </div>
                      <p className="text-sm font-semibold text-white mt-2 font-display">{results.decisionStyle.split(" (")[0]}</p>
                      <p className="text-[10px] text-slate-400 mt-1.5 leading-relaxed line-clamp-2">
                        {DECISION_DESCRIPTIONS[results.decisionStyle]?.shortDesc || "Formula taktis pemetaan opsi dan penentuan langkah."}
                      </p>
                    </div>
                  </div>

                  {/* Moral Style Card */}
                  <div 
                    onClick={() => triggerTypologyDetail(results.moralStyle, MORAL_DESCRIPTIONS)}
                    className="p-4 bg-slate-950/45 border border-slate-850 hover:border-indigo-500/35 rounded-2xl cursor-pointer transition-all hover:bg-slate-900/40 group flex flex-col justify-between gap-3 focus:outline-none"
                  >
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-mono text-indigo-400 uppercase tracking-widest font-bold">Filsafat Moral (Moral)</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
                      </div>
                      <p className="text-sm font-semibold text-white mt-2 font-display">{results.moralStyle.split(" (")[0]}</p>
                      <p className="text-[10px] text-slate-400 mt-1.5 leading-relaxed line-clamp-2">
                        {MORAL_DESCRIPTIONS[results.moralStyle]?.shortDesc || "Kompas nilai ketulusan dan integritas sosial."}
                      </p>
                    </div>
                  </div>

                </div>

                {/* Love and Partner narration box */}
                <div className="p-4 bg-emerald-950/10 border border-emerald-500/10 rounded-2xl text-[11px] leading-relaxed text-slate-300">
                  <span className="font-bold text-emerald-400 font-display">Ruang Afeksi & Pemulihan Seimbang:</span>
                  <p className="mt-1">
                    Anda paling subur memercikkan kebaikan saat menerima ekspresi kasih <span className="font-semibold text-white">{results.preferredLoveStyle}</span>, 
                    paling selaras tumbuh mendampingi partner berjiwa <span className="font-semibold text-white">{results.idealPartnerTendency}</span>, 
                    serta kembali melaraskan energi batin di dalam lingkungan <span className="font-semibold text-white">{results.preferredEnvironment}</span>.
                  </p>
                </div>
              </div>

              {/* PROFESSIONAL WORK MODEL & LEARNING */}
              <div className="backdrop-blur-md bg-slate-900/15 border border-slate-800/80 rounded-3xl p-6 flex flex-col gap-4 justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
                    <Smile className="w-5 h-5 text-indigo-400" />
                    <h3 className="font-display font-semibold text-white tracking-wide">Ekosistem Kinerja</h3>
                  </div>

                  <div className="space-y-3.5">
                    {/* Work Style Clickable Card */}
                    <div className="backdrop-blur-md bg-slate-950/45 border border-slate-850 p-4 rounded-2xl">
                      <p className="text-[9px] font-mono text-slate-450 uppercase">Gaya Kerja Terkuat</p>
                      <p className="text-xs font-display font-bold text-white mt-1 leading-snug">{results.workStyle}</p>
                    </div>

                    {/* Learning Style Clickable Card */}
                    <div className="backdrop-blur-md bg-slate-950/45 border border-slate-850 p-4 rounded-2xl">
                      <p className="text-[9px] font-mono text-slate-450 uppercase">Gaya Belajar Efektif</p>
                      <p className="text-xs font-display font-bold text-white mt-1 leading-snug">{results.learningStyle}</p>
                    </div>

                    {/* Temperament Clickable Card */}
                    <div className="backdrop-blur-md bg-slate-950/45 border border-slate-850 p-4 rounded-2xl">
                      <p className="text-[9px] font-mono text-slate-450 uppercase">Karakter Klasik Temperament</p>
                      <p className="text-xs font-display font-bold text-indigo-300 mt-1 uppercase leading-snug">
                        {results.temperament.primary} - {results.temperament.secondary} ({results.temperament.scorePrimary.toFixed(0)}%)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Values Satellites mini section */}
                <div className="backdrop-blur-md bg-slate-950/20 border border-slate-850 p-3.5 rounded-2xl mt-2">
                  <p className="text-[9px] font-mono text-emerald-400 uppercase tracking-wider font-bold mb-1.5 pb-1.5 border-b border-slate-900">Gugusan Nilai Teratas</p>
                  <div className="flex flex-wrap gap-1.5">
                    {results.valuesRanking.slice(0, 3).map((val, idx) => (
                      <span key={val} className="text-[9px] font-sans font-semibold bg-slate-900 border border-slate-800 text-slate-300 px-2.5 py-1 rounded-full">
                        {idx + 1}. {val}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* TAB 4: METRIK POIN DETIL - Detailed, interactive, and beautifully explained point system */}
          {activeTab === "metrik" && (
            <div className="md:col-span-3 space-y-6">
              {/* Metrik Header Card */}
              <div className="backdrop-blur-md bg-slate-900/40 border border-slate-800 rounded-3xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
                    <Layers className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-white tracking-wide">Peta Arsip Poin & Rasi Batin</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Analisis kuantitatif total poin subskala yang terkumpul dari seluruh jawaban kuesioner Anda beserta penjelasannya.</p>
                  </div>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed max-w-3xl">
                  Setiap butir kuesioner menimbang kecenderungan batin Anda melalui distribusi bobot poin ke berbagai klasifikasi tipologi psikologi secara simultan. Berikut adalah perolehan total poin absolut batin Anda beserta stereotip kuat beralaskan ilmiah untuk mendedah rahasia di balik rasi angka-angka tersebut.
                </p>
              </div>

              {/* Grid of point families */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* 1. COGNITIVE FAMILY */}
                <div className="backdrop-blur-md bg-slate-900/30 border border-slate-800 rounded-3xl p-6 space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-800/60">
                    <Brain className="w-5 h-5 text-indigo-400" />
                    <h4 className="font-display font-semibold text-white tracking-wide">Dinamika Fungsi Kognitif (MBTI)</h4>
                  </div>
                  <p className="text-[11px] text-slate-400 font-mono">Total akumulasi pembobotan muatan fungsi kognitif batin:</p>
                  <div className="space-y-4">
                    {Object.entries(SUBSCALE_EXPLANATIONS.cognitive).map(([key, data]) => {
                      const scoreVal = Math.round((results.rawScores?.cognitive?.[key as any] || 0) * 10) / 10;
                      const percent = Math.min(100, Math.max(5, (scoreVal / 50) * 100));
                      return (
                        <div key={key} className="space-y-1.5 p-3 rounded-2xl bg-slate-950/40 border border-slate-900/60 hover:border-slate-800 transition-all">
                          <div className="flex justify-between items-center text-xs font-mono">
                            <span className="font-semibold text-slate-200">{data.label}</span>
                            <span className="font-bold text-indigo-400 bg-indigo-950/40 px-2 py-0.5 rounded border border-indigo-900/30">{scoreVal} pt</span>
                          </div>
                          {/* Progress bar */}
                          <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-indigo-500 to-indigo-455 rounded-full" style={{ width: `${percent}%` }} />
                          </div>
                          <p className="text-[10px] text-slate-300 leading-normal font-display">
                            {data.desc}
                          </p>
                          <p className="text-[10px] text-indigo-300/90 leading-normal font-display mt-1 bg-indigo-950/25 p-1.5 rounded border border-indigo-900/10">
                            <strong>Stereotip Nyata:</strong> &ldquo;{data.stereotype}&rdquo;
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 2. ENNEAGRAM FAMILY */}
                <div className="backdrop-blur-md bg-slate-900/30 border border-slate-800 rounded-3xl p-6 space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-800/60">
                    <Compass className="w-5 h-5 text-rose-400" />
                    <h4 className="font-display font-semibold text-white tracking-wide">Spektrum Tipe Enneagram</h4>
                  </div>
                  <p className="text-[11px] text-slate-400 font-mono">Kekuatan pilar motivasi dasar penggerak ego harian Anda:</p>
                  <div className="space-y-4">
                    {Object.entries(SUBSCALE_EXPLANATIONS.enneagram).map(([key, data]) => {
                      const scoreVal = Math.round((results.rawScores?.enneagram?.[key as any] || 0) * 10) / 10;
                      const percent = Math.min(100, Math.max(5, (scoreVal / 50) * 100));
                      return (
                        <div key={key} className="space-y-1.5 p-3 rounded-2xl bg-slate-950/40 border border-slate-900/60 hover:border-slate-800 transition-all">
                          <div className="flex justify-between items-center text-xs font-mono">
                            <span className="font-semibold text-slate-200">{data.label}</span>
                            <span className="font-bold text-rose-400 bg-rose-950/40 px-2 py-0.5 rounded border border-rose-900/30">{scoreVal} pt</span>
                          </div>
                          {/* Progress bar */}
                          <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-rose-500 to-rose-455 rounded-full" style={{ width: `${percent}%` }} />
                          </div>
                          <p className="text-[10px] text-slate-300 leading-normal font-display">
                            {data.desc}
                          </p>
                          <p className="text-[10px] text-rose-300/90 leading-normal font-display mt-1 bg-rose-950/25 p-1.5 rounded border border-rose-900/10">
                            <strong>Stereotip Nyata:</strong> &ldquo;{data.stereotype}&rdquo;
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 3. BIG FIVE FAMILY */}
                <div className="backdrop-blur-md bg-slate-900/30 border border-slate-800 rounded-3xl p-6 space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-800/60">
                    <Sparkles className="w-5 h-5 text-emerald-400" />
                    <h4 className="font-display font-semibold text-white tracking-wide">Spektrum Trait Karakter (Big Five)</h4>
                  </div>
                  <p className="text-[11px] text-slate-400 font-mono">Skor kecenderungan perangai biologis fungsional diri:</p>
                  <div className="space-y-4">
                    {Object.entries(SUBSCALE_EXPLANATIONS.bigFive).map(([key, data]) => {
                      const scoreVal = Math.round((results.rawScores?.bigFive?.[key as any] || 0) * 10) / 10;
                      const percent = Math.min(100, Math.max(5, (scoreVal / 50) * 100));
                      return (
                        <div key={key} className="space-y-1.5 p-3 rounded-2xl bg-slate-950/40 border border-slate-900/60 hover:border-slate-800 transition-all">
                          <div className="flex justify-between items-center text-xs font-mono">
                            <span className="font-semibold text-slate-200">{data.label}</span>
                            <span className="font-bold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-900/30">{scoreVal} pt</span>
                          </div>
                          {/* Progress bar */}
                          <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-455 rounded-full" style={{ width: `${percent}%` }} />
                          </div>
                          <p className="text-[10px] text-slate-300 leading-normal font-display">
                            {data.desc}
                          </p>
                          <p className="text-[10px] text-emerald-300/90 leading-normal font-display mt-1 bg-emerald-950/25 p-1.5 rounded border border-emerald-900/10">
                            <strong>Stereotip Nyata:</strong> &ldquo;{data.stereotype}&rdquo;
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 4. OTHER SUB-PSYCHE METRICS */}
                <div className="space-y-6">
                  {/* DECISION FAMILY */}
                  <div className="backdrop-blur-md bg-slate-900/30 border border-slate-800 rounded-3xl p-6 space-y-4">
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-800/60">
                      <SlidersHorizontal className="w-5 h-5 text-yellow-400" />
                      <h4 className="font-display font-semibold text-white tracking-wide">Peneropong Gaya Keputusan</h4>
                    </div>
                    <div className="space-y-3.5">
                      {Object.entries(SUBSCALE_EXPLANATIONS.decision).map(([key, data]) => {
                        const scoreVal = Math.round((results.rawScores?.decision?.[key as any] || 0) * 10) / 10;
                        const percent = Math.min(100, Math.max(5, (scoreVal / 25) * 100));
                        return (
                          <div key={key} className="space-y-1.5 p-3 rounded-2xl bg-slate-950/40 border border-slate-900/60 hover:border-slate-800 transition-all">
                            <div className="flex justify-between items-center text-xs font-mono">
                              <span className="font-semibold text-slate-200">{data.label}</span>
                              <span className="font-bold text-yellow-400 bg-yellow-950/40 px-2 py-0.5 rounded border border-yellow-900/30">{scoreVal} pt</span>
                            </div>
                            {/* Progress bar */}
                            <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-yellow-500 to-yellow-450 rounded-full" style={{ width: `${percent}%` }} />
                            </div>
                            <p className="text-[10px] text-slate-300 leading-normal font-display">
                              {data.desc}
                            </p>
                            <p className="text-[10px] text-yellow-300/90 leading-normal font-display mt-0.5">
                              <strong>Khas:</strong> &ldquo;{data.stereotype}&rdquo;
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* STRESS RESPONSES */}
                  <div className="backdrop-blur-md bg-slate-900/30 border border-slate-800 rounded-3xl p-6 space-y-4">
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-800/60">
                      <ShieldAlert className="w-5 h-5 text-purple-400" />
                      <h4 className="font-display font-semibold text-white tracking-wide">Pola Respon Stress (Sistem Amigdala)</h4>
                    </div>
                    <div className="space-y-3.5">
                      {Object.entries(SUBSCALE_EXPLANATIONS.stress).map(([key, data]) => {
                        const scoreVal = Math.round((results.rawScores?.stress?.[key as any] || 0) * 10) / 10;
                        const percent = Math.min(100, Math.max(5, (scoreVal / 25) * 100));
                        return (
                          <div key={key} className="space-y-1.5 p-3 rounded-2xl bg-slate-950/40 border border-slate-900/60 hover:border-slate-800 transition-all">
                            <div className="flex justify-between items-center text-xs font-mono">
                              <span className="font-semibold text-slate-200">{data.label}</span>
                              <span className="font-bold text-purple-400 bg-purple-950/40 px-2 py-0.5 rounded border border-purple-900/30">{scoreVal} pt</span>
                            </div>
                            {/* Progress bar */}
                            <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-purple-500 to-purple-450 rounded-full" style={{ width: `${percent}%` }} />
                            </div>
                            <p className="text-[10px] text-slate-300 leading-normal font-display">
                              {data.desc}
                            </p>
                            <p className="text-[10px] text-purple-300/90 leading-normal font-display mt-0.5">
                              <strong>Insting:</strong> &ldquo;{data.stereotype}&rdquo;
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

              </div>
            </div>
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
                <p className="font-semibold text-white text-sm sm:text-base">{selectedTypology.shortDesc}</p>
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
