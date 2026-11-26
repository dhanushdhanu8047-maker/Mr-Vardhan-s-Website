import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, MailOpen, RotateCcw } from 'lucide-react';
import { EditableText } from './EditableText';

interface DigitalEnvelopeProps {
  heading: string;
  buttonLabel: string;
  letterSalutation: string;
  letterParagraphs: string[];
  letterSignOff: string;
  letterAuthor: string;
  closingHeading: string;
  closingSubheading: string;
  isEditing: boolean;
  onTriggerBurst: () => void;
  onUpdateField: (
    field:
      | 'heading'
      | 'buttonLabel'
      | 'letterSalutation'
      | 'letterSignOff'
      | 'letterAuthor'
      | 'closingHeading'
      | 'closingSubheading',
    next: string,
  ) => void;
  onUpdateParagraph: (index: number, next: string) => void;
}

export function DigitalEnvelope({
  heading,
  buttonLabel,
  letterSalutation,
  letterParagraphs,
  letterSignOff,
  letterAuthor,
  closingHeading,
  closingSubheading,
  isEditing,
  onTriggerBurst,
  onUpdateField,
  onUpdateParagraph,
}: DigitalEnvelopeProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenLetter = () => {
    setIsOpen(true);
    onTriggerBurst();
  };

  return (
    <section
      id="letter"
      className="relative scroll-mt-20 overflow-hidden border-t border-[#E5C76B]/12 bg-gradient-to-b from-[#0A0F1D] via-[#070B16] to-[#050811] py-24 sm:py-36"
    >
      {/* Ambient golden glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 h-[540px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-45 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(229, 199, 107, 0.14) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <p className="text-xs font-medium tracking-[0.24em] text-[#E5C76B] uppercase">
          05 · Final Surprise
        </p>

        <EditableText
          as="h2"
          value={heading}
          isEditing={isEditing}
          onChange={(val) => onUpdateField('heading', val)}
          ariaLabel="Final surprise heading"
          className="font-editorial mt-4 text-4xl leading-[1.12] font-medium text-[#F7F3E9] sm:text-5xl"
        />

        {/* Interactive Digital Envelope */}
        <div className="mt-14 flex flex-col items-center">
          <AnimatePresence mode="wait">
            {!isOpen ? (
              <motion.div
                key="sealed-envelope"
                initial={{ opacity: 0, scale: 0.96, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: -18 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center"
              >
                {/* 3D Perspective Sealed Envelope */}
                <button
                  type="button"
                  onClick={handleOpenLetter}
                  aria-label="Open your letter from Dhanush"
                  className="group relative flex h-64 w-full max-w-[420px] min-w-[290px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border border-[#E5C76B]/35 bg-gradient-to-br from-[#131B30] via-[#0E1526] to-[#0A101E] p-8 shadow-[0_28px_70px_-15px_rgba(0,0,0,0.85)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#E5C76B]/70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E5C76B] sm:w-[420px]"
                >
                  {/* Envelope Top Flap Triangle Lines */}
                  <svg
                    viewBox="0 0 420 140"
                    aria-hidden="true"
                    className="pointer-events-none absolute top-0 left-0 w-full text-[#E5C76B]/28 transition-colors duration-300 group-hover:text-[#E5C76B]/55"
                  >
                    <path
                      d="M0 0 L210 124 L420 0"
                      fill="rgba(229, 199, 107, 0.04)"
                      stroke="currentColor"
                      strokeWidth="1.2"
                    />
                  </svg>

                  {/* Envelope Bottom Diagonal Lines */}
                  <svg
                    viewBox="0 0 420 120"
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-0 left-0 w-full text-[#E5C76B]/18"
                  >
                    <path
                      d="M0 120 L165 38 M420 120 L255 38"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                  </svg>

                  {/* Golden Wax Seal */}
                  <div className="relative z-10 mt-6 flex h-16 w-16 items-center justify-center rounded-full border border-[#F4E2A1]/60 bg-gradient-to-br from-[#E5C76B] to-[#9E7827] text-[#070B16] shadow-[0_8px_24px_rgba(229,199,107,0.45)] transition-transform duration-300 group-hover:scale-110">
                    <Heart className="h-6 w-6 fill-current" aria-hidden="true" />
                  </div>

                  <p className="font-editorial relative z-10 mt-5 text-xl italic text-[#F7F3E9]">
                    For Vardhan Sir
                  </p>
                  <p className="relative z-10 mt-1 text-xs tracking-[0.2em] text-[#E5C76B]/85 uppercase">
                    From Dhanush
                  </p>
                </button>

                {/* Primary Open Letter Button */}
                <button
                  type="button"
                  onClick={handleOpenLetter}
                  className="mt-8 inline-flex min-h-[48px] items-center gap-2.5 rounded-xl border border-[#E5C76B]/60 bg-gradient-to-b from-[#E5C76B] to-[#C8A248] px-8 py-3.5 text-base font-semibold tracking-wide text-[#070B16] shadow-[0_12px_36px_-8px_rgba(229,199,107,0.4)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_42px_-6px_rgba(229,199,107,0.55)] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E5C76B]"
                >
                  <MailOpen className="h-4 w-4" aria-hidden="true" />
                  <span>{buttonLabel}</span>
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="opened-letter"
                initial={{ opacity: 0, y: 36, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-2xl"
              >
                {/* Opened Letter Card */}
                <div className="relative overflow-hidden rounded-2xl border border-[#E5C76B]/35 bg-gradient-to-b from-[#12192D] to-[#0B1120] p-8 text-left shadow-[0_32px_80px_-20px_rgba(0,0,0,0.85)] sm:p-12">
                  {/* Delicate gold inner border */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-3 rounded-xl border border-[#E5C76B]/15"
                  />

                  <div className="relative z-10 space-y-5">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.55, delay: 0.15 }}
                    >
                      <EditableText
                        as="p"
                        value={letterSalutation}
                        isEditing={isEditing}
                        onChange={(val) => onUpdateField('letterSalutation', val)}
                        ariaLabel="Letter salutation"
                        className="font-editorial text-3xl font-medium italic text-[#E5C76B]"
                      />
                    </motion.div>

                    <div className="space-y-4 pt-2 text-base leading-[1.85] text-[#E8E1D3] sm:text-[17px]">
                      {letterParagraphs.map((paragraph, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.6,
                            delay: 0.28 + idx * 0.14,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        >
                          <EditableText
                            as="p"
                            value={paragraph}
                            isEditing={isEditing}
                            multiline
                            onChange={(val) => onUpdateParagraph(idx, val)}
                            ariaLabel={`Letter paragraph ${idx + 1}`}
                          />
                        </motion.div>
                      ))}
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.65,
                        delay: 0.28 + letterParagraphs.length * 0.14,
                      }}
                      className="border-t border-[#E5C76B]/15 pt-6"
                    >
                      <EditableText
                        as="p"
                        value={letterSignOff}
                        isEditing={isEditing}
                        onChange={(val) => onUpdateField('letterSignOff', val)}
                        ariaLabel="Letter sign-off"
                        className="text-sm tracking-wide text-[#B8B0A0]"
                      />
                      <EditableText
                        as="p"
                        value={letterAuthor}
                        isEditing={isEditing}
                        onChange={(val) => onUpdateField('letterAuthor', val)}
                        ariaLabel="Letter author"
                        className="font-editorial mt-1 text-3xl font-semibold italic text-[#E5C76B]"
                      />
                    </motion.div>
                  </div>
                </div>

                {/* Controls below letter */}
                <div className="mt-6 flex items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-[#E5C76B]/25 bg-[#0D1426]/80 px-4 py-2 text-xs font-medium text-[#C8C0B0] transition-colors hover:border-[#E5C76B]/55 hover:text-[#E5C76B] cursor-pointer"
                  >
                    <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Fold &amp; Replay Envelope</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Final Closing Tribute Screen */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-28 border-t border-[#E5C76B]/12 pt-20"
        >
          <EditableText
            as="h3"
            value={closingHeading}
            isEditing={isEditing}
            onChange={(val) => onUpdateField('closingHeading', val)}
            ariaLabel="Closing tribute heading"
            className="font-editorial text-4xl font-semibold tracking-[0.06em] text-[#E5C76B] sm:text-5xl lg:text-6xl"
          />

          <EditableText
            as="p"
            value={closingSubheading}
            isEditing={isEditing}
            multiline
            onChange={(val) => onUpdateField('closingSubheading', val)}
            ariaLabel="Closing tribute subheading"
            className="font-editorial mt-5 text-2xl font-normal italic text-[#F7F3E9]/90 sm:text-3xl"
          />
        </motion.div>
      </div>
    </section>
  );
}
