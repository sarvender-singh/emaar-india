// src/data/faq.js
// Abhi sirf 2 FAQs placeholder hain. India ka content aane par sirf `sections` ke items badalna hai.
// `a` (answer) me HTML chalta hai: <strong>, <br>, <ul><li>, <a href> waghera.
export const faq = {
  seo: {
    title: "FAQs",
    description: "Get answers to frequently asked questions about Emaar communities, projects and anything Emaar related.",
    image: "/images/hero-poster.jpg",
  },
  masthead: {
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "About Emaar", href: "/about-emaar" },
      { label: "FAQs" },
    ],
    railLabel: "",
    facts: [],
    title: "FAQ's",
    lede: "Get answers to all your frequently asked questions about Emaar's communities, projects and anything Emaar related. Visit us online for more info.",
    actions: [
      { label: "Search the answers", href: "#search", variant: "solid" },
      { label: "Ask us directly", href: "/contact-us", variant: "outline" },
    ],
  },
  spine: {
    indexLabel: "On this page",
    search: {
      label: "Search the answers",
      placeholder: "mortgage, handover, NOC, transfer…",
      clear: "Clear search",
    },
    empty: {
      title: "No answer matches that search.",
      text: "Try a shorter word: “NOC” rather than “No Objection Certificate”. If the question genuinely is not here, the contact page reaches a person who can answer it.",
      action: { label: "Ask us directly", href: "/contact-us" },
    },
    sections: [
      {
        id: "faq-contracts", type: "faq", n: "01", nav: "Contracts", label: "01. Contracts", title: "Contracts",
        items: [
          {
            q: "What is the difference between leasehold and freehold properties?",
            a: "A Leasehold property refers to a property leased by Emaar Properties to a Lessee for a specified term. A Freehold property is a property that is sold outright for a specific purchase price to a Purchaser and there is no limit on ownership rights.",
          },
        ],
      },
      {
        id: "faq-mortgages", type: "faq", n: "02", nav: "Mortgages", label: "02. Mortgages", title: "Mortgages",
        items: [
          {
            q: "What is a Mortgage?",
            a: "A mortgage is a type of loan where the borrower pledges the title/property documents to real estate as collateral for a loan. In the event the borrower fails to repay the loan on time, the lender has the legal right to foreclose on the property and sell it to recover the outstanding debt/loan.",
          },
        ],
      },
      {
        id: "factsheets", type: "files", n: "03", nav: "Fact Sheet", label: "03. Fact Sheet", title: "Fact Sheet",
        items: [
          { title: "Home Modifications", href: "https://uae-cms.emaar.com/uploads/home_modifications_factsheet_2022_8bdf9303be_prod.pdf" },
          { title: "Property Registration", href: "https://uae-cms.emaar.com/uploads/land_registration_002_72aa09c478_prod.pdf" },
        ],
      },
    ],
  },
  continue: {
    label: "Continue",
    items: [
      { title: "Contact us", text: "Fifteen offices, a 24-hour line and an enquiry form.", href: "/contact-us" },
      { title: "Off-plan mortgage", text: "How an off-plan mortgage works, what it costs and how to apply.", href: "/off-plan-mortgages" },
      { title: "Real estate glossary", text: "The vocabulary of buying property in Dubai, defined plainly.", href: "/real-estate-glossary" },
      { title: "Scam alerts", text: "How to verify that you are really dealing with Emaar.", href: "/scam-alerts" },
    ],
  },
};