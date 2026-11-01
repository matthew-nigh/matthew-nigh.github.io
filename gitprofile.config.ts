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
      'ML and synthetic data for semiconductor manufacturing and physical systems.',
    about:
      "Matthew Nigh is a PhD candidate in Computer Engineering at UC San Diego (expected June 2027), in the TRELA Lab advised by Yiorgos Makris. He earned an MS from the University of Texas at Dallas (2023) and a BS in Electrical Engineering from the University of Wisconsin-Platteville (2021). He builds machine learning and synthetic data for semiconductor manufacturing and physical systems, including synthetic process control monitoring data, wafer acceptance test limit setting, metrology-to-e-test correlation, and SHAP-guided classification of wafer-level e-test variability. A longer-term interest is machine learning for plasma control, fusion diagnostics, and fusion data analysis. In Summer 2020 he was a DOE SULI intern at Princeton Plasma Physics Laboratory, working on closed-loop vertical-position control modeling for the NSTX-U tokamak. He's looking for ML research and applied data science roles in advanced manufacturing, national labs, and fusion energy, starting mid-2027.",
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
        'PhD research in the TRELA Lab at UC San Diego with advisor Yiorgos Makris, centered on machine learning and synthetic data for semiconductor manufacturing and physical systems. A longer-term interest is plasma control, fusion diagnostics, and fusion data analysis.',
      projects: [
        {
          title: 'Synthetic PCM data and WAT limit setting',
          description:
            'Synthetic data generation for process control monitoring data and wafer acceptance test (WAT) limit setting. Generation and Quality Evaluation of Synthetic Process Control Monitoring Data (ITC 2024, Best Paper Honorable Mention). Beyond Monte Carlo: Improved Wafer Acceptance Test (WAT) Limit Setting via Correlation-Aware Synthetic Data Generation (ITC 2026).',
          link: '',
        },
        {
          title: 'Metrology-to-e-test correlation',
          description:
            'Metrology-to-e-test correlation modeling that integrates process expertise (VTS 2025).',
          link: '',
        },
        {
          title: 'WALET: e-test variability',
          description:
            'SHAP-guided classification of wafer-level e-test variability (WALET, VTS 2026).',
          link: '',
        },
        {
          title: 'STAMP: tool-chain attestation',
          description:
            'Tool-chain attestation from wafer-level process monitoring (STAMP, DAC 2026).',
          link: '',
        },
        {
          title: 'Internships',
          description:
            'Side work, with roles and dates under Experience: synthetic aperture radar imaging at KBR (May 2024–present), wafer-test yield analytics at Advantest America (Summer 2022), and NSTX-U vertical-position control modeling at Princeton Plasma Physics Laboratory (Summer 2020).',
          link: '',
        },
      ],
    },
  },
  seo: {
    title:
      'Matthew Nigh | ML and Synthetic Data for Semiconductor Manufacturing',
    description:
      'Matthew Nigh is a Computer Engineering PhD student at UC San Diego. He builds machine learning and synthetic data for semiconductor manufacturing and physical systems.',
    imageURL: 'https://matthew-nigh.github.io/og-image.png',
    siteUrl: 'https://matthew-nigh.github.io/',
  },
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Matthew Nigh',
    description:
      'Matthew Nigh is a Computer Engineering PhD student at UC San Diego. He builds machine learning and synthetic data for semiconductor manufacturing and physical systems.',
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
        'Synthetic data for process control monitoring and WAT limit setting, metrology-to-e-test correlation, SHAP-guided wafer-level e-test variability, and tool-chain attestation from wafer-level process monitoring.',
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
    // Forest is the first-visit default. It is also first in `themes`, which
    // DaisyUI compiles as the :root theme. respectPrefersColorScheme stays
    // false so a system light/dark preference does not replace Forest.
    // localStorage is written only after the visitor picks a theme.
    defaultTheme: 'forest',
    disableSwitch: false,
    respectPrefersColorScheme: false,
    displayAvatarRing: true,
    themes: [
      'forest',
      'light',
      'dark',
      'emerald',
      'corporate',
      'synthwave',
      'halloween',
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
