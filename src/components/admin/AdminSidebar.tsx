import { useState } from "react";
import { AdminTab, adminNavGroups } from "./admin-navigation";
import { ChevronDown, ChevronRight, ChevronLeft } from "lucide-react";

interface AdminSidebarProps {
  currentTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
  isAr: boolean;
}

export function AdminSidebar({ currentTab, onTabChange, isAr }: AdminSidebarProps) {
  const initialGroup = adminNavGroups.find(g => g.items.some(i => i.id === currentTab))?.id || "overview";
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({ [initialGroup]: true });

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => ({ ...prev, [groupId]: !prev[groupId] }));
  };

  return (
    <aside className="w-64 h-screen flex-shrink-0 flex flex-col sticky top-0 overflow-y-auto" style={{ background: "var(--color-surface)", borderInlineEnd: "1px solid var(--color-surface-container-high)" }}>
      <div className="p-4 border-b" style={{ borderColor: "var(--color-surface-container-high)" }}>
        <h2 className="font-display font-bold text-lg" style={{ color: "var(--color-on-surface)" }}>
          {isAr ? "قائمة الإدارة" : "Admin Menu"}
        </h2>
      </div>
      <nav className="flex-1 p-3 flex flex-col gap-2">
        {adminNavGroups.map((group) => {
          const isExpanded = expandedGroups[group.id];
          const hasActiveItem = group.items.some(item => item.id === currentTab);

          return (
            <div key={group.id} className="flex flex-col gap-1">
              <button
                onClick={() => toggleGroup(group.id)}
                className="flex items-center justify-between w-full px-2 py-1.5 rounded-lg text-sm font-semibold transition-colors"
                style={{
                  color: hasActiveItem ? "var(--color-primary)" : "var(--color-on-surface-variant)",
                  background: hasActiveItem && !isExpanded ? "rgba(60,224,251,0.05)" : "transparent"
                }}
              >
                <span>{isAr ? group.labelAr : group.labelEn}</span>
                {isExpanded ? <ChevronDown size={14} /> : (isAr ? <ChevronLeft size={14} /> : <ChevronRight size={14} />)}
              </button>

              {isExpanded && (
                <div className={`flex flex-col gap-0.5 ${isAr ? 'pr-3 border-r' : 'pl-3 border-l'} pb-1 mt-1`} style={{ borderColor: "var(--color-surface-container-highest)" }}>
                  {group.items.map((item) => {
                    const isActive = currentTab === item.id;
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => onTabChange(item.id)}
                        className="flex items-center gap-2 px-2 py-2 rounded-lg text-xs transition-all text-start"
                        style={{
                          background: isActive ? "rgba(60,224,251,0.12)" : "transparent",
                          color: isActive ? "var(--color-primary)" : "var(--color-on-surface-variant)",
                          fontWeight: isActive ? 600 : 400
                        }}
                      >
                        <Icon size={14} />
                        {isAr ? item.labelAr : item.labelEn}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
