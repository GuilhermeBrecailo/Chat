import { createClient } from "@supabase/supabase-js";

const supabaseUrl= 'https://iervwtvijwkqjhfqbsnc.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImllcnZ3dHZpandrcWpoZnFic25jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgzOTY1MTksImV4cCI6MjA0Mzk3MjUxOX0.H4v_FinB-gFcur1FgDllG_q5FGv805p-Wrh-YpZ4K98'

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.provide('supabase', supabase);
});