import PolicyMasthead from "@/components/environmental-policy/PolicyMasthead";
import PolicyBody from "@/components/environmental-policy/PolicyBody";

export const metadata = {
  title: "Disclaimer | Emaar India",
  description:
    "Emaar India does not charge any fees or commissions for employment opportunities or job placements.",
  alternates: { canonical: "/disclaimer" },
};

const masthead = {
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Disclaimer" },
  ],
  back: { label: "Back To Home", href: "/" },
  title: "Disclaimer",
  // lede aur image nahi
};

const body = {
  paragraphs: [
    "Emaar India does not charge any fees/commissions for employment opportunities or job placements. We are committed towards maintaining a transparent and fair hiring process. Any request for payment or personal financial information in connection with job applications is not affiliated with Emaar India. We urge the interested candidates to be cautious and not entertain such requests.",
  ],
};

export default function DisclaimerPage() {
  return (
    <main id="main-content" data-testid="disclaimer-page" className="w-full bg-[#f6f3ec] pt-[var(--hdr-h)]">
      <PolicyMasthead data={masthead} />
      <PolicyBody data={body} />
    </main>
  );
}