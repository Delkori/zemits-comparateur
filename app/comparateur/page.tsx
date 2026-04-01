"use client"
import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { createClient } from "@supabase/supabase-js"
import Link from "next/link"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
const supabase = createClient(supabaseUrl, supabaseKey)

const CATEGORIES = ["Hydrodermabrasion", "Cryotherapie", "Cavitation", "Haute frequence", "Multiplex"]
const CATEGORIES_LABELS = {
  "Hydrodermabrasion": "Hydrodermabrasion",
  "Cryotherapie": "Cryotherapie",
  "Cavitation": "Cavitation",
  "Haute frequence": "Haute Frequence",
  "Multiplex": "Multiplex / Combo"
}

function ComparateurContent() {
  const searchParams = useSearchParams()
  const [machines, setMachines] = useState([])
  const [marques, setMarques] = useState({})
  const [categorieActive, setCategorieActive] = useState(searchParams.get("categorie") || "Hydrodermabrasion")
  const [selection, setSelection] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(function() {
    async function loadMarques() {
      const res = await supabase.from("marques").select("id, nom")
      if (res.data) {
        const map = {}
        res.data.forEach(function(m) { map[m.id] = m.nom })
        setMarques(map)
      }
    }
    loadMarques()
  }, [])

  useEffect(function() {
    async function fetchMachines() {
      setLoading(true)
      setSelection([])
      const catRes = await supabase.from("categories").select("id, nom")
      if (!catRes.data) { setMachines([]); setLoading(false); return }
      const cat = catRes.data.find(function(c) { return c.nom.toLowerCase().includes(categorieActive.toLowerCase()) })
      if (!cat) { setMachines([]); setLoading(false); return }
      const res = await supabase.from("machines").select("*").eq("categorie_id", cat.id).order("est_zemits", { ascending: false })
      if (res.data) setMachines(res.data)
      setLoading(false)
    }
    fetchMachines()
  }, [categorieActive])

  function toggleSelection(id) {
    setSelection(function(prev) {
      if (prev.includes(id)) return prev.filter(function(x) { return x !== id })
      if (prev.length >= 4) return prev
      return [...prev, id]
    })
  }

  const machinesComparees = selection.length > 0
    ? machines.filter(function(m) { return selection.includes(m.id) })
    : machines.slice(0, 4)

  const specs = [
    { label: "Technologies", key: "technologies" },
    { label: "Puissance", key: "puissance_w", fmt: function(v) { return v ? v + "W" : "-" } },
    { label: "Nb fonctions", key: "nb_fonctions", fmt: function(v) { return v ? v + " fonctions" : "-" } },
    { label: "Dimensions", key: "dimensions" },
    { label: "Poids", key: "poids_kg", fmt: function(v) { return v ? v + " kg" : "-" } },
    { label: "Garantie", key: "garantie_annees", fmt: function(v) { return v ? v + " an(s)" : "-" } },
    { label: "Certifications", key: "certifications" },
    { label: "Prix indicatif", key: "prix_eur", fmt: function(v) { return v ? v.toLocaleString("fr-FR") + " EUR" : "Sur devis" } },
    { label: "Points forts", key: "points_forts" },
  ]

  return (
    <main className="min-h-screen bg-[#f8f4ef]">
      <header className="bg-[#1a1a2e] text-white py-4 px-8 flex justify-between items-center shadow">
        <Link href="/" className="text-2xl font-bold text-[#C9A84C]">ZEMITS</Link>
        <Link href="/contact" className="bg-[#C9A84C] text-[#1a1a2e] px-4 py-2 rounded font-semibold text-sm hover:bg-yellow-400 transition">
          Demander un devis
        </Link>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-[#1a1a2e] mb-1">Comparateur de machines esthetiques</h1>
        <p className="text-gray-500 mb-8">Selectionnez jusqu-a 4 machines pour comparer leurs caracteristiques</p>

        <div className="flex gap-3 flex-wrap mb-10">
          {CATEGORIES.map(function(cat) {
            return (
              <button key={cat} onClick={function() { setCategorieActive(cat) }}
                className={"px-5 py-2 rounded-full text-sm font-semibold transition border-2 " + (categorieActive === cat ? "bg-[#C9A84C] text-[#1a1a2e] border-[#C9A84C]" : "bg-white text-gray-600 border-gray-200 hover:border-[#C9A84C]")}>
                {CATEGORIES_LABELS[cat]}
              </button>
            )
          })}
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-400 text-lg">Chargement des machines...</div>
        ) : machines.length === 0 ? (
          <div className="text-center py-20 text-gray-400">Aucune machine trouvee pour cette categorie.</div>
        ) : (
          <div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {machines.map(function(m) {
                return (
                  <div key={m.id} onClick={function() { toggleSelection(m.id) }}
                    className={"cursor-pointer rounded-2xl p-4 border-2 transition select-none " + (m.est_zemits ? "border-[#C9A84C] bg-yellow-50 " : "border-gray-200 bg-white ") + (selection.includes(m.id) ? "ring-4 ring-[#C9A84C] ring-opacity-50" : "")}>
                    {m.est_zemits && <span className="text-xs bg-[#C9A84C] text-[#1a1a2e] px-2 py-0.5 rounded-full font-bold mb-2 inline-block">ZEMITS</span>}
                    <h3 className="font-bold text-sm text-[#1a1a2e] leading-tight">{m.nom}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">{marques[m.marque_id] || ""}</p>
                    <p className="text-[#C9A84C] font-bold mt-2 text-sm">{m.prix_eur ? m.prix_eur.toLocaleString("fr-FR") + " EUR" : "Sur devis"}</p>
                    <div className={"mt-3 w-5 h-5 rounded border-2 mx-auto flex items-center justify-center " + (selection.includes(m.id) ? "bg-[#C9A84C] border-[#C9A84C]" : "border-gray-300")}>
                      {selection.includes(m.id) && <span className="text-white text-xs font-bold">ok</span>}
                    </div>
                  </div>
                )
              })}
            </div>

            {selection.length > 0 && (
              <div className="flex gap-2 mb-4 flex-wrap items-center">
                <span className="text-sm text-gray-500">Comparaison :</span>
                {machines.filter(function(m) { return selection.includes(m.id) }).map(function(m) {
                  return (
                    <span key={m.id} className="bg-[#1a1a2e] text-white text-xs px-3 py-1 rounded-full flex items-center gap-2">
                      {m.nom}
                      <button onClick={function(e) { e.stopPropagation(); toggleSelection(m.id) }} className="hover:text-red-400">x</button>
                    </span>
                  )
                })}
                <button onClick={function() { setSelection([]) }} className="text-xs text-red-400 underline ml-2">Tout effacer</button>
              </div>
            )}

            <div className="overflow-x-auto rounded-2xl shadow-xl">
              <table className="w-full border-collapse bg-white">
                <thead>
                  <tr>
                    <th className="bg-[#1a1a2e] text-white p-4 text-left text-sm w-44">Critere</th>
                    {machinesComparees.map(function(m) {
                      return (
                        <th key={m.id} className={"p-4 text-center min-w-44 " + (m.est_zemits ? "bg-[#C9A84C] text-[#1a1a2e]" : "bg-gray-100 text-gray-700")}>
                          {m.est_zemits && <div className="text-xs font-black mb-1 uppercase">Recommande</div>}
                          <div className="font-bold text-sm">{m.nom}</div>
                          <div className="text-xs opacity-60 mt-0.5">{marques[m.marque_id] || ""}</div>
                        </th>
                      )
                    })}
                  </tr>
                </thead>
                <tbody>
                  {specs.map(function(spec, i) {
                    return (
                      <tr key={spec.key} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                        <td className="p-4 font-semibold text-xs text-gray-500 uppercase border-r border-gray-100">{spec.label}</td>
                        {machinesComparees.map(function(m) {
                          const raw = m[spec.key]
                          const val = spec.fmt ? spec.fmt(raw) : (raw || "-")
                          return (
                            <td key={m.id} className={"p-4 text-center text-sm border-r border-gray-50 " + (m.est_zemits ? "font-semibold text-[#1a1a2e]" : "text-gray-600")}>
                              {val}
                            </td>
                          )
                        })}
                      </tr>
                    )
                  })}
                  <tr className="bg-[#1a1a2e]">
                    <td className="p-4 text-white font-bold text-sm">Action</td>
                    {machinesComparees.map(function(m) {
                      return (
                        <td key={m.id} className="p-4 text-center">
                          {m.est_zemits ? (
                            <Link href="/contact" className="bg-[#C9A84C] text-[#1a1a2e] px-4 py-2 rounded-lg font-bold text-sm hover:bg-yellow-400 transition inline-block">
                              Obtenir un devis
                            </Link>
                          ) : m.lien_achat ? (
                            <a href={m.lien_achat} target="_blank" rel="noopener noreferrer" className="text-gray-400 text-xs underline hover:text-white">Voir produit</a>
                          ) : <span className="text-gray-600 text-xs">-</span>}
                        </td>
                      )
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

export default function Comparateur() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-400">Chargement...</div>}>
      <ComparateurContent />
    </Suspense>
  )
}
