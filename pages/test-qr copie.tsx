// pages/create-profile.tsx
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useRouter } from 'next/router'

export default function CreateProfile() {
  const router = useRouter()
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [businessName, setBusinessName] = useState('')

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error || !user) {
      setMessage('❌ Vous devez être connecté')
      return
    }
    
    setUser(user)
    
    // Vérifier si le profil existe déjà
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', user.id)
      .single()
    
    if (profile) {
      setMessage('✅ Profil déjà existant, redirection...')
      setTimeout(() => router.push('/dashboard'), 1500)
    }
  }

  const createProfile = async () => {
    if (!user) {
      setMessage('❌ Utilisateur non trouvé')
      return
    }

    setLoading(true)
    
    try {
      // Créer le profil
      const { error } = await supabase
        .from('user_profiles')
        .insert({
          id: user.id,
          email: user.email,
          business_name: businessName || 'Mon Commerce',
          plan: 'free',
          qr_codes_used: 0,
          qr_codes_limit: 5,
          total_revenue: 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })

      if (error) {
        // Si le profil existe déjà, mettre à jour
        if (error.code === '23505') {
          const { error: updateError } = await supabase
            .from('user_profiles')
            .update({
              business_name: businessName || 'Mon Commerce',
              updated_at: new Date().toISOString()
            })
            .eq('id', user.id)
          
          if (updateError) {
            setMessage(`❌ Erreur mise à jour: ${updateError.message}`)
          } else {
            setMessage('✅ Profil mis à jour avec succès!')
            setTimeout(() => router.push('/dashboard'), 1500)
          }
        } else {
          setMessage(`❌ Erreur: ${error.message}`)
        }
      } else {
        setMessage('✅ Profil créé avec succès!')
        setTimeout(() => router.push('/dashboard'), 1500)
      }
    } catch (error: any) {
      setMessage(`❌ Erreur: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)'
    }}>
      <div style={{
        background: 'white',
        padding: '3rem',
        borderRadius: '16px',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
        maxWidth: '500px',
        width: '100%'
      }}>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          color: '#064e3b',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          Finaliser votre inscription
        </h1>

        {user && (
          <div style={{
            background: '#f0fdf4',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '2rem'
          }}>
            <p style={{ margin: 0, color: '#064e3b' }}>
              <strong>Email:</strong> {user.email}
            </p>
            <p style={{ margin: '0.5rem 0 0 0', color: '#064e3b' }}>
              <strong>ID:</strong> {user.id}
            </p>
          </div>
        )}

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            color: '#374151',
            fontWeight: '500'
          }}>
            Nom de votre commerce
          </label>
          <input
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="Mon Commerce"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '1rem'
            }}
          />
        </div>

        {message && (
          <div style={{
            padding: '1rem',
            marginBottom: '1rem',
            borderRadius: '8px',
            background: message.includes('✅') ? '#d1fae5' : '#fee',
            color: message.includes('✅') ? '#065f46' : '#dc2626'
          }}>
            {message}
          </div>
        )}

        <button
          onClick={createProfile}
          disabled={loading || !user}
          style={{
            width: '100%',
            padding: '1rem',
            background: loading ? '#9ca3af' : '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s'
          }}
        >
          {loading ? 'Création...' : 'Créer mon profil'}
        </button>

        <div style={{
          marginTop: '2rem',
          paddingTop: '2rem',
          borderTop: '1px solid #e5e7eb',
          textAlign: 'center'
        }}>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
            Vous bénéficierez de :
          </p>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            marginTop: '1rem',
            textAlign: 'left'
          }}>
            <li style={{ marginBottom: '0.5rem', color: '#047857' }}>
              ✅ 5 QR codes gratuits
            </li>
            <li style={{ marginBottom: '0.5rem', color: '#047857' }}>
              ✅ 0% de commission
            </li>
            <li style={{ marginBottom: '0.5rem', color: '#047857' }}>
              ✅ Dashboard en temps réel
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}