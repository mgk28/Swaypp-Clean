import Link from 'next/link'
import Head from 'next/head'
import { useState, useEffect } from 'react'

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Swaypp - The Swiss Payment App</title>
        <meta name="description" content="Solution de paiement transparente pour commerçants suisses" />
        <style>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            overflow-x: hidden;
          }
          
          .container {
            max-width: 1280px;
            margin: 0 auto;
            padding: 0 1rem;
          }
          
          /* Animations fluides */
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(1deg); }
          }
          
          @keyframes pulse-gentle {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.8; transform: scale(1.02); }
          }
          
          @keyframes bounce-soft {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          
          @keyframes gradient-shift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          @keyframes blob-move {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          
          .animate-pulse-gentle {
            animation: pulse-gentle 3s ease-in-out infinite;
          }
          
          .animate-bounce-soft {
            animation: bounce-soft 2s ease-in-out infinite;
          }
          
          .animate-gradient {
            background: linear-gradient(-45deg, #059669, #0d9488, #10b981, #047857);
            background-size: 400% 400%;
            animation: gradient-shift 3s ease infinite;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          .blob {
            position: absolute;
            border-radius: 50%;
            filter: blur(40px);
            mix-blend-mode: multiply;
            animation: blob-move 7s infinite;
          }
          
          .blob-1 {
            top: -10%;
            left: -10%;
            width: 320px;
            height: 320px;
            background: linear-gradient(45deg, #a7f3d0, #6ee7b7);
            animation-delay: 0s;
          }
          
          .blob-2 {
            top: -5%;
            right: -10%;
            width: 280px;
            height: 280px;
            background: linear-gradient(45deg, #99f6e4, #5eead4);
            animation-delay: 2s;
          }
          
          .blob-3 {
            bottom: -10%;
            left: 20%;
            width: 350px;
            height: 350px;
            background: linear-gradient(45deg, #d1fae5, #a7f3d0);
            animation-delay: 4s;
          }
          
          .card-hover {
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            cursor: pointer;
          }
          
          .card-hover:hover {
            transform: translateY(-10px) rotate(0deg) scale(1.02);
            box-shadow: 0 40px 80px -10px rgba(0, 0, 0, 0.3);
          }
          
          .btn-primary {
            background: linear-gradient(135deg, #059669, #047857);
            color: white;
            padding: 1rem 2rem;
            border-radius: 0.75rem;
            font-weight: 600;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            box-shadow: 0 10px 25px -5px rgba(5, 150, 105, 0.3);
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            border: none;
            cursor: pointer;
            position: relative;
            overflow: hidden;
          }
          
          .btn-primary:before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transition: left 0.5s;
          }
          
          .btn-primary:hover:before {
            left: 100%;
          }
          
          .btn-primary:hover {
            transform: translateY(-2px) scale(1.05);
            box-shadow: 0 20px 40px -5px rgba(5, 150, 105, 0.4);
          }
          
          .btn-secondary {
            border: 2px solid #a7f3d0;
            color: #047857;
            padding: 1rem 2rem;
            border-radius: 0.75rem;
            font-weight: 600;
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(10px);
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            text-decoration: none;
            position: relative;
            overflow: hidden;
          }
          
          .btn-secondary:hover {
            background: rgba(236, 253, 245, 0.9);
            transform: translateY(-2px) scale(1.05);
            border-color: #6ee7b7;
            box-shadow: 0 15px 30px -5px rgba(167, 243, 208, 0.3);
          }
          
          .glass-card {
            background: rgba(255, 255, 255, 0.25);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.18);
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
          }
          
          .parallax-element {
            transform: translateZ(0);
            will-change: transform;
          }
          
          @media (max-width: 768px) {
            .grid-cols-2 {
              grid-template-columns: 1fr;
            }
            .text-6xl {
              font-size: 2.5rem;
            }
            .btn-primary, .btn-secondary {
              width: 100%;
              justify-content: center;
            }
          }
        `}</style>
      </Head>

      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #ecfdf5 0%, #ffffff 50%, #f0fdfa 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        
        {/* Blobs animés en arrière-plan */}
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>

        {/* Particules suivant la souris */}
        <div 
          style={{
            position: 'fixed',
            width: '20px',
            height: '20px',
            background: 'radial-gradient(circle, rgba(5,150,105,0.3) 0%, transparent 70%)',
            borderRadius: '50%',
            pointerEvents: 'none',
            left: mousePosition.x - 10,
            top: mousePosition.y - 10,
            transition: 'all 0.1s ease',
            zIndex: 9999
          }}
        />
        
        {/* Header */}
        <header style={{
          position: 'fixed',
          width: '100%',
          top: 0,
          zIndex: 50,
          background: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: isScrolled ? '0 8px 32px 0 rgba(31, 38, 135, 0.15)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(209, 250, 229, 0.5)' : 'none',
          transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}>
          <div className="container">
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              height: '4rem' 
            }}>
              
              {/* Logo animé */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div 
                  className="animate-pulse-gentle"
                  style={{
                    width: '2.5rem',
                    height: '2.5rem',
                    background: 'linear-gradient(135deg, #059669, #047857)',
                    borderRadius: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 25px -5px rgba(5, 150, 105, 0.3)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.1) rotate(5deg)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1) rotate(0deg)'
                  }}
                >
                  <svg style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1e293b' }}>Swaypp</div>
                  <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: '500' }}>The Swiss Payment App</div>
                </div>
              </div>
              
              {/* Navigation */}
              <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <a href="#features" style={{ 
                  color: '#6b7280', 
                  textDecoration: 'none', 
                  fontWeight: '500',
                  transition: 'all 0.3s ease',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#059669'
                  e.target.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '#6b7280'
                  e.target.style.transform = 'translateY(0)'
                }}>
                  Fonctionnalités
                </a>
                <a href="#pricing" style={{ 
                  color: '#6b7280', 
                  textDecoration: 'none', 
                  fontWeight: '500',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#059669'
                  e.target.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '#6b7280'
                  e.target.style.transform = 'translateY(0)'
                }}>
                  Tarifs
                </a>
                <Link href="/auth/signin" className="btn-primary" style={{ fontSize: '0.875rem', padding: '0.625rem 1.5rem' }}>
                  Se connecter
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section style={{ paddingTop: '8rem', paddingBottom: '5rem', position: 'relative' }}>
          <div className="container" style={{ position: 'relative', zIndex: 10 }}>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '4rem', 
              alignItems: 'center' 
            }}>
              
              {/* Contenu gauche */}
              <div className="parallax-element">
                {/* Badge animé */}
                <div 
                  className="animate-bounce-soft glass-card"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    background: 'rgba(209, 250, 229, 0.8)',
                    color: '#047857',
                    padding: '0.75rem 1.25rem',
                    borderRadius: '50px',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    marginBottom: '2rem',
                    boxShadow: '0 8px 25px -5px rgba(5, 150, 105, 0.2)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <span style={{ marginRight: '0.5rem', fontSize: '1.1rem' }}>⭐</span>
                  Solution #1 où les clients paient les commissions
                </div>
                
                {/* Titre avec animation gradient */}
                <h1 style={{
                  fontSize: '4rem',
                  fontWeight: 'bold',
                  color: '#1e293b',
                  marginBottom: '1.5rem',
                  lineHeight: '1.1'
                }}>
                  Recevez{' '}
                  <span className="animate-gradient" style={{ 
                    fontSize: '4.5rem',
                    display: 'inline-block',
                    transform: 'scale(1.1)'
                  }}>
                    100%
                  </span>{' '}
                  de vos revenus
                </h1>
                
                {/* Sous-titre avec animation d'apparition */}
                <p style={{
                  fontSize: '1.25rem',
                  color: '#4b5563',
                  marginBottom: '2.5rem',
                  lineHeight: '1.6',
                  animation: 'fade-in 1s ease-out 0.3s both'
                }}>
                  La première solution de paiement où{' '}
                  <strong style={{ 
                    color: '#047857',
                    background: 'linear-gradient(135deg, rgba(236, 253, 245, 0.8), rgba(209, 250, 229, 0.8))',
                    padding: '0.1rem 0.3rem',
                    borderRadius: '0.25rem'
                  }}>vos clients paient les commissions</strong>.{' '}
                  Transparent, équitable, et conçu pour les commerçants suisses qui méritent plus.
                </p>

                {/* Boutons avec animations */}
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
                  <Link href="/auth/signin" className="btn-primary">
                    <span style={{ marginRight: '0.5rem', fontSize: '1.1rem' }}>⚡</span>
                    Commencer gratuitement
                    <span style={{ marginLeft: '0.5rem', fontSize: '1.1rem' }}>→</span>
                  </Link>
                  
                  <button className="btn-secondary">
                    <span style={{ marginRight: '0.5rem', fontSize: '1.1rem' }}>▶️</span>
                    Voir la démo (2 min)
                  </button>
                </div>

                {/* Indicateurs de confiance animés */}
                <div style={{ 
                  display: 'flex', 
                  gap: '2rem', 
                  fontSize: '0.875rem', 
                  color: '#6b7280',
                  flexWrap: 'wrap'
                }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    padding: '0.5rem 1rem',
                    background: 'rgba(255, 255, 255, 0.6)',
                    borderRadius: '25px',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)'
                    e.target.style.boxShadow = '0 8px 25px -5px rgba(0, 0, 0, 0.1)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)'
                    e.target.style.boxShadow = 'none'
                  }}>
                    <span style={{ marginRight: '0.5rem', fontSize: '1.1rem' }}>🛡️</span>
                    Conforme standards suisses
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    padding: '0.5rem 1rem',
                    background: 'rgba(255, 255, 255, 0.6)',
                    borderRadius: '25px',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)'
                    e.target.style.boxShadow = '0 8px 25px -5px rgba(0, 0, 0, 0.1)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)'
                    e.target.style.boxShadow = 'none'
                  }}>
                    <span style={{ marginRight: '0.5rem', fontSize: '1.1rem' }}>👥</span>
                    +1'200 commerçants
                  </div>
                </div>
              </div>

              {/* Dashboard Demo avec animations */}
              <div className="parallax-element" style={{ position: 'relative' }}>
                <div 
                  className="card-hover animate-float"
                  style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '1.5rem',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    border: '1px solid rgba(209, 250, 229, 0.5)',
                    padding: '2rem',
                    transform: 'rotate(1deg)',
                    backdropFilter: 'blur(20px)'
                  }}
                >
                  
                  {/* Header Dashboard */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '1.5rem',
                    paddingBottom: '1rem',
                    borderBottom: '1px solid rgba(209, 250, 229, 0.5)'
                  }}>
                    <div 
                      className="animate-pulse-gentle"
                      style={{
                        width: '2rem',
                        height: '2rem',
                        background: 'linear-gradient(135deg, #059669, #047857)',
                        borderRadius: '0.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '0.75rem',
                        boxShadow: '0 4px 15px -3px rgba(5, 150, 105, 0.3)'
                      }}
                    >
                      <svg style={{ width: '1.25rem', height: '1.25rem', color: 'white' }} fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                      </svg>
                    </div>
                    <div>
                      <div style={{ fontWeight: 'bold', color: '#1e293b' }}>Dashboard Swaypp</div>
                      <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Temps réel</div>
                    </div>
                  </div>
                  
                  {/* Carte Revenus avec animation */}
                  <div 
                    className="animate-pulse-gentle"
                    style={{
                      background: 'linear-gradient(135deg, rgba(236, 253, 245, 0.8), rgba(240, 253, 250, 0.8))',
                      borderRadius: '1rem',
                      padding: '1.5rem',
                      marginBottom: '1rem',
                      border: '1px solid rgba(209, 250, 229, 0.5)',
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ color: '#4b5563', fontWeight: '500' }}>Revenus aujourd'hui</span>
                      <span className="animate-bounce-soft" style={{
                        background: 'rgba(209, 250, 229, 0.8)',
                        color: '#047857',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '50px',
                        fontSize: '0.75rem',
                        fontWeight: '600'
                      }}>+15.2%</span>
                    </div>
                    <div className="animate-gradient" style={{ 
                      fontSize: '1.875rem', 
                      fontWeight: 'bold', 
                      marginBottom: '0.25rem',
                      background: 'linear-gradient(135deg, #047857, #059669)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}>
                      2'847 CHF
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#4b5563' }}>
                      23 transactions • 0 CHF commission
                    </div>
                  </div>
                  
                  {/* QR Codes avec hover effect */}
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.8)',
                    borderRadius: '1rem',
                    padding: '1rem',
                    border: '1px solid rgba(229, 231, 235, 0.5)',
                    marginBottom: '1rem',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)'
                    e.target.style.boxShadow = '0 8px 25px -5px rgba(0, 0, 0, 0.1)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)'
                    e.target.style.boxShadow = 'none'
                  }}>
                    <div style={{ color: '#4b5563', fontWeight: '500', marginBottom: '0.75rem' }}>QR Codes actifs</div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div className="animate-pulse-gentle" style={{
                        width: '2.5rem',
                        height: '2.5rem',
                        background: '#059669',
                        borderRadius: '0.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '0.75rem',
                        boxShadow: '0 4px 15px -3px rgba(5, 150, 105, 0.3)'
                      }}>
                        <span style={{ color: 'white', fontWeight: 'bold', fontSize: '0.75rem' }}>QR</span>
                      </div>
                      <div>
                        <div style={{ fontWeight: '600', color: '#1e293b' }}>Menu du jour</div>
                        <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>28.50 CHF</div>
                      </div>
                    </div>
                  </div>

                  {/* Méthodes de paiement avec animations */}
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.8)',
                    borderRadius: '1rem',
                    padding: '1rem',
                    border: '1px solid rgba(229, 231, 235, 0.5)',
                    backdropFilter: 'blur(10px)'
                  }}>
                    <div style={{ color: '#4b5563', fontWeight: '500', marginBottom: '0.75rem' }}>Paiements acceptés</div>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {['TWINT', 'Cartes', 'Apple Pay'].map((method, index) => (
                        <span 
                          key={method}
                          className="animate-bounce-soft"
                          style={{
                            background: index === 0 ? 'rgba(209, 250, 229, 0.8)' : 
                                       index === 1 ? 'rgba(219, 234, 254, 0.8)' : 'rgba(243, 244, 246, 0.8)',
                            color: index === 0 ? '#047857' : 
                                   index === 1 ? '#1d4ed8' : '#374151',
                            padding: '0.4rem 0.75rem',
                            borderRadius: '25px',
                            fontSize: '0.75rem',
                            fontWeight: '500',
                            animationDelay: `${index * 0.2}s`,
                            transition: 'all 0.3s ease',
                            cursor: 'pointer'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.transform = 'scale(1.05)'
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.transform = 'scale(1)'
                          }}
                        >
                          {method}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Éléments flottants animés */}
                <div 
                  className="animate-bounce-soft"
                  style={{
                    position: 'absolute',
                    top: '-1rem',
                    right: '-1rem',
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    color: 'white',
                    padding: '0.75rem',
                    borderRadius: '50%',
                    boxShadow: '0 15px 35px -5px rgba(16, 185, 129, 0.4)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <span style={{ fontSize: '1.125rem' }}>✅</span>
                </div>

                <div 
                  className="animate-float glass-card"
                  style={{
                    position: 'absolute',
                    bottom: '-1.5rem',
                    left: '-1.5rem',
                    background: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '0.75rem',
                    padding: '1rem',
                    boxShadow: '0 15px 35px -5px rgba(0, 0, 0, 0.1)',
                    border: '1px solid rgba(209, 250, 229, 0.5)',
                    backdropFilter: 'blur(20px)'
                  }}
                >
                  <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem' }}>Économies vs concurrence</div>
                  <div className="animate-gradient" style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: 'bold',
                    background: 'linear-gradient(135deg, #059669, #10b981)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    +156 CHF
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#059669' }}>par mois</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ 
          background: 'linear-gradient(135deg, #0f172a, #1e293b)', 
          color: 'white', 
          padding: '4rem 0', 
          textAlign: 'center',
          position: 'relative'
        }}>
          <div className="container">
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              marginBottom: '1rem' 
            }}>
              <div 
                className="animate-pulse-gentle"
                style={{
                  width: '2rem',
                  height: '2rem',
                  background: 'linear-gradient(135deg, #059669, #047857)',
                  borderRadius: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '0.75rem',
                  boxShadow: '0 8px 25px -5px rgba(5, 150, 105, 0.3)'
                }}
              >
                <svg style={{ width: '1.25rem', height: '1.25rem', color: 'white' }} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Swaypp</div>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>
              &copy; 2024 Swaypp SA. Tous droits réservés. Fait avec ❤️ en Suisse.
            </p>
          </div>
        </footer>
      </div>
    </>
  )
}