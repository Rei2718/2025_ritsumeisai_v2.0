export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      classes: {
        Row: {
          class_name: string
          color: Database["public"]["Enums"]["color_enum"]
          grade: number
          organizer_id: number
          school_level: Database["public"]["Enums"]["school_level"]
        }
        Insert: {
          class_name: string
          color: Database["public"]["Enums"]["color_enum"]
          grade: number
          organizer_id: number
          school_level: Database["public"]["Enums"]["school_level"]
        }
        Update: {
          class_name?: string
          color?: Database["public"]["Enums"]["color_enum"]
          grade?: number
          organizer_id?: number
          school_level?: Database["public"]["Enums"]["school_level"]
        }
        Relationships: [
          {
            foreignKeyName: "classes_organizer_id_fkey"
            columns: ["organizer_id"]
            isOneToOne: true
            referencedRelation: "organizers"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          created_at: string | null
          description: string | null
          end_time: string
          event_date: Database["public"]["Enums"]["event_date_enum"]
          event_name: string
          event_type: Database["public"]["Enums"]["event_type"]
          id: number
          image_url: string | null
          organizer_id: number
          start_time: string
          status: Database["public"]["Enums"]["event_status"]
          venue_id: number
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          end_time: string
          event_date: Database["public"]["Enums"]["event_date_enum"]
          event_name: string
          event_type: Database["public"]["Enums"]["event_type"]
          id?: number
          image_url?: string | null
          organizer_id: number
          start_time: string
          status?: Database["public"]["Enums"]["event_status"]
          venue_id: number
        }
        Update: {
          created_at?: string | null
          description?: string | null
          end_time?: string
          event_date?: Database["public"]["Enums"]["event_date_enum"]
          event_name?: string
          event_type?: Database["public"]["Enums"]["event_type"]
          id?: number
          image_url?: string | null
          organizer_id?: number
          start_time?: string
          status?: Database["public"]["Enums"]["event_status"]
          venue_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "events_organizer_id_fkey"
            columns: ["organizer_id"]
            isOneToOne: false
            referencedRelation: "organizers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_venue_id_fkey"
            columns: ["venue_id"]
            isOneToOne: false
            referencedRelation: "venues"
            referencedColumns: ["id"]
          },
        ]
      }
      food_items: {
        Row: {
          created_at: string | null
          display_order: number | null
          id: string
          item_name: string
          price: number
          updated_at: string | null
          vendor_id: string
        }
        Insert: {
          created_at?: string | null
          display_order?: number | null
          id?: string
          item_name: string
          price: number
          updated_at?: string | null
          vendor_id: string
        }
        Update: {
          created_at?: string | null
          display_order?: number | null
          id?: string
          item_name?: string
          price?: number
          updated_at?: string | null
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "food_items_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "food_vendors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "food_items_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendor_with_items"
            referencedColumns: ["vendor_id"]
          },
        ]
      }
      food_vendors: {
        Row: {
          booth_number: string | null
          created_at: string | null
          description: string | null
          display_order: number | null
          id: string
          location: string | null
          main_image_url: string | null
          updated_at: string | null
          vendor_name: string
        }
        Insert: {
          booth_number?: string | null
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          location?: string | null
          main_image_url?: string | null
          updated_at?: string | null
          vendor_name: string
        }
        Update: {
          booth_number?: string | null
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          location?: string | null
          main_image_url?: string | null
          updated_at?: string | null
          vendor_name?: string
        }
        Relationships: []
      }
      groups: {
        Row: {
          color: Database["public"]["Enums"]["color_enum"]
          group_name: string
          organizer_id: number
        }
        Insert: {
          color?: Database["public"]["Enums"]["color_enum"]
          group_name: string
          organizer_id: number
        }
        Update: {
          color?: Database["public"]["Enums"]["color_enum"]
          group_name?: string
          organizer_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "groups_organizer_id_fkey"
            columns: ["organizer_id"]
            isOneToOne: true
            referencedRelation: "organizers"
            referencedColumns: ["id"]
          },
        ]
      }
      organizers: {
        Row: {
          created_at: string | null
          id: number
          type: Database["public"]["Enums"]["organizer_type"]
        }
        Insert: {
          created_at?: string | null
          id?: number
          type: Database["public"]["Enums"]["organizer_type"]
        }
        Update: {
          created_at?: string | null
          id?: number
          type?: Database["public"]["Enums"]["organizer_type"]
        }
        Relationships: []
      }
      venues: {
        Row: {
          created_at: string | null
          id: number
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          name: string
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      class_events: {
        Row: {
          class_name: string | null
          color: Database["public"]["Enums"]["color_enum"] | null
          description: string | null
          end_time: string | null
          event_date: Database["public"]["Enums"]["event_date_enum"] | null
          event_id: number | null
          event_name: string | null
          event_type: Database["public"]["Enums"]["event_type"] | null
          grade: number | null
          image_url: string | null
          organizer_id: number | null
          school_level: Database["public"]["Enums"]["school_level"] | null
          start_time: string | null
          status: Database["public"]["Enums"]["event_status"] | null
          venue_id: number | null
          venue_name: string | null
        }
        Relationships: [
          {
            foreignKeyName: "classes_organizer_id_fkey"
            columns: ["organizer_id"]
            isOneToOne: true
            referencedRelation: "organizers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_venue_id_fkey"
            columns: ["venue_id"]
            isOneToOne: false
            referencedRelation: "venues"
            referencedColumns: ["id"]
          },
        ]
      }
      show_arena_events: {
        Row: {
          description: string | null
          end_time: string | null
          event_date: Database["public"]["Enums"]["event_date_enum"] | null
          event_id: number | null
          event_name: string | null
          event_type: Database["public"]["Enums"]["event_type"] | null
          image_url: string | null
          organizer_color: Database["public"]["Enums"]["color_enum"] | null
          organizer_name: string | null
          start_time: string | null
          status: Database["public"]["Enums"]["event_status"] | null
          venue_name: string | null
        }
        Relationships: []
      }
      show_assembly_events: {
        Row: {
          description: string | null
          end_time: string | null
          event_date: Database["public"]["Enums"]["event_date_enum"] | null
          event_id: number | null
          event_name: string | null
          event_type: Database["public"]["Enums"]["event_type"] | null
          image_url: string | null
          organizer_color: Database["public"]["Enums"]["color_enum"] | null
          organizer_name: string | null
          start_time: string | null
          status: Database["public"]["Enums"]["event_status"] | null
          venue_name: string | null
        }
        Relationships: []
      }
      show_kotan_events: {
        Row: {
          description: string | null
          end_time: string | null
          event_date: Database["public"]["Enums"]["event_date_enum"] | null
          event_id: number | null
          event_name: string | null
          event_type: Database["public"]["Enums"]["event_type"] | null
          image_url: string | null
          organizer_color: Database["public"]["Enums"]["color_enum"] | null
          organizer_name: string | null
          start_time: string | null
          status: Database["public"]["Enums"]["event_status"] | null
          venue_name: string | null
        }
        Relationships: []
      }
      show_subarena_events: {
        Row: {
          description: string | null
          end_time: string | null
          event_date: Database["public"]["Enums"]["event_date_enum"] | null
          event_id: number | null
          event_name: string | null
          event_type: Database["public"]["Enums"]["event_type"] | null
          image_url: string | null
          organizer_color: Database["public"]["Enums"]["color_enum"] | null
          organizer_name: string | null
          start_time: string | null
          status: Database["public"]["Enums"]["event_status"] | null
          venue_name: string | null
        }
        Relationships: []
      }
      vendor_with_items: {
        Row: {
          booth_number: string | null
          item_display_order: number | null
          item_id: string | null
          item_name: string | null
          location: string | null
          main_image_url: string | null
          price: number | null
          vendor_description: string | null
          vendor_display_order: number | null
          vendor_id: string | null
          vendor_name: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      color_enum: "c1" | "c2" | "c3" | "c4" | "c5" | "c6" | "c7"
      event_date_enum: "7/5" | "7/6"
      event_status: "µ║ûσéÖΣ╕¡" | "σàÑσá┤µíêσåàΣ╕¡" | "σà¼µ╝öΣ╕¡" | "Θûïσé¼Σ╕¡" | "τ╡éΣ║å"
      event_type: "πâæπâòπé⌐πâ╝πâ₧πâ│πé╣" | "σ╕╕Φ¿¡σ▒òτñ║" | "πü¥πü«Σ╗û"
      organizer_type: "class" | "group"
      school_level: "middle" | "high"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      color_enum: ["c1", "c2", "c3", "c4", "c5", "c6", "c7"],
      event_date_enum: ["7/5", "7/6"],
      event_status: ["µ║ûσéÖΣ╕¡", "σàÑσá┤µíêσåàΣ╕¡", "σà¼µ╝öΣ╕¡", "Θûïσé¼Σ╕¡", "τ╡éΣ║å"],
      event_type: ["πâæπâòπé⌐πâ╝πâ₧πâ│πé╣", "σ╕╕Φ¿¡σ▒òτñ║", "πü¥πü«Σ╗û"],
      organizer_type: ["class", "group"],
      school_level: ["middle", "high"],
    },
  },
} as const
