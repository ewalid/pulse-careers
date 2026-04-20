# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Goal

**Pulse Careers** — a sophisticated, portfolio-quality careers site built to showcase Storyblok CMS integration capabilities. The site demonstrates how to sell Storyblok-powered careers site builds to clients.

Design references live in `./claude-code-design/project/` as JSX files:
- `homepage.jsx` — home page layout
- `jd.jsx` — job description page
- `results.jsx` — job listing/search results
- `tokens.jsx` — design tokens (colors, spacing, typography)
- `primitives.jsx` — base UI components
- `brand.jsx` — brand elements
- `designsystem.jsx` — design system components
- `chrome.jsx` — nav/footer shell

## Storyblok Philosophy (Critical)

Follow Storyblok's **composable content** approach:
- Every UI section is a **reusable block** (component) in Storyblok
- **All blocks must live inside a `body` field** on the page content type — this is the Storyblok best practice for composable pages
- Blocks nest inside each other — pages are composed of blocks, blocks contain sub-blocks
- Register every new component in `src/lib/storyblok.js` component map
- Wrap every component with `storyblokEditable()` for Visual Editor support
- Use `StoryblokServerComponent` to render nested blocks

## Data Sources

**Jobs data comes from an ATS (Applicant Tracking System) API — NOT from Storyblok.**
- In this codebase, ATS data is mocked in `src/lib/ats-mock.js`
- The `job_list` Storyblok block accepts an `api_url` field (string) — in production this points to the real ATS endpoint; in dev/mock mode the code falls back to mock data
- Job content types (title, department, location, salary, description, etc.) are defined in the mock and typed in `src/lib/ats-mock.js` — they are NOT Storyblok content types
- Storyblok controls **presentation** of job data, not the job data itself

## Block Architecture

### Layout blocks (go inside `body`)
These are the composable page sections the CMS editor places on any page:

| Block name | Purpose |
|---|---|
| `hero_block` | Cinematic video hero with search bar and live stats HUD |
| `discipline_cards` | 5-column job category grid |
| `brand_marquee` | Press logos strip + key employer stats |
| `employee_stories` | Testimonials / voices carousel |
| `job_list` | Fetches and renders job cards from ATS API URL |
| `cta_banner` | Headline + CTA button section |

### Nested blocks (live inside layout blocks)
| Block name | Parent | Purpose |
|---|---|---|
| `job_card` | `job_list` | Controls which job fields to show + optional bookmark button. CMS editor configures per-instance: show_department, show_location, show_salary, show_contract_type, allow_bookmark |

### Global components (not in body)
| Component | Purpose |
|---|---|
| `global_nav` | Navigation — registered globally, not per-page |
| `footer` | Footer — registered globally |

## Build Order (page by page)

Build one page at a time. Do not build ahead. Wait for user sign-off before moving to next page.

1. **Homepage** — hero_block → discipline_cards → brand_marquee → employee_stories
2. **Job listing page** — job_list (with job_card configuration)
3. **Job description page** — full JD layout
4. Nav + Footer (done last or when needed)

## Commands

```sh
npm install
npm run dev                          # http://localhost:3000
npx next dev --experimental-https    # Required for Storyblok Visual Editor
npm run build
npm run lint
```

## Environment

`.env` at project root:
```
STORYBLOK_DELIVERY_API_TOKEN=hgOv3JjrpQOfX85eMttVQwtt
STORYBLOK_MANAGEMENT_API_TOKEN=<management_token>
STORYBLOK_API_BASE_URL=https://api.storyblok.com
STORYBLOK_REGION=eu
STORYBLOK_SPACE_ID=291969093687781
```

## Architecture

**Routing**: `src/app/[[...slug]]/page.js` — catch-all; slug maps to Storyblok story slug, root defaults to `home`.

**Component registration**: `src/lib/storyblok.js` — all Storyblok blocks must be registered here.

**Adding a block**:
1. Create React component in `src/components/`
2. Register in `src/lib/storyblok.js` `components` map
3. Create the Storyblok schema via MCP

**Key files**:
- `src/lib/storyblok.js` — SDK init + component registry
- `src/lib/ats-mock.js` — mocked ATS job data (replaces real ATS API in dev)
- `src/components/StoryblokProvider.jsx` — client wrapper for Visual Editor
- `src/app/layout.js` — root layout
- `src/app/[[...slug]]/page.js` — story fetcher + renderer

## MCP

Official Storyblok MCP at `https://mcp.labs.storyblok.com/mcp` (HTTP transport). Used to create/update component schemas and stories without touching the Storyblok UI. Space ID: `291969093687781`.

## Deployment

Netlify (`netlify.toml`) with `@netlify/plugin-nextjs`. Also has `vercel.json` for Vercel fallback.

## Progress Log

- [x] Storyblok delivery + management tokens in `.env`
- [x] Storyblok MCP server configured and connected
- [x] Storyblok MCP read/write access verified (updated home story via MCP)
- [ ] Design tokens + fonts wired up (CSS variables)
- [ ] `page` content type created in Storyblok (with `body` field)
- [ ] Homepage story + blocks
- [ ] Job listing page + `job_list` / `job_card` blocks
- [ ] Job description page
- [ ] Nav + Footer
