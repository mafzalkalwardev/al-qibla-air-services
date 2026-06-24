# Al Qibla Air Services

Premium travel agency website for **Al Qibla Air Services** — Umrah packages, group air ticketing, corporate travel, and worldwide destinations.

**Live site:** [https://mafzalkalwardev.github.io/al-qibla-air-services/](https://mafzalkalwardev.github.io/al-qibla-air-services/)

## Tech Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4 + shadcn/ui
- Framer Motion animations
- Static export for GitHub Pages

## Pages

| Page | Route |
|------|-------|
| Home | `/` |
| About Us | `/about/` |
| Services | `/services/` |
| Umrah Packages | `/umrah-packages/` |
| Tour Packages | `/tour-packages/` |
| Available Tickets | `/available-tickets/` |
| Corporate Travel | `/corporate-travel/` |
| Gallery | `/gallery/` |
| Blog | `/blog/` |
| Contact | `/contact/` |

## Run Locally

```bash
# Install dependencies
npm install

# Generate placeholder assets (if needed)
node scripts/generate-assets.js

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Build for Production

```bash
# Local production build (no base path)
npm run build

# Preview GitHub Pages build with base path
# Windows PowerShell:
$env:NEXT_PUBLIC_BASE_PATH="/al-qibla-air-services"; npm run build; npx serve out

# macOS/Linux:
NEXT_PUBLIC_BASE_PATH=/al-qibla-air-services npm run build && npx serve out
```

## Project Structure

```
src/
├── app/           # Pages and routes
├── components/    # UI, layout, home, tickets, shared
├── data/          # Mock data (swap for API later)
├── lib/           # Utils, constants, data provider
└── types/         # TypeScript interfaces
public/assets/     # Logo, flyers, gallery, airline images
```

## Data Architecture

Mock data lives in `src/data/` and is accessed through `IDataProvider` in `src/lib/data-provider.ts`. To connect a real database or API later, implement a new provider class and swap the export in `data-provider.ts`.

## Deployment

Pushes to `main` trigger GitHub Actions which builds with `NEXT_PUBLIC_BASE_PATH=/al-qibla-air-services` and deploys to GitHub Pages.

## Business Contact

- **Office:** Office No.11, Askan Center, E-11/3 Markaz, Islamabad
- **WhatsApp:** [+923315576169](https://wa.me/923315576169)

## Assets

Replace placeholder SVGs in `public/assets/` with real logo, flyer, and gallery images. Run `node scripts/generate-assets.js` to regenerate placeholders.
