import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { CreditCard, Landmark, Loader2, Receipt, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import { PatientPortalShell } from "@/components/patient-portal/PatientPortalShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { getPatientPortalContext, type PatientPortalContext } from "@/lib/patient-portal";

interface InvoiceRow {
  id: string;
  invoice_number: string;
  due_date: string | null;
  issue_date: string | null;
  status: string | null;
  total_amount: number;
  paid_amount: number | null;
  notes: string | null;
}

interface PaymentRow {
  id: string;
  amount: number;
  payment_date: string | null;
  payment_method: string | null;
  reference_number: string | null;
  status: string | null;
  invoice_id: string | null;
}

export default function OnlineBillPaymentPage() {
  const navigate = useNavigate();
  const [portalContext, setPortalContext] = useState<PatientPortalContext | null>(null);
  const [invoices, setInvoices] = useState<InvoiceRow[]>([]);
  const [payments, setPayments] = useState<PaymentRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("bank_transfer");
  const [paymentReference, setPaymentReference] = useState("");
  const [paymentNotes, setPaymentNotes] = useState("");

  const loadBilling = useCallback(async () => {
    try {
      const context = await getPatientPortalContext();
      setPortalContext(context);

      const [invoiceResult, paymentResult] = await Promise.all([
        supabase
          .from("invoices")
          .select("id, invoice_number, due_date, issue_date, status, total_amount, paid_amount, notes")
          .eq("patient_id", context.patient.id)
          .order("created_at", { ascending: false }),
        supabase
          .from("payments")
          .select("id, amount, payment_date, payment_method, reference_number, status, invoice_id")
          .eq("patient_id", context.patient.id)
          .order("created_at", { ascending: false }),
      ]);

      if (invoiceResult.error) throw invoiceResult.error;
      if (paymentResult.error) throw paymentResult.error;

      setInvoices((invoiceResult.data || []) as InvoiceRow[]);
      setPayments((paymentResult.data || []) as PaymentRow[]);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to load billing details.";

      if (message === "AUTH_REQUIRED" || message === "PATIENT_ACCESS_ONLY") {
        navigate("/patient-portal/login");
        return;
      }

      toast.error("Failed to load billing details.");
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    loadBilling();
  }, [loadBilling]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/patient-portal/login");
  };

  const outstandingInvoices = useMemo(
    () =>
      invoices.filter((invoice) => {
        const due = Number(invoice.total_amount) - Number(invoice.paid_amount || 0);
        return due > 0;
      }),
    [invoices],
  );

  const selectedInvoice = outstandingInvoices.find((invoice) => invoice.id === selectedInvoiceId) || null;
  const selectedAmountDue = selectedInvoice ? Number(selectedInvoice.total_amount) - Number(selectedInvoice.paid_amount || 0) : 0;

  const handleSubmitPaymentNotice = async () => {
    if (!portalContext || !selectedInvoice) {
      toast.error("Select an invoice first.");
      return;
    }

    if (!paymentReference.trim()) {
      toast.error("Enter your payment or authorization reference.");
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("payments").insert({
        patient_id: portalContext.patient.id,
        invoice_id: selectedInvoice.id,
        amount: selectedAmountDue,
        payment_method: paymentMethod,
        reference_number: paymentReference.trim(),
        notes: paymentNotes.trim() || null,
        status: "pending",
      });

      if (error) throw error;

      toast.success("Payment notice submitted. Our billing team will review and confirm it.");
      setPaymentReference("");
      setPaymentNotes("");
      setSelectedInvoiceId("");
      await loadBilling();
    } catch (error) {
      console.error("Failed to submit payment notice:", error);
      toast.error("Unable to submit your payment notice right now.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f4f8ff]">
        <div className="flex items-center gap-3 rounded-2xl border border-[#dbe4f4] bg-white px-5 py-4 text-sm font-semibold text-[#13306b] shadow-[0_18px_40px_-24px_rgba(19,48,107,0.35)]">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading billing details
        </div>
      </div>
    );
  }

  if (!portalContext) {
    return null;
  }

  const patientName = `${portalContext.patient.first_name} ${portalContext.patient.last_name}`;
  const patientMeta = portalContext.patient.email || portalContext.profile.email || "Secure patient access";

  return (
    <PatientPortalShell
      title="Billing & Payments"
      description="Review invoice balances and submit secure payment notices so our finance team can reconcile your account quickly."
      patientName={patientName}
      patientMeta={patientMeta}
      onLogout={handleLogout}
    >
      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <Card className="rounded-[24px] border border-[#dbe4f4] bg-white shadow-[0_18px_40px_-28px_rgba(19,48,107,0.28)]">
          <CardHeader>
            <CardTitle className="text-xl font-extrabold text-[#13306b]">Outstanding Invoices</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {outstandingInvoices.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-[#d6e0f3] bg-[#f8fbff] px-5 py-10 text-center">
                <ShieldCheck className="mx-auto h-10 w-10 text-[#1d8b55]" />
                <p className="mt-4 text-lg font-bold text-[#13306b]">No outstanding invoices</p>
                <p className="mt-2 text-sm text-[#5f76a3]">Your available invoice balance is currently clear.</p>
              </div>
            ) : (
              outstandingInvoices.map((invoice) => {
                const balanceDue = Number(invoice.total_amount) - Number(invoice.paid_amount || 0);
                const isSelected = selectedInvoiceId === invoice.id;

                return (
                  <button
                    type="button"
                    key={invoice.id}
                    onClick={() => setSelectedInvoiceId(invoice.id)}
                    className={`w-full rounded-2xl border p-4 text-left transition ${isSelected ? "border-[#13306b] bg-[#f5f9ff]" : "border-[#e0e8f7] bg-[#fbfcff] hover:border-[#bfd0ef]"}`}
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-base font-bold text-[#13306b]">{invoice.invoice_number}</p>
                        <p className="mt-1 text-sm text-[#5f76a3]">
                          Issued {invoice.issue_date ? format(new Date(invoice.issue_date), "MMM d, yyyy") : "not specified"}
                        </p>
                        <p className="mt-1 text-sm text-[#5f76a3]">
                          Due {invoice.due_date ? format(new Date(invoice.due_date), "MMM d, yyyy") : "on request"}
                        </p>
                        {invoice.notes && <p className="mt-3 text-sm text-[#415b8f]">{invoice.notes}</p>}
                      </div>

                      <div className="sm:text-right">
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7e91b8]">Balance Due</p>
                        <p className="mt-2 text-2xl font-extrabold text-[#13306b]">NGN {balanceDue.toLocaleString()}</p>
                        <Badge variant="outline" className="mt-2 rounded-full border-[#d1dcf1] capitalize text-[#13306b]">
                          {invoice.status || "open"}
                        </Badge>
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="rounded-[24px] border border-[#dbe4f4] bg-white shadow-[0_18px_40px_-28px_rgba(19,48,107,0.28)]">
            <CardHeader>
              <CardTitle className="text-xl font-extrabold text-[#13306b]">Submit Payment Notice</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-2xl border border-[#e0e8f7] bg-[#fbfcff] p-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7e91b8]">Selected Invoice</p>
                <p className="mt-2 text-lg font-extrabold text-[#13306b]">{selectedInvoice?.invoice_number || "Choose an invoice"}</p>
                <p className="mt-1 text-sm text-[#5f76a3]">
                  {selectedInvoice ? `Balance due: NGN ${selectedAmountDue.toLocaleString()}` : "Select an open invoice from the list to continue."}
                </p>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-[0.18em] text-[#6f85af]">Payment Method</Label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger className="h-12 rounded-xl border-[#d5dff2]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                    <SelectItem value="card">Card Payment</SelectItem>
                    <SelectItem value="insurance">Insurance Settlement</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {paymentMethod === "bank_transfer" && (
                <div className="rounded-2xl border border-[#dbe4f4] bg-[#f8fbff] p-4 text-sm text-[#415b8f]">
                  <div className="flex items-center gap-2 font-bold text-[#13306b]">
                    <Landmark className="h-4 w-4" />
                    Transfer Details
                  </div>
                  <p className="mt-3">Bank: First Bank Nigeria</p>
                  <p className="mt-1">Account Number: 3011234567</p>
                  <p className="mt-1">Account Name: On Time Medical Group</p>
                </div>
              )}

              {paymentMethod === "card" && (
                <div className="rounded-2xl border border-[#dbe4f4] bg-[#f8fbff] p-4 text-sm text-[#415b8f]">
                  <div className="flex items-center gap-2 font-bold text-[#13306b]">
                    <CreditCard className="h-4 w-4" />
                    Card Payment Notice
                  </div>
                  <p className="mt-3">Enter the receipt, terminal, or authorization reference used for your card payment.</p>
                </div>
              )}

              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-[0.18em] text-[#6f85af]">Reference Number</Label>
                <Input value={paymentReference} onChange={(event) => setPaymentReference(event.target.value)} placeholder="Enter receipt, transfer, or authorization reference" className="h-12 rounded-xl border-[#d5dff2]" />
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-[0.18em] text-[#6f85af]">Notes</Label>
                <Textarea value={paymentNotes} onChange={(event) => setPaymentNotes(event.target.value)} placeholder="Add any extra payment detail for the billing team" className="min-h-[110px] rounded-xl border-[#d5dff2]" />
              </div>

              <Button className="h-12 w-full rounded-xl bg-[#ef2027] text-sm font-bold uppercase text-white hover:bg-[#d61920]" onClick={handleSubmitPaymentNotice} disabled={isSubmitting || !selectedInvoice}>
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Receipt className="mr-2 h-4 w-4" />}
                Submit Payment Notice
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-[24px] border border-[#dbe4f4] bg-white shadow-[0_18px_40px_-28px_rgba(19,48,107,0.28)]">
            <CardHeader>
              <CardTitle className="text-xl font-extrabold text-[#13306b]">Recent Payment Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {payments.length === 0 ? (
                <p className="rounded-2xl bg-[#f8fbff] px-4 py-5 text-sm text-[#5f76a3]">No payment activity has been recorded yet.</p>
              ) : (
                payments.slice(0, 6).map((payment) => (
                  <div key={payment.id} className="flex flex-col gap-3 rounded-2xl border border-[#e0e8f7] bg-[#fbfcff] p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-bold text-[#13306b]">NGN {Number(payment.amount).toLocaleString()}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[#7e91b8]">{payment.payment_method?.replace("_", " ") || "Payment"}</p>
                      <p className="mt-1 text-sm text-[#5f76a3]">{payment.reference_number || "No reference recorded"}</p>
                    </div>
                    <div className="sm:text-right">
                      <Badge variant="outline" className="rounded-full capitalize border-[#d1dcf1] text-[#13306b]">
                        {payment.status || "submitted"}
                      </Badge>
                      <p className="mt-2 text-sm text-[#5f76a3]">
                        {payment.payment_date ? format(new Date(payment.payment_date), "MMM d, yyyy") : "Date pending"}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </PatientPortalShell>
  );
}
