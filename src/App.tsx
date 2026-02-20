import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { AuthGuard } from "@/components/auth/AuthGuard";

// Public Pages
import PublicLandingPage from "./pages/PublicLandingPage";
import KioskCheckinPage from "./pages/KioskCheckinPage";
import PublicVerificationPage from "./pages/PublicVerificationPage";
import NotFound from "./pages/NotFound";

// Admin Dashboard Base
import Index from "./pages/Index";

// Patients
import PatientsPage from "./pages/patients/PatientsPage";
import RegisterPatientPage from "./pages/patients/RegisterPatientPage";
import PatientSearchPage from "./pages/patients/PatientSearchPage";
import PatientHistoryPage from "./pages/patients/PatientHistoryPage";
import PatientDetailsPage from "./pages/patients/PatientDetailsPage";
import PatientEditPage from "./pages/patients/PatientEditPage";

// Doctors
import DoctorsPage from "./pages/doctors/DoctorsPage";
import AddDoctorPage from "./pages/doctors/AddDoctorPage";
import DoctorDetailsPage from "./pages/doctors/DoctorDetailsPage";
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
import BedAssignmentPage from "./pages/admissions/BedAssignmentPage";

// Medical Records
import RecordsPage from "./pages/records/RecordsPage";
import DiagnosisPage from "./pages/records/DiagnosisPage";
import TreatmentsPage from "./pages/records/TreatmentsPage";

// Prescriptions
import PrescriptionsPage from "./pages/prescriptions/PrescriptionsPage";
import NewPrescriptionPage from "./pages/prescriptions/NewPrescriptionPage";
import PrescriptionTemplatesPage from "./pages/prescriptions/TemplatesPage";
import PrescriptionViewPage from "./pages/prescriptions/PrescriptionViewPage";

// Pharmacy
import PharmacyPage from "./pages/pharmacy/PharmacyPage";
import DispensePage from "./pages/pharmacy/DispensePage";
import StockManagementPage from "./pages/pharmacy/StockManagementPage";
import AddMedicinePage from "./pages/pharmacy/AddMedicinePage";
import MedicineEditPage from "./pages/pharmacy/MedicineEditPage";

// Laboratory
import LabPage from "./pages/lab/LabPage";
import LabResultsPage from "./pages/lab/LabResultsPage";
import LabReportsPage from "./pages/lab/LabReportsPage";
import LabOrderPage from "./pages/lab/LabOrderPage";
import LabResultEntryPage from "./pages/lab/LabResultEntryPage";

// Diagnostics
import ImagingPage from "./pages/diagnostics/ImagingPage";
import RadiologyPage from "./pages/diagnostics/RadiologyPage";
import DiagnosticReportsPage from "./pages/diagnostics/DiagnosticReportsPage";

// Vitals
import VitalsPage from "./pages/vitals/VitalsPage";
import TriageAssessmentPage from "./pages/vitals/TriageAssessmentPage";

// Departments
import DepartmentsPage from "./pages/departments/DepartmentsPage";
import EmergencyPage from "./pages/departments/EmergencyPage";
import OPDPage from "./pages/departments/OPDPage";
import IPDPage from "./pages/departments/IPDPage";

// Billing
import BillingPage from "./pages/billing/BillingPage";
import NewInvoicePage from "./pages/billing/NewInvoicePage";
import ViewInvoicePage from "./pages/billing/ViewInvoicePage";
import PaymentsPage from "./pages/billing/PaymentsPage";
import InsurancePage from "./pages/billing/InsurancePage";
import InsuranceClaimPage from "./pages/billing/InsuranceClaimPage";
import PaymentReceiptPage from "./pages/billing/PaymentReceiptPage";

// Settings & Support
import SettingsPage from "./pages/settings/SettingsPage";
import SupportPage from "./pages/support/SupportPage";
import StaffManagementPage from "./pages/staff/StaffManagementPage";
import InternalNoticeBoard from "./pages/staff/InternalNoticeBoard";

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
            {/* Public Pages */}
            <Route path="/" element={<PublicLandingPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/patient-register" element={<PatientRegisterPage />} />
            <Route path="/kiosk" element={<KioskCheckinPage />} />
            <Route path="/verify" element={<PublicVerificationPage />} />
            <Route path="/patient-portal/login" element={<PatientLoginPage />} />

            {/* Admin protected routes */}
            <Route path="/dashboard" element={<AdminRoute><Index /></AdminRoute>} />

            {/* Patients */}
            <Route path="/patients" element={<AdminRoute><PatientsPage /></AdminRoute>} />
            <Route path="/patients/register" element={<AdminRoute><RegisterPatientPage /></AdminRoute>} />
            <Route path="/patients/search" element={<AdminRoute><PatientSearchPage /></AdminRoute>} />
            <Route path="/patients/history" element={<AdminRoute><PatientHistoryPage /></AdminRoute>} />
            <Route path="/patients/:id" element={<AdminRoute><PatientDetailsPage /></AdminRoute>} />
            <Route path="/patients/:id/edit" element={<AdminRoute><PatientEditPage /></AdminRoute>} />

            {/* Doctors */}
            <Route path="/doctors" element={<AdminRoute><DoctorsPage /></AdminRoute>} />
            <Route path="/doctors/add" element={<AdminRoute><AddDoctorPage /></AdminRoute>} />
            <Route path="/doctors/:id" element={<AdminRoute><DoctorDetailsPage /></AdminRoute>} />
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
            <Route path="/admissions/assign" element={<AdminRoute><BedAssignmentPage /></AdminRoute>} />

            {/* Medical Records */}
            <Route path="/records" element={<AdminRoute><RecordsPage /></AdminRoute>} />
            <Route path="/records/diagnosis" element={<AdminRoute><DiagnosisPage /></AdminRoute>} />
            <Route path="/records/treatments" element={<AdminRoute><TreatmentsPage /></AdminRoute>} />

            {/* Prescriptions */}
            <Route path="/prescriptions" element={<AdminRoute><PrescriptionsPage /></AdminRoute>} />
            <Route path="/prescriptions/new" element={<AdminRoute><NewPrescriptionPage /></AdminRoute>} />
            <Route path="/prescriptions/templates" element={<AdminRoute><PrescriptionTemplatesPage /></AdminRoute>} />
            <Route path="/prescriptions/:id" element={<AdminRoute><PrescriptionViewPage /></AdminRoute>} />

            {/* Pharmacy */}
            <Route path="/pharmacy" element={<AdminRoute><PharmacyPage /></AdminRoute>} />
            <Route path="/pharmacy/add" element={<AdminRoute><AddMedicinePage /></AdminRoute>} />
            <Route path="/pharmacy/:id/edit" element={<AdminRoute><MedicineEditPage /></AdminRoute>} />
            <Route path="/pharmacy/dispense" element={<AdminRoute><DispensePage /></AdminRoute>} />
            <Route path="/pharmacy/stock" element={<AdminRoute><StockManagementPage /></AdminRoute>} />

            {/* Laboratory */}
            <Route path="/lab" element={<AdminRoute><LabPage /></AdminRoute>} />
            <Route path="/lab/new" element={<AdminRoute><LabOrderPage /></AdminRoute>} />
            <Route path="/lab/results" element={<AdminRoute><LabResultsPage /></AdminRoute>} />
            <Route path="/lab/:id/entry" element={<AdminRoute><LabResultEntryPage /></AdminRoute>} />
            <Route path="/lab/reports" element={<AdminRoute><LabReportsPage /></AdminRoute>} />

            {/* Diagnostics */}
            <Route path="/diagnostics/imaging" element={<AdminRoute><ImagingPage /></AdminRoute>} />
            <Route path="/diagnostics/radiology" element={<AdminRoute><RadiologyPage /></AdminRoute>} />
            <Route path="/diagnostics/reports" element={<AdminRoute><DiagnosticReportsPage /></AdminRoute>} />

            {/* Vitals */}
            <Route path="/vitals" element={<AdminRoute><VitalsPage /></AdminRoute>} />
            <Route path="/vitals/triage" element={<AdminRoute><TriageAssessmentPage /></AdminRoute>} />

            {/* Departments */}
            <Route path="/departments" element={<AdminRoute><DepartmentsPage /></AdminRoute>} />
            <Route path="/departments/emergency" element={<AdminRoute><EmergencyPage /></AdminRoute>} />
            <Route path="/departments/opd" element={<AdminRoute><OPDPage /></AdminRoute>} />
            <Route path="/departments/ipd" element={<AdminRoute><IPDPage /></AdminRoute>} />

            {/* Billing */}
            <Route path="/billing" element={<AdminRoute><BillingPage /></AdminRoute>} />
            <Route path="/billing/new" element={<AdminRoute><NewInvoicePage /></AdminRoute>} />
            <Route path="/billing/:id" element={<AdminRoute><ViewInvoicePage /></AdminRoute>} />
            <Route path="/billing/payments" element={<AdminRoute><PaymentsPage /></AdminRoute>} />
            <Route path="/billing/insurance" element={<AdminRoute><InsurancePage /></AdminRoute>} />
            <Route path="/billing/insurance/new" element={<AdminRoute><InsuranceClaimPage /></AdminRoute>} />
            <Route path="/billing/receipt/:id" element={<AdminRoute><PaymentReceiptPage /></AdminRoute>} />

            {/* Settings & Support */}
            <Route path="/settings" element={<AdminRoute><SettingsPage /></AdminRoute>} />
            <Route path="/support" element={<AdminRoute><SupportPage /></AdminRoute>} />
            <Route path="/staff" element={<AdminRoute><StaffManagementPage /></AdminRoute>} />
            <Route path="/notice-board" element={<AdminRoute><InternalNoticeBoard /></AdminRoute>} />

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
