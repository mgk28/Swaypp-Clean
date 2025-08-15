// pages/api/create-test-user.ts
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
    // Créer un utilisateur de test
    const testEmail = 'test@swaypp.ch'
    const testPassword = 'Test1234!'
    
    // Supprimer l'utilisateur s'il existe déjà
    const { data: existingUser } = await supabase.auth.admin.listUsers()
    const userToDelete = existingUser?.users.find(u => u.email === testEmail)
    if (userToDelete) {
      await supabase.auth.admin.deleteUser(userToDelete.id)
    }

    // Créer le nouvel utilisateur
    const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
      email: testEmail,
      password: testPassword,
      email_confirm: true, // Confirmer automatiquement l'email
      user_metadata: {
        business_name: 'Test Business'
      }
    })

    if (createError) throw createError

    // Créer le profil
    if (newUser.user) {
      await supabase.from('user_profiles').insert({
        user_id: newUser.user.id,
        business_name: 'Test Business',
        iban: 'CH1500243243FS1502472', // Votre IBAN
        phone: '+41789306152',
        is_active: true
      })
    }

    res.status(200).json({ 
      success: true,
      message: 'Utilisateur de test créé',
      credentials: {
        email: testEmail,
        password: testPassword
      }
    })

  } catch (error: any) {
    console.error('Erreur:', error)
    res.status(500).json({ error: error.message })
  }
}