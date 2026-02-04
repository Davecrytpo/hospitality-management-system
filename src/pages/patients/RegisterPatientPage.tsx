import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Send, Mail, Phone, Loader2, Copy, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function RegisterPatientPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSendingInvite, setIsSendingInvite] = useState(false);
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [inviteResult, setInviteResult] = useState<{
    link: string;
    code: string;
    expiresAt: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);
  
  // Form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyRelationship, setEmergencyRelationship] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [insuranceProvider, setInsuranceProvider] = useState("");
  const [allergies, setAllergies] = useState("");
  const [conditions, setConditions] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState<"email" | "sms">("email");
  const [patientId, setPatientId] = useState<string | null>(null);

  const handleRegister = async () => {
    if (!firstName || !lastName || !dateOfBirth) {
      toast.error("Please fill in required fields (First Name, Last Name, Date of Birth)");
      return;
    }

    if (!email && !phoneNumber) {
      toast.error("Please provide either email or phone number for sending invitation");
      return;
    }

    setIsLoading(true);

    try {
      // Get current user's profile for created_by
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("You must be logged in to register patients");
        return;
      }

      // Create patient record
      const { data: patient, error } = await supabase
        .from("patients")
        .insert({
          first_name: firstName,
          last_name: lastName,
          date_of_birth: dateOfBirth,
          gender: gender || null,
          phone: phoneNumber || null,
          email: email || null,
          address: address || null,
          emergency_contact_name: emergencyName || null,
          emergency_contact_phone: emergencyPhone || null,
          emergency_contact_relationship: emergencyRelationship || null,
          blood_type: bloodType || null,
          insurance_provider: insuranceProvider || null,
          allergies: allergies || null,
          existing_conditions: conditions || null,
          registration_completed: false,
        })
        .select()
        .single();

      if (error) throw error;

      setPatientId(patient.id);
      toast.success("Patient record created! Now send the registration invitation.");
      setShowInviteDialog(true);
    } catch (error: any) {
      console.error("Error creating patient:", error);
      toast.error(error.message || "Failed to create patient record");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendInvitation = async () => {
    if (!patientId) {
      toast.error("Patient record not found");
      return;
    }

    if (deliveryMethod === "email" && !email) {
      toast.error("Email is required for email delivery");
      return;
    }

    if (deliveryMethod === "sms" && !phoneNumber) {
      toast.error("Phone number is required for SMS delivery");
      return;
    }

    setIsSendingInvite(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      const { data, error } = await supabase.functions.invoke("send-patient-invitation", {
        body: {
          patientId,
          patientEmail: email,
          patientPhone: phoneNumber,
          deliveryMethod,
          firstName,
          lastName,
        },
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);

      setInviteResult({
        link: data.registrationLink,
        code: data.verificationCode,
        expiresAt: data.expiresAt,
      });

      toast.success(`Invitation ${deliveryMethod === "email" ? "email" : "SMS"} sent successfully!`);
    } catch (error: any) {
      console.error("Error sending invitation:", error);
      toast.error(error.message || "Failed to send invitation");
    } finally {
      setIsSendingInvite(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setDateOfBirth("");
    setGender("");
    setPhone("");
    setEmail("");
    setAddress("");
    setEmergencyName("");
    setEmergencyRelationship("");
    setEmergencyPhone("");
    setBloodType("");
    setInsuranceProvider("");
    setAllergies("");
    setConditions("");
    setPatientId(null);
    setInviteResult(null);
    setShowInviteDialog(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link to="/patients"><ArrowLeft className="h-4 w-4" /></Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Register New Patient</h1>
            <p className="text-muted-foreground">Fill in the patient details and send registration invitation</p>
          </div>
        </div>

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
                  <Input 
                    id="firstName" 
                    placeholder="John" 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input 
                    id="lastName" 
                    placeholder="Smith"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth *</Label>
                  <Input 
                    id="dob" 
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={gender} onValueChange={setGender}>
                    <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    placeholder="+1 234-567-8900"
                    value={phoneNumber}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea 
                  id="address" 
                  placeholder="Enter full address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Emergency Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="emergencyName">Contact Name</Label>
                <Input 
                  id="emergencyName" 
                  placeholder="Jane Smith"
                  value={emergencyName}
                  onChange={(e) => setEmergencyName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="relationship">Relationship</Label>
                <Select value={emergencyRelationship} onValueChange={setEmergencyRelationship}>
                  <SelectTrigger><SelectValue placeholder="Select relationship" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="spouse">Spouse</SelectItem>
                    <SelectItem value="parent">Parent</SelectItem>
                    <SelectItem value="sibling">Sibling</SelectItem>
                    <SelectItem value="child">Child</SelectItem>
                    <SelectItem value="friend">Friend</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyPhone">Phone Number</Label>
                <Input 
                  id="emergencyPhone" 
                  placeholder="+1 234-567-8900"
                  value={emergencyPhone}
                  onChange={(e) => setEmergencyPhone(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Medical Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="bloodType">Blood Type</Label>
                  <Select value={bloodType} onValueChange={setBloodType}>
                    <SelectTrigger><SelectValue placeholder="Select blood type" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="insurance">Insurance Provider</Label>
                  <Input 
                    id="insurance" 
                    placeholder="Insurance company name"
                    value={insuranceProvider}
                    onChange={(e) => setInsuranceProvider(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="allergies">Known Allergies</Label>
                <Textarea 
                  id="allergies" 
                  placeholder="List any known allergies"
                  value={allergies}
                  onChange={(e) => setAllergies(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="conditions">Existing Conditions</Label>
                <Textarea 
                  id="conditions" 
                  placeholder="List any existing medical conditions"
                  value={conditions}
                  onChange={(e) => setConditions(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="outline" asChild>
            <Link to="/patients">Cancel</Link>
          </Button>
          <Button onClick={handleRegister} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Create & Send Invitation
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Invitation Dialog */}
      <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Send Registration Invitation</DialogTitle>
            <DialogDescription>
              Choose how to send the registration link to {firstName} {lastName}
            </DialogDescription>
          </DialogHeader>

          {!inviteResult ? (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Delivery Method</Label>
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant={deliveryMethod === "email" ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => setDeliveryMethod("email")}
                    disabled={!email}
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Email
                  </Button>
                  <Button
                    type="button"
                    variant={deliveryMethod === "sms" ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => setDeliveryMethod("sms")}
                    disabled={!phoneNumber}
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    SMS
                  </Button>
                </div>
                {deliveryMethod === "email" && email && (
                  <p className="text-sm text-muted-foreground">Will send to: {email}</p>
                )}
                {deliveryMethod === "sms" && phoneNumber && (
                  <p className="text-sm text-muted-foreground">Will send to: {phoneNumber}</p>
                )}
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Note:</strong> The patient will receive a link with a 6-digit verification code. 
                  This code expires in <strong>30 minutes</strong>. They will use this to complete their 
                  registration and access the Patient Portal.
                </p>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setShowInviteDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSendInvitation} disabled={isSendingInvite}>
                  {isSendingInvite ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Invitation
                    </>
                  )}
                </Button>
              </DialogFooter>
            </div>
          ) : (
            <div className="space-y-4 py-4">
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                <p className="text-sm text-green-700 dark:text-green-300 font-medium">
                  ✓ Invitation sent successfully!
                </p>
              </div>

              <div className="space-y-3">
                <div className="space-y-2">
                  <Label>Registration Link</Label>
                  <div className="flex gap-2">
                    <Input value={inviteResult.link} readOnly className="text-xs" />
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => copyToClipboard(inviteResult.link)}
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Verification Code</Label>
                  <div className="flex gap-2">
                    <Input value={inviteResult.code} readOnly className="font-mono text-lg tracking-widest" />
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => copyToClipboard(inviteResult.code)}
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground">
                  Expires: {new Date(inviteResult.expiresAt).toLocaleString()}
                </p>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={resetForm}>
                  Register Another Patient
                </Button>
                <Button asChild>
                  <Link to="/patients">Done</Link>
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}