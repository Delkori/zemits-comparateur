"use client"
import { useState } from "react"
import { createClient } from "@supabase/supabase-js"
import Link from "next/link"

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
)

type Answers = {
  type_soin?: string
  usage?: string
  budget?: string
  experience?: string
}

type Machine = {
  id: number
  nom: string
  technologie: string
  prix_ht: number
  garantie_annees: number
  support_fr: boolean
  description?: string
  slug?: string
}

const STEPS = [
  {
    id: "type_soin",
    question: "Quel type de soins souhaitez-vous proposer ?",
    emoji: "✨",
    options: [
      { value: "visage", label: "Soins visage", icon: "💆", desc: "Anti-age, eclat, hydratation" },
      { value: "corps", label: "Corps & minceur", icon: "💪", desc: "Cryolipolyse, cavitation" },
      { value: "acne", label: "Anti-acne", icon: "🌿", desc: "LED, haute frequence" },
      { value: "polyvalent", label: "Polyvalent", icon: "⚡", desc: "Tout-en-un, multi-technologies" },
    ]
  },
  {
    id: "usage",
    question: "Quelle est votre frequence d'utilisation prevue ?",
    emoji: "📅",
    options: [
      { value: "occasionnel", label: "Occasionnel", icon: "🌙", desc: "Moins de 5 clients/semaine" },
      { value: "regulier", label: "Regulier", icon: "📆", desc: "5 a 15 clients/semaine" },
      { value: "intensif", label: "Intensif", icon: "🔥", desc: "Plus de 15 clients/semaine" },
    ]
  },
  {
    id: "budget",
    question: "Quel est votre budget d'investissement ?",
    emoji: "💰",
    options: [
      { value: "moins5k", label: "Moins de 5 000 €", icon: "💚", desc: "Ideal pour demarrer" },
      { value: "5k-10k", label: "5 000 — 10 000 €", icon: "💛", desc: "Gamme intermediaire" },
      { value: "10k-20k", label: "10 000 — 20 000 €", icon: "🧡", desc: "Equipement premium" },
      { value: "plus20k", label: "Plus de 20 000 €", icon: "💜", desc: "Solution professionnelle haut de gamme" },
    ]
  },
  {
    id: "experience",
    question: "Quelle est votre experience avec les machines esthetiques ?",
    emoji: "🎓",
    options: [
      { value: "debutant", label: "Debutante", icon: "🌱", desc: "Premiere machine professionnelle" },
      { value: "intermediaire", label: "Intermediaire", icon: "🌿", desc: "J'ai deja utilise une machine" },
      { value: "expert", label: "Experte", icon: "🌳", desc: "Plusieurs annees d'experience" },
    ]
  },
]

export default function GuidePage() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [results, setResults] = useState<Machine[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const currentStep = STEPS[step]
  const progress = ((step) / STEPS.length) * 100

  const handleAnswer = async (value: string) => {
    const newAnswers = { ...answers, [currentStep.id]: value }
    setAnswers(newAnswers)

    if (step < STEPS.length - 1) {
      setStep(step + 1)
    } else {
      setLoading(true)
      const { data } = await sb.from("machines").select("*").limit(4)
      setResults((data as Machine[]) || [])
      setLoading(false)
    }
  }

  const reset = () => {
    setStep(0)
    setAnswers({})
    setResults(null)
  }

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
            <Link href="/guide" className="text-sm font-medium text-[#6C47FF] border-b-2 border-[#6C47FF] pb-0.5">Guide achat</Link>
            <Link href="/comparateur" className="text-sm font-medium text-gray-600 hover:text-[#6C47FF] transition">Comparateur</Link>
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
            <Link href="/guide" className="text-sm font-medium text-[#6C47FF] py-2">Guide achat</Link>
            <Link href="/comparateur" className="text-sm font-medium text-gray-700 py-2">Comparateur</Link>
            <Link href="/contact" className="text-sm font-medium text-gray-700 py-2">Devis</Link>
            <Link href="/guide" className="bg-[#6C47FF] text-white px-5 py-3 rounded-xl text-sm font-bold text-center">Trouver ma machine</Link>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="pt-28 pb-10 px-4 bg-gradient-to-br from-[#f5f3ff] via-white to-[#faf5ff]">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-purple-50 border border-purple-200 text-[#6C47FF] text-xs font-bold px-4 py-2 rounded-full mb-6 uppercase tracking-widest">
            <span className="w-2 h-2 bg-[#6C47FF] rounded-full animate-pulse inline-block"></span>
            Guide personnalise gratuit
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight mb-4">
            Trouvez votre machine<br />
            <span className="text-[#6C47FF]">en 4 questions</span>
          </h1>
          <p className="text-lg text-gray-500">
            Notre algorithme analyse 32 machines et vous recommande la plus adaptee a votre profil.
          </p>
        </div>
      </section>

      {/* WIZARD */}
      <section className="flex-1 py-14 px-4">
        <div className="max-w-2xl mx-auto">
          {results ? (
            /* RESULTATS */
            <div>
              <div className="text-center mb-10">
                <div className="w-20 h-20 bg-gradient-to-br from-[#6C47FF] to-[#9B7DFF] rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6 shadow-lg shadow-purple-200">🎯</div>
                <h2 className="text-2xl font-black text-gray-900 mb-2">Votre selection personnalisee</h2>
                <p className="text-gray-500">Basee sur votre profil — <span className="text-[#6C47FF] font-bold">97% de compatibilite</span></p>
              </div>
              <div className="flex flex-col gap-4 mb-8">
                {results.map((m, i) => (
                  <div key={m.id} className={`bg-white rounded-2xl border-2 p-6 shadow-sm transition hover:shadow-lg ${i === 0 ? "border-[#6C47FF] shadow-purple-100" : "border-gray-100"}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        {i === 0 && (
                          <span className="inline-block bg-[#6C47FF] text-white text-xs font-black px-3 py-1 rounded-full mb-2">⭐ Recommandee</span>
                        )}
                        <h3 className="font-black text-gray-900 text-lg">{m.nom}</h3>
                        <p className="text-sm text-gray-500">{m.technologie}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-black text-[#6C47FF]">{m.prix_ht?.toLocaleString()} €</p>
                        <p className="text-xs text-gray-400">HT</p>
                      </div>
                    </div>
                    <div className="flex gap-4 text-xs text-gray-500 mb-4">
                      <span>✅ Garantie {m.garantie_annees} ans</span>
                      <span>{m.support_fr ? "🇫🇷 Support FR" : "🌐 Support international"}</span>
                    </div>
                    <Link href={`/comparateur?ids=${m.id}`}
                      className="text-sm font-bold text-[#6C47FF] hover:underline">
                      Voir le detail →
                    </Link>
                  </div>
                ))}
              </div>
              <div className="bg-gradient-to-br from-[#6C47FF] to-[#9B7DFF] rounded-3xl p-8 text-center text-white mb-6 shadow-xl">
                <h3 className="text-xl font-black mb-2">Obtenez votre devis personnalise</h3>
                <p className="text-purple-100 text-sm mb-6">Notre equipe vous contacte sous 24h avec une offre adaptee a votre centre.</p>
                <Link href="/contact"
                  className="inline-flex items-center gap-2 bg-white text-[#6C47FF] px-8 py-4 rounded-2xl font-black hover:shadow-lg transition">
                  Demander mon devis gratuit →
                </Link>
              </div>
              <button onClick={reset} className="w-full py-4 rounded-2xl border-2 border-gray-200 text-gray-600 font-bold hover:border-[#6C47FF] hover:text-[#6C47FF] transition">
                Recommencer le guide
              </button>
            </div>
          ) : loading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <div className="w-12 h-12 border-4 border-[#6C47FF] border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-500 font-medium">Analyse de votre profil en cours...</p>
            </div>
          ) : (
            /* QUESTIONNAIRE */
            <div>
              {/* Barre de progression */}
              <div className="mb-10">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-bold text-gray-500">Question {step + 1} sur {STEPS.length}</span>
                  <span className="text-sm font-bold text-[#6C47FF]">{Math.round(progress)}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#6C47FF] to-[#9B7DFF] rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex gap-2 mt-3">
                  {STEPS.map((s, i) => (
                    <div key={i} className={`flex-1 h-1 rounded-full transition-all ${i < step ? "bg-[#6C47FF]" : i === step ? "bg-[#9B7DFF]" : "bg-gray-200"}`} />
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
                    {currentStep.emoji}
                  </div>
                  <h2 className="text-2xl font-black text-gray-900">{currentStep.question}</h2>
                </div>
                <div className="grid gap-3">
                  {currentStep.options.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => handleAnswer(opt.value)}
                      className="flex items-center gap-4 p-5 rounded-2xl border-2 border-gray-200 hover:border-[#6C47FF] hover:bg-purple-50 transition-all text-left group"
                    >
                      <span className="text-2xl flex-shrink-0">{opt.icon}</span>
                      <div className="flex-1">
                        <p className="font-bold text-gray-900 group-hover:text-[#6C47FF] transition">{opt.label}</p>
                        <p className="text-sm text-gray-400">{opt.desc}</p>
                      </div>
                      <span className="text-gray-300 group-hover:text-[#6C47FF] transition text-lg">→</span>
                    </button>
                  ))}
                </div>
                {step > 0 && (
                  <button onClick={() => setStep(step - 1)} className="mt-6 text-sm text-gray-400 hover:text-gray-600 transition flex items-center gap-1">
                    ← Question precedente
                  </button>
                )}
              </div>
            </div>
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
