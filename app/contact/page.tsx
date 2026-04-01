"use client"
import { useState } from "react"
import { supabase } from "@/lib/supabase"
import Link from "next/link"

export default function Contact() {
  const [form, setForm] = useState({ nom: "", email: "", telephone: "", centre: "", message: "" })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
    const { error } = await supabase.from("leads").insert([{
      ...form,
      created_at: new Date().toISOString()
    }])
    if (error) {
      setError("Une erreur est survenue. Veuillez réessayer.")
      setLoading(false)
      return
    }
    setSent(true)
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-[#f8f4ef]">
      <header className="bg-[#1a1a2e] text-white py-4 px-8 flex justify-between items-center shadow">
        <Link href="/" className="text-2xl font-bold text-[#C9A84C]">ZEMITS</Link>
        <Link href="/comparateur" className="text-sm text-gray-300 hover:text-white transition">
          ← Retour au comparateur
        </Link>
      </header>

      <div className="max-w-xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-[#1a1a2e] mb-2">Demander un devis Zemits</h1>
          <p className="text-gray-500">Un expert vous rappelle sous 24h pour vous conseiller la machine idéale.</p>
        </div>

        {sent ? (
          <div className="bg-white rounded-2xl shadow-xl p-10 text-center">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-[#1a1a2e] mb-2">Demande envoyée !</h2>
            <p className="text-gray-500 mb-6">Notre équipe Zemits vous contacte sous 24h.</p>
            <Link href="/comparateur"
              className="bg-[#C9A84C] text-[#1a1a2e] px-8 py-3 rounded-xl font-bold hover:bg-yellow-400 transition inline-block">
              Retour au comparateur
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-5">
            {[
              { name: "nom", label: "Nom complet *", type: "text", required: true, placeholder: "Marie Dupont" },
              { name: "email", label: "Email professionnel *", type: "email", required: true, placeholder: "marie@moncentre.fr" },
              { name: "telephone", label: "Téléphone", type: "tel", required: false, placeholder: "06 12 34 56 78" },
              { name: "centre", label: "Nom du centre / clinique", type: "text", required: false, placeholder: "Institut Belle & Zen" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-semibold text-gray-700 mb-1">{field.label}</label>
                <input
                  type={field.type}
                  required={field.required}
                  placeholder={field.placeholder}
                  value={(form as Record<string, string>)[field.name]}
                  onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] text-sm transition"
                />
              </div>
            ))}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Machine souhaitée / votre besoin</label>
              <textarea
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] text-sm transition resize-none"
                placeholder="Ex : je cherche une machine d'hydrodermabrasion pour mon institut de 2 cabines..."
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button type="submit" disabled={loading}
              className="w-full bg-[#C9A84C] text-[#1a1a2e] py-4 rounded-xl font-bold text-lg hover:bg-yellow-400 transition disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? "Envoi en cours..." : "Envoyer ma demande →"}
            </button>
            <p className="text-center text-xs text-gray-400">
              Vos données sont confidentielles et ne seront jamais revendues.
            </p>
          </form>
        )}
      </div>
    </main>
  )
}
