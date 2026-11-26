import { motion } from 'motion/react';
import { EditableText } from './EditableText';

interface EmotionalMomentProps {
  heading: string;
  stanzas: string[][];
  isEditing: boolean;
  onUpdateHeading: (next: string) => void;
  onUpdateLine: (stanzaIdx: number, lineIdx: number, next: string) => void;
}

export function EmotionalMoment({
  heading,
  stanzas,
  isEditing,
  onUpdateHeading,
  onUpdateLine,
}: EmotionalMomentProps) {
  return (
    <section
      id="heartfelt"
      className="relative scroll-mt-20 overflow-hidden border-t border-[#E5C76B]/10 bg-[#0A0F1D] py-28 sm:py-36"
    >
      {/* Soft warm golden candlelight radial backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(229, 199, 107, 0.12) 0%, rgba(197, 160, 89, 0.04) 45%, transparent 72%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs font-medium tracking-[0.24em] text-[#E5C76B] uppercase">
            04 · A Little Emotional Moment
          </p>

          <EditableText
            as="h2"
            value={heading}
            isEditing={isEditing}
            onChange={onUpdateHeading}
            ariaLabel="Emotional section heading"
            className="font-editorial mt-5 text-4xl leading-[1.12] font-medium text-[#F7F3E9] sm:text-5xl lg:text-[54px]"
          />

          <div
            aria-hidden="true"
            className="mx-auto my-10 h-px w-24 bg-gradient-to-r from-transparent via-[#E5C76B]/60 to-transparent"
          />
        </motion.div>

        {/* Gradual Stanza-by-Stanza Storytelling Reveal */}
        <div className="space-y-9">
          {stanzas.map((stanza, sIdx) => {
            const isSalutation = sIdx === 0;
            const isClosing = sIdx === stanzas.length - 1;
            const isHighlightedQuote = sIdx === 2 || sIdx === 6;

            return (
              <motion.div
                key={sIdx}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{
                  duration: 0.85,
                  delay: 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="space-y-2"
              >
                {stanza.map((line, lIdx) => (
                  <EditableText
                    key={lIdx}
                    as="p"
                    value={line}
                    isEditing={isEditing}
                    multiline
                    onChange={(val) => onUpdateLine(sIdx, lIdx, val)}
                    ariaLabel={`Emotional moment stanza ${sIdx + 1} line ${lIdx + 1}`}
                    className={
                      isSalutation
                        ? 'font-editorial text-2xl font-medium italic text-[#E5C76B] sm:text-3xl'
                        : isClosing
                          ? 'font-editorial pt-2 text-2xl font-semibold text-[#E5C76B] sm:text-3xl'
                          : isHighlightedQuote
                            ? 'font-editorial text-2xl leading-relaxed font-normal italic text-[#F7F3E9] sm:text-[28px]'
                            : 'text-base leading-[1.85] text-[#D8D0C0] sm:text-lg'
                    }
                  />
                ))}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
