"use client"
import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8f4ef]">
      <header className="bg-[#1a1a2e] text-white py-4 px-8 flex justify-between items-center shadow">
        <span className="text-2xl font-bold text-[#C9A84C]">ZEMITS</span>
        <nav className="hidden md:flex gap-6 text-sm">
          <Link href="/guide" className="hover:text-[#C9A84C] transition">Guide achat</Link>
          <Link href="/comparateur" className="hover:text-[#C9A84C] transition">Comparateur</Link>
          <Link href="/contact" className="hover:text-[#C9A84C] transition">Devis</Link>
        </nav>
        <Link href="/guide" className="bg-[#C9A84C] text-[#1a1a2e] px-5 py-2 rounded-lg font-bold text-sm hover:bg-yellow-400 transition">
          Trouver ma machine
        </Link>
      </header>

      <section className="bg-[#1a1a2e] text-white py-24 px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-block bg-[#C9A84C] text-[#1a1a2e] text-xs font-black px-4 py-2 rounded-full mb-6 uppercase tracking-widest">
            Guide personnalise gratuit
          </div>
          <h1 className="text-5xl font-black leading-tight mb-6">
            Trouvez la machine<br />
            <span className="text-[#C9A84C]">ideale pour votre centre</span>
          </h1>
          <p className="text-gray-300 text-xl mb-10 leading-relaxed">
            Repondez a 4 questions. Notre algorithme selectionne les meilleures machines esthetiques selon votre profil, votre budget et votre clientele.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/guide"
              className="bg-[#C9A84C] text-[#1a1a2e] px-10 py-5 rounded-2xl font-black text-lg hover:bg-yellow-400 transition shadow-2xl">
              Demarrer le guide gratuit
            </Link>
            <Link href="/comparateur"
              className="border-2 border-white text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white hover:text-[#1a1a2e] transition">
              Comparer directement
            </Link>
          </div>
          <p className="text-gray-500 text-sm mt-6">2 minutes - 100% gratuit - Sans engagement</p>
        </div>
      </section>

      <section className="py-16 px-8 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-[#1a1a2e] mb-12">Comment ca marche ?</h2>
        <div className="grid md:grid-cols-4 gap-6 text-center">
          {[
            { num: "1", title: "Votre profil", desc: "Indiquez votre type de soins et votre usage" },
            { num: "2", title: "Votre budget", desc: "Definissez votre enveloppe d-investissement" },
            { num: "3", title: "Notre analyse", desc: "Algorithme de scoring sur 50+ criteres" },
            { num: "4", title: "Votre devis", desc: "Recevez une offre personnalisee sous 24h" },
          ].map(function(item) {
            return (
              <div key={item.num} className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition">
                <div className="w-12 h-12 bg-[#C9A84C] text-[#1a1a2e] rounded-full flex items-center justify-center font-black text-xl mx-auto mb-4">
                  {item.num}
                </div>
                <h3 className="font-bold text-[#1a1a2e] mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      <section className="bg-white py-16 px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-[#1a1a2e] mb-12">Nos categories de machines</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { cat: "visage", label: "Soins visage", count: "12 machines", desc: "Hydrafacial, anti-age, eclat" },
              { cat: "corps", label: "Corps et minceur", count: "9 machines", desc: "Cryolipolyse, cavitation" },
              { cat: "acne", label: "Anti-acne", count: "6 machines", desc: "LED, haute frequence" },
              { cat: "polyvalent", label: "Polyvalent", count: "5 machines", desc: "Tout en un, 6 technologies" },
            ].map(function(cat) {
              return (
                <Link key={cat.cat} href="/guide"
                  className="bg-[#f8f4ef] rounded-2xl p-6 hover:shadow-lg transition group cursor-pointer block">
                  <h3 className="font-bold text-[#1a1a2e] mb-1 group-hover:text-[#C9A84C] transition">{cat.label}</h3>
                  <div className="text-[#C9A84C] text-xs font-bold mb-2">{cat.count}</div>
                  <p className="text-gray-500 text-sm">{cat.desc}</p>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#1a1a2e] text-white py-20 px-8 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-black mb-4">Pret a trouver votre machine ?</h2>
          <p className="text-gray-400 mb-8">Plus de 500 professionnels ont deja fait confiance a notre guide.</p>
          <Link href="/guide"
            className="bg-[#C9A84C] text-[#1a1a2e] px-10 py-5 rounded-2xl font-black text-lg hover:bg-yellow-400 transition inline-block">
            Demarrer maintenant - Gratuit
          </Link>
        </div>
      </section>

      <footer className="bg-[#0e0e1a] text-gray-500 py-8 px-8 text-center text-sm">
        <p>Zemits France - Machines esthetiques professionnelles - zemits.fr</p>
      </footer>
    </main>
  )
}
