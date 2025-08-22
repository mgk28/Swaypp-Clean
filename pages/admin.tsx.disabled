// pages/admin.tsx
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useAuth } from '../hooks/useAuth'
import { supabase } from '../lib/supabase'

export default function AdminPage() {
  const router = useRouter()
  const { user, profile, loading: authLoading, signOut } = useAuth()
  const [activeTab, setActiveTab] = useState('profile')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  
  // Profile data
  const [profileData, setProfileData] = useState({
    businessName: '',
    email: '',
    phone: '',
    website: '',
    description: ''
  })
  
  // Banking data
  const [bankingData, setBankingData] = useState({
    beneficiaryName: '',
    iban: '',
    bankName: '',
    bankAddress: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'CH'
  })
  
  // Payment settings
  const [paymentSettings, setPaymentSettings] = useState({
    acceptTwint: true,
    acceptCard: true,
    acceptApplePay: true,
    acceptGooglePay: false,
    defaultCurrency: 'CHF',
    sendEmailReceipts: true,
    sendSmsReceipts: false
  })
  
  // Notification settings
  const [notifications, setNotifications] = useState({
    emailNewPayment: true,
    emailDailyReport: true,
    emailWeeklyReport: false,
    smsNewPayment: false,
    pushNewPayment: true
  })

  useEffect(() => {
    if (profile) {
      loadUserData()
    }
  }, [profile])

  const loadUserData = async () => {
    if (!profile) return
    
    setProfileData({
      businessName: profile.business_name || '',
      email: user?.email || '',
      phone: profile.phone || '',
      website: profile.website || '',
      description: profile.description || ''
    })
    
    setBankingData({
      beneficiaryName: profile.beneficiary_name || '',
      iban: profile.iban || '',
      bankName: profile.bank_name || '',
      bankAddress: profile.bank_address || '',
      address: profile.address || '',
      city: profile.city || '',
      postalCode: profile.postal_code || '',
      country: profile.country || 'CH'
    })
    
    if (profile.payment_settings) {
      setPaymentSettings(profile.payment_settings)
    }
    
    if (profile.notification_settings) {
      setNotifications(profile.notification_settings)
    }
  }

  const handleSaveProfile = async () => {
    setLoading(true)
    setMessage('')
    
    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({
          business_name: profileData.businessName,
          phone: profileData.phone,
          website: profileData.website,
          description: profileData.description,
          updated_at: new Date().toISOString()
        })
        .eq('id', user?.id)

      if (error) throw error
      
      // Log activity
      await supabase
        .from('activity_logs')
        .insert({
          profile_id: user?.id,
          action: 'profile_updated',
          entity_type: 'profile',
          details: { fields: ['business_name', 'phone', 'website', 'description'] }
        })
      
      setMessage('✅ Profil mis à jour avec succès')
      
      // Rafraîchir après 2 secondes
      setTimeout(() => setMessage(''), 2000)
    } catch (error: any) {
      setMessage('❌ Erreur: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveBanking = async () => {
    setLoading(true)
    setMessage('')
    
    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({
          beneficiary_name: bankingData.beneficiaryName,
          iban: bankingData.iban.replace(/\s/g, ''),
          bank_name: bankingData.bankName,
          bank_address: bankingData.bankAddress,
          address: bankingData.address,
          city: bankingData.city,
          postal_code: bankingData.postalCode,
          country: bankingData.country,
          updated_at: new Date().toISOString()
        })
        .eq('id', user?.id)

      if (error) throw error
      
      await supabase
        .from('activity_logs')
        .insert({
          profile_id: user?.id,
          action: 'banking_updated',
          entity_type: 'profile',
          details: { fields: ['iban', 'bank_name'] }
        })
      
      setMessage('✅ Informations bancaires mises à jour')
      setTimeout(() => setMessage(''), 2000)
    } catch (error: any) {
      setMessage('❌ Erreur: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSavePaymentSettings = async () => {
    setLoading(true)
    setMessage('')
    
    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({
          payment_settings: paymentSettings,
          updated_at: new Date().toISOString()
        })
        .eq('id', user?.id)

      if (error) throw error
      setMessage('✅ Paramètres de paiement mis à jour')
      setTimeout(() => setMessage(''), 2000)
    } catch (error: any) {
      setMessage('❌ Erreur: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveNotifications = async () => {
    setLoading(true)
    setMessage('')
    
    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({
          notification_settings: notifications,
          updated_at: new Date().toISOString()
        })
        .eq('id', user?.id)

      if (error) throw error
      setMessage('✅ Préférences de notification mises à jour')
      setTimeout(() => setMessage(''), 2000)
    } catch (error: any) {
      setMessage('❌ Erreur: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  if (authLoading) return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: '60px',
          height: '60px',
          background: '#10b981',
          borderRadius: '50%',
          margin: '0 auto 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'spin 1s linear infinite'
        }}>
          <span style={{ fontSize: '2rem' }}>⚙️</span>
        </div>
        <p>Chargement...</p>
      </div>
    </div>
  )

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
                Swaypp Admin
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
            <button
              onClick={signOut}
              style={{
                background: '#ef4444',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1.5rem',
                borderRadius: '8px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              Déconnexion
            </button>
          </nav>
        </div>
      </header>

      <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          background: 'white',
          borderRadius: '24px',
          padding: '0',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.05)',
          overflow: 'hidden'
        }}>
          {/* Tabs */}
          <div style={{
            display: 'flex',
            borderBottom: '1px solid #e5e7eb',
            backgroundColor: '#f9fafb'
          }}>
            {[
              { id: 'profile', label: 'Profil', icon: '👤' },
              { id: 'banking', label: 'Coordonnées bancaires', icon: '🏦' },
              { id: 'payments', label: 'Paramètres de paiement', icon: '💳' },
              { id: 'notifications', label: 'Notifications', icon: '🔔' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: 1,
                  padding: '1.5rem',
                  border: 'none',
                  background: activeTab === tab.id ? 'white' : 'transparent',
                  borderBottom: activeTab === tab.id ? '3px solid #10b981' : 'none',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: activeTab === tab.id ? '600' : '500',
                  color: activeTab === tab.id ? '#064e3b' : '#6b7280',
                  transition: 'all 0.2s'
                }}
              >
                <span style={{ marginRight: '0.5rem' }}>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Message */}
          {message && (
            <div style={{
              margin: '2rem',
              padding: '1rem',
              borderRadius: '8px',
              background: message.includes('✅') ? '#d1fae5' : '#fee',
              color: message.includes('✅') ? '#065f46' : '#dc2626',
              textAlign: 'center',
              animation: 'fadeIn 0.3s'
            }}>
              {message}
            </div>
          )}

          {/* Tab Content */}
          <div style={{ padding: '3rem' }}>
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div>
                <h2 style={{ marginBottom: '2rem', color: '#064e3b' }}>
                  Informations du profil
                </h2>
                
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                  <div>
                    <label style={{ 
                      display: 'block',
                      marginBottom: '0.5rem',
                      fontWeight: '500',
                      color: '#374151'
                    }}>
                      Nom du commerce
                    </label>
                    <input
                      type="text"
                      value={profileData.businessName}
                      onChange={(e) => setProfileData({...profileData, businessName: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '2px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'border-color 0.2s'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#10b981'}
                      onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                    />
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ 
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontWeight: '500',
                        color: '#374151'
                      }}>
                        Email
                      </label>
                      <input
                        type="email"
                        value={profileData.email}
                        disabled
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '2px solid #e5e7eb',
                          borderRadius: '8px',
                          fontSize: '1rem',
                          backgroundColor: '#f3f4f6',
                          color: '#6b7280'
                        }}
                      />
                    </div>
                    
                    <div>
                      <label style={{ 
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontWeight: '500',
                        color: '#374151'
                      }}>
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                        placeholder="+41 79 123 45 67"
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '2px solid #e5e7eb',
                          borderRadius: '8px',
                          fontSize: '1rem',
                          outline: 'none',
                          transition: 'border-color 0.2s'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#10b981'}
                        onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label style={{ 
                      display: 'block',
                      marginBottom: '0.5rem',
                      fontWeight: '500',
                      color: '#374151'
                    }}>
                      Site web
                    </label>
                    <input
                      type="url"
                      value={profileData.website}
                      onChange={(e) => setProfileData({...profileData, website: e.target.value})}
                      placeholder="https://monsite.ch"
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '2px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'border-color 0.2s'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#10b981'}
                      onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                    />
                  </div>
                  
                  <div>
                    <label style={{ 
                      display: 'block',
                      marginBottom: '0.5rem',
                      fontWeight: '500',
                      color: '#374151'
                    }}>
                      Description
                    </label>
                    <textarea
                      value={profileData.description}
                      onChange={(e) => setProfileData({...profileData, description: e.target.value})}
                      rows={4}
                      placeholder="Décrivez votre activité..."
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '2px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                        resize: 'vertical'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#10b981'}
                      onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                    />
                  </div>
                  
                  {/* Info plan */}
                  <div style={{
                    background: '#f0fdf4',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    border: '1px solid #10b981'
                  }}>
                    <h3 style={{ color: '#064e3b', marginBottom: '0.5rem' }}>
                      Informations d'abonnement
                    </h3>
                    <p style={{ color: '#047857', margin: '0.5rem 0' }}>
                      <strong>Plan actuel :</strong> {profile?.plan === 'pro' ? 'Pro 🚀' : 'Gratuit'}
                    </p>
                    <p style={{ color: '#047857', margin: '0.5rem 0' }}>
                      <strong>QR codes :</strong> {profile?.qr_codes_used || 0} / {profile?.qr_codes_limit || 5}
                    </p>
                    <p style={{ color: '#047857', margin: '0.5rem 0' }}>
                      <strong>Membre depuis :</strong> {profile?.created_at ? new Date(profile.created_at).toLocaleDateString('fr-CH') : 'N/A'}
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={handleSaveProfile}
                  disabled={loading}
                  style={{
                    marginTop: '2rem',
                    padding: '1rem 2rem',
                    backgroundColor: loading ? '#9ca3af' : '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {loading ? 'Sauvegarde...' : 'Sauvegarder les modifications'}
                </button>
              </div>
            )}

            {/* Banking Tab */}
            {activeTab === 'banking' && (
              <div>
                <h2 style={{ marginBottom: '2rem', color: '#064e3b' }}>
                  Coordonnées bancaires
                </h2>
                
                <div style={{
                  background: '#fef3c7',
                  borderRadius: '12px',
                  padding: '1rem',
                  marginBottom: '2rem',
                  border: '1px solid #fcd34d'
                }}>
                  <p style={{ color: '#92400e', margin: 0 }}>
                    🔒 Vos informations bancaires sont sécurisées et chiffrées selon les standards suisses.
                  </p>
                </div>
                
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                  <div>
                    <label style={{ 
                      display: 'block',
                      marginBottom: '0.5rem',
                      fontWeight: '500',
                      color: '#374151'
                    }}>
                      Nom du bénéficiaire *
                    </label>
                    <input
                      type="text"
                      value={bankingData.beneficiaryName}
                      onChange={(e) => setBankingData({...bankingData, beneficiaryName: e.target.value})}
                      required
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '2px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'border-color 0.2s'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#10b981'}
                      onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                    />
                  </div>
                  
                  <div>
                    <label style={{ 
                      display: 'block',
                      marginBottom: '0.5rem',
                      fontWeight: '500',
                      color: '#374151'
                    }}>
                      IBAN *
                    </label>
                    <input
                      type="text"
                      value={bankingData.iban}
                      onChange={(e) => {
                        const value = e.target.value.toUpperCase()
                        const formatted = value.replace(/\s/g, '').match(/.{1,4}/g)?.join(' ') || value
                        setBankingData({...bankingData, iban: formatted})
                      }}
                      required
                      placeholder="CH00 0000 0000 0000 0000 0"
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '2px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        fontFamily: 'monospace',
                        outline: 'none',
                        transition: 'border-color 0.2s'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#10b981'}
                      onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                    />
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ 
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontWeight: '500',
                        color: '#374151'
                      }}>
                        Banque *
                      </label>
                      <select
                        value={bankingData.bankName}
                        onChange={(e) => setBankingData({...bankingData, bankName: e.target.value})}
                        required
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '2px solid #e5e7eb',
                          borderRadius: '8px',
                          fontSize: '1rem',
                          backgroundColor: 'white',
                          outline: 'none',
                          transition: 'border-color 0.2s',
                          cursor: 'pointer'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#10b981'}
                        onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
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
                        fontWeight: '500',
                        color: '#374151'
                      }}>
                        Ville de la banque
                      </label>
                      <input
                        type="text"
                        value={bankingData.bankAddress}
                        onChange={(e) => setBankingData({...bankingData, bankAddress: e.target.value})}
                        placeholder="Genève"
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '2px solid #e5e7eb',
                          borderRadius: '8px',
                          fontSize: '1rem',
                          outline: 'none',
                          transition: 'border-color 0.2s'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#10b981'}
                        onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                      />
                    </div>
                  </div>
                  
                  <h3 style={{ marginTop: '1rem', color: '#374151' }}>
                    Adresse du bénéficiaire
                  </h3>
                  
                  <div>
                    <label style={{ 
                      display: 'block',
                      marginBottom: '0.5rem',
                      fontWeight: '500',
                      color: '#374151'
                    }}>
                      Adresse *
                    </label>
                    <input
                      type="text"
                      value={bankingData.address}
                      onChange={(e) => setBankingData({...bankingData, address: e.target.value})}
                      required
                      placeholder="Rue du Commerce 12"
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '2px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'border-color 0.2s'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#10b981'}
                      onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                    />
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ 
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontWeight: '500',
                        color: '#374151'
                      }}>
                        Ville *
                      </label>
                      <input
                        type="text"
                        value={bankingData.city}
                        onChange={(e) => setBankingData({...bankingData, city: e.target.value})}
                        required
                        placeholder="Lausanne"
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '2px solid #e5e7eb',
                          borderRadius: '8px',
                          fontSize: '1rem',
                          outline: 'none',
                          transition: 'border-color 0.2s'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#10b981'}
                        onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                      />
                    </div>
                    
                    <div>
                      <label style={{ 
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontWeight: '500',
                        color: '#374151'
                      }}>
                        Code postal *
                      </label>
                      <input
                        type="text"
                        value={bankingData.postalCode}
                        onChange={(e) => setBankingData({...bankingData, postalCode: e.target.value})}
                        required
                        placeholder="1003"
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '2px solid #e5e7eb',
                          borderRadius: '8px',
                          fontSize: '1rem',
                          outline: 'none',
                          transition: 'border-color 0.2s'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#10b981'}
                        onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                      />
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={handleSaveBanking}
                  disabled={loading}
                  style={{
                    marginTop: '2rem',
                    padding: '1rem 2rem',
                    backgroundColor: loading ? '#9ca3af' : '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {loading ? 'Sauvegarde...' : 'Sauvegarder les informations bancaires'}
                </button>
              </div>
            )}

            {/* Payment Settings Tab */}
            {activeTab === 'payments' && (
              <div>
                <h2 style={{ marginBottom: '2rem', color: '#064e3b' }}>
                  Paramètres de paiement
                </h2>
                
                <div style={{ display: 'grid', gap: '2rem' }}>
                  <div>
                    <h3 style={{ marginBottom: '1rem', color: '#374151' }}>
                      Méthodes de paiement acceptées
                    </h3>
                    <div style={{ display: 'grid', gap: '1rem' }}>
                      {[
                        { key: 'acceptTwint', label: 'TWINT', icon: '🇨🇭', recommended: true },
                        { key: 'acceptCard', label: 'Cartes bancaires', icon: '💳', recommended: true },
                        { key: 'acceptApplePay', label: 'Apple Pay', icon: '🍎', recommended: false },
                        { key: 'acceptGooglePay', label: 'Google Pay', icon: '🤖', recommended: false }
                      ].map(method => (
                        <label key={method.key} style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: '1rem',
                          backgroundColor: '#f9fafb',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          transition: 'background-color 0.2s',
                          border: paymentSettings[method.key as keyof typeof paymentSettings] ? '2px solid #10b981' : '2px solid transparent'
                        }}>
                          <input
                            type="checkbox"
                            checked={paymentSettings[method.key as keyof typeof paymentSettings] as boolean}
                            onChange={(e) => setPaymentSettings({
                              ...paymentSettings,
                              [method.key]: e.target.checked
                            })}
                            style={{
                              width: '20px',
                              height: '20px',
                              marginRight: '1rem',
                              cursor: 'pointer',
                              accentColor: '#10b981'
                            }}
                          />
                          <span style={{ fontSize: '1.5rem', marginRight: '0.75rem' }}>
                            {method.icon}
                          </span>
                          <span style={{ fontSize: '1rem', color: '#374151', flex: 1 }}>
                            {method.label}
                          </span>
                          {method.recommended && (
                            <span style={{
                              background: '#10b981',
                              color: 'white',
                              padding: '0.25rem 0.5rem',
                              borderRadius: '4px',
                              fontSize: '0.75rem'
                            }}>
                              Recommandé
                            </span>
                          )}
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 style={{ marginBottom: '1rem', color: '#374151' }}>
                      Paramètres des reçus
                    </h3>
                    <div style={{ display: 'grid', gap: '1rem' }}>
                      <label style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '1rem',
                        backgroundColor: '#f9fafb',
                        borderRadius: '8px',
                        cursor: 'pointer'
                      }}>
                        <input
                          type="checkbox"
                          checked={paymentSettings.sendEmailReceipts}
                          onChange={(e) => setPaymentSettings({
                            ...paymentSettings,
                            sendEmailReceipts: e.target.checked
                          })}
                          style={{
                            width: '20px',
                            height: '20px',
                            marginRight: '1rem',
                            cursor: 'pointer',
                            accentColor: '#10b981'
                          }}
                        />
                        <div style={{ flex: 1 }}>
                          <p style={{ margin: 0, fontWeight: '500' }}>Envoyer les reçus par email</p>
                          <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>
                            Les clients recevront automatiquement un reçu après paiement
                          </p>
                        </div>
                      </label>
                      
                      <label style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '1rem',
                        backgroundColor: '#f9fafb',
                        borderRadius: '8px',
                        cursor: 'pointer'
                      }}>
                        <input
                          type="checkbox"
                          checked={paymentSettings.sendSmsReceipts}
                          onChange={(e) => setPaymentSettings({
                            ...paymentSettings,
                            sendSmsReceipts: e.target.checked
                          })}
                          style={{
                            width: '20px',
                            height: '20px',
                            marginRight: '1rem',
                            cursor: 'pointer',
                            accentColor: '#10b981'
                          }}
                        />
                        <div style={{ flex: 1 }}>
                          <p style={{ margin: 0, fontWeight: '500' }}>Envoyer les reçus par SMS</p>
                          <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>
                            Option premium - 0.10 CHF par SMS
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={handleSavePaymentSettings}
                  disabled={loading}
                  style={{
                    marginTop: '2rem',
                    padding: '1rem 2rem',
                    backgroundColor: loading ? '#9ca3af' : '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {loading ? 'Sauvegarde...' : 'Sauvegarder les paramètres'}
                </button>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div>
                <h2 style={{ marginBottom: '2rem', color: '#064e3b' }}>
                  Préférences de notification
                </h2>
                
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                  <div>
                    <h3 style={{ marginBottom: '1rem', color: '#374151' }}>
                      Notifications par email
                    </h3>
                    <div style={{ display: 'grid', gap: '1rem' }}>
                      {[
                        { key: 'emailNewPayment', label: 'Nouveau paiement reçu', desc: 'Recevez un email à chaque transaction' },
                        { key: 'emailDailyReport', label: 'Rapport journalier', desc: 'Résumé de vos ventes chaque soir' },
                        { key: 'emailWeeklyReport', label: 'Rapport hebdomadaire', desc: 'Analyse détaillée chaque lundi' }
                      ].map(notif => (
                        <label key={notif.key} style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: '1rem',
                          backgroundColor: '#f9fafb',
                          borderRadius: '8px',
                          cursor: 'pointer'
                        }}>
                          <input
                            type="checkbox"
                            checked={notifications[notif.key as keyof typeof notifications]}
                            onChange={(e) => setNotifications({
                              ...notifications,
                              [notif.key]: e.target.checked
                            })}
                            style={{
                              width: '20px',
                              height: '20px',
                              marginRight: '1rem',
                              cursor: 'pointer',
                              accentColor: '#10b981'
                            }}
                          />
                          <div style={{ flex: 1 }}>
                            <p style={{ margin: 0, fontWeight: '500' }}>{notif.label}</p>
                            <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>
                              {notif.desc}
                            </p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 style={{ marginBottom: '1rem', color: '#374151' }}>
                      Autres notifications
                    </h3>
                    <div style={{ display: 'grid', gap: '1rem' }}>
                      <label style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '1rem',
                        backgroundColor: '#f9fafb',
                        borderRadius: '8px',
                        cursor: 'pointer'
                      }}>
                        <input
                          type="checkbox"
                          checked={notifications.smsNewPayment}
                          onChange={(e) => setNotifications({
                            ...notifications,
                            smsNewPayment: e.target.checked
                          })}
                          style={{
                            width: '20px',
                            height: '20px',
                            marginRight: '1rem',
                            cursor: 'pointer',
                            accentColor: '#10b981'
                          }}
                        />
                        <div style={{ flex: 1 }}>
                          <p style={{ margin: 0, fontWeight: '500' }}>SMS pour nouveau paiement</p>
                          <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>
                            Notification instantanée par SMS (0.10 CHF/SMS)
                          </p>
                        </div>
                      </label>
                      
                      <label style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '1rem',
                        backgroundColor: '#f9fafb',
                        borderRadius: '8px',
                        cursor: 'pointer'
                      }}>
                        <input
                          type="checkbox"
                          checked={notifications.pushNewPayment}
                          onChange={(e) => setNotifications({
                            ...notifications,
                            pushNewPayment: e.target.checked
                          })}
                          style={{
                            width: '20px',
                            height: '20px',
                            marginRight: '1rem',
                            cursor: 'pointer',
                            accentColor: '#10b981'
                          }}
                        />
                        <div style={{ flex: 1 }}>
                          <p style={{ margin: 0, fontWeight: '500' }}>Notifications push</p>
                          <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>
                            Notifications en temps réel sur votre téléphone
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={handleSaveNotifications}
                  disabled={loading}
                  style={{
                    marginTop: '2rem',
                    padding: '1rem 2rem',
                    backgroundColor: loading ? '#9ca3af' : '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {loading ? 'Sauvegarde...' : 'Sauvegarder les préférences'}
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}