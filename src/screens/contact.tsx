import { ContactSection } from "../components/ContactSection";
import kontaktImgSm from "../assets/optimized/sm/Kontakt.webp";
import kontaktImgLg from "../assets/optimized/lg/Kontakt.webp";
import ContactSectionMobile from "../components/ContactSectionMobile";

/*
  Responsive strategy
  ───────────────────
  Desktop (≥ 768 px)
    The original design used a fixed 1440 × 1458 px canvas with
    absolutely-positioned children.  We keep the exact same composition
    but express every coordinate as a percentage of that reference canvas
    so the layout scales proportionally to any viewport width.

      horizontal % = original_px / 1440 × 100
      vertical   % = original_px / 1458 × 100

    The container maintains the 1440 ∶ 1458 aspect ratio through the
    padding-top trick  (padding-top is always relative to the element's
    OWN WIDTH, so `padding-top: 101.25%` makes height = 101.25 % of width).

  Mobile (< 768 px)
    The original mobile design used a fixed 390 px wide container.
    We replace it with a fully fluid flex-row layout where widths are
    expressed as percentages of the available space so the same visual
    composition (text left, image right) works on any phone width.
    The image keeps the original 186 ∶ 353 aspect ratio via Tailwind's
    `aspect-[186/353]` utility so height scales automatically.

  No JavaScript is needed to switch between the two layouts — `md:hidden`
  and `hidden md:block` do the job in CSS.  This also eliminates the
  Rules-of-Hooks violation that existed when hooks were called inside
  the `if (isMobile)` branch.
*/

// ─── Design-reference constants ──────────────────────────────────────────────
const W = 1440; // canvas width  (px)
const H = 1458; // canvas height (px)

// Shorthand helpers that turn original pixel coords into % strings
const lp = (px: number) => `${(px / W) * 100}%`; // left / width  → % of canvas W
const tp = (px: number) => `${(px / H) * 100}%`; // top  / height → % of canvas H

export function Contact(): JSX.Element {
  return (
    <>
      {/* ════════════════════════════════════════════════════════════════════
          MOBILE LAYOUT  —  shown below 768 px, hidden above
          ════════════════════════════════════════════════════════════════════ */}
      <div className="md:hidden bg-[#d4cdc4] min-h-screen flex flex-col items-center pt-5">
        {/* Push content below the fixed mobile header (~64 px tall) */}
        <div className="h-16 w-full flex-shrink-0" />

        {/* ── Main content row ─────────────────────────────────────────── */}
        <div className="w-full px-3">
          <div className="flex flex-row gap-[2%] items-start">
            {/*
              Text column
              Original width: 167 px inside ~366 px content area (390 - 24 px padding)
              167 / 366 ≈ 45.6 % → use 45 % to leave breathing room
            */}
            <div className="mt-20 w-[45%] flex-shrink-0 [font-family:'Antonio',Helvetica] font-normal text-black text-base text-center tracking-[-0.05px] leading-6">
              Bei Interesse an meinen Bildern freue ich mich über eine E-Mail:
            </div>
            <ContactSectionMobile
              className="absolute mt-0 w-full"
              style={{
                top: tp(550),
                left: lp(50),
                width: lp(600),
              }}
              showName={false}
              showLocation={false}
            />
            {/*
              Image column
              Original size: 186 × 353 px → aspect ratio 186 ∶ 353
              flex-1 lets it fill whatever space the text column leaves.
            */}
            <div className="flex-1 flex justify-end">
              <img
                className="w-full aspect-[186/353] object-cover"
                alt="Kontakt"
                src={kontaktImgSm}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          DESKTOP LAYOUT  —  hidden below 768 px, shown above
          ════════════════════════════════════════════════════════════════════ */}
      <div className="hidden md:block w-full bg-background">
        {/*
          Outer shell: sets the height via padding-top so it always equals
          (1458 / 1440) × 100 % = 101.25 % of the viewport width.
          All children live inside the `absolute inset-0` inner div.
        */}
        <div
          className="relative w-full overflow-hidden"
          style={{ paddingTop: `${(H / W) * 100}%` }}
        >
          <div className="absolute inset-0">
            {/*
              ── Text block ───────────────────────────────────────────────
              Original: left 149 px, top 269 px, width 508 px
              font-size scales with viewport width via clamp():
                at 768 px  →  clamp floor ≈  1 rem  (16 px)
                at 1440 px →  2.5 vw        = 36 px
                hard cap   →  2.25 rem      (36 px)
            */}
            <div
              className="absolute [font-family:'Antonio',Helvetica] font-normal text-black text-center"
              style={{
                left: lp(149),
                top: tp(269),
                width: lp(508),
                fontSize: "clamp(1rem, 2.5vw, 2.25rem)",
                lineHeight: 1.67,
              }}
            >
              Bei Interesse an meinen Bildern freue ich mich über eine E-Mail:
            </div>

            {/*
              ── Contact / email + Instagram section ──────────────────────
              Original: top 550 px, left 149 px, width 508 px
            */}
            <ContactSection
              className="absolute"
              style={{
                top: tp(550),
                left: lp(149),
                width: lp(508),
              }}
              showName={false}
              showLocation={false}
            />

            {/*
              ── Right-hand image ─────────────────────────────────────────
              Original: left 855 px, top 184 px, width 549 px, height 1044 px
            */}
            <img
              className="absolute object-cover"
              style={{
                left: lp(855),
                top: tp(184),
                width: lp(549),
                height: tp(1044),
              }}
              src={kontaktImgLg}
              alt="Kontakt Vorschau"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </>
  );
}
