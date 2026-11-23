import Link from "next/link";
import { getPosts } from "@/services/blogService";
import { getPressReleases } from "@/services/pressService";
import { properties } from "@/data/properties";
import { STATUSES, projectHref } from "@/data/projects";
import styles from "./sitemap.module.css";

export const metadata = {
  title: "HTML Sitemap",
  description: "Explore Emaar India properties, company information, news and resources.",
  alternates: { canonical: "/html-sitemap" },
};

export default async function HtmlSitemap() {
  const [posts, releases] = await Promise.all([getPosts(), getPressReleases()]);
  const groups = [
    ["about", "About Emaar Properties", [
      ["Home", "/"], ["Overview", "/about-emaar"], ["Contact Us", "/contact-us"],
      ["FAQ", "/faq"], ["Careers", "/careers"], ["Awards", "/about-emaar/awards"],
    ]],
    ["media", "Media & Publishing", [
      ["Media", "/media"], ["Latest Press Releases", "/press-release-listing"], ["Emaar Blogs", "/blog"],
    ]],
    ["sustainability", "Emaar Sustainability", [
      ["Environmental Policy", "/about-emaar/environmental-policy"], ["Emaar Foundation", "/about-emaar/emaar-foundation"],
    ]],
    ["discover", "Explore Properties", [
      ["Latest Launches", "/latest-launches"], ["Residential Properties", "/properties/residential"],
      ["Commercial Properties", "/properties/commercial"],
    ]],
    ["investors", "Investor Relations", [["Investor Relations", "/investor-relations"], ["Compliance", "/compliance"]]],
    ["collections", "Property Collections", ["residential", "commercial"].flatMap(category =>
      STATUSES.map(status => [
        [status, category].map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ") + " Properties",
        `/properties/${category}/${status}`,
      ])
    )],
    ["properties", "List of Our Properties", properties.map(p => [p.name, projectHref(p.slug)])],
    ["blogs", "Emaar Blogs", posts.map(p => [p.title, `/blog/${p.slug}`])],
    ["press", "Latest Press Releases", releases.map(p => [p.title, `/press-release-listing/${p.slug}`])],
    ["pages", "Emaar Pages", [
      ["Privacy Policy", "/privacy-policy"], ["Terms & Conditions", "/terms-and-conditions"], ["Disclaimer", "/disclaimer"],
    ]],
  ].filter(([, , links]) => links.length);

  return (
    <main id="main-content" className={styles.page}>
      <div className={styles.inner}>
        <h1>HTML Sitemap</h1>
        <div className={styles.layout}>
          <nav className={styles.index} aria-label="Sitemap sections">
            {groups.map(([id, title], index) => (
              <a key={id} href={`#${id}`}><small>{String(index + 1).padStart(2, "0")}</small>{title}</a>
            ))}
          </nav>
          <div className={styles.groups}>
            {groups.map(([id, title, links]) => (
              <section key={id} id={id} tabIndex={-1}>
                <h2>{title}</h2>
                <ul>{links.map(([label, href]) => <li key={href}><Link href={href}>{label}</Link></li>)}</ul>
              </section>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
