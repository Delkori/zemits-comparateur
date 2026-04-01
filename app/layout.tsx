import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Comparateur Machines Esthétiques | Zemits France',
  description: 'Comparez les meilleures machines esthétiques professionnelles du marché. Zemits vs concurrents : HydraFacial, BTL, Candela et plus encore.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
