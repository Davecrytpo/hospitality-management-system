-- Create role enum
CREATE TYPE public.user_role AS ENUM ('admin', 'patient', 'doctor');

-- Create profiles table (linked to auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  email TEXT NOT NULL,
  phone TEXT,
  full_name TEXT,
  role user_role NOT NULL DEFAULT 'patient',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create patients table with encrypted sensitive data
CREATE TABLE public.patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  gender TEXT,
  blood_type TEXT,
  phone TEXT,
  email TEXT,
  address TEXT,
  emergency_contact_name TEXT,
  emergency_contact_phone TEXT,
  emergency_contact_relationship TEXT,
  insurance_provider TEXT,
  insurance_number TEXT,
  allergies TEXT,
  existing_conditions TEXT,
  registration_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create doctors table
CREATE TABLE public.doctors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  specialization TEXT NOT NULL,
  license_number TEXT,
  phone TEXT,
  email TEXT,
  department TEXT,
  is_available BOOLEAN DEFAULT true,
  consultation_fee DECIMAL(10,2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create patient invitations table
CREATE TABLE public.patient_invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE,
  patient_email TEXT,
  patient_phone TEXT,
  verification_code TEXT NOT NULL,
  delivery_method TEXT NOT NULL CHECK (delivery_method IN ('email', 'sms')),
  expires_at TIMESTAMPTZ NOT NULL,
  used_at TIMESTAMPTZ,
  created_by UUID REFERENCES public.profiles(id) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create appointments table
CREATE TABLE public.appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE NOT NULL,
  doctor_id UUID REFERENCES public.doctors(id) ON DELETE CASCADE NOT NULL,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  duration_minutes INTEGER DEFAULT 30,
  reason TEXT,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show')),
  notes TEXT,
  reminder_email BOOLEAN DEFAULT false,
  reminder_sms BOOLEAN DEFAULT false,
  reminder_push BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create prescriptions table
CREATE TABLE public.prescriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE NOT NULL,
  doctor_id UUID REFERENCES public.doctors(id) ON DELETE CASCADE NOT NULL,
  appointment_id UUID REFERENCES public.appointments(id) ON DELETE SET NULL,
  medication_name TEXT NOT NULL,
  dosage TEXT NOT NULL,
  frequency TEXT NOT NULL,
  duration TEXT,
  instructions TEXT,
  start_date DATE NOT NULL,
  end_date DATE,
  refills_remaining INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create medical records table
CREATE TABLE public.medical_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE NOT NULL,
  doctor_id UUID REFERENCES public.doctors(id),
  record_type TEXT NOT NULL CHECK (record_type IN ('diagnosis', 'lab_result', 'imaging', 'procedure', 'consultation', 'other')),
  title TEXT NOT NULL,
  description TEXT,
  diagnosis TEXT,
  treatment TEXT,
  file_url TEXT,
  record_date DATE NOT NULL DEFAULT CURRENT_DATE,
  is_confidential BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patient_invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prescriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medical_records ENABLE ROW LEVEL SECURITY;

-- Helper function: Check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE user_id = auth.uid() AND role = 'admin'
  )
$$;

-- Helper function: Check if user is patient
CREATE OR REPLACE FUNCTION public.is_patient()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE user_id = auth.uid() AND role = 'patient'
  )
$$;

-- Helper function: Check if user is doctor
CREATE OR REPLACE FUNCTION public.is_doctor()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE user_id = auth.uid() AND role = 'doctor'
  )
$$;

-- Helper function: Get current user's profile ID
CREATE OR REPLACE FUNCTION public.get_my_profile_id()
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id FROM public.profiles WHERE user_id = auth.uid()
$$;

-- Helper function: Get current user's patient ID
CREATE OR REPLACE FUNCTION public.get_my_patient_id()
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id FROM public.patients WHERE profile_id = public.get_my_profile_id()
$$;

-- Helper function: Get current user's doctor ID
CREATE OR REPLACE FUNCTION public.get_my_doctor_id()
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id FROM public.doctors WHERE profile_id = public.get_my_profile_id()
$$;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (public.is_admin());

CREATE POLICY "Service role can manage profiles" ON public.profiles
  FOR ALL USING (auth.role() = 'service_role');

-- Patients policies
CREATE POLICY "Patients can view own record" ON public.patients
  FOR SELECT USING (profile_id = public.get_my_profile_id());

CREATE POLICY "Patients can update own record" ON public.patients
  FOR UPDATE USING (profile_id = public.get_my_profile_id());

CREATE POLICY "Admins can manage all patients" ON public.patients
  FOR ALL USING (public.is_admin());

CREATE POLICY "Doctors can view their patients" ON public.doctors
  FOR SELECT USING (public.is_doctor());

CREATE POLICY "Service role can manage patients" ON public.patients
  FOR ALL USING (auth.role() = 'service_role');

-- Doctors policies
CREATE POLICY "Anyone authenticated can view doctors" ON public.doctors
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Doctors can update own record" ON public.doctors
  FOR UPDATE USING (profile_id = public.get_my_profile_id());

CREATE POLICY "Admins can manage all doctors" ON public.doctors
  FOR ALL USING (public.is_admin());

CREATE POLICY "Service role can manage doctors" ON public.doctors
  FOR ALL USING (auth.role() = 'service_role');

-- Patient invitations policies
CREATE POLICY "Admins can manage invitations" ON public.patient_invitations
  FOR ALL USING (public.is_admin());

CREATE POLICY "Service role can manage invitations" ON public.patient_invitations
  FOR ALL USING (auth.role() = 'service_role');

-- Appointments policies
CREATE POLICY "Patients can view own appointments" ON public.appointments
  FOR SELECT USING (patient_id = public.get_my_patient_id());

CREATE POLICY "Doctors can view their appointments" ON public.appointments
  FOR SELECT USING (doctor_id = public.get_my_doctor_id());

CREATE POLICY "Admins can manage all appointments" ON public.appointments
  FOR ALL USING (public.is_admin());

CREATE POLICY "Service role can manage appointments" ON public.appointments
  FOR ALL USING (auth.role() = 'service_role');

-- Prescriptions policies
CREATE POLICY "Patients can view own prescriptions" ON public.prescriptions
  FOR SELECT USING (patient_id = public.get_my_patient_id());

CREATE POLICY "Doctors can manage prescriptions" ON public.prescriptions
  FOR ALL USING (public.is_doctor());

CREATE POLICY "Admins can manage all prescriptions" ON public.prescriptions
  FOR ALL USING (public.is_admin());

CREATE POLICY "Service role can manage prescriptions" ON public.prescriptions
  FOR ALL USING (auth.role() = 'service_role');

-- Medical records policies
CREATE POLICY "Patients can view own medical records" ON public.medical_records
  FOR SELECT USING (patient_id = public.get_my_patient_id());

CREATE POLICY "Doctors can manage medical records" ON public.medical_records
  FOR ALL USING (public.is_doctor());

CREATE POLICY "Admins can manage all medical records" ON public.medical_records
  FOR ALL USING (public.is_admin());

CREATE POLICY "Service role can manage medical records" ON public.medical_records
  FOR ALL USING (auth.role() = 'service_role');

-- Update timestamp trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add update triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_patients_updated_at BEFORE UPDATE ON public.patients
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_doctors_updated_at BEFORE UPDATE ON public.doctors
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON public.appointments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_prescriptions_updated_at BEFORE UPDATE ON public.prescriptions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_medical_records_updated_at BEFORE UPDATE ON public.medical_records
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for performance
CREATE INDEX idx_patients_profile_id ON public.patients(profile_id);
CREATE INDEX idx_doctors_profile_id ON public.doctors(profile_id);
CREATE INDEX idx_appointments_patient_id ON public.appointments(patient_id);
CREATE INDEX idx_appointments_doctor_id ON public.appointments(doctor_id);
CREATE INDEX idx_appointments_date ON public.appointments(appointment_date);
CREATE INDEX idx_prescriptions_patient_id ON public.prescriptions(patient_id);
CREATE INDEX idx_medical_records_patient_id ON public.medical_records(patient_id);
CREATE INDEX idx_patient_invitations_code ON public.patient_invitations(verification_code);
CREATE INDEX idx_patient_invitations_expires ON public.patient_invitations(expires_at);