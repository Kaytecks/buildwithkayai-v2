import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects — Kehinde Oyekunle | Built From Scratch',
  description: 'VMS 90% time saved, Secure File Share, AWS Automation and more production projects.',
  openGraph: {
    title: 'Projects — Kehinde Oyekunle | Built From Scratch',
    description: 'VMS 90% time saved, Secure File Share, AWS Automation and more production projects.',
    url: 'https://www.buildwithkayai.com/projects',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
