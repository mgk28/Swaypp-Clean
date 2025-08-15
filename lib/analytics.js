import posthog from 'posthog-js'

// Initialisation PostHog
export function initAnalytics() {
  if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.posthog.com',
      // Configuration pour la Suisse (GDPR compliant)
      opt_out_capturing_by_default: false,
      capture_pageview: false, // On gère manuellement
      disable_session_recording: false,
      autocapture: false // Capture manuelle pour plus de contrôle
    })
  }
}

// Événements Swaypp
export const EVENTS = {
  // Authentification
  USER_SIGNED_UP: 'user_signed_up',
  USER_SIGNED_IN: 'user_signed_in',
  
  // QR Codes
  QR_CODE_CREATED: 'qr_code_created',
  QR_CODE_SCANNED: 'qr_code_scanned',
  
  // Paiements
  PAYMENT_INITIATED: 'payment_initiated',
  PAYMENT_COMPLETED: 'payment_completed',
  PAYMENT_FAILED: 'payment_failed',
  
  // Abonnements
  SUBSCRIPTION_STARTED: 'subscription_started',
  SUBSCRIPTION_UPGRADED: 'subscription_upgraded',
  
  // Pages
  PAGE_VIEWED: 'page_viewed',
  FEATURE_USED: 'feature_used'
}

// Tracker un événement
export function trackEvent(eventName, properties = {}) {
  if (typeof window !== 'undefined' && posthog.__loaded) {
    posthog.capture(eventName, {
      ...properties,
      app: 'swaypp',
      timestamp: new Date().toISOString()
    })
  }
}

// Identifier un utilisateur
export function identifyUser(userId, traits = {}) {
  if (typeof window !== 'undefined' && posthog.__loaded) {
    posthog.identify(userId, {
      ...traits,
      app: 'swaypp'
    })
  }
}

// Tracker une page vue
export function trackPageView(pageName, properties = {}) {
  trackEvent(EVENTS.PAGE_VIEWED, {
    page: pageName,
    ...properties
  })
}

// Métriques business Swaypp
export function trackQRCodeCreated(qrCodeData) {
  trackEvent(EVENTS.QR_CODE_CREATED, {
    qr_type: qrCodeData.type,
    amount: qrCodeData.amount,
    user_plan: qrCodeData.userPlan
  })
}

export function trackPaymentCompleted(paymentData) {
  trackEvent(EVENTS.PAYMENT_COMPLETED, {
    amount: paymentData.amount,
    currency: paymentData.currency,
    payment_method: paymentData.paymentMethod,
    qr_code_id: paymentData.qrCodeId
  })
}
