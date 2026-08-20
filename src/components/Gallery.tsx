import { useState } from 'react';
import { galleryItems } from '@/lib/data';
import { useReveal } from '@/hooks/useReveal';
import { Play, X } from 'lucide-react';

export default function Gallery() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [filter, setFilter] = useState<string>('All');
  const [lightbox, setLightbox] = useState<string | null>(null);

  const tags = ['All', 'Wedding', 'Corporate', 'Editorial', 'Glam Booth', 'Brand Event', 'Gala'];
  const filtered =
    filter === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.tag === filter);

  return (
    <section id="gallery" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div
          ref={ref}
          className={`flex flex-col items-start justify-between gap-6 md:flex-row md:items-end transition-all duration-1000 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-300">
              Live Gallery
            </span>
            <h2 className="mt-4 font-display text-4xl font-light leading-tight text-ink-100 md:text-5xl text-balance">
              Moments worth
              <span className="gold-text italic"> remembering</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-300">
              A glimpse into past activations — editorial setups, animated GIFs,
              and custom brand overlays from real events.
            </p>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="mt-10 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className={`rounded-full px-4 py-2 text-xs font-medium uppercase tracking-wider transition-all ${
                filter === tag
                  ? 'bg-gold-400 text-ink-950'
                  : 'border border-ink-600 text-ink-300 hover:border-gold-400/40 hover:text-gold-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Gallery grid */}
        <div className="mt-10 grid auto-rows-[200px] grid-cols-2 gap-4 md:grid-cols-4">
          {filtered.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setLightbox(item.url)}
              className={`group relative overflow-hidden rounded-2xl border border-ink-700 ${item.span} ${
                visible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: `${idx * 80}ms`,
                transitionProperty: 'all',
                transitionDuration: '700ms',
              }}
            >
              <img
                src={item.url}
                alt={item.alt}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-90" />
              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <span className="rounded-full bg-ink-950/60 px-3 py-1 text-xs font-medium text-gold-200 backdrop-blur-sm">
                  {item.tag}
                </span>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-400/90 text-ink-950">
                  <Play className="h-5 w-5 fill-current" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-950/90 p-6 backdrop-blur-md"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 flex h-12 w-12 items-center justify-center rounded-full border border-ink-500 text-ink-100 transition-colors hover:border-gold-400 hover:text-gold-300"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
          <img
            src={lightbox}
            alt="Gallery preview"
            className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain"
          />
        </div>
      )}
    </section>
  );
}
