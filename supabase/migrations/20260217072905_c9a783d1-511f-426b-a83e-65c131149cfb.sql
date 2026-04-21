
-- Create table for 2FA codes
CREATE TABLE public.patient_2fa_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  code_hash text NOT NULL,
  delivery_method text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL,
  verified_at timestamptz,
  attempts integer NOT NULL DEFAULT 0
);

ALTER TABLE public.patient_2fa_codes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can manage 2fa codes"
ON public.patient_2fa_codes FOR ALL
USING (auth.role() = 'service_role');

CREATE POLICY "Users can view own 2fa codes"
ON public.patient_2fa_codes FOR SELECT
USING (user_id = auth.uid());

-- Index for quick lookup
CREATE INDEX idx_patient_2fa_user_id ON public.patient_2fa_codes(user_id);
CREATE INDEX idx_patient_2fa_expires ON public.patient_2fa_codes(expires_at);
