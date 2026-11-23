"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const STORAGE_KEY = "emaar-india-cookie-consent";

export default function CookieBanner() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      setVisible(localStorage.getItem(STORAGE_KEY) !== "accepted");
    } catch {
      setVisible(true);
    }
  }, []);

  function acceptCookies() {
    setVisible(false);

    try {
      localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {
      // Storage unavailable. The banner still closes for this visit.
    }
  }

  if (!visible || pathname === "/privacy-policy") return null;

  const buttonClass =
    "inline-flex min-h-11 items-center justify-center rounded-[2px] px-3 py-3 " +
    "text-center text-[10px] font-semibold uppercase tracking-[0.15em] " +
    "transition-colors sm:px-5 sm:text-[11px] lg:min-h-12";

  return (
    <aside
      aria-label="Cookie preferences"
      className="fixed inset-x-0 bottom-[calc(var(--dock-h)+env(safe-area-inset-bottom,0px))] z-[65] border-t border-white/20 bg-[#1b1815] text-white lg:bottom-0"
    >
      <div className="mx-auto flex max-w-[1920px] flex-col gap-4 px-5 py-4 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:px-[5.5%] lg:py-6">
        <p className="m-0 max-w-[78ch] text-[14px] leading-relaxed text-[#d5d0ca] lg:text-[15px]">
          We use cookies to improve your experience on the Emaar India website.
          Please read our{" "}
          <Link
            href="/privacy-policy"
            className="underline decoration-white/50 underline-offset-4 hover:text-white"
          >
            Privacy Policy
          </Link>{" "}
          for more information.
        </p>

        <div className="grid grid-cols-2 gap-2 lg:shrink-0 lg:gap-3">
          <button
            type="button"
            onClick={acceptCookies}
            className={`${buttonClass} bg-[#f5f2ec] text-[#191715] hover:bg-white`}
          >
            Yes, I accept cookies
          </button>

          <Link
            href="/privacy-policy"
            className={`${buttonClass} border border-white/45 text-[#f5f2ec] hover:bg-white/10`}
          >
            No, I want more info
          </Link>
        </div>
      </div>
    </aside>
  );
}