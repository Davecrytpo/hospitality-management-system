# MediCare Enterprise HMS

## Advanced Hospital Management Ecosystem

MediCare Enterprise HMS is a high-performance, institutional-grade Hospital Management System designed for large-scale medical facilities. It provides a seamless, integrated environment for staff, clinicians, and patients, ensuring data-driven precision in every medical interaction.

### 🧬 Core Modules & Dashboards

The system is comprised of **64 integrated pages** across 8 specialized dashboards:

*   **Institutional Command Center (Admin):** Full-scale oversight of hospital throughput, staff management, and financial streams.
*   **Clinical Portal (Doctor):** High-intensity Consultation Room interface with real-time biometric feeds, medical history archives, and E-Prescribing.
*   **Care Management (Nurse):** Visual ward mapping, real-time vital monitoring, and Medication Administration Records (MAR).
*   **Diagnostic Core (Lab & Imaging):** Real-time test ordering and result entry with AI-ready diagnostic interpretation workspaces.
*   **Pharmacy Hub:** Automated dispensing queues, inventory management with expiry tracking, and drug interaction verification.
*   **Revenue & Finance:** Comprehensive billing, insurance claim management, and institutional financial analytics.
*   **Front Office:** High-speed reception desk, kiosk check-in synchronization, and patient feedback systems.  
*   **Patient Portal:** Secure, invitation-only access to personal medical records, active prescriptions, and billing.

### 🛡️ Enterprise Security

*   **Role-Based Access Control (RBAC):** Strict permission layering ensuring data is only accessible to authorized personnel.
*   **Two-Factor Authentication (2FA):** Mandatory security protocols for patient access to sensitive medical data.
*   **Encrypted Data Core:** Powered by Supabase with Row-Level Security (RLS) enabled on all medical tables.   
*   **Invitation-Only Onboarding:** Secure patient registration via 30-minute time-locked verification codes.   

### ⚡ Technology Stack

*   **Frontend:** React 18, TypeScript, Vite
*   **UI/UX:** Tailwind CSS, Shadcn UI, Framer Motion (for medical animations)
*   **Backend & Security:** Supabase (PostgreSQL, Auth, Realtime, Edge Functions)
*   **Communication:** Resend API for institutional email branding.

### 🚀 Deployment & Installation

1.  **Clone & Install:**
    ```sh
    git clone <repository-url>
    cd hospitality-management-system
    npm install
    ```

2.  **Environment Setup:**
    Create a `.env` file with your Supabase credentials:
    ```env
    VITE_SUPABASE_URL=your_url
    VITE_SUPABASE_ANON_KEY=your_key
    ```

3.  **Database Configuration:**
    Execute the provided production setup scripts located in `supabase/setup_production.sql` within your Supabase SQL editor to initialize roles and triggers.

4.  **Launch:**
    ```sh
    npm run dev
    ```

---
*Developed for excellence in modern healthcare delivery.*
