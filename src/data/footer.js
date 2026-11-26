const whatsappHref = "https://wa.me/911234567890";

export const footer = {
  logo: {
    src: "/images/emaar-india-logo-en.svg",
    alt: "Emaar India",
  },

  actions: [
    {
      label: "Get in Touch",
      action: "enquire",
      variant: "solid",
    },
    {
      label: "WhatsApp",
      href: whatsappHref,
      icon: "whatsapp",
      variant: "outline",
    },
  ],

  columns: [
    {
      title: "Explore",
      links: [
        { label: "Residential", href: "/projects/residential/ongoing" },
        { label: "Commercial", href: "/projects/commercial/ongoing" },
        { label: "Latest Launches", href: "/latest-launches" },
      ],
    },
    {
      title: "About",
      links: [
        { label: "Who we are", href: "/about-emaar" },
        { label: "Awards", href: "/about-emaar/awards" },
        { label: "Career", href: "/careers" },
        { label: "Emaar Foundation", href: "/about-emaar/emaar-foundation" },
        {
          label: "Environmental Policy",
          href: "/about-emaar/environmental-policy",
        },
        { label: "Blogs", href: "/blog" },
        { label: "Investor Relations", href: "/investor-relations" },
        {
          label: "E-Services",
          href: "https://eservice.emaar-india.com/login.aspx",
        },
        { label: "Compliance", href: "/compliance" },
      ],
    },
    {
      title: "Connect",
      links: [
        { label: "Get in touch", action: "enquire", mobileOnly: true },
        {
          label: "WhatsApp",
          href: whatsappHref,
          external: true,
          mobileOnly: true,
        },
        {
          label: "Customer support",
          href: "mailto:support@emaarindia.com",
        },
        { label: "Emaar One app", href: "/emaar-one-app" },
        { label: "Contact Us", href: "/contact-us" },
      ],
    },
  ],

  social: [
    {
      name: "facebook",
      label: "Facebook",
      href: "https://www.facebook.com/emaarindia",
    },
    {
      name: "youtube",
      label: "YouTube",
      href: "https://www.youtube.com/@emaarindia",
    },
    {
      name: "instagram",
      label: "Instagram",
      href: "https://www.instagram.com/emaarindia",
    },
    {
      name: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/emaar-india",
    },
  ],

  bottom: {
    exploreAll: {
      label: "Explore all of Emaar",
      href: "/sitemap",
    },
    copyright: "© 2026 Emaar Properties PJSC",
    legal: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Disclaimer", href: "/disclaimer" },
      { label: "Terms & Conditions", href: "/terms-and-conditions" },
      { label: "Country & Language", href: "https://www.emaar.com/en" },
    ],
  },
};

// Har page ke keywords uske exact pathname ke andar rakho.
export const footerKeywordsByPath = {
  "/": [
    "Emaar India residential projects",
    "Emaar India commercial projects",
    "New property launches",
  ],

  // Example: Elara page par enable karne ke liye ye entry uncomment karo.
  // "/properties/elara": [
  //   "Elara by Emaar India",
  //   "Residential projects in Lucknow",
  // ],
};

// Ye FAQs sirf homepage footer ke liye hain.
export const footerHomeFaqs = [
  {
    question: "Where can I explore new Emaar India launches?",
    answer:
      "Open New Launches in the main menu to explore featured projects, or select View all launches to browse the listings.",
  },
  {
    question: "How can I enquire about a project?",
    answer:
      "Select Register on a featured project or Get in Touch to open the enquiry form and share your contact details.",
  },
];