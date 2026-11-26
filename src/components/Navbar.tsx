import { useEffect, useState } from 'react';
import { Menu, Volume2, VolumeX, X } from 'lucide-react';

interface NavbarProps {
  isPlayingMusic: boolean;
  onToggleMusic: () => void;
  activeSection: string;
}

const NAV_LINKS = [
  { id: 'tribute', label: 'Introduction' },
  { id: 'memories', label: 'Memories' },
  { id: 'lessons', label: 'Lessons' },
  { id: 'heartfelt', label: 'Heartfelt' },
  { id: 'letter', label: 'Letter' },
];

export function Navbar({ isPlayingMusic, onToggleMusic, activeSection }: NavbarProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress(Math.min(1, Math.max(0, window.scrollY / docHeight)));
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="fixed top-0 right-0 left-0 z-40 border-b border-[#E5C76B]/12 bg-[#070B16]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-6 py-3.5">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-editorial text-xl font-semibold tracking-wide text-[#F7F3E9] transition-colors hover:text-[#E5C76B] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E5C76B]"
        >
          Vardhan Sir
        </a>

        {/* Zone 2: 5 concise single-line text links */}
        <nav aria-label="Section navigation" className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.id);
                }}
                className={`relative py-1 text-sm font-medium tracking-wide transition-colors duration-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E5C76B] ${
                  isActive ? 'text-[#E5C76B]' : 'text-[#C8C0B0] hover:text-[#F7F3E9]'
                }`}
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className={`absolute right-0 bottom-0 left-0 h-px bg-[#E5C76B] transition-transform duration-200 origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action + mobile drawer trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onToggleMusic}
            aria-pressed={isPlayingMusic}
            className={`inline-flex min-h-[40px] items-center gap-2 rounded-lg border px-4 py-2 text-xs font-medium tracking-wide transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E5C76B] ${
              isPlayingMusic
                ? 'border-[#E5C76B]/60 bg-[#E5C76B]/15 text-[#E5C76B]'
                : 'border-[#E5C76B]/25 bg-[#0D1426]/80 text-[#F7F3E9] hover:border-[#E5C76B]/50 hover:text-[#E5C76B]'
            }`}
          >
            {isPlayingMusic ? (
              <Volume2 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            ) : (
              <VolumeX className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            )}
            <span>{isPlayingMusic ? 'Pause Music' : 'Play Music'}</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#E5C76B]/20 text-[#F7F3E9] transition-colors hover:border-[#E5C76B]/50 md:hidden cursor-pointer"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <nav
          aria-label="Mobile section navigation"
          className="border-t border-[#E5C76B]/12 bg-[#070B16]/95 px-6 py-4 backdrop-blur-lg md:hidden"
        >
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.id);
                }}
                className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  activeSection === link.id
                    ? 'bg-[#E5C76B]/10 text-[#E5C76B]'
                    : 'text-[#C8C0B0] hover:bg-white/5 hover:text-[#F7F3E9]'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      )}

      {/* Subtle reading progress hairline */}
      <div
        aria-hidden="true"
        className="h-[2px] w-full origin-left bg-gradient-to-r from-[#C5A059] via-[#E5C76B] to-[#F4E2A1] transition-transform duration-150"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />
    </header>
  );
}
