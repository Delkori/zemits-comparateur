"use client"
import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { createClient } from "@supabase/supabase-js"
import Link from "next/link"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
const supabase = createClient(supabaseUrl, supabaseKey)

type Machine = {
  id: number
  nom: string
  technologie: string
  prix_ht: number
  garantie_annees: number
  poids_kg: number
  puissance_w: number
  certifications: string
  support_fr: boolean
  description?: string
  slug?: string
}

function ComparateurInner() {
  const [machines, setMachines] = useState<Machine[]>([])
  const [selected, setSelected] = useState<number[]>([])
  const [loading, setLoading] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const params = useSearchParams()

  useEffect(() => {
    supabase.from("machines").select("*").then(({ data }) => {
      if (data) setMachines(data as Machine[])
      setLoading(false)
    })
    const ids = params.get("ids")
    if (ids) setSelected(ids.split(",").map(Number))
  }, [params])

  const toggle = (id: number) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : prev.length < 4 ? [...prev, id] : prev
    )
  }

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
              <div className="w-5 h-0.5 bg-gray-700 mb-1"></div>
              <div className="w-5 h-0.5 bg-gray-700 mb-1"></div>
              <div className="w-5 h-0.5 bg-gray-700"></div>
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
            Comparateur expert
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight mb-4">
            Comparez les machines<br />
            <span className="text-[#6C47FF]">cote a cote</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Selectionnez jusqu'a 4 machines et comparez-les sur tous les criteres techniques.
          </p>
        </div>
      </section>

      {/* CONTENU */}
      <section className="flex-1 py-10 px-4">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-24 gap-3">
              <div className="w-6 h-6 border-3 border-[#6C47FF] border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-500">Chargement des machines...</span>
            </div>
          ) : (
            <>
              {/* SELECTION */}
              <div className="mb-10">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Choisissez vos machines{" "}
                  <span className="text-sm font-normal text-gray-400">({selected.length}/4 selectionnees)</span>
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {machines.map(m => (
                    <button
                      key={m.id}
                      onClick={() => toggle(m.id)}
                      className={`p-4 rounded-2xl border-2 text-left transition-all ${
                        selected.includes(m.id)
                          ? "border-[#6C47FF] bg-purple-50 shadow-lg shadow-purple-100"
                          : "border-gray-200 bg-white hover:border-purple-300"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          selected.includes(m.id) ? "bg-[#6C47FF] border-[#6C47FF]" : "border-gray-300"
                        }`}>
                          {selected.includes(m.id) && <span className="text-white text-xs">✓</span>}
                        </div>
                        <span className="text-xs font-bold text-[#6C47FF] bg-purple-50 px-2 py-0.5 rounded-full">{m.technologie}</span>
                      </div>
                      <p className="font-bold text-gray-900 text-sm mt-2">{m.nom}</p>
                      <p className="text-[#6C47FF] font-black text-base mt-1">{m.prix_ht?.toLocaleString()} €</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* TABLEAU COMPARATIF */}
              {sel.length > 0 && (
                <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
                  <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-white">
                    <h2 className="text-xl font-black text-gray-900">
                      Comparaison detaillee <span className="text-[#6C47FF]">({sel.length} machines)</span>
                    </h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="text-left px-6 py-4 text-sm font-bold text-gray-500 w-40">Critere</th>
                          {sel.map(m => (
                            <th key={m.id} className="px-6 py-4 text-center">
                              <div className="text-sm font-black text-gray-900">{m.nom}</div>
                              <div className="text-xs font-bold text-[#6C47FF] mt-0.5">{m.technologie}</div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { label: "Prix HT", key: "prix_ht", format: (v: number) => `${v?.toLocaleString()} €` },
                          { label: "Garantie", key: "garantie_annees", format: (v: number) => `${v} ans` },
                          { label: "Puissance", key: "puissance_w", format: (v: number) => `${v} W` },
                          { label: "Poids", key: "poids_kg", format: (v: number) => `${v} kg` },
                          { label: "Certifications", key: "certifications", format: (v: string) => v || "–" },
                          { label: "Support FR", key: "support_fr", format: (v: boolean) => v ? "✅ Oui" : "❌ Non" },
                        ].map((row, i) => (
                          <tr key={row.key} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                            <td className="px-6 py-4 text-sm font-bold text-gray-600">{row.label}</td>
                            {sel.map(m => (
                              <td key={m.id} className="px-6 py-4 text-center text-sm text-gray-800 font-medium">
                                {row.format((m as Record<string, unknown>)[row.key] as never)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-[#6C47FF] to-[#9B7DFF] text-center">
                    <p className="text-white font-bold mb-3">Besoin d'un conseil personnalise ?</p>
                    <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-[#6C47FF] px-8 py-3 rounded-xl font-black text-sm hover:shadow-lg transition">
                      Demander un devis gratuit →
                    </Link>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white py-12 px-4 mt-10">
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
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="w-8 h-8 border-2 border-[#6C47FF] border-t-transparent rounded-full animate-spin"></div></div>}>
      <ComparateurInner />
    </Suspense>
  )
}
