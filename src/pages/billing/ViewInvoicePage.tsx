import { useParams, Link } from "react-router-dom";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Printer, Download, Mail, Building } from "lucide-react";

// Mock invoice data
const invoiceData = {
  id: "INV-2024-001",
  date: "Jan 15, 2024",
  dueDate: "Jan 30, 2024",
  status: "Paid",
  patient: {
    name: "John Smith",
    id: "PAT-001",
    address: "123 Maple Avenue, Springfield, IL",
    email: "john.smith@example.com"
  },
  items: [
    { description: "General Consultation (Dr. Sarah Johnson)", qty: 1, rate: 50.00, amount: 50.00 },
    { description: "Complete Blood Count (CBC) Lab Test", qty: 1, rate: 75.00, amount: 75.00 },
    { description: "Medication - Lisinopril 10mg (30 day supply)", qty: 1, rate: 25.00, amount: 25.00 }
  ],
  subtotal: 150.00,
  tax: 15.00,
  total: 165.00
};

export default function ViewInvoicePage() {
  const { id } = useParams();

  const handlePrint = () => {
    window.print();
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between print:hidden">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" asChild>
              <Link to="/billing"><ArrowLeft className="h-4 w-4" /></Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Invoice Details</h1>
              <p className="text-muted-foreground">{id || invoiceData.id}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => alert("Invoice sent to email")}>
              <Mail className="mr-2 h-4 w-4" />
              Email
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button onClick={handlePrint}>
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
          </div>
        </div>

        <Card className="max-w-4xl mx-auto shadow-lg">
          <CardContent className="p-12">
            {/* Invoice Header */}
            <div className="flex justify-between items-start mb-12">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-medical-primary to-medical-secondary">
                  <Building className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-medical-primary">MediCare</h2>
                  <p className="text-sm text-muted-foreground">General Hospital</p>
                </div>
              </div>
              <div className="text-right">
                <h1 className="text-4xl font-bold uppercase tracking-tight text-muted-foreground/20">Invoice</h1>
                <p className="font-semibold mt-2">{invoiceData.id}</p>
                <p className="text-sm text-muted-foreground">Date: {invoiceData.date}</p>
              </div>
            </div>

            {/* Billing Details */}
            <div className="grid md:grid-cols-2 gap-12 mb-12">
              <div>
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Bill To</p>
                <h3 className="text-lg font-bold">{invoiceData.patient.name}</h3>
                <p className="text-muted-foreground text-sm">{invoiceData.patient.address}</p>
                <p className="text-muted-foreground text-sm mt-1">{invoiceData.patient.email}</p>
                <p className="text-muted-foreground text-sm mt-1">Patient ID: {invoiceData.patient.id}</p>
              </div>
              <div className="md:text-right">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Hospital Details</p>
                <p className="text-sm">123 Healthcare Avenue</p>
                <p className="text-sm">Medical District, Springfield</p>
                <p className="text-sm">Phone: +1 234-567-8900</p>
                <p className="text-sm">Email: accounts@medicare.com</p>
              </div>
            </div>

            {/* Items Table */}
            <div className="mb-12">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-[60%]">Description</TableHead>
                    <TableHead className="text-center">Qty</TableHead>
                    <TableHead className="text-right">Rate</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoiceData.items.map((item, index) => (
                    <TableRow key={index} className="hover:bg-transparent">
                      <TableCell className="font-medium">{item.description}</TableCell>
                      <TableCell className="text-center">{item.qty}</TableCell>
                      <TableCell className="text-right">${item.rate.toFixed(2)}</TableCell>
                      <TableCell className="text-right font-semibold">${item.amount.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Summary */}
            <div className="flex justify-end">
              <div className="w-full sm:w-64 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${invoiceData.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax (10%)</span>
                  <span>${invoiceData.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t pt-3">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-bold text-lg text-medical-primary">${invoiceData.total.toFixed(2)}</span>
                </div>
                <div className="pt-4">
                  <Badge className="w-full justify-center py-1 text-sm bg-medical-success/10 text-medical-success border-medical-success/20">
                    STATUS: {invoiceData.status.toUpperCase()}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-24 pt-8 border-t text-center">
              <p className="text-sm text-muted-foreground">Thank you for choosing MediCare General Hospital.</p>
              <p className="text-xs text-muted-foreground mt-1 italic">This is a computer-generated invoice and does not require a physical signature.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

