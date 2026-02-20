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
import Index from "./pages/Index";

// Auth
import AuthPage from "./pages/auth/AuthPage";

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
import PharmacistQueuePage from "./pages/pharmacy/PharmacistQueuePage";
import DrugInteractionCheckerPage from "./pages/pharmacy/DrugInteractionCheckerPage";
import SupplierManagementPage from "./pages/pharmacy/SupplierManagementPage";

// Laboratory
import LabPage from "./pages/lab/LabPage";
import LabResultsPage from "./pages/lab/LabResultsPage";
import LabReportsPage from "./pages/lab/LabReportsPage";
import LabOrderPage from "./pages/lab/LabOrderPage";
import LabResultEntryPage from "./pages/lab/LabResultEntryPage";
import LabSampleTrackingPage from "./pages/lab/LabSampleTrackingPage";
import LabEquipmentCalibrationPage from "./pages/lab/LabEquipmentCalibrationPage";
import BloodBankPage from "./pages/lab/BloodBankPage";
import DiagnosticImagingWorkspacePage from "./pages/lab/DiagnosticImagingWorkspacePage";

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
import ERRealtimeBoardPage from "./pages/departments/ERRealtimeBoardPage";
import AmbulanceTrackingPage from "./pages/departments/AmbulanceTrackingPage";
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

// Doctor Portal
import DoctorDashboardPage from "./pages/doctor/DoctorDashboardPage";
import MyPatientListPage from "./pages/doctor/MyPatientListPage";
import ConsultationRoomPage from "./pages/doctor/ConsultationRoomPage";
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

// Front Office
import ReceptionDeskPage from "./pages/frontoffice/ReceptionDeskPage";
import QueueManagementPage from "./pages/frontoffice/QueueManagementPage";
import FeedbackComplaintsPage from "./pages/frontoffice/FeedbackComplaintsPage";
import RevenueDashboardPage from "./pages/frontoffice/RevenueDashboardPage";
import ExpensesPayrollPage from "./pages/frontoffice/ExpensesPayrollPage";
import TaxCompliancePage from "./pages/frontoffice/TaxCompliancePage";
import VendorPortalPage from "./pages/frontoffice/VendorPortalPage";
import MaintenanceHousekeepingPage from "./pages/frontoffice/MaintenanceHousekeepingPage";

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

            {/* Admin Core */}
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
            <Route path="/pharmacy/queue" element={<AdminRoute><PharmacistQueuePage /></AdminRoute>} />
            <Route path="/pharmacy/interactions" element={<AdminRoute><DrugInteractionCheckerPage /></AdminRoute>} />
            <Route path="/pharmacy/suppliers" element={<AdminRoute><SupplierManagementPage /></AdminRoute>} />

            {/* Laboratory */}
            <Route path="/lab" element={<AdminRoute><LabPage /></AdminRoute>} />
            <Route path="/lab/new" element={<AdminRoute><LabOrderPage /></AdminRoute>} />
            <Route path="/lab/results" element={<AdminRoute><LabResultsPage /></AdminRoute>} />
            <Route path="/lab/:id/entry" element={<AdminRoute><LabResultEntryPage /></AdminRoute>} />
            <Route path="/lab/reports" element={<AdminRoute><LabReportsPage /></AdminRoute>} />
            <Route path="/lab/samples" element={<AdminRoute><LabSampleTrackingPage /></AdminRoute>} />
            <Route path="/lab/calibration" element={<AdminRoute><LabEquipmentCalibrationPage /></AdminRoute>} />
            <Route path="/lab/blood-bank" element={<AdminRoute><BloodBankPage /></AdminRoute>} />
            <Route path="/lab/imaging-workspace" element={<AdminRoute><DiagnosticImagingWorkspacePage /></AdminRoute>} />

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
            <Route path="/departments/er-board" element={<AdminRoute><ERRealtimeBoardPage /></AdminRoute>} />
            <Route path="/departments/ambulance" element={<AdminRoute><AmbulanceTrackingPage /></AdminRoute>} />
            <Route path="/departments/mortuary" element={<AdminRoute><MortuaryManagementPage /></AdminRoute>} />
            <Route path="/departments/telemedicine" element={<AdminRoute><TelemedicinePage /></AdminRoute>} />

            {/* Billing */}
            <Route path="/billing" element={<AdminRoute><BillingPage /></AdminRoute>} />
            <Route path="/billing/new" element={<AdminRoute><NewInvoicePage /></AdminRoute>} />
            <Route path="/billing/:id" element={<AdminRoute><ViewInvoicePage /></AdminRoute>} />
            <Route path="/billing/payments" element={<AdminRoute><PaymentsPage /></AdminRoute>} />
            <Route path="/billing/insurance" element={<AdminRoute><InsurancePage /></AdminRoute>} />
            <Route path="/billing/insurance/new" element={<AdminRoute><InsuranceClaimPage /></AdminRoute>} />
            <Route path="/billing/receipt/:id" element={<AdminRoute><PaymentReceiptPage /></AdminRoute>} />

            {/* Doctor Portal */}
            <Route path="/doctor/dashboard" element={<AdminRoute><DoctorDashboardPage /></AdminRoute>} />
            <Route path="/doctor/my-patients" element={<AdminRoute><MyPatientListPage /></AdminRoute>} />
            <Route path="/doctor/consultation" element={<AdminRoute><ConsultationRoomPage /></AdminRoute>} />
            <Route path="/doctor/ipd-rounding" element={<AdminRoute><IPDRoundingPage /></AdminRoute>} />
            <Route path="/doctor/surgery" element={<AdminRoute><SurgerySchedulePage /></AdminRoute>} />
            <Route path="/doctor/analytics" element={<AdminRoute><ClinicalAnalyticsPage /></AdminRoute>} />

            {/* Nurse Portal */}
            <Route path="/nurse/station" element={<AdminRoute><NurseStationPage /></AdminRoute>} />
            <Route path="/nurse/vitals-monitor" element={<AdminRoute><WardVitalsMonitorPage /></AdminRoute>} />
            <Route path="/nurse/mar" element={<AdminRoute><MARPage /></AdminRoute>} />
            <Route path="/nurse/handover" element={<AdminRoute><ShiftHandoverPage /></AdminRoute>} />
            <Route path="/nurse/consumables" element={<AdminRoute><ConsumablesTrackerPage /></AdminRoute>} />
            <Route path="/nurse/incidents" element={<AdminRoute><IncidentReportingPage /></AdminRoute>} />

            {/* Front Office */}
            <Route path="/reception" element={<AdminRoute><ReceptionDeskPage /></AdminRoute>} />
            <Route path="/queue" element={<AdminRoute><QueueManagementPage /></AdminRoute>} />
            <Route path="/feedback" element={<AdminRoute><FeedbackComplaintsPage /></AdminRoute>} />
            <Route path="/finance/revenue" element={<AdminRoute><RevenueDashboardPage /></AdminRoute>} />
            <Route path="/finance/expenses" element={<AdminRoute><ExpensesPayrollPage /></AdminRoute>} />
            <Route path="/finance/compliance" element={<AdminRoute><TaxCompliancePage /></AdminRoute>} />
            <Route path="/finance/vendors" element={<AdminRoute><VendorPortalPage /></AdminRoute>} />
            <Route path="/maintenance" element={<AdminRoute><MaintenanceHousekeepingPage /></AdminRoute>} />

            {/* Settings & Support */}
            <Route path="/settings" element={<AdminRoute><SettingsPage /></AdminRoute>} />
            <Route path="/support" element={<AdminRoute><SupportPage /></AdminRoute>} />
            <Route path="/staff" element={<AdminRoute><StaffManagementPage /></AdminRoute>} />
            <Route path="/notice-board" element={<AdminRoute><InternalNoticeBoard /></AdminRoute>} />

            {/* Patient Portal */}
            <Route path="/patient-portal" element={<PatientRoute><PatientDashboard /></PatientRoute>} />
            <Route path="/patient-portal/appointments" element={<PatientRoute><PatientAppointmentsPage /></PatientRoute>} />
            <Route path="/patient-portal/prescriptions" element={<PatientRoute><PatientPrescriptionsPage /></PatientRoute>} />
            <Route path="/patient-portal/records" element={<PatientRoute><PatientRecordsPage /></PatientRoute>} />
            <Route path="/patient-portal/profile" element={<PatientRoute><PatientProfilePage /></PatientRoute>} />
            <Route path="/patient-portal/pay" element={<PatientRoute><OnlineBillPaymentPage /></PatientRoute>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
