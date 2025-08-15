// pages/api/auth/signin.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFydGxlaGxyc3FzZnNtem9zeXlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5NTY2NDksImV4cCI6MjA2ODUzMjY0OX0.FFiP2MXr3DR_zsTbhDKhZRoGHJMaiAIzJ0BMzNfv7YA
  process.env.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFydGxlaGxyc3FzZnNtem9zeXlyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1Mjk1NjY0OSwiZXhwIjoyMDY4NTMyNjQ5fQ.A2YKwvUB_Q8TKv4wqOZPwXn7f7ctu5mdEQAfbzNlY_A
)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email, password } = req.body

  try {
    // Connexion avec Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      return res.status(401).json({ error: error.message })
    }

    // Récupérer le profil
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', data.user?.id)
      .single()

    return res.status(200).json({
      user: {
        id: data.user?.id,
        email: data.user?.email,
        businessName: profile?.business_name,
        plan: profile?.plan || 'free'
      },
      token: data.session?.access_token
    })
  } catch (error: any) {
    return res.status(500).json({ error: 'Erreur serveur' })
  }
}