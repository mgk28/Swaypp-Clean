import { supabaseAdmin } from '../../../lib/supabase'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Récupérer toutes les configurations
    try {
      const { data, error } = await supabaseAdmin
        .from('api_configurations')
        .select('service_name, configuration, is_active')
      
      if (error) throw error
      
      const configs = {}
      data.forEach(config => {
        configs[config.service_name] = {
          ...config.configuration,
          is_active: config.is_active
        }
      })
      
      res.status(200).json(configs)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
  
  else if (req.method === 'POST') {
    // Sauvegarder une configuration
    const { serviceName, config } = req.body
    
    try {
      const { error } = await supabaseAdmin
        .from('api_configurations')
        .upsert({
          service_name: serviceName,
          configuration: config,
          is_active: true,
          updated_at: new Date().toISOString()
        })
      
      if (error) throw error
      
      res.status(200).json({ success: true })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
  
  else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
