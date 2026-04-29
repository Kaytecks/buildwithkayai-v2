import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Certifications and Education — Kehinde Oyekunle',
  description: 'ISO 27001, DCCA, Fortinet NSE, CNSS. MSc Cybersecurity at Teesside University UK.',
  openGraph: {
    title: 'Certifications and Education — Kehinde Oyekunle',
    description: 'ISO 27001, DCCA, Fortinet NSE, CNSS. MSc Cybersecurity at Teesside University UK.',
    url: 'https://www.buildwithkayai.com/certifications',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
