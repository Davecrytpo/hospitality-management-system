import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { AuthGuard } from "../components/auth/AuthGuard";
import { supabase } from "../integrations/supabase/client";
import { BrowserRouter } from "react-router-dom";

// Mock Supabase
vi.mock("../integrations/supabase/client", () => ({
  supabase: {
    auth: {
      getSession: vi.fn(),
      onAuthStateChange: vi.fn(() => ({
        data: { subscription: { unsubscribe: vi.fn() } },
      })),
    },
    from: vi.fn(),
  },
}));

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("RBAC - AuthGuard Integration Test", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should allow an Admin to access any page", async () => {
    // 1. Mock Session
    (supabase.auth.getSession as any).mockResolvedValue({
      data: { session: { user: { id: "admin-id" } } },
    });

    // 2. Mock Admin Profile
    (supabase.from as any).mockReturnValue({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({
        data: { role: "admin" },
        error: null,
      }),
    });

    render(
      <BrowserRouter>
        <AuthGuard requiredRole="pharmacist">
          <div data-testid="protected-content">Secret Pharmacy Content</div>
        </AuthGuard>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId("protected-content")).toBeInTheDocument();
    });
  });

  it("should block a Doctor from accessing Pharmacy pages", async () => {
    // 1. Mock Session
    (supabase.auth.getSession as any).mockResolvedValue({
      data: { session: { user: { id: "doctor-id" } } },
    });

    // 2. Mock Doctor Profile
    (supabase.from as any).mockReturnValue({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({
        data: { role: "doctor" },
        error: null,
      }),
    });

    render(
      <BrowserRouter>
        <AuthGuard requiredRole="pharmacist">
          <div data-testid="protected-content">Secret Pharmacy Content</div>
        </AuthGuard>
      </BrowserRouter>
    );

    await waitFor(() => {
      // Should redirect to dashboard because doctor != pharmacist
      expect(mockNavigate).toHaveBeenCalledWith("/dashboard", { replace: true });
    });
  });

  it("should allow a Pharmacist to access Pharmacy pages", async () => {
    (supabase.auth.getSession as any).mockResolvedValue({
      data: { session: { user: { id: "pharmacist-id" } } },
    });

    (supabase.from as any).mockReturnValue({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({
        data: { role: "pharmacist" },
        error: null,
      }),
    });

    render(
      <BrowserRouter>
        <AuthGuard requiredRole="pharmacist">
          <div data-testid="protected-content">Pharmacy Dashboard</div>
        </AuthGuard>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId("protected-content")).toBeInTheDocument();
    });
  });
});
