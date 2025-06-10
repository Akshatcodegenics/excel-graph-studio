
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hslttdusoutrlmodunmb.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhzbHR0ZHVzb3V0cmxtb2R1bm1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxMDQ5OTIsImV4cCI6MjA2NDY4MDk5Mn0.CGdSlkKbpf9_zniwndbWWvER8_sP0DCdiDSk7YByAI8'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
})
