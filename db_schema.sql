-- Run this in your Supabase SQL Editor

CREATE TABLE valentines (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  sender_name TEXT,
  recipient_name TEXT,
  questions JSONB,
  letter JSONB,
  card_image TEXT, -- We will store base64 string here for simplicity (though Storage is better for large files)
  card_message TEXT
);

-- Enable Row Level Security (RLS)
ALTER TABLE valentines ENABLE ROW LEVEL SECURITY;

-- Allow anyone to create a valentine (Insert)
CREATE POLICY "Allow public inserts" 
ON valentines FOR INSERT 
WITH CHECK (true);

-- Allow anyone to read a valentine if they have the ID (Select)
CREATE POLICY "Allow public reads" 
ON valentines FOR SELECT 
USING (true);
