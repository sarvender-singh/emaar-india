"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { PhoneIcon, WhatsappIcon } from "@/components/ui/icons";
import { useEnquiry } from "@/components/EnquiryModal";
import {
  INTRO_EVENT,
  T,
  markIntroDone,
  shouldPlayIntro,
} from "@/components/intro/introConfig";

import HeaderSearch, { SearchIcon } from "./header/HeaderSearch";
import "./header/header-search.css";

const NAV_LINK =
  "hdr-reveal hdr-link flex items-center gap-2 bg-transparent px-px pt-1.5 pb-[7px] font-nav text-[11.5px] font-semibold uppercase tracking-[0.13em] whitespace-nowrap text-current no-underline cursor-pointer";

export default function Header({ data }) {
  const { logo, nav = [], contact } = data;
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { openEnquiry } = useEnquiry();

  const [phase, setPhase] = useState("pre");
  const [bg, setBg] = useState(isHome ? "top" : "solid");
  const [searchView, setSearchView] = useState(null);
  const [mega, setMega] = useState(null);

  const logoRef = useRef(null);
  const headerRef = useRef(null);
  const closeTimer = useRef(null);

  // Home loader aur header logo animation
  useLayoutEffect(() => {
    const el = logoRef.current;

    if (!el || !shouldPlayIntro(isHome)) {
      markIntroDone();
      setPhase("done");
      return;
    }

    el.style.transition = "none";
    el.style.transform = "none";
    el.style.opacity = "0";

    const rect = el.getBoundingClientRect();
    const scale = Math.min(window.innerWidth * 0.6, 440) / rect.width;
    const dx =
      document.documentElement.clientWidth / 2 -
      (rect.left + rect.width / 2);
    const dy = window.innerHeight / 2 - (rect.top + rect.height / 2);

    document.documentElement.style.setProperty(
      "--intro-logo-h",
      `${rect.height * scale}px`
    );

    el.style.transformOrigin = "center";
    el.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
    setPhase("intro");

    const fadeIn = setTimeout(() => {
      el.style.transition = `opacity ${T.logoIn}ms ease`;
      el.style.opacity = "1";
    }, 60);

    let done;

    const fly = () => {
      el.style.transition = `transform ${T.flyDur}ms cubic-bezier(.77,0,.18,1)`;
      el.style.transform = "none";

      done = setTimeout(() => {
        el.style.transition = "";
        el.style.transformOrigin = "";
        el.style.opacity = "";
        setPhase("done");
      }, T.flyDur);
    };

    window.addEventListener(INTRO_EVENT, fly, { once: true });

    return () => {
      clearTimeout(fadeIn);
      clearTimeout(done);
      window.removeEventListener(INTRO_EVENT, fly);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scroll position ke hisaab se header background
  useEffect(() => {
    const update = () => {
      const hero = document.getElementById("top");

      if (!hero) {
        setBg("solid");
        return;
      }

      const y = window.scrollY;
      const end = hero.offsetHeight - (headerRef.current?.offsetHeight ?? 0);

      setBg(y >= end ? "solid" : y > 8 ? "glass" : "top");
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  useEffect(() => {
    setMega(null);
    setSearchView(null);
  }, [pathname]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") setMega(null);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const find = () => {
      setMega(null);
      setSearchView("filters");
    };

    window.addEventListener("emaar:header-find-home", find);
    return () => window.removeEventListener("emaar:header-find-home", find);
  }, []);

  const cancelClose = () => clearTimeout(closeTimer.current);

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setMega(null), 120);
  };

  const openMega = (label) => {
    cancelClose();
    setMega(label);
  };

  const state = mega ? "solid" : bg;

  return (
    <>
      <header
        ref={headerRef}
        data-testid="site-header"
        data-state={state}
        data-ready={phase === "done"}
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
        className="site-header eh-header fixed inset-x-0 top-0 z-50 h-[var(--hdr-h)]"
      >
        <div className="mx-auto flex h-full items-center justify-between gap-[clamp(14px,2vw,34px)] px-[clamp(20px,4vw,64px)]">
          <div className="flex h-full items-center gap-[14px]">
            <Link
              ref={logoRef}
              href="/"
              aria-label={logo.alt}
              data-testid="site-header-brand"
              className={`block shrink-0 will-change-transform ${
                phase === "pre" ? "invisible" : ""
              }`}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={120}
                height={40}
                priority
                className="hdr-logo h-[34px] w-auto object-contain lg:h-[38px]"
              />
            </Link>

            <span
              aria-hidden="true"
              style={{ "--i": 0 }}
              className="hdr-reveal mr-[14px] hidden h-5 w-px bg-current opacity-40 lg:block"
            />

            <nav
              aria-label="Primary"
              data-testid="site-header-nav"
              data-mega={mega ? "1" : "0"}
              className="hdr-nav hidden h-full items-center gap-[clamp(18px,1.9vw,30px)] lg:flex"
            >
              {nav.map((item, index) => {
                if (item.mega) {
                  const open = mega === item.label;
                  const panelId = `eh-menu-${index}`;

                  const triggerProps = {
                    className: NAV_LINK,
                    style: { "--i": index + 1 },
                    "aria-expanded": open,
                    "aria-controls": panelId,
                    "aria-haspopup": "true",
                    "data-active": open,
                    "data-testid": "site-header-mega-trigger",
                    onMouseEnter: () => openMega(item.label),
                    onFocus: () => openMega(item.label),
                    onKeyDown: (event) => {
                      if (event.key !== "ArrowDown") return;

                      event.preventDefault();
                      openMega(item.label);

                      requestAnimationFrame(() => {
                        document
                          .getElementById(panelId)
                          ?.querySelector("a")
                          ?.focus();
                      });
                    },
                  };

                  return item.href ? (
                    <Link key={item.label} href={item.href} {...triggerProps}>
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => openMega(item.label)}
                      {...triggerProps}
                    >
                      {item.label}
                    </button>
                  );
                }

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    data-testid="site-header-nav-link"
                    onMouseEnter={() => setMega(null)}
                    style={{ "--i": index + 1 }}
                    className={NAV_LINK}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="eh-actions hdr-reveal" data-testid="site-header-actions">
            <button
              type="button"
              className="eh-action eh-label"
              aria-label="Search Emaar"
              aria-haspopup="dialog"
              onClick={() => {
                setMega(null);
                setSearchView("search");
              }}
            >
              <SearchIcon />
              <span className="eh-search-label">Search</span>
            </button>

            <button
              type="button"
              className="eh-touch eh-label hdr-cta"
              aria-haspopup="dialog"
              data-testid="site-header-cta"
              onClick={() => openEnquiry("header")}
            >
              {contact.ctaLabel}
            </button>

            <a
              className="eh-action"
              href={contact.phone}
              aria-label="Call Emaar"
              data-testid="site-header-call"
            >
              <PhoneIcon size={18} />
            </a>

            <a
              className="eh-action"
              href={contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              data-testid="site-header-whatsapp"
            >
              <WhatsappIcon size={20} />
            </a>
          </div>
        </div>
      </header>

      {searchView && (
        <HeaderSearch
          key={pathname}
          logo={logo}
          initialView={searchView}
          onClose={() => setSearchView(null)}
        />
      )}

      <div
        aria-hidden="true"
        onClick={() => setMega(null)}
        className={`fixed inset-x-0 bottom-0 top-[var(--hdr-h)] z-40 hidden bg-black/40 transition-opacity duration-300 lg:block ${
          mega ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {nav.map((item, index) => {
        const panel = item.mega;
        if (!panel) return null;

        return (
          <div
            key={item.label}
            id={`eh-menu-${index}`}
            role="region"
            aria-label={item.label}
            data-testid="site-header-mega-panel"
            data-open={mega === item.label}
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
            className="mega-panel hidden lg:block"
          >
            <div className="mx-auto max-w-[1500px] px-[clamp(20px,4vw,64px)] pb-[clamp(40px,4.2vw,58px)] pt-[clamp(34px,3.6vw,50px)]">
              <div className="mb-[clamp(24px,2.6vw,34px)] flex items-baseline gap-5">
                <p className="m-0 whitespace-nowrap font-nav text-[10px] font-semibold uppercase tracking-[0.3em] text-white/60">
                  {panel.eyebrow}
                </p>
                <span className="h-px flex-1 bg-white/15" aria-hidden="true" />
                {panel.meta && (
                  <p className="m-0 whitespace-nowrap text-[12.5px] text-white/55">
                    {panel.meta}
                  </p>
                )}
              </div>

              <div className="flex flex-nowrap gap-[clamp(30px,4vw,84px)]">
                {panel.columns.map((column, columnIndex) => (
                  <div
                    key={column.title}
                    className="mega-item min-w-[11.25rem] shrink"
                    style={{ "--i": columnIndex }}
                  >
                    <p className="mb-5 mt-0 font-nav text-[9.5px] font-semibold uppercase tracking-[0.26em] text-white/60">
                      {column.title}
                    </p>

                    <div className="flex flex-col items-start gap-[15px]">
                      {column.links.map((link) => (
                        <Link
                          key={link.href + link.label}
                          href={link.href}
                          className="mega-link flex flex-col items-start gap-1 text-[15.5px] leading-[1.2] text-white"
                        >
                          <span>{link.label}</span>
                          {link.sub && (
                            <span className="whitespace-nowrap text-[11px] text-white/50">
                              {link.sub}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}

                {panel.feature && (
                  <div
                    className="mega-item ms-auto w-[min(22.5rem,100%)] min-w-[12.5rem] shrink"
                    style={{ "--i": panel.columns.length }}
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#26241f]">
                      <Image
                        src={panel.feature.image}
                        alt={panel.feature.alt || panel.feature.title}
                        fill
                        sizes="360px"
                        className="object-cover"
                      />
                    </div>

                    <div className="mt-4 flex items-baseline justify-between gap-3.5">
                      <div>
                        <p className="m-0 font-nav text-[9.5px] font-semibold uppercase tracking-[0.22em] text-white/60">
                          {panel.feature.eyebrow}
                        </p>
                        <p className="mb-0 mt-[5px] font-serif text-[20px] leading-[1.1] text-white">
                          {panel.feature.title}
                        </p>
                        <p className="mb-0 mt-[3px] text-[12.5px] text-white/60">
                          {panel.feature.subtitle}
                        </p>
                      </div>

                      <Link
                        href={panel.feature.href}
                        className="mega-cta flex-none whitespace-nowrap border-b border-white/50 pb-[3px] font-nav text-[10.5px] font-semibold uppercase tracking-[0.16em] text-white"
                      >
                        {panel.feature.cta}
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}