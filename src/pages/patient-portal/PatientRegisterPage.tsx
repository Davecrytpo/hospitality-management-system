import { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, ShieldCheck, AlertCircle, CheckCircle2, Upload, Fingerprint, Mail, Phone, Lock } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp";

interface PatientData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
}

export default function PatientRegisterPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [invitationId, setInvitationId] = useState(searchParams.get("invitation") || "");
  const codeFromUrl = searchParams.get("code");

  const [step, setStep] = useState<"invitation" | "verify" | "register" | "documents" | "2fa" | "success">("invitation");
  const [isLoading, setIsLoading] = useState(false);
  const [verificationCode, setVerificationCode] = useState(codeFromUrl || "");
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [emergencyContactName, setEmergencyContactName] = useState("");
  const [emergencyContactPhone, setEmergencyContactPhone] = useState("");
  const [emergencyContactRelationship, setEmergencyContactRelationship] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [allergies, setAllergies] = useState("");
  const [existingConditions, setExistingConditions] = useState("");
  
  // 2FA state
  const [enable2FA, setEnable2FA] = useState(true);
  const [twoFaMethod, setTwoFaMethod] = useState<"email" | "phone">("email");

  // Identification verification
  const [verifyDOB, setVerifyDOB] = useState("");
  const [verifyPhone, setVerifyPhone] = useState("");

  // Logic to determine initial step
  useEffect(() => {
    if (invitationId && codeFromUrl) {
      setStep("verify");
    }
  }, [invitationId, codeFromUrl]);

  const handleVerify = async () => {
    if (!invitationId) {
      setError("Please enter your Invitation ID.");
      return;
    }

    if (verificationCode.length !== 6) {
      setError("Please enter the 6-digit verification code.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.functions.invoke("verify-patient-invitation", {
        body: { invitationId, verificationCode },
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);

      setPatientData(data.patient);
      
      // Pre-fill form with patient data
      if (data.patient) {
        setFirstName(data.patient.firstName || "");
        setLastName(data.patient.lastName || "");
        setEmail(data.patient.email || "");
        setPhone(data.patient.phone || "");
        setDateOfBirth(data.patient.dateOfBirth || "");
      }

      setStep("register");
      toast.success("Verification successful! Please complete your registration.");
    } catch (err: any) {
      console.error("Verification error:", err);
      setError(err.message || "Verification failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setStep("documents");
  };

  const handleDocumentUpload = () => {
    setIsLoading(true);
    // Simulate upload
    setTimeout(() => {
      setIsLoading(false);
      setStep("2fa");
    }, 1500);
  };

  const handleCompleteRegistration = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.functions.invoke("complete-patient-registration", {
        body: {
          invitationId,
          verificationCode,
          email,
          password,
          firstName,
          lastName,
          dateOfBirth,
          phone,
          gender,
          address,
          emergencyContactName,
          emergencyContactPhone,
          emergencyContactRelationship,
          bloodType,
          allergies,
          existingConditions,
          enable2FA,
          twoFaMethod
        },
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);

      setStep("success");
      toast.success("Registration completed successfully!");
    } catch (err: any) {
      console.error("Registration error:", err);
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (step === "success") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <CardTitle>Registration Complete!</CardTitle>
            <CardDescription>
              Your patient account has been created successfully. You can now access your patient portal.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" onClick={() => navigate("/patient-portal/login")}>
              Go to Patient Portal Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            {step === "invitation" || step === "verify" ? <ShieldCheck className="h-6 w-6 text-primary" /> : 
             step === "documents" ? <Upload className="h-6 w-6 text-primary" /> :
             step === "2fa" ? <Lock className="h-6 w-6 text-primary" /> :
             <Fingerprint className="h-6 w-6 text-primary" />}
          </div>
          <CardTitle>
            {step === "invitation" && "Welcome to MediCare"}
            {step === "verify" && "Verify Your Identity"}
            {step === "register" && "Patient Registration"}
            {step === "documents" && "Upload Identification"}
            {step === "2fa" && "Secure Your Account"}
          </CardTitle>
          <CardDescription>
            {step === "invitation" && "Please enter your invitation details to begin"}
            {step === "verify" && "Enter the 6-digit code from your email or SMS"}
            {step === "register" && "Complete your profile and set your password"}
            {step === "documents" && "Please upload a valid ID for identity verification"}
            {step === "2fa" && "Set up Two-Factor Authentication for enhanced security"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {error && (
            <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md text-destructive text-sm flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}

          {step === "invitation" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="invitationId">Invitation ID</Label>
                <Input 
                  id="invitationId" 
                  placeholder="Enter the ID from your invitation" 
                  value={invitationId}
                  onChange={(e) => setInvitationId(e.target.value)}
                />
              </div>
              <Button className="w-full" onClick={() => setStep("verify")} disabled={!invitationId}>
                Continue <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}

          {step === "verify" && (
            <div className="space-y-6">
              <div className="flex flex-col items-center space-y-4">
                <Label htmlFor="code">Verification Code</Label>
                <InputOTP
                  maxLength={6}
                  value={verificationCode}
                  onChange={(value) => setVerificationCode(value)}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Date of Birth</Label>
                  <Input type="date" value={verifyDOB} onChange={(e) => setVerifyDOB(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input placeholder="Last 4 digits" maxLength={4} value={verifyPhone} onChange={(e) => setVerifyPhone(e.target.value)} />
                </div>
              </div>

              <Button
                className="w-full"
                onClick={handleVerify}
                disabled={isLoading || verificationCode.length !== 6}
              >
                {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Verifying...</> : "Verify Identity"}
              </Button>
              <Button variant="ghost" className="w-full" onClick={() => setStep("invitation")}>Back</Button>
            </div>
          )}

          {step === "register" && (
            <form onSubmit={handleRegister} className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="password">Create Password</Label>
                  <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm">Confirm Password</Label>
                  <Input id="confirm" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </div>
              </div>
              <Button type="submit" className="w-full">Continue to Documents</Button>
            </form>
          )}

          {step === "documents" && (
            <div className="space-y-6">
              <div className="border-2 border-dashed rounded-xl p-12 text-center space-y-4">
                <div className="mx-auto h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                  <Upload className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">Upload Government Issued ID</p>
                  <p className="text-xs text-muted-foreground">Passport, Driver's License or National ID (PDF, JPG, PNG)</p>
                </div>
                <Button variant="outline" size="sm">Select File</Button>
              </div>
              <Button className="w-full" onClick={handleDocumentUpload} disabled={isLoading}>
                {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Processing...</> : "Upload & Continue"}
              </Button>
            </div>
          )}

          {step === "2fa" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="space-y-0.5">
                  <Label className="text-base">Enable Two-Factor Auth</Label>
                  <p className="text-xs text-muted-foreground">Highly recommended for medical record security</p>
                </div>
                <Switch checked={enable2FA} onCheckedChange={setEnable2FA} />
              </div>

              {enable2FA && (
                <div className="grid gap-3">
                  <Button
                    variant={twoFaMethod === "email" ? "default" : "outline"}
                    className="w-full justify-start h-16 px-4"
                    onClick={() => setTwoFaMethod("email")}
                  >
                    <Mail className="mr-3 h-5 w-5" />
                    <div className="text-left">
                      <div className="font-bold">Email Code</div>
                      <div className="text-xs opacity-80">Send 6-digit code to {email}</div>
                    </div>
                  </Button>
                  <Button
                    variant={twoFaMethod === "phone" ? "default" : "outline"}
                    className="w-full justify-start h-16 px-4"
                    onClick={() => setTwoFaMethod("phone")}
                  >
                    <Phone className="mr-3 h-5 w-5" />
                    <div className="text-left">
                      <div className="font-bold">SMS Code</div>
                      <div className="text-xs opacity-80">Send 6-digit code to {phone}</div>
                    </div>
                  </Button>
                </div>
              )}

              <Button className="w-full" onClick={handleCompleteRegistration} disabled={isLoading}>
                {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving Account...</> : "Finish Registration"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
