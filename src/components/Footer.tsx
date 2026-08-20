import { navLinks } from '@/lib/data';
import { Camera, Instagram, Mail, Phone } from 'lucide-react';

export default function Footer() {
  const handleClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-ink-700/50 bg-ink-900">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold-400/40 bg-gold-400/10">
                <Camera className="h-4.5 w-4.5 text-gold-300" />
              </span>
              <span className="font-display text-xl font-semibold tracking-tight text-ink-100">
                LUUMA<span className="gold-text">.</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-300">
              Premium photobooth experiences for weddings, corporate
              activations, and brand events. Available nationwide.
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-600 text-ink-300 transition-colors hover:border-gold-400/50 hover:text-gold-300"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="mailto:hello@luuma.studio"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-600 text-ink-300 transition-colors hover:border-gold-400/50 hover:text-gold-300"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
              <a
                href="tel:+15551234567"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-600 text-ink-300 transition-colors hover:border-gold-400/50 hover:text-gold-300"
                aria-label="Phone"
              >
                <Phone className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gold-300">
              Navigate
            </h4>
            <ul className="mt-4 space-y-3">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleClick(link.id)}
                    className="text-sm text-ink-300 transition-colors hover:text-gold-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gold-300">
              Contact
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-ink-300">
              <li>hello@luuma.studio</li>
              <li>+1 (555) 123-4567</li>
              <li>Los Angeles · New York</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-ink-700/50 pt-8 sm:flex-row">
          <p className="text-xs text-ink-400">
            © {new Date().getFullYear()} LUUMA Studio. All rights reserved.
          </p>
          <p className="text-xs text-ink-400">
            Crafted for unforgettable moments.
          </p>
        </div>
      </div>
    </footer>
  );
}
