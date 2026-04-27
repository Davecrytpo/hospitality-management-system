# On Time Medical Group HMS

## Advanced Hospital Management Ecosystem

On Time Medical Group HMS is a hospital management platform designed for operational teams, clinicians, and patients. It brings staff workflows, patient access, diagnostics, billing, and care coordination into one integrated system.

### Core Modules

The product includes public, staff, and patient-facing experiences across the hospital:

- Admin command center for operational oversight and staff workflows
- Doctor portal for consultations, prescriptions, and patient review
- Nurse tooling for wards, medication administration, and handover
- Lab and diagnostics workspaces for tests, imaging, and reporting
- Pharmacy operations for dispensing, stock, and interaction review
- Billing and finance for invoices, payments, and insurance workflows
- Front office tools for reception, kiosk check-in, and queue management
- Patient portal for secure access to records, prescriptions, appointments, and billing

### Security

- Role-based access control for staff and patient routes
- Two-factor verification for patient portal access
- Supabase-backed authentication and protected data access
- Invitation-based patient onboarding

### Technology

- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Framer Motion
- Supabase

### Local Setup

1. Clone the repository and install dependencies.
   ```sh
   git clone <repository-url>
   cd hospitality-management-system
   npm install
   ```

2. Create a `.env` file with your Supabase credentials.
   ```env
   VITE_SUPABASE_URL=your_url
   VITE_SUPABASE_ANON_KEY=your_key
   ```

3. Run the provided SQL setup in `supabase/setup_production.sql` if you need the full backend structure.

4. Start the app.
   ```sh
   npm run dev
   ```
