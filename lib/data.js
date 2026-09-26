import { formatNumber } from './format';

// All portfolio copy lives here. Content follows the resume; layout follows the Stitch
// "Luminescent Spatial Portfolio" design. Keep the voice plain and specific: say what
// was built and what changed, not how impressive it was.

export const profile = {
  name: 'Dhananjay Sarathe',
  firstName: 'Dhananjay',
  lastName: 'Sarathe',
  role: 'Founding SDE, Quickads',
  email: 'dhananjaysarathe26@gmail.com',
  phone: '+91 9009990470',
  location: 'Bengaluru, India',
  resume: 'https://drive.google.com/file/d/1rbqqwgv6kbOiYPGGvVe-xBZfqyIHPD4k/view?usp=sharing',
  // Paste a real Cal.com / Calendly URL here to turn "Book a call" into a scheduler link.
  // While empty, it opens a pre-filled email instead.
  booking: '',
  socials: {
    github: 'https://github.com/DhananjaySarathe',
    linkedin: 'https://www.linkedin.com/in/dhananjay-sarathe-835434149/',
    leetcode: 'https://leetcode.com/dhananjaysarathe26/',
  },
};

export const photos = {
  hero: {
    src: '/photos/thinking.webp',
    alt: 'Dhananjay Sarathe at his desk beside a laptop, hand on chin, thinking',
  },
  spotlight: {
    src: '/photos/desk.webp',
    alt: 'Dhananjay Sarathe sitting on the edge of a desk in an open-plan office',
  },
  standing: {
    src: '/photos/standing.webp',
    alt: 'Dhananjay Sarathe standing in the office',
  },
};

export const navLinks = [
  { id: 'metrics', label: 'Impact' },
  { id: 'disciplines', label: 'Focus' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'stack', label: 'Stack' },
  { id: 'connect', label: 'Contact' },
];

// Accent → Tailwind classes + the RGB triplet the glow effects read from --glow.
export const accents = {
  primary: { text: 'text-primary', groupText: 'group-hover:text-primary', glow: '76 215 246' },
  secondary: { text: 'text-secondary', groupText: 'group-hover:text-secondary', glow: '208 188 255' },
  tertiary: { text: 'text-tertiary', groupText: 'group-hover:text-tertiary', glow: '255 185 95' },
};

export const metrics = [
  {
    icon: 'search',
    accent: 'primary',
    label: 'Ad library',
    value: { to: 1000000, format: 'compact', suffix: '+' },
    title: 'Ads indexed',
    body: 'In the Ad Inspiration Library, which marketers search to see what is running.',
  },
  {
    icon: 'gauge',
    accent: 'secondary',
    label: 'Page speed',
    value: { to: 30, suffix: '%' },
    title: 'Faster page loads',
    body: 'After I rebuilt the Quickads frontend architecture in Next.js.',
  },
  {
    icon: 'rocket',
    accent: 'primary',
    label: 'Founding team',
    value: { arrow: ['0', '1'], sr: '0 to 1' },
    title: 'Built from day one',
    body: 'I joined in 2023, before the MVP, and helped decide what went into it.',
  },
  {
    icon: 'layers',
    accent: 'tertiary',
    label: 'Design system',
    value: { to: 40, suffix: '%' },
    title: 'Faster development',
    body: 'From the shared UI kit and design system I set up early on.',
  },
];

export const disciplines = [
  {
    icon: 'layout',
    accent: 'primary',
    badge: 'Next.js / React',
    title: 'Frontend architecture',
    body: 'I built the Quickads frontend architecture in Next.js, and every new screen uses the design system I set up.',
  },
  {
    icon: 'brain',
    accent: 'secondary',
    badge: 'OpenAI / Vision',
    title: 'AI features',
    body: 'Prompt-to-ad generation, ad transcription, hook detection and quality ratings, built on the OpenAI and Vision APIs.',
  },
  {
    icon: 'server',
    accent: 'tertiary',
    badge: 'End to end',
    title: 'Full-stack product work',
    body: 'Database schema to UI. Most features I ship need both, so I write both.',
  },
  {
    icon: 'radar',
    accent: 'primary',
    badge: 'SPY Agents',
    title: 'Scraping and agents',
    body: 'Agents that scrape competitor brands and keywords every day, a real-time scraper for Meta ads, and the reports built on what they collect.',
  },
];

export const experience = [
  {
    role: 'Founding Member (Software Development Engineer)',
    company: 'Quickads',
    companyUrl: 'https://quickads.ai',
    period: 'Jan 2024 - Present',
    current: true,
    accent: 'primary',
    summary:
      'Quickads is an AI platform for researching, creating and publishing ads on Meta. I joined as part of the founding team in 2023 and have worked on most of the product since.',
    highlights: [
      {
        icon: 'gauge',
        title: 'Next.js architecture',
        body: 'Rebuilt the frontend architecture in Next.js. It now serves multiple domains.',
      },
      {
        icon: 'library',
        title: 'Ad Inspiration Library',
        body: 'The searchable library marketers browse to see which ads are working.',
      },
      {
        icon: 'search',
        title: 'Discover and Live Search',
        body: 'Discover searches ads across platforms with detailed filters. Live Search scrapes Meta ads in real time and adds quality ratings, hooks and transcripts.',
      },
      {
        icon: 'bot',
        title: 'Eve and ADAM',
        body: 'Eve connects to a Meta ad account and sorts every creative into one of 4 marketing funnels. ADAM scrapes competitor brands and keywords daily.',
      },
    ],
  },
  {
    role: 'Software Engineering Intern (Founding Team)',
    company: '88 Ventures / Quickads',
    period: 'Aug 2023 - Dec 2023',
    accent: 'secondary',
    points: [
      'Built core frontend components in Next.js and TypeScript while the product was first taking shape.',
      'Added OpenAI and Vision APIs to the ad-creation flow, which made prompt-to-ad generation possible.',
      'Set up a design system and reusable UI kit that sped up development by about 40%.',
      'Worked with the founders on the MVP feature list and helped onboard the first users.',
    ],
  },
  {
    role: 'Teaching Assistant (Intern)',
    company: 'Coding Ninjas',
    period: 'Sep 2022 - Jan 2023',
    accent: 'outline',
    summary:
      'Mentored 100+ students in C++ and data structures, mostly through 1:1 debugging sessions on their own code.',
  },
];

// Each rule carries a footnote that says where in the work it came from.
export const principles = [
  {
    n: '01',
    mark: '*',
    text: 'Ship the first version, then make it hold up.',
    proof:
      'As an intern I built the core frontend components while the product was taking shape. As a founding member I rebuilt the frontend architecture in Next.js.',
  },
  {
    n: '02',
    mark: '†',
    text: 'Page speed is part of the feature.',
    proof:
      'Rebuilding the Quickads frontend in Next.js made pages load 30% faster. This page also measures its own load, down in the footer.',
    proofLink: { text: 'measures its own load', href: '#colophon' },
  },
  {
    n: '03',
    mark: '‡',
    text: 'Build the UI kit before the hundredth screen.',
    proof: 'I set up the Quickads design system and UI kit as an intern. Every screen built since uses it.',
  },
  {
    n: '04',
    mark: '§',
    text: 'If I can explain it, I understand it.',
    proof:
      'From my time as a teaching assistant at Coding Ninjas, where most of the job was debugging students\' code with them, one on one.',
  },
];

export const projects = [
  {
    title: 'ExpenseWaale',
    slug: 'expensewaale',
    icon: 'wallet',
    accent: 'primary',
    badge: 'Web app',
    category: 'Split expenses with flatmates and friends',
    url: 'https://expensewalle.vercel.app/',
    desc: "Groups for flats, trips and events (I call them 'SplitSpaces'), live balances, settle-up maths and spending charts.",
    tags: ['Full stack', 'Database', 'Analytics'],
    notes: [
      'Every flat, trip or event gets its own ledger, so shared costs never mix.',
      'Categories, live balance and settlement maths, PDF export, emailed reports, and filters by date, member and category.',
      'Charts for category-wise spend, who contributed most, and a fairness score.',
    ],
  },
  {
    title: 'Prunify',
    slug: 'prunify',
    icon: 'terminal',
    accent: 'secondary',
    badge: 'npm package',
    category: 'Find dead code in TS/JS projects',
    url: 'https://www.npmjs.com/package/prunify',
    desc: 'A zero-config Node.js CLI. It builds an import graph of your codebase and flags dead exports, circular dependencies, unused assets and npm drift.',
    tags: ['Node.js', 'TypeScript', 'AST', 'CLI'],
    notes: [
      'The analysis is deterministic. The LLM only gets a structured ai_prompt.tsx for grouping duplicate code, so it has nothing to hallucinate about.',
      'A --ci flag fails the build when new dead code shows up.',
      'An interactive terminal UI that writes an HTML health report.',
    ],
  },
  {
    title: 'StockTax Pro',
    slug: 'stocktax-pro',
    icon: 'calculator',
    accent: 'tertiary',
    badge: 'Web app',
    category: 'Capital gains tax for Indian traders',
    url: 'https://stock-tax-pro.vercel.app/',
    desc: 'Upload an AngelOne, Zerodha or Upstox tradebook and it works out your STCG and LTCG, then suggests which losses to harvest using GPT-4o-mini.',
    tags: ['React', 'TypeScript', 'SheetJS', 'GPT-4o-mini'],
    notes: [
      'Trades from several brokers are merged under one PAN, with the July 2024 rate change handled.',
      'The harvesting optimizer picks the fewest sells that give the biggest offset under Indian set-off rules.',
      'What-if simulations and advance tax planning for Sections 234B and 234C.',
    ],
  },
];

export const stack = [
  { title: 'Languages', icon: 'code', accent: 'primary', items: ['TypeScript', 'JavaScript', 'C / C++', 'Python'] },
  {
    title: 'Frontend',
    icon: 'layout',
    accent: 'secondary',
    items: ['Next.js', 'React', 'Tailwind CSS', 'Zustand'],
  },
  {
    title: 'AI and backend',
    icon: 'bot',
    accent: 'tertiary',
    items: ['OpenAI API', 'Vision APIs', 'Node.js', 'Web scraping'],
  },
  {
    title: 'Tooling',
    icon: 'wrench',
    accent: 'primary',
    items: ['AST analysis', 'SheetJS', 'System design'],
  },
];

// The five Quickads products named under Experience. The hero count is derived from this.
const modules = ['Ad Inspiration Library', 'Discover', 'Live Search', 'Eve', 'ADAM'];

const adsIndexed = metrics[0].value;

export const heroFacts = [
  { icon: 'navigation', accent: 'primary', text: profile.location },
  { icon: 'boxes', accent: 'tertiary', text: `${modules.length} modules shipped`, href: '#quickads-modules' },
  {
    icon: 'database',
    accent: 'secondary',
    text: `${formatNumber(adsIndexed.to, adsIndexed.format)}${adsIndexed.suffix} ads indexed`,
  },
];
