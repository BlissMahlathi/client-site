import { createClient } from './server'

export async function getAdminSession() {
  const supabase = await createClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  return { user, error }
}

export async function signOutAdmin() {
  const supabase = await createClient()
  return await supabase.auth.signOut()
}
