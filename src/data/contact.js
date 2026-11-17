// src/data/contact.js
export const contact = {
  seo: {
    title: "Contact Us",
    description: "Speak to the Emaar team, send an enquiry or find an Emaar office or sales centre.",
    image: "/images/hero-poster.jpg",
  },
  masthead: {
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "About Emaar", href: "/about-emaar" },
      { label: "Contact Us" },
    ],
    railLabel: "Contact",
    facts: [
      { label: "Toll free within the UAE, 24/7", text: "800 EMAAR (36227)", href: "tel:80036227" },
      { label: "From outside the UAE", text: "+971 4 366 1688", href: "tel:+97143661688" },
      { label: "Offices", text: "15 locations across nine countries", href: "#offices" },
    ],
    title: "Contact Us",
    lede: "Speak to our team or send us an enquiry. Our contact details and office locations are listed below.",
    actions: [
      { label: "Call 800 EMAAR", href: "tel:80036227", variant: "solid" },
      { label: "Send an enquiry", href: "#enquire", variant: "outline" },
    ],
  },
  spine: {
    indexLabel: "",
    sections: [
      {
        id: "now", type: "routes", n: "01", nav: "Contact options", label: "01. Contact options",
        title: "How to reach us",
        text: "Call us, message us on WhatsApp or use the enquiry form below.",
        items: [
          { icon: "phone", k: "Toll free within the UAE", v: "800 EMAAR (36227)", m: "Available 24 hours a day, seven days a week.", href: "tel:80036227" },
          { icon: "globe", k: "From outside the UAE", v: "+971 4 366 1688", href: "tel:+97143661688" },
          { icon: "chat", k: "WhatsApp", v: "+971 4 888 8887", href: "https://wa.me/97148888887" },
          { icon: "mail", k: "Enquiry form", v: "Send an enquiry", href: "#enquire" },
        ],
      },
      {
        id: "enquire", type: "form", n: "02", nav: "Send an enquiry", label: "02. Send an enquiry",
        title: "Tell us what you need",
        text: "Fields marked with an asterisk are required.",
        topics: [
          { value: "purchase-property", label: "Purchase a property" },
          { value: "post-sales", label: "Post sales assistance" },
          { value: "customer-feedback", label: "Feedback / complaints" },
          { value: "lease-commercial", label: "Lease a commercial space" },
          { value: "investor", label: "Investor enquiries" },
          { value: "careers", label: "Job opportunities" },
        ],
        privacyHref: "/privacy-policy",
        scamHref: "/scam-alerts",
        successTitle: "Thank you. Your enquiry has been sent.",
        successText: "A member of the Emaar team will get back to you shortly. For a faster answer, call 800 EMAAR (36227).",
      },
      {
        id: "offices", type: "offices", n: "03", nav: "Offices", label: "03. Offices",
        title: "Offices and sales centres",
        text: "Find an Emaar office or sales centre below. Opening hours are shown in local time.",
        items: [
          {
            id: "cairo", region: "North Africa", country: "Egypt", name: "Cairo",
            lines: ["P.O. Box 229", "Mokattam, 11571", "Cairo, Egypt"],
            details: [
              { label: "Tel", text: "+202 2503 2000", href: "tel:+20225032000" },
              { label: "Call Centre within Egypt", text: "16116", href: "tel:16116" },
              { label: "International", text: "+202 16116", href: "tel:+20216116" },
            ],
            phone: { label: "+202 2503 2000", href: "tel:+20225032000" },
          },
          {
            id: "gurgaon", region: "South Asia", country: "India", name: "Gurgaon, Haryana",
            lines: ["Emaar India Limited", "Emaar Business Park", "Mehrauli Gurgaon Road", "Sikandarpur Chowk, Sector-28", "Gurgaon-122002, Haryana"],
            details: [
              { label: "Tel", text: "+91 124 4421155", href: "tel:+911244421155" },
              { label: "Fax", text: "+91 124 4793401" },
            ],
          },
          {
            id: "bekfaya", region: "Middle East", country: "Lebanon", name: "Bekfaya Metn Area",
            lines: ["Beit Misk Sales Centre", "Atchaneh, Metn Expressway", "P.O. Box # 115", "Bekfaya Metn Area, Lebanon"],
            details: [{ label: "Tel", text: "+961 4981982", href: "tel:+9614981982" }],
            hours: ["8:30 AM – 6:00 PM"],
            phone: { label: "+961 4981982", href: "tel:+9614981982" },
          },
          {
            id: "rabat", region: "North Africa", country: "Morocco", name: "Rabat",
            lines: ["Corniche de Rabat", "Quartier El Menzah, Km 8", "Rabat, Morocco"],
            details: [{ label: "Tel", text: "+212 (537) 792290/ 794040", href: "tel:+212537792290" }],
          },
          {
            id: "karachi", region: "South Asia", country: "Pakistan", name: "Karachi",
            lines: ["Crescent Bay, Emaar Sales Centre", "Abdul Sattar Edhi Avenue,", "DHA Phase 8,", "Karachi-75500"],
            details: [
              { label: "Within Pakistan (Toll Free)", text: "0800 Emaar (0800 36227)", href: "tel:080036227" },
              { label: "International", text: "+92 80 036227", href: "tel:+9280036227" },
            ],
          },
          {
            id: "islamabad", region: "South Asia", country: "Pakistan", name: "Islamabad",
            lines: ["Canyon Views, Emaar Sales Centre", "Islamabad Highway", "DHA Phase II (Ext.)", "Islamabad-44000"],
            details: [
              { label: "Within Pakistan (Toll Free)", text: "0800 Emaar (0800 36227)", href: "tel:080036227" },
              { label: "International", text: "+92 51 2098311", href: "tel:+92512098311" },
            ],
            phone: { label: "+92 51 2098311", href: "tel:+92512098311" },
          },
          {
            id: "jeddah", region: "Middle East", country: "Saudi Arabia", name: "Jeddah",
            lines: ["P.O Box 100682", "Jeddah 21311,", "Kingdom of Saudi Arabia"],
            details: [{ label: "Call Centre", text: "800-12-Emaar (800-12-36227)", href: "tel:8001236227" }],
          },
          {
            id: "kaec", region: "Middle East", country: "Saudi Arabia", name: "King Abdullah Economic City",
            lines: ["Economic City", "87 Juman Street", "Building 1, Bay La Sun Area", "Central Business District", "King Abdullah Economic City, 23964", "Kingdom of Saudi Arabia"],
            details: [{ label: "Toll Free", text: "800 11 / 800 10", href: "tel:80011" }],
          },
          {
            id: "istanbul", region: "Türkiye", country: "Turkey", name: "Istanbul",
            lines: ["Unalan Mahallesi, Libadiye Caddesi No: 82F Kat 1", "Uskudar, 34700, Istanbul / TURKEY"],
            details: [
              { label: "Email", text: "info@emaar.com.tr", href: "mailto:info@emaar.com.tr" },
              { label: "Tel", text: "+90 216 547 17 30", href: "tel:+902165471730" },
              { label: "Sales Office", text: "+90 216 547 17 17", href: "tel:+902165471717" },
            ],
            hours: [
              "Head office working hours: Monday – Friday: 8 AM – 5:30 PM",
              "Sales office working hours: Monday – Friday: 9:30 AM – 7:00 PM",
              "Saturday – Sunday: 10:30 AM – 6:30 PM",
            ],
            phone: { label: "+90 216 547 17 30", href: "tel:+902165471730" },
          },
          {
            id: "downtown-dubai", region: "UAE", country: "United Arab Emirates", name: "Downtown Dubai Sales Centre",
            lines: ["Downtown Dubai, Burj Plaza"],
            hours: ["Saturday – Thursday: 9:30 AM – 7:00 PM", "Friday: 2:00 PM – 10:00 PM"],
          },
          {
            id: "dubai-hills", region: "UAE", country: "United Arab Emirates", name: "Dubai Hills Estate Sales Pavilion",
            lines: ["Dubai Hills Estate", "Umm Suqeim Road"],
            hours: ["Saturday – Thursday: 9:30 AM – 7:00 PM", "Friday: 2:00 PM – 7:00 PM"],
          },
          {
            id: "creek-harbour", region: "UAE", country: "United Arab Emirates", name: "Dubai Creek Harbour Sales Centre",
            lines: [],
            hours: ["Saturday – Thursday: 9:30 AM – 7:00 PM", "Friday: 2:00 PM – 7:00 PM"],
          },
          {
            id: "dubai-mall-kiosk", region: "UAE", country: "United Arab Emirates", name: "Emaar Sales Kiosk, The Dubai Mall",
            lines: ["The Dubai Mall", "Pop-Up 1 – Galleria 1, Ground Level", "Pop-Up 2 – Ground Floor, Waterfall Atrium", "Pop-Up 3 – Grand Atrium"],
          },
          {
            id: "abu-dhabi", region: "UAE", country: "United Arab Emirates", name: "Emaar Abu Dhabi Sales Centre",
            lines: ["Al Nahda Tower, Ground Floor", "Corniche – Muroor Road,", "Abu Dhabi, UAE"],
            details: [{ label: "Tel", text: "+971 2 4101000", href: "tel:+97124101000" }],
            hours: ["Saturday – Thursday: 9:30 AM – 7:00 PM", "Friday: Closed"],
            phone: { label: "+971 2 4101000", href: "tel:+97124101000" },
          },
          {
            id: "california", region: "Americas", country: "United States", name: "California",
            lines: ["C/O PACIFICA Real Estate Service", "5505 Cancha de Golf Rancha", "Santa Fe, CA 92091"],
            details: [{ label: "Tel", text: "+1 (858) 7550216 Ext 121", href: "tel:+18587550216" }],
            hours: ["9:30 AM – 7:00 PM"],
            phone: { label: "+1 (858) 7550216", href: "tel:+18587550216" },
          },
        ],
      },
      {
        id: "other", type: "contacts", n: "04", nav: "Other enquiries", label: "04. Other enquiries",
        title: "Contact the relevant team",
        text: "Use the contacts below for specialist enquiries.",
        items: [
          { k: "Media", title: "Press and media enquiries", text: "For journalists, broadcasters and requests for comment, images or interviews.", email: "PR@emaar.ae", href: "mailto:PR@emaar.ae" },
          { k: "Investors", title: "Investor relations", text: "Results, reports, share information and governance.", email: "investor-relations@emaar.ae", href: "mailto:investor-relations@emaar.ae" },
          { k: "Suppliers", title: "Supplier enquiries", text: "For procurement enquiries, supplier registration and tender opportunities.", href: "/suppliers" },
          { k: "Confidential", title: "Whistleblower line", text: "A confidential channel for reporting suspected misconduct.", email: "ethics@emaar.ae", href: "mailto:ethics@emaar.ae" },
        ],
        scam: {
          title: "Scam alerts",
          text: "Emaar will never ask you to transfer money to an individual’s personal account or share your account username or password. Verify unexpected prize or gift offers using our official contact details before responding. Emaar is not associated with the cryptocurrency named “EMAAR”.",
          label: "Read scam alerts",
          href: "/scam-alerts",
        },
      },
    ],
  },
   continue: {
    label: "Continue",
    items: [
      { title: "Frequently asked questions", text: "Contracts, mortgages, registration, transfers and alterations: answered.", href: "/faq" },
      { title: "Who we are", text: "Emaar's record, its four businesses and its leadership.", href: "/about-emaar" },
      { title: "Scam alerts", text: "How to verify that you are dealing with Emaar.", href: "/scam-alerts" },
      { title: "Communities", text: "The places Emaar has built, and what is selling in them now.", href: "/our-communities" },
    ],
  },
};