import type { ReactNode } from "react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Loader2, Save, UserRound } from "lucide-react";
import { toast } from "sonner";

import { PatientPortalShell } from "@/components/patient-portal/PatientPortalShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { getPatientPortalContext } from "@/lib/patient-portal";

interface PatientProfile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  gender: string;
  address: string;
  blood_type: string;
  emergency_contact_name: string;
  emergency_contact_phone: string;
  emergency_contact_relationship: string;
  allergies: string;
  existing_conditions: string;
}

export default function PatientProfilePage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [profile, setProfile] = useState<PatientProfile | null>(null);

  const loadProfile = useCallback(async () => {
    try {
      const context = await getPatientPortalContext();

      setProfile({
        id: context.patient.id,
        first_name: context.patient.first_name,
        last_name: context.patient.last_name,
        email: context.patient.email || context.profile.email || "",
        phone: context.patient.phone || "",
        date_of_birth: context.patient.date_of_birth || "",
        gender: context.patient.gender || "",
        address: context.patient.address || "",
        blood_type: context.patient.blood_type || "",
        emergency_contact_name: context.patient.emergency_contact_name || "",
        emergency_contact_phone: context.patient.emergency_contact_phone || "",
        emergency_contact_relationship: context.patient.emergency_contact_relationship || "",
        allergies: context.patient.allergies || "",
        existing_conditions: context.patient.existing_conditions || "",
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to load patient profile.";

      if (message === "AUTH_REQUIRED" || message === "PATIENT_ACCESS_ONLY") {
        navigate("/patient-portal/login");
        return;
      }

      toast.error("Failed to load your profile.");
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/patient-portal/login");
  };

  const handleSave = async () => {
    if (!profile) return;

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("patients")
        .update({
          phone: profile.phone,
          address: profile.address,
          emergency_contact_name: profile.emergency_contact_name,
          emergency_contact_phone: profile.emergency_contact_phone,
          emergency_contact_relationship: profile.emergency_contact_relationship,
          allergies: profile.allergies,
          existing_conditions: profile.existing_conditions,
        })
        .eq("id", profile.id);

      if (error) throw error;

      toast.success("Profile updated successfully.");
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("Failed to update your profile.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f4f8ff]">
        <div className="flex items-center gap-3 rounded-2xl border border-[#dbe4f4] bg-white px-5 py-4 text-sm font-semibold text-[#13306b] shadow-[0_18px_40px_-24px_rgba(19,48,107,0.35)]">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading your profile
        </div>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  const patientName = `${profile.first_name} ${profile.last_name}`;
  const patientMeta = profile.email || "Secure patient access";

  return (
    <PatientPortalShell
      title="My Profile"
      description="Keep your contact details, emergency contacts, and medical notes current so the care team can support you effectively."
      patientName={patientName}
      patientMeta={patientMeta}
      onLogout={handleLogout}
      actions={
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button className="h-12 rounded-xl bg-[#ef2027] text-sm font-bold uppercase text-white hover:bg-[#d61920]" onClick={handleSave} disabled={isSaving}>
            {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Save Changes
          </Button>
          <div className="inline-flex items-center rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white/85">
            Administrative identity updates still require hospital verification.
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        <Card className="rounded-[24px] border border-[#dbe4f4] bg-white shadow-[0_18px_40px_-28px_rgba(19,48,107,0.28)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-extrabold text-[#13306b]">
              <UserRound className="h-5 w-5" />
              Personal Information
            </CardTitle>
            <CardDescription>These identity details are locked. Contact the hospital to amend legal or demographic information.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <ReadOnlyField label="First Name" value={profile.first_name} />
            <ReadOnlyField label="Last Name" value={profile.last_name} />
            <ReadOnlyField label="Date of Birth" value={profile.date_of_birth ? format(new Date(profile.date_of_birth), "MMMM d, yyyy") : "Not specified"} />
            <ReadOnlyField label="Gender" value={profile.gender || "Not specified"} />
            <ReadOnlyField label="Email" value={profile.email} />
            <ReadOnlyField label="Blood Type" value={profile.blood_type || "Not specified"} />
          </CardContent>
        </Card>

        <Card className="rounded-[24px] border border-[#dbe4f4] bg-white shadow-[0_18px_40px_-28px_rgba(19,48,107,0.28)]">
          <CardHeader>
            <CardTitle className="text-xl font-extrabold text-[#13306b]">Contact Information</CardTitle>
            <CardDescription>Update the best phone number and address for reminders and follow-up care.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <EditableField label="Phone Number">
              <Input value={profile.phone || ""} onChange={(event) => setProfile({ ...profile, phone: event.target.value })} placeholder="Enter your phone number" className="h-12 rounded-xl border-[#d5dff2]" />
            </EditableField>
            <EditableField label="Address">
              <Textarea value={profile.address || ""} onChange={(event) => setProfile({ ...profile, address: event.target.value })} placeholder="Enter your address" className="min-h-[120px] rounded-xl border-[#d5dff2]" />
            </EditableField>
          </CardContent>
        </Card>

        <Card className="rounded-[24px] border border-[#dbe4f4] bg-white shadow-[0_18px_40px_-28px_rgba(19,48,107,0.28)]">
          <CardHeader>
            <CardTitle className="text-xl font-extrabold text-[#13306b]">Emergency Contact</CardTitle>
            <CardDescription>Keep this current so the hospital can reach the right person quickly if needed.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <EditableField label="Contact Name">
              <Input value={profile.emergency_contact_name || ""} onChange={(event) => setProfile({ ...profile, emergency_contact_name: event.target.value })} placeholder="Emergency contact name" className="h-12 rounded-xl border-[#d5dff2]" />
            </EditableField>
            <EditableField label="Contact Phone">
              <Input value={profile.emergency_contact_phone || ""} onChange={(event) => setProfile({ ...profile, emergency_contact_phone: event.target.value })} placeholder="Emergency contact phone" className="h-12 rounded-xl border-[#d5dff2]" />
            </EditableField>
            <div className="sm:col-span-2">
              <EditableField label="Relationship">
                <Input value={profile.emergency_contact_relationship || ""} onChange={(event) => setProfile({ ...profile, emergency_contact_relationship: event.target.value })} placeholder="Spouse, parent, sibling, or guardian" className="h-12 rounded-xl border-[#d5dff2]" />
              </EditableField>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-[24px] border border-[#dbe4f4] bg-white shadow-[0_18px_40px_-28px_rgba(19,48,107,0.28)]">
          <CardHeader>
            <CardTitle className="text-xl font-extrabold text-[#13306b]">Medical Notes</CardTitle>
            <CardDescription>Use this area for ongoing allergies and existing conditions that should remain visible to clinicians.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <EditableField label="Known Allergies">
              <Textarea value={profile.allergies || ""} onChange={(event) => setProfile({ ...profile, allergies: event.target.value })} placeholder="List any known allergies" className="min-h-[120px] rounded-xl border-[#d5dff2]" />
            </EditableField>
            <EditableField label="Existing Medical Conditions">
              <Textarea value={profile.existing_conditions || ""} onChange={(event) => setProfile({ ...profile, existing_conditions: event.target.value })} placeholder="List any current or long-term conditions" className="min-h-[120px] rounded-xl border-[#d5dff2]" />
            </EditableField>
          </CardContent>
        </Card>
      </div>
    </PatientPortalShell>
  );
}

function ReadOnlyField({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-2">
      <Label className="text-xs font-bold uppercase tracking-[0.18em] text-[#6f85af]">{label}</Label>
      <Input value={value} disabled className="h-12 rounded-xl border-[#d5dff2] bg-[#f8fbff] text-[#13306b]" />
    </div>
  );
}

function EditableField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-2">
      <Label className="text-xs font-bold uppercase tracking-[0.18em] text-[#6f85af]">{label}</Label>
      {children}
    </div>
  );
}
