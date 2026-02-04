import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Patients
import PatientsPage from "./pages/patients/PatientsPage";
import RegisterPatientPage from "./pages/patients/RegisterPatientPage";
import PatientSearchPage from "./pages/patients/PatientSearchPage";
import PatientHistoryPage from "./pages/patients/PatientHistoryPage";

// Doctors
import DoctorsPage from "./pages/doctors/DoctorsPage";
import DoctorSchedulesPage from "./pages/doctors/DoctorSchedulesPage";
import SpecializationsPage from "./pages/doctors/SpecializationsPage";

// Appointments
import AppointmentsPage from "./pages/appointments/AppointmentsPage";
import NewAppointmentPage from "./pages/appointments/NewAppointmentPage";
import CalendarPage from "./pages/appointments/CalendarPage";

// Admissions
import AdmissionsPage from "./pages/admissions/AdmissionsPage";
import NewAdmissionPage from "./pages/admissions/NewAdmissionPage";
import DischargePage from "./pages/admissions/DischargePage";
import BedManagementPage from "./pages/admissions/BedManagementPage";

// Medical Records
import RecordsPage from "./pages/records/RecordsPage";
import DiagnosisPage from "./pages/records/DiagnosisPage";
import TreatmentsPage from "./pages/records/TreatmentsPage";

// Prescriptions
import PrescriptionsPage from "./pages/prescriptions/PrescriptionsPage";
import NewPrescriptionPage from "./pages/prescriptions/NewPrescriptionPage";
import PrescriptionTemplatesPage from "./pages/prescriptions/TemplatesPage";

// Pharmacy
import PharmacyPage from "./pages/pharmacy/PharmacyPage";
import DispensePage from "./pages/pharmacy/DispensePage";
import StockManagementPage from "./pages/pharmacy/StockManagementPage";

// Laboratory
import LabPage from "./pages/lab/LabPage";
import LabResultsPage from "./pages/lab/LabResultsPage";
import LabReportsPage from "./pages/lab/LabReportsPage";

// Diagnostics
import ImagingPage from "./pages/diagnostics/ImagingPage";
import RadiologyPage from "./pages/diagnostics/RadiologyPage";
import DiagnosticReportsPage from "./pages/diagnostics/DiagnosticReportsPage";

// Vitals
import VitalsPage from "./pages/vitals/VitalsPage";

// Departments
import DepartmentsPage from "./pages/departments/DepartmentsPage";
import EmergencyPage from "./pages/departments/EmergencyPage";
import OPDPage from "./pages/departments/OPDPage";
import IPDPage from "./pages/departments/IPDPage";

// Billing
import BillingPage from "./pages/billing/BillingPage";
import NewInvoicePage from "./pages/billing/NewInvoicePage";
import PaymentsPage from "./pages/billing/PaymentsPage";
import InsurancePage from "./pages/billing/InsurancePage";

// Settings & Support
import SettingsPage from "./pages/settings/SettingsPage";
import SupportPage from "./pages/support/SupportPage";

// Patient Portal
import PatientRegisterPage from "./pages/patient-portal/PatientRegisterPage";
import PatientLoginPage from "./pages/patient-portal/PatientLoginPage";
import PatientDashboard from "./pages/patient-portal/PatientDashboard";
import PatientAppointmentsPage from "./pages/patient-portal/PatientAppointmentsPage";
import PatientPrescriptionsPage from "./pages/patient-portal/PatientPrescriptionsPage";
import PatientRecordsPage from "./pages/patient-portal/PatientRecordsPage";
import PatientProfilePage from "./pages/patient-portal/PatientProfilePage";

// Auth
import AuthPage from "./pages/auth/AuthPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="hospital-theme" attribute="class" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            
            {/* Patients */}
            <Route path="/patients" element={<PatientsPage />} />
            <Route path="/patients/register" element={<RegisterPatientPage />} />
            <Route path="/patients/search" element={<PatientSearchPage />} />
            <Route path="/patients/history" element={<PatientHistoryPage />} />
            
            {/* Doctors */}
            <Route path="/doctors" element={<DoctorsPage />} />
            <Route path="/doctors/schedules" element={<DoctorSchedulesPage />} />
            <Route path="/doctors/specializations" element={<SpecializationsPage />} />
            
            {/* Appointments */}
            <Route path="/appointments" element={<AppointmentsPage />} />
            <Route path="/appointments/new" element={<NewAppointmentPage />} />
            <Route path="/appointments/calendar" element={<CalendarPage />} />
            
            {/* Admissions */}
            <Route path="/admissions" element={<AdmissionsPage />} />
            <Route path="/admissions/new" element={<NewAdmissionPage />} />
            <Route path="/admissions/discharge" element={<DischargePage />} />
            <Route path="/admissions/beds" element={<BedManagementPage />} />
            
            {/* Medical Records */}
            <Route path="/records" element={<RecordsPage />} />
            <Route path="/records/diagnosis" element={<DiagnosisPage />} />
            <Route path="/records/treatments" element={<TreatmentsPage />} />
            
            {/* Prescriptions */}
            <Route path="/prescriptions" element={<PrescriptionsPage />} />
            <Route path="/prescriptions/new" element={<NewPrescriptionPage />} />
            <Route path="/prescriptions/templates" element={<PrescriptionTemplatesPage />} />
            
            {/* Pharmacy */}
            <Route path="/pharmacy" element={<PharmacyPage />} />
            <Route path="/pharmacy/dispense" element={<DispensePage />} />
            <Route path="/pharmacy/stock" element={<StockManagementPage />} />
            
            {/* Laboratory */}
            <Route path="/lab" element={<LabPage />} />
            <Route path="/lab/results" element={<LabResultsPage />} />
            <Route path="/lab/reports" element={<LabReportsPage />} />
            
            {/* Diagnostics */}
            <Route path="/diagnostics/imaging" element={<ImagingPage />} />
            <Route path="/diagnostics/radiology" element={<RadiologyPage />} />
            <Route path="/diagnostics/reports" element={<DiagnosticReportsPage />} />
            
            {/* Vitals */}
            <Route path="/vitals" element={<VitalsPage />} />
            
            {/* Departments */}
            <Route path="/departments" element={<DepartmentsPage />} />
            <Route path="/departments/emergency" element={<EmergencyPage />} />
            <Route path="/departments/opd" element={<OPDPage />} />
            <Route path="/departments/ipd" element={<IPDPage />} />
            
            {/* Billing */}
            <Route path="/billing" element={<BillingPage />} />
            <Route path="/billing/new" element={<NewInvoicePage />} />
            <Route path="/billing/payments" element={<PaymentsPage />} />
            <Route path="/billing/insurance" element={<InsurancePage />} />
            
            {/* Settings & Support */}
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/support" element={<SupportPage />} />
            
            {/* Patient Portal */}
            <Route path="/patient-register" element={<PatientRegisterPage />} />
            <Route path="/patient-portal/login" element={<PatientLoginPage />} />
            <Route path="/patient-portal" element={<PatientDashboard />} />
            <Route path="/patient-portal/appointments" element={<PatientAppointmentsPage />} />
            <Route path="/patient-portal/prescriptions" element={<PatientPrescriptionsPage />} />
            <Route path="/patient-portal/records" element={<PatientRecordsPage />} />
            <Route path="/patient-portal/profile" element={<PatientProfilePage />} />
            
            {/* Auth */}
            <Route path="/auth" element={<AuthPage />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
