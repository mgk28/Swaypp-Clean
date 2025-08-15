import { qrGenerator } from '../../../lib/qr-swiss-generator'
import { supabaseAdmin } from '../../../lib/supabase'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const {
      userId,
      name,
      amount,
      type = 'fixed',
      iban,
      recipientName,
      recipientAddress,
      recipientCity,
      recipientZip,
      message = '',
      reference = ''
    } = req.body

    // Validation
    if (!userId || !name) {
      return res.status(400).json({ error: 'userId et name requis' })
    }

    // Vérifier les limites utilisateur
    const { data: user, error: userError } = await supabaseAdmin
      .from('user_profiles')
      .select('qr_codes_used, qr_codes_limit, plan')
      .eq('id', userId)
      .single()

    if (userError || !user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' })
    }

    if (user.plan === 'free' && user.qr_codes_used >= user.qr_codes_limit) {
      return res.status(403).json({ 
        error: 'Limite de QR codes atteinte',
        upgrade_required: true 
      })
    }

    // Générer QR Code
    const qrResult = await qrGenerator.generateQRCode({
      iban: iban || qrGenerator.generateTestIBAN(),
      amount,
      recipientName: recipientName || 'Swaypp Merchant',
      recipientAddress: recipientAddress || 'Rue de la Paix 1',
      recipientCity: recipientCity || 'Genève',
      recipientZip: recipientZip || '1200',
      message,
      reference
    })

    if (!qrResult.success) {
      return res.status(500).json({ error: qrResult.error })
    }

    // Sauvegarder en base
    const { data: qrCode, error: insertError } = await supabaseAdmin
      .from('qr_codes')
      .insert({
        user_id: userId,
        name,
        amount: amount ? Math.round(parseFloat(amount) * 100) : null, // En centimes
        type,
        qr_data: qrResult.qrData,
        qr_image_url: qrResult.qrImage,
        qr_format: 'swiss_qr_iban',
        status: 'active'
      })
      .select()
      .single()

    if (insertError) {
      return res.status(500).json({ error: insertError.message })
    }

    // Incrémenter le compteur
    await supabaseAdmin
      .from('user_profiles')
      .update({ qr_codes_used: user.qr_codes_used + 1 })
      .eq('id', userId)

    res.status(200).json({
      success: true,
      qrCode: {
        id: qrCode.id,
        name: qrCode.name,
        amount: qrCode.amount,
        qr_image: qrResult.qrImage,
        qr_data: qrResult.qrData
      }
    })

  } catch (error) {
    console.error('Erreur génération QR:', error)
    res.status(500).json({ error: 'Erreur interne serveur' })
  }
}
