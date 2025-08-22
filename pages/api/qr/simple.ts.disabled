// pages/api/qr/simple.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import QRCode from 'qrcode'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const {
      amount,
      currency = 'CHF',
      message,
      userId // ID de l'utilisateur pour récupérer ses infos
    } = req.body

    // Récupérer les informations du profil utilisateur
    let profileData = null
    if (userId) {
      console.log('Recherche du profil pour userId:', userId)
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', userId)
        .single()
      
      if (error) {
        console.error('Erreur récupération profil:', error)
      } else {
        console.log('Profil trouvé:', data)
      }
      
      profileData = data
    } else {
      console.log('Pas de userId fourni')
    }

    // TEMPORAIRE : Forcer l'utilisation de vos données
    // À enlever une fois que tout fonctionne
    if (!profileData || !profileData.beneficiary_name) {
      console.log('Utilisation des données par défaut pour Maria Petronio')
      profileData = {
        beneficiary_name: 'Maria Petronio',
        business_name: 'NexaHolding',
        iban: 'CH1500243243FS1502472',
        address: 'Ch des Fleurs de lys 5b',
        city: 'Orbe',
        postal_code: '1350'
      }
    }

    // Utiliser les infos du profil ou les valeurs par défaut
    const creditorName = profileData?.beneficiary_name || profileData?.business_name || 'Maria Petronio'
    const creditorAddress = profileData?.address || 'Ch des Fleurs de lys 5b'
    const creditorPostalCode = profileData?.postal_code || '1350'
    const creditorCity = profileData?.city || 'Orbe'
    const iban = profileData?.iban || 'CH1500243243FS1502472'
    
    console.log('Données utilisées pour le QR:', {
      creditorName,
      creditorAddress,
      creditorPostalCode,
      creditorCity,
      iban
    })

    // Format Swiss QR Code data selon la spécification ISO 20022
    // IMPORTANT: Pas de référence QRR sans accord bancaire spécifique
    const qrData = [
      'SPC', // Swiss Payments Code
      '0200', // Version
      '1', // Coding Type (1 = UTF-8)
      iban.replace(/\s/g, ''), // IBAN sans espaces
      'S', // Address Type (S = Structured)
      creditorName, // Nom du bénéficiaire
      creditorAddress, // Adresse ligne 1
      '', // Adresse ligne 2 (vide)
      creditorPostalCode, // Code postal SEUL
      creditorCity, // Ville SEULE
      'CH', // Pays
      '', // Vide (Ultimate Creditor)
      '', '', '', '', '', '', // 7 champs vides
      amount ? amount.toFixed(2) : '', // Montant
      currency, // Devise
      '', // Ultimate Debtor fields (7 vides)
      '', '', '', '', '', '',
      'NON', // Type de référence: NON = sans référence
      '', // Pas de référence
      message || 'Paiement Swaypp', // Message non structuré
      'EPD', // Trailer
      '' // Info additionnelle
    ].join('\n')

    // Générer le QR code
    const qrCodeDataUrl = await QRCode.toDataURL(qrData, {
      errorCorrectionLevel: 'M',
      type: 'image/png',
      width: 300,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    })

    res.status(200).json({ 
      success: true,
      qrCode: qrCodeDataUrl,
      data: {
        amount,
        currency,
        beneficiary: creditorName,
        iban: iban,
        message
      }
    })

    // Créer une transaction en arrière-plan (sans bloquer la réponse)
    if (userId && amount) {
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
      fetch(`${baseUrl}/api/transactions/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          amount,
          currency,
          description: message,
          qrCodeData: qrData.substring(0, 500) // Limiter la taille
        })
      })
      .then(res => res.json())
      .then(data => console.log('Transaction créée:', data))
      .catch(err => console.error('Erreur création transaction:', err))
    }

  } catch (error: any) {
    console.error('Erreur génération QR:', error)
    res.status(500).json({ 
      error: 'Erreur lors de la génération du QR code',
      details: error.message 
    })
  }
}