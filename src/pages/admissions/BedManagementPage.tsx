import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BedDouble, User } from "lucide-react";

const wards = [
  {
    name: "General Ward A",
    rooms: [
      { number: "101", beds: [{ id: "A", status: "occupied", patient: "John Smith" }, { id: "B", status: "available" }] },
      { number: "102", beds: [{ id: "A", status: "available" }, { id: "B", status: "occupied", patient: "Emily Davis" }] },
      { number: "103", beds: [{ id: "A", status: "maintenance" }, { id: "B", status: "available" }] },
    ],
  },
  {
    name: "ICU",
    rooms: [
      { number: "ICU-1", beds: [{ id: "A", status: "occupied", patient: "Critical Patient 1" }] },
      { number: "ICU-2", beds: [{ id: "A", status: "occupied", patient: "Critical Patient 2" }] },
      { number: "ICU-3", beds: [{ id: "A", status: "available" }] },
    ],
  },
];

const statusColors: Record<string, string> = {
  available: "bg-medical-success",
  occupied: "bg-medical-primary",
  maintenance: "bg-medical-warning",
};

export default function BedManagementPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Bed Management</h1>
            <p className="text-muted-foreground">View and manage hospital bed occupancy</p>
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by ward" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Wards</SelectItem>
              <SelectItem value="general">General Ward</SelectItem>
              <SelectItem value="icu">ICU</SelectItem>
              <SelectItem value="surgery">Surgery Ward</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-4">
          <Badge className={`${statusColors.available} text-white`}>Available</Badge>
          <Badge className={`${statusColors.occupied} text-white`}>Occupied</Badge>
          <Badge className={`${statusColors.maintenance} text-white`}>Maintenance</Badge>
        </div>

        {wards.map((ward) => (
          <Card key={ward.name}>
            <CardHeader>
              <CardTitle>{ward.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {ward.rooms.map((room) => (
                  <Card key={room.number}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Room {room.number}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2">
                        {room.beds.map((bed) => (
                          <div
                            key={bed.id}
                            className={`flex-1 rounded-lg p-3 text-white ${statusColors[bed.status]}`}
                          >
                            <div className="flex items-center gap-2">
                              <BedDouble className="h-4 w-4" />
                              <span className="font-medium">Bed {bed.id}</span>
                            </div>
                            {bed.patient && (
                              <div className="mt-2 flex items-center gap-1 text-xs">
                                <User className="h-3 w-3" />
                                {bed.patient}
                              </div>
                            )}
                            {!bed.patient && (
                              <div className="mt-2 text-xs capitalize">{bed.status}</div>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
