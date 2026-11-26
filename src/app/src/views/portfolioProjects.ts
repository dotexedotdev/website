import type { Technology } from '../components/techLogos'

export interface ProjectScreenshot {
  src: string
  title: string
  width: number
  height: number
}

export const norgardScreenshots = [
  { src: '/assets/dashboard.jpg', title: 'Dashboard', width: 1920, height: 1080 },
  { src: '/assets/job-details.jpg', title: 'Job details', width: 1920, height: 1080 },
  { src: '/assets/jobs.jpg', title: 'Jobs', width: 1920, height: 1080 },
] as const satisfies readonly ProjectScreenshot[]

type ProjectMedia =
  | { kind: 'image'; src: string; alt: string; width: number; height: number; caption: string }
  | { kind: 'video'; src: string; captions: string; caption: string }
  | { kind: 'mockup'; title: string; rows: { label: string; status: string }[] }
  | { kind: 'screenshots'; images: readonly ProjectScreenshot[]; layout?: 'portrait' }

interface Project {
  name: string
  anchor?: string
  initiallyOpen?: true
  category: string
  concept?: true
  logo: string | { src: string }
  tone: 'indigo' | 'teal' | 'amber' | 'violet'
  synopsis: string
  description: string
  technologies?: readonly Technology[]
  media: ProjectMedia
  url?: string
}

export const portfolioProjects: readonly Project[] = [
  {
    name: 'Norgard Restoration',
    anchor: 'stories',
    initiallyOpen: true,
    category: 'Restoration services',
    logo: { src: '/assets/norgard-logo-mark.png' },
    tone: 'indigo',
    synopsis: 'An approval workflow that connects job intake, signatures, and crew notifications.',
    description: 'Job details from the CRM fill in a work authorization and send it for signature. When the signed form comes back, the job record updates and the crew is notified that work can start. The team no longer needs to check for signatures by hand.',
    technologies: ['Vue', 'Azure', 'C# / .NET', 'Airtable'],
    media: {
      kind: 'screenshots',
      images: norgardScreenshots,
    },
  },
  {
    name: 'ClassZoo',
    category: 'Preschool operations',
    logo: { src: '/assets/classzoo-icon.png' },
    tone: 'indigo',
    synopsis: 'One place for preschools to handle attendance, family messages, student profiles, and invoicing.',
    description: 'ClassZoo gives teachers and administrators a shared place to manage the school day. Teachers can take attendance and message families, while administrators keep student records and invoicing in the same app. It also includes private AI.',
    technologies: ['Flutter', 'Azure'],
    media: {
      kind: 'screenshots',
      layout: 'portrait',
      images: [
        { src: '/assets/classzoo-student-profiles.png', title: 'Student profiles', width: 768, height: 1668 },
        { src: '/assets/classzoo-parent-messaging.png', title: 'Parent messaging', width: 768, height: 1668 },
        { src: '/assets/classzoo-programs.png', title: 'Program details', width: 768, height: 1668 },
      ],
    },
  },
  {
    name: 'Photomosaic NES',
    category: 'Side project / Creative coding',
    logo: { src: '/assets/photomosaic-power-glove.webp' },
    tone: 'teal',
    synopsis: 'A retro image experiment that rebuilds photos and live webcam video out of NES box art.',
    description: 'I built a C# command-line tool that divides an image into a grid and picks a tile for each square based on its average colour. A slight tint helps the big picture read without losing the detail in each tile. The gallery shows what the tool can do with 695 NES covers, from box art to gameplay screenshots. The live WebGL2 demo uses the same covers to rebuild your webcam feed in real time without uploading video.',
    technologies: ['C# / .NET'],
    media: {
      kind: 'screenshots',
      images: [
        { src: '/assets/photomosaic-breath-of-the-wild-mosaic.png', title: 'Breath of the Wild key art', width: 1920, height: 1080 },
        { src: '/assets/photomosaic-mario3-mosaic.png', title: 'Super Mario Bros. 3 box art', width: 994, height: 1360 },
        { src: '/assets/photomosaic-mario3-snap-mosaic.png', title: 'Super Mario Bros. 3 gameplay', width: 2048, height: 1792 },
      ],
    },
    url: 'https://adamstirtan.github.io/photomosaic-nes/',
  },
]
