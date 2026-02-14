# Responsive Plan for Screen Pages

## Summary of what you want
- Make all pages in `src/screens/` responsive for both mobile and desktop.
- Preserve the **same layout/visual composition** across viewports (no separate mobile layout).
- Replace fixed pixel positioning with responsive scaling so the design looks identical but adapts to screen size.
- Deliver a clear implementation plan and create this document.

---

## Current State (high level)
- Several screens use **absolute positioning** on a fixed `1440px` canvas.
- Many screens have **separate mobile markup** with hard-coded sizes (`390px` layout) and ResizeObserver stacking.
- This causes **non-uniform responsive behavior** and layout divergence between mobile and desktop.

---

## Goal
Create a **single, unified layout per screen** that:
- Maintains the original desktop composition.
- Scales proportionally down to mobile without rearranging elements.
- Uses a shared, consistent responsive strategy across all screens.

---

## Strategy Overview
### 1. Use a scalable canvas wrapper
- Keep the original `1440px` design coordinates.
- Wrap all page content inside a container that scales down based on viewport width:
  - `scale = min(1, viewportWidth / 1440)`
- Apply CSS transform to scale all positioned elements uniformly.

### 2. Remove duplicate mobile markup
- Collapse `if (isMobile)` blocks into a **single render path**.
- Maintain the desktop layout but scaled for mobile.

### 3. Keep absolute layout coordinates
- Preserve existing `top`, `left`, `width`, `height`.
- Put all positioned elements inside a scalable parent.

### 4. Scale text and clickable areas
- Use the same scale so typography and hit targets keep proportion.
- Ensure minimum tap sizes with an optional CSS clamp if needed.

---

## Proposed Implementation (Per Screen)

### A. Shared Utility (new helper)
Create a `useScale()` hook or utility:
- Inputs: `baseWidth = 1440`
- Outputs: `{ scale, scaledHeight }`
- Example logic:
  - `scale = Math.min(1, window.innerWidth / baseWidth)`
  - `scaledHeight = baseHeight * scale`

### B. Shared Canvas Wrapper Component
Create a `ResponsiveCanvas` component:
- Props: `baseWidth`, `baseHeight`, `children`
- Styles:
  - Outer wrapper: `width: 100%`, `display: flex`, `justify-content: center`
  - Inner canvas: `width: baseWidth`, `height: baseHeight`, `transform: scale(...)`, `transform-origin: top center`

### C. Update Each Screen
For each screen in `src/screens/`:
1. Identify the **desktop canvas size** (current fixed height).
2. Replace the root container with `ResponsiveCanvas`.
3. Remove mobile-only layout logic.
4. Ensure absolute elements remain under the canvas.
5. Keep Tailwind classes for typography but allow scaling.

---

## File-by-File Checklist

### `HomePage.tsx`
- Remove mobile gallery block.
- Wrap all absolute images + captions + contact in `ResponsiveCanvas`.
- Use original canvas height (`~7700px`).

### `aboutMe.tsx`
- Remove mobile variant and stacking logic.
- Wrap desktop layout in `ResponsiveCanvas`.

### `contact.tsx`
- Remove mobile layout.
- Wrap desktop layout in `ResponsiveCanvas`.

### `exhebitions.tsx`
- Remove mobile block and ResizeObserver.
- Wrap in `ResponsiveCanvas`.

### `updates.tsx`
- Remove mobile block.
- Wrap desktop layout in `ResponsiveCanvas`.

### `calendar-2026.tsx`
- Remove mobile block.
- Wrap desktop layout in `ResponsiveCanvas`.
- Ensure map scales inside the canvas or stays max-width 100%.

### `imprint.tsx` / `privacy-policy.tsx`
- Already responsive. No absolute layout.
- Optional: leave as-is.

---

## Layout Scaling Rules
- **Max width stays at 1440px.**
- Scale down only (never scale up).
- All absolute positions stay unchanged.
- Text scales with the entire canvas.
- Images maintain original sizes inside the scaled canvas.

---

## Risks & Mitigations
- **Text too small on tiny screens:** optional `min-scale` or `clamp` on font-size.
- **Tap targets too small:** add `min-height`/`min-width` on buttons if needed.
- **Mapbox sizing:** ensure container uses scaled height, or make map full-width with a fixed aspect ratio inside the scaled wrapper.

---

## Deliverables
1. New `ResponsiveCanvas` component + `useScale`.
2. Refactored screen pages with single layout path.
3. This `responsive-plan.md` file.

---

## Next Step
After approval, implement:
- Shared responsive wrapper
- Remove mobile branching
- Validate all screens on mobile and desktop