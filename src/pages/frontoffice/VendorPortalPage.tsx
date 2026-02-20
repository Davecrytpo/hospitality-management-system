import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Building2, Plus, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockVendors = [
  { id: 1, name: "PowerGen Ltd", service: "Electricity/Generator", contact: "+234 801 111 2222", lastPayment: "2024-02-01", amount: 180000, status: "current" },
  { id: 2, name: "FoodServe Catering", service: "Patient Meals", contact: "+234 802 333 4444", lastPayment: "2024-02-15", amount: 95000, status: "current" },
  { id: 3, name: "CleanPro Services", service: "Laundry & Housekeeping", contact: "+234 803 555 6666", lastPayment: "2024-01-31", amount: 65000, status: "overdue" },
  { id: 4, name: "AquaSource", service: "Water Supply", contact: "+234 804 777 8888", lastPayment: "2024-02-10", amount: 30000, status: "current" },
];

export default function VendorPortalPage() {
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", service: "", contact: "", amount: "" });

  const handleAdd = () => {
    if (!form.name || !form.service) return toast({ title: "Please fill required fields", variant: "destructive" });
    toast({ title: `Vendor "${form.name}" added successfully!` });
    setShowForm(false);
    setForm({ name: "", service: "", contact: "", amount: "" });
  };

  const totalVendorCost = mockVendors.reduce((s, v) => s + v.amount, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2"><Building2 className="h-6 w-6 text-primary" /> Vendor Portal</h1>
            <p className="text-muted-foreground">Manage payments to electricity, food, laundry, and other vendors</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}><Plus className="mr-2 h-4 w-4" /> Add Vendor</Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            { label: "Total Vendors", value: mockVendors.length },
            { label: "Monthly Vendor Cost", value: `₦${totalVendorCost.toLocaleString()}` },
            { label: "Overdue Payments", value: mockVendors.filter(v => v.status === "overdue").length },
          ].map(s => (
            <Card key={s.label}>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">{s.label}</CardTitle></CardHeader>
              <CardContent><div className="text-3xl font-bold">{s.value}</div></CardContent>
            </Card>
          ))}
        </div>

        {showForm && (
          <Card>
            <CardHeader><CardTitle>New Vendor</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1"><Label>Company Name *</Label><Input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} /></div>
                <div className="space-y-1"><Label>Service Provided *</Label><Input value={form.service} onChange={e => setForm(p => ({ ...p, service: e.target.value }))} /></div>
                <div className="space-y-1"><Label>Contact</Label><Input value={form.contact} onChange={e => setForm(p => ({ ...p, contact: e.target.value }))} /></div>
                <div className="space-y-1"><Label>Monthly Amount (₦)</Label><Input type="number" value={form.amount} onChange={e => setForm(p => ({ ...p, amount: e.target.value }))} /></div>
              </div>
              <Button onClick={handleAdd}><Save className="mr-2 h-4 w-4" /> Add Vendor</Button>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardContent className="pt-4">
            <Table>
              <TableHeader><TableRow><TableHead>Vendor</TableHead><TableHead>Service</TableHead><TableHead>Contact</TableHead><TableHead>Monthly Amount</TableHead><TableHead>Last Payment</TableHead><TableHead>Status</TableHead><TableHead>Action</TableHead></TableRow></TableHeader>
              <TableBody>
                {mockVendors.map(v => (
                  <TableRow key={v.id}>
                    <TableCell className="font-medium">{v.name}</TableCell>
                    <TableCell>{v.service}</TableCell>
                    <TableCell>{v.contact}</TableCell>
                    <TableCell>₦{v.amount.toLocaleString()}</TableCell>
                    <TableCell>{v.lastPayment}</TableCell>
                    <TableCell><Badge variant={v.status === "overdue" ? "destructive" : "default"}>{v.status}</Badge></TableCell>
                    <TableCell><Button size="sm" variant="outline" onClick={() => toast({ title: `Payment processed for ${v.name}!` })}>Pay Now</Button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
