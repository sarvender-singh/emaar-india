import LegalPage from "@/components/legal/LegalPage";
import { getLegalPage, legalMetadata } from "@/components/legal/legalData";

export async function generateMetadata() {
  return legalMetadata("privacyPolicy", "/privacy-policy");
}

export default async function PrivacyPolicyPage() {
  const page = await getLegalPage("privacyPolicy");
  return <LegalPage page={page} testId="privacy-policy-page" />;
}