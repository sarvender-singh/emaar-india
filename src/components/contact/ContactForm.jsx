"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { submitEnquiry } from "@/services/enquiryService";

const CODES = [
  { iso: "AE", code: "+971" }, { iso: "IN", code: "+91" }, { iso: "US", code: "+1" },
  { iso: "GB", code: "+44" }, { iso: "SG", code: "+65" }, { iso: "SA", code: "+966" },
  { iso: "EG", code: "+20" }, { iso: "PK", code: "+92" }, { iso: "TR", code: "+90" },
];
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// base me width nahi hai, taaki select/input apni width khud decide kar sake
const base =
  "border border-[#1c1a17]/20 px-4 py-4 text-[15px] text-[#111] placeholder:text-[#1c1a17]/45 focus:border-[#111] focus:outline-none aria-[invalid=true]:border-[#c0392b]";
const field = `${base} w-full bg-white`;
const selectCls = `${base} w-full appearance-none pr-10`;

// Native arrow hata kar apna chevron (reference jaisa)
function SelectBox({ className = "", children }) {
  return (
    <div className={`relative ${className}`}>
      {children}
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#111]">
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  );
}
const label = "mb-3 block font-nav text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1c1a17]/65";
const err = "mt-1.5 block min-h-4 text-[12px] text-[#c0392b]";

const Req = () => <span aria-hidden="true" className="ml-2 text-[#c0392b]">*</span>;

export default function ContactForm({ data }) {
  const { topics, privacyHref, scamHref, thankYouHref = "/thank-you" } = data;
  const router = useRouter();
  const [status, setStatus] = useState("idle"); // idle | sending | error
  const [errors, setErrors] = useState({});

  const onSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const v = Object.fromEntries(fd);
    const phone = String(v.phone ?? "").replace(/\D/g, "");

    const next = {};
    if (String(v.name ?? "").trim().length < 2) next.name = "Please enter your name.";
    if (!EMAIL.test(String(v.email ?? "").trim())) next.email = "Please enter a valid email address.";
    if (phone.length < 7 || phone.length > 12) next.phone = "Please enter a valid phone number.";
    if (!v.topic) next.topic = "Please choose an enquiry type.";
    if (String(v.message ?? "").trim().length < 5) next.message = "Please tell us how we can help.";
    if (!v.consent) next.consent = "Please agree before sending.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("sending");
    try {
      await submitEnquiry({
        name: String(v.name).trim(), email: String(v.email).trim(), phone,
        countryCode: v.countryCode, topic: v.topic, message: String(v.message).trim(),
        source: "contact-page",
      });
      router.push(thankYouHref); // success par thank-you page par redirect
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={onSubmit} noValidate data-testid="contact-us-form" className="mt-12 grid gap-x-6 gap-y-5 sm:grid-cols-2">
      <div>
        <label htmlFor="c-name" className={label}>Full name<Req /></label>
        <input id="c-name" name="name" autoComplete="name" aria-invalid={!!errors.name} aria-describedby="c-name-e"
          data-testid="contact-us-form-name-input" className={field} />
        <span id="c-name-e" role="alert" className={err}>{errors.name}</span>
      </div>

      <div>
        <label htmlFor="c-email" className={label}>Email<Req /></label>
        <input id="c-email" name="email" type="email" autoComplete="email" aria-invalid={!!errors.email} aria-describedby="c-email-e"
          data-testid="contact-us-form-email-input" className={field} />
        <span id="c-email-e" role="alert" className={err}>{errors.email}</span>
      </div>

      <div>
        <label htmlFor="c-phone" className={label}>Phone<Req /></label>
        <div className="flex gap-2">
          <SelectBox className="w-[132px] flex-none">
            <select name="countryCode" defaultValue="+971" aria-label="Country dialling code"
              data-testid="contact-us-form-country-select" className={`${selectCls} bg-[#f1eee7]`}>
              {CODES.map((c) => <option key={c.iso} value={c.code}>{c.iso} {c.code}</option>)}
            </select>
          </SelectBox>
          <input id="c-phone" name="phone" type="tel" inputMode="numeric" autoComplete="tel-national"
            aria-invalid={!!errors.phone} aria-describedby="c-phone-e c-phone-h"
            data-testid="contact-us-form-phone-input" className={`${field} min-w-0 flex-1`} />
        </div>
        <span id="c-phone-h" className="mt-3 block text-[12px] text-[#1c1a17]/60">
          Include your country code so we can call you back.
        </span>
        <span id="c-phone-e" role="alert" className={err}>{errors.phone}</span>
      </div>

      <div>
        <label htmlFor="c-topic" className={label}>What can we help you with?<Req /></label>
        <SelectBox>
          <select id="c-topic" name="topic" defaultValue="" aria-invalid={!!errors.topic} aria-describedby="c-topic-e"
            data-testid="contact-us-form-topic-select" className={`${selectCls} bg-white`}>
            <option value="">Please select</option>
            {topics.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        </SelectBox>
        <span id="c-topic-e" role="alert" className={err}>{errors.topic}</span>
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="c-msg" className={label}>Your message<Req /></label>
        <textarea id="c-msg" name="message" rows={7} aria-invalid={!!errors.message} aria-describedby="c-msg-e"
          data-testid="contact-us-form-message-input" className={`${field} resize-y`} />
        <span id="c-msg-e" role="alert" className={err}>{errors.message}</span>
      </div>

      <div className="sm:col-span-2">
        <label className="flex cursor-pointer items-center gap-3 text-[13.5px] text-[#1c1a17]/75">
          <input type="checkbox" name="consent" data-testid="contact-us-form-consent-checkbox" className="size-5 flex-none accent-[#111]" />
          <span>
            I agree that Emaar may contact me about this enquiry, and I have read the{" "}
            <a href={privacyHref} target="_blank" rel="noreferrer" className="border-b border-[#1c1a17]/40 text-[#111]">Privacy Policy</a>.
            <span aria-hidden="true" className="ml-1">*</span>
          </span>
        </label>
        <span role="alert" className={err}>{errors.consent}</span>
      </div>

      <div className="flex flex-wrap items-center gap-6 sm:col-span-2">
        <button type="submit" disabled={status === "sending"} data-testid="contact-us-form-submit"
          className="h-[50px] border border-[#111] bg-[#111] px-8 font-nav text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-transparent hover:text-[#111] disabled:opacity-60">
          {status === "sending" ? "Sending..." : "Send enquiry"}
        </button>
        <p className="m-0 max-w-[560px] text-[13px] text-[#1c1a17]/65">
          Emaar will never ask you to transfer money to an individual’s personal account.{" "}
          <a href={scamHref} className="border-b border-[#1c1a17]/40 text-[#111]">Read our scam alerts</a>.
        </p>
        {status === "error" && <p role="alert" className="m-0 w-full text-[13px] text-[#c0392b]">Something went wrong. Please try again.</p>}
      </div>
    </form>
  );
}