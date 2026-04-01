"use client"
import Link from "next/link"
import { useState } from "react"

const STATS = [
  { value: "500+", label: "professionnels accompagnes" },
  { value: "32", label: "machines comparees" },
  { value: "4 min", label: "pour trouver votre machine" },
  { value: "24h", label: "pour recevoir votre devis" },
]

const FEATURES = [
  {
    icon: "🎯",
    title: "Guide personnalise",
    desc: "Repondez a 4 questions. Notre algorithme selectionne les machines les plus adaptees a votre profil.",
    cta: "Demarrer le guide",
    href: "/guide",
    badge: "Gratuit"
  },
  {
    icon: "⚖️",
    title: "Comparateur expert",
    desc: "Comparez cote a cote les machines Zemits sur 20+ criteres : prix, technologie, garantie, ROI.",
    cta: "Comparer",
    href: "/comparateur",
    badge: "Objectif"
  },
  {
    icon: "📋",
    title: "Devis sous 24h",
    desc: "Obtenez une offre personnalisee avec financement adapte a votre centre esthetique.",
    cta: "Demander un devis",
    href: "/contact",
    badge: "Rapide"
  },
]

const TEMOIGNAGES = [
  { nom: "Sophie M.", centre: "Institut Belle & Zen, Lyon", note: 5, texte: "Guide ultra-precis, j'ai trouve ma machine en 3 minutes. Le devis etait dans ma boite mail le lendemain." },
  { nom: "Laure D.", centre: "Spa Lumiere, Paris", note: 5, texte: "Comparatif tres clair face aux autres marques. J'ai economise 4 000 EUR par rapport a HydraFacial MD." },
  { nom: "Nathalie R.", centre: "Beauty Pro, Bordeaux", note: 5, texte: "Equipe reactive, machine livree en 10 jours. Mon ROI a ete atteint des le 2eme mois." },
]

const CATEGORIES = [
  { icon: "✨", label: "Soins visage", count: 12, desc: "Hydradermabrasion, anti-age, eclat", href: "/guide?cat=visage" },
  { icon: "💪", label: "Corps & minceur", count: 9, desc: "Cryolipolyse, cavitation, galbe", href: "/guide?cat=corps" },
  { icon: "🌿", label: "Anti-acne", count: 6, desc: "LED, haute frequence, purete", href: "/guide?cat=acne" },
  { icon: "⚡", label: "Polyvalent", count: 5, desc: "Tout-en-un, 6 technologies", href: "/guide?cat=polyvalent" },
]

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <main className="min-h-screen bg-white font-sans">
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
            <Link href="/contact" className="text-sm font-medium text-gray-600 hover:text-[#6C47FF] transition">Devis</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/guide" className="hidden md:inline-flex items-center gap-2 bg-[#6C47FF] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#5835ee] transition shadow-lg shadow-purple-200">
              Trouver ma machine
              <span>→</span>
            </Link>
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 rounded-lg hover:bg-gray-100">
              <div className="w-5 h-0.5 bg-gray-700 mb-1"></div>
              <div className="w-5 h-0.5 bg-gray-700 mb-1"></div>
              <div className="w-5 h-0.5 bg-gray-700"></div>
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 flex flex-col gap-3">
            <Link href="/guide" className="text-sm font-medium text-gray-700 py-2">Guide achat</Link>
            <Link href="/comparateur" className="text-sm font-medium text-gray-700 py-2">Comparateur</Link>
            <Link href="/contact" className="text-sm font-medium text-gray-700 py-2">Devis</Link>
            <Link href="/guide" className="bg-[#6C47FF] text-white px-5 py-3 rounded-xl text-sm font-bold text-center">Trouver ma machine</Link>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="pt-28 pb-20 px-4 bg-gradient-to-br from-[#f5f3ff] via-white to-[#faf5ff]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-purple-50 border border-purple-200 text-[#6C47FF] text-xs font-bold px-4 py-2 rounded-full mb-8 uppercase tracking-widest">
            <span className="w-2 h-2 bg-[#6C47FF] rounded-full animate-pulse inline-block"></span>
            Guide personnalise gratuit
          </div>
          <h1 className="text-5xl sm:text-6xl font-black text-gray-900 leading-tight mb-6">
            La machine esthetique<br />
            <span className="text-[#6C47FF]">ideale pour votre centre</span>
          </h1>
          <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            Repondez a 4 questions. Notre algorithme compare 32 machines et selectionne la meilleure selon votre activite, votre budget et vos objectifs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/guide"
              className="inline-flex items-center justify-center gap-2 bg-[#6C47FF] text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-[#5835ee] transition shadow-xl shadow-purple-200">
              Demarrer le guide gratuit
              <span className="text-xl">→</span>
            </Link>
            <Link href="/comparateur"
              className="inline-flex items-center justify-center gap-2 bg-white border-2 border-gray-200 text-gray-700 px-10 py-5 rounded-2xl font-bold text-lg hover:border-[#6C47FF] hover:text-[#6C47FF] transition">
              Voir le comparateur
            </Link>
          </div>
          <p className="text-xs text-gray-400">⏱ 4 minutes — 100% gratuit — Sans engagement — Devis sous 24h</p>
        </div>
      </section>

      {/* STATS */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {STATS.map((s) => (
            <div key={s.value}>
              <div className="text-3xl font-black text-[#6C47FF] mb-1">{s.value}</div>
              <div className="text-sm text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-black text-gray-900 mb-3">Tout ce dont vous avez besoin</h2>
            <p className="text-gray-500">Du premier contact jusqu'a l'achat, on vous accompagne.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {FEATURES.map((f) => (
              <div key={f.title} className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition group border border-gray-100">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-2xl">{f.icon}</div>
                  <span className="text-xs font-bold text-[#6C47FF] bg-purple-50 px-3 py-1 rounded-full">{f.badge}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">{f.desc}</p>
                <Link href={f.href}
                  className="inline-flex items-center gap-2 text-[#6C47FF] font-bold text-sm group-hover:gap-3 transition-all">
                  {f.cta} <span>→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMENT CA MARCHE */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-black text-gray-900 mb-3">Comment ca marche ?</h2>
            <p className="text-gray-500">Simple, rapide, sans engagement.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { n: "01", title: "Votre profil", desc: "Type de soins, frequence, experience" },
              { n: "02", title: "Votre budget", desc: "Enveloppe et mode de financement" },
              { n: "03", title: "Notre analyse", desc: "Scoring sur 50+ criteres techniques" },
              { n: "04", title: "Votre devis", desc: "Offre personnalisee sous 24h" },
            ].map((step) => (
              <div key={step.n} className="relative text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#6C47FF] to-[#9B7DFF] rounded-2xl flex items-center justify-center text-white font-black text-xl mx-auto mb-4 shadow-lg shadow-purple-100">
                  {step.n}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/guide"
              className="inline-flex items-center gap-2 bg-[#6C47FF] text-white px-10 py-4 rounded-2xl font-bold hover:bg-[#5835ee] transition shadow-lg shadow-purple-200">
              Commencer maintenant — Gratuit →
            </Link>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-black text-gray-900 mb-3">Explorez par categorie</h2>
            <p className="text-gray-500">32 machines dans 4 grandes familles de soins.</p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
            {CATEGORIES.map((cat) => (
              <Link key={cat.label} href={cat.href}
                className="bg-white rounded-2xl p-6 hover:shadow-xl transition group border border-gray-100 hover:border-[#6C47FF] cursor-pointer block">
                <div className="text-3xl mb-4">{cat.icon}</div>
                <div className="font-bold text-gray-900 group-hover:text-[#6C47FF] transition mb-1">{cat.label}</div>
                <div className="text-[#6C47FF] text-xs font-bold mb-2">{cat.count} machines</div>
                <p className="text-gray-400 text-xs">{cat.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TEMOIGNAGES */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-black text-gray-900 mb-3">Ils nous font confiance</h2>
            <div className="flex items-center justify-center gap-2">
              <div className="flex">{"★★★★★".split("").map((s, i) => <span key={i} className="text-yellow-400 text-xl">{s}</span>)}</div>
              <span className="text-gray-500 text-sm font-semibold">4.9/5 — 500+ avis</span>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TEMOIGNAGES.map((t) => (
              <div key={t.nom} className="bg-gray-50 rounded-3xl p-7 border border-gray-100">
                <div className="flex mb-4">{"★★★★★".split("").map((s, i) => <span key={i} className="text-yellow-400">★</span>)}</div>
                <p className="text-gray-700 text-sm leading-relaxed mb-6 italic">"{t.texte}"</p>
                <div>
                  <div className="font-bold text-gray-900 text-sm">{t.nom}</div>
                  <div className="text-gray-400 text-xs">{t.centre}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24 px-4 bg-gradient-to-br from-[#6C47FF] to-[#9B7DFF]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-black text-white mb-4">Pret a trouver votre machine ?</h2>
          <p className="text-purple-200 text-lg mb-10">Plus de 500 professionnels ont deja utilise notre guide. Gratuit, rapide, sans engagement.</p>
          <Link href="/guide"
            className="inline-flex items-center gap-2 bg-white text-[#6C47FF] px-12 py-5 rounded-2xl font-black text-lg hover:bg-purple-50 transition shadow-2xl">
            Demarrer maintenant — Gratuit →
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 bg-[#6C47FF] rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-black">E</span>
                </div>
                <span className="text-white font-black text-lg">Estheti<span className="text-[#9B7DFF]">Scan</span></span>
              </div>
              <p className="text-sm max-w-xs text-gray-500">Le comparateur de reference pour les machines esthetiques professionnelles en France.</p>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-white font-bold text-sm mb-3">Outils</h4>
                <div className="flex flex-col gap-2 text-sm">
                  <Link href="/guide" className="hover:text-white transition">Guide achat</Link>
                  <Link href="/comparateur" className="hover:text-white transition">Comparateur</Link>
                  <Link href="/contact" className="hover:text-white transition">Devis gratuit</Link>
                </div>
              </div>
              <div>
                <h4 className="text-white font-bold text-sm mb-3">Categories</h4>
                <div className="flex flex-col gap-2 text-sm">
                  <Link href="/guide?cat=visage" className="hover:text-white transition">Soins visage</Link>
                  <Link href="/guide?cat=corps" className="hover:text-white transition">Corps minceur</Link>
                  <Link href="/guide?cat=polyvalent" className="hover:text-white transition">Polyvalent</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-xs">© 2026 EsthetiScan — Propulse par Zemits France</p>
            <p className="text-xs">Comparateur independant de machines esthetiques professionnelles</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
