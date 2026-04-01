import Link from 'next/link'

type Formation = {
  id: string
  titre: string
  description: string
  durée: string
  prix: number
  sessions: Array<{
    ville: string
    dates: string
    prixPromo?: number
  }>
  prérequis: string
  certification: boolean
}

const formations: Formation[] = [
  {
    id: 'laser-ipl',
    titre: 'Épilation Laser & IPL',
    description: 'Devenez expert laser/IPL selon l’arrêté du 19/02/2025. Théorie + pratique + PSC. Valable 5 ans.',
    durée: '25h (9h théorie + 16h pratique)',
    prix: 1380,
    sessions: [
      { ville: 'Paris', dates: '19-21 mai 2026' },
      { ville: 'Marseille', dates: '27-29 mai 2026' },
      { ville: 'Nancy', dates: '10-12 juin 2026' },
    ],
    prérequis: 'Diplôme esthétique ou infirmier(ère)',
    certification: true,
  },
  {
    id: 'radiofrequence',
    titre: 'Radiofréquence & Micro-ondes',
    description: 'Maîtrisez RF monopolaire/bipolaire pour raffermissement cutané. Protocoles visage/corps.',
    durée: '16h (6h théorie + 10h pratique)',
    prix: 980,
    sessions: [
      { ville: 'Paris', dates: '15-16 avril 2026' },
      { ville: 'Lyon', dates: '20-21 avril 2026' },
      { ville: 'Marseille', dates: '25-26 avril 2026' },
    ],
    prérequis: 'Diplôme esthétique',
    certification: true,
  },
  {
    id: 'cryolipolyse',
    titre: 'Cryolipolyse Professionnelle',
    description: 'Techniques de cryoadipolyse sécurisées. Gestion des applicateurs et suivi client.',
    durée: '12h (4h théorie + 8h pratique)',
    prix: 790,
    sessions: [
      { ville: 'Paris', dates: '8-9 mai 2026' },
      { ville: 'Lyon', dates: '13-14 mai 2026' },
      { ville: 'Bordeaux', dates: '18-19 mai 2026' },
    ],
    prérequis: 'Diplôme esthétique',
    certification: true,
  },
  {
    id: 'gestion-institut',
    titre: 'Gestion & Optimisation Institut',
    description: 'Rentabilisez votre institut : pricing, fidélisation, marketing digital, gestion stocks.',
    durée: '14h (en ligne + présentiel)',
    prix: 690,
    sessions: [
      { ville: 'En ligne', dates: 'Mai 2026' },
      { ville: 'Paris', dates: '3 juin 2026' },
    ],
    prérequis: 'Chef d’entreprise esthétique',
    certification: true,
  },
  {
    id: 'business-esthetique',
    titre: 'Business & Marketing Esthétique',
    description: 'Développez votre CA : Instagram pro, Google Ads, partenariats, upsell machines.',
    durée: '10h (100% en ligne)',
    prix: 490,
    sessions: [
      { ville: 'En ligne', dates: 'Tous les mois' },
    ],
    prérequis: 'Aucun',
    certification: true,
  },
  {
    id: 'cavitation',
    titre: 'Cavitation Ultrasons',
    description: 'Maîtrisez la lipocavitation : protocoles minceur, combinaisons RF/vide.',
    durée: '8h (3h théorie + 5h pratique)',
    prix: 590,
    sessions: [
      { ville: 'Paris', dates: '22-23 avril 2026' },
      { ville: 'Lyon', dates: '27-28 avril 2026' },
    ],
    prérequis: 'Diplôme esthétique',
    certification: true,
  },
]

export default function Formations() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#6C47FF] to-[#9B7DFF] rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-black">E</span>
            </div>
            <span className="text-xl font-black text-gray-900">Estheti<span className="text-[#6C47FF]">Scan</span></span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/guide" className="text-sm font-medium text-gray-600 hover:text-[#6C47FF] transition">Guide achat</Link>
            <Link href="/comparateur" className="text-sm font-medium text-gray-600 hover:text-[#6C47FF] transition">Comparateur</Link>
            <Link href="/formations" className="text-sm font-medium text-[#6C47FF] font-bold">Formations</Link>
            <Link href="/contact" className="text-sm font-medium text-gray-600 hover:text-[#6C47FF] transition">Devis</Link>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-20 max-w-6xl mx-auto px-4">

        {/* HEADER */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-50 border border-purple-200 text-[#6C47FF] text-xs font-bold px-4 py-2 rounded-full mb-8 uppercase tracking-widest">
            🎓 Certifications officielles
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">
            Nos <span className="text-[#6C47FF]">formations</span> certifiantes
          </h1>
          <p className="text-gray-500 text-lg max-w-3xl mx-auto leading-relaxed">
            Formations pratiques et certifiantes pour maîtriser les technologies laser, RF, cryolipolyse et développer votre institut. Éligibles OPCO/FAFCEA.
          </p>
        </div>

        {/* FORMATIONS CARDS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {formations.map((f) => (
            <div key={f.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition p-8 group">
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#6C47FF] to-[#9B7DFF] rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg">
                  {f.id === 'laser-ipl' ? '🔥' : f.id === 'radiofrequence' ? '📡' : f.id === 'cryolipolyse' ? '🧊' : f.id === 'gestion-institut' ? '📊' : f.id === 'business-esthetique' ? '💼' : '🎯'}
                </div>
                {f.certification && (
                  <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">Certifiante</span>
                )}
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-3 group-hover:text-[#6C47FF] transition">{f.titre}</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">{f.description}</p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-3 h-3 bg-gray-400 rounded-full" />
                  <span>Durée : {f.durée}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-3 h-3 bg-gray-400 rounded-full" />
                  <span>Prérequis : {f.prérequis}</span>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-3xl font-black text-[#6C47FF]">{f.prix.toLocaleString()} €</span>
                    {f.sessions[0].prixPromo && (
                      <span className="text-sm text-gray-400 line-through ml-2">{f.sessions[0].prixPromo.toLocaleString()} €</span>
                    )}
                  </div>
                  <Link href="/contact" className="bg-[#6C47FF] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-[#5835ee] transition shadow-lg">
                    S'inscrire
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                  {f.sessions.slice(0, 2).map((s, i) => (
                    <div key={i} className="bg-gray-50 p-2 rounded-lg">
                      <div className="font-bold">{s.ville}</div>
                      <div>{s.dates}</div>
                    </div>
                  ))}
                  {f.sessions.length > 2 && (
                    <div className="col-span-2 text-center bg-blue-50 border border-blue-200 p-2 rounded-lg text-blue-700 font-bold">
                      +{f.sessions.length - 2} sessions
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-[#6C47FF] to-[#9B7DFF] rounded-3xl p-12 text-center">
          <h2 className="text-3xl font-black text-white mb-4">Prêt à vous former ?</h2>
          <p className="text-purple-200 text-lg mb-8">Contactez-nous pour un devis personnalisé et une prise en charge OPCO/FAFCEA.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-[#6C47FF] px-10 py-4 rounded-2xl font-black text-lg hover:bg-purple-50 transition shadow-2xl">
            Demander un devis formation →
          </Link>
        </div>

      </div>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-white font-black text-lg">Estheti<span className="text-[#9B7DFF]">Scan</span></span>
          <p className="text-xs">© 2026 EsthetiScan — Formations certifiantes pour professionnels de l’esthétique</p>
        </div>
      </footer>
    </main>
  )
}
