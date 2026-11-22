const cdn = "https://cdn.in.emaar.com/wp-content/uploads/";
const l = (title, path) => ({ title, href: cdn + path });
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const project = (title, items) => ({ id: `env-${slug(title)}`, title, items });

const publicNotices = [
  l("Earlier approved layout plan – Marbella plotted residential colony", "2025/06/Earlier-approved-layout-plan-marbella-plotted-residential-colony.pdf"),
  l("In Principle approval for revised layout – Marbella residential plotted colony 10.06.2025", "2025/06/In-Principle-approval-for-revised-layout-marbella-residential-plotted-colony.pdf"),
  l("Earlier approved site plan for Digi Homes Phase-1 Dated 25.02.2019", "2024/08/1.Earlier-approved-site-plan-for-Digi-Homes-Phase-1-Dated-25.02.2019-compressed.pdf"),
  l("Approved Phasing Plan-Digi homes dated 16.07.24", "2024/08/2.Approved-Phasing-Plan-Digi-homes-dated-16.07.24-compressed.pdf"),
  l("In principle Approved Revised site plan Digi Homes – 13 Aug 24", "2024/08/3.In-principle-Approved-Revised-site-plan_Digi-Homes_13-Aug-24-compressed.pdf"),
  l("Revised site plan showing proposed revisions from earlier approved plan", "2024/08/4.Revised-site-plan-showing-proposed-revisions-from-earlier-approved-plan-compressed.pdf"),
  l("Towers A,B & C from earlier approved plan Dated 25.02.2019", "2024/08/Towers-AB-C-FROM-EARLIER-APPROVED-PLAN-DATED-25.02.2019.pdf.jpg"),
  l("In-principle approved – revision of Building Plan additing staircase-3 Capital Tower-II dt 11.08.2023", "2023/08/In-principle-approved-revision-of-Building-Plan-additing-staircase-3-Capital-Tower-II-dt-11.08.2023.pdf"),
  l("Site plan – in-principle approval for additional stair case Capital Tower-II dt 11.08.2023", "2023/08/site-plan-in-principle-approval-for-additional-stair-case-Capital-Tower-II-dt-11.08.2023.pdf"),
  l("Site Plan – previous approved Building Plans CP-2", "2023/08/Site-Plan-previous-approved-Building-Plans-CP-2.jpg"),
  l("Marbella layout 2017", "2022/09/Marbella_layout_2017-scaled.jpeg"),
  l("In principle approved layout Marbella 2022", "2022/09/In-principle-approved-layout-Marbella-2022.pdf"),
  l("Change of Developer in the favour of Seashore Realtors Private Limited for sector 103 for 6.66875 acres", "2022/07/Change-of-Developer.pdf"),
  l("DTCP Change of Developer request application from Emaar India to Seashore Realtors Private Limited for 6.66875 acres in Sector 103, Gurugram", "2022/07/DTCP-Change-of-Developer.pdf"),
  l("Emerald Hills_Approved_In-principle Layout_177.8595acres_26052022", "2022/05/Emerald-Hills_Approved_In-principle-Layout_177.8595acres_26052022.pdf"),
  l("Emerald Hills_Layout Plan_195.240 Acres_2021_ZP-560_22062021", "2022/05/Emerald-Hills_Layout-Plan_195.240-Acres_2021_ZP-560_22062021.pdf"),
  l("Earlier approved layout Plan of Commercial Plotted Colony, License no. 14 of 2021 “EBD-114” for area measuring 6.40625 Acres in Sector 114, Gurugram", "2022/05/Approved-layout_7703-16.03.2021_6.40625-Acres.jpg"),
  l("In principle approved layout Plan of Commercial Plotted Colony, License no. 14 of 2021 “EBD-114” for revised area measuring 17.80625 Acres in Sector -114, Gurugram", "2022/05/In-Principle-Approved_8293_09052022.pdf"),
  l("Earlier Approved revised layout Plan of License No. 10 of 2009 and 113 of 2011, Emerald Hills, a Residential Plotted Colony in Sector-62 & 65, Gurugram", "2021/06/Earlier-Approved-Revised-Layout-Plan.jpg"),
  l("In-principally approved Revised Layout cum Demarcation Plan of License No. 10 of 2009 and 113 of 2011, Emerald Hills, a Residential Plotted Colony in Sector-62 & 65, Gurugram", "2021/06/In-principle-approval-Emerald-Hills-1.pdf"),
  l("In Principle approval of Revised Layout cum Demarcation Plan of License No. 10 of 2009 and 113 of 2011, Emerald Hills, a Residential Plotted Colony in Sector-62 & 65, Gurugram", "2021/06/Drawing-of-revised-Layout-Emerald-Hills.pdf"),
];

const policies = [
  l("POSH Policy", "2026/10/POSH-Policy.pdf"),
  l("Code of Conduct Policy", "2026/08/Code-of-Conduct-Policy.pdf"),
  l("POSH Committee", "2026/08/POSH_Committee_2026_V2.pdf"),
];

const environmental = [
  project("Mohali Hills", [
    l("Final Compliance Report June 2026", "2026/06/Final_Mohali_Hills_Six_Monthly_Compliance_Report_June_2026.pdf"),
    l("Final EC Compliance Report June 2025", "2026/02/ec-compliance-report-mohali-hills-june-2025.pdf"),
  ]),
  project("Jaipur Greens", [
    l("Final Compliance Jaipur Greens Dec 2023", "2024/01/Final-Compliance_Jaipur-Greens_Dec-2023.pdf"),
    l("EC Letter August 13, 2008", "2024/01/EC-letter-_August-13_2008.pdf"),
  ]),
  project("Colonnade", [
    l("Final Compliance June 2026", "2026/06/Final_Colonnade_Compliance_Report_June_2026.pdf"),
    l("Combined – Collonade EC", "2021/06/Combined-Collonade-EC.pdf"),
    l("Compliance Letter Colonnade Dec 2020", "2021/06/Compliance-Letter-Colonnade-Dec-2020.pdf"),
    l("Final Compliance Colonnade June 2021", "2021/06/Final-Compliance-Colonnade-June-2021.pdf"),
    l("Newspaper – TRIBUNE Delhi-Edition—NCR_16_April_2018-page-4", "2021/06/TRIBUNE-Delhi-Edition-NCR_16_April_2018-page-4.pdf"),
    l("Newspaper – TRIBUNE Haryana-Edition—HR_16_April_2018-page-4", "2021/06/TRIBUNE-Haryana-Edition-HR_16_April_2018-page-4.pdf"),
  ]),
  project("Capital Tower 1", [
    l("Capital Tower – Newspaper Ad", "2021/06/Capital-Tower-Newspaper-Ad.pdf"),
    l("Compliance_Report_CT1 December 2020", "2021/06/Compliance_Report_CT1-December-2020.pdf"),
    l("CT 1 – Environmental Clearance", "2021/06/CT-1-Environmental-Clearance.pdf"),
    l("Final Compliance_Commercial_Colony_3.833_Acres", "2021/06/Final-Compliance_Commercial_Colony_3.833_Acres.pdf"),
  ]),
  project("Capital Tower 2", [
    l("Capital Tower 2 compliance Dec 2020", "2021/06/Capital-Tower-2-compliance-Dec-2020.pdf"),
    l("Capital Tower 2 EC", "2021/06/Capital-Tower-2-EC.pdf"),
    l("Final Compliance_Commercial_Colony_2.44375_Acres", "2021/06/Final-Compliance_Commercial_Colony_2.44375_Acres.pdf"),
    l("Newspaper – TRIBUNE Delhi-Edition—NCR_16_April_2018-page-4", "2021/06/TRIBUNE-Delhi-Edition-NCR_16_April_2018-page-4-1.pdf"),
    l("Newspaper – TRIBUNE Haryana-Edition—HR_16_April_2018-page-4", "2021/06/TRIBUNE-Haryana-Edition-HR_16_April_2018-page-4-1.pdf"),
  ]),
  project("Digital Greens", [
    l("Final Compliance June 2026", "2026/06/Final_Digital_Greens_Compliance_June_2026.pdf"),
    l("Compliance_Report_Digital_Greens_Dec_2020", "2021/06/Compliance_Report_Digital_Greens_Dec_2020.pdf"),
    l("DG – Advt Copy", "2021/06/DG-Advt-Copy.pdf"),
    l("DG – EC", "2021/06/DG-EC.pdf"),
    l("Final Compliance DG June 2021", "2021/06/Final-Compliance-DG-June-2021.pdf"),
  ]),
  project("Ekaantam", [
    l("Final Compliance June 2026", "2026/06/Final_Ekaantam_Six-Monthly_Report_June_2026.pdf"),
    l("Cover Letter Ekaantam", "2021/06/Cover-Letter-Ekaantam.pdf"),
    l("Cover_Letter_Ekaantam June 2021", "2021/06/Cover_Letter_Ekaantam-June-2021.pdf"),
    l("Ekaantam – EC", "2021/06/Ekaantam-EC.pdf"),
    l("Ekaantam – Newspaper Ad", "2021/06/Ekaantam-Newspaper-Ad.docx"),
  ]),
  project("Emaar Business Park", [l("EBD – EC", "2021/06/EBD-EC.pdf")]),
  project("Palm Drive", [
    l("Final Compliance June 2026", "2026/06/Final_Compliance_Report_Palm-Drive_June_2026.pdf"),
    l("Compliance Report_PD_Dec_2020", "2021/06/Compliance-Report_PD_Dec_2020.pdf"),
    l("Final Compliance PD June 2021", "2021/06/Final-Compliance-PD-June-2021.pdf"),
    l("PD_EC", "2021/06/PD_EC.pdf"),
  ]),
  project("Palm Terrace Select", [
    l("Compliance Report PTS Dec 2020", "2021/05/Compliance-Report-PTS-Dec-2020.pdf"),
    l("EC_ Palm Terrace Select 11.7.2012", "2021/05/EC_-Palm-Terrace-Select-11.7.2012.pdf"),
    l("Palm Terrace Select-Newspaper Ad", "2021/05/Palm-Terrace-Select-Newspaper-Ad.pdf"),
  ]),
  project("Gomti Green", [
    l("Final Compliance June 2026", "2026/06/Final_Compliance_Report_Gomti_Greens_June_2026.pdf"),
    l("Final Compliance Gomti June 2021", "2021/05/Final-Compliance-Gomti-June-2021.pdf"),
    l("Gomti Green EC", "2021/05/Gomti-Green-EC.pdf"),
    l("Gomti Greens newspaper dated 24 Apr 2013", "2021/05/Gomti-Greens-newspaper-dated-24-Apr-2013.pdf"),
  ]),
  project("Palm Gardens", [
    l("Compliance Report PG Dec 2020", "2021/05/Compliance-Report-PG-Dec-2020.pdf"),
    l("EC – Palm Garden", "2021/05/EC-Palm-Garden.pdf"),
    l("Final Compliance PG June 2021", "2021/05/Final-Compliance-PG-June-2021.pdf"),
    l("Palm Garden-Newspaper Ad", "2021/05/Palm-Garden-Newspaper-Ad.pdf"),
  ]),
  project("Marbella", [
    l("Final Compliance June 2026", "2026/06/Final_Marbella_Compliance_Report_June_2026.pdf"),
    l("Final Compliance Dec 2025", "2026/02/Final-Marbella-Compliance-Report-Dec-2025.pdf"),
    l("Final Compliance June 2025", "2026/02/Final-Marbella-Compliance-Report-June-2025.pdf"),
    l("Final Compliance June 2023", "2023/09/Marbella_Compliance_June-2023.pdf"),
  ]),
  project("Gurgaon Greens", [l("Final Compliance June 2026", "2026/06/Final_Six_Monthly_Compliance_Report_Gurgaon_Greens_June_2026.pdf")]),
  project("India Business Centre", [l("Final Compliance June 2026", "2026/06/Final_India_Business_Centre_Six_Monthly_Report_June_2026.pdf")]),
  project("Emerald Hills", [l("Final Compliance June 2026", "2026/06/Final_Emerald_Hills_Compliance_Report_June_2026.pdf")]),
  project("Digihomes", [l("Final Compliance June 2026", "2026/06/Final_Digihomes_Compliance_Report_June_2026.pdf")]),
  project("Commercial Colony", [l("Final Compliance June 2026", "2026/06/Final_CT1_Acres_Six_Monthly_Report_June_2026.pdf")]),
];

export const compliance = {
  seo: {
    title: "Notices & Compliance | Emaar India",
    description: "Public notices, policies and environmental compliance reports for Emaar India projects.",
    image: "/images/hero-poster.jpg",
  },
  masthead: {
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "About Emaar", href: "/about-emaar" },
      { label: "Notices" },
    ],
    title: "Notices",
    lede: "Public notices, policies and environmental compliance reports for Emaar India projects.",
  },
  spine: {
    indexLabel: "Notice sections",
    groups: [
      { id: "public-notices", nav: "Public Notices", title: "Public Notices", items: publicNotices },
      { id: "policy", nav: "Policy", title: "Policy", items: policies },
      { id: "environmental-policy", nav: "Environmental Policy", title: "Environmental Policy", sections: environmental },
    ],
  },
};