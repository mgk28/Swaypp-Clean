// pages/api/delete-recreate-user.ts
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
  // Protection
  if (process.env.NODE_ENV === 'production') {
    return res.status(403).json({ error: 'Non autorisé' })
  }

  try {
    const email = 'nexaholding28@gmail.com'
    
    // 1. Trouver l'utilisateur existant
    const { data: users } = await supabase.auth.admin.listUsers()
    const existingUser = users?.users.find(u => u.email === email)
    
    // 2. Supprimer l'utilisateur s'il existe
    if (existingUser) {
      // D'abord supprimer le profil
      await supabase
        .from('user_profiles')
        .delete()
        .eq('user_id', existingUser.id)
      
      // Puis supprimer l'utilisateur
      await supabase.auth.admin.deleteUser(existingUser.id)
    }

    // 3. Recréer l'utilisateur avec le bon mot de passe
    const newPassword = 'Swaypp2024!' // Nouveau mot de passe simple
    
    const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
      email: email,
      password: newPassword,
      email_confirm: true, // Confirmer automatiquement
      user_metadata: {
        business_name: 'NexaHolding'
      }
    })

    if (createError) throw createError

    // 4. Créer le profil avec votre IBAN
    if (newUser.user) {
      await supabase.from('user_profiles').insert({
        user_id: newUser.user.id,
        business_name: 'NexaHolding',
        iban: 'CH1500243243FS1502472',
        phone: '+41789306152',
        is_active: true
      })
    }

    res.status(200).json({ 
      success: true,
      message: 'Compte recréé avec succès !',
      credentials: {
        email: email,
        password: newPassword,
        note: 'Utilisez ces identifiants pour vous connecter'
      }
    })

  } catch (error: any) {
    console.error('Erreur:', error)
    res.status(500).json({ error: error.message })
  }
}