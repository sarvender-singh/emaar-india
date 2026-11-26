"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useEnquiry } from "@/components/EnquiryModal";
import FooterPageDetails from "@/components/FooterPageDetails";
import FooterPreferences from "@/components/privacy/FooterPreferences";
import { DockIcon, PhoneIcon, SocialIcon, WhatsappIcon } from "@/components/ui/icons";

const dockItemClass =
  "relative flex h-full w-full flex-col items-center justify-center gap-1 font-nav text-[8.5px] uppercase tracking-[0.14em] text-white/55 transition-colors data-[selected=true]:text-white";

const sheetLinkClass =
  "flex min-h-11 w-full items-center text-start font-sans text-[15px] font-normal leading-[1.45] text-[#c4c0b9] transition-colors hover:text-white";

export default function MobileDock({ header, footer }) {
  const { dock = [], dockSearch, mobileMenu = [], logo, contact } = header;
  const pathname = usePathname();
  const { openEnquiry } = useEnquiry();

  const [more, setMore] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    setMore(false);
  }, [pathname]);

  useEffect(() => {
    if (!more) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event) => {
      if (event.key === "Escape") setMore(false);
    };

    const desktopMedia = window.matchMedia("(min-width: 1024px)");
    const onBreakpoint = () => {
      if (desktopMedia.matches) setMore(false);
    };

    window.addEventListener("keydown", onKey);
    desktopMedia.addEventListener("change", onBreakpoint);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      desktopMedia.removeEventListener("change", onBreakpoint);
    };
  }, [more]);

  const showPill = pathname === "/" && !scrolled && !more && dockSearch;

  const sitemapHref =
    footer.bottom.exploreAll.href === "/sitemap"
      ? "/html-sitemap"
      : footer.bottom.exploreAll.href;

  function enquireFromSheet() {
    setMore(false);
    openEnquiry("mobile-more");
  }

  function isSelected(item) {
    if (item.type === "more") return more;
    if (item.type !== "link") return false;
    if (item.href === "/") return pathname === "/";

    return pathname === item.href || pathname?.startsWith(`${item.href}/`);
  }

  return (
    <>
      {/* Floating contact buttons */}
      {!more && (
        <div
          role="group"
          aria-label="Contact Emaar"
          className="fixed right-4 bottom-[calc(var(--dock-h)+12px+env(safe-area-inset-bottom,0px))] z-[55] flex flex-col items-center gap-3 lg:right-6 lg:bottom-30"
        >
          <a
            href={contact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            data-testid="mobile-whatsapp-fab"
            className="grid size-12 place-items-center rounded-full bg-[#25D366] text-white shadow-md"
          >
            <WhatsappIcon size={25} />
          </a>

          <a
            href={contact.phone}
            aria-label="Call Emaar"
            data-testid="floating-call-button"
            className="grid size-12 place-items-center rounded-full border border-black/10 bg-[#faf8f4] text-[#181818] shadow-md"
          >
            <PhoneIcon size={22} />
          </a>
        </div>
      )}

      {/* Mobile bottom dock */}
      <nav
        aria-label="Mobile"
        data-testid="mobile-dock"
        data-pose={showPill ? "search" : "nav"}
        className="fixed inset-x-0 bottom-0 z-[60] lg:hidden"
      >
        {showPill ? (
          <div className="bg-gradient-to-t from-black/75 to-transparent px-4 pb-[calc(12px+env(safe-area-inset-bottom,0px))] pt-8">
            <button
              type="button"
              onClick={() =>
                window.dispatchEvent(new Event("emaar:header-find-home"))
              }
              data-testid="mobile-dock-search-pill"
              className="flex h-12 w-full items-center gap-3 border border-white/30 bg-black/30 px-4 text-left text-white backdrop-blur-md transition-colors hover:bg-black/40"
            >
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="6.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <path
                  d="M16.2 16.2 21 21"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>

              <span className="flex-1 truncate text-sm">{dockSearch.label}</span>
              <span className="font-nav text-[11px] font-semibold uppercase tracking-[0.18em]">
                {dockSearch.cta}
              </span>
            </button>
          </div>
        ) : (
          <div className="border-t border-white/10 bg-[rgba(11,10,9,0.94)] pb-[env(safe-area-inset-bottom,0px)] backdrop-blur-xl">
            <ul className="grid h-[var(--dock-h)] grid-cols-5">
              {dock.map((item) => {
                const selected = isSelected(item);

                const content = (
                  <>
                    {selected && (
                      <span
                        aria-hidden="true"
                        className="absolute left-1/2 top-0 h-[2px] w-8 -translate-x-1/2 bg-white/80"
                      />
                    )}

                    <DockIcon name={item.key} />
                    <span>{item.label}</span>
                  </>
                );

                return (
                  <li key={item.key}>
                    {item.type === "link" ? (
                      <Link
                        href={item.href}
                        data-testid={`mobile-dock-${item.key}`}
                        data-selected={selected}
                        aria-current={selected ? "page" : undefined}
                        className={dockItemClass}
                      >
                        {content}
                      </Link>
                    ) : (
                      <button
                        type="button"
                        data-testid={`mobile-dock-${item.key}`}
                        data-selected={selected}
                        aria-haspopup="dialog"
                        aria-expanded={item.type === "more" ? more : undefined}
                        onClick={() => {
                          if (item.type === "more") {
                            setMore(true);
                          } else {
                            openEnquiry("mobile-dock");
                          }
                        }}
                        className={dockItemClass}
                      >
                        {content}
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </nav>

      {/* Mobile More sheet */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!more}
        data-testid="mobile-more-sheet"
        data-open={more}
        className={`fixed inset-0 z-[80] flex flex-col overflow-y-auto overscroll-contain bg-[#0b0a09] text-white transition-all duration-500 lg:hidden ${
          more
            ? "visible translate-y-0 opacity-100"
            : "invisible translate-y-4 opacity-0"
        }`}
      >
        <div className="sticky top-0 z-10 flex flex-none items-center justify-between bg-gradient-to-b from-[#0b0a09] from-60% to-transparent px-6 pb-5 pt-[calc(1.15rem+env(safe-area-inset-top,0px))]">
          <Image
            src={logo.src}
            alt={logo.alt}
            width={96}
            height={32}
            className="h-8 w-auto brightness-0 invert"
          />

          <button
            type="button"
            aria-label="Close menu"
            data-testid="mobile-more-sheet-close"
            onClick={() => setMore(false)}
            className="-me-2 grid size-12 place-items-center border border-white/20 hover:bg-white/10"
          >
            <svg
              viewBox="0 0 12 12"
              width="14"
              height="14"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="m1.5 1.5 9 9m0-9-9 9"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="flex flex-1 flex-col px-6 pb-[calc(2.5rem+env(safe-area-inset-bottom,0px))]">
          <nav aria-label="Main menu" className="grid border-t border-white/10">
            {mobileMenu.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMore(false)}
                data-testid="mobile-more-sheet-nav-link"
                aria-current={link.href === pathname ? "page" : undefined}
                className="flex min-h-[4.1rem] items-center justify-between border-b border-white/10 font-serif text-[22px] text-white/80 transition-colors hover:text-white aria-[current]:text-white"
              >
                {link.label}

                <svg
                  viewBox="0 0 8 12"
                  width="8"
                  height="12"
                  fill="none"
                  aria-hidden="true"
                  className="opacity-50"
                >
                  <path
                    d="m1.5 1 5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                </svg>
              </Link>
            ))}
          </nav>

          <div className="grid grid-cols-2 gap-x-5 gap-y-9 pt-10">
            {footer.columns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <p className="m-0 mb-2 font-nav text-[10px] font-semibold uppercase tracking-[0.24em] text-[#a6a29c]">
                  {column.title}
                </p>

                <div className="grid">
                  {column.links.map((link) =>
                    link.action === "enquire" ? (
                      <button
                        key={link.label}
                        type="button"
                        onClick={enquireFromSheet}
                        className={sheetLinkClass}
                      >
                        {link.label}
                      </button>
                    ) : (
                      <Link
                        key={link.label}
                        href={link.href}
                        className={sheetLinkClass}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noopener noreferrer" : undefined}
                        onClick={link.external ? undefined : () => setMore(false)}
                      >
                        {link.label}
                      </Link>
                    )
                  )}
                </div>
              </nav>
            ))}
          </div>

          <Link
            href={sitemapHref}
            onClick={() => setMore(false)}
            className="mt-11 flex min-h-14 items-center justify-between border border-white/20 px-4 font-nav text-[11px] font-semibold uppercase tracking-[0.2em] hover:bg-white/10"
          >
            <span>{footer.bottom.exploreAll.label}</span>
            <span aria-hidden="true">→</span>
          </Link>

          <ul
            aria-label="Social"
            className="m-0 flex list-none flex-wrap gap-3.5 p-0 pt-10"
          >
            {footer.social.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  aria-label={item.label}
                  className="grid size-11 place-items-center rounded-full border border-white/20 bg-white/[0.03] hover:bg-white hover:text-black"
                >
                  <SocialIcon name={item.name} />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 pb-4 pt-8 text-[13px] text-white/70">
            {footer.bottom.legal.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMore(false)}
                className="inline-flex min-h-11 items-center hover:text-white"
              >
                {link.label}
              </Link>
            ))}

            <FooterPreferences onNavigate={() => setMore(false)} />

            <p className="m-0 w-full text-xs leading-relaxed text-white/55">
              {footer.bottom.copyright}
            </p>
          </div>

          {more && <FooterPageDetails />}
        </div>
      </div>
    </>
  );
}