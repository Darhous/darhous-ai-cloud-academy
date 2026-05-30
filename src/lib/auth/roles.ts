export type UserRole = "student" | "admin";

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

export function isAdmin(profile: UserProfile | null | undefined): boolean {
  return profile?.role === "admin";
}

export function isStudent(profile: UserProfile | null | undefined): boolean {
  return !!profile && profile.role !== "admin";
}

export function hasRole(profile: UserProfile | null | undefined, role: UserRole): boolean {
  return profile?.role === role;
}
