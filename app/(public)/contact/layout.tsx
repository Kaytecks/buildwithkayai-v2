import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact — Kehinde Oyekunle | Open to Remote Opportunities',
  description: 'Open to remote DevOps/SRE roles, cloud infrastructure contracts, and cybersecurity collaborations.',
  openGraph: {
    title: 'Contact — Kehinde Oyekunle | Open to Remote Opportunities',
    description: 'Open to remote DevOps/SRE roles, cloud infrastructure contracts, and cybersecurity collaborations.',
    url: 'https://www.buildwithkayai.com/contact',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
