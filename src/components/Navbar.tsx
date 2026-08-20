import { useEffect, useState } from 'react';
import { Menu, X, Camera } from 'lucide-react';
import { navLinks } from '@/lib/data';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass border-b border-ink-700/50 py-3' : 'py-5'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2.5 group"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold-400/40 bg-gold-400/10 transition-colors group-hover:bg-gold-400/20">
            <Camera className="h-4.5 w-4.5 text-gold-300" />
          </span>
          <span className="font-display text-xl font-semibold tracking-tight text-ink-100">
            LUUMA<span className="gold-text">.</span>
          </span>
        </button>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleClick(link.id)}
              className="text-sm font-medium text-ink-200 transition-colors hover:text-gold-300"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleClick('booking')}
            className="rounded-full bg-gold-400 px-6 py-2.5 text-sm font-semibold text-ink-950 transition-all hover:bg-gold-300 hover:shadow-lg hover:shadow-gold-400/30"
          >
            Get a Quote
          </button>
        </div>

        <button
          className="text-ink-100 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="glass mx-4 mt-3 rounded-2xl border border-ink-700/50 p-6 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleClick(link.id)}
                className="text-left text-base font-medium text-ink-200 transition-colors hover:text-gold-300"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleClick('booking')}
              className="rounded-full bg-gold-400 px-6 py-3 text-sm font-semibold text-ink-950"
            >
              Get a Quote
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
