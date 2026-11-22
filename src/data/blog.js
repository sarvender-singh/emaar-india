const IMG = "https://www.emaar.com/cms-media/uploads/";
const FALLBACK = "/images/hero-poster.jpg"; // replace with real images
const stub = { p: "Content for this section goes here." };

export const blog = {
  seo: {
    title: "Emaar Blogs | Emaar India",
    description:
      "Insights into the Emaar lifestyle, including property investment tips, communities, hospitality, malls and entertainment.",
    image: "/images/hero-poster.jpg",
  },
  masthead: {
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "About Emaar", href: "/about-emaar" },
      { label: "Emaar Blogs" },
    ],
    title: "Emaar Blogs",
    lede: "Read on for insights into the Emaar lifestyle, including top tips for property investment, management, and Dubai visa information. Discover the latest stories on Emaar communities and properties.",
    actions: [
      { label: "Visit Emaar blogs", href: "https://www.emaar.com/en/blog", variant: "solid", external: true },
      { label: "Press releases", href: "/media", variant: "outline" },
    ],
  },
  list: {
    label: "01. Featured & popular",
    title: "Guides worth reading first.",
    text: "One featured guide, and the posts Emaar's own readers return to most.",
    pageSize: 6,
  },
};

export const posts = [
  {
    slug: "flamingo-season-ras-al-khor-dubai-creek-harbour",
    featured: true,
    title: "Flamingo Season at Ras Al Khor: How to See Them Near Dubai Creek Harbour",
    excerpt:
      "Discover flamingo season at Ras Al Khor Wildlife Sanctuary, including the best time to visit, birdwatching spots and nearby Dubai Creek Harbour.",
    date: "2026-10-23",
    readTime: "5 min read",
    image: IMG + "12_26_27.jpg",
    intro: [
      "Dubai is known for its striking architecture and contemporary waterfront destinations, but it is also home to remarkable natural environments. Just beyond the modern skyline of Dubai Creek Harbour, Ras Al Khor Wildlife Sanctuary offers a different perspective on the city, where flamingos gather in the shallow waters of a protected wetland.",
      "As temperatures become more pleasant during the cooler months, the sanctuary attracts nature enthusiasts, photographers and visitors looking to experience Dubai's wildlife. With dedicated birdwatching areas and a landscape shaped by lagoons, mudflats and mangroves, it offers an opportunity to discover a quieter side of the city.",
      "Here's what to know about flamingo season at Ras Al Khor, including when to visit, where to watch the birds and how to combine the experience with time at Dubai Creek Harbour.",
    ],
    sections: [
      {
        heading: "Discover Ras Al Khor Wildlife Sanctuary",
        blocks: [
          { p: "Located at the head of Dubai Creek, Ras Al Khor Wildlife Sanctuary is a protected wetland covering approximately 6.2 square kilometres." },
          { p: "Its landscape includes shallow lagoons, mangroves, mudflats and salt flats, providing habitats for a wide variety of birds and other wildlife. The sanctuary is particularly important for migratory birds, which use the wetlands for feeding and shelter during their seasonal journeys." },
          { p: "Among its best-known inhabitants are the greater flamingos, whose distinctive pink plumage and long, slender legs make them one of the sanctuary's most recognisable attractions." },
          { p: "The contrast between these natural wetlands and Dubai's surrounding urban landscape is part of what makes Ras Al Khor such an unusual place to explore." },
        ],
      },
      { heading: "When Is Flamingo Season in Dubai?", blocks: [stub] },
      { heading: "Where Can You See the Flamingos?", blocks: [stub] },
      { heading: "Ras Al Khor Wildlife Sanctuary Visiting Hours", blocks: [stub] },
      { heading: "How to Get to Ras Al Khor from Dubai Creek Harbour", blocks: [stub] },
      { heading: "Continue Your Day at Dubai Creek Harbour", blocks: [stub] },
      {
        heading: "Tips for Photographing Flamingos at Ras Al Khor",
        blocks: [
          { p: "Ras Al Khor offers interesting opportunities for wildlife photography, particularly for those hoping to capture flamingos against the surrounding wetland landscape." },
          { p: "A few simple considerations can help make the most of the visit:" },
          {
            ul: [
              { b: "Bring a zoom lens:", t: "Flamingos may be some distance from the observation hides, so a telephoto lens can help capture more detail without disturbing the birds." },
              { b: "Consider the lighting:", t: "Early daylight can offer pleasant conditions for photographing the wetlands and surrounding landscape." },
              { b: "Be patient:", t: "Flamingos and other birds move naturally through the sanctuary, and their position and behaviour can change throughout the visit." },
              { b: "Respect the habitat:", t: "Remain inside designated viewing areas and avoid noise or actions that could disturb wildlife." },
            ],
          },
          { p: "The most memorable photographs often capture the relationship between the birds, the water and the wider landscape rather than focusing on the flamingos alone." },
        ],
      },
      {
        heading: "Experience Dubai's Natural Side",
        blocks: [
          { p: "Ras Al Khor Wildlife Sanctuary reveals a side of Dubai that can be easy to overlook. Its protected wetlands provide an important habitat for migratory birds, while its flamingos offer visitors a memorable wildlife experience close to the city's urban destinations." },
          { p: "With Dubai Creek Harbour nearby, a visit can combine birdwatching and nature photography with waterfront walks, dining and views across Dubai Creek." },
          { p: "For residents and visitors looking to explore beyond Dubai's familiar landmarks, flamingo season offers another reason to discover the natural landscape surrounding Dubai Creek Harbour." },
        ],
      },
    ],
  },
  {
    slug: "dubai-fitness-challenge-2026-downtown-dubai-creek-harbour",
    title: "Dubai Fitness Challenge 2026: Where to Run, Walk and Cycle in Downtown Dubai and Dubai Creek Harbour",
    excerpt: "The best routes to run, walk and cycle across Downtown Dubai and Dubai Creek Harbour.",
    date: "2026-10-23",
    readTime: "4 min read",
    image: IMG + "running-dubai.png",
    intro: ["The best routes to run, walk and cycle across Downtown Dubai and Dubai Creek Harbour."],
    sections: [],
  },
  {
    slug: "dubai-property-investment-guide-first-time-international-investors",
    title: "A Guide to Dubai Property Investment for First-Time International Investors",
    excerpt: "What first-time international investors should know before buying property in Dubai.",
    date: "2026-09-18",
    readTime: "6 min read",
    image: IMG + "3_1_1941f34841_prod.jpg",
    intro: ["What first-time international investors should know before buying property in Dubai."],
    sections: [],
  },
  {
    slug: "why-downtown-dubai-remains-one-of-the-worlds-most-recognised-urban-destinations",
    title: "Why Downtown Dubai Remains One of the World’s Most Recognised Urban Destinations",
    excerpt: "Why Downtown Dubai continues to draw residents, investors and visitors from around the world.",
    date: "2026-09-15",
    readTime: "4 min read",
    image: IMG + "3_4e1f38622a_prod.jpg",
    intro: ["Why Downtown Dubai continues to draw residents, investors and visitors from around the world."],
    sections: [],
  },
  {
    slug: "why-dubai-creek-harbour-is-one-of-dubais-best-waterfront-destinations",
    title: "Why Dubai Creek Harbour Is One of Dubai's Best Waterfront Destinations",
    excerpt: "A look at the waterfront lifestyle at Dubai Creek Harbour.",
    date: "2026-09-10",
    readTime: "4 min read",
    image: FALLBACK,
    intro: ["A look at the waterfront lifestyle at Dubai Creek Harbour."],
    sections: [],
  },
  {
    slug: "dubai-investor-visa-guide-requirements-eligibility-benefits",
    title: "Dubai Investor Visa Guide: Requirements, Eligibility & Benefits (2026)",
    excerpt: "Requirements, eligibility and benefits of the Dubai investor visa.",
    date: "2026-09-03",
    readTime: "5 min read",
    image: FALLBACK,
    intro: ["Requirements, eligibility and benefits of the Dubai investor visa."],
    sections: [],
  },
  {
    slug: "what-is-a-real-estate-investment-trust-reit",
    title: "What Is a Real Estate Investment Trust (REIT)? Benefits, Risks & How It Works",
    excerpt: "How REITs work, and the benefits and risks to consider.",
    date: "2026-08-27",
    readTime: "5 min read",
    image: FALLBACK,
    intro: ["How REITs work, and the benefits and risks to consider."],
    sections: [],
  },
  {
    slug: "how-to-join-dubai-mallathon-beginners-guide",
    title: "How to Join Dubai Mallathon: A Beginner's Guide to Indoor Walking in Dubai",
    excerpt: "A beginner's guide to indoor walking in Dubai.",
    date: "2026-08-20",
    readTime: "3 min read",
    image: FALLBACK,
    intro: ["A beginner's guide to indoor walking in Dubai."],
    sections: [],
  },
  {
    slug: "from-end-user-to-investor-why-emaar-properties-appeal-to-both",
    title: "From End-User to Investor: Why Emaar Properties Appeal to Both",
    excerpt: "Why Emaar properties appeal to both residents and investors.",
    date: "2026-08-12",
    readTime: "4 min read",
    image: FALLBACK,
    intro: ["Why Emaar properties appeal to both residents and investors."],
    sections: [],
  },
  {
    slug: "why-emaar-communities-are-perfect-for-long-weekend-living",
    title: "Why Emaar Communities Are Perfect for Long Weekend Living",
    excerpt: "Long weekends are easy in an Emaar community.",
    date: "2026-08-05",
    readTime: "3 min read",
    image: FALLBACK,
    intro: ["Long weekends are easy in an Emaar community."],
    sections: [],
  },
];