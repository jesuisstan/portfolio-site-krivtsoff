export type ProjectCategory = 'full-stack' | 'frontend' | 'game' | 'mobile';

export type ProjectFilter = 'all' | ProjectCategory;

export type ProjectKey =
  | 'deezeroom'
  | 'hypertube'
  | 'matcha'
  | 'ocreet'
  | 'tetris'
  | 'contact-book'
  | 'omio'
  | 'info-map'
  | 'pong';

export interface Project {
  key: ProjectKey;
  title: string;
  image: string;
  technologies: string[];
  category: ProjectCategory | ProjectCategory[];
  liveUrl: string;
  githubUrl: string;
}

// Descriptions live in `src/i18n/messages/*.json` under `projects.items.<key>`. Project names, technology
// names, and category values are never translated — the category label is looked up for display only.
export const projects: Project[] = [
  {
    key: 'deezeroom',
    title: 'DeezerRoom',
    image: '/projects/project-deezeroom.png',
    technologies: [
      'React Native',
      'Expo',
      'TypeScript',
      'Firebase',
      'GraphQL',
      'NativeWind',
      'Expo Router'
    ],
    category: ['mobile', 'full-stack'],
    liveUrl: 'https://deezeroom.expo.app/',
    githubUrl: 'https://github.com/jesuisstan/deezeroom'
  },
  {
    key: 'hypertube',
    title: 'Hypertube',
    image: '/projects/project-hypertube.png',
    technologies: [
      'Next.js',
      'TypeScript',
      'PostgreSQL',
      'BitTorrent',
      'FFmpeg',
      'Tailwind CSS',
      'Next Auth'
    ],
    category: 'full-stack',
    liveUrl: 'https://hypertube-video-library.vercel.app',
    githubUrl: 'https://github.com/jesuisstan/hypertube-video-library'
  },
  {
    key: 'matcha',
    title: 'Matcha',
    image: '/projects/project-matcha.png',
    technologies: [
      'Next.js',
      'TypeScript',
      'PostgreSQL',
      'Tailwind CSS',
      'Zustand',
      'Next Intl'
    ],
    category: 'full-stack',
    liveUrl: 'https://matcha-find-your-date.vercel.app',
    githubUrl: 'https://github.com/jesuisstan/matcha-find-your-date'
  },
  {
    key: 'ocreet',
    title: '42-ocreet',
    image: '/projects/project-ocreet.png',
    technologies: [
      'OCaml',
      'Ocsigen',
      'Eliom',
      'Js_of_ocaml',
      'Lwt',
      'TyXML',
      'Materialize CSS'
    ],
    category: ['full-stack', 'game'],
    liveUrl: 'https://four2-ocreet.onrender.com/',
    githubUrl: 'https://github.com/jesuisstan/42-ocreet'
  },
  {
    key: 'tetris',
    title: 'Tetris Game',
    image: '/projects/project-tetris.png',
    technologies: [
      'React',
      'Node.js',
      'Express',
      'MongoDB',
      'Socket.io',
      'Redux',
      'Material UI',
      'Jest'
    ],
    category: ['full-stack', 'game'],
    liveUrl: 'https://tetris-game-frontend.onrender.com/',
    githubUrl: 'https://github.com/jesuisstan/tetris-game'
  },
  {
    key: 'contact-book',
    title: 'Contact Book',
    image: '/projects/project-contact.png',
    technologies: [
      'React',
      'TypeScript',
      'Node.js',
      'Express',
      'MongoDB',
      'Material UI',
      'JWT'
    ],
    category: 'full-stack',
    liveUrl: 'https://contact-book-frontend-1n4u.onrender.com/',
    githubUrl: 'https://github.com/jesuisstan/ContactBookFullstackApp'
  },
  {
    key: 'omio',
    title: 'Omio-like search bar',
    image: '/projects/project-imgOmio.png',
    technologies: [
      'React',
      'TypeScript',
      'Material UI',
      'Axios',
      'CSS Modules'
    ],
    category: 'frontend',
    liveUrl: 'https://omio-like-search-bar.onrender.com/',
    githubUrl: 'https://github.com/jesuisstan/OmioSearchBar'
  },
  {
    key: 'info-map',
    title: 'Info Map App',
    image: '/projects/project-info-map.png',
    technologies: [
      'React',
      'TypeScript',
      'Node.js',
      'Express',
      'MongoDB',
      'Leaflet',
      'Material UI',
      'Yelp Fusion API'
    ],
    category: 'full-stack',
    liveUrl: 'https://github.com/jesuisstan/InfoMapApp#demonstration',
    githubUrl: 'https://github.com/jesuisstan/InfoMapApp'
  },
  {
    key: 'pong',
    title: 'Pong The Game',
    image: '/projects/project-pong.png',
    technologies: [
      'React',
      'TypeScript',
      'NestJS',
      'PostgreSQL',
      'Prisma',
      'Socket.io',
      'Material UI',
      'Canvas API',
      'OAuth',
      '2FA'
    ],
    category: ['full-stack', 'game'],
    liveUrl: 'https://github.com/jesuisstan/PongTheGame#demonstration',
    githubUrl: 'https://github.com/jesuisstan/PongTheGame'
  }
];
