// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types pour vos tables
export interface UserProfile {
  id: string
  email: string
  business_name?: string
  plan: 'free' | 'pro' | 'business'
  qr_codes_used: number
  qr_codes_limit: number
  stripe_customer_id?: string
  iban?: string
  total_revenue: number
  created_at: string
  updated_at: string
  phone?: string
  website?: string
  description?: string
  beneficiary_name?: string
  bank_name?: string
  bank_address?: string
  address?: string
  city?: string
  postal_code?: string
  country?: string
  payment_settings?: any
  notification_settings?: any
}

export interface QRCode {
  id: string
  user_id: string
  name: string
  amount?: number
  type: 'fixed' | 'variable'
  qr_data: string
  status: 'active' | 'inactive'
  scans_count: number
  payments_count: number
  created_at: string
  description?: string
  currency?: string
  total_collected?: number
}

export interface Transaction {
  id: string
  user_id: string
  qr_code_id?: string
  amount: number
  status: 'pending' | 'completed' | 'failed'
  payment_method?: string
  customer_email?: string
  description?: string
  created_at: string
  currency?: string
}