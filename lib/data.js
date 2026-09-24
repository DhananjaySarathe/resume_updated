export const profile = {
  name: 'Dhananjay Sarathe',
  firstName: 'Dhananjay',
  lastName: 'Sarathe',
  initials: 'DS',
  role: 'Founding SDE @ Quickads',
  tagline: 'Architectural Rigor & Execution',
  email: 'dhananjaysarathe26@gmail.com',
  phone: '+91 9009990470',
  location: 'Bengaluru, India',
  resume: 'https://drive.google.com/file/d/1rbqqwgv6kbOiYPGGvVe-xBZfqyIHPD4k/view?usp=sharing',
  // Paste a real Cal.com / Calendly URL here to turn the booking button into a scheduler link.
  // While empty, the button opens a pre-filled "Intro call" email instead.
  booking: '',
  activeHours: '09:00 – 23:00 IST',
  socials: {
    github: 'https://github.com/DhananjaySarathe',
    linkedin: 'https://www.linkedin.com/in/dhananjay-sarathe-835434149/',
    leetcode: 'https://leetcode.com/dhananjaysarathe26/',
  },
};

export const navLinks = [
  { id: 'overview', label: 'Overview' },
  { id: 'about', label: 'About' },
  { id: 'manual', label: 'Manual' },
  { id: 'experience', label: 'Experience' },
  { id: 'systems', label: 'Systems' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export const photos = {
  standing: { src: '/photos/standing.webp', width: 1024, height: 1536, alt: 'Dhananjay Sarathe leaning against a glass wall in soft evening light' },
  thinking: { src: '/photos/thinking.webp', width: 1122, height: 1402, alt: 'Dhananjay Sarathe at his desk beside a laptop, hand on chin, thinking' },
  desk: { src: '/photos/desk.webp', width: 1122, height: 1402, alt: 'Dhananjay Sarathe sitting on the edge of a desk in an open-plan office' },
};

// Each principle is anchored to something on the resume, not a slogan.
export const principles = [
  {
    code: 'P-01',
    title: 'Zero to one, then make it hold.',
    body: 'Joined the Quickads founding team at inception and carried the product from MVP to a multi-domain platform.',
    stat: { value: 2023, static: true, label: 'On the founding team since' },
  },
  {
    code: 'P-02',
    title: 'Speed is a feature.',
    body: 'Re-architected the Next.js frontend so pages load faster for every marketer who opens them.',
    stat: { value: 30, prefix: '−', suffix: '%', label: 'Page load time' },
  },
  {
    code: 'P-03',
    title: 'Build the kit before the hundredth screen.',
    body: 'Set up the design system and reusable UI kit early, so new modules ship on shared parts.',
    stat: { value: 40, prefix: '+', suffix: '%', label: 'Development speed' },
  },
  {
    code: 'P-04',
    title: 'If I can explain it, I understand it.',
    body: 'Ran 1:1 debugging sessions on C++ and data structures as a Teaching Assistant at Coding Ninjas.',
    stat: { value: 100, prefix: '', suffix: '+', label: 'Students mentored' },
  },
];

// Production systems shipped at Quickads, each described only by what the resume states.
export const systems = [
  {
    slug: 'ad-library',
    name: 'Ad Inspiration Library',
    tag: 'Research',
    summary: "A searchable library of more than a million indexed ads, so marketers can research what's running before they brief.",
    flow: ['Collect ads', 'Index 1M+', 'Research trends'],
    details: ['1M+ ads indexed and searchable.', "Improved marketers' ability to research ad trends."],
    stack: ['Next.js', 'Indexing', 'Search'],
  },
  {
    slug: 'discover',
    name: 'Discover',
    tag: 'Search',
    summary: 'Cross-platform ad search with filters that go deep enough to target a precise niche.',
    flow: ['Query', 'Filter', 'Results across platforms'],
    details: ['Search ads across multiple platforms from one place.', 'Powerful filters for precise targeting.'],
    stack: ['Next.js', 'Filters', 'Multi-platform'],
  },
  {
    slug: 'live-search',
    name: 'Live Search',
    tag: 'Realtime',
    summary: 'Scrapes and analyzes Meta ads in real time, then breaks each one down into signals a marketer can act on.',
    flow: ['Scrape Meta ads', 'Transcribe', 'Find the hook', 'Rate quality'],
    details: ['Real-time scraping and analysis of Meta ads.', 'Insights per ad: quality rating, hook identification, transcriptions.'],
    stack: ['Scraping', 'Meta Ads', 'AI analysis'],
  },
  {
    slug: 'eve',
    name: 'Eve',
    tag: 'Analytics',
    summary: 'An analytics module that plugs into Meta ad accounts and sorts every creative into one of four marketing funnels.',
    flow: ['Connect Meta account', 'Classify creatives', 'Map to 4 funnels', 'Campaign insights'],
    details: ['Integrates directly with Meta accounts.', 'Categorizes creatives into 4 marketing funnels for actionable campaign insights.'],
    stack: ['Meta Graph API', 'Analytics', 'Funnels'],
  },
  {
    slug: 'adam',
    name: 'ADAM · SPY Agents',
    tag: 'Agents',
    summary: 'Agents that scrape competitor brands and keywords every day and report back on how their ads are performing.',
    flow: ['Track brands & keywords', 'Daily live scrape', 'Performance analysis'],
    details: ['Daily live scraping of competitor brands and keywords.', 'Fresh competitive insights with automated performance analysis.'],
    stack: ['SPY Agents', 'Scheduling', 'Automation'],
  },
];

export const topTicker = [
  { mark: '●', accent: 'lime', text: 'Quickads 0→1 Founding SDE' },
  { mark: '◈', accent: 'cyan', text: '1M+ ads indexed & scraped in realtime' },
  { mark: '▲', accent: 'lime', text: 'Latency < 45ms high performance' },
  { mark: '◈', accent: 'cyan', text: 'AST dependency & CLI architect' },
  { mark: '●', accent: 'lime', text: 'Next.js + AI vision workflows' },
];

export const heroSpecializations = ['Next.js Ecosystems', 'AdTech AI Pipelines', 'Sub-second Scraping'];

export const about = {
  bio: "I am a Full Stack Engineer with a passion for building scalable, AI-driven applications. As a Founding Member at Quickads, I've driven 0→1 development, scaled distributed architectures, and integrated complex AI models into user-friendly production software. I specialize in Next.js ecosystems, high-throughput scraping pipelines, and client-side performance optimization.",
  highlights: ['Zero to One Execution', 'Meta Graph API', 'Sub-second Scraping', 'Design Systems'],
};

export const disciplines = [
  {
    title: 'Frontend Architecture',
    icon: 'layout',
    accent: 'lime',
    desc: 'Building scalable, high-performance UI/UX using Next.js and React. Reduced page load times by 30% in production environments.',
    stack: 'Next.js • React • SSR',
  },
  {
    title: 'AI Integration',
    icon: 'brain',
    accent: 'cyan',
    desc: 'Integrating LLMs (OpenAI) and Vision APIs into web apps. Experience creating prompt-to-ad generation workflows and analytic agents.',
    stack: 'OpenAI • Vision • Agents',
  },
  {
    title: 'Full Stack Development',
    icon: 'server',
    accent: 'lime',
    desc: 'End-to-end development from database design to frontend implementation. Proficient in ensuring seamless data flow and state management.',
    stack: 'State • APIs • Schemas',
  },
  {
    title: 'Web Scraping & Automation',
    icon: 'scan',
    accent: 'cyan',
    desc: 'Building complex scrapers (SPY Agents) for competitive analysis and real-time data gathering across multiple high-volume platforms.',
    stack: 'SPY Agents • Meta Ad Lib',
  },
];

// Wrap a phrase in **double asterisks** to render it bold.
export const experiences = [
  {
    role: 'Founding Member (SDE)',
    company: 'Quickads',
    period: 'Jan 2025 – Present',
    current: true,
    summary:
      'Co-founded and scaled AI-driven AdTech startup. Building an ecosystem for research, creation, and publishing of ads on Meta.',
    achievements: [
      'Designed and implemented a Next.js-based scalable frontend architecture, reducing page load times by **30%** and enabling multi-domain integrations.',
      'Shipped **five production systems** end to end, from the 1M+ ad library to agents that watch competitors daily.',
    ],
    // Renders the system chips that deep-link into the Systems console.
    showSystems: true,
    tags: ['Next.js', 'Meta Graph API', 'SPY Agents', 'Eve Funnels', 'TypeScript'],
  },
  {
    role: 'Software Engineering Intern (Founding Team)',
    company: '88 Ventures / Quickads',
    period: 'Aug 2023 – Dec 2024',
    summary: 'Contributed as founding engineer during product inception, driving 0→1 development.',
    achievements: [
      'Built core frontend components with Next.js + TypeScript, ensuring scalability and reusability across modules.',
      'Integrated AI models (OpenAI, Vision APIs) into ad-creation workflows, enabling prompt-to-ad generation.',
      'Established design system & reusable UI kit, improving development speed by **40%**.',
      'Worked closely with founding members to define MVP features, accelerate product-market fit, and onboard early adopters.',
    ],
    tags: ['Design Systems', 'Prompt-to-Ad', 'Vision APIs'],
  },
  {
    role: 'Teaching Assistant (Intern)',
    company: 'Coding Ninjas',
    period: 'Sep 2022 – Jan 2023',
    summary: 'Mentored students in computer science fundamentals.',
    achievements: [
      'Mentored **100+ students** in C++ and Data Structures, improving problem-solving accuracy.',
      'Conducted 1:1 debugging sessions focusing on error detection, optimization, and best practices.',
    ],
    tags: ['C++', 'Algorithms', 'Data Structures'],
  },
];

export const projects = [
  {
    title: 'ExpenseWaale',
    category: 'FinTech Web App',
    accent: 'lime',
    url: 'https://expensewalle.vercel.app/',
    desc: 'A simple and powerful expense-splitting web app with group finance management and optimized transactional settling.',
    tags: ['Full Stack', 'Database', 'Analytics'],
    notes: [
      "Built a full-stack web app with a proper database to manage shared expenses across multiple groups using a 'SplitSpaces' system, so flats, trips and events each get their own ledger.",
      "Implemented expense categorization, real-time balance and settlement calculations, PDF export, email report delivery, and filtering across dates, members and categories.",
      "Built analytics for spending insights, category-wise consumption, contributor rankings and fairness scoring.",
    ],
  },
  {
    title: 'Prunify',
    category: 'Developer Tool / CLI',
    accent: 'amber',
    url: 'https://www.npmjs.com/package/prunify',
    desc: 'AI-assisted Node.js CLI for codebase cleanup, dependency analysis, dead code elimination, and AST graph visualization.',
    tags: ['Node.js', 'TypeScript', 'AST/Graph Analysis'],
    notes: [
      "Engineered a zero-config Node.js CLI that builds an import graph to detect dead exports, dependency cycles, unused public assets and npm package drift in TS/JS codebases.",
      "Designed a deterministic analysis engine that keeps logic separate from LLM execution, generating a structured ai_prompt.tsx to hand duplicate-code clustering to Copilot/Cursor without hallucination risk.",
      "Added CI gating (--ci flag) to stop technical debt piling up, plus an interactive terminal UI that generates HTML health reports.",
    ],
  },
  {
    title: 'StockTax Pro',
    category: 'Tax Planning Platform',
    accent: 'cyan',
    url: 'https://stock-tax-pro.vercel.app/',
    desc: 'Tax optimization platform for Indian traders featuring multi-broker support, SheetJS parsing, and GPT-assisted recommendations.',
    tags: ['React', 'TypeScript', 'Zustand', 'GPT-4o-mini'],
    notes: [
      "Built a multi-broker tax engine for AngelOne, Zerodha and Upstox: auto-detects file formats, normalizes trades under one PAN, and computes consolidated STCG/LTCG with pre/post July 2024 rate awareness.",
      "Engineered a Tax Loss Harvesting optimizer that scores unrealized losses and recommends the fewest stocks to sell for the largest offset, accounting for Indian offset rules, brokerage and LTCG proximity.",
      "Integrated GPT-4o-mini for personalized harvest recommendations that flag missed exemptions, wash-sale risk and timing.",
      "Built a tax simulation engine with what-if trades, advance tax planning (Section 234B/234C) and scenario comparison.",
    ],
  },
];

export const stack = [
  { category: 'Languages', accent: 'lime', items: ['C/C++', 'Python', 'JavaScript', 'TypeScript'] },
  { category: 'Frameworks & Web', accent: 'cyan', items: ['React.js', 'Next.js', 'Tailwind CSS', 'HTML+CSS'] },
  { category: 'AI & Backend', accent: 'lime', items: ['OpenAI API', 'Vision APIs', 'System Design', 'Web Scraping'] },
  { category: 'Tooling & Workflows', accent: 'cyan', items: ['Git/GitHub', 'AST Analyzers', 'Node.js CLI', 'SheetJS'] },
];
