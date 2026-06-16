/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion } from "motion/react";

interface ConstellationNode {
  id: string;
  label: string;
  role: string;
  value: string;
  x: number;
  y: number;
  glow: string;
  desc: string;
}

interface ConstellationProps {
  interactive?: boolean;
  results?: {
    mbti: string;
    enneagram: string;
    instinct: string;
    value: string;
    fear: string;
    love: string;
    comfort: string;
  };
}

export function ConstellationCanvas({ interactive = false, results }: ConstellationProps) {
  const [hoveredNode, setHoveredNode] = useState<ConstellationNode | null>(null);
  const [skyStars, setSkyStars] = useState<Array<{ id: number; x: number; y: number; s: number; op: number }>>([]);

  // Generate random twinkling stars for background
  useEffect(() => {
    const stars = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      s: Math.random() * 2 + 1,
      op: Math.random() * 0.7 + 0.3
    }));
    setSkyStars(stars);
  }, []);

  // Defined nodes for results constellation
  const nodes: ConstellationNode[] = results
    ? [
        {
          id: "mbti",
          label: "Sinar Utama",
          role: "Tipe Kognitif",
          value: results.mbti,
          x: 50,
          y: 25,
          glow: "rgba(129, 140, 248, 0.8)", // indigo
          desc: `Intisari pemrosesan informasi kognitif Anda. Memandu cara Anda berpikir, mengevaluasi dunia, dan menata realitas.`
        },
        {
          id: "enneagram",
          label: "Titik Ambisi",
          role: "Naluri Esensial",
          value: results.enneagram,
          x: 23,
          y: 45,
          glow: "rgba(244, 63, 94, 0.8)", // rose
          desc: `Dorongan ego, ketakutan terdalam, serta rantai hasrat bawah sadar yang menggerakkan roda motivasi harian Anda.`
        },
        {
          id: "instinct",
          label: "Kompas Jiwa",
          role: "Staking Naluri",
          value: results.instinct,
          x: 32,
          y: 75,
          glow: "rgba(234, 179, 8, 0.8)", // yellow
          desc: `Prioritas pertahanan kelestarian hidup Anda (Self-Preservation, Intimacy, atau Social) dalam bernegosiasi dengan waktu.`
        },
        {
          id: "value",
          label: "Sabuk Nilai",
          role: "Pilar Jangkar",
          value: results.value,
          x: 77,
          y: 45,
          glow: "rgba(16, 185, 129, 0.8)", // emerald
          desc: `Titik gravitasi prinsip hidup tertinggi Anda yang tidak bisa ditawar demi kepuasan batin yang sejati.`
        },
        {
          id: "fear",
          label: "Bintang Gerhana",
          role: "Titik Rentan",
          value: results.fear,
          x: 68,
          y: 75,
          glow: "rgba(168, 85, 247, 0.8)", // purple
          desc: `Bayang-bayang ketakutan primordial. Sang penjaga kewaspadaan yang sewaktu-waktu menyalakan letupan trauma atau kecemasan.`
        },
        {
          id: "love",
          label: "Atmosfer Kasih",
          role: "Gaya Afeksi",
          value: results.love,
          x: 50,
          y: 53,
          glow: "rgba(236, 72, 153, 0.8)", // pink
          desc: `Bahasa asuhan perhatian Anda. Cara orisinal Anda merawat ikatan emosional hangat dengan belahan jiwa.`
        }
      ]
    : [];

  // Constellation lines connecting specific nodes
  const connections = results
    ? [
        { from: "mbti", to: "enneagram" },
        { from: "mbti", to: "value" },
        { from: "enneagram", to: "instinct" },
        { from: "value", to: "fear" },
        { from: "enneagram", to: "love" },
        { from: "value", to: "love" },
        { from: "instinct", to: "love" },
        { from: "fear", to: "love" }
      ]
    : [];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-auto bg-slate-950">
      {/* Twilight atmosphere backdrop */}
      <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900 to-indigo-950 opacity-90" />
      <div className="absolute inset-0 bg-cosmic-grid opacity-30" />

      {/* Twinkling ambient stars */}
      {skyStars.map(star => (
        <div
          key={star.id}
          className="absolute bg-white rounded-full transition-all duration-1000 animate-pulse"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.s}px`,
            height: `${star.s}px`,
            opacity: star.op
          }}
        />
      ))}

      {/* Constellation Grid Rendering */}
      {interactive && results && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
          <div className="relative w-full max-w-lg aspect-square">
            <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
              {/* Draw connected lines */}
              {connections.map((conn, idx) => {
                const nFrom = nodes.find(n => n.id === conn.from);
                const nTo = nodes.find(n => n.id === conn.to);
                if (!nFrom || !nTo) return null;
                return (
                  <motion.line
                    key={idx}
                    x1={nFrom.x}
                    y1={nFrom.y}
                    x2={nTo.x}
                    y2={nTo.y}
                    stroke="rgba(255, 255, 255, 0.15)"
                    strokeWidth="0.4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: idx * 0.1 }}
                  />
                );
              })}

              {/* Draw node objects */}
              {nodes.map(node => {
                const isHovered = hoveredNode?.id === node.id;
                return (
                  <g
                    key={node.id}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredNode(node)}
                    onMouseLeave={() => setHoveredNode(null)}
                  >
                    {/* Glowing outer halo */}
                    <motion.circle
                      cx={node.x}
                      cy={node.y}
                      r={isHovered ? 4.5 : 2.5}
                      fill="none"
                      stroke={node.glow}
                      strokeWidth="0.5"
                      animate={{
                        r: isHovered ? [4, 5.5, 4] : [2, 3.5, 2]
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 3,
                        ease: "easeInOut"
                      }}
                    />
                    <circle cx={node.x} cy={node.y} r="1" fill="#fff" />

                    {/* Node Text Label (Mini) */}
                    <text
                      x={node.x}
                      y={node.y - 4}
                      textAnchor="middle"
                      fill="#e2e8f0"
                      fontSize="2"
                      className="font-display tracking-widest select-none pointer-events-none"
                    >
                      {node.label}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Explanation box based on hovered node */}
            <div className="absolute inset-x-0 bottom-[-40px] flex justify-center py-2 h-24">
              <div className="w-full text-center max-w-[340px] px-4 backdrop-blur-md bg-slate-900/40 border border-slate-800 rounded-xl py-2 shadow-xl">
                {hoveredNode ? (
                  <motion.div
                    key={hoveredNode.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-xs"
                  >
                    <div className="flex justify-center items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: hoveredNode.glow }} />
                      <span className="font-mono text-[10px] uppercase text-indigo-300 font-bold tracking-wider">
                        {hoveredNode.role}
                      </span>
                    </div>
                    <p className="font-display text-sm font-semibold text-white tracking-wide mt-0.5">
                      {hoveredNode.value}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">
                      {hoveredNode.desc}
                    </p>
                  </motion.div>
                ) : (
                  <div className="text-slate-400 text-xs flex flex-col items-center justify-center h-full">
                    <p className="font-display tracking-wider text-slate-300">Rasi Kosmos Pribadi Anda</p>
                    <p className="text-[10px] text-slate-500 mt-1">Layangkan kursor di atas gugusan bintang untuk membaca narasi.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
