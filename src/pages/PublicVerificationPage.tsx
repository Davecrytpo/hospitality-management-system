import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  Search, 
  FileCheck, 
  FlaskConical, 
  Pill,
  ArrowLeft,
  CheckCircle2,
  Clock
} from "lucide-react";

export default function PublicVerificationPage() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState<null | 'lab' | 'pharmacy'>(null);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.startsWith("LAB")) setResult("lab");
    else if (code.startsWith("RX")) setResult("pharmacy");
    else setResult(null);
  };

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col">
      <nav className="p-6 border-b bg-white">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-primary tracking-tight">MediCare</span>
          </Link>
          <Button variant="ghost" asChild>
            <Link to="/"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Home</Link>
          </Button>
        </div>
      </nav>

      <main className="flex-1 container mx-auto px-4 py-12 flex flex-col items-center">
        <div className="w-full max-w-2xl space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">Quick Status Verification</h1>
            <p className="text-muted-foreground">Enter your unique tracking code to check status</p>
          </div>

          <Card className="shadow-lg">
            <CardContent className="p-8">
              <form onSubmit={handleVerify} className="flex gap-3">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="code" className="sr-only">Verification Code</Label>
                  <Input 
                    id="code"
                    placeholder="Enter Code (e.g., LAB-123 or RX-456)" 
                    className="h-12 text-lg uppercase"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    required
                  />
                </div>
                <Button type="submit" size="lg" className="h-12 px-8">
                  Verify <Search className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>

          {result === "lab" && (
            <Card className="animate-in fade-in slide-in-from-bottom-4 duration-500 border-l-4 border-l-medical-success">
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className="h-14 w-14 rounded-2xl bg-medical-success/10 flex items-center justify-center shrink-0">
                    <FlaskConical className="h-8 w-8 text-medical-success" />
                  </div>
                  <div className="space-y-4 flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold">Lab Results: Ready</h3>
                        <p className="text-sm text-muted-foreground">Reference: {code}</p>
                      </div>
                      <Badge className="bg-medical-success">Finalized</Badge>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-medical-success" />
                      <p className="text-sm">Your reports have been signed by the physician and are available in your <Link to="/patient-portal/login" className="text-primary font-bold underline">Patient Portal</Link>.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {result === "pharmacy" && (
            <Card className="animate-in fade-in slide-in-from-bottom-4 duration-500 border-l-4 border-l-medical-warning">
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className="h-14 w-14 rounded-2xl bg-medical-warning/10 flex items-center justify-center shrink-0">
                    <Pill className="h-8 w-8 text-medical-warning" />
                  </div>
                  <div className="space-y-4 flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold">Pharmacy: In Progress</h3>
                        <p className="text-sm text-muted-foreground">Reference: {code}</p>
                      </div>
                      <Badge variant="secondary" className="bg-medical-warning/20 text-medical-warning border-medical-warning/30">Dispensing</Badge>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg flex items-center gap-3">
                      <Clock className="h-5 w-5 text-medical-warning" />
                      <p className="text-sm">Your medication is currently being prepared. Please check back in 10-15 minutes or wait at Counter 4.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {!result && code && (
            <div className="text-center p-8 bg-muted/30 rounded-2xl border border-dashed">
              <p className="text-muted-foreground italic">No results found for that code. Please double check and try again.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
