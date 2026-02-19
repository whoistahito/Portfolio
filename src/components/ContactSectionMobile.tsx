import type { CSSProperties, HTMLAttributes } from "react";

type ContactSectionMobileProps = HTMLAttributes<HTMLElement> & {
  style?: CSSProperties;
  showName?: boolean;
  showLocation?: boolean;
};

/**
 * Mobile-sized contact block used across mobile pages.
 * Fully fluid — width is inherited from the parent container.
 */
export function ContactSectionMobile({
  className = "",
  style,
  showName = true,
  showLocation = true,
  ...rest
}: ContactSectionMobileProps): JSX.Element {
  return (
    <section
      className={[
        "flex flex-col items-center justify-start w-full py-6 gap-2.5",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
      {...rest}
    >
      <div className="flex flex-col items-center gap-2 w-full max-w-[280px]">
        {showName && (
          <div className="w-full [font-family:'Antonio',Helvetica] font-normal text-black text-3xl text-center tracking-[-0.48px] leading-[1.2]">
            Sabine Hansen
          </div>
        )}

        {showLocation && (
          <div className="w-full [font-family:'Antonio',Helvetica] font-normal text-black text-xl text-center tracking-[-0.12px] leading-[1.3]">
            Schwentinental, Deutschland
          </div>
        )}

        <div className="w-full [font-family:'Antonio',Helvetica] font-normal text-black text-lg text-center tracking-[-0.08px] leading-[1.3]">
          <a
            href="mailto:kontakt@sabinehansen.art"
            rel="noopener noreferrer"
            target="_blank"
            className="underline text-black hover:text-[#854686] transition-colors"
          >
            kontakt@sabinehansen.art
          </a>
        </div>
      </div>

      {/* Instagram icon */}
      <div className="flex justify-center mt-4">
        <a
          href="https://www.instagram.com/sabinehansen.art/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram – sabinehansen.art"
          title="Instagram"
          className="inline-flex items-center justify-center text-black hover:text-[#854686] transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 24 24"
            role="img"
          >
            <rect
              x="3"
              y="3"
              width="18"
              height="18"
              rx="4"
              ry="4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle
              cx="12"
              cy="12"
              r="4.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle cx="17" cy="7" r="1.2" fill="currentColor" />
          </svg>
        </a>
      </div>
    </section>
  );
}

export default ContactSectionMobile;
