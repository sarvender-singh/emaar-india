import LegalPage from "@/components/legal/LegalPage";
import { getLegalPage, legalMetadata } from "@/components/legal/legalData";

export async function generateMetadata() {
  return legalMetadata("terms", "/terms-and-conditions");
}

export default async function TermsPage() {
  const page = await getLegalPage("terms");
  return <LegalPage page={page} testId="terms-page" />;
}