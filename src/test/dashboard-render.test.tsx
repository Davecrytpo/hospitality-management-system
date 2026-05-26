import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";
import type { ReactNode } from "react";

import Index from "@/pages/Index";
import DoctorDashboardPage from "@/pages/doctor/DoctorDashboardPage";
import PatientDashboard from "@/pages/patient-portal/PatientDashboard";

vi.mock("@/integrations/supabase/client", () => {
  const subscription = { unsubscribe: vi.fn() };
  const profile = {
    id: "profile-1",
    user_id: "user-1",
    email: "admin@example.com",
    full_name: "Admin User",
    role: "admin",
  };

  const createQuery = (table: string) => {
    const query = {
      select: vi.fn(() => query),
      eq: vi.fn(() => query),
      gte: vi.fn(() => query),
      order: vi.fn(() => query),
      limit: vi.fn(() => Promise.resolve({ data: [], error: null })),
      single: vi.fn(() => Promise.resolve({ data: profile, error: null })),
      then: (resolve: (value: { data: unknown[]; error: null }) => void) => {
        const data = table === "appointments" ? [] : [];
        return Promise.resolve(resolve({ data, error: null }));
      },
    };

    return query;
  };

  return {
    supabase: {
      auth: {
        getSession: vi.fn(() => Promise.resolve({ data: { session: { user: { id: "user-1" } } } })),
        onAuthStateChange: vi.fn(() => ({ data: { subscription } })),
        signOut: vi.fn(() => Promise.resolve({ error: null })),
      },
      from: vi.fn((table: string) => createQuery(table)),
    },
  };
});

vi.mock("@/lib/patient-portal", () => ({
  getPatientPortalContext: vi.fn(() =>
    Promise.resolve({
      profile: { id: "profile-1", email: "patient@example.com", role: "patient" },
      patient: {
        id: "patient-1",
        first_name: "Ada",
        last_name: "Patient",
        email: "patient@example.com",
        blood_type: "O+",
      },
    }),
  ),
}));

describe("dashboard render smoke tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderDashboard = (ui: ReactNode) => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });

    return render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>{ui}</MemoryRouter>
      </QueryClientProvider>,
    );
  };

  it("renders the admin dashboard without crashing", () => {
    renderDashboard(<Index />);

    expect(screen.getByText(/Hospital Command/i)).toBeInTheDocument();
  });

  it("renders the doctor dashboard without crashing", async () => {
    renderDashboard(<DoctorDashboardPage />);

    await waitFor(() => {
      expect(screen.getByText(/Clinical Practitioner Portal/i)).toBeInTheDocument();
    });
  });

  it("renders the patient dashboard without crashing", async () => {
    renderDashboard(<PatientDashboard />);

    await waitFor(() => {
      expect(screen.getByText(/Welcome back, Ada/i)).toBeInTheDocument();
    });
  });
});
