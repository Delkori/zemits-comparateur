import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Machine = {
  id: number
  nom: string
  marque: string
  categorie: string
  est_zemits: boolean
  prix: number | null
  description: string
  technologie: string
  certifications: string
  garantie: string
  formation_incluse: boolean
  sav_france: boolean
  nb_tetes: number | null
  puissance_w: number | null
  url_produit: string
  url_image: string
  avantages: string[]
  note: number
}

export type Lead = {
  nom: string
  email: string
  telephone: string
  centre: string
  machine_interessee: string
  message: string
}
