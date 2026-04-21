export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      admissions: {
        Row: {
          admission_date: string | null
          admitted_by: string | null
          bed_number: string | null
          created_at: string | null
          diagnosis: string | null
          discharge_date: string | null
          doctor_id: string | null
          id: string
          notes: string | null
          patient_id: string
          status: string | null
          updated_at: string | null
          ward: string | null
        }
        Insert: {
          admission_date?: string | null
          admitted_by?: string | null
          bed_number?: string | null
          created_at?: string | null
          diagnosis?: string | null
          discharge_date?: string | null
          doctor_id?: string | null
          id?: string
          notes?: string | null
          patient_id: string
          status?: string | null
          updated_at?: string | null
          ward?: string | null
        }
        Update: {
          admission_date?: string | null
          admitted_by?: string | null
          bed_number?: string | null
          created_at?: string | null
          diagnosis?: string | null
          discharge_date?: string | null
          doctor_id?: string | null
          id?: string
          notes?: string | null
          patient_id?: string
          status?: string | null
          updated_at?: string | null
          ward?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "admissions_admitted_by_fkey"
            columns: ["admitted_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "admissions_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "admissions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      appointments: {
        Row: {
          appointment_date: string
          appointment_time: string
          created_at: string
          doctor_id: string
          duration_minutes: number | null
          id: string
          notes: string | null
          patient_id: string
          reason: string | null
          reminder_email: boolean | null
          reminder_push: boolean | null
          reminder_sms: boolean | null
          status: string | null
          updated_at: string
        }
        Insert: {
          appointment_date: string
          appointment_time: string
          created_at?: string
          doctor_id: string
          duration_minutes?: number | null
          id?: string
          notes?: string | null
          patient_id: string
          reason?: string | null
          reminder_email?: boolean | null
          reminder_push?: boolean | null
          reminder_sms?: boolean | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          appointment_date?: string
          appointment_time?: string
          created_at?: string
          doctor_id?: string
          duration_minutes?: number | null
          id?: string
          notes?: string | null
          patient_id?: string
          reason?: string | null
          reminder_email?: boolean | null
          reminder_push?: boolean | null
          reminder_sms?: boolean | null
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      blood_bank: {
        Row: {
          blood_type: string
          collection_date: string | null
          created_at: string | null
          donor_id: string | null
          donor_name: string | null
          expiry_date: string | null
          id: string
          notes: string | null
          status: string | null
          units_available: number | null
          units_reserved: number | null
          updated_at: string | null
        }
        Insert: {
          blood_type: string
          collection_date?: string | null
          created_at?: string | null
          donor_id?: string | null
          donor_name?: string | null
          expiry_date?: string | null
          id?: string
          notes?: string | null
          status?: string | null
          units_available?: number | null
          units_reserved?: number | null
          updated_at?: string | null
        }
        Update: {
          blood_type?: string
          collection_date?: string | null
          created_at?: string | null
          donor_id?: string | null
          donor_name?: string | null
          expiry_date?: string | null
          id?: string
          notes?: string | null
          status?: string | null
          units_available?: number | null
          units_reserved?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      consultation_notes: {
        Row: {
          appointment_id: string | null
          assessment: string | null
          chief_complaint: string | null
          created_at: string | null
          doctor_id: string
          follow_up_date: string | null
          history_of_illness: string | null
          id: string
          is_confidential: boolean | null
          patient_id: string
          physical_examination: string | null
          plan: string | null
          updated_at: string | null
        }
        Insert: {
          appointment_id?: string | null
          assessment?: string | null
          chief_complaint?: string | null
          created_at?: string | null
          doctor_id: string
          follow_up_date?: string | null
          history_of_illness?: string | null
          id?: string
          is_confidential?: boolean | null
          patient_id: string
          physical_examination?: string | null
          plan?: string | null
          updated_at?: string | null
        }
        Update: {
          appointment_id?: string | null
          assessment?: string | null
          chief_complaint?: string | null
          created_at?: string | null
          doctor_id?: string
          follow_up_date?: string | null
          history_of_illness?: string | null
          id?: string
          is_confidential?: boolean | null
          patient_id?: string
          physical_examination?: string | null
          plan?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "consultation_notes_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consultation_notes_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consultation_notes_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      diagnoses: {
        Row: {
          created_at: string | null
          description: string | null
          diagnosed_date: string | null
          diagnosis_code: string | null
          diagnosis_name: string
          doctor_id: string | null
          id: string
          notes: string | null
          patient_id: string
          resolved_date: string | null
          severity: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          diagnosed_date?: string | null
          diagnosis_code?: string | null
          diagnosis_name: string
          doctor_id?: string | null
          id?: string
          notes?: string | null
          patient_id: string
          resolved_date?: string | null
          severity?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          diagnosed_date?: string | null
          diagnosis_code?: string | null
          diagnosis_name?: string
          doctor_id?: string | null
          id?: string
          notes?: string | null
          patient_id?: string
          resolved_date?: string | null
          severity?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "diagnoses_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "diagnoses_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      doctors: {
        Row: {
          consultation_fee: number | null
          created_at: string
          department: string | null
          email: string | null
          first_name: string
          id: string
          is_available: boolean | null
          last_name: string
          license_number: string | null
          phone: string | null
          profile_id: string | null
          specialization: string
          updated_at: string
        }
        Insert: {
          consultation_fee?: number | null
          created_at?: string
          department?: string | null
          email?: string | null
          first_name: string
          id?: string
          is_available?: boolean | null
          last_name: string
          license_number?: string | null
          phone?: string | null
          profile_id?: string | null
          specialization: string
          updated_at?: string
        }
        Update: {
          consultation_fee?: number | null
          created_at?: string
          department?: string | null
          email?: string | null
          first_name?: string
          id?: string
          is_available?: boolean | null
          last_name?: string
          license_number?: string | null
          phone?: string | null
          profile_id?: string | null
          specialization?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "doctors_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      feedback: {
        Row: {
          created_at: string | null
          feedback_type: string | null
          id: string
          message: string
          patient_id: string | null
          patient_name: string | null
          rating: number | null
          responded_by: string | null
          response: string | null
          status: string | null
          subject: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          feedback_type?: string | null
          id?: string
          message: string
          patient_id?: string | null
          patient_name?: string | null
          rating?: number | null
          responded_by?: string | null
          response?: string | null
          status?: string | null
          subject: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          feedback_type?: string | null
          id?: string
          message?: string
          patient_id?: string | null
          patient_name?: string | null
          rating?: number | null
          responded_by?: string | null
          response?: string | null
          status?: string | null
          subject?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "feedback_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "feedback_responded_by_fkey"
            columns: ["responded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      imaging_orders: {
        Row: {
          body_area: string | null
          clinical_indication: string | null
          completed_at: string | null
          created_at: string | null
          doctor_id: string | null
          id: string
          image_url: string | null
          imaging_type: string
          patient_id: string
          priority: string | null
          radiologist_report: string | null
          scheduled_at: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          body_area?: string | null
          clinical_indication?: string | null
          completed_at?: string | null
          created_at?: string | null
          doctor_id?: string | null
          id?: string
          image_url?: string | null
          imaging_type: string
          patient_id: string
          priority?: string | null
          radiologist_report?: string | null
          scheduled_at?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          body_area?: string | null
          clinical_indication?: string | null
          completed_at?: string | null
          created_at?: string | null
          doctor_id?: string | null
          id?: string
          image_url?: string | null
          imaging_type?: string
          patient_id?: string
          priority?: string | null
          radiologist_report?: string | null
          scheduled_at?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "imaging_orders_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "imaging_orders_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      incident_reports: {
        Row: {
          action_taken: string | null
          created_at: string | null
          description: string
          id: string
          incident_date: string | null
          incident_type: string
          location: string | null
          patient_id: string | null
          reported_by: string | null
          severity: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          action_taken?: string | null
          created_at?: string | null
          description: string
          id?: string
          incident_date?: string | null
          incident_type: string
          location?: string | null
          patient_id?: string | null
          reported_by?: string | null
          severity?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          action_taken?: string | null
          created_at?: string | null
          description?: string
          id?: string
          incident_date?: string | null
          incident_type?: string
          location?: string | null
          patient_id?: string | null
          reported_by?: string | null
          severity?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "incident_reports_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "incident_reports_reported_by_fkey"
            columns: ["reported_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      insurance_claims: {
        Row: {
          approved_amount: number | null
          claim_amount: number
          claim_date: string | null
          created_at: string | null
          diagnosis_code: string | null
          id: string
          notes: string | null
          patient_id: string
          policy_number: string | null
          provider_name: string
          status: string | null
          submitted_by: string | null
          updated_at: string | null
        }
        Insert: {
          approved_amount?: number | null
          claim_amount?: number
          claim_date?: string | null
          created_at?: string | null
          diagnosis_code?: string | null
          id?: string
          notes?: string | null
          patient_id: string
          policy_number?: string | null
          provider_name: string
          status?: string | null
          submitted_by?: string | null
          updated_at?: string | null
        }
        Update: {
          approved_amount?: number | null
          claim_amount?: number
          claim_date?: string | null
          created_at?: string | null
          diagnosis_code?: string | null
          id?: string
          notes?: string | null
          patient_id?: string
          policy_number?: string | null
          provider_name?: string
          status?: string | null
          submitted_by?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "insurance_claims_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "insurance_claims_submitted_by_fkey"
            columns: ["submitted_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      invoice_items: {
        Row: {
          created_at: string | null
          description: string
          id: string
          invoice_id: string
          quantity: number | null
          total_price: number
          unit_price: number
        }
        Insert: {
          created_at?: string | null
          description: string
          id?: string
          invoice_id: string
          quantity?: number | null
          total_price?: number
          unit_price?: number
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: string
          invoice_id?: string
          quantity?: number | null
          total_price?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "invoice_items_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          created_at: string | null
          created_by: string | null
          due_date: string | null
          id: string
          invoice_number: string
          issue_date: string | null
          notes: string | null
          paid_amount: number | null
          patient_id: string
          status: string | null
          subtotal: number
          tax_amount: number | null
          total_amount: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          due_date?: string | null
          id?: string
          invoice_number?: string
          issue_date?: string | null
          notes?: string | null
          paid_amount?: number | null
          patient_id: string
          status?: string | null
          subtotal?: number
          tax_amount?: number | null
          total_amount?: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          due_date?: string | null
          id?: string
          invoice_number?: string
          issue_date?: string | null
          notes?: string | null
          paid_amount?: number | null
          patient_id?: string
          status?: string | null
          subtotal?: number
          tax_amount?: number | null
          total_amount?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invoices_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      lab_tests: {
        Row: {
          created_at: string | null
          doctor_id: string | null
          id: string
          notes: string | null
          patient_id: string
          priority: string | null
          reference_range: string | null
          result_unit: string | null
          result_value: string | null
          sample_collected_at: string | null
          status: string | null
          technician_notes: string | null
          test_name: string
          test_type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          doctor_id?: string | null
          id?: string
          notes?: string | null
          patient_id: string
          priority?: string | null
          reference_range?: string | null
          result_unit?: string | null
          result_value?: string | null
          sample_collected_at?: string | null
          status?: string | null
          technician_notes?: string | null
          test_name: string
          test_type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          doctor_id?: string | null
          id?: string
          notes?: string | null
          patient_id?: string
          priority?: string | null
          reference_range?: string | null
          result_unit?: string | null
          result_value?: string | null
          sample_collected_at?: string | null
          status?: string | null
          technician_notes?: string | null
          test_name?: string
          test_type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lab_tests_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lab_tests_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      medical_records: {
        Row: {
          created_at: string
          description: string | null
          diagnosis: string | null
          doctor_id: string | null
          file_url: string | null
          id: string
          is_confidential: boolean | null
          patient_id: string
          record_date: string
          record_type: string
          title: string
          treatment: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          diagnosis?: string | null
          doctor_id?: string | null
          file_url?: string | null
          id?: string
          is_confidential?: boolean | null
          patient_id: string
          record_date?: string
          record_type: string
          title: string
          treatment?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          diagnosis?: string | null
          doctor_id?: string | null
          file_url?: string | null
          id?: string
          is_confidential?: boolean | null
          patient_id?: string
          record_date?: string
          record_type?: string
          title?: string
          treatment?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "medical_records_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "medical_records_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      patient_2fa_codes: {
        Row: {
          attempts: number
          code_hash: string
          created_at: string
          delivery_method: string
          expires_at: string
          id: string
          user_id: string
          verified_at: string | null
        }
        Insert: {
          attempts?: number
          code_hash: string
          created_at?: string
          delivery_method: string
          expires_at: string
          id?: string
          user_id: string
          verified_at?: string | null
        }
        Update: {
          attempts?: number
          code_hash?: string
          created_at?: string
          delivery_method?: string
          expires_at?: string
          id?: string
          user_id?: string
          verified_at?: string | null
        }
        Relationships: []
      }
      patient_invitations: {
        Row: {
          created_at: string
          created_by: string
          delivery_method: string
          expires_at: string
          id: string
          patient_email: string | null
          patient_id: string | null
          patient_phone: string | null
          used_at: string | null
          verification_code: string
        }
        Insert: {
          created_at?: string
          created_by: string
          delivery_method: string
          expires_at: string
          id?: string
          patient_email?: string | null
          patient_id?: string | null
          patient_phone?: string | null
          used_at?: string | null
          verification_code: string
        }
        Update: {
          created_at?: string
          created_by?: string
          delivery_method?: string
          expires_at?: string
          id?: string
          patient_email?: string | null
          patient_id?: string | null
          patient_phone?: string | null
          used_at?: string | null
          verification_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "patient_invitations_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patient_invitations_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      patients: {
        Row: {
          address: string | null
          allergies: string | null
          blood_type: string | null
          created_at: string
          date_of_birth: string
          email: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          emergency_contact_relationship: string | null
          existing_conditions: string | null
          first_name: string
          gender: string | null
          id: string
          insurance_number: string | null
          insurance_provider: string | null
          last_name: string
          phone: string | null
          profile_id: string | null
          registration_completed: boolean | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          allergies?: string | null
          blood_type?: string | null
          created_at?: string
          date_of_birth: string
          email?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          emergency_contact_relationship?: string | null
          existing_conditions?: string | null
          first_name: string
          gender?: string | null
          id?: string
          insurance_number?: string | null
          insurance_provider?: string | null
          last_name: string
          phone?: string | null
          profile_id?: string | null
          registration_completed?: boolean | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          allergies?: string | null
          blood_type?: string | null
          created_at?: string
          date_of_birth?: string
          email?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          emergency_contact_relationship?: string | null
          existing_conditions?: string | null
          first_name?: string
          gender?: string | null
          id?: string
          insurance_number?: string | null
          insurance_provider?: string | null
          last_name?: string
          phone?: string | null
          profile_id?: string | null
          registration_completed?: boolean | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "patients_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          invoice_id: string | null
          notes: string | null
          patient_id: string
          payment_date: string | null
          payment_method: string | null
          received_by: string | null
          reference_number: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          invoice_id?: string | null
          notes?: string | null
          patient_id: string
          payment_date?: string | null
          payment_method?: string | null
          received_by?: string | null
          reference_number?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          invoice_id?: string | null
          notes?: string | null
          patient_id?: string
          payment_date?: string | null
          payment_method?: string | null
          received_by?: string | null
          reference_number?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_received_by_fkey"
            columns: ["received_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      pharmacy_dispenses: {
        Row: {
          batch_number: string | null
          created_at: string | null
          dispensed_by: string | null
          expiry_date: string | null
          id: string
          medication_name: string
          notes: string | null
          patient_id: string
          prescription_id: string | null
          quantity_dispensed: number
          status: string | null
          unit: string | null
          updated_at: string | null
        }
        Insert: {
          batch_number?: string | null
          created_at?: string | null
          dispensed_by?: string | null
          expiry_date?: string | null
          id?: string
          medication_name: string
          notes?: string | null
          patient_id: string
          prescription_id?: string | null
          quantity_dispensed?: number
          status?: string | null
          unit?: string | null
          updated_at?: string | null
        }
        Update: {
          batch_number?: string | null
          created_at?: string | null
          dispensed_by?: string | null
          expiry_date?: string | null
          id?: string
          medication_name?: string
          notes?: string | null
          patient_id?: string
          prescription_id?: string | null
          quantity_dispensed?: number
          status?: string | null
          unit?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pharmacy_dispenses_dispensed_by_fkey"
            columns: ["dispensed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pharmacy_dispenses_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pharmacy_dispenses_prescription_id_fkey"
            columns: ["prescription_id"]
            isOneToOne: false
            referencedRelation: "prescriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      pharmacy_inventory: {
        Row: {
          batch_number: string | null
          category: string | null
          created_at: string | null
          dosage_form: string | null
          expiry_date: string | null
          generic_name: string | null
          id: string
          minimum_stock: number | null
          name: string
          reorder_level: number | null
          status: string | null
          stock_quantity: number | null
          storage_location: string | null
          strength: string | null
          supplier: string | null
          unit_price: number | null
          updated_at: string | null
        }
        Insert: {
          batch_number?: string | null
          category?: string | null
          created_at?: string | null
          dosage_form?: string | null
          expiry_date?: string | null
          generic_name?: string | null
          id?: string
          minimum_stock?: number | null
          name: string
          reorder_level?: number | null
          status?: string | null
          stock_quantity?: number | null
          storage_location?: string | null
          strength?: string | null
          supplier?: string | null
          unit_price?: number | null
          updated_at?: string | null
        }
        Update: {
          batch_number?: string | null
          category?: string | null
          created_at?: string | null
          dosage_form?: string | null
          expiry_date?: string | null
          generic_name?: string | null
          id?: string
          minimum_stock?: number | null
          name?: string
          reorder_level?: number | null
          status?: string | null
          stock_quantity?: number | null
          storage_location?: string | null
          strength?: string | null
          supplier?: string | null
          unit_price?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      prescriptions: {
        Row: {
          appointment_id: string | null
          created_at: string
          doctor_id: string
          dosage: string
          duration: string | null
          end_date: string | null
          frequency: string
          id: string
          instructions: string | null
          medication_name: string
          patient_id: string
          refills_remaining: number | null
          start_date: string
          status: string | null
          updated_at: string
        }
        Insert: {
          appointment_id?: string | null
          created_at?: string
          doctor_id: string
          dosage: string
          duration?: string | null
          end_date?: string | null
          frequency: string
          id?: string
          instructions?: string | null
          medication_name: string
          patient_id: string
          refills_remaining?: number | null
          start_date: string
          status?: string | null
          updated_at?: string
        }
        Update: {
          appointment_id?: string | null
          created_at?: string
          doctor_id?: string
          dosage?: string
          duration?: string | null
          end_date?: string | null
          frequency?: string
          id?: string
          instructions?: string | null
          medication_name?: string
          patient_id?: string
          refills_remaining?: number | null
          start_date?: string
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "prescriptions_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prescriptions_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prescriptions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          full_name: string | null
          id: string
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email: string
          full_name?: string | null
          id?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      vitals: {
        Row: {
          blood_glucose: number | null
          blood_pressure_diastolic: number | null
          blood_pressure_systolic: number | null
          bmi: number | null
          created_at: string | null
          heart_rate: number | null
          height: number | null
          id: string
          notes: string | null
          oxygen_saturation: number | null
          patient_id: string
          recorded_at: string | null
          recorded_by: string | null
          respiratory_rate: number | null
          temperature: number | null
          weight: number | null
        }
        Insert: {
          blood_glucose?: number | null
          blood_pressure_diastolic?: number | null
          blood_pressure_systolic?: number | null
          bmi?: number | null
          created_at?: string | null
          heart_rate?: number | null
          height?: number | null
          id?: string
          notes?: string | null
          oxygen_saturation?: number | null
          patient_id: string
          recorded_at?: string | null
          recorded_by?: string | null
          respiratory_rate?: number | null
          temperature?: number | null
          weight?: number | null
        }
        Update: {
          blood_glucose?: number | null
          blood_pressure_diastolic?: number | null
          blood_pressure_systolic?: number | null
          bmi?: number | null
          created_at?: string | null
          heart_rate?: number | null
          height?: number | null
          id?: string
          notes?: string | null
          oxygen_saturation?: number | null
          patient_id?: string
          recorded_at?: string | null
          recorded_by?: string | null
          respiratory_rate?: number | null
          temperature?: number | null
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "vitals_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vitals_recorded_by_fkey"
            columns: ["recorded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      ward_beds: {
        Row: {
          admission_id: string | null
          bed_number: string
          created_at: string | null
          id: string
          notes: string | null
          patient_id: string | null
          status: string | null
          updated_at: string | null
          ward_name: string
        }
        Insert: {
          admission_id?: string | null
          bed_number: string
          created_at?: string | null
          id?: string
          notes?: string | null
          patient_id?: string | null
          status?: string | null
          updated_at?: string | null
          ward_name: string
        }
        Update: {
          admission_id?: string | null
          bed_number?: string
          created_at?: string | null
          id?: string
          notes?: string | null
          patient_id?: string | null
          status?: string | null
          updated_at?: string | null
          ward_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "ward_beds_admission_id_fkey"
            columns: ["admission_id"]
            isOneToOne: false
            referencedRelation: "admissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ward_beds_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_my_doctor_id: { Args: never; Returns: string }
      get_my_patient_id: { Args: never; Returns: string }
      get_my_profile_id: { Args: never; Returns: string }
      is_admin: { Args: never; Returns: boolean }
      is_doctor: { Args: never; Returns: boolean }
      is_finance: { Args: never; Returns: boolean }
      is_lab_tech: { Args: never; Returns: boolean }
      is_nurse: { Args: never; Returns: boolean }
      is_patient: { Args: never; Returns: boolean }
      is_pharmacist: { Args: never; Returns: boolean }
      is_receptionist: { Args: never; Returns: boolean }
    }
    Enums: {
      user_role:
        | "admin"
        | "patient"
        | "doctor"
        | "nurse"
        | "pharmacist"
        | "lab_tech"
        | "finance"
        | "receptionist"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      user_role: [
        "admin",
        "patient",
        "doctor",
        "nurse",
        "pharmacist",
        "lab_tech",
        "finance",
        "receptionist",
      ],
    },
  },
} as const
