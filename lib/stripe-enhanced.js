import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
})

// Configuration TWINT via Stripe
export const PAYMENT_METHODS = {
  CARD: 'card',
  TWINT: 'twint',
  APPLE_PAY: 'apple_pay',
  GOOGLE_PAY: 'google_pay'
}

// Créer un PaymentIntent avec TWINT support
export async function createPaymentIntent({
  amount,
  currency = 'chf',
  customerId,
  qrCodeId,
  paymentMethods = ['card', 'twint'],
  metadata = {}
}) {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount), // Stripe veut des entiers
      currency: currency.toLowerCase(),
      customer: customerId,
      payment_method_types: paymentMethods,
      metadata: {
        qr_code_id: qrCodeId,
        app: 'swaypp',
        ...metadata
      },
      // Configuration pour TWINT
      payment_method_options: {
        twint: {
          confirmation_method: 'automatic'
        }
      }
    })

    return { success: true, paymentIntent }
  } catch (error) {
    console.error('Erreur création PaymentIntent:', error)
    return { success: false, error: error.message }
  }
}

// Récupérer les méthodes de paiement disponibles pour la Suisse
export function getAvailablePaymentMethods() {
  return [
    {
      id: 'card',
      name: 'Carte bancaire',
      icon: '💳',
      description: 'Visa, Mastercard, American Express'
    },
    {
      id: 'twint',
      name: 'TWINT',
      icon: '📱',
      description: 'Paiement mobile suisse'
    },
    {
      id: 'apple_pay',
      name: 'Apple Pay',
      icon: '🍎',
      description: 'Paiement rapide Apple'
    },
    {
      id: 'google_pay',
      name: 'Google Pay',
      icon: '🎯',
      description: 'Paiement rapide Google'
    }
  ]
}

// Plans d'abonnement Swaypp
export const SWAYPP_PLANS = {
  FREE: {
    id: 'free',
    name: 'Gratuit',
    price: 0,
    qr_limit: 5,
    features: [
      '5 QR codes gratuits',
      'Paiements illimités',
      'Analytics de base',
      'Commission 0% (clients paient)'
    ]
  },
  PRO: {
    id: 'pro',
    name: 'Pro',
    price: 29,
    qr_limit: -1, // Illimité
    stripe_price_id: 'price_1RoWHM3JI3KbtIUWpro29chf', // À créer dans Stripe
    features: [
      'QR codes illimités',
      'Paiement instantané',
      'Logo personnalisé',
      'Analytics avancés',
      'Support prioritaire'
    ]
  }
}

export { stripe }
