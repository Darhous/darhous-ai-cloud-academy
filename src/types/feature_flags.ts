export interface FeatureFlag {
  name: string;
  enabled: boolean;
  rollout_pct: number; // 0–100
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export const defaultFeatureFlags: FeatureFlag[] = [
  { name: "ai_mentor_context_panel", enabled: false, rollout_pct: 0, description: "Show user context panel in AI Mentor" },
  { name: "smart_learning_plan",     enabled: true,  rollout_pct: 100, description: "Personalized weekly learning plan in dashboard" },
  { name: "certificate_linkedin",    enabled: true,  rollout_pct: 100, description: "Share certificate to LinkedIn" },
  { name: "dark_light_toggle",       enabled: false, rollout_pct: 0,  description: "UI theme toggle (dark / light)" },
  { name: "admin_site_builder",      enabled: true,  rollout_pct: 100, description: "Visual site builder in admin studio" },
];
