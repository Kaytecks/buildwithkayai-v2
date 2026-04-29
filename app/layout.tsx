import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'BuildWithKayAI | K. Oyekunle · DevOps · SRE · Cybersecurity',
  description: 'Kehinde Oyekunle — DevOps & SRE Engineer. Building scalable, secure, cloud-native infrastructure. Open to remote opportunities worldwide.',
  keywords: ['DevOps Engineer', 'SRE', 'AWS', 'Terraform', 'Kubernetes', 'Cloud Infrastructure', 'Cybersecurity', 'UK', 'Remote'],
  authors: [{ name: 'Kehinde Oyekunle' }],
  openGraph: {
    title: 'BuildWithKayAI | Kehinde Oyekunle',
    description: 'DevOps & SRE Engineer. Building secure, scalable cloud infrastructure.',
    url: 'https://www.buildwithkayai.com',
    siteName: 'BuildWithKayAI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BuildWithKayAI | Kehinde Oyekunle',
    description: 'DevOps & SRE Engineer. Building secure, scalable cloud infrastructure.',
  },
  metadataBase: new URL('https://www.buildwithkayai.com'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
