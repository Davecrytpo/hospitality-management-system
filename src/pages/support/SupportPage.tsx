import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, MessageSquare, Book, Phone, Mail, Loader2 } from "lucide-react";
import { toast } from "sonner";

const faqs = [
  { q: "How do I register a new patient?", a: "Navigate to Patients > Register Patient and fill in the required information." },
  { q: "How do I schedule an appointment?", a: "Go to Appointments > New Appointment, select the patient and doctor, then choose an available time slot." },
  { q: "How do I generate an invoice?", a: "Navigate to Billing > Create Invoice, select the patient, and add the services provided." },
  { q: "How do I view lab test results?", a: "Go to Laboratory > Test Results to view all completed lab tests and their results." },
];

export default function SupportPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!name || !email || !subject || !message) {
      toast.error("Please fill in all fields");
      return;
    }
    setIsSubmitting(true);
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success("Support ticket submitted!", {
      description: "We'll get back to you within 24 hours."
    });
    setName(""); setEmail(""); setSubject(""); setMessage("");
    setIsSubmitting(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Help & Support</h1>
          <p className="text-muted-foreground">Get help with using the hospital management system</p>
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="rounded-full bg-primary/10 p-3 mb-4">
                  <Book className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">Documentation</h3>
                <p className="text-sm text-muted-foreground mt-2">Browse our comprehensive guides</p>
                <Button variant="outline" className="mt-4" onClick={() => toast.info("Documentation portal opening...")}>View Docs</Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="rounded-full bg-primary/10 p-3 mb-4">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">Live Chat</h3>
                <p className="text-sm text-muted-foreground mt-2">Chat with our support team</p>
                <Button variant="outline" className="mt-4" onClick={() => toast.info("Live chat connecting...")}>Start Chat</Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="rounded-full bg-primary/10 p-3 mb-4">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">Phone Support</h3>
                <p className="text-sm text-muted-foreground mt-2">Call us: +1 800-MEDICARE</p>
                <Button variant="outline" className="mt-4" onClick={() => { window.location.href = "tel:+18006334227"; }}>Call Now</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.q}</AccordionTrigger>
                  <AccordionContent>{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Contact Support
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Your Name</Label>
                <Input placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Subject</Label>
              <Input placeholder="Brief description of your issue" value={subject} onChange={(e) => setSubject(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Message</Label>
              <Textarea placeholder="Describe your issue in detail" className="min-h-[120px]" value={message} onChange={(e) => setMessage(e.target.value)} />
            </div>
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {isSubmitting ? "Submitting..." : "Submit Ticket"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
