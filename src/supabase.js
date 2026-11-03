import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://xxedomimfvxflrsxngjk.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4ZWRvbWltZnZ4Zmxyc3huZ2prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMzMzA0MzAsImV4cCI6MjEwODkwNjQzMH0.QgJJP7B-Jd_DR9Im08zpVtIn9rka_ip9Ar0iWDCYfck';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
