import { supabase } from "@/integrations/supabase/client";

export interface PatientPortalProfile {
  id: string;
  email: string | null;
  role: string | null;
  phone?: string | null;
}

export interface PatientPortalPatient {
  id: string;
  first_name: string;
  last_name: string;
  email?: string | null;
  phone?: string | null;
  date_of_birth?: string | null;
  blood_type?: string | null;
  gender?: string | null;
  address?: string | null;
  emergency_contact_name?: string | null;
  emergency_contact_phone?: string | null;
  emergency_contact_relationship?: string | null;
  allergies?: string | null;
  existing_conditions?: string | null;
}

export interface PatientPortalContext {
  profile: PatientPortalProfile;
  patient: PatientPortalPatient;
}

export async function getPatientPortalContext(): Promise<PatientPortalContext> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error("AUTH_REQUIRED");
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, email, role, phone")
    .eq("user_id", session.user.id)
    .single();

  if (profileError || !profile || profile.role !== "patient") {
    await supabase.auth.signOut();
    throw new Error("PATIENT_ACCESS_ONLY");
  }

  const { data: patient, error: patientError } = await supabase
    .from("patients")
    .select("*")
    .eq("profile_id", profile.id)
    .single();

  if (patientError || !patient) {
    throw new Error("PATIENT_RECORD_NOT_FOUND");
  }

  return {
    profile,
    patient,
  };
}
