// pages/api/transactions/create.ts
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
    const {
      userId,
      amount,
      currency = 'CHF',
      description,
      qrCodeData,
      paymentMethod = 'swiss_qr'
    } = req.body

    // Créer la transaction
    const { data: transaction, error } = await supabase
      .from('transactions')
      .insert({
        user_id: userId,
        amount: amount,
        currency: currency,
        status: 'pending',
        payment_method: paymentMethod,
        description: description,
        qr_code_data: qrCodeData,
        metadata: {
          timestamp: new Date().toISOString(),
          source: 'qr_code'
        }
      })
      .select()
      .single()

    if (error) throw error

    res.status(201).json({ 
      success: true,
      transaction: transaction
    })

  } catch (error: any) {
    console.error('Erreur création transaction:', error)
    res.status(500).json({ 
      error: 'Erreur lors de la création de la transaction',
      details: error.message 
    })
  }
}