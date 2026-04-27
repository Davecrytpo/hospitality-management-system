import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Fingerprint,
  Loader2,
  Lock,
  Mail,
  Phone,
  ShieldCheck,
  Upload,
} from "lucide-react";
import { toast } from "sonner";

import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import heroImg from "@/assets/public-hero-real-hospital.jpg";

interface PatientData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
}

type RegistrationStep = "invitation" | "verify" | "register" | "documents" | "2fa" | "success";

export default function PatientRegisterPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [invitationId, setInvitationId] = useState(searchParams.get("invitation") || "");
  const codeFromUrl = searchParams.get("code") || "";

  const [step, setStep] = useState<RegistrationStep>("invitation");
  const [isLoading, setIsLoading] = useState(false);
  const [verificationCode, setVerificationCode] = useState(codeFromUrl);
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  const [enable2FA, setEnable2FA] = useState(true);
  const [twoFaMethod, setTwoFaMethod] = useState<"email" | "phone">("email");

  const [verifyDOB, setVerifyDOB] = useState("");
  const [verifyPhone, setVerifyPhone] = useState("");

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);

  useEffect(() => {
    if (invitationId && codeFromUrl) {
      setStep("verify");
    }
  }, [invitationId, codeFromUrl]);

  const handleVerify = async () => {
    if (!invitationId) {
      setError("Please enter your invitation ID.");
      return;
    }

    if (verificationCode.length !== 6) {
      setError("Please enter the 6-digit verification code.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { data, error: functionError } = await supabase.functions.invoke("verify-patient-invitation", {
        body: { invitationId, verificationCode },
      });

      if (functionError) throw functionError;

      if (data?.error) {
        if (data.error.includes("expired")) {
          setError("Your verification code has expired. Please contact the hospital to request a new registration invitation.");
        } else {
          setError(data.error);
        }
        return;
      }

      setPatientData(data.patient);

      if (data.patient) {
        setFirstName(data.patient.firstName || "");
        setLastName(data.patient.lastName || "");
        setEmail(data.patient.email || "");
        setPhone(data.patient.phone || "");
        setDateOfBirth(data.patient.dateOfBirth || "");
      }

      setStep("register");
      toast.success("Identity verified.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Connection failed. Please try again.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setError(null);
    setStep("documents");
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Upload a JPG, PNG, or PDF document.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size must be below 10MB.");
      return;
    }

    setUploadedFile(file);

    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setUploadPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setUploadPreview(null);
    }
  };

  const handleDocumentUpload = async () => {
    if (!uploadedFile) {
      toast.error("Please choose a valid ID to continue.");
      return;
    }

    setIsLoading(true);

    try {
      const fileExt = uploadedFile.name.split(".").pop();
      const filePath = `patient-ids/${invitationId}-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage.from("medical-documents").upload(filePath, uploadedFile);

      if (uploadError) {
        toast.warning("Document upload could not be completed. You can upload your ID later inside the portal.");
      } else {
        toast.success("Identification uploaded successfully.");
      }

      setStep("2fa");
    } catch (error) {
      console.error("Upload error:", error);
      toast.warning("Upload skipped. You can complete this later from the portal.");
      setStep("2fa");
    } finally {
      setIsLoading(false);
    }
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
          twoFaMethod,
        },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      setStep("success");
      toast.success("Registration completed successfully.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Registration failed. Please try again.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  if (step === "success") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f4f8ff] px-4 py-8">
        <Card className="w-full max-w-[520px] rounded-[28px] border border-[#dbe4f4] bg-white shadow-[0_28px_60px_-34px_rgba(19,48,107,0.35)]">
          <CardHeader className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#eaf8f0] text-[#1d8b55]">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <CardTitle className="pt-3 font-display text-3xl font-extrabold text-[#13306b]">Registration Complete</CardTitle>
            <CardDescription className="text-sm leading-7 text-[#5f76a3]">
              Your patient portal has been created successfully. You can now sign in and access your appointments, records, and billing details.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="h-12 w-full rounded-xl bg-[#ef2027] text-sm font-bold uppercase text-white hover:bg-[#d61920]" onClick={() => navigate("/patient-portal/login")}>
              Go to Patient Portal Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f8ff] text-[#13306b] lg:grid lg:grid-cols-[0.94fr_1.06fr]">
      <section className="relative hidden overflow-hidden lg:flex">
        <img src={heroImg} alt="On Time Medical hospital care team" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(16,41,91,0.94)_0%,rgba(19,48,107,0.88)_45%,rgba(31,95,174,0.72)_100%)]" />
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.24)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.24)_1px,transparent_1px)] [background-size:34px_34px]" />

        <div className="relative z-10 flex w-full flex-col justify-between p-10 text-white">
          <Logo variant="light" size="md" />

          <div className="max-w-xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] backdrop-blur">
              <ShieldCheck className="h-4 w-4" />
              Patient registration
            </div>
            <h1 className="font-display text-5xl font-extrabold leading-[1.02]">Create secure patient access the right way.</h1>
            <p className="max-w-lg text-base leading-8 text-white/82">
              Verify your invitation, complete your details, upload identification, and secure your account in a guided mobile-friendly flow.
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "Invitation-based enrollment",
                "Identity and ID verification",
                "Emergency contact capture",
                "Optional two-factor security",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold text-white/90 backdrop-blur">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-white/60">© {new Date().getFullYear()} On Time Medical Group</p>
        </div>
      </section>

      <section className="flex min-h-screen items-center justify-center px-4 py-8 sm:px-6">
        <div className="w-full max-w-[760px]">
          <div className="mb-6 flex items-center justify-between lg:hidden">
            <Logo size="sm" />
            <Button variant="ghost" className="rounded-xl text-[#13306b]" asChild>
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Home
              </Link>
            </Button>
          </div>

          <Card className="rounded-[28px] border border-[#dbe4f4] bg-white shadow-[0_28px_60px_-34px_rgba(19,48,107,0.35)]">
            <CardHeader className="space-y-4 pb-4">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#13306b] text-white shadow-[0_14px_30px_-20px_rgba(19,48,107,0.65)]">
                  {step === "invitation" || step === "verify" ? <ShieldCheck className="h-6 w-6" /> : step === "documents" ? <Upload className="h-6 w-6" /> : step === "2fa" ? <Lock className="h-6 w-6" /> : <Fingerprint className="h-6 w-6" />}
                </div>
                <div>
                  <CardTitle className="font-display text-2xl font-extrabold text-[#13306b]">
                    {step === "invitation" && "Start Patient Registration"}
                    {step === "verify" && "Verify Your Identity"}
                    {step === "register" && "Create Your Portal Account"}
                    {step === "documents" && "Upload Identification"}
                    {step === "2fa" && "Secure Your Account"}
                  </CardTitle>
                  <CardDescription className="mt-1 text-sm text-[#5f76a3]">
                    {step === "invitation" && "Enter your invitation details to begin the secure registration process."}
                    {step === "verify" && "Use the code from your invitation email or SMS to verify your registration."}
                    {step === "register" && "Complete your account and patient details."}
                    {step === "documents" && "Upload a valid identification document for verification."}
                    {step === "2fa" && "Choose an extra verification method for future sign-ins."}
                  </CardDescription>
                </div>
              </div>

              <div className="grid gap-2 sm:grid-cols-5">
                {["Invitation", "Verify", "Account", "Documents", "Security"].map((label, index) => {
                  const stepIndex = ["invitation", "verify", "register", "documents", "2fa"].indexOf(step);
                  const active = index <= stepIndex;
                  return (
                    <div key={label} className={`rounded-xl px-3 py-2 text-center text-xs font-bold uppercase tracking-[0.14em] ${active ? "bg-[#13306b] text-white" : "bg-[#eef4ff] text-[#6f85af]"}`}>
                      {label}
                    </div>
                  );
                })}
              </div>
            </CardHeader>

            <CardContent className="space-y-5">
              {error && (
                <div className="flex items-start gap-3 rounded-2xl border border-[#ffd7d9] bg-[#fff5f5] px-4 py-3 text-sm font-medium text-[#b42318]">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {step === "invitation" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-[0.18em] text-[#6f85af]">Invitation ID</Label>
                    <Input value={invitationId} onChange={(event) => setInvitationId(event.target.value)} placeholder="Enter the invitation ID you received" className="h-12 rounded-xl border-[#d5dff2]" />
                  </div>
                  <Button className="h-12 w-full rounded-xl bg-[#ef2027] text-sm font-bold uppercase text-white hover:bg-[#d61920]" onClick={() => setStep("verify")} disabled={!invitationId}>
                    Continue
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}

              {step === "verify" && (
                <div className="space-y-6">
                  <div className="space-y-3 text-center">
                    <Label className="text-xs font-bold uppercase tracking-[0.18em] text-[#6f85af]">Verification Code</Label>
                    <div className="flex justify-center">
                      <InputOTP maxLength={6} value={verificationCode} onChange={setVerificationCode}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} className="h-12 w-10 rounded-xl border-[#d5dff2]" />
                          <InputOTPSlot index={1} className="h-12 w-10 rounded-xl border-[#d5dff2]" />
                          <InputOTPSlot index={2} className="h-12 w-10 rounded-xl border-[#d5dff2]" />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={3} className="h-12 w-10 rounded-xl border-[#d5dff2]" />
                          <InputOTPSlot index={4} className="h-12 w-10 rounded-xl border-[#d5dff2]" />
                          <InputOTPSlot index={5} className="h-12 w-10 rounded-xl border-[#d5dff2]" />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label className="text-xs font-bold uppercase tracking-[0.18em] text-[#6f85af]">Date of Birth</Label>
                      <Input type="date" value={verifyDOB} onChange={(event) => setVerifyDOB(event.target.value)} className="h-12 rounded-xl border-[#d5dff2]" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-bold uppercase tracking-[0.18em] text-[#6f85af]">Phone Digits</Label>
                      <Input placeholder="Last 4 digits" maxLength={4} value={verifyPhone} onChange={(event) => setVerifyPhone(event.target.value)} className="h-12 rounded-xl border-[#d5dff2]" />
                    </div>
                  </div>

                  <Button className="h-12 w-full rounded-xl bg-[#ef2027] text-sm font-bold uppercase text-white hover:bg-[#d61920]" onClick={handleVerify} disabled={isLoading || verificationCode.length !== 6}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Verify Identity
                  </Button>
                </div>
              )}

              {step === "register" && (
                <form onSubmit={handleRegister} className="space-y-6">
                  {patientData && (
                    <div className="rounded-2xl border border-[#dbe4f4] bg-[#f8fbff] p-4 text-sm text-[#415b8f]">
                      Verified for {patientData.firstName} {patientData.lastName}.
                    </div>
                  )}

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="First Name">
                      <Input value={firstName} onChange={(event) => setFirstName(event.target.value)} className="h-12 rounded-xl border-[#d5dff2]" required />
                    </Field>
                    <Field label="Last Name">
                      <Input value={lastName} onChange={(event) => setLastName(event.target.value)} className="h-12 rounded-xl border-[#d5dff2]" required />
                    </Field>
                    <Field label="Email Address">
                      <Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="h-12 rounded-xl border-[#d5dff2]" required />
                    </Field>
                    <Field label="Phone Number">
                      <Input value={phone} onChange={(event) => setPhone(event.target.value)} className="h-12 rounded-xl border-[#d5dff2]" required />
                    </Field>
                    <Field label="Date of Birth">
                      <Input type="date" value={dateOfBirth} onChange={(event) => setDateOfBirth(event.target.value)} className="h-12 rounded-xl border-[#d5dff2]" required />
                    </Field>
                    <Field label="Gender">
                      <Select value={gender} onValueChange={setGender}>
                        <SelectTrigger className="h-12 rounded-xl border-[#d5dff2]"><SelectValue placeholder="Select gender" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field label="Create Password">
                      <Input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="h-12 rounded-xl border-[#d5dff2]" required minLength={8} />
                    </Field>
                    <Field label="Confirm Password">
                      <Input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className="h-12 rounded-xl border-[#d5dff2]" required />
                    </Field>
                    <div className="sm:col-span-2">
                      <Field label="Address">
                        <Textarea value={address} onChange={(event) => setAddress(event.target.value)} className="min-h-[100px] rounded-xl border-[#d5dff2]" />
                      </Field>
                    </div>
                    <Field label="Blood Type">
                      <Select value={bloodType} onValueChange={setBloodType}>
                        <SelectTrigger className="h-12 rounded-xl border-[#d5dff2]"><SelectValue placeholder="Select blood type" /></SelectTrigger>
                        <SelectContent>
                          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((type) => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field label="Emergency Contact Name">
                      <Input value={emergencyContactName} onChange={(event) => setEmergencyContactName(event.target.value)} className="h-12 rounded-xl border-[#d5dff2]" />
                    </Field>
                    <Field label="Emergency Contact Phone">
                      <Input value={emergencyContactPhone} onChange={(event) => setEmergencyContactPhone(event.target.value)} className="h-12 rounded-xl border-[#d5dff2]" />
                    </Field>
                    <Field label="Emergency Relationship">
                      <Input value={emergencyContactRelationship} onChange={(event) => setEmergencyContactRelationship(event.target.value)} className="h-12 rounded-xl border-[#d5dff2]" />
                    </Field>
                    <div className="sm:col-span-2">
                      <Field label="Allergies">
                        <Textarea value={allergies} onChange={(event) => setAllergies(event.target.value)} className="min-h-[100px] rounded-xl border-[#d5dff2]" />
                      </Field>
                    </div>
                    <div className="sm:col-span-2">
                      <Field label="Existing Conditions">
                        <Textarea value={existingConditions} onChange={(event) => setExistingConditions(event.target.value)} className="min-h-[100px] rounded-xl border-[#d5dff2]" />
                      </Field>
                    </div>
                  </div>

                  <Button type="submit" className="h-12 w-full rounded-xl bg-[#ef2027] text-sm font-bold uppercase text-white hover:bg-[#d61920]">
                    Continue to Document Upload
                  </Button>
                </form>
              )}

              {step === "documents" && (
                <div className="space-y-6">
                  <input type="file" id="id-upload" className="hidden" accept=".jpg,.jpeg,.png,.pdf" onChange={handleFileSelect} />
                  <label htmlFor="id-upload" className="block cursor-pointer rounded-[24px] border-2 border-dashed border-[#cbd7ef] bg-[#f8fbff] p-8 text-center transition hover:border-[#13306b] hover:bg-[#f3f7ff]">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#13306b] shadow-[0_12px_30px_-20px_rgba(19,48,107,0.4)]">
                      <Upload className="h-6 w-6" />
                    </div>
                    <p className="mt-4 text-lg font-bold text-[#13306b]">{uploadedFile ? uploadedFile.name : "Upload a Government-Issued ID"}</p>
                    <p className="mt-2 text-sm leading-7 text-[#5f76a3]">
                      {uploadedFile ? `${(uploadedFile.size / 1024).toFixed(1)} KB · tap to replace` : "Passport, driver's license, national ID, JPG, PNG, or PDF."}
                    </p>
                    {uploadPreview && <img src={uploadPreview} alt="Identification preview" className="mx-auto mt-5 max-h-40 rounded-xl object-contain" />}
                  </label>

                  <Button className="h-12 w-full rounded-xl bg-[#ef2027] text-sm font-bold uppercase text-white hover:bg-[#d61920]" onClick={handleDocumentUpload} disabled={isLoading || !uploadedFile}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Upload and Continue
                  </Button>

                  <Button variant="ghost" className="w-full rounded-xl text-sm font-semibold text-[#13306b]" onClick={() => setStep("2fa")}>
                    Skip for now
                  </Button>
                </div>
              )}

              {step === "2fa" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between rounded-2xl border border-[#dbe4f4] bg-[#f8fbff] p-4">
                    <div>
                      <Label className="text-sm font-bold text-[#13306b]">Enable Two-Factor Authentication</Label>
                      <p className="mt-1 text-sm text-[#5f76a3]">Recommended for stronger account protection and patient data security.</p>
                    </div>
                    <Switch checked={enable2FA} onCheckedChange={setEnable2FA} />
                  </div>

                  {enable2FA && (
                    <div className="grid gap-3">
                      <button
                        type="button"
                        onClick={() => setTwoFaMethod("email")}
                        className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${twoFaMethod === "email" ? "border-[#13306b] bg-[#f5f9ff]" : "border-[#dbe4f4] bg-white hover:border-[#bfd0ef]"}`}
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef4ff] text-[#13306b]">
                          <Mail className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-base font-bold text-[#13306b]">Email Code</p>
                          <p className="mt-1 text-sm text-[#5f76a3]">Send a code to {email || "your email address"}</p>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setTwoFaMethod("phone")}
                        className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${twoFaMethod === "phone" ? "border-[#13306b] bg-[#f5f9ff]" : "border-[#dbe4f4] bg-white hover:border-[#bfd0ef]"}`}
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff1f1] text-[#ef2027]">
                          <Phone className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-base font-bold text-[#13306b]">SMS Code</p>
                          <p className="mt-1 text-sm text-[#5f76a3]">Send a code to {phone || "your phone number"}</p>
                        </div>
                      </button>
                    </div>
                  )}

                  <Button className="h-12 w-full rounded-xl bg-[#ef2027] text-sm font-bold uppercase text-white hover:bg-[#d61920]" onClick={handleCompleteRegistration} disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Finish Registration
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-2">
      <Label className="text-xs font-bold uppercase tracking-[0.18em] text-[#6f85af]">{label}</Label>
      {children}
    </div>
  );
}
