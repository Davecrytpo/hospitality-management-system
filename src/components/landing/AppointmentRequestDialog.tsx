import { useMemo, useState } from "react";
import { Calendar, Phone } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type AppointmentForm = {
  name: string;
  phone: string;
  email: string;
  service: string;
  preference: string;
  notes: string;
};

const defaultAppointmentForm: AppointmentForm = {
  name: "",
  phone: "",
  email: "",
  service: "primary-care",
  preference: "same-day",
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
    return `${service} • ${appointmentForm.preference.replace(/-/g, " ")}`;
  }, [appointmentForm.preference, appointmentForm.service]);

  const updateAppointmentField = (field: keyof AppointmentForm, value: string) => {
    setAppointmentForm((current) => ({ ...current, [field]: value }));
  };

  const handleAppointmentSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast.success("Appointment request received. Our care team will contact you shortly.");
    onOpenChange(false);
    setAppointmentForm(defaultAppointmentForm);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto rounded-md border-otmg-border bg-card p-0 sm:max-w-[620px]">
        <div className="bg-otmg-navy px-6 py-5 text-primary-foreground">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl font-extrabold uppercase">Book Appointment</DialogTitle>
            <DialogDescription className="text-primary-foreground/80">Tell us what you need and our care team will confirm the best available time.</DialogDescription>
          </DialogHeader>
        </div>
        <form onSubmit={handleAppointmentSubmit} className="space-y-5 px-6 py-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2"><Label htmlFor="appointment-name">Full Name</Label><Input id="appointment-name" value={appointmentForm.name} onChange={(event) => updateAppointmentField("name", event.target.value)} placeholder="Your full name" required /></div>
            <div className="space-y-2"><Label htmlFor="appointment-phone">Phone Number</Label><Input id="appointment-phone" value={appointmentForm.phone} onChange={(event) => updateAppointmentField("phone", event.target.value)} placeholder="410-754-4343" required /></div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2"><Label htmlFor="appointment-email">Email Address</Label><Input id="appointment-email" type="email" value={appointmentForm.email} onChange={(event) => updateAppointmentField("email", event.target.value)} placeholder="you@example.com" /></div>
            <div className="space-y-2"><Label>Service Needed</Label><Select value={appointmentForm.service} onValueChange={(value) => updateAppointmentField("service", value)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="primary-care">Primary Care</SelectItem><SelectItem value="preventive-care">Preventive Care</SelectItem><SelectItem value="mental-health">Mental Health Services</SelectItem><SelectItem value="substance-use">Substance Use Treatment</SelectItem><SelectItem value="telehealth">Telehealth Visit</SelectItem></SelectContent></Select></div>
          </div>
          <div className="space-y-2"><Label>Preferred Timing</Label><Select value={appointmentForm.preference} onValueChange={(value) => updateAppointmentField("preference", value)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="same-day">Same Day</SelectItem><SelectItem value="this-week">This Week</SelectItem><SelectItem value="morning">Morning</SelectItem><SelectItem value="afternoon">Afternoon</SelectItem><SelectItem value="telehealth-first">Telehealth First</SelectItem></SelectContent></Select></div>
          <div className="space-y-2"><Label htmlFor="appointment-notes">Reason for Visit</Label><Textarea id="appointment-notes" value={appointmentForm.notes} onChange={(event) => updateAppointmentField("notes", event.target.value)} placeholder="Briefly describe what you need help with" /></div>
          <div className="rounded-md bg-otmg-soft px-4 py-3 text-sm font-bold text-otmg-navy">Request summary: {appointmentSummary}</div>
          <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center"><p className="text-sm font-medium leading-6 text-otmg-blue-soft">For urgent care needs, call 410-754-4343 so the team can guide you immediately.</p><Button className="btn-mock-red h-12 px-7 text-[13px] uppercase" type="submit"><Calendar className="mr-2 h-4 w-4" />Submit Request</Button></div>
          <a href="tel:+14107544343" className="inline-flex items-center gap-2 text-sm font-extrabold text-brand-red"><Phone className="h-4 w-4" />Prefer to call? 410-754-4343</a>
        </form>
      </DialogContent>
    </Dialog>
  );
}