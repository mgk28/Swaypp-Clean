// pages/terms.tsx
import Link from 'next/link'

export default function TermsPage() {
  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)'
    }}>
      {/* Header */}
      <header style={{
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        padding: '1rem 2rem',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: '#10b981',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.5rem'
              }}>
                💸
              </div>
              <h1 style={{ 
                fontSize: '1.5rem',
                fontWeight: 'bold',
                margin: 0,
                color: '#064e3b'
              }}>
                Swaypp
              </h1>
              <span style={{ 
                fontSize: '0.875rem',
                color: '#6b7280'
              }}>
                The Swiss Payment App
              </span>
            </div>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main style={{ 
        padding: '4rem 2rem',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '24px',
          padding: '3rem',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.05)'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#064e3b',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            Conditions Générales d'Utilisation (CGU)
          </h1>

          <p style={{
            fontSize: '1.25rem',
            color: '#374151',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            Bienvenue sur SWAYPP – The Swiss Payment App 🇨🇭
          </p>

          <p style={{
            color: '#6b7280',
            marginBottom: '3rem',
            textAlign: 'center'
          }}>
            En utilisant notre plateforme, vous acceptez les conditions suivantes :
          </p>

          {/* Section 1 */}
          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#064e3b',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span style={{
                width: '32px',
                height: '32px',
                background: '#10b981',
                color: 'white',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.875rem',
                fontWeight: 'bold'
              }}>
                1
              </span>
              Fonctionnement du service
            </h2>
            <ul style={{
              listStyle: 'none',
              padding: '0',
              marginLeft: '2.5rem'
            }}>
              <li style={{ marginBottom: '0.75rem', color: '#374151' }}>
                • Vous pouvez générer gratuitement jusqu'à <strong>5 QR personnalisés</strong>.
              </li>
              <li style={{ marginBottom: '0.75rem', color: '#374151' }}>
                • Au-delà, l'accès illimité est disponible via un <strong>abonnement mensuel de 29 CHF</strong>.
              </li>
              <li style={{ color: '#374151' }}>
                • Les paiements sont gérés par <strong>Stripe</strong>. Les frais sont <strong>à la charge de vos clients</strong> (aucune commission pour vous).
              </li>
            </ul>
          </div>

          {/* Section 2 */}
          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#064e3b',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span style={{
                width: '32px',
                height: '32px',
                background: '#10b981',
                color: 'white',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.875rem',
                fontWeight: 'bold'
              }}>
                2
              </span>
              Données et sécurité
            </h2>
            <ul style={{
              listStyle: 'none',
              padding: '0',
              marginLeft: '2.5rem'
            }}>
              <li style={{ marginBottom: '0.75rem', color: '#374151' }}>
                • Vos données sont stockées en Suisse, chez Infomaniak.
              </li>
              <li style={{ marginBottom: '0.75rem', color: '#374151' }}>
                • SWAYPP est conforme au <strong>RGPD</strong>.
              </li>
              <li style={{ color: '#374151' }}>
                • Vos informations ne seront jamais revendues.
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#064e3b',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span style={{
                width: '32px',
                height: '32px',
                background: '#10b981',
                color: 'white',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.875rem',
                fontWeight: 'bold'
              }}>
                3
              </span>
              Responsabilité
            </h2>
            <ul style={{
              listStyle: 'none',
              padding: '0',
              marginLeft: '2.5rem'
            }}>
              <li style={{ marginBottom: '0.75rem', color: '#374151' }}>
                • Vous êtes responsable de l'usage de votre compte.
              </li>
              <li style={{ color: '#374151' }}>
                • En cas d'activité frauduleuse, nous nous réservons le droit de suspendre votre accès.
              </li>
            </ul>
          </div>

          {/* Section 4 */}
          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#064e3b',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span style={{
                width: '32px',
                height: '32px',
                background: '#10b981',
                color: 'white',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.875rem',
                fontWeight: 'bold'
              }}>
                4
              </span>
              Assistance
            </h2>
            <p style={{
              marginLeft: '2.5rem',
              color: '#374151'
            }}>
              • Vous pouvez nous contacter à tout moment via : <a href="mailto:info@swaypp.ch" style={{ color: '#10b981', textDecoration: 'none' }}><strong>support@swaypp.ch</strong></a>
            </p>
          </div>

          {/* Footer */}
          <div style={{
            marginTop: '4rem',
            paddingTop: '2rem',
            borderTop: '2px solid #e5e7eb',
            textAlign: 'center',
            color: '#6b7280',
            fontSize: '0.875rem'
          }}>
            <p>Version 1.0 – Mise à jour : Juillet 2025</p>
          </div>

          {/* Back button */}
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link href="/" style={{
              display: 'inline-block',
              padding: '1rem 2rem',
              background: '#10b981',
              color: 'white',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              transition: 'all 0.2s'
            }}>
              ← Retour à l'accueil
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}