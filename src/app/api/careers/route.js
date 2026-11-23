import { NextResponse } from "next/server";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX = 5 * 1024 * 1024;
const TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export async function POST(req) {
  let fd;
  try { fd = await req.formData(); } catch { return NextResponse.json({ error: "Invalid form" }, { status: 400 }); }

  const name = String(fd.get("name") ?? "").trim();
  const email = String(fd.get("email") ?? "").trim();
  const phone = String(fd.get("phone") ?? "").replace(/\D/g, "");
  const resume = fd.get("resume");

  if (name.length < 2 || !EMAIL.test(email) || phone.length < 7 || phone.length > 12) {
    return NextResponse.json({ error: "Invalid fields" }, { status: 422 });
  }
  if (!resume || typeof resume === "string" || resume.size === 0 || resume.size > MAX || !TYPES.includes(resume.type)) {
    return NextResponse.json({ error: "Invalid resume" }, { status: 422 });
  }

  // TODO: yahan backend/ATS/email me forward karo (resume bytes: await resume.arrayBuffer())
  return NextResponse.json({ ok: true });
}