import { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, User, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

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
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/patient-portal/login");
        return;
      }

      const { data: userProfile } = await supabase
        .from("profiles")
        .select("id, email")
        .eq("user_id", session.user.id)
        .single();

      if (!userProfile) return;

      const { data: patient } = await supabase
        .from("patients")
        .select("*")
        .eq("profile_id", userProfile.id)
        .single();

      if (patient) {
        setProfile({
          ...patient,
          email: patient.email || userProfile.email,
        });
      }
    } catch (error) {
      console.error("Error loading profile:", error);
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

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
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Profile not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" size="icon" asChild>
            <Link to="/patient-portal">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">My Profile</h1>
            <p className="text-muted-foreground">View and update your information</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Personal Information (Read-only) */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
              <CardDescription>
                Contact the hospital to update this information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>First Name</Label>
                  <Input value={profile.first_name} disabled />
                </div>
                <div className="space-y-2">
                  <Label>Last Name</Label>
                  <Input value={profile.last_name} disabled />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Date of Birth</Label>
                  <Input 
                    value={profile.date_of_birth ? format(new Date(profile.date_of_birth), "MMMM d, yyyy") : ""} 
                    disabled 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Gender</Label>
                  <Input value={profile.gender || "Not specified"} disabled className="capitalize" />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input value={profile.email} disabled />
                </div>
                <div className="space-y-2">
                  <Label>Blood Type</Label>
                  <Input value={profile.blood_type || "Not specified"} disabled />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Editable Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Update your contact details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={profile.phone || ""}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  placeholder="Enter your phone number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={profile.address || ""}
                  onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                  placeholder="Enter your address"
                />
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contact */}
          <Card>
            <CardHeader>
              <CardTitle>Emergency Contact</CardTitle>
              <CardDescription>Update your emergency contact information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="emergencyName">Contact Name</Label>
                  <Input
                    id="emergencyName"
                    value={profile.emergency_contact_name || ""}
                    onChange={(e) => setProfile({ ...profile, emergency_contact_name: e.target.value })}
                    placeholder="Emergency contact name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyPhone">Contact Phone</Label>
                  <Input
                    id="emergencyPhone"
                    value={profile.emergency_contact_phone || ""}
                    onChange={(e) => setProfile({ ...profile, emergency_contact_phone: e.target.value })}
                    placeholder="Emergency contact phone"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyRelationship">Relationship</Label>
                <Input
                  id="emergencyRelationship"
                  value={profile.emergency_contact_relationship || ""}
                  onChange={(e) => setProfile({ ...profile, emergency_contact_relationship: e.target.value })}
                  placeholder="e.g., Spouse, Parent, Sibling"
                />
              </div>
            </CardContent>
          </Card>

          {/* Medical Information */}
          <Card>
            <CardHeader>
              <CardTitle>Medical Information</CardTitle>
              <CardDescription>Update your medical history</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="allergies">Known Allergies</Label>
                <Textarea
                  id="allergies"
                  value={profile.allergies || ""}
                  onChange={(e) => setProfile({ ...profile, allergies: e.target.value })}
                  placeholder="List any known allergies"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="conditions">Existing Medical Conditions</Label>
                <Textarea
                  id="conditions"
                  value={profile.existing_conditions || ""}
                  onChange={(e) => setProfile({ ...profile, existing_conditions: e.target.value })}
                  placeholder="List any existing medical conditions"
                />
              </div>
            </CardContent>
          </Card>

          <Button onClick={handleSave} disabled={isSaving} className="w-full">
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
