import { motion } from 'motion/react';
import { EditableText } from './EditableText';
import { TeacherPhotoFrame } from './TeacherPhotoFrame';

interface IntroSectionProps {
  heading: string;
  photoCaption: string;
  paragraphs: string[];
  photoDataUrl: string | null;
  onPhotoChange: (dataUrl: string | null) => void;
  isEditing: boolean;
  onUpdateHeading: (next: string) => void;
  onUpdateCaption: (next: string) => void;
  onUpdateParagraph: (index: number, next: string) => void;
}

export function IntroSection({
  heading,
  photoCaption,
  paragraphs,
  photoDataUrl,
  onPhotoChange,
  isEditing,
  onUpdateHeading,
  onUpdateCaption,
  onUpdateParagraph,
}: IntroSectionProps) {
  return (
    <section
      id="tribute"
      className="relative scroll-mt-20 border-t border-[#E5C76B]/10 bg-gradient-to-b from-[#070B16] via-[#0B1222] to-[#080D1B] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: Vardhan Sir's Cinematic Portrait Frame */}
          <div className="lg:col-span-4">
            <TeacherPhotoFrame
              photoDataUrl={photoDataUrl}
              onPhotoChange={onPhotoChange}
              caption={photoCaption}
              onCaptionChange={onUpdateCaption}
              isEditing={isEditing}
            />
          </div>

          {/* Right Column: Editorial Tribute Copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8"
          >
            <p className="text-xs font-medium tracking-[0.22em] text-[#E5C76B] uppercase">
              01 · Introduction
            </p>

            <EditableText
              as="h2"
              value={heading}
              isEditing={isEditing}
              onChange={onUpdateHeading}
              ariaLabel="Introduction section heading"
              className="font-editorial mt-4 text-4xl leading-[1.12] font-medium text-[#F7F3E9] sm:text-5xl"
            />

            <div
              aria-hidden="true"
              className="my-7 h-px w-20 bg-gradient-to-r from-[#E5C76B]/70 to-transparent"
            />

            <div className="max-w-2xl space-y-5 text-base leading-[1.8] tracking-[0.01em] text-[#D8D0C0] sm:text-[17px]">
              {paragraphs.map((paragraph, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.6, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                >
                  <EditableText
                    as="p"
                    value={paragraph}
                    isEditing={isEditing}
                    multiline
                    onChange={(val) => onUpdateParagraph(idx, val)}
                    ariaLabel={`Introduction paragraph ${idx + 1}`}
                    className={
                      idx === 0
                        ? 'font-editorial text-2xl font-medium italic text-[#E5C76B]'
                        : idx === paragraphs.length - 1
                          ? 'font-medium text-[#F7F3E9]'
                          : ''
                    }
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
