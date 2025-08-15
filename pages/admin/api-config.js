import { useState, useEffect } from 'react'
import Head from 'next/head'

export default function ApiConfig() {
  const [configs, setConfigs] = useState({})
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  // APIs nécessaires pour Swaypp
  const requiredApis = [
    {
      name: 'stripe',
      label: 'Stripe Payments',
      description: 'Pour traiter les paiements par carte',
      fields: [
        { key: 'secret_key', label: 'Secret Key', type: 'password' },
        { key: 'publishable_key', label: 'Publishable Key', type: 'text' },
        { key: 'webhook_secret', label: 'Webhook Secret', type: 'password' }
      ]
    },
    {
      name: 'twint',
      label: 'TWINT',
      description: 'Pour accepter les paiements TWINT',
      fields: [
        { key: 'merchant_id', label: 'Merchant ID', type: 'text' },
        { key: 'api_key', label: 'API Key', type: 'password' },
        { key: 'sandbox_mode', label: 'Mode Sandbox', type: 'checkbox' }
      ]
    },
    {
      name: 'swiss_qr',
      label: 'Swiss QR Generator',
      description: 'Pour générer les QR codes IBAN suisses',
      fields: [
        { key: 'api_key', label: 'API Key', type: 'password' },
        { key: 'endpoint', label: 'Endpoint URL', type: 'text' }
      ]
    },
    {
      name: 'email',
      label: 'Email Service (Resend)',
      description: 'Pour envoyer les emails transactionnels',
      fields: [
        { key: 'api_key', label: 'Resend API Key', type: 'password' },
        { key: 'from_email', label: 'From Email', type: 'email' }
      ]
    },
    {
      name: 'sms',
      label: 'SMS Service (Optionnel)',
      description: 'Pour notifications SMS',
      fields: [
        { key: 'api_key', label: 'SMS API Key', type: 'password' },
        { key: 'sender_id', label: 'Sender ID', type: 'text' }
      ]
    }
  ]

  const saveApiConfig = async (serviceName, config) => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/api-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ serviceName, config })
      })
      
      if (response.ok) {
        setMessage(`✅ Configuration ${serviceName} sauvegardée`)
        loadConfigs()
      } else {
        setMessage(`❌ Erreur lors de la sauvegarde`)
      }
    } catch (error) {
      setMessage(`❌ Erreur: ${error.message}`)
    }
    setLoading(false)
  }

  const loadConfigs = async () => {
    try {
      const response = await fetch('/api/admin/api-config')
      if (response.ok) {
        const data = await response.json()
        setConfigs(data)
      }
    } catch (error) {
      console.error('Erreur chargement configs:', error)
    }
  }

  const testApiConnection = async (serviceName) => {
    try {
      const response = await fetch(`/api/admin/test-api/${serviceName}`, {
        method: 'POST'
      })
      const result = await response.json()
      setMessage(result.success ? `✅ ${serviceName} connecté` : `❌ ${serviceName} erreur: ${result.error}`)
    } catch (error) {
      setMessage(`❌ Test échoué: ${error.message}`)
    }
  }

  useEffect(() => {
    loadConfigs()
  }, [])

  return (
    <>
      <Head>
        <title>Configuration APIs - Swaypp Admin</title>
      </Head>

      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #ecfdf5 0%, #ffffff 50%, #f0fdfa 100%)',
        padding: '2rem'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* Header */}
          <div style={{ marginBottom: '2rem' }}>
            <h1 style={{ 
              fontSize: '2.5rem', 
              fontWeight: 'bold', 
              color: '#1e293b',
              marginBottom: '0.5rem'
            }}>
              Configuration APIs Swaypp
            </h1>
            <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>
              Configurez toutes vos intégrations depuis cette interface sécurisée
            </p>
          </div>

          {/* Message de statut */}
          {message && (
            <div style={{
              background: message.includes('✅') ? '#d1fae5' : '#fecaca',
              color: message.includes('✅') ? '#047857' : '#dc2626',
              padding: '1rem',
              borderRadius: '0.5rem',
              marginBottom: '1.5rem',
              border: `1px solid ${message.includes('✅') ? '#a7f3d0' : '#fca5a5'}`
            }}>
              {message}
            </div>
          )}

          {/* Grille des APIs */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
            gap: '2rem' 
          }}>
            {requiredApis.map((api) => (
              <div key={api.name} style={{
                background: 'white',
                borderRadius: '1rem',
                padding: '1.5rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e5e7eb'
              }}>
                
                {/* Header de l'API */}
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1e293b' }}>
                      {api.label}
                    </h3>
                    <div style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: configs[api.name]?.is_active ? '#10b981' : '#ef4444'
                    }} />
                  </div>
                  <p style={{ color: '#6b7280', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                    {api.description}
                  </p>
                </div>

                {/* Formulaire de configuration */}
                <form onSubmit={(e) => {
                  e.preventDefault()
                  const formData = new FormData(e.target)
                  const config = {}
                  api.fields.forEach(field => {
                    if (field.type === 'checkbox') {
                      config[field.key] = formData.get(`${api.name}_${field.key}`) === 'on'
                    } else {
                      config[field.key] = formData.get(`${api.name}_${field.key}`)
                    }
                  })
                  saveApiConfig(api.name, config)
                }}>
                  
                  {api.fields.map((field) => (
                    <div key={field.key} style={{ marginBottom: '1rem' }}>
                      <label style={{ 
                        display: 'block', 
                        fontSize: '0.875rem', 
                        fontWeight: '500', 
                        color: '#374151',
                        marginBottom: '0.25rem'
                      }}>
                        {field.label}
                      </label>
                      
                      {field.type === 'checkbox' ? (
                        <input
                          type="checkbox"
                          name={`${api.name}_${field.key}`}
                          defaultChecked={configs[api.name]?.[field.key] || false}
                          style={{
                            width: '1rem',
                            height: '1rem',
                            accentColor: '#059669'
                          }}
                        />
                      ) : (
                        <input
                          type={field.type}
                          name={`${api.name}_${field.key}`}
                          defaultValue={configs[api.name]?.[field.key] || ''}
                          placeholder={`Votre ${field.label}`}
                          style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '1px solid #d1d5db',
                            borderRadius: '0.5rem',
                            fontSize: '0.875rem'
                          }}
                        />
                      )}
                    </div>
                  ))}

                  {/* Boutons d'action */}
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem' }}>
                    <button
                      type="submit"
                      disabled={loading}
                      style={{
                        flex: 1,
                        background: 'linear-gradient(135deg, #059669, #047857)',
                        color: 'white',
                        padding: '0.75rem',
                        borderRadius: '0.5rem',
                        border: 'none',
                        fontWeight: '600',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        opacity: loading ? 0.5 : 1
                      }}
                    >
                      {loading ? 'Sauvegarde...' : 'Sauvegarder'}
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => testApiConnection(api.name)}
                      style={{
                        background: '#f3f4f6',
                        color: '#374151',
                        padding: '0.75rem',
                        borderRadius: '0.5rem',
                        border: '1px solid #d1d5db',
                        fontWeight: '500',
                        cursor: 'pointer'
                      }}
                    >
                      Test
                    </button>
                  </div>
                </form>
              </div>
            ))}
          </div>

          {/* Instructions */}
          <div style={{
            background: 'white',
            borderRadius: '1rem',
            padding: '1.5rem',
            marginTop: '2rem',
            border: '1px solid #e5e7eb'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1e293b', marginBottom: '1rem' }}>
              📋 Instructions
            </h3>
            <div style={{ color: '#6b7280', lineHeight: '1.6' }}>
              <p><strong>1. Stripe :</strong> Créez un compte sur stripe.com et récupérez vos clés API</p>
              <p><strong>2. TWINT :</strong> Contactez TWINT pour obtenir un compte marchand</p>
              <p><strong>3. Swiss QR :</strong> Service pour générer les QR codes IBAN suisses</p>
              <p><strong>4. Email :</strong> Créez un compte sur resend.com pour les emails</p>
              <p style={{ marginTop: '1rem', padding: '1rem', background: '#f3f4f6', borderRadius: '0.5rem' }}>
                💡 <strong>Sécurité :</strong> Toutes les clés API sont chiffrées et stockées de manière sécurisée
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
