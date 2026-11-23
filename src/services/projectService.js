// FILE: src/services/projectService.js
import { projects } from "@/data/projects";

// API_URL set ho to backend se, warna local data file se.
export async function getProjects({ category, status, revalidate = 60 } = {}) {
  const base = process.env.API_URL;
  if (base) {
    try {
      const qs = new URLSearchParams({ category, status }).toString();
      const res = await fetch(`${base}/projects?${qs}`, { next: { revalidate } });
      if (res.ok) return await res.json();
    } catch (err) {
      console.error("getProjects failed:", err);
    }
  }
  return projects.filter((x) => x.category === category && x.status === status);
}