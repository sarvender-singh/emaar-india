// FILE: src/data/projects.js

export const projectHref = (slug) => `/properties/${slug}`;

const IMG_DIR = "/images/projects/";

// Files ka folder: public/images/projects/
// Left side: project slug. Right side: folder mein exact filename.
const PROJECT_IMAGES = {
  elara: "elara.jpg",
  "emaar-serenity-hills": "Serenity-hills.webp",
  "casa-venero": "Casa-Venero.webp",
  "urban-oasis-phase-4": "urban-oasis.webp",
  "urban-oasis": "urban-oasis.webp",
  "the-88": "The-88.webp",
  amaris: "Amaris.webp",
  "urban-ascent": "Urban-Ascent.webp",
  "elite-oasis": "elite-oasis.webp",
  "emaar-digihomes": "Digihomes.webp",
  "india-business-centre": "Business-centre.webp",
  "emaar-continental-city-2": "emaar-continental-city-phase-ii.jpg",
  "emaar-continental-city": "emaar-continental-city-phase-i.jpg",
  "savana": "Savana-Jaipur-Greens.jpg",
"gomti-greens-plots":"GomtiGreensBanner-706x385.jpg"
};

// Project ki image PROJECT_IMAGES se aati hai.
// Mapping absent ho to default filename <slug>.webp hai.
// Kisi entry mein 8th argument doge to woh filename priority lega.
const p = (
  category,
  status,
  slug,
  name,
  tagline = "",
  type = "",
  soldOut = false,
  image = PROJECT_IMAGES[slug] ?? `${slug}.webp`
) => ({
  category,
  status,
  slug,
  name,
  tagline,
  type,
  soldOut,
  image: image ? `${IMG_DIR}${image}` : "",
});

export const CATEGORIES = ["residential", "commercial"];
export const STATUSES = ["ongoing", "completed"];

export const GROUPS = {
  "residential/ongoing": {
    title: "Residential: Ongoing",
    lede: "Explore our current residential launches across Delhi NCR, Mohali, Lucknow, Indore and Jaipur, from apartments and villas to plotted developments.",
  },
  "residential/completed": {
    title: "Residential: Completed",
    lede: "Communities we have delivered and the last few homes and plots still available in them.",
  },
  "commercial/ongoing": {
    title: "Commercial: Ongoing",
    lede: "Business districts and office spaces currently open for investment.",
  },
  "commercial/completed": {
    title: "Commercial: Completed",
    lede: "Our delivered commercial destinations, built for business and retail.",
  },
};

export const projects = [
  // Residential / Ongoing
  p("residential", "ongoing", "elara", "Elara", "", "3 BHK Luxury Residences"),
  p("residential", "ongoing", "emaar-serenity-hills", "Serenity Hills"),
  p("residential", "ongoing", "casa-venero", "Casa Venero", "Your haven of pure leisure.", "Luxury Villas"),
  p("residential", "ongoing", "urban-oasis-phase-4", "Urban Oasis – Phase-4", "Your tranquil modern life starts here.", "2 BHK Apartments"),
  p("residential", "ongoing", "urban-oasis", "Urban Oasis", "Reside in prominence. Revel in nature.", "3 and 4 BHK Luxury Apartments", true),
  p("residential", "ongoing", "the-88", "The 88", "Your address to flourish", "2 & 3 BHK Residences"),
  p("residential", "ongoing", "amaris", "Amaris", "A meaningful life starts here."),
  p("residential", "ongoing", "emaar-continental-city-2", "Emaar Continental City – Phase II", "The next step living", "Residential Plots"),
  p("residential", "ongoing", "emaar-continental-city", "Emaar Continental City – Phase I", "The next step living", "Residential Plots"),
  p("residential", "ongoing", "urban-ascent", "Urban Ascent", "Rise above the ordinary", "3 & 4 BHK Residences"),
  p("residential", "ongoing", "elite-oasis", "Elite Oasis", "An oasis of luxury", "3 & 4 BHK Residences"),
  p("residential", "ongoing", "savana", "Jaipur Greens Savana", "Live elevated. Live more.", "Residential Plots"),
  p("residential", "ongoing", "gomti-greens-plots", "Gomti Greens – Plots", "Everything you desire for contemporary living and more!", "Residential Plots"),

  // Residential / Completed
  p("residential", "completed", "gurgaon-greens", "Gurgaon Greens", "A harmonious lifestyle nestled in nature awaits you", "3 BHK & 4 BHK Apartments", true),
  p("residential", "completed", "imperial-gardens", "Imperial Gardens", "Live in the lap of nature", "3 BHK Apartments", true),
  p("residential", "completed", "emerald-hills-plots", "Emerald Hills Plots", "A plot for life", "Residential Plots", true),
  p("residential", "completed", "the-bungalows-mohali-hills", "The Bungalows", "Homes that evolve with your aspirations", "Bungalows", true),
  p("residential", "completed", "the-terraces", "The Terraces", "Be a part of an inspired dream", "Independent Villa Floors", true),
  p("residential", "completed", "the-villas", "The Villas", "A signature lifestyle for the privileged few", "5 Bedroom Signature Villas", true),
  p("residential", "completed", "the-views-mohali-hills", "The Views", "The epitome of community living opens its doors to you", "2, 3 & 4 BHK Apartments & Penthouses", true),
  p("residential", "completed", "mohali-hills-residential-plots", "Mohali Hills Residential Plots", "Elevate your way of life", "Residential Plots"),
  p("residential", "completed", "mohali-hills-plots", "Mohali Hills-Plots", "The world of leisure and beauty", "Residential Plots", true),
  p("residential", "completed", "marbella-villas", "Marbella Villas", "Signature villas for a coveted lifestyle", "4 & 5 BHK Villas", true),
  p("residential", "completed", "marbella-plots", "Marbella Plots", "Life on your terms", "Residential Plots", true),
  p("residential", "completed", "emaar-digihomes", "DigiHomes, Gurugram", "Luxury homes that listen", "2 BHK & 3 BHK Smart Homes", true),
  p("residential", "completed", "emerald-hills", "Emerald Hills Plots", "Your lifestyle. Your space.", "Residential Plots"),

  // Commercial / Ongoing
  p("commercial", "ongoing", "india-business-centre", "Emaar India Business Centre"),
  p("commercial", "ongoing", "emaar-business-district-83", "Emaar Business District 83", "A thriving location. A great investment.", "Shop cum Office"),

  // Commercial / Completed
  p("commercial", "completed", "emaar-business-district-114nxt", "Emaar Business District 114 NXT", "Invest. Build. Grow.", "Shop cum Office", true),
  p("commercial", "completed", "emaar-business-district-75a", "Emaar Business District 75A", "A thriving location. A great investment.", "Shop cum Office", true),
  p("commercial", "completed", "emaar-business-district-89", "Emaar Business District 89 NXT", "Rise. Beyond. Limits.", "Shop cum Office", true),
  p("commercial", "completed", "ebd114", "Emaar Business District 114", "Shop. Meet. Rise.", "Shop cum Office", true),
  p("commercial", "completed", "emaar-business-district-65nxt", "Emaar Business District 65NXT", "Shop. Meet. Rise.", "Shop cum Office", true),
  p("commercial", "completed", "ebd65", "Emaar Business District 65", "Shop. Meet. Rise.", "Shop cum Office", true),
  p("commercial", "completed", "emerald-plaza", "Emerald Plaza", "For the workaholics and the shopaholics", "Ready Commercial Spaces", true),
  p("commercial", "completed", "the-palm-square", "The Palm Square", "A business avenue encouraging you to take on the world!", "Commercial Office Spaces", true),
  p("commercial", "completed", "capital-tower-2", "Capital Tower 2", "A must-have address for thriving businesses", "Commercial Spaces", true),
  p("commercial", "completed", "capital-tower", "Capital Tower 1", "A must-have address for thriving businesses", "Commercial Spaces", true),
  p("commercial", "completed", "central-plaza", "Central Plaza", "A lucrative opportunity awaits the entrepreneur", "Commercial Spaces", true),
  p("commercial", "completed", "emerald-floors", "Emerald Floors", "Your lifestyle. Your space.", "3 BHK Luxury Villa Floors", true),
];