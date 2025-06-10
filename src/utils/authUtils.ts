
import { supabase } from '@/integrations/supabase/client'
import type { User } from '@supabase/supabase-js'

export interface UserProfile {
  id: string
  user_id: string
  role: 'admin' | 'user'
  first_name?: string
  last_name?: string
  created_at: string
  updated_at: string
}

export interface AppUser extends User {
  profile?: UserProfile
  role?: 'admin' | 'user'
}

export const getCurrentUser = async (): Promise<AppUser | null> => {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return null

  // Get user profile with role
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('user_id', user.id)
    .single()

  return {
    ...user,
    profile,
    role: profile?.role || 'user'
  }
}

export const signUp = async (email: string, password: string, role: 'admin' | 'user', firstName?: string, lastName?: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role,
        first_name: firstName,
        last_name: lastName
      }
    }
  })

  if (error) return { error }

  return { data, error: null }
}

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) return { error }

  return { data, error: null }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const isAdmin = (user: AppUser | null): boolean => {
  return user?.role === 'admin'
}
