import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://qzbpxovadfxxzywuzjff.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6YnB4b3ZhZGZ4eHp5d3V6amZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjEyNDU4MjcsImV4cCI6MjAzNjgyMTgyN30.X8MOLRL6faS0EUjkBgZGyR8AhiLLtgboJbOyYESjMA0';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;