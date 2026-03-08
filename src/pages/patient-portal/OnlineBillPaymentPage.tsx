import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CreditCard, CheckCircle, Lock, ArrowLeft, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Invoice = {
  id: string;
  description: string;
  amount: number;
  dueDate: string;
  status: "unpaid" | "paid";
};

const mockInvoices: Invoice[] = [
  { id: "INV-2024-001", description: "General Consultation + Lab Tests", amount: 18500, dueDate: "2024-02-28", status: "unpaid" },
  { id: "INV-2024-002", description: "Medication Dispensing", amount: 4200, dueDate: "2024-03-05", status: "unpaid" },
];

export default function OnlineBillPaymentPage() {
  const { toast } = useToast();
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [card, setCard] = useState({ number: "", expiry: "", cvv: "", name: "" });
  const [processing, setProcessing] = useState(false);
  const [paid, setPaid] = useState<string[]>([]);

  const handlePay = () => {
    if (!selectedInvoice) return toast({ title: "Please select an invoice", variant: "destructive" });
    if (paymentMethod === "card" && (!card.number || !card.expiry || !card.cvv || !card.name)) {
      return toast({ title: "Please fill in all card details", variant: "destructive" });
    }
    setProcessing(true);
    setTimeout(() => {
      setPaid(prev => [...prev, selectedInvoice.id]);
      setSelectedInvoice(null);
      setProcessing(false);
      toast({ title: "Payment Successful!", description: `NGN ${selectedInvoice.amount.toLocaleString()} paid successfully.` });
    }, 2000);
  };

  const unpaidInvoices = mockInvoices.filter(i => !paid.includes(i.id));

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" size="icon" asChild>
            <Link to="/patient-portal">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2"><CreditCard className="h-6 w-6 text-primary" /> Online Bill Payment</h1>
            <p className="text-muted-foreground">Pay your hospital invoices securely online</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader><CardTitle>Your Outstanding Invoices</CardTitle></CardHeader>
            <CardContent>
              {unpaidInvoices.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
                  <p className="font-medium text-green-600">All invoices paid!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {unpaidInvoices.map(inv => (
                    <div key={inv.id} className={`p-3 border-2 rounded-lg cursor-pointer transition-colors ${selectedInvoice?.id === inv.id ? "border-primary bg-primary/5" : "hover:bg-muted/50"}`}
                      onClick={() => setSelectedInvoice(inv)}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{inv.id}</p>
                          <p className="text-sm text-muted-foreground">{inv.description}</p>
                          <p className="text-xs text-muted-foreground">Due: {inv.dueDate}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">NGN {inv.amount.toLocaleString()}</p>
                          <Badge variant="secondary">Unpaid</Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Lock className="h-4 w-4" /> Secure Payment</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {selectedInvoice ? (
                <>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm font-medium">Paying: {selectedInvoice.id}</p>
                    <p className="text-2xl font-bold text-primary">NGN {selectedInvoice.amount.toLocaleString()}</p>
                  </div>
                  <div className="space-y-1">
                    <Label>Payment Method</Label>
                    <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="card">Credit / Debit Card</SelectItem>
                        <SelectItem value="transfer">Bank Transfer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {paymentMethod === "card" && (
                    <div className="space-y-3">
                      <div className="space-y-1"><Label>Cardholder Name</Label><Input value={card.name} onChange={e => setCard(p => ({ ...p, name: e.target.value }))} placeholder="Name on card" /></div>
                      <div className="space-y-1"><Label>Card Number</Label><Input value={card.number} onChange={e => setCard(p => ({ ...p, number: e.target.value.replace(/\D/g, "").slice(0, 16) }))} placeholder="1234 5678 9012 3456" /></div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1"><Label>Expiry</Label><Input value={card.expiry} onChange={e => setCard(p => ({ ...p, expiry: e.target.value }))} placeholder="MM/YY" /></div>
                        <div className="space-y-1"><Label>CVV</Label><Input type="password" value={card.cvv} onChange={e => setCard(p => ({ ...p, cvv: e.target.value.slice(0, 3) }))} placeholder="***" /></div>
                      </div>
                    </div>
                  )}
                  {paymentMethod === "transfer" && (
                    <div className="p-3 bg-muted rounded-lg text-sm space-y-1">
                      <p><strong>Bank:</strong> First Bank Nigeria</p>
                      <p><strong>Account Number:</strong> 3011234567</p>
                      <p><strong>Account Name:</strong> Hospitality Management System</p>
                      <p><strong>Reference:</strong> {selectedInvoice.id}</p>
                    </div>
                  )}
                  <Button className="w-full" disabled={processing} onClick={handlePay}>
                    <CreditCard className="mr-2 h-4 w-4" />
                    {processing ? "Processing..." : `Pay NGN ${selectedInvoice.amount.toLocaleString()}`}
                  </Button>
                  <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1"><Lock className="h-3 w-3" /> 256-bit SSL encryption - PCI DSS Compliant</p>
                </>
              ) : (
                <p className="text-center text-muted-foreground py-8">Select an invoice to proceed with payment.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
