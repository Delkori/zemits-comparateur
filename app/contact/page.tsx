"use client"
import { useState } from "react"
import { createClient } from "@supabase/supabase-js"
import Link from "next/link"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
const supabase = createClient(supabaseUrl, supabaseKey)

export default function ContactPage() {
  const [form, setForm] = useState({ nom: "", email: "", telephone: "", centre: "", message: "" })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    await supabase.from("contacts").insert([form])
    setSent(true)
    setSending(false)
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
            <Link href="/guide" className="text-sm font-medium text-gray-600 hover:text-[#6C47FF] transition">Guide achat</Link>
            <Link href="/comparateur" className="text-sm font-medium text-gray-600 hover:text-[#6C47FF] transition">Comparateur</Link>
            <Link href="/contact" className="text-sm font-medium text-[#6C47FF] border-b-2 border-[#6C47FF] pb-0.5">Devis</Link>
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
            <Link href="/comparateur" className="text-sm font-medium text-gray-700 py-2">Comparateur</Link>
            <Link href="/contact" className="text-sm font-medium text-[#6C47FF] py-2">Devis</Link>
            <Link href="/guide" className="bg-[#6C47FF] text-white px-5 py-3 rounded-xl text-sm font-bold text-center">Trouver ma machine</Link>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="pt-28 pb-10 px-4 bg-gradient-to-br from-[#f5f3ff] via-white to-[#faf5ff]">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-purple-50 border border-purple-200 text-[#6C47FF] text-xs font-bold px-4 py-2 rounded-full mb-6 uppercase tracking-widest">
            <span className="w-2 h-2 bg-[#6C47FF] rounded-full inline-block"></span>
            Devis personnalise
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight mb-4">
            Recevez votre devis<br />
            <span className="text-[#6C47FF]">sous 24 heures</span>
          </h1>
          <p className="text-lg text-gray-500">
            Gratuit, sans engagement. Notre equipe vous rappelle pour affiner votre projet.
          </p>
        </div>
      </section>

      {/* FORM */}
      <section className="flex-1 py-14 px-4">
        <div className="max-w-2xl mx-auto">
          {sent ? (
            <div className="bg-gradient-to-br from-purple-50 to-white rounded-3xl border border-purple-100 p-14 text-center shadow-xl">
              <div className="w-20 h-20 bg-gradient-to-br from-[#6C47FF] to-[#9B7DFF] rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6 shadow-lg shadow-purple-200">
                ✓
              </div>
              <h2 className="text-2xl font-black text-gray-900 mb-3">Demande envoyee !</h2>
              <p className="text-gray-500 mb-8">Notre equipe vous contacte sous 24h avec une offre personnalisee.</p>
              <Link href="/" className="inline-flex items-center gap-2 bg-[#6C47FF] text-white px-8 py-4 rounded-2xl font-bold hover:bg-[#5835ee] transition shadow-lg shadow-purple-200">
                Retour a l'accueil →
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
              <div className="p-8 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-white">
                <h2 className="text-xl font-black text-gray-900">Votre projet</h2>
                <p className="text-sm text-gray-500 mt-1">Tous les champs sont optionnels sauf email</p>
              </div>
              <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Votre nom</label>
                    <input
                      type="text"
                      placeholder="Sophie Martin"
                      value={form.nom}
                      onChange={e => setForm({...form, nom: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#6C47FF] focus:outline-none transition text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      placeholder="sophie@moncentre.fr"
                      required
                      value={form.email}
                      onChange={e => setForm({...form, email: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#6C47FF] focus:outline-none transition text-sm"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Telephone</label>
                    <input
                      type="tel"
                      placeholder="06 xx xx xx xx"
                      value={form.telephone}
                      onChange={e => setForm({...form, telephone: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#6C47FF] focus:outline-none transition text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Nom de votre centre</label>
                    <input
                      type="text"
                      placeholder="Institut Belle & Zen"
                      value={form.centre}
                      onChange={e => setForm({...form, centre: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#6C47FF] focus:outline-none transition text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Votre projet</label>
                  <textarea
                    rows={4}
                    placeholder="Decrivez votre projet : type de soins, budget, delai..."
                    value={form.message}
                    onChange={e => setForm({...form, message: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#6C47FF] focus:outline-none transition text-sm resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-[#6C47FF] text-white py-4 rounded-2xl font-black text-base hover:bg-[#5835ee] transition shadow-lg shadow-purple-200 disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {sending ? "Envoi en cours..." : "Envoyer ma demande de devis →"}
                </button>
                <p className="text-center text-xs text-gray-400">⏱ Reponse sous 24h — 100% gratuit — Sans engagement</p>
              </form>
            </div>
          )}

          {/* GARANTIES */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            {[
              { icon: "🔒", label: "Donnees securisees" },
              { icon: "🇫🇷", label: "Equipe francaise" },
              { icon: "⚡", label: "Reponse sous 24h" },
            ].map(g => (
              <div key={g.label} className="bg-purple-50 rounded-2xl p-4 text-center">
                <div className="text-2xl mb-2">{g.icon}</div>
                <p className="text-xs font-bold text-gray-700">{g.label}</p>
              </div>
            ))}
          </div>
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
