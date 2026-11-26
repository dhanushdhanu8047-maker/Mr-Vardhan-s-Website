import { useState } from 'react';
import { motion } from 'motion/react';
import { Code2, Layers, Palette, Sparkles } from 'lucide-react';
import type { TechPillarData } from '../data/tributeContent';
import { EditableText } from './EditableText';

interface ConfusionToConfidenceProps {
  heading: string;
  pillars: TechPillarData[];
  paragraphs: string[];
  isEditing: boolean;
  onUpdateHeading: (next: string) => void;
  onUpdatePillar: (index: number, field: keyof TechPillarData, next: string) => void;
  onUpdateParagraph: (index: number, next: string) => void;
}

const PILLAR_ICONS = {
  html: Code2,
  css: Palette,
  js: Sparkles,
  web: Layers,
};

export function ConfusionToConfidence({
  heading,
  pillars,
  paragraphs,
  isEditing,
  onUpdateHeading,
  onUpdatePillar,
  onUpdateParagraph,
}: ConfusionToConfidenceProps) {
  const [selectedId, setSelectedId] = useState<TechPillarData['id']>('web');
  const activePillar = pillars.find((p) => p.id === selectedId) ?? pillars[3];

  return (
    <section
      id="lessons"
      className="relative scroll-mt-20 border-t border-[#E5C76B]/10 bg-gradient-to-b from-[#080D1B] via-[#0E1528] to-[#0A101E] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <p className="text-xs font-medium tracking-[0.22em] text-[#E5C76B] uppercase">
            03 · From Confusion To Confidence
          </p>

          <EditableText
            as="h2"
            value={heading}
            isEditing={isEditing}
            onChange={onUpdateHeading}
            ariaLabel="Confidence section heading"
            className="font-editorial mt-4 text-4xl leading-[1.12] font-medium text-[#F7F3E9] sm:text-5xl"
          />
        </motion.div>

        {/* Four Elegant Animated Web Technology Cards */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, idx) => {
            const Icon = PILLAR_ICONS[pillar.id];
            const isSelected = pillar.id === selectedId;
            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.65, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => {
                  if (!isEditing) setSelectedId(pillar.id);
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if ((e.key === 'Enter' || e.key === ' ') && !isEditing) {
                    e.preventDefault();
                    setSelectedId(pillar.id);
                  }
                }}
                aria-pressed={isSelected}
                className={`group flex cursor-pointer flex-col justify-between rounded-2xl border p-6 text-left transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E5C76B] ${
                  isSelected
                    ? 'border-[#E5C76B]/60 bg-[#131C33] shadow-[0_18px_40px_-15px_rgba(229,199,107,0.22)]'
                    : 'border-[#E5C76B]/16 bg-[#0D1426]/70 hover:-translate-y-1 hover:border-[#E5C76B]/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium tracking-[0.14em] text-[#E5C76B]">
                      {pillar.caption}
                    </span>
                    <Icon
                      className={`h-4 w-4 transition-colors ${
                        isSelected ? 'text-[#E5C76B]' : 'text-[#B8B0A0] group-hover:text-[#E5C76B]'
                      }`}
                      aria-hidden="true"
                    />
                  </div>

                  <EditableText
                    as="h3"
                    value={pillar.title}
                    isEditing={isEditing}
                    onChange={(val) => onUpdatePillar(idx, 'title', val)}
                    ariaLabel={`${pillar.title} title`}
                    className="font-editorial mt-4 text-3xl font-semibold text-[#F7F3E9]"
                  />

                  <div className="mt-2.5 text-sm leading-relaxed text-[#C8C0B0]">
                    <EditableText
                      as="p"
                      value={pillar.subtitle}
                      isEditing={isEditing}
                      multiline
                      onChange={(val) => onUpdatePillar(idx, 'subtitle', val)}
                      ariaLabel={`${pillar.title} subtitle`}
                    />
                  </div>
                </div>

                <div className="mt-6 border-t border-white/8 pt-3.5 text-xs leading-relaxed text-[#B8B0A0]">
                  <EditableText
                    as="p"
                    value={pillar.lessonNote}
                    isEditing={isEditing}
                    multiline
                    onChange={(val) => onUpdatePillar(idx, 'lessonNote', val)}
                    ariaLabel={`${pillar.title} lesson note`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Interactive Concept Demonstration + Main Message */}
        <div className="mt-14 grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Interactive Live Concept Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="rounded-2xl border border-[#E5C76B]/20 bg-[#070B16]/90 p-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs font-medium tracking-[0.16em] text-[#E5C76B] uppercase">
                  How You Connected It · {activePillar.title}
                </span>
                <span className="text-xs text-[#B8B0A0]">Click cards above</span>
              </div>

              <div className="mt-5 min-h-[168px] flex flex-col justify-center">
                {selectedId === 'html' && (
                  <div className="space-y-2.5 text-sm text-[#C8C0B0]">
                    <p className="font-mono text-xs text-[#E5C76B]/90">
                      &lt;article class=&quot;lesson&quot;&gt;
                    </p>
                    <div className="ml-4 space-y-1.5 border-l border-[#E5C76B]/25 pl-4">
                      <p className="font-mono text-xs text-[#F7F3E9]">
                        &lt;h1&gt;Clear Foundations&lt;/h1&gt;
                      </p>
                      <p className="font-mono text-xs text-[#B8B0A0]">
                        &lt;p&gt;Every tag has a purpose.&lt;/p&gt;
                      </p>
                    </div>
                    <p className="font-mono text-xs text-[#E5C76B]/90">&lt;/article&gt;</p>
                  </div>
                )}

                {selectedId === 'css' && (
                  <div className="space-y-3">
                    <div className="rounded-xl border border-[#E5C76B]/35 bg-gradient-to-r from-[#131C33] to-[#1A2440] p-4">
                      <p className="font-editorial text-xl italic text-[#E5C76B]">
                        Typography, spacing &amp; harmony
                      </p>
                      <p className="mt-1 text-xs text-[#C8C0B0]">
                        From plain boxes to expressive visual experiences.
                      </p>
                    </div>
                    <p className="font-mono text-xs text-[#B8B0A0]">
                      color: ivory; accent: champagne-gold;
                    </p>
                  </div>
                )}

                {selectedId === 'js' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between rounded-xl border border-[#E5C76B]/25 bg-[#0D1426] p-4">
                      <div>
                        <p className="text-sm font-medium text-[#F7F3E9]">
                          Event Listener Active
                        </p>
                        <p className="mt-0.5 text-xs text-[#B8B0A0]">
                          Code responding smoothly to human interaction.
                        </p>
                      </div>
                      <span className="font-editorial text-lg italic text-[#E5C76B]">
                        onClick()
                      </span>
                    </div>
                    <p className="font-mono text-xs text-[#B8B0A0]">
                      understanding + practice =&gt; confidence;
                    </p>
                  </div>
                )}

                {selectedId === 'web' && (
                  <div className="space-y-3 text-center">
                    <div className="flex items-center justify-center gap-3 text-xs font-medium tracking-wider text-[#E5C76B]">
                      <span>HTML</span>
                      <span aria-hidden="true">+</span>
                      <span>CSS</span>
                      <span aria-hidden="true">+</span>
                      <span>JavaScript</span>
                    </div>
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-[#E5C76B]/40 to-transparent" />
                    <p className="font-editorial text-2xl italic text-[#F7F3E9]">
                      One living, breathing web page.
                    </p>
                    <p className="text-xs text-[#B8B0A0]">
                      And suddenly, everything in the syllabus made sense.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Heartfelt Explanation Tribute Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-5 lg:col-span-7"
          >
            {paragraphs.map((p, idx) => (
              <EditableText
                key={idx}
                as="p"
                value={p}
                isEditing={isEditing}
                multiline
                onChange={(val) => onUpdateParagraph(idx, val)}
                ariaLabel={`Confidence paragraph ${idx + 1}`}
                className={
                  idx === paragraphs.length - 1
                    ? 'font-editorial text-2xl font-medium italic text-[#E5C76B] sm:text-3xl'
                    : 'text-base leading-[1.8] text-[#D8D0C0] sm:text-[17px]'
                }
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
