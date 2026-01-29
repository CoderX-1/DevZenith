
import { Project, Metric } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'VALORANT MASTERS',
    year: '2024',
    category: 'BRAND IDENTITY',
    imageUrl: 'https://picsum.photos/seed/valorant/1920/1080',
    successMetric: '+140% CONVERSION'
  },
  {
    id: '2',
    title: 'RED BULL RACING',
    year: '2023',
    category: 'DIGITAL EXPERIENCE',
    imageUrl: 'https://picsum.photos/seed/redbull/1920/1080',
    successMetric: 'RANKED #1 IN KSA'
  },
  {
    id: '3',
    title: 'NIKE AIR MAX',
    year: '2024',
    category: 'E-COMMERCE',
    imageUrl: 'https://picsum.photos/seed/nike/1920/1080',
    successMetric: '$2M+ REVENUE GROWTH'
  },
  {
    id: '4',
    title: 'ADIDAS ORIGINALS',
    year: '2022',
    category: 'CAMPAIGN',
    imageUrl: 'https://picsum.photos/seed/adidas/1920/1080',
    successMetric: '98% RETENTION RATE'
  }
];

export const METRICS: Metric[] = [
  { label: 'PERFORMANCE', value: '98%' },
  { label: 'REVENUE GROWTH', value: '+140%' },
  { label: 'RETENTION RATE', value: '92%' }
];

export const SERVICES = [
  {
    id: '01',
    title: 'BI-LINGUAL SEO',
    description: 'WE SPECIALIZE IN RTL OPTIMIZATION AND LOCALIZED ARABIC SEARCH INTENT FOR THE KSA, QATAR, AND UAE MARKETS.'
  },
  {
    id: '02',
    title: 'CREATIVE ENGINEERING',
    description: 'WE USE HIGH-PERFORMANCE FRAMEWORKS TO ENSURE YOUR SITE NEVER LOSES A CUSTOMER DUE TO LAG.'
  },
  {
    id: '03',
    title: 'BRAND SYSTEMS',
    description: 'CRAFTING COHESIVE VISUAL IDENTITIES THAT RESONATE ACROSS ALL DIGITAL AND PHYSICAL TOUCHPOINTS.'
  },
  {
    id: '04',
    title: 'STRATEGIC CONSULTING',
    description: 'ENGINEERING BUSINESS GROWTH THROUGH RIGOROUS MARKET ANALYSIS AND CONVERSION OPTIMIZATION.'
  }
];

export const ROADMAP_PHASES = [
  { phase: '01', title: 'THE AUDIT', desc: 'IDENTIFYING LEAKS IN YOUR CURRENT FUNNEL AND COMPETITOR GAPS.' },
  { phase: '02', title: 'ARCHITECTURE', desc: 'BUILDING A HIGH-CONVERSION UI/UX FOUNDATION FOR SCALABILITY.' },
  { phase: '03', title: 'DEPLOYMENT', desc: 'LAUNCHING A LIGHTNING-FAST, SEO-OPTIMIZED REVENUE ENGINE.' },
  { phase: '04', title: 'DOMINATION', desc: 'SCALING LEADS VIA ARABIC & ENGLISH SEARCH SUPREMACY.' }
];

export const REVIEWS = [
  {
    id: '1',
    text: "THEY DON'T JUST BUILD WEBSITES; THEY BUILD ARCHITECTURES FOR SCALE. OUR CONVERSION INCREASED BY 40% WITHIN THE FIRST QUARTER.",
    author: "ALEX RIVERA",
    role: "CTO, MODERN TECH"
  },
  {
    id: '2',
    text: "THE LEVEL OF TECHNICAL MASTERY COMBINED WITH AESTHETIC PRECISION IS UNMATCHED IN THE CURRENT AGENCY LANDSCAPE.",
    author: "SARAH CHEN",
    role: "HEAD OF DESIGN, AETHER CORP"
  },
  {
    id: '3',
    text: "PARTNERING WITH DEVZENITH WAS THE BEST STRATEGIC DECISION WE MADE THIS YEAR. THEY ARE TRUE PARTNERS IN DISRUPTION.",
    author: "MARCUS VANCE",
    role: "FOUNDER, NEXUS AI"
  },
  {
    id: '4',
    text: "THEIR SEO ARCHITECTURE IS BEYOND ANYTHING WE'VE SEEN. WE DOMINATED OUR VERTICAL WITHIN SIX MONTHS.",
    author: "JULIA LORNE",
    role: "VP MARKETING, STELLAR"
  }
];

export const TEAM_MEMBERS = [
  {
    id: '1',
    name: 'JULIAN S.',
    role: 'FOUNDER / CEO',
    imageUrl: 'https://picsum.photos/seed/team1/800/1000'
  },
  {
    id: '2',
    name: 'ELENA V.',
    role: 'HEAD OF DESIGN',
    imageUrl: 'https://picsum.photos/seed/team2/800/1000'
  },
  {
    id: '3',
    name: 'MARCUS K.',
    role: 'CTO / ENGINEERING',
    imageUrl: 'https://picsum.photos/seed/team3/800/1000'
  },
  {
    id: '4',
    name: 'SOPHIA L.',
    role: 'STRATEGY DIRECTOR',
    imageUrl: 'https://picsum.photos/seed/team4/800/1000'
  }
];