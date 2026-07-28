export type TechnologyCategory =
  | 'Frontend'
  | 'Backend'
  | 'Mobile'
  | 'Data'
  | 'Design'
  | 'DevOps'
  | 'Tools'
  | 'Language'
  | 'Testing';

export type TechnologyFilter = 'All' | TechnologyCategory;

export interface Technology {
  name: string;
  icon: string;
  categories: TechnologyCategory[];
  /**
   * Literal token class overriding the icon plate, for marks drawn in white that would vanish on the
   * default light one. Complete class name because Tailwind only compiles what it can read as text.
   */
  plate?: string;
}

export const technologies: Technology[] = [
  {
    name: 'React',
    icon: '/powered-by/logo-react.png',
    categories: ['Frontend']
  },
  {
    name: 'Next.js',
    icon: '/powered-by/logo-nextjs.png',
    categories: ['Frontend', 'Backend']
  },
  {
    name: 'JavaScript',
    icon: '/powered-by/logo-js.png',
    categories: ['Language']
  },
  {
    name: 'TypeScript',
    icon: '/powered-by/logo-ts.png',
    categories: ['Language']
  },
  {
    name: 'HTML5',
    icon: '/powered-by/logo-html.png',
    categories: ['Frontend']
  },
  {
    name: 'CSS3',
    icon: '/powered-by/logo-css.png',
    categories: ['Design']
  },
  {
    name: 'Tailwind CSS',
    icon: '/powered-by/logo-tailwindcss.png',
    categories: ['Design']
  },
  {
    name: 'Material-UI',
    icon: '/powered-by/logo-material-ui.png',
    categories: ['Design']
  },
  {
    name: 'Radix UI',
    icon: '/powered-by/logo-radix-ui.svg',
    categories: ['Design']
  },
  {
    name: 'Node.js',
    icon: '/powered-by/logo-node.png',
    categories: ['Backend']
  },
  {
    name: 'MongoDB',
    icon: '/powered-by/logo-mongodb.png',
    categories: ['Data']
  },
  {
    name: 'PostgreSQL',
    icon: '/powered-by/logo-vercel-postgresql.svg',
    categories: ['Data'],
    plate: 'bg-logo-plate-dark'
  },
  {
    name: 'GraphQL',
    icon: '/powered-by/logo-graph-ql.png',
    categories: ['Backend', 'Frontend']
  },
  {
    name: 'Apollo',
    icon: '/powered-by/logo-apollo.png',
    categories: ['Backend', 'Frontend']
  },
  {
    name: 'Next Auth',
    icon: '/powered-by/logo-next-auth.png',
    categories: ['Backend', 'Frontend']
  },
  {
    name: 'JWT',
    icon: '/powered-by/logo-jwt.svg',
    categories: ['Backend']
  },
  {
    name: 'OAuth',
    icon: '/powered-by/logo-oauth.svg',
    categories: ['Backend']
  },
  {
    name: 'Docker',
    icon: '/powered-by/logo-docker.png',
    categories: ['DevOps']
  },
  {
    name: 'Git',
    icon: '/powered-by/logo-git.png',
    categories: ['Tools']
  },
  {
    name: 'Bitbucket',
    icon: '/powered-by/logo-bitbucket.svg',
    categories: ['Tools']
  },
  {
    name: 'Highcharts',
    icon: '/powered-by/logo-highcharts.png',
    categories: ['Frontend']
  },
  {
    name: 'ECharts',
    icon: '/powered-by/logo-echarts.png',
    categories: ['Frontend']
  },
  {
    name: 'Next Intl',
    icon: '/powered-by/logo-next-intl.png',
    categories: ['Frontend']
  },
  {
    name: 'Vercel',
    icon: '/powered-by/logo-vercel.svg',
    categories: ['DevOps']
  },
  {
    name: 'Vercel Blob',
    icon: '/powered-by/logo-vercel-blob.svg',
    categories: ['Data'],
    plate: 'bg-logo-plate-dark'
  },
  {
    name: 'React Native',
    icon: '/powered-by/logo-react-native.svg',
    categories: ['Mobile', 'Frontend']
  },
  {
    name: 'Expo',
    icon: '/powered-by/logo-expo.svg',
    categories: ['Mobile']
  },
  {
    name: 'Expo.dev',
    icon: '/powered-by/logo-expo-dev.svg',
    categories: ['DevOps', 'Mobile']
  },
  {
    name: 'Figma',
    icon: '/powered-by/logo-figma.svg',
    categories: ['Design']
  },
  {
    name: 'OCaml',
    icon: '/powered-by/logo-ocaml.svg',
    categories: ['Language']
  },
  {
    name: 'C',
    icon: '/powered-by/logo-c.svg',
    categories: ['Language']
  },
  {
    name: 'C++',
    icon: '/powered-by/logo-cpp.svg',
    categories: ['Language']
  },
  {
    name: 'Firebase',
    icon: '/powered-by/logo-firebase.svg',
    categories: ['Backend', 'Mobile']
  },
  {
    name: 'Firestore DB',
    icon: '/powered-by/logo-firestore.svg',
    categories: ['Data']
  },
  {
    name: 'FB Auth',
    icon: '/powered-by/logo-firestore.svg',
    categories: ['Backend', 'Mobile']
  },
  {
    name: 'FB Storage',
    icon: '/powered-by/logo-firebase-storage.svg',
    categories: ['Data']
  },
  {
    name: 'Android',
    icon: '/powered-by/logo-android.svg',
    categories: ['Mobile']
  },
  {
    name: 'Studio',
    icon: '/powered-by/logo-android-studio.svg',
    categories: ['Tools', 'Mobile']
  },
  {
    name: 'Render',
    icon: '/powered-by/logo-render.svg',
    categories: ['DevOps'],
    plate: 'bg-logo-plate-dark'
  },
  {
    name: 'Kubernetes',
    icon: '/powered-by/logo-kubernetes.svg',
    categories: ['DevOps']
  },
  {
    name: 'Jest',
    icon: '/powered-by/logo-jest.png',
    categories: ['Testing']
  },
  {
    name: 'Cypress',
    icon: '/powered-by/logo-cypress.svg',
    categories: ['Testing']
  },
  {
    name: 'Socket.io',
    icon: '/powered-by/logo-socket-io.png',
    categories: ['Backend', 'Frontend'],
    plate: 'bg-logo-plate-dark'
  },
  {
    name: 'Redux',
    icon: '/powered-by/logo-redux.png',
    categories: ['Frontend']
  },
  {
    name: 'Zustand',
    icon: '/powered-by/logo-zustand.png',
    categories: ['Frontend']
  },
  {
    name: 'NativeWind',
    icon: '/powered-by/logo-nativewind.svg',
    categories: ['Design', 'Mobile']
  },
  {
    name: 'Postman',
    icon: '/powered-by/logo-postman.svg',
    categories: ['Tools']
  },
  {
    name: 'Cursor IDE',
    icon: '/powered-by/logo-cursor-ide.png',
    categories: ['Tools']
  }
];

export const categories: TechnologyFilter[] = [
  'All',
  'Frontend',
  'Backend',
  'Mobile',
  'Data',
  'Design',
  'DevOps',
  'Tools',
  'Language',
  'Testing'
];
