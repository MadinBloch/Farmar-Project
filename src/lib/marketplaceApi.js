import { isSupabaseConfigured, supabase } from './supabaseClient'

export { isSupabaseConfigured }

export async function signIn(email, password) {
  if (!isSupabaseConfigured) return { data: null, error: new Error('Supabase is not configured') }
  return supabase.auth.signInWithPassword({ email, password })
}

export async function signUp({ email, password, fullName, role }) {
  if (!isSupabaseConfigured) return { data: null, error: new Error('Supabase is not configured') }

  return supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName, role },
    },
  })
}

export async function signOut() {
  if (!isSupabaseConfigured) return { error: null }
  return supabase.auth.signOut()
}

export async function createProfile(profile) {
  if (!isSupabaseConfigured) return { data: null, error: new Error('Supabase is not configured') }
  return supabase.from('profiles').upsert(profile).select().single()
}

export async function getLots() {
  if (!isSupabaseConfigured) return { data: null, error: new Error('Supabase is not configured') }
  return supabase.from('lots').select('*').order('created_at', { ascending: false })
}

export async function createLot(lot) {
  if (!isSupabaseConfigured) return { data: null, error: new Error('Supabase is not configured') }
  return supabase.from('lots').insert(lot).select().single()
}

export async function getOffers() {
  if (!isSupabaseConfigured) return { data: null, error: new Error('Supabase is not configured') }
  return supabase.from('offers').select('*').order('created_at', { ascending: false })
}

export async function createOffer(offer) {
  if (!isSupabaseConfigured) return { data: null, error: new Error('Supabase is not configured') }
  return supabase.from('offers').insert(offer).select().single()
}

export async function getMarketPrices() {
  if (!isSupabaseConfigured) return { data: null, error: new Error('Supabase is not configured') }
  return supabase.from('market_prices').select('*').order('captured_at', { ascending: false })
}
