import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "EsthetiScan — Trouvez la machine esthetique ideale pour votre centre",
  description: "Comparateur et guide personnalise de machines esthetiques professionnelles. Comparez 32 machines, obtenez un devis sous 24h. Gratuit et sans engagement.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body style={{margin: 0, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"}}>{children}</body>
    </html>
  )
}
