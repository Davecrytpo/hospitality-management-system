import { useParams, Link } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Printer, Download, Pill, User, Calendar } from "lucide-react";
import { toast } from "sonner";

export default function PrescriptionViewPage() {
  const { id } = useParams();

  const prescription = {
    id: id || "RX-2024-882",
    date: "Feb 19, 2024",
    doctor: {
      name: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      regNo: "MC-12345"
    },
    patient: {
      name: "John Smith",
      id: "PAT-001",
      age: 45,
      gender: "Male"
    },
    medications: [
      { name: "Lisinopril", strength: "10mg", dosage: "1-0-0", timing: "After Food", duration: "30 Days", notes: "For blood pressure" },
      { name: "Atorvastatin", strength: "20mg", dosage: "0-0-1", timing: "At Night", duration: "30 Days", notes: "For cholesterol" },
      { name: "Aspirin", strength: "75mg", dosage: "1-0-0", timing: "After Breakfast", duration: "15 Days", notes: "Blood thinner" }
    ],
    diagnosis: "Essential Hypertension & Mild Hyperlipidemia",
    advice: "Low salt diet, regular morning walks for 30 mins, review after 1 month."
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between print:hidden">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" asChild>
              <Link to="/prescriptions"><ArrowLeft className="h-4 w-4" /></Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Prescription View</h1>
              <p className="text-muted-foreground">Detailed medical prescription</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => toast.success("Downloading PDF...")}>
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button onClick={() => window.print()}>
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
          </div>
        </div>

        <Card className="max-w-4xl mx-auto shadow-lg border-t-4 border-t-medical-primary">
          <CardContent className="p-10">
            {/* Header */}
            <div className="flex justify-between items-start border-b pb-8 mb-8">
              <div>
                <h2 className="text-2xl font-bold text-medical-primary">{prescription.doctor.name}</h2>
                <p className="text-sm font-medium">{prescription.doctor.specialty}</p>
                <p className="text-xs text-muted-foreground">Reg No: {prescription.doctor.regNo}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end gap-2 text-medical-primary mb-1">
                  <Pill className="h-5 w-5" />
                  <span className="font-bold text-xl uppercase tracking-widest italic">Rx</span>
                </div>
                <p className="text-sm font-semibold">{prescription.id}</p>
                <p className="text-xs text-muted-foreground">{prescription.date}</p>
              </div>
            </div>

            {/* Patient Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-muted/30 p-4 rounded-lg mb-8 text-sm">
              <div>
                <p className="text-muted-foreground mb-1 flex items-center gap-1"><User className="h-3 w-3" /> Patient Name</p>
                <p className="font-bold">{prescription.patient.name}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Patient ID</p>
                <p className="font-bold">{prescription.patient.id}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Age / Gender</p>
                <p className="font-bold">{prescription.patient.age}Y / {prescription.patient.gender}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1 flex items-center gap-1"><Calendar className="h-3 w-3" /> Date</p>
                <p className="font-bold">{prescription.date}</p>
              </div>
            </div>

            {/* Diagnosis */}
            <div className="mb-8">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-2">Diagnosis</h3>
              <p className="font-medium text-lg">{prescription.diagnosis}</p>
            </div>

            {/* Medications */}
            <div className="mb-8">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Medications</h3>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent bg-muted/50">
                    <TableHead className="w-[35%]">Medicine</TableHead>
                    <TableHead>Dosage</TableHead>
                    <TableHead>Timing</TableHead>
                    <TableHead>Duration</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {prescription.medications.map((med, index) => (
                    <TableRow key={index} className="hover:bg-transparent">
                      <TableCell>
                        <p className="font-bold">{med.name} {med.strength}</p>
                        <p className="text-xs text-muted-foreground italic">{med.notes}</p>
                      </TableCell>
                      <TableCell className="font-medium">{med.dosage}</TableCell>
                      <TableCell>{med.timing}</TableCell>
                      <TableCell>{med.duration}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Advice */}
            <div className="mb-12">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-2">General Advice / Follow-up</h3>
              <p className="text-sm leading-relaxed whitespace-pre-line">{prescription.advice}</p>
            </div>

            {/* Footer / Signature */}
            <div className="flex justify-between items-end mt-20 pt-8 border-t">
              <div className="text-xs text-muted-foreground space-y-1">
                <p>Hospital: MediCare General Hospital</p>
                <p>Address: 123 Healthcare Avenue, Medical District</p>
                <p>Phone: +1 234-567-8900</p>
              </div>
              <div className="text-center w-48">
                <div className="h-12 border-b border-dashed mb-2"></div>
                <p className="text-xs font-bold uppercase tracking-widest">Doctor's Signature</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
