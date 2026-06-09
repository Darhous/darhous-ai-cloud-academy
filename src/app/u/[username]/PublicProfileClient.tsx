"use client";

import Link from "next/link";
import { Award, BookOpen, Flame, Globe, UserCircle } from "lucide-react";

interface CertRow { course_slug: string; course_title: string; certificate_code: string; issued_at: string; }
interface CourseRow { course_slug: string; status: string; progress_percent: number; }

interface ProfileData {
  displayName: string;
  bio: string | null;
  avatarUrl: string | null;
  joinedAt: string | null;
  certificates: CertRow[];
  completedCourses: CourseRow[];
  streak: number | null;
  showCertificates: boolean;
  showStreak: boolean;
  showProjects: boolean;
}

interface Props {
  username: string;
  profile: ProfileData | null;
  notConfigured?: boolean;
}

export default function PublicProfileClient({ username, profile, notConfigured }: Props) {
  if (notConfigured) {
    return (
      <div className="container-xl py-16 text-center">
        <UserCircle size={48} className="mx-auto mb-4" style={{ color: "var(--color-on-surface-variant)" }} />
        <h1 className="font-display font-bold text-2xl mb-2" style={{ color: "var(--color-on-surface)" }}>@{username}</h1>
        <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>Public profiles require Supabase to be configured.</p>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="container-xl py-12 flex flex-col gap-8 max-w-2xl">
      {/* Profile header */}
      <div className="glass-card rounded-3xl p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="w-24 h-24 rounded-full flex-shrink-0 flex items-center justify-center text-3xl" style={{ background: profile.avatarUrl ? "transparent" : "rgba(142,213,255,0.1)", border: "2px solid var(--color-outline-variant)", overflow: "hidden" }}>
          {profile.avatarUrl ? (
            <img src={profile.avatarUrl} alt={profile.displayName} className="w-full h-full object-cover" />
          ) : (
            "👤"
          )}
        </div>
        <div className="flex-1 text-center sm:text-start">
          <h1 className="font-display font-bold text-2xl" style={{ color: "var(--color-on-surface)" }}>{profile.displayName}</h1>
          <p className="text-sm font-mono" style={{ color: "var(--color-on-surface-variant)" }}>@{username}</p>
          {profile.bio && <p className="text-sm mt-2 leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>{profile.bio}</p>}
          {profile.joinedAt && (
            <p className="text-xs font-mono mt-2" style={{ color: "var(--color-on-surface-variant)" }}>
              <Globe size={11} className="inline me-1" />
              Joined {new Date(profile.joinedAt).toLocaleDateString("en", { year: "numeric", month: "long" })}
            </p>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {profile.showStreak && profile.streak !== null && (
          <div className="glass-card rounded-2xl p-4 text-center">
            <Flame size={20} className="mx-auto mb-1" style={{ color: "#f97316" }} />
            <p className="font-bold text-xl font-mono" style={{ color: "#f97316" }}>{profile.streak}</p>
            <p className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>day streak</p>
          </div>
        )}
        {profile.showCertificates && (
          <div className="glass-card rounded-2xl p-4 text-center">
            <Award size={20} className="mx-auto mb-1" style={{ color: "#fbbf24" }} />
            <p className="font-bold text-xl font-mono" style={{ color: "#fbbf24" }}>{profile.certificates.length}</p>
            <p className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>certificates</p>
          </div>
        )}
        <div className="glass-card rounded-2xl p-4 text-center">
          <BookOpen size={20} className="mx-auto mb-1" style={{ color: "var(--color-primary)" }} />
          <p className="font-bold text-xl font-mono" style={{ color: "var(--color-primary)" }}>{profile.completedCourses.length}</p>
          <p className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>courses</p>
        </div>
      </div>

      {/* Certificates */}
      {profile.showCertificates && profile.certificates.length > 0 && (
        <div>
          <h2 className="font-bold text-base mb-3" style={{ color: "var(--color-on-surface)" }}>🎓 Certificates</h2>
          <div className="flex flex-col gap-2">
            {profile.certificates.map((c) => (
              <div key={c.certificate_code} className="glass-card rounded-xl p-4 flex items-center gap-3">
                <Award size={16} style={{ color: "#fbbf24", flexShrink: 0 }} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate" style={{ color: "var(--color-on-surface)" }}>{c.course_title}</p>
                  <p className="text-xs font-mono" style={{ color: "#fbbf24" }}>{c.certificate_code}</p>
                </div>
                <Link href={`/certificates/verify/${c.certificate_code}`} target="_blank" rel="noopener noreferrer" className="text-xs font-mono" style={{ color: "var(--color-primary)" }}>
                  Verify
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Completed courses */}
      {profile.completedCourses.length > 0 && (
        <div>
          <h2 className="font-bold text-base mb-3" style={{ color: "var(--color-on-surface)" }}>📚 Completed Courses</h2>
          <div className="flex flex-col gap-2">
            {profile.completedCourses.map((c) => (
              <div key={c.course_slug} className="glass-card rounded-xl p-3 flex items-center gap-3">
                <BookOpen size={14} style={{ color: "var(--color-primary)", flexShrink: 0 }} />
                <p className="text-sm flex-1 truncate" style={{ color: "var(--color-on-surface)" }}>{c.course_slug}</p>
                <span className="text-xs font-mono" style={{ color: "#4ade80" }}>100%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
