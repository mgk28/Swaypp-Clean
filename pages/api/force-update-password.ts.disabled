// pages/api/force-update-password.ts
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
  // Protection : seulement en développement
  if (process.env.NODE_ENV === 'production') {
    return res.status(403).json({ error: 'Non autorisé en production' })
  }

  try {
    const email = 'nexaholding28@gmail.com'
    const newPassword = 'NexaHolding2024!' // Nouveau mot de passe
    
    // Trouver l'utilisateur
    const { data: users, error: listError } = await supabase.auth.admin.listUsers()
    if (listError) throw listError

    const user = users.users.find(u => u.email === email)
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' })
    }

    // Mettre à jour le mot de passe
    const { error: updateError } = await supabase.auth.admin.updateUserById(
      user.id,
      { 
        password: newPassword,
        email_confirm: true // S'assurer que l'email est confirmé
      }
    )

    if (updateError) throw updateError

    res.status(200).json({ 
      success: true,
      message: 'Mot de passe mis à jour avec succès',
      credentials: {
        email: email,
        password: newPassword,
        note: 'Notez ce mot de passe et changez-le après la première connexion'
      }
    })

  } catch (error: any) {
    console.error('Erreur:', error)
    res.status(500).json({ error: error.message })
  }
}