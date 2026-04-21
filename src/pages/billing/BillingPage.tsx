import { useState, useEffect, useCallback } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Eye, Printer, DollarSign, RotateCw } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { DataStatePanel } from "@/components/ui/data-state-panel";
import { getErrorMessage, runActionWithFeedback } from "@/lib/action-feedback";

type InvoiceRow = {
  id: string;
  invoice_number: string;
  total_amount?: number | string | null;
  paid_amount?: number | string | null;
  issue_date?: string | null;
  status?: string | null;
  patients?: {
    first_name?: string | null;
    last_name?: string | null;
  } | null;
};

export default function BillingPage() {
  const [invoices, setInvoices] = useState<InvoiceRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [stats, setStats] = useState({ total: 0, pending: 0, overdue: 0 });

  const fetchInvoices = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const { data, error } = await supabase
        .from("invoices")
        .select("*, patients(first_name, last_name)")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setInvoices(data || []);

      // Calculate simple stats
      const total = data?.reduce((acc, inv) => acc + Number(inv.total_amount ?? 0), 0) || 0;
      const pending = data?.filter(inv => inv.status === "unpaid" || inv.status === "partial")
        .reduce((acc, inv) => acc + (Number(inv.total_amount ?? 0) - Number(inv.paid_amount ?? 0)), 0) || 0;
      
      setStats({ total, pending, overdue: 0 });
    } catch (err: unknown) {
      console.error(err);
      setErrorMessage(getErrorMessage(err, "Failed to load invoices"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  const filteredInvoices = invoices.filter((inv) => {
    const invoiceNumber = inv.invoice_number.toLowerCase();
    const patientName = `${inv.patients?.first_name ?? ""} ${inv.patients?.last_name ?? ""}`.toLowerCase();
    const query = searchQuery.toLowerCase();
    return invoiceNumber.includes(query) || patientName.includes(query);
  });

  const handleRefresh = async () => {
    try {
      await runActionWithFeedback({
        actionLabel: "Refreshing invoices...",
        run: fetchInvoices,
        successMessage: "Invoices refreshed",
        errorMessage: "Failed to refresh invoices",
      });
    } catch {
      // feedback already handled by helper
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Invoices</h1>
            <p className="text-muted-foreground">Manage patient billing and invoices</p>
          </div>
          <Button asChild>
            <Link to="/billing/new">
              <Plus className="mr-2 h-4 w-4" />
              Create Invoice
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Billed</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.total.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Outstanding Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-warning">${stats.pending.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-danger">$0</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Invoice List</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={handleRefresh} aria-label="Refresh invoices">
                  <RotateCw className="h-4 w-4" />
                </Button>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search invoices..." 
                    className="pl-8 w-64"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <DataStatePanel
                state="loading"
                title="Loading invoices"
                description="Please wait while billing records are fetched."
              />
            ) : errorMessage ? (
              <DataStatePanel
                state="error"
                title="Could not load invoices"
                description={errorMessage}
                actionLabel="Try again"
                onAction={handleRefresh}
              />
            ) : filteredInvoices.length === 0 ? (
              <DataStatePanel
                state="empty"
                title="No invoices found"
                description={searchQuery ? "Try a different invoice number or patient name." : "Create a new invoice to populate billing records."}
                actionLabel={searchQuery ? "Clear search" : undefined}
                onAction={searchQuery ? () => setSearchQuery("") : undefined}
              />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice #</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Paid</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-24">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-mono text-xs">{invoice.invoice_number}</TableCell>
                      <TableCell className="font-medium">{invoice.patients?.first_name} {invoice.patients?.last_name}</TableCell>
                      <TableCell>${Number(invoice.total_amount).toFixed(2)}</TableCell>
                      <TableCell>${Number(invoice.paid_amount || 0).toFixed(2)}</TableCell>
                      <TableCell>{new Date(invoice.issue_date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant={
                          invoice.status === "paid" ? "default" : 
                          invoice.status === "partial" ? "outline" : "secondary"
                        } className="capitalize">
                          {invoice.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" asChild>
                            <Link to={`/billing/${invoice.id}`}><Eye className="h-4 w-4" /></Link>
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => { toast.info("Preparing print view"); window.print(); }}><Printer className="h-4 w-4" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
