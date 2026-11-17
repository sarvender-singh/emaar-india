export const about = {
  seo: {
    title: "About Emaar India",
    description:
      "Emaar India is part of Emaar Properties, among the most admired and valuable real estate development companies in the world.",
    image: "/images/hero-poster.jpg",
  },
  masthead: {
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "About Emaar", href: "/about-emaar" },
      { label: "Overview" },
    ],
    title: "We Shape Lifestyles",
    lede: "Emaar Properties is one of the world’s most valuable and admired real estate development companies. With established competencies in real estate, shopping malls and retail, hospitality and leisure, Emaar shapes new lifestyles through design excellence, build quality and timely delivery.",
    text: "In India, this vision takes shape through a diverse portfolio of residential, commercial and mixed-use developments across key destinations, creating spaces that bring together contemporary living, business and community experiences.",
    note: "*As of September 2026, and based on the valuation of assets done by third party valuer.",
    actions: [
      { label: "Investor relations", href: "/investor-relations", variant: "solid" },
      { label: "Contact us", href: "/contact", variant: "outline" },
    ],
  },
    spine: {
    indexLabel: "On this page",
    sections: [
      {
        id: "founder",
        type: "founder",
        n: "01",
        nav: "The founder",
        label: "01. The founder",
        image: { src: "/images/about/foundar-emaar.jpg", alt: "Mohamed Alabbar, Founder of Emaar Properties", caption: "Mohamed Alabbar, Founder of Emaar Properties." },
        quote: "We are sharpening our strategy to be one of the world's most valuable, most innovative and most admired companies.",
        name: "Mohamed Alabbar",
        role: "Founder, Emaar Properties",
        action: { label: "Read Founder's Message", href: "/about-emaar/founders-message" },
      },
      {
        id: "record",
        type: "record",
        n: "02",
        nav: "The record",
        label: "02. The record",
        title: "Built, delivered, and still standing.",
        items: [
          { value: "130,900+", text: "Residential units delivered in Dubai and other global markets since 2002.", source: "Emaar Properties corporate disclosure, September 2026" },
          { value: "590m sq ft", text: "Land bank across the UAE and key international markets.", source: "Approximate, as disclosed September 2026" },
          { value: "1.4m sq m", text: "Leasing revenue-generating assets.", source: "Approximate, as disclosed September 2026" },
          { value: "41 hotels", text: "Hotels and resorts with over 10,000 keys, owned as well as managed.", source: "As disclosed September 2026" },
          { value: "21%", text: "Of Emaar's revenue comes from shopping malls, hospitality, leisure, entertainment, commercial leasing and international businesses.", source: "Approximate, as disclosed September 2026" },
        ],
        note: "*As of September 2026, and based on the valuation of assets done by third party valuer.",
        split: {
          image: { src: "/images/about/landmark-destination.jpg", alt: "Landmark destinations", caption: "Burj Khalifa, Dubai Mall and Dubai Fountain are among Emaar's trophy destinations." },
          title: "Landmark destinations",
          // strong:true wale hisse bold dikhte hain
          text: [
            { t: "Burj Khalifa", strong: true }, { t: ", a global icon. " },
            { t: "Dubai Mall", strong: true }, { t: ", the world's most-visited retail and lifestyle destination. And " },
            { t: "Dubai Fountain", strong: true }, { t: ", the world's largest performing fountain." },
          ],
          cta: { label: "Explore the communities", href: "/latest-launches" },
        },
      },
            {
        id: "businesses",
        type: "businesses",
        // n / nav / label nahi hai -> index me nahi aayega, label bhi nahi dikhega
        title: "Our Businesses",
        items: [
          { tag: "Hospitality", title: "Emaar Hospitality", href: "/other-emaar-businesses/emaar-hospitality", image: "/images/about/emaar-hospitality.jpg" },
          { tag: "Retail", title: "Emaar Malls", href: "/other-emaar-businesses/emaar-malls", image: "/images/about/emaar-malls.jpg" },
          { tag: "Destination", title: "Burj Khalifa", href: "/other-emaar-businesses/burj-khalifa", image: "/images/about/burj-khalifa.jpg" },
          { tag: "Leisure", title: "Emaar Entertainment", href: "/other-emaar-businesses/emaar-entertainment", image: "/images/about/emaar-entertainment.jpg" },
        ],
      },
      {
        id: "international",
        type: "international",
        n: "03",
        nav: "Where we are",
        label: "03. Where we are",
        title: "Our International Presence",
        text: "Emaar's developments span multiple international destinations, each bringing its own design character and aspirational lifestyle within thriving communities.",
        items: [
          { name: "Dubai", domain: "emaar.com", href: "https://www.emaar.com" },
          { name: "Saudi Arabia", domain: "sa.emaar.com", href: "https://sa.emaar.com/en/" },
          { name: "India", domain: "in.emaar.com", href: "https://in.emaar.com/" },
          { name: "Pakistan", domain: "pk.emaar.com", href: "https://pk.emaar.com" },
          { name: "Egypt", domain: "emaarmisr.com", href: "https://www.emaarmisr.com" },
          { name: "Morocco", domain: "ma.emaar.com", href: "https://ma.emaar.com/en/" },
          { name: "Turkey", domain: "tr.emaar.com", href: "https://tr.emaar.com/" },
          { name: "Lebanon", domain: "beitmisk.com", href: "https://www.beitmisk.com/" },
        ],
      },
      {
        id: "leadership",
        type: "leadership",
        n: "04",
        nav: "Leadership",
        label: "04. Leadership",
        title: "WHO WE ARE",
        items: [
          { tag: "BOARD OF DIRECTORS", title: "Emaar Properties Board of Directors", href: "/about-emaar/board-of-directors" },
          { tag: "PRINCIPAL OFFICERS", title: "Emaar Properties Principal Officers", href: "/about-emaar/principal-officers" }
        ],
      },
      {
  id: "awards",
  type: "awards",
  n: "05",
  nav: "Recognition",
  label: "05. Recognition",
  title: "FEATURED AWARDS",
  items: [
    { title: "Emaar Broker Awards", by: "Find Your Happy | 2019" },
    { title: "Company of the Year", by: "Maiden Property Management | 2018" },
    { title: "Middle East's Leading Tourist Attraction", by: "World Travel Awards™ | 2017" },
    { title: "The Best Hotel Residences in the Middle East", by: "Haute Grandeur Global Awards | 2016" },
  ],
  cta: { label: "View more", href: "/awards" },
},
      {
  id: "responsibility",
  type: "responsibility",
  n: "06",
  nav: "Responsibility",
  label: "06. Responsibility",
  title: "Governance, sustainability and the foundation.",
  items: [
    { k: "Investor Relations", v: "Emaar is a Public Joint Stock Company listed on the Dubai Financial Market. Explore its stock market performance and related information.", href: "/investor-relations" },
    { k: "Environment Policy", v: "Emaar is committed to protecting the environment and ensuring the sustainability of its communities.", href: "/emaar-sustainability" },
    { k: "Emaar Foundation", v: "The Emaar Foundation serves as the group's apex entity for driving corporate social responsibility initiatives.", href: "/about-emaar/emaar-foundation" },
  ],
},
    ],
  },
    continue: {
    label: "Continue",
    items: [
      { title: "Investor relations", text: "Results, reports and share information for Emaar Properties PJSC.", href: "/investor-relations" },
      { title: "Sustainability", text: "How sustainability is governed and reported across Emaar's businesses.", href: "/emaar-sustainability" },
      { title: "Latest press releases", text: "Corporate announcements, results and project news.", href: "/press-release-listing" },
      { title: "Careers", text: "Work on what gets built next.", href: "/careers" },
    ],
  },
};