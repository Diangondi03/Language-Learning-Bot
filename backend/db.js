import { createClient } from '@supabase/supabase-js';
import 'dotenv/config'

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

function connectToSupabase() {
  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    console.log('Connected to Supabase Database');
    return supabase;
  } catch (error) {
    console.error('Error connecting to Supabase Database', error.message);
    return null;
  }
}

const supabaseClient = connectToSupabase();


export default supabaseClient
