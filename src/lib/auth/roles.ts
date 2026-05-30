export type UserRole = "student" | "admin";
export type UserLevel = "beginner" | "intermediate" | "advanced";

export interface UserProfile {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  role: UserRole;
  provider: string | null;
  locale: string;
  created_at: string;
  updated_at: string;
}

export interface StudentProfile {
  id: string;
  user_id: string;
  level: UserLevel | null;
  goal: string | null;
  interests: string[] | null;
  weekly_time: string | null;
  preferred_language: string | null;
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
}

export function isAdmin(profile: UserProfile | null | undefined): boolean {
  return profile?.role === "admin";
}

export function isStudent(profile: UserProfile | null | undefined): boolean {
  return !!profile && profile.role !== "admin";
}

export function hasRole(profile: UserProfile | null | undefined, role: UserRole): boolean {
  return profile?.role === role;
}
