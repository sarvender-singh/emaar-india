import { redirect } from "next/navigation";

export default function PressReleaseListingPage() {
  redirect("/media?tab=press-release");
}