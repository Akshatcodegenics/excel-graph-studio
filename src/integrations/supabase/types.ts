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
      assignments: {
        Row: {
          course_id: string | null
          created_at: string | null
          criteria: string | null
          description: string | null
          due_date: string
          faculty_id: string | null
          id: string
          max_points: number
          title: string
          updated_at: string | null
        }
        Insert: {
          course_id?: string | null
          created_at?: string | null
          criteria?: string | null
          description?: string | null
          due_date: string
          faculty_id?: string | null
          id?: string
          max_points?: number
          title: string
          updated_at?: string | null
        }
        Update: {
          course_id?: string | null
          created_at?: string | null
          criteria?: string | null
          description?: string | null
          due_date?: string
          faculty_id?: string | null
          id?: string
          max_points?: number
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "assignments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assignments_faculty_id_fkey"
            columns: ["faculty_id"]
            isOneToOne: false
            referencedRelation: "faculty"
            referencedColumns: ["id"]
          },
        ]
      }
      attendance: {
        Row: {
          course_id: string | null
          created_at: string | null
          date: string
          faculty_id: string | null
          id: string
          remarks: string | null
          status: Database["public"]["Enums"]["attendance_status"]
          student_id: string | null
          updated_at: string | null
        }
        Insert: {
          course_id?: string | null
          created_at?: string | null
          date: string
          faculty_id?: string | null
          id?: string
          remarks?: string | null
          status?: Database["public"]["Enums"]["attendance_status"]
          student_id?: string | null
          updated_at?: string | null
        }
        Update: {
          course_id?: string | null
          created_at?: string | null
          date?: string
          faculty_id?: string | null
          id?: string
          remarks?: string | null
          status?: Database["public"]["Enums"]["attendance_status"]
          student_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "attendance_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_faculty_id_fkey"
            columns: ["faculty_id"]
            isOneToOne: false
            referencedRelation: "faculty"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      course_enrollments: {
        Row: {
          course_id: string | null
          enrollment_date: string
          id: string
          student_id: string | null
        }
        Insert: {
          course_id?: string | null
          enrollment_date?: string
          id?: string
          student_id?: string | null
        }
        Update: {
          course_id?: string | null
          enrollment_date?: string
          id?: string
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_enrollments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_enrollments_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      course_feedback: {
        Row: {
          comments: string | null
          course_id: string | null
          created_at: string | null
          difficulty_rating: number | null
          feedback_date: string
          id: string
          interest_rating: number | null
          overall_rating: number | null
          student_id: string | null
        }
        Insert: {
          comments?: string | null
          course_id?: string | null
          created_at?: string | null
          difficulty_rating?: number | null
          feedback_date?: string
          id?: string
          interest_rating?: number | null
          overall_rating?: number | null
          student_id?: string | null
        }
        Update: {
          comments?: string | null
          course_id?: string | null
          created_at?: string | null
          difficulty_rating?: number | null
          feedback_date?: string
          id?: string
          interest_rating?: number | null
          overall_rating?: number | null
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_feedback_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_feedback_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          course_code: string
          course_name: string
          created_at: string | null
          credits: number
          description: string | null
          faculty_id: string | null
          id: string
          semester: Database["public"]["Enums"]["semester_type"]
          updated_at: string | null
          year: number
        }
        Insert: {
          course_code: string
          course_name: string
          created_at?: string | null
          credits?: number
          description?: string | null
          faculty_id?: string | null
          id?: string
          semester: Database["public"]["Enums"]["semester_type"]
          updated_at?: string | null
          year: number
        }
        Update: {
          course_code?: string
          course_name?: string
          created_at?: string | null
          credits?: number
          description?: string | null
          faculty_id?: string | null
          id?: string
          semester?: Database["public"]["Enums"]["semester_type"]
          updated_at?: string | null
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "courses_faculty_id_fkey"
            columns: ["faculty_id"]
            isOneToOne: false
            referencedRelation: "faculty"
            referencedColumns: ["id"]
          },
        ]
      }
      faculty: {
        Row: {
          created_at: string | null
          department: string
          email: string
          employee_id: string
          first_name: string
          id: string
          last_name: string
          phone: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          department: string
          email: string
          employee_id: string
          first_name: string
          id?: string
          last_name: string
          phone?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          department?: string
          email?: string
          employee_id?: string
          first_name?: string
          id?: string
          last_name?: string
          phone?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      grades: {
        Row: {
          faculty_id: string | null
          feedback: string | null
          graded_at: string | null
          id: string
          points_earned: number
          submission_id: string | null
          updated_at: string | null
        }
        Insert: {
          faculty_id?: string | null
          feedback?: string | null
          graded_at?: string | null
          id?: string
          points_earned?: number
          submission_id?: string | null
          updated_at?: string | null
        }
        Update: {
          faculty_id?: string | null
          feedback?: string | null
          graded_at?: string | null
          id?: string
          points_earned?: number
          submission_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "grades_faculty_id_fkey"
            columns: ["faculty_id"]
            isOneToOne: false
            referencedRelation: "faculty"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "grades_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      performance_reviews: {
        Row: {
          course_id: string | null
          created_at: string | null
          faculty_id: string | null
          id: string
          rating: number | null
          review_date: string
          review_period: string
          review_text: string | null
          student_id: string | null
          suggestions: string | null
          updated_at: string | null
          weak_areas: string | null
        }
        Insert: {
          course_id?: string | null
          created_at?: string | null
          faculty_id?: string | null
          id?: string
          rating?: number | null
          review_date?: string
          review_period: string
          review_text?: string | null
          student_id?: string | null
          suggestions?: string | null
          updated_at?: string | null
          weak_areas?: string | null
        }
        Update: {
          course_id?: string | null
          created_at?: string | null
          faculty_id?: string | null
          id?: string
          rating?: number | null
          review_date?: string
          review_period?: string
          review_text?: string | null
          student_id?: string | null
          suggestions?: string | null
          updated_at?: string | null
          weak_areas?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "performance_reviews_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "performance_reviews_faculty_id_fkey"
            columns: ["faculty_id"]
            isOneToOne: false
            referencedRelation: "faculty"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "performance_reviews_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      students: {
        Row: {
          created_at: string | null
          email: string
          enrollment_date: string
          first_name: string
          id: string
          last_name: string
          phone: string | null
          student_id: string
          updated_at: string | null
          user_id: string | null
          year_level: number | null
        }
        Insert: {
          created_at?: string | null
          email: string
          enrollment_date: string
          first_name: string
          id?: string
          last_name: string
          phone?: string | null
          student_id: string
          updated_at?: string | null
          user_id?: string | null
          year_level?: number | null
        }
        Update: {
          created_at?: string | null
          email?: string
          enrollment_date?: string
          first_name?: string
          id?: string
          last_name?: string
          phone?: string | null
          student_id?: string
          updated_at?: string | null
          user_id?: string | null
          year_level?: number | null
        }
        Relationships: []
      }
      submissions: {
        Row: {
          assignment_id: string | null
          file_url: string | null
          id: string
          is_late: boolean | null
          student_id: string | null
          submission_text: string | null
          submitted_at: string | null
        }
        Insert: {
          assignment_id?: string | null
          file_url?: string | null
          id?: string
          is_late?: boolean | null
          student_id?: string | null
          submission_text?: string | null
          submitted_at?: string | null
        }
        Update: {
          assignment_id?: string | null
          file_url?: string | null
          id?: string
          is_late?: boolean | null
          student_id?: string | null
          submission_text?: string | null
          submitted_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "submissions_assignment_id_fkey"
            columns: ["assignment_id"]
            isOneToOne: false
            referencedRelation: "assignments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "submissions_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: { user_uuid: string }
        Returns: Database["public"]["Enums"]["user_role"]
      }
    }
    Enums: {
      attendance_status: "present" | "absent" | "late" | "excused"
      semester_type: "fall" | "spring" | "summer"
      user_role: "faculty" | "student" | "admin"
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
      attendance_status: ["present", "absent", "late", "excused"],
      semester_type: ["fall", "spring", "summer"],
      user_role: ["faculty", "student", "admin"],
    },
  },
} as const
