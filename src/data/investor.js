const cdn = "https://cdn.in.emaar.com/wp-content/uploads/";
const toRows = (rows) => rows.map(([year, period, doc, path]) => ({ year, period, doc, href: cdn + path }));

const COLS = ["Year/Date", "Period", "Document", "Download"];

const annualReports = toRows([
  ["2024-25", "-", "ANNUAL REPORT", "2026/07/Annual-Report-2024-25.pdf"],
  ["2023-24", "-", "ANNUAL REPORT", "2025/01/Annual_Report_2023-24.pdf"],
  ["2022-23", "-", "ANNUAL REPORT", "2024/02/1_Annual-Report-2022-23.pdf"],
  ["2021-22", "-", "ANNUAL REPORT", "2023/06/1_Annual-Report-2021-22.pdf"],
  ["2020-21", "-", "ANNUAL REPORT", "2022/03/1_ANNUAL-REPORT-2020-21.pdf"],
  ["2019-20", "-", "ANNUAL REPORT", "2021/07/Annual-Report-2019-20.pdf"],
  ["2018-19", "-", "ANNUAL REPORT", "2021/07/Annual-Report-2018-19.pdf"],
  ["2017-18", "-", "ANNUAL REPORT", "2021/07/Annual-Report-2017-18.pdf"],
  ["2016-17", "-", "ANNUAL REPORT", "2021/07/Annual-Report-2016-17.pdf"],
]);

// Sirf shuru ki 6 rows. Poori list ke liye neeche "Compliances data" wala script chalao.
const compliances = toRows([
  ["2025", "FEBRUARY", "REGULATION 52 & 54", "2025/02/Regulation-52-and-54.pdf"],
  ["2025", "FEBRUARY", "Board Meeting Intimation", "2025/02/Board-Meeting-Intimation.pdf"],
  ["2025", "JANUARY", "REGULATION 57(5)", "2025/01/12_Regulation-575.pdf"],
  ["2024", "DECEMBER", "REGULATION 57(4)", "2025/01/11_Regulation-574.pdf"],
  ["2024", "NOVEMBER", "REGULATION 52 & 54", "2025/01/10_Regulation-52-54.pdf"],
  ["2024", "NOVEMBER", "BOARD MEETING INTIMATION", "2025/01/9_Board-Meeting-Intimation.pdf"],
]);

const financialResults = toRows([
  ["2024", "-", "RESULTS DECEMBER 2024", "2025/02/Results-December-2024.pdf"],
  ["2024", "-", "RESULTS SEPTEMBER 2024", "2025/01/Results_September_2024.pdf"],
  ["2024", "-", "RESULTS JUNE 2024", "2025/01/Results_June_2024.pdf"],
  ["2024", "-", "RESULTS MARCH 2024", "2024/06/Results-March-2024.pdf"],
  ["2023", "-", "Results DECEMBER 2023", "2024/02/2_Financial-Results-December-2023.pdf"],
  ["2023", "-", "Results SEPTEMBER 2023", "2024/02/2_Financial-Results-September-2023.pdf"],
  ["2023", "-", "Results June 2023", "2024/02/1_Financial-Results-June-2023.pdf"],
  ["2023", "-", "Results March 2023", "2023/06/3_Results-March-2023.pdf"],
  ["2022", "-", "Results December 2022", "2023/06/2_Results-December-2022.pdf"],
  ["2022", "-", "Results September 2022", "2023/06/1_Results-September-2022.pdf"],
  ["2022", "-", "Results June 2022", "2022/08/4_RESULTS_JUNE_2022.pdf"],
  ["2022", "-", "Results March 2022", "2022/06/16_financial-results-march-2022.pdf"],
  ["2021", "-", "Results December 2021", "2022/03/1.-Results-December-2021.pdf"],
  ["2021", "-", "RESULTS SEPTEMBER 2021", "2022/03/3_RESULTS-SEPTEMBER-2021.pdf"],
  ["2021", "-", "RESULTS MARCH 2021", "2021/09/RESULTS-MARCH-2021.pdf"],
  ["2020", "-", "HALF YEARLY RESULTS SEPTEMBER 2020", "2021/09/14-Half-Yearly-Results-September-2020.pdf"],
  ["2020", "-", "HALF YEARLY RESULTS MARCH 2020", "2021/09/13-Half-Yearly-Results-March-2020.pdf"],
  ["2019", "-", "HALF YEARLY RESULTS SEPTEMBER 2019", "2021/09/12-Half-Yearly-Results-September-2019.pdf"],
  ["2019", "-", "HALF YEARLY RESULTS MARCH 2019", "2021/09/11-Half-Yearly-Results-March-2019.pdf"],
  ["2018", "-", "HALF YEARLY RESULTS SEPTEMBER 2018", "2021/09/10-Half-Yearly-Results-September-2018.pdf"],
  ["2018", "-", "HALF YEARLY RESULTS MARCH 2018", "2021/07/9-Half-Yearly-Results-March-2018.pdf"],
  ["2017", "-", "HALF YEARLY RESULTS SEPTEMBER 2017", "2021/07/8-Half-Yearly-Results-September-2017.pdf"],
  ["2017", "-", "HALF YEARLY RESULTS MARCH 2017", "2021/07/7-Half-Yearly-Results-March-2017.pdf"],
  ["2016", "-", "HALF YEARLY RESULTS SEPTEMBER 2016", "2021/07/6-Half-Yearly-Results-September-2016.pdf"],
  ["2016", "-", "HALF YEARLY RESULTS MARCH 2016", "2021/07/5-Half-Yearly-Results-March-2016.pdf"],
]);

const range = (n) => Array.from({ length: n }, (_, i) => n - i); // [n..1]

const subsidiaries = toRows([
  ["2024-25", "-", "ACCOUNTS OF SUBSIDIARIES 2024-25 (1)", "2026/07/Accounts-of-Subsidiaries-2024-25.pdf"],
  ...range(3).map((n) => ["2023-24", "-", `ACCOUNTS OF SUBSIDIARIES 2023-24 (${n})`, `2025/01/Accounts_of_Subsidiaries_2023_24-${n}.pdf`]),
  ...range(5).map((n) => ["2022-23", "-", `ACCOUNTS OF SUBSIDIARIES 2022-23 (${n})`, `2024/02/2_Accounts-of-Subsidiaries-2022-23-${n}.pdf`]),
  ...range(6).map((n) => ["2021-22", "-", `ACCOUNTS OF SUBSIDIARIES 2021-22 (${n})`, `2023/06/${n}_Accounts-of-Subsidiaries-2021-22.pdf`]),
  ...range(3).map((n) => ["2020-21", "-", `ACCOUNTS OF SUBSIDIARIES 2020-21 (${n})`, `2022/05/${n}-accounts-of-subsidiaries-2020-21.pdf`]),
  ...["2019-20", "2018-19", "2017-18", "2016-17"].map((y) => [y, "-", `ACCOUNTS OF SUBSIDIARIES ${y}`, `2021/07/Accounts-of-Subsidiaries-${y}.pdf`]),
]);

const composition = [
  { period: "-", doc: "Composition of the various committees of the Board of Directors", href: cdn + "2026/09/Composition-of-the-various-committees-of-the-Board-of-Directors.pdf" },
  { period: "-", doc: "Composition of the Board of Directors", href: cdn + "2026/09/Composition-of-the-Board-of-Directors-1.pdf" },
];

const policies = toRows([
  ["-", "-", "MATERIAL SUBSIDIARY POLICY", "2023/06/2_Material-Subsidiary-Policy.pdf"],
  ["-", "-", "RELATED PARTY TRANSACTIONS POLICY", "2023/06/1_Related-Party-Transactions-Policy.pdf"],
  ["-", "-", "PRESERVATION OF DOCUMENTS POLICY", "2022/06/2_Preservation-of-Documents-Policy.pdf"],
  ["-", "-", "CODE OF CONDUCT", "2022/06/1_Code-of-Conduct.pdf"],
  ["-", "-", "ANTI FRAUD & WHISTLEBLOWER POLICY", "2026/05/emaar-anti-fraud-and-whistleblower-policy.pdf"],
  ["-", "-", "NOMINATION & REMUNERATION POLICY", "2026/06/nomination-and-remuneration-policy.pdf"],
  ["-", "-", "CORPORATE SOCIAL RESPONSIBILITIES POLICY", "2026/06/corporate-social-responsibilities.pdf"],
  ["-", "-", "TERMS & CONDITIONS APPOINTMENT OF INDEPENDENT DIRECTORS", "2021/07/Terms-Conditions-Appointment-of-Independent-Directors.pdf"],
]);

const annualReturn = toRows([
  ["2024-25", "-", "Annual Return", "2026/07/Annual-Return-2024-25.pdf"],
  ["2023-24", "-", "Annual Return", "2025/01/Annual_Return_2023-24.pdf"],
  ["2022-23", "-", "Annual Return", "2024/02/3_Annual-Return-2022-23.pdf"],
  ["2021-22", "-", "Annual Return", "2023/06/3_Annual-Return-2021-22.pdf"],
  ["2020-21", "-", "Annual Return", "2022/06/3_Annual-Return-2020-21.pdf"],
]);

export const investor = {
  seo: {
    title: "Investor Relations | Emaar India",
    description:
      "Annual reports, financial results, compliances, policies and other investor information for Emaar India.",
    image: "/images/hero-poster.jpg",
  },
  masthead: {
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "About Emaar", href: "/about-emaar" },
      { label: "Investor Relations" },
    ],
    title: "Investor Relations",
    lede: "Annual reports, financial results, compliances, policies and other disclosures for Emaar India.",
  },
  spine: {
    indexLabel: "Investor sections",
    pageSize: 6,
    groups: [
      {
        id: "annual-reports",
        nav: "Annual Reports",
        title: "Annual Reports",
        text: "A Public Limited Company, Emaar India’s Annual Reports provide information about the company’s financials and related details.",
        tabs: [{ id: "annual-report", label: "Annual Report", type: "table", columns: COLS, rows: annualReports }],
      },
      {
        id: "sebi-compliance",
        nav: "Compliance under SEBI (LODR) Regulations, 2015",
        title: "Compliance under SEBI (LODR) Regulations, 2015",
        tabs: [
          { id: "compliances", label: "Compliances", type: "table", columns: COLS, rows: compliances },
          { id: "financial-results", label: "Financial Results", type: "table", columns: COLS, rows: financialResults },
          {
            id: "debenture",
            label: "Debenture Trustee Information",
            type: "link",
            href: "https://cdn.in.emaar.com/wp-content/themes/emaar/inc/assets/pdfs/investor-relations/compliances-regulations/Debenture-Trustee-Information.pdf",
          },
        ],
      },
      {
        id: "subsidiaries",
        nav: "Accounts of Subsidiaries",
        title: "Accounts of Subsidiaries",
        tabs: [{ id: "subsidiaries", label: "Accounts of Subsidiaries", type: "table", columns: COLS, rows: subsidiaries }],
      },
      {
        id: "composition",
        nav: "Composition",
        title: "Composition",
        tabs: [{ id: "composition", label: "Composition", type: "table", columns: ["Period", "Document", "Download"], rows: composition }],
      },
      {
        id: "policies",
        nav: "Policies",
        title: "Policies",
        text: "Information relating to Emaar’s business policies",
        tabs: [{ id: "policies", label: "Policies", type: "table", columns: COLS, rows: policies }],
      },
      {
        id: "annual-return",
        nav: "Annual Return",
        title: "Annual Return",
        tabs: [{ id: "annual-return", label: "Annual Return", type: "table", columns: COLS, rows: annualReturn }],
      },
      {
        id: "investor-contact",
        nav: "Investor Contact",
        title: "Investor Contact",
        tabs: [
          {
            id: "grievances",
            label: "Contact for Investor Grievances",
            type: "link",
            href: "https://cdn.in.emaar.com/wp-content/uploads/2024/02/4_Contact-for-Investor-Grivances.pdf",
          },
        ],
      },
    ],
  },
};