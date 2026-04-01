import Link from 'next/link'

export default function Home() {
  const categories = [
    { slug: 'Hydrodermabrasion', label: 'Hydrodermabrasion', icon: '💧', desc: 'Nettoyage profond par aspiration et infusion' },
    { slug: 'Cryothérapie', label: 'Cryothérapie', icon: '❄️', desc: 'Lifting et raffermissement par le froid' },
    { slug: 'Cavitation', label: 'Cavitation', icon: '🔊', desc: 'Remodelage corporel par ultrasons' },
    { slug: 'Haute fréquence', label: 'Haute Fréquence', icon: '✨', desc: 'Anti-acné et cicatrisation accélérée' },
    { slug: 'Multiplex / Combo', label: 'Multiplex / Combo', icon: '🔬', desc: 'Machines tout-en-un multifonctions' },
  ]

  return (
    <main className="min-h-screen bg-[#f8f4ef]">
      <header className="bg-[#1a1a2e] text-white py-4 px-8 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-[#C9A84C]">ZEMITS</span>
          <span className="text-sm text-gray-400 hidden md:block">Comparateur Professionnel</span>
        </div>
        <nav className="flex gap-4 text-sm items-center">
          <Link href="/comparateur" className="hover:text-[#C9A84C] transition">Comparateur</Link>
          <Link href="/contact" className="bg-[#C9A84C] text-[#1a1a2e] px-4 py-2 rounded font-semibold hover:bg-yellow-400 transition">
            Demander un devis
          </Link>
        </nav>
      </header>

      <section className="bg-[#1a1a2e] text-white py-24 px-8 text-center">
        <p className="text-[#C9A84C] font-semibold mb-3 tracking-widest uppercase text-sm">N°1 en France</p>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Comparez les meilleures<br/>
          <span className="text-[#C9A84C]">machines esthétiques</span>
        </h1>
        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
          Zemits face aux leaders du marché — spécifications, technologies, prix, garantie
        </p>
        <Link href="/comparateur"
          className="bg-[#C9A84C] text-[#1a1a2e] px-10 py-4 rounded-xl text-lg font-bold hover:bg-yellow-400 transition inline-block shadow-lg">
          Lancer le comparateur →
        </Link>
      </section>

      <section className="py-20 px-8 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#1a1a2e]">Choisissez votre catégorie</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((cat) => (
            <Link key={cat.slug} href={`/comparateur?categorie=${encodeURIComponent(cat.slug)}`}
              className="bg-white rounded-2xl p-6 shadow hover:shadow-xl transition border-2 border-transparent hover:border-[#C9A84C] text-center group">
              <div className="text-4xl mb-3">{cat.icon}</div>
              <h3 className="font-bold text-[#1a1a2e] group-hover:text-[#C9A84C] transition">{cat.label}</h3>
              <p className="text-gray-500 text-xs mt-2">{cat.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-[#1a1a2e] text-white py-20 px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Pourquoi <span className="text-[#C9A84C]">Zemits</span> ?</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: '🏆', title: 'Qualité certifiée', desc: 'CE, ISO, FDA approuvé' },
              { icon: '🇫🇷', title: 'Support France', desc: 'SAV et formation en français' },
              { icon: '💰', title: 'Prix direct fabricant', desc: 'Sans intermédiaire' },
              { icon: '🔧', title: 'Garantie 2 ans', desc: 'Pièces et main-d'œuvre' },
            ].map((item) => (
              <div key={item.title} className="bg-white/10 rounded-2xl p-6 hover:bg-white/20 transition">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-[#C9A84C] mb-1">{item.title}</h3>
                <p className="text-gray-300 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-400 py-8 px-8 text-center text-sm">
        <p>© 2026 Zemits France — 
          <a href="https://zemits.store" className="text-[#C9A84C] hover:underline ml-1">zemits.store</a>
        </p>
      </footer>
    </main>
  )
}
