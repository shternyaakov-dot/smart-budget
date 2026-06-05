export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          role: 'coach' | 'client'
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'created_at'>
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>
      }
      clients: {
        Row: {
          id: string
          coach_id: string
          name: string
          email: string | null
          phone: string | null
          stage: 'מודעות' | 'שינוי' | 'שמירה'
          session: number
          notes: string | null
          token: string
          materials: number[]
          guide_data: Json
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['clients']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['clients']['Insert']>
      }
      meetings: {
        Row: {
          id: string
          client_id: string
          coach_id: string
          date: string
          notes: string | null
          client_note: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['meetings']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['meetings']['Insert']>
      }
    }
  }
}

export type Client = Database['public']['Tables']['clients']['Row']
export type Meeting = Database['public']['Tables']['meetings']['Row']
export type Profile = Database['public']['Tables']['profiles']['Row']
