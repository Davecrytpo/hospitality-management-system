import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, ArrowUp, ArrowDown, Package } from "lucide-react";

const recentTransactions = [
  { id: "TXN001", item: "Paracetamol 500mg", type: "Received", quantity: 500, date: "2024-01-15" },
  { id: "TXN002", item: "Amoxicillin 250mg", type: "Dispensed", quantity: -30, date: "2024-01-15" },
  { id: "TXN003", item: "Insulin Glargine", type: "Received", quantity: 100, date: "2024-01-14" },
  { id: "TXN004", item: "Omeprazole 20mg", type: "Dispensed", quantity: -50, date: "2024-01-14" },
];

export default function StockManagementPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Stock Management</h1>
            <p className="text-muted-foreground">Manage inventory levels and stock transactions</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Stock
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Quick Stock Update</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Select Medication</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Search medication" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="med001">Paracetamol 500mg</SelectItem>
                    <SelectItem value="med002">Amoxicillin 250mg</SelectItem>
                    <SelectItem value="med003">Omeprazole 20mg</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Transaction Type</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="received">Stock Received</SelectItem>
                      <SelectItem value="adjustment">Adjustment</SelectItem>
                      <SelectItem value="return">Return</SelectItem>
                      <SelectItem value="expired">Expired/Disposed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Quantity</Label>
                  <Input type="number" placeholder="Enter quantity" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Batch Number</Label>
                <Input placeholder="Enter batch number" />
              </div>
              <div className="space-y-2">
                <Label>Expiry Date</Label>
                <Input type="date" />
              </div>
              <Button className="w-full">
                <Package className="mr-2 h-4 w-4" />
                Update Stock
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Qty</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentTransactions.map((txn) => (
                    <TableRow key={txn.id}>
                      <TableCell className="font-medium">{txn.item}</TableCell>
                      <TableCell>
                        <Badge variant={txn.type === "Received" ? "default" : "secondary"}>
                          {txn.type === "Received" ? (
                            <ArrowUp className="mr-1 h-3 w-3" />
                          ) : (
                            <ArrowDown className="mr-1 h-3 w-3" />
                          )}
                          {txn.type}
                        </Badge>
                      </TableCell>
                      <TableCell className={txn.quantity > 0 ? "text-medical-success" : "text-medical-danger"}>
                        {txn.quantity > 0 ? `+${txn.quantity}` : txn.quantity}
                      </TableCell>
                      <TableCell>{txn.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
