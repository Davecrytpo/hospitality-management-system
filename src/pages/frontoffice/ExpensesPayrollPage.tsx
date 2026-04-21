import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Wallet, Plus, Save, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockExpenses = [
  { id: 1, category: "Salaries", description: "February Staff Salaries", amount: 3200000, date: "2024-02-28", status: "paid" },
  { id: 2, category: "Utilities", description: "Electricity Bill (NEPA)", amount: 180000, date: "2024-02-20", status: "paid" },
  { id: 3, category: "Medical Supplies", description: "Pharmacy stock restocking", amount: 540000, date: "2024-02-15", status: "pending" },
  { id: 4, category: "Maintenance", description: "Lab equipment servicing", amount: 75000, date: "2024-02-10", status: "paid" },
];

const mockPayroll = [
  { id: 1, name: "Dr. Chidi Eze", role: "Consultant", salary: 450000, status: "paid" },
  { id: 2, name: "Nurse Adaeze Obi", role: "Senior Nurse", salary: 180000, status: "paid" },
  { id: 3, name: "Lab Tech Amina", role: "Lab Technician", salary: 140000, status: "pending" },
];

export default function ExpensesPayrollPage() {
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ category: "", description: "", amount: "" });
  const [activeTab, setActiveTab] = useState<"expenses" | "payroll">("expenses");

  const handleAdd = () => {
    if (!form.category || !form.amount) return toast({ title: "Please fill required fields", variant: "destructive" });
    toast({ title: "Expense recorded successfully!" });
    setShowForm(false);
    setForm({ category: "", description: "", amount: "" });
  };

  const fmt = (n: number) => `₦${n.toLocaleString()}`;
  const totalExpenses = mockExpenses.reduce((s, e) => s + e.amount, 0);
  const totalPayroll = mockPayroll.reduce((s, e) => s + e.salary, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2"><Wallet className="h-6 w-6 text-primary" /> Expenses & Payroll</h1>
            <p className="text-muted-foreground">Manage hospital costs and staff salaries</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}><Plus className="mr-2 h-4 w-4" /> Add Expense</Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            { label: "Total Expenses", value: fmt(totalExpenses), icon: DollarSign },
            { label: "Total Payroll", value: fmt(totalPayroll), icon: Wallet },
            { label: "Combined Outflow", value: fmt(totalExpenses + totalPayroll), icon: DollarSign },
          ].map(s => (
            <Card key={s.label}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{s.label}</CardTitle>
                <s.icon className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent><div className="text-2xl font-bold">{s.value}</div></CardContent>
            </Card>
          ))}
        </div>

        {showForm && (
          <Card>
            <CardHeader><CardTitle>Record Expense</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-1"><Label>Category *</Label>
                  <Select value={form.category} onValueChange={v => setForm(p => ({ ...p, category: v }))}>
                    <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                    <SelectContent>{["Salaries", "Utilities", "Medical Supplies", "Equipment", "Maintenance", "Food", "Transport", "Other"].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-1"><Label>Description</Label><Input value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} /></div>
                <div className="space-y-1"><Label>Amount (₦) *</Label><Input type="number" value={form.amount} onChange={e => setForm(p => ({ ...p, amount: e.target.value }))} /></div>
              </div>
              <Button onClick={handleAdd}><Save className="mr-2 h-4 w-4" /> Record Expense</Button>
            </CardContent>
          </Card>
        )}

        <div className="flex gap-2">
          <Button variant={activeTab === "expenses" ? "default" : "outline"} onClick={() => setActiveTab("expenses")}>Expenses</Button>
          <Button variant={activeTab === "payroll" ? "default" : "outline"} onClick={() => setActiveTab("payroll")}>Payroll</Button>
        </div>

        {activeTab === "expenses" && (
          <Card>
            <CardContent className="pt-4">
              <div className="overflow-x-auto -mx-6 px-6"><Table>
                <TableHeader><TableRow><TableHead>Category</TableHead><TableHead>Description</TableHead><TableHead>Amount</TableHead><TableHead>Date</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
                <TableBody>
                  {mockExpenses.map(e => (
                    <TableRow key={e.id}>
                      <TableCell><Badge variant="outline">{e.category}</Badge></TableCell>
                      <TableCell>{e.description}</TableCell>
                      <TableCell className="font-medium">{fmt(e.amount)}</TableCell>
                      <TableCell>{e.date}</TableCell>
                      <TableCell><Badge variant={e.status === "paid" ? "default" : "secondary"}>{e.status}</Badge></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table></div>
            </CardContent>
          </Card>
        )}

        {activeTab === "payroll" && (
          <Card>
            <CardContent className="pt-4">
              <div className="overflow-x-auto -mx-6 px-6"><Table>
                <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Role</TableHead><TableHead>Salary</TableHead><TableHead>Status</TableHead><TableHead>Action</TableHead></TableRow></TableHeader>
                <TableBody>
                  {mockPayroll.map(p => (
                    <TableRow key={p.id}>
                      <TableCell className="font-medium">{p.name}</TableCell>
                      <TableCell>{p.role}</TableCell>
                      <TableCell>{fmt(p.salary)}</TableCell>
                      <TableCell><Badge variant={p.status === "paid" ? "default" : "secondary"}>{p.status}</Badge></TableCell>
                      <TableCell><Button size="sm" variant="outline" onClick={() => toast({ title: `Payment processed for ${p.name}!` })}>Process</Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table></div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
