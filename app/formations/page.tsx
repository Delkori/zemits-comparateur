import Link from 'next/link'

type Formation = {
  id: string
  titre: string
  description: string
  duree: string
  prix: number
  sessions: Array<{
    ville: string
    dates: string
  }>
  prerequis: string
  certification: boolean
  emoji: string
}

const formations: Formation[] = [
  {
    id: 'laser-ipl',
    titre: 'Epilation Laser & IPL',
    description: 'Devenez expert laser/IPL selon l arrete du 19/02/2025. Theorie + pratique + PSC. Certification valable 5 ans.',
    duree: '25h (9h theorie + 16h pratique)',
    prix: 1380,
    sessions: [
      { ville: 'Paris', dates: '19-21 mai 2026' },
      { ville: 'Marseille', dates: '27-29 mai 2026' },
      { ville: 'Nancy', dates: '10-12 juin 2026' },
    ],
    prerequis: 'Diplome esthetique ou infirmier(ere)',
    certification: true,
    emoji: '🔥',
  },
  {
    id: 'radiofrequence',
    titre: 'Radiofrequence & Micro-ondes',
    description: 'Maitrisez RF monopolaire/bipolaire pour raffermissement cutane. Protocoles visage et corps sur appareils professionnels.',
    duree: '16h (6h theorie + 10h pratique)',
    prix: 980,
    sessions: [
      { ville: 'Paris', dates: '15-16 avril 2026' },
      { ville: 'Lyon', dates: '20-21 avril 2026' },
      { ville: 'Marseille', dates: '25-26 avril 2026' },
    ],
    prerequis: 'Diplome esthetique',
    certification: true,
    emoji: '📡',
  },
  {
    id: 'cryolipolyse',
    titre: 'Cryolipolyse Professionnelle',
    description: 'Techniques de cryoadipolyse securisees. Gestion des applicateurs, parametrage et suivi client post-seance.',
    duree: '12h (4h theorie + 8h pratique)',
    prix: 790,
    sessions: [
      { ville: 'Paris', dates: '8-9 mai 2026' },
      { ville: 'Lyon', dates: '13-14 mai 2026' },
      { ville: 'Bordeaux', dates: '18-19 mai 2026' },
    ],
    prerequis: 'Diplome esthetique',
    certification: true,
    emoji: '🧊',
  },
  {
    id: 'gestion-institut',
    titre: 'Gestion & Optimisation Institut',
    description: 'Rentabilisez votre institut : pricing, fidelisation, marketing digital, gestion des stocks et des rendez-vous.',
    duree: '14h (en ligne + presentiel)',
    prix: 690,
    sessions: [
      { ville: 'En ligne', dates: 'Mai 2026' },
      { ville: 'Paris', dates: '3 juin 2026' },
    ],
    prerequis: 'Chef d entreprise esthetique',
    certification: true,
    emoji: '📊',
  },
  {
    id: 'business-esthetique',
    titre: 'Business & Marketing Esthetique',
    description: 'Developpez votre chiffre d affaires : Instagram pro, Google Ads, partenariats locaux et upsell machines.',
    duree: '10h (100% en ligne)',
    prix: 490,
    sessions: [
      { ville: 'En ligne', dates: 'Tous les mois' },
    ],
    prerequis: 'Aucun',
    certification: true,
    emoji: '💼',
  },
  {
    id: 'cavitation',
    titre: 'Cavitation Ultrasons',
    description: 'Maitrisez la lipocavitation : protocoles minceur, combinaisons RF/vide, bilan et suivi resultats.',
    duree: '8h (3h theorie + 5h pratique)',
    prix: 590,
    sessions: [
      { ville: 'Paris', dates: '22-23 avril 2026' },
      { ville: 'Lyon', dates: '27-28 avril 2026' },
    ],
    prerequis: 'Diplome esthetique',
    certification: true,
    emoji: '🎯',
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
            <Link href="/formations" className="text-sm font-medium text-[#6C47FF] font-bold border-b-2 border-[#6C47FF]">Formations</Link>
            <Link href="/contact" className="text-sm font-medium text-gray-600 hover:text-[#6C47FF] transition">Devis</Link>
          </div>
          <Link href="/contact" className="hidden md:inline-flex items-center gap-2 bg-[#6C47FF] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#5835ee] transition shadow-lg shadow-purple-200">
            S inscrire <span>→</span>
          </Link>
        </div>
      </nav>

      <div className="pt-24 pb-20 max-w-6xl mx-auto px-4">

        {/* HEADER */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-50 border border-purple-200 text-[#6C47FF] text-xs font-bold px-4 py-2 rounded-full mb-8 uppercase tracking-widest">
            <span className="w-2 h-2 bg-[#6C47FF] rounded-full animate-pulse inline-block"></span>
            Certifications officielles
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">
            Nos <span className="text-[#6C47FF]">formations</span> certifiantes
          </h1>
          <p className="text-gray-500 text-lg max-w-3xl mx-auto leading-relaxed">
            Formations pratiques et certifiantes pour maitriser les technologies laser, RF, cryolipolyse et developper votre institut. Eligibles OPCO / FAFCEA.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <div className="flex items-center gap-2 text-sm text-gray-600"><span className="text-[#6C47FF] font-black text-lg">6</span> formations disponibles</div>
            <div className="flex items-center gap-2 text-sm text-gray-600"><span className="text-[#6C47FF] font-black text-lg">100%</span> certifiantes</div>
            <div className="flex items-center gap-2 text-sm text-gray-600"><span className="text-[#6C47FF] font-black text-lg">OPCO</span> eligible</div>
            <div className="flex items-center gap-2 text-sm text-gray-600"><span className="text-[#6C47FF] font-black text-lg">Paris / Lyon / Marseille</span></div>
          </div>
        </div>

        {/* FORMATIONS CARDS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {formations.map((f) => (
            <div key={f.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-[#6C47FF]/30 transition-all duration-300 p-8 group flex flex-col">
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#6C47FF] to-[#9B7DFF] rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-purple-200">
                  {f.emoji}
                </div>
                {f.certification && (
                  <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full">✓ Certifiante</span>
                )}
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-3 group-hover:text-[#6C47FF] transition">{f.titre}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-5 flex-1">{f.description}</p>
              <div className="space-y-2 mb-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-purple-50 text-[#6C47FF] rounded-full flex items-center justify-center text-xs font-bold">⏱</span>
                  <span>{f.duree}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-purple-50 text-[#6C47FF] rounded-full flex items-center justify-center text-xs font-bold">📋</span>
                  <span>{f.prerequis}</span>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-black text-[#6C47FF]">{f.prix.toLocaleString()} €</span>
                  <Link href="/contact" className="bg-[#6C47FF] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#5835ee] transition shadow-md">
                    S inscrire
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {f.sessions.slice(0, 2).map((s, i) => (
                    <div key={i} className="bg-gray-50 p-3 rounded-xl text-xs">
                      <div className="font-bold text-gray-900">{s.ville}</div>
                      <div className="text-gray-500">{s.dates}</div>
                    </div>
                  ))}
                  {f.sessions.length > 2 && (
                    <div className="col-span-2 text-center bg-purple-50 border border-purple-100 p-2 rounded-xl text-[#6C47FF] text-xs font-bold">
                      +{f.sessions.length - 2} session(s) disponible(s)
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AVANTAGES */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-10 mb-16">
          <h2 className="text-2xl font-black text-gray-900 text-center mb-10">Pourquoi se former avec nous ?</h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { emoji: '🏆', titre: 'Certifications reconnues', desc: 'Conformes reglementation 2025' },
              { emoji: '👩‍🏫', titre: 'Formateurs experts', desc: '10+ ans de terrain' },
              { emoji: '💳', titre: 'Eligible OPCO/FAFCEA', desc: 'Financement facilite' },
              { emoji: '📍', titre: '3 villes en France', desc: 'Paris, Lyon, Marseille' },
            ].map((item, i) => (
              <div key={i}>
                <div className="text-4xl mb-4">{item.emoji}</div>
                <div className="font-bold text-gray-900 mb-2">{item.titre}</div>
                <div className="text-sm text-gray-500">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-[#6C47FF] to-[#9B7DFF] rounded-3xl p-12 text-center shadow-2xl">
          <h2 className="text-3xl font-black text-white mb-4">Pret a vous former ?</h2>
          <p className="text-purple-200 text-lg mb-8">Contactez-nous pour un devis personalise et une prise en charge OPCO/FAFCEA.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-[#6C47FF] px-10 py-4 rounded-2xl font-black text-lg hover:bg-purple-50 transition shadow-2xl">
            Demander un devis formation →
          </Link>
        </div>

      </div>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#6C47FF] rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-black">E</span>
            </div>
            <span className="text-white font-black text-lg">Estheti<span className="text-[#9B7DFF]">Scan</span></span>
          </div>
          <p className="text-xs">© 2026 EsthetiScan — Formations certifiantes pour professionnels de l esthetique</p>
        </div>
      </footer>
    </main>
  )
}
