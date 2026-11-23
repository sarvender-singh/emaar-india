"use client";

import { useRef, useState } from "react";
import { submitApplication } from "@/services/careersService";

const CODES = [
  { code: "+91", iso: "IN" },
  { code: "+971", iso: "AE" },
  { code: "+1", iso: "US" },
  { code: "+44", iso: "GB" },
  { code: "+65", iso: "SG" },
];
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EXT = /\.(pdf|doc|docx)$/i;

const control =
  "block h-[52px] w-full min-w-0 border border-[#11111124] bg-white px-4 text-[15px] text-[#111] placeholder:text-[#1c1a17]/45 focus:border-[#111] focus:outline-none aria-[invalid=true]:border-[#c0392b]";
const selectCtl = `${control} appearance-none pr-10`;
const label =
  "mb-2 block font-nav text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1c1a17]/65";
const err = "mt-1.5 block min-h-[18px] text-[12px] leading-[1.4] text-[#c0392b]";

const Req = () => (
  <span aria-hidden="true" className="ml-1 text-[#b5412b]">
    *
  </span>
);

function Chevron() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 12 8"
      fill="none"
      className="pointer-events-none absolute right-4 top-1/2 h-2 w-3 -translate-y-1/2 text-[#111]"
    >
      <path d="M1 1.5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export default function CareersForm({ data }) {
  const { departments, locations, maxFileMb, privacyHref, successTitle, successText } = data;
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errors, setErrors] = useState({});
  const [fileName, setFileName] = useState("");
  const titleRef = useRef(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const phone = String(fd.get("phone") ?? "").replace(/\D/g, "");
    const file = fd.get("resume");

    const next = {};
    if (String(fd.get("name") ?? "").trim().length < 2) next.name = "Please enter your name.";
    if (!EMAIL.test(String(fd.get("email") ?? "").trim())) next.email = "Please enter a valid email address.";
    if (phone.length < 7 || phone.length > 12) next.phone = "Please enter a valid phone number.";
    if (!fd.get("department")) next.department = "Please choose a department.";
    if (!fd.get("location")) next.location = "Please choose a location.";
    if (!file || !file.size) next.resume = "Please attach your resume.";
    else if (!EXT.test(file.name)) next.resume = "Please upload a PDF or Word file.";
    else if (file.size > maxFileMb * 1024 * 1024) next.resume = `File must be under ${maxFileMb} MB.`;
    if (!fd.get("consent")) next.consent = "Please agree before sending.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("sending");
    try {
      await submitApplication(fd);
      setStatus("sent");
      setTimeout(() => titleRef.current?.focus(), 50);
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div data-testid="careers-form-success" className="mt-8 max-w-[760px] bg-white p-6 sm:mt-10 sm:p-8">
        <h3 ref={titleRef} tabIndex={-1} className="m-0 font-serif text-[24px] font-light sm:text-[26px]">
          {successTitle}
        </h3>
        <p className="mb-0 mt-3 text-[15px] text-[#1c1a17]/70">{successText}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      data-testid="careers-form"
      className="mt-8 grid max-w-[900px] grid-cols-1 gap-x-6 gap-y-4 sm:mt-10 sm:grid-cols-2 sm:gap-y-5"
    >
      <p className="m-0 text-[14px] text-[#1c1a17]/65 sm:col-span-2">Fields marked with an asterisk are required.</p>

      {/* Name */}
      <div className="min-w-0">
        <label htmlFor="cr-name" className={label}>
          Full name<Req />
        </label>
        <input
          id="cr-name"
          name="name"
          autoComplete="name"
          aria-invalid={!!errors.name}
          aria-describedby="cr-name-e"
          className={control}
        />
        <span id="cr-name-e" role="alert" className={err}>{errors.name}</span>
      </div>

      {/* Email */}
      <div className="min-w-0">
        <label htmlFor="cr-email" className={label}>
          Email<Req />
        </label>
        <input
          id="cr-email"
          name="email"
          type="email"
          autoComplete="email"
          aria-invalid={!!errors.email}
          aria-describedby="cr-email-e"
          className={control}
        />
        <span id="cr-email-e" role="alert" className={err}>{errors.email}</span>
      </div>

      {/* Phone */}
      <div className="min-w-0">
        <label htmlFor="cr-phone" className={label}>
          Mobile phone<Req />
        </label>
        <div className="flex gap-2">
          <div className="relative w-[112px] flex-none">
            <select
              name="countryCode"
              defaultValue="+91"
              aria-label="Country dialling code"
              className={`${selectCtl} bg-[#efebe3] pl-3 pr-8`}
            >
              {CODES.map((c) => (
                <option key={c.iso} value={c.code}>
                  {c.iso} {c.code}
                </option>
              ))}
            </select>
            <svg
              aria-hidden="true"
              viewBox="0 0 12 8"
              fill="none"
              className="pointer-events-none absolute right-3 top-1/2 h-2 w-3 -translate-y-1/2 text-[#111]"
            >
              <path d="M1 1.5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
          <input
            id="cr-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            aria-invalid={!!errors.phone}
            aria-describedby="cr-phone-e"
            className={`${control} flex-1`}
          />
        </div>
        <span id="cr-phone-e" role="alert" className={err}>
          {errors.phone}
        </span>
      </div>

      {/* Department */}
      <div className="min-w-0">
        <label htmlFor="cr-dept" className={label}>
          Department<Req />
        </label>
        <div className="relative">
          <select
            id="cr-dept"
            name="department"
            defaultValue=""
            aria-invalid={!!errors.department}
            aria-describedby="cr-dept-e"
            className={selectCtl}
          >
            <option value="">Please select</option>
            {departments.map((d) => (
              <option key={d.value} value={d.value}>{d.label}</option>
            ))}
          </select>
          <Chevron />
        </div>
        <span id="cr-dept-e" role="alert" className={err}>{errors.department}</span>
      </div>

      {/* Location */}
      <div className="min-w-0">
        <label htmlFor="cr-loc" className={label}>
          Preferred location<Req />
        </label>
        <div className="relative">
          <select
            id="cr-loc"
            name="location"
            defaultValue=""
            aria-invalid={!!errors.location}
            aria-describedby="cr-loc-e"
            className={selectCtl}
          >
            <option value="">Please select</option>
            {locations.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
          <Chevron />
        </div>
        <span id="cr-loc-e" role="alert" className={err}>{errors.location}</span>
      </div>

      {/* Experience */}
      <div className="min-w-0">
        <label htmlFor="cr-exp" className={label}>Years of experience</label>
        <input id="cr-exp" name="experience" type="number" inputMode="numeric" min="0" max="50" className={control} />
        <span className={err} />
      </div>

      {/* Resume */}
      <div className="min-w-0 sm:col-span-2">
        <label htmlFor="cr-resume" className={label}>
          Resume (PDF or Word, max {maxFileMb} MB)<Req />
        </label>
        <label
          htmlFor="cr-resume"
          className={`flex min-h-[64px] cursor-pointer items-center gap-4 border border-dashed bg-white px-4 py-3 text-[14px] ${
            errors.resume ? "border-[#c0392b]" : "border-[#1c1a17]/30 hover:border-[#111]"
          }`}
        >
          <span className="shrink-0 border border-[#111] px-4 py-2.5 font-nav text-[10px] font-bold uppercase tracking-[0.18em]">
            Choose file
          </span>
          <span className="min-w-0 truncate text-[#1c1a17]/65">{fileName || "No file selected"}</span>
        </label>
        <input
          id="cr-resume"
          name="resume"
          type="file"
          accept=".pdf,.doc,.docx"
          aria-invalid={!!errors.resume}
          aria-describedby="cr-resume-e"
          onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
          className="sr-only"
        />
        <span id="cr-resume-e" role="alert" className={err}>{errors.resume}</span>
      </div>

      {/* Cover note */}
      <div className="min-w-0 sm:col-span-2">
        <label htmlFor="cr-msg" className={label}>Cover note</label>
        <textarea id="cr-msg" name="message" rows={5} className={`${control} h-auto min-h-[140px] resize-y py-3`} />
      </div>

      {/* Consent */}
      <div className="sm:col-span-2">
        <label className="flex cursor-pointer items-start gap-3 text-[13px] leading-[1.6] text-[#1c1a17]/75">
          <input type="checkbox" name="consent" className="mt-1 size-4 shrink-0 accent-[#111]" />
          <span>
            I agree that Emaar India may store and process my details for recruitment, and I have read the{" "}
            <a href={privacyHref} target="_blank" rel="noreferrer" className="underline">
              privacy policy
            </a>
            .<Req />
          </span>
        </label>
        <span role="alert" className={err}>{errors.consent}</span>
      </div>

      {/* Submit */}
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2 sm:gap-5">
        <button
          type="submit"
          disabled={status === "sending"}
          className="h-[50px] w-full border border-[#111] bg-[#111] px-10 font-nav text-[11px] font-bold uppercase tracking-[0.22em] text-white transition-colors hover:bg-transparent hover:text-[#111] disabled:opacity-60 sm:w-auto"
        >
          {status === "sending" ? "Submitting..." : "Submit application"}
        </button>
        {status === "error" && (
          <p role="alert" className="m-0 text-[13px] text-[#c0392b]">
            Something went wrong. Please try again.
          </p>
        )}
      </div>
    </form>
  );
}