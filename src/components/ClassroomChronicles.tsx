import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, RotateCcw } from 'lucide-react';
import type { MemoryCardData } from '../data/tributeContent';
import { EditableText } from './EditableText';

interface ClassroomChroniclesProps {
  heading: string;
  subheading: string;
  memories: MemoryCardData[];
  isEditing: boolean;
  onUpdateHeading: (next: string) => void;
  onUpdateMemory: (index: number, field: keyof MemoryCardData, next: string) => void;
}

export function ClassroomChronicles({
  heading,
  subheading,
  memories,
  isEditing,
  onUpdateHeading,
  onUpdateMemory,
}: ClassroomChroniclesProps) {
  const [revealedIds, setRevealedIds] = useState<Record<string, boolean>>({});
  const [smileCounts, setSmileCounts] = useState<Record<string, number>>({});

  const toggleReveal = (id: string) => {
    if (isEditing) return;
    setRevealedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSmile = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSmileCounts((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  };

  return (
    <section
      id="memories"
      className="relative scroll-mt-20 border-t border-[#E5C76B]/10 bg-[#080D1B] py-24 sm:py-32"
    >
      {/* Subtle warm radial atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(229, 199, 107, 0.08) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <p className="text-xs font-medium tracking-[0.22em] text-[#E5C76B] uppercase">
            02 · Classroom Chronicles
          </p>

          <EditableText
            as="h2"
            value={heading}
            isEditing={isEditing}
            onChange={onUpdateHeading}
            ariaLabel="Classroom chronicles heading"
            className="font-editorial mt-4 text-4xl leading-[1.12] font-medium text-[#F7F3E9] sm:text-5xl"
          />

          <p className="mt-4 text-base leading-relaxed text-[#B8B0A0] sm:text-lg">{subheading}</p>
        </motion.div>

        {/* Balanced 5-card interactive grid: 3 on top on lg, 2 wider centered/balanced below */}
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-6">
          {memories.map((memory, idx) => {
            const isRevealed = Boolean(revealedIds[memory.id]);
            const smiles = smileCounts[memory.id] ?? 0;
            // First 3 cards span 2 columns each (3 per row), last 2 span 3 columns each (2 per row) on lg
            const colSpanClass = idx < 3 ? 'lg:col-span-2' : 'lg:col-span-3';

            return (
              <motion.article
                key={memory.id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.65, delay: idx * 0.07, ease: [0.16, 1, 0.3, 1] }}
                className={`${colSpanClass} group relative flex flex-col justify-between rounded-2xl border border-[#E5C76B]/16 bg-[#0E1629]/75 p-7 backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:border-[#E5C76B]/40 hover:bg-[#111A30]/90`}
              >
                <div>
                  {/* Quiet editorial metadata line (no pill badges) */}
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs font-medium tracking-[0.18em] text-[#E5C76B] tabular-nums">
                      Memory {memory.number} · {memory.interactiveLabel}
                    </span>
                    <span className="text-xl" aria-hidden="true">
                      {memory.emoji}
                    </span>
                  </div>

                  <EditableText
                    as="h3"
                    value={memory.title}
                    isEditing={isEditing}
                    onChange={(val) => onUpdateMemory(idx, 'title', val)}
                    ariaLabel={`Memory ${memory.number} title`}
                    className="font-editorial mt-4 text-2xl font-semibold text-[#F7F3E9] sm:text-[26px]"
                  />

                  <div className="mt-3 text-sm leading-[1.75] text-[#C8C0B0] sm:text-[15px]">
                    <EditableText
                      as="p"
                      value={memory.description}
                      isEditing={isEditing}
                      multiline
                      onChange={(val) => onUpdateMemory(idx, 'description', val)}
                      ariaLabel={`Memory ${memory.number} description`}
                    />
                  </div>

                  {/* Interactive Classroom Flashback Reveal */}
                  <AnimatePresence initial={false}>
                    {(isRevealed || isEditing) && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="mt-5 rounded-xl border border-[#E5C76B]/20 bg-[#070B16]/70 p-4 text-sm leading-relaxed text-[#E5C76B]/95 italic"
                      >
                        <EditableText
                          as="p"
                          value={memory.backstageNote}
                          isEditing={isEditing}
                          multiline
                          onChange={(val) => onUpdateMemory(idx, 'backstageNote', val)}
                          ariaLabel={`Memory ${memory.number} flashback note`}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Card Interactive Footer */}
                <div className="mt-6 flex items-center justify-between border-t border-white/8 pt-4">
                  <button
                    type="button"
                    onClick={() => toggleReveal(memory.id)}
                    aria-expanded={isRevealed}
                    className="inline-flex min-h-[38px] items-center gap-1.5 text-xs font-medium tracking-wide text-[#E5C76B] transition-colors hover:text-[#F4E2A1] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E5C76B]"
                  >
                    {isRevealed ? (
                      <>
                        <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Hide Flashback</span>
                      </>
                    ) : (
                      <>
                        <span>Relive Moment</span>
                        <ChevronRight
                          className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={(e) => handleSmile(e, memory.id)}
                    className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-[#C8C0B0] transition-colors hover:border-[#E5C76B]/40 hover:text-[#F7F3E9] cursor-pointer tabular-nums"
                    title="Send a smile for this memory"
                  >
                    <span aria-hidden="true">😄</span>
                    <span>{smiles > 0 ? `Smiled (${smiles})` : 'Relatable'}</span>
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
