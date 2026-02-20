-- Migration to add INSERT policy to profiles table
-- This allows users to create their own profile during signup

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);
