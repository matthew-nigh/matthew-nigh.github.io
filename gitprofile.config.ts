// gitprofile.config.ts
// Canonical site: https://matthew-nigh.github.io/

const CONFIG = {
  github: {
    username: 'matthew-nigh',
  },
  /**
   * User site at https://matthew-nigh.github.io/ uses base '/'.
   */
  base: '/',
  profile: {
    name: 'Matthew Nigh',
    headline:
      'Synthetic data and machine learning for scientific and manufacturing systems: semiconductors, fusion, and radar.',
    about:
      "Matthew Nigh is a Computer Engineering PhD candidate at UC San Diego (expected June 2027), with an MS from UT Dallas (2023) and a BS in Electrical Engineering from UW-Platteville (2021). His research develops synthetic data and machine learning for scientific and manufacturing systems. His interests span semiconductor test, fusion, and radar imaging. He's seeking ML research and applied data science roles starting mid-2027.",
    location: 'La Jolla / San Diego, CA',
    avatar: '/avatar.png',
  },
  projects: {
    github: {
      display: false,
      header: 'Github Projects',
      mode: 'manual',
      automatic: {
        sortBy: 'stars',
        limit: 0,
        exclude: {
          forks: true,
          projects: [],
        },
      },
      manual: {
        projects: [],
      },
    },
    external: {
      header: 'Research',
      intro:
        'In UC San Diego’s TRELA Lab with advisor Yiorgos Makris: synthetic process data, wafer testing, and manufacturing attestation.',
      projects: [
        {
          title: 'Synthetic PCM Data and WAT Limit Setting',
          description:
            'Synthetic process control monitoring data validated with E-test data from approximately 8,000 wafers in an advanced GlobalFoundries FinFET node (ITC 2024, Best Paper Honorable Mention). Extends to correlation-aware WAT limit setting (ITC 2026).',
          link: '',
        },
        {
          title: 'Metrology-to-E-Test Correlation',
          description:
            'Metrology-to-e-test correlation modeling that integrates process expertise (VTS 2025).',
          link: '',
        },
        {
          title: 'WALET: E-Test Variability',
          description:
            'SHAP-guided classification of wafer-level e-test variability (WALET, VTS 2026).',
          link: '',
        },
        {
          title: 'STAMP: Tool-Chain Attestation',
          description:
            'Tool-chain attestation demonstrated on inline and e-test measurements from 7,000 wafers, with multiple tool-chain variants in 12nm FinFET technology (DAC 2026).',
          link: '',
        },
      ],
    },
  },
  seo: {
    title: 'Matthew Nigh | Synthetic Data and Machine Learning',
    description:
      'Matthew Nigh develops synthetic data and machine learning for scientific and manufacturing systems: semiconductors, fusion, and radar. Computer Engineering PhD candidate at UC San Diego.',
    imageURL: 'https://matthew-nigh.github.io/og-image.png',
    siteUrl: 'https://matthew-nigh.github.io/',
  },
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Matthew Nigh',
    description:
      'Matthew Nigh develops synthetic data and machine learning for scientific and manufacturing systems: semiconductors, fusion, and radar. Computer Engineering PhD candidate at UC San Diego.',
    url: 'https://matthew-nigh.github.io/',
    image: 'https://matthew-nigh.github.io/avatar.png',
    email: 'mnigh@ucsd.edu',
    jobTitle: 'PhD student',
    homeLocation: {
      '@type': 'Place',
      name: 'La Jolla, San Diego, CA',
    },
    affiliation: {
      '@type': 'CollegeOrUniversity',
      name: 'UC San Diego',
    },
    alumniOf: [
      {
        '@type': 'CollegeOrUniversity',
        name: 'University of Texas at Dallas',
      },
      {
        '@type': 'CollegeOrUniversity',
        name: 'University of Wisconsin-Platteville',
      },
    ],
    sameAs: [
      'https://scholar.google.com/citations?user=zMhLeaoAAAAJ',
      'https://github.com/matthew-nigh',
      'https://www.linkedin.com/in/matthew-nigh',
    ],
  },
  social: {
    linkedin: 'matthew-nigh',
    googleScholar: 'https://scholar.google.com/citations?user=zMhLeaoAAAAJ',
    email: 'mnigh@ucsd.edu',
  },
  resume: {
    // Google Drive "anyone with the link can view" URL. The CV button opens it in a new tab.
    fileUrl:
      'https://drive.google.com/file/d/1urxegCZj89JaH-PDFAz68vcfNfB-R2UO/view?usp=sharing',
  },
  skills: [
    'Python',
    'PyTorch',
    'XGBoost',
    'scikit-learn',
    'SHAP/explainable ML',
    'synthetic data generation',
    'time-series and sensor data',
    'MATLAB/Simulink',
    'control',
  ],
  experiences: [
    {
      company: 'TRELA Lab, UC San Diego',
      position: 'Graduate Research Assistant',
      from: '2021',
      to: 'Present',
      companyLink: 'https://ucsd.edu',
      description:
        'Developed synthetic process monitoring data methods recognized with an ITC 2024 Best Paper Honorable Mention.',
    },
    {
      company: 'KBR',
      position: 'AI/ML Research Intern',
      from: 'May 2024',
      to: 'Present',
      companyLink: 'https://www.kbr.com/',
      description:
        'Applied complex-valued neural networks to synthetic aperture radar imaging.',
    },
    {
      company: 'Advantest America',
      position: 'Machine Learning Engineering Intern',
      from: 'Summer 2022',
      to: '',
      companyLink: 'https://www.advantest.com/',
      description:
        'Built machine learning pipelines for wafer-test yield analytics.',
    },
    {
      company: 'Princeton Plasma Physics Laboratory',
      position: 'Lab Research Intern, DOE SULI',
      from: 'Summer 2020',
      to: '',
      companyLink: 'https://www.pppl.gov/',
      description:
        'Modeled closed-loop vertical-position control for the NSTX-U tokamak through DOE SULI.',
    },
  ],
  certifications: [],
  educations: [
    {
      institution: 'University of California, San Diego',
      degree: 'PhD, Computer Engineering',
      from: '',
      to: 'Expected June 2027',
    },
    {
      institution: 'University of Texas at Dallas',
      degree:
        'MS, Computer Engineering (applied machine learning concentration)',
      from: '',
      to: 'Dec 2023',
    },
    {
      institution: 'University of Wisconsin-Platteville',
      degree:
        'BS, Electrical Engineering; second major in Sustainability and Renewable Energy Systems',
      from: '',
      to: 'May 2021',
    },
  ],
  // Loaded from src/data/publications.json plus src/data/publication-overrides.json.
  publications: [],
  blog: {
    source: '',
    username: '',
    limit: 0,
  },
  googleAnalytics: {
    id: '',
  },
  hotjar: {
    id: '',
    snippetVersion: 6,
  },
  themeConfig: {
    // Night is the first-visit default, independent of system preference.
    // The sun/moon toggle persists an explicit night/nord choice locally.
    defaultTheme: 'night',
    disableSwitch: false,
    respectPrefersColorScheme: false,
    displayAvatarRing: true,
    themes: ['night', 'nord'],
  },
  footer: `© 2026 Matthew Nigh`,
  enablePWA: false,
};

export default CONFIG;
