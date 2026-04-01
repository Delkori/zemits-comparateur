'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { Machine } from '@/lib/supabase'
import Link from 'next/link'
import { CheckCircle, XCircle, Star, ExternalLink, ArrowLeft } from 'lucide-react'

const CATEGORIES = [
  { slug: 'all', label: 'Toutes' },
  { slug: 'hydrodermabrasion', label: 'Hydrodermabrasion' },
  { slug: 'cryotherapie', label: 'Cryothérapie' },
  { slug: 'radiofrequence', label: 'Radiofréquence' },
  { slug: 'cavitation', label: 'Cavitation & Corps' },
  { slug: 'haute-frequence', label: 'Haute Fréquence' },
  { slug: 'oxygene', label: 'Oxygène' },
]

export default function Comparateur() {
  const [machines, setMachines] = useState<Machine[]>([])
  const [selected, setSelected] = useState<number[]>([])
  const [categorie, setCategorie] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchMachines() {
      let query = supabase.from('machines').select('*').order('est_zemits', { ascending: false })
      if (categorie !== 'all') query = query.eq('categorie', categorie)
      const { data } = await query
      setMachines(data || [])
      setLoading(false)
    }
    fetchMachines()
  }, [categorie])

  const toggleSelect = (id: number) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : prev.length < 4 ? [...prev, id] : prev
    )
  }

  const selectedMachines = machines.filter(m => selected.includes(m.id))

  return (
    <main className="min-h-screen bg-[#f8f6f0]">
      {/* Header */}
      <header className="bg-[#1a1a2e] text-white py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-gray-400 hover:text-white flex items-center gap-1 text-sm">
            <ArrowLeft size={16} /> Accueil
          </Link>
          <span className="text-xl font-bold text-[#C9A84C]">ZEMITS</span>
        </div>
        <a href="https://zemits.store" target="_blank" rel="noopener noreferrer"
          className="bg-[#C9A84C] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#b8943d] transition">
          Catalogue Zemits →
        </a>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#1a1a2e] mb-2">Comparateur de machines</h1>
        <p className="text-gray-500 mb-6">Sélectionnez jusqu'à 4 machines pour les comparer côte à côte</p>

        {/* Filtres catégorie */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map(cat => (
            <button key={cat.slug} onClick={() => { setCategorie(cat.slug); setSelected([]) }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                categorie === cat.slug
                  ? 'bg-[#C9A84C] text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-[#C9A84C]'
              }`}>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Tableau comparatif */}
        {selectedMachines.length >= 2 && (
          <div className="mb-10 overflow-x-auto">
            <h2 className="text-xl font-bold text-[#1a1a2e] mb-4">Tableau comparatif</h2>
            <table className="w-full bg-white rounded-xl shadow-md overflow-hidden">
              <thead>
                <tr className="bg-[#1a1a2e] text-white">
                  <th className="text-left p-4 w-48">Critère</th>
                  {selectedMachines.map(m => (
                    <th key={m.id} className={`p-4 text-center ${m.est_zemits ? 'bg-[#C9A84C]!' : ''}`}>
                      <div className={`rounded-lg p-2 ${m.est_zemits ? 'bg-[#C9A84C]/20 border border-[#C9A84C]!' : ''}`}>
                        {m.est_zemits && <span className="text-[#C9A84C] text-xs font-bold block">⭐ ZEMITS</span>}
                        <span className="font-bold">{m.nom}</span>
                        <span className="block text-xs text-gray-300">{m.marque}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { label: 'Prix indicatif', key: 'prix', format: (v: any) => v ? `${v.toLocaleString()}€` : 'Sur devis' },
                  { label: 'Technologie', key: 'technologie', format: (v: any) => v },
                  { label: 'Puissance (W)', key: 'puissance_w', format: (v: any) => v ? `${v}W` : '-' },
                  { label: 'Nombre de têtes', key: 'nb_tetes', format: (v: any) => v || '-' },
                  { label: 'Certifications', key: 'certifications', format: (v: any) => v },
                  { label: 'Garantie', key: 'garantie', format: (v: any) => v },
                  { label: 'Formation incluse', key: 'formation_incluse', format: (v: any) => v ? '✅' : '❌' },
                  { label: 'SAV France', key: 'sav_france', format: (v: any) => v ? '✅' : '❌' },
                  { label: 'Note', key: 'note', format: (v: any) => '⭐'.repeat(Math.round(v)) + ` (${v}/5)` },
                ].map((row, i) => (
                  <tr key={row.key} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="p-4 font-medium text-gray-700 text-sm">{row.label}</td>
                    {selectedMachines.map(m => (
                      <td key={m.id} className={`p-4 text-center text-sm ${m.est_zemits ? 'font-semibold text-[#1a1a2e]' : 'text-gray-600'}`}>
                        {row.format((m as any)[row.key])}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="bg-[#C9A84C]/5 border-t-2 border-[#C9A84C]">
                  <td className="p-4 font-bold text-[#1a1a2e]">Action</td>
                  {selectedMachines.map(m => (
                    <td key={m.id} className="p-4 text-center">
                      {m.est_zemits ? (
                        <a href={m.url_produit} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 bg-[#C9A84C] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#b8943d] transition">
                          Commander <ExternalLink size={14} />
                        </a>
                      ) : (
                        <span className="text-xs text-gray-400">Concurrent</span>
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Grille machines */}
        {loading ? (
          <div className="text-center py-20 text-gray-400">Chargement des machines...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {machines.map(machine => {
              const isSelected = selected.includes(machine.id)
              return (
                <div key={machine.id}
                  className={`bg-white rounded-xl shadow-sm border-2 transition cursor-pointer card-hover overflow-hidden ${
                    isSelected ? 'border-[#C9A84C] shadow-[#C9A84C]/20 shadow-lg' :
                    machine.est_zemits ? 'border-[#C9A84C]/30' : 'border-gray-100'
                  }`}
                  onClick={() => toggleSelect(machine.id)}>
                  {machine.est_zemits && (
                    <div className="bg-[#C9A84C] text-white text-xs font-bold px-3 py-1 text-center">
                      ⭐ ZEMITS — Notre sélection
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wide">{machine.marque}</p>
                        <h3 className="font-bold text-[#1a1a2e] text-sm leading-tight">{machine.nom}</h3>
                      </div>
                      {isSelected && <CheckCircle className="text-[#C9A84C] shrink-0" size={20} />}
                    </div>
                    <p className="text-xs text-gray-500 mb-3 line-clamp-2">{machine.description}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded">{machine.technologie}</span>
                      <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded">{machine.certifications}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-[#C9A84C]">
                        {machine.prix ? `${machine.prix.toLocaleString()}€` : 'Sur devis'}
                      </span>
                      <span className="text-xs text-gray-400">{'⭐'.repeat(Math.round(machine.note))}</span>
                    </div>
                    {machine.est_zemits && (
                      <a href={machine.url_produit} target="_blank" rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        className="mt-3 w-full block text-center bg-[#1a1a2e] text-white text-xs py-2 rounded-lg hover:bg-[#C9A84C] transition">
                        Voir sur zemits.store →
                      </a>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {selected.length > 0 && selected.length < 2 && (
          <div className="fixed bottom-6 right-6 bg-[#1a1a2e] text-white px-6 py-3 rounded-xl shadow-xl text-sm">
            Sélectionnez au moins 2 machines pour comparer ({selected.length}/4)
          </div>
        )}
      </div>
    </main>
  )
}
