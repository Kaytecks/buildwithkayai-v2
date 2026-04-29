import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cybersecurity + AI Research — Kehinde Oyekunle',
  description: 'MSc Cybersecurity research exploring AI-powered threat detection and DevSecOps.',
  openGraph: {
    title: 'Cybersecurity + AI Research — Kehinde Oyekunle',
    description: 'MSc Cybersecurity research exploring AI-powered threat detection and DevSecOps.',
    url: 'https://www.buildwithkayai.com/cybersec',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
