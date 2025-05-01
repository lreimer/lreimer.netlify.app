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
      conference_talks: {
        Row: {
          id: string
          title: string
          conference_name: string
          date: string
          description: string | null
          slides_url: string | null
          tags: string[]
          created_at: string
          user_id: string
        }
        Insert: {
          id?: string
          title: string
          conference_name: string
          date: string
          description?: string | null
          slides_url?: string | null
          tags?: string[]
          created_at?: string
          user_id: string
        }
        Update: {
          id?: string
          title?: string
          conference_name?: string
          date?: string
          description?: string | null
          slides_url?: string | null
          tags?: string[]
          created_at?: string
          user_id?: string
        }
      }
    }
  }
}