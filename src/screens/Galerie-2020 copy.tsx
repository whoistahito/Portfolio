import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
  type TouchEvent,
} from "react";
import { ContactSection } from "../components/ContactSection";
import ContactSectionMobile from "../components/ContactSectionMobile";

// ─── Image imports ────────────────────────────────────────────────────────────
import smSandmeer from "../assets/optimized/sm/1-Sandmeer-sm.webp";
import smSonnenblumen from "../assets/optimized/sm/2-Sonnenblumen-sm.webp";
import smKuechenphilosophie from "../assets/optimized/sm/3-Kuechenphilosophie-sm.webp";
import smPower from "../assets/optimized/sm/4-power-sm.webp";
import smResonanzA from "../assets/optimized/sm/5-Resonanz-sm.webp";
import smResonanzB from "../assets/optimized/sm/6-Resonanz-sm.webp";
import smAusbruch from "../assets/optimized/sm/7-Ausbruch-sm.webp";
import smTanzendeA from "../assets/optimized/sm/8-Tanzende-sm.webp";
import smTanzendeB from "../assets/optimized/sm/9-Tanzende-sm.webp";
import smEismeer from "../assets/optimized/sm/10-Eismeer-sm.webp";
import smZaghaft from "../assets/optimized/sm/11-Zaghaft-beginnt-etwas-Neues-sm.webp";
import smFruehling from "../assets/optimized/sm/12-Fruehling-sm.webp";
import smAufbruch from "../assets/optimized/sm/13-Aufbruch-sm.webp";
import smSpuren from "../assets/optimized/sm/14-Spuren-sm.webp";
import smVonderDunkelheit from "../assets/optimized/sm/15-Von-der-Dunkelheit-ins-Licht-sm.webp";
import smAufloesung from "../assets/optimized/sm/16-Aufloesung-in-blau-sm.webp";
import smKleineAufruhr from "../assets/optimized/sm/17-Kleine-Aufruhr-sm.webp";
import smRiff from "../assets/optimized/sm/18-Riff-sm.webp";
import smEismeerII from "../assets/optimized/sm/19-Eismeer-2-sm.webp";
import smTiefseetraum from "../assets/optimized/sm/20-Tiefseetraum-sm.webp";
import smUnterwasserwunder from "../assets/optimized/sm/21-Unterwasserwunder-sm.webp";
import smAufruhr from "../assets/optimized/sm/22-Aufruhr-sm.webp";
import smFarbedrängt from "../assets/optimized/sm/23-Farbe-draengt-zwischen-Hitze-und-Form-sm.webp";
import smWennBewegung from "../assets/optimized/sm/24-Wenn-Bewegung-bleibt-sm.webp";
import smZustandeines from "../assets/optimized/sm/25-Zustand-eines-Himmels-sm.webp";
import smFokus from "../assets/optimized/sm/26-Fokus-sm.webp";

import lgAufbruch from "../assets/optimized/lg/13-Aufbruch-lg.webp";
import lgAusbruch from "../assets/optimized/lg/7-Ausbruch-lg.webp";
import lgEismeer from "../assets/optimized/lg/Eismeer-web.webp";
import lgFruehling from "../assets/optimized/lg/Fruehling-web.webp";
import lgKuechenphilosophie from "../assets/optimized/lg/Küchenphilosophie-web.webp";
import lgOhneTitelA from "../assets/optimized/lg/ohneTitel-a-web.webp";
import lgOhneTitel1 from "../assets/optimized/lg/ohneTitel1-web.webp";
import lgOhneTitelB from "../assets/optimized/lg/ohneTitelb-web.webp";
import lgPower from "../assets/optimized/lg/power-web.webp";
import lgSonnenblumen from "../assets/optimized/lg/Sonnenblumen-web.webp";
import lgSpuren from "../assets/optimized/lg/Spuren-web.webp";
import lgTanzendeA from "../assets/optimized/lg/Tanzende-a-web.webp";
import lgTanzendeB from "../assets/optimized/lg/Tanzende-b-web.webp";
import lgZaghaft from "../assets/optimized/lg/Zaghaft-beginnt-etwas-Neues-web.webp";

// ─── Types ────────────────────────────────────────────────────────────────────
type Artwork = {
  id: number;
  smallSrc: string;
  largeSrc: string;
  alt: string;
  title: string;
  year: string;
  dimensions: string;
  groupId?: string;
  /** Desktop absolute coords (px, reference canvas 1440 × 7700) */
  img: { w: number; top: number; left: number };
  /** Desktop caption coords (px, same reference canvas) */
  caption?: { w?: number; top: number; left: number; align?: "right" | "left" };
};

// ─── Artwork data ─────────────────────────────────────────────────────────────
const artworks: Artwork[] = [
  // Restore the vertical position of the first artwork so it sits closer to the header like before
  {
    id: 1,
    smallSrc: smSandmeer,
    largeSrc: lgOhneTitel1,
    alt: "Sandmeer",
    title: "Sandmeer",
    year: "2025",
    dimensions: "120 x 100 cm",
    img: { w: 566, top: 232, left: 843 },
    caption: { w: 196, top: 316, left: 639, align: "right" },
  },
  {
    id: 2,
    smallSrc: smSonnenblumen,
    largeSrc: lgSonnenblumen,
    alt: "Sonnenblumen",
    title: "Sonnenblumen",
    year: "2021",
    dimensions: "100 x 80 cm",
    img: { w: 566, top: 232, left: 843 },
    caption: { w: 196, top: 316, left: 639, align: "right" },
  },
  {
    id: 3,
    smallSrc: smKuechenphilosophie,
    largeSrc: lgKuechenphilosophie,
    alt: "Küchenphilosophie",
    title: "Küchenphilosophie",
    year: "2019",
    dimensions: "70 x 100 cm",
    img: { w: 566, top: 232, left: 843 },
    caption: { w: 196, top: 316, left: 639 },
  },
  {
    id: 4,
    smallSrc: smPower,
    largeSrc: lgPower,
    alt: "power",
    title: "power",
    year: "2021",
    dimensions: "70 x 70 cm",
    img: { w: 566, top: 232, left: 843 },
    caption: { w: 196, top: 316, left: 639, align: "right" },
  },
  {
    id: 5,
    smallSrc: smResonanzA,
    largeSrc: lgOhneTitelA,
    alt: "Resonanz A",
    title: "Resonanz",
    year: "2022",
    dimensions: "60 x 120 cm",
    groupId: "resonanz",
    img: { w: 566, top: 232, left: 843 },
    caption: { w: 196, top: 316, left: 639, align: "right" },
  },
  {
    id: 6,
    smallSrc: smResonanzB,
    largeSrc: lgOhneTitelB,
    alt: "Resonanz B",
    title: "",
    year: "2022",
    dimensions: "60 x 120 cm",
    groupId: "resonanz",
    img: { w: 566, top: 232, left: 843 },
  },
  {
    id: 7,
    smallSrc: smAusbruch,
    largeSrc: lgAusbruch,
    alt: "Ausbruch",
    title: "Ausbruch",
    year: "2022",
    dimensions: "70 x 60 cm",
    img: { w: 566, top: 232, left: 843 },
    caption: { w: 196, top: 316, left: 639 },
  },
  {
    id: 8,
    smallSrc: smTanzendeA,
    largeSrc: lgTanzendeA,
    alt: "Tanzende A",
    title: "Tanzende",
    year: "2021",
    dimensions: "30 x 60 cm",
    groupId: "tanzende",
    img: { w: 566, top: 232, left: 843 },
    caption: { w: 196, top: 316, left: 639 },
  },
  {
    id: 9,
    smallSrc: smTanzendeB,
    largeSrc: lgTanzendeB,
    alt: "Tanzende B",
    title: "",
    year: "2021",
    dimensions: "30 x 60 cm",
    groupId: "tanzende",
    img: { w: 566, top: 232, left: 843 },
  },
  {
    id: 10,
    smallSrc: smEismeer,
    largeSrc: lgEismeer,
    alt: "Eismeer",
    title: "Eismeer",
    year: "2020",
    dimensions: "80 x 40 cm",
    img: { w: 566, top: 232, left: 843 },
    caption: { w: 196, top: 316, left: 639 },
  },
  {
    id: 11,
    smallSrc: smZaghaft,
    largeSrc: lgZaghaft,
    alt: "Zaghaft beginnt etwas Neues",
    title: "Zaghaft beginnt etwas Neues",
    year: "2021",
    dimensions: "30 x 60 cm",
    img: { w: 566, top: 232, left: 843 },
    caption: { w: 196, top: 316, left: 639, align: "right" },
  },
  {
    id: 12,
    smallSrc: smFruehling,
    largeSrc: lgFruehling,
    alt: "Frühling",
    title: "Frühling",
    year: "2020",
    dimensions: "70 x 70 cm",
    img: { w: 566, top: 232, left: 843 },
    caption: { w: 196, top: 316, left: 639 },
  },
  {
    id: 13,
    smallSrc: smAufbruch,
    largeSrc: lgAufbruch,
    alt: "Aufbruch",
    title: "Aufbruch",
    year: "2024",
    dimensions: "100 x 100 cm",
    img: { w: 566, top: 232, left: 843 },
    caption: { w: 196, top: 316, left: 639, align: "right" },
  },
  {
    id: 14,
    smallSrc: smSpuren,
    largeSrc: lgSpuren,
    alt: "Spuren",
    title: "Spuren",
    year: "2022",
    dimensions: "100 x 100 cm",
    img: { w: 566, top: 232, left: 843 },
    caption: { w: 196, top: 316, left: 639 },
  },
  {
    id: 15,
    smallSrc: smVonderDunkelheit,
    largeSrc: lgOhneTitel1,
    alt: "Von der Dunkelheit ins Licht",
    title: "Von der Dunkelheit ins Licht",
    year: "2022",
    dimensions: "100 x 80 cm",
    img: { w: 566, top: 232, left: 843 },
    caption: { w: 196, top: 316, left: 639, align: "right" },
  },
  {
    id: 16,
    smallSrc: smAufloesung,
    largeSrc: lgOhneTitel1,
    alt: "Auflösung in blau",
    title: "Auflösung in blau",
    year: "2022",
    dimensions: "70 x 70 cm",
    img: { w: 566, top: 232, left: 843 },
    caption: { w: 196, top: 316, left: 639, align: "right" },
  },
  {
    id: 17,
    smallSrc: smKleineAufruhr,
    largeSrc: lgOhneTitel1,
    alt: "Kleine Aufruhr",
    title: "Kleine Aufruhr",
    year: "2023",
    dimensions: "30 x 30 cm",
    img: { w: 566, top: 232, left: 843 },
    caption: { w: 196, top: 316, left: 639, align: "right" },
  },
  {
    id: 18,
    smallSrc: smRiff,
    largeSrc: lgOhneTitel1,
    alt: "Riff",
    title: "Riff",
    year: "2023",
    dimensions: "80 x 60 cm",
    img: { w: 566, top: 232, left: 843 },
    caption: { w: 196, top: 316, left: 639, align: "right" },
  },
  {
    id: 19,
    smallSrc: smEismeerII,
    largeSrc: lgOhneTitel1,
    alt: "Eismeer II",
    title: "Eismeer II",
    year: "2024",
    dimensions: "100 x 50 cm",
    img: { w: 566, top: 232, left: 843 },
    caption: { w: 196, top: 316, left: 639, align: "right" },
  },
  {
    id: 20,
    smallSrc: smTiefseetraum,
    largeSrc: lgOhneTitel1,
    alt: "Tiefseetraum",
    title: "Tiefseetraum",
    year: "2020",
    dimensions: "80 x 80 cm",
    img: { w: 566, top: 232, left: 843 },
    caption: { w: 196, top: 316, left: 639, align: "right" },
  },
  {
    id: 21,
    smallSrc: smUnterwasserwunder,
    largeSrc: lgOhneTitel1,
    alt: "Unterwasserwunder",
    title: "Unterwasserwunder",
    year: "2023",
    dimensions: "80 x 60 cm",
    img: { w: 566, top: 232, left: 843 },
    caption: { w: 196, top: 316, left: 639, align: "right" },
  },
  {
    id: 22,
    smallSrc: smAufruhr,
    largeSrc: lgOhneTitel1,
    alt: "Aufruhr",
    title: "Aufruhr",
    year: "2023",
    dimensions: "80 x 60 cm",
    img: { w: 566, top: 232, left: 843 },
    caption: { w: 196, top: 316, left: 639, align: "right" },
  },
  {
    id: 23,
    smallSrc: smFarbedrängt,
    largeSrc: lgOhneTitel1,
    alt: "Farbe drängt zwischen Hitze und Form",
    title: "Farbe drängt zwischen Hitze und Form",
    year: "2024",
    dimensions: "70 x 100 cm",
    img: { w: 566, top: 232, left: 843 },
    caption: { w: 196, top: 316, left: 639, align: "right" },
  },
  {
    id: 24,
    smallSrc: smWennBewegung,
    largeSrc: lgOhneTitel1,
    alt: "Wenn Bewegung bleibt",
    title: "Wenn Bewegung bleibt",
    year: "2024",
    dimensions: "100 x 80 cm",
    img: { w: 566, top: 232, left: 843 },
    caption: { w: 196, top: 316, left: 639, align: "right" },
  },
  {
    id: 25,
    smallSrc: smZustandeines,
    largeSrc: lgOhneTitel1,
    alt: "Zustand eines Himmels",
    title: "Zustand eines Himmels",
    year: "2024",
    dimensions: "100 x 100 cm",
    img: { w: 566, top: 232, left: 843 },
    caption: { w: 196, top: 316, left: 639, align: "right" },
  },
  {
    id: 26,
    smallSrc: smFokus,
    largeSrc: lgOhneTitel1,
    alt: "Fokus",
    title: "Fokus",
    year: "2024",
    dimensions: "50 x 50 cm",
    img: { w: 566, top: 232, left: 843 },
    caption: { w: 196, top: 316, left: 639, align: "right" },
  },
];

// ─── Canvas reference dimensions ─────────────────────────────────────────────
/*
  Desktop: every pixel coord in `artworks` was designed for a 1440 × 7700 px canvas.
  Mobile:  every pixel coord in `mobileLayout` was designed for a 390 × 3450 px canvas.

  Responsive technique: "padding-top trick"
    A `position:relative` container with `padding-top: (H/W)*100%` always has
    height = (H/W) × its own width — i.e. it maintains the H∶W aspect ratio.
    Children live inside an `absolute inset-0` layer and are positioned with
    %-values derived from the reference canvas dimensions.

    CSS min() caps the physical pixel height so the layout never exceeds the
    original design size on very wide screens.
*/
const DW = 1440; // desktop canvas width  (px)
const DH = 7700; // desktop canvas height (px)
const MW = 390; // mobile  canvas width  (px)
const MH = 3450; // mobile  canvas height (px)
// last artwork bottom: id=14 top 3034 + h 283 = 3317 px; +133 buffer

/** original px → % of desktop canvas width  (use for `left` and `width`)  */
const dlp = (px: number) => `${(px / DW) * 100}%`;
/** original px → % of desktop canvas height (use for `top`  and `height`) */
const dtp = (px: number) => `${(px / DH) * 100}%`;
/** original px → % of mobile canvas width   (use for `left` and `width`)  */
const mlp = (px: number) => `${(px / MW) * 100}%`;
/** original px → % of mobile canvas height  (use for `top`  and `height`) */
const mtp = (px: number) => `${(px / MH) * 100}%`;

// ─── Mobile layout data ───────────────────────────────────────────────────────
/*
  All pixel coords were extracted from the original hardcoded mobile markup
  (reference canvas 390 × 3450 px).  Heights that were originally `h-auto` or
  a Tailwind class like `h-80` are converted to explicit pixels:
    • id=4  was `h-auto`  → computed from desktop aspect ratio 499/511 × 280 ≈ 273 px
    • id=5  was `h-80`    → 320 px  (Tailwind h-80 = 20rem = 320 px)
*/
type MobileItem = {
  id: number;
  img: { w: number; top: number; left: number };
  caption: {
    w: number;
    top: number;
    left: number;
    align: "left" | "right";
  } | null;
};

const mobileLayout: MobileItem[] = [
  {
    id: 1,
    img: { w: 278, top: 75, left: 13 },
    caption: { w: 79, top: 95, left: 311, align: "left" },
  },
  {
    id: 2,
    img: { w: 247, top: 353, left: 137 },
    caption: { w: 100, top: 420, left: 30, align: "right" },
  },
  {
    id: 3,
    img: { w: 315, top: 609, left: 12 },
    caption: { w: 66, top: 654, left: 328, align: "left" },
  },
  {
    id: 4,
    img: { w: 280, top: 801, left: 0 },
    caption: { w: 100, top: 850, left: 290, align: "left" },
  },
  {
    id: 5,
    img: { w: 302, top: 1127, left: 82 },
    caption: { w: 80, top: 1210, left: -5, align: "right" },
  },
  {
    id: 6,
    img: { w: 135, top: 1473, left: 11 },
    caption: { w: 90, top: 1648, left: 301, align: "left" },
  },
  {
    id: 7,
    img: { w: 138, top: 1473, left: 154 },
    caption: null,
  },
  {
    id: 8,
    img: { w: 290, top: 1753, left: 100 },
    caption: { w: 85, top: 1780, left: 11, align: "right" },
  },
  {
    id: 9,
    img: { w: 254, top: 1961, left: 5 },
    caption: { w: 108, top: 2095, left: 271, align: "left" },
  },
  {
    id: 10,
    img: { w: 131, top: 2243, left: 254 },
    caption: { w: 110, top: 2350, left: 5, align: "right" },
  },
  {
    id: 11,
    img: { w: 130, top: 2243, left: 121 },
    caption: null,
  },
  {
    id: 12,
    img: { w: 276, top: 2530, left: 0 },
    caption: { w: 95, top: 2617, left: 295, align: "left" },
  },
  {
    id: 13,
    img: { w: 286, top: 2814, left: 88 },
    caption: { w: 75, top: 2832, left: 8, align: "right" },
  },
  {
    id: 14,
    img: { w: 281, top: 3034, left: 11 },
    caption: { w: 75, top: 3167, left: 306, align: "left" },
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
export function HomePage(): JSX.Element {
  // ── Lightbox state — shared between mobile & desktop ────────────────────
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const isPinching = useRef<boolean>(false);

  const openPreview = useCallback((idx: number) => {
    setCurrentIndex(idx);
    setIsPreviewOpen(true);
  }, []);
  const closePreview = useCallback(() => setIsPreviewOpen(false), []);
  const showPrev = useCallback(
    () => setCurrentIndex((i) => (i - 1 + artworks.length) % artworks.length),
    [],
  );
  const showNext = useCallback(
    () => setCurrentIndex((i) => (i + 1) % artworks.length),
    [],
  );

  // diptych group map: groupId → [index, …]
  const groups = useMemo(() => {
    const map = new Map<string, number[]>();
    artworks.forEach((a, idx) => {
      if (a.groupId) {
        const arr = map.get(a.groupId) ?? [];
        arr.push(idx);
        map.set(a.groupId, arr);
      }
    });
    return map;
  }, []);

  // Keyboard navigation + body-scroll lock while lightbox is open
  useEffect(() => {
    if (!isPreviewOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePreview();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };

    // Block single-touch scroll; allow pinch-to-zoom
    const blockScroll = (e: Event) => {
      const te = e as unknown as TouchEvent;
      if (te.touches && te.touches.length > 1) return;
      e.preventDefault();
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("touchmove", blockScroll, { passive: false });

    const savedOverflow = document.body.style.overflow;
    const savedPosition = document.body.style.position;
    const savedTop = document.body.style.top;
    const scrollY = window.scrollY;

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    // Move focus to the close button for accessibility
    closeBtnRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("touchmove", blockScroll);
      document.body.style.overflow = savedOverflow;
      document.body.style.position = savedPosition;
      document.body.style.top = savedTop;
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, [isPreviewOpen, closePreview, showPrev, showNext]);

  // Swipe handlers (attached to the lightbox overlay)
  const onTouchStart = (e: TouchEvent) => {
    if (e.touches.length > 1) {
      isPinching.current = true;
    } else {
      isPinching.current = false;
      touchStartX.current = e.touches[0].clientX;
    }
  };
  const onTouchEnd = (e: TouchEvent) => {
    if (isPinching.current) {
      isPinching.current = false;
      touchStartX.current = null;
      return;
    }
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (dx > 50) showPrev();
    if (dx < -50) showNext();
    touchStartX.current = null;
  };

  // ── Lightbox content (single, shared by both layouts) ───────────────────
  const lightboxContent = (() => {
    const cur = artworks[currentIndex];
    const groupIdxs = cur.groupId ? groups.get(cur.groupId) : null;

    if (groupIdxs && groupIdxs.length > 1) {
      const group = groupIdxs.map((i) => artworks[i]);
      const main =
        group.find((a) => (a.title ?? "").trim().length > 0) ?? group[0];
      return (
        <div className="flex flex-col items-center gap-4 w-full">
          <div className="flex gap-2 md:gap-8 items-center justify-center w-full">
            {group.map((a) => (
              <img
                key={a.id}
                src={a.largeSrc}
                alt={a.alt}
                className="flex-1 max-w-[45vw] max-h-[65vh] object-contain"
              />
            ))}
          </div>
          <p className="[font-family:'Antonio',Helvetica] text-black text-base md:text-xl text-center">
            {(main.title || main.alt) ?? ""}
          </p>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center gap-4">
        <img
          src={cur.largeSrc}
          alt={cur.alt}
          className="max-w-[85vw] max-h-[70vh] md:max-w-[70vw] md:max-h-[72vh] object-contain"
        />
        <p className="[font-family:'Antonio',Helvetica] text-black text-base md:text-xl text-center">
          {(cur.title || cur.alt) ?? ""}
        </p>
      </div>
    );
  })();

  // ────────────────────────────────────────────────────────────────────────
  return (
    <main aria-label="Galerie">
      {/* ══════════════════════════════════════════════════════════════════
          MOBILE GALLERY  (hidden at ≥ 768 px)
          ══════════════════════════════════════════════════════════════════

          The canvas is a `position:relative` box whose height is always
          (MH / MW) × its own width — i.e. the exact 390 × 3450 proportions.
          CSS min() prevents it growing beyond 3450 px on unusually wide phones.
          All 14 artwork images and their captions sit inside the
          `absolute inset-0` layer at %-based coordinates.
      */}
      <div className="md:hidden bg-[#d4cdc4] w-full pt-5">
        {/* ── Gallery canvas ───────────────────────────────────────────── */}
        <div
          className="relative w-full overflow-hidden"
          style={{ paddingTop: `min(${MH}px, ${(MH / MW) * 100}%)` }}
        >
          <div className="absolute inset-0">
            {mobileLayout.map((item) => {
              const artIdx = artworks.findIndex((a) => a.id === item.id);
              const art = artworks[artIdx];
              return (
                <div key={item.id}>
                  {/* Artwork image */}
                  <img
                    src={art.smallSrc}
                    alt={art.alt}
                    loading="lazy"
                    className="absolute cursor-pointer"
                    style={{
                      left: mlp(item.img.left),
                      top: mtp(item.img.top),
                      width: mlp(item.img.w),
                      height: "auto",
                    }}
                    onClick={() => openPreview(artIdx)}
                  />

                  {/* Caption (only when the artwork has a title) */}
                  {item.caption && art.title && (
                    <div
                      className="absolute [font-family:'Antonio',Helvetica] font-normal text-black"
                      style={{
                        left: mlp(item.caption.left),
                        top: mtp(item.caption.top),
                        width: mlp(item.caption.w),
                        textAlign: item.caption.align,
                        /*
                          Font size scales with viewport width so captions
                          remain proportional to the canvas.
                          clamp floor (0.65 rem) prevents text becoming illegible
                          on very narrow screens.
                          4.1 vw  ≈  16 px at 390 px viewport width.
                        */
                        fontSize: "clamp(0.65rem, 4.1vw, 1rem)",
                        lineHeight: 1.2,
                        zIndex: 10,
                      }}
                    >
                      {art.title}
                      <br />
                      <span className="font-thin">
                        {art.year}
                        <br />
                        {art.dimensions}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Contact footer ───────────────────────────────────────────── */}
        <ContactSectionMobile className="mt-6 w-full" />
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          DESKTOP GALLERY  (hidden below 768 px)
          ══════════════════════════════════════════════════════════════════

          Same padding-top technique, reference canvas 1440 × 7700 px.
          max-w-[1440px] + mx-auto preserves the intended design at exactly
          1440 px and centres it on very wide monitors without over-scaling.
          CSS min() caps the canvas height at its original 7700 px pixel value.
      */}
      <div className="hidden md:block w-full bg-background">
        <div
          className="relative w-full max-w-[1440px] mx-auto overflow-hidden"
          style={{ paddingTop: `min(${DH}px, ${(DH / DW) * 100}%)` }}
        >
          <div className="absolute inset-0">
            {/* ── Artwork images ─────────────────────────────────────── */}
            {artworks.map((artwork, idx) => (
              <img
                key={artwork.id}
                src={artwork.smallSrc}
                alt={artwork.alt}
                loading="lazy"
                className="absolute cursor-pointer"
                style={{
                  left: dlp(artwork.img.left),
                  top: dtp(artwork.img.top),
                  width: dlp(artwork.img.w),
                  height: "auto",
                }}
                onClick={() => openPreview(idx)}
              />
            ))}

            {/* ── Captions ───────────────────────────────────────────── */}
            {artworks.map((artwork) =>
              artwork.caption ? (
                <div
                  key={`cap-${artwork.id}`}
                  className="absolute [font-family:'Antonio',Helvetica] text-black"
                  style={{
                    left: dlp(artwork.caption.left),
                    top: dtp(artwork.caption.top),
                    width: dlp(artwork.caption.w ?? 196),
                    textAlign: artwork.caption.align ?? "left",
                    /*
                      1.11 vw ≈ 16 px at 1440 px viewport width.
                      clamp floor (0.75 rem / 12 px) keeps captions readable
                      on mid-range screen sizes (roughly 1080 px and below).
                    */
                    fontSize: "clamp(0.75rem, 1.11vw, 1rem)",
                    lineHeight: 1.2,
                    zIndex: 10,
                  }}
                >
                  <div className="font-normal">{artwork.title}</div>
                  <div className="font-thin">{artwork.year}</div>
                  <div className="font-thin">{artwork.dimensions}</div>
                </div>
              ) : null,
            )}

            {/* ── Contact / footer section ───────────────────────────── */}
            <ContactSection
              className="absolute"
              style={{
                top: dtp(7205),
                left: "50%",
                transform: "translateX(-50%)",
                width: dlp(560),
              }}
            />
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          LIGHTBOX  (single overlay shared by mobile & desktop)
          ══════════════════════════════════════════════════════════════════ */}
      {isPreviewOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] bg-[#D3CCC3] flex items-center justify-center"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onClick={(e) => {
            if (e.target === e.currentTarget) closePreview();
          }}
        >
          {/* Close button */}
          <button
            ref={closeBtnRef}
            aria-label="Close preview"
            onClick={closePreview}
            className="absolute top-2 right-4 md:right-10 w-12 h-12 md:w-20 md:h-20 flex items-center justify-center text-4xl md:text-7xl leading-none text-black hover:text-[#854686] focus:outline-none transition-colors z-20"
          >
            ×
          </button>

          {/* Previous */}
          <button
            aria-label="Previous image"
            onClick={showPrev}
            className="absolute left-0 top-0 h-full px-3 md:px-6 flex items-center justify-center text-4xl md:text-6xl text-black hover:text-[#854686] select-none transition-colors z-20"
          >
            ‹
          </button>

          {/* Next */}
          <button
            aria-label="Next image"
            onClick={showNext}
            className="absolute right-0 top-0 h-full px-3 md:px-6 flex items-center justify-center text-4xl md:text-6xl text-black hover:text-[#854686] select-none transition-colors z-20"
          >
            ›
          </button>

          {/* Image + title — centred, padded clear of the nav arrows */}
          <div className="w-full h-full flex flex-col items-center justify-center px-14 md:px-24">
            {lightboxContent}
          </div>
        </div>
      )}
    </main>
  );
}
