# 🌐 Cloud Nova Solutions Landing Page

### A Premium, Interactive 3D Web Agency Showcase & Digital Infrastructure Platform

Welcome to the repository for **Cloud Nova Solutions**, a high-end digital agency landing page. This application combines state-of-the-art web performance with rich, immersive 3D graphics and micro-animations, designed to showcase visual excellence and professional engineering.

---

## ✨ Features & Highlights

*   **Interactive 3D Model Viewer:** Powered by **Three.js** and **React Three Fiber (R3F)**. Renders a custom 3D model (`Thor.glb`) with custom lighting, camera controls, dynamic scaling, and pre-loading animations.
*   **High-End Micro-Animations:** Fluid, scroll-triggered animations and layout entries using a combination of **GSAP (GreenSock)** and **Framer Motion**.
*   **Bespoke UI Components:** Custom modular CSS components designed from scratch using **Tailwind CSS v4** and CSS Modules for maximum performance and design flexibility.
*   **Performance Optimization:** Includes custom loading screens (`IntroPreloader`) and image optimizations using Next.js utilities.
*   **Functional Contact Infrastructure:** Secure email dispatch utilizing **Nodemailer** for customer intake and partnerships.

---

## 🛠️ Technology Stack

*   **Framework:** [Next.js](https://nextjs.org/) (App Router, React 19, Next.js 16)
*   **Graphics & 3D:** Three.js, `@react-three/fiber`, `@react-three/drei`
*   **Animations:** GSAP (GreenSock), Framer Motion
*   **Styling:** Tailwind CSS v4, PostCSS, CSS Modules
*   **Icons:** Lucide React, React Icons
*   **Backend & Forms:** Node.js, Nodemailer

---

## 📁 Project Structure

```text
src/
├── app/                  # Next.js App Router (Layouts, Pages, Styles)
├── components/           # React Components
│   ├── ui/               # Core design elements
│   ├── ModelViewer.jsx   # Three.js 3D model viewport
│   ├── ThorModel.jsx     # R3F-wrapped GLTF/GLB loader
│   ├── FounderSection    # Agency identity & mission values
│   ├── ProcessTimeline   # Scroll-based workflow visualization
│   └── ...               # Additional interactive landing blocks
├── lib/                  # Helper utilities and shared classes
public/
├── models/               # 3D assets (e.g., Thor.glb)
└── images/               # Optimized image assets & headshots
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18.x or later recommended)
- `npm`, `pnpm`, or `yarn`

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/bhupeshjamwal007/Cloud-Nova-Solutions.git
   cd Cloud-Nova-Solutions
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

3. Configure environment variables. Create a `.env.local` file in the root directory:
   ```env
   # Email service configurations (e.g., for contact form)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   pnpm dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to view the application.

---

## ⚡ Build & Production

To build the project for production, run:
```bash
npm run build
```
This runs type-checking, compiles the Next.js production build, and generates static assets. To preview the production build locally:
```bash
npm run start
```
