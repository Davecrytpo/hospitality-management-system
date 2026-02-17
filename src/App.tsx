import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { AuthGuard } from "@/components/auth/AuthGuard";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Patients
import PatientsPage from "./pages/patients/PatientsPage";
import RegisterPatientPage from "./pages/patients/RegisterPatientPage";
import PatientSearchPage from "./pages/patients/PatientSearchPage";
import PatientHistoryPage from "./pages/patients/PatientHistoryPage";

// Doctors
import DoctorsPage from "./pages/doctors/DoctorsPage";
import AddDoctorPage from "./pages/doctors/AddDoctorPage";
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

const AdminRoute = ({ children }: { children: React.ReactNode }) => (
  <AuthGuard requiredRole="admin">{children}</AuthGuard>
);

const PatientRoute = ({ children }: { children: React.ReactNode }) => (
  <AuthGuard requiredRole="patient">{children}</AuthGuard>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="hospital-theme" attribute="class" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Auth (public) */}
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/patient-register" element={<PatientRegisterPage />} />
            <Route path="/patient-portal/login" element={<PatientLoginPage />} />

            {/* Admin protected routes */}
            <Route path="/" element={<AdminRoute><Index /></AdminRoute>} />

            {/* Patients */}
            <Route path="/patients" element={<AdminRoute><PatientsPage /></AdminRoute>} />
            <Route path="/patients/register" element={<AdminRoute><RegisterPatientPage /></AdminRoute>} />
            <Route path="/patients/search" element={<AdminRoute><PatientSearchPage /></AdminRoute>} />
            <Route path="/patients/history" element={<AdminRoute><PatientHistoryPage /></AdminRoute>} />

            {/* Doctors */}
            <Route path="/doctors" element={<AdminRoute><DoctorsPage /></AdminRoute>} />
            <Route path="/doctors/add" element={<AdminRoute><AddDoctorPage /></AdminRoute>} />
            <Route path="/doctors/schedules" element={<AdminRoute><DoctorSchedulesPage /></AdminRoute>} />
            <Route path="/doctors/specializations" element={<AdminRoute><SpecializationsPage /></AdminRoute>} />

            {/* Appointments */}
            <Route path="/appointments" element={<AdminRoute><AppointmentsPage /></AdminRoute>} />
            <Route path="/appointments/new" element={<AdminRoute><NewAppointmentPage /></AdminRoute>} />
            <Route path="/appointments/calendar" element={<AdminRoute><CalendarPage /></AdminRoute>} />

            {/* Admissions */}
            <Route path="/admissions" element={<AdminRoute><AdmissionsPage /></AdminRoute>} />
            <Route path="/admissions/new" element={<AdminRoute><NewAdmissionPage /></AdminRoute>} />
            <Route path="/admissions/discharge" element={<AdminRoute><DischargePage /></AdminRoute>} />
            <Route path="/admissions/beds" element={<AdminRoute><BedManagementPage /></AdminRoute>} />

            {/* Medical Records */}
            <Route path="/records" element={<AdminRoute><RecordsPage /></AdminRoute>} />
            <Route path="/records/diagnosis" element={<AdminRoute><DiagnosisPage /></AdminRoute>} />
            <Route path="/records/treatments" element={<AdminRoute><TreatmentsPage /></AdminRoute>} />

            {/* Prescriptions */}
            <Route path="/prescriptions" element={<AdminRoute><PrescriptionsPage /></AdminRoute>} />
            <Route path="/prescriptions/new" element={<AdminRoute><NewPrescriptionPage /></AdminRoute>} />
            <Route path="/prescriptions/templates" element={<AdminRoute><PrescriptionTemplatesPage /></AdminRoute>} />

            {/* Pharmacy */}
            <Route path="/pharmacy" element={<AdminRoute><PharmacyPage /></AdminRoute>} />
            <Route path="/pharmacy/dispense" element={<AdminRoute><DispensePage /></AdminRoute>} />
            <Route path="/pharmacy/stock" element={<AdminRoute><StockManagementPage /></AdminRoute>} />

            {/* Laboratory */}
            <Route path="/lab" element={<AdminRoute><LabPage /></AdminRoute>} />
            <Route path="/lab/results" element={<AdminRoute><LabResultsPage /></AdminRoute>} />
            <Route path="/lab/reports" element={<AdminRoute><LabReportsPage /></AdminRoute>} />

            {/* Diagnostics */}
            <Route path="/diagnostics/imaging" element={<AdminRoute><ImagingPage /></AdminRoute>} />
            <Route path="/diagnostics/radiology" element={<AdminRoute><RadiologyPage /></AdminRoute>} />
            <Route path="/diagnostics/reports" element={<AdminRoute><DiagnosticReportsPage /></AdminRoute>} />

            {/* Vitals */}
            <Route path="/vitals" element={<AdminRoute><VitalsPage /></AdminRoute>} />

            {/* Departments */}
            <Route path="/departments" element={<AdminRoute><DepartmentsPage /></AdminRoute>} />
            <Route path="/departments/emergency" element={<AdminRoute><EmergencyPage /></AdminRoute>} />
            <Route path="/departments/opd" element={<AdminRoute><OPDPage /></AdminRoute>} />
            <Route path="/departments/ipd" element={<AdminRoute><IPDPage /></AdminRoute>} />

            {/* Billing */}
            <Route path="/billing" element={<AdminRoute><BillingPage /></AdminRoute>} />
            <Route path="/billing/new" element={<AdminRoute><NewInvoicePage /></AdminRoute>} />
            <Route path="/billing/payments" element={<AdminRoute><PaymentsPage /></AdminRoute>} />
            <Route path="/billing/insurance" element={<AdminRoute><InsurancePage /></AdminRoute>} />

            {/* Settings & Support */}
            <Route path="/settings" element={<AdminRoute><SettingsPage /></AdminRoute>} />
            <Route path="/support" element={<AdminRoute><SupportPage /></AdminRoute>} />

            {/* Patient Portal (protected) */}
            <Route path="/patient-portal" element={<PatientRoute><PatientDashboard /></PatientRoute>} />
            <Route path="/patient-portal/appointments" element={<PatientRoute><PatientAppointmentsPage /></PatientRoute>} />
            <Route path="/patient-portal/prescriptions" element={<PatientRoute><PatientPrescriptionsPage /></PatientRoute>} />
            <Route path="/patient-portal/records" element={<PatientRoute><PatientRecordsPage /></PatientRoute>} />
            <Route path="/patient-portal/profile" element={<PatientRoute><PatientProfilePage /></PatientRoute>} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
