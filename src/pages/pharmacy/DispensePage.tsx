import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Save, Search, Pill } from "lucide-react";

export default function DispensePage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Dispense Medication</h1>
          <p className="text-muted-foreground">Process prescription and dispense medication</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Prescription Lookup</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Prescription ID</Label>
                <div className="flex gap-2">
                  <Input placeholder="Enter Rx ID" />
                  <Button size="icon">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Or Select Patient</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select patient" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="p001">John Smith</SelectItem>
                    <SelectItem value="p002">Emily Davis</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Pill className="h-5 w-5" />
                Prescription Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-4 mb-4 bg-muted/50">
                <div className="grid gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rx ID:</span>
                    <span className="font-medium">RX001</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Patient:</span>
                    <span className="font-medium">John Smith (P001)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Doctor:</span>
                    <span className="font-medium">Dr. Sarah Johnson</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date:</span>
                    <span className="font-medium">2024-01-15</span>
                  </div>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Medication</TableHead>
                    <TableHead>Dosage</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Paracetamol</TableCell>
                    <TableCell>500mg</TableCell>
                    <TableCell>30 tablets</TableCell>
                    <TableCell className="text-medical-success">Available</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Amoxicillin</TableCell>
                    <TableCell>250mg</TableCell>
                    <TableCell>21 capsules</TableCell>
                    <TableCell className="text-medical-success">Available</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end">
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Dispense Medication
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
