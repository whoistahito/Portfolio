import { ContactSection } from "../components/ContactSection";
import { useEffect, useState} from "react";
import ContactSectionMobile from "../components/ContactSectionMobile";
import News3 from "../assets/optimized/sm/News3.webp";
import Calendar2026 from "../assets/optimized/lg/calendar_big.webp";
import NachtderKunst from "../assets/optimized/sm/News2-NdKuK.webp";

// ─── Desktop canvas reference dimensions ─────────────────────────────────────
const DW = 1440; // canvas width  (px) – matches max-w-[1440px]
const DH = 2474; // canvas height (px) – matches original minHeight

/** original px → % of desktop canvas width  (left / width) */
const dlp = (px: number) => `${(px / DW) * 100}%`;
/** original px → % of desktop canvas height (top  / height) */
const dtp = (px: number) => `${(px / DH) * 100}%`;

export function Updates(): JSX.Element {
    const [isMobile, setIsMobile] = useState(() => (typeof window !== "undefined" ? window.innerWidth <= 768 : false));

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // ── MOBILE ───────────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <div className="bg-[#d4cdc4] w-full min-h-screen pt-5">
        {/* Push content below the fixed mobile header (~64 px tall) */}
        <div className="h-16 w-full flex-shrink-0" />

        <div className="w-full max-w-[430px] mx-auto px-4 pb-8 flex flex-col gap-6">
          {/* ── News 1 ─────────────────────────────────────────────────── */}
          <h2 className="font-normal text-[18px] leading-[150%]">
            AUSSTELLUNG »VOM WERDEN UND WACHSEN«
          </h2>

          <div className="flex gap-4 items-start">
            <div className="flex-1 flex flex-col gap-3">
              <p className="font-thin text-[14px] leading-[150%] text-justify">
                Die Ausstellung zeigt meinen künstlerischen Entwicklungsprozess
                als lebendige Momentaufnahme eines fortlaufenden Wandels.
                <br />
                Am 4. März 2026 findet ab 18 Uhr in der Förde Sparkasse in
                Lütjenburg meine Vernissage statt. Einlass ist ab 17:30 Uhr am
                Seiteneingang beim Bürgerbrunnen.
              </p>
              <p className="font-normal text-[14px] leading-[150%]">
                Markt 15
                <br />
                24321 Lütjenburg
              </p>
              <div className="self-end w-[180px] h-[32px] flex items-center justify-center border-2 border-[#854686] rounded-full">
                <span className="font-semibold text-[13px] tracking-[0.05em]">
                  04.03. – 14.04.2026
                </span>
              </div>
            </div>
            <img
              src={News3}
              alt="Ausstellung Vom Werden und Wachsen"
              className="w-[150px] h-auto rounded object-cover shrink-0"
            />
          </div>

          {/* ── Divider ─────────────────────────────────────────────────── */}
          <div className="w-full border-t border-[#636263]" />

          {/* ── News 2 & 3 (two-column) ─────────────────────────────────── */}
          <div className="flex gap-4 items-start">
            {/* News 2 */}
            <div className="flex-1 flex flex-col gap-2">
              <img
                src={NachtderKunst}
                alt="Nacht der Kunst"
                className="w-full h-auto rounded object-cover aspect-[1.7]"
              />
              <h2 className="font-normal text-[16px] leading-[120%] mt-2">
                NACHT DER KUNST- UND KULTURORTE
              </h2>
              <p className="font-thin text-[13px] leading-[140%] text-justify">
                Am Samstag, den 28. Februar 2026, öffne ich mein Zuhause für die
                Öffentlichkeit von 18 bis 22 Uhr im Rahmen der Schwentinentaler
                Nacht der Kunst- und Kulturorte.
              </p>
              <p className="font-normal text-[13px] leading-[140%] mt-1">
                Elsa-Brandström-Straße 7<br />
                24223 Schwentinental
              </p>
              <div className="w-full h-[28px] flex items-center justify-center border-2 border-[#854686] rounded-full mt-1">
                <span className="font-semibold text-[12px] tracking-[0.05em]">
                  28.02.2026
                </span>
              </div>
            </div>

            {/* News 3 */}
            <div className="flex-1 flex flex-col gap-2">
              <img
                src={Calendar2026}
                alt="Kunstkalender 2026"
                className="w-full h-auto bg-[#E99348] rounded object-cover aspect-square"
              />
              <h3 className="font-normal text-[16px] leading-[120%] mt-2">
                KUNSTKALENDER 2026 ERHÄLTLICH
              </h3>
              <p className="font-thin text-[13px] leading-[140%] text-justify">
                Mein Kunstkalender 2026 ist ab sofort an verschiedenen
                Verkaufsstellen in Schleswig-Holstein sowie online erhältlich.
              </p>
              <a
                href="/updates/calendar-2026"
                className="text-[#854686] underline text-[12px] mt-1 inline-block"
              >
                Mehr Infos
              </a>
            </div>
          </div>

          {/* ── Contact ─────────────────────────────────────────────────── */}
          <ContactSectionMobile className="mt-6 w-full" />
        </div>
      </div>
    );
  }

  // ── DESKTOP ──────────────────────────────────────────────────────────────
  /*
    The padding-top trick creates a canvas whose height is always
    (DH / DW) × its own width — i.e. the exact 1440 × 2474 px proportions.
    `min(${DH}px, …)` prevents it growing beyond 2474 px on very wide monitors.
    All elements are absolutely positioned with %-based coords derived from the
    original hardcoded pixel values via dlp() / dtp().
    Font sizes use clamp() so they scale proportionally with viewport width:
      formula → clamp(floor, (original_px / DW * 100)vw, original_px_as_rem)
  */
  return (
    <main className="w-full bg-[#D3CCC3] overflow-x-hidden">
      <div
        className="relative w-full max-w-[1440px] mx-auto overflow-hidden"
        style={{ paddingTop: `min(${DH}px, ${(DH / DW) * 100}%)` }}
      >
        <div className="absolute inset-0">
          {/* ── News 1 heading ─────────────────────────────────────────── */}
          {/*   original: left 74, top 225, width 600, font 40px           */}
          <h2
            className="absolute font-normal leading-[150%]"
            style={{
              left: dlp(74),
              top: dtp(225),
              width: dlp(600),
              fontSize: "clamp(1.25rem, 2.78vw, 2.5rem)",
            }}
          >
            AUSSTELLUNG
            <br />
            »VOM WERDEN UND WACHSEN«
          </h2>

          {/* ── News 1 body text ──────────────────────────────────────── */}
          {/*   original: left 74, top ~380 (after h2 + mb-8), font 28px  */}
          <p
            className="absolute font-thin leading-[160%] text-justify"
            style={{
              left: dlp(74),
              top: dtp(380),
              width: dlp(600),
              fontSize: "clamp(0.9rem, 1.94vw, 1.75rem)",
            }}
          >
            Die Ausstellung zeigt meinen künstlerischen Entwicklungs-prozess als
            lebendige Momentaufnahme eines fortlaufenden Wandels.
            <br />
            Am 4. März 2026 findet ab 18 Uhr in der Förde Sparkasse in
            Lütjenburg meine Vernissage statt. Einlass ist ab 17:30 Uhr am
            Seiteneingang beim Bürgerbrunnen.
          </p>

          {/* ── News 1 address ────────────────────────────────────────── */}
          {/*   original: left 74, top 715 (225+490), font 24px           */}
          <p
            className="absolute font-normal leading-[150%]"
            style={{
              left: dlp(74),
              top: dtp(715),
              width: dlp(255),
              fontSize: "clamp(0.85rem, 1.67vw, 1.5rem)",
            }}
          >
            Markt 15
            <br />
            24321 Lütjenburg
          </p>

          {/* ── News 1 date badge ─────────────────────────────────────── */}
          {/*   original: left 334 (74+260), top 728 (225+503), 350×62   */}
          <div
            className="absolute flex items-center justify-center border-2 border-[#854686] rounded-full"
            style={{
              left: dlp(334),
              top: dtp(728),
              width: dlp(350),
              height: dtp(62),
            }}
          >
            <span
              className="font-semibold tracking-[0.1em]"
              style={{ fontSize: "clamp(0.9rem, 2.22vw, 2rem)" }}
            >
              04.03. – 14.04.2026
            </span>
          </div>

          {/* ── News 1 image ──────────────────────────────────────────── */}
          {/*   original: left 711, top 240, 633×550                      */}
          <img
            src={News3}
            alt="Ausstellung Vom Werden und Wachsen"
            className="absolute object-contain rounded-lg border-4 border-orange-500"
            style={{
              left: dlp(870),
              top: dtp(240),
              width: dlp(380),
              height: "auto",
            }}
          />

          {/* ── Divider ───────────────────────────────────────────────── */}
          {/*   original: left 36, top 890, width 1367                    */}
          <div
            className="absolute border-t border-[#636263]"
            style={{
              left: dlp(36),
              top: dtp(890),
              width: dlp(1367),
            }}
          />

          {/* ── News 2 image ──────────────────────────────────────────── */}
          {/*   original: left 72, top 970, 837×485                       */}
          <img
            src={NachtderKunst}
            alt="Nacht der Kunst"
            className="absolute rounded-lg object-cover"
            style={{
              left: dlp(72),
              top: dtp(970),
              width: dlp(837),
              height: dtp(485),
            }}
          />

          {/* ── News 2 heading ────────────────────────────────────────── */}
          {/*   original: left 72, top 1470, width 837, font 40px         */}
          <h2
            className="absolute font-normal leading-[150%]"
            style={{
              left: dlp(72),
              top: dtp(1470),
              width: dlp(837),
              fontSize: "clamp(1.25rem, 2.78vw, 2.5rem)",
            }}
          >
            NACHT DER KUNST- UND KULTURORTE
          </h2>

          {/* ── News 2 body text ──────────────────────────────────────── */}
          {/*   original: left 72, top 1555, width 837, font 24px         */}
          <p
            className="absolute font-thin leading-[150%] text-justify"
            style={{
              left: dlp(72),
              top: dtp(1555),
              width: dlp(837),
              fontSize: "clamp(0.85rem, 1.67vw, 1.5rem)",
            }}
          >
            Am Samstag, den 28. Februar 2026, öffne ich mein Zuhause für die
            Öffentlichkeit von 18 bis 22 Uhr im Rahmen der Schwentinentaler
            Nacht der Kunst- und Kulturorte.
          </p>

          {/* ── News 2 address ────────────────────────────────────────── */}
          {/*   original: left 72, top 1690, width 600, font 24px         */}
          <p
            className="absolute font-normal leading-[150%]"
            style={{
              left: dlp(72),
              top: dtp(1690),
              width: dlp(600),
              fontSize: "clamp(0.85rem, 1.67vw, 1.5rem)",
            }}
          >
            Elsa-Brandström-Straße 7<br />
            24223 Schwentinental
          </p>

          {/* ── News 2 date badge ─────────────────────────────────────── */}
          {/*   original: left 665, top 1698, 244×62                      */}
          <div
            className="absolute flex items-center justify-center border-2 border-[#854686] rounded-full"
            style={{
              left: dlp(665),
              top: dtp(1698),
              width: dlp(244),
              height: dtp(62),
            }}
          >
            <span
              className="font-semibold tracking-[0.1em]"
              style={{ fontSize: "clamp(0.9rem, 2.22vw, 2rem)" }}
            >
              28.02.2026
            </span>
          </div>

          {/* ── News 3 image (Calendar) ───────────────────────────────── */}
          {/*   original: left 980, top 970, 396×370                      */}
          <img
            src={Calendar2026}
            alt="Kunstkalender 2026"
            className="absolute object-cover rounded-lg bg-[#E99348]"
            style={{
              left: dlp(980),
              top: dtp(970),
              width: dlp(396),
              height: dtp(370),
            }}
          />

          {/* ── News 3 title ──────────────────────────────────────────── */}
          {/*   original: left 980, top 1355, width 396, font 39px        */}
          <h3
            className="absolute font-normal leading-[150%]"
            style={{
              left: dlp(980),
              top: dtp(1355),
              width: dlp(396),
              fontSize: "clamp(1.2rem, 2.71vw, 2.44rem)",
            }}
          >
            KUNSTKALENDER 2026 ERHÄLTLICH
          </h3>

          {/* ── News 3 body text ──────────────────────────────────────── */}
          {/*   original: left 980, top 1500, width 396, font 24px        */}
          <p
            className="absolute font-thin leading-[150%] text-justify"
            style={{
              left: dlp(980),
              top: dtp(1500),
              width: dlp(396),
              fontSize: "clamp(0.85rem, 1.67vw, 1.5rem)",
            }}
          >
            Mein Kunstkalender 2026 ist ab sofort an verschiedenen
            Verkaufsstellen in Schleswig-Holstein sowie online erhältlich.
          </p>

          {/* ── News 3 "Mehr Infos" link ──────────────────────────────── */}
          {/*   original: left 980, top 1640, font 20px                   */}
          <a
            href="/updates/calendar-2026"
            className="absolute text-[#854686] underline cursor-pointer"
            style={{
              left: dlp(980),
              top: dtp(1640),
              fontSize: "clamp(0.75rem, 1.39vw, 1.25rem)",
            }}
          >
            Mehr Infos
          </a>

          {/* ── Contact section ───────────────────────────────────────── */}
          {/*   original: centered, top 2000, width 560                   */}
          <ContactSection
            className="absolute"
            style={{
              top: dtp(2000),
              left: "50%",
              transform: "translateX(-50%)",
              width: dlp(560),
            }}
          />
        </div>
      </div>
    </main>
  );
}