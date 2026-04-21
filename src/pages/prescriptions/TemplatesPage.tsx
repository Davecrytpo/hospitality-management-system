import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Copy, Edit, Trash2 } from "lucide-react";

const templates = [
  { id: 1, name: "Common Cold", medications: ["Paracetamol 500mg", "Antihistamine"], usage: 156 },
  { id: 2, name: "Hypertension", medications: ["Amlodipine 5mg", "Losartan 50mg"], usage: 89 },
  { id: 3, name: "Diabetes Type 2", medications: ["Metformin 500mg", "Glimepiride 1mg"], usage: 124 },
  { id: 4, name: "Allergic Rhinitis", medications: ["Cetirizine 10mg", "Fluticasone Nasal"], usage: 78 },
  { id: 5, name: "GERD", medications: ["Omeprazole 20mg", "Antacid"], usage: 92 },
];

export default function PrescriptionTemplatesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Prescription Templates</h1>
            <p className="text-muted-foreground">Reusable prescription templates for common conditions</p>
          </div>
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Create Template
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <Card key={template.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <Badge variant="secondary">{template.usage} uses</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Medications:</p>
                  <ul className="text-sm space-y-1">
                    {template.medications.map((med, i) => (
                      <li key={i}>• {med}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Copy className="mr-1 h-3 w-3" />
                    Use
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
