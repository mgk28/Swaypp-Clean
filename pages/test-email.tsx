// pages/test-email.tsx
import { useState } from 'react'

export default function TestEmailPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const sendTestEmail = async () => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch('/api/test-email', {
        method: 'POST',
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Erreur lors de l\'envoi')
      } else {
        setResult(data)
      }
    } catch (err) {
      setError('Erreur de connexion')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Test d'envoi d'email</h1>
      
      <button 
        onClick={sendTestEmail}
        disabled={loading}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: loading ? '#ccc' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Envoi en cours...' : 'Envoyer un email de test'}
      </button>

      {error && (
        <div style={{ 
          marginTop: '1rem', 
          padding: '1rem', 
          backgroundColor: '#f8d7da', 
          color: '#721c24',
          borderRadius: '5px'
        }}>
          <strong>Erreur:</strong> {JSON.stringify(error, null, 2)}
        </div>
      )}

      {result && (
        <div style={{ 
          marginTop: '1rem', 
          padding: '1rem', 
          backgroundColor: '#d4edda', 
          color: '#155724',
          borderRadius: '5px'
        }}>
          <strong>Succès!</strong>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}

      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
        <h3>Configuration actuelle:</h3>
        <ul>
          <li>Email d'envoi: admin@swaypp.ch</li>
          <li>Email de réception: maria28@me.com</li>
          <li>Service: Resend</li>
        </ul>
      </div>
    </div>
  )
}