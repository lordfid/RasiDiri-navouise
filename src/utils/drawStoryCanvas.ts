/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import { FinalQuizResult } from "../types";

export function drawStoryCanvas(
  canvas: HTMLCanvasElement,
  results: FinalQuizResult,
  mbtiPoemTitle: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject("Canvas context not available");
        return;
      }

      // 1. Set explicit high-definition dimensions matching standard IG Story (1080 x 1920)
      canvas.width = 1080;
      canvas.height = 1920;

      // 2. Draw Premium Cosmic Background Gradient
      const grad = ctx.createLinearGradient(0, 0, 0, 1920);
      grad.addColorStop(0, "#020617"); // slate-950
      grad.addColorStop(0.3, "#070a24"); // Indigo-950 hint
      grad.addColorStop(0.7, "#0f113a"); // Midnight depths
      grad.addColorStop(1, "#030712"); // gray-955
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1080, 1920);

      // 3. Draw Constellation Grid Lines in Background (Subtle)
      ctx.strokeStyle = "rgba(99, 102, 241, 0.08)"; // indigo-500/8%
      ctx.lineWidth = 1.5;
      for (let i = 0; i < 1080; i += 120) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 1920);
        ctx.stroke();
      }
      for (let j = 0; j < 1920; j += 120) {
        ctx.beginPath();
        ctx.moveTo(0, j);
        ctx.lineTo(1080, j);
        ctx.stroke();
      }

      // 4. Draw Radial Glow Center (Subtle nebular flare)
      const radialGlow = ctx.createRadialGradient(540, 750, 100, 540, 750, 450);
      radialGlow.addColorStop(0, "rgba(79, 70, 229, 0.15)"); // indigo-600/15%
      radialGlow.addColorStop(0.5, "rgba(16, 185, 129, 0.04)"); // emerald-500/4%
      radialGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = radialGlow;
      ctx.fillRect(0, 0, 1080, 1920);

      // 5. Draw Decorative Constellation Stars and Connecting Lines
      const stars = [
        { x: 180, y: 350, r: 4, glow: "rgba(129, 140, 248, 0.7)" },
        { x: 380, y: 220, r: 3, glow: "rgba(16, 185, 129, 0.6)" },
        { x: 820, y: 290, r: 5, glow: "rgba(129, 140, 248, 0.8)" },
        { x: 920, y: 550, r: 3, glow: "rgba(244, 63, 94, 0.5)" },
        { x: 150, y: 1350, r: 4, glow: "rgba(16, 185, 129, 0.6)" },
        { x: 880, y: 1420, r: 5, glow: "rgba(129, 140, 248, 0.8)" },
        { x: 450, y: 1680, r: 3, glow: "rgba(244, 63, 94, 0.4)" },
      ];

      // Connecting lines
      ctx.strokeStyle = "rgba(99, 102, 241, 0.18)";
      ctx.lineWidth = 1.0;
      ctx.beginPath();
      ctx.moveTo(stars[0].x, stars[0].y);
      ctx.lineTo(stars[1].x, stars[1].y);
      ctx.lineTo(stars[2].x, stars[2].y);
      ctx.lineTo(stars[3].x, stars[3].y);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(stars[4].x, stars[4].y);
      ctx.lineTo(stars[5].x, stars[5].y);
      ctx.lineTo(stars[6].x, stars[6].y);
      ctx.stroke();

      // Draw Star Nodes
      stars.forEach(star => {
        const radStar = ctx.createRadialGradient(star.x, star.y, 1, star.x, star.y, star.r * 5);
        radStar.addColorStop(0, star.glow);
        radStar.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = radStar;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r * 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // 6. Draw Elegant Outer Border/Frame
      ctx.strokeStyle = "rgba(99, 102, 241, 0.25)";
      ctx.lineWidth = 20;
      ctx.strokeRect(30, 30, 1020, 1860);

      ctx.strokeStyle = "rgba(16, 185, 129, 0.2)";
      ctx.lineWidth = 1;
      ctx.strokeRect(50, 50, 980, 1820);

      // 7. Render Typography Texts
      // Subtitle / App Branding
      ctx.fillStyle = "#818cf8"; // indigo-405
      ctx.font = "bold 32px 'Courier New', monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.letterSpacing = "6px";
      ctx.fillText("RASI DIRI COGNITIVE INDEX", 540, 180);

      // Small separator line
      ctx.strokeStyle = "rgba(99, 102, 241, 0.3)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(420, 230);
      ctx.lineTo(660, 230);
      ctx.stroke();

      // Big Circle Profile Emblem (Sphere matching a cosmic sphere)
      const gradEmb = ctx.createLinearGradient(390, 310, 690, 610);
      gradEmb.addColorStop(0, "#4f46e5"); // indigo-600
      gradEmb.addColorStop(1, "#10b981"); // emerald-500
      ctx.strokeStyle = gradEmb;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(540, 460, 130, 0, Math.PI * 2);
      ctx.stroke();

      // Soft glow indicator rings
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(540, 460, 150, 0, Math.PI * 2);
      ctx.stroke();

      // Text inside Emblem (Rasi Primary Type e.g., "INFJ")
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 90px 'Space Grotesk', 'Inter', sans-serif";
      ctx.fillText(results.top3Mbti[0].type, 540, 455);

      // Enneagram & Wing below Emblem
      ctx.fillStyle = "#34d399"; // emerald-400
      ctx.font = "bold 55px 'Space Grotesk', 'Inter', sans-serif";
      ctx.fillText(results.enneagram.wing, 540, 680);

      // MBTI Poem Title (Indonesian description)
      ctx.fillStyle = "#e2e8f0"; // slate-200
      let poemFontSize = 36;
      ctx.font = `italic ${poemFontSize}px 'Inter', sans-serif`;
      let poemWidth = ctx.measureText(`"${mbtiPoemTitle}"`).width;
      while (poemWidth > 900 && poemFontSize > 16) {
        poemFontSize -= 1;
        ctx.font = `italic ${poemFontSize}px 'Inter', sans-serif`;
        poemWidth = ctx.measureText(`"${mbtiPoemTitle}"`).width;
      }
      ctx.fillText(`"${mbtiPoemTitle}"`, 540, 750);

      // 8. Personality Blueprint Card Content Area
      const cardY = 860;
      const cardWidth = 840;
      const cardHeight = 780;
      const cardX = 120;

      // Card Background (Frosted translucent dark look)
      ctx.fillStyle = "rgba(15, 23, 42, 0.75)"; // slate-900/75%
      ctx.beginPath();
      // Draw rounded rectangle
      const radius = 35;
      ctx.roundRect?.(cardX, cardY, cardWidth, cardHeight, radius);
      ctx.fill();

      // Card Border line
      ctx.strokeStyle = "rgba(99, 102, 241, 0.2)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Heading of the Card
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 38px 'Space Grotesk', 'Inter', sans-serif";
      ctx.textAlign = "left";
      ctx.fillText("RASI JATI DIRI", cardX + 60, cardY + 75);

      // Decorative compass star in the card header
      ctx.strokeStyle = "rgba(16, 185, 129, 0.4)";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      const sX = cardX + cardWidth - 85;
      const sY = cardY + 75;
      ctx.moveTo(sX, sY - 20); ctx.lineTo(sX, sY + 20);
      ctx.moveTo(sX - 20, sY); ctx.lineTo(sX + 20, sY);
      ctx.stroke();

      // Lines in the card separator
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cardX + 60, cardY + 130);
      ctx.lineTo(cardX + cardWidth - 60, cardY + 130);
      ctx.stroke();

      // Key metrics to print on the IG Story Card
      const metrics = [
        { label: "Fungsi Dominan", val: results.mbtiStack.dominant.split(" ")[0] + " - Pilar Utama" },
        { label: "Fungsi Auxiliary", val: results.mbtiStack.auxiliary.split(" ")[0] + " - Kompas Aksi" },
        { label: "Gaya Hubungan", val: results.relationshipTendency.split(" (")[0] },
        { label: "Gaya Konflik", val: results.conflictStyle.split(" (")[0] },
        { label: "Respon Stres", val: results.stressResponse.split(" (")[0] },
        { label: "Pola Pertahanan", val: results.defensePattern.split(" (")[0] },
      ];

      metrics.forEach((m, idx) => {
        const itemY = cardY + 195 + idx * 80; // Changed spacing slightly to give comfortable room

        // Draw small bullet bead
        ctx.fillStyle = "#10b981"; // emerald-500
        ctx.beginPath();
        ctx.arc(cardX + 65, itemY, 6, 0, Math.PI * 2);
        ctx.fill();

        // Measure widths and adjust font size dynamically to prevent overlapping
        let labelSize = 23;
        let valueSize = 23;

        ctx.font = `bold ${labelSize}px 'Fira Code', 'JetBrains Mono', monospace`;
        let labelWidth = ctx.measureText(m.label).width;

        ctx.font = `bold ${valueSize}px 'Inter', sans-serif`;
        let valWidth = ctx.measureText(m.val).width;

        const maxAvailableWidth = cardWidth - 170; // 840 - 170 = 670px spacing gap

        while (labelWidth + valWidth + 40 > maxAvailableWidth && (labelSize > 14 || valueSize > 14)) {
          if (valueSize > labelSize) {
            valueSize--;
          } else {
            labelSize--;
            valueSize--;
          }
          ctx.font = `bold ${labelSize}px 'Fira Code', 'JetBrains Mono', monospace`;
          labelWidth = ctx.measureText(m.label).width;

          ctx.font = `bold ${valueSize}px 'Inter', sans-serif`;
          valWidth = ctx.measureText(m.val).width;
        }

        // Label Column
        ctx.fillStyle = "#94a3b8"; // slate-400
        ctx.font = `bold ${labelSize}px 'Fira Code', 'JetBrains Mono', monospace`;
        ctx.fillText(m.label, cardX + 100, itemY);

        // Value Column
        ctx.fillStyle = "#f8fafc"; // slate-50
        ctx.font = `bold ${valueSize}px 'Inter', sans-serif`;
        ctx.textAlign = "right";
        ctx.fillText(m.val, cardX + cardWidth - 60, itemY);
        ctx.textAlign = "left"; // reset
      });

      // 9. Watermark Footer Area
      ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
      ctx.font = "bold 24px 'Courier New', monospace";
      ctx.textAlign = "center";
      ctx.fillText("UJI KOGNITIF SECARA PROPORSIONAL DI:", 540, 1720);

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 34px 'Space Grotesk', sans-serif";
      ctx.letterSpacing = "2px";
      ctx.fillText("rasi-diri.applet / ai.studio", 540, 1775);

      // Return Data URL
      resolve(canvas.toDataURL("image/png"));
    } catch (e) {
      reject(e);
    }
  });
}
