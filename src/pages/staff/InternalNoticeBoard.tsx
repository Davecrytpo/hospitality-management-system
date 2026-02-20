import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Megaphone, Bell, Calendar, User, MessageSquarePlus, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function InternalNoticeBoard() {
  const [notices, setNotices] = useState([
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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Internal Notice Board</h1>
            <p className="text-muted-foreground">Announcements and communications for hospital staff</p>
          </div>
          <Button onClick={() => toast.info("New Notice creation would open here")}>
            <MessageSquarePlus className="mr-2 h-4 w-4" />
            Post New Notice
          </Button>
        </div>

        <div className="grid gap-6">
          {notices.map((notice) => (
            <Card key={notice.id} className={`overflow-hidden border-l-4 ${
              notice.priority === 'urgent' ? 'border-l-medical-danger' : 
              notice.priority === 'high' ? 'border-l-medical-warning' : 'border-l-medical-primary'
            }`}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
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
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {notice.content}
                </p>
                <div className="flex items-center gap-6 pt-4 border-t text-xs text-muted-foreground">
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
      </div>
    </DashboardLayout>
  );
}
