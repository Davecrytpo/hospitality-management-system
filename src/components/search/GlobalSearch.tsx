import { useState, useEffect, useRef } from "react";
import { Search, X, Users, Calendar, FileText, Pill, TestTube, Settings, BedDouble, Receipt, Stethoscope, Building2, Activity, Heart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface SearchItem {
  label: string;
  path: string;
  category: string;
  icon: React.ElementType;
  keywords: string[];
}

const searchItems: SearchItem[] = [
  // Patients
  { label: "All Patients", path: "/patients", category: "Patients", icon: Users, keywords: ["patient", "list", "all", "view"] },
  { label: "Register Patient", path: "/patients/register", category: "Patients", icon: Users, keywords: ["register", "new", "add", "patient", "create"] },
  { label: "Search Patients", path: "/patients/search", category: "Patients", icon: Search, keywords: ["search", "find", "patient", "lookup"] },
  { label: "Patient History", path: "/patients/history", category: "Patients", icon: FileText, keywords: ["history", "patient", "records", "past"] },
  
  // Doctors
  { label: "All Doctors", path: "/doctors", category: "Doctors", icon: Stethoscope, keywords: ["doctor", "physician", "list", "staff"] },
  { label: "Doctor Schedules", path: "/doctors/schedules", category: "Doctors", icon: Calendar, keywords: ["schedule", "doctor", "availability", "time"] },
  { label: "Specializations", path: "/doctors/specializations", category: "Doctors", icon: Stethoscope, keywords: ["specialization", "specialty", "department"] },
  
  // Appointments
  { label: "All Appointments", path: "/appointments", category: "Appointments", icon: Calendar, keywords: ["appointment", "booking", "schedule", "visit"] },
  { label: "New Appointment", path: "/appointments/new", category: "Appointments", icon: Calendar, keywords: ["new", "book", "appointment", "schedule", "create"] },
  { label: "Calendar View", path: "/appointments/calendar", category: "Appointments", icon: Calendar, keywords: ["calendar", "view", "schedule", "week"] },
  
  // Admissions
  { label: "Admissions", path: "/admissions", category: "Admissions", icon: BedDouble, keywords: ["admission", "admitted", "inpatient"] },
  { label: "New Admission", path: "/admissions/new", category: "Admissions", icon: BedDouble, keywords: ["new", "admit", "admission", "inpatient"] },
  { label: "Discharge Patient", path: "/admissions/discharge", category: "Admissions", icon: BedDouble, keywords: ["discharge", "release", "checkout"] },
  { label: "Bed Management", path: "/admissions/beds", category: "Admissions", icon: BedDouble, keywords: ["bed", "ward", "room", "occupancy"] },
  
  // Medical Records
  { label: "Medical Records", path: "/records", category: "Records", icon: FileText, keywords: ["record", "medical", "file", "document"] },
  { label: "Diagnosis Entry", path: "/records/diagnosis", category: "Records", icon: FileText, keywords: ["diagnosis", "condition", "disease"] },
  { label: "Treatments", path: "/records/treatments", category: "Records", icon: FileText, keywords: ["treatment", "therapy", "procedure"] },
  
  // Prescriptions
  { label: "Prescriptions", path: "/prescriptions", category: "Prescriptions", icon: Pill, keywords: ["prescription", "medication", "medicine", "rx"] },
  { label: "New Prescription", path: "/prescriptions/new", category: "Prescriptions", icon: Pill, keywords: ["new", "create", "prescription", "write"] },
  { label: "Templates", path: "/prescriptions/templates", category: "Prescriptions", icon: Pill, keywords: ["template", "preset", "prescription"] },
  
  // Pharmacy
  { label: "Pharmacy", path: "/pharmacy", category: "Pharmacy", icon: Pill, keywords: ["pharmacy", "drug", "medication", "medicine"] },
  { label: "Dispense Medicine", path: "/pharmacy/dispense", category: "Pharmacy", icon: Pill, keywords: ["dispense", "give", "medicine", "drug"] },
  { label: "Stock Management", path: "/pharmacy/stock", category: "Pharmacy", icon: Pill, keywords: ["stock", "inventory", "supply"] },
  
  // Laboratory
  { label: "Laboratory", path: "/lab", category: "Laboratory", icon: TestTube, keywords: ["lab", "laboratory", "test", "sample"] },
  { label: "Lab Results", path: "/lab/results", category: "Laboratory", icon: TestTube, keywords: ["result", "lab", "test", "report"] },
  { label: "Lab Reports", path: "/lab/reports", category: "Laboratory", icon: TestTube, keywords: ["report", "lab", "document"] },
  
  // Diagnostics
  { label: "Imaging", path: "/diagnostics/imaging", category: "Diagnostics", icon: Activity, keywords: ["imaging", "scan", "xray", "mri", "ct"] },
  { label: "Radiology", path: "/diagnostics/radiology", category: "Diagnostics", icon: Activity, keywords: ["radiology", "xray", "scan"] },
  { label: "Diagnostic Reports", path: "/diagnostics/reports", category: "Diagnostics", icon: FileText, keywords: ["diagnostic", "report", "result"] },
  
  // Vitals
  { label: "Vitals Monitoring", path: "/vitals", category: "Vitals", icon: Heart, keywords: ["vital", "bp", "pulse", "temperature", "monitoring"] },
  
  // Departments
  { label: "Departments", path: "/departments", category: "Departments", icon: Building2, keywords: ["department", "unit", "section"] },
  { label: "Emergency", path: "/departments/emergency", category: "Departments", icon: Building2, keywords: ["emergency", "er", "urgent", "trauma"] },
  { label: "OPD", path: "/departments/opd", category: "Departments", icon: Building2, keywords: ["opd", "outpatient", "clinic"] },
  { label: "IPD", path: "/departments/ipd", category: "Departments", icon: Building2, keywords: ["ipd", "inpatient", "ward"] },
  
  // Billing
  { label: "Billing", path: "/billing", category: "Billing", icon: Receipt, keywords: ["billing", "invoice", "payment", "finance"] },
  { label: "New Invoice", path: "/billing/new", category: "Billing", icon: Receipt, keywords: ["new", "invoice", "bill", "create"] },
  { label: "Payments", path: "/billing/payments", category: "Billing", icon: Receipt, keywords: ["payment", "receive", "transaction"] },
  { label: "Insurance Claims", path: "/billing/insurance", category: "Billing", icon: Receipt, keywords: ["insurance", "claim", "coverage"] },
  
  // Settings & Support
  { label: "Settings", path: "/settings", category: "Settings", icon: Settings, keywords: ["setting", "configuration", "preference"] },
  { label: "Support", path: "/support", category: "Support", icon: Settings, keywords: ["support", "help", "contact", "ticket"] },
];

interface GlobalSearchProps {
  className?: string;
}

export function GlobalSearch({ className }: GlobalSearchProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length >= 1) {
      const filtered = searchItems.filter((item) => {
        const searchTerm = query.toLowerCase();
        return (
          item.label.toLowerCase().includes(searchTerm) ||
          item.category.toLowerCase().includes(searchTerm) ||
          item.keywords.some((keyword) => keyword.includes(searchTerm))
        );
      });
      setSuggestions(filtered.slice(0, 8));
      setIsOpen(true);
      setSelectedIndex(0);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (item: SearchItem) => {
    navigate(item.path);
    setQuery("");
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || suggestions.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % suggestions.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
        break;
      case "Enter":
        e.preventDefault();
        handleSelect(suggestions[selectedIndex]);
        break;
      case "Escape":
        setIsOpen(false);
        break;
    }
  };

  const clearSearch = () => {
    setQuery("");
    setSuggestions([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          ref={inputRef}
          placeholder="Search patients, doctors, records..."
          className="w-64 pl-9 pr-8 lg:w-80"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length >= 1 && setIsOpen(true)}
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {isOpen && suggestions.length > 0 && (
        <div className="absolute top-full left-0 z-50 mt-1 w-full min-w-[320px] rounded-lg border bg-popover shadow-lg">
          <div className="p-2">
            <p className="px-2 py-1 text-xs font-medium text-muted-foreground">
              {suggestions.length} result{suggestions.length !== 1 ? "s" : ""} found
            </p>
            {suggestions.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => handleSelect(item)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-md px-3 py-2 text-left transition-colors",
                    index === selectedIndex
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-muted"
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <div className="flex-1 overflow-hidden">
                    <p className="truncate text-sm font-medium">{item.label}</p>
                    <p className="truncate text-xs text-muted-foreground">{item.category}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {isOpen && query.length >= 1 && suggestions.length === 0 && (
        <div className="absolute top-full left-0 z-50 mt-1 w-full min-w-[320px] rounded-lg border bg-popover p-4 shadow-lg">
          <p className="text-center text-sm text-muted-foreground">No results found for "{query}"</p>
        </div>
      )}
    </div>
  );
}
