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
      events: {
        Row: {
          event_category: string | null
          event_city: string | null
          event_country: string | null
          event_date: string | null
          event_description: string | null
          event_id: number
          event_location: string | null
          event_name: string | null
          event_state: string | null
        }
        Insert: {
          event_category?: string | null
          event_city?: string | null
          event_country?: string | null
          event_date?: string | null
          event_description?: string | null
          event_id?: number
          event_location?: string | null
          event_name?: string | null
          event_state?: string | null
        }
        Update: {
          event_category?: string | null
          event_city?: string | null
          event_country?: string | null
          event_date?: string | null
          event_description?: string | null
          event_id?: number
          event_location?: string | null
          event_name?: string | null
          event_state?: string | null
        }
        Relationships: []
      }
      followers: {
        Row: {
          created_at: string | null
          follower_id: string
          following_id: string
        }
        Insert: {
          created_at?: string | null
          follower_id: string
          following_id: string
        }
        Update: {
          created_at?: string | null
          follower_id?: string
          following_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "followers_follower_id_fkey"
            columns: ["follower_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "followers_following_id_fkey"
            columns: ["following_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          email?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          updated_at?: string | null
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
      follow_user: {
        Args: {
          follower_id: string
          following_id: string
        }
        Returns: undefined
      }
      unfollow_user: {
        Args: {
          follower_id: string
          following_id: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
