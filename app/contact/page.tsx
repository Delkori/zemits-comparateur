'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, Send } from 'lucide-react'

export default function Contact() {
  const [form, setForm] = useState({ nom: '', email: '', telephone: '', centre: '', machine_interessee: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await supabase.from('leads').insert([form])
    setSent(true)
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-[#f8f6f0]">
      <header className="bg-[#1a1a2e] text-white py-4 px-6 flex items-center gap-4">
        <Link href="/" className="text-gray-400 hover:text-white flex items-center gap-1 text-sm">
          <ArrowLeft size={16} /> Accueil
        </Link>
        <span className="text-xl font-bold text-[#C9A84C]">ZEMITS</span>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-16">
        {sent ? (
          <div className="bg-white rounded-2xl p-10 text-center shadow-md">
            <CheckCircle className="text-[#C9A84C] mx-auto mb-4" size={56} />
            <h2 className="text-2xl font-bold text-[#1a1a2e] mb-2">Demande envoyée !</h2>
            <p className="text-gray-500 mb-6">Un expert Zemits vous contactera sous 24h.</p>
            <Link href="/comparateur" className="bg-[#C9A84C] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#b8943d] transition">
              Retour au comparateur
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-8 shadow-md">
            <h1 className="text-2xl font-bold text-[#1a1a2e] mb-2">Demande de devis gratuit</h1>
            <p className="text-gray-500 mb-8">Nos experts Zemits vous répondent sous 24h</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { key: 'nom', label: 'Nom complet', type: 'text', required: true },
                { key: 'email', label: 'Email professionnel', type: 'email', required: true },
                { key: 'telephone', label: 'Téléphone', type: 'tel', required: false },
                { key: 'centre', label: 'Nom de votre centre esthétique', type: 'text', required: false },
                { key: 'machine_interessee', label: 'Machine(s) qui vous intéresse(nt)', type: 'text', required: false },
              ].map(field => (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label} {field.required && <span className="text-red-400">*</span>}
                  </label>
                  <input
                    type={field.type}
                    required={field.required}
                    value={(form as any)[field.key]}
                    onChange={e => setForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A84C] transition"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea rows={4} value={form.message}
                  onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A84C] transition resize-none" />
              </div>
              <button type="submit" disabled={loading}
                className="w-full bg-[#C9A84C] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#b8943d] transition disabled:opacity-50">
                {loading ? 'Envoi...' : <><Send size={16} /> Envoyer ma demande</>}
              </button>
            </form>
          </div>
        )}
      </div>
    </main>
  )
}
