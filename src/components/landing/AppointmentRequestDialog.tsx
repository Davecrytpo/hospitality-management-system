import { type FormEvent, useMemo, useState } from "react";
import { Calendar, CheckCircle2, Clock3, Phone } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type AppointmentForm = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phone: string;
  email: string;
  patientStatus: string;
  service: string;
  visitType: string;
  insuranceProvider: string;
  preferredLocation: string;
  preferredDate: string;
  notes: string;
};

const defaultAppointmentForm: AppointmentForm = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  phone: "",
  email: "",
  patientStatus: "new-patient",
  service: "primary-care",
  visitType: "in-person",
  insuranceProvider: "",
  preferredLocation: "easton",
  preferredDate: "",
  notes: "",
};

type AppointmentRequestDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function AppointmentRequestDialog({ open, onOpenChange }: AppointmentRequestDialogProps) {
  const [appointmentForm, setAppointmentForm] = useState<AppointmentForm>(defaultAppointmentForm);

  const appointmentSummary = useMemo(() => {
    const service = appointmentForm.service.replace(/-/g, " ");
    const visitType = appointmentForm.visitType.replace(/-/g, " ");
    const location = appointmentForm.preferredLocation.replace(/-/g, " ");
    return `${service} • ${visitType} • ${location}`;
  }, [appointmentForm.preferredLocation, appointmentForm.service, appointmentForm.visitType]);

  const updateAppointmentField = (field: keyof AppointmentForm, value: string) => {
    setAppointmentForm((current) => ({ ...current, [field]: value }));
  };

  const handleAppointmentSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast.success("Appointment request received. Our care team will contact you shortly.");
    onOpenChange(false);
    setAppointmentForm(defaultAppointmentForm);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto rounded-md border-otmg-border bg-card p-0 sm:max-w-[680px]">
        <div className="bg-otmg-navy px-6 py-5 text-primary-foreground">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl font-extrabold uppercase">Book Appointment</DialogTitle>
            <DialogDescription className="text-primary-foreground/80">
              Complete this request form and our team will contact you with the next available appointment.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form onSubmit={handleAppointmentSubmit} className="space-y-5 px-6 py-6">
          <div className="grid gap-3 rounded-md border border-otmg-border bg-otmg-soft/60 p-4 text-sm text-otmg-navy sm:grid-cols-3">
            <div className="flex items-center gap-2 font-semibold">
              <CheckCircle2 className="h-4 w-4 text-brand-red" />
              New and returning patients
            </div>
            <div className="flex items-center gap-2 font-semibold">
              <Calendar className="h-4 w-4 text-brand-red" />
              In-person or telehealth
            </div>
            <div className="flex items-center gap-2 font-semibold">
              <Clock3 className="h-4 w-4 text-brand-red" />
              Same-day requests accepted
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="appointment-first-name">First Name</Label>
              <Input
                id="appointment-first-name"
                value={appointmentForm.firstName}
                onChange={(event) => updateAppointmentField("firstName", event.target.value)}
                placeholder="First name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="appointment-last-name">Last Name</Label>
              <Input
                id="appointment-last-name"
                value={appointmentForm.lastName}
                onChange={(event) => updateAppointmentField("lastName", event.target.value)}
                placeholder="Last name"
                required
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="appointment-dob">Date of Birth</Label>
              <Input
                id="appointment-dob"
                type="date"
                value={appointmentForm.dateOfBirth}
                onChange={(event) => updateAppointmentField("dateOfBirth", event.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="appointment-phone">Mobile Phone</Label>
              <Input
                id="appointment-phone"
                type="tel"
                inputMode="tel"
                value={appointmentForm.phone}
                onChange={(event) => updateAppointmentField("phone", event.target.value)}
                placeholder="(410) 754-4343"
                required
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="appointment-email">Email Address</Label>
              <Input
                id="appointment-email"
                type="email"
                value={appointmentForm.email}
                onChange={(event) => updateAppointmentField("email", event.target.value)}
                placeholder="name@email.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Patient Status</Label>
              <Select value={appointmentForm.patientStatus} onValueChange={(value) => updateAppointmentField("patientStatus", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new-patient">New Patient</SelectItem>
                  <SelectItem value="existing-patient">Existing Patient</SelectItem>
                  <SelectItem value="referral">Referral / Specialist Visit</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Service Needed</Label>
              <Select value={appointmentForm.service} onValueChange={(value) => updateAppointmentField("service", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="primary-care">Primary Care</SelectItem>
                  <SelectItem value="preventive-care">Preventive Care</SelectItem>
                  <SelectItem value="womens-health">Women's Health</SelectItem>
                  <SelectItem value="chronic-care">Chronic Disease Management</SelectItem>
                  <SelectItem value="mental-health">Mental Health Services</SelectItem>
                  <SelectItem value="substance-use">Substance Use Treatment</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Visit Preference</Label>
              <Select value={appointmentForm.visitType} onValueChange={(value) => updateAppointmentField("visitType", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="in-person">In Person</SelectItem>
                  <SelectItem value="telehealth">Telehealth</SelectItem>
                  <SelectItem value="first-available">First Available</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="appointment-insurance">Insurance Provider</Label>
              <Input
                id="appointment-insurance"
                value={appointmentForm.insuranceProvider}
                onChange={(event) => updateAppointmentField("insuranceProvider", event.target.value)}
                placeholder="Aetna, Cigna, Medicare, etc."
              />
            </div>
            <div className="space-y-2">
              <Label>Preferred Location</Label>
              <Select value={appointmentForm.preferredLocation} onValueChange={(value) => updateAppointmentField("preferredLocation", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easton">Easton Office</SelectItem>
                  <SelectItem value="cambridge">Cambridge Office</SelectItem>
                  <SelectItem value="salisbury">Salisbury Office</SelectItem>
                  <SelectItem value="first-available">First Available Location</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="appointment-date">Preferred Date</Label>
              <Input
                id="appointment-date"
                type="date"
                value={appointmentForm.preferredDate}
                onChange={(event) => updateAppointmentField("preferredDate", event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="appointment-notes">Reason for Visit</Label>
              <Textarea
                id="appointment-notes"
                value={appointmentForm.notes}
                onChange={(event) => updateAppointmentField("notes", event.target.value)}
                placeholder="Please describe symptoms, concern, or reason for appointment."
                className="min-h-[44px]"
              />
            </div>
          </div>

          <div className="rounded-md bg-otmg-soft px-4 py-3 text-sm font-bold text-otmg-navy">Request summary: {appointmentSummary}</div>

          <div className="rounded-md border border-[#f3d7d8] bg-[#fff8f8] px-4 py-3 text-sm leading-6 text-[#7c2d30]">
            For emergencies, chest pain, trouble breathing, or severe symptoms, call 911 or go to the nearest emergency room.
          </div>

          <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
            <p className="text-sm font-medium leading-6 text-otmg-blue-soft">
              For routine scheduling help, call 410-754-4343 and our front desk will assist you.
            </p>
            <Button className="btn-mock-red h-12 px-7 text-[13px] uppercase" type="submit">
              <Calendar className="mr-2 h-4 w-4" />
              Submit Request
            </Button>
          </div>

          <a href="tel:+14107544343" className="inline-flex items-center gap-2 text-sm font-extrabold text-brand-red">
            <Phone className="h-4 w-4" />
            Prefer to call? 410-754-4343
          </a>
        </form>
      </DialogContent>
    </Dialog>
  );
}
