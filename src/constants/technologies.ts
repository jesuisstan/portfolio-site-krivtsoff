export type TechnologyCategory =
  | 'frontend'
  | 'backend'
  | 'mobile'
  | 'data'
  | 'design'
  | 'devops'
  | 'tools'
  | 'language'
  | 'testing';

export type TechnologyFilter = 'all' | TechnologyCategory;

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
    categories: ['frontend']
  },
  {
    name: 'Next.js',
    icon: '/powered-by/logo-nextjs.png',
    categories: ['frontend', 'backend']
  },
  {
    name: 'JavaScript',
    icon: '/powered-by/logo-js.png',
    categories: ['language']
  },
  {
    name: 'TypeScript',
    icon: '/powered-by/logo-ts.png',
    categories: ['language']
  },
  {
    name: 'HTML5',
    icon: '/powered-by/logo-html.png',
    categories: ['frontend']
  },
  {
    name: 'CSS3',
    icon: '/powered-by/logo-css.png',
    categories: ['design']
  },
  {
    name: 'Tailwind CSS',
    icon: '/powered-by/logo-tailwindcss.png',
    categories: ['design']
  },
  {
    name: 'Material-UI',
    icon: '/powered-by/logo-material-ui.png',
    categories: ['design']
  },
  {
    name: 'Radix UI',
    icon: '/powered-by/logo-radix-ui.svg',
    categories: ['design']
  },
  {
    name: 'Node.js',
    icon: '/powered-by/logo-node.png',
    categories: ['backend']
  },
  {
    name: 'MongoDB',
    icon: '/powered-by/logo-mongodb.png',
    categories: ['data']
  },
  {
    name: 'PostgreSQL',
    icon: '/powered-by/logo-vercel-postgresql.svg',
    categories: ['data'],
    plate: 'bg-logo-plate-dark'
  },
  {
    name: 'GraphQL',
    icon: '/powered-by/logo-graph-ql.png',
    categories: ['backend', 'frontend']
  },
  {
    name: 'Apollo',
    icon: '/powered-by/logo-apollo.png',
    categories: ['backend', 'frontend']
  },
  {
    name: 'Next Auth',
    icon: '/powered-by/logo-next-auth.png',
    categories: ['backend', 'frontend']
  },
  {
    name: 'JWT',
    icon: '/powered-by/logo-jwt.svg',
    categories: ['backend']
  },
  {
    name: 'OAuth',
    icon: '/powered-by/logo-oauth.svg',
    categories: ['backend']
  },
  {
    name: 'Docker',
    icon: '/powered-by/logo-docker.png',
    categories: ['devops']
  },
  {
    name: 'Git',
    icon: '/powered-by/logo-git.png',
    categories: ['tools']
  },
  {
    name: 'Bitbucket',
    icon: '/powered-by/logo-bitbucket.svg',
    categories: ['tools']
  },
  {
    name: 'Highcharts',
    icon: '/powered-by/logo-highcharts.png',
    categories: ['frontend']
  },
  {
    name: 'ECharts',
    icon: '/powered-by/logo-echarts.png',
    categories: ['frontend']
  },
  {
    name: 'Next Intl',
    icon: '/powered-by/logo-next-intl.png',
    categories: ['frontend']
  },
  {
    name: 'Vercel',
    icon: '/powered-by/logo-vercel.svg',
    categories: ['devops']
  },
  {
    name: 'Vercel Blob',
    icon: '/powered-by/logo-vercel-blob.svg',
    categories: ['data'],
    plate: 'bg-logo-plate-dark'
  },
  {
    name: 'React Native',
    icon: '/powered-by/logo-react-native.svg',
    categories: ['mobile', 'frontend']
  },
  {
    name: 'Expo',
    icon: '/powered-by/logo-expo.svg',
    categories: ['mobile']
  },
  {
    name: 'Expo.dev',
    icon: '/powered-by/logo-expo-dev.svg',
    categories: ['devops', 'mobile']
  },
  {
    name: 'Figma',
    icon: '/powered-by/logo-figma.svg',
    categories: ['design']
  },
  {
    name: 'OCaml',
    icon: '/powered-by/logo-ocaml.svg',
    categories: ['language']
  },
  {
    name: 'C',
    icon: '/powered-by/logo-c.svg',
    categories: ['language']
  },
  {
    name: 'C++',
    icon: '/powered-by/logo-cpp.svg',
    categories: ['language']
  },
  {
    name: 'Firebase',
    icon: '/powered-by/logo-firebase.svg',
    categories: ['backend', 'mobile']
  },
  {
    name: 'Firestore DB',
    icon: '/powered-by/logo-firestore.svg',
    categories: ['data']
  },
  {
    name: 'FB Auth',
    icon: '/powered-by/logo-firestore.svg',
    categories: ['backend', 'mobile']
  },
  {
    name: 'FB Storage',
    icon: '/powered-by/logo-firebase-storage.svg',
    categories: ['data']
  },
  {
    name: 'Android',
    icon: '/powered-by/logo-android.svg',
    categories: ['mobile']
  },
  {
    name: 'Studio',
    icon: '/powered-by/logo-android-studio.svg',
    categories: ['tools', 'mobile']
  },
  {
    name: 'Render',
    icon: '/powered-by/logo-render.svg',
    categories: ['devops'],
    plate: 'bg-logo-plate-dark'
  },
  {
    name: 'Kubernetes',
    icon: '/powered-by/logo-kubernetes.svg',
    categories: ['devops']
  },
  {
    name: 'Jest',
    icon: '/powered-by/logo-jest.png',
    categories: ['testing']
  },
  {
    name: 'Cypress',
    icon: '/powered-by/logo-cypress.svg',
    categories: ['testing']
  },
  {
    name: 'Socket.io',
    icon: '/powered-by/logo-socket-io.png',
    categories: ['backend', 'frontend'],
    plate: 'bg-logo-plate-dark'
  },
  {
    name: 'Redux',
    icon: '/powered-by/logo-redux.png',
    categories: ['frontend']
  },
  {
    name: 'Zustand',
    icon: '/powered-by/logo-zustand.png',
    categories: ['frontend']
  },
  {
    name: 'NativeWind',
    icon: '/powered-by/logo-nativewind.svg',
    categories: ['design', 'mobile']
  },
  {
    name: 'Postman',
    icon: '/powered-by/logo-postman.svg',
    categories: ['tools']
  },
  {
    name: 'Cursor IDE',
    icon: '/powered-by/logo-cursor-ide.png',
    categories: ['tools']
  }
];

export const categories: TechnologyFilter[] = [
  'all',
  'frontend',
  'backend',
  'mobile',
  'data',
  'design',
  'devops',
  'tools',
  'language',
  'testing'
];
