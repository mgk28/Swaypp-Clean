// pages/api/test-profile.ts
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
  const { userId } = req.query

  if (!userId) {
    return res.status(400).json({ error: 'userId manquant' })
  }

  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('user_id', userId)
    .single()

  res.status(200).json({ 
    profile: data,
    error: error,
    message: 'Vérifiez que beneficiary_name et les autres champs sont remplis'
  })
}