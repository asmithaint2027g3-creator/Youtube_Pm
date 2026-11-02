const fs = require('fs');
const path = require('path');

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

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
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

  <!-- Top Navigation & Metadata Header -->
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
      ⏱ ${timecode}
    </text>

    <!-- Visual Category -->
    <rect x="625" y="0" width="310" height="34" rx="6" fill="#0f172a" stroke="#1e293b" stroke-width="1.5"/>
    <text x="640" y="22" font-family="'Inter', sans-serif" font-size="12" font-weight="500" fill="#64748b">
      TYPE: ${visualCategory}
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
      ${sceneTitle}
    </text>
  </g>

  <!-- Dynamic Center Stage Graphic Area -->
  <g transform="translate(60, 150)">
    ${contentHtml}
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

// -------------------------------------------------------------
// VIDEO 1 SCENES DEFINITIONS
// -------------------------------------------------------------
const v1Scenes = [
  {
    num: 1,
    title: "Cold Open Hook: The Pipeline Paradox",
    timecode: "0:00 – 0:45",
    type: "Kinetic Typography & Shock Metrics",
    content: `
      <rect x="0" y="0" width="1160" height="475" rx="16" fill="#0b1329" stroke="#1e293b" stroke-width="1.5" filter="url(#shadow)"/>
      <g transform="translate(60, 60)">
        <text font-family="'Inter', sans-serif" font-size="16" font-weight="700" fill="#ef4444" letter-spacing="0.1em">EXECUTIVE REALITY CHECK</text>
        <text y="50" font-family="'Inter', sans-serif" font-size="44" font-weight="900" fill="#f8fafc" letter-spacing="-0.03em">
          67% of Forecasted Enterprise Deals Slip Every Quarter.
        </text>
        <text y="105" font-family="'Inter', sans-serif" font-size="44" font-weight="900" fill="#38bdf8" letter-spacing="-0.03em">
          Reps Spend Only 32% of Their Day Selling.
        </text>
        <text y="165" font-family="'Inter', sans-serif" font-size="30" font-weight="700" fill="#94a3b8">
          Why is your board asking you to hire 15 more reps?
        </text>

        <g transform="translate(0, 220)">
          <rect width="320" height="90" rx="12" fill="#1e293b" stroke="#334155"/>
          <text x="24" y="35" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#ef4444">DEAL SLIPPAGE</text>
          <text x="24" y="70" font-family="'Inter', sans-serif" font-size="28" font-weight="800" fill="#fff">67% Rate</text>
          
          <rect x="350" width="320" height="90" rx="12" fill="#1e293b" stroke="#334155"/>
          <text x="24" y="35" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#38bdf8">ACTIVE SELLING TIME</text>
          <text x="24" y="70" font-family="'Inter', sans-serif" font-size="28" font-weight="800" fill="#fff">&lt; 33% Allocation</text>

          <rect x="700" width="340" height="90" rx="12" fill="#1e293b" stroke="#334155"/>
          <text x="24" y="35" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#f59e0b">QUOTA ATTAINMENT</text>
          <text x="24" y="70" font-family="'Inter', sans-serif" font-size="28" font-weight="800" fill="#fff">&lt; 50% Salesforce Avg</text>
        </g>
      </g>
    `
  },
  {
    num: 2,
    title: "The Zero-Interest Era & Headcount Playbook",
    timecode: "0:45 – 1:30",
    type: "Historical Timeline & Macro Regime Shift",
    content: `
      <rect x="0" y="0" width="1160" height="475" rx="16" fill="#0b1329" stroke="#1e293b" stroke-width="1.5"/>
      <g transform="translate(60, 45)">
        <text font-family="'Inter', sans-serif" font-size="15" font-weight="700" fill="#38bdf8" letter-spacing="0.1em">THE 2012–2021 HISTORICAL SCALING LOOP</text>
        <text y="40" font-family="'Inter', sans-serif" font-size="30" font-weight="800" fill="#fff">When Capital Was Free, Inefficiency Was Masked</text>

        <!-- Timeline Graphic -->
        <g transform="translate(0, 90)">
          <!-- Base Line -->
          <line x1="50" y1="100" x2="980" y2="100" stroke="#334155" stroke-width="4"/>
          
          <!-- Node 1 -->
          <circle cx="100" cy="100" r="14" fill="#2563eb"/>
          <text x="100" y="60" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-weight="700" font-size="14" fill="#38bdf8">2012</text>
          <text x="100" y="145" text-anchor="middle" font-family="'Inter', sans-serif" font-size="13" fill="#94a3b8">ZIRP Era Begins<br/>Cost of Capital ~0%</text>

          <!-- Node 2 -->
          <circle cx="450" cy="100" r="14" fill="#2563eb"/>
          <text x="450" y="60" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-weight="700" font-size="14" fill="#38bdf8">2018–2020</text>
          <text x="450" y="145" text-anchor="middle" font-family="'Inter', sans-serif" font-size="13" fill="#94a3b8">Linear Headcount Playbook<br/>Indiscriminate Outbound Volume</text>

          <!-- Regime Shift Divider -->
          <line x1="800" y1="20" x2="800" y2="230" stroke="#ef4444" stroke-width="3" stroke-dasharray="6 6"/>
          <rect x="730" y="10" width="140" height="30" rx="6" fill="#ef4444"/>
          <text x="800" y="30" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="800" fill="#fff">MACRO REGIME SHIFT</text>

          <!-- Node 3 -->
          <circle cx="950" cy="100" r="14" fill="#ef4444"/>
          <text x="950" y="60" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-weight="700" font-size="14" fill="#f87171">2022–2026+</text>
          <text x="950" y="145" text-anchor="middle" font-family="'Inter', sans-serif" font-size="13" fill="#94a3b8">Rule of 40 Mandate<br/>Capital Efficiency First</text>
        </g>

        <!-- Bottom Warning Callout -->
        <g transform="translate(0, 310)">
          <rect width="1040" height="70" rx="10" fill="#1e1b4b" stroke="#4338ca" stroke-width="1.5"/>
          <text x="30" y="42" font-family="'Inter', sans-serif" font-size="15" font-weight="600" fill="#c7d2fe">
            Linear expansion has permanently hit negative margin yield: Fully loaded AE compensation averages $250k–$300k.
          </text>
        </g>
      </g>
    `
  },
  {
    num: 3,
    title: "The Headcount Trap: Diminishing Quota Yield",
    timecode: "1:30 – 2:15",
    type: "Animated Comparative Curve Chart",
    content: `
      <rect x="0" y="0" width="1160" height="475" rx="16" fill="#0b1329" stroke="#1e293b" stroke-width="1.5"/>
      <g transform="translate(60, 40)">
        <text font-family="'Inter', sans-serif" font-size="15" font-weight="700" fill="#ef4444" letter-spacing="0.1em">THE HEADCOUNT TRAP: MARGINAL COST &gt; MARGINAL SALES YIELD</text>
        <text y="40" font-family="'Inter', sans-serif" font-size="28" font-weight="800" fill="#fff">Widening Gap: Loaded Rep Cost vs Quota Attainment</text>

        <!-- Chart Grid -->
        <g transform="translate(60, 70)">
          <!-- Axes -->
          <line x1="0" y1="230" x2="680" y2="230" stroke="#475569" stroke-width="2"/>
          <line x1="0" y1="0" x2="0" y2="230" stroke="#475569" stroke-width="2"/>

          <!-- Shaded Gap (Margin Compression Zone) -->
          <path d="M 0 150 Q 300 130 650 30 L 650 180 Q 300 160 0 150 Z" fill="#ef4444" opacity="0.15"/>
          <text x="380" y="145" font-family="'Inter', sans-serif" font-size="14" font-weight="700" fill="#f87171">MARGIN COMPRESSION ZONE</text>

          <!-- Cost Curve (Red, Rising) -->
          <path d="M 0 150 Q 300 130 650 30" fill="none" stroke="#ef4444" stroke-width="4"/>
          <circle cx="650" cy="30" r="6" fill="#ef4444"/>
          <text x="665" y="35" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#ef4444">Cost: $280K/Rep</text>

          <!-- Yield Curve (Cyan, Dropping) -->
          <path d="M 0 150 Q 250 120 650 180" fill="none" stroke="#38bdf8" stroke-width="4"/>
          <circle cx="650" cy="180" r="6" fill="#38bdf8"/>
          <text x="665" y="185" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#38bdf8">Yield: 47% Quota</text>
        </g>

        <!-- Side Metric Column -->
        <g transform="translate(850, 70)">
          <rect width="210" height="90" rx="10" fill="#1e293b" stroke="#334155"/>
          <text x="16" y="30" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" fill="#94a3b8">REP COMPENSATION</text>
          <text x="16" y="65" font-family="'Inter', sans-serif" font-size="24" font-weight="800" fill="#f87171">$250k–$300k</text>

          <rect y="110" width="210" height="90" rx="10" fill="#1e293b" stroke="#334155"/>
          <text x="16" y="140" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" fill="#94a3b8">CAC PAYBACK</text>
          <text x="16" y="175" font-family="'Inter', sans-serif" font-size="24" font-weight="800" fill="#f87171">&gt; 24 Months</text>
        </g>

        <!-- Bottom Takeaway -->
        <g transform="translate(0, 340)">
          <rect width="1040" height="50" rx="8" fill="#1e293b"/>
          <text x="25" y="32" font-family="'Inter', sans-serif" font-size="14" font-weight="600" fill="#94a3b8">
            "Headcount is an amplifier. When you amplify an inefficient system, you produce larger losses, not higher growth."
          </text>
        </g>
      </g>
    `
  },
  {
    num: 4,
    title: "The Expanded Enterprise Buying Committee",
    timecode: "2:15 – 3:00",
    type: "Interactive Stakeholder Topology Map",
    content: `
      <rect x="0" y="0" width="1160" height="475" rx="16" fill="#0b1329" stroke="#1e293b" stroke-width="1.5"/>
      <g transform="translate(60, 35)">
        <text font-family="'Inter', sans-serif" font-size="15" font-weight="700" fill="#38bdf8" letter-spacing="0.1em">GARTNER RESEARCH: 6 TO 10 CROSS-FUNCTIONAL DECISION MAKERS</text>
        <text y="40" font-family="'Inter', sans-serif" font-size="28" font-weight="800" fill="#fff">Single-Threading is Lethal: The Consensus Committee</text>

        <!-- Topology Map -->
        <g transform="translate(480, 210)">
          <!-- Connection Lines to Central Champion -->
          <line x1="0" y1="0" x2="-320" y2="-90" stroke="#334155" stroke-width="2" stroke-dasharray="4 4"/>
          <line x1="0" y1="0" x2="-180" y2="-130" stroke="#334155" stroke-width="2" stroke-dasharray="4 4"/>
          <line x1="0" y1="0" x2="160" y2="-130" stroke="#334155" stroke-width="2" stroke-dasharray="4 4"/>
          <line x1="0" y1="0" x2="320" y2="-90" stroke="#334155" stroke-width="2" stroke-dasharray="4 4"/>
          <line x1="0" y1="0" x2="-260" y2="80" stroke="#334155" stroke-width="2" stroke-dasharray="4 4"/>
          <line x1="0" y1="0" x2="260" y2="80" stroke="#334155" stroke-width="2" stroke-dasharray="4 4"/>
          <line x1="0" y1="0" x2="0" y2="100" stroke="#334155" stroke-width="2" stroke-dasharray="4 4"/>

          <!-- Central Node: Champion -->
          <circle cx="0" cy="0" r="42" fill="#2563eb" stroke="#60a5fa" stroke-width="3"/>
          <text text-anchor="middle" y="5" font-family="'Inter', sans-serif" font-size="12" font-weight="800" fill="#fff">CHAMPION<br/>(VP Level)</text>

          <!-- Surrounding Stakeholder Nodes -->
          <!-- CFO -->
          <g transform="translate(-320, -90)">
            <rect x="-65" y="-22" width="130" height="44" rx="8" fill="#1e293b" stroke="#ef4444" stroke-width="2"/>
            <text text-anchor="middle" y="5" font-family="'Inter', sans-serif" font-size="12" font-weight="700" fill="#fff">CFO (Budget Veto)</text>
          </g>
          <!-- CISO -->
          <g transform="translate(-180, -130)">
            <rect x="-60" y="-22" width="120" height="44" rx="8" fill="#1e293b" stroke="#ef4444" stroke-width="2"/>
            <text text-anchor="middle" y="5" font-family="'Inter', sans-serif" font-size="12" font-weight="700" fill="#fff">CISO (SecOps)</text>
          </g>
          <!-- Enterprise Arch -->
          <g transform="translate(160, -130)">
            <rect x="-65" y="-22" width="130" height="44" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
            <text text-anchor="middle" y="5" font-family="'Inter', sans-serif" font-size="12" font-weight="700" fill="#94a3b8">VP Architecture</text>
          </g>
          <!-- Procurement -->
          <g transform="translate(320, -90)">
            <rect x="-65" y="-22" width="130" height="44" rx="8" fill="#1e293b" stroke="#ef4444" stroke-width="2"/>
            <text text-anchor="middle" y="5" font-family="'Inter', sans-serif" font-size="12" font-weight="700" fill="#fff">Procurement / Legal</text>
          </g>
          <!-- BU VP -->
          <g transform="translate(-260, 80)">
            <rect x="-60" y="-22" width="120" height="44" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
            <text text-anchor="middle" y="5" font-family="'Inter', sans-serif" font-size="12" font-weight="700" fill="#94a3b8">Business Unit VP</text>
          </g>
          <!-- RevOps -->
          <g transform="translate(260, 80)">
            <rect x="-60" y="-22" width="120" height="44" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
            <text text-anchor="middle" y="5" font-family="'Inter', sans-serif" font-size="12" font-weight="700" fill="#94a3b8">VP RevOps</text>
          </g>
          <!-- Compliance -->
          <g transform="translate(0, 100)">
            <rect x="-65" y="-22" width="130" height="44" rx="8" fill="#1e293b" stroke="#ef4444" stroke-width="2"/>
            <text text-anchor="middle" y="5" font-family="'Inter', sans-serif" font-size="12" font-weight="700" fill="#fff">Data Compliance</text>
          </g>
        </g>

        <!-- Bottom Warning Callout -->
        <g transform="translate(0, 360)">
          <rect width="1040" height="50" rx="8" fill="#1e1b4b" stroke="#ef4444" stroke-width="1"/>
          <text x="25" y="32" font-family="'Inter', sans-serif" font-size="14" font-weight="600" fill="#fca5a5">
            ⚠️ Disconnect: Reps multithread across only 1.8 contacts while 6+ stakeholders hold silent veto power.
          </text>
        </g>
      </g>
    `
  },
  {
    num: 5,
    title: "The Dark Funnel & The Cost of Latency",
    timecode: "3:00 – 4:30",
    type: "Dark-Funnel Pipeline Visualization & Latency Countdown Timer",
    content: `
      <rect x="0" y="0" width="1160" height="475" rx="16" fill="#0b1329" stroke="#1e293b" stroke-width="1.5"/>
      <g transform="translate(60, 40)">
        <text font-family="'Inter', sans-serif" font-size="15" font-weight="700" fill="#38bdf8" letter-spacing="0.1em">67% TO 80% OF THE BUYING JOURNEY HAPPENS IN THE SHADOWS</text>
        <text y="40" font-family="'Inter', sans-serif" font-size="28" font-weight="800" fill="#fff">The Dark Funnel: Anonymous Research vs Lead Forms</text>

        <!-- Iceberg Graphic -->
        <g transform="translate(80, 80)">
          <!-- Waterline -->
          <line x1="0" y1="80" x2="480" y2="80" stroke="#38bdf8" stroke-width="2" stroke-dasharray="8 4"/>
          <text x="10" y="70" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" fill="#38bdf8">WATERLINE: VISIBLE CRM / FORM FILLS (17%)</text>
          
          <!-- Top of Iceberg (Small) -->
          <polygon points="200,80 240,20 280,80" fill="#38bdf8" opacity="0.8"/>
          
          <!-- Below Waterline (Massive Dark Funnel) -->
          <polygon points="120,80 360,80 440,240 40,240" fill="#1e3a8a" opacity="0.5"/>
          <text x="240" y="150" text-anchor="middle" font-family="'Inter', sans-serif" font-size="18" font-weight="800" fill="#fff">DARK FUNNEL (83%)</text>
          <text x="240" y="180" text-anchor="middle" font-family="'Inter', sans-serif" font-size="13" fill="#94a3b8">Peer Reviews • Documentation • GitHub • Dark Social</text>
        </g>

        <!-- Latency Clock Card -->
        <g transform="translate(640, 80)">
          <rect width="400" height="240" rx="14" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
          <text x="30" y="45" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#ef4444">THE COST OF RESPONSE LATENCY</text>
          <text x="30" y="90" font-family="'Inter', sans-serif" font-size="36" font-weight="900" fill="#fff">5 Mins vs 24 Hrs</text>
          <text x="30" y="130" font-family="'Inter', sans-serif" font-size="15" fill="#94a3b8">Harvard Business Review Benchmark:</text>
          <text x="30" y="160" font-family="'Inter', sans-serif" font-size="18" font-weight="800" fill="#f87171">800% Drop in Qualification Probability</text>
          <text x="30" y="195" font-family="'Inter', sans-serif" font-size="13" fill="#64748b">Average enterprise SDR response time: 28 hours.</text>
        </g>
      </g>
    `
  },
  {
    num: 6,
    title: "GTM Breakdown 1: Signal Sensing Latency",
    timecode: "4:30 – 5:10",
    type: "Systemic Pipeline Funnel — Fracture Point 1",
    content: `
      <rect x="0" y="0" width="1160" height="475" rx="16" fill="#0b1329" stroke="#1e293b" stroke-width="1.5"/>
      <g transform="translate(60, 45)">
        <rect width="180" height="28" rx="6" fill="#ef4444"/>
        <text x="14" y="19" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="800" fill="#fff">BREAKDOWN 01 OF 05</text>
        <text y="65" font-family="'Inter', sans-serif" font-size="32" font-weight="900" fill="#fff">Signal Sensing Latency: Deaf to First-Party Intent</text>
        
        <g transform="translate(0, 110)">
          <rect width="500" height="180" rx="12" fill="#1e293b" stroke="#334155"/>
          <text x="30" y="45" font-family="'Inter', sans-serif" font-size="16" font-weight="700" fill="#ef4444">THE FRACTURE</text>
          <text x="30" y="80" font-family="'Inter', sans-serif" font-size="14" fill="#94a3b8">Intent surges occur on docs, pricing calculators, and product repos weeks before a formal lead form is ever filled. Traditional CRMs remain completely blind to these signals.</text>
          
          <rect x="540" width="500" height="180" rx="12" fill="#1e293b" stroke="#334155"/>
          <text x="30" y="45" font-family="'Inter', sans-serif" font-size="16" font-weight="700" fill="#38bdf8">THE BUSINESS CONSEQUENCE</text>
          <text x="30" y="80" font-family="'Inter', sans-serif" font-size="14" fill="#94a3b8">By the time sales reaches out, the prospect has already invited 2 competitors into an active proof-of-concept. The enterprise enters as column fodder.</text>
        </g>
      </g>
    `
  },
  {
    num: 7,
    title: "GTM Breakdown 2: Buying Committee Disconnect",
    timecode: "5:10 – 5:50",
    type: "Single-Threading Veto Stoppage Graphic",
    content: `
      <rect x="0" y="0" width="1160" height="475" rx="16" fill="#0b1329" stroke="#1e293b" stroke-width="1.5"/>
      <g transform="translate(60, 45)">
        <rect width="180" height="28" rx="6" fill="#ef4444"/>
        <text x="14" y="19" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="800" fill="#fff">BREAKDOWN 02 OF 05</text>
        <text y="65" font-family="'Inter', sans-serif" font-size="32" font-weight="900" fill="#fff">Buying Committee Disconnect: The Silent Veto</text>

        <g transform="translate(0, 110)">
          <rect width="1040" height="200" rx="12" fill="#1e293b" stroke="#334155"/>
          <g transform="translate(40, 40)">
            <text font-family="'Inter', sans-serif" font-size="18" font-weight="800" fill="#fff">Single-Threading Trap</text>
            <text y="35" font-family="'Inter', sans-serif" font-size="15" fill="#94a3b8">AE builds great rapport with a VP of Engineering. In Stage 4, the deal abruptly freezes.</text>
            <text y="70" font-family="'Inter', sans-serif" font-size="15" fill="#ef4444" font-weight="700">Root Cause: CISO raised an unaddressed data sovereignty veto; CFO rejected unmodeled ROI.</text>
            <text y="105" font-family="'Inter', sans-serif" font-size="14" fill="#64748b">Without autonomous multithreading, reps lack the hours to produce tailored business cases for 8 distinct personas.</text>
          </g>
        </g>
      </g>
    `
  },
  {
    num: 8,
    title: "GTM Breakdown 3: RevOps Data Fracture",
    timecode: "5:50 – 6:30",
    type: "Disjointed Database Architecture Map",
    content: `
      <rect x="0" y="0" width="1160" height="475" rx="16" fill="#0b1329" stroke="#1e293b" stroke-width="1.5"/>
      <g transform="translate(60, 45)">
        <rect width="180" height="28" rx="6" fill="#ef4444"/>
        <text x="14" y="19" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="800" fill="#fff">BREAKDOWN 03 OF 05</text>
        <text y="65" font-family="'Inter', sans-serif" font-size="32" font-weight="900" fill="#fff">RevOps Data Fracture: The Disconnected Silos</text>

        <g transform="translate(0, 100)">
          <!-- 4 Broken Silos -->
          <rect x="0" width="230" height="150" rx="10" fill="#1e293b" stroke="#ef4444" stroke-dasharray="4 4"/>
          <text x="25" y="40" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="700" fill="#ef4444">MARKETING</text>
          <text x="25" y="70" font-family="'Inter', sans-serif" font-size="13" fill="#94a3b8">HubSpot / Marketo<br/>MQL Counts<br/>No Deal Attribution</text>

          <rect x="270" width="230" height="150" rx="10" fill="#1e293b" stroke="#ef4444" stroke-dasharray="4 4"/>
          <text x="25" y="40" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="700" fill="#ef4444">SALES CRM</text>
          <text x="25" y="70" font-family="'Inter', sans-serif" font-size="13" fill="#94a3b8">Salesforce Opportunity<br/>Stale Stage Dates<br/>Subjective Notes</text>

          <rect x="540" width="230" height="150" rx="10" fill="#1e293b" stroke="#ef4444" stroke-dasharray="4 4"/>
          <text x="25" y="40" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="700" fill="#ef4444">FINANCE / ERP</text>
          <text x="25" y="70" font-family="'Inter', sans-serif" font-size="13" fill="#94a3b8">NetSuite / Stripe<br/>Invoicing Mismatch<br/>Contract Redlines</text>

          <rect x="810" width="230" height="150" rx="10" fill="#1e293b" stroke="#ef4444" stroke-dasharray="4 4"/>
          <text x="25" y="40" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="700" fill="#ef4444">CUSTOMER SUCCESS</text>
          <text x="25" y="70" font-family="'Inter', sans-serif" font-size="13" fill="#94a3b8">Gainsight / Zendesk<br/>Support Tickets<br/>Zero Commercial Sync</text>
        </g>
      </g>
    `
  },
  {
    num: 9,
    title: "GTM Breakdown 4: Administrative Rep Drag",
    timecode: "6:30 – 7:10",
    type: "Rep Capacity Allocation Donut Chart & Activity Clock",
    content: `
      <rect x="0" y="0" width="1160" height="475" rx="16" fill="#0b1329" stroke="#1e293b" stroke-width="1.5"/>
      <g transform="translate(60, 45)">
        <rect width="180" height="28" rx="6" fill="#ef4444"/>
        <text x="14" y="19" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="800" fill="#fff">BREAKDOWN 04 OF 05</text>
        <text y="65" font-family="'Inter', sans-serif" font-size="32" font-weight="900" fill="#fff">Administrative Rep Drag: The $250k Data Entry Clerk</text>

        <g transform="translate(60, 100)">
          <!-- Donut Graphic Simulation -->
          <circle cx="120" cy="110" r="90" fill="none" stroke="#ef4444" stroke-width="36" stroke-dasharray="380 180"/>
          <circle cx="120" cy="110" r="90" fill="none" stroke="#38bdf8" stroke-width="36" stroke-dasharray="180 380" stroke-dashoffset="-380"/>
          <text x="120" y="115" text-anchor="middle" font-family="'Inter', sans-serif" font-size="22" font-weight="900" fill="#fff">68%</text>
          <text x="120" y="135" text-anchor="middle" font-family="'Inter', sans-serif" font-size="11" fill="#94a3b8">DRAG</text>

          <g transform="translate(300, 40)">
            <rect width="560" height="70" rx="8" fill="#1e293b" stroke="#ef4444" stroke-width="1"/>
            <text x="25" y="42" font-family="'Inter', sans-serif" font-size="16" font-weight="700" fill="#f87171">68% Non-Selling Administrative Drag</text>
            <text x="25" y="60" font-family="'Inter', sans-serif" font-size="12" fill="#94a3b8">Manual CRM updates, note logging, list building, calendar tag</text>

            <rect y="90" width="560" height="70" rx="8" fill="#1e293b" stroke="#38bdf8" stroke-width="1"/>
            <text x="25" y="132" font-family="'Inter', sans-serif" font-size="16" font-weight="700" fill="#38bdf8">Only 32% Active Commercial Selling Time</text>
            <text x="25" y="150" font-family="'Inter', sans-serif" font-size="12" fill="#94a3b8">Customer conversations, objection negotiation, closing</text>
          </g>
        </g>
      </g>
    `
  },
  {
    num: 10,
    title: "GTM Breakdown 5: Post-Sale Revenue Amnesia",
    timecode: "7:10 – 7:45",
    type: "The Revenue Context Chasm Schematic",
    content: `
      <rect x="0" y="0" width="1160" height="475" rx="16" fill="#0b1329" stroke="#1e293b" stroke-width="1.5"/>
      <g transform="translate(60, 45)">
        <rect width="180" height="28" rx="6" fill="#ef4444"/>
        <text x="14" y="19" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="800" fill="#fff">BREAKDOWN 05 OF 05</text>
        <text y="65" font-family="'Inter', sans-serif" font-size="32" font-weight="900" fill="#fff">Post-Sale Revenue Amnesia: The Handshake Chasm</text>

        <g transform="translate(0, 110)">
          <rect width="480" height="180" rx="12" fill="#1e293b" stroke="#334155"/>
          <text x="30" y="40" font-family="'Inter', sans-serif" font-size="16" font-weight="700" fill="#38bdf8">WHAT SALES COMMITTED</text>
          <text x="30" y="75" font-family="'Inter', sans-serif" font-size="13" fill="#94a3b8">Value benchmarks, executive milestones, custom security promises, implementation expectations.</text>

          <!-- The Chasm -->
          <rect x="500" width="40" height="180" rx="6" fill="#450a0a"/>
          <text x="520" y="95" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="800" fill="#ef4444" transform="rotate(-90 520 95)">CONTEXT CHASM</text>

          <rect x="560" width="480" height="180" rx="12" fill="#1e293b" stroke="#334155"/>
          <text x="30" y="40" font-family="'Inter', sans-serif" font-size="16" font-weight="700" fill="#ef4444">WHAT CUSTOMER SUCCESS RECEIVES</text>
          <text x="30" y="75" font-family="'Inter', sans-serif" font-size="13" fill="#94a3b8">A bare-bones Salesforce record with half-filled fields. The customer has to repeat their entire story on day one.</text>
        </g>
      </g>
    `
  },
  {
    num: 11,
    title: "The Cost of Inaction: Macro Framework",
    timecode: "7:45 – 8:30",
    type: "Executive 4-Quadrant Matrix Canvas & Mandatory Disclaimer",
    content: `
      <rect x="0" y="0" width="1160" height="475" rx="16" fill="#0b1329" stroke="#1e293b" stroke-width="1.5"/>
      <g transform="translate(60, 35)">
        <text font-family="'Inter', sans-serif" font-size="14" font-weight="700" fill="#ef4444" letter-spacing="0.1em">CFO-AUDITED COST OF INACTION (COI) ON A $100M ARR ENTERPRISE</text>
        <text y="40" font-family="'Inter', sans-serif" font-size="30" font-weight="900" fill="#fff">The $17,180,000 Annual Silent Profit Bleed</text>

        <!-- 4 Quadrants -->
        <g transform="translate(0, 65)">
          <rect x="0" y="0" width="500" height="120" rx="10" fill="#1e293b" stroke="#ef4444" stroke-width="1.5"/>
          <text x="25" y="35" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#ef4444">Q1: DIRECT PIPELINE DECAY</text>
          <text x="25" y="75" font-family="'Inter', sans-serif" font-size="30" font-weight="900" fill="#fff">$7,840,000</text>
          <text x="25" y="102" font-family="'Inter', sans-serif" font-size="12" fill="#94a3b8">Deal slippage &amp; late-stage disqualification</text>

          <rect x="540" y="0" width="500" height="120" rx="10" fill="#1e293b" stroke="#ef4444" stroke-width="1.5"/>
          <text x="25" y="35" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#ef4444">Q2: SALES CAPACITY &amp; TALENT WASTE</text>
          <text x="25" y="75" font-family="'Inter', sans-serif" font-size="30" font-weight="900" fill="#fff">$4,120,000</text>
          <text x="25" y="102" font-family="'Inter', sans-serif" font-size="12" fill="#94a3b8">Rep churn, ramp drag, sub-50% quota yield</text>

          <rect x="0" y="140" width="500" height="120" rx="10" fill="#1e293b" stroke="#ef4444" stroke-width="1.5"/>
          <text x="25" y="175" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#ef4444">Q3: POINT-TOOL OVERHEAD &amp; SPRAWL</text>
          <text x="25" y="215" font-family="'Inter', sans-serif" font-size="30" font-weight="900" fill="#fff">$1,820,000</text>
          <text x="25" y="242" font-family="'Inter', sans-serif" font-size="12" fill="#94a3b8">SaaS seat bloat, disjointed integration debt</text>

          <rect x="540" y="140" width="500" height="120" rx="10" fill="#1e293b" stroke="#ef4444" stroke-width="1.5"/>
          <text x="25" y="175" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#ef4444">Q4: COMPETITIVE OPPORTUNITY COST</text>
          <text x="25" y="215" font-family="'Inter', sans-serif" font-size="30" font-weight="900" fill="#fff">$3,400,000</text>
          <text x="25" y="242" font-family="'Inter', sans-serif" font-size="12" fill="#94a3b8">Market share ceded to automated competitors</text>
        </g>

        <!-- Mandatory Legal Disclaimer -->
        <g transform="translate(0, 360)">
          <text font-family="'Inter', sans-serif" font-size="11" fill="#64748b">
            *Illustrative financial framework based on empirical B2B SaaS benchmarks ($100M ARR baseline). Individual company impact varies by TAM, cycle duration, and sales motion.
          </text>
        </g>
      </g>
    `
  },
  {
    num: 12,
    title: "Quadrants 1 & 2: Direct Decay & Talent Waste",
    timecode: "8:30 – 9:30",
    type: "Interactive Deep-Dive Cards: Quadrants 1 & 2",
    content: `
      <rect x="0" y="0" width="1160" height="475" rx="16" fill="#0b1329" stroke="#1e293b" stroke-width="1.5"/>
      <g transform="translate(60, 45)">
        <text font-family="'Inter', sans-serif" font-size="14" font-weight="700" fill="#ef4444" letter-spacing="0.1em">COI BREAKDOWN • PART 1</text>
        <text y="40" font-family="'Inter', sans-serif" font-size="30" font-weight="800" fill="#fff">Direct Revenue Erosion: $11.96M Combined Loss</text>

        <g transform="translate(0, 80)">
          <rect width="500" height="230" rx="12" fill="#1e293b" stroke="#ef4444" stroke-width="1.5"/>
          <g transform="translate(30, 35)">
            <text font-family="'JetBrains Mono', monospace" font-size="14" font-weight="800" fill="#ef4444">QUADRANT 01: PIPELINE DECAY</text>
            <text y="45" font-family="'Inter', sans-serif" font-size="38" font-weight="900" fill="#fff">$7.84M / yr</text>
            <text y="90" font-family="'Inter', sans-serif" font-size="14" fill="#94a3b8">• 67% slip rate compounds sales cycle latency</text>
            <text y="120" font-family="'Inter', sans-serif" font-size="14" fill="#94a3b8">• Late-stage committee vetos waste 4+ months of AE time</text>
            <text y="150" font-family="'Inter', sans-serif" font-size="14" fill="#94a3b8">• Unresponded dark signals convert to competitor POCs</text>
          </g>

          <rect x="540" width="500" height="230" rx="12" fill="#1e293b" stroke="#ef4444" stroke-width="1.5"/>
          <g transform="translate(570, 35)">
            <text font-family="'JetBrains Mono', monospace" font-size="14" font-weight="800" fill="#ef4444">QUADRANT 02: TALENT DRAG</text>
            <text y="45" font-family="'Inter', sans-serif" font-size="38" font-weight="900" fill="#fff">$4.12M / yr</text>
            <text y="90" font-family="'Inter', sans-serif" font-size="14" fill="#94a3b8">• 9-month average enterprise ramp duration</text>
            <text y="120" font-family="'Inter', sans-serif" font-size="14" fill="#94a3b8">• 34% annual rep turnover burns fully-loaded OTE</text>
            <text y="150" font-family="'Inter', sans-serif" font-size="14" fill="#94a3b8">• Severe territory dilution across fragmented patches</text>
          </g>
        </g>
      </g>
    `
  },
  {
    num: 13,
    title: "Quadrants 3 & 4: Tech Overhead & Opportunity Cost",
    timecode: "9:30 – 10:30",
    type: "Interactive Deep-Dive Cards: Quadrants 3 & 4 & Total Counter",
    content: `
      <rect x="0" y="0" width="1160" height="475" rx="16" fill="#0b1329" stroke="#1e293b" stroke-width="1.5"/>
      <g transform="translate(60, 45)">
        <text font-family="'Inter', sans-serif" font-size="14" font-weight="700" fill="#ef4444" letter-spacing="0.1em">COI BREAKDOWN • PART 2</text>
        <text y="40" font-family="'Inter', sans-serif" font-size="30" font-weight="800" fill="#fff">Structural Overhead: $5.22M Combined Loss</text>

        <g transform="translate(0, 80)">
          <rect width="500" height="230" rx="12" fill="#1e293b" stroke="#ef4444" stroke-width="1.5"/>
          <g transform="translate(30, 35)">
            <text font-family="'JetBrains Mono', monospace" font-size="14" font-weight="800" fill="#ef4444">QUADRANT 03: TECH SPRAWL</text>
            <text y="45" font-family="'Inter', sans-serif" font-size="38" font-weight="900" fill="#fff">$1.82M / yr</text>
            <text y="90" font-family="'Inter', sans-serif" font-size="14" fill="#94a3b8">• 14 average disconnected sales point solutions</text>
            <text y="120" font-family="'Inter', sans-serif" font-size="14" fill="#94a3b8">• Continuous integration upkeep and API sync failures</text>
            <text y="150" font-family="'Inter', sans-serif" font-size="14" fill="#94a3b8">• Redundant data enrichment and prospecting subscriptions</text>
          </g>

          <rect x="540" width="500" height="230" rx="12" fill="#1e293b" stroke="#ef4444" stroke-width="1.5"/>
          <g transform="translate(570, 35)">
            <text font-family="'JetBrains Mono', monospace" font-size="14" font-weight="800" fill="#ef4444">QUADRANT 04: OPPORTUNITY COST</text>
            <text y="45" font-family="'Inter', sans-serif" font-size="38" font-weight="900" fill="#fff">$3.40M / yr</text>
            <text y="90" font-family="'Inter', sans-serif" font-size="14" fill="#94a3b8">• Competitors with autonomous telemetry capture accounts</text>
            <text y="120" font-family="'Inter', sans-serif" font-size="14" fill="#94a3b8">• Inability to expand enterprise accounts through latency</text>
            <text y="150" font-family="'Inter', sans-serif" font-size="14" fill="#94a3b8">• Permanent erosion of enterprise market share</text>
          </g>
        </g>
      </g>
    `
  },
  {
    num: 14,
    title: "Point-Tool Proliferation & Human Middleware",
    timecode: "10:30 – 11:45",
    type: "Tangled 14-Tool Sprawl vs. Rep Context Drag Graphic",
    content: `
      <rect x="0" y="0" width="1160" height="475" rx="16" fill="#0b1329" stroke="#1e293b" stroke-width="1.5"/>
      <g transform="translate(60, 45)">
        <text font-family="'Inter', sans-serif" font-size="14" font-weight="700" fill="#38bdf8" letter-spacing="0.1em">POINT-TOOL PROLIFERATION: 14 SEPARATE BROWSER TABS</text>
        <text y="40" font-family="'Inter', sans-serif" font-size="30" font-weight="800" fill="#fff">Sales Reps Forced to Act as "Human Middleware"</text>

        <g transform="translate(0, 80)">
          <!-- Left: Tangled Tool Nodes -->
          <g transform="translate(50, 40)">
            <rect x="0" y="0" width="120" height="40" rx="6" fill="#1e293b" stroke="#475569"/><text x="60" y="25" text-anchor="middle" font-family="'Inter', sans-serif" font-size="11" fill="#fff">Outreach tool</text>
            <rect x="150" y="0" width="120" height="40" rx="6" fill="#1e293b" stroke="#475569"/><text x="210" y="25" text-anchor="middle" font-family="'Inter', sans-serif" font-size="11" fill="#fff">LinkedIn Navigator</text>
            <rect x="0" y="60" width="120" height="40" rx="6" fill="#1e293b" stroke="#475569"/><text x="60" y="85" text-anchor="middle" font-family="'Inter', sans-serif" font-size="11" fill="#fff">ZoomInfo</text>
            <rect x="150" y="60" width="120" height="40" rx="6" fill="#1e293b" stroke="#475569"/><text x="210" y="85" text-anchor="middle" font-family="'Inter', sans-serif" font-size="11" fill="#fff">Salesforce CRM</text>
            <rect x="0" y="120" width="120" height="40" rx="6" fill="#1e293b" stroke="#475569"/><text x="60" y="145" text-anchor="middle" font-family="'Inter', sans-serif" font-size="11" fill="#fff">Gong / Chorus</text>
            <rect x="150" y="120" width="120" height="40" rx="6" fill="#1e293b" stroke="#475569"/><text x="210" y="145" text-anchor="middle" font-family="'Inter', sans-serif" font-size="11" fill="#fff">Calendly / ChiliPiper</text>
          </g>

          <!-- Middle Arrow -->
          <g transform="translate(380, 110)">
            <text font-family="'JetBrains Mono', monospace" font-size="28" fill="#ef4444">&rarr;</text>
          </g>

          <!-- Right Card: Human Middleware Consequence -->
          <g transform="translate(450, 20)">
            <rect width="550" height="200" rx="12" fill="#1e1b4b" stroke="#ef4444" stroke-width="1.5"/>
            <g transform="translate(35, 35)">
              <text font-family="'Inter', sans-serif" font-size="18" font-weight="800" fill="#f87171">The Human Middleware Trap</text>
              <text y="40" font-family="'Inter', sans-serif" font-size="14" fill="#c7d2fe">Reps copy-paste data between 14 systems manually:</text>
              <text y="70" font-family="'Inter', sans-serif" font-size="14" fill="#94a3b8">• 2.4 hours lost per rep per day to context switching</text>
              <text y="100" font-family="'Inter', sans-serif" font-size="14" fill="#94a3b8">• Zero shared state across GTM lifecycle</text>
              <text y="130" font-family="'Inter', sans-serif" font-size="14" fill="#94a3b8">• Point-AI tools only generate more spam into this chaos</text>
            </g>
          </g>
        </g>
      </g>
    `
  },
  {
    num: 15,
    title: "The Connected System of Intelligence",
    timecode: "11:45 – 12:45",
    type: "Unified Revenue Architecture Schematic",
    content: `
      <rect x="0" y="0" width="1160" height="475" rx="16" fill="#0b1329" stroke="#1e293b" stroke-width="1.5"/>
      <g transform="translate(60, 45)">
        <text font-family="'Inter', sans-serif" font-size="14" font-weight="700" fill="#38bdf8" letter-spacing="0.1em">THE ARCHITECTURAL PARADIGM SHIFT</text>
        <text y="40" font-family="'Inter', sans-serif" font-size="30" font-weight="800" fill="#fff">From Fragmented Tools to Unified System of Intelligence</text>

        <g transform="translate(0, 80)">
          <!-- Layer 3: System of Record -->
          <rect y="160" width="1040" height="60" rx="8" fill="#1e293b" stroke="#334155"/>
          <text x="30" y="196" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#94a3b8">TIER 3: EXISTING SYSTEM OF RECORD (Salesforce • HubSpot • Snowflake • ERP)</text>

          <!-- Layer 2: Decision Fabric -->
          <rect y="80" width="1040" height="60" rx="8" fill="#1e3a8a" stroke="#2563eb"/>
          <text x="30" y="116" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#60a5fa">TIER 2: REAL-TIME INTENT &amp; IDENTITY FABRIC (Dark Funnel • Topology Graph)</text>

          <!-- Layer 1: Autonomous Orchestration -->
          <rect y="0" width="1040" height="60" rx="8" fill="#065f46" stroke="#10b981"/>
          <text x="30" y="36" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#34d399">TIER 1: AUTONOMOUS REVENUE ORCHESTRATION (Agentic SDRs • Sub-60s Dossiers)</text>
        </g>

        <g transform="translate(0, 340)">
          <text font-family="'Inter', sans-serif" font-size="15" font-weight="600" fill="#38bdf8">
            ✓ Preserves your CRM investment while eliminating manual human glue through native autonomy.
          </text>
        </g>
      </g>
    `
  },
  {
    num: 16,
    title: "Executive Summary & Video 2 Call to Action",
    timecode: "12:45 – 13:45",
    type: "Summary Pillars, eBook Asset & Video 2 Preview Slate",
    content: `
      <rect x="0" y="0" width="1160" height="475" rx="16" fill="#0b1329" stroke="#1e293b" stroke-width="1.5"/>
      <g transform="translate(60, 45)">
        <text font-family="'Inter', sans-serif" font-size="14" font-weight="700" fill="#38bdf8" letter-spacing="0.1em">BRIEFING 01 COMPLETE</text>
        <text y="40" font-family="'Inter', sans-serif" font-size="30" font-weight="800" fill="#fff">Stop Hiring Into Friction: Architect for Capital Efficiency</text>

        <g transform="translate(0, 80)">
          <rect width="480" height="200" rx="12" fill="#1e293b" stroke="#334155"/>
          <g transform="translate(30, 35)">
            <text font-family="'Inter', sans-serif" font-size="16" font-weight="800" fill="#38bdf8">FREE EXECUTIVE DOWNLOAD</text>
            <text y="35" font-family="'Inter', sans-serif" font-size="20" font-weight="800" fill="#fff">The Cost of Inaction Diagnostic Playbook</text>
            <text y="70" font-family="'Inter', sans-serif" font-size="13" fill="#94a3b8">Complete mathematical modeling formulas, 4-quadrant calculators, and CFO review templates.</text>
            <rect y="100" width="220" height="38" rx="6" fill="#2563eb"/>
            <text x="110" y="124" text-anchor="middle" font-family="'Inter', sans-serif" font-size="12" font-weight="700" fill="#fff">profitmachines.com/diagnostic</text>
          </g>

          <rect x="520" width="520" height="200" rx="12" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
          <g transform="translate(550, 35)">
            <text font-family="'JetBrains Mono', monospace" font-size="13" font-weight="800" fill="#38bdf8">NEXT BRIEFING: PART 2</text>
            <text y="35" font-family="'Inter', sans-serif" font-size="20" font-weight="800" fill="#fff">Beyond AI Chatbots: How AI-Native Transformation Works</text>
            <text y="70" font-family="'Inter', sans-serif" font-size="13" fill="#94a3b8">Learn how autonomous agents, dark demand ingestion, and unified telemetry replace point-tool sprawl.</text>
            <text y="124" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#34d399">WATCH PART 2 &rarr;</text>
          </g>
        </g>
      </g>
    `
  }
];

// Helper to write scenes for Video 1
function writeVideo1Scenes() {
  const dir = path.join(__dirname, 'video-01-revenue-friction', 'scenes');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  v1Scenes.forEach(s => {
    const svg = createSvgScene({
      seriesNum: 1,
      seriesName: "From Revenue Friction to Profitable Growth",
      sceneNum: s.num,
      sceneTitle: s.title,
      timecode: s.timecode,
      visualCategory: s.type,
      contentHtml: s.content
    });
    const filename = `scene-${String(s.num).padStart(2, '0')}.svg`;
    fs.writeFileSync(path.join(dir, filename), svg, 'utf8');
  });
  console.log(`Video 1: Generated all ${v1Scenes.length} scenes.`);
}

writeVideo1Scenes();

