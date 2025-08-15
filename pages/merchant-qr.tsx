// pages/merchant-qr.tsx
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function MerchantQRInterface() {
  const router = useRouter()
  const [mode, setMode] = useState<'static' | 'dynamic'>('dynamic')
  const [loading, setLoading] = useState(false)
  const [qrCode, setQrCode] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  
  // Form data
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  
  // Static QR settings
  const [staticAmount, setStaticAmount] = useState('50.00')
  const [staticDescription, setStaticDescription] = useState('Paiement Swaypp')
  const [savedStaticQR, setSavedStaticQR] = useState<string | null>(null)

  // Load saved static QR from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('merchantStaticQR')
    if (saved) {
      const { qr, amount, description } = JSON.parse(saved)
      setSavedStaticQR(qr)
      setStaticAmount(amount)
      setStaticDescription(description)
    }
  }, [])

  const generateQR = async (isStatic: boolean = false) => {
    setLoading(true)
    setError(null)
    setQrCode(null)

    const currentAmount = isStatic ? staticAmount : amount
    const currentDescription = isStatic ? staticDescription : description

    if (!currentAmount) {
      setError('Veuillez entrer un montant')
      setLoading(false)
      return
    }

    // Récupérer l'ID utilisateur
    const userData = localStorage.getItem('swaypp_user')
    const user = userData ? JSON.parse(userData) : null

    try {
      const response = await fetch('/api/qr/simple', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: parseFloat(currentAmount),
          currency: 'CHF',
          message: currentDescription || 'Paiement Swaypp',
          userId: user?.id // Envoyer l'ID utilisateur
        })
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Erreur lors de la génération')
      } else {
        if (isStatic) {
          // Save static QR to localStorage
          const toSave = {
            qr: data.qrCode,
            amount: currentAmount,
            description: currentDescription
          }
          localStorage.setItem('merchantStaticQR', JSON.stringify(toSave))
          setSavedStaticQR(data.qrCode)
        } else {
          setQrCode(data.qrCode)
        }
      }
    } catch (err) {
      setError('Erreur de connexion')
    } finally {
      setLoading(false)
    }
  }

  const printQR = (qrCodeData: string) => {
    const printWindow = window.open('', '', 'width=600,height=600')
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>QR Code Swaypp</title>
            <style>
              body { 
                text-align: center; 
                font-family: Arial, sans-serif;
                padding: 20px;
              }
              img { 
                max-width: 400px; 
                margin: 20px auto;
              }
              h2 { color: #059669; }
              .info { 
                margin: 20px 0;
                font-size: 18px;
              }
            </style>
          </head>
          <body>
            <h2>QR Code de Paiement Swaypp</h2>
            <img src="${qrCodeData}" alt="QR Code" />
            <div class="info">
              ${mode === 'static' ? 
                `<p><strong>Montant fixe:</strong> CHF ${staticAmount}</p>` :
                `<p><strong>Montant:</strong> CHF ${amount}</p>`
              }
            </div>
            <script>window.print(); window.close();</script>
          </body>
        </html>
      `)
    }
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>, isStatic: boolean = false) => {
    const value = e.target.value
    // Permettre uniquement les nombres avec max 2 décimales
    if (/^\d*\.?\d{0,2}$/.test(value) || value === '') {
      if (isStatic) {
        setStaticAmount(value)
      } else {
        setAmount(value)
      }
    }
  }

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)'
    }}>
      {/* Header */}
      <header style={{
        background: 'rgba(255, 255, 255, 0.8)',
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

      <main style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '24px',
          padding: '3rem',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.05)',
          marginBottom: '2rem'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#064e3b',
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            🏪 Génération de QR Code
          </h1>
          <p style={{
            textAlign: 'center',
            color: '#6b7280',
            fontSize: '1.1rem',
            marginBottom: '2rem'
          }}>
            Créez des QR codes pour recevoir des paiements instantanément
          </p>

          {/* Mode Selection */}
          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            marginBottom: '3rem',
            padding: '0.5rem',
            background: '#f3f4f6',
            borderRadius: '16px'
          }}>
            <button
              onClick={() => setMode('dynamic')}
              style={{
                flex: 1,
                padding: '1.25rem',
                fontSize: '1rem',
                backgroundColor: mode === 'dynamic' ? '#10b981' : 'transparent',
                color: mode === 'dynamic' ? 'white' : '#374151',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.3s',
                fontWeight: '600'
              }}
            >
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>💳</div>
              QR Dynamique
              <div style={{ fontSize: '0.875rem', marginTop: '0.25rem', opacity: 0.9 }}>
                Montant variable
              </div>
            </button>
            
            <button
              onClick={() => setMode('static')}
              style={{
                flex: 1,
                padding: '1.25rem',
                fontSize: '1rem',
                backgroundColor: mode === 'static' ? '#10b981' : 'transparent',
                color: mode === 'static' ? 'white' : '#374151',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.3s',
                fontWeight: '600'
              }}
            >
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🏷️</div>
              QR Statique
              <div style={{ fontSize: '0.875rem', marginTop: '0.25rem', opacity: 0.9 }}>
                Montant fixe
              </div>
            </button>
          </div>

          {/* Dynamic QR Mode */}
          {mode === 'dynamic' && (
            <div>
              <div style={{ marginBottom: '2rem' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.75rem', 
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#064e3b'
                }}>
                  Montant à encaisser (CHF):
                </label>
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => handleAmountChange(e)}
                  placeholder="0.00"
                  style={{
                    width: '100%',
                    padding: '1.25rem',
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    border: '3px solid #10b981',
                    borderRadius: '16px',
                    textAlign: 'center',
                    outline: 'none',
                    transition: 'all 0.3s',
                    background: 'white'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#059669'}
                  onBlur={(e) => e.target.style.borderColor = '#10b981'}
                />
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.75rem',
                  fontSize: '1rem',
                  fontWeight: '500',
                  color: '#374151'
                }}>
                  Description (optionnel):
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ex: Table 5, Commande #123..."
                  style={{
                    width: '100%',
                    padding: '1rem',
                    fontSize: '1rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    outline: 'none',
                    transition: 'all 0.3s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#10b981'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>

              <button 
                onClick={() => generateQR(false)}
                disabled={loading || !amount}
                style={{
                  width: '100%',
                  padding: '1.25rem',
                  fontSize: '1.25rem',
                  backgroundColor: loading || !amount ? '#9ca3af' : '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '16px',
                  cursor: loading || !amount ? 'not-allowed' : 'pointer',
                  fontWeight: 'bold',
                  transition: 'all 0.3s',
                  boxShadow: loading || !amount ? 'none' : '0 4px 15px rgba(16, 185, 129, 0.3)'
                }}
              >
                {loading ? '⏳ Génération...' : '✨ Générer le QR Code'}
              </button>
            </div>
          )}

          {/* Static QR Mode */}
          {mode === 'static' && !savedStaticQR && (
            <div>
              <div style={{ marginBottom: '2rem' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.75rem', 
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#064e3b'
                }}>
                  Montant fixe (CHF):
                </label>
                <input
                  type="text"
                  value={staticAmount}
                  onChange={(e) => handleAmountChange(e, true)}
                  placeholder="0.00"
                  style={{
                    width: '100%',
                    padding: '1.25rem',
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    border: '3px solid #10b981',
                    borderRadius: '16px',
                    textAlign: 'center',
                    outline: 'none',
                    transition: 'all 0.3s'
                  }}
                />
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.75rem',
                  fontSize: '1rem',
                  fontWeight: '500',
                  color: '#374151'
                }}>
                  Description du produit/service:
                </label>
                <input
                  type="text"
                  value={staticDescription}
                  onChange={(e) => setStaticDescription(e.target.value)}
                  placeholder="Ex: Menu du jour, Café, etc."
                  style={{
                    width: '100%',
                    padding: '1rem',
                    fontSize: '1rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    outline: 'none'
                  }}
                />
              </div>

              <button 
                onClick={() => generateQR(true)}
                disabled={loading || !staticAmount}
                style={{
                  width: '100%',
                  padding: '1.25rem',
                  fontSize: '1.25rem',
                  backgroundColor: loading || !staticAmount ? '#9ca3af' : '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '16px',
                  cursor: loading || !staticAmount ? 'not-allowed' : 'pointer',
                  fontWeight: 'bold',
                  transition: 'all 0.3s'
                }}
              >
                {loading ? '⏳ Création...' : '📱 Créer mon QR Code fixe'}
              </button>
            </div>
          )}

          {/* Saved Static QR */}
          {mode === 'static' && savedStaticQR && (
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ color: '#064e3b', marginBottom: '1.5rem' }}>
                Votre QR Code fixe est prêt !
              </h3>
              <div style={{
                background: 'white',
                borderRadius: '16px',
                padding: '2rem',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                marginBottom: '2rem'
              }}>
                <img 
                  src={savedStaticQR} 
                  alt="QR Code statique" 
                  style={{ 
                    maxWidth: '250px',
                    margin: '0 auto'
                  }}
                />
                <div style={{ marginTop: '1.5rem', fontSize: '1.1rem' }}>
                  <p><strong>Montant:</strong> CHF {staticAmount}</p>
                  <p style={{ color: '#6b7280' }}>{staticDescription}</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  onClick={() => printQR(savedStaticQR)}
                  style={{
                    flex: 1,
                    padding: '1rem',
                    backgroundColor: '#6b7280',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: '600'
                  }}
                >
                  🖨️ Imprimer
                </button>
                <button
                  onClick={() => {
                    setSavedStaticQR(null)
                    localStorage.removeItem('merchantStaticQR')
                  }}
                  style={{
                    flex: 1,
                    padding: '1rem',
                    backgroundColor: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: '600'
                  }}
                >
                  🔄 Nouveau QR
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Error display */}
        {error && (
          <div style={{ 
            padding: '1.5rem', 
            backgroundColor: '#fee2e2', 
            color: '#dc2626',
            borderRadius: '12px',
            marginBottom: '2rem',
            textAlign: 'center',
            fontWeight: '500'
          }}>
            <strong>Erreur:</strong> {error}
          </div>
        )}

        {/* Dynamic QR Result */}
        {qrCode && mode === 'dynamic' && (
          <div style={{ 
            textAlign: 'center',
            padding: '3rem',
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '24px',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.05)'
          }}>
            <h3 style={{ 
              fontSize: '1.75rem',
              color: '#064e3b',
              marginBottom: '2rem'
            }}>
              ✅ QR Code prêt à scanner !
            </h3>
            <div style={{
              background: 'white',
              display: 'inline-block',
              padding: '2rem',
              borderRadius: '16px',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
            }}>
              <img 
                src={qrCode} 
                alt="QR Code" 
                style={{ 
                  width: '300px',
                  height: '300px'
                }}
              />
            </div>
            <div style={{ 
              marginTop: '2rem', 
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#10b981'
            }}>
              Montant à payer: CHF {amount}
            </div>
            {description && (
              <p style={{ 
                color: '#6b7280',
                fontSize: '1.1rem',
                marginTop: '0.5rem'
              }}>
                {description}
              </p>
            )}
            <button
              onClick={() => printQR(qrCode)}
              style={{
                marginTop: '2rem',
                padding: '1rem 2rem',
                backgroundColor: '#6b7280',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '600'
              }}
            >
              🖨️ Imprimer le ticket
            </button>
          </div>
        )}
      </main>
    </div>
  )
}