import Link from 'next/link'
import { ArrowRight, Star, Award, CheckCircle } from 'lucide-react'

export default function Home() {
  const categories = [
    { slug: 'hydrodermabrasion', label: 'Hydrodermabrasion', icon: '💧', count: 4 },
    { slug: 'cryotherapie', label: 'Cryothérapie', icon: '❄️', count: 3 },
    { slug: 'radiofrequence', label: 'Radiofréquence', icon: '⚡', count: 4 },
    { slug: 'cavitation', label: 'Cavitation & Corps', icon: '🌊', count: 3 },
    { slug: 'haute-frequence', label: 'Haute Fréquence', icon: '✨', count: 3 },
    { slug: 'oxygene', label: 'Oxygène Pressurisé', icon: '🫧', count: 3 },
  ]

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="bg-[#1a1a2e] text-white py-4 px-6 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-[#C9A84C]">ZEMITS</span>
          <span className="text-sm text-gray-300 border-l border-gray-600 pl-3">Comparateur Professionnel</span>
        </div>
        <a href="https://zemits.store" target="_blank" rel="noopener noreferrer"
          className="bg-[#C9A84C] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#b8943d] transition">
          Voir le catalogue Zemits →
        </a>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1a1a2e] to-[#2d2d5e] text-white py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#C9A84C]/20 border border-[#C9A84C]/40 rounded-full px-4 py-1 text-[#C9A84C] text-sm mb-6">
            <Award size={14} /> Référence N°1 en équipements esthétiques professionnels
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Comparez les meilleures<br />
            <span className="text-[#C9A84C]">machines esthétiques</span><br />
            professionnelles
          </h1>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Trouvez l&apos;équipement idéal pour votre centre esthétique. Comparez les spécificités techniques, 
            les prix et les fonctionnalités de toutes les grandes marques.
          </p>
          <Link href="/comparateur"
            className="inline-flex items-center gap-2 bg-[#C9A84C] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#b8943d] transition">
            Comparer maintenant <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Avantages Zemits */}
      <section className="bg-white py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-[#1a1a2e] mb-8">Pourquoi choisir Zemits ?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '🏆', title: 'Qualité Certifiée CE', desc: 'Toutes nos machines sont certifiées CE et conformes aux normes européennes' },
              { icon: '🇫🇷', title: 'Support France', desc: 'Service après-vente en français, formation incluse et pièces disponibles en France' },
              { icon: '💰', title: 'Meilleur Rapport Q/P', desc: 'Technologie premium à des prix compétitifs par rapport aux marques américaines' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-6 rounded-xl border border-gray-100 shadow-sm card-hover">
                <span className="text-3xl">{item.icon}</span>
                <div>
                  <h3 className="font-bold text-[#1a1a2e] mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Catégories */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-[#1a1a2e] mb-2">Catégories de machines</h2>
          <p className="text-center text-gray-500 mb-10">Sélectionnez une catégorie pour comparer les équipements</p>
          <div className="grid md:grid-cols-3 gap-5">
            {categories.map((cat) => (
              <Link key={cat.slug} href={`/comparateur?categorie=${cat.slug}`}
                className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm card-hover text-center group">
                <span className="text-4xl mb-3 block">{cat.icon}</span>
                <h3 className="font-bold text-[#1a1a2e] mb-1 group-hover:text-[#C9A84C] transition">{cat.label}</h3>
                <span className="text-xs text-gray-400">{cat.count} machines comparées</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Lead */}
      <section className="bg-[#1a1a2e] text-white py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Besoin d&apos;un conseil personnalisé ?</h2>
          <p className="text-gray-300 mb-8">Nos experts Zemits vous accompagnent dans le choix de votre équipement</p>
          <Link href="/contact"
            className="inline-flex items-center gap-2 bg-[#C9A84C] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#b8943d] transition">
            Demander un devis gratuit <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#111] text-gray-400 py-8 px-6 text-center text-sm">
        <p>© 2026 Zemits France — <a href="https://zemits.store" className="text-[#C9A84C] hover:underline">zemits.store</a></p>
      </footer>
    </main>
  )
}
