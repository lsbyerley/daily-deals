export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      businesses: {
        Row: {
          city: string
          created_at: string
          gps_lat: number | null
          gps_long: number | null
          id: number
          name: string
          state: string
          street: string | null
          type: string
          website: string | null
          zipcode: string
        }
        Insert: {
          city: string
          created_at?: string
          gps_lat?: number | null
          gps_long?: number | null
          id?: number
          name: string
          state: string
          street?: string | null
          type: string
          website?: string | null
          zipcode: string
        }
        Update: {
          city?: string
          created_at?: string
          gps_lat?: number | null
          gps_long?: number | null
          id?: number
          name?: string
          state?: string
          street?: string | null
          type?: string
          website?: string | null
          zipcode?: string
        }
        Relationships: []
      }
      deals: {
        Row: {
          business: number
          created_at: string
          day: string | null
          description: string
          id: number
          time_end: string | null
          time_start: string | null
          type: string
        }
        Insert: {
          business: number
          created_at?: string
          day?: string | null
          description: string
          id?: number
          time_end?: string | null
          time_start?: string | null
          type: string
        }
        Update: {
          business?: number
          created_at?: string
          day?: string | null
          description?: string
          id?: number
          time_end?: string | null
          time_start?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "deals_business_fkey"
            columns: ["business"]
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
