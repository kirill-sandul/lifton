import { createClient } from "@supabase/supabase-js"

export const supabaseProvider = {
  provide: 'SUPABASE_CLIENT',
  useFactory: () => {
    return createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY!
    )
  }
}