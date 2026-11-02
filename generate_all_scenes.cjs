const fs = require('fs');
const path = require('path');

function escapeXml(unsafe) {
  if (!unsafe) return '';
  return String(unsafe).replace(/[<>&'"]/g, c => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
}

function sanitizeContent(html) {
  if (!html) return '';
  let clean = html.replace(/<br\s*\/?>/gi, ' — ');
  clean = clean.replace(/&(?!amp;|lt;|gt;|apos;|quot;|#\d+;|#x[0-9a-fA-F]+;)/g, '&amp;');
  return clean;
}

function createSvgScene(opts) {
  const {
    seriesNum,
    seriesName,
    sceneNum,
    sceneTitle,
    timecode,
    visualCategory,
    contentHtml
  } = opts;

  const padNum = String(sceneNum).padStart(2, '0');
  const accentColor = seriesNum === 1 ? '#38bdf8' : (seriesNum === 2 ? '#60a5fa' : '#10b981');
  const accentGradient = seriesNum === 1 
    ? '<stop offset="0%" stop-color="#38bdf8"/><stop offset="100%" stop-color="#2563eb"/>'
    : (seriesNum === 2 
      ? '<stop offset="0%" stop-color="#60a5fa"/><stop offset="100%" stop-color="#818cf8"/>'
      : '<stop offset="0%" stop-color="#10b981"/><stop offset="100%" stop-color="#34d399"/>');

  const cleanCategory = escapeXml(visualCategory);
  const cleanTitle = escapeXml(sceneTitle);
  const cleanTimecode = escapeXml(timecode);
  const cleanContent = sanitizeContent(contentHtml);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
  <defs>
    <radialGradient id="bgGlow" cx="50%" cy="30%" r="80%">
      <stop offset="0%" stop-color="#0f172a" stop-opacity="0.9"/>
      <stop offset="60%" stop-color="#020617" stop-opacity="1"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="1"/>
    </radialGradient>
    <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      ${accentGradient}
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="10" stdDeviation="15" flood-color="#000000" flood-opacity="0.8"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="1280" height="720" fill="url(#bgGlow)"/>

  <!-- Architectural Subtle Grid -->
  <g opacity="0.08" stroke="#94a3b8" stroke-width="1">
    <line x1="80" y1="0" x2="80" y2="720"/>
    <line x1="240" y1="0" x2="240" y2="720"/>
    <line x1="400" y1="0" x2="400" y2="720"/>
    <line x1="560" y1="0" x2="560" y2="720"/>
    <line x1="720" y1="0" x2="720" y2="720"/>
    <line x1="880" y1="0" x2="880" y2="720"/>
    <line x1="1040" y1="0" x2="1040" y2="720"/>
    <line x1="1200" y1="0" x2="1200" y2="720"/>
    <line x1="0" y1="120" x2="1280" y2="120"/>
    <line x1="0" y1="240" x2="1280" y2="240"/>
    <line x1="0" y1="360" x2="1280" y2="360"/>
    <line x1="0" y1="480" x2="1280" y2="480"/>
    <line x1="0" y1="600" x2="1280" y2="600"/>
  </g>

  <!-- Top Navigation &amp; Metadata Header -->
  <g transform="translate(60, 40)">
    <!-- Series Badge -->
    <rect x="0" y="0" width="310" height="34" rx="6" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
    <circle cx="16" cy="17" r="5" fill="${accentColor}"/>
    <text x="30" y="22" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" fill="#f8fafc" letter-spacing="0.1em">
      PROFITMACHINES BRIEFING 0${seriesNum}
    </text>

    <!-- Scene Number Pill -->
    <rect x="325" y="0" width="130" height="34" rx="6" fill="#0f172a" stroke="#1e293b" stroke-width="1.5"/>
    <text x="345" y="22" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" fill="${accentColor}">
      SCENE ${padNum}/16
    </text>

    <!-- Timecode Pill -->
    <rect x="470" y="0" width="140" height="34" rx="6" fill="#0f172a" stroke="#1e293b" stroke-width="1.5"/>
    <text x="488" y="22" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="600" fill="#94a3b8">
      ${cleanTimecode}
    </text>

    <!-- Visual Category -->
    <rect x="625" y="0" width="310" height="34" rx="6" fill="#0f172a" stroke="#1e293b" stroke-width="1.5"/>
    <text x="640" y="22" font-family="'Inter', sans-serif" font-size="12" font-weight="500" fill="#64748b">
      TYPE: ${cleanCategory}
    </text>

    <!-- ProfitMachines Brand Vector Top Right -->
    <g transform="translate(1000, 2)">
      <polygon points="12,0 24,7 24,21 12,28 0,21 0,7" fill="none" stroke="${accentColor}" stroke-width="2"/>
      <circle cx="12" cy="14" r="3" fill="#38bdf8"/>
      <text x="32" y="19" font-family="'Inter', sans-serif" font-size="14" font-weight="800" fill="#f8fafc" letter-spacing="0.08em">PROFITMACHINES</text>
    </g>
  </g>

  <!-- Scene Title Headline -->
  <g transform="translate(60, 115)">
    <text font-family="'Inter', sans-serif" font-weight="800" font-size="28" fill="#f8fafc" letter-spacing="-0.02em">
      ${cleanTitle}
    </text>
  </g>

  <!-- Dynamic Center Stage Graphic Area -->
  <g transform="translate(60, 150)">
    ${cleanContent}
  </g>

  <!-- Bottom Executive Footer Bar -->
  <g transform="translate(60, 655)">
    <line x1="0" y1="0" x2="1160" y2="0" stroke="#1e293b" stroke-width="1.5"/>
    <text x="0" y="24" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600" fill="#64748b" letter-spacing="0.08em">
      PROFITMACHINES REVENUE SYSTEMS • EXECUTIVE C-SUITE BRIEFING SERIES • CONFIDENTIAL &amp; PROPRIETARY
    </text>
    <text x="1160" y="24" text-anchor="end" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" fill="${accentColor}">
      SCENE ${padNum} OF 16
    </text>
  </g>
</svg>`;
}

// VIDEO 1 SCENES
const v1Scenes = [
  {
    num: 1, title: "Cold Open Hook: The Pipeline Paradox", timecode: "0:00 – 0:45", type: "Kinetic Typography & Shock Metrics",
    content: `
      <rect x="0" y="0" width="1160" height="475" rx="16" fill="#0b1329" stroke="#1e293b" stroke-width="1.5" filter="url(#shadow)"/>
      <g transform="translate(60, 50)">
        <text font-family="'Inter', sans-serif" font-size="15" font-weight="700" fill="#ef4444" letter-spacing="0.1em">EXECUTIVE REALITY CHECK</text>
        <text y="45" font-family="'Inter', sans-serif" font-size="32" font-weight="900" fill="#f8fafc" letter-spacing="-0.02em">67% of Forecasted Enterprise Deals Slip Every Quarter.</text>
        <text y="90" font-family="'Inter', sans-serif" font-size="32" font-weight="900" fill="#38bdf8" letter-spacing="-0.02em">Reps Spend Only 32% of Their Day Selling.</text>
        <text y="145" font-family="'Inter', sans-serif" font-size="24" font-weight="700" fill="#94a3b8">Why is your board asking you to hire 15 more reps?</text>
        <g transform="translate(0, 195)">
          <g transform="translate(0, 0)">
            <rect width="320" height="95" rx="12" fill="#1e293b" stroke="#334155"/>
            <text x="24" y="35" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#ef4444">DEAL SLIPPAGE</text>
            <text x="24" y="72" font-family="'Inter', sans-serif" font-size="26" font-weight="800" fill="#fff">67% Rate</text>
          </g>
          <g transform="translate(355, 0)">
            <rect width="320" height="95" rx="12" fill="#1e293b" stroke="#334155"/>
            <text x="24" y="35" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#38bdf8">ACTIVE SELLING TIME</text>
            <text x="24" y="72" font-family="'Inter', sans-serif" font-size="26" font-weight="800" fill="#fff">&lt; 33% Allocation</text>
          </g>
          <g transform="translate(710, 0)">
            <rect width="330" height="95" rx="12" fill="#1e293b" stroke="#334155"/>
            <text x="24" y="35" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#f59e0b">QUOTA ATTAINMENT</text>
            <text x="24" y="72" font-family="'Inter', sans-serif" font-size="26" font-weight="800" fill="#fff">&lt; 50% Salesforce Avg</text>
          </g>
        </g>
      </g>`
  },
  {
    num: 2, title: "The Zero-Interest Era & Headcount Playbook", timecode: "0:45 – 1:30", type: "Historical Timeline & Macro Regime Shift",
    content: `
      <rect x="0" y="0" width="1160" height="475" rx="16" fill="#0b1329" stroke="#1e293b" stroke-width="1.5"/>
      <g transform="translate(60, 45)">
        <text font-family="'Inter', sans-serif" font-size="15" font-weight="700" fill="#38bdf8" letter-spacing="0.1em">THE 2012–2021 HISTORICAL SCALING LOOP</text>
        <text y="40" font-family="'Inter', sans-serif" font-size="28" font-weight="800" fill="#fff">When Capital Was Free, Inefficiency Was Masked</text>
        <g transform="translate(0, 90)">
          <line x1="50" y1="100" x2="980" y2="100" stroke="#334155" stroke-width="4"/>
          <circle cx="100" cy="100" r="14" fill="#2563eb"/><text x="100" y="60" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-weight="700" font-size="14" fill="#38bdf8">2012</text><text x="100" y="145" text-anchor="middle" font-family="'Inter', sans-serif" font-size="13" fill="#94a3b8">ZIRP Era Begins — Cost of Capital ~0%</text>
          <circle cx="450" cy="100" r="14" fill="#2563eb"/><text x="450" y="60" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-weight="700" font-size="14" fill="#38bdf8">2018–2020</text><text x="450" y="145" text-anchor="middle" font-family="'Inter', sans-serif" font-size="13" fill="#94a3b8">Linear Headcount Playbook — Indiscriminate Outbound</text>
          <line x1="800" y1="20" x2="800" y2="230" stroke="#ef4444" stroke-width="3" stroke-dasharray="6 6"/>
          <rect x="730" y="10" width="140" height="30" rx="6" fill="#ef4444"/><text x="800" y="30" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="800" fill="#fff">MACRO REGIME SHIFT</text>
          <circle cx="950" cy="100" r="14" fill="#ef4444"/><text x="950" y="60" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-weight="700" font-size="14" fill="#f87171">2022–2026+</text><text x="950" y="145" text-anchor="middle" font-family="'Inter', sans-serif" font-size="13" fill="#94a3b8">Rule of 40 Mandate — Capital Efficiency First</text>
        </g>
        <g transform="translate(0, 310)">
          <rect width="1040" height="70" rx="10" fill="#1e1b4b" stroke="#4338ca" stroke-width="1.5"/>
          <text x="30" y="42" font-family="'Inter', sans-serif" font-size="15" font-weight="600" fill="#c7d2fe">Linear expansion has hit negative margin yield: Fully loaded AE compensation averages $250k–$300k.</text>
        </g>
      </g>`
  },
  {
    num: 3, title: "The Headcount Trap: Diminishing Quota Yield", timecode: "1:30 – 2:15", type: "Animated Comparative Curve Chart",
    content: `
      <rect x="0" y="0" width="1160" height="475" rx="16" fill="#0b1329" stroke="#1e293b" stroke-width="1.5"/>
      <g transform="translate(60, 40)">
        <text font-family="'Inter', sans-serif" font-size="15" font-weight="700" fill="#ef4444" letter-spacing="0.1em">THE HEADCOUNT TRAP: MARGINAL COST &gt; MARGINAL SALES YIELD</text>
        <text y="40" font-family="'Inter', sans-serif" font-size="28" font-weight="800" fill="#fff">Widening Gap: Loaded Rep Cost vs Quota Attainment</text>
        <g transform="translate(60, 70)">
          <line x1="0" y1="230" x2="680" y2="230" stroke="#475569" stroke-width="2"/>
          <line x1="0" y1="0" x2="0" y2="230" stroke="#475569" stroke-width="2"/>
          <path d="M 0 150 Q 300 130 650 30 L 650 180 Q 300 160 0 150 Z" fill="#ef4444" opacity="0.15"/>
          <text x="380" y="145" font-family="'Inter', sans-serif" font-size="14" font-weight="700" fill="#f87171">MARGIN COMPRESSION ZONE</text>
          <path d="M 0 150 Q 300 130 650 30" fill="none" stroke="#ef4444" stroke-width="4"/><circle cx="650" cy="30" r="6" fill="#ef4444"/><text x="665" y="35" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#ef4444">Cost: $280K/Rep</text>
          <path d="M 0 150 Q 250 120 650 180" fill="none" stroke="#38bdf8" stroke-width="4"/><circle cx="650" cy="180" r="6" fill="#38bdf8"/><text x="665" y="185" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#38bdf8">Yield: 47% Quota</text>
        </g>
        <g transform="translate(850, 70)">
          <rect width="210" height="90" rx="10" fill="#1e293b" stroke="#334155"/><text x="16" y="30" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" fill="#94a3b8">REP COMPENSATION</text><text x="16" y="65" font-family="'Inter', sans-serif" font-size="24" font-weight="800" fill="#f87171">$250k–$300k</text>
          <rect y="110" width="210" height="90" rx="10" fill="#1e293b" stroke="#334155"/><text x="16" y="140" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" fill="#94a3b8">CAC PAYBACK</text><text x="16" y="175" font-family="'Inter', sans-serif" font-size="24" font-weight="800" fill="#f87171">&gt; 24 Months</text>
        </g>
        <g transform="translate(0, 340)">
          <rect width="1040" height="50" rx="8" fill="#1e293b"/><text x="25" y="32" font-family="'Inter', sans-serif" font-size="14" font-weight="600" fill="#94a3b8">"Headcount is an amplifier. When you amplify an inefficient system, you produce larger losses, not higher growth."</text>
        </g>
      </g>`
  },
  {
    num: 4, title: "The Expanded Enterprise Buying Committee", timecode: "2:15 – 3:00", type: "Interactive Stakeholder Topology Map",
    content: `
      <rect x="0" y="0" width="1160" height="475" rx="16" fill="#0b1329" stroke="#1e293b" stroke-width="1.5"/>
      <g transform="translate(60, 35)">
        <text font-family="'Inter', sans-serif" font-size="15" font-weight="700" fill="#38bdf8" letter-spacing="0.1em">GARTNER RESEARCH: 6 TO 10 CROSS-FUNCTIONAL DECISION MAKERS</text>
        <text y="40" font-family="'Inter', sans-serif" font-size="28" font-weight="800" fill="#fff">Single-Threading is Lethal: The Consensus Committee</text>
        <g transform="translate(480, 210)">
          <line x1="0" y1="0" x2="-320" y2="-90" stroke="#334155" stroke-width="2" stroke-dasharray="4 4"/>
          <line x1="0" y1="0" x2="-180" y2="-130" stroke="#334155" stroke-width="2" stroke-dasharray="4 4"/>
          <line x1="0" y1="0" x2="160" y2="-130" stroke="#334155" stroke-width="2" stroke-dasharray="4 4"/>
          <line x1="0" y1="0" x2="320" y2="-90" stroke="#334155" stroke-width="2" stroke-dasharray="4 4"/>
          <circle cx="0" cy="0" r="42" fill="#2563eb" stroke="#60a5fa" stroke-width="3"/><text text-anchor="middle" y="5" font-family="'Inter', sans-serif" font-size="12" font-weight="800" fill="#fff">CHAMPION</text>
          <g transform="translate(-320, -90)"><rect x="-65" y="-22" width="130" height="44" rx="8" fill="#1e293b" stroke="#ef4444" stroke-width="2"/><text text-anchor="middle" y="5" font-family="'Inter', sans-serif" font-size="12" font-weight="700" fill="#fff">CFO (Budget Veto)</text></g>
          <g transform="translate(-180, -130)"><rect x="-60" y="-22" width="120" height="44" rx="8" fill="#1e293b" stroke="#ef4444" stroke-width="2"/><text text-anchor="middle" y="5" font-family="'Inter', sans-serif" font-size="12" font-weight="700" fill="#fff">CISO (SecOps)</text></g>
          <g transform="translate(160, -130)"><rect x="-65" y="-22" width="130" height="44" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1.5"/><text text-anchor="middle" y="5" font-family="'Inter', sans-serif" font-size="12" font-weight="700" fill="#94a3b8">VP Architecture</text></g>
          <g transform="translate(320, -90)"><rect x="-65" y="-22" width="130" height="44" rx="8" fill="#1e293b" stroke="#ef4444" stroke-width="2"/><text text-anchor="middle" y="5" font-family="'Inter', sans-serif" font-size="12" font-weight="700" fill="#fff">Procurement / Legal</text></g>
        </g>
        <g transform="translate(0, 360)">
          <rect width="1040" height="50" rx="8" fill="#1e1b4b" stroke="#ef4444" stroke-width="1"/><text x="25" y="32" font-family="'Inter', sans-serif" font-size="14" font-weight="600" fill="#fca5a5">Disconnect: Reps multithread across only 1.8 contacts while 6+ stakeholders hold silent veto power.</text>
        </g>
      </g>`
  },
  {
    num: 5, title: "The Dark Funnel & The Cost of Latency", timecode: "3:00 – 4:30", type: "Dark-Funnel Pipeline Visualization & Latency Countdown Timer",
    content: `
      <rect x="0" y="0" width="1160" height="475" rx="16" fill="#0b1329" stroke="#1e293b" stroke-width="1.5"/>
      <g transform="translate(60, 40)">
        <text font-family="'Inter', sans-serif" font-size="15" font-weight="700" fill="#38bdf8" letter-spacing="0.1em">83% OF THE ENTERPRISE BUYING JOURNEY HAPPENS IN THE SHADOWS</text>
        <text y="40" font-family="'Inter', sans-serif" font-size="28" font-weight="800" fill="#fff">The Dark Funnel Iceberg vs Slow Outreach</text>
        <g transform="translate(80, 80)">
          <line x1="0" y1="80" x2="480" y2="80" stroke="#38bdf8" stroke-width="2" stroke-dasharray="8 4"/>
          <text x="10" y="70" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" fill="#38bdf8">WATERLINE: VISIBLE CRM / FORM FILLS (17%)</text>
          <polygon points="200,80 240,20 280,80" fill="#38bdf8" opacity="0.8"/>
          <polygon points="120,80 360,80 440,240 40,240" fill="#1e3a8a" opacity="0.5"/>
          <text x="240" y="150" text-anchor="middle" font-family="'Inter', sans-serif" font-size="18" font-weight="800" fill="#fff">DARK FUNNEL (83%)</text>
        </g>
        <g transform="translate(640, 80)">
          <rect width="400" height="240" rx="14" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
          <text x="30" y="45" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#ef4444">THE COST OF RESPONSE LATENCY</text>
          <text x="30" y="90" font-family="'Inter', sans-serif" font-size="34" font-weight="900" fill="#fff">5 Mins vs 24 Hrs</text>
          <text x="30" y="130" font-family="'Inter', sans-serif" font-size="14" fill="#94a3b8">Harvard Business Review Benchmark:</text>
          <text x="30" y="160" font-family="'Inter', sans-serif" font-size="17" font-weight="800" fill="#f87171">800% Drop in Qualification Probability</text>
        </g>
      </g>`
  },
  {
    num: 6, title: "GTM Breakdown 1: Signal Sensing Latency", timecode: "4:30 – 5:10", type: "Systemic Pipeline Funnel — Fracture Point 1",
    content: `
      <rect x="0" y="0" width="1160" height="475" rx="16" fill="#0b1329" stroke="#1e293b" stroke-width="1.5"/>
      <g transform="translate(60, 45)">
        <rect width="180" height="28" rx="6" fill="#ef4444"/><text x="14" y="19" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="800" fill="#fff">BREAKDOWN 01 OF 05</text>
        <text y="65" font-family="'Inter', sans-serif" font-size="30" font-weight="900" fill="#fff">Signal Sensing Latency: Deaf to First-Party Intent</text>
        <g transform="translate(0, 110)">
          <g transform="translate(0, 0)">
            <rect width="500" height="190" rx="12" fill="#1e293b" stroke="#334155"/>
            <text x="30" y="45" font-family="'Inter', sans-serif" font-size="16" font-weight="700" fill="#ef4444">THE FRACTURE</text>
            <text x="30" y="80" font-family="'Inter', sans-serif" font-size="14" fill="#94a3b8">
              <tspan x="30" dy="0">Intent surges occur on docs and pricing weeks before</tspan>
              <tspan x="30" dy="24">forms are filled. Legacy CRMs remain completely blind</tspan>
              <tspan x="30" dy="24">to these critical first-party buying signals.</tspan>
            </text>
          </g>
          <g transform="translate(540, 0)">
            <rect width="500" height="190" rx="12" fill="#1e293b" stroke="#334155"/>
            <text x="30" y="45" font-family="'Inter', sans-serif" font-size="16" font-weight="700" fill="#38bdf8">THE CONSEQUENCE</text>
            <text x="30" y="80" font-family="'Inter', sans-serif" font-size="14" fill="#94a3b8">
              <tspan x="30" dy="0">By the time sales reaches out, competitors have already</tspan>
              <tspan x="30" dy="24">entered active POCs. The company enters as column fodder</tspan>
              <tspan x="30" dy="24">with severely compromised pricing power.</tspan>
            </text>
          </g>
        </g>
      </g>`
  },
  {
    num: 7, title: "GTM Breakdown 2: Buying Committee Disconnect", timecode: "5:10 – 5:50", type: "Single-Threading Veto Stoppage Graphic",
    content: `
      <rect x="0" y="0" width="1160" height="475" rx="16" fill="#0b1329" stroke="#1e293b" stroke-width="1.5"/>
      <g transform="translate(60, 45)">
        <rect width="180" height="28" rx="6" fill="#ef4444"/><text x="14" y="19" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="800" fill="#fff">BREAKDOWN 02 OF 05</text>
        <text y="65" font-family="'Inter', sans-serif" font-size="30" font-weight="900" fill="#fff">Buying Committee Disconnect: The Silent Veto</text>
        <g transform="translate(0, 110)">
          <rect width="1040" height="200" rx="12" fill="#1e293b" stroke="#334155"/>
          <g transform="translate(40, 40)">
            <text font-family="'Inter', sans-serif" font-size="18" font-weight="800" fill="#fff">The Single-Threading Trap</text>
            <text y="35" font-family="'Inter', sans-serif" font-size="15" fill="#94a3b8">AE builds rapport with 1 technical contact. In Stage 4, the deal abruptly freezes.</text>
            <text y="70" font-family="'Inter', sans-serif" font-size="15" fill="#ef4444" font-weight="700">Root Cause: CISO raised an unaddressed data sovereignty veto; CFO rejected unmodeled ROI.</text>
            <text y="105" font-family="'Inter', sans-serif" font-size="14" fill="#64748b">Without autonomous multithreading, reps lack the hours to produce tailored business cases for 8 distinct personas.</text>
          </g>
        </g>
      </g>`
  },
  {
    num: 8, title: "GTM Breakdown 3: RevOps Data Fracture", timecode: "5:50 – 6:30", type: "Disjointed Database Architecture Map",
    content: `
      <rect x="0" y="0" width="1160" height="475" rx="16" fill="#0b1329" stroke="#1e293b" stroke-width="1.5"/>
      <g transform="translate(60, 45)">
        <rect width="180" height="28" rx="6" fill="#ef4444"/><text x="14" y="19" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="800" fill="#fff">BREAKDOWN 03 OF 05</text>
        <text y="65" font-family="'Inter', sans-serif" font-size="30" font-weight="900" fill="#fff">RevOps Data Fracture: The Disconnected Silos</text>
        <g transform="translate(0, 110)">
          <g transform="translate(0, 0)">
            <rect width="240" height="170" rx="10" fill="#1e293b" stroke="#ef4444" stroke-dasharray="4 4"/>
            <text x="20" y="38" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#ef4444">MARKETING</text>
            <text x="20" y="70" font-family="'Inter', sans-serif" font-size="13" fill="#94a3b8">
              <tspan x="20" dy="0">HubSpot / Marketo</tspan>
              <tspan x="20" dy="22">Zero deal attribution</tspan>
              <tspan x="20" dy="22">leads thrown over wall</tspan>
            </text>
          </g>
          <g transform="translate(265, 0)">
            <rect width="240" height="170" rx="10" fill="#1e293b" stroke="#ef4444" stroke-dasharray="4 4"/>
            <text x="20" y="38" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#ef4444">SALES CRM</text>
            <text x="20" y="70" font-family="'Inter', sans-serif" font-size="13" fill="#94a3b8">
              <tspan x="20" dy="0">Salesforce Pipeline</tspan>
              <tspan x="20" dy="22">Stale stage dates,</tspan>
              <tspan x="20" dy="22">unlogged AE notes</tspan>
            </text>
          </g>
          <g transform="translate(530, 0)">
            <rect width="240" height="170" rx="10" fill="#1e293b" stroke="#ef4444" stroke-dasharray="4 4"/>
            <text x="20" y="38" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#ef4444">FINANCE / ERP</text>
            <text x="20" y="70" font-family="'Inter', sans-serif" font-size="13" fill="#94a3b8">
              <tspan x="20" dy="0">NetSuite / Stripe</tspan>
              <tspan x="20" dy="22">Billing mismatch,</tspan>
              <tspan x="20" dy="22">untracked discounts</tspan>
            </text>
          </g>
          <g transform="translate(795, 0)">
            <rect width="245" height="170" rx="10" fill="#1e293b" stroke="#ef4444" stroke-dasharray="4 4"/>
            <text x="20" y="38" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#ef4444">CUSTOMER SUCCESS</text>
            <text x="20" y="70" font-family="'Inter', sans-serif" font-size="13" fill="#94a3b8">
              <tspan x="20" dy="0">Gainsight / Zendesk</tspan>
              <tspan x="20" dy="22">Zero context passed</tspan>
              <tspan x="20" dy="22">from sales demos</tspan>
            </text>
          </g>
        </g>
      </g>`
  },
  {
    num: 9, title: "GTM Breakdown 4: Administrative Rep Drag", timecode: "6:30 – 7:10", type: "Rep Capacity Donut & Activity Clock",
    content: `
      <rect x="0" y="0" width="1160" height="475" rx="16" fill="#0b1329" stroke="#1e293b" stroke-width="1.5"/>
      <g transform="translate(60, 45)">
        <rect width="180" height="28" rx="6" fill="#ef4444"/><text x="14" y="19" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="800" fill="#fff">BREAKDOWN 04 OF 05</text>
        <text y="65" font-family="'Inter', sans-serif" font-size="30" font-weight="900" fill="#fff">Administrative Rep Drag: The $250k Data Entry Clerk</text>
        <g transform="translate(60, 100)">
          <circle cx="120" cy="110" r="90" fill="none" stroke="#ef4444" stroke-width="36" stroke-dasharray="380 180"/>
          <circle cx="120" cy="110" r="90" fill="none" stroke="#38bdf8" stroke-width="36" stroke-dasharray="180 380" stroke-dashoffset="-380"/>
          <text x="120" y="115" text-anchor="middle" font-family="'Inter', sans-serif" font-size="22" font-weight="900" fill="#fff">68%</text><text x="120" y="135" text-anchor="middle" font-family="'Inter', sans-serif" font-size="11" fill="#94a3b8">DRAG</text>
          <g transform="translate(300, 40)">
            <rect width="560" height="70" rx="8" fill="#1e293b" stroke="#ef4444" stroke-width="1"/><text x="25" y="42" font-family="'Inter', sans-serif" font-size="16" font-weight="700" fill="#f87171">68% Non-Selling Administrative Drag</text>
            <rect y="90" width="560" height="70" rx="8" fill="#1e293b" stroke="#38bdf8" stroke-width="1"/><text x="25" y="132" font-family="'Inter', sans-serif" font-size="16" font-weight="700" fill="#38bdf8">Only 32% Active Commercial Selling Time</text>
          </g>
        </g>
      </g>`
  },
  {
    num: 10, title: "GTM Breakdown 5: Post-Sale Revenue Amnesia", timecode: "7:10 – 7:45", type: "The Revenue Context Chasm Schematic",
    content: `
      <rect x="0" y="0" width="1160" height="475" rx="16" fill="#0b1329" stroke="#1e293b" stroke-width="1.5"/>
      <g transform="translate(60, 45)">
        <rect width="180" height="28" rx="6" fill="#ef4444"/><text x="14" y="19" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="800" fill="#fff">BREAKDOWN 05 OF 05</text>
        <text y="65" font-family="'Inter', sans-serif" font-size="30" font-weight="900" fill="#fff">Post-Sale Revenue Amnesia: The Handshake Chasm</text>
        <g transform="translate(0, 110)">
          <g transform="translate(0, 0)">
            <rect width="480" height="190" rx="12" fill="#1e293b" stroke="#334155"/>
            <text x="30" y="40" font-family="'Inter', sans-serif" font-size="16" font-weight="700" fill="#38bdf8">WHAT SALES COMMITTED</text>
            <text x="30" y="75" font-family="'Inter', sans-serif" font-size="13" fill="#94a3b8">
              <tspan x="30" dy="0">Value benchmarks, custom SLAs, security promises,</tspan>
              <tspan x="30" dy="22">and specific timeline expectations given to executive</tspan>
              <tspan x="30" dy="22">buyers during closing discussions.</tspan>
            </text>
          </g>
          <g transform="translate(500, 0)">
            <rect width="40" height="190" rx="6" fill="#450a0a"/>
            <text x="20" y="95" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="800" fill="#ef4444" transform="rotate(-90 20 95)">CONTEXT CHASM</text>
          </g>
          <g transform="translate(560, 0)">
            <rect width="480" height="190" rx="12" fill="#1e293b" stroke="#334155"/>
            <text x="30" y="40" font-family="'Inter', sans-serif" font-size="16" font-weight="700" fill="#ef4444">WHAT CUSTOMER SUCCESS RECEIVES</text>
            <text x="30" y="75" font-family="'Inter', sans-serif" font-size="13" fill="#94a3b8">
              <tspan x="30" dy="0">A bare-bones CRM record with half-filled fields.</tspan>
              <tspan x="30" dy="22">The customer is forced to re-explain their entire</tspan>
              <tspan x="30" dy="22">business problem during onboarding.</tspan>
            </text>
          </g>
        </g>
      </g>`
  },
  {
    num: 11, title: "The Cost of Inaction: Macro Framework", timecode: "7:45 – 8:30", type: "Executive 4-Quadrant Matrix Canvas & Disclaimer",
    content: `
      <rect x="0" y="0" width="1160" height="475" rx="16" fill="#0b1329" stroke="#1e293b" stroke-width="1.5"/>
      <g transform="translate(60, 35)">
        <text font-family="'Inter', sans-serif" font-size="14" font-weight="700" fill="#ef4444" letter-spacing="0.1em">CFO-AUDITED COST OF INACTION ON A $100M ARR ENTERPRISE</text>
        <text y="40" font-family="'Inter', sans-serif" font-size="28" font-weight="900" fill="#fff">The $17,180,000 Annual Silent Profit Bleed</text>
        <g transform="translate(0, 65)">
          <g transform="translate(0, 0)">
            <rect width="500" height="120" rx="10" fill="#1e293b" stroke="#ef4444" stroke-width="1.5"/>
            <text x="25" y="38" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#ef4444">Q1: PIPELINE DECAY</text>
            <text x="25" y="80" font-family="'Inter', sans-serif" font-size="30" font-weight="900" fill="#fff">$7,840,000</text>
          </g>
          <g transform="translate(540, 0)">
            <rect width="500" height="120" rx="10" fill="#1e293b" stroke="#ef4444" stroke-width="1.5"/>
            <text x="25" y="38" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#ef4444">Q2: TALENT WASTE</text>
            <text x="25" y="80" font-family="'Inter', sans-serif" font-size="30" font-weight="900" fill="#fff">$4,120,000</text>
          </g>
          <g transform="translate(0, 145)">
            <rect width="500" height="120" rx="10" fill="#1e293b" stroke="#ef4444" stroke-width="1.5"/>
            <text x="25" y="38" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#ef4444">Q3: POINT-TOOL SPRAWL</text>
            <text x="25" y="80" font-family="'Inter', sans-serif" font-size="30" font-weight="900" fill="#fff">$1,820,000</text>
          </g>
          <g transform="translate(540, 145)">
            <rect width="500" height="120" rx="10" fill="#1e293b" stroke="#ef4444" stroke-width="1.5"/>
            <text x="25" y="38" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#ef4444">Q4: OPPORTUNITY COST</text>
            <text x="25" y="80" font-family="'Inter', sans-serif" font-size="30" font-weight="900" fill="#fff">$3,400,000</text>
          </g>
        </g>
        <g transform="translate(0, 375)">
          <text font-family="'Inter', sans-serif" font-size="11" fill="#64748b">*Illustrative financial model based on empirical benchmarks ($100M ARR baseline). Individual results depend on TAM, velocity, and cycle length.</text>
        </g>
      </g>`
  },
  {
    num: 12, title: "Quadrants 1 & 2: Direct Decay & Talent Waste", timecode: "8:30 – 9:30", type: "Deep-Dive Cards: Q1 & Q2",
    content: `
      <rect x="0" y="0" width="1160" height="475" rx="16" fill="#0b1329" stroke="#1e293b" stroke-width="1.5"/>
      <g transform="translate(60, 45)">
        <text font-family="'Inter', sans-serif" font-size="14" font-weight="700" fill="#ef4444" letter-spacing="0.1em">COI BREAKDOWN • PART 1</text>
        <text y="40" font-family="'Inter', sans-serif" font-size="28" font-weight="800" fill="#fff">Direct Revenue Erosion: $11.96M Combined Loss</text>
        <g transform="translate(0, 80)">
          <g transform="translate(0, 0)">
            <rect width="500" height="230" rx="12" fill="#1e293b" stroke="#ef4444" stroke-width="1.5"/>
            <g transform="translate(30, 35)">
              <text font-family="'JetBrains Mono', monospace" font-size="14" font-weight="800" fill="#ef4444">QUADRANT 01: PIPELINE DECAY</text>
              <text y="45" font-family="'Inter', sans-serif" font-size="36" font-weight="900" fill="#fff">$7.84M / yr</text>
              <text y="90" font-family="'Inter', sans-serif" font-size="14" fill="#94a3b8">
                <tspan x="0" dy="0">• 67% slip rate compounds cycle latency</tspan>
                <tspan x="0" dy="24">• Late-stage buying committee vetos waste months</tspan>
              </text>
            </g>
          </g>
          <g transform="translate(540, 0)">
            <rect width="500" height="230" rx="12" fill="#1e293b" stroke="#ef4444" stroke-width="1.5"/>
            <g transform="translate(30, 35)">
              <text font-family="'JetBrains Mono', monospace" font-size="14" font-weight="800" fill="#ef4444">QUADRANT 02: TALENT DRAG</text>
              <text y="45" font-family="'Inter', sans-serif" font-size="36" font-weight="900" fill="#fff">$4.12M / yr</text>
              <text y="90" font-family="'Inter', sans-serif" font-size="14" fill="#94a3b8">
                <tspan x="0" dy="0">• 9-month average enterprise rep ramp duration</tspan>
                <tspan x="0" dy="24">• 34% annual turnover burns fully-loaded OTE</tspan>
              </text>
            </g>
          </g>
        </g>
      </g>`
  },
  {
    num: 13, title: "Quadrants 3 & 4: Tech Overhead & Opportunity Cost", timecode: "9:30 – 10:30", type: "Deep-Dive Cards: Q3 & Q4",
    content: `
      <rect x="0" y="0" width="1160" height="475" rx="16" fill="#0b1329" stroke="#1e293b" stroke-width="1.5"/>
      <g transform="translate(60, 45)">
        <text font-family="'Inter', sans-serif" font-size="14" font-weight="700" fill="#ef4444" letter-spacing="0.1em">COI BREAKDOWN • PART 2</text>
        <text y="40" font-family="'Inter', sans-serif" font-size="28" font-weight="800" fill="#fff">Structural Overhead: $5.22M Combined Loss</text>
        <g transform="translate(0, 80)">
          <g transform="translate(0, 0)">
            <rect width="500" height="230" rx="12" fill="#1e293b" stroke="#ef4444" stroke-width="1.5"/>
            <g transform="translate(30, 35)">
              <text font-family="'JetBrains Mono', monospace" font-size="14" font-weight="800" fill="#ef4444">QUADRANT 03: TECH SPRAWL</text>
              <text y="45" font-family="'Inter', sans-serif" font-size="36" font-weight="900" fill="#fff">$1.82M / yr</text>
              <text y="90" font-family="'Inter', sans-serif" font-size="14" fill="#94a3b8">
                <tspan x="0" dy="0">• 14 average disconnected sales point solutions</tspan>
                <tspan x="0" dy="24">• Redundant data enrichment and tool seat waste</tspan>
              </text>
            </g>
          </g>
          <g transform="translate(540, 0)">
            <rect width="500" height="230" rx="12" fill="#1e293b" stroke="#ef4444" stroke-width="1.5"/>
            <g transform="translate(30, 35)">
              <text font-family="'JetBrains Mono', monospace" font-size="14" font-weight="800" fill="#ef4444">QUADRANT 04: OPPORTUNITY COST</text>
              <text y="45" font-family="'Inter', sans-serif" font-size="36" font-weight="900" fill="#fff">$3.40M / yr</text>
              <text y="90" font-family="'Inter', sans-serif" font-size="14" fill="#94a3b8">
                <tspan x="0" dy="0">• Competitors with autonomous telemetry capture deals</tspan>
                <tspan x="0" dy="24">• Permanent erosion of market share and margin yield</tspan>
              </text>
            </g>
          </g>
        </g>
      </g>`
  },
  {
    num: 14, title: "Point-Tool Proliferation & Human Middleware", timecode: "10:30 – 11:45", type: "14-Tool Sprawl vs Rep Drag",
    content: `
      <rect x="0" y="0" width="1160" height="475" rx="16" fill="#0b1329" stroke="#1e293b" stroke-width="1.5"/>
      <g transform="translate(60, 45)">
        <text font-family="'Inter', sans-serif" font-size="14" font-weight="700" fill="#38bdf8" letter-spacing="0.1em">POINT-TOOL PROLIFERATION: 14 SEPARATE BROWSER TABS</text>
        <text y="40" font-family="'Inter', sans-serif" font-size="28" font-weight="800" fill="#fff">Sales Reps Forced to Act as "Human Middleware"</text>
        <g transform="translate(0, 80)">
          <g transform="translate(50, 40)">
            <rect width="120" height="40" rx="6" fill="#1e293b" stroke="#475569"/><text x="60" y="25" text-anchor="middle" font-family="'Inter', sans-serif" font-size="11" fill="#fff">Outreach</text>
            <rect x="150" width="120" height="40" rx="6" fill="#1e293b" stroke="#475569"/><text x="210" y="25" text-anchor="middle" font-family="'Inter', sans-serif" font-size="11" fill="#fff">LinkedIn Nav</text>
            <rect y="60" width="120" height="40" rx="6" fill="#1e293b" stroke="#475569"/><text x="60" y="85" text-anchor="middle" font-family="'Inter', sans-serif" font-size="11" fill="#fff">ZoomInfo</text>
            <rect x="150" y="60" width="120" height="40" rx="6" fill="#1e293b" stroke="#475569"/><text x="210" y="85" text-anchor="middle" font-family="'Inter', sans-serif" font-size="11" fill="#fff">Salesforce</text>
          </g>
          <g transform="translate(450, 20)">
            <rect width="550" height="200" rx="12" fill="#1e1b4b" stroke="#ef4444" stroke-width="1.5"/>
            <g transform="translate(35, 35)">
              <text font-family="'Inter', sans-serif" font-size="18" font-weight="800" fill="#f87171">The Human Middleware Trap</text>
              <text y="40" font-family="'Inter', sans-serif" font-size="14" fill="#c7d2fe">
                <tspan x="0" dy="0">Reps manually copy-paste data across 14 fragmented systems:</tspan>
                <tspan x="0" dy="24">2.4 hours lost daily to context switching, zero shared state,</tspan>
                <tspan x="0" dy="24">and point-AI tools that simply blast generic outbound spam.</tspan>
              </text>
            </g>
          </g>
        </g>
      </g>`
  },
  {
    num: 15, title: "The Connected System of Intelligence", timecode: "11:45 – 12:45", type: "Unified Revenue Architecture Schematic",
    content: `
      <rect x="0" y="0" width="1160" height="475" rx="16" fill="#0b1329" stroke="#1e293b" stroke-width="1.5"/>
      <g transform="translate(60, 45)">
        <text font-family="'Inter', sans-serif" font-size="14" font-weight="700" fill="#38bdf8" letter-spacing="0.1em">THE ARCHITECTURAL PARADIGM SHIFT</text>
        <text y="40" font-family="'Inter', sans-serif" font-size="28" font-weight="800" fill="#fff">From Fragmented Tools to Unified System of Intelligence</text>
        <g transform="translate(0, 80)">
          <rect y="160" width="1040" height="60" rx="8" fill="#1e293b" stroke="#334155"/><text x="30" y="196" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#94a3b8">TIER 3: SYSTEM OF RECORD (Salesforce • HubSpot • Snowflake • ERP)</text>
          <rect y="80" width="1040" height="60" rx="8" fill="#1e3a8a" stroke="#2563eb"/><text x="30" y="116" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#60a5fa">TIER 2: REAL-TIME INTENT &amp; IDENTITY FABRIC (Dark Funnel • Topology Graph)</text>
          <rect y="0" width="1040" height="60" rx="8" fill="#065f46" stroke="#10b981"/><text x="30" y="36" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#34d399">TIER 1: AUTONOMOUS REVENUE ORCHESTRATION (Agentic SDRs • Sub-60s Dossiers)</text>
        </g>
        <g transform="translate(0, 340)"><text font-family="'Inter', sans-serif" font-size="15" font-weight="600" fill="#38bdf8">Preserves CRM investments while eliminating manual human glue through native autonomy.</text></g>
      </g>`
  },
  {
    num: 16, title: "Executive Summary & Video 2 Call to Action", timecode: "12:45 – 13:45", type: "Summary Pillars, eBook Asset & Part 2 Slate",
    content: `
      <rect x="0" y="0" width="1160" height="475" rx="16" fill="#0b1329" stroke="#1e293b" stroke-width="1.5"/>
      <g transform="translate(60, 45)">
        <text font-family="'Inter', sans-serif" font-size="14" font-weight="700" fill="#38bdf8" letter-spacing="0.1em">BRIEFING 01 COMPLETE</text>
        <text y="40" font-family="'Inter', sans-serif" font-size="28" font-weight="800" fill="#fff">Stop Hiring Into Friction: Architect for Capital Efficiency</text>
        <g transform="translate(0, 80)">
          <g transform="translate(0, 0)">
            <rect width="480" height="200" rx="12" fill="#1e293b" stroke="#334155"/>
            <g transform="translate(30, 35)">
              <text font-family="'Inter', sans-serif" font-size="15" font-weight="800" fill="#38bdf8">FREE EXECUTIVE DOWNLOAD</text>
              <text y="35" font-family="'Inter', sans-serif" font-size="19" font-weight="800" fill="#fff">The Cost of Inaction Diagnostic Playbook</text>
              <text y="70" font-family="'Inter', sans-serif" font-size="13" fill="#94a3b8">Complete mathematical formulas, 4-quadrant calculators, and CFO review templates.</text>
              <rect y="100" width="220" height="38" rx="6" fill="#2563eb"/><text x="110" y="124" text-anchor="middle" font-family="'Inter', sans-serif" font-size="12" font-weight="700" fill="#fff">profitmachines.com/diagnostic</text>
            </g>
          </g>
          <g transform="translate(520, 0)">
            <rect width="520" height="200" rx="12" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
            <g transform="translate(30, 35)">
              <text font-family="'JetBrains Mono', monospace" font-size="13" font-weight="800" fill="#38bdf8">NEXT BRIEFING: PART 2</text>
              <text y="35" font-family="'Inter', sans-serif" font-size="19" font-weight="800" fill="#fff">Beyond AI Chatbots: How Transformation Works</text>
              <text y="70" font-family="'Inter', sans-serif" font-size="13" fill="#94a3b8">Learn how autonomous agents, dark demand ingestion, and unified telemetry replace tool sprawl.</text>
              <text y="124" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#34d399">WATCH PART 2 &rarr;</text>
            </g>
          </g>
        </g>
      </g>`
  }
];

// VIDEO 2 SCENES
const v2Scenes = [
  {
    num: 1, title: "Cold Open Hook: The AI Disillusionment", timecode: "0:00 – 0:45", type: "Point AI Clutter vs Autonomous Engine",
    content: `
      <rect x="0" y="0" width="1160" height="475" rx="16" fill="#0b1329" stroke="#1e293b" stroke-width="1.5"/>
      <g transform="translate(60, 45)">
        <text font-family="'Inter', sans-serif" font-size="14" font-weight="700" fill="#60a5fa" letter-spacing="0.1em">BRIEFING 02 HOOK</text>
        <text y="40" font-family="'Inter', sans-serif" font-size="28" font-weight="900" fill="#fff">Why 85% of Generative AI Sales Pilots Fail to Produce ROI</text>
        <g transform="translate(0, 90)">
          <g transform="translate(0, 0)">
            <rect width="500" height="220" rx="12" fill="#1e293b" stroke="#ef4444" stroke-width="1.5"/>
            <g transform="translate(30, 35)">
              <text font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#ef4444">POINT AI / CHATBOT WRAPPERS</text>
              <text y="35" font-family="'Inter', sans-serif" font-size="18" font-weight="800" fill="#fff">Generates Uncalibrated Outbound Noise</text>
              <text y="70" font-family="'Inter', sans-serif" font-size="14" fill="#94a3b8">
                <tspan x="0" dy="0">• 400% surge in generic AI outbound sequences</tspan>
                <tspan x="0" dy="24">• Severe deliverability crash: open rates collapse to &lt; 8%</tspan>
              </text>
            </g>
          </g>
          <g transform="translate(540, 0)">
            <rect width="500" height="220" rx="12" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
            <g transform="translate(30, 35)">
              <text font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#10b981">AUTONOMOUS REVENUE ARCHITECTURE</text>
              <text y="35" font-family="'Inter', sans-serif" font-size="18" font-weight="800" fill="#fff">Connected System of Intelligence</text>
              <text y="70" font-family="'Inter', sans-serif" font-size="14" fill="#94a3b8">
                <tspan x="0" dy="0">• Autonomous buyer topology discovery</tspan>
                <tspan x="0" dy="24">• Sub-60s pre-call context dossiers delivered to reps</tspan>
              </text>
            </g>
          </g>
        </g>
      </g>`
  },
  {
    num: 2, title: "The Limits of Point AI & Commodity Text", timecode: "0:45 – 1:30", type: "Email Spam Surge vs Deliverability Crash",
    content: `
      <rect x="0" y="0" width="1160" height="475" rx="16" fill="#0b1329" stroke="#1e293b" stroke-width="1.5"/>
      <g transform="translate(60, 45)">
        <text font-family="'Inter', sans-serif" font-size="14" font-weight="700" fill="#ef4444" letter-spacing="0.1em">COMMODITY AI FALLACY</text>
        <text y="40" font-family="'Inter', sans-serif" font-size="28" font-weight="900" fill="#fff">More Email Does Not Equal More Pipeline</text>
        <g transform="translate(0, 90)">
          <g transform="translate(0, 0)">
            <rect width="320" height="150" rx="12" fill="#1e293b" stroke="#ef4444"/>
            <text x="25" y="40" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#ef4444">OUTBOUND VOLUME</text>
            <text x="25" y="85" font-family="'Inter', sans-serif" font-size="36" font-weight="900" fill="#fff">+400%</text>
            <text x="25" y="120" font-family="'Inter', sans-serif" font-size="13" fill="#94a3b8">Market volume deluge</text>
          </g>
          <g transform="translate(360, 0)">
            <rect width="320" height="150" rx="12" fill="#1e293b" stroke="#ef4444"/>
            <text x="25" y="40" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#ef4444">REPLY RATES</text>
            <text x="25" y="85" font-family="'Inter', sans-serif" font-size="36" font-weight="900" fill="#ef4444">&lt; 1.2%</text>
            <text x="25" y="120" font-family="'Inter', sans-serif" font-size="13" fill="#94a3b8">Historic low conversion</text>
          </g>
          <g transform="translate(720, 0)">
            <rect width="320" height="150" rx="12" fill="#1e293b" stroke="#ef4444"/>
            <text x="25" y="40" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#ef4444">DOMAIN REPUTATION</text>
            <text x="25" y="85" font-family="'Inter', sans-serif" font-size="36" font-weight="900" fill="#ef4444">High Burn</text>
            <text x="25" y="120" font-family="'Inter', sans-serif" font-size="13" fill="#94a3b8">Blacklisting by Google/MSFT</text>
          </g>
        </g>
        <g transform="translate(0, 310)"><text font-family="'Inter', sans-serif" font-size="15" fill="#f87171" font-weight="600">"Generative AI applied to a bad sales process simply accelerates brand reputation destruction."</text></g>
      </g>`
  },
  {
    num: 3, title: "Point AI vs. System of Intelligence", timecode: "1:30 – 2:15", type: "Architectural Comparison",
    content: `
      <rect x="0" y="0" width="1160" height="475" rx="16" fill="#0b1329" stroke="#1e293b" stroke-width="1.5"/>
      <g transform="translate(60, 45)">
        <text font-family="'Inter', sans-serif" font-size="14" font-weight="700" fill="#60a5fa" letter-spacing="0.1em">ARCHITECTURAL TAXONOMY</text>
        <text y="40" font-family="'Inter', sans-serif" font-size="28" font-weight="900" fill="#fff">Single Prompt Wrappers vs Bi-Directional Systems</text>
        <g transform="translate(0, 90)">
          <g transform="translate(0, 0)">
            <rect width="500" height="230" rx="12" fill="#1e293b" stroke="#ef4444"/>
            <g transform="translate(30, 30)">
              <text font-family="'Inter', sans-serif" font-size="16" font-weight="800" fill="#ef4444">POINT-AI (Isolated Wrappers)</text>
              <text y="35" font-family="'Inter', sans-serif" font-size="14" fill="#94a3b8">
                <tspan x="0" dy="0">• Prompt sent to LLM without enterprise context</tspan>
                <tspan x="0" dy="24">• Zero memory of past closed-lost deals or hurdles</tspan>
                <tspan x="0" dy="24">• Writes copy without verifying CRM stage status</tspan>
              </text>
            </g>
          </g>
          <g transform="translate(540, 0)">
            <rect width="500" height="230" rx="12" fill="#1e293b" stroke="#10b981"/>
            <g transform="translate(30, 30)">
              <text font-family="'Inter', sans-serif" font-size="16" font-weight="800" fill="#10b981">SYSTEM OF INTELLIGENCE (Connected)</text>
              <text y="35" font-family="'Inter', sans-serif" font-size="14" fill="#94a3b8">
                <tspan x="0" dy="0">• Read/write telemetry across CRM, billing, &amp; logs</tspan>
                <tspan x="0" dy="24">• Dynamic relationship graph of buyer committees</tspan>
                <tspan x="0" dy="24">• Strict deterministic verification gates before execution</tspan>
              </text>
            </g>
          </g>
        </g>
      </g>`
  },
  {
    num: 4, title: "Tier 3: Enterprise Systems of Record", timecode: "2:15 – 3:15", type: "3D Foundation Layer",
    content: `
      <rect x="0" y="0" width="1160" height="475" rx="16" fill="#0b1329" stroke="#1e293b" stroke-width="1.5"/>
      <g transform="translate(60, 45)">
        <text font-family="'Inter', sans-serif" font-size="14" font-weight="700" fill="#60a5fa" letter-spacing="0.1em">3-TIER ARCHITECTURE • TIER 3 (FOUNDATION)</text>
        <text y="40" font-family="'Inter', sans-serif" font-size="28" font-weight="900" fill="#fff">Enterprise Systems of Record: Zero Rip-and-Replace</text>
        <g transform="translate(0, 100)">
          <rect width="1040" height="170" rx="12" fill="#1e293b" stroke="#334155" stroke-width="2"/>
          <g transform="translate(40, 35)">
            <text font-family="'JetBrains Mono', monospace" font-size="16" font-weight="800" fill="#94a3b8">TIER 3: EXISTING REVENUE INFRASTRUCTURE</text>
            <text y="35" font-family="'Inter', sans-serif" font-size="15" fill="#f8fafc">Salesforce • HubSpot • Snowflake • NetSuite • Gong • Microsoft 365</text>
            <text y="70" font-family="'Inter', sans-serif" font-size="13" fill="#64748b">
              <tspan x="0" dy="0">We do not replace your CRM. ProfitMachines acts as an autonomous intelligence overlay</tspan>
              <tspan x="0" dy="22">that reads and enriches your existing database continuously via verified native APIs.</tspan>
            </text>
          </g>
        </g>
      </g>`
  },
  {
    num: 5, title: "Tier 2: Unified Revenue Data & Decision Fabric", timecode: "3:15 – 4:30", type: "Multi-Channel Telemetry Core",
    content: `
      <rect x="0" y="0" width="1160" height="475" rx="16" fill="#0b1329" stroke="#1e293b" stroke-width="1.5"/>
      <g transform="translate(60, 45)">
        <text font-family="'Inter', sans-serif" font-size="14" font-weight="700" fill="#60a5fa" letter-spacing="0.1em">3-TIER ARCHITECTURE • TIER 2 (DECISION CORE)</text>
        <text y="40" font-family="'Inter', sans-serif" font-size="28" font-weight="900" fill="#fff">Unified Revenue Data &amp; Decision Fabric</text>
        <g transform="translate(0, 100)">
          <rect width="1040" height="180" rx="12" fill="#1e3a8a" stroke="#2563eb" stroke-width="2"/>
          <g transform="translate(40, 35)">
            <text font-family="'JetBrains Mono', monospace" font-size="16" font-weight="800" fill="#60a5fa">TIER 2: REAL-TIME INTENT &amp; ENTITY RESOLUTION FABRIC</text>
            <text y="35" font-family="'Inter', sans-serif" font-size="15" fill="#f8fafc">Dark Funnel Resolution • Entity Identity Resolution • Dynamic Buying Topology</text>
            <text y="70" font-family="'Inter', sans-serif" font-size="13" fill="#93c5fd">
              <tspan x="0" dy="0">Resolves anonymous IP addresses, documentation visits, and GitHub telemetry into concrete target account</tspan>
              <tspan x="0" dy="22">buying committees with verified stakeholder roles and contact intelligence.</tspan>
            </text>
          </g>
        </g>
      </g>`
  },
  {
    num: 6, title: "Tier 1: AI-Native Orchestration & Agents", timecode: "4:30 – 5:30", type: "Full 3-Tier Exploded Architecture",
    content: `
      <rect x="0" y="0" width="1160" height="475" rx="16" fill="#0b1329" stroke="#1e293b" stroke-width="1.5"/>
      <g transform="translate(60, 45)">
        <text font-family="'Inter', sans-serif" font-size="14" font-weight="700" fill="#10b981" letter-spacing="0.1em">3-TIER ARCHITECTURE • TIER 1 (AUTONOMOUS EXECUTION)</text>
        <text y="40" font-family="'Inter', sans-serif" font-size="28" font-weight="900" fill="#fff">Autonomous Multi-Agent Orchestration Layer</text>
        <g transform="translate(0, 80)">
          <rect width="1040" height="70" rx="8" fill="#065f46" stroke="#10b981"/><text x="30" y="42" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#34d399">TIER 1: AGENTIC SDRs • SUB-60s DOSSIERS • CLOSED-LOOP MULTITHREADING</text>
          <rect y="85" width="1040" height="70" rx="8" fill="#1e3a8a" stroke="#2563eb"/><text x="30" y="127" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#60a5fa">TIER 2: REAL-TIME INTENT &amp; ENTITY RESOLUTION FABRIC</text>
          <rect y="170" width="1040" height="70" rx="8" fill="#1e293b" stroke="#334155"/><text x="30" y="212" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#94a3b8">TIER 3: SYSTEMS OF RECORD (Salesforce • Snowflake • ERP)</text>
        </g>
        <g transform="translate(0, 340)"><text font-family="'Inter', sans-serif" font-size="14" font-weight="600" fill="#a7f3d0">Autonomous agents act with deterministic mathematical constraints—zero hallucination, strict enterprise guardrails.</text></g>
      </g>`
  },
  {
    num: 7, title: "Capability 1: Profit Pool Discovery", timecode: "5:30 – 6:45", type: "Micro-Niche Economic Sizing Radar Map",
    content: `
      <rect x="0" y="0" width="1160" height="475" rx="16" fill="#0b1329" stroke="#1e293b" stroke-width="1.5"/>
      <g transform="translate(60, 45)">
        <rect width="180" height="28" rx="6" fill="#2563eb"/><text x="14" y="19" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="800" fill="#fff">CAPABILITY 01 OF 08</text>
        <text y="65" font-family="'Inter', sans-serif" font-size="30" font-weight="900" fill="#fff">Profit Pool Discovery: Precision Micro-ICP Targeting</text>
        <g transform="translate(0, 110)">
          <g transform="translate(0, 0)">
            <rect width="500" height="190" rx="12" fill="#1e293b" stroke="#334155"/>
            <text x="30" y="40" font-family="'Inter', sans-serif" font-size="16" font-weight="700" fill="#38bdf8">TRADITIONAL ICP</text>
            <text x="30" y="75" font-family="'Inter', sans-serif" font-size="14" fill="#94a3b8">
              <tspan x="30" dy="0">"B2B SaaS companies, 200–500 employees."</tspan>
              <tspan x="30" dy="24">Indiscriminate, noisy outbound volume with</tspan>
              <tspan x="30" dy="24">collapsing response rates and low margins.</tspan>
            </text>
          </g>
          <g transform="translate(540, 0)">
            <rect width="500" height="190" rx="12" fill="#1e293b" stroke="#10b981"/>
            <text x="30" y="40" font-family="'Inter', sans-serif" font-size="16" font-weight="700" fill="#34d399">PROFITMACHINES MICRO-NICHE</text>
            <text x="30" y="75" font-family="'Inter', sans-serif" font-size="14" fill="#94a3b8">
              <tspan x="30" dy="0">Identifies micro-vertical sub-segments with 80%+</tspan>
              <tspan x="30" dy="24">gross margin potential, active compliance mandates,</tspan>
              <tspan x="30" dy="24">and demonstrably high willingness to pay.</tspan>
            </text>
          </g>
        </g>
      </g>`
  },
  {
    num: 8, title: "Capability 2: Demand Engineering & Topology", timecode: "6:45 – 8:00", type: "Intent Sensing & Buying Group Topology",
    content: `
      <rect x="0" y="0" width="1160" height="475" rx="16" fill="#0b1329" stroke="#1e293b" stroke-width="1.5"/>
      <g transform="translate(60, 45)">
        <rect width="180" height="28" rx="6" fill="#2563eb"/><text x="14" y="19" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="800" fill="#fff">CAPABILITY 02 OF 08</text>
        <text y="65" font-family="'Inter', sans-serif" font-size="30" font-weight="900" fill="#fff">Demand Engineering: Autonomous Committee Discovery</text>
        <g transform="translate(0, 110)">
          <rect width="1040" height="180" rx="12" fill="#1e293b" stroke="#334155"/>
          <g transform="translate(35, 35)">
            <text font-family="'Inter', sans-serif" font-size="16" font-weight="700" fill="#60a5fa">Dynamic Multi-Threading Topology</text>
            <text y="35" font-family="'Inter', sans-serif" font-size="14" fill="#94a3b8">
              <tspan x="0" dy="0">When an enterprise account shows dark intent, ProfitMachines instantly maps the 8 key committee personas,</tspan>
              <tspan x="0" dy="24">surfaces verified contact intelligence, and designs persona-tailored value narratives before human outreach begins.</tspan>
            </text>
          </g>
        </g>
      </g>`
  },
  {
    num: 9, title: "Capability 3: Sub-60s Context Dossiers", timecode: "8:00 – 9:15", type: "Calendar Dossier & Dynamic Battlecards",
    content: `
      <rect x="0" y="0" width="1160" height="475" rx="16" fill="#0b1329" stroke="#1e293b" stroke-width="1.5"/>
      <g transform="translate(60, 45)">
        <rect width="180" height="28" rx="6" fill="#2563eb"/><text x="14" y="19" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="800" fill="#fff">CAPABILITY 03 OF 08</text>
        <text y="65" font-family="'Inter', sans-serif" font-size="30" font-weight="900" fill="#fff">Sub-60s Context Dossiers: Instant AE Preparation</text>
        <g transform="translate(0, 110)">
          <rect width="1040" height="190" rx="12" fill="#1e293b" stroke="#334155"/>
          <g transform="translate(35, 35)">
            <text font-family="'JetBrains Mono', monospace" font-size="14" font-weight="800" fill="#38bdf8">AUTOMATED PRE-CALL EXECUTIVE BRIEFING</text>
            <text y="35" font-family="'Inter', sans-serif" font-size="14" fill="#f8fafc">60 minutes before every demo, the rep receives a 1-page synthesized dossier:</text>
            <text y="65" font-family="'Inter', sans-serif" font-size="13" fill="#94a3b8">
              <tspan x="0" dy="0">• 10-K financial priorities &amp; CEO earnings call quotes</tspan>
              <tspan x="0" dy="22">• Tech stack and detected competitor integration points</tspan>
              <tspan x="0" dy="22">• Persona-specific objection battlecards for the specific buyer.</tspan>
            </text>
          </g>
        </g>
      </g>`
  },
  {
    num: 10, title: "The Mark Roberge Sales Velocity Formula", timecode: "9:15 – 10:00", type: "Compounding Velocity Engine",
    content: `
      <rect x="0" y="0" width="1160" height="475" rx="16" fill="#0b1329" stroke="#1e293b" stroke-width="1.5"/>
      <g transform="translate(60, 45)">
        <text font-family="'Inter', sans-serif" font-size="14" font-weight="700" fill="#60a5fa" letter-spacing="0.1em">MATHEMATICAL ENGINE</text>
        <text y="40" font-family="'Inter', sans-serif" font-size="28" font-weight="900" fill="#fff">The Mark Roberge Sales Velocity Formula</text>
        <g transform="translate(0, 90)">
          <rect width="1040" height="130" rx="12" fill="#040814" stroke="#2563eb" stroke-width="2"/>
          <text x="520" y="55" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="26" font-weight="900" fill="#38bdf8">
            V = ( Qualified Ops × Win Rate % × ACV ) ÷ Sales Cycle (Days)
          </text>
          <text x="520" y="95" text-anchor="middle" font-family="'Inter', sans-serif" font-size="14" fill="#94a3b8">
            ProfitMachines mathematically influences all 4 variables simultaneously.
          </text>
        </g>
        <g transform="translate(0, 260)">
          <text font-family="'Inter', sans-serif" font-size="15" fill="#a7f3d0" font-weight="600">
            A 10% lift in win rate + 15% reduction in cycle length compounds into a 32%+ increase in revenue velocity.
          </text>
        </g>
      </g>`
  },
  {
    num: 11, title: "Capability 4: Zero-Touch RevOps Sync", timecode: "10:00 – 10:45", type: "Bidirectional CRM Hygiene Graphic",
    content: `
      <rect x="0" y="0" width="1160" height="475" rx="16" fill="#0b1329" stroke="#1e293b" stroke-width="1.5"/>
      <g transform="translate(60, 45)">
        <rect width="180" height="28" rx="6" fill="#2563eb"/><text x="14" y="19" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="800" fill="#fff">CAPABILITY 04 OF 08</text>
        <text y="65" font-family="'Inter', sans-serif" font-size="30" font-weight="900" fill="#fff">Zero-Touch RevOps: Eliminating Rep CRM Entry</text>
        <g transform="translate(0, 110)">
          <rect width="1040" height="180" rx="12" fill="#1e293b" stroke="#334155"/>
          <g transform="translate(35, 35)">
            <text font-family="'Inter', sans-serif" font-size="16" font-weight="700" fill="#60a5fa">Autonomous Activity Ingestion</text>
            <text y="35" font-family="'Inter', sans-serif" font-size="14" fill="#94a3b8">
              <tspan x="0" dy="0">Every email, call transcript, and agreed action item is automatically parsed and synced into Salesforce fields.</tspan>
              <tspan x="0" dy="24">Reps never waste an hour manually logging notes or updating deal stages again.</tspan>
            </text>
          </g>
        </g>
      </g>`
  },
  {
    num: 12, title: "Capability 5: The Value Handshake & 120-Day Alerts", timecode: "10:45 – 11:30", type: "Handshake & Renewal Trigger Interface",
    content: `
      <rect x="0" y="0" width="1160" height="475" rx="16" fill="#0b1329" stroke="#1e293b" stroke-width="1.5"/>
      <g transform="translate(60, 45)">
        <rect width="180" height="28" rx="6" fill="#2563eb"/><text x="14" y="19" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="800" fill="#fff">CAPABILITY 05 OF 08</text>
        <text y="65" font-family="'Inter', sans-serif" font-size="30" font-weight="900" fill="#fff">The Value Handshake: Bridging Sales to Retention</text>
        <g transform="translate(0, 110)">
          <rect width="1040" height="180" rx="12" fill="#1e293b" stroke="#334155"/>
          <g transform="translate(35, 35)">
            <text font-family="'Inter', sans-serif" font-size="16" font-weight="700" fill="#10b981">Automated 120-Day Renewal &amp; Expansion Triggers</text>
            <text y="35" font-family="'Inter', sans-serif" font-size="14" fill="#94a3b8">
              <tspan x="0" dy="0">Contract milestones are tracked against live product telemetry. When value thresholds are met,</tspan>
              <tspan x="0" dy="24">automated expansion recommendations trigger 120 days before contract expiry.</tspan>
            </text>
          </g>
        </g>
      </g>`
  },
  {
    num: 13, title: "Capability 6: Growth Intelligence & Forecasting", timecode: "11:30 – 12:15", type: "Empirical Velocity vs Subjective Bias",
    content: `
      <rect x="0" y="0" width="1160" height="475" rx="16" fill="#0b1329" stroke="#1e293b" stroke-width="1.5"/>
      <g transform="translate(60, 45)">
        <rect width="180" height="28" rx="6" fill="#2563eb"/><text x="14" y="19" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="800" fill="#fff">CAPABILITY 06 OF 08</text>
        <text y="65" font-family="'Inter', sans-serif" font-size="30" font-weight="900" fill="#fff">Growth Intelligence: Forecast Variance Under 4%</text>
        <g transform="translate(0, 110)">
          <g transform="translate(0, 0)">
            <rect width="500" height="180" rx="12" fill="#1e293b" stroke="#ef4444"/>
            <text x="30" y="40" font-family="'Inter', sans-serif" font-size="16" font-weight="700" fill="#ef4444">SUBJECTIVE FORECAST (Traditional)</text>
            <text x="30" y="75" font-family="'Inter', sans-serif" font-size="14" fill="#94a3b8">
              <tspan x="30" dy="0">"Rep gut feel" and optimistic commit dates.</tspan>
              <tspan x="30" dy="24">Typical enterprise variance: 25%–35%.</tspan>
            </text>
          </g>
          <g transform="translate(540, 0)">
            <rect width="500" height="180" rx="12" fill="#1e293b" stroke="#10b981"/>
            <text x="30" y="40" font-family="'Inter', sans-serif" font-size="16" font-weight="700" fill="#10b981">EMPIRICAL FORECAST (ProfitMachines)</text>
            <text x="30" y="75" font-family="'Inter', sans-serif" font-size="14" fill="#94a3b8">
              <tspan x="30" dy="0">Mathematical stage velocity and committee depth.</tspan>
              <tspan x="30" dy="24">Audited forecast variance &lt; 4%.</tspan>
            </text>
          </g>
        </g>
      </g>`
  },
  {
    num: 14, title: "Capability 8: Zero-Data-Retention & Sovereign Trust", timecode: "12:15 – 12:45", type: "Cyber-Trust & Ephemeral Inference",
    content: `
      <rect x="0" y="0" width="1160" height="475" rx="16" fill="#0b1329" stroke="#1e293b" stroke-width="1.5"/>
      <g transform="translate(60, 45)">
        <rect width="180" height="28" rx="6" fill="#10b981"/><text x="14" y="19" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="800" fill="#fff">CAPABILITY 08 OF 08</text>
        <text y="65" font-family="'Inter', sans-serif" font-size="30" font-weight="900" fill="#fff">Zero-Data-Retention &amp; Enterprise Sovereign Trust</text>
        <g transform="translate(0, 110)">
          <rect width="1040" height="180" rx="12" fill="#1e293b" stroke="#334155"/>
          <g transform="translate(35, 35)">
            <text font-family="'JetBrains Mono', monospace" font-size="14" font-weight="800" fill="#34d399">EPHEMERAL INFERENCE GUARANTEE</text>
            <text y="35" font-family="'Inter', sans-serif" font-size="14" fill="#f8fafc">Customer data is processed ephemerally in RAM and instantly annihilated post-execution.</text>
            <text y="70" font-family="'Inter', sans-serif" font-size="13" fill="#94a3b8">Zero LLM training on enterprise IP • SOC 2 Type II • ISO 27001 • HIPAA and GDPR compliant.</text>
          </g>
        </g>
      </g>`
  },
  {
    num: 15, title: "Capability 7: GTM Transformation Alignment", timecode: "12:45 – 13:15", type: "Operating Model Alignment Matrix",
    content: `
      <rect x="0" y="0" width="1160" height="475" rx="16" fill="#0b1329" stroke="#1e293b" stroke-width="1.5"/>
      <g transform="translate(60, 45)">
        <rect width="180" height="28" rx="6" fill="#2563eb"/><text x="14" y="19" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="800" fill="#fff">CAPABILITY 07 OF 08</text>
        <text y="65" font-family="'Inter', sans-serif" font-size="30" font-weight="900" fill="#fff">GTM Operating Model Alignment</text>
        <g transform="translate(0, 110)">
          <rect width="1040" height="180" rx="12" fill="#1e293b" stroke="#334155"/>
          <g transform="translate(35, 35)">
            <text font-family="'Inter', sans-serif" font-size="16" font-weight="700" fill="#60a5fa">Culture, Incentives, and Enablement</text>
            <text y="35" font-family="'Inter', sans-serif" font-size="14" fill="#94a3b8">
              <tspan x="0" dy="0">Technology succeeds only when aligned with rep incentives. We align compensation models,</tspan>
              <tspan x="0" dy="24">management cadence, and enablement around high-velocity AI collaboration.</tspan>
            </text>
          </g>
        </g>
      </g>`
  },
  {
    num: 16, title: "The 8-Capability Flywheel & Part 3 Bridge", timecode: "13:15 – 14:15", type: "8-Capability Flywheel & Part 3 Slate",
    content: `
      <rect x="0" y="0" width="1160" height="475" rx="16" fill="#0b1329" stroke="#1e293b" stroke-width="1.5"/>
      <g transform="translate(60, 45)">
        <text font-family="'Inter', sans-serif" font-size="14" font-weight="700" fill="#60a5fa" letter-spacing="0.1em">BRIEFING 02 COMPLETE</text>
        <text y="40" font-family="'Inter', sans-serif" font-size="28" font-weight="900" fill="#fff">The 8-Capability Autonomous Revenue Flywheel</text>
        <g transform="translate(0, 80)">
          <g transform="translate(0, 0)">
            <rect width="500" height="200" rx="12" fill="#1e293b" stroke="#334155"/>
            <g transform="translate(30, 35)">
              <text font-family="'Inter', sans-serif" font-size="15" font-weight="800" fill="#60a5fa">EXECUTIVE BRIEFING</text>
              <text y="35" font-family="'Inter', sans-serif" font-size="19" font-weight="800" fill="#fff">Schedule an Architecture Review</text>
              <text y="70" font-family="'Inter', sans-serif" font-size="13" fill="#94a3b8">Inspect how the 3-tier architecture connects with your existing CRM and data stack.</text>
              <rect y="100" width="220" height="38" rx="6" fill="#2563eb"/><text x="110" y="124" text-anchor="middle" font-family="'Inter', sans-serif" font-size="12" font-weight="700" fill="#fff">profitmachines.com/architecture</text>
            </g>
          </g>
          <g transform="translate(540, 0)">
            <rect width="500" height="200" rx="12" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
            <g transform="translate(30, 35)">
              <text font-family="'JetBrains Mono', monospace" font-size="13" font-weight="800" fill="#10b981">FINAL BRIEFING: PART 3</text>
              <text y="35" font-family="'Inter', sans-serif" font-size="19" font-weight="800" fill="#fff">Building a Measurable Growth Roadmap</text>
              <text y="70" font-family="'Inter', sans-serif" font-size="13" fill="#94a3b8">The 90-day implementation plan, phase gates, and the CFO-approved 148% IRR DCF model.</text>
              <text y="124" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#10b981">WATCH PART 3 &rarr;</text>
            </g>
          </g>
        </g>
      </g>`
  }
];

// VIDEO 3 SCENES
const v3Scenes = [
  {
    num: 1, title: "Cold Open Hook: The Fear of Transformation", timecode: "0:00 – 0:45", type: "Scorecard Red-to-Green Timeline",
    content: `
      <rect x="0" y="0" width="1160" height="475" rx="16" fill="#0b1329" stroke="#1e293b" stroke-width="1.5"/>
      <g transform="translate(60, 45)">
        <text font-family="'Inter', sans-serif" font-size="14" font-weight="700" fill="#10b981" letter-spacing="0.1em">BRIEFING 03 HOOK</text>
        <text y="40" font-family="'Inter', sans-serif" font-size="28" font-weight="900" fill="#fff">Why Enterprise GTM Transformations Fail (And How to Win)</text>
        <g transform="translate(0, 90)">
          <g transform="translate(0, 0)">
            <rect width="500" height="220" rx="12" fill="#1e293b" stroke="#ef4444"/>
            <g transform="translate(30, 35)">
              <text font-family="'Inter', sans-serif" font-size="15" font-weight="700" fill="#ef4444">THE MULTI-YEAR IT OVERHAUL</text>
              <text y="35" font-family="'Inter', sans-serif" font-size="18" font-weight="800" fill="#fff">18–24 Months of Disruption</text>
              <text y="70" font-family="'Inter', sans-serif" font-size="14" fill="#94a3b8">
                <tspan x="0" dy="0">• $2M–$5M spent before seeing dollar one</tspan>
                <tspan x="0" dy="24">• Massive rep resistance and productivity drop</tspan>
                <tspan x="0" dy="24">• 70% fail to meet initial ROI projections</tspan>
              </text>
            </g>
          </g>
          <g transform="translate(540, 0)">
            <rect width="500" height="220" rx="12" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
            <g transform="translate(30, 35)">
              <text font-family="'Inter', sans-serif" font-size="15" font-weight="700" fill="#10b981">THE 90-DAY PHASE-GATED BLUEPRINT</text>
              <text y="35" font-family="'Inter', sans-serif" font-size="18" font-weight="800" fill="#fff">Agile Revenue Compounding</text>
              <text y="70" font-family="'Inter', sans-serif" font-size="14" fill="#94a3b8">
                <tspan x="0" dy="0">• Immediate quick-wins by Day 15</tspan>
                <tspan x="0" dy="24">• Fully scaled autonomous system by Day 90</tspan>
                <tspan x="0" dy="24">• CFO-audited payback in 4.2 months</tspan>
              </text>
            </g>
          </g>
        </g>
      </g>`
  },
  {
    num: 2, title: "The Rip-and-Replace Fallacy", timecode: "0:45 – 1:30", type: "Failed IT Overhaul Autopsy",
    content: `
      <rect x="0" y="0" width="1160" height="475" rx="16" fill="#0b1329" stroke="#1e293b" stroke-width="1.5"/>
      <g transform="translate(60, 45)">
        <text font-family="'Inter', sans-serif" font-size="14" font-weight="700" fill="#ef4444" letter-spacing="0.1em">EXECUTION PITFALL</text>
        <text y="40" font-family="'Inter', sans-serif" font-size="28" font-weight="900" fill="#fff">Never Rip-and-Replace Your Revenue Stack</text>
        <g transform="translate(0, 90)">
          <rect width="1040" height="180" rx="12" fill="#1e293b" stroke="#334155"/>
          <g transform="translate(40, 35)">
            <text font-family="'Inter', sans-serif" font-size="16" font-weight="700" fill="#38bdf8">The Intelligent Overlay Philosophy</text>
            <text y="35" font-family="'Inter', sans-serif" font-size="14" fill="#94a3b8">
              <tspan x="0" dy="0">Do not rebuild your Salesforce or migrate your marketing database.</tspan>
              <tspan x="0" dy="24">ProfitMachines connects non-invasively via native APIs, turning static databases into active intelligence overnight.</tspan>
            </text>
          </g>
        </g>
      </g>`
  },
  {
    num: 3, title: "Dual-Track Execution: Parallel Velocity", timecode: "1:30 – 2:15", type: "Dual-Track Concurrent Graphic",
    content: `
      <rect x="0" y="0" width="1160" height="475" rx="16" fill="#0b1329" stroke="#1e293b" stroke-width="1.5"/>
      <g transform="translate(60, 45)">
        <text font-family="'Inter', sans-serif" font-size="14" font-weight="700" fill="#10b981" letter-spacing="0.1em">DEPLOYMENT METHODOLOGY</text>
        <text y="40" font-family="'Inter', sans-serif" font-size="28" font-weight="900" fill="#fff">Dual-Track Execution: Cash Flow &amp; Infrastructure</text>
        <g transform="translate(0, 90)">
          <rect width="1040" height="90" rx="10" fill="#065f46" stroke="#10b981"/>
          <text x="30" y="35" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="800" fill="#34d399">TRACK A: IMMEDIATE REVENUE CAPTURE (DAYS 1–30)</text>
          <text x="30" y="65" font-family="'Inter', sans-serif" font-size="14" fill="#f8fafc">Reactivate dormant accounts and capture live dark demand signals to self-fund the rollout.</text>

          <rect y="110" width="1040" height="90" rx="10" fill="#1e3a8a" stroke="#2563eb"/>
          <text x="30" y="145" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="800" fill="#60a5fa">TRACK B: STRUCTURAL ARCHITECTURE (DAYS 31–90)</text>
          <text x="30" y="175" font-family="'Inter', sans-serif" font-size="14" fill="#f8fafc">Deep CRM bi-directional sync, autonomous SDR clusters, and board-level forecasting telemetry.</text>
        </g>
      </g>`
  },
  {
    num: 4, title: "The 6 Commercial Dimensions", timecode: "2:15 – 3:30", type: "6-Dimension Framework Grid",
    content: `
      <rect x="0" y="0" width="1160" height="475" rx="16" fill="#0b1329" stroke="#1e293b" stroke-width="1.5"/>
      <g transform="translate(60, 40)">
        <text font-family="'Inter', sans-serif" font-size="14" font-weight="700" fill="#10b981" letter-spacing="0.1em">OPERATIONAL RIGOR</text>
        <text y="35" font-family="'Inter', sans-serif" font-size="26" font-weight="900" fill="#fff">The 6 Dimensions of Enterprise Commercial Excellence</text>
        <g transform="translate(0, 60)">
          <g transform="translate(0, 0)">
            <rect width="320" height="100" rx="8" fill="#1e293b"/>
            <text x="20" y="32" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" fill="#10b981">1. STRATEGY &amp; TAM</text>
            <text x="20" y="62" font-family="'Inter', sans-serif" font-size="13" fill="#94a3b8">Micro-ICP and margin weighting</text>
          </g>
          <g transform="translate(360, 0)">
            <rect width="320" height="100" rx="8" fill="#1e293b"/>
            <text x="20" y="32" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" fill="#10b981">2. DATA FABRIC</text>
            <text x="20" y="62" font-family="'Inter', sans-serif" font-size="13" fill="#94a3b8">Identity resolution and dark signals</text>
          </g>
          <g transform="translate(720, 0)">
            <rect width="320" height="100" rx="8" fill="#1e293b"/>
            <text x="20" y="32" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" fill="#10b981">3. MULTI-AGENT TECH</text>
            <text x="20" y="62" font-family="'Inter', sans-serif" font-size="13" fill="#94a3b8">Autonomous SDR orchestration</text>
          </g>
          <g transform="translate(0, 125)">
            <rect width="320" height="100" rx="8" fill="#1e293b"/>
            <text x="20" y="32" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" fill="#10b981">4. REPS &amp; ENABLEMENT</text>
            <text x="20" y="62" font-family="'Inter', sans-serif" font-size="13" fill="#94a3b8">Sub-60s pre-call dossier delivery</text>
          </g>
          <g transform="translate(360, 125)">
            <rect width="320" height="100" rx="8" fill="#1e293b"/>
            <text x="20" y="32" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" fill="#10b981">5. OPERATIONS &amp; SYNC</text>
            <text x="20" y="62" font-family="'Inter', sans-serif" font-size="13" fill="#94a3b8">Zero-touch bi-directional CRM</text>
          </g>
          <g transform="translate(720, 125)">
            <rect width="320" height="100" rx="8" fill="#1e293b"/>
            <text x="20" y="32" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" fill="#10b981">6. GOVERNANCE &amp; ROI</text>
            <text x="20" y="62" font-family="'Inter', sans-serif" font-size="13" fill="#94a3b8">Board forecast and compliance</text>
          </g>
        </g>
      </g>`
  },
  {
    num: 5, title: "The 4 Evolutionary Stages of Maturity", timecode: "3:30 – 4:30", type: "Maturity Heatmap: Stages 1–4",
    content: `
      <rect x="0" y="0" width="1160" height="475" rx="16" fill="#0b1329" stroke="#1e293b" stroke-width="1.5"/>
      <g transform="translate(60, 45)">
        <text font-family="'Inter', sans-serif" font-size="14" font-weight="700" fill="#10b981" letter-spacing="0.1em">MATURITY BENCHMARK</text>
        <text y="40" font-family="'Inter', sans-serif" font-size="28" font-weight="900" fill="#fff">Where Does Your Enterprise Commercial Org Stand?</text>
        <g transform="translate(0, 90)">
          <g transform="translate(0, 0)">
            <rect width="240" height="180" rx="8" fill="#1e293b"/>
            <text x="20" y="35" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" fill="#94a3b8">STAGE 1: MANUAL</text>
            <text x="20" y="70" font-family="'Inter', sans-serif" font-size="13" fill="#64748b">
              <tspan x="20" dy="0">Spreadsheets, linear</tspan>
              <tspan x="20" dy="22">rep hiring, zero signal</tspan>
              <tspan x="20" dy="22">tracking architecture.</tspan>
            </text>
          </g>
          <g transform="translate(265, 0)">
            <rect width="240" height="180" rx="8" fill="#1e293b" stroke="#ef4444"/>
            <text x="20" y="35" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" fill="#ef4444">STAGE 2: FRAGMENTED</text>
            <text x="20" y="70" font-family="'Inter', sans-serif" font-size="13" fill="#fca5a5">
              <tspan x="20" dy="0">14 point tools, prompt</tspan>
              <tspan x="20" dy="22">wrappers, reps acting</tspan>
              <tspan x="20" dy="22">as human middleware.</tspan>
            </text>
          </g>
          <g transform="translate(530, 0)">
            <rect width="240" height="180" rx="8" fill="#1e293b"/>
            <text x="20" y="35" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" fill="#38bdf8">STAGE 3: CONNECTED</text>
            <text x="20" y="70" font-family="'Inter', sans-serif" font-size="13" fill="#93c5fd">
              <tspan x="20" dy="0">Unified telemetry,</tspan>
              <tspan x="20" dy="22">automated CRM hygiene,</tspan>
              <tspan x="20" dy="22">sub-60s pre-call dossiers.</tspan>
            </text>
          </g>
          <g transform="translate(795, 0)">
            <rect width="245" height="180" rx="8" fill="#065f46" stroke="#10b981"/>
            <text x="20" y="35" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" fill="#34d399">STAGE 4: AUTONOMOUS</text>
            <text x="20" y="70" font-family="'Inter', sans-serif" font-size="13" fill="#a7f3d0">
              <tspan x="20" dy="0">Self-driving pipeline</tspan>
              <tspan x="20" dy="22">engine, deterministic</tspan>
              <tspan x="20" dy="22">forecasting certitude.</tspan>
            </text>
          </g>
        </g>
      </g>`
  },
  {
    num: 6, title: "The Stage 2 Trap: Why 82% of Firms Stall", timecode: "4:30 – 5:30", type: "Fragmented Tool Trap Breakdown",
    content: `
      <rect x="0" y="0" width="1160" height="475" rx="16" fill="#0b1329" stroke="#1e293b" stroke-width="1.5"/>
      <g transform="translate(60, 45)">
        <text font-family="'Inter', sans-serif" font-size="14" font-weight="700" fill="#ef4444" letter-spacing="0.1em">THE 82% ENTERPRISE CEILING</text>
        <text y="40" font-family="'Inter', sans-serif" font-size="28" font-weight="900" fill="#fff">The Fragmented Tool Trap: High SaaS Bills, Low Growth</text>
        <g transform="translate(0, 90)">
          <rect width="1040" height="200" rx="12" fill="#1e1b4b" stroke="#ef4444" stroke-width="1.5"/>
          <g transform="translate(40, 40)">
            <text font-family="'Inter', sans-serif" font-size="18" font-weight="800" fill="#f87171">Why Buying More Point Tools Fails</text>
            <text y="35" font-family="'Inter', sans-serif" font-size="14" fill="#c7d2fe">
              <tspan x="0" dy="0">Adding a tool for prospecting, another for sequencing, another for call recording, and another for intent creates friction.</tspan>
              <tspan x="0" dy="24">Each tool creates its own data silo. The enterprise spends $20,000/rep/year with zero compounding effect.</tspan>
            </text>
          </g>
        </g>
      </g>`
  },
  {
    num: 7, title: "Baseline Audit: KPIs 1 & 2 (Cycle & Selling Time)", timecode: "5:30 – 6:45", type: "Executive Dashboard: Duration & Capacity",
    content: `
      <rect x="0" y="0" width="1160" height="475" rx="16" fill="#0b1329" stroke="#1e293b" stroke-width="1.5"/>
      <g transform="translate(60, 45)">
        <text font-family="'Inter', sans-serif" font-size="14" font-weight="700" fill="#10b981" letter-spacing="0.1em">MEASURABLE REVENUE BENCHMARKS • PART 1</text>
        <text y="40" font-family="'Inter', sans-serif" font-size="28" font-weight="900" fill="#fff">Baseline Audit: Compressing Cycles &amp; Unlocking Reps</text>
        <g transform="translate(0, 90)">
          <g transform="translate(0, 0)">
            <rect width="500" height="200" rx="12" fill="#1e293b" stroke="#334155"/>
            <g transform="translate(30, 35)">
              <text font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#38bdf8">KPI 01: SALES CYCLE DURATION</text>
              <text y="45" font-family="'Inter', sans-serif" font-size="34" font-weight="900" fill="#fff">124 Days &rarr; 82 Days</text>
              <text y="85" font-family="'Inter', sans-serif" font-size="14" fill="#10b981">34% Cycle Compression</text>
            </g>
          </g>
          <g transform="translate(540, 0)">
            <rect width="500" height="200" rx="12" fill="#1e293b" stroke="#334155"/>
            <g transform="translate(30, 35)">
              <text font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#38bdf8">KPI 02: ACTIVE SELLING TIME</text>
              <text y="45" font-family="'Inter', sans-serif" font-size="34" font-weight="900" fill="#fff">32% &rarr; 58%</text>
              <text y="85" font-family="'Inter', sans-serif" font-size="14" fill="#10b981">+81% Rep Selling Capacity</text>
            </g>
          </g>
        </g>
      </g>`
  },
  {
    num: 8, title: "Baseline Audit: KPIs 3, 4 & 5 (Conversion, Variance, NRR)", timecode: "6:45 – 8:00", type: "Win Rate, Variance & NRR Gauges",
    content: `
      <rect x="0" y="0" width="1160" height="475" rx="16" fill="#0b1329" stroke="#1e293b" stroke-width="1.5"/>
      <g transform="translate(60, 45)">
        <text font-family="'Inter', sans-serif" font-size="14" font-weight="700" fill="#10b981" letter-spacing="0.1em">MEASURABLE REVENUE BENCHMARKS • PART 2</text>
        <text y="40" font-family="'Inter', sans-serif" font-size="28" font-weight="900" fill="#fff">Predictable Win Rates &amp; Retention Expansion</text>
        <g transform="translate(0, 90)">
          <g transform="translate(0, 0)">
            <rect width="320" height="180" rx="12" fill="#1e293b"/>
            <text x="25" y="38" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" fill="#10b981">KPI 03: WIN RATE</text>
            <text x="25" y="85" font-family="'Inter', sans-serif" font-size="28" font-weight="900" fill="#fff">19% &rarr; 29%</text>
            <text x="25" y="125" font-family="'Inter', sans-serif" font-size="13" fill="#a7f3d0">+52% Relative Lift</text>
          </g>
          <g transform="translate(360, 0)">
            <rect width="320" height="180" rx="12" fill="#1e293b"/>
            <text x="25" y="38" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" fill="#10b981">KPI 04: FORECAST VARIANCE</text>
            <text x="25" y="85" font-family="'Inter', sans-serif" font-size="28" font-weight="900" fill="#fff">28% &rarr; &lt; 4%</text>
            <text x="25" y="125" font-family="'Inter', sans-serif" font-size="13" fill="#a7f3d0">Boardroom Certainty</text>
          </g>
          <g transform="translate(720, 0)">
            <rect width="320" height="180" rx="12" fill="#1e293b"/>
            <text x="25" y="38" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" fill="#10b981">KPI 05: NRR EXPANSION</text>
            <text x="25" y="85" font-family="'Inter', sans-serif" font-size="28" font-weight="900" fill="#fff">102% &rarr; 121%</text>
            <text x="25" y="125" font-family="'Inter', sans-serif" font-size="13" fill="#a7f3d0">+19% Net Revenue Retention</text>
          </g>
        </g>
      </g>`
  },
  {
    num: 9, title: "90-Day Blueprint: Phase 1 (Diagnostics & Quick-Wins)", timecode: "8:00 – 9:15", type: "Days 1–30 Gantt Timeline",
    content: `
      <rect x="0" y="0" width="1160" height="475" rx="16" fill="#0b1329" stroke="#1e293b" stroke-width="1.5"/>
      <g transform="translate(60, 45)">
        <rect width="180" height="28" rx="6" fill="#10b981"/><text x="14" y="19" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="800" fill="#020617">PHASE 1 (DAYS 1–30)</text>
        <text y="65" font-family="'Inter', sans-serif" font-size="30" font-weight="900" fill="#fff">Telemetry Audit &amp; Immediate Quick-Win Pipeline</text>
        <g transform="translate(0, 110)">
          <rect width="1040" height="180" rx="12" fill="#1e293b" stroke="#334155"/>
          <g transform="translate(35, 35)">
            <text font-family="'Inter', sans-serif" font-size="16" font-weight="700" fill="#10b981">Phase 1 Deliverables &amp; Cash Milestones</text>
            <text y="35" font-family="'Inter', sans-serif" font-size="14" fill="#94a3b8">
              <tspan x="0" dy="0">• Connect dark funnel telemetry to website and docs (Day 7)</tspan>
              <tspan x="0" dy="24">• Reactivate high-intent closed-lost accounts from previous 12 months (Day 15)</tspan>
              <tspan x="0" dy="24">• Deliver initial pipeline lift to self-fund remaining rollout (Day 30)</tspan>
            </text>
          </g>
        </g>
      </g>`
  },
  {
    num: 10, title: "90-Day Blueprint: Phase 2 (Velocity Activation)", timecode: "9:15 – 10:15", type: "Days 31–60 Gantt Timeline",
    content: `
      <rect x="0" y="0" width="1160" height="475" rx="16" fill="#0b1329" stroke="#1e293b" stroke-width="1.5"/>
      <g transform="translate(60, 45)">
        <rect width="180" height="28" rx="6" fill="#38bdf8"/><text x="14" y="19" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="800" fill="#020617">PHASE 2 (DAYS 31–60)</text>
        <text y="65" font-family="'Inter', sans-serif" font-size="30" font-weight="900" fill="#fff">Autonomous Agent SDR Deployment &amp; Dossiers</text>
        <g transform="translate(0, 110)">
          <rect width="1040" height="180" rx="12" fill="#1e293b" stroke="#334155"/>
          <g transform="translate(35, 35)">
            <text font-family="'Inter', sans-serif" font-size="16" font-weight="700" fill="#38bdf8">Phase 2 Deliverables &amp; Operational Cadence</text>
            <text y="35" font-family="'Inter', sans-serif" font-size="14" fill="#94a3b8">
              <tspan x="0" dy="0">• Deploy autonomous agent SDRs across top 2,000 target accounts</tspan>
              <tspan x="0" dy="24">• Deliver sub-60s context dossiers to AE calendars automatically</tspan>
              <tspan x="0" dy="24">• Double active meeting intake while eliminating manual prospecting</tspan>
            </text>
          </g>
        </g>
      </g>`
  },
  {
    num: 11, title: "90-Day Blueprint: Phase 3 (Closed-Loop Sync)", timecode: "10:15 – 11:00", type: "Days 61–90 Gantt Timeline",
    content: `
      <rect x="0" y="0" width="1160" height="475" rx="16" fill="#0b1329" stroke="#1e293b" stroke-width="1.5"/>
      <g transform="translate(60, 45)">
        <rect width="180" height="28" rx="6" fill="#6366f1"/><text x="14" y="19" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="800" fill="#fff">PHASE 3 (DAYS 61–90)</text>
        <text y="65" font-family="'Inter', sans-serif" font-size="30" font-weight="900" fill="#fff">Zero-Touch RevOps &amp; Board Governance</text>
        <g transform="translate(0, 110)">
          <rect width="1040" height="180" rx="12" fill="#1e293b" stroke="#334155"/>
          <g transform="translate(35, 35)">
            <text font-family="'Inter', sans-serif" font-size="16" font-weight="700" fill="#818cf8">Phase 3 Deliverables &amp; Full Enterprise Scale</text>
            <text y="35" font-family="'Inter', sans-serif" font-size="14" fill="#94a3b8">
              <tspan x="0" dy="0">• Full zero-touch CRM data sync active across all territories</tspan>
              <tspan x="0" dy="24">• Automated customer value handshake passing to Customer Success</tspan>
              <tspan x="0" dy="24">• Live board telemetry dashboard operating with &lt; 4% forecast variance</tspan>
            </text>
          </g>
        </g>
      </g>`
  },
  {
    num: 12, title: "The CFO Business Case: Macro Framework & Disclaimer", timecode: "11:00 – 11:45", type: "3-Year DCF Canvas & Legal Disclaimer",
    content: `
      <rect x="0" y="0" width="1160" height="475" rx="16" fill="#0b1329" stroke="#1e293b" stroke-width="1.5"/>
      <g transform="translate(60, 45)">
        <text font-family="'Inter', sans-serif" font-size="14" font-weight="700" fill="#10b981" letter-spacing="0.1em">CFO DISCOUNTED CASH FLOW (DCF) MODEL</text>
        <text y="40" font-family="'Inter', sans-serif" font-size="28" font-weight="900" fill="#fff">Deterministic ROI on a $100M ARR Enterprise</text>
        <g transform="translate(0, 80)">
          <g transform="translate(0, 0)">
            <rect width="320" height="140" rx="10" fill="#1e293b"/>
            <text x="20" y="35" font-family="'JetBrains Mono', monospace" font-size="11" fill="#94a3b8">3-YEAR IMPLEMENTATION TCO</text>
            <text x="20" y="80" font-family="'Inter', sans-serif" font-size="28" font-weight="900" fill="#fff">$420,000</text>
          </g>
          <g transform="translate(360, 0)">
            <rect width="320" height="140" rx="10" fill="#1e293b"/>
            <text x="20" y="35" font-family="'JetBrains Mono', monospace" font-size="11" fill="#94a3b8">3-YEAR NET CASH BENEFIT</text>
            <text x="20" y="80" font-family="'Inter', sans-serif" font-size="28" font-weight="900" fill="#10b981">$12,400,000</text>
          </g>
          <g transform="translate(720, 0)">
            <rect width="320" height="140" rx="10" fill="#1e293b"/>
            <text x="20" y="35" font-family="'JetBrains Mono', monospace" font-size="11" fill="#94a3b8">PROJECTED IRR</text>
            <text x="20" y="80" font-family="'Inter', sans-serif" font-size="28" font-weight="900" fill="#10b981">148% IRR</text>
          </g>
        </g>
        <g transform="translate(0, 270)">
          <text font-family="'Inter', sans-serif" font-size="11" fill="#64748b">*Illustrative discounted cash flow model assuming $100M ARR baseline, 10% discount rate, and empirical efficiency gains. Subject to corporate audit.</text>
        </g>
      </g>`
  },
  {
    num: 13, title: "DCF Returns: TCO, NPV, IRR & Payback Velocity", timecode: "11:45 – 12:30", type: "Financial Return Waterfall Schedule",
    content: `
      <rect x="0" y="0" width="1160" height="475" rx="16" fill="#0b1329" stroke="#1e293b" stroke-width="1.5"/>
      <g transform="translate(60, 45)">
        <text font-family="'Inter', sans-serif" font-size="14" font-weight="700" fill="#10b981" letter-spacing="0.1em">CAPITAL EFFICIENCY AUDIT</text>
        <text y="40" font-family="'Inter', sans-serif" font-size="28" font-weight="900" fill="#fff">4.2-Month Payback Velocity</text>
        <g transform="translate(0, 90)">
          <rect width="1040" height="180" rx="12" fill="#064e3b" opacity="0.4" stroke="#059669" stroke-width="1.5"/>
          <g transform="translate(40, 40)">
            <text font-family="'JetBrains Mono', monospace" font-size="18" font-weight="900" fill="#34d399">FULL CAPITAL RECOVERY BY DAY 126</text>
            <text y="40" font-family="'Inter', sans-serif" font-size="15" fill="#f8fafc">
              <tspan x="0" dy="0">By month 4, the combined revenue lift from accelerated deal closings</tspan>
              <tspan x="0" dy="24">and SaaS point-tool rationalization exceeds all software and implementation costs.</tspan>
            </text>
          </g>
        </g>
      </g>`
  },
  {
    num: 14, title: "The Enterprise Valuation Multiple Lift", timecode: "12:30 – 13:00", type: "Valuation Multiplier & Market Cap Lift",
    content: `
      <rect x="0" y="0" width="1160" height="475" rx="16" fill="#0b1329" stroke="#1e293b" stroke-width="1.5"/>
      <g transform="translate(60, 45)">
        <text font-family="'Inter', sans-serif" font-size="14" font-weight="700" fill="#10b981" letter-spacing="0.1em">SHAREHOLDER VALUE CREATION</text>
        <text y="40" font-family="'Inter', sans-serif" font-size="28" font-weight="900" fill="#fff">Rule of 40 Multiplier Expansion: +$370M Valuation Lift</text>
        <g transform="translate(0, 90)">
          <g transform="translate(0, 0)">
            <rect width="500" height="180" rx="12" fill="#1e293b"/>
            <g transform="translate(30, 35)">
              <text font-family="'Inter', sans-serif" font-size="14" fill="#94a3b8">RULE OF 40 SCORE</text>
              <text y="45" font-family="'Inter', sans-serif" font-size="34" font-weight="900" fill="#fff">28% &rarr; 51%</text>
              <text y="80" font-family="'Inter', sans-serif" font-size="13" fill="#10b981">Top Quartile SaaS Performance</text>
            </g>
          </g>
          <g transform="translate(540, 0)">
            <rect width="500" height="180" rx="12" fill="#1e293b"/>
            <g transform="translate(30, 35)">
              <text font-family="'Inter', sans-serif" font-size="14" fill="#94a3b8">ARR MULTIPLE EXPANSION</text>
              <text y="45" font-family="'Inter', sans-serif" font-size="34" font-weight="900" fill="#fff">4.5x &rarr; 8.2x</text>
              <text y="80" font-family="'Inter', sans-serif" font-size="13" fill="#10b981">+$370M Market Capitalization</text>
            </g>
          </g>
        </g>
      </g>`
  },
  {
    num: 15, title: "Board-Level Executive Governance Mandate", timecode: "13:00 – 13:30", type: "Board Governance & Strategic Moat",
    content: `
      <rect x="0" y="0" width="1160" height="475" rx="16" fill="#0b1329" stroke="#1e293b" stroke-width="1.5"/>
      <g transform="translate(60, 45)">
        <text font-family="'Inter', sans-serif" font-size="14" font-weight="700" fill="#10b981" letter-spacing="0.1em">EXECUTIVE GOVERNANCE</text>
        <text y="40" font-family="'Inter', sans-serif" font-size="28" font-weight="900" fill="#fff">Institutionalize Your Revenue Intelligence Advantage</text>
        <g transform="translate(0, 90)">
          <rect width="1040" height="180" rx="12" fill="#1e293b" stroke="#334155"/>
          <g transform="translate(40, 40)">
            <text font-family="'Inter', sans-serif" font-size="16" font-weight="700" fill="#38bdf8">The Board-Level Revenue Moat</text>
            <text y="35" font-family="'Inter', sans-serif" font-size="14" fill="#94a3b8">
              <tspan x="0" dy="0">Revenue is no longer an uncalibrated black box. With ProfitMachines, CEOs and boards</tspan>
              <tspan x="0" dy="24">gain auditable, deterministic telemetry into commercial velocity across all dimensions.</tspan>
            </text>
          </g>
        </g>
      </g>`
  },
  {
    num: 16, title: "Series Conclusion & Final Call to Action", timecode: "13:30 – 14:00", type: "Trilogy Synthesis & Booking Card",
    content: `
      <rect x="0" y="0" width="1160" height="475" rx="16" fill="#0b1329" stroke="#1e293b" stroke-width="1.5"/>
      <g transform="translate(60, 45)">
        <text font-family="'Inter', sans-serif" font-size="14" font-weight="700" fill="#10b981" letter-spacing="0.1em">TRILOGY CONCLUSION</text>
        <text y="40" font-family="'Inter', sans-serif" font-size="28" font-weight="900" fill="#fff">Ready to Eliminate Revenue Friction?</text>
        <g transform="translate(0, 80)">
          <g transform="translate(0, 0)">
            <rect width="500" height="200" rx="12" fill="#1e293b" stroke="#334155"/>
            <g transform="translate(30, 35)">
              <text font-family="'Inter', sans-serif" font-size="15" font-weight="800" fill="#10b981">EXECUTIVE DOWNLOAD</text>
              <text y="35" font-family="'Inter', sans-serif" font-size="19" font-weight="800" fill="#fff">The 90-Day Revenue Roadmap</text>
              <text y="70" font-family="'Inter', sans-serif" font-size="13" fill="#94a3b8">The full CFO business case model, phase gate templates, and KPI audit worksheets.</text>
              <rect y="100" width="220" height="38" rx="6" fill="#10b981"/><text x="110" y="124" text-anchor="middle" font-family="'Inter', sans-serif" font-size="12" font-weight="700" fill="#020617">profitmachines.com/roadmap</text>
            </g>
          </g>
          <g transform="translate(540, 0)">
            <rect width="500" height="200" rx="12" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
            <g transform="translate(30, 35)">
              <text font-family="'JetBrains Mono', monospace" font-size="13" font-weight="800" fill="#10b981">DIAGNOSTIC CONSULTATION</text>
              <text y="35" font-family="'Inter', sans-serif" font-size="19" font-weight="800" fill="#fff">Book an Executive Diagnostic</text>
              <text y="70" font-family="'Inter', sans-serif" font-size="13" fill="#94a3b8">Sit down with our enterprise architects for a 45-minute confidential revenue autopsy.</text>
              <text y="124" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="700" fill="#34d399">SCHEDULE NOW &rarr;</text>
            </g>
          </g>
        </g>
      </g>`
  }
];

function generateAll() {
  const v1Dir = path.join(__dirname, 'video-01-revenue-friction', 'scenes');
  const v2Dir = path.join(__dirname, 'video-02-ai-native-revenue-transformation', 'scenes');
  const v3Dir = path.join(__dirname, 'video-03-revenue-growth-roadmap', 'scenes');

  [v1Dir, v2Dir, v3Dir].forEach(d => { if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true }); });

  v1Scenes.forEach(s => {
    const svg = createSvgScene({
      seriesNum: 1, seriesName: "From Revenue Friction to Profitable Growth",
      sceneNum: s.num, sceneTitle: s.title, timecode: s.timecode, visualCategory: s.type, contentHtml: s.content
    });
    fs.writeFileSync(path.join(v1Dir, `scene-${String(s.num).padStart(2, '0')}.svg`), svg, 'utf8');
  });
  console.log(`Video 1: Successfully generated all ${v1Scenes.length} scenes in ${v1Dir}`);

  v2Scenes.forEach(s => {
    const svg = createSvgScene({
      seriesNum: 2, seriesName: "Beyond AI Chatbots: How AI-Native Transformation Works",
      sceneNum: s.num, sceneTitle: s.title, timecode: s.timecode, visualCategory: s.type, contentHtml: s.content
    });
    fs.writeFileSync(path.join(v2Dir, `scene-${String(s.num).padStart(2, '0')}.svg`), svg, 'utf8');
  });
  console.log(`Video 2: Successfully generated all ${v2Scenes.length} scenes in ${v2Dir}`);

  v3Scenes.forEach(s => {
    const svg = createSvgScene({
      seriesNum: 3, seriesName: "Building a Measurable Revenue Growth Roadmap",
      sceneNum: s.num, sceneTitle: s.title, timecode: s.timecode, visualCategory: s.type, contentHtml: s.content
    });
    fs.writeFileSync(path.join(v3Dir, `scene-${String(s.num).padStart(2, '0')}.svg`), svg, 'utf8');
  });
  console.log(`Video 3: Successfully generated all ${v3Scenes.length} scenes in ${v3Dir}`);
}

generateAll();
