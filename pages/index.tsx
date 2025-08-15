// pages/index.tsx
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function LandingPage() {
  const router = useRouter()
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  
  const testimonials = [
    {
      name: "Emilie R.",
      title: "Fleuriste à Lausanne",
      testimonial: "Grâce à SWAYPP, mes clients paient en un scan et moi je garde 100 % du montant. Et tout ça gratuitement ? C'est incroyable."
    },
    {
      name: "Karim D.",
      title: "Épicier de quartier à Genève",
      testimonial: "Avant, je perdais des CHF en commissions. Maintenant, avec SWAYPP, mes marges sont sauvées. Et le dashboard est hyper simple !"
    },
    {
      name: "Sophie M.",
      title: "Coach à Neuchâtel",
      testimonial: "J'ai commencé avec les 5 QR gratuits, j'ai vite souscrit l'abo à 29.- pour le côté pro. C'est beau, rapide et suisse. J'adore."
    }
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#f0fdf4' }}>
      {/* Header */}
      <header style={{
        background: 'white',
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
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
            <div>
              <h1 style={{ 
                fontSize: '1.5rem',
                fontWeight: 'bold',
                margin: 0
              }}>
                Swaypp
              </h1>
              <p style={{
                fontSize: '0.75rem',
                color: '#6b7280',
                margin: 0
              }}>
                The Swiss Payment App – 100% pour les commerçants. 0% commission.
              </p>
            </div>
          </div>
          
          <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <Link href="#fonctionnalites" style={{ textDecoration: 'none', color: '#374151' }}>
              Fonctionnalités
            </Link>
            <Link href="#tarifs" style={{ textDecoration: 'none', color: '#374151' }}>
              Tarifs
            </Link>
            <Link href="/terms" style={{ textDecoration: 'none', color: '#374151' }}>
              CGU
            </Link>
            <button
              onClick={() => router.push('/auth/signin')}
              style={{
                background: '#10b981',
                color: 'white',
                padding: '0.5rem 1.5rem',
                borderRadius: '8px',
                border: 'none',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              Se connecter
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{
        padding: '5rem 2rem',
        background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
        borderRadius: '0 0 50px 50px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            display: 'inline-block',
            background: '#fef3c7',
            color: '#92400e',
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            fontSize: '0.875rem',
            fontWeight: '500',
            marginBottom: '2rem'
          }}>
            ⭐ Solution #1 où les clients paient les commissions
          </div>
          
          <h2 style={{
            fontSize: '4rem',
            fontWeight: 'bold',
            color: '#064e3b',
            marginBottom: '1.5rem',
            lineHeight: '1.1'
          }}>
            Recevez <span style={{ color: '#10b981' }}>100%</span> de<br />
            vos revenus
          </h2>
          
          <p style={{
            fontSize: '1.5rem',
            color: '#047857',
            marginBottom: '3rem',
            maxWidth: '800px',
            margin: '0 auto 3rem'
          }}>
            La première solution de paiement où <strong>vos clients paient les commissions</strong>. 
            Transparent, équitable, et conçu pour les commerçants suisses qui méritent plus.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button
              onClick={() => router.push('/auth/signup')}
              style={{
                background: '#10b981',
                color: 'white',
                padding: '1rem 2rem',
                borderRadius: '8px',
                border: 'none',
                fontSize: '1.125rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              ⚡ Commencer gratuitement
            </button>
            <button
              style={{
                background: 'white',
                color: '#374151',
                padding: '1rem 2rem',
                borderRadius: '8px',
                border: '2px solid #e5e7eb',
                fontSize: '1.125rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              ▶️ Voir la démo (2 min)
            </button>
          </div>
          
          <div style={{
            marginTop: '3rem',
            display: 'flex',
            gap: '3rem',
            justifyContent: 'center',
            fontSize: '0.875rem',
            color: '#374151'
          }}>
            <span>🏛️ Conforme standards suisses</span>
            <span>👥 +1'200 commerçants</span>
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section style={{ padding: '5rem 2rem', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            color: '#064e3b',
            textAlign: 'center',
            marginBottom: '4rem'
          }}>
            Comment ça marche ?
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '3rem'
          }}>
            {/* Étape 1 */}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                fontSize: '2rem',
                color: 'white',
                boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)'
              }}>
                📱
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#064e3b', marginBottom: '1rem' }}>
                Étape 1
              </h3>
              <p style={{ color: '#6b7280', fontSize: '1.125rem' }}>
                Le client scanne votre QR code personnalisé avec son app bancaire
              </p>
            </div>
            
            {/* Étape 2 */}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                fontSize: '2rem',
                color: 'white',
                boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)'
              }}>
                💳
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#064e3b', marginBottom: '1rem' }}>
                Étape 2
              </h3>
              <p style={{ color: '#6b7280', fontSize: '1.125rem' }}>
                Paiement sécurisé via Stripe. Vous recevez 100% du montant
              </p>
            </div>
            
            {/* Étape 3 */}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                fontSize: '2rem',
                color: 'white',
                boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)'
              }}>
                ✨
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#064e3b', marginBottom: '1rem' }}>
                Étape 3
              </h3>
              <p style={{ color: '#6b7280', fontSize: '1.125rem' }}>
                5 QR gratuits, puis abonnement Pro à 29 CHF/mois pour un usage illimité
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Exemple QR */}
      <section style={{ padding: '5rem 2rem', background: '#f9fafb' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
            alignItems: 'center'
          }}>
            <div>
              <h2 style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                color: '#064e3b',
                marginBottom: '2rem'
              }}>
                QR Code personnalisé à votre image
              </h2>
              <p style={{
                fontSize: '1.25rem',
                color: '#6b7280',
                marginBottom: '2rem',
                lineHeight: '1.8'
              }}>
                Voici un exemple de QR Bill Pro généré via SWAYPP – 100% personnalisé à votre image.
              </p>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ color: '#10b981', fontSize: '1.5rem' }}>✓</span>
                  <span style={{ fontSize: '1.125rem', color: '#374151' }}>Votre logo intégré</span>
                </li>
                <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ color: '#10b981', fontSize: '1.5rem' }}>✓</span>
                  <span style={{ fontSize: '1.125rem', color: '#374151' }}>Montant personnalisable</span>
                </li>
                <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ color: '#10b981', fontSize: '1.5rem' }}>✓</span>
                  <span style={{ fontSize: '1.125rem', color: '#374151' }}>Message personnalisé</span>
                </li>
              </ul>
            </div>
            <div style={{
              background: 'white',
              padding: '3rem',
              borderRadius: '24px',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.1)',
              textAlign: 'center'
            }}>
              <div style={{
                width: '300px',
                height: '300px',
                background: '#f3f4f6',
                margin: '0 auto',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '8rem',
                color: '#10b981'
              }}>
                📱
              </div>
              <p style={{ marginTop: '2rem', color: '#6b7280' }}>
                Exemple de QR Code personnalisé
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section style={{ padding: '5rem 2rem', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            color: '#064e3b',
            textAlign: 'center',
            marginBottom: '4rem'
          }}>
            Ce que disent nos commerçants
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2rem'
          }}>
            {testimonials.map((testimonial, index) => (
              <div key={index} style={{
                background: '#f9fafb',
                padding: '2rem',
                borderRadius: '16px',
                position: 'relative'
              }}>
                <div style={{
                  fontSize: '3rem',
                  color: '#10b981',
                  marginBottom: '1rem',
                  opacity: 0.3
                }}>
                  "
                </div>
                <p style={{
                  fontSize: '1.125rem',
                  color: '#374151',
                  marginBottom: '2rem',
                  lineHeight: '1.8'
                }}>
                  {testimonial.testimonial}
                </p>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    background: '#10b981',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold'
                  }}>
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <p style={{ fontWeight: '600', color: '#064e3b' }}>
                      {testimonial.name}
                    </p>
                    <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                      {testimonial.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Réassurance */}
      <section style={{ padding: '5rem 2rem', background: '#f9fafb' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '2rem'
          }}>
            <div style={{
              textAlign: 'center',
              padding: '2rem',
              background: 'white',
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🇨🇭</div>
              <h3 style={{ fontWeight: '600', color: '#064e3b', marginBottom: '0.5rem' }}>
                100% Suisse
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                Développé et hébergé en Suisse
              </p>
            </div>
            
            <div style={{
              textAlign: 'center',
              padding: '2rem',
              background: 'white',
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
              <h3 style={{ fontWeight: '600', color: '#064e3b', marginBottom: '0.5rem' }}>
                Paiements sécurisés
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                Sécurisé par Stripe
              </p>
            </div>
            
            <div style={{
              textAlign: 'center',
              padding: '2rem',
              background: 'white',
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔒</div>
              <h3 style={{ fontWeight: '600', color: '#064e3b', marginBottom: '0.5rem' }}>
                Conforme RGPD
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                Vos données sont protégées
              </p>
            </div>
            
            <div style={{
              textAlign: 'center',
              padding: '2rem',
              background: 'white',
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📈</div>
              <h3 style={{ fontWeight: '600', color: '#064e3b', marginBottom: '0.5rem' }}>
                Pour commerçants
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                Exclusivement en Suisse
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section style={{
        padding: '5rem 2rem',
        background: 'linear-gradient(135deg, #064e3b 0%, #047857 100%)',
        color: 'white'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            marginBottom: '2rem'
          }}>
            Prêt à garder 100% de vos revenus ?
          </h2>
          <p style={{
            fontSize: '1.5rem',
            marginBottom: '3rem',
            opacity: 0.9
          }}>
            Rejoignez +1'200 commerçants suisses qui ont choisi la transparence
          </p>
          <button
            onClick={() => router.push('/auth/signup')}
            style={{
              background: 'white',
              color: '#064e3b',
              padding: '1.25rem 3rem',
              borderRadius: '8px',
              border: 'none',
              fontSize: '1.25rem',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
            }}
          >
            Commencer gratuitement →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: '#1f2937',
        color: 'white',
        padding: '3rem 2rem'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '3rem'
        }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Swaypp</h3>
            <p style={{ opacity: 0.7, fontSize: '0.875rem' }}>
              The Swiss Payment App
            </p>
          </div>
          <div>
            <h4 style={{ marginBottom: '1rem' }}>Produit</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link href="#" style={{ color: 'white', textDecoration: 'none', opacity: 0.7 }}>
                  Fonctionnalités
                </Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link href="#" style={{ color: 'white', textDecoration: 'none', opacity: 0.7 }}>
                  Tarifs
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 style={{ marginBottom: '1rem' }}>Légal</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link href="/terms" style={{ color: 'white', textDecoration: 'none', opacity: 0.7 }}>
                  CGU
                </Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link href="#" style={{ color: 'white', textDecoration: 'none', opacity: 0.7 }}>
                  Confidentialité
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 style={{ marginBottom: '1rem' }}>Contact</h4>
            <p style={{ opacity: 0.7, fontSize: '0.875rem' }}>
              support@swaypp.ch
            </p>
          </div>
        </div>
        <div style={{
          marginTop: '3rem',
          paddingTop: '2rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          textAlign: 'center',
          opacity: 0.7
        }}>
          © 2025 Swaypp. Tous droits réservés. Fait avec ❤️ en Suisse
        </div>
      </footer>
    </div>
  )
}