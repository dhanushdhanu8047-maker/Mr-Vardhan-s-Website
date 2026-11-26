import { useCallback, useEffect, useState } from 'react';
import { Check, Pencil, RotateCcw } from 'lucide-react';
import { DEFAULT_TRIBUTE_CONTENT } from './data/tributeContent';
import type { MemoryCardData, TechPillarData, TributeContent } from './data/tributeContent';
import { ambientPiano } from './utils/audioEngine';
import { GoldenParticles } from './components/GoldenParticles';
import { CursorGlow } from './components/CursorGlow';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { IntroSection } from './components/IntroSection';
import { ClassroomChronicles } from './components/ClassroomChronicles';
import { ConfusionToConfidence } from './components/ConfusionToConfidence';
import { EmotionalMoment } from './components/EmotionalMoment';
import { DigitalEnvelope } from './components/DigitalEnvelope';

const STORAGE_CONTENT_KEY = 'vardhan_sir_tribute_content_v1';
const STORAGE_PHOTO_KEY = 'vardhan_sir_portrait_photo_v1';
const DEFAULT_TEACHER_PHOTO = '/assets/aistudio/IMG_20261126_103606_0daeb006.jpg';

const SECTION_IDS = ['tribute', 'memories', 'lessons', 'heartfelt', 'letter'] as const;

export default function App() {
  const [content, setContent] = useState<TributeContent>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CONTENT_KEY);
      if (saved) {
        return JSON.parse(saved) as TributeContent;
      }
    } catch {
      // Fallback to default copy if storage is unavailable
    }
    return DEFAULT_TRIBUTE_CONTENT;
  });

  const [photoDataUrl, setPhotoDataUrl] = useState<string | null>(() => {
    try {
      return localStorage.getItem(STORAGE_PHOTO_KEY) || DEFAULT_TEACHER_PHOTO;
    } catch {
      return DEFAULT_TEACHER_PHOTO;
    }
  });

  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [burstKey, setBurstKey] = useState(0);
  const [activeSection, setActiveSection] = useState<string>('tribute');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_CONTENT_KEY, JSON.stringify(content));
    } catch {
      // Ignore storage quota errors silently
    }
  }, [content]);

  useEffect(() => {
    try {
      if (photoDataUrl && photoDataUrl !== DEFAULT_TEACHER_PHOTO) {
        localStorage.setItem(STORAGE_PHOTO_KEY, photoDataUrl);
      } else if (photoDataUrl === DEFAULT_TEACHER_PHOTO) {
        localStorage.removeItem(STORAGE_PHOTO_KEY);
      } else {
        localStorage.setItem(STORAGE_PHOTO_KEY, '');
      }
    } catch {
      // Ignore storage quota errors silently
    }
  }, [photoDataUrl]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: '-35% 0px -45% 0px', threshold: 0.01 },
    );

    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    return () => {
      ambientPiano.stop();
    };
  }, []);

  const handleToggleMusic = useCallback(async () => {
    const nowPlaying = await ambientPiano.toggle();
    setIsPlayingMusic(nowPlaying);
  }, []);

  const triggerBurst = useCallback(() => {
    setBurstKey((prev) => prev + 1);
  }, []);

  const handleOpenSurprise = useCallback(() => {
    triggerBurst();
    const target = document.getElementById('tribute');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [triggerBurst]);

  const handleResetContent = () => {
    setContent(DEFAULT_TRIBUTE_CONTENT);
    setIsEditing(false);
  };

  return (
    <div className="relative min-h-screen bg-[#070B16] text-[#F7F3E9]">
      {/* Subtle atmospheric canvas & pointer aura */}
      <GoldenParticles burstKey={burstKey} />
      <CursorGlow />

      {/* Sticky 3-Zone Editorial Top Bar */}
      <Navbar
        isPlayingMusic={isPlayingMusic}
        onToggleMusic={handleToggleMusic}
        activeSection={activeSection}
      />

      {/* Main Appreciation Journey */}
      <main className="relative z-20">
        <HeroSection
          eyebrow={content.hero.eyebrow}
          heading={content.hero.heading}
          subtitle={content.hero.subtitle}
          supporting={content.hero.supporting}
          ctaLabel={content.hero.ctaLabel}
          isEditing={isEditing}
          isPlayingMusic={isPlayingMusic}
          onToggleMusic={handleToggleMusic}
          onUpdateField={(field, val) =>
            setContent((prev) => ({
              ...prev,
              hero: { ...prev.hero, [field]: val },
            }))
          }
          onOpenSurprise={handleOpenSurprise}
        />

        <IntroSection
          heading={content.intro.heading}
          photoCaption={content.intro.photoCaption}
          paragraphs={content.intro.paragraphs}
          photoDataUrl={photoDataUrl}
          onPhotoChange={setPhotoDataUrl}
          isEditing={isEditing}
          onUpdateHeading={(val) =>
            setContent((prev) => ({
              ...prev,
              intro: { ...prev.intro, heading: val },
            }))
          }
          onUpdateCaption={(val) =>
            setContent((prev) => ({
              ...prev,
              intro: { ...prev.intro, photoCaption: val },
            }))
          }
          onUpdateParagraph={(idx, val) =>
            setContent((prev) => {
              const paragraphs = [...prev.intro.paragraphs];
              paragraphs[idx] = val;
              return { ...prev, intro: { ...prev.intro, paragraphs } };
            })
          }
        />

        <ClassroomChronicles
          heading={content.chronicles.heading}
          subheading={content.chronicles.subheading}
          memories={content.chronicles.memories}
          isEditing={isEditing}
          onUpdateHeading={(val) =>
            setContent((prev) => ({
              ...prev,
              chronicles: { ...prev.chronicles, heading: val },
            }))
          }
          onUpdateMemory={(idx, field: keyof MemoryCardData, val) =>
            setContent((prev) => {
              const memories = [...prev.chronicles.memories];
              memories[idx] = { ...memories[idx], [field]: val };
              return { ...prev, chronicles: { ...prev.chronicles, memories } };
            })
          }
        />

        <ConfusionToConfidence
          heading={content.confidence.heading}
          pillars={content.confidence.pillars}
          paragraphs={content.confidence.paragraphs}
          isEditing={isEditing}
          onUpdateHeading={(val) =>
            setContent((prev) => ({
              ...prev,
              confidence: { ...prev.confidence, heading: val },
            }))
          }
          onUpdatePillar={(idx, field: keyof TechPillarData, val) =>
            setContent((prev) => {
              const pillars = [...prev.confidence.pillars];
              pillars[idx] = { ...pillars[idx], [field]: val };
              return { ...prev, confidence: { ...prev.confidence, pillars } };
            })
          }
          onUpdateParagraph={(idx, val) =>
            setContent((prev) => {
              const paragraphs = [...prev.confidence.paragraphs];
              paragraphs[idx] = val;
              return { ...prev, confidence: { ...prev.confidence, paragraphs } };
            })
          }
        />

        <EmotionalMoment
          heading={content.emotional.heading}
          stanzas={content.emotional.stanzas}
          isEditing={isEditing}
          onUpdateHeading={(val) =>
            setContent((prev) => ({
              ...prev,
              emotional: { ...prev.emotional, heading: val },
            }))
          }
          onUpdateLine={(sIdx, lIdx, val) =>
            setContent((prev) => {
              const stanzas = prev.emotional.stanzas.map((stanza, i) =>
                i === sIdx ? stanza.map((line, j) => (j === lIdx ? val : line)) : stanza,
              );
              return { ...prev, emotional: { ...prev.emotional, stanzas } };
            })
          }
        />

        <DigitalEnvelope
          heading={content.envelope.heading}
          buttonLabel={content.envelope.buttonLabel}
          letterSalutation={content.envelope.letterSalutation}
          letterParagraphs={content.envelope.letterParagraphs}
          letterSignOff={content.envelope.letterSignOff}
          letterAuthor={content.envelope.letterAuthor}
          closingHeading={content.envelope.closingHeading}
          closingSubheading={content.envelope.closingSubheading}
          isEditing={isEditing}
          onTriggerBurst={triggerBurst}
          onUpdateField={(field, val) =>
            setContent((prev) => ({
              ...prev,
              envelope: { ...prev.envelope, [field]: val },
            }))
          }
          onUpdateParagraph={(idx, val) =>
            setContent((prev) => {
              const letterParagraphs = [...prev.envelope.letterParagraphs];
              letterParagraphs[idx] = val;
              return { ...prev, envelope: { ...prev.envelope, letterParagraphs } };
            })
          }
        />
      </main>

      {/* Quiet Editorial Footer with Optional Personalization Controls */}
      <footer className="relative z-20 border-t border-[#E5C76B]/12 bg-[#050811] py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-center sm:flex-row sm:text-left">
          <p className="text-xs tracking-wide text-[#B8B0A0]">
            A little website. A lot of memories. Endless gratitude. · Crafted by Dhanush for Vardhan Sir
          </p>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsEditing((prev) => !prev)}
              className={`inline-flex min-h-[38px] items-center gap-1.5 rounded-lg border px-3.5 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                isEditing
                  ? 'border-[#E5C76B]/60 bg-[#E5C76B]/15 text-[#E5C76B]'
                  : 'border-white/12 bg-white/5 text-[#C8C0B0] hover:border-[#E5C76B]/40 hover:text-[#F7F3E9]'
              }`}
            >
              {isEditing ? (
                <>
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Done Editing</span>
                </>
              ) : (
                <>
                  <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Edit Text</span>
                </>
              )}
            </button>

            {isEditing && (
              <button
                type="button"
                onClick={handleResetContent}
                className="inline-flex min-h-[38px] items-center gap-1.5 rounded-lg border border-white/12 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-[#C8C0B0] transition-colors hover:border-amber-400/40 hover:text-amber-200 cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Reset Text</span>
              </button>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
