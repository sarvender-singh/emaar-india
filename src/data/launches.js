// FILE: src/data/launches.js
import { projects } from "@/data/projects";

// Page ka text (client confirm kare to yahin badlo)
export const launchesPage = {
  eyebrow: "Latest launches",
  title: "Latest Emaar Projects",
  lede: "Discover Emaar India's latest property launches, where thoughtful design, open green spaces and well-connected locations set a new standard for modern living.",
  cta: {
    eyebrow: "Register",
    title: "Hear about a release before it is public.",
    text: "Emaar opens each new launch to its register first. Tell us the projects you are watching and a property specialist will send release dates, prices and floor plans as they are published.",
    primary: { label: "Register for new launches", href: "/contact-us" },
    secondary: { label: "All properties", href: "/properties/residential/ongoing" },
  },
};

// L(slug, tag, description): naam, type aur image projects.js se aate hain.
// tag: "new" = Newly launched. Sold out na ho to "Now available" mein apne aap aata hai.
const L = (slug, tag, description) => {
  const p = projects.find((x) => x.slug === slug);
  return {
    slug,
    name: p?.name ?? slug,
    category: p?.category ?? "residential",
    type: p?.type ?? "",
    image: p?.image ?? "",
    soldOut: p?.soldOut ?? false,
    tag,
    description,
  };
};

export const launches = [
  L("emaar-serenity-hills", "new", "Spread across eight acres of open greens in Sector 86, Gurugram, with wide balconies, open layouts and homes opening to the outdoors."),
  L("casa-venero", "new", "Spread across about 25 acres in Alibag, Casa Venero offers 84 limited-collection villas with private plunge pools, a clubhouse with a lazy river and over 1,000 trees."),
  L("elara", "", "Luxury 3 BHK residences by Emaar India."),
  L("urban-oasis-phase-4", "", "2 BHK apartments in the Urban Oasis community. Your tranquil modern life starts here."),
  L("the-88", "", "Your address to flourish: 2 and 3 BHK residences by Emaar India."),
  L("amaris", "", "A GRIHA pre-certified residential project in Sector 62, Golf Course Extension Road, Gurugram, with 2, 3 and 4 BHK residences and a 35,000 sq. ft. clubhouse."),
];