export type ExperienceKey = 'quantcube' | 'ecole42' | 'management' | 'hse';

export type ExperienceType = 'employment' | 'education' | 'management';

export type CertificateKey =
  'data-architecture' | 'software' | 'web-mobile' | 'master' | 'bachelor';

export type PositionKey = 'audit' | 'telecom' | 'railways';

/** Skill phrases shown as tags; unlike a technology name, these are real prose and get translated. */
export type SkillKey =
  | 'leadership'
  | 'risk-management'
  | 'business-strategy'
  | 'project-management'
  | 'strategic-management'
  | 'data-analysis';

export interface ExperienceCertificate {
  key: CertificateKey;
  url?: string;
}

export interface ExperiencePosition {
  key: PositionKey;
  company: string;
  companyUrl: string;
}

export interface Experience {
  key: ExperienceKey;
  type: ExperienceType;
  company?: string;
  companyUrl?: string;
  /** Which heading introduces the certificate list; the two lists are not the same kind of credential. */
  certificatesLabel?: 'rncp' | 'academic';
  certificates?: ExperienceCertificate[];
  positions?: ExperiencePosition[];
  technologies: string[];
  skills?: SkillKey[];
}

// Titles, periods, locations, and every description live in `src/i18n/messages/*.json` under
// `experience.items.<key>`. Company names, URLs, and technology names are never translated; skill
// phrases are, via `experience.skills.<key>`.
export const experiences: Experience[] = [
  {
    key: 'quantcube',
    type: 'employment',
    company: 'Quantcube Technology',
    companyUrl: 'https://www.quant-cube.com/',
    technologies: [
      'React',
      'Node.js',
      'TypeScript',
      'AWS',
      'GraphQL',
      'CI/CD',
      'Testing',
      'UI/UX Design'
    ]
  },
  {
    key: 'ecole42',
    type: 'education',
    company: 'École 42',
    companyUrl: 'https://42.fr/',
    certificatesLabel: 'rncp',
    certificates: [
      {
        key: 'data-architecture',
        url: 'https://www.francecompetences.fr/recherche/rncp/39774/'
      },
      {
        key: 'software',
        url: 'https://www.francecompetences.fr/recherche/rncp/39783/'
      },
      {
        key: 'web-mobile',
        url: 'https://www.francecompetences.fr/recherche/rncp/36135/'
      }
    ],
    technologies: [
      'C',
      'C++',
      'JavaScript',
      'Python',
      'Docker',
      'React',
      'React Native',
      'Next.js',
      'Expo Mobile Framework',
      'Node.js',
      'Data Architecture',
      'Ocaml',
      'Database'
    ]
  },
  {
    key: 'management',
    type: 'management',
    positions: [
      {
        key: 'audit',
        company: 'Ernst & Young',
        companyUrl: 'https://www.ey.com/'
      },
      {
        key: 'telecom',
        company: 'VEON Beeline',
        companyUrl: 'https://moskva.beeline.ru/about/about-beeline/'
      },
      {
        key: 'railways',
        company: 'Russian Railways',
        companyUrl: 'https://eng.rzd.ru/'
      }
    ],
    technologies: ['JIRA', 'Confluence', 'MS Office', 'SAP', 'ERP'],
    skills: ['data-analysis', 'project-management']
  },
  {
    key: 'hse',
    type: 'education',
    company: 'National Research University "Higher School of Economics"',
    companyUrl: 'https://www.hse.ru/en/',
    certificatesLabel: 'academic',
    certificates: [{ key: 'master' }, { key: 'bachelor' }],
    technologies: [],
    skills: [
      'strategic-management',
      'project-management',
      'business-strategy',
      'leadership',
      'risk-management'
    ]
  }
];
