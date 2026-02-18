
-- =============================================
-- FIX: Convert ALL restrictive RLS policies to PERMISSIVE
-- RESTRICTIVE policies block ALL access when no permissive policies exist
-- =============================================

-- Drop all existing restrictive policies and recreate as permissive

-- ===== PROFILES =====
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Service role can manage profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;

CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT USING (is_admin());
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Service role full access profiles" ON public.profiles FOR ALL USING (auth.role() = 'service_role'::text);

-- ===== PATIENTS =====
DROP POLICY IF EXISTS "Admins can manage all patients" ON public.patients;
DROP POLICY IF EXISTS "Patients can update own record" ON public.patients;
DROP POLICY IF EXISTS "Patients can view own record" ON public.patients;
DROP POLICY IF EXISTS "Service role can manage patients" ON public.patients;

CREATE POLICY "Admins can manage all patients" ON public.patients FOR ALL USING (is_admin());
CREATE POLICY "Patients can view own record" ON public.patients FOR SELECT USING (profile_id = get_my_profile_id());
CREATE POLICY "Patients can update own record" ON public.patients FOR UPDATE USING (profile_id = get_my_profile_id());
CREATE POLICY "Service role full access patients" ON public.patients FOR ALL USING (auth.role() = 'service_role'::text);

-- ===== DOCTORS =====
DROP POLICY IF EXISTS "Admins can manage all doctors" ON public.doctors;
DROP POLICY IF EXISTS "Anyone authenticated can view doctors" ON public.doctors;
DROP POLICY IF EXISTS "Doctors can update own record" ON public.doctors;
DROP POLICY IF EXISTS "Doctors can view their patients" ON public.doctors;
DROP POLICY IF EXISTS "Service role can manage doctors" ON public.doctors;

CREATE POLICY "Admins can manage all doctors" ON public.doctors FOR ALL USING (is_admin());
CREATE POLICY "Authenticated can view doctors" ON public.doctors FOR SELECT USING (auth.role() = 'authenticated'::text);
CREATE POLICY "Doctors can update own record" ON public.doctors FOR UPDATE USING (profile_id = get_my_profile_id());
CREATE POLICY "Service role full access doctors" ON public.doctors FOR ALL USING (auth.role() = 'service_role'::text);

-- ===== APPOINTMENTS =====
DROP POLICY IF EXISTS "Admins can manage all appointments" ON public.appointments;
DROP POLICY IF EXISTS "Doctors can view their appointments" ON public.appointments;
DROP POLICY IF EXISTS "Patients can view own appointments" ON public.appointments;
DROP POLICY IF EXISTS "Service role can manage appointments" ON public.appointments;

CREATE POLICY "Admins can manage all appointments" ON public.appointments FOR ALL USING (is_admin());
CREATE POLICY "Doctors can view their appointments" ON public.appointments FOR SELECT USING (doctor_id = get_my_doctor_id());
CREATE POLICY "Patients can view own appointments" ON public.appointments FOR SELECT USING (patient_id = get_my_patient_id());
CREATE POLICY "Service role full access appointments" ON public.appointments FOR ALL USING (auth.role() = 'service_role'::text);

-- ===== MEDICAL_RECORDS =====
DROP POLICY IF EXISTS "Admins can manage all medical records" ON public.medical_records;
DROP POLICY IF EXISTS "Doctors can manage medical records" ON public.medical_records;
DROP POLICY IF EXISTS "Patients can view own medical records" ON public.medical_records;
DROP POLICY IF EXISTS "Service role can manage medical records" ON public.medical_records;

CREATE POLICY "Admins can manage all medical records" ON public.medical_records FOR ALL USING (is_admin());
CREATE POLICY "Doctors can manage medical records" ON public.medical_records FOR ALL USING (is_doctor());
CREATE POLICY "Patients can view own medical records" ON public.medical_records FOR SELECT USING (patient_id = get_my_patient_id());
CREATE POLICY "Service role full access medical records" ON public.medical_records FOR ALL USING (auth.role() = 'service_role'::text);

-- ===== PRESCRIPTIONS =====
DROP POLICY IF EXISTS "Admins can manage all prescriptions" ON public.prescriptions;
DROP POLICY IF EXISTS "Doctors can manage prescriptions" ON public.prescriptions;
DROP POLICY IF EXISTS "Patients can view own prescriptions" ON public.prescriptions;
DROP POLICY IF EXISTS "Service role can manage prescriptions" ON public.prescriptions;

CREATE POLICY "Admins can manage all prescriptions" ON public.prescriptions FOR ALL USING (is_admin());
CREATE POLICY "Doctors can manage prescriptions" ON public.prescriptions FOR ALL USING (is_doctor());
CREATE POLICY "Patients can view own prescriptions" ON public.prescriptions FOR SELECT USING (patient_id = get_my_patient_id());
CREATE POLICY "Service role full access prescriptions" ON public.prescriptions FOR ALL USING (auth.role() = 'service_role'::text);

-- ===== PATIENT_INVITATIONS =====
DROP POLICY IF EXISTS "Admins can manage invitations" ON public.patient_invitations;
DROP POLICY IF EXISTS "Service role can manage invitations" ON public.patient_invitations;

CREATE POLICY "Admins can manage invitations" ON public.patient_invitations FOR ALL USING (is_admin());
CREATE POLICY "Service role full access invitations" ON public.patient_invitations FOR ALL USING (auth.role() = 'service_role'::text);

-- ===== PATIENT_2FA_CODES =====
DROP POLICY IF EXISTS "Service role can manage 2fa codes" ON public.patient_2fa_codes;
DROP POLICY IF EXISTS "Users can view own 2fa codes" ON public.patient_2fa_codes;

CREATE POLICY "Users can view own 2fa codes" ON public.patient_2fa_codes FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Service role full access 2fa codes" ON public.patient_2fa_codes FOR ALL USING (auth.role() = 'service_role'::text);

-- ===== AUTO-CREATE PROFILE ON SIGNUP =====
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'admin'::user_role)
  );
  RETURN NEW;
END;
$$;

-- Create trigger to auto-create profile on auth signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
