import { motion } from 'motion/react';
import { ChevronDown, Volume2, VolumeX } from 'lucide-react';
import { EditableText } from './EditableText';

interface HeroSectionProps {
  eyebrow: string;
  heading: string;
  subtitle: string;
  supporting: string;
  ctaLabel: string;
  isEditing: boolean;
  isPlayingMusic: boolean;
  onToggleMusic: () => void;
  onUpdateField: (field: 'eyebrow' | 'heading' | 'subtitle' | 'supporting' | 'ctaLabel', value: string) => void;
  onOpenSurprise: () => void;
}

export function HeroSection({
  eyebrow,
  heading,
  subtitle,
  supporting,
  ctaLabel,
  isEditing,
  isPlayingMusic,
  onToggleMusic,
  onUpdateField,
  onOpenSurprise,
}: HeroSectionProps) {
  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-16"
    >
      {/* Atmospheric midnight navy + warm champagne radial glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 42%, rgba(229, 199, 107, 0.09) 0%, rgba(16, 28, 56, 0.45) 45%, rgba(7, 11, 22, 0.98) 100%)',
        }}
      />

      {/* Delicate concentric hairline ring accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 h-[540px] w-[540px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#E5C76B]/8 sm:h-[680px] sm:w-[680px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#E5C76B]/10 sm:h-[500px] sm:w-[500px]"
      />

      <div className="relative z-20 mx-auto flex max-w-3xl flex-col items-center text-center">
        {/* Small eyebrow heading */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6"
        >
          <EditableText
            as="p"
            value={eyebrow}
            isEditing={isEditing}
            onChange={(val) => onUpdateField('eyebrow', val)}
            ariaLabel="Hero small heading"
            className="text-xs font-medium tracking-[0.26em] text-[#E5C76B] sm:text-sm"
          />
        </motion.div>

        {/* Main display heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
        >
          <EditableText
            as="h1"
            value={heading}
            isEditing={isEditing}
            onChange={(val) => onUpdateField('heading', val)}
            ariaLabel="Hero main heading"
            className="font-editorial text-5xl leading-[1.08] font-medium tracking-tight text-[#F7F3E9] sm:text-6xl lg:text-7xl"
          />
        </motion.div>

        {/* Gold hairline separator */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="my-8 h-px w-24 bg-gradient-to-r from-transparent via-[#E5C76B]/70 to-transparent"
          aria-hidden="true"
        />

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <EditableText
            as="p"
            value={subtitle}
            isEditing={isEditing}
            multiline
            onChange={(val) => onUpdateField('subtitle', val)}
            ariaLabel="Hero subtitle"
            className="font-editorial text-2xl leading-relaxed font-normal italic text-[#F7F3E9]/95 sm:text-3xl"
          />
        </motion.div>

        {/* Supporting message */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 max-w-xl"
        >
          <EditableText
            as="p"
            value={supporting}
            isEditing={isEditing}
            multiline
            onChange={(val) => onUpdateField('supporting', val)}
            ariaLabel="Hero supporting message"
            className="text-base leading-relaxed tracking-[0.01em] text-[#C8C0B0] sm:text-lg"
          />
        </motion.div>

        {/* Primary CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.62, ease: [0.16, 1, 0.3, 1] }}
          className="mt-11 flex flex-col items-center gap-5"
        >
          <button
            type="button"
            onClick={onOpenSurprise}
            className="group relative inline-flex min-h-[48px] items-center justify-center overflow-hidden rounded-xl border border-[#E5C76B]/60 bg-gradient-to-b from-[#E5C76B] to-[#C8A248] px-8 py-3.5 text-base font-semibold tracking-wide text-[#070B16] shadow-[0_12px_36px_-8px_rgba(229,199,107,0.45)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_42px_-6px_rgba(229,199,107,0.6)] active:translate-y-0 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E5C76B]"
          >
            <span
              aria-hidden="true"
              className="animate-gold-sheen pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-transparent via-white/45 to-transparent"
            />
            <span className="relative z-10">{ctaLabel}</span>
          </button>

          {/* Optional ambient music invitation (muted by default) */}
          <button
            type="button"
            onClick={onToggleMusic}
            className="inline-flex min-h-[40px] items-center gap-2 text-xs font-medium tracking-wide text-[#B8B0A0] transition-colors hover:text-[#E5C76B] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E5C76B]"
          >
            {isPlayingMusic ? (
              <Volume2 className="h-3.5 w-3.5 text-[#E5C76B]" aria-hidden="true" />
            ) : (
              <VolumeX className="h-3.5 w-3.5 text-[#B8B0A0]" aria-hidden="true" />
            )}
            <span>
              {isPlayingMusic
                ? 'Gentle background music is playing (Click to mute)'
                : 'Optional: Play gentle background music'}
            </span>
          </button>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#tribute"
        onClick={(e) => {
          e.preventDefault();
          onOpenSurprise();
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        aria-label="Scroll to introduction"
        className="absolute bottom-7 left-1/2 z-20 -translate-x-1/2 text-[#E5C76B] transition-opacity hover:opacity-100"
      >
        <ChevronDown className="h-5 w-5 animate-bounce" />
      </motion.a>
    </section>
  );
}
