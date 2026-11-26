import { useRef, useState } from 'react';
import type { ChangeEvent, DragEvent } from 'react';
import { motion } from 'motion/react';
import { Camera, ImagePlus, MoveVertical, Trash2 } from 'lucide-react';
import { EditableText } from './EditableText';

interface TeacherPhotoFrameProps {
  photoDataUrl: string | null;
  onPhotoChange: (dataUrl: string | null) => void;
  caption: string;
  onCaptionChange: (next: string) => void;
  isEditing: boolean;
}

export function TeacherPhotoFrame({
  photoDataUrl,
  onPhotoChange,
  caption,
  onCaptionChange,
  isEditing,
}: TeacherPhotoFrameProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [objectPosition, setObjectPosition] = useState<'top' | 'center'>('center');
  const [uploadError, setUploadError] = useState<string | null>(null);

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (JPG, PNG, or WebP).');
      return;
    }
    setUploadError(null);

    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : null;
      if (!result) return;

      // Preserve the exact photo without altering colors or facial features;
      // only downscale overly massive files (>1600px) cleanly so localStorage persists reliably.
      const img = new Image();
      img.onload = () => {
        const maxDim = 1400;
        if (img.width <= maxDim && img.height <= maxDim && result.length < 2_500_000) {
          onPhotoChange(result);
          return;
        }
        const scale = Math.min(maxDim / img.width, maxDim / img.height, 1);
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          onPhotoChange(result);
          return;
        }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        onPhotoChange(canvas.toDataURL('image/jpeg', 0.92));
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
    e.target.value = '';
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  return (
    <motion.figure
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto flex w-full max-w-[230px] flex-col sm:max-w-[250px]"
    >
      {/* Subtle golden backlight behind the frame */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-4 rounded-3xl opacity-70 blur-2xl"
        style={{
          background:
            'radial-gradient(circle at 50% 45%, rgba(229, 199, 107, 0.16) 0%, rgba(13, 20, 38, 0) 70%)',
        }}
      />

      {/* Outer Museum-Grade Cinematic Frame */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`group relative overflow-hidden rounded-2xl border bg-[#0D1426]/90 p-3 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.75)] transition-colors duration-300 ${
          isDragging ? 'border-[#E5C76B]' : 'border-[#E5C76B]/25'
        }`}
      >
        {/* Corner editorial hairline accents */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-2 left-2 h-4 w-4 border-t border-l border-[#E5C76B]/60"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-2 right-2 h-4 w-4 border-t border-r border-[#E5C76B]/60"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-2 left-2 h-4 w-4 border-b border-l border-[#E5C76B]/60"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-2 bottom-2 h-4 w-4 border-r border-b border-[#E5C76B]/60"
        />

        {/* Inner Portrait Canvas (3:4 portrait proportion) */}
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-[#090F1E]">
          {photoDataUrl ? (
            <>
              <img
                src={photoDataUrl}
                alt="Photograph of Vardhan Sir"
                referrerPolicy="no-referrer"
                className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.015] ${
                  objectPosition === 'top' ? 'object-top' : 'object-center'
                }`}
              />
              {/* Subtle vignette ONLY at the very bottom edge so Sir's face remains 100% untouched and crisp */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#070B16]/75 via-[#070B16]/20 to-transparent"
              />

              {/* Subtle Hover / Focus Controls to manage the uploaded photo */}
              <div className="absolute right-2 bottom-2 left-2 flex items-center justify-between gap-1.5 opacity-100 transition-opacity duration-200 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
                <button
                  type="button"
                  onClick={() => setObjectPosition((prev) => (prev === 'top' ? 'center' : 'top'))}
                  className="inline-flex min-h-[32px] items-center gap-1 rounded-md border border-[#E5C76B]/30 bg-[#070B16]/85 px-2 py-1 text-[11px] font-medium text-[#F7F3E9] backdrop-blur-md transition-colors hover:border-[#E5C76B]/70 hover:text-[#E5C76B] cursor-pointer"
                >
                  <MoveVertical className="h-3 w-3" aria-hidden="true" />
                  <span>{objectPosition === 'top' ? 'Top' : 'Center'}</span>
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex min-h-[32px] items-center gap-1 rounded-md border border-[#E5C76B]/30 bg-[#070B16]/85 px-2 py-1 text-[11px] font-medium text-[#F7F3E9] backdrop-blur-md transition-colors hover:border-[#E5C76B]/70 hover:text-[#E5C76B] cursor-pointer"
                  >
                    <Camera className="h-3 w-3" aria-hidden="true" />
                    <span>Change</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onPhotoChange(null)}
                    aria-label="Remove uploaded photo"
                    className="inline-flex min-h-[32px] items-center justify-center rounded-md border border-white/15 bg-[#070B16]/85 px-2 py-1 text-[11px] text-[#C8C0B0] backdrop-blur-md transition-colors hover:border-red-400/50 hover:text-red-300 cursor-pointer"
                  >
                    <Trash2 className="h-3 w-3" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center px-6 py-10 text-center">
              <div
                aria-hidden="true"
                className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-[#E5C76B]/30 bg-[#E5C76B]/8 text-[#E5C76B]"
              >
                <ImagePlus className="h-7 w-7" />
              </div>

              <p className="font-editorial text-2xl font-medium text-[#F7F3E9]">
                Vardhan Sir&apos;s Portrait
              </p>
              <p className="mt-2.5 max-w-xs text-sm leading-relaxed text-[#B8B0A0]">
                Upload Sir&apos;s real photograph here. It will appear naturally in this frame with
                no filters or alterations to his features.
              </p>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="mt-6 inline-flex min-h-[42px] items-center gap-2 rounded-lg border border-[#E5C76B]/45 bg-[#E5C76B]/14 px-5 py-2.5 text-sm font-medium text-[#E5C76B] transition-colors hover:bg-[#E5C76B]/22 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E5C76B]"
              >
                <Camera className="h-4 w-4" aria-hidden="true" />
                <span>Upload Photograph</span>
              </button>

              <p className="mt-3 text-xs text-[#B8B0A0]/75">
                or drag and drop an image file here
              </p>

              {uploadError && (
                <p role="alert" className="mt-3 text-xs text-amber-300">
                  {uploadError}
                </p>
              )}
            </div>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          aria-label="Upload Vardhan Sir photograph"
        />
      </div>

      {/* Editorial figure caption */}
      <figcaption className="mt-3.5 flex flex-col items-center gap-1 px-1 text-center text-xs tracking-wide text-[#B8B0A0]">
        <EditableText
          as="span"
          value={caption}
          isEditing={isEditing}
          onChange={onCaptionChange}
          ariaLabel="Photo caption"
          className="font-editorial text-base italic text-[#C8C0B0]"
        />
        <span className="text-[10px] tracking-[0.18em] text-[#E5C76B]/75 uppercase">
          Dedicated Portrait
        </span>
      </figcaption>
    </motion.figure>
  );
}
