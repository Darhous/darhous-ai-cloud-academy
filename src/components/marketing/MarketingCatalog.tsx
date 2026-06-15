"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown, Clock, Layers, Lock, Target } from "lucide-react";
import {
  MARKETING_STAGES,
  DIFFICULTY_LABEL,
  countLessons,
  type MarketingStage,
  type MarketingTrack,
} from "@/data/marketing/types";

interface Props {
  tracks: MarketingTrack[];
  locale: string;
}

type Filter = "all" | MarketingStage;

export default function MarketingCatalog({ tracks, locale }: Props) {
  const isAr = locale === "ar";
  const [filter, setFilter] = useState<Filter>("all");
  const [open, setOpen] = useState<string | null>(null);

  const filtered = useMemo(
    () => (filter === "all" ? tracks : tracks.filter((t) => t.stage === filter)),
    [tracks, filter],
  );

  const trackTitle = (id: string) => {
    const t = tracks.find((x) => x.id === id);
    return t ? (isAr ? t.titleAr : t.titleEn) : id;
  };

  const filters: { id: Filter; labelAr: string; labelEn: string; color: string }[] = [
    { id: "all", labelAr: "كل المسارات", labelEn: "All Tracks", color: "#ec4899" },
    ...MARKETING_STAGES.map((s) => ({ id: s.id, labelAr: s.labelAr, labelEn: s.labelEn, color: s.color })),
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Stage filter */}
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => {
          const active = filter === f.id;
          return (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className="px-4 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer"
              style={{
                background: active ? `${f.color}22` : "rgba(255,255,255,0.04)",
                color: active ? f.color : "var(--color-on-surface-variant)",
                border: `1px solid ${active ? `${f.color}55` : "rgba(255,255,255,0.08)"}`,
              }}
            >
              {isAr ? f.labelAr : f.labelEn}
            </button>
          );
        })}
      </div>

      {/* Track cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filtered.map((track) => {
          const stageMeta = MARKETING_STAGES.find((s) => s.id === track.stage)!;
          const isOpen = open === track.id;
          const lessons = countLessons(track);
          return (
            <div
              key={track.id}
              className="glass-card rounded-2xl p-5 flex flex-col gap-4"
              style={{ border: `1px solid ${track.color}22` }}
            >
              <div className="flex items-start gap-4">
                <span
                  className="text-2xl rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${track.color}15`, width: 48, height: 48 }}
                >
                  {track.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                      style={{ background: `${stageMeta.color}18`, color: stageMeta.color }}
                    >
                      {isAr ? stageMeta.labelAr : stageMeta.labelEn}
                    </span>
                    {track.featured && (
                      <span
                        className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                        style={{ background: "rgba(236,72,153,0.14)", color: "#ec4899" }}
                      >
                        {isAr ? "مميز" : "Featured"}
                      </span>
                    )}
                  </div>
                  <h3 className="font-display font-bold text-base mt-1 truncate">
                    {isAr ? track.titleAr : track.titleEn}
                  </h3>
                </div>
              </div>

              <p
                className="text-xs leading-relaxed"
                style={{ color: "var(--color-on-surface-variant)" }}
              >
                {isAr ? track.descriptionAr : track.descriptionEn}
              </p>

              {/* meta row */}
              <div className="flex flex-wrap gap-3 text-[11px] font-mono" style={{ color: "var(--color-on-surface-variant)" }}>
                <span className="flex items-center gap-1"><Clock size={12} /> {track.durationHours}h</span>
                <span className="flex items-center gap-1"><Layers size={12} /> {track.modules.length} {isAr ? "وحدة" : "modules"} · {lessons} {isAr ? "درس" : "lessons"}</span>
                <span className="flex items-center gap-1" style={{ color: stageMeta.color }}>
                  <Target size={12} /> {isAr ? "صعوبة" : "Lv"} {track.difficulty} — {isAr ? DIFFICULTY_LABEL[track.difficulty].ar : DIFFICULTY_LABEL[track.difficulty].en}
                </span>
              </div>

              {/* prereqs */}
              {track.prereqs.length > 0 && (
                <p className="text-[11px] flex items-center gap-1.5" style={{ color: "var(--color-on-surface-variant)" }}>
                  <Lock size={11} />
                  {isAr ? "المتطلبات: " : "Requires: "}
                  {track.prereqs.map(trackTitle).join(isAr ? "، " : ", ")}
                </p>
              )}

              {/* skills */}
              <div className="flex flex-wrap gap-1.5">
                {(isAr ? track.skillsAr : track.skillsEn).slice(0, 4).map((s) => (
                  <span
                    key={s}
                    className="text-[10px] px-2 py-0.5 rounded-md"
                    style={{ background: `${track.color}10`, color: track.color }}
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* expand modules */}
              <button
                onClick={() => setOpen(isOpen ? null : track.id)}
                className="flex items-center justify-between text-xs font-semibold pt-2 cursor-pointer"
                style={{ borderTop: "1px solid rgba(255,255,255,0.07)", color: track.color }}
              >
                <span>{isAr ? "عرض المنهج" : "View curriculum"}</span>
                <ChevronDown size={15} style={{ transform: isOpen ? "rotate(180deg)" : "none", transition: "transform .2s" }} />
              </button>

              {isOpen && (
                <div className="flex flex-col gap-3">
                  {track.modules.map((m, mi) => (
                    <div key={m.id}>
                      <p className="text-xs font-bold" style={{ color: "var(--color-on-surface)" }}>
                        {String(mi + 1).padStart(2, "0")} · {isAr ? m.titleAr : m.titleEn}
                      </p>
                      <ul className="mt-1 ms-3 flex flex-col gap-0.5">
                        {m.lessons.map((l) => (
                          <li
                            key={l.id}
                            className="text-[11px] flex items-center gap-1.5"
                            style={{ color: "var(--color-on-surface-variant)" }}
                          >
                            <span style={{ color: track.color }}>•</span>
                            {isAr ? l.titleAr : l.titleEn}
                            {l.estMinutes ? <span className="opacity-60">· {l.estMinutes}m</span> : null}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  {/* final project */}
                  <div
                    className="rounded-xl p-3 text-[11px]"
                    style={{ background: `${track.color}0d`, border: `1px solid ${track.color}22` }}
                  >
                    <span className="font-bold" style={{ color: track.color }}>
                      {isAr ? "المشروع النهائي: " : "Final project: "}
                    </span>
                    <span style={{ color: "var(--color-on-surface-variant)" }}>
                      {isAr ? track.finalProjectAr : track.finalProjectEn}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* certificate ladder */}
      <div className="glass-card rounded-2xl p-5 mt-2" style={{ border: "1px solid rgba(236,72,153,0.18)" }}>
        <h3 className="font-display font-bold text-base mb-3" style={{ color: "#ec4899" }}>
          {isAr ? "سلّم الشهادات" : "Certificate Ladder"}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          {[
            { ar: "مبتدئ", en: "Beginner", subAr: "T1–T3", subEn: "T1–T3" },
            { ar: "محترف", en: "Professional", subAr: "T4–T10", subEn: "T4–T10" },
            { ar: "متخصص", en: "Specialist", subAr: "T11–T14", subEn: "T11–T14" },
            { ar: "خبير", en: "Expert", subAr: "T15–T16", subEn: "T15–T16" },
          ].map((c, i) => (
            <div key={c.en} className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <p className="text-[10px] font-mono opacity-60">{String(i + 1).padStart(2, "0")}</p>
              <p className="text-sm font-bold">{isAr ? c.ar : c.en}</p>
              <p className="text-[11px]" style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? c.subAr : c.subEn}</p>
            </div>
          ))}
        </div>
        <Link
          href={`/${locale}/certificates`}
          className="inline-flex items-center gap-1.5 mt-4 text-xs font-semibold"
          style={{ color: "#ec4899" }}
        >
          {isAr ? "تحقّق من الشهادات →" : "Verify certificates →"}
        </Link>
      </div>
    </div>
  );
}
