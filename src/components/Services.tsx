import { Check, ArrowRight } from 'lucide-react';
import { services, addOns } from '@/lib/data';
import { useReveal } from '@/hooks/useReveal';

export default function Services() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div
          ref={ref}
          className={`max-w-2xl transition-all duration-1000 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-gold-300">
            Services & Packages
          </span>
          <h2 className="mt-4 font-display text-4xl font-light leading-tight text-ink-100 md:text-5xl text-balance">
            Curated experiences for
            <span className="gold-text italic"> every occasion</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink-300">
            From editorial spotlight booths to AI-powered headshot studios,
            each package is fully customizable with premium add-ons.
          </p>
        </div>

        {/* Service cards */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, idx) => (
            <div
              key={service.id}
              className={`group relative flex flex-col rounded-3xl border p-8 transition-all duration-500 hover:-translate-y-1 ${
                service.highlight
                  ? 'border-gold-400/40 bg-gradient-to-b from-gold-400/10 to-ink-900'
                  : 'border-ink-700 bg-ink-900 hover:border-ink-600'
              } ${
                visible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              {service.highlight && (
                <span className="absolute -top-3 left-8 rounded-full bg-gold-400 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-ink-950">
                  Most Popular
                </span>
              )}

              <div className="flex items-center gap-3">
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-colors ${
                    service.highlight
                      ? 'bg-gold-400/20 text-gold-300'
                      : 'bg-ink-700 text-ink-200 group-hover:bg-gold-400/10 group-hover:text-gold-300'
                  }`}
                >
                  <service.icon className="h-5 w-5" />
                </span>
              </div>

              <h3 className="mt-5 font-display text-2xl font-medium text-ink-100">
                {service.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-300">
                {service.tagline}
              </p>

              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-display text-3xl font-light text-ink-100">
                  ${service.price.toLocaleString()}
                </span>
                <span className="text-sm text-ink-400">
                  / {service.duration}
                </span>
              </div>

              <ul className="mt-6 flex-1 space-y-3">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-sm text-ink-200"
                  >
                    <Check
                      className={`mt-0.5 h-4 w-4 shrink-0 ${
                        service.highlight ? 'text-gold-300' : 'text-gold-400'
                      }`}
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={scrollToBooking}
                className={`mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all ${
                  service.highlight
                    ? 'bg-gold-400 text-ink-950 hover:bg-gold-300'
                    : 'border border-ink-600 text-ink-100 hover:border-gold-400/50 hover:text-gold-200'
                }`}
              >
                Select Package
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Add-ons strip */}
        <div className="mt-20">
          <div className="flex items-center gap-3">
            <span className="h-px flex-1 bg-ink-700" />
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gold-300">
              Premium Add-Ons
            </h3>
            <span className="h-px flex-1 bg-ink-700" />
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {addOns.map((addon) => (
              <div
                key={addon.id}
                className="flex items-center justify-between rounded-2xl border border-ink-700 bg-ink-900 px-6 py-5 transition-colors hover:border-gold-400/30"
              >
                <div>
                  <p className="text-sm font-medium text-ink-100">
                    {addon.name}
                  </p>
                  <p className="mt-0.5 text-xs text-ink-400">
                    {addon.description}
                  </p>
                </div>
                <span className="ml-4 shrink-0 font-display text-lg font-medium text-gold-300">
                  +${addon.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
