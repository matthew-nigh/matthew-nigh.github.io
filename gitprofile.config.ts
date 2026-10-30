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
      'ML for physical-system data: fusion, semiconductor manufacturing, and radar imaging.',
    about:
      "Matthew Nigh is a Computer Engineering PhD candidate at UC San Diego (TRELA Lab, advised by Yiorgos Makris), graduating June 2027. He builds machine learning for complex physical-system data: synthetic data and variability analysis for semiconductor manufacturing test, and, as a DOE SULI intern at Princeton Plasma Physics Laboratory, closed-loop vertical-position control modeling for the NSTX-U tokamak. He's looking for ML research and applied data science roles in fusion energy, national labs, and advanced manufacturing, starting mid-2027.",
    location: 'La Jolla / San Diego, CA',
    // TODO: replace the initials image with a photo.
    avatar: '/avatar.svg',
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
        'Machine learning for physical-system data: synthetic data and explainable ML for semiconductor manufacturing test, yield analytics on wafer measurements, and deep learning for radar imaging. A longer-term interest is plasma control, fusion diagnostics, and fusion data analysis.',
      projects: [
        {
          title: 'NSTX-U vertical-position control',
          description:
            'DOE SULI internship at Princeton Plasma Physics Laboratory (Summer 2020): closed-loop vertical-position control modeling for the NSTX-U tokamak, plus plasma simulation and data analysis. The longer-term interest is machine learning for plasma control, fusion diagnostics, and fusion data analysis.',
          link: '',
        },
        {
          title: 'Wafer-data ML pipelines',
          description:
            'Machine Learning Engineering internship at Advantest America (Summer 2022): machine learning pipelines on large wafer test datasets for yield analytics.',
          link: '',
        },
        {
          title: 'SAR imaging',
          description:
            'AI/ML research internship at KBR (May 2024–present): synthetic aperture radar imaging with complex-valued neural networks and AWS cloud training.',
          link: '',
        },
      ],
    },
  },
  seo: {
    title:
      'Matthew Nigh | ML for Fusion, Semiconductor Manufacturing &amp; Radar Imaging',
    description:
      'Matthew Nigh is a Computer Engineering PhD student at UC San Diego. He builds machine learning for fusion energy, semiconductor manufacturing and test, and radar imaging.',
    imageURL: 'https://matthew-nigh.github.io/og-image.png',
    siteUrl: 'https://matthew-nigh.github.io/',
  },
  // TODO: add Matthew's LinkedIn profile URL to structuredData.sameAs.
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Matthew Nigh',
    url: 'https://matthew-nigh.github.io/',
    image: 'https://matthew-nigh.github.io/avatar.png',
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
    ],
  },
  social: {
    linkedin: 'TODO',
    googleScholar: 'https://scholar.google.com/citations?user=zMhLeaoAAAAJ',
    email: 'TODO',
  },
  resume: {
    // TODO: add a public CV PDF URL.
    fileUrl: 'TODO',
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
        'Machine learning for semiconductor manufacturing and test, including synthetic data, explainable ML, and wafer-level e-test variability.',
    },
    {
      company: 'KBR',
      position: 'AI/ML Research Intern',
      from: 'May 2024',
      to: 'Present',
      companyLink: 'https://www.kbr.com/',
      description:
        'Synthetic aperture radar imaging with complex-valued neural networks and AWS cloud training.',
    },
    {
      company: 'Advantest America',
      position: 'Machine Learning Engineering Intern',
      from: 'Summer 2022',
      to: '',
      companyLink: 'https://www.advantest.com/',
      description:
        'Machine learning pipelines on large wafer test datasets for yield analytics.',
    },
    {
      company: 'Princeton Plasma Physics Laboratory',
      position: 'Lab Research Intern, DOE SULI',
      from: 'Summer 2020',
      to: '',
      companyLink: 'https://www.pppl.gov/',
      description:
        'Plasma simulation and data analysis, including closed-loop vertical-position control modeling for the NSTX-U tokamak.',
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
    defaultTheme: 'procyon',
    disableSwitch: false,
    respectPrefersColorScheme: false,
    displayAvatarRing: true,
    themes: [
      'light',
      'dark',
      'emerald',
      'corporate',
      'synthwave',
      'halloween',
      'forest',
      'Luxury',
      'business',
      'night',
      'dim',
      'nord',
      'sunset',
      'procyon',
    ],
    customTheme: {
      primary: '#ff944d',
      secondary: '#219aaf',
      accent: '#0066ff',
      neutral: '#efedf4',
      'base-100': '#08252b',
      '--rounded-box': '3rem',
      '--rounded-btn': '3rem',
    },
  },
  footer: `© 2026 Matthew Nigh`,
  enablePWA: false,
};

export default CONFIG;
