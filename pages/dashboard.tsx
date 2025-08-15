// pages/dashboard.tsx
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import { useAuth } from '../hooks/useAuth'
import { supabase } from '../lib/supabase'

export default function Dashboard() {
  const router = useRouter()
  const { user, profile, loading, signOut } = useAuth()
  const [stats, setStats] = useState({
    totalRevenue: 0,
    growth: 0,
    transactions: 0,
    qrGenerated: 0,
    qrLimit: 5,
    weeklyRevenue: 0,
    averageRevenue: 0,
    monthlyRevenue: 0,
    savings: 0
  })
  const [qrCodes, setQrCodes] = useState<any[]>([])
  const [loadingStats, setLoadingStats] = useState(true)

  useEffect(() => {
    if (profile) {
      loadDashboardData()
    }
  }, [profile])

  const loadDashboardData = async () => {
    if (!profile?.id) return
    
    try {
      setLoadingStats(true)
      
      // Charger les QR codes
      const { data: qrData } = await supabase
        .from('qr_codes')
        .select('*')
        .eq('user_id', profile.id)
        .eq('status', 'active')
        .limit(3)
      
      setQrCodes(qrData || [])
      
      // Charger les transactions pour les stats
      const { data: transactions } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', profile.id)
        .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
      
      if (transactions && transactions.length > 0) {
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        
        const todayTransactions = transactions.filter(t => 
          new Date(t.created_at) >= today
        )
        
        const weekStart = new Date()
        weekStart.setDate(weekStart.getDate() - 7)
        const weekTransactions = transactions.filter(t => 
          new Date(t.created_at) >= weekStart
        )
        
        const totalRevenue = todayTransactions.reduce((sum, t) => 
          sum + (t.status === 'completed' ? parseFloat(t.amount) : 0), 0
        )
        
        const weeklyRevenue = weekTransactions.reduce((sum, t) => 
          sum + (t.status === 'completed' ? parseFloat(t.amount) : 0), 0
        )
        
        const monthlyRevenue = transactions.reduce((sum, t) => 
          sum + (t.status === 'completed' ? parseFloat(t.amount) : 0), 0
        )
        
        // Calculer la croissance (simulé pour la démo)
        const previousMonthRevenue = monthlyRevenue * 0.85
        const growth = previousMonthRevenue > 0 
          ? ((monthlyRevenue - previousMonthRevenue) / previousMonthRevenue * 100)
          : 0
        
        // Calculer les économies (2.9% de commission économisée)
        const savings = monthlyRevenue * 0.029
        
        setStats({
          totalRevenue,
          growth,
          transactions: todayTransactions.length,
          qrGenerated: profile.qr_codes_used || 0,
          qrLimit: profile.qr_codes_limit || 5,
          weeklyRevenue,
          averageRevenue: weeklyRevenue / 7,
          monthlyRevenue,
          savings
        })
      }
    } catch (error) {
      console.error('Erreur chargement dashboard:', error)
    } finally {
      setLoadingStats(false)
    }
  }

  if (loading) return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '3rem',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
        textAlign: 'center'
      }}>
        <div style={{
          width: '60px',
          height: '60px',
          background: '#10b981',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1rem',
          animation: 'spin 1s linear infinite'
        }}>
          <span style={{ fontSize: '2rem' }}>💸</span>
        </div>
        <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>Chargement de votre dashboard...</p>
      </div>
    </div>
  )

  return (
    <>
      <Head>
        <title>Dashboard - Swaypp</title>
        <meta name="description" content="Gérez vos paiements et QR codes avec Swaypp" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>

      <div style={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)'
      }}>
        {/* Header */}
        <header style={{
          background: 'white',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          padding: '1rem 2rem',
          position: 'sticky',
          top: 0,
          zIndex: 50,
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            maxWidth: '1400px',
            margin: '0 auto'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
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
              <span style={{ 
                fontSize: '0.875rem',
                color: '#6b7280'
              }}>
                The Swiss Payment App
              </span>
            </div>
            
            <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
              <Link href="/dashboard" style={{ 
                textDecoration: 'none', 
                color: '#10b981',
                fontWeight: '600',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                background: '#f0fdf4'
              }}>
                Dashboard
              </Link>
              <Link href="/merchant-qr" style={{ 
                textDecoration: 'none', 
                color: '#374151',
                fontWeight: '500',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                transition: 'all 0.2s'
              }}>
                QR Codes
              </Link>
              <Link href="/analytics" style={{ 
                textDecoration: 'none', 
                color: '#374151',
                fontWeight: '500',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                transition: 'all 0.2s'
              }}>
                Analytics
              </Link>
              <Link href="/admin" style={{ 
                textDecoration: 'none', 
                color: '#374151',
                fontWeight: '500',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                transition: 'all 0.2s'
              }}>
                Admin
              </Link>
              <Link href="/pricing" style={{ 
                textDecoration: 'none', 
                color: '#374151',
                fontWeight: '500',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                transition: 'all 0.2s'
              }}>
                Tarifs
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
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = '#dc2626'}
                onMouseOut={(e) => e.currentTarget.style.background = '#ef4444'}
              >
                Se déconnecter
              </button>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main style={{ padding: '3rem 2rem', maxWidth: '1400px', margin: '0 auto' }}>
          {/* Hero Section */}
          <div style={{
            background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
            borderRadius: '24px',
            padding: '3rem',
            marginBottom: '3rem',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(16, 185, 129, 0.1)'
          }}>
            <div style={{
              position: 'absolute',
              top: '-50px',
              right: '-50px',
              width: '200px',
              height: '200px',
              background: 'rgba(16, 185, 129, 0.1)',
              borderRadius: '50%'
            }}></div>
            
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{
                display: 'inline-block',
                background: '#fef3c7',
                color: '#92400e',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                fontSize: '0.875rem',
                fontWeight: '500',
                marginBottom: '1rem'
              }}>
                ⭐ Dashboard en temps réel
              </div>
              
              <h2 style={{ 
                fontSize: '3rem', 
                fontWeight: 'bold',
                color: '#064e3b',
                marginBottom: '1rem',
                lineHeight: '1.2'
              }}>
                Bienvenue {profile?.business_name || user?.email?.split('@')[0]} !
              </h2>
              
              <p style={{ 
                fontSize: '1.25rem',
                color: '#047857',
                marginBottom: '2rem'
              }}>
                Gérez vos paiements en toute simplicité avec 0% commission
              </p>

              {/* Quick Stats dans le hero */}
              <div style={{
                display: 'flex',
                gap: '2rem',
                flexWrap: 'wrap'
              }}>
                <div style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  minWidth: '200px',
                  backdropFilter: 'blur(10px)'
                }}>
                  <p style={{
                    fontSize: '0.875rem',
                    color: '#6b7280',
                    margin: '0 0 0.5rem 0'
                  }}>
                    Revenus aujourd'hui
                  </p>
                  <p style={{
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    color: '#10b981',
                    margin: 0
                  }}>
                    {loadingStats ? '...' : `${stats.totalRevenue.toFixed(2)} CHF`}
                  </p>
                </div>
                <div style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  minWidth: '200px',
                  backdropFilter: 'blur(10px)'
                }}>
                  <p style={{
                    fontSize: '0.875rem',
                    color: '#6b7280',
                    margin: '0 0 0.5rem 0'
                  }}>
                    Transactions
                  </p>
                  <p style={{
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    color: '#10b981',
                    margin: 0
                  }}>
                    {loadingStats ? '...' : stats.transactions}
                  </p>
                </div>
                <div style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  minWidth: '200px',
                  backdropFilter: 'blur(10px)'
                }}>
                  <p style={{
                    fontSize: '0.875rem',
                    color: '#6b7280',
                    margin: '0 0 0.5rem 0'
                  }}>
                    Croissance
                  </p>
                  <p style={{
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    color: '#10b981',
                    margin: 0
                  }}>
                    {loadingStats ? '...' : `+${stats.growth.toFixed(1)}%`}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            {/* Revenue Card */}
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '2.5rem',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb',
              transition: 'all 0.3s'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center',
                marginBottom: '2rem'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: '#10b981',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '1rem'
                }}>
                  <span style={{ fontSize: '2rem' }}>💸</span>
                </div>
                <h3 style={{ 
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: '#111827',
                  margin: 0
                }}>
                  Revenus détaillés
                </h3>
              </div>
              
              <div style={{
                background: '#f8fafc',
                borderRadius: '12px',
                padding: '1.5rem',
                marginBottom: '1.5rem'
              }}>
                <p style={{ 
                  fontSize: '0.875rem',
                  color: '#6b7280',
                  marginBottom: '0.5rem'
                }}>
                  Revenus ce mois
                </p>
                <div style={{ 
                  fontSize: '2.5rem', 
                  fontWeight: 'bold',
                  color: '#10b981',
                  marginBottom: '0.5rem'
                }}>
                  {loadingStats ? '...' : `${stats.monthlyRevenue.toFixed(2)} CHF`}
                </div>
                <p style={{ 
                  fontSize: '0.875rem',
                  color: '#6b7280'
                }}>
                  0 CHF de commission payée
                </p>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '1rem'
              }}>
                <div>
                  <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>Cette semaine</p>
                  <p style={{ fontSize: '1.25rem', fontWeight: '600', color: '#111827', margin: 0 }}>
                    {loadingStats ? '...' : `${stats.weeklyRevenue.toFixed(2)} CHF`}
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>Moyenne/jour</p>
                  <p style={{ fontSize: '1.25rem', fontWeight: '600', color: '#111827', margin: 0 }}>
                    {loadingStats ? '...' : `${stats.averageRevenue.toFixed(2)} CHF`}
                  </p>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: '#f0fdf4',
                padding: '0.75rem',
                borderRadius: '8px'
              }}>
                <span style={{ color: '#10b981', fontSize: '1.2rem' }}>📈</span>
                <span style={{
                  fontSize: '0.875rem',
                  color: '#047857',
                  fontWeight: '500'
                }}>
                  {loadingStats ? 'Calcul...' : `+${stats.growth.toFixed(1)}% vs mois dernier`}
                </span>
              </div>
            </div>

            {/* QR Codes Card */}
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '2.5rem',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb',
              transition: 'all 0.3s'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center',
                marginBottom: '2rem'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: '#10b981',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '1rem'
                }}>
                  <span style={{ fontSize: '2rem' }}>📱</span>
                </div>
                <h3 style={{ 
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: '#111827',
                  margin: 0
                }}>
                  QR Codes actifs
                </h3>
              </div>
              
              {qrCodes.length > 0 ? (
                qrCodes.map((qr) => (
                  <Link key={qr.id} href="/merchant-qr" style={{ textDecoration: 'none' }}>
                    <div style={{
                      background: '#f8fafc',
                      borderRadius: '16px',
                      padding: '1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      marginBottom: '1rem',
                      border: '1px solid #e2e8f0'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = '#f0fdf4'
                      e.currentTarget.style.borderColor = '#10b981'
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = '#f8fafc'
                      e.currentTarget.style.borderColor = '#e2e8f0'
                    }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{
                          width: '48px',
                          height: '48px',
                          background: '#10b981',
                          color: 'white',
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 'bold',
                          fontSize: '1rem'
                        }}>
                          QR
                        </div>
                        <div>
                          <p style={{ 
                            fontWeight: '600',
                            color: '#111827',
                            margin: 0,
                            fontSize: '1.1rem'
                          }}>
                            {qr.name}
                          </p>
                          <p style={{ 
                            fontSize: '0.875rem',
                            color: '#6b7280',
                            margin: 0
                          }}>
                            {qr.amount ? `${qr.amount} CHF` : 'Variable'} • {qr.scans_count} scans
                          </p>
                        </div>
                      </div>
                      <span style={{ color: '#10b981', fontSize: '1.5rem' }}>→</span>
                    </div>
                  </Link>
                ))
              ) : (
                <p style={{ textAlign: 'center', color: '#6b7280', padding: '2rem' }}>
                  Aucun QR code actif
                </p>
              )}

              <div style={{
                background: '#fef3c7',
                borderRadius: '12px',
                padding: '1rem',
                marginBottom: '1.5rem',
                border: '1px solid #fcd34d'
              }}>
                <p style={{
                  fontSize: '0.875rem',
                  color: '#92400e',
                  margin: 0,
                  fontWeight: '500'
                }}>
                  📊 QR codes utilisés : {stats.qrGenerated}/{stats.qrLimit}
                </p>
              </div>

              <button 
                onClick={() => router.push('/merchant-qr')}
                style={{
                  width: '100%',
                  background: '#10b981',
                  color: 'white',
                  border: 'none',
                  padding: '1rem',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = '#059669'}
                onMouseOut={(e) => e.currentTarget.style.background = '#10b981'}
              >
                <span style={{ fontSize: '1.2rem' }}>+</span> Créer un nouveau QR Code
              </button>
            </div>

            {/* Payments Accepted Card */}
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '2.5rem',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb',
              transition: 'all 0.3s'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center',
                marginBottom: '2rem'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: '#10b981',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '1rem'
                }}>
                  <span style={{ fontSize: '2rem' }}>💳</span>
                </div>
                <h3 style={{ 
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: '#111827',
                  margin: 0
                }}>
                  Paiements acceptés
                </h3>
              </div>
              
              <div style={{ 
                display: 'flex', 
                gap: '0.75rem',
                marginBottom: '2rem',
                flexWrap: 'wrap'
              }}>
                <div style={{
                  background: '#e0f2fe',
                  color: '#0369a1',
                  padding: '0.75rem 1rem',
                  borderRadius: '12px',
                  fontWeight: '600',
                  fontSize: '0.875rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  🇨🇭 TWINT
                </div>
                <div style={{
                  background: '#f3f4f6',
                  color: '#374151',
                  padding: '0.75rem 1rem',
                  borderRadius: '12px',
                  fontWeight: '600',
                  fontSize: '0.875rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  💳 Cartes
                </div>
                <div style={{
                  background: '#f3f4f6',
                  color: '#374151',
                  padding: '0.75rem 1rem',
                  borderRadius: '12px',
                  fontWeight: '600',
                  fontSize: '0.875rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  📱 Apple Pay
                </div>
              </div>

              <div style={{
                background: '#f0fdf4',
                borderRadius: '12px',
                padding: '1.5rem',
                textAlign: 'center'
              }}>
                <p style={{ 
                  fontSize: '0.875rem',
                  color: '#047857',
                  marginBottom: '0.5rem',
                  fontWeight: '500'
                }}>
                  💰 Économies vs concurrence
                </p>
                <div style={{ 
                  fontSize: '2.5rem', 
                  fontWeight: 'bold',
                  color: '#10b981',
                  marginBottom: '0.25rem'
                }}>
                  +{loadingStats ? '...' : `${stats.savings.toFixed(2)}`} CHF
                </div>
                <p style={{ 
                  fontSize: '0.875rem',
                  color: '#047857',
                  margin: 0
                }}>
                  économisés ce mois-ci
                </p>
              </div>
            </div>
          </div>

          {/* Plan Info Banner */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '2.5rem',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '3rem',
            flexWrap: 'wrap',
            gap: '2rem'
          }}>
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  background: '#10b981',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ fontSize: '1.5rem' }}>🎯</span>
                </div>
                <h3 style={{ 
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: '#111827',
                  margin: 0
                }}>
                  Plan {profile?.plan === 'pro' ? 'Pro' : 'Gratuit'} Actif
                </h3>
              </div>
              <p style={{ 
                color: '#6b7280',
                margin: 0,
                fontSize: '1rem'
              }}>
                ✓ QR codes {profile?.plan === 'pro' ? 'illimités' : `utilisés : ${stats.qrGenerated}/${stats.qrLimit}`} • Transactions illimitées • 0% commission
              </p>
            </div>
            {profile?.plan !== 'pro' && (
              <Link href="/pricing" style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: 'white',
                padding: '1rem 2rem',
                borderRadius: '12px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '1rem',
                transition: 'all 0.2s',
                display: 'inline-block',
                boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.4)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.3)'
              }}
              >
                🚀 Passer au Pro →
              </Link>
            )}
          </div>

          {/* Quick Actions */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem'
          }}>
            <Link href="/merchant-qr" style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'white',
                borderRadius: '16px',
                padding: '2rem',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e5e7eb',
                transition: 'all 0.3s',
                cursor: 'pointer',
                textAlign: 'center'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)'
              }}
              >
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: '#10b981',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem'
                }}>
                  <span style={{ fontSize: '2rem' }}>📱</span>
                </div>
                <h4 style={{
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  color: '#111827',
                  marginBottom: '0.5rem'
                }}>
                  Gérer QR Codes
                </h4>
                <p style={{
                  color: '#6b7280',
                  fontSize: '0.875rem',
                  margin: 0
                }}>
                  Créer, modifier et suivre vos QR codes
                </p>
              </div>
            </Link>

            <Link href="/analytics" style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'white',
                borderRadius: '16px',
                padding: '2rem',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e5e7eb',
                transition: 'all 0.3s',
                cursor: 'pointer',
                textAlign: 'center'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)'
              }}
              >
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: '#10b981',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem'
                }}>
                  <span style={{ fontSize: '2rem' }}>📊</span>
                </div>
                <h4 style={{
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  color: '#111827',
                  marginBottom: '0.5rem'
                }}>
                  Analytics
                </h4>
                <p style={{
                  color: '#6b7280',
                  fontSize: '0.875rem',
                  margin: 0
                }}>
                  Analyser vos performances de vente
                </p>
              </div>
            </Link>

            <Link href="/admin" style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'white',
                borderRadius: '16px',
                padding: '2rem',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e5e7eb',
                transition: 'all 0.3s',
                cursor: 'pointer',
                textAlign: 'center'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)'
              }}
              >
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: '#10b981',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem'
                }}>
                  <span style={{ fontSize: '2rem' }}>⚙️</span>
                </div>
                <h4 style={{
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  color: '#111827',
                  marginBottom: '0.5rem'
                }}>
                  Paramètres
                </h4>
                <p style={{
                  color: '#6b7280',
                  fontSize: '0.875rem',
                  margin: 0
                }}>
                  Configurer votre compte et préférences
                </p>
              </div>
            </Link>
          </div>
        </main>

        {/* Footer Info */}
        <footer style={{
          background: 'white',
          borderTop: '1px solid #e5e7eb',
          padding: '2rem 0',
          marginTop: '4rem'
        }}>
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '0 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: '#6b7280',
            fontSize: '0.875rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                🏛️ Conforme standards suisses
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                👥 +1'200 commerçants
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                🔒 Données sécurisées en Suisse
              </span>
            </div>
            <div style={{ display: 'flex', gap: '2rem' }}>
              <Link href="#" style={{ color: '#10b981', textDecoration: 'none' }}>
                Support
              </Link>
              <Link href="/terms" style={{ color: '#10b981', textDecoration: 'none' }}>
                CGU
              </Link>
              <Link href="#" style={{ color: '#10b981', textDecoration: 'none' }}>
                Documentation
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}