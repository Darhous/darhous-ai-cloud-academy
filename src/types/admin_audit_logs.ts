export type AuditAction =
  | "user.promote"
  | "user.ban"
  | "user.delete"
  | "content.update"
  | "portal.toggle"
  | "settings.update"
  | "certificate.issue"
  | "certificate.revoke"
  | "mentor.settings_update"
  | "email.send"
  | "feature_flag.toggle";

export interface AdminAuditLog {
  id: string;
  action: AuditAction | string;
  admin_id: string;
  admin_email?: string;
  target_type?: string;
  target_id?: string;
  before?: Record<string, unknown>;
  after?: Record<string, unknown>;
  timestamp: string;
  ip_address?: string;
  description?: string;
}
