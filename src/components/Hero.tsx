import { useEffect, useState } from 'react';
import { ArrowDown, Sparkles, Scan, Camera } from 'lucide-react';
import { heroImages } from '@/lib/data';

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background images */}
      <div className="absolute inset-0">
        {heroImages.map((src, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-[1500ms] ${
              i === activeIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={src}
              alt=""
              className="h-full w-full object-cover animate-slow-zoom"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/70 via-ink-950/50 to-ink-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/80 via-transparent to-ink-950/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pt-24">
        <div className="max-w-3xl">
          <div
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/10 px-4 py-1.5 opacity-0 animate-fade-up"
            style={{ animationDelay: '0.2s' }}
          >
            <Sparkles className="h-3.5 w-3.5 text-gold-300" />
            <span className="text-xs font-medium uppercase tracking-widest text-gold-200">
              Premium Photobooth Experiences
            </span>
          </div>

          <h1
            className="font-display text-5xl font-light leading-[1.05] tracking-tight text-ink-100 sm:text-6xl md:text-7xl lg:text-8xl opacity-0 animate-fade-up text-balance"
            style={{ animationDelay: '0.4s' }}
          >
            Capture the
            <br />
            <span className="gold-text font-medium italic">extraordinary</span>
          </h1>

          <p
            className="mt-8 max-w-xl text-lg leading-relaxed text-ink-200 opacity-0 animate-fade-up"
            style={{ animationDelay: '0.6s' }}
          >
            Luxury photobooth rentals for high-end weddings, corporate
            activations, and brand events. AI-powered transformations,
            360-degree video capture, and digital-first sharing — designed to
            make every moment unforgettable.
          </p>

          <div
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center opacity-0 animate-fade-up"
            style={{ animationDelay: '0.8s' }}
          >
            <button
              onClick={() =>
                document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gold-400 px-8 py-4 text-sm font-semibold text-ink-950 transition-all hover:bg-gold-300 hover:shadow-xl hover:shadow-gold-400/30"
            >
              Book Your Experience
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </button>
            <button
              onClick={scrollToServices}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-ink-500 px-8 py-4 text-sm font-semibold text-ink-100 transition-all hover:border-gold-400/50 hover:text-gold-200"
            >
              Explore Packages
            </button>
          </div>

          {/* Feature pills */}
          <div
            className="mt-14 flex flex-wrap gap-6 opacity-0 animate-fade-up"
            style={{ animationDelay: '1s' }}
          >
            {[
              { icon: Camera, label: 'Editorial Booths' },
              { icon: Scan, label: '360 Video Capture' },
              { icon: Sparkles, label: 'AI Transformations' },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2.5 text-sm text-ink-300"
              >
                <item.icon className="h-4 w-4 text-gold-400" />
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Image indicators */}
      <div className="absolute bottom-10 right-6 z-10 hidden gap-2 md:flex">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`h-1 rounded-full transition-all duration-500 ${
              i === activeIndex
                ? 'w-10 bg-gold-400'
                : 'w-5 bg-ink-500 hover:bg-ink-400'
            }`}
            aria-label={`Show image ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
