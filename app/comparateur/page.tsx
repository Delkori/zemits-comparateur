"use client"
import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { createClient } from "@supabase/supabase-js"
import Link from "next/link"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
)

type Machine = {
  id: string
  nom: string
  slug: string
  prix_eur: number
  technologies: string[]
  nb_fonctions: number
  garantie_annees: number
  formation_incluse: boolean
  support_marketing: boolean
  cible: string
  note_globale: number
  est_zemits: boolean
  mis_en_avant: boolean
  description?: string
  certifications?: string[]
}

const CRITERES = [
  { key: "prix_eur", label: "Prix HT", icon: "💶", format: (v: number) => `${Number(v).toLocaleString("fr-FR")} €`, highlight: (vals: number[]) => vals.indexOf(Math.min(...vals)) },
  { key: "nb_fonctions", label: "Nb fonctions", icon: "⚙️", format: (v: number) => `${v} fonctions`, highlight: (vals: number[]) => vals.indexOf(Math.max(...vals)) },
  { key: "garantie_annees", label: "Garantie", icon: "🛡️", format: (v: number) => `${v} ans`, highlight: (vals: number[]) => vals.indexOf(Math.max(...vals)) },
  { key: "note_globale", label: "Note client", icon: "⭐", format: (v: number) => `${v}/5`, highlight: (vals: number[]) => vals.indexOf(Math.max(...vals)) },
  { key: "formation_incluse", label: "Formation incluse", icon: "🎓", format: (v: boolean) => v ? "✅ Oui" : "❌ Non", highlight: () => -1 },
  { key: "support_marketing", label: "Support marketing", icon: "📣", format: (v: boolean) => v ? "✅ Oui" : "❌ Non", highlight: () => -1 },
  { key: "cible", label: "Cible idéale", icon: "🎯", format: (v: string) => v || "–", highlight: () => -1 },
]

function Stars({ note }: { note: number }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <span key={i} className={`text-xs ${i <= Math.round(note) ? "text-yellow-400" : "text-gray-200"}`}>★</span>
      ))}
    </div>
  )
}

function ComparateurInner() {
  const [machines, setMachines] = useState<Machine[]>([])
  const [selected, setSelected] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [filterCat, setFilterCat] = useState("all")
  const [menuOpen, setMenuOpen] = useState(false)
  const params = useSearchParams()

  useEffect(() => {
    supabase.from("machines").select("*").eq("est_zemits", true).order("mis_en_avant", { ascending: false }).then(({ data }) => {
      if (data) setMachines(data as Machine[])
      setLoading(false)
    })
  }, [])

  const toggle = (id: string) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : prev.length < 4 ? [...prev, id] : prev
    )
  }

  const categories = ["all", ...Array.from(new Set(machines.map(m => {
    const tech = m.technologies?.[0] || ""
    if (tech.includes("Hydro") || tech.includes("H2O")) return "Hydrodermabrasion"
    if (tech.includes("Cavitation") || tech.includes("Corps") || tech.includes("minceur")) return "Corps"
    if (tech.includes("RF") || tech.includes("Laser") || tech.includes("Frax")) return "RF & Laser"
    if (tech.includes("Cryo")) return "Cryothérapie"
    return "Multifonction"
  })))]

  const filtered = machines.filter(m => {
    const matchSearch = m.nom.toLowerCase().includes(search.toLowerCase())
    const tech = m.technologies?.[0] || ""
    const cat =
      tech.includes("Hydro") || tech.includes("H2O") ? "Hydrodermabrasion" :
      tech.includes("Cavitation") || tech.includes("Corps") ? "Corps" :
      tech.includes("RF") || tech.includes("Laser") || tech.includes("Frax") ? "RF & Laser" :
      tech.includes("Cryo") ? "Cryothérapie" : "Multifonction"
    const matchCat = filterCat === "all" || cat === filterCat
    return matchSearch && matchCat
  })

  const sel = machines.filter(m => selected.includes(m.id))

  return (
    <main className="min-h-screen bg-white font-sans flex flex-col">
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
            <Link href="/comparateur" className="text-sm font-medium text-[#6C47FF] border-b-2 border-[#6C47FF] pb-0.5">Comparateur</Link>
            <Link href="/contact" className="text-sm font-medium text-gray-600 hover:text-[#6C47FF] transition">Devis</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/guide" className="hidden md:inline-flex items-center gap-2 bg-[#6C47FF] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#5835ee] transition shadow-lg shadow-purple-200">
              Trouver ma machine <span>→</span>
            </Link>
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 rounded-lg hover:bg-gray-100">
              <div className="w-5 h-0.5 bg-gray-700 mb-1"></div><div className="w-5 h-0.5 bg-gray-700 mb-1"></div><div className="w-5 h-0.5 bg-gray-700"></div>
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 flex flex-col gap-3">
            <Link href="/guide" className="text-sm font-medium text-gray-700 py-2">Guide achat</Link>
            <Link href="/comparateur" className="text-sm font-medium text-[#6C47FF] py-2">Comparateur</Link>
            <Link href="/contact" className="text-sm font-medium text-gray-700 py-2">Devis</Link>
            <Link href="/guide" className="bg-[#6C47FF] text-white px-5 py-3 rounded-xl text-sm font-bold text-center">Trouver ma machine</Link>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="pt-28 pb-10 px-4 bg-gradient-to-br from-[#f5f3ff] via-white to-[#faf5ff]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-purple-50 border border-purple-200 text-[#6C47FF] text-xs font-bold px-4 py-2 rounded-full mb-6 uppercase tracking-widest">
            <span className="w-2 h-2 bg-[#6C47FF] rounded-full inline-block"></span>
            {machines.length} machines Zemits
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight mb-4">
            Comparez les machines<br />
            <span className="text-[#6C47FF]">cote à cote</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Sélectionnez jusqu&apos;à 4 machines et comparez-les sur tous les critères : prix, technologies, garantie, formation, note client.
          </p>
        </div>
      </section>

      <section className="flex-1 py-10 px-4">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <div className="w-10 h-10 border-4 border-[#6C47FF] border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-400">Chargement du catalogue...</p>
            </div>
          ) : (
            <>
              {/* FILTRES */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8 items-start sm:items-center justify-between">
                <div className="flex gap-2 flex-wrap">
                  {categories.slice(0, 6).map(cat => (
                    <button key={cat} onClick={() => setFilterCat(cat)}
                      className={`px-4 py-2 rounded-xl text-sm font-bold transition ${filterCat === cat ? "bg-[#6C47FF] text-white shadow-md shadow-purple-200" : "bg-gray-100 text-gray-600 hover:bg-purple-50 hover:text-[#6C47FF]"}`}>
                      {cat === "all" ? "Toutes" : cat}
                    </button>
                  ))}
                </div>
                <input
                  type="text" placeholder="🔍 Rechercher une machine..."
                  value={search} onChange={e => setSearch(e.target.value)}
                  className="px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-[#6C47FF] focus:outline-none text-sm w-full sm:w-64"
                />
              </div>

              {/* COMPTEUR SELECTION */}
              {selected.length > 0 && (
                <div className="bg-purple-50 border border-purple-200 rounded-2xl px-6 py-4 mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#6C47FF] rounded-lg flex items-center justify-center text-white font-black text-sm">{selected.length}</div>
                    <span className="font-bold text-gray-800">{selected.length} machine{selected.length > 1 ? "s" : ""} sélectionnée{selected.length > 1 ? "s" : ""}</span>
                    <span className="text-gray-400 text-sm">({4 - selected.length} restante{4 - selected.length > 1 ? "s" : ""})</span>
                  </div>
                  <div className="flex gap-2">
                    {selected.length >= 2 && (
                      <a href="#comparaison" className="bg-[#6C47FF] text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-[#5835ee] transition">
                        Voir comparatif ↓
                      </a>
                    )}
                    <button onClick={() => setSelected([])} className="text-sm text-gray-400 hover:text-red-400 transition px-3 py-2">
                      Réinitialiser
                    </button>
                  </div>
                </div>
              )}

              {/* GRILLE MACHINES */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-14">
                {filtered.map(m => {
                  const isSelected = selected.includes(m.id)
                  const isFull = selected.length >= 4 && !isSelected
                  return (
                    <div key={m.id}
                      onClick={() => !isFull && toggle(m.id)}
                      className={`relative rounded-2xl border-2 p-5 transition-all cursor-pointer ${
                        isSelected ? "border-[#6C47FF] bg-purple-50 shadow-lg shadow-purple-100" :
                        isFull ? "border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed" :
                        "border-gray-200 bg-white hover:border-purple-300 hover:shadow-md"
                      }`}>
                      {m.mis_en_avant && (
                        <div className="absolute -top-3 left-4">
                          <span className="bg-[#6C47FF] text-white text-xs font-black px-3 py-1 rounded-full shadow">⭐ Populaire</span>
                        </div>
                      )}
                      <div className="flex items-start justify-between mb-3 mt-1">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${isSelected ? "bg-[#6C47FF] border-[#6C47FF]" : "border-gray-300"}`}>
                          {isSelected && <span className="text-white text-xs font-black">✓</span>}
                        </div>
                        <div className="flex items-center gap-1">
                          <Stars note={m.note_globale} />
                          <span className="text-xs text-gray-400 ml-1">{m.note_globale}</span>
                        </div>
                      </div>
                      <h3 className="font-black text-gray-900 text-sm leading-tight mb-1">{m.nom}</h3>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {m.technologies?.slice(0, 3).map(t => (
                          <span key={t} className="text-xs bg-purple-50 text-[#6C47FF] px-2 py-0.5 rounded-full font-medium">{t}</span>
                        ))}
                        {(m.technologies?.length || 0) > 3 && (
                          <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">+{m.technologies.length - 3}</span>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-black text-[#6C47FF]">{Number(m.prix_eur).toLocaleString("fr-FR")} €</span>
                        <span className="text-xs text-gray-400">{m.nb_fonctions} fonct.</span>
                      </div>
                      <div className="flex gap-2 mt-2 text-xs text-gray-400">
                        {m.formation_incluse && <span className="bg-green-50 text-green-600 px-2 py-0.5 rounded-full">🎓 Formation</span>}
                        <span className="bg-gray-50 text-gray-500 px-2 py-0.5 rounded-full">🛡️ {m.garantie_annees} ans</span>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* TABLEAU COMPARATIF */}
              {sel.length >= 2 && (
                <div id="comparaison" className="scroll-mt-20">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-black text-gray-900 mb-1">Comparaison détaillée</h2>
                    <p className="text-gray-400 text-sm">La meilleure valeur est mise en évidence en violet</p>
                  </div>
                  <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-100">
                            <th className="text-left px-6 py-5 text-sm font-bold text-gray-400 w-44 bg-gray-50">Critère</th>
                            {sel.map((m, i) => (
                              <th key={m.id} className="px-6 py-5 text-center bg-white min-w-[180px]">
                                {m.mis_en_avant && <div className="text-xs text-[#6C47FF] font-black mb-1">⭐ Populaire</div>}
                                <div className="font-black text-gray-900 text-base">{m.nom}</div>
                                <div className="mt-1"><Stars note={m.note_globale} /></div>
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {CRITERES.map((crit, ri) => {
                            const vals = sel.map(m => (m as Record<string, unknown>)[crit.key] as number)
                            const bestIdx = crit.highlight(vals)
                            return (
                              <tr key={crit.key} className={ri % 2 === 0 ? "bg-white" : "bg-gray-50/40"}>
                                <td className="px-6 py-4 bg-gray-50">
                                  <div className="flex items-center gap-2">
                                    <span className="text-base">{crit.icon}</span>
                                    <span className="text-sm font-bold text-gray-600">{crit.label}</span>
                                  </div>
                                </td>
                                {sel.map((m, mi) => {
                                  const val = (m as Record<string, unknown>)[crit.key] as never
                                  const isBest = mi === bestIdx
                                  return (
                                    <td key={m.id} className={`px-6 py-4 text-center transition-colors ${isBest ? "bg-purple-50" : ""}`}>
                                      <span className={`text-sm font-bold ${isBest ? "text-[#6C47FF]" : "text-gray-700"}`}>
                                        {crit.format(val)}
                                      </span>
                                      {isBest && <div className="text-xs text-[#6C47FF] mt-0.5">✦ Meilleur</div>}
                                    </td>
                                  )
                                })}
                              </tr>
                            )
                          })}
                          {/* TECHNOLOGIES */}
                          <tr className="bg-white border-t border-gray-100">
                            <td className="px-6 py-5 bg-gray-50">
                              <div className="flex items-center gap-2">
                                <span className="text-base">🔬</span>
                                <span className="text-sm font-bold text-gray-600">Technologies</span>
                              </div>
                            </td>
                            {sel.map(m => (
                              <td key={m.id} className="px-6 py-5 text-center">
                                <div className="flex flex-wrap gap-1 justify-center">
                                  {m.technologies?.map(t => (
                                    <span key={t} className="text-xs bg-purple-50 text-[#6C47FF] px-2 py-0.5 rounded-full font-medium">{t}</span>
                                  ))}
                                </div>
                              </td>
                            ))}
                          </tr>
                          {/* CIBLE */}
                          <tr className="bg-gray-50/40">
                            <td className="px-6 py-4 bg-gray-50">
                              <div className="flex items-center gap-2">
                                <span className="text-base">🏥</span>
                                <span className="text-sm font-bold text-gray-600">Idéal pour</span>
                              </div>
                            </td>
                            {sel.map(m => (
                              <td key={m.id} className="px-6 py-4 text-center">
                                <span className="text-sm text-gray-600 font-medium">{m.cible || "–"}</span>
                              </td>
                            ))}
                          </tr>
                          {/* ROW CTA */}
                          <tr className="bg-gradient-to-r from-[#6C47FF] to-[#9B7DFF]">
                            <td className="px-6 py-6 text-white font-bold text-sm">Obtenir un devis</td>
                            {sel.map(m => (
                              <td key={m.id} className="px-6 py-6 text-center">
                                <Link href={`/contact?machine=${m.slug}`}
                                  className="inline-flex items-center gap-2 bg-white text-[#6C47FF] px-5 py-2.5 rounded-xl font-black text-sm hover:shadow-lg transition">
                                  Devis gratuit →
                                </Link>
                              </td>
                            ))}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {sel.length === 1 && (
                <div className="text-center py-10 text-gray-400">
                  <div className="text-4xl mb-3">👆</div>
                  <p className="font-medium">Sélectionnez au moins une autre machine pour lancer la comparaison</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white py-12 px-4 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#6C47FF] to-[#9B7DFF] rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-black">E</span>
            </div>
            <span className="text-lg font-black">Estheti<span className="text-[#9B7DFF]">Scan</span></span>
          </div>
          <div className="flex gap-8 text-sm text-gray-400">
            <Link href="/guide" className="hover:text-white transition">Guide achat</Link>
            <Link href="/comparateur" className="hover:text-white transition">Comparateur</Link>
            <Link href="/contact" className="hover:text-white transition">Devis gratuit</Link>
          </div>
          <p className="text-sm text-gray-500">© 2026 EsthetiScan — zemits.store</p>
        </div>
      </footer>
    </main>
  )
}

export default function ComparateurPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-4 border-[#6C47FF] border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <ComparateurInner />
    </Suspense>
  )
}
