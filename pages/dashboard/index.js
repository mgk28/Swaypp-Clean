import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Données de démonstration
  const stats = {
    revenue: '2847',
    transactions: 23,
    qrCodes: 3,
    plan: 'FREE'
  }

  const recentTransactions = [
    { id: 1, amount: '28.50', description: 'Menu du jour', status: 'completed', date: 'Aujourd\'hui 14:32' },
    { id: 2, amount: '45.00', description: 'Plat à emporter', status: 'completed', date: 'Aujourd\'hui 12:15' },
    { id: 3, amount: '15.50', description: 'Café + dessert', status: 'pending', date: 'Aujourd\'hui 11:48' }
  ]

  return (
    <>
      <Head>
        <title>Dashboard - Swaypp</title>
        <meta name="description" content="Tableau de bord Swaypp - Gérez vos paiements" />
      </Head>

      <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar Mobile Overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white shadow-xl">
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  type="button"
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="text-white text-xl">✕</span>
                </button>
              </div>
              
              {/* Sidebar Content Mobile */}
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <div className="flex-shrink-0 flex items-center px-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">S</span>
                    </div>
                    <div className="font-bold text-slate-800">SWAYPP</div>
                  </div>
                </div>
                <nav className="mt-5 px-2 space-y-1">
                  <Link href="/dashboard" className="bg-emerald-100 border-emerald-500 text-emerald-700 group flex items-center px-2 py-2 text-sm font-medium border-l-4 transition-colors">
                    <span className="mr-3 text-xl">📊</span>
                    Dashboard
                  </Link>
                  <Link href="/dashboard/qr" className="border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium border-l-4 transition-colors">
                    <span className="mr-3 text-xl">📱</span>
                    QR Codes
                  </Link>
                  <Link href="/dashboard/transactions" className="border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium border-l-4 transition-colors">
                    <span className="mr-3 text-xl">💳</span>
                    Transactions
                  </Link>
                  <Link href="/dashboard/analytics" className="border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium border-l-4 transition-colors">
                    <span className="mr-3 text-xl">📈</span>
                    Analytics
                  </Link>
                  <Link href="/dashboard/settings" className="border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium border-l-4 transition-colors">
                    <span className="mr-3 text-xl">⚙️</span>
                    Paramètres
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        )}

        {/* Sidebar Desktop - MAGNIFIQUE ÉMERAUDE */}
        <div className="hidden lg:flex lg:flex-shrink-0">
          <div className="flex flex-col w-64">
            <div className="flex flex-col h-0 flex-1">
              <div className="flex items-center h-16 flex-shrink-0 px-4 bg-gradient-to-r from-emerald-600 to-emerald-700 shadow-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">S</span>
                  </div>
                  <div className="font-bold text-white">SWAYPP</div>
                </div>
              </div>
              
              <div className="flex-1 flex flex-col overflow-y-auto bg-white border-r border-gray-200 shadow-lg">
                <nav className="flex-1 px-2 py-4 space-y-1">
                  <Link href="/dashboard" className="bg-emerald-100 border-emerald-500 text-emerald-700 group flex items-center px-2 py-2 text-sm font-medium border-l-4 transition-colors rounded-r-lg">
                    <span className="mr-3 text-xl">📊</span>
                    Dashboard
                  </Link>
                  <Link href="/dashboard/qr" className="border-transparent text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 group flex items-center px-2 py-2 text-sm font-medium border-l-4 transition-colors rounded-r-lg">
                    <span className="mr-3 text-xl">📱</span>
                    QR Codes
                  </Link>
                  <Link href="/dashboard/transactions" className="border-transparent text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 group flex items-center px-2 py-2 text-sm font-medium border-l-4 transition-colors rounded-r-lg">
                    <span className="mr-3 text-xl">💳</span>
                    Transactions
                  </Link>
                  <Link href="/dashboard/analytics" className="border-transparent text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 group flex items-center px-2 py-2 text-sm font-medium border-l-4 transition-colors rounded-r-lg">
                    <span className="mr-3 text-xl">📈</span>
                    Analytics
                  </Link>
                  <Link href="/dashboard/settings" className="border-transparent text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 group flex items-center px-2 py-2 text-sm font-medium border-l-4 transition-colors rounded-r-lg">
                    <span className="mr-3 text-xl">⚙️</span>
                    Paramètres
                  </Link>
                </nav>
                
                {/* User Profile - MAGNIFIQUE */}
                <div className="flex-shrink-0 border-t border-gray-200 p-4 bg-gradient-to-r from-emerald-50 to-teal-50">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium text-sm">U</span>
                      </div>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-700">Utilisateur Demo</p>
                      <div className="flex items-center">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                          🎁 Gratuit
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="mt-3 flex items-center text-sm text-gray-600 hover:text-gray-900 w-full">
                    <span className="mr-3">🚪</span>
                    Se déconnecter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col w-0 flex-1 overflow-hidden">
          {/* Mobile Header */}
          <div className="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:hidden shadow-sm">
            <button
              type="button"
              className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="text-xl">☰</span>
            </button>
            <div className="flex-1 flex justify-between px-4">
              <div className="flex-1 flex">
                <div className="w-full flex md:ml-0">
                  <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                    <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                      <div className="w-6 h-6 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded flex items-center justify-center">
                        <span className="text-white font-bold text-xs">S</span>
                      </div>
                    </div>
                    <div className="ml-8 flex items-center h-full">
                      <span className="font-semibold text-gray-900">Dashboard</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Page Content - MAGNIFIQUE */}
          <main className="flex-1 relative overflow-y-auto focus:outline-none">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                
                {/* Header Dashboard */}
                <div className="lg:flex lg:items-center lg:justify-between mb-8">
                  <div className="flex-1 min-w-0">
                    <h2 className="text-3xl font-bold leading-7 text-gray-900 sm:text-4xl sm:truncate">
                      Tableau de bord
                    </h2>
                    <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <span className="mr-2">📅</span>
                        Mis à jour il y a quelques instants
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 flex lg:mt-0 lg:ml-4">
                    <Link
                      href="/dashboard/qr"
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all"
                    >
                      <span className="mr-2">➕</span>
                      Créer QR Code
                    </Link>
                  </div>
                </div>

                {/* Plan Status Banner */}
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-6 mb-8 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start">
                      <span className="text-2xl mr-3">🎁</span>
                      <div>
                        <h3 className="font-semibold text-emerald-800 mb-1">Plan Gratuit Actif</h3>
                        <p className="text-emerald-700 text-sm mb-2">
                          Profitez de tous les paiements avec 0% de commission. Vos clients paient les frais en toute transparence.
                        </p>
                        <div className="flex items-center text-xs text-emerald-600">
                          <span className="mr-1">✅</span>
                          <span>QR codes utilisés : {stats.qrCodes}/5 • Transactions illimitées</span>
                        </div>
                      </div>
                    </div>
                    <Link
                      href="#pricing"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-all text-sm whitespace-nowrap"
                    >
                      Voir Pro
                    </Link>
                  </div>
                </div>

                {/* Stats Grid - MAGNIFIQUE */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                  <div className="bg-white overflow-hidden shadow-lg rounded-2xl border border-gray-100 hover:shadow-xl transition-all transform hover:scale-105">
                    <div className="p-6">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl flex items-center justify-center">
                            <span className="text-2xl">💰</span>
                          </div>
                        </div>
                        <div className="ml-4 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">Revenus Total</dt>
                            <dd className="flex items-baseline">
                              <div className="text-2xl font-semibold text-gray-900">{stats.revenue} CHF</div>
                              <div className="ml-2 flex items-baseline text-sm font-semibold text-emerald-600">
                                <span className="mr-1">📈</span>
                                +15.2%
                              </div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white overflow-hidden shadow-lg rounded-2xl border border-gray-100 hover:shadow-xl transition-all transform hover:scale-105">
                    <div className="p-6">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                            <span className="text-2xl">💳</span>
                          </div>
                        </div>
                        <div className="ml-4 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">Transactions</dt>
                            <dd className="flex items-baseline">
                              <div className="text-2xl font-semibold text-gray-900">{stats.transactions}</div>
                              <div className="ml-2 flex items-baseline text-sm font-semibold text-blue-600">
                                <span className="mr-1">⚡</span>
                                Aujourd'hui
                              </div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white overflow-hidden shadow-lg rounded-2xl border border-gray-100 hover:shadow-xl transition-all transform hover:scale-105">
                    <div className="p-6">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center">
                            <span className="text-2xl">📱</span>
                          </div>
                        </div>
                        <div className="ml-4 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">QR Codes Actifs</dt>
                            <dd className="flex items-baseline">
                              <div className="text-2xl font-semibold text-gray-900">{stats.qrCodes}</div>
                              <div className="ml-2 flex items-baseline text-sm font-semibold text-purple-600">
                                <span className="mr-1">📊</span>
                                /5 gratuits
                              </div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white overflow-hidden shadow-lg rounded-2xl border border-gray-100 hover:shadow-xl transition-all transform hover:scale-105">
                    <div className="p-6">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center">
                            <span className="text-2xl">✅</span>
                          </div>
                        </div>
                        <div className="ml-4 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">Commission</dt>
                            <dd className="flex items-baseline">
                              <div className="text-2xl font-semibold text-emerald-600">0 CHF</div>
                              <div className="ml-2 flex items-baseline text-sm font-semibold text-emerald-600">
                                <span className="mr-1">🎉</span>
                                100%
                              </div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Transactions - MAGNIFIQUE */}
                <div className="bg-white shadow-lg rounded-2xl border border-gray-100 mb-8">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                      <span className="mr-2">💳</span>
                      Transactions Récentes
                    </h3>
                  </div>
                  <div className="overflow-hidden">
                    <ul className="divide-y divide-gray-200">
                      {recentTransactions.map((transaction) => (
                        <li key={transaction.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className={`flex-shrink-0 w-3 h-3 rounded-full ${
                                transaction.status === 'completed' 
                                  ? 'bg-emerald-400 animate-pulse' 
                                  : 'bg-amber-400 animate-pulse'
                              }`}></div>
                              <div className="ml-4">
                                <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
                                <p className="text-sm text-gray-500">{transaction.date}</p>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <span className="text-lg font-semibold text-emerald-600">
                                +{transaction.amount} CHF
                              </span>
                              <span className="ml-2">
                                {transaction.status === 'completed' ? '✅' : '⏰'}
                              </span>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
                    <Link
                      href="/dashboard/transactions"
                      className="text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center"
                    >
                      Voir toutes les transactions
                      <span className="ml-1">→</span>
                    </Link>
                  </div>
                </div>

                {/* Quick Actions - MAGNIFIQUE */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  <Link
                    href="/dashboard/qr"
                    className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-emerald-500 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all transform hover:scale-105"
                  >
                    <div>
                      <span className="text-3xl mb-4 block">📱</span>
                      <div className="text-lg font-medium">
                        <div className="focus:outline-none">
                          <span className="absolute inset-0" aria-hidden="true" />
                          Créer un QR Code
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Générez un QR code personnalisé pour vos paiements
                      </p>
                    </div>
                    <span
                      className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-emerald-400 transition-colors"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </Link>

                  <Link
                    href="/dashboard/analytics"
                    className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-emerald-500 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all transform hover:scale-105"
                  >
                    <div>
                      <span className="text-3xl mb-4 block">📊</span>
                      <div className="text-lg font-medium">
                        <div className="focus:outline-none">
                          <span className="absolute inset-0" aria-hidden="true" />
                          Voir Analytics
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Analysez vos performances et revenus
                      </p>
                    </div>
                    <span
                      className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-emerald-400 transition-colors"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </Link>

                  <Link
                    href="/dashboard/settings"
                    className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-emerald-500 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all transform hover:scale-105"
                  >
                    <div>
                      <span className="text-3xl mb-4 block">⚙️</span>
                      <div className="text-lg font-medium">
                        <div className="focus:outline-none">
                          <span className="absolute inset-0" aria-hidden="true" />
                          Paramètres
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Configurez votre compte et préférences
                      </p>
                    </div>
                    <span
                      className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-emerald-400 transition-colors"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
