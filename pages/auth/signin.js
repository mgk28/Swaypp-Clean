import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulation de connexion
    setTimeout(() => {
      setMessage('Vérifiez votre boîte email pour le lien de connexion !')
      setLoading(false)
    }, 1000)
  }

  return (
    <>
      <Head>
        <title>Connexion - Swaypp</title>
        <meta name="description" content="Connectez-vous à votre compte Swaypp" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        {/* Background animé */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-10 -left-10 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -top-10 -right-10 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative z-10">
          {/* Header avec logo */}
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
            </div>
            <h2 className="text-center text-3xl font-bold text-slate-800">
              Connectez-vous à Swaypp
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Accédez à votre dashboard et commencez à recevoir 100% de vos revenus
            </p>
          </div>

          {/* Formulaire de connexion */}
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow-xl rounded-2xl border border-emerald-100 sm:px-10">
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Adresse email
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="appearance-none block w-full px-3 py-3 pl-10 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="votre@email.ch"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-400">📧</span>
                    </div>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 transition-all shadow-md hover:shadow-lg transform hover:scale-105"
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      <>
                        <span className="mr-2">📧</span>
                        Se connecter par email
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Message de confirmation */}
              {message && (
                <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-emerald-600 mr-2">✅</span>
                    <span className="text-emerald-800 text-sm">{message}</span>
                  </div>
                </div>
              )}

              {/* Avantages Swaypp */}
              <div className="mt-8 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-200">
                <h3 className="text-sm font-semibold text-emerald-800 mb-3 flex items-center">
                  <span className="mr-2">⭐</span>
                  Pourquoi choisir Swaypp ?
                </h3>
                <ul className="space-y-2 text-sm text-emerald-700">
                  <li className="flex items-center">
                    <span className="text-emerald-500 mr-2">✅</span>
                    100% de vos revenus sans commission cachée
                  </li>
                  <li className="flex items-center">
                    <span className="text-emerald-500 mr-2">✅</span>
                    QR codes suisses gratuits et illimités
                  </li>
                  <li className="flex items-center">
                    <span className="text-emerald-500 mr-2">✅</span>
                    Analytics avancés pour optimiser vos ventes
                  </li>
                </ul>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center">
              <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <span className="mr-1">🛡️</span>
                  Sécurisé par design
                </div>
                <div className="flex items-center">
                  <span className="mr-1">⚡</span>
                  Configuration en 2 minutes
                </div>
              </div>
              
              <div className="mt-4">
                <Link 
                  href="/"
                  className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                >
                  <span className="mr-1">←</span>
                  Retour à l'accueil
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </>
  )
}
