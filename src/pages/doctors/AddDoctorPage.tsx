import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function AddDoctorPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [consultationFee, setConsultationFee] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName || !lastName || !specialization) {
      toast.error("Please fill in required fields (First Name, Last Name, Specialization)");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.from("doctors").insert({
        first_name: firstName,
        last_name: lastName,
        specialization,
        department: department || null,
        email: email || null,
        phone: phone || null,
        license_number: licenseNumber || null,
        consultation_fee: consultationFee ? parseFloat(consultationFee) : null,
      });

      if (error) throw error;

      if (email) {
        // Trigger staff onboarding email
        try {
          const { data, error: emailError } = await supabase.functions.invoke("send-staff-onboarding", {
            body: {
              email: email,
              name: `${firstName} ${lastName}`,
              role: "Doctor",
              temporaryPassword: "Check with administrator"
            }
          });
          if (emailError) throw emailError;
          if (data?.success) {
            toast.success("Doctor added and onboarding email sent!");
          } else {
            toast.warning(data?.error || "Doctor added, but welcome email could not be sent. Please notify them manually.");
          }
        } catch (emailErr) {
          console.error("Email notification failed:", emailErr);
          toast.warning("Doctor added, but welcome email could not be sent. Please notify them manually.");
        }
      } else {
        toast.success("Doctor added. No email provided for onboarding.");
      }

      navigate("/doctors");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      console.error("Error adding doctor:", error);
      toast.error(message || "Failed to add doctor");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link to="/doctors"><ArrowLeft className="h-4 w-4" /></Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Add New Doctor</h1>
            <p className="text-muted-foreground">Register a new doctor in the system</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Required fields are marked with *</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input id="firstName" placeholder="Sarah" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input id="lastName" placeholder="Johnson" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="doctor@hospital.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" placeholder="+1 234-567-8900" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Professional Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="specialization">Specialization *</Label>
                  <Select value={specialization} onValueChange={setSpecialization}>
                    <SelectTrigger><SelectValue placeholder="Select specialization" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cardiology">Cardiology</SelectItem>
                      <SelectItem value="Neurology">Neurology</SelectItem>
                      <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                      <SelectItem value="Orthopedics">Orthopedics</SelectItem>
                      <SelectItem value="Dermatology">Dermatology</SelectItem>
                      <SelectItem value="General Medicine">General Medicine</SelectItem>
                      <SelectItem value="Surgery">Surgery</SelectItem>
                      <SelectItem value="Gynecology">Gynecology</SelectItem>
                      <SelectItem value="Oncology">Oncology</SelectItem>
                      <SelectItem value="Radiology">Radiology</SelectItem>
                      <SelectItem value="Psychiatry">Psychiatry</SelectItem>
                      <SelectItem value="ENT">ENT</SelectItem>
                      <SelectItem value="Ophthalmology">Ophthalmology</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select value={department} onValueChange={setDepartment}>
                    <SelectTrigger><SelectValue placeholder="Select department" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Emergency">Emergency</SelectItem>
                      <SelectItem value="OPD">OPD</SelectItem>
                      <SelectItem value="IPD">IPD</SelectItem>
                      <SelectItem value="Surgery">Surgery</SelectItem>
                      <SelectItem value="ICU">ICU</SelectItem>
                      <SelectItem value="Radiology">Radiology</SelectItem>
                      <SelectItem value="Laboratory">Laboratory</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="license">License Number</Label>
                  <Input id="license" placeholder="MED-12345" value={licenseNumber} onChange={(e) => setLicenseNumber(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fee">Consultation Fee</Label>
                  <Input id="fee" type="number" placeholder="150.00" value={consultationFee} onChange={(e) => setConsultationFee(e.target.value)} />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <Button variant="outline" asChild>
              <Link to="/doctors">Cancel</Link>
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Add Doctor
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
