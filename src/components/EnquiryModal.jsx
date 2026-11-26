"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { submitEnquiry } from "@/services/enquiryService";

const EnquiryContext = createContext({ openEnquiry: () => {} });

export const useEnquiry = () => useContext(EnquiryContext);

const COUNTRIES = [
  { iso: "IN", code: "+91", name: "India" },
  { iso: "AE", code: "+971", name: "UAE" },
  { iso: "US", code: "+1", name: "USA" },
  { iso: "GB", code: "+44", name: "UK" },
  { iso: "SG", code: "+65", name: "Singapore" },
];

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const STEPS = [
  "A property specialist contacts you within one working day.",
  "A private consultation: your goals, budget and shortlist.",
  "Viewings and unit selection, in person or remotely.",
];

const labelCls =
  "mb-2 block font-nav text-[9px] font-semibold uppercase leading-[1.4] tracking-[0.22em] text-[#746a5a]";

const controlCls =
  "h-[46px] rounded-[2px] border border-[#96938e] bg-transparent font-sans text-base font-normal text-[#151515] focus:border-[#181818] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#181818] sm:text-[14px]";

const inputCls =
  `${controlCls} block w-full min-w-0 px-[13px] placeholder:text-[#737174] aria-invalid:border-[#a33228]`;

const errorCls = "mt-1 block min-h-4 text-xs leading-4 text-[#a33228]";

const submitCls =
  "flex min-h-[46px] w-full items-center justify-center rounded-[2px] bg-[#111113] px-4 py-3 font-nav text-[11.5px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#303032] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#181818] disabled:cursor-wait disabled:opacity-60";

export function EnquiryProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState("");

  const openEnquiry = useCallback((src = "") => {
    setSource(src);
    setOpen(true);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  return (
    <EnquiryContext.Provider value={{ openEnquiry }}>
      {children}
      {open && <EnquiryModal source={source} onClose={close} />}
    </EnquiryContext.Provider>
  );
}

export function EnquiryButton({ source, children, ...props }) {
  const { openEnquiry } = useEnquiry();

  return (
    <button
      type="button"
      aria-haspopup="dialog"
      onClick={() => openEnquiry(source)}
      {...props}
    >
      {children}
    </button>
  );
}

function EnquiryModal({ source, onClose }) {
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});

  const cardRef = useRef(null);
  const nameRef = useRef(null);
  const doneRef = useRef(null);
  const sendingRef = useRef(false);

  useEffect(() => {
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    nameRef.current?.focus({ preventScroll: true });

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !cardRef.current) return;

      const controls = cardRef.current.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled])'
      );

      if (!controls.length) return;

      const first = controls[0];
      const last = controls[controls.length - 1];
      const active = document.activeElement;

      if (!cardRef.current.contains(active)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus?.({ preventScroll: true });
    };
  }, [onClose]);

  useEffect(() => {
    if (status === "sent") doneRef.current?.focus();
  }, [status]);

  const onSubmit = async (event) => {
    event.preventDefault();
    if (sendingRef.current) return;

    const form = event.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").replace(/\D/g, "");
    const countryCode = String(data.get("countryCode") ?? "+91");

    const nextErrors = {};

    if (name.length < 2) {
      nextErrors.name = "Please enter your full name.";
    }

    if (!EMAIL.test(email)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (phone.length < 7 || phone.length > 12) {
      nextErrors.phone = "Please enter a valid phone number.";
    }

    setErrors(nextErrors);

    const firstInvalid = Object.keys(nextErrors)[0];

    if (firstInvalid) {
      form.elements.namedItem(firstInvalid)?.focus();
      return;
    }

    sendingRef.current = true;
    setStatus("sending");

    try {
      await submitEnquiry({
        name,
        email,
        phone,
        countryCode,
        keepUpdated: data.get("keepUpdated") === "on",
        source,
      });

      setStatus("sent");
    } catch {
      setStatus("error");
    } finally {
      sendingRef.current = false;
    }
  };

  return (
    <div
      data-testid="enquire-modal"
      className="fixed inset-0 z-[90] flex items-center justify-center p-3"
    >
      <div
        aria-hidden="true"
        data-testid="enquire-modal-scrim"
        onClick={onClose}
        className="absolute inset-0 bg-[#080e0d]/75 backdrop-blur-[6px]"
      />

      <div
        ref={cardRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="enquiry-title"
        className="relative max-h-[calc(100dvh-24px)] w-full max-w-[488px] overflow-y-auto overscroll-contain rounded-[2px] bg-[#faf9f6] px-5 py-6 font-sans font-normal text-[#141414] shadow-2xl [color-scheme:light] sm:p-[42px]"
      >
        {status === "sent" ? (
          <div data-testid="enquire-modal-sent">
            <div className="mb-4 flex items-center gap-3">
              <span
                aria-hidden="true"
                className="grid size-9 shrink-0 place-items-center rounded-full border border-[#c8c4bc]"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8.5l3.4 3.4L13 4.6"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                </svg>
              </span>

              <h2
                id="enquiry-title"
                className="m-0 font-serif text-[30px] font-normal leading-tight"
              >
                Thank you.
              </h2>
            </div>

            <p className="mb-6 text-sm leading-relaxed text-[#655d50]">
              Your enquiry has been received. Here is what happens next:
            </p>

            <ol className="mb-8 space-y-4">
              {STEPS.map((step, index) => (
                <li
                  key={step}
                  className="flex gap-4 text-sm leading-relaxed text-[#514c44]"
                >
                  <span className="font-nav text-xs tracking-widest text-[#746a5a]">
                    0{index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>

            <button
              ref={doneRef}
              type="button"
              onClick={onClose}
              data-testid="enquire-modal-done"
              className={submitCls}
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2
                  id="enquiry-title"
                  data-testid="enquire-modal-title"
                  className="m-0 font-serif text-[28px] font-normal leading-[1.12] text-[#121212] sm:text-[32px]"
                >
                  Get in touch
                </h2>

                <p className="mb-0 mt-2.5 text-[14px] font-normal leading-[1.5] text-[#655d50]">
                  Tell us how to reach you.
                </p>
              </div>

              <button
                type="button"
                aria-label="Close enquiry"
                onClick={onClose}
                data-testid="enquire-modal-close"
                className="grid size-10 shrink-0 place-items-center rounded-full border border-[#ccc8c1] bg-transparent text-[#151515] transition-colors hover:border-[#817c74] hover:bg-[#f0eeea] focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 2l12 12M14 2L2 14"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  />
                </svg>
              </button>
            </div>

            <form
              onSubmit={onSubmit}
              noValidate
              data-testid="enquire-modal-form"
              className="grid gap-[15px]"
            >
              <div>
                <label htmlFor="enq-name" className={labelCls}>
                  Full name
                </label>
                <input
                  ref={nameRef}
                  id="enq-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Your full name"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby="enq-name-err"
                  data-testid="enquire-modal-name-input"
                  className={inputCls}
                />
                <span id="enq-name-err" role="alert" className={errorCls}>
                  {errors.name}
                </span>
              </div>

              <div>
                <label htmlFor="enq-email" className={labelCls}>
                  Email address
                </label>
                <input
                  id="enq-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="name@example.com"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby="enq-email-err"
                  data-testid="enquire-modal-email-input"
                  className={inputCls}
                />
                <span id="enq-email-err" role="alert" className={errorCls}>
                  {errors.email}
                </span>
              </div>

              <div>
                <label htmlFor="enq-phone" className={labelCls}>
                  Phone number
                </label>

                <div className="flex items-center gap-2.5">
                  <div className="relative w-[96px] shrink-0">
                    <select
                      name="countryCode"
                      aria-label="Country dialling code"
                      defaultValue="+91"
                      data-testid="enquire-modal-country-select"
                      className={`${controlCls} w-full cursor-pointer appearance-none pl-3 pr-7`}
                    >
                      {COUNTRIES.map((country) => (
                        <option
                          key={country.iso}
                          value={country.code}
                          aria-label={`${country.name} ${country.code}`}
                        >
                          {country.iso} {country.code}
                        </option>
                      ))}
                    </select>

                    <svg
                      aria-hidden="true"
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="none"
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#655d50]"
                    >
                      <path
                        d="m1 1 4 4 4-4"
                        stroke="currentColor"
                        strokeWidth="1.3"
                      />
                    </svg>
                  </div>

                  <input
                    id="enq-phone"
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel-national"
                    placeholder="98765 43210"
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby="enq-phone-err"
                    data-testid="enquire-modal-phone-input"
                    className={`${inputCls} flex-1`}
                  />
                </div>

                <span id="enq-phone-err" role="alert" className={errorCls}>
                  {errors.phone}
                </span>
              </div>

              <label className="flex cursor-pointer items-center gap-3 text-[14px] font-normal leading-[1.5] text-[#655d50]">
                <input
                  type="checkbox"
                  name="keepUpdated"
                  data-testid="enquire-modal-keep-updated-checkbox"
                  className="size-[15px] shrink-0 accent-[#111113]"
                />
                Keep me updated on launches and news
              </label>

              <p className="m-0 text-[12px] leading-[1.5] text-[#706d70]">
                By submitting, you agree to Emaar&apos;s{" "}
                <a
                  href="/privacy-policy"
                  target="_blank"
                  rel="noreferrer"
                  data-testid="enquire-modal-privacy-link"
                  className="text-[#514e50] underline underline-offset-2"
                >
                  privacy policy
                </a>
                .
              </p>

              {status === "error" && (
                <p role="alert" className="m-0 text-sm text-[#a33228]">
                  Something went wrong. Please try again.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                data-testid="enquire-modal-submit"
                className={submitCls}
              >
                {status === "sending" ? "Sending..." : "Submit"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}