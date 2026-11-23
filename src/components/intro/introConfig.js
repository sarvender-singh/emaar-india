export const INTRO_EVENT = "emaar:intro-fly";

// Saari timing ms me. Yahin se tweak karo.
export const T = {
  logoIn: 800,      // center logo fade-in
  lineAt: 800,      // line kholna shuru
  lineDur: 900,
  textAt: 1200,     // tagline aana shuru
  textDur: 800,
  retreatAt: 2900,  // line + text wapas
  retreatDur: 700,
  flyAt: 3100,      // logo header me merge
  flyDur: 1200,
  fadeAt: 4100,     // image slow hide
  fadeDur: 1300,
};

// Memory me rehta hai: refresh pe reset, client navigation pe bacha rehta hai
const state = { done: false };

export const isIntroDone = () => state.done;
export const markIntroDone = () => {
  state.done = true;
};

export function shouldPlayIntro(isHome = true) {
  if (!isHome || typeof window === "undefined") return false;
  if (state.done) return false;
  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  } catch {}
  return true;
}