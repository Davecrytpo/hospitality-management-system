
-- Lab Tests Table
CREATE TABLE IF NOT EXISTS public.lab_tests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  doctor_id uuid REFERENCES public.doctors(id),
  test_name text NOT NULL,
  test_type text NOT NULL,
  priority text DEFAULT 'routine',
  status text DEFAULT 'ordered',
  sample_collected_at timestamp with time zone,
  result_value text,
  result_unit text,
  reference_range text,
  notes text,
  technician_notes text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);
ALTER TABLE public.lab_tests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage lab tests" ON public.lab_tests FOR ALL USING (is_admin());
CREATE POLICY "Doctors manage lab tests" ON public.lab_tests FOR ALL USING (is_doctor());
CREATE POLICY "Patients view own lab tests" ON public.lab_tests FOR SELECT USING (patient_id = get_my_patient_id());
CREATE POLICY "Service role lab tests" ON public.lab_tests FOR ALL USING (auth.role() = 'service_role');

-- Insurance Claims Table
CREATE TABLE IF NOT EXISTS public.insurance_claims (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  provider_name text NOT NULL,
  policy_number text,
  claim_amount numeric NOT NULL DEFAULT 0,
  approved_amount numeric DEFAULT 0,
  claim_date date DEFAULT CURRENT_DATE,
  status text DEFAULT 'pending',
  diagnosis_code text,
  notes text,
  submitted_by uuid REFERENCES public.profiles(id),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);
ALTER TABLE public.insurance_claims ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage insurance claims" ON public.insurance_claims FOR ALL USING (is_admin());
CREATE POLICY "Patients view own claims" ON public.insurance_claims FOR SELECT USING (patient_id = get_my_patient_id());
CREATE POLICY "Service role insurance claims" ON public.insurance_claims FOR ALL USING (auth.role() = 'service_role');

-- Invoices Table
CREATE TABLE IF NOT EXISTS public.invoices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_number text NOT NULL UNIQUE DEFAULT ('INV-' || to_char(now(), 'YYYY') || '-' || lpad(floor(random()*99999)::text, 5, '0')),
  patient_id uuid NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  issue_date date DEFAULT CURRENT_DATE,
  due_date date,
  subtotal numeric NOT NULL DEFAULT 0,
  tax_amount numeric DEFAULT 0,
  total_amount numeric NOT NULL DEFAULT 0,
  paid_amount numeric DEFAULT 0,
  status text DEFAULT 'unpaid',
  notes text,
  created_by uuid REFERENCES public.profiles(id),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage invoices" ON public.invoices FOR ALL USING (is_admin());
CREATE POLICY "Patients view own invoices" ON public.invoices FOR SELECT USING (patient_id = get_my_patient_id());
CREATE POLICY "Service role invoices" ON public.invoices FOR ALL USING (auth.role() = 'service_role');

-- Invoice Items Table
CREATE TABLE IF NOT EXISTS public.invoice_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id uuid NOT NULL REFERENCES public.invoices(id) ON DELETE CASCADE,
  description text NOT NULL,
  quantity integer DEFAULT 1,
  unit_price numeric NOT NULL DEFAULT 0,
  total_price numeric NOT NULL DEFAULT 0,
  created_at timestamp with time zone DEFAULT now()
);
ALTER TABLE public.invoice_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage invoice items" ON public.invoice_items FOR ALL USING (is_admin());
CREATE POLICY "Service role invoice items" ON public.invoice_items FOR ALL USING (auth.role() = 'service_role');

-- Payments Table
CREATE TABLE IF NOT EXISTS public.payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id uuid REFERENCES public.invoices(id),
  patient_id uuid NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  amount numeric NOT NULL,
  payment_date date DEFAULT CURRENT_DATE,
  payment_method text DEFAULT 'cash',
  reference_number text,
  status text DEFAULT 'completed',
  notes text,
  received_by uuid REFERENCES public.profiles(id),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage payments" ON public.payments FOR ALL USING (is_admin());
CREATE POLICY "Patients view own payments" ON public.payments FOR SELECT USING (patient_id = get_my_patient_id());
CREATE POLICY "Service role payments" ON public.payments FOR ALL USING (auth.role() = 'service_role');

-- Imaging Orders Table
CREATE TABLE IF NOT EXISTS public.imaging_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  doctor_id uuid REFERENCES public.doctors(id),
  imaging_type text NOT NULL,
  body_area text,
  priority text DEFAULT 'routine',
  status text DEFAULT 'ordered',
  clinical_indication text,
  radiologist_report text,
  image_url text,
  scheduled_at timestamp with time zone,
  completed_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);
ALTER TABLE public.imaging_orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage imaging" ON public.imaging_orders FOR ALL USING (is_admin());
CREATE POLICY "Doctors manage imaging" ON public.imaging_orders FOR ALL USING (is_doctor());
CREATE POLICY "Patients view own imaging" ON public.imaging_orders FOR SELECT USING (patient_id = get_my_patient_id());
CREATE POLICY "Service role imaging" ON public.imaging_orders FOR ALL USING (auth.role() = 'service_role');

-- Pharmacy Dispenses Table
CREATE TABLE IF NOT EXISTS public.pharmacy_dispenses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  prescription_id uuid REFERENCES public.prescriptions(id),
  patient_id uuid NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  medication_name text NOT NULL,
  quantity_dispensed integer NOT NULL DEFAULT 1,
  unit text DEFAULT 'tablets',
  dispensed_by uuid REFERENCES public.profiles(id),
  batch_number text,
  expiry_date date,
  notes text,
  status text DEFAULT 'dispensed',
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);
ALTER TABLE public.pharmacy_dispenses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage dispenses" ON public.pharmacy_dispenses FOR ALL USING (is_admin());
CREATE POLICY "Patients view own dispenses" ON public.pharmacy_dispenses FOR SELECT USING (patient_id = get_my_patient_id());
CREATE POLICY "Service role dispenses" ON public.pharmacy_dispenses FOR ALL USING (auth.role() = 'service_role');

-- Pharmacy Inventory Table
CREATE TABLE IF NOT EXISTS public.pharmacy_inventory (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  generic_name text,
  category text,
  dosage_form text,
  strength text,
  stock_quantity integer DEFAULT 0,
  minimum_stock integer DEFAULT 50,
  unit_price numeric DEFAULT 0,
  supplier text,
  batch_number text,
  expiry_date date,
  storage_location text,
  reorder_level integer DEFAULT 100,
  status text DEFAULT 'in_stock',
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);
ALTER TABLE public.pharmacy_inventory ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage pharmacy inventory" ON public.pharmacy_inventory FOR ALL USING (is_admin());
CREATE POLICY "Authenticated view inventory" ON public.pharmacy_inventory FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Service role inventory" ON public.pharmacy_inventory FOR ALL USING (auth.role() = 'service_role');

-- Vitals Records Table
CREATE TABLE IF NOT EXISTS public.vitals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  recorded_by uuid REFERENCES public.profiles(id),
  blood_pressure_systolic integer,
  blood_pressure_diastolic integer,
  heart_rate integer,
  temperature numeric,
  respiratory_rate integer,
  oxygen_saturation numeric,
  weight numeric,
  height numeric,
  bmi numeric,
  blood_glucose numeric,
  notes text,
  recorded_at timestamp with time zone DEFAULT now(),
  created_at timestamp with time zone DEFAULT now()
);
ALTER TABLE public.vitals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage vitals" ON public.vitals FOR ALL USING (is_admin());
CREATE POLICY "Doctors manage vitals" ON public.vitals FOR ALL USING (is_doctor());
CREATE POLICY "Patients view own vitals" ON public.vitals FOR SELECT USING (patient_id = get_my_patient_id());
CREATE POLICY "Service role vitals" ON public.vitals FOR ALL USING (auth.role() = 'service_role');

-- Admissions Table
CREATE TABLE IF NOT EXISTS public.admissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  doctor_id uuid REFERENCES public.doctors(id),
  admission_date date DEFAULT CURRENT_DATE,
  discharge_date date,
  ward text,
  bed_number text,
  diagnosis text,
  status text DEFAULT 'admitted',
  notes text,
  admitted_by uuid REFERENCES public.profiles(id),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);
ALTER TABLE public.admissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage admissions" ON public.admissions FOR ALL USING (is_admin());
CREATE POLICY "Doctors manage admissions" ON public.admissions FOR ALL USING (is_doctor());
CREATE POLICY "Patients view own admissions" ON public.admissions FOR SELECT USING (patient_id = get_my_patient_id());
CREATE POLICY "Service role admissions" ON public.admissions FOR ALL USING (auth.role() = 'service_role');

-- Diagnoses Table
CREATE TABLE IF NOT EXISTS public.diagnoses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  doctor_id uuid REFERENCES public.doctors(id),
  diagnosis_code text,
  diagnosis_name text NOT NULL,
  description text,
  severity text DEFAULT 'mild',
  status text DEFAULT 'active',
  diagnosed_date date DEFAULT CURRENT_DATE,
  resolved_date date,
  notes text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);
ALTER TABLE public.diagnoses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage diagnoses" ON public.diagnoses FOR ALL USING (is_admin());
CREATE POLICY "Doctors manage diagnoses" ON public.diagnoses FOR ALL USING (is_doctor());
CREATE POLICY "Patients view own diagnoses" ON public.diagnoses FOR SELECT USING (patient_id = get_my_patient_id());
CREATE POLICY "Service role diagnoses" ON public.diagnoses FOR ALL USING (auth.role() = 'service_role');

-- Nurse Vitals Monitor (Ward Assignments)
CREATE TABLE IF NOT EXISTS public.ward_beds (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ward_name text NOT NULL,
  bed_number text NOT NULL,
  patient_id uuid REFERENCES public.patients(id),
  admission_id uuid REFERENCES public.admissions(id),
  status text DEFAULT 'available',
  notes text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  UNIQUE(ward_name, bed_number)
);
ALTER TABLE public.ward_beds ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage ward beds" ON public.ward_beds FOR ALL USING (is_admin());
CREATE POLICY "Authenticated view ward beds" ON public.ward_beds FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Service role ward beds" ON public.ward_beds FOR ALL USING (auth.role() = 'service_role');

-- Incident Reports Table
CREATE TABLE IF NOT EXISTS public.incident_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES public.patients(id),
  reported_by uuid REFERENCES public.profiles(id),
  incident_type text NOT NULL,
  severity text DEFAULT 'low',
  description text NOT NULL,
  location text,
  action_taken text,
  status text DEFAULT 'open',
  incident_date timestamp with time zone DEFAULT now(),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);
ALTER TABLE public.incident_reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage incidents" ON public.incident_reports FOR ALL USING (is_admin());
CREATE POLICY "Authenticated view incidents" ON public.incident_reports FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Service role incidents" ON public.incident_reports FOR ALL USING (auth.role() = 'service_role');

-- Feedback & Complaints Table
CREATE TABLE IF NOT EXISTS public.feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES public.patients(id),
  patient_name text,
  feedback_type text DEFAULT 'general',
  subject text NOT NULL,
  message text NOT NULL,
  rating integer,
  status text DEFAULT 'open',
  response text,
  responded_by uuid REFERENCES public.profiles(id),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage feedback" ON public.feedback FOR ALL USING (is_admin());
CREATE POLICY "Anyone can insert feedback" ON public.feedback FOR INSERT WITH CHECK (true);
CREATE POLICY "Patients view own feedback" ON public.feedback FOR SELECT USING (patient_id = get_my_patient_id());
CREATE POLICY "Service role feedback" ON public.feedback FOR ALL USING (auth.role() = 'service_role');

-- Blood Bank Table
CREATE TABLE IF NOT EXISTS public.blood_bank (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  blood_type text NOT NULL,
  units_available integer DEFAULT 0,
  units_reserved integer DEFAULT 0,
  expiry_date date,
  donor_name text,
  donor_id text,
  collection_date date DEFAULT CURRENT_DATE,
  status text DEFAULT 'available',
  notes text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);
ALTER TABLE public.blood_bank ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage blood bank" ON public.blood_bank FOR ALL USING (is_admin());
CREATE POLICY "Authenticated view blood bank" ON public.blood_bank FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Service role blood bank" ON public.blood_bank FOR ALL USING (auth.role() = 'service_role');

-- Doctor Consultation Notes Table
CREATE TABLE IF NOT EXISTS public.consultation_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  doctor_id uuid NOT NULL REFERENCES public.doctors(id),
  appointment_id uuid REFERENCES public.appointments(id),
  chief_complaint text,
  history_of_illness text,
  physical_examination text,
  assessment text,
  plan text,
  follow_up_date date,
  is_confidential boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);
ALTER TABLE public.consultation_notes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage consultation notes" ON public.consultation_notes FOR ALL USING (is_admin());
CREATE POLICY "Doctors manage own consultation notes" ON public.consultation_notes FOR ALL USING (is_doctor());
CREATE POLICY "Patients view own consultation notes" ON public.consultation_notes FOR SELECT USING (patient_id = get_my_patient_id());
CREATE POLICY "Service role consultation notes" ON public.consultation_notes FOR ALL USING (auth.role() = 'service_role');

-- Storage bucket for document uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('medical-documents', 'medical-documents', false) ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('imaging', 'imaging', false) ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Admins can manage medical documents" ON storage.objects FOR ALL USING (bucket_id = 'medical-documents' AND is_admin());
CREATE POLICY "Patients can view own documents" ON storage.objects FOR SELECT USING (bucket_id = 'medical-documents' AND auth.role() = 'authenticated');
CREATE POLICY "Authenticated upload documents" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'medical-documents' AND auth.role() = 'authenticated');
CREATE POLICY "Admins can manage imaging files" ON storage.objects FOR ALL USING (bucket_id = 'imaging' AND is_admin());
CREATE POLICY "Authenticated view imaging" ON storage.objects FOR SELECT USING (bucket_id = 'imaging' AND auth.role() = 'authenticated');
