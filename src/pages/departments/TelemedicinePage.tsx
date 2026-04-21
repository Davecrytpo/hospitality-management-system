import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Video, Phone, Camera, CameraOff, Mic, MicOff, Monitor } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockConsultations = [
  { id: 1, patient: "Bola Adeyemi", doctor: "Dr. Emeka Obi", scheduled: "10:00 AM", status: "waiting" },
  { id: 2, patient: "Ngozi Eze", doctor: "Dr. Chioma Johnson", scheduled: "11:30 AM", status: "scheduled" },
  { id: 3, patient: "Musa Ibrahim", doctor: "Dr. Emeka Obi", scheduled: "02:00 PM", status: "scheduled" },
];

export default function TelemedicinePage() {
  const { toast } = useToast();
  const [inCall, setInCall] = useState(false);
  const [muted, setMuted] = useState(false);
  const [camOff, setCamOff] = useState(false);
  const [notes, setNotes] = useState("");

  const startCall = (patient: string) => {
    setInCall(true);
    toast({ title: `Connecting to ${patient}...` });
  };

  const endCall = () => {
    setInCall(false);
    toast({ title: "Call ended" });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2"><Video className="h-6 w-6 text-primary" /> Telemedicine Interface</h1>
          <p className="text-muted-foreground">Video call and remote consultation tools</p>
        </div>

        {inCall ? (
          <div className="space-y-4">
            <Card className="border-primary">
              <CardHeader><CardTitle className="text-primary flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" /> Live Consultation</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <Camera className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>Patient Camera Feed</p>
                      <p className="text-xs">(Integration with WebRTC in production)</p>
                    </div>
                  </div>
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      {camOff ? <CameraOff className="h-12 w-12 mx-auto mb-2 opacity-50" /> : <Camera className="h-12 w-12 mx-auto mb-2 opacity-50" />}
                      <p>Your Camera {camOff ? "(Off)" : "(On)"}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 justify-center">
                  <Button variant="outline" size="icon" onClick={() => setMuted(!muted)}>{muted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}</Button>
                  <Button variant="outline" size="icon" onClick={() => setCamOff(!camOff)}>{camOff ? <CameraOff className="h-5 w-5" /> : <Camera className="h-5 w-5" />}</Button>
                  <Button variant="destructive" onClick={endCall}><Phone className="mr-2 h-4 w-4" /> End Call</Button>
                </div>
                <div className="space-y-1">
                  <Label>Consultation Notes</Label>
                  <Textarea rows={4} value={notes} onChange={e => setNotes(e.target.value)} placeholder="Document findings and recommendations during the call..." />
                </div>
                <Button onClick={() => toast({ title: "Notes saved!" })} className="w-full">Save Notes</Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              {[
                { label: "Today's Sessions", value: mockConsultations.length },
                { label: "Waiting", value: mockConsultations.filter(c => c.status === "waiting").length },
                { label: "Scheduled", value: mockConsultations.filter(c => c.status === "scheduled").length },
              ].map(s => (
                <Card key={s.label}>
                  <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">{s.label}</CardTitle></CardHeader>
                  <CardContent><div className="text-3xl font-bold">{s.value}</div></CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader><CardTitle>Consultation Queue</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockConsultations.map(c => (
                    <div key={c.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{c.patient}</p>
                        <p className="text-sm text-muted-foreground">{c.doctor} • {c.scheduled}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={c.status === "waiting" ? "destructive" : "secondary"}>{c.status}</Badge>
                        {c.status === "waiting" && (
                          <Button size="sm" onClick={() => startCall(c.patient)}>
                            <Video className="mr-2 h-4 w-4" /> Join Call
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
