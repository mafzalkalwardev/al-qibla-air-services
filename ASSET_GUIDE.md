# Asset Guide — Al Qibla Air Services

## Folder structure

```
public/assets/
├── logo/           # Brand logo (logo.svg, logo.png)
├── flyers/         # Promotional posters
├── gallery/        # General gallery SVGs (current placeholders)
├── airlines/       # Airline logos by IATA code
├── destinations/   # Destination card images (add JPGs)
├── packages/       # Umrah & tour package images
├── blog/           # Blog cover images
├── heroes/         # Page hero backgrounds
├── videos/         # Hero / background videos
└── readme/         # README screenshots
```

## Using assets in code

- Use `assetPath()` from `@/lib/base-path` for paths (supports optional `NEXT_PUBLIC_BASE_PATH`).
- Use `next/image` with `unoptimized` for static SVGs or when deploying without image optimizer.
- Map destinations/packages in `src/data/*` or Supabase admin.

## Existing assets

- Logo: `public/assets/logo/logo.svg`
- Flyers: `public/assets/flyers/flyer-1.svg` … `flyer-4.svg`
- Gallery placeholders: `public/assets/gallery/*`
- Airline SVG badges: `public/assets/airlines/*.svg`

## Adding new images

1. Place file in the correct folder.
2. Update data record (`image` or `image_url` field).
3. Remove entry from `MISSING_ASSETS.md` when added.

## Supabase storage

When using Supabase, upload via admin (future) or dashboard and store public URL in database `image_url` fields.

Buckets: `flyers`, `gallery`, `packages`, `blog`, `airlines`, `heroes`, `reviews`.

## Performance

- Prefer WebP/JPEG under 300KB for cards.
- Hero video: H.264 MP4, under 5MB, 1920×1080 max.
- Use poster image for video fallback on mobile.
