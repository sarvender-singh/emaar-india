// FILE: src/services/launchService.js
import { launches } from "@/data/launches";

// API_URL set ho to backend se, warna local data se.
export async function getLaunches({ revalidate = 60 } = {}) {
  const base = process.env.API_URL;
  if (base) {
    try {
      const res = await fetch(`${base}/launches`, { next: { revalidate } });
      if (res.ok) return await res.json();
    } catch (err) {
      console.error("getLaunches failed:", err);
    }
  }
  return launches;
}