import { buffer } from 'micro'
import Stripe from 'stripe'
import { supabaseAdmin } from '../../../lib/supabase'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const buf = await buffer(req)
  const sig = req.headers['stripe-signature']

  let event

  try {
    event = stripe.webhooks.constructEvent(buf, sig, endpointSecret)
  } catch (err) {
    console.log(`Webhook signature verification failed.`, err.message)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  // Traitement des événements Stripe
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object
      
      // Mettre à jour la transaction dans Supabase
      await supabaseAdmin
        .from('transactions')
        .update({ 
          status: 'succeeded',
          paid_at: new Date().toISOString()
        })
        .eq('stripe_payment_intent_id', paymentIntent.id)
      
      console.log(`Paiement réussi: ${paymentIntent.id}`)
      break

    case 'subscription.updated':
      const subscription = event.data.object
      
      // Mettre à jour l'abonnement
      await supabaseAdmin
        .from('subscriptions')
        .update({
          status: subscription.status,
          current_period_end: new Date(subscription.current_period_end * 1000).toISOString()
        })
        .eq('stripe_subscription_id', subscription.id)
      
      break

    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  res.json({ received: true })
}
