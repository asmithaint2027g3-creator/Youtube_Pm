# ProfitMachines YouTube Series: Asset Production Plan

**Phase:** Phase 4 — Visual Storyboarding and Asset Planning  
**Target Resolution:** 4K UHD (3840×2160) at 60 fps (16:9 Landscape)  
**Deliverable Directory:** `profitmachines-youtube-videos/assets/`  
**Companion Documents:**
- [`video-01-revenue-friction/storyboard.md`](./video-01-revenue-friction/storyboard.md)
- [`video-02-ai-native-revenue-transformation/storyboard.md`](./video-02-ai-native-revenue-transformation/storyboard.md)
- [`video-03-revenue-growth-roadmap/storyboard.md`](./video-03-revenue-growth-roadmap/storyboard.md)
- [`visual-claims-review.md`](./visual-claims-review.md)

---

## 1. Inventory of Existing Approved Assets & Reuse Analysis

A thorough physical inspection of the project workspace (`public/`, `src/assets/`, `src/`) was conducted.

| Asset Name | Current Workspace Location | Format | Intended Reuse | Status |
| :--- | :--- | :---: | :--- | :--- |
| **TrustGrid / ProfitMachines Logo Mark** | `src/assets/Trustgrid-logo.png` | Raster PNG (8.66 KB) | End-screen corporate identity watermark (Vector rebuild required for 4K broadcast) | **Requires Vector Conversion** |
| **Lucide Icon Library** | `node_modules/lucide-react` / Vector definitions | SVG / Vector | UI element icons (ShieldCheck, Activity, Users, ArrowUpRight, etc.) | **Approved for Vector Graphics** |
| **Existing Motion Graphics / Video Files** | *None exist in current repo* | N/A | Zero pre-existing video animations exist. All motion assets are net-new creations. | **To Be Produced** |

---

## 2. Complete Asset Production Schedule by Category

---

### Category A: Core Brand & Trilogy Shared Assets
*These assets are deployed across all three videos for series cohesion.*

| Asset Filename | Intended Video(s) | Scene Ref(s) | Dimensions / Aspect | Creation Method | Dependencies | Approval Status |
| :--- | :---: | :---: | :---: | :--- | :--- | :---: |
| `profitmachines_logo_vector.svg` | All (1, 2, 3) | S16 (All) | 3840×2160 Vector | Vector trace & redesign in Illustrator / Figma | Replaces raster logo | **Pending Creation** |
| `ebook_cover_3d.png` | All (1, 2, 3) | S16 (All) | 2160×2160 (1:1 4K) | 3D Book Mockup render (Blender / Photoshop) | Final eBook title & cover layout | **Pending eBook Asset** |
| `mandatory_disclaimer_overlay.svg` | Videos 1 & 3 | V1 (S11–13)<br/>V3 (S12–14) | 3840×300 (16:9 bottom banner) | Motion vector layout with 16pt+ high-contrast type | Exact legal disclaimer text | **Pre-Approved Wording** |
| `qr_code_booking.svg` | All (1, 2, 3) | S16 (All) | 1000×1000 Vector | Dynamic QR code vector generator | URL: `profit-max-delta.vercel.app/book-consultation` | **Pending URL Confirmation** |

---

### Category B: Video 1 Visual Assets (Revenue Friction)
*File directory: `profitmachines-youtube-videos/assets/video-01/`*

| Asset Filename | Scene Ref | Dimensions | Creation Method | Description & Content | Approval Status |
| :--- | :---: | :---: | :--- | :--- | :---: |
| `v01_s01_kinetic_hook.mp4` | Scene 01 | 3840×2160 60fps | After Effects / Cavalry | 3D kinetic text hook (67% slip, 32% selling time) | Verified stats |
| `v01_s02_zirp_timeline.svg` | Scene 02 | 3840×2160 Vector | Figma / Illustrator | 2012–2021 ZIRP timeline & linear headcount model | Benchmark verified |
| `v01_s03_headcount_trap_graph.json` | Scene 03 | 3840×2160 Lottie | After Effects + Bodymovin | Dual-curve chart: Headcount cost vs. Quota yield | Benchmark verified |
| `v01_s04_buying_committee_topology.svg`| Scene 04 | 3840×2160 Vector | Illustrator / Figma | 6–10 stakeholder network topology map with vetoes | Gartner verified |
| `v01_s05_latency_infographic.svg` | Scene 05 | 3840×2160 Vector | Illustrator / Motion | Dark-funnel map + 28-hr latency timer & HBR conversion curve | HBR verified |
| `v01_s06_pipeline_breakdown1.svg` | Scene 06 | 3840×2160 Vector | Figma Vector | Pipeline leakage 1: Signal sensing latency | Concept approved |
| `v01_s07_pipeline_breakdown2.svg` | Scene 07 | 3840×2160 Vector | Figma Vector | Pipeline leakage 2: Single-threading veto halt | Concept approved |
| `v01_s08_pipeline_breakdown3.svg` | Scene 08 | 3840×2160 Vector | Figma Vector | Pipeline leakage 3: Disconnected database cylinders | Concept approved |
| `v01_s09_rep_drag_clock.svg` | Scene 09 | 3840×2160 Vector | Illustrator Motion | 40-hr capacity clock: 32% selling vs. 68% admin | Salesforce verified |
| `v01_s10_context_chasm.svg` | Scene 10 | 3840×2160 Vector | Illustrator Vector | The Context Chasm: Sales to CS drop-off | Concept approved |
| `v01_s11_coi_matrix_frame.svg` | Scene 11 | 3840×2160 Vector | Figma Vector | 4-Quadrant Cost of Inaction glassmorphic frame | Illustrative Model |
| `v01_s12_quadrants_1_2.svg` | Scene 12 | 3840×2160 Vector | Figma Vector | Quadrants 1 & 2 cards: Direct Decay ($7.84M) & Talent Waste ($4.12M) | Illustrative Model |
| `v01_s13_quadrants_3_4_total.svg` | Scene 13 | 3840×2160 Vector | Figma Vector | Quadrants 3 & 4 + Central $17.18M Total Loss Badge | Illustrative Model |
| `v01_s14_tool_sprawl_human_middleware.svg`| Scene 14 | 3840×2160 Vector | Illustrator Vector | Tangled 14-tool sprawl web around rep silhouette | Gartner verified |
| `v01_s15_connected_system_architecture.svg`| Scene 15 | 3840×2160 Vector | Figma Vector | Unified System of Intelligence clean telemetry architecture | Platform verified |
| `v01_s16_executive_summary_cta.svg` | Scene 16 | 3840×2160 Vector | Figma Vector | 3 Takeaway cards + Video 2 thumbnail card preview | Ready for layout |

---

### Category C: Video 2 Visual Assets (AI-Native Architecture)
*File directory: `profitmachines-youtube-videos/assets/video-02/`*

| Asset Filename | Scene Ref | Dimensions | Creation Method | Description & Content | Approval Status |
| :--- | :---: | :---: | :--- | :--- | :---: |
| `v02_s01_split_screen_clutter.mp4` | Scene 01 | 3840×2160 60fps | Screen Capture / After Effects | 12-tab rep clutter vs. sleek sub-60s dossier | Realistic UI mock |
| `v02_s02_email_volume_vs_response.svg` | Scene 02 | 3840×2160 Vector | Illustrator / Figma | +38% email volume vs. -42% response collapse | Gong/Outreach verified |
| `v02_s03_point_ai_vs_system_intelligence.svg`| Scene 03 | 3840×2160 Vector | Figma Vector | Unilateral prompts vs. Bi-directional intelligence | Concept approved |
| `v02_s04_tier3_systems_of_record.svg` | Scene 04 | 3840×2160 Vector | 3D / Isometric Figma | 3D Foundation layer (Salesforce, HubSpot, NetSuite) | Platform verified |
| `v02_s05_tier2_decision_fabric.svg` | Scene 05 | 3840×2160 Vector | 3D / Isometric Figma | 3D Intelligence core: Telemetry streams & SPICED graph | Platform verified |
| `v02_s06_tier1_orchestration_stack.svg`| Scene 06 | 3840×2160 Vector | 3D / Isometric Figma | Complete 3-tier exploded architecture stack | Platform verified |
| `v02_s07_profit_pool_radar.svg` | Scene 07 | 3840×2160 Vector | After Effects Motion | Micro-niche sizing radar isolating high-margin pools | Methodology verified |
| `v02_s08_demand_engineering_topology.svg`| Scene 08 | 3840×2160 Vector | Figma Vector | Multi-signal intent telemetry & Buying Group Topology | 6sense verified |
| `v02_s09_autonomous_dossier_interface.svg`| Scene 09 | 3840×2160 Vector | Figma UI Component | Autonomous pre-meeting dossier unfurling on calendar | Capability verified |
| `v02_s10_sales_velocity_equation.svg` | Scene 10 | 3840×2160 Vector | KaTeX Math / Illustrator | Mark Roberge velocity formula & compounding calculator | Roberge verified |
| `v02_s11_zero_touch_crm_sync.svg` | Scene 11 | 3840×2160 Vector | Figma UI Animation | Autonomous CRM stage and field update interface | Capability verified |
| `v02_s12_cs_handshake_120day_alert.svg` | Scene 12 | 3840×2160 Vector | Figma UI Animation | Sales-to-CS Value Handshake & 120-day renewal alert | Capability verified |
| `v02_s13_growth_intelligence_forecast.svg`| Scene 13 | 3840×2160 Vector | Figma Vector | Algorithmic forecast curve (<4% variance) | Capability verified |
| `v02_s14_zero_data_retention_shield.svg`| Scene 14 | 3840×2160 Vector | After Effects Particle | Ephemeral data dissipation & security shields | Security Review |
| `v02_s15_gtm_transformation_alignment.svg`| Scene 15 | 3840×2160 Vector | Figma Vector | Executive alignment grid: capacity, compensation, governance | Offering verified |
| `v02_s16_8capabilities_flywheel_cta.svg` | Scene 16 | 3840×2160 Vector | Figma Vector | 2×4 mosaic of 8 capabilities + Video 3 card preview | Ready for layout |

---

### Category D: Video 3 Visual Assets (Growth Roadmap)
*File directory: `profitmachines-youtube-videos/assets/video-03/`*

| Asset Filename | Scene Ref | Dimensions | Creation Method | Description & Content | Approval Status |
| :--- | :---: | :---: | :--- | :--- | :---: |
| `v03_s01_red_to_green_scorecard.svg` | Scene 01 | 3840×2160 Vector | Figma / After Effects | 90-day progress scorecard transition (red to green) | Realistic model |
| `v03_s02_rip_and_replace_failure.svg` | Scene 02 | 3840×2160 Vector | Illustrator Vector | Failed 18-month IT overhaul blueprint & HBR failure stamp | HBR verified |
| `v03_s03_dual_track_execution.svg` | Scene 03 | 3840×2160 Vector | Figma Vector | Dual-Track concurrent timeline (Rapid Yield vs. Infra) | Framework verified |
| `v03_s04_six_dimensions_grid.svg` | Scene 04 | 3840×2160 Vector | Figma Vector | 2×3 operational dimension framework grid | Rubric verified |
| `v03_s05_maturity_matrix_full.svg` | Scene 05 | 3840×2160 Vector | Figma Vector | Complete 4-stage Revenue Architecture Maturity Matrix | Rubric verified |
| `v03_s06_stage2_trap_infographic.svg` | Scene 06 | 3840×2160 Vector | Figma Vector | The Stage 2 Fragmented Tool Trap (82% of firms stall) | Benchmark verified |
| `v03_s07_kpi_dashboard_part1.svg` | Scene 07 | 3840×2160 Vector | Figma UI Component | Baseline KPIs 1 & 2: Cycle duration & Rep selling time | Benchmark verified |
| `v03_s08_kpi_dashboard_part2.svg` | Scene 08 | 3840×2160 Vector | Figma UI Component | Baseline KPIs 3, 4 & 5: Conversion, Variance & NRR | Benchmark verified |
| `v03_s09_gantt_phase1.svg` | Scene 09 | 3840×2160 Vector | Figma Gantt Vector | Phase 1 Gantt: Days 1–30 Diagnostics & Inactive Pipeline | Proposed Framework |
| `v03_s10_gantt_phase2.svg` | Scene 10 | 3840×2160 Vector | Figma Gantt Vector | Phase 2 Gantt: Days 31–60 Velocity Activation & Dossiers | Proposed Framework |
| `v03_s11_gantt_phase3.svg` | Scene 11 | 3840×2160 Vector | Figma Gantt Vector | Phase 3 Gantt: Days 61–90 Autonomous Closed-Loop Sync | Proposed Framework |
| `v03_s12_dcf_model_frame.svg` | Scene 12 | 3840×2160 Vector | Figma Spreadsheet Vector | 3-Year DCF model frame & mandatory legal disclaimer | Illustrative Model |
| `v03_s13_dcf_waterfall_table.svg` | Scene 13 | 3840×2160 Vector | Figma Table Vector | DCF return waterfall: $11.03M NPV, 148.6% IRR, 5.8m payback | Illustrative Model |
| `v03_s14_valuation_multiplier.svg` | Scene 14 | 3840×2160 Vector | KaTeX Math / Illustrator | Valuation multiplier formula: $8.4M ARR $\times$ 6x = +$50.4M | Illustrative Model |
| `v03_s15_board_governance_mandate.svg`| Scene 15 | 3840×2160 Vector | Figma Vector | Board governance keystone: CEO, CFO, CRO pillars | Position approved |
| `v03_s16_trilogy_complete_cta.svg` | Scene 16 | 3840×2160 Vector | Figma Vector | 3-video trilogy complete slate + eBook + QR code booking | Ready for layout |

---

## 3. Production Specifications: Audio, Voice-Over, Captions & Thumbnails

### Presenter & Voice-Over Requirements
* **Vocal Tone:** Deep, authoritative, measured, boardroom-consultative. Calm executive cadence (130–140 words per minute). No hyperbolic enthusiasm or aggressive sales pitch inflections.
* **Audio Specs:** 48 kHz / 24-bit broadcast WAV recording. Noise floor < -60 dB. Processed with gentle compression (2:1 ratio), subtle high-pass filter at 80 Hz, and de-essing.

### Music & Sound Design Library
* **Primary Bed:** Minimalist modern corporate synth bed with low-frequency acoustic warmth (tempo: 80–90 BPM). Stays mixed at -18 dB under narration.
* **Key SFX:**
  - *Sub-bass swell (40 Hz):* Punctuate major statistical reveals and total financial summaries.
  - *Clean UI clicks & chimes:* Node connections, calendar dossier unfurls, milestone checkmarks.
  - *Data flow hum:* Subtle white-noise/pink-noise modulation during telemetry ingestion sequences.

### Subtitle & Accessibility Standards
* **Subtitles:** Embedded closed captions (SRT file) plus on-screen motion typography for major statistics and equations.
* **Contrast Compliance:** All text overlays adhere to WCAG AAA contrast ratio standards (minimum 7:1 against dark slate-950 background).
* **Color Independence:** All data comparisons (e.g., Red vs. Green) use accompanying text badges and directional symbols so meaning is accessible without color vision.

---

## 4. YouTube Thumbnail Production Concepts

Thumbnails must project executive authority and clear intellectual value, avoiding clickbait faces or sensationalist red arrows.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        YOUTUBE THUMBNAIL CONCEPTS                      │
├────────────────────────────────────────────────────────────────────────┤
│  [VIDEO 01 THUMBNAIL]                                                  │
│  • Visual: High-contrast split of an enterprise pipeline leaking gold  │
│    coins into a $17.18M Cost of Inaction callout card.                 │
│  • Primary Bold Text: "THE $17M PIPELINE LEAK"                         │
│  • Sub-Badge: "Executive GTM Autopsy"                                  │
│  • Color Palette: Dark slate-950, deep crimson red, electric cyan.     │
│                                                                        │
│  [VIDEO 02 THUMBNAIL]                                                  │
│  • Visual: 3D exploded view of the 3-Tier Enterprise Architecture      │
│    with glowing telemetry streams connecting into a central core.      │
│  • Primary Bold Text: "BEYOND AI CHATBOTS"                             │
│  • Sub-Badge: "The Autonomous Revenue Engine"                          │
│  • Color Palette: Dark slate-950, deep indigo, bright electric blue.   │
│                                                                        │
│  [VIDEO 03 THUMBNAIL]                                                  │
│  • Visual: Executive 90-day Gantt timeline transitioning into an       │
│    illuminated CFO scorecard: "148% IRR • 5.8-Month Payback".          │
│  • Primary Bold Text: "THE 90-DAY REVENUE ROADMAP"                     │
│  • Sub-Badge: "CFO-Approved Growth Blueprint"                          │
│  • Color Palette: Dark slate-950, deep cyan, vibrant emerald green.    │
└────────────────────────────────────────────────────────────────────────┘
```

---
*(End of Asset Production Plan — Phase 4)*

