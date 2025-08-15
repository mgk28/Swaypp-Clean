-- SCHÉMA SWAYPP (à exécuter dans Supabase SQL Editor)

-- Users profiles table
CREATE TABLE user_profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  business_name TEXT,
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'business')),
  qr_codes_used INTEGER DEFAULT 0,
  qr_codes_limit INTEGER DEFAULT 5,
  stripe_customer_id TEXT,
  iban TEXT,
  total_revenue INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- QR Codes table
CREATE TABLE qr_codes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  amount INTEGER,
  type TEXT DEFAULT 'fixed',
  qr_data TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  scans_count INTEGER DEFAULT 0,
  payments_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Transactions table
CREATE TABLE transactions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  qr_code_id UUID REFERENCES qr_codes(id) ON DELETE SET NULL,
  amount INTEGER NOT NULL,
  status TEXT DEFAULT 'pending',
  payment_method TEXT,
  customer_email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- API Configuration table (NOUVELLE!)
CREATE TABLE api_configurations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  service_name TEXT UNIQUE NOT NULL,
  api_key TEXT,
  api_secret TEXT,
  webhook_url TEXT,
  is_active BOOLEAN DEFAULT false,
  configuration JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
