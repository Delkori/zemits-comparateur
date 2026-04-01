"use client"
import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { supabase } from "@/lib/supabase"
import Link from "next/link"

type Machine = {
  id: number
  nom: string
  marque_id: number
  categorie_id: number
  technologies: string
  puissance_w: number
  dimensions: string
  poids_kg: number
  garantie_annees: number
  prix_eur: number
  est_zemits: boolean
  points_forts: string
  lien_achat: string
  certifications: string
  nb_fonctions: number
}

type Marque = { id: number; nom: string }
type Categorie = { id: number; nom: string }

const CATEGORIES = [
  "Hydrodermabrasion",
  "Cryothérapie", 
  "Cavitation",
  "Haute fréquence",
  "Multiplex / Combo",
]

function ComparateurContent() {
  const searchParams = useSearchParams()
  const [machines, setMachines] = useState<Machine[]>([])
  const [marques, setMarques] = useState<Record<number, string>>({})
  const [categories, setCategories] = useState<Record<number, string>>({})
  const [categorieActive, setCategorieActive] = useState<string>(
    searchParams.get("categorie") || "Hydrodermabrasion"
  )
  const [selection, setSelection] = useState<number[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadRefs() {
      const { data: m } = await supabase.from("marques").select("id, nom")
      const { data: c } = await supabase.from("categories").select("id, nom")
      if (m) setMarques(Object.fromEntries(m.map((x: Marque) => [x.id, x.nom])))
      if (c) setCategories(Object.fromEntries(c.map((x: Categorie) => [x.id, x.nom])))
    }
    loadRefs()
  }, [])

  useEffect(() => {
    async function fetchMachines() {
      setLoading(true)
      setSelection([])
      const { data: cats } = await supabase.from("categories").select("id").ilike("nom", `%${categorieActive}%`)
      if (!cats || cats.length === 0) { setMachines([]); setLoading(false); return }
      const catId = cats[0].id
      const { data } = await supabase
        .from("machines")
        .select("*")
        .eq("categorie_id", catId)
        .order("est_zemits", { ascending: false })
      if (data) setMachines(data)
      setLoading(false)
    }
    if (Object.keys(categories).length > 0 || true) fetchMachines()
  }, [categorieActive, categories])

  function toggleSelection(id: number) {
    setSelection((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < 4 ? [...prev, id] : prev
    )
  }

  const machinesComparees = selection.length > 0
    ? machines.filter((m) => selection.includes(m.id))
    : machines.slice(0, 4)

  const specs = [
    { label: "Technologies", key: "technologies" },
    { label: "Puissance", key: "puissance_w", format: (v: number) => v ? `${v}W` : "—" },
    { label: "Nb fonctions", key: "nb_fonctions", format: (v: number) => v ? `${v} fonctions` : "—" },
    { label: "Dimensions", key: "dimensions" },
    { label: "Poids", key: "poids_kg", format: (v: number) => v ? `${v} kg` : "—" },
    { label: "Garantie", key: "garantie_annees", format: (v: number) => v ? `${v} an${v > 1 ? "s" : ""}` : "—" },
    { label: "Certifications", key: "certifications" },
    { label: "Prix indicatif", key: "prix_eur", format: (v: number) => v ? `${v.toLocaleString("fr-FR")} €` : "Sur devis" },
    { label: "Points forts", key: "points_forts" },
  ]

  return (
    <main className="min-h-screen bg-[#f8f4ef]">
      <header className="bg-[#1a1a2e] text-white py-4 px-8 flex justify-between items-center shadow">
        <Link href="/" className="text-2xl font-bold text-[#C9A84C]">ZEMITS</Link>
        <Link href="/contact"
          className="bg-[#C9A84C] text-[#1a1a2e] px-4 py-2 rounded font-semibold text-sm hover:bg-yellow-400 transition">
          Demander un devis
        </Link>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-[#1a1a2e] mb-1">Comparateur de machines esthétiques</h1>
        <p className="text-gray-500 mb-8">Sélectionnez jusqu'à 4 machines pour comparer leurs caractéristiques</p>

        {/* FILTRES CATEGORIES */}
        <div className="flex gap-3 flex-wrap mb-10">
          {CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => setCategorieActive(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition border-2 ${
                categorieActive === cat
                  ? "bg-[#C9A84C] text-[#1a1a2e] border-[#C9A84C]"
                  : "bg-white text-gray-600 border-gray-200 hover:border-[#C9A84C]"
              }`}>
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-400 text-lg">Chargement des machines...</div>
        ) : machines.length === 0 ? (
          <div className="text-center py-20 text-gray-400">Aucune machine trouvée pour cette catégorie.</div>
        ) : (
          <>
            {/* CARDS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {machines.map((m) => (
                <div key={m.id} onClick={() => toggleSelection(m.id)}
                  className={`cursor-pointer rounded-2xl p-4 border-2 transition select-none ${
                    m.est_zemits ? "border-[#C9A84C] bg-yellow-50" : "border-gray-200 bg-white hover:border-gray-300"
                  } ${selection.includes(m.id) ? "ring-4 ring-[#C9A84C] ring-opacity-50" : ""}`}>
                  {m.est_zemits && (
                    <span className="text-xs bg-[#C9A84C] text-[#1a1a2e] px-2 py-0.5 rounded-full font-bold mb-2 inline-block">
                      ★ ZEMITS
                    </span>
                  )}
                  <h3 className="font-bold text-sm text-[#1a1a2e] leading-tight">{m.nom}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">{marques[m.marque_id] || ""}</p>
                  <p className="text-[#C9A84C] font-bold mt-2 text-sm">
                    {m.prix_eur ? `${m.prix_eur.toLocaleString("fr-FR")} €` : "Sur devis"}
                  </p>
                  <div className={`mt-3 w-5 h-5 rounded border-2 mx-auto flex items-center justify-center ${
                    selection.includes(m.id) ? "bg-[#C9A84C] border-[#C9A84C]" : "border-gray-300"
                  }`}>
                    {selection.includes(m.id) && <span className="text-white text-xs font-bold">✓</span>}
                  </div>
                </div>
              ))}
            </div>

            {/* SELECTION INFO */}
            {selection.length > 0 && (
              <div className="flex gap-2 mb-4 flex-wrap items-center">
                <span className="text-sm text-gray-500">Comparaison :</span>
                {machines.filter(m => selection.includes(m.id)).map(m => (
                  <span key={m.id} className="bg-[#1a1a2e] text-white text-xs px-3 py-1 rounded-full flex items-center gap-2">
                    {m.nom}
                    <button onClick={(e) => { e.stopPropagation(); toggleSelection(m.id) }} className="hover:text-red-400">✕</button>
                  </span>
                ))}
                <button onClick={() => setSelection([])} className="text-xs text-red-400 underline ml-2">Tout effacer</button>
              </div>
            )}

            {/* TABLEAU COMPARATIF */}
            <div className="overflow-x-auto rounded-2xl shadow-xl">
              <table className="w-full border-collapse bg-white">
                <thead>
                  <tr>
                    <th className="bg-[#1a1a2e] text-white p-4 text-left text-sm w-44 sticky left-0">Critère</th>
                    {machinesComparees.map((m) => (
                      <th key={m.id} className={`p-4 text-center min-w-[180px] ${
                        m.est_zemits ? "bg-[#C9A84C] text-[#1a1a2e]" : "bg-gray-100 text-gray-700"
                      }`}>
                        {m.est_zemits && <div className="text-xs font-black mb-1 uppercase tracking-wider">★ Recommandé</div>}
                        <div className="font-bold text-sm">{m.nom}</div>
                        <div className="text-xs opacity-60 mt-0.5">{marques[m.marque_id] || ""}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {specs.map((spec, i) => (
                    <tr key={spec.key} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="p-4 font-semibold text-xs text-gray-500 uppercase tracking-wide border-r border-gray-100 sticky left-0 bg-inherit">
                        {spec.label}
                      </td>
                      {machinesComparees.map((m) => {
                        const raw = (m as Record<string, unknown>)[spec.key]
                        const val = spec.format ? spec.format(raw as number) : (raw as string) || "—"
                        return (
                          <td key={m.id} className={`p-4 text-center text-sm border-r border-gray-50 ${
                            m.est_zemits ? "font-semibold text-[#1a1a2e]" : "text-gray-600"
                          }`}>
                            {val}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                  <tr className="bg-[#1a1a2e]">
                    <td className="p-4 text-white font-bold text-sm sticky left-0 bg-[#1a1a2e]">Action</td>
                    {machinesComparees.map((m) => (
                      <td key={m.id} className="p-4 text-center">
                        {m.est_zemits ? (
                          <Link href="/contact"
                            className="bg-[#C9A84C] text-[#1a1a2e] px-4 py-2 rounded-lg font-bold text-sm hover:bg-yellow-400 transition inline-block">
                            Obtenir un devis →
                          </Link>
                        ) : m.lien_achat ? (
                          <a href={m.lien_achat} target="_blank" rel="noopener noreferrer"
                            className="text-gray-400 text-xs underline hover:text-white transition">
                            Voir produit ↗
                          </a>
                        ) : (
                          <span className="text-gray-600 text-xs">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </main>
  )
}

export default function Comparateur() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Chargement...</div>}>
      <ComparateurContent />
    </Suspense>
  )
}
