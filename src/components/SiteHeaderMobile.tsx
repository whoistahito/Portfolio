import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { MobileNavigation } from "./MobileNavigation";

export default function SiteHeaderMobile(): JSX.Element {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const focusableSelector = 'a, button, [tabindex]:not([tabindex="-1"])';
    const getFocusable = () => Array.from(nav.querySelectorAll<HTMLElement>(focusableSelector)).filter((el) => !el.hasAttribute('disabled'));

    const onKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === 'Escape') {
        setOpen(false);
      }
      if (e.key === 'Tab') {
        // simple focus trap
        const focusable = getFocusable();
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            last.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === last) {
            first.focus();
            e.preventDefault();
          }
        }
      }
    };

    if (open) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', onKey);
      // Close on click outside
      const onClick = (e: MouseEvent) => {
        const target = e.target as Node | null;
        // if click is inside nav, do nothing
        if (target && nav.contains(target)) return;
        // if click is the toggle button or inside the header, ignore (user toggled)
        if (btnRef.current && target && btnRef.current.contains(target)) return;
        const header = nav.closest('header');
        if (header && target && header.contains(target)) return;
        setOpen(false);
      };
      document.addEventListener('click', onClick);

      // Close on scroll
      const onScroll = () => setOpen(false);
      window.addEventListener('scroll', onScroll);

      // Focus first link when opened
      const focusable = getFocusable();
      if (focusable.length > 0) focusable[0].focus();

      return () => {
        document.removeEventListener('keydown', onKey);
        document.body.style.overflow = prevOverflow;
        document.removeEventListener('click', onClick);
        window.removeEventListener('scroll', onScroll);
      };
    }

    // cleanup in case nav closes
    return () => {};
  }, [open]);

  return (
    // Use sticky so header remains in normal flow and expands the layout when nav opens.
      <>
  <header className="fixed top-0 left-0 right-0 z-50 bg-[#af8f5b] shadow w-full">
  <div className="w-full flex sm:h-14 h-12 items-center justify-between px-4">
          <h1 className="[font-family:'Antonio',Helvetica] text-white text-2xl">
            <Link to="/" className="hover:opacity-90" aria-label="Zur Startseite">Sabine Hansen</Link>
          </h1>
          <button
            aria-expanded={open}
            aria-label={open ? "Schließe Navigation" : "Öffne Navigation"}
      className="text-white text-2xl h-10 w-10 flex items-center justify-center px-0 leading-none m-0"
            onClick={() => setOpen((v) => !v)}
            ref={btnRef}
          >
            {open ? '✕' : '☰'}
          </button>
        </div>


  {/* Sliding nav (rendered only when open) */}
        {open && (
          <MobileNavigation isOpen={open} onClose={() => setOpen(false)} inline={true} refNav={navRef} />
        )}
  </header>
    </>
  );
}
