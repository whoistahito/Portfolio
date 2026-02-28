import { useRef, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useLanguage } from "../lib/LanguageContext";
import SiteHeaderMobile from "./SiteHeaderMobile";

export const SiteHeader = (): JSX.Element => {
  const { t } = useLanguage();
  const [isMobile, setIsMobile] = useState(() => (typeof window !== "undefined" ? window.innerWidth <= 768 : false));
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => setAtTop(window.scrollY <= 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const navigationItems = [
    { label: t("Aktuelles", "Updates"), href: "/updates" },
    { label: t("Ausstellungen", "Exhibitions"), href: "/exhibitions" },
    { label: t("Über mich", "About me"), href: "/about-me" },
    { label: t("Kontakt", "Contact"), href: "/contact" },
  ];

  const kontaktRef = useRef<HTMLAnchorElement | null>(null);
  const headerContainerRef = useRef<HTMLDivElement | null>(null);

  if (isMobile) return <SiteHeaderMobile />;

  return (
    <div className="w-full">
      {/* Desktop Navigation Bar: fixed, sits below 41px language bar at page top; then snaps to top on scroll. */}
      <header
        className="fixed left-0 right-0 z-50 bg-[#af8f5b] shadow"
        style={{ top: atTop ? 41 : 0 }}
      >
        <div ref={headerContainerRef} className="container mx-auto flex h-24 items-center justify-between px-6">
          <h1 className="[font-family:'Antonio',Helvetica] text-white text-5xl md:text-6xl tracking-[-0.02em] leading-none">
            <Link to="/" className="hover:opacity-90" aria-label="Zur Startseite">
              Sabine Hansen
            </Link>
          </h1>
          <nav className="flex items-center gap-[72px] [font-family:'Antonio',Helvetica]">
            {navigationItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.href}
                ref={item.label === "Kontakt" ? (kontaktRef as any) : undefined}
                className={({ isActive }) =>
                  [
                    "text-[16px] font-thin px-0",
                    "hover:text-[#854686] hover:bg-transparent",
                    isActive ? "text-[#854686]" : "text-white",
                  ].join(" ")
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
    </div>
  );
};
