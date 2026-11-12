"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { EnquiryButton } from "@/components/EnquiryModal";
import { SocialIcon, WhatsappIcon } from "@/components/ui/icons";

const BTN =
  "inline-flex items-center justify-center gap-[11px] px-[34px] py-[17px] font-nav text-[11px] font-semibold uppercase tracking-[0.17em] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

const LIST_LINK =
  "inline-block text-start text-[14px] leading-[1.4] text-white/85 transition-[color,transform] duration-300 hover:translate-x-[5px] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

export default function Footer({ data }) {
  const { logo, tagline, actions, columns, social, bottom } = data;
  const pathname = usePathname();
  const ref = useRef(null);

  // Desktop detect (>= 1024px). Initial false rakha hai taaki SSR/hydration match rahe.
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => setDesktop(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Curtain reveal sirf home page + desktop par
  const reveal = pathname === "/" && desktop;

  useEffect(() => {
    const el = ref.current;
    if (!el || !reveal) return;
    const root = document.documentElement;
    let raf = 0;
    let h = 0;

    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const left = root.scrollHeight - window.innerHeight - window.scrollY;
        const p = h > 0 ? Math.min(1, Math.max(0, 1 - left / h)) : 1;
        el.style.setProperty("--ft-p", p.toFixed(4));
      });
    };

    const measure = () => {
      h = el.offsetHeight;
      root.style.setProperty("--footer-h", `${h}px`);
      update();
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", update);
      root.style.removeProperty("--footer-h");
    };
  }, [reveal]);

  return (
    <footer
  ref={ref}
  data-testid="site-footer"
  className={`hidden bg-[#100f0d] font-nav text-white lg:block ${
    reveal
      ? "fixed inset-x-0 bottom-0 z-0 will-change-transform"
      : "relative z-20"
  }`}
  style={reveal ? { transform: "translate3d(0, calc((1 - var(--ft-p, 0)) * 56px), 0)" } : undefined}
>
      {/* TOP: logo + tagline + actions */}
      <div className="flex flex-wrap items-end justify-between gap-[clamp(28px,5vw,80px)] border-b border-white/10 px-[clamp(22px,5vw,88px)] pb-[clamp(32px,5vh,80px)] pt-[clamp(40px,7vh,110px)]">
        <div className="min-w-[min(300px,100%)] flex-1 basis-[390px]">
          <Link href="/" aria-label={logo.alt}>
            <Image
              src={logo.src}
              alt={logo.alt}
              width={140}
              height={48}
              className="h-[clamp(28px,3.6vw,52px)] w-auto brightness-0 invert"
            />
          </Link>
          {tagline && (
            <p className="mb-0 mt-[clamp(24px,3vw,40px)] max-w-[20em] font-serif text-[clamp(24px,2.6vw,38px)] leading-[1.08] text-white">
              {tagline}
            </p>
          )}
        </div>

        <div data-testid="site-footer-actions" className="hidden flex-wrap gap-3.5 sm:flex">
          {actions.map((a) => {
            const cls = `${BTN} ${
              a.variant === "solid"
                ? "border border-[#f1ede4] bg-[#f1ede4] text-[#100f0d] transition-opacity hover:opacity-85"
                : "border border-white/35 bg-transparent text-white transition-colors hover:bg-white/10"
            }`;
            return a.action === "enquire" ? (
              <EnquiryButton key={a.label} source="footer" data-testid="site-footer-action" className={cls}>
                {a.label}
              </EnquiryButton>
            ) : (
              <a
                key={a.label}
                href={a.href}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="site-footer-action"
                className={cls}
              >
                {a.icon === "whatsapp" && <WhatsappIcon size={14} />}
                <span>{a.label}</span>
              </a>
            );
          })}
        </div>
      </div>

      {/* COLUMNS (desktop; mobile par ye More sheet me hain) */}
      <div data-testid="site-footer-columns" className="hidden flex-wrap border-b border-white/10 lg:flex">
        {columns.map((col) => (
          <nav
            key={col.title}
            aria-label={col.title}
            data-testid="site-footer-column"
            className="min-w-[150px] shrink grow basis-[230px] border-e border-white/[0.12] px-[clamp(20px,4vw,60px)] py-[clamp(26px,5.2vw,72px)]"
          >
            <p className="m-0 mb-4 text-[10px] font-semibold uppercase tracking-[0.26em] text-white/50">{col.title}</p>
            <ul className="m-0 flex list-none flex-col items-start gap-[11px] p-0">
              {col.links
                .filter((l) => !l.mobileOnly)
                .map((l) => (
                  <li key={l.label}>
                    {l.action === "enquire" ? (
                      <EnquiryButton source="footer-link" className={LIST_LINK}>
                        {l.label}
                      </EnquiryButton>
                    ) : (
                      <Link
                        href={l.href}
                        data-testid="site-footer-link"
                        className={LIST_LINK}
                        {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
            </ul>
          </nav>
        ))}

        <div className="min-w-[240px] shrink grow basis-[300px] px-[clamp(20px,4vw,60px)] py-[clamp(26px,5.2vw,72px)]">
          <ul data-testid="site-footer-social" className="m-0 flex list-none flex-wrap items-center gap-3.5 p-0" aria-label="Social">
            {social.map((s) => (
              <li key={s.name}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  aria-label={s.label}
                  className="grid size-11 place-items-center rounded-full border border-white/20 bg-white/[0.03] transition duration-300 hover:-translate-y-[3px] hover:scale-105 hover:bg-white hover:text-black"
                >
                  <SocialIcon name={s.name} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="flex flex-wrap items-center gap-x-[30px] gap-y-4 px-[clamp(22px,5vw,88px)] py-[clamp(22px,3.4vw,44px)]">
        <Link
          href={bottom.exploreAll.href}
          data-testid="site-footer-explore-all"
          className="hidden items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] hover:text-white/80 lg:inline-flex"
        >
          {bottom.exploreAll.label}
          <span aria-hidden="true">→</span>
        </Link>

        <p data-testid="site-footer-copyright" className="m-0 text-xs text-white/45 lg:ms-auto">
          {bottom.copyright}
        </p>

        <div data-testid="site-footer-legal" className="flex flex-wrap items-center gap-x-[22px] gap-y-3 text-xs">
          {bottom.legal.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              data-testid="site-footer-legal-link"
              className="text-white/55 transition-colors hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}