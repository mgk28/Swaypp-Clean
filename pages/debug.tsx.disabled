// pages/debug.tsx
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function DebugPage() {
  const [results, setResults] = useState<any>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    runTests()
  }, [])

  const runTests = async () => {
    setLoading(true)
    const testResults: any = {}

    // Test 1: Connexion basique
    try {
      const { data, error } = await supabase.auth.getSession()
      testResults.session = {
        success: !error,
        data: data?.session ? 'Session active' : 'Pas de session',
        error: error?.message
      }
    } catch (e: any) {
      testResults.session = { success: false, error: e.message }
    }

    // Test 2: Utilisateur actuel
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      testResults.user = {
        success: !error && !!user,
        data: user ? `Connecté: ${user.email}` : 'Non connecté',
        error: error?.message
      }

      if (user) {
        // Test 3: Profil utilisateur
        try {
          const { data: profile, error: profileError } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('id', user.id)
            .single()
          
          testResults.profile = {
            success: !profileError && !!profile,
            data: profile ? `Plan: ${profile.plan}, QR: ${profile.qr_codes_used}/${profile.qr_codes_limit}` : 'Pas de profil',
            error: profileError?.message
          }
        } catch (e: any) {
          testResults.profile = { success: false, error: e.message }
        }

        // Test 4: QR Codes
        try {
          const { data: qrCodes, error: qrError } = await supabase
            .from('qr_codes')
            .select('count')
            .eq('user_id', user.id)
          
          testResults.qrCodes = {
            success: !qrError,
            data: `${qrCodes?.[0]?.count || 0} QR codes trouvés`,
            error: qrError?.message
          }
        } catch (e: any) {
          testResults.qrCodes = { success: false, error: e.message }
        }

        // Test 5: Transactions
        try {
          const { data: transactions, error: transError } = await supabase
            .from('transactions')
            .select('count')
            .eq('user_id', user.id)
          
          testResults.transactions = {
            success: !transError,
            data: `${transactions?.[0]?.count || 0} transactions trouvées`,
            error: transError?.message
          }
        } catch (e: any) {
          testResults.transactions = { success: false, error: e.message }
        }
      }
    } catch (e: any) {
      testResults.user = { success: false, error: e.message }
    }

    // Test 6: Variables d'environnement
    testResults.env = {
      success: true,
      data: {
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Configuré' : '❌ Manquant',
        supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Configuré' : '❌ Manquant',
        serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ Configuré' : '❌ Manquant'
      }
    }

    setResults(testResults)
    setLoading(false)
  }

  const signInTest = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: 'test@example.com',
        password: 'test123456'
      })
      
      if (error) {
        alert(`Erreur connexion: ${error.message}`)
      } else {
        alert('Connexion réussie!')
        runTests()
      }
    } catch (e: any) {
      alert(`Erreur: ${e.message}`)
    }
  }

  const signOutTest = async () => {
    await supabase.auth.signOut()
    runTests()
  }

  return (
    <div style={{
      minHeight: '100vh',
      padding: '2rem',
      background: '#f3f4f6'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '16px',
        padding: '2rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          marginBottom: '2rem',
          color: '#111827'
        }}>
          🔍 Debug Supabase Connection
        </h1>

        {loading ? (
          <p>Chargement des tests...</p>
        ) : (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {Object.entries(results).map(([key, value]: [string, any]) => (
              <div
                key={key}
                style={{
                  padding: '1rem',
                  borderRadius: '8px',
                  border: `2px solid ${value.success ? '#10b981' : '#ef4444'}`,
                  background: value.success ? '#f0fdf4' : '#fef2f2'
                }}
              >
                <h3 style={{
                  fontWeight: '600',
                  marginBottom: '0.5rem',
                  color: value.success ? '#064e3b' : '#7f1d1d'
                }}>
                  {key.toUpperCase()}
                </h3>
                {typeof value.data === 'object' ? (
                  <pre style={{ fontSize: '0.875rem', margin: 0 }}>
                    {JSON.stringify(value.data, null, 2)}
                  </pre>
                ) : (
                  <p style={{ margin: 0 }}>{value.data}</p>
                )}
                {value.error && (
                  <p style={{
                    color: '#dc2626',
                    fontSize: '0.875rem',
                    marginTop: '0.5rem'
                  }}>
                    Erreur: {value.error}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        <div style={{
          marginTop: '2rem',
          display: 'flex',
          gap: '1rem'
        }}>
          <button
            onClick={runTests}
            style={{
              padding: '0.75rem 1.5rem',
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Relancer les tests
          </button>
          
          <button
            onClick={signInTest}
            style={{
              padding: '0.75rem 1.5rem',
              background: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Test connexion
          </button>
          
          <button
            onClick={signOutTest}
            style={{
              padding: '0.75rem 1.5rem',
              background: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Déconnexion
          </button>
        </div>
      </div>
    </div>
  )
}