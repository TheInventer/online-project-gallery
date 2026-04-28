# Ajay Kumar Yadav — Portfolio

A personal portfolio website built with a dark, premium "Deep Infrastructure" design system inspired by distributed systems and Kubernetes topology. Built with React, TypeScript, and Vite.

## Tech Stack

- **Framework:** React 18 + TypeScript
- **Build tool:** Vite
- **Styling:** Tailwind CSS + custom design tokens
- **UI Components:** shadcn-ui
- **Animations:** Framer Motion, GSAP
- **Smooth Scroll:** Lenis
- **Fonts:** Plus Jakarta Sans, Geist Mono

## Getting Started

**Prerequisites:** Node.js 18+ and npm

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd online-project-gallery

# Install dependencies
npm install

# Start the development server
npm run dev
```

The dev server runs at `http://localhost:8080` with hot module replacement.

## Project Structure

```text
src/
├── animations/         # Shared Framer Motion variants
├── components/
│   ├── sections/       # Hero, QuantifiedImpact, TrustMarquee, etc.
│   └── ui/             # MagneticButton, FloatingNav, and other primitives
├── design-system/      # Design tokens (colors, spacing, typography)
├── hooks/              # useMousePosition, useScrollProgress, useInView
├── pages/              # Index, About, Projects, ProjectDetail, Contact
└── data/               # Project data
```

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start dev server on port 8080 |
| `npm run build` | Production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

## Design System

The site uses the **Deep Infrastructure** design language — a dark, futuristic aesthetic with the following palette:

| Token | Value | Usage |
| --- | --- | --- |
| Void | `#060A12` | Background |
| Ink | `#0D1421` | Card surfaces |
| Azure | `#0078D4` | Primary accent |
| Electric | `#00B4D8` | Highlights |
| Platinum | `#E8EAED` | Body text |
| Gold | `#F5A623` | Awards, emphasis |

## Deployment

Build the project and deploy the `dist/` folder to any static host (Vercel, Netlify, Cloudflare Pages, etc.):

```sh
npm run build
# Deploy the dist/ directory
```
