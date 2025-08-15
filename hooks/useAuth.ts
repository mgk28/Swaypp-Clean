// hooks/useAuth.ts
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../lib/supabase'

export function useAuth(requireAuth = true) {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkUser()
  }, [])

  async function checkUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      
      if (error || !user) {
        if (requireAuth) {
          router.push('/auth/signin')
        }
        setLoading(false)
        return
      }

      // Récupérer le profil
      const { data: profileData } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      setUser(user)
      setProfile(profileData)
      setLoading(false)
    } catch (error) {
      console.error('Erreur:', error)
      setLoading(false)
      if (requireAuth) {
        router.push('/auth/signin')
      }
    }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  return {
    user,
    profile,
    loading,
    signOut
  }
}