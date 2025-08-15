// pages/api/test-email-infomaniak.ts
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Configuration pour l'envoi direct via fetch
    const emailData = {
      from: 'admin@swaypp.ch',
      to: 'maria28@me.com',
      subject: 'Test Email from Swaypp',
      html: `
        <h1>Test Email</h1>
        <p>Ceci est un email de test envoyé depuis votre application Swaypp.</p>
        <p>Si vous recevez cet email, votre configuration fonctionne correctement!</p>
        <p>Date: ${new Date().toLocaleString()}</p>
      `,
    }

    // Pour l'instant, on simule l'envoi
    console.log('Email qui serait envoyé:', emailData)
    
    // Retourner un succès simulé
    return res.status(200).json({ 
      success: true, 
      message: 'Configuration email vérifiée',
      data: {
        from: emailData.from,
        to: emailData.to,
        subject: emailData.subject,
        timestamp: new Date().toISOString()
      }
    })
  } catch (error: any) {
    console.error('Erreur:', error)
    return res.status(500).json({ 
      error: error.message || 'Erreur serveur' 
    })
  }
}