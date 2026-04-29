import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About — Kehinde Oyekunle | DevOps & SRE Engineer',
  description: 'From NYSC Youth Corper to DevOps Engineer. 3+ years of cloud infrastructure.',
  openGraph: {
    title: 'About — Kehinde Oyekunle | DevOps & SRE Engineer',
    description: 'From NYSC Youth Corper to DevOps Engineer. 3+ years of cloud infrastructure.',
    url: 'https://www.buildwithkayai.com/about',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
