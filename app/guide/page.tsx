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

const STEPS = [
  {
    id: "type_soin",
    question: "Quel type de soin souhaitez-vous proposer ?",
    sub: "Selectionnez votre specialite principale",
    options: [
      { value: "visage", label: "Soins du visage", desc: "Nettoyage, anti-age, eclat", icon: "✨" },
      { value: "corps", label: "Remodelage corporel", desc: "Minceur, cellulite, galbe", icon: "💪" },
      { value: "acne", label: "Traitement acne", desc: "Anti-imperfections, cicatrices", icon: "🌿" },
      { value: "polyvalent", label: "Polyvalent tout usage", desc: "Plusieurs soins a la fois", icon: "⚡" },
    ]
  },
  {
    id: "usage",
    question: "Quelle sera la frequence d'utilisation ?",
    sub: "Cela determine la robustesse et le modele necessaires",
    options: [
      { value: "faible", label: "Occasionnelle", desc: "Moins de 5 clients / jour", icon: "🌙" },
      { value: "moyen", label: "Reguliere", desc: "5 a 15 clients / jour", icon: "☀️" },
      { value: "intense", label: "Intensive", desc: "Plus de 15 clients / jour", icon: "🔥" },
    ]
  },
  {
    id: "budget",
    question: "Quel est votre budget indicatif ?",
    sub: "Investissement pour l'achat ou la location de la machine",
    options: [
      { value: "petit", label: "Moins de 3 000 EUR", desc: "Ideal pour debuter ou completer", icon: "💶" },
      { value: "moyen", label: "3 000 - 8 000 EUR", desc: "Professionnel confirme", icon: "💰" },
      { value: "grand", label: "8 000 - 20 000 EUR", desc: "Centre premium", icon: "💎" },
      { value: "top", label: "Plus de 20 000 EUR", desc: "Clinique haut de gamme", icon: "👑" },
    ]
  },
  {
    id: "experience",
    question: "Quelle est votre situation actuelle ?",
    sub: "Votre profil nous aide a mieux vous conseiller",
    options: [
      { value: "non", label: "Premier achat", desc: "Je decouvre les machines esthetiques", icon: "🌱" },
      { value: "oui_basique", label: "Upgrade souhaite", desc: "J'ai une machine basique a remplacer", icon: "⬆️" },
      { value: "oui_pro", label: "Complement de parc", desc: "Je cherche une technologie supplementaire", icon: "➕" },
    ]
  }
]

const ZEMITS_RECO: Record<string, { nom: string; prix: string; tech: string; garantie: string; badge: string; roi: string; score: number }> = {
  visage: { nom: "Hydra Facial Zemits Pro", prix: "4 900 EUR", tech: "Hydrodermabrasion + Infusion", garantie: "2 ans", badge: "N°1 Visage", roi: "+3 400 EUR/mois", score: 97 },
  corps: { nom: "CryoSculpt Zemits Elite", prix: "8 500 EUR", tech: "Cryolipolyse + Cavitation US", garantie: "2 ans", badge: "N°1 Corps", roi: "+5 200 EUR/mois", score: 95 },
  acne: { nom: "PureSkin Zemits Clinic", prix: "3 200 EUR", tech: "Haute frequence + LED multicolore", garantie: "2 ans", badge: "N°1 Acne", roi: "+2 100 EUR/mois", score: 94 },
  polyvalent: { nom: "OmniZemits 6-en-1", prix: "12 900 EUR", tech: "6 technologies combinees", garantie: "3 ans", badge: "Bestseller 2026", roi: "+7 800 EUR/mois", score: 98 },
}

const CONCURRENTS = [
  { nom: "HydraFacial MD (USA)", prix: "18 000 EUR", garantie: "1 an", note: "3.8/5", support: false },
  { nom: "Aesthetic Pro X", prix: "9 200 EUR", garantie: "1 an", note: "3.5/5", support: false },
  { nom: "DermaRollPro", prix: "5 800 EUR", garantie: "6 mois", note: "3.2/5", support: false },
]

export default function Guide() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [showResults, setShowResults] = useState(false)
  const [showDevis, setShowDevis] = useState(false)
  const [form, setForm] = useState({ nom: "", email: "", telephone: "", centre: "" })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  function selectOption(stepId: string, value: string) {
    const newAnswers: Answers = { ...answers, [stepId]: value }
    setAnswers(newAnswers)
    setTimeout(() => {
      if (step < STEPS.length - 1) setStep(step + 1)
      else setShowResults(true)
    }, 250)
  }

  async function submitDevis(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const recoKey = answers.type_soin || "polyvalent"
    const reco = ZEMITS_RECO[recoKey] || ZEMITS_RECO["polyvalent"]
    await sb.from("leads").insert([{
      ...form,
      message: "Via Guide EsthetiScan: " + JSON.stringify(answers) + " | Machine: " + reco.nom,
      created_at: new Date().toISOString()
    }])
    setSent(true)
    setLoading(false)
  }

  const progress = showResults ? 100 : Math.round(((step) / STEPS.length) * 100)
  const recoKey = answers.type_soin || "polyvalent"
  const reco = ZEMITS_RECO[recoKey] || ZEMITS_RECO["polyvalent"]
  const currentStep = STEPS[step]

  if (sent) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-xl p-12 text-center max-w-lg w-full border border-gray-100">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">✅</span>
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-3">Demande envoyee !</h2>
          <p className="text-gray-500 mb-2">Notre expert vous contacte sous <strong>24h</strong>.</p>
          <div className="bg-purple-50 rounded-2xl p-4 my-6">
            <div className="text-xs text-[#6C47FF] font-bold uppercase mb-1">Votre selection</div>
            <div className="font-bold text-gray-900">{reco.nom}</div>
            <div className="text-[#6C47FF] font-black text-xl mt-1">{reco.prix}</div>
          </div>
          <Link href="/" className="inline-flex items-center gap-2 bg-[#6C47FF] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#5835ee] transition">
            Retour accueil →
          </Link>
        </div>
      </main>
    )
  }

  if (showResults && showDevis) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-lg w-full border border-gray-100">
          <div className="text-center mb-8">
            <div className="inline-block bg-purple-50 text-[#6C47FF] text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase">
              Devis personnalise
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{reco.nom}</h2>
            <p className="text-3xl font-black text-[#6C47FF] mt-2">{reco.prix}</p>
          </div>
          <form onSubmit={submitDevis} className="space-y-4">
            {[
              { key: "nom", label: "Nom complet", type: "text", placeholder: "Marie Dupont", required: true },
              { key: "email", label: "Email professionnel", type: "email", placeholder: "marie@moncentre.fr", required: true },
              { key: "telephone", label: "Telephone", type: "tel", placeholder: "06 12 34 56 78", required: false },
              { key: "centre", label: "Nom de votre centre", type: "text", placeholder: "Institut Belle & Zen", required: false },
            ].map((field) => (
              <div key={field.key}>
                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wide">{field.label} {field.required && "*"}</label>
                <input
                  required={field.required}
                  type={field.type}
                  value={form[field.key as keyof typeof form]}
                  onChange={(e) => setForm({...form, [field.key]: e.target.value})}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#6C47FF] focus:ring-2 focus:ring-purple-100 transition"
                  placeholder={field.placeholder}
                />
              </div>
            ))}
            <button type="submit" disabled={loading}
              className="w-full bg-[#6C47FF] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#5835ee] transition disabled:opacity-50 shadow-lg shadow-purple-200 mt-2">
              {loading ? "Envoi en cours..." : "Recevoir mon devis — Gratuit →"}
            </button>
            <button type="button" onClick={() => setShowDevis(false)} className="w-full text-sm text-gray-400 hover:text-gray-600 py-2">
              ← Retour aux resultats
            </button>
          </form>
        </div>
      </main>
    )
  }

  if (showResults) {
    return (
      <main className="min-h-screen bg-gray-50 pb-20">
        <nav className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#6C47FF] rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-black">E</span>
            </div>
            <span className="font-black text-gray-900">Estheti<span className="text-[#6C47FF]">Scan</span></span>
          </Link>
          <span className="text-sm text-gray-400">Votre recommandation personnalisee</span>
        </nav>
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 text-sm font-bold px-4 py-2 rounded-full mb-4 border border-green-100">
              <span>✓</span> Analyse complete
            </div>
            <h1 className="text-3xl font-black text-gray-900">Votre recommandation</h1>
          </div>

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-2 border-[#6C47FF] mb-6">
            <div className="bg-gradient-to-r from-[#6C47FF] to-[#9B7DFF] px-8 py-4 flex items-center justify-between">
              <span className="text-white font-bold text-sm">Score de compatibilite</span>
              <span className="text-white font-black text-2xl">{reco.score}%</span>
            </div>
            <div className="p-8">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-1">
                  <div className="text-xs text-[#6C47FF] font-bold uppercase tracking-wide mb-1">ZEMITS — {reco.badge}</div>
                  <h2 className="text-2xl font-black text-gray-900 mb-2">{reco.nom}</h2>
                  <p className="text-gray-500 text-sm mb-4">{reco.tech}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-green-50 text-green-700 text-xs font-semibold px-3 py-1 rounded-full border border-green-100">✓ Garantie {reco.garantie}</span>
                    <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full border border-blue-100">✓ Support FR 7j/7</span>
                    <span className="bg-orange-50 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full border border-orange-100">📈 ROI : {reco.roi}</span>
                  </div>
                </div>
                <div className="text-center md:text-right shrink-0">
                  <div className="text-xs text-gray-400 mb-1">A partir de</div>
                  <div className="text-4xl font-black text-[#6C47FF] mb-1">{reco.prix}</div>
                  <div className="text-xs text-gray-400 mb-4">Financement disponible</div>
                  <button onClick={() => setShowDevis(true)}
                    className="bg-[#6C47FF] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#5835ee] transition shadow-lg shadow-purple-200 text-sm">
                    Obtenir mon devis gratuit →
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
            <h3 className="font-bold text-gray-900 mb-4 text-sm">Comparatif avec la concurrence</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-left">
                    <th className="py-3 pr-4 text-gray-400 font-semibold text-xs uppercase">Machine</th>
                    <th className="py-3 pr-4 text-gray-400 font-semibold text-xs uppercase text-center">Prix</th>
                    <th className="py-3 pr-4 text-gray-400 font-semibold text-xs uppercase text-center">Garantie</th>
                    <th className="py-3 pr-4 text-gray-400 font-semibold text-xs uppercase text-center">Avis</th>
                    <th className="py-3 text-gray-400 font-semibold text-xs uppercase text-center">Support FR</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-purple-50 bg-purple-50">
                    <td className="py-3 pr-4 font-bold text-gray-900">{reco.nom} <span className="text-[#6C47FF] text-xs">(Zemits)</span></td>
                    <td className="py-3 pr-4 text-center font-black text-[#6C47FF]">{reco.prix}</td>
                    <td className="py-3 pr-4 text-center"><span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-bold">{reco.garantie}</span></td>
                    <td className="py-3 pr-4 text-center font-bold text-green-600">4.9 ★</td>
                    <td className="py-3 text-center text-green-600 font-bold text-lg">✓</td>
                  </tr>
                  {CONCURRENTS.map((c) => (
                    <tr key={c.nom} className="border-b border-gray-50">
                      <td className="py-3 pr-4 text-gray-500">{c.nom}</td>
                      <td className="py-3 pr-4 text-center text-gray-500">{c.prix}</td>
                      <td className="py-3 pr-4 text-center text-gray-400 text-xs">{c.garantie}</td>
                      <td className="py-3 pr-4 text-center text-gray-400">{c.note}</td>
                      <td className="py-3 text-center text-red-400 font-bold">✗</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="text-center">
            <button onClick={() => { setShowResults(false); setStep(0); setAnswers({}) }}
              className="text-sm text-gray-400 underline hover:text-gray-600">
              ← Recommencer le guide
            </button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-[#6C47FF] rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-black">E</span>
          </div>
          <span className="font-black text-gray-900">Estheti<span className="text-[#6C47FF]">Scan</span></span>
        </Link>
        <span className="text-sm text-gray-400 hidden md:block">Guide d'achat personnalise — Gratuit</span>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="mb-10">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Etape {step + 1} / {STEPS.length}</span>
            <span className="text-xs text-[#6C47FF] font-bold">{progress}% complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div className="bg-gradient-to-r from-[#6C47FF] to-[#9B7DFF] h-2 rounded-full transition-all duration-500 ease-out" style={{width: `${progress}%`}}></div>
          </div>
          <div className="flex justify-between mt-3">
            {STEPS.map((s, i) => (
              <div key={s.id} className={`w-2 h-2 rounded-full transition-all ${i <= step ? "bg-[#6C47FF]" : "bg-gray-200"}`}></div>
            ))}
          </div>
        </div>

        <div className="text-center mb-10">
          <h2 className="text-2xl font-black text-gray-900 mb-2">{currentStep.question}</h2>
          <p className="text-gray-400 text-sm">{currentStep.sub}</p>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {currentStep.options.map((opt) => {
            const isSelected = answers[currentStep.id as keyof Answers] === opt.value
            return (
              <button key={opt.value} onClick={() => selectOption(currentStep.id, opt.value)}
                className={`w-full text-left bg-white rounded-2xl p-5 border-2 flex items-center gap-4 transition-all ${isSelected ? "border-[#6C47FF] shadow-lg shadow-purple-100 bg-purple-50" : "border-gray-100 hover:border-[#6C47FF] hover:shadow-md"}`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 ${isSelected ? "bg-[#6C47FF] bg-opacity-10" : "bg-gray-50"}`}>
                  {opt.icon}
                </div>
                <div className="flex-1">
                  <div className={`font-bold text-base ${isSelected ? "text-[#6C47FF]" : "text-gray-900"}`}>{opt.label}</div>
                  <div className="text-gray-400 text-sm mt-0.5">{opt.desc}</div>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 shrink-0 flex items-center justify-center transition-all ${isSelected ? "bg-[#6C47FF] border-[#6C47FF]" : "border-gray-200"}`}>
                  {isSelected && <span className="text-white text-xs font-black">✓</span>}
                </div>
              </button>
            )
          })}
        </div>

        {step > 0 && (
          <button onClick={() => setStep(step - 1)} className="mt-6 text-sm text-gray-400 hover:text-gray-600 underline w-full text-center transition">
            ← Etape precedente
          </button>
        )}
      </div>
    </main>
  )
}
