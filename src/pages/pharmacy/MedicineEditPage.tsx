import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Trash2, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export default function MedicineEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data for the specific medicine
  const medicineData = {
    id: id || "MED001",
    name: "Paracetamol 500mg",
    category: "analgesic",
    type: "tablet",
    stock: 1500,
    minStock: 500,
    price: 0.15,
    manufacturer: "Generic Pharma Corp",
    expiry: "2025-12-31"
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Medicine details updated in inventory");
    navigate("/pharmacy");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" asChild>
              <Link to="/pharmacy"><ArrowLeft className="h-4 w-4" /></Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Edit Medication</h1>
              <p className="text-muted-foreground">Updating {medicineData.name} ({medicineData.id})</p>
            </div>
          </div>
          <Button variant="destructive" onClick={() => toast.error("Delete functionality would require confirmation")}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Item
          </Button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Core Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Medicine Name</Label>
                  <Input id="name" defaultValue={medicineData.name} required />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select defaultValue={medicineData.category}>
                      <SelectTrigger id="category"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="analgesic">Analgesics</SelectItem>
                        <SelectItem value="antibiotic">Antibiotics</SelectItem>
                        <SelectItem value="cardiac">Cardiac</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Type</Label>
                    <Select defaultValue={medicineData.type}>
                      <SelectTrigger id="type"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tablet">Tablet</SelectItem>
                        <SelectItem value="capsule">Capsule</SelectItem>
                        <SelectItem value="syrup">Syrup</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Inventory Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="stock">Current Stock</Label>
                    <Input id="stock" type="number" defaultValue={medicineData.stock} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="min">Alert Level (Min)</Label>
                    <Input id="min" type="number" defaultValue={medicineData.minStock} required />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="price">Unit Price ($)</Label>
                    <Input id="price" type="number" step="0.01" defaultValue={medicineData.price} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" type="date" defaultValue={medicineData.expiry} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <Button variant="outline" type="button" onClick={() => navigate("/pharmacy")}>Cancel</Button>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              Update Medication
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
