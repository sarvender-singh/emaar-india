"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { EnquiryButton } from "@/components/EnquiryModal";
import FooterPageDetails from "@/components/FooterPageDetails";
import FooterPreferences from "@/components/privacy/FooterPreferences";
import { SocialIcon, WhatsappIcon } from "@/components/ui/icons";

const BUTTON_CLASS =
  "inline-flex min-h-12 items-center justify-center gap-3 whitespace-nowrap " +
  "border px-8 py-4 font-nav text-[11.5px] font-semibold uppercase " +
  "leading-none tracking-[0.17em] transition-colors " +
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

const LINK_CLASS =
  "inline-block text-start font-sans text-[16px] font-normal leading-[1.5] " +
  "text-[#bcb9b4] transition-[color,transform] duration-300 " +
  "hover:translate-x-[5px] hover:text-white " +
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

const COLUMN_CLASS =
  "min-w-0 px-[clamp(24px,4vw,64px)] py-[clamp(42px,5vw,80px)]";

export default function Footer({ data }) {
  const pathname = usePathname();
  const footerRef = useRef(null);
  const isHome = pathname === "/";

  const {
    logo,
    tagline,
    actions = [],
    columns = [],
    social = [],
    bottom,
  } = data;

  const exploreHref =
    bottom.exploreAll.href === "/sitemap"
      ? "/html-sitemap"
      : bottom.exploreAll.href;

  useEffect(() => {
    const footer = footerRef.current;
    if (!isHome || !footer) return;

    function measureFooter() {
      // Short footer sits at the viewport bottom. A tall footer first
      // reveals its top, then scrolls naturally with the document.
      const inset = Math.min(0, window.innerHeight - footer.offsetHeight);
      footer.style.setProperty("--footer-reveal-bottom", `${inset}px`);
    }

    measureFooter();

    const observer = new ResizeObserver(measureFooter);
    observer.observe(footer);
    window.addEventListener("resize", measureFooter);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measureFooter);
      footer.style.removeProperty("--footer-reveal-bottom");
    };
  }, [isHome]);

  function handleDetailsToggle(event) {
    const wrapper = event.currentTarget;
    const details = event.target;

    // Only the centre arrow opens the outer disclosure.
    // FAQ questions inside it can be expanded independently.
    if (
      !(details instanceof HTMLDetailsElement) ||
      details !== wrapper.querySelector("details") ||
      !details.open
    ) {
      return;
    }

    requestAnimationFrame(() => {
      const footer = footerRef.current;
      if (!footer || !details.isConnected || !details.open) return;

      // Apply the expanded height before measuring the visible content.
      if (isHome) {
        const inset = Math.min(0, window.innerHeight - footer.offsetHeight);
        footer.style.setProperty("--footer-reveal-bottom", `${inset}px`);
      }

      const summary = details.querySelector(":scope > summary");
      if (!summary) return;

      const summaryBottom = summary.getBoundingClientRect().bottom;
      const contentHeight = details.getBoundingClientRect().bottom - summaryBottom;
      const visibleBelow = Math.max(0, window.innerHeight - summaryBottom);
      const previewHeight = Math.min(160, contentHeight);
      const distance = Math.max(0, previewHeight - visibleBelow);

      if (distance < 1) return;

      window.scrollBy({
        top: distance,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
    });
  }

  return (
    <footer
      ref={footerRef}
      data-testid="site-footer"
      className={[
        "hidden w-full bg-[#100f0d] text-white lg:block",
        isHome
          ? "relative z-0 lg:motion-safe:sticky lg:motion-safe:bottom-[var(--footer-reveal-bottom,0px)]"
          : "relative z-20",
      ].join(" ")}
    >
      {/* Logo and contact actions */}
      <div className="flex flex-wrap items-end justify-between gap-8 border-b border-white/10 px-[5vw] pb-[clamp(32px,4vw,60px)] pt-[clamp(48px,5vw,80px)]">
        <div className="min-w-0">
          <Link href="/" aria-label={logo.alt} className="inline-block">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={240}
              height={82}
              className="h-[clamp(42px,4.2vw,72px)] w-auto brightness-0 invert"
            />
          </Link>

          {tagline && (
            <p className="mb-0 mt-7 max-w-[20em] font-serif text-[clamp(28px,2.6vw,44px)] font-normal leading-[1.1]">
              {tagline}
            </p>
          )}
        </div>

        <div
          data-testid="site-footer-actions"
          className="flex flex-wrap items-center gap-4"
        >
          {actions.map((action) => {
            const variantClass =
              action.variant === "solid"
                ? "border-[#f1ede4] bg-[#f1ede4] text-[#100f0d] hover:bg-white"
                : "border-white/40 bg-transparent text-white hover:border-white hover:bg-white/10";

            const className = `${BUTTON_CLASS} ${variantClass}`;

            if (action.action === "enquire") {
              return (
                <EnquiryButton
                  key={action.label}
                  source="footer"
                  data-testid="site-footer-action"
                  className={className}
                >
                  {action.label}
                </EnquiryButton>
              );
            }

            return (
              <a
                key={action.label}
                href={action.href}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="site-footer-action"
                className={className}
              >
                {action.icon === "whatsapp" && <WhatsappIcon size={14} />}
                <span>{action.label}</span>
              </a>
            );
          })}
        </div>
      </div>

      {/* Navigation and social links */}
      <div
        data-testid="site-footer-columns"
        className="grid grid-cols-4 border-b border-white/10"
      >
        {columns.map((column) => (
          <nav
            key={column.title}
            aria-label={column.title}
            data-testid="site-footer-column"
            className={`${COLUMN_CLASS} border-e border-white/10`}
          >
            <p className="m-0 mb-5 font-nav text-[11px] font-semibold uppercase leading-[1.4] tracking-[0.22em] text-white/60">
              {column.title}
            </p>

            <ul className="m-0 flex list-none flex-col items-start gap-3 p-0">
              {column.links
                .filter((link) => !link.mobileOnly)
                .map((link) => (
                  <li key={link.label}>
                    {link.action === "enquire" ? (
                      <EnquiryButton source="footer-link" className={LINK_CLASS}>
                        {link.label}
                      </EnquiryButton>
                    ) : (
                      <Link
                        href={link.href}
                        data-testid="site-footer-link"
                        className={LINK_CLASS}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noopener noreferrer" : undefined}
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
            </ul>
          </nav>
        ))}

        <div className={COLUMN_CLASS}>
          <ul
            aria-label="Social"
            data-testid="site-footer-social"
            className="m-0 flex list-none flex-wrap items-center gap-3 p-0"
          >
            {social.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  aria-label={item.label}
                  className="grid size-11 place-items-center rounded-full border border-white/20 bg-white/[0.03] text-white/80 transition-colors hover:border-white hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  <SocialIcon name={item.name} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Copyright, sitemap and legal links */}
      <div className="flex flex-wrap items-center gap-x-7 gap-y-4 px-[5vw] py-[clamp(28px,3.5vw,54px)]">
        <Link
          href={exploreHref}
          data-testid="site-footer-explore-all"
          className="inline-flex items-center gap-3 font-nav text-[11.5px] font-semibold uppercase tracking-[0.17em] text-white/90 transition-colors hover:text-white"
        >
          {bottom.exploreAll.label}
          <span aria-hidden="true">→</span>
        </Link>

        <p
          data-testid="site-footer-copyright"
          className="m-0 ms-auto font-sans text-[13px] leading-[1.5] text-white/55"
        >
          {bottom.copyright}
        </p>

        <div
          data-testid="site-footer-legal"
          className="flex flex-wrap items-center gap-x-5 gap-y-3 font-sans text-[13px] leading-[1.5]"
        >
          {bottom.legal.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              data-testid="site-footer-legal-link"
              className="text-white/60 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}

          <FooterPreferences />
        </div>
      </div>

      {/* Page-specific keywords and home FAQ */}
      <div key={pathname} onToggleCapture={handleDetailsToggle}>
        <FooterPageDetails data={data} footer={data} pathname={pathname} />
      </div>
    </footer>
  );
}