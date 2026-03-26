# Viral Pilot

## Current State
Home page is a large multi-section page with 20 tools preview, animated stats, ticker, demo hashtag tool, testimonials, before/after comparison, etc. Tools page shows all 20 tools with category filter.

## Requested Changes (Diff)

### Add
- New modern dark-theme landing page at `/` with:
  - Headline: "Grow Your Social Media Faster with AI 🚀"
  - Subtext: "Generate captions, hashtags, and viral ideas instantly"
  - Big "Try Now" CTA button linking to `/tools`
  - 3 feature cards: AI Caption Generator, Hashtag Generator, Viral Content Ideas
  - Mobile-friendly, no login required

### Modify
- `Home.tsx`: Replace entirely with clean landing page described above
- `tools.ts`: Reduce to only 3 tools: instagram-caption (AI Caption Generator), hashtag-generator (Hashtag Generator Pro), post-ideas (Viral Content Ideas)
- `Tools.tsx`: Works with 3 tools, remove category filter (only 3 tools, filter unnecessary)

### Remove
- All 17 extra tools from tools.ts
- All complex sections from Home.tsx (stats, ticker, demo tool, testimonials, before/after, pricing CTA, etc.)

## Implementation Plan
1. Rewrite `src/frontend/src/data/tools.ts` keeping only 3 tools
2. Rewrite `src/frontend/src/pages/Home.tsx` as clean landing page
3. Update `src/frontend/src/pages/Tools.tsx` to remove category filter
4. Validate build
