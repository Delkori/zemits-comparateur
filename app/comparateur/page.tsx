'use client'

import { useState } from 'react'
import Link from 'next/link'

type Machine = {
  id: string
  nom: string
  marque: string
  categorie: string
  technologie: string
  prixMin: number
  prixMax: number
  nbTechno: number
  formation: boolean
  sav: string
  garantie: string
  fabrication: string
  scoreROI: number
  badge?: string
}

const machines: Machine[] = [
  // === ZEMITS ===
  {
    id: 'zemits-dermapure',
    nom: 'DermaPure Pro',
    marque: 'Zemits',
    categorie: 'Visage',
    technologie: 'Hydradermabrasion + LED + RF',
    prixMin: 3900,
    prixMax: 4900,
    nbTechno: 3,
    formation: true,
    sav: '48h',
    garantie: '2 ans',
    fabrication: 'Ukrainien / EU',
    scoreROI: 92,
    badge: 'Meilleur rapport qualité/prix',
  },
  {
    id: 'zemits-verstand',
    nom: 'Verstand Ultra',
    marque: 'Zemits',
    categorie: 'Corps',
    technologie: 'Cavitation + RF + Vide',
    prixMin: 4500,
    prixMax: 5500,
    nbTechno: 3,
    formation: true,
    sav: '48h',
    garantie: '2 ans',
    fabrication: 'Ukrainien / EU',
    scoreROI: 89,
  },
  {
    id: 'zemits-cryo',
    nom: 'CryoSlim 360',
    marque: 'Zemits',
    categorie: 'Minceur',
    technologie: 'Cryolipolyse',
    prixMin: 6900,
    prixMax: 8500,
    nbTechno: 1,
    formation: true,
    sav: '48h',
    garantie: '2 ans',
    fabrication: 'Ukrainien / EU',
    scoreROI: 87,
  },
  // === CESAM ESTHETIC ===
  {
    id: 'cesam-jetpeel',
    nom: 'JetPeel Pro',
    marque: 'Cesam Esthetic',
    categorie: 'Visage',
    technologie: 'JetPeel + LED + Infusion actifs',
    prixMin: 6500,
    prixMax: 9000,
    nbTechno: 3,
    formation: true,
    sav: '72h',
    garantie: '1 an',
    fabrication: 'Israélien',
    scoreROI: 80,
  },
  {
    id: 'cesam-slim',
    nom: 'Twin Slim',
    marque: 'Cesam Esthetic',
    categorie: 'Corps',
    technologie: 'Cavitation + Radiofréquence',
    prixMin: 5800,
    prixMax: 7500,
    nbTechno: 2,
    formation: true,
    sav: '72h',
    garantie: '1 an',
    fabrication: 'Israélien',
    scoreROI: 75,
  },
  // === LPG SYSTEMS ===
  {
    id: 'lpg-cellu',
    nom: 'Cellu M6 Alliance',
    marque: 'LPG Systems',
    categorie: 'Minceur',
    technologie: 'Endermologie (mécanostimulation)',
    prixMin: 14000,
    prixMax: 20000,
    nbTechno: 1,
    formation: true,
    sav: '48h',
    garantie: '2 ans',
    fabrication: 'Français',
    scoreROI: 78,
    badge: 'Référence minceur',
  },
  {
    id: 'lpg-lift6',
    nom: 'Lift 6',
    marque: 'LPG Systems',
    categorie: 'Visage',
    technologie: 'Endermologie visage',
    prixMin: 8000,
    prixMax: 12000,
    nbTechno: 1,
    formation: true,
    sav: '48h',
    garantie: '2 ans',
    fabrication: 'Français',
    scoreROI: 72,
  },
  // === EUROP'ESTHETIC ===
  {
    id: 'europ-hifu',
    nom: 'HIFU Pro 7D',
    marque: "Europ'Esthetic",
    categorie: 'Visage',
    technologie: 'HIFU 7D multi-profondeurs',
    prixMin: 4200,
    prixMax: 6000,
    nbTechno: 1,
    formation: false,
    sav: '5 jours',
    garantie: '1 an',
    fabrication: 'Asiatique',
    scoreROI: 74,
  },
  {
    id: 'europ-cryo',
    nom: 'Cryo Elite',
    marque: "Europ'Esthetic",
    categorie: 'Minceur',
    technologie: 'Cryolipolyse double applicateurs',
    prixMin: 7500,
    prixMax: 10000,
    nbTechno: 1,
    formation: false,
    sav: '5 jours',
    garantie: '1 an',
    fabrication: 'Asiatique',
    scoreROI: 71,
  },
  // === ISI SPA ===
  {
    id: 'isi-multi',
    nom: 'ISI Multi-Tech 6 en 1',
    marque: 'ISI Spa',
    categorie: 'Polyvalent',
    technologie: 'RF + Cavitation + LED + Vide + EMS + Infrarouge',
    prixMin: 5500,
    prixMax: 7000,
    nbTechno: 6,
    formation: true,
    sav: '72h',
    garantie: '2 ans',
    fabrication: 'Français',
    scoreROI: 83,
  },
]

const categories = ['Toutes', 'Visage', 'Corps', 'Minceur', 'Polyvalent']
const marques = ['Toutes', 'Zemits', 'Cesam Esthetic', 'LPG Systems', "Europ'Esthetic", 'ISI Spa']

export default function Comparateur() {
  const [categorieActive, setCategorieActive] = useState('Toutes')
  const [marqueActive, setMarqueActive] = useState('Toutes')
  const [sortBy, setSortBy] = useState<'prix' | 'roi' | 'techno'>('roi')

  const filtered = machines
    .filter(m => categorieActive === 'Toutes' || m.categorie === categorieActive)
    .filter(m => marqueActive === 'Toutes' || m.marque === marqueActive)
    .sort((a, b) => {
      if (sortBy === 'prix') return a.prixMin - b.prixMin
      if (sortBy === 'roi') return b.scoreROI - a.scoreROI
      if (sortBy === 'techno') return b.nbTechno - a.nbTechno
      return 0
    })

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
            <Link href="/comparateur" className="text-sm font-medium text-[#6C47FF] font-bold">Comparateur</Link>
            <Link href="/contact" className="text-sm font-medium text-gray-600 hover:text-[#6C47FF] transition">Devis</Link>
          </div>
          <Link href="/guide" className="hidden md:inline-flex items-center gap-2 bg-[#6C47FF] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#5835ee] transition shadow-lg shadow-purple-200">
            Trouver ma machine <span>→</span>
          </Link>
        </div>
      </nav>

      <div className="pt-24 pb-20 max-w-7xl mx-auto px-4">

        {/* HEADER */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-purple-50 border border-purple-200 text-[#6C47FF] text-xs font-bold px-4 py-2 rounded-full mb-6 uppercase tracking-widest">
            ⚖️ Comparateur objectif
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
            Comparez les machines <span className="text-[#6C47FF]">esthétiques pros</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            {machines.length} machines de {marques.length - 1} marques. Filtrez par catégorie, marque ou triez par prix / ROI.
          </p>
        </div>

        {/* FILTRES */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8 flex flex-wrap gap-6 items-end">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Catégorie</label>
            <div className="flex gap-2 flex-wrap">
              {categories.map(c => (
                <button
                  key={c}
                  onClick={() => setCategorieActive(c)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
                    categorieActive === c
                      ? 'bg-[#6C47FF] text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Marque</label>
            <div className="flex gap-2 flex-wrap">
              {marques.map(m => (
                <button
                  key={m}
                  onClick={() => setMarqueActive(m)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
                    marqueActive === m
                      ? 'bg-gray-900 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Trier par</label>
            <div className="flex gap-2">
              {[
                { key: 'roi', label: '⭐ Score ROI' },
                { key: 'prix', label: '💶 Prix croissant' },
                { key: 'techno', label: '⚡ Nb techno' },
              ].map(s => (
                <button
                  key={s.key}
                  onClick={() => setSortBy(s.key as 'prix' | 'roi' | 'techno')}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
                    sortBy === s.key
                      ? 'bg-[#6C47FF] text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* TABLEAU */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wide">Machine</th>
                  <th className="text-left px-4 py-4 text-xs font-bold text-gray-500 uppercase tracking-wide">Marque</th>
                  <th className="text-left px-4 py-4 text-xs font-bold text-gray-500 uppercase tracking-wide">Technologie</th>
                  <th className="text-center px-4 py-4 text-xs font-bold text-gray-500 uppercase tracking-wide">Prix</th>
                  <th className="text-center px-4 py-4 text-xs font-bold text-gray-500 uppercase tracking-wide">Nb techno</th>
                  <th className="text-center px-4 py-4 text-xs font-bold text-gray-500 uppercase tracking-wide">Formation</th>
                  <th className="text-center px-4 py-4 text-xs font-bold text-gray-500 uppercase tracking-wide">SAV</th>
                  <th className="text-center px-4 py-4 text-xs font-bold text-gray-500 uppercase tracking-wide">Garantie</th>
                  <th className="text-center px-4 py-4 text-xs font-bold text-gray-500 uppercase tracking-wide">Score ROI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((m) => (
                  <tr key={m.id} className={`hover:bg-purple-50/30 transition ${m.marque === 'Zemits' ? 'bg-purple-50/20' : ''}`}>
                    <td className="px-6 py-5">
                      <div className="font-bold text-gray-900">{m.nom}</div>
                      {m.badge && (
                        <span className="inline-block mt-1 text-xs bg-[#6C47FF] text-white px-2 py-0.5 rounded-full font-semibold">
                          {m.badge}
                        </span>
                      )}
                      <div className="text-xs text-gray-400 mt-0.5">{m.fabrication}</div>
                    </td>
                    <td className="px-4 py-5">
                      <span className={`text-sm font-semibold ${m.marque === 'Zemits' ? 'text-[#6C47FF]' : 'text-gray-700'}`}>
                        {m.marque}
                      </span>
                    </td>
                    <td className="px-4 py-5 text-gray-600 max-w-[200px]">{m.technologie}</td>
                    <td className="px-4 py-5 text-center">
                      <div className="font-bold text-gray-900">{m.prixMin.toLocaleString('fr-FR')} €</div>
                      <div className="text-xs text-gray-400">à {m.prixMax.toLocaleString('fr-FR')} €</div>
                    </td>
                    <td className="px-4 py-5 text-center">
                      <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-black ${
                        m.nbTechno >= 3 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {m.nbTechno}
                      </span>
                    </td>
                    <td className="px-4 py-5 text-center">
                      {m.formation
                        ? <span className="text-green-600 font-bold">✓ Incluse</span>
                        : <span className="text-gray-400">En option</span>
                      }
                    </td>
                    <td className="px-4 py-5 text-center">
                      <span className={`font-semibold text-xs ${m.sav === '48h' ? 'text-green-600' : 'text-gray-500'}`}>
                        {m.sav}
                      </span>
                    </td>
                    <td className="px-4 py-5 text-center">
                      <span className={`font-semibold text-xs ${m.garantie === '2 ans' ? 'text-green-600' : 'text-gray-500'}`}>
                        {m.garantie}
                      </span>
                    </td>
                    <td className="px-4 py-5 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <span className={`text-lg font-black ${m.scoreROI >= 85 ? 'text-[#6C47FF]' : m.scoreROI >= 75 ? 'text-amber-500' : 'text-gray-400'}`}>
                          {m.scoreROI}
                        </span>
                        <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${m.scoreROI >= 85 ? 'bg-[#6C47FF]' : m.scoreROI >= 75 ? 'bg-amber-400' : 'bg-gray-300'}`}
                            style={{ width: `${m.scoreROI}%` }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <div className="text-4xl mb-4">🔍</div>
              <p className="font-semibold">Aucune machine ne correspond à ces filtres.</p>
            </div>
          )}
        </div>

        {/* NOTE MÉTHODOLOGIE */}
        <div className="mt-6 bg-gray-50 border border-gray-200 rounded-xl p-5 text-xs text-gray-500">
          <p className="font-bold text-gray-700 mb-1">📊 Méthodologie du Score ROI</p>
          <p>Le score ROI est calculé sur la base du prix d'achat, du nombre de technologies incluses, du délai SAV, de la formation et de la durée de garantie. Il représente le potentiel de rentabilité estimé pour un institut esthétique moyen. Les prix indiqués sont des fourchettes constatées sur le marché français — ils peuvent varier selon les configurations et promotions en cours.</p>
        </div>

        {/* CTA DEVIS */}
        <div className="mt-10 bg-gradient-to-br from-[#6C47FF] to-[#9B7DFF] rounded-3xl p-10 text-center">
          <h2 className="text-2xl font-black text-white mb-3">Besoin d'un devis personnalisé ?</h2>
          <p className="text-purple-200 mb-6">Notre équipe vous accompagne dans le choix et vous envoie une offre sous 24h.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-[#6C47FF] px-8 py-4 rounded-2xl font-black hover:bg-purple-50 transition shadow-xl">
            Demander un devis gratuit →
          </Link>
        </div>

      </div>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-white font-black text-lg">Estheti<span className="text-[#9B7DFF]">Scan</span></span>
          <p className="text-xs">© 2026 EsthetiScan — Comparateur indépendant de machines esthétiques professionnelles</p>
        </div>
      </footer>
    </main>
  )
}
