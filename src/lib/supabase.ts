import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type BookingRequest = {
  id: string;
  name: string;
  email: string;
  event_type: string;
  event_date: string;
  hours: number;
  addons: string[];
  estimated_total: number;
  message: string | null;
  status: string;
  created_at: string;
};

export type BookingInsert = {
  name: string;
  email: string;
  event_type: string;
  event_date: string;
  hours: number;
  addons: string[];
  estimated_total: number;
  message?: string | null;
};
