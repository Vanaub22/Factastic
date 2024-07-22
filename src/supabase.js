import { createClient } from '@supabase/supabase-js';

// Fetching environment variables
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Creating a Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;