import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Megaphone, Calendar, User, MessageSquarePlus, Trash2, Save, Plus } from "lucide-react";
import { toast } from "sonner";

type Notice = {
  id: number;
  title: string;
  category: string;
  author: string;
  date: string;
  content: string;
  priority: "urgent" | "high" | "low";
};

export default function InternalNoticeBoard() {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", category: "General", content: "", priority: "low" });
  const [notices, setNotices] = useState<Notice[]>([
    {
      id: 1,
      title: "New Hospital Software Training",
      category: "Training",
      author: "IT Department",
      date: "Feb 20, 2024",
      content: "Mandatory training session for all clinical staff regarding the new electronic health records system. Please attend in the main auditorium at 2 PM.",
      priority: "high"
    },
    {
      id: 2,
      title: "Annual Hospital Gala",
      category: "Event",
      author: "Administration",
      date: "Mar 05, 2024",
      content: "Join us for our annual fundraising gala. Tickets are available at the front desk for all staff members at a discounted rate.",
      priority: "low"
    },
    {
      id: 3,
      title: "Updated COVID-19 Protocols",
      category: "Protocol",
      author: "Infection Control",
      date: "Feb 18, 2024",
      content: "Please review the updated masking and sanitation protocols in the staff manual. Changes take effect immediately.",
      priority: "urgent"
    }
  ]);

  const handlePost = () => {
    if (!form.title || !form.content) {
      toast.error("Please fill in title and content");
      return;
    }
    const newNotice: Notice = {
      id: Date.now(),
      title: form.title,
      category: form.category,
      author: "Current User",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      content: form.content,
      priority: form.priority as Notice["priority"],
    };
    setNotices(prev => [newNotice, ...prev]);
    toast.success("Notice posted successfully!");
    setShowForm(false);
    setForm({ title: "", category: "General", content: "", priority: "low" });
  };

  const handleDelete = (id: number) => {
    setNotices(prev => prev.filter(n => n.id !== id));
    toast.success("Notice deleted");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2"><Megaphone className="h-6 w-6 text-primary" /> Internal Notice Board</h1>
            <p className="text-muted-foreground">Announcements and communications for hospital staff</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>
            {showForm ? "Cancel" : <><MessageSquarePlus className="mr-2 h-4 w-4" /> Post New Notice</>}
          </Button>
        </div>

        {showForm && (
          <Card>
            <CardHeader><CardTitle>New Notice</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-1 md:col-span-2">
                  <Label>Title *</Label>
                  <Input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="Notice title" />
                </div>
                <div className="space-y-1">
                  <Label>Priority</Label>
                  <Select value={form.priority} onValueChange={v => setForm(p => ({ ...p, priority: v }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="urgent">Urgent</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-1">
                <Label>Category</Label>
                <Select value={form.category} onValueChange={v => setForm(p => ({ ...p, category: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["General", "Training", "Protocol", "Event", "Emergency", "Policy"].map(c => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label>Content *</Label>
                <Textarea rows={4} value={form.content} onChange={e => setForm(p => ({ ...p, content: e.target.value }))} placeholder="Write your notice content..." />
              </div>
              <Button onClick={handlePost}><Save className="mr-2 h-4 w-4" /> Post Notice</Button>
            </CardContent>
          </Card>
        )}

        {notices.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              No notices posted yet. Click "Post New Notice" to create one.
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {notices.map((notice) => (
              <Card key={notice.id} className={`overflow-hidden border-l-4 ${
                notice.priority === 'urgent' ? 'border-l-destructive' : 
                notice.priority === 'high' ? 'border-l-primary' : 'border-l-muted-foreground/30'
              }`}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant={
                          notice.priority === 'urgent' ? 'destructive' : 
                          notice.priority === 'high' ? 'default' : 'secondary'
                        } className="text-[10px] h-4">
                          {notice.priority.toUpperCase()}
                        </Badge>
                        <span className="text-xs font-medium text-muted-foreground">{notice.category}</span>
                      </div>
                      <CardTitle className="text-xl">{notice.title}</CardTitle>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => handleDelete(notice.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">{notice.content}</p>
                  <div className="flex items-center gap-6 pt-4 border-t text-xs text-muted-foreground flex-wrap">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      <span>Posted by: <span className="font-bold text-foreground">{notice.author}</span></span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>Date: <span className="font-bold text-foreground">{notice.date}</span></span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}