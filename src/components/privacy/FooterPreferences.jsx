"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";
import styles from "./preferences.module.css";

const storageKey = "emaar-india-cookie-preferences-v1";
const essentialOnly = { analytics: false, marketing: false };
const options = [
  ["analytics", "Analytics", "Anonymous figures on which pages are read and how the site performs, so we can improve it."],
  ["marketing", "Marketing", "Lets us show you property and launch advertising that is relevant to you, here and elsewhere."],
];

export default function FooterPreferences({ onNavigate }) {
  const dialog = useRef(null);
  const titleId = useId();
  const [choices, setChoices] = useState(essentialOnly);
  const [error, setError] = useState("");

  function open() {
    let saved;
    try {
      saved = JSON.parse(localStorage.getItem(storageKey));
    } catch {
      // Storage can be disabled by the browser.
    }
    setChoices({ analytics: saved?.analytics === true, marketing: saved?.marketing === true });
    setError("");
    dialog.current.showModal();
  }

  function save(value) {
    try {
      localStorage.setItem(storageKey, JSON.stringify(value));
    } catch {
      setError("Your browser could not save these preferences. Allow site storage and try again.");
      return;
    }
    window.dispatchEvent(new CustomEvent("emaar:cookie-preferences", { detail: value }));
    dialog.current.close();
  }

  return (
    <>
      <Link className={styles.footerLink} href="/html-sitemap" onNavigate={onNavigate}>Sitemap</Link>
      <button className={styles.footerLink} type="button" aria-haspopup="dialog" onClick={open}>Cookie preferences</button>
      <dialog ref={dialog} className={styles.dialog} aria-labelledby={titleId}
        onKeyDown={event => { if (event.key === "Escape") event.stopPropagation(); }}
        onClick={event => { if (event.target === dialog.current) dialog.current.close(); }}>
        <div className={styles.panel}>
          <button type="button" className={styles.close} aria-label="Close cookie preferences" onClick={() => dialog.current.close()}>×</button>
          <p className={styles.eyebrow}>Your privacy</p>
          <h2 id={titleId}>Cookie preferences</h2>
          <p className={styles.intro}>Choose what Emaar may record. You can change this at any time from the legal line at the foot of the page.</p>
          <div className={styles.row}>
            <div><strong>Essential</strong><p>Security, your chosen language, and remembering this decision. The site cannot work without them.</p></div>
            <span className={styles.always}>Always on</span>
          </div>
          {options.map(([key, label, description]) => (
            <div className={styles.row} key={key}>
              <div><strong>{label}</strong><p>{description}</p></div>
              <button type="button" className={styles.toggle} role="switch" aria-label={label} aria-checked={choices[key]}
                onClick={() => setChoices(previous => ({ ...previous, [key]: !previous[key] }))} />
            </div>
          ))}
          <div className={styles.actions}>
            <button type="button" onClick={() => save(essentialOnly)}>Essential only</button>
            <button type="button" onClick={() => save(choices)}>Save preferences</button>
          </div>
          {error && <p role="alert">{error}</p>}
          <Link href="/privacy-policy" className={styles.policy} onClick={() => dialog.current.close()}>Read the full privacy policy.</Link>
        </div>
      </dialog>
    </>
  );
}
