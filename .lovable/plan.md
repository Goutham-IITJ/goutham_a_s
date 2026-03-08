

## Plan: Add Cover Image Area + GitHub/Live Link Icons to Project Cards

### Changes to `src/pages/WorkPage.tsx`

**1. Update project data** — Add optional `image`, `github`, and `live` fields to each project object:
```ts
{
  // ...existing fields
  image: "/placeholder.svg", // placeholder for now, user can replace later
  github: "https://github.com/...", // optional
  live: "https://...", // optional
}
```
All fields optional so cards without links/images still render cleanly.

**2. Add GitHub + ExternalLink icons next to title** (line ~207):
- Import `Github, ExternalLink` from `lucide-react`
- Place small icon buttons next to the project title (inline, to the right)
- Icons only render if `github` or `live` URLs exist
- `onClick` stops propagation so clicking icons doesn't toggle the card expand
- Subtle hover glow matching the site aesthetic

**3. Add cover image area** — Restructure the description row (line ~220-223):
- Wrap description + image in a `flex` row
- Left side: description text (existing `max-w-2xl`)
- Right side: rectangular image placeholder (~160x120px) with `rounded-lg border border-border/30 bg-accent/20` styling
- Image uses `object-cover` for proper cropping
- On mobile, image stacks below description

### Layout sketch:
```text
┌─────────────────────────────────────────────────┐
│ [icon] Title  [gh] [link]          Jul 2025     │
│        Subtitle                                  │
│                                                  │
│  Description text here...    ┌──────────────┐   │
│  continues on the left       │  Cover Image │   │
│  side of the card            │  Placeholder │   │
│                              └──────────────┘   │
│  ─────────────────────────────────────────────  │
│  [tool] [tool] [tool] [tool]                    │
│  click to expand                                 │
└─────────────────────────────────────────────────┘
```

### No new dependencies needed — uses existing `lucide-react` icons and Tailwind classes.

