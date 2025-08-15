// pages/api/test-email.ts
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Vérifier que Resend est installé
    const { Resend } = await import('resend')
    
    // Vérifier la clé API
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      return res.status(500).json({ 
        error: 'RESEND_API_KEY manquante dans .env.local' 
      })
    }
    
    // Initialiser Resend
    const resend = new Resend(apiKey)
    
    // Envoyer l'email
    const { data, error } = await resend.emails.send({
      from: 'admin@swaypp.ch',
      to: 'maria28@me.com',
      subject: 'Test Email from Swaypp',
      html: `
        <h1>Test Email</h1>
        <p>Ceci est un email de test envoyé depuis votre application Swaypp.</p>
        <p>Si vous recevez cet email, votre configuration fonctionne correctement!</p>
        <p>Date: ${new Date().toLocaleString()}</p>
      `,
    })

    if (error) {
      console.error('Erreur Resend:', error)
      return res.status(400).json({ error })
    }

    console.log('Email envoyé avec succès:', data)
    return res.status(200).json({ success: true, data })
  } catch (error: any) {
    console.error('Erreur serveur:', error)
    return res.status(500).json({ 
      error: error.message || 'Erreur serveur' 
    })
  }
}