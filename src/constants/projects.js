export const projects = [
  {
    id: 1,
    title: 'DeezerRoom',
    description:
      'A complete mobile solution focused on music and collaborative user experience. Features include real-time music track voting events, collaborative playlists, user profiles with social connections, music search via Deezer API, push notifications, and cross-platform support (Android, iOS, Web). Built with React Native, Expo, Firebase, and a separate GraphQL API server.',
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
    category: ['Mobile', 'Full-Stack'],
    liveUrl: 'https://deezeroom.expo.app/',
    githubUrl: 'https://github.com/jesuisstan/deezeroom'
  },
  {
    id: 2,
    title: 'Hypertube',
    description:
      'A video streaming platform that downloads and streams videos using the BitTorrent protocol. Features include torrent search from multiple sources, real-time streaming, user authentication, and multi-language support (EN, FR, RU). Note: torrent streaming works only in locally deployed version, not in the production deployment.',
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
    category: 'Full-Stack',
    liveUrl: 'https://hypertube-video-library.vercel.app',
    githubUrl: 'https://github.com/jesuisstan/hypertube-video-library'
  },
  {
    id: 3,
    title: 'Matcha',
    description:
      'A full-stack dating application enabling users to connect based on shared interests and preferences. Features include user matching algorithms, chat functionality, notifications for likes and visits, profile management with photos and interests, advanced search with geolocation, and multi-language support (EN, FR, RU).',
    image: '/projects/project-matcha.png',
    technologies: [
      'Next.js',
      'TypeScript',
      'PostgreSQL',
      'Tailwind CSS',
      'Zustand',
      'Next Intl'
    ],
    category: 'Full-Stack',
    liveUrl: 'https://matcha-find-your-date.vercel.app',
    githubUrl: 'https://github.com/jesuisstan/matcha-find-your-date'
  },
  {
    id: 4,
    title: '42-ocreet',
    description:
      'An interactive web simulation game written entirely in OCaml using the Ocsigen framework. Help a population of creatures (Creets) survive a deadly virus spreading from a toxic river. Features include real-time creature movement, drag-and-drop mechanics, infection system with special states (Berserk, Insane), hospital healing, collision detection with quadtree optimization, and configurable game parameters. Demonstrates client-side OCaml, type-safe web development, and monadic concurrency.',
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
    category: ['Full-Stack', 'Game'],
    liveUrl: 'https://four2-ocreet.onrender.com/',
    githubUrl: 'https://github.com/jesuisstan/42-ocreet'
  },
  {
    id: 5,
    title: 'Tetris Game',
    description:
      'A full-stack multiplayer Tetris game with real-time synchronization. Features include user authentication, room creation and joining, multiplayer gameplay with Socket.io, game statistics, chat functionality, and comprehensive test coverage (70%+ code coverage with Jest). Built with React frontend and Node.js backend with MongoDB for user data storage.',
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
    category: ['Full-Stack', 'Game'],
    liveUrl: 'https://tetris-game-frontend.onrender.com/',
    githubUrl: 'https://github.com/jesuisstan/tetris-game'
  },
  {
    id: 6,
    title: 'Contact Book',
    description:
      'A full-stack contact management application with authentication. Features include CRUD operations, search by lastname, sorting, and user authentication with email and nickname. Built with React frontend and Node.js backend.',
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
    category: 'Full-Stack',
    liveUrl: 'https://contact-book-frontend-1n4u.onrender.com/',
    githubUrl: 'https://github.com/jesuisstan/ContactBookFullstackApp'
  },
  {
    id: 7,
    title: 'Omio-like search bar',
    description:
      'A recreation of the Omio search bar with autocomplete functionality for cities. Features responsive design, Material UI components, and integration with Tictactrip API for city suggestions and popular destinations.',
    image: '/projects/project-imgOmio.png',
    technologies: [
      'React',
      'TypeScript',
      'Material UI',
      'Axios',
      'CSS Modules'
    ],
    category: 'Frontend',
    liveUrl: 'https://omio-like-search-bar.onrender.com/',
    githubUrl: 'https://github.com/jesuisstan/OmioSearchBar'
  },
  {
    id: 8,
    title: 'Info Map App',
    description:
      'A full-stack web application for displaying an interactive map with location-based data from Yelp Fusion API. Features include user authentication, interactive map with Leaflet library, category-based place filtering, adjustable number of visible places (10-50), clickable markers with place information, ability to fetch new places by clicking anywhere on the map, and responsive design. Built with React TypeScript frontend and Node.js Express backend with MongoDB.',
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
    category: 'Full-Stack',
    liveUrl: 'https://github.com/jesuisstan/InfoMapApp#demonstration',
    githubUrl: 'https://github.com/jesuisstan/InfoMapApp'
  },
  {
    id: 9,
    title: 'Pong The Game',
    description:
      'My first web development project - a full-stack multiplayer Pong game platform. Features include OAuth authentication (42 intranet, GitHub), two-factor authentication (2FA), real-time multiplayer gameplay with Socket.io, AI training mode, spectator mode, user profiles with avatars and nicknames, friends system, match history, achievements system, and responsive canvas-based game. Built with React TypeScript frontend and NestJS backend with PostgreSQL database.',
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
    category: ['Full-Stack', 'Game'],
    liveUrl: 'https://github.com/jesuisstan/PongTheGame#demonstration',
    githubUrl: 'https://github.com/jesuisstan/PongTheGame'
  }
];
