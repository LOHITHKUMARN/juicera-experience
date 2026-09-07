<div align="center">

# ✦ J U I C E R A ✦
### *The Future of Freshness — Bottled in 3D Motion.*

<br />

[![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue)](https://www.framer.com/motion/)
[![Vercel Deployment](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://juicera-experience.vercel.app/)

<br />

<p align="center">
  <b>A tactile, cinematic e-commerce journey engineered with Apple-grade scrollytelling.</b><br />
  Turn every scroll into a spin. Every drop into an experience.
</p>

<br />

[![Live Demo](https://img.shields.io/badge/🔗_LIVE_DEMO-juicera--experience.vercel.app-00DC82?style=for-the-badge&logo=vercel&logoColor=white)](https://juicera-experience.vercel.app/)

<br />

---

### 🌐 [Live Demo (juicera-experience.vercel.app)](https://juicera-experience.vercel.app/) • 🍾 [The 3D Scrollytelling Engine](#-the-scrollytelling-canvas-engine) • 🍓 [Flavor Vault](#-the-flavor-vault) • ⚡ [Architecture](#-architecture--tech-stack)

---

</div>

<br />

## 🔮 The Philosophy

> *"We didn't just build a drink storefront. We bottled an interactive, tactile sensory experience."*

Traditional drink websites are static grids of product photos. **Juicera** replaces static pages with a **canvas-driven frame sequence engine**, animating high-fidelity 3D glass bottles in real-time response to the user’s scroll velocity.

From hand-harvested Ratnagiri Alphonso mangoes to Ghanaian cocoa and wild forest strawberries, each bottle is rendered with real-time physical depth, dynamic light refractions, and responsive frosted glassmorphism.

---

<br />

## 🌟 Visual & Technical Highlights

```
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│   ✦ 192-FRAME 3D SCROLL ENGINE ──► 60 FPS Canvas Frame Sequencer       │
│   ✦ GLASSMORPHIC PILL NAV      ──► Dynamic blur & spring expansion     │
│   ✦ ZERO-CONCENTRATE PHILOSOPHY──► 100% Cold-Pressed real fruit        │
│   ✦ SSG PRE-RENDERED ROUTES    ──► Sub-second static page loads        │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

### 🍾 The Scrollytelling Canvas Engine
* **No Heavy 3D Models:** Instead of loading multi-megabyte glTF/Three.js models that choke mobile GPUs, Juicera deploys a lightweight **192-frame sequence canvas pipeline**.
* **Global Pre-Cache System:** Frame batches load into an in-memory `HTMLImageElement` registry with batch-level UI hydration, completely eliminating lag and white flashes during fast scrolling.
* **HiDPI Retina Scaling:** Automatically detects `window.devicePixelRatio` to render crisp edges on Retina displays without blurry pixel scaling.
* **Scroll-Linked Kinetic Typography:** Floating text overlays reveal nutrition facts, origins, and tasting notes with precision staggered spring physics.

---

<br />

## 🍓 The Flavor Vault

<table>
  <tr>
    <td width="33%" align="center">
      <h3>🥭 Cream Mango</h3>
      <p><i>"Pure Sunshine in Glass"</i></p>
      <img src="https://img.shields.io/badge/Origin-Ratnagiri,_India-FFB74D?style=flat-square" /><br />
      <img src="https://img.shields.io/badge/Pulp-100%25_Alphonso-FF8A65?style=flat-square" /><br />
      <img src="https://img.shields.io/badge/Sugar-0g_Added-success?style=flat-square" />
      <br /><br />
      <p>Hand-picked Alphonso mangoes, pressed within hours of harvest to capture unfiltered nectar.</p>
    </td>
    <td width="33%" align="center">
      <h3>🍫 Dutch Chocolate</h3>
      <p><i>"Velvety, Guilt-Free Indulgence"</i></p>
      <img src="https://img.shields.io/badge/Cocoa-Ghana_Single_Origin-8D6E63?style=flat-square" /><br />
      <img src="https://img.shields.io/badge/Base-Fresh_Almond_Milk-6D4C41?style=flat-square" /><br />
      <img src="https://img.shields.io/badge/Protein-12g_Plant-blue?style=flat-square" />
      <br /><br />
      <p>Cold-mixed single-origin Dutch cocoa with daily fresh-pressed almond milk. Zero dairy, zero cholesterol.</p>
    </td>
    <td width="33%" align="center">
      <h3>🍓 Wild Strawberry</h3>
      <p><i>"The Ruby of the Forest"</i></p>
      <img src="https://img.shields.io/badge/Berry-High_Altitude_Wild-FF5252?style=flat-square" /><br />
      <img src="https://img.shields.io/badge/Count-50+_Crushed_Berries-E53935?style=flat-square" /><br />
      <img src="https://img.shields.io/badge/Vitamin_C-Massive_Dose-orange?style=flat-square" />
      <br /><br />
      <p>Forest-picked tart sweetness, preserved with patented Berry-Lock ultra-high pressure processing.</p>
    </td>
  </tr>
</table>

---

<br />

## ⚡ Architecture & Tech Stack

```mermaid
graph TD
    A[User Scroll] -->|Framer Motion useScroll| B[Progress Vector 0.0 → 1.0]
    B -->|Current Frame Math| C[Target Frame Index #1-#192]
    C -->|Global Image Cache Check| D{Frame Cached?}
    D -->|Yes| E[Draw Image to HTML5 Canvas]
    D -->|Streaming| F[Load Batch & Draw Immediately]
    E --> G[Apple-Grade 60FPS Tactile Spin]
```

| Component | Technology | Purpose |
| :--- | :--- | :--- |
| **Core Framework** | **Next.js 16 (App Router)** | Turbo-charged file-system routing & SSG export |
| **UI Library** | **React 19** | Modern concurrent rendering and hooks |
| **Animation Core** | **Framer Motion** | Scroll interpolation, fluid spring physics & layout morphs |
| **Styles & System** | **Tailwind CSS v4** | CSS-first variables, dark-mode gradients & glass filters |
| **Iconography** | **Lucide React** | Minimalist micro-icons matching the luxury tone |
| **Typography** | **Bricolage Grotesque & Inter** | Editorial headline weight meets modern legibility |

---

<br />

## 📁 Repository Structure

```text
juicera-web/
├── app/
│   ├── [flavor]/
│   │   └── page.tsx              # Static flavor pages with generateStaticParams
│   ├── globals.css               # Tailwind CSS tokens, glows & glass variables
│   ├── layout.tsx                # Root layout, HTML metadata & Google fonts
│   └── page.tsx                  # Home showcase & interactive product switcher
├── components/
│   ├── Navbar.tsx                # Floating glassmorphic capsule with fluid spring scroll
│   ├── Footer.tsx                # Editorial dark luxury footer with newsletter
│   ├── ProductBottleScroll.tsx   # Canvas-based scrollytelling engine (192 frames)
│   ├── ProductPageClient.tsx     # Dynamic flavor state, accordions & buy modal
│   └── ProductTextOverlays.tsx   # Typography triggers synchronized with bottle rotation
├── data/
│   └── products.ts               # Flavor specs, tasting notes & ingredient origins
├── public/
│   └── images/                   # Frame sequence directories for every flavor
├── next.config.mjs               # Static export configuration (output: 'export')
└── tsconfig.json                 # Strict TypeScript configuration
```

---

<br />

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/LOHITHKUMARN/juicera-experience.git
cd juicera-experience
```

### 2. Install dependencies
```bash
npm install
```

### 3. Launch the development server
```bash
npm run dev
```

Visit [`http://localhost:3000`](http://localhost:3000) to taste the experience.

### 4. Build for Production
```bash
npm run build
```
Creates an ultra-optimized, pre-rendered static export ready for CDN distribution inside the `out/` folder.

---

<br />

## 🛰️ Deployment & Live URL

The project is continuously deployed on **Vercel** Edge Network:

* 🔗 **Live Website**: [https://juicera-experience.vercel.app/](https://juicera-experience.vercel.app/)
* **Preset**: Next.js (App Router, Static HTML Export)
* **Automatic Deployments**: Pushes to `main` automatically trigger production deployments on Vercel.

---

<br />

<div align="center">

Crafted with 🍊, 🍫, and 🍓 • Built for the next era of web design.

**[⬆ Back to Top](#-j-u-i-c-e-r-a-)**

</div>
