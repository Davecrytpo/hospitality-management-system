import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Package, Search, Filter, Plus, AlertTriangle, Eye, Edit, MoreHorizontal, RotateCw } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataStatePanel } from "@/components/ui/data-state-panel";
import { runActionWithFeedback } from "@/lib/action-feedback";

const mockInventory = [
  { id: "MED001", name: "Paracetamol 500mg", category: "Pain Relief", stock: 1500, unit: "tablets", minStock: 500, status: "In Stock" },
  { id: "MED002", name: "Amoxicillin 250mg", category: "Antibiotics", stock: 120, unit: "capsules", minStock: 200, status: "Low Stock" },
  { id: "MED003", name: "Omeprazole 20mg", category: "Gastric", stock: 800, unit: "capsules", minStock: 300, status: "In Stock" },
  { id: "MED004", name: "Insulin Glargine", category: "Diabetes", stock: 45, unit: "vials", minStock: 50, status: "Critical" },
  { id: "MED005", name: "Salbutamol Inhaler", category: "Respiratory", stock: 200, unit: "units", minStock: 100, status: "In Stock" },
];

export default function PharmacyPage() {
  const navigate = useNavigate();
  const [inventory, setInventory] = useState(mockInventory);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setInventory(mockInventory);
      setIsLoading(false);
    }, 300);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  const filteredInventory = inventory.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleRefresh = async () => {
    try {
      await runActionWithFeedback({
        actionLabel: "Refreshing inventory...",
        run: async () => {
          setErrorMessage(null);
          setIsLoading(true);
          await new Promise((resolve) => window.setTimeout(resolve, 350));
          setInventory(mockInventory);
          setIsLoading(false);
        },
        successMessage: "Inventory refreshed",
        errorMessage: "Failed to refresh inventory",
      });
    } catch {
      setErrorMessage("Failed to refresh inventory");
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold">Pharmacy Inventory</h1>
            <p className="text-muted-foreground">Manage medication stock and supplies</p>
          </div>
          <Button asChild>
            <Link to="/pharmacy/add">
              <Plus className="mr-2 h-4 w-4" />
              Add Medicine
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <Card className="cursor-pointer transition-shadow hover:shadow-md" onClick={() => { setStatusFilter(null); toast.info("Showing all items"); }}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Items</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,456</div>
            </CardContent>
          </Card>
          <Card className="cursor-pointer transition-shadow hover:shadow-md" onClick={() => { setStatusFilter("In Stock"); toast.info("Filtering: In Stock"); }}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">In Stock</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-success">2,234</div>
            </CardContent>
          </Card>
          <Card className="cursor-pointer transition-shadow hover:shadow-md" onClick={() => { setStatusFilter("Low Stock"); toast.info("Filtering: Low Stock"); }}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
              <AlertTriangle className="h-4 w-4 text-medical-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-warning">156</div>
            </CardContent>
          </Card>
          <Card className="cursor-pointer transition-shadow hover:shadow-md" onClick={() => { setStatusFilter("Critical"); toast.info("Filtering: Critical"); }}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Critical</CardTitle>
              <AlertTriangle className="h-4 w-4 text-medical-danger" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-danger">66</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
              <CardTitle>
                Inventory
                {statusFilter ? (
                  <Badge variant="secondary" className="ml-2 cursor-pointer" onClick={() => setStatusFilter(null)}>
                    {statusFilter} x
                  </Badge>
                ) : null}
              </CardTitle>
              <div className="flex w-full items-center gap-2 sm:w-auto">
                <Button variant="outline" size="icon" onClick={handleRefresh} aria-label="Refresh inventory">
                  <RotateCw className="h-4 w-4" />
                </Button>
                <div className="relative flex-1 sm:flex-initial">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search medications..."
                    className="w-full pl-8 sm:w-64"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                  />
                </div>
                <Button variant="outline" size="icon" onClick={() => navigate("/pharmacy/stock")}>
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <DataStatePanel
                state="loading"
                title="Loading pharmacy inventory"
                description="Please wait while stock records are prepared."
              />
            ) : errorMessage ? (
              <DataStatePanel
                state="error"
                title="Could not load inventory"
                description={errorMessage}
                actionLabel="Try again"
                onAction={handleRefresh}
              />
            ) : filteredInventory.length === 0 ? (
              <DataStatePanel
                state="empty"
                title="No matching medications"
                description={searchQuery || statusFilter ? "Adjust search text or status filter to find items." : "Add medicine to start managing stock here."}
                actionLabel={searchQuery || statusFilter ? "Reset filters" : undefined}
                onAction={searchQuery || statusFilter ? () => { setSearchQuery(""); setStatusFilter(null); } : undefined}
              />
            ) : (
              <div className="overflow-x-auto -mx-6 px-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Min Stock</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInventory.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.id}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell><Badge variant="outline">{item.category}</Badge></TableCell>
                        <TableCell>{item.stock} {item.unit}</TableCell>
                        <TableCell>{item.minStock}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              item.status === "In Stock" ? "default" :
                              item.status === "Critical" ? "destructive" : "secondary"
                            }
                          >
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => toast.success(`Viewing ${item.name}`)}>
                                <Eye className="mr-2 h-4 w-4" /> View
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => navigate(`/pharmacy/${item.id}/edit`)}>
                                <Edit className="mr-2 h-4 w-4" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => navigate("/pharmacy/dispense")}>
                                Dispense
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
