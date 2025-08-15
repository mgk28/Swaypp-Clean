rm pages/api/auth/signin.ts

cat > pages/api/auth/signin.ts << 'EOF'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_KEY || ''
)

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { email, password } = req.body
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      return res.status(400).json({ error: error.message })
    }

    return res.status(200).json({ user: data.user, session: data.session })
  } catch (error) {
    return res.status(500).json({ error: 'Server error' })
  }
}
EOF