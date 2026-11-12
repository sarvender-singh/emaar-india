import { NextResponse } from "next/server";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").replace(/\D/g, "");

  if (name.length < 2 || !EMAIL.test(email) || phone.length < 7 || phone.length > 12) {
    return NextResponse.json({ error: "Invalid fields" }, { status: 422 });
  }

  // TODO: yahan CRM / email / backend API call karo
  // await fetch(`${process.env.API_URL}/enquiries`, { method: "POST", ... })

  return NextResponse.json({ ok: true });
}