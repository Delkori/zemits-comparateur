import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Zemits - Guide machine esthetique | Comparateur personnalise",
  description: "Trouvez la machine esthetique ideale pour votre centre. Guide personnalise gratuit, comparateur et devis sous 24h.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body style={{margin: 0, fontFamily: "system-ui, sans-serif", backgroundColor: "#f8f4ef"}}>
        {children}
      </body>
    </html>
  )
}
