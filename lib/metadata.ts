import type { Metadata } from 'next'

const baseUrl = 'https://www.buildwithkayai.com'

const base: Metadata = {
  metadataBase: new URL(baseUrl),
  authors: [{ name: 'Kehinde Oyekunle' }],
  creator: 'Kehinde Oyekunle',
  openGraph: {
    siteName: 'BuildWithKayAI',
    type: 'website',
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@kehinde_devops',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export const homeMetadata: Metadata = {
  ...base,
  title: 'BuildWithKayAI | Kehinde Oyekunle — DevOps & SRE Engineer',
  description: 'DevOps & SRE Engineer with 3+ years building scalable, secure cloud infrastructure. AWS, Terraform, Kubernetes, ISO 27001. Open to remote opportunities worldwide.',
  keywords: ['DevOps Engineer', 'SRE', 'AWS', 'Terraform', 'Kubernetes', 'Cloud Infrastructure', 'Cybersecurity', 'UK', 'Remote', 'Kehinde Oyekunle'],
  openGraph: {
    ...base.openGraph,
    title: 'Kehinde Oyekunle — DevOps & SRE Engineer',
    description: 'Building scalable, secure cloud infrastructure. Open to remote opportunities worldwide.',
    url: baseUrl,
  },
}

export const aboutMetadata: Metadata = {
  ...base,
  title: 'About — Kehinde Oyekunle | DevOps & SRE Engineer',
  description: 'From NYSC Youth Corper to DevOps Engineer. 3+ years of cloud infrastructure, ISO 27001 audits, and production deployments. Now pursuing MSc Cybersecurity at Teesside University.',
  openGraph: {
    ...base.openGraph,
    title: 'About Kehinde Oyekunle',
    description: 'From NYSC Youth Corper to DevOps Engineer. My journey in cloud infrastructure and cybersecurity.',
    url: `${baseUrl}/about`,
  },
}

export const projectsMetadata: Metadata = {
  ...base,
  title: 'Projects — Kehinde Oyekunle | Built From Scratch, Deployed to Prod',
  description: 'Portfolio of real production projects: Visitor Management System (90% time saved, 98% adoption), Secure File Share Platform, AWS Infrastructure Automation, and more.',
  openGraph: {
    ...base.openGraph,
    title: 'Projects — Built From Scratch, Deployed to Prod',
    description: 'Real production projects: VMS, Secure File Share, AWS Automation, Monitoring Stack.',
    url: `${baseUrl}/projects`,
  },
}

export const cybersecMetadata: Metadata = {
  ...base,
  title: 'Cybersecurity + AI Research — Kehinde Oyekunle',
  description: 'MSc Cybersecurity research at Teesside University. Exploring AI-powered threat detection, DevSecOps, and automated incident response in cloud environments.',
  openGraph: {
    ...base.openGraph,
    title: 'Cybersecurity Meets AI — Research & Interests',
    description: 'AI-powered threat detection, DevSecOps, and automated incident response research.',
    url: `${baseUrl}/cybersec`,
  },
}

export const experienceMetadata: Metadata = {
  ...base,
  title: 'Experience — Kehinde Oyekunle | Career Timeline',
  description: 'Career timeline: DevOps & SRE at Fringe Infrastructure, Cloud Exchange (started as NYSC Corper), Coils Tech USA, Network Engineer at OOU. 3+ years cloud infrastructure.',
  openGraph: {
    ...base.openGraph,
    title: 'Career Timeline — Kehinde Oyekunle',
    description: 'From NYSC Corper to DevOps & SRE Engineer. 3+ years of real-world cloud experience.',
    url: `${baseUrl}/experience`,
  },
}

export const certificationsMetadata: Metadata = {
  ...base,
  title: 'Certifications & Education — Kehinde Oyekunle',
  description: 'ISO/IEC 27001:2022, Data Centre Certified Associate (DCCA), Fortinet NSE 1&2, CNSS. MSc Cybersecurity — Teesside University. B.Eng Electrical/Electronics — OOU.',
  openGraph: {
    ...base.openGraph,
    title: 'Certifications & Education',
    description: 'ISO 27001, DCCA, Fortinet NSE, CNSS. MSc Cybersecurity at Teesside University UK.',
    url: `${baseUrl}/certifications`,
  },
}

export const logsMetadata: Metadata = {
  ...base,
  title: 'LOGS — Kehinde Oyekunle | DevOps Field Notes',
  description: 'Thoughts, breakdowns, and lessons from the field. Career reflections, project deep-dives, and everything at the intersection of DevOps, cybersecurity, and AI.',
  openGraph: {
    ...base.openGraph,
    title: 'LOGS — DevOps Field Notes & Posts',
    description: 'Career reflections, project breakdowns, and DevOps insights from Kehinde Oyekunle.',
    url: `${baseUrl}/logs`,
  },
}

export const contactMetadata: Metadata = {
  ...base,
  title: 'Contact — Kehinde Oyekunle | Open to Remote Opportunities',
  description: 'Open to remote DevOps/SRE roles, cloud infrastructure contracts, and cybersecurity + AI collaborations. Based in Middlesbrough, UK. Get in touch.',
  openGraph: {
    ...base.openGraph,
    title: 'Contact Kehinde Oyekunle',
    description: 'Open to remote opportunities worldwide. DevOps, SRE, Cloud Infrastructure.',
    url: `${baseUrl}/contact`,
  },
}
