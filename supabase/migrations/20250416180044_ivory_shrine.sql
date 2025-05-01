/*
  # Conference Talks Schema

  1. New Tables
    - `conference_talks`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `conference_name` (text, required)
      - `date` (date, required)
      - `description` (text)
      - `slides_url` (text)
      - `tags` (text array)
      - `created_at` (timestamp with timezone)
      - `user_id` (uuid, foreign key to auth.users)

  2. Security
    - Enable RLS on `conference_talks` table
    - Add policies for:
      - Public read access
      - Authenticated user write access for own talks
*/

CREATE TABLE conference_talks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  conference_name text NOT NULL,
  date date NOT NULL,
  description text,
  slides_url text,
  tags text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id) NOT NULL
);

ALTER TABLE conference_talks ENABLE ROW LEVEL SECURITY;

-- Allow public read access to all talks
CREATE POLICY "Conference talks are viewable by everyone"
  ON conference_talks
  FOR SELECT
  TO public
  USING (true);

-- Allow users to create their own talks
CREATE POLICY "Users can create their own talks"
  ON conference_talks
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own talks
CREATE POLICY "Users can update their own talks"
  ON conference_talks
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Allow users to delete their own talks
CREATE POLICY "Users can delete their own talks"
  ON conference_talks
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);