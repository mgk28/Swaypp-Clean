// pages/test-qr.tsx
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../hooks/useAuth'

export default function TestQR() {
  const { user, profile } = useAuth()
  const [qrCodes, setQrCodes] = useState<any[]>([])
  const [message, setMessage] = useState('')
  const [newQR, setNewQR] = useState({
    name: '',
    amount: '',
    type: 'fixed'
  })

  useEffect(() => {
    if (user) {
      loadQRCodes()
    }
  }, [user])

  const loadQRCodes = async () => {
    if (!user) return
    
    try {
      const { data, error } = await supabase
        .from('qr_codes')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { desc: true })
      
      if (error) {
        setMessage(`❌ Erreur chargement QR: ${error.message}`)
      } else {
        setQrCodes(data || [])
        setMessage(`✅ ${data?.length || 0} QR codes trouvés`)
      }
    } catch (error: any) {
      setMessage(`❌ Erreur: ${error.message}`)
    }
  }

  const createQRCode = async () => {
    if (!user) {
      setMessage('❌ Vous devez être connecté')
      return
    }

    if (!newQR.name) {
      setMessage('❌ Le nom est requis')
      return
    }

    try {
      // Créer le QR code
      const qrData = {
        user_id: user.id,
        name: newQR.name,
        amount: newQR.amount ? parseFloat(newQR.amount) : null,
        type: newQR.type,
        qr_data: `swaypp://pay/${user.id}/${Date.now()}`,
        status: 'active',
        scans_count: 0,
        payments_count: 0
      }

      const { data: qrCode, error: qrError } = await supabase
        .from('qr_codes')
        .insert(qrData)
        .select()
        .single()

      if (qrError) {
        setMessage(`❌ Erreur création QR: ${qrError.message}`)
        return
      }

      // Mettre à jour le compteur dans user_profiles
      const currentCount = profile?.qr_codes_used || 0
      const { error: updateError } = await supabase
        .from('user_profiles')
        .update({ 
          qr_codes_used: currentCount + 1,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id)

      if (updateError) {
        setMessage(`⚠️ QR créé mais erreur mise à jour profil: ${updateError.message}`)
      } else {
        setMessage('✅ QR Code créé avec succès!')
        setNewQR({ name: '', amount: '', type: 'fixed' })
        loadQRCodes()
      }
    } catch (error: any) {
      setMessage(`❌ Erreur: ${error.message}`)
    }
  }

  const deleteQRCode = async (qrId: string) => {
    try {
      const { error } = await supabase
        .from('qr_codes')
        .delete()
        .eq('id', qrId)
        .eq('user_id', user?.id)

      if (error) {
        setMessage(`❌ Erreur suppression: ${error.message}`)
      } else {
        // Décrémenter le compteur
        const currentCount = profile?.qr_codes_used || 0
        await supabase
          .from('user_profiles')
          .update({ 
            qr_codes_used: Math.max(0, currentCount - 1),
            updated_at: new Date().toISOString()
          })
          .eq('id', user?.id)
        
        setMessage('✅ QR Code supprimé')
        loadQRCodes()
      }
    } catch (error: any) {
      setMessage(`❌ Erreur: ${error.message}`)
    }
  }

  const createTestTransaction = async (qrId: string) => {
    if (!user) return

    try {
      const transactionData = {
        user_id: user.id,
        qr_code_id: qrId,
        amount: Math.floor(Math.random() * 100) + 10,
        status: 'completed',
        payment_method: 'test',
        customer_email: 'test@example.com',
        description: 'Transaction de test',
        currency: 'CHF'
      }

      const { error } = await supabase
        .from('transactions')
        .insert(transactionData)

      if (error) {
        setMessage(`❌ Erreur création transaction: ${error.message}`)
      } else {
        setMessage('✅ Transaction de test créée')
        
        // Mettre à jour le total_revenue dans user_profiles
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('total_revenue')
          .eq('id', user.id)
          .single()
        
        const currentRevenue = profile?.total_revenue || 0
        await supabase
          .from('user_profiles')
          .update({ 
            total_revenue: currentRevenue + transactionData.amount,
            updated_at: new Date().toISOString()
          })
          .eq('id', user.id)
      }
    } catch (error: any) {
      setMessage(`❌ Erreur: ${error.message}`)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      padding: '2rem',
      background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          color: '#064e3b',
          marginBottom: '2rem'
        }}>
          Test QR Codes & Supabase
        </h1>

        {/* Message */}
        {message && (
          <div style={{
            padding: '1rem',
            marginBottom: '2rem',
            borderRadius: '8px',
            background: message.includes('✅') ? '#d1fae5' : message.includes('⚠️') ? '#fef3c7' : '#fee',
            color: message.includes('✅') ? '#065f46' : message.includes('⚠️') ? '#92400e' : '#dc2626'
          }}>
            {message}
          </div>
        )}

        {/* Info utilisateur */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
        }}>
          <h2 style={{ marginBottom: '1rem', color: '#064e3b' }}>Informations utilisateur</h2>
          <p><strong>ID:</strong> {user?.id || 'Non connecté'}</p>
          <p><strong>Email:</strong> {user?.email || 'N/A'}</p>
          <p><strong>Plan:</strong> {profile?.plan || 'free'}</p>
          <p><strong>QR codes utilisés:</strong> {profile?.qr_codes_used || 0} / {profile?.qr_codes_limit || 5}</p>
          <p><strong>Revenue total:</strong> {profile?.total_revenue || 0} CHF</p>
        </div>

        {/* Créer un QR Code */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
        }}>
          <h2 style={{ marginBottom: '1rem', color: '#064e3b' }}>Créer un QR Code</h2>
          
          <div style={{ display: 'grid', gap: '1rem', marginBottom: '1rem' }}>
            <input
              type="text"
              placeholder="Nom du QR Code"
              value={newQR.name}
              onChange={(e) => setNewQR({...newQR, name: e.target.value})}
              style={{
                padding: '0.75rem',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
            />
            
            <input
              type="number"
              placeholder="Montant (optionnel)"
              value={newQR.amount}
              onChange={(e) => setNewQR({...newQR, amount: e.target.value})}
              style={{
                padding: '0.75rem',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
            />
            
            <select
              value={newQR.type}
              onChange={(e) => setNewQR({...newQR, type: e.target.value})}
              style={{
                padding: '0.75rem',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
            >
              <option value="fixed">Montant fixe</option>
              <option value="variable">Montant variable</option>
            </select>
          </div>
          
          <button
            onClick={createQRCode}
            style={{
              padding: '0.75rem 2rem',
              background: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Créer QR Code
          </button>
        </div>

        {/* Liste des QR Codes */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '2rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
        }}>
          <h2 style={{ marginBottom: '1rem', color: '#064e3b' }}>
            QR Codes existants ({qrCodes.length})
          </h2>
          
          {qrCodes.length === 0 ? (
            <p style={{ color: '#6b7280' }}>Aucun QR code trouvé</p>
          ) : (
            <div style={{ display: 'grid', gap: '1rem' }}>
              {qrCodes.map((qr) => (
                <div
                  key={qr.id}
                  style={{
                    padding: '1rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <p style={{ fontWeight: '600' }}>{qr.name}</p>
                    <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                      {qr.amount ? `${qr.amount} CHF` : 'Montant variable'} • 
                      {qr.scans_count} scans • 
                      {qr.payments_count} paiements
                    </p>
                    <p style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
                      ID: {qr.id}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => createTestTransaction(qr.id)}
                      style={{
                        padding: '0.5rem 1rem',
                        background: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '0.875rem',
                        cursor: 'pointer'
                      }}
                    >
                      Test Transaction
                    </button>
                    <button
                      onClick={() => deleteQRCode(qr.id)}
                      style={{
                        padding: '0.5rem 1rem',
                        background: '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '0.875rem',
                        cursor: 'pointer'
                      }}
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <button
            onClick={loadQRCodes}
            style={{
              marginTop: '1rem',
              padding: '0.5rem 1rem',
              background: '#6b7280',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Rafraîchir la liste
          </button>
        </div>
      </div>
    </div>
  )
}