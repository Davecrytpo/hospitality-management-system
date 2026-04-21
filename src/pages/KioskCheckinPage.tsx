import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Building2, 
  Search, 
  Calendar, 
  UserPlus, 
  Scan,
  ChevronRight,
  ArrowLeft
} from "lucide-react";

export default function KioskCheckinPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [patientId, setPatientId] = useState("");

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">
      {/* Kiosk Header */}
      <header className="bg-white border-b p-6 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center">
            <Building2 className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-primary tracking-tight">MediCare</h1>
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Self-Service Kiosk</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
          <p className="text-[10px] text-muted-foreground">{new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</p>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-4xl">
          {step === 1 && (
            <div className="grid md:grid-cols-2 gap-8">
              <button 
                onClick={() => setStep(2)}
                className="group p-10 bg-white rounded-3xl border-4 border-transparent hover:border-primary hover:shadow-2xl transition-all text-center space-y-6"
              >
                <div className="h-24 w-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <Calendar className="h-12 w-12 text-primary" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-black">Check-in</h2>
                  <p className="text-muted-foreground">I have an appointment today</p>
                </div>
              </button>

              <button 
                onClick={() => navigate("/patient-register")}
                className="group p-10 bg-white rounded-3xl border-4 border-transparent hover:border-medical-secondary hover:shadow-2xl transition-all text-center space-y-6"
              >
                <div className="h-24 w-24 bg-medical-secondary/10 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <UserPlus className="h-12 w-12 text-medical-secondary" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-black">Register</h2>
                  <p className="text-muted-foreground">I am a new patient</p>
                </div>
              </button>
            </div>
          )}

          {step === 2 && (
            <Card className="rounded-3xl shadow-2xl overflow-hidden border-none max-w-2xl mx-auto">
              <CardHeader className="bg-primary text-white p-10">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="absolute top-6 left-6 text-white hover:bg-white/10"
                  onClick={() => setStep(1)}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <CardTitle className="text-3xl font-black text-center">Enter Patient ID</CardTitle>
                <CardDescription className="text-primary-foreground/80 text-center text-lg">
                  Enter your ID to confirm your arrival
                </CardDescription>
              </CardHeader>
              <CardContent className="p-12 space-y-8">
                <div className="relative">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground" />
                  <Input 
                    className="h-20 text-3xl pl-16 rounded-2xl border-2 focus-visible:ring-primary"
                    placeholder="PAT-000-000"
                    value={patientId}
                    onChange={(e) => setPatientId(e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, "Clear", 0, "OK"].map((num) => (
                    <Button 
                      key={num}
                      variant={num === "OK" ? "default" : "outline"}
                      className={`h-16 text-xl font-bold rounded-xl ${num === "OK" ? "bg-primary" : ""}`}
                      onClick={() => {
                        if (num === "OK") setStep(3);
                        else if (num === "Clear") setPatientId("");
                        else if (typeof num === "number") setPatientId(prev => prev + num);
                      }}
                    >
                      {num}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {step === 3 && (
            <div className="text-center space-y-8 animate-in fade-in zoom-in duration-500">
              <div className="h-32 w-32 bg-medical-success/10 rounded-full flex items-center justify-center mx-auto">
                <Scan className="h-16 w-16 text-medical-success animate-pulse" />
              </div>
              <div className="space-y-4">
                <h2 className="text-5xl font-black">Check-in Successful!</h2>
                <p className="text-2xl text-muted-foreground">
                  Hello, <span className="text-foreground font-bold">John Smith</span>. 
                  Please take a seat. Your token number is <span className="text-primary font-black">A-42</span>.
                </p>
              </div>
              <Button size="lg" className="h-16 px-12 text-xl rounded-2xl" onClick={() => setStep(1)}>
                Done
              </Button>
            </div>
          )}
        </div>
      </main>

      <footer className="p-8 text-center text-muted-foreground">
        <p className="text-sm">If you need assistance, please speak to our reception staff.</p>
      </footer>
    </div>
  );
}
