import { createClient } from '@supabase/supabase-js'
const supabaseUrl = '<your_url_as_string>';
const supabaseKey = 'your_key_as_string';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;