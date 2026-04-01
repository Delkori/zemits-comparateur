"use client"
import { useState } from "react"
import { createClient } from "@supabase/supabase-js"
import Link from "next/link"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
const supabase = createClient(supabaseUrl, supabaseKey)

export default function Contact() {
  const [form, setForm] = useState({ nom: "", email: "", telephone: "", centre: "", message: "" })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    await supabase.from("leads").insert([{ ...form, created_at: new Date().toISOString() }])
    setSent(true)
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-[#f8f4ef]">
      <header className="bg-[#1a1a2e] text-white py-4 px-8 flex justify-between items-center shadow">
        <Link href="/" className="text-2xl font-bold text-[#C9A84C]">ZEMITS</Link>
        <Link href="/comparateur" className="text-sm text-gray-300 hover:text-white transition">Retour au comparateur</Link>
      </header>

      <div className="max-w-xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-[#1a1a2e] mb-2">Demander un devis Zemits</h1>
          <p className="text-gray-500">Un expert vous rappelle sous 24h pour vous conseiller.</p>
        </div>

        {sent ? (
          <div className="bg-white rounded-2xl shadow-xl p-10 text-center">
            <div className="text-6xl mb-4">ok</div>
            <h2 className="text-2xl font-bold text-[#1a1a2e] mb-2">Demande envoyee !</h2>
            <p className="text-gray-500 mb-6">Notre equipe Zemits vous contacte sous 24h.</p>
            <Link href="/comparateur" className="bg-[#C9A84C] text-[#1a1a2e] px-8 py-3 rounded-xl font-bold hover:bg-yellow-400 transition inline-block">
              Retour au comparateur
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Nom complet *</label>
              <input type="text" required value={form.nom} onChange={function(e) { setForm({ ...form, nom: e.target.value }) }}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#C9A84C] text-sm" placeholder="Marie Dupont" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email professionnel *</label>
              <input type="email" required value={form.email} onChange={function(e) { setForm({ ...form, email: e.target.value }) }}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#C9A84C] text-sm" placeholder="marie@moncentre.fr" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Telephone</label>
              <input type="tel" value={form.telephone} onChange={function(e) { setForm({ ...form, telephone: e.target.value }) }}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#C9A84C] text-sm" placeholder="06 12 34 56 78" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Nom du centre / clinique</label>
              <input type="text" value={form.centre} onChange={function(e) { setForm({ ...form, centre: e.target.value }) }}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#C9A84C] text-sm" placeholder="Institut Belle et Zen" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Machine souhaitee / votre besoin</label>
              <textarea rows={4} value={form.message} onChange={function(e) { setForm({ ...form, message: e.target.value }) }}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#C9A84C] text-sm resize-none"
                placeholder="Ex : je cherche une machine hydrodermabrasion..." />
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-[#C9A84C] text-[#1a1a2e] py-4 rounded-xl font-bold text-lg hover:bg-yellow-400 transition disabled:opacity-50">
              {loading ? "Envoi en cours..." : "Envoyer ma demande"}
            </button>
          </form>
        )}
      </div>
    </main>
  )
}
