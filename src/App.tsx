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

// Doctor Portal Specific
import DoctorDashboardPage from "./pages/doctor/DoctorDashboardPage";
import ConsultationRoomPage from "./pages/doctor/ConsultationRoomPage";
import MyPatientListPage from "./pages/doctor/MyPatientListPage";
import IPDRoundingPage from "./pages/doctor/IPDRoundingPage";
import SurgerySchedulePage from "./pages/doctor/SurgerySchedulePage";
import ClinicalAnalyticsPage from "./pages/doctor/ClinicalAnalyticsPage";

// Nurse Portal
import NurseStationPage from "./pages/nurse/NurseStationPage";
import WardVitalsMonitorPage from "./pages/nurse/WardVitalsMonitorPage";
import MARPage from "./pages/nurse/MARPage";
import ShiftHandoverPage from "./pages/nurse/ShiftHandoverPage";
import ConsumablesTrackerPage from "./pages/nurse/ConsumablesTrackerPage";
import IncidentReportingPage from "./pages/nurse/IncidentReportingPage";

// Pharmacy Portal
import PharmacistQueuePage from "./pages/pharmacy/PharmacistQueuePage";
import SupplierManagementPage from "./pages/pharmacy/SupplierManagementPage";
import DrugInteractionCheckerPage from "./pages/pharmacy/DrugInteractionCheckerPage";

// Lab Portal
import LabSampleTrackingPage from "./pages/lab/LabSampleTrackingPage";
import LabEquipmentCalibrationPage from "./pages/lab/LabEquipmentCalibrationPage";
import BloodBankPage from "./pages/lab/BloodBankPage";
import DiagnosticImagingWorkspacePage from "./pages/lab/DiagnosticImagingWorkspacePage";

// Front Office & Finance
import ReceptionDeskPage from "./pages/frontoffice/ReceptionDeskPage";
import QueueManagementPage from "./pages/frontoffice/QueueManagementPage";
import FeedbackComplaintsPage from "./pages/frontoffice/FeedbackComplaintsPage";
import RevenueDashboardPage from "./pages/frontoffice/RevenueDashboardPage";
import ExpensesPayrollPage from "./pages/frontoffice/ExpensesPayrollPage";
import TaxCompliancePage from "./pages/frontoffice/TaxCompliancePage";
import VendorPortalPage from "./pages/frontoffice/VendorPortalPage";
import MaintenanceHousekeepingPage from "./pages/frontoffice/MaintenanceHousekeepingPage";

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
import ImagingOrderPage from "./pages/diagnostics/ImagingOrderPage";

// Vitals
import VitalsPage from "./pages/vitals/VitalsPage";
import TriageAssessmentPage from "./pages/vitals/TriageAssessmentPage";

// Departments
import DepartmentsPage from "./pages/departments/DepartmentsPage";
import EmergencyPage from "./pages/departments/EmergencyPage";
import OPDPage from "./pages/departments/OPDPage";
import IPDPage from "./pages/departments/IPDPage";
import AmbulanceTrackingPage from "./pages/departments/AmbulanceTrackingPage";
import ERRealtimeBoardPage from "./pages/departments/ERRealtimeBoardPage";
import MortuaryManagementPage from "./pages/departments/MortuaryManagementPage";
import TelemedicinePage from "./pages/departments/TelemedicinePage";

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
import OnlineBillPaymentPage from "./pages/patient-portal/OnlineBillPaymentPage";

// Auth
import AuthPage from "./pages/auth/AuthPage";

const queryClient = new QueryClient();

// Route Guard Wrappers
const AdminRoute = ({ children }: { children: React.ReactNode }) => (
  <AuthGuard requiredRole="admin">{children}</AuthGuard>
);

const DoctorRoute = ({ children }: { children: React.ReactNode }) => (
  <AuthGuard requiredRole={["admin", "doctor"]}>{children}</AuthGuard>
);

const NurseRoute = ({ children }: { children: React.ReactNode }) => (
  <AuthGuard requiredRole={["admin", "nurse"]}>{children}</AuthGuard>
);

const PharmacyRoute = ({ children }: { children: React.ReactNode }) => (
  <AuthGuard requiredRole={["admin", "pharmacist"]}>{children}</AuthGuard>
);

const LabRoute = ({ children }: { children: React.ReactNode }) => (
  <AuthGuard requiredRole={["admin", "lab_tech"]}>{children}</AuthGuard>
);

const FinanceRoute = ({ children }: { children: React.ReactNode }) => (
  <AuthGuard requiredRole={["admin", "finance"]}>{children}</AuthGuard>
);

const ReceptionRoute = ({ children }: { children: React.ReactNode }) => (
  <AuthGuard requiredRole={["admin", "receptionist"]}>{children}</AuthGuard>
);

const StaffRoute = ({ children }: { children: React.ReactNode }) => (
  <AuthGuard requiredRole={["admin", "doctor", "nurse", "pharmacist", "lab_tech", "finance", "receptionist"]}>{children}</AuthGuard>
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

            {/* General Staff Dashboard */}
            <Route path="/dashboard" element={<StaffRoute><Index /></StaffRoute>} />

            {/* Clinical / Doctor Portal */}
            <Route path="/doctor/dashboard" element={<DoctorRoute><DoctorDashboardPage /></DoctorRoute>} />
            <Route path="/doctor/consultation/:id" element={<DoctorRoute><ConsultationRoomPage /></DoctorRoute>} />
            <Route path="/doctor/patients" element={<DoctorRoute><MyPatientListPage /></DoctorRoute>} />
            <Route path="/doctor/rounds" element={<DoctorRoute><IPDRoundingPage /></DoctorRoute>} />
            <Route path="/doctor/surgeries" element={<DoctorRoute><SurgerySchedulePage /></DoctorRoute>} />
            <Route path="/doctor/analytics" element={<DoctorRoute><ClinicalAnalyticsPage /></DoctorRoute>} />

            {/* Nurse Portal */}
            <Route path="/nurse/station" element={<NurseRoute><NurseStationPage /></NurseRoute>} />
            <Route path="/nurse/vitals" element={<NurseRoute><WardVitalsMonitorPage /></NurseRoute>} />
            <Route path="/nurse/mar" element={<NurseRoute><MARPage /></NurseRoute>} />
            <Route path="/nurse/handover" element={<NurseRoute><ShiftHandoverPage /></NurseRoute>} />
            <Route path="/nurse/inventory" element={<NurseRoute><ConsumablesTrackerPage /></NurseRoute>} />
            <Route path="/nurse/incidents" element={<NurseRoute><IncidentReportingPage /></NurseRoute>} />

            {/* Patients (Admin & Doctor & Nurse) */}
            <Route path="/patients" element={<StaffRoute><PatientsPage /></StaffRoute>} />
            <Route path="/patients/register" element={<StaffRoute><RegisterPatientPage /></StaffRoute>} />
            <Route path="/patients/search" element={<StaffRoute><PatientSearchPage /></StaffRoute>} />
            <Route path="/patients/history" element={<StaffRoute><PatientHistoryPage /></StaffRoute>} />
            <Route path="/patients/:id" element={<StaffRoute><PatientDetailsPage /></StaffRoute>} />
            <Route path="/patients/:id/edit" element={<StaffRoute><PatientEditPage /></StaffRoute>} />

            {/* Staff Management (Admin Only) */}
            <Route path="/doctors" element={<AdminRoute><DoctorsPage /></AdminRoute>} />
            <Route path="/doctors/add" element={<AdminRoute><AddDoctorPage /></AdminRoute>} />
            <Route path="/doctors/:id" element={<AdminRoute><DoctorDetailsPage /></AdminRoute>} />
            <Route path="/doctors/schedules" element={<AdminRoute><DoctorSchedulesPage /></AdminRoute>} />
            <Route path="/doctors/specializations" element={<AdminRoute><SpecializationsPage /></AdminRoute>} />
            <Route path="/staff" element={<AdminRoute><StaffManagementPage /></AdminRoute>} />

            {/* Appointments */}
            <Route path="/appointments" element={<StaffRoute><AppointmentsPage /></StaffRoute>} />
            <Route path="/appointments/new" element={<StaffRoute><NewAppointmentPage /></StaffRoute>} />
            <Route path="/appointments/calendar" element={<StaffRoute><CalendarPage /></StaffRoute>} />

            {/* Admissions */}
            <Route path="/admissions" element={<StaffRoute><AdmissionsPage /></StaffRoute>} />
            <Route path="/admissions/new" element={<StaffRoute><NewAdmissionPage /></StaffRoute>} />
            <Route path="/admissions/discharge" element={<StaffRoute><DischargePage /></StaffRoute>} />
            <Route path="/admissions/beds" element={<StaffRoute><BedManagementPage /></StaffRoute>} />
            <Route path="/admissions/assign" element={<StaffRoute><BedAssignmentPage /></StaffRoute>} />

            {/* Medical Records */}
            <Route path="/records" element={<StaffRoute><RecordsPage /></StaffRoute>} />
            <Route path="/records/diagnosis" element={<StaffRoute><DiagnosisPage /></StaffRoute>} />
            <Route path="/records/treatments" element={<StaffRoute><TreatmentsPage /></StaffRoute>} />

            {/* Prescriptions */}
            <Route path="/prescriptions" element={<StaffRoute><PrescriptionsPage /></StaffRoute>} />
            <Route path="/prescriptions/new" element={<StaffRoute><NewPrescriptionPage /></StaffRoute>} />
            <Route path="/prescriptions/templates" element={<StaffRoute><PrescriptionTemplatesPage /></StaffRoute>} />
            <Route path="/prescriptions/:id" element={<StaffRoute><PrescriptionViewPage /></StaffRoute>} />

            {/* Pharmacy Portal */}
            <Route path="/pharmacy" element={<PharmacyRoute><PharmacyPage /></PharmacyRoute>} />
            <Route path="/pharmacy/queue" element={<PharmacyRoute><PharmacistQueuePage /></PharmacyRoute>} />
            <Route path="/pharmacy/add" element={<PharmacyRoute><AddMedicinePage /></PharmacyRoute>} />
            <Route path="/pharmacy/:id/edit" element={<PharmacyRoute><MedicineEditPage /></PharmacyRoute>} />
            <Route path="/pharmacy/dispense" element={<PharmacyRoute><DispensePage /></PharmacyRoute>} />
            <Route path="/pharmacy/stock" element={<PharmacyRoute><StockManagementPage /></PharmacyRoute>} />
            <Route path="/pharmacy/suppliers" element={<PharmacyRoute><SupplierManagementPage /></PharmacyRoute>} />
            <Route path="/pharmacy/checker" element={<PharmacyRoute><DrugInteractionCheckerPage /></PharmacyRoute>} />

            {/* Laboratory Portal */}
            <Route path="/lab" element={<LabRoute><LabPage /></LabRoute>} />
            <Route path="/lab/new" element={<LabRoute><LabOrderPage /></LabRoute>} />
            <Route path="/lab/results" element={<LabRoute><LabResultsPage /></LabRoute>} />
            <Route path="/lab/:id/entry" element={<LabRoute><LabResultEntryPage /></LabRoute>} />
            <Route path="/lab/reports" element={<LabRoute><LabReportsPage /></LabRoute>} />
            <Route path="/lab/tracking" element={<LabRoute><LabSampleTrackingPage /></LabRoute>} />
            <Route path="/lab/calibration" element={<LabRoute><LabEquipmentCalibrationPage /></LabRoute>} />
            <Route path="/lab/blood-bank" element={<LabRoute><BloodBankPage /></LabRoute>} />
            <Route path="/lab/imaging-workspace" element={<LabRoute><DiagnosticImagingWorkspacePage /></LabRoute>} />

            {/* Diagnostics */}
            <Route path="/diagnostics/imaging" element={<StaffRoute><ImagingPage /></StaffRoute>} />
            <Route path="/diagnostics/imaging/new" element={<StaffRoute><ImagingOrderPage /></StaffRoute>} />
            <Route path="/diagnostics/radiology" element={<StaffRoute><RadiologyPage /></StaffRoute>} />
            <Route path="/diagnostics/reports" element={<StaffRoute><DiagnosticReportsPage /></StaffRoute>} />

            {/* Vitals */}
            <Route path="/vitals" element={<StaffRoute><VitalsPage /></StaffRoute>} />
            <Route path="/vitals/triage" element={<StaffRoute><TriageAssessmentPage /></StaffRoute>} />

            {/* Front Office & Finance Portal */}
            <Route path="/reception" element={<ReceptionRoute><ReceptionDeskPage /></ReceptionRoute>} />
            <Route path="/reception/queue" element={<ReceptionRoute><QueueManagementPage /></ReceptionRoute>} />
            <Route path="/reception/feedback" element={<ReceptionRoute><FeedbackComplaintsPage /></ReceptionRoute>} />
            <Route path="/finance/revenue" element={<FinanceRoute><RevenueDashboardPage /></FinanceRoute>} />
            <Route path="/finance/payroll" element={<FinanceRoute><ExpensesPayrollPage /></FinanceRoute>} />
            <Route path="/finance/tax" element={<FinanceRoute><TaxCompliancePage /></FinanceRoute>} />
            <Route path="/finance/vendors" element={<FinanceRoute><VendorPortalPage /></FinanceRoute>} />
            <Route path="/maintenance" element={<StaffRoute><MaintenanceHousekeepingPage /></StaffRoute>} />

            {/* Departments & Operations */}
            <Route path="/departments" element={<StaffRoute><DepartmentsPage /></StaffRoute>} />
            <Route path="/departments/emergency" element={<StaffRoute><EmergencyPage /></StaffRoute>} />
            <Route path="/departments/opd" element={<StaffRoute><OPDPage /></StaffRoute>} />
            <Route path="/departments/ipd" element={<StaffRoute><IPDPage /></StaffRoute>} />
            <Route path="/departments/ambulance" element={<StaffRoute><AmbulanceTrackingPage /></StaffRoute>} />
            <Route path="/departments/er-board" element={<StaffRoute><ERRealtimeBoardPage /></StaffRoute>} />
            <Route path="/departments/mortuary" element={<StaffRoute><MortuaryManagementPage /></StaffRoute>} />
            <Route path="/departments/telemedicine" element={<StaffRoute><TelemedicinePage /></StaffRoute>} />

            {/* Billing */}
            <Route path="/billing" element={<FinanceRoute><BillingPage /></FinanceRoute>} />
            <Route path="/billing/new" element={<FinanceRoute><NewInvoicePage /></FinanceRoute>} />
            <Route path="/billing/:id" element={<FinanceRoute><ViewInvoicePage /></FinanceRoute>} />
            <Route path="/billing/payments" element={<FinanceRoute><PaymentsPage /></FinanceRoute>} />
            <Route path="/billing/insurance" element={<FinanceRoute><InsurancePage /></FinanceRoute>} />
            <Route path="/billing/insurance/new" element={<FinanceRoute><InsuranceClaimPage /></FinanceRoute>} />
            <Route path="/billing/receipt/:id" element={<FinanceRoute><PaymentReceiptPage /></FinanceRoute>} />

            {/* Settings & Support */}
            <Route path="/settings" element={<StaffRoute><SettingsPage /></StaffRoute>} />
            <Route path="/support" element={<StaffRoute><SupportPage /></StaffRoute>} />
            <Route path="/notice-board" element={<StaffRoute><InternalNoticeBoard /></StaffRoute>} />

            {/* Patient Portal (protected) */}
            <Route path="/patient-portal" element={<PatientRoute><PatientDashboard /></PatientRoute>} />
            <Route path="/patient-portal/appointments" element={<PatientRoute><PatientAppointmentsPage /></PatientRoute>} />
            <Route path="/patient-portal/prescriptions" element={<PatientRoute><PatientPrescriptionsPage /></PatientRoute>} />
            <Route path="/patient-portal/records" element={<PatientRoute><PatientRecordsPage /></PatientRoute>} />
            <Route path="/patient-portal/profile" element={<PatientRoute><PatientProfilePage /></PatientRoute>} />
            <Route path="/patient-portal/billing" element={<PatientRoute><OnlineBillPaymentPage /></PatientRoute>} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
