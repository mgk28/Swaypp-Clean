// pages/analytics.tsx
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function AnalyticsPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [transactions, setTransactions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalTransactions: 0,
    averageTransaction: 0,
    todayRevenue: 0
  })

  useEffect(() => {
    const userData = localStorage.getItem('swaypp_user')
    if (!userData) {
      router.push('/auth/signin')
      return
    }
    const parsed = JSON.parse(userData)
    setUser(parsed)
    loadTransactions(parsed.id)
  }, [router])

  const loadTransactions = async (userId: string) => {
    try {
      // Charger les transactions
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(50)

      if (error) throw error

      setTransactions(data || [])
      
      // Calculer les statistiques
      if (data && data.length > 0) {
        const total = data.reduce((sum, t) => sum + parseFloat(t.amount), 0)
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        
        const todayTotal = data
          .filter(t => new Date(t.created_at) >= today)
          .reduce((sum, t) => sum + parseFloat(t.amount), 0)

        setStats({
          totalRevenue: total,
          totalTransactions: data.length,
          averageTransaction: total / data.length,
          todayRevenue: todayTotal
        })
      }
    } catch (error) {
      console.error('Erreur chargement transactions:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('fr-CH', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#10b981'
      case 'pending': return '#f59e0b'
      case 'failed': return '#ef4444'
      default: return '#6b7280'
    }
  }

  if (loading) return <div>Chargement...</div>

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
            <Link href="/analytics" style={{ 
              textDecoration: 'none', 
              color: '#10b981',
              fontWeight: '500'
            }}>
              Analytics
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ padding: '3rem 2rem', maxWidth: '1400px', margin: '0 auto' }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 'bold',
          color: '#064e3b',
          marginBottom: '2rem'
        }}>
          Analytics & Transactions
        </h1>

        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
          }}>
            <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
              Revenu Total
            </p>
            <h3 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#064e3b' }}>
              {stats.totalRevenue.toFixed(2)} CHF
            </h3>
          </div>

          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
          }}>
            <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
              Transactions
            </p>
            <h3 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#064e3b' }}>
              {stats.totalTransactions}
            </h3>
          </div>

          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
          }}>
            <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
              Ticket Moyen
            </p>
            <h3 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#064e3b' }}>
              {stats.averageTransaction.toFixed(2)} CHF
            </h3>
          </div>

          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
          }}>
            <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
              Aujourd'hui
            </p>
            <h3 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>
              {stats.todayRevenue.toFixed(2)} CHF
            </h3>
          </div>
        </div>

        {/* Transactions Table */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '2rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
        }}>
          <h2 style={{ 
            fontSize: '1.5rem',
            color: '#374151',
            marginBottom: '1.5rem'
          }}>
            Historique des transactions
          </h2>

          {transactions.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#6b7280', padding: '3rem' }}>
              Aucune transaction pour le moment.
              <br />
              <Link href="/merchant-qr" style={{ color: '#10b981', textDecoration: 'none' }}>
                Créez votre premier QR code →
              </Link>
            </p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                    <th style={{ padding: '1rem', textAlign: 'left', color: '#374151' }}>Date</th>
                    <th style={{ padding: '1rem', textAlign: 'left', color: '#374151' }}>Description</th>
                    <th style={{ padding: '1rem', textAlign: 'right', color: '#374151' }}>Montant</th>
                    <th style={{ padding: '1rem', textAlign: 'center', color: '#374151' }}>Statut</th>
                    <th style={{ padding: '1rem', textAlign: 'center', color: '#374151' }}>Méthode</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                      <td style={{ padding: '1rem', fontSize: '0.875rem' }}>
                        {formatDate(transaction.created_at)}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        {transaction.description || 'Paiement Swaypp'}
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'right', fontWeight: '600' }}>
                        {parseFloat(transaction.amount).toFixed(2)} CHF
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'center' }}>
                        <span style={{
                          padding: '0.25rem 0.75rem',
                          borderRadius: '20px',
                          fontSize: '0.875rem',
                          backgroundColor: `${getStatusColor(transaction.status)}20`,
                          color: getStatusColor(transaction.status)
                        }}>
                          {transaction.status === 'completed' ? 'Complété' :
                           transaction.status === 'pending' ? 'En attente' : 'Échoué'}
                        </span>
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'center', fontSize: '0.875rem' }}>
                        {transaction.payment_method === 'swiss_qr' ? 'Swiss QR' : transaction.payment_method}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}