"use client"
import { useState } from "react"
import { createClient } from "@supabase/supabase-js"
import Link from "next/link"

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
)

const STEPS = [
  {
    id: "type_soin",
    question: "Quel type de soin souhaitez-vous proposer ?",
    sub: "Selectionnez votre specialite principale",
    options: [
      { value: "visage", label: "Soins du visage", icon: "face", desc: "Nettoyage, anti-age, eclat" },
      { value: "corps", label: "Remodelage corporel", icon: "body", desc: "Minceur, cellulite, galbe" },
      { value: "acne", label: "Traitement acne", icon: "acne", desc: "Anti-imperfections, cicatrices" },
      { value: "polyvalent", label: "Polyvalent tout usage", icon: "multi", desc: "Plusieurs soins a la fois" },
    ]
  },
  {
    id: "usage",
    question: "Quelle sera la frequence d-utilisation ?",
    sub: "Cela determine la robustesse necessaire",
    options: [
      { value: "faible", label: "Occasionnelle", icon: "low", desc: "Moins de 5 clients / jour" },
      { value: "moyen", label: "Reguliere", icon: "mid", desc: "5 a 15 clients / jour" },
      { value: "intense", label: "Intensive", icon: "high", desc: "Plus de 15 clients / jour" },
    ]
  },
  {
    id: "budget",
    question: "Quel est votre budget indicatif ?",
    sub: "Investissement pour l-achat de la machine",
    options: [
      { value: "petit", label: "Moins de 3 000 EUR", icon: "eur1", desc: "Debutant ou complement" },
      { value: "moyen", label: "3 000 - 8 000 EUR", icon: "eur2", desc: "Professionnel confirme" },
      { value: "grand", label: "8 000 - 20 000 EUR", icon: "eur3", desc: "Centre premium" },
      { value: "top", label: "Plus de 20 000 EUR", icon: "eur4", desc: "Clinique haut de gamme" },
    ]
  },
  {
    id: "experience",
    question: "Avez-vous deja une machine esthetique ?",
    sub: "Votre experience nous aide a mieux vous conseiller",
    options: [
      { value: "non", label: "Non, c-est mon premier achat", icon: "new", desc: "Je decouvre ce secteur" },
      { value: "oui_basique", label: "Oui, une machine basique", icon: "basic", desc: "Je veux upgrader" },
      { value: "oui_pro", label: "Oui, je complete mon parc", icon: "pro", desc: "Je cherche un complement" },
    ]
  }
]

const MACHINES_SCORES = {
  "visage": { "Hydra Facial Zemits": 10, "DermaClear Pro": 7, "SkinJet Basic": 4 },
  "corps": { "CryoSculpt Zemits": 10, "Slimming Pro X": 6, "Cavita Body": 5 },
  "acne": { "PureSkin Zemits": 10, "ClearFace HD": 7, "AcneFix Light": 3 },
  "polyvalent": { "OmniZemits 6-en-1": 10, "MultiSkin Pro": 8, "AllInOne Basic": 4 },
}

const ZEMITS_RECO = {
  "visage": { nom: "Hydra Facial Zemits Pro", prix: "4 900 EUR", tech: "Hydrodermabrasion + Infusion", garantie: "2 ans", badge: "N1 Visage", roi: "+3 400 EUR/mois" },
  "corps": { nom: "CryoSculpt Zemits Elite", prix: "8 500 EUR", tech: "Cryolipolyse + Cavitation", garantie: "2 ans", badge: "N1 Corps", roi: "+5 200 EUR/mois" },
  "acne": { nom: "PureSkin Zemits Clinic", prix: "3 200 EUR", tech: "Haute frequence + LED", garantie: "2 ans", badge: "N1 Acne", roi: "+2 100 EUR/mois" },
  "polyvalent": { nom: "OmniZemits 6-en-1", prix: "12 900 EUR", tech: "6 technologies combinees", garantie: "3 ans", badge: "Bestseller", roi: "+7 800 EUR/mois" },
}

const CONCURRENTS = [
  { nom: "HydraFacial MD (USA)", prix: "18 000 EUR", garantie: "1 an", note: "3.8/5" },
  { nom: "Aesthetic Pro X", prix: "9 200 EUR", garantie: "1 an", note: "3.5/5" },
  { nom: "DermaRollPro", prix: "5 800 EUR", garantie: "6 mois", note: "3.2/5" },
]

const ICONS = {
  face: "face-smile",
  body: "sparkles",
  acne: "beaker",
  multi: "squares-plus",
  low: "clock",
  mid: "chart-bar",
  high: "bolt",
  eur1: "currency-euro",
  eur2: "currency-euro",
  eur3: "currency-euro",
  eur4: "currency-euro",
  new: "star",
  basic: "arrow-up",
  pro: "plus-circle",
}

export default function Guide() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [showDevis, setShowDevis] = useState(false)
  const [form, setForm] = useState({ nom: "", email: "", telephone: "", centre: "" })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  function selectOption(stepId, value) {
    const newAnswers = { ...answers, [stepId]: value }
    setAnswers(newAnswers)
    setTimeout(function() {
      if (step < STEPS.length - 1) {
        setStep(step + 1)
      } else {
        setShowResults(true)
      }
    }, 300)
  }

  async function submitDevis(e) {
    e.preventDefault()
    setLoading(true)
    const reco = ZEMITS_RECO[answers.type_soin] || ZEMITS_RECO["polyvalent"]
    await sb.from("leads").insert([{
      ...form,
      message: "Via Guide: " + JSON.stringify(answers) + " | Machine: " + reco.nom,
      created_at: new Date().toISOString()
    }])
    setSent(true)
    setLoading(false)
  }

  const progress = showResults ? 100 : Math.round((step / STEPS.length) * 100)
  const reco = ZEMITS_RECO[answers.type_soin] || ZEMITS_RECO["polyvalent"]
  const currentStep = STEPS[step]

  if (sent) {
    return (
      <main className="min-h-screen bg-[#f8f4ef] flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-lg w-full">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">ok</span>
          </div>
          <h2 className="text-2xl font-bold text-[#1a1a2e] mb-3">Devis envoye !</h2>
          <p className="text-gray-500 mb-2">Notre expert Zemits vous contacte sous <strong>24h</strong> pour vous presenter votre solution personnalisee.</p>
          <p className="text-[#C9A84C] font-semibold mb-8">{reco.nom}</p>
          <Link href="/" className="bg-[#C9A84C] text-[#1a1a2e] px-8 py-3 rounded-xl font-bold hover:bg-yellow-400 transition inline-block">
            Retour a l-accueil
          </Link>
        </div>
      </main>
    )
  }

  if (showResults && showDevis) {
    return (
      <main className="min-h-screen bg-[#f8f4ef] flex items-center justify-center px-4 py-10">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full">
          <div className="text-center mb-8">
            <div className="inline-block bg-[#C9A84C] text-[#1a1a2e] text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wide">
              Votre devis personnalise
            </div>
            <h2 className="text-2xl font-bold text-[#1a1a2e]">{reco.nom}</h2>
            <p className="text-3xl font-black text-[#C9A84C] mt-2">{reco.prix}</p>
          </div>
          <form onSubmit={submitDevis} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Nom complet *</label>
              <input required type="text" value={form.nom} onChange={function(e) { setForm({...form, nom: e.target.value}) }}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C9A84C]" placeholder="Marie Dupont" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Email professionnel *</label>
              <input required type="email" value={form.email} onChange={function(e) { setForm({...form, email: e.target.value}) }}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C9A84C]" placeholder="marie@moncentre.fr" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Telephone</label>
              <input type="tel" value={form.telephone} onChange={function(e) { setForm({...form, telephone: e.target.value}) }}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C9A84C]" placeholder="06 12 34 56 78" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Nom de votre centre</label>
              <input type="text" value={form.centre} onChange={function(e) { setForm({...form, centre: e.target.value}) }}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C9A84C]" placeholder="Institut Belle et Zen" />
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-[#C9A84C] text-[#1a1a2e] py-4 rounded-xl font-bold text-lg hover:bg-yellow-400 transition disabled:opacity-50 mt-2">
              {loading ? "Envoi..." : "Recevoir mon devis gratuitement"}
            </button>
            <button type="button" onClick={function() { setShowDevis(false) }} className="w-full text-sm text-gray-400 hover:text-gray-600 py-2">
              Retour aux resultats
            </button>
          </form>
        </div>
      </main>
    )
  }

  if (showResults) {
    return (
      <main className="min-h-screen bg-[#f8f4ef] pb-20">
        <header className="bg-[#1a1a2e] text-white py-4 px-8 flex justify-between items-center shadow">
          <Link href="/" className="text-2xl font-bold text-[#C9A84C]">ZEMITS</Link>
          <span className="text-sm text-gray-400">Votre selection personnalisee</span>
        </header>

        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center mb-10">
            <div className="inline-block bg-green-100 text-green-700 text-sm font-bold px-4 py-2 rounded-full mb-4">
              Analyse complete - 3 machines trouvees pour votre profil
            </div>
            <h1 className="text-3xl font-bold text-[#1a1a2e]">Votre machine ideale</h1>
            <p className="text-gray-500 mt-2">Basee sur votre profil : {answers.type_soin} | {answers.usage} | {answers.budget}</p>
          </div>

          <div className="grid gap-6">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-4 border-[#C9A84C] relative">
              <div className="absolute top-4 right-4 bg-[#C9A84C] text-[#1a1a2e] text-xs font-black px-3 py-1 rounded-full uppercase">
                {reco.badge} - Recommande pour vous
              </div>
              <div className="p-8">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="flex-1">
                    <div className="text-xs text-[#C9A84C] font-bold uppercase tracking-wide mb-1">ZEMITS - Partenaire certifie</div>
                    <h2 className="text-2xl font-bold text-[#1a1a2e] mb-2">{reco.nom}</h2>
                    <p className="text-gray-500 text-sm mb-4">{reco.tech}</p>
                    <div className="flex flex-wrap gap-3 mb-4">
                      <span className="bg-green-50 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">Garantie {reco.garantie}</span>
                      <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">Support FR inclus</span>
                      <span className="bg-purple-50 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full">Formation offerte</span>
                      <span className="bg-orange-50 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full">ROI estime : {reco.roi}</span>
                    </div>
                  </div>
                  <div className="text-center md:text-right">
                    <div className="text-sm text-gray-400 mb-1">Prix indicatif</div>
                    <div className="text-4xl font-black text-[#C9A84C] mb-4">{reco.prix}</div>
                    <button onClick={function() { setShowDevis(true) }}
                      className="bg-[#C9A84C] text-[#1a1a2e] px-8 py-3 rounded-xl font-bold hover:bg-yellow-400 transition text-sm w-full md:w-auto">
                      Obtenir mon devis gratuit
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="font-bold text-[#1a1a2e] mb-4 text-sm uppercase tracking-wide text-gray-500">Comparatif avec la concurrence</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left py-3 text-gray-500 font-semibold">Machine</th>
                      <th className="text-center py-3 text-gray-500 font-semibold">Prix</th>
                      <th className="text-center py-3 text-gray-500 font-semibold">Garantie</th>
                      <th className="text-center py-3 text-gray-500 font-semibold">Avis clients</th>
                      <th className="text-center py-3 text-gray-500 font-semibold">Support FR</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-yellow-100 bg-yellow-50">
                      <td className="py-3 font-bold text-[#1a1a2e]">{reco.nom} <span className="text-[#C9A84C] text-xs">(Zemits)</span></td>
                      <td className="py-3 text-center font-bold text-[#C9A84C]">{reco.prix}</td>
                      <td className="py-3 text-center"><span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold">{reco.garantie}</span></td>
                      <td className="py-3 text-center font-bold text-green-600">4.9/5</td>
                      <td className="py-3 text-center text-green-600 font-bold">Oui</td>
                    </tr>
                    {CONCURRENTS.map(function(c) {
                      return (
                        <tr key={c.nom} className="border-b border-gray-50 text-gray-500">
                          <td className="py-3">{c.nom}</td>
                          <td className="py-3 text-center">{c.prix}</td>
                          <td className="py-3 text-center text-xs">{c.garantie}</td>
                          <td className="py-3 text-center">{c.note}</td>
                          <td className="py-3 text-center text-red-400">Non</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <button onClick={function() { setShowResults(false); setStep(0); setAnswers({}) }}
              className="text-sm text-gray-400 underline hover:text-gray-600">
              Recommencer le guide
            </button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#f8f4ef]">
      <header className="bg-[#1a1a2e] text-white py-4 px-8 flex justify-between items-center shadow">
        <Link href="/" className="text-2xl font-bold text-[#C9A84C]">ZEMITS</Link>
        <span className="text-sm text-gray-400">Guide d-achat personnalise</span>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-gray-400 font-semibold uppercase">Etape {step + 1} sur {STEPS.length}</span>
            <span className="text-xs text-[#C9A84C] font-bold">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-[#C9A84C] h-2 rounded-full transition-all duration-500" style={{width: progress + "%"}}></div>
          </div>
        </div>

        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-[#1a1a2e] mb-2">{currentStep.question}</h2>
          <p className="text-gray-400">{currentStep.sub}</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {currentStep.options.map(function(opt) {
            const isSelected = answers[currentStep.id] === opt.value
            return (
              <button key={opt.value} onClick={function() { selectOption(currentStep.id, opt.value) }}
                className={"w-full text-left bg-white rounded-2xl p-5 shadow transition border-2 flex items-center gap-4 group " + (isSelected ? "border-[#C9A84C] bg-yellow-50 shadow-lg" : "border-transparent hover:border-[#C9A84C] hover:shadow-lg")}>
                <div className={"w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 " + (isSelected ? "bg-[#C9A84C]" : "bg-gray-100 group-hover:bg-yellow-100")}>
                  {opt.value === "visage" && "face"}
                  {opt.value === "corps" && "body"}
                  {opt.value === "acne" && "sk"}
                  {opt.value === "polyvalent" && "all"}
                  {opt.value === "faible" && "1x"}
                  {opt.value === "moyen" && "5x"}
                  {opt.value === "intense" && "15x"}
                  {opt.value === "petit" && "EUR"}
                  {opt.value === "grand" && "EUR"}
                  {opt.value === "top" && "EUR"}
                  {opt.value === "non" && "new"}
                  {opt.value === "oui_basique" && "up"}
                  {opt.value === "oui_pro" && "pro"}
                  {opt.value === "moyen" && opt.label && opt.label.includes("EUR") && "EUR"}
                </div>
                <div className="flex-1">
                  <div className={"font-bold text-base " + (isSelected ? "text-[#C9A84C]" : "text-[#1a1a2e]")}>{opt.label}</div>
                  <div className="text-gray-400 text-sm mt-0.5">{opt.desc}</div>
                </div>
                <div className={"w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center " + (isSelected ? "bg-[#C9A84C] border-[#C9A84C]" : "border-gray-300")}>
                  {isSelected && <span className="text-white text-xs font-black">v</span>}
                </div>
              </button>
            )
          })}
        </div>

        {step > 0 && (
          <button onClick={function() { setStep(step - 1) }} className="mt-6 text-sm text-gray-400 hover:text-gray-600 underline w-full text-center">
            Etape precedente
          </button>
        )}
      </div>
    </main>
  )
}
