import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'BuildWithKayAI | Kehinde Oyekunle — DevOps & SRE Engineer',
  description: 'DevOps & SRE Engineer with 3+ years building scalable, secure cloud infrastructure. AWS, Terraform, Kubernetes, ISO 27001. Open to remote opportunities worldwide.',
  openGraph: {
    title: 'BuildWithKayAI | Kehinde Oyekunle | MSc Cybersecurity',
    description: 'DevOps Engineer. Building secure, scalable cloud infrastructure.',
    url: 'https://www.buildwithkayai.com',
    siteName: 'BuildWithKayAI',
  },
}

import Navigation from '@/components/shared/Navigation'
import Marquee from '@/components/shared/Marquee'
import AICopilot from '@/components/shared/AICopilot'
import MatrixCanvas from '@/components/shared/MatrixCanvas'
import Cursor from '@/components/shared/Cursor'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Cursor />
      <MatrixCanvas />
      <Navigation />
      <div style={{ paddingTop: '70px' }}>
        {children}
      </div>
      <Marquee />
      <AICopilot />
    </>
  )
}
