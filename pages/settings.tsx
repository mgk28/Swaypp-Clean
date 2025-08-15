// pages/settings.tsx
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function SettingsPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState({
    businessName: '',
    beneficiaryName: '',
    iban: '',
    address: '',
    city: '',
    postalCode: '',
    bankName: '',
    bankAddress: '',
    phone: '',
    email: ''
  })

  useEffect(() => {
    // Vérifier l'authentification
    const userData = localStorage.getItem('swaypp_user')
    if (!userData) {
      router.push('/auth/signin')
      return
    }
    const parsed = JSON.parse(userData)
    setUser(parsed)
    
    // Charger les données existantes
    loadUserProfile(parsed.id)
  }, [router])

  const loadUserProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (data) {
      setFormData({
        businessName: data.business_name || '',
        beneficiaryName: data.beneficiary_name || '',
        iban: data.iban || '',
        address: data.address || '',
        city: data.city || '',
        postalCode: data.postal_code || '',
        bankName: data.bank_name || '',
        bankAddress: data.bank_address || '',
        phone: data.phone || '',
        email: user?.email || ''
      })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    if (name === 'iban') {
      // Formater l'IBAN
      const cleaned = value.replace(/\s/g, '').toUpperCase()
      const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned
      setFormData({ ...formData, [name]: formatted })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({
          business_name: formData.businessName,
          beneficiary_name: formData.beneficiaryName,
          iban: formData.iban.replace(/\s/g, ''),
          address: formData.address,
          city: formData.city,
          postal_code: formData.postalCode,
          bank_name: formData.bankName,
          bank_address: formData.bankAddress,
          phone: formData.phone,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id)

      if (error) throw error

      // Mettre à jour le localStorage
      const updatedUser = {
        ...user,
        businessName: formData.businessName,
        iban: formData.iban
      }
      localStorage.setItem('swaypp_user', JSON.stringify(updatedUser))

      setMessage('✅ Paramètres sauvegardés avec succès !')
    } catch (error: any) {
      setMessage('❌ Erreur : ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  if (!user) return <div>Chargement...</div>

  return (
    <div style={{ 
      minHeight: '100vh',
      background: '#f0fdf4'
    }}>
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
            <h1 style={{ 
              fontSize: '1.5rem',
              fontWeight: 'bold',
              margin: 0
            }}>
              Swaypp
            </h1>
          </div>
          
          <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <Link href="/dashboard" style={{ 
              textDecoration: 'none', 
              color: '#374151',
              fontWeight: '500'
            }}>
              Dashboard
            </Link>
            <Link href="/merchant-qr" style={{ 
              textDecoration: 'none', 
              color: '#374151',
              fontWeight: '500'
            }}>
              QR Codes
            </Link>
            <Link href="/settings" style={{ 
              textDecoration: 'none', 
              color: '#10b981',
              fontWeight: '500'
            }}>
              Paramètres
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ padding: '3rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 'bold',
          color: '#064e3b',
          marginBottom: '2rem'
        }}>
          Paramètres du compte
        </h1>

        {message && (
          <div style={{
            padding: '1rem',
            marginBottom: '2rem',
            borderRadius: '8px',
            background: message.includes('✅') ? '#d1fae5' : '#fee',
            color: message.includes('✅') ? '#065f46' : '#dc2626'
          }}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Informations commerciales */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '2rem',
            marginBottom: '2rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
          }}>
            <h2 style={{ 
              fontSize: '1.5rem',
              color: '#374151',
              marginBottom: '1.5rem'
            }}>
              Informations commerciales
            </h2>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ 
                display: 'block',
                marginBottom: '0.5rem',
                color: '#374151',
                fontWeight: '500'
              }}>
                Nom du commerce *
              </label>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ 
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: '#374151',
                  fontWeight: '500'
                }}>
                  Téléphone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div>
                <label style={{ 
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: '#374151',
                  fontWeight: '500'
                }}>
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  disabled
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    background: '#f3f4f6',
                    color: '#6b7280'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Informations bancaires */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '2rem',
            marginBottom: '2rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
          }}>
            <h2 style={{ 
              fontSize: '1.5rem',
              color: '#374151',
              marginBottom: '1.5rem'
            }}>
              Informations bancaires
            </h2>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ 
                display: 'block',
                marginBottom: '0.5rem',
                color: '#374151',
                fontWeight: '500'
              }}>
                Nom du bénéficiaire (titulaire du compte) *
              </label>
              <input
                type="text"
                name="beneficiaryName"
                value={formData.beneficiaryName}
                onChange={handleChange}
                required
                placeholder="Maria Petronio"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ 
                display: 'block',
                marginBottom: '0.5rem',
                color: '#374151',
                fontWeight: '500'
              }}>
                IBAN *
              </label>
              <input
                type="text"
                name="iban"
                value={formData.iban}
                onChange={handleChange}
                required
                placeholder="CH00 0000 0000 0000 0000 0"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontFamily: 'monospace'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ 
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: '#374151',
                  fontWeight: '500'
                }}>
                  Nom de la banque *
                </label>
                <select
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    background: 'white'
                  }}
                >
                  <option value="">Sélectionnez...</option>
                  <option value="UBS">UBS</option>
                  <option value="Credit Suisse">Credit Suisse</option>
                  <option value="PostFinance">PostFinance</option>
                  <option value="Raiffeisen">Raiffeisen</option>
                  <option value="BCV">BCV</option>
                  <option value="ZKB">ZKB</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>

              <div>
                <label style={{ 
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: '#374151',
                  fontWeight: '500'
                }}>
                  Adresse de la banque
                </label>
                <input
                  type="text"
                  name="bankAddress"
                  value={formData.bankAddress}
                  onChange={handleChange}
                  placeholder="Ville de la banque"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                />
              </div>
            </div>

            <h3 style={{ 
              fontSize: '1.25rem',
              color: '#374151',
              marginBottom: '1rem',
              marginTop: '2rem'
            }}>
              Adresse du bénéficiaire
            </h3>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ 
                display: 'block',
                marginBottom: '0.5rem',
                color: '#374151',
                fontWeight: '500'
              }}>
                Adresse *
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                placeholder="Rue et numéro"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ 
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: '#374151',
                  fontWeight: '500'
                }}>
                  Ville *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div>
                <label style={{ 
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: '#374151',
                  fontWeight: '500'
                }}>
                  Code postal *
                </label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '1rem',
              background: loading ? '#9ca3af' : '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {loading ? 'Sauvegarde...' : 'Sauvegarder les paramètres'}
          </button>
        </form>
      </main>
    </div>
  )
}