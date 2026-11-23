"use client";

import { useLayoutEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { INTRO_EVENT, T, isIntroDone, markIntroDone, shouldPlayIntro } from "./introConfig";

export default function HomeLoader({ data }) {
  const pathname = usePathname();
  // 0 start | 1 line | 2 text | 3 retreat | 4 fade | 5 gone
  // Server pe done=false, to overlay SSR HTML me aata hai. Client navigation pe seedha 5.
  const [stage, setStage] = useState(() => (isIntroDone() ? 5 : 0));

  useLayoutEffect(() => {
    if (pathname !== "/") return;
    if (!shouldPlayIntro(true)) {
      markIntroDone();
      setStage(5);
      return;
    }

    const root = document.documentElement;
    root.dataset.intro = "playing";
    document.body.style.overflow = "hidden";

    const cleanup = () => {
      document.body.style.overflow = "";
      delete root.dataset.intro;
    };
    const finish = () => {
      markIntroDone();
      cleanup();
      setStage(5);
    };

    const timers = [
      [T.lineAt, () => setStage(1)],
      [T.textAt, () => setStage(2)],
      [T.retreatAt, () => setStage(3)],
      [T.flyAt, () => window.dispatchEvent(new Event(INTRO_EVENT))],
      [T.fadeAt, () => setStage(4)],
      [T.fadeAt + T.fadeDur, finish],
    ].map(([ms, fn]) => setTimeout(fn, ms));

    return () => {
      timers.forEach(clearTimeout);
      cleanup();
    };
  }, [pathname]);

  if (stage === 5) return null;

  const lineOpen = stage >= 1 && stage < 3;
  const textOn = stage >= 2 && stage < 3;
  const retreating = stage >= 3;
  const fading = stage >= 4;

  return (
    <div
      aria-hidden="true"
      data-testid="home-loader"
      className="fixed inset-0 z-[45] overflow-hidden bg-[#0b0b0b]"
      style={{
        opacity: fading ? 0 : 1,
        pointerEvents: fading ? "none" : "auto",
        transition: `opacity ${T.fadeDur}ms ease-in-out`,
      }}
    >
      <Image
        src={data.image}
        alt={data.alt ?? ""}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/45" />

      {/* Logo ke neeche: line + tagline */}
      <div className="absolute left-1/2 top-[calc(50%+var(--intro-logo-h,80px)/2+clamp(18px,2.2vw,30px))] flex -translate-x-1/2 flex-col items-center">
        <span
          className="block h-px bg-white/70"
          style={{
            width: lineOpen ? "clamp(120px,12vw,180px)" : "0px",
            transition: `width ${retreating ? T.retreatDur : T.lineDur}ms cubic-bezier(.65,0,.35,1)`,
          }}
        />
        <p
          className="m-0 mt-5 whitespace-nowrap font-serif text-[10px] font-light uppercase tracking-[0.22em] text-white/90 sm:text-[14px] sm:tracking-[0.3em]"
          style={{
            opacity: textOn ? 1 : 0,
            transform: textOn ? "translateY(0)" : "translateY(14px)",
            transition: `opacity ${retreating ? T.retreatDur - 200 : T.textDur}ms ease, transform ${
              retreating ? T.retreatDur : T.textDur
            }ms cubic-bezier(.22,1,.36,1)`,
          }}
        >
          {data.tagline}
        </p>
      </div>
    </div>
  );
}