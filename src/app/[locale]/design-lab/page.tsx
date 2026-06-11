import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Design Lab | NexaLearn Preview',
  robots: {
    index: false,
    follow: false,
  },
};

const concepts = [
  {
    id: 1,
    name: 'AI Command Center',
    bestFor: 'Dashboard feel, tech-forward users',
    motionLevel: 'High (Dashboard animations)',
    risk: 'High (Complex layout, RTL/LTR mirroring)',
    mainLibraries: 'shadcn/ui, HeroUI, Magic UI',
    route: 'homepage-concept-1',
  },
  {
    id: 2,
    name: 'The Learning Journey',
    bestFor: 'Storytelling, narrative flow',
    motionLevel: 'Medium (Scroll reveals)',
    risk: 'Medium (Content branches)',
    mainLibraries: 'shadcn/ui, Magic UI, Aceternity',
    route: 'homepage-concept-2',
  },
  {
    id: 3,
    name: 'Silent Authority',
    bestFor: 'Fast load, minimal SaaS look',
    motionLevel: 'Low (Hover effects only)',
    risk: 'Low (Simple layout)',
    mainLibraries: 'shadcn/ui, HeroUI',
    route: 'homepage-concept-3',
  },
  {
    id: 4,
    name: 'Portal Constellation',
    bestFor: 'Visual "wow" factor, exploration',
    motionLevel: 'Very High (3D, background transitions)',
    risk: 'Very High (GPU performance)',
    mainLibraries: 'Aceternity, Magic UI',
    route: 'homepage-concept-4',
  },
  {
    id: 5,
    name: 'Goal Gateway',
    bestFor: 'Conversion, personalization',
    motionLevel: 'Medium (Slide transitions)',
    risk: 'High (Viewport-locked routing)',
    mainLibraries: 'HeroUI, shadcn/ui, Magic UI',
    route: 'homepage-concept-5',
  },
];

export default async function DesignLabIndex({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isRTL = locale === 'ar';

  return (
    <div className="min-h-screen bg-[#08090c] text-white p-8 font-sans" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header Warning */}
        <div className="border border-yellow-500/30 bg-yellow-500/10 rounded-xl p-6 shadow-[0_0_30px_rgba(234,179,8,0.1)]">
          <h1 className="text-2xl font-bold text-yellow-400 mb-2 flex items-center gap-2">
            <span aria-hidden="true">⚠️</span> Internal Preview Only
          </h1>
          <p className="text-yellow-200/80">
            This route is strictly for internal review of homepage concepts. Do not share publicly.
            None of these concepts are live in production.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-4xl font-bold tracking-tight">Design Lab</h2>
          <p className="text-gray-400 text-lg max-w-2xl">
            Five isolated cinematic homepage design concepts for NexaLearn. Review each concept by navigating to its dedicated preview route.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto border border-white/10 rounded-xl bg-white/[0.02]">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="p-4 font-medium text-gray-300">Concept</th>
                <th className="p-4 font-medium text-gray-300">Best For</th>
                <th className="p-4 font-medium text-gray-300">Motion Level</th>
                <th className="p-4 font-medium text-gray-300">Implementation Risk</th>
                <th className="p-4 font-medium text-gray-300">Main Libraries</th>
                <th className="p-4 font-medium text-gray-300">Preview Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {concepts.map((c) => (
                <tr key={c.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 font-medium text-white">{c.name}</td>
                  <td className="p-4 text-gray-400">{c.bestFor}</td>
                  <td className="p-4 text-gray-400">{c.motionLevel}</td>
                  <td className="p-4 text-gray-400">{c.risk}</td>
                  <td className="p-4 text-gray-400">{c.mainLibraries}</td>
                  <td className="p-4">
                    <Link
                      href={`/${locale}/design-lab/${c.route}`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all"
                    >
                      View Preview
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
