# AGENTS.md

AI coding agent guidance for the Sabine Hansen Portfolio project.

## Project Overview

Artist portfolio website built with **Vite + React 18 + TypeScript**, featuring bilingual (DE/EN) support and responsive design. The site showcases contemporary paintings through an innovative layout with absolute positioning for desktop and mobile-responsive stacking for small screens.

**Stack**: React Router v6, Tailwind CSS, shadcn/ui-style components, Mapbox GL (contact page), Express server (production).

## Architecture & Design Philosophy

### Responsive Pattern: Desktop-First with Mobile Inlining
- **Desktop (>768px)**: `HomePage.tsx` uses **flow layout** with `margin-left`/`margin-top` percentages inside a `max-w-[1440px]` centred container — no absolute positioning or fixed canvas height. Other screens (contact, exhibitions, about) still use absolute positioning on a fixed-width canvas.
- **Mobile (≤768px)**: Conditional rendering **within the same component file** using `md:hidden` / `hidden md:block` class pairs (HomePage) or inline `if (isMobile)` blocks (other screens)
- Other screens implement `useState(() => window.innerWidth <= 768)` with resize listeners; HomePage uses Tailwind responsive breakpoints instead
- **No separate mobile files** — mobile variants are inlined in the same screen/component (e.g., `HomePage.tsx` contains both desktop and mobile gallery JSX)

Example from `src/screens/contact.tsx` (absolute-positioning screens):
```tsx
if (isMobile) {
  // Mobile JSX with dynamic stacking
  return <div className="bg-[#d4cdc4]">...</div>;
}
// Desktop JSX with absolute positioning
return <div className="relative w-[1440px]">...</div>;
```

Example from `src/screens/HomePage.tsx` (flow-layout screen):
```tsx
{/* Mobile — flow layout with margin offsets */}
<div className="md:hidden bg-[#d4cdc4] w-full px-2 pt-5 pb-8 overflow-hidden">
  {mobileLayout.map((item) => (
    <div style={{ width: `${item.widthPct}%`, marginLeft: `${item.marginLeftPct}%`, marginTop: `${item.marginTopRem}rem` }}>
      ...
    </div>
  ))}
</div>
{/* Desktop — flow layout, no fixed height */}
<div className="hidden md:block w-full bg-background">
  <div className="w-full max-w-[1440px] mx-auto overflow-hidden pb-16">
    {desktopLayout.map((item) => (
      <div style={{ width: `${item.widthPct}%`, marginLeft: `${item.marginLeftPct}%`, marginTop: `${item.marginTopPct}%` }}>
        ...
      </div>
    ))}
  </div>
</div>
```

### Image Asset Strategy
- **Two sizes**: `src/assets/optimized/{sm,lg}/*.webp`
- **sm/** for page thumbnails, **lg/** for lightbox/high-res previews
- Vite bundles WebP assets; use `import` statements (not `require`)
- Special handling: `viteImagemin` plugin only optimizes files matching "calendar_big" (see `vite.config.ts`)

### Language System
- Simple context: `src/lib/LanguageContext.tsx` provides `lang`, `setLang`, and `t(de, en?)` helper
- No external i18n library — inline translation strings via `t("Deutsch", "English")`
- Language toggle in header; default is German (`'de'`)

### Layout Components
- **SiteHeader** (desktop) / **SiteHeaderMobile** (mobile): Sticky navigation with dynamic top offset
  - Mobile: Hamburger menu with focus trap, closes on Esc/scroll/outside click
- **ContactSection** / **ContactSectionMobile**: Shared email + Instagram block, reused across screens
- **FooterBar** / **FooterBarMobile**: Legal links (Impressum/Datenschutz), dynamic year

## Critical Development Workflows

### Local Development
```bash
npm install          # or pnpm install
npm run dev          # Vite dev server with --host (accessible on network)
```
- Vite uses Tailwind via PostCSS (no separate build step for CSS)
- HMR works for React components; Tailwind classes update on save

- **Heroku**: `heroku-postbuild` runs `npm run build`, then `Procfile` starts `server.js`
- **Server.js features**:
  - HTTPS redirect in production (x-forwarded-proto check)
  - Aggressive asset caching: 1 year for `/assets/*`, no-cache for `index.html`
  - SPA catch-all route (`*` → `dist/index.html`)

### Environment Variables
- **Mapbox token**: `VITE_MAPBOX_TOKEN` required for contact page map
- Set locally in `.env` or Heroku config vars

## Project-Specific Conventions

### Component Patterns
- **shadcn/ui approach**: Components in `src/components/ui/` use `class-variance-authority` (cva) + Radix `Slot`
- **Utility helper**: `src/lib/utils.ts` exports `cn(...inputs)` (clsx + tailwind-merge) for conditional classes
- **Type safety**: All components have explicit JSX.Element return types

### Styling Conventions
- **Tailwind first**: Inline utility classes, avoid custom CSS
- **Theme tokens**: CSS variables defined in `tailwind.css` (`@layer base { :root { ... } }`)
- **Antonio font**: Google Fonts import in `index.html`, set as default sans in `tailwind.config.js`
- **Fixed colors**: Brand colors hardcoded (`#af8f5b` header, `#854686` hover/active, `#d4cdc4` mobile bg)

### Artwork Data Structure

**HomePage** (flow layout) separates artwork metadata from layout positioning:

```tsx
// Pure artwork data — no positioning info
type Artwork = {
  id: number;
  smallSrc: string; largeSrc: string; // WebP imports
  alt: string; title: string; year: string; dimensions: string;
  groupId?: string; // For diptychs (shared lightbox navigation)
};

// Caption position relative to its image (applied to the caption wrapper)
type CaptionPosition = {
  mt?: string;   // margin-top    — any CSS unit (%, px, rem …)
  mr?: string;   // margin-right
  mb?: string;   // margin-bottom
  ml?: string;   // margin-left
  alignSelf?: "flex-start" | "center" | "flex-end"; // vertical alignment within the flex row
};

// Desktop layout — percentages of container width (ref: 1440px)
type DesktopLayoutItem = {
  id: number;
  widthPct: number;       // image width as % of container
  marginLeftPct: number;  // horizontal offset as % of container
  marginTopPct: number;   // vertical spacing (can be negative for overlaps)
  captionSide: "left" | "right";
  captionPos?: CaptionPosition; // fine-tune caption placement per artwork
};

// Mobile layout — simpler staggered cards
type MobileLayoutItem = {
  id: number;
  widthPct: number;       // image width as % of container
  marginLeftPct: number;  // horizontal offset as %
  marginTopRem: number;   // vertical spacing in rem
  captionSide: "left" | "right";
  captionPos?: CaptionPosition; // fine-tune caption placement per artwork
};
```
- **Desktop**: Each artwork is a `flex` row (image + caption) with `margin-left`, `margin-top`, and `width` in `%`. Negative `marginTopPct` creates overlapping rows. Container height grows naturally with content — **no hardcoded height**.
- **Mobile**: Same flex-row approach, with `rem`-based vertical spacing.
- **Helper**: `const pct = (px: number) => (px / 1440) * 100` converts original pixel coords to percentages.
- **Caption positioning**: `captionSide` controls which side the caption sits on. The optional `captionPos` object fine-tunes the caption's exact placement via margin offsets (`mt`, `mr`, `mb`, `ml`) and `alignSelf` (vertical alignment within the flex row: `"flex-start"` = top, `"center"` = middle, `"flex-end"` = bottom). All values are CSS strings, so any unit works (`%`, `px`, `rem`, etc.). If `captionPos` is omitted the caption stays at its default position (top-aligned, snug against the image).

**Other screens** (exhibitions, contact, about) still use the older absolute-positioned pattern with `img: { w, top, left }` and `caption` coords.

### Mobile Dynamic Stacking
Some screens use ResizeObserver to calculate container height:
```tsx
const stackingRef = useRef<HTMLDivElement | null>(null);
const [stackHeight, setStackHeight] = useState<number>(initialGuess);
useEffect(() => {
  const update = () => {
    // Measure all descendants, find max bottom, set parent height
    const max = Math.max(...descendants.map(ch => ch.getBoundingClientRect().bottom));
    setStackHeight(Math.max(minHeight, Math.ceil(max + padding)));
  };
  const ro = new ResizeObserver(update);
  ro.observe(stackingRef.current);
  // Also update on image load, window resize
}, []);
```
This pattern appears in `contact.tsx`, `exhebitions.tsx`, and `aboutMe.tsx` mobile blocks. **`HomePage.tsx` no longer uses this** — it uses a pure flow layout with no ResizeObserver or fixed canvas height.

## Key Files & Navigation

### Entry Points
- `index.html` → loads `src/index.tsx` (React root)
- `src/index.tsx` → BrowserRouter with routes:
  - `/` → HomePage (gallery)
  - `/exhibitions` → Exhebitions
  - `/about-me` → AboutMe
  - `/contact` → Contact
  - `/updates` → Updates
  - `/updates/calendar-2026` → UpdatesCalendar2026
  - Legal pages: `/privacy-policy`, `/imprint`

### State Management
- **No Redux/Zustand** — only React Context for language
- Component-local state with useState/useRef for UI (lightbox, mobile menu, scroll position)

### Testing & Quality
- **No test suite** currently in project
- **No linting config** visible (no ESLint/Prettier files)
- Manual testing via dev server and production build

## External Dependencies & Integration

### Notable Libraries
- **React Router DOM v6**: Client-side routing (no SSR)
- **Mapbox GL v3** + react-map-gl: Contact page location map (requires token)
- **Radix UI**: Only `@radix-ui/react-slot` (used in Button component)
- **Lucide React**: Icon library (Instagram SVG is custom, not from Lucide)
- **Sharp**: Server-side image processing (used in optimize-images script, not in runtime)

### Build Tools
- **Vite 6**: Fast dev server, optimized production builds
- **vite-plugin-imagemin**: Conditional optimization (currently only "calendar_big" files)
- **@squoosh/cli**: Dev dependency for image optimization scripts

## Common Pitfalls & Gotchas

1. **Mobile detection timing**: Initialize `isMobile` state with `() => window.innerWidth <= 768` to avoid hydration mismatches
2. **Absolute positioning** (non-HomePage screens): Desktop artwork coords are hand-tuned; changing canvas width (1440px) breaks layout. HomePage uses flow layout with percentage-based margins instead.
3. **WebP imports**: Must use `import` or `new URL(..., import.meta.url).href`, not dynamic `require()`
4. **Lightbox diptychs**: Artworks with same `groupId` share prev/next navigation (see HomePage lightbox logic)
5. **Header offset**: Desktop header has dynamic `top` style based on scroll position (41px at top, 0px when scrolled)
6. **Mobile stacking height** (non-HomePage screens): Initial guess must be reasonable to avoid layout shift; ResizeObserver adjusts after render. HomePage mobile uses natural flow layout and needs no height guessing.
7. **HTTPS redirect**: Server.js forces HTTPS in production via `x-forwarded-proto` header (Heroku-specific)

## Adding New Content

### New Artwork to Gallery (HomePage)
1. Add WebP files to `src/assets/optimized/{sm,lg}/`
2. Import both sizes in `HomePage.tsx`
3. Add entry to `artworks` array (id, sources, title, year, dimensions — no positioning)
4. Add a `DesktopLayoutItem` entry to `desktopLayout` with `widthPct`, `marginLeftPct`, `marginTopPct` (use `pct(pixels)` helper), `captionSide`, and optionally `captionPos` to fine-tune caption placement
5. Add a `MobileLayoutItem` entry to `mobileLayout` with `widthPct`, `marginLeftPct`, `marginTopRem`, `captionSide`, and optionally `captionPos`
6. No canvas height adjustment needed — the page grows naturally with content

### New Exhibition
1. Update `exhebitions.tsx` exhibitions array
2. Add image to optimized assets
3. Desktop: Set absolute coords in `img` object
4. Mobile: Update `exhibitions` array with appropriate `imageClasses`/`textClasses`

### New Route/Page
1. Create screen component in `src/screens/`
2. Add `<Route path="..." element={<Component />} />` in `src/index.tsx`
3. Add navigation link to `SiteHeader.tsx` and `SiteHeaderMobile.tsx` if needed
4. Follow responsive pattern: inline mobile variant with `if (isMobile)` conditional

---

**Last Updated**: 2026-02-28  
**For more context**: See `summary.md` (project exploration).

