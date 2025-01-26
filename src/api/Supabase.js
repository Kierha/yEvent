import { createClient } from "@supabase/supabase-js";

/**
 * Initialisation du client Supabase.
 * Les clés et l'URL sont spécifiques au projet.
 */
const SUPABASE_URL = "https://gkvmmlswsjjjrqbtnrgh.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdrdm1tbHN3c2pqanJxYnRucmdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcyNzk5NzAsImV4cCI6MjA1Mjg1NTk3MH0.RYnV4pg40zNX4Eeks8UZH6-kkqbNhZsnZvSXPslv8hU";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
