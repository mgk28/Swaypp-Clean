import nodemailer from 'nodemailer'

// Installation de nodemailer si pas encore fait
// npm install nodemailer --legacy-peer-deps

// Configuration Infomaniak SMTP
const transporter = nodemailer.createTransporter({
  host: process.env.INFOMANIAK_SMTP_HOST || 'mail.infomaniak.com',
  port: parseInt(process.env.INFOMANIAK_SMTP_PORT) || 587,
  secure: false, // true pour 465, false pour 587
  auth: {
    user: process.env.INFOMANIAK_SMTP_USER,
    pass: process.env.INFOMANIAK_SMTP_PASS
  },
  tls: {
    rejectUnauthorized: false // Pour éviter les erreurs SSL en dev
  }
})

// Test de la configuration
export async function testEmailConfig() {
  try {
    await transporter.verify()
    console.log('✅ Configuration Infomaniak SMTP validée')
    return { success: true, message: 'Configuration email valide' }
  } catch (error) {
    console.error('❌ Erreur configuration SMTP:', error)
    return { success: false, error: error.message }
  }
}

// Envoyer un email de test
export async function sendTestEmail(toEmail) {
  try {
    const info = await transporter.sendMail({
      from: `"${process.env.INFOMANIAK_FROM_NAME || 'Swaypp'}" <${process.env.INFOMANIAK_FROM_EMAIL}>`,
      to: toEmail,
      subject: '🎉 Test Email Swaypp',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #059669, #047857); padding: 2rem; text-align: center;">
            <h1 style="color: white; margin: 0;">Swaypp Email Test</h1>
          </div>
          <div style="padding: 2rem; background: white;">
            <h2>✅ Configuration Email Réussie !</h2>
            <p>Si tu reçois cet email, la configuration Infomaniak fonctionne parfaitement.</p>
            <div style="background: #ecfdf5; padding: 1rem; border-radius: 0.5rem; margin: 1rem 0;">
              <p><strong>Serveur :</strong> ${process.env.INFOMANIAK_SMTP_HOST}</p>
              <p><strong>Port :</strong> ${process.env.INFOMANIAK_SMTP_PORT}</p>
              <p><strong>From :</strong> ${process.env.INFOMANIAK_FROM_EMAIL}</p>
            </div>
          </div>
        </div>
      `
    })

    return { success: true, messageId: info.messageId }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Templates d'emails Swaypp (version complète)
export const EMAIL_TEMPLATES = {
  WELCOME: {
    subject: 'Bienvenue sur Swaypp ! 🎉',
    getHtml: (data) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #059669, #047857); padding: 2rem; text-align: center;">
          <h1 style="color: white; margin: 0;">Bienvenue sur Swaypp</h1>
          <p style="color: #d1fae5; margin: 0.5rem 0 0 0;">La solution de paiement transparente</p>
        </div>
        <div style="padding: 2rem; background: white;">
          <h2>Bonjour ${data.name || 'cher commerçant'} ! 👋</h2>
          <p>Votre compte Swaypp est maintenant actif. Vous pouvez commencer à créer vos QR codes et recevoir 100% de vos revenus.</p>
          
          <div style="background: #ecfdf5; padding: 1rem; border-radius: 0.5rem; margin: 1rem 0;">
            <h3 style="color: #047857; margin: 0 0 0.5rem 0;">🎁 Plan Gratuit activé</h3>
            <ul style="margin: 0; color: #059669;">
              <li>5 QR codes gratuits</li>
              <li>Paiements illimités</li>
              <li>0% commission (clients paient)</li>
            </ul>
          </div>
          
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" 
             style="display: inline-block; background: #059669; color: white; padding: 1rem 2rem; text-decoration: none; border-radius: 0.5rem; margin: 1rem 0;">
            Accéder au Dashboard
          </a>
        </div>
      </div>
    `
  }
}

// Envoyer un email avec template
export async function sendEmail({ to, template, data = {} }) {
  try {
    const emailTemplate = EMAIL_TEMPLATES[template]
    if (!emailTemplate) {
      throw new Error(`Template ${template} non trouvé`)
    }

    const info = await transporter.sendMail({
      from: `"${process.env.INFOMANIAK_FROM_NAME || 'Swaypp'}" <${process.env.INFOMANIAK_FROM_EMAIL}>`,
      to,
      subject: emailTemplate.subject,
      html: emailTemplate.getHtml(data)
    })

    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('Erreur envoi email:', error)
    return { success: false, error: error.message }
  }
}
