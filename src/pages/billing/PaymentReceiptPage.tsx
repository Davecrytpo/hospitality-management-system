import { useParams, Link } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Printer, Download, CheckCircle2, Building } from "lucide-react";

export default function PaymentReceiptPage() {
  const { id } = useParams();

  const receiptData = {
    id: id || "RCP-2024-551",
    date: "Feb 19, 2024",
    time: "02:30 PM",
    invoiceId: "INV-2024-001",
    method: "Credit Card (Visa - 4421)",
    amount: 165.00,
    patient: {
      name: "John Smith",
      id: "PAT-001"
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between print:hidden">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" asChild>
              <Link to="/billing/payments"><ArrowLeft className="h-4 w-4" /></Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Payment Receipt</h1>
              <p className="text-muted-foreground">Successfully processed transaction</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Download</Button>
            <Button onClick={() => window.print()}><Printer className="mr-2 h-4 w-4" /> Print</Button>
          </div>
        </div>

        <div className="flex justify-center py-8">
          <Card className="w-full max-w-lg shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-medical-success"></div>
            <CardContent className="p-8">
              <div className="flex flex-col items-center text-center mb-8">
                <div className="h-16 w-16 bg-medical-success/10 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-10 w-10 text-medical-success" />
                </div>
                <h2 className="text-2xl font-bold">Payment Received</h2>
                <p className="text-muted-foreground text-sm">Transaction Successful</p>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center pb-4 border-b">
                  <div className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-medical-primary" />
                    <span className="font-bold text-lg text-medical-primary">MediCare Hospital</span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-muted-foreground">RECEIPT NO</p>
                    <p className="font-mono font-bold">{receiptData.id}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-y-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Patient</p>
                    <p className="font-bold">{receiptData.patient.name}</p>
                    <p className="text-xs text-muted-foreground">{receiptData.patient.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-muted-foreground">Date & Time</p>
                    <p className="font-bold">{receiptData.date}</p>
                    <p className="text-xs text-muted-foreground">{receiptData.time}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Payment Method</p>
                    <p className="font-bold">{receiptData.method}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-muted-foreground">Invoice Reference</p>
                    <p className="font-bold">{receiptData.invoiceId}</p>
                  </div>
                </div>

                <div className="bg-muted/50 p-6 rounded-xl flex justify-between items-center mt-8">
                  <span className="text-lg font-bold">Total Amount Paid</span>
                  <span className="text-3xl font-black text-medical-primary">${receiptData.amount.toFixed(2)}</span>
                </div>

                <div className="pt-8 text-center">
                  <p className="text-xs text-muted-foreground">This is an automated receipt for your payment. Please keep it for your records.</p>
                  <p className="text-xs font-bold mt-4 text-medical-primary">www.medicare-hospital.com</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
