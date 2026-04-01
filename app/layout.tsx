import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Zemits - Guide machine esthetique | Comparateur personnalise",
  description: "Trouvez la machine esthetique ideale pour votre centre. Guide personnalise gratuit, comparateur et devis sous 24h.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
