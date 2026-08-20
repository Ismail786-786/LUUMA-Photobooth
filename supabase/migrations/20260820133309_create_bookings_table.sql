/*
# Create booking_requests table (single-tenant, no auth)

1. New Tables
- `booking_requests`
  - `id` (uuid, primary key)
  - `name` (text, not null) — client's full name
  - `email` (text, not null) — client's email for follow-up
  - `event_type` (text, not null) — wedding, corporate, brand, private
  - `event_date` (date, not null) — requested event date
  - `hours` (integer, not null, default 3) — number of booked hours
  - `addons` (text[], default '{}') — selected add-on slugs
  - `estimated_total` (integer, not null, default 0) — estimated quote in USD cents
  - `message` (text) — optional notes from client
  - `status` (text, not null, default 'pending') — pending / confirmed / declined
  - `created_at` (timestamptz, default now())
2. Security
- Enable RLS on `booking_requests`.
- Allow anon + authenticated CRUD because the site has no sign-in screen and
  booking submissions are intentionally public-facing.
*/

CREATE TABLE IF NOT EXISTS booking_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  event_type text NOT NULL,
  event_date date NOT NULL,
  hours integer NOT NULL DEFAULT 3,
  addons text[] NOT NULL DEFAULT '{}',
  estimated_total integer NOT NULL DEFAULT 0,
  message text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE booking_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_bookings" ON booking_requests;
CREATE POLICY "anon_select_bookings" ON booking_requests FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_bookings" ON booking_requests;
CREATE POLICY "anon_insert_bookings" ON booking_requests FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_bookings" ON booking_requests;
CREATE POLICY "anon_update_bookings" ON booking_requests FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_bookings" ON booking_requests;
CREATE POLICY "anon_delete_bookings" ON booking_requests FOR DELETE
  TO anon, authenticated USING (true);
