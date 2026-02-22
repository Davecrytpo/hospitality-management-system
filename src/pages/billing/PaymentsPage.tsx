import { useState, useEffect, useCallback } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, Plus, DollarSign, CreditCard, Receipt, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

type PatientOption = {
  id: string;
  first_name?: string | null;
  last_name?: string | null;
};

type InvoiceOption = {
  id: string;
  invoice_number: string;
  total_amount?: number | string | null;
  paid_amount?: number | string | null;
  status?: string | null;
};

type PaymentRow = {
  id: string;
  payment_date?: string | null;
  payment_method?: string | null;
  reference_number?: string | null;
  amount?: number | string | null;
  patients?: {
    first_name?: string | null;
    last_name?: string | null;
  } | null;
};

export default function PaymentsPage() {
  const navigate = useNavigate();
  const [payments, setPayments] = useState<PaymentRow[]>([]);
  const [patients, setPatients] = useState<PatientOption[]>([]);
  const [invoices, setInvoices] = useState<InvoiceOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);

  // Form state
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [selectedInvoiceId, setSelectedInvoiceId] = useState("");
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("cash");
  const [reference, setReference] = useState("");
  const [notes, setNotes] = useState("");

  const fetchPayments = useCallback(async () => {
    setIsLoading(true);
    const { data } = await supabase
      .from("payments")
      .select("*, patients(first_name, last_name)")
      .order("created_at", { ascending: false });
    if (data) setPayments(data);
    setIsLoading(false);
  }, []);

  const fetchPatients = useCallback(async () => {
    const { data } = await supabase.from("patients").select("id, first_name, last_name");
    if (data) setPatients(data);
  }, []);

  const fetchPatientInvoices = useCallback(async (patientId: string) => {
    const { data } = await supabase
      .from("invoices")
      .select("id, invoice_number, total_amount, paid_amount, status")
      .eq("patient_id", patientId)
      .neq("status", "paid");
    if (data) setInvoices(data);
  }, []);

  useEffect(() => {
    fetchPayments();
    fetchPatients();
  }, [fetchPatients, fetchPayments]);

  useEffect(() => {
    if (selectedPatientId) {
      fetchPatientInvoices(selectedPatientId);
    }
  }, [fetchPatientInvoices, selectedPatientId]);

  const handleRecordPayment = async () => {
    if (!selectedPatientId || !amount) {
      toast.error("Please fill in required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { data: payment, error } = await supabase.from("payments").insert({
        patient_id: selectedPatientId,
        invoice_id: selectedInvoiceId || null,
        amount: parseFloat(amount),
        payment_method: method,
        reference_number: reference || null,
        notes: notes || null,
        received_by: user?.id,
        status: 'completed'
      }).select().single();

      if (error) throw error;

      // If associated with an invoice, update it
      if (selectedInvoiceId) {
        // This would ideally be a trigger in DB, but for now:
        const { data: inv } = await supabase.from("invoices").select("paid_amount, total_amount").eq("id", selectedInvoiceId).single();
        if (inv) {
          const newPaidAmount = (Number(inv.paid_amount) || 0) + parseFloat(amount);
          const newStatus = newPaidAmount >= inv.total_amount ? 'paid' : 'partial';
          await supabase.from("invoices").update({ 
            paid_amount: newPaidAmount,
            status: newStatus
          }).eq("id", selectedInvoiceId);
        }
      }

      toast.success("Payment recorded successfully");
      setShowAddDialog(false);
      fetchPayments();
      // Redirect to receipt
      navigate(`/billing/receipt/${payment.id}`);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      console.error("Error recording payment:", error);
      toast.error(message || "Failed to record payment");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Payments</h1>
            <p className="text-muted-foreground">Monitor and record patient transactions</p>
          </div>
          
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Record Payment
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Record New Payment</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Patient</Label>
                  <Select value={selectedPatientId} onValueChange={setSelectedPatientId}>
                    <SelectTrigger><SelectValue placeholder="Select patient" /></SelectTrigger>
                    <SelectContent>
                      {patients.map(p => (
                        <SelectItem key={p.id} value={p.id}>{p.first_name} {p.last_name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {invoices.length > 0 && (
                  <div className="space-y-2">
                    <Label>Associated Invoice (Optional)</Label>
                    <Select value={selectedInvoiceId} onValueChange={setSelectedInvoiceId}>
                      <SelectTrigger><SelectValue placeholder="Select invoice" /></SelectTrigger>
                      <SelectContent>
                        {invoices.map(inv => (
                          <SelectItem key={inv.id} value={inv.id}>
                            {inv.invoice_number} (Due: ${inv.total_amount - (inv.paid_amount || 0)})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Amount ($)</Label>
                    <Input type="number" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Payment Method</Label>
                    <Select value={method} onValueChange={setMethod}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="card">Credit/Debit Card</SelectItem>
                        <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                        <SelectItem value="insurance">Insurance Direct</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Reference Number (Tx ID)</Label>
                  <Input placeholder="e.g. CARD-1234 or Bank Ref" value={reference} onChange={(e) => setReference(e.target.value)} />
                </div>

                <div className="space-y-2">
                  <Label>Notes</Label>
                  <Input placeholder="Any additional details" value={notes} onChange={(e) => setNotes(e.target.value)} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>Cancel</Button>
                <Button onClick={handleRecordPayment} disabled={isSubmitting}>
                  {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Recording...</> : "Record Payment"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Daily Collection</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$12,450.00</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Card Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$8,240.00</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Cash Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$4,210.00</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Transactions</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search payments..." className="pl-8 w-64" />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Reference</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>{new Date(payment.payment_date).toLocaleDateString()}</TableCell>
                    <TableCell>{payment.patients?.first_name} {payment.patients?.last_name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {payment.payment_method === 'card' ? <CreditCard className="h-3 w-3" /> : <DollarSign className="h-3 w-3" />}
                        <span className="capitalize">{payment.payment_method.replace('_', ' ')}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-xs">{payment.reference_number || '-'}</TableCell>
                    <TableCell className="font-bold">${Number(payment.amount).toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge className="bg-medical-success">Completed</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" onClick={() => navigate(`/billing/receipt/${payment.id}`)}>
                        <Receipt className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {payments.length === 0 && !isLoading && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No payments found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
