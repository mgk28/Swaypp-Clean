// pages/pricing.tsx
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function PricingPage() {
  const router = useRouter()
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')

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
          <Link href="/dashboard" style={{ textDecoration: 'none' }}>
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
            </div>
          </Link>
          
          <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <Link href="/dashboard" style={{ 
              textDecoration: 'none', 
              color: '#374151',
              fontWeight: '500'
            }}>
              ← Retour au Dashboard
            </Link>
          </nav>
        </div>
      </header>

      <main style={{ padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Title */}
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h1 style={{
              fontSize: '3rem',
              fontWeight: 'bold',
              color: '#064e3b',
              marginBottom: '1rem'
            }}>
              Choisissez votre plan
            </h1>
            <p style={{
              fontSize: '1.25rem',
              color: '#6b7280'
            }}>
              Commencez gratuitement, évoluez selon vos besoins
            </p>
          </div>

          {/* Billing Toggle */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '4rem'
          }}>
            <div style={{
              background: 'white',
              padding: '0.5rem',
              borderRadius: '12px',
              display: 'flex',
              gap: '0.5rem',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)'
            }}>
              <button
                onClick={() => setBillingCycle('monthly')}
                style={{
                  padding: '0.75rem 2rem',
                  borderRadius: '8px',
                  border: 'none',
                  background: billingCycle === 'monthly' ? '#10b981' : 'transparent',
                  color: billingCycle === 'monthly' ? 'white' : '#6b7280',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                Mensuel
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                style={{
                  padding: '0.75rem 2rem',
                  borderRadius: '8px',
                  border: 'none',
                  background: billingCycle === 'yearly' ? '#10b981' : 'transparent',
                  color: billingCycle === 'yearly' ? 'white' : '#6b7280',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  position: 'relative'
                }}
              >
                Annuel
                {billingCycle === 'yearly' && (
                  <span style={{
                    position: 'absolute',
                    top: '-10px',
                    right: '-10px',
                    background: '#ef4444',
                    color: 'white',
                    fontSize: '0.75rem',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px'
                  }}>
                    -20%
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2rem',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            {/* Free Plan */}
            <div style={{
              background: 'white',
              borderRadius: '24px',
              padding: '3rem',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.05)',
              position: 'relative'
            }}>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#064e3b',
                marginBottom: '1rem'
              }}>
                Gratuit
              </h3>
              <div style={{ marginBottom: '2rem' }}>
                <span style={{
                  fontSize: '3rem',
                  fontWeight: 'bold',
                  color: '#064e3b'
                }}>
                  0
                </span>
                <span style={{
                  fontSize: '1.5rem',
                  color: '#6b7280',
                  marginLeft: '0.5rem'
                }}>
                  CHF
                </span>
              </div>
              <p style={{
                color: '#6b7280',
                marginBottom: '2rem'
              }}>
                Parfait pour commencer
              </p>
              
              <ul style={{
                listStyle: 'none',
                padding: 0,
                marginBottom: '2rem'
              }}>
                <li style={{
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}>
                  <span style={{ color: '#10b981', fontSize: '1.25rem' }}>✓</span>
                  <span>5 QR codes personnalisés</span>
                </li>
                <li style={{
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}>
                  <span style={{ color: '#10b981', fontSize: '1.25rem' }}>✓</span>
                  <span>0% de commission</span>
                </li>
                <li style={{
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}>
                  <span style={{ color: '#10b981', fontSize: '1.25rem' }}>✓</span>
                  <span>Dashboard basique</span>
                </li>
                <li style={{
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  opacity: 0.5
                }}>
                  <span style={{ color: '#6b7280', fontSize: '1.25rem' }}>✗</span>
                  <span>Support prioritaire</span>
                </li>
              </ul>
              
              <button
                style={{
                  width: '100%',
                  padding: '1rem',
                  background: 'white',
                  color: '#064e3b',
                  border: '2px solid #10b981',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Plan actuel
              </button>
            </div>

            {/* Pro Plan */}
            <div style={{
              background: 'linear-gradient(135deg, #064e3b 0%, #047857 100%)',
              borderRadius: '24px',
              padding: '3rem',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
              position: 'relative',
              color: 'white'
            }}>
              <div style={{
                position: 'absolute',
                top: '-15px',
                right: '30px',
                background: '#10b981',
                color: 'white',
                padding: '0.5rem 1.5rem',
                borderRadius: '20px',
                fontSize: '0.875rem',
                fontWeight: '600'
              }}>
                POPULAIRE
              </div>
              
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                marginBottom: '1rem'
              }}>
                Pro
              </h3>
              <div style={{ marginBottom: '2rem' }}>
                <span style={{
                  fontSize: '3rem',
                  fontWeight: 'bold'
                }}>
                  {billingCycle === 'monthly' ? '29' : '23'}
                </span>
                <span style={{
                  fontSize: '1.5rem',
                  marginLeft: '0.5rem',
                  opacity: 0.9
                }}>
                  CHF/mois
                </span>
              </div>
              <p style={{
                opacity: 0.9,
                marginBottom: '2rem'
              }}>
                Pour les commerçants ambitieux
              </p>
              
              <ul style={{
                listStyle: 'none',
                padding: 0,
                marginBottom: '2rem'
              }}>
                <li style={{
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}>
                  <span style={{ fontSize: '1.25rem' }}>✓</span>
                  <span>QR codes illimités</span>
                </li>
                <li style={{
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}>
                  <span style={{ fontSize: '1.25rem' }}>✓</span>
                  <span>0% de commission</span>
                </li>
                <li style={{
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}>
                  <span style={{ fontSize: '1.25rem' }}>✓</span>
                  <span>Analytics avancés</span>
                </li>
                <li style={{
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}>
                  <span style={{ fontSize: '1.25rem' }}>✓</span>
                  <span>Support prioritaire 24/7</span>
                </li>
                <li style={{
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}>
                  <span style={{ fontSize: '1.25rem' }}>✓</span>
                  <span>Export des données</span>
                </li>
              </ul>
              
              <button
                onClick={() => router.push('/auth/signup?plan=pro')}
                style={{
                  width: '100%',
                  padding: '1rem',
                  background: 'white',
                  color: '#064e3b',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                Passer au Pro
              </button>
            </div>
          </div>

          {/* FAQ */}
          <div style={{
            marginTop: '6rem',
            maxWidth: '800px',
            margin: '6rem auto 0'
          }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: '#064e3b',
              textAlign: 'center',
              marginBottom: '3rem'
            }}>
              Questions fréquentes
            </h2>
            
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '2rem',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
            }}>
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: '#064e3b',
                  marginBottom: '0.5rem'
                }}>
                  Comment fonctionne la période gratuite ?
                </h3>
                <p style={{ color: '#6b7280' }}>
                  Vous pouvez créer jusqu'à 5 QR codes gratuitement, sans limite de temps. 
                  Si vous avez besoin de plus, passez au plan Pro.
                </p>
              </div>
              
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: '#064e3b',
                  marginBottom: '0.5rem'
                }}>
                  Puis-je annuler à tout moment ?
                </h3>
                <p style={{ color: '#6b7280' }}>
                  Oui, vous pouvez annuler votre abonnement Pro à tout moment. 
                  Vos QR codes existants continueront de fonctionner.
                </p>
              </div>
              
              <div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: '#064e3b',
                  marginBottom: '0.5rem'
                }}>
                  Y a-t-il vraiment 0% de commission ?
                </h3>
                <p style={{ color: '#6b7280' }}>
                  Absolument ! Vous recevez 100% de vos paiements. 
                  Les frais de traitement sont payés par vos clients de manière transparente.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}