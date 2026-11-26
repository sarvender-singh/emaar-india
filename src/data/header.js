export const header = {
  logo: {
    src: "/images/emaar-india-logo-en.svg",
    alt: "Emaar India",
  },

  nav: [
    {
      label: "New Launches",
      href: "/latest-launches",
      mega: {
        eyebrow: "New Launches",
        meta: "14 new launches · 6 cities",
        columns: [
          {
            title: "Newly launched",
            links: [
              {
                label: "Elara",
                sub: "Lucknow",
                href: "/properties/elara/",
              },
              {
                label: "Serenity Hills",
                sub: "Gurugram",
                href: "/properties/emaar-serenity-hills/",
              },
              {
                label: "India Business Centre",
                sub: "Gurugram",
                href: "/properties/india-business-centre/",
              },
              {
                label: "Elite Oasis",
                sub: "Lucknow",
                href: "/elite-oasis",
              },
              {
                label: "Casa Venero",
                sub: "Alibag",
                href: "/casa-venero",
              },
              {
                label: "All latest launches",
                sub: "View all",
                href: "/latest-launches",
              },
            ],
          },
          {
            title: "By city",
            links: [
              {
                label: "Delhi NCR",
                sub: "31 projects",
                href: "/latest-launches?city=delhi-ncr",
              },
              {
                label: "Lucknow",
                sub: "2 projects",
                href: "/latest-launches?city=lucknow",
              },
              {
                label: "Mohali",
                sub: "4 projects",
                href: "/latest-launches?city=mohali",
              },
              {
                label: "Jaipur",
                sub: "1 project",
                href: "/latest-launches?city=jaipur",
              },
              {
                label: "Indore",
                sub: "2 projects",
                href: "/latest-launches?city=indore",
              },
              {
                label: "Alibag",
                sub: "1 project",
                href: "/latest-launches?city=alibag",
              },
            ],
          },
        ],
        feature: {
          image: "/images/elara.jpg",
          alt: "Elara",
          eyebrow: "Newly launched",
          title: "Elara",
          subtitle: "Lucknow · Residential",
          href: "/properties/elara/",
          cta: "Explore",
        },
      },
    },

    {
      label: "Emaar Residential",
      mega: {
        eyebrow: "Emaar Residential",
        meta: "Residential projects",
        columns: [
          {
            title: "Ongoing",
            links: [
              {
                label: "Elara",
                sub: "Lucknow",
                href: "/properties/elara/",
              },
              {
                label: "Serenity Hills",
                sub: "Gurugram",
                href: "/properties/emaar-serenity-hills/",
              },
              {
                label: "Elite Oasis",
                sub: "Lucknow",
                href: "/elite-oasis",
              },
              {
                label: "View all ongoing projects",
                sub: "Residential",
                href: "/properties/residential/ongoing",
              },
            ],
          },
          {
            title: "Completed",
            links: [
              {
                label: "View all completed projects",
                sub: "Delivered homes and plots",
                href: "/properties/residential/completed",
              },
            ],
          },
        ],
        feature: {
          image: "/images/serenity-main.jpg",
          alt: "Emaar Serenity Hills, Gurugram",
          eyebrow: "Featured residence",
          title: "Serenity Hills",
          subtitle: "Gurugram · Residential",
          href: "/properties/emaar-serenity-hills/",
          cta: "Explore",
        },
      },
    },

    {
      label: "Emaar Business",
      mega: {
        eyebrow: "Emaar Business",
        meta: "Commercial projects",
        columns: [
          {
            title: "Ongoing",
            links: [
              {
                label: "India Business Centre",
                sub: "Gurugram",
                href: "/properties/india-business-centre/",
              },
              {
                label: "View all ongoing projects",
                sub: "Commercial",
                href: "/properties/commercial/ongoing",
              },
            ],
          },
          {
            title: "Completed",
            links: [
              {
                label: "View all completed projects",
                sub: "Delivered business and retail spaces",
                href: "/properties/commercial/completed",
              },
            ],
          },
        ],
        feature: {
          image: "/images/projects/Business-centre.webp",
          alt: "Emaar India Business Centre, Gurugram",
          eyebrow: "Featured commercial project",
          title: "India Business Centre",
          subtitle: "Gurugram · Commercial",
          href: "/properties/india-business-centre/",
          cta: "Explore",
        },
      },
    },

    {
      label: "About Emaar",
      href: "/about-emaar",
    },
  ],

  contact: {
    phone: "tel:+911234567890",
    whatsapp: "https://wa.me/911234567890",
    ctaLabel: "Get in Touch",
  },

  dock: [
    { key: "home", label: "Home", type: "link", href: "/" },
    {
      key: "launches",
      label: "Launches",
      type: "link",
      href: "/latest-launches",
    },
    {
      key: "communities",
      label: "Communities",
      type: "link",
      href: "/master-developments",
    },
    { key: "enquire", label: "Enquire", type: "enquire" },
    { key: "more", label: "More", type: "more" },
  ],

  dockSearch: {
    label: "Find your home",
    cta: "Search",
    href: "/latest-launches",
  },

  mobileMenu: [
    { label: "Home", href: "/" },
    { label: "New Launches", href: "/latest-launches" },
    {
      label: "Emaar Residential · Ongoing",
      href: "/properties/residential/ongoing",
    },
    {
      label: "Emaar Residential · Completed",
      href: "/properties/residential/completed",
    },
    {
      label: "Emaar Business · Ongoing",
      href: "/properties/commercial/ongoing",
    },
    {
      label: "Emaar Business · Completed",
      href: "/properties/commercial/completed",
    },
    { label: "Sustainability", href: "/sustainability" },
    { label: "About Emaar", href: "/about-emaar" },
  ],
};