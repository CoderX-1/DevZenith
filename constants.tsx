
import { Project, Metric } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'VALORANT MASTERS',
    year: '2024',
    category: 'BRAND IDENTITY',
    imageUrl: 'https://picsum.photos/seed/valorant/1920/1080'
  },
  {
    id: '2',
    title: 'RED BULL RACING',
    year: '2023',
    category: 'DIGITAL EXPERIENCE',
    imageUrl: 'https://picsum.photos/seed/redbull/1920/1080'
  },
  {
    id: '3',
    title: 'NIKE AIR MAX',
    year: '2024',
    category: 'E-COMMERCE',
    imageUrl: 'https://picsum.photos/seed/nike/1920/1080'
  },
  {
    id: '4',
    title: 'ADIDAS ORIGINALS',
    year: '2022',
    category: 'CAMPAIGN',
    imageUrl: 'https://picsum.photos/seed/adidas/1920/1080'
  }
];

export const METRICS: Metric[] = [
  { label: 'PERFORMANCE', value: '98%' },
  { label: 'REVENUE GROWTH', value: '+140%' },
  { label: 'RETENTION RATE', value: '92%' }
];

export const REVIEWS = [
  {
    id: '1',
    text: "SUSO DOESN'T JUST BUILD WEBSITES; THEY BUILD ARCHITECTURES FOR SCALE. OUR CONVERSION INCREASED BY 40% WITHIN THE FIRST QUARTER.",
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
    text: "PARTNERING WITH SUSO WAS THE BEST STRATEGIC DECISION WE MADE THIS YEAR. THEY ARE TRUE PARTNERS IN DISRUPTION.",
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
