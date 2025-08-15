// pages/api/auth/signup.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { businessName, email, password, iban, phone } = req.body

    // Create user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          business_name: businessName,
        }
      }
    })

    if (authError) {
      return res.status(400).json({ error: authError.message })
    }

    if (!authData.user) {
      return res.status(400).json({ error: 'Erreur lors de la création du compte' })
    }

    // Create user profile with IBAN
    const { error: profileError } = await supabase
      .from('user_profiles')
      .insert({
        user_id: authData.user.id,
        business_name: businessName,
        iban: iban,
        phone: phone,
        is_active: true
      })

    if (profileError) {
      console.error('Profile creation error:', profileError)
      // Note: We don't rollback the auth user here as Supabase handles it differently
    }

    res.status(201).json({ 
      success: true,
      message: 'Compte créé avec succès. Vérifiez votre email pour confirmer votre compte.',
      userId: authData.user.id
    })

  } catch (error: any) {
    console.error('Signup error:', error)
    res.status(500).json({ 
      error: 'Erreur lors de la création du compte',
      details: error.message 
    })
  }
}