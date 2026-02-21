
-- Expand user_role enum to include all system roles
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type t JOIN pg_enum e ON t.oid = e.enumtypid WHERE t.typname = 'user_role' AND e.enumlabel = 'nurse') THEN
    ALTER TYPE public.user_role ADD VALUE 'nurse';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type t JOIN pg_enum e ON t.oid = e.enumtypid WHERE t.typname = 'user_role' AND e.enumlabel = 'pharmacist') THEN
    ALTER TYPE public.user_role ADD VALUE 'pharmacist';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type t JOIN pg_enum e ON t.oid = e.enumtypid WHERE t.typname = 'user_role' AND e.enumlabel = 'lab_tech') THEN
    ALTER TYPE public.user_role ADD VALUE 'lab_tech';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type t JOIN pg_enum e ON t.oid = e.enumtypid WHERE t.typname = 'user_role' AND e.enumlabel = 'finance') THEN
    ALTER TYPE public.user_role ADD VALUE 'finance';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type t JOIN pg_enum e ON t.oid = e.enumtypid WHERE t.typname = 'user_role' AND e.enumlabel = 'receptionist') THEN
    ALTER TYPE public.user_role ADD VALUE 'receptionist';
  END IF;
END
$$;
