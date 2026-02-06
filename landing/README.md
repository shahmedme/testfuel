# Testfuel Landing

Next.js marketing and landing site for **Testfuel** — the open source test case management system. Used for the public website (features, pricing, testimonials, etc.).

## Tech stack

- **Next.js** (v9.x)
- **React** + **SASS**
- **Framer Motion** — animations
- **Theme UI** — theming
- **next-sitemap** — sitemap generation after build

## Prerequisites

- Node.js v16+

## Setup

```bash
npm install
```

## Scripts

| Command        | Description                    |
|----------------|--------------------------------|
| `npm run dev`  | Start dev server (port 3001)   |
| `npm run build`| Production build               |
| `npm run serve`| Start production server        |
| `npm run export` | Static export (if configured) |
| `npm run postbuild` | Runs next-sitemap after build |

## Development

```bash
npm run dev
```

Opens at [http://localhost:3001](http://localhost:3001).

## Project structure (high level)

- `src/pages/` — Next.js pages (`_app`, `_document`, `index`)
- `src/sections/` — Page sections (banner, services, pricing, testimonials, FAQ, etc.)
- `src/components/` — Header, footer, cards, accordion, layout
- `src/contexts/` — App and drawer state
- `src/theme/` — Theme configuration
- `src/assets/` — Styles, images, icons
- `public/` — Static assets, favicon, robots.txt

## License

Part of the Testfuel project. See root [README](../README.md).
