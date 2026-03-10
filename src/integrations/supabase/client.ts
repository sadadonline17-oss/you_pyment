import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const isSupabaseConfigured = () => {
  return (
    SUPABASE_URL && 
    SUPABASE_PUBLISHABLE_KEY && 
    SUPABASE_URL !== 'https://your-project.supabase.co' &&
    SUPABASE_PUBLISHABLE_KEY !== 'your-publishable-key-here' &&
    !SUPABASE_URL.includes('your-project')
  );
};

export const SUPABASE_ENABLED = isSupabaseConfigured();

if (!SUPABASE_ENABLED && import.meta.env.DEV) {
  console.warn('⚠️ Supabase is not configured. Using fallback mode with localStorage.');
}

export const supabase = SUPABASE_ENABLED
  ? createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
      auth: {
        storage: localStorage,
        persistSession: true,
        autoRefreshToken: true,
      }
    })
  : null as any;