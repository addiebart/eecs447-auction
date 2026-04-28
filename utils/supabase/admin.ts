/**
 * Server-only Supabase admin client using the service role key.
 * WARNING: Import this only from server-side code (Server Components,
 * API routes, or server actions). Never expose `SUPABASE_SERVICE_ROLE_KEY`
 * to the browser or include it in client bundles.
 */
import { createClient } from '@supabase/supabase-js'
import { Database } from './database.types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error(
    'Missing Supabase server env vars: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set.'
  )
}

export const createAdminClient = () => {
  return createClient<Database>(supabaseUrl, serviceRoleKey)
}

// Module-level singleton admin client for server-only use.
export const admin = createClient<Database>(supabaseUrl, serviceRoleKey)

export default admin
