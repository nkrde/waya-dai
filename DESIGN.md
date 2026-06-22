# 🫧 Liquid Glass (Refractive Specular) Design System
### Architectural Specification & Mathematical Data Laws for WayaX AI Advisory
**SEBI Research Analyst Registration No:** `INH00010876`

---

## 🏛️ 1. PHILOSOPHICAL FOUNDATIONS: THE REFRACTIVE GLASS MEDIUM

The WayaX design language is built upon the **Philosophy of Refractive Specularity**. 

In high-stakes financial technology—especially under strict compliance frameworks like SEBI—trust is not merely a legal requirement; it is a visual and tactile commodity. Standard flat UI systems fail because they feel distant and synthetic. The **Liquid Glass** system addresses this by simulating a physical, organic lens resting over dense market datasets. 

By leveraging light physics (sub-surface scattering, chromatic aberration, specular reflections, and backdrop caustics), the interface establishes a tangible layer of **tactile reassurance**. The user feels as though they are interacting with a solid, mathematical instrument that frames, protects, and isolates highly audited data.

```
                  =========================================== Specular Highlight Line (White 18%)
                  [                  WAYAX                  ]
                  =========================================== Upper Chamfer Edge (White 9%)
                  |                                         |
                  |          Backdrop Saturate 185%         | <--- Sub-surface Scattering Layer
                  |          Backdrop Blur 32px             |
                  |                                         |
                  +-----------------------------------------+ Specular Shadow Line (Black 40%)
                    \_____________________________________/   <--- High-blur Ambient Drop Shadow
```

### The Three Pillars of Trust
1.  **Visceral Depth & Isolation**: Glass panels separate secondary conversational content from primary advisory insights, mimicking physical lenses.
2.  **Kinetic Luxury**: Micro-interactions, vertical translate shifts, and diagonal shimmers make the interface feel responsive and alive.
3.  **Auditable Scannability**: Numeric parameters are given dedicated monospaced channels and high-contrast color codes to eliminate visual stress and cognitive errors.

---

## 🎨 2. THE BRAND IDENTITY & BRAND PERSONALITY

*   **Product Name**: WayaX AI Investment Advisory
*   **Target Audience**: High-frequency option traders, long-term equity builders, and institutional wealth managers.
*   **Brand Personality**: Professional, SEBI-compliant, highly auditable, deeply analytical, and aesthetically premium.

---

## 🌌 3. THE KINETIC BACKDROP: MOTION & CAUSTICS

To prevent dark mode interfaces from feeling "static" or "dead," the canvas employs moving caustics, polar rotating gradients, and dotted grids to simulate a living fluid medium.

### A. Core Keyframes (CSS Implementation)
```css
/* Fluid background gradient shift */
@keyframes flowGradient {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Polar rotating gradients simulating shifting backlights */
@keyframes spinGradient {
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to   { transform: translate(-50%, -50%) rotate(360deg); }
}

/* Tactile scaling depth glow */
@keyframes softGlow {
  0%, 100% { transform: scale(0.99); opacity: 0.15; filter: blur(5px); }
  50%      { transform: scale(1.005); opacity: 0.35; filter: blur(7px); }
}

/* Organic shifting glass caustics mimicking underwater refraction */
@keyframes causticRayRight {
  0%   { transform: translateY(-3%) rotate(-14deg) scaleX(1); opacity: 0.22; }
  50%  { transform: translateY(3%) rotate(-9deg) scaleX(1.2); opacity: 0.42; }
  100% { transform: translateY(-3%) rotate(-14deg) scaleX(1); opacity: 0.22; }
}

@keyframes causticRayLeft {
  0%   { transform: translateY(4%) rotate(12deg) scaleX(1.15); opacity: 0.26; }
  50%  { transform: translateY(-3%) rotate(16deg) scaleX(0.85); opacity: 0.52; }
  100% { transform: translateY(4%) rotate(12deg) scaleX(1.15); opacity: 0.26; }
}

/* Breathing focus outlines for active state indicators */
@keyframes outlineBreathing {
  0%, 100% { opacity: 0.35; filter: blur(2px); }
  50%      { opacity: 0.8; filter: blur(4px); }
}
```

### B. Dotted Grounding Grids
An invisible, mathematical sub-structure anchors all floating elements:
*   **Dark Mode Dotted Grid**:
    ```css
    .bg-dotted-grid {
      background-image: radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px);
      background-size: 12px 12px;
    }
    ```
*   **Light Mode Dotted Grid**:
    ```css
    .bg-dotted-grid-light {
      background-image: radial-gradient(rgba(0, 0, 0, 0.08) 1px, transparent 1px);
      background-size: 12px 12px;
    }
    ```

---

## 🧪 4. DESIGN TOKENS

### A. Sub-Pixel Color System
The color system maps modern, high-contrast HSL values to specific system priorities. The primary brand refraction uses a highly polished **2-stop gradient** (Teal-to-Blue); **Salted Camel has been fully deprecated** from all brand tokens.

```
       [#77F2E4] Teal Momentum (0%) --------------------------> [#6BB6F3] Sky Blue Flow (100%)
```

*   **Primary Brand Gradient stops**:
    *   `Teal Momentum`: `#77F2E4` (Active brand refraction, left stop)
    *   `Sky Blue Flow`: `#6BB6F3` (Active brand refraction, right stop)
    *   *Linear Gradient configuration*: `linear-gradient(90deg, #77F2E4 0%, #6BB6F3 100%)`
*   **Active Accent Color**:
    *   `Active Indigo`: `#6366F1` (System focus borders, active drawers, and approved badges)
*   **Contextual Data Accent Laws**:
    *   `Success Emerald`: `#10B981` (BUY call containers, Upside metrics, Target prices)
    *   `Protective Rose`: `#EF4444` (SHORT call containers, Stop Loss warnings, Leverage metrics)
*   **Base Neutral Palette**:
    *   `Canvas Background`: `#000000` (Perfect pitch black backdrop)
    *   `Glass Card Backing`: `#0D0E12` (Container backing baseline)
    *   `Muted Text Gray`: `#94A3B8` / `#cbd5e1` (Conversational bubbles and metadata descriptions)
    *   `High Contrast White`: `#FFFFFF` (Headers, active titles)

### B. Typography Scales
We prioritize geometric displays for UI headers and monospaced scannability for financial data grids:

| Typography Role | Font Family | Size (Px) | CSS Tailwind Class | Context / Application |
| :--- | :--- | :--- | :--- | :--- |
| **Welcome Heading** | `Sora` (sans-serif) | 28px | `text-[28px] font-extrabold` | Primary dashboard landing header |
| **Dropdown Titles** | `Sora` (sans-serif) | 20px | `text-[20px] font-extrabold` | Overlay category menus |
| **Welcome Heading Mobile**| `Sora` (sans-serif) | 17px | `text-[17px] font-extrabold` | Condensed mobile viewports |
| **Advisory Body Text** | `Inter` (sans-serif) | 13px | `text-[13px] font-medium` | conversational advisory answers |
| **Secondary Descriptions** | `Inter` (sans-serif) | 12px | `text-[12px] font-normal` | Help blocks, secondary tags |
| **Mobile Welcome Caption**| `Inter` (sans-serif) | 10.5px | `text-[10.5px] font-medium` | Mobile onboarding and search captions |
| **Grid Headers / Tickers** | `JetBrains Mono` | 10px | `text-[10px] font-extrabold` | Tickers, stock abbreviations, table labels |
| **Grid Ratios / Numbers** | `JetBrains Mono` | 12.5px| `text-[12.5px] font-bold` | Numerical stock table metrics |

### C. Spacing System (8px Grid System)
We maintain a strict 8px base grid system with 4px increments for micro-paddings:
*   `px-1.5` (6px): Monospace symbol abbreviations padding.
*   `p-3.5` (14px): Mobile micro-grids, scrollbar tracks.
*   `p-4.5` (18px): Standard mobile card paddings, table vertical cell margins.
*   `px-5` (20px): Desktop table row horizontal paddings.
*   `p-6` (24px): Spacious desktop container paddings.

### D. Shadow & Elevation Specs
*   **Frosted Glass Panel Drop Shadow**:
    `box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.12), inset 0 -1px 2px 0 rgba(0, 0, 0, 0.4), 0 16px 48px -12px rgba(0, 0, 0, 0.65), 0 2px 8px 0 rgba(0, 0, 0, 0.15);`
    *This creates a sub-pixel chamfer border line at the top, a deep black shadow inside the lower border, and high-blur drop shadows to separate cards from the dotted canvas.*

---

## 🏛️ 5. EXACT BRAND LOGO CONTAINER ANATOMY

The WayaX logo is built using a **2-layered frosted glass sandwich** that reproduces sub-surface light scattering and physical chamfered specularity:

```
    Layer 2: [ Emblem ] -------------> https://reduced-beige-7hamqau4r6.edgeone.app/a.png (z-10)
    Layer 1: [ Glass Shield ] --------> Rounded-2xl, specular top border, backdrop blur (z-5)
```

1.  **Frosted Glass Shield (Mid-Ground Panel)**: A highly-dense frosted container (`rounded-2xl`, `border border-white/20`, `bg-white/10` in dark mode) featuring `backdrop-blur-2xl` saturation and a noise-turbulence mask (`feTurbulence` fractalNoise baseFrequency="2 2") to simulate realistic glass surface grain.
2.  **Active Golden Emblem (Fore-Ground Asset)**: The central brand image asset loaded from `"https://reduced-beige-7hamqau4r6.edgeone.app/a.png"` (`w-9 h-9 md:w-[60px] md:h-[60px] object-contain brightness-110 active:scale-95 transition-transform relative z-10`).

---

## ⚙️ 6. COMPONENTS & ANATOMY MATRIX

### A. Frosted Glass Panel Container (`.liquid-glass-panel`)
The core container panel designed to mimic a thick, polished block of glass:
```css
.liquid-glass-panel {
  background: 
    url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.018'/%3E%3C/svg%3E"),
    linear-gradient(135deg, rgba(255, 255, 255, 0.035) 0%, rgba(255, 255, 255, 0.01) 100%);
  backdrop-filter: blur(32px) saturate(185%);
  -webkit-backdrop-filter: blur(32px) saturate(185%);
  border: 1px solid rgba(255, 255, 255, 0.09);
  box-shadow: 
    inset 0 1px 0 0 rgba(255, 255, 255, 0.12),
    inset 0 -1px 2px 0 rgba(0, 0, 0, 0.4),
    0 16px 48px -12px rgba(0, 0, 0, 0.65),
    0 2px 8px 0 rgba(0, 0, 0, 0.15);
}
```

### B. Interactive Buttons State Matrix
Buttons are mapped to strict interactive behaviors (hover translates, diagonal shimmers, active scale downs):

#### 1. Primary Action Button
*   **Anatomy**: Full-fill background, high-contrast display text, Sora Display, `rounded-2xl` corners.
*   **States**:
    *   *Default*: `bg-indigo-600 border border-indigo-500 text-white font-sans font-bold shadow-[0_4px_12px_rgba(99,102,241,0.2)]`
    *   *Hover*: `bg-indigo-500 transform translateY(-1.5px) shadow-[0_4px_20px_rgba(99,102,241,0.35)]`
    *   *Active*: `scale-95 bg-indigo-750 transition-all duration-150`
    *   *Disabled*: `opacity-50 cursor-not-allowed bg-slate-800 border-none`

#### 2. Secondary Liquid Glass Button (`.liquid-glass-button`)
*   **Anatomy**: Frosted glass backing, custom top specular border, backdrop saturator.
*   **States**:
    *   *Default*: `bg-white/[0.05] backdrop-blur-md border border-white/10 text-slate-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]`
    *   *Hover*: `bg-white/[0.08] border-white/20 transform translateY(-1.5px)` — Triggers diagonal shimmer sweeper (`.liquid-shimmer`).
    *   *Active*: `scale-[0.98] bg-white/[0.12]`
    *   *Disabled*: `opacity-40 cursor-not-allowed`

#### 3. Tertiary Capsule Button
*   **Anatomy**: Rounded-full pill shape, low visual footprint.
*   **States**:
    *   *Default*: `bg-white/[0.02] border border-white/5 text-slate-400 font-mono text-[9.5px]`
    *   *Hover*: `bg-white/[0.08] text-white`
    *   *Active*: `bg-white/[0.15]`

---

### C. Recessed Search Input Well (`.liquid-glass-input`)
Designed as a hollow indentation carved directly into the dashboard surface:
*   **States**:
    *   *Default*: `bg-black/25 border border-white/7 shadow-[inset_0_2px_4px_rgba(0,0,0,0.35)] rounded-2xl`
    *   *Focus*: `border-white/20 bg-black/35 shadow-[inset_0_2px_8px_rgba(0,0,0,0.5),0_0_24px_rgba(255,255,255,0.06)]` (Releases a subtle white outline breathing glow)
    *   *Error*: `border-rose-500/50 bg-rose-950/5`
    *   *Success*: `border-emerald-500/50 bg-emerald-950/5`

---

## 📈 7. CHAT BOX STOCK TABLE RENDERING LAWS

When WayaX returns stock recommendations inside a chat message bubble, they must be formatted within a highly structure, responsive grid. Standard tables fail here because changing rows cause visual layout jumps. WayaX enforces strict pixel metrics:

### Rule 3.1.1: The Frosted container
All tables must compile inside a scrollable responsive wrap styled exactly with the `.liquid-glass-panel` layout rules, ensuring perfect visual isolation.

### Rule 3.1.2: Fixed Column Width Grid
To eliminate visual shifting during row expansion, column property metrics are strictly defined:
*   **Index (`w-14` / `text-center`)**: Center-aligned, monospaced row index padded with leading zeros (e.g. `01`, `02`).
*   **Company Name / Symbol (`min-w-[220px]`)**: Company title at `13.5px` weight over a monospaced ticker badge in a `bg-white/5` tag.
*   **Call Action (`w-32` / `text-center`)**: Houses the status call badge.
*   **Trigger Entry Zone**: Center-aligned blue JetBrains Mono font (`text-[#6bb6f3]`).
*   **Target Price / Protective SL / Target Upside**: Center-aligned, monospaced figures.
*   **Details Toggle**: Houses the "Analyze" toggle button.

### Rule 3.1.3: Table Header Styles
*   **Dark Mode**: `bg-white/[0.025] border-white/10 text-indigo-200/80` uppercase tracked 10px Sora headings.
*   **Light Mode**: `bg-slate-50 border-slate-200 text-slate-500`.

### Rule 3.1.4: Cell Spacing & Hover States
*   **Row Paddings**: Vertical cell padding `py-4.5` (18px) and horizontal padding `px-5` (20px).
*   **Transition Duration**: Row hover transition duration is `300ms`.
    *   *Dark Mode Row Hover*: `hover:bg-white/[0.035]` (If expanded, background locks to `bg-white/[0.015]`).
    *   *Light Mode Row Hover*: `hover:bg-slate-50` (If expanded, background locks to `bg-indigo-50/15`).

### Rule 3.1.5: Expandable Analytical Accordion
Clicking "Analyze" expands an inner-row spanning all 9 columns, divided into:
*   **Technical Matrix Column**: Houses the RDX Confidence Score (out of 5), RSI Weekly, ADX Weekly, EMA Ribbon convergence, and trailing returns (1M, 3M, 1Y).
*   **Fundamental Shield Column**: Houses PE, PB, ROE %, ROCE %, Debt/Equity, FII holdings, and 3Y profit CAGR.
*   **Investment Thesis Column**: Houses the italicized analyst thesis statement and signed advisory seal.

### Rule 3.1.6: Mobile Card Transformation Layout (<768px)
On mobile devices, the table shifts instantly from a wide table grid into a clean stacked list of rounded-2xl floating card panels (`rounded-2xl`, `p-4.5`). In this state, company metadata is formatted as a double-column sub-grid to maximize touch-target efficiency and prevent narrow truncation.

---

## 🟢🔴 8. MATHEMATICAL DATA STYLING LAWS

To guide investor focus under intense visual workloads, numerical values inside the table are governed by strict color-coding logic:

```
        🟢 EMERALD SUCCESS (#10B981)              🔴 PROTECTIVE ROSE (#EF4444)
   +------------------------------------+    +------------------------------------+
   | BUY status call pulsing badges     |    | SHORT status call pulsing badges   |
   | Target Price monospace figures     |    | Stop Loss (SL) monospace warnings  |
   | Target Upside indicators (TrendUp) |    | Leverage alert metrics (D/E > 1.5) |
   | Positive ROE, ROCE & CAGR returns  |    | Negative returns & high volatility |
   +------------------------------------+    +------------------------------------+
```

### A. The Emerald Green Law (Action & Upside)
Green is reserved exclusively for wealth creation indicators, upside potential, buy signals, and strong financial health ratios:
1.  **BUY Call Badges**: Rendered in a semi-translucent green badge (`bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_12px_rgba(16,185,129,0.08)]`) with an active green pulsing status indicator dot (`bg-emerald-500 animate-pulse`).
2.  **Target Upside Indicators**: Grouped in an green capsule containing a `TrendingUp` icon and bold green monospace text (e.g., `30%`).
3.  **Target Prices**: Styled in bold monospace `text-emerald-500` indicating upside potential.
4.  **Financial Health Ratios**: Positive trailing returns (1M, 3M, 1Y), Return on Equity (ROE %), Return on Capital (ROCE %), and 3Y profit CAGR are colored green (`text-emerald-400`).

### B. The Rose Red Law (Protection & Risk Warnings)
Red is reserved exclusively for risk mitigation, stop-loss protection thresholds, short selling calls, and debt warning metrics:
1.  **SHORT Call Badges**: Rendered in a semi-translucent red badge (`bg-rose-500/10 text-rose-400 border border-rose-500/20 shadow-[0_0_12px_rgba(239,68,68,0.08)]`) with an active red pulsing status indicator dot (`bg-rose-500 animate-pulse`).
2.  **Protective Stop Loss (SL) values**: Styled in bold monospace `text-rose-400` representing critical risk protection parameters.
3.  **Leverage Warning Limits**: Debt-to-Equity is highlighted red (`text-rose-400`) if it exceeds critical thresholds (`Debt/Equity > 1.50`).
4.  **Volatility / Negative periods**: High trailing volatility index (30D) or negative return periods are coded red to isolate volatility risk.

---

## 🚀 9. FIGMA & CODE SYNCHRONIZATION CHANNELS

To ensure design-code parity, this system maintains direct channels between visual assets and code variables:

### A. Vector Board Porting
*   **Source File**: [WayaX_Design_System.svg](file:///C:/Users/lcppd/.gemini/antigravity/scratch/WayaX/WayaX_Design_System.svg)
*   **Figma Conversion**: Simply drag and drop the SVG file directly into your Figma workspace. Every specular shadow filter, gradient stop, dot grid, text scale, and layout boundary instantly converts to native, fully editable Figma layers and frames!

### B. Live Code Handshake
All tokens and classes defined in this specification are directly mapped to active properties inside your components:
*   Global classes (such as `.liquid-glass-panel` and background caustics) are defined inside [index.css](file:///C:/Users/lcppd/.gemini/antigravity/scratch/WayaX/src/index.css).
*   Active rendering parameters, colors, and layout ratios are structured in [App.tsx](file:///C:/Users/lcppd/.gemini/antigravity/scratch/WayaX/src/App.tsx) and [StockTable.tsx](file:///C:/Users/lcppd/.gemini/antigravity/scratch/WayaX/src/components/StockTable.tsx), keeping code and design perfectly in sync.
