export const site = {
  name: "Appigon",
  legalName: "Appigon", // Replace with full registered entity name when ready
  tagline: "Apps. Built to dominate.",
  description:
    "Appigon develops mobile apps, high-converting landing pages, and full App Store & Google Play release support — then keeps your product winning after launch.",
  email: "hello@appigon.com",
  /** Add when ready — hidden in UI while empty */
  phone: "",
  locations: ["Warsaw", "Kyiv", "Remote"],
  /** Add real profiles when ready — empty = hidden in footer */
  socials: [] as { label: string; href: string }[],
  governingLaw: "Poland",
  headOffice: "Warsaw, Poland",
  responseTime: "1 business day",
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/cases", label: "Cases" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const footerNav = {
  studio: [
    { href: "/services", label: "Services" },
    { href: "/cases", label: "Cases" },
    { href: "/about", label: "About" },
    { href: "/studio", label: "Studio" },
    { href: "/contact", label: "Start a project" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/cookies", label: "Cookie Policy" },
  ],
};

/** @deprecated use footerNav — kept for any lingering imports */
export const footerLinks = footerNav.legal;

export const services = [
  {
    id: "01",
    title: "App Development",
    copy: "iOS and Android products engineered for speed, polish, and scale — from MVP to production release.",
  },
  {
    id: "02",
    title: "Landing Pages",
    copy: "Conversion-focused launch pages that explain the product fast and push installs, demos, and signups.",
  },
  {
    id: "03",
    title: "App Store Support",
    copy: "Metadata, screenshots, review prep, compliance, and ASO so Apple approval and discovery actually work.",
  },
  {
    id: "04",
    title: "Android / Play Support",
    copy: "Google Play listing, store assets, policies, and release tracks ready for clean Android launches.",
  },
  {
    id: "05",
    title: "Market Release",
    copy: "We take the product live — rollout plan, analytics, soft launch, and a controlled path to public launch.",
  },
  {
    id: "06",
    title: "Ongoing App Support",
    copy: "Updates, fixes, experiments, and growth after release so the product keeps performing in-market.",
  },
];

/** Kept for services page delivery overview — not the homepage conversion block */
export const processSteps = [
  {
    step: "01",
    title: "Build",
    copy: "Define the product, design the experience, and develop a shippable iOS / Android app.",
  },
  {
    step: "02",
    title: "Land",
    copy: "Create landing pages that sell the value before users ever open the store.",
  },
  {
    step: "03",
    title: "Submit",
    copy: "Prepare App Store and Google Play assets, policies, and submission packages.",
  },
  {
    step: "04",
    title: "Grow",
    copy: "Release to market, monitor performance, and support the product for long-term success.",
  },
];

/** Homepage conversion: commercial paths that reduce buying friction */
export const engagementModels = [
  {
    id: "01",
    title: "Discovery sprint",
    timeline: "5–10 days",
    priceHint: "Fixed fee",
    copy: "Scope, architecture, store risk review, and a written build plan with timeline + budget. You leave with clarity — not a vague pitch deck.",
    outcome: "Signed SOW-ready brief",
  },
  {
    id: "02",
    title: "Build & launch",
    timeline: "Milestone SOW",
    priceHint: "Deposit + stages",
    copy: "App, landings, and store submission under one agreement. Payments unlock milestones. IP transfer is written into the contract on payment.",
    outcome: "Live product in market",
  },
  {
    id: "03",
    title: "Growth retainer",
    timeline: "Monthly",
    priceHint: "Retainer",
    copy: "Post-launch updates, store optimization, crash response, and conversion experiments so the product keeps compounding after day one.",
    outcome: "Stable shipping cadence",
  },
];

/** Buyer objections that block agency conversion — answered on-page */
export const conversionFaqs = [
  {
    q: "What does a typical project cost?",
    a: "Most build engagements start after a paid discovery sprint so the number is grounded in scope — not a guess. You get a fixed or capped quote, payment schedule, and change-order rules in writing before work begins.",
  },
  {
    q: "How fast can we start and ship?",
    a: "Discovery can start within a few business days of signed agreement and deposit. Build timelines depend on scope; we publish a milestone calendar in the SOW so launch dates are contractual, not aspirational.",
  },
  {
    q: "Who owns the code, design, and IP?",
    a: "Proprietary rights to deliverables created for you transfer under a written services agreement (required under Polish copyright rules). Transfer typically completes on acceptance and payment of the related milestone. Third-party tools and open-source stay under their own licenses.",
  },
  {
    q: "What if App Store or Google Play rejects us?",
    a: "Store compliance is part of our delivery path. We prep listings, policies, and review responses. If a rejection is caused by guideline issues in our scope, we remediate as part of the engagement. Policy or content decisions outside our control are handled via change order.",
  },
  {
    q: "How do payments and refunds work?",
    a: "Discovery is prepaid. Build work uses a deposit plus milestone invoices. Completed and accepted milestones are non-refundable. Unused prepaid retainer hours may roll per the SOW. Website inquiries never create a charge — only a signed agreement does.",
  },
  {
    q: "Do you only take large companies?",
    a: "No. We work with funded startups and established teams. Fit matters more than size: clear product owner, decision speed, and a real path to market. If we're not the right studio, we'll say so on the first call.",
  },
];

export const scrollChapters = [
  {
    id: "develop",
    index: "01",
    title: "App Development",
    line: "We build the product people keep opening.",
    body: "iOS and Android apps with solid architecture, sharp UX, and production quality from day one.",
    points: [
      "MVP → production roadmap",
      "Native-feel performance",
      "Clean scalable codebase",
      "QA before every release",
    ],
  },
  {
    id: "landing",
    index: "02",
    title: "Landing Pages",
    line: "Pages that convert before the store click.",
    body: "Launch pages that explain value fast, build trust, and push installs, demos, and waitlists.",
    points: [
      "Offer + CTA clarity",
      "Mobile-first conversion",
      "A/B ready sections",
      "Analytics wired in",
    ],
  },
  {
    id: "ios",
    index: "03",
    title: "App Store Support",
    line: "Apple submission without the panic.",
    body: "We prep listings, screenshots, guidelines, and review responses so iOS launch stays on schedule.",
    points: [
      "Metadata + ASO copy",
      "Screenshot sets",
      "Guideline compliance",
      "Review reply support",
    ],
  },
  {
    id: "android",
    index: "04",
    title: "Android Support",
    line: "Google Play ready — clean and staged.",
    body: "Play Console setup, store creatives, policies, and release tracks for a controlled Android launch.",
    points: [
      "Play Console setup",
      "Store listing assets",
      "Policy checks",
      "Staged rollouts",
    ],
  },
  {
    id: "release",
    index: "05",
    title: "Market Release",
    line: "From build complete to live users.",
    body: "Soft launch, analytics, rollout control, and a public release plan that hits the ground running.",
    points: [
      "Soft-launch plan",
      "Crash + funnel tracking",
      "Rollout percentages",
      "Launch day checklist",
    ],
  },
  {
    id: "support",
    index: "06",
    title: "Ongoing Support",
    line: "We stay after the launch party.",
    body: "Updates, store optimization, fixes, and growth work so the product keeps winning in-market.",
    points: [
      "Feature iterations",
      "Store optimization",
      "Bugfix + uptime",
      "Growth experiments",
    ],
  },
];

export const cases = [
  {
    slug: "volt-finance",
    title: "Volt Finance",
    category: "Fintech · iOS / Android",
    year: "2025",
    metric: "+214% MAU",
    summary:
      "Built and released a payments app with App Store + Play listings, launch landings, and post-release growth support.",
    result: "4.8★ store rating · 1.2M transactions / month",
    color: "#ef1a12",
  },
  {
    slug: "nightline",
    title: "Nightline",
    category: "Social · Flutter",
    year: "2025",
    metric: "3.4M installs",
    summary:
      "Full product build, conversion landings, and store assets that helped Nightline get featured on the App Store.",
    result: "38% D30 retention · featured in App Store",
    color: "#ff3b30",
  },
  {
    slug: "forge-health",
    title: "Forge Health",
    category: "Healthtech · React Native",
    year: "2024",
    metric: "0 → Series A",
    summary:
      "From idea to market: mobile app, patient landing funnels, store compliance, and ongoing product support.",
    result: "$8.2M raised · HIPAA-ready architecture",
    color: "#c40000",
  },
  {
    slug: "apex-delivery",
    title: "Apex Delivery",
    category: "Logistics · Web + Mobile",
    year: "2024",
    metric: "-41% ops cost",
    summary:
      "Driver apps, ops web, and launch pages shipped together — then stabilized with continuous release support.",
    result: "12 countries live · 99.97% uptime",
    color: "#ff1f14",
  },
  {
    slug: "signal-crm",
    title: "Signal CRM",
    category: "B2B SaaS · Mobile + Web",
    year: "2026",
    metric: "2.1× pipeline",
    summary:
      "Product app + sales landings + store presence for mobile CRM workflows used in enterprise demos.",
    result: "Enterprise ACV +67% · 6-week redesign",
    color: "#ef1a12",
  },
  {
    slug: "orbit-learn",
    title: "Orbit Learn",
    category: "EdTech · iOS / Android",
    year: "2023",
    metric: "890k learners",
    summary:
      "Built, launched, and supported a learning app across App Store and Google Play with growth iterations.",
    result: "Top 10 Education · 4.9★",
    color: "#9a0a06",
  },
];

export const stats = [
  { value: "120+", label: "Apps & landings shipped" },
  { value: "38", label: "Markets launched" },
  { value: "4.9", label: "Avg. client score" },
  { value: "24/7", label: "Post-launch support" },
];

export const team = [
  {
    name: "Misha Dz.",
    role: "Founder · Product",
    focus: "Vision, deals, market release strategy",
  },
  {
    name: "A. Korolev",
    role: "Design Director",
    focus: "App UI systems & landing conversion",
  },
  {
    name: "N. Varga",
    role: "Eng Lead",
    focus: "iOS / Android architecture & delivery",
  },
  {
    name: "S. Hale",
    role: "Store & Growth Lead",
    focus: "ASO, Play Console, retention loops",
  },
];
