import { useMemo, useState } from 'react';
import {
  eventTypes,
  services,
  addOns,
  type ServiceTier,
} from '@/lib/data';
import { supabase, type BookingInsert } from '@/lib/supabase';
import {
  Calendar,
  Clock,
  Users,
  Check,
  Loader2,
  Sparkles,
  PartyPopper,
  AlertCircle,
} from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

export default function Booking() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  const [step, setStep] = useState(1);
  const [eventType, setEventType] = useState(eventTypes[0]);
  const [selectedService, setSelectedService] = useState<ServiceTier | null>(
    services[1]
  );
  const [eventDate, setEventDate] = useState('');
  const [hours, setHours] = useState(4);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const estimate = useMemo(() => {
    if (!selectedService) return 0;
    const base = selectedService.price;
    const eventMultiplier = eventType.multiplier;
    const hoursCost = (hours - selectedService.price / 1000) * 0; // base includes standard hours
    const extraHoursCost = Math.max(0, hours - eventType.baseHours) * 350;
    const addonsCost = selectedAddOns.reduce((sum, id) => {
      const addon = addOns.find((a) => a.id === id);
      return sum + (addon?.price ?? 0);
    }, 0);
    const total = Math.round(base * eventMultiplier + extraHoursCost + addonsCost);
    return Math.max(total, base);
  }, [selectedService, eventType, hours, selectedAddOns]);

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const canProceed = () => {
    if (step === 1) return selectedService !== null;
    if (step === 2) return eventType !== null && eventDate !== '';
    if (step === 3) return true;
    if (step === 4) return name.trim() && email.trim();
    return false;
  };

  const handleSubmit = async () => {
    if (!selectedService || !name.trim() || !email.trim() || !eventDate) {
      setError('Please fill in all required fields.');
      return;
    }

    setSubmitting(true);
    setError(null);

    const payload: BookingInsert = {
      name: name.trim(),
      email: email.trim(),
      event_type: eventType.id,
      event_date: eventDate,
      hours,
      addons: selectedAddOns,
      estimated_total: estimate,
      message: message.trim() || null,
    };

    try {
      const { error: insertError } = await supabase
        .from('booking_requests')
        .insert(payload);

      if (insertError) throw insertError;

      setSubmitting(false);
      setSubmitted(true);
    } catch (err) {
      setSubmitting(false);
      setError(
        err instanceof Error
          ? `Something went wrong: ${err.message}`
          : 'Something went wrong. Please try again.'
      );
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setStep(1);
    setSelectedService(services[1]);
    setEventType(eventTypes[0]);
    setEventDate('');
    setHours(4);
    setSelectedAddOns([]);
    setName('');
    setEmail('');
    setMessage('');
    setError(null);
  };

  const steps = [
    { num: 1, label: 'Package', icon: Sparkles },
    { num: 2, label: 'Event Details', icon: Calendar },
    { num: 3, label: 'Add-Ons', icon: Clock },
    { num: 4, label: 'Contact', icon: Users },
  ];

  if (submitted) {
    return (
      <section id="booking" className="py-24 md:py-32">
        <div className="mx-auto max-w-2xl px-6">
          <div className="rounded-3xl border border-gold-400/30 bg-gradient-to-b from-gold-400/10 to-ink-900 p-10 text-center md:p-16">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold-400/20">
              <PartyPopper className="h-7 w-7 text-gold-300" />
            </div>
            <h3 className="mt-6 font-display text-3xl font-light text-ink-100">
              Request Received
            </h3>
            <p className="mt-4 text-ink-300">
              Thank you, {name.split(' ')[0]}. We've received your booking
              request for {selectedService?.name} and will reach out to{' '}
              {email} within 24 hours with a detailed quote.
            </p>
            <div className="mt-8 rounded-2xl border border-ink-700 bg-ink-800/50 p-6 text-left">
              <div className="flex items-center justify-between">
                <span className="text-sm text-ink-300">Estimated Total</span>
                <span className="font-display text-2xl font-medium text-gold-300">
                  ${estimate.toLocaleString()}
                </span>
              </div>
              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="text-ink-400">Event Date</span>
                <span className="text-ink-200">
                  {new Date(eventDate).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="text-ink-400">Duration</span>
                <span className="text-ink-200">{hours} hours</span>
              </div>
            </div>
            <button
              onClick={resetForm}
              className="mt-8 rounded-full border border-ink-500 px-6 py-3 text-sm font-semibold text-ink-100 transition-colors hover:border-gold-400/50 hover:text-gold-200"
            >
              Submit Another Request
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div
          ref={ref}
          className={`text-center transition-all duration-1000 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-gold-300">
            Availability & Instant Quote
          </span>
          <h2 className="mt-4 font-display text-4xl font-light leading-tight text-ink-100 md:text-5xl text-balance">
            Get your
            <span className="gold-text italic"> instant estimate</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink-300">
            Select your event details and receive an instant quote. Submit to
            request a booking — we'll confirm availability within 24 hours.
          </p>
        </div>

        {/* Step indicator */}
        <div className="mt-12 flex items-center justify-center gap-2 md:gap-4">
          {steps.map((s, i) => (
            <div key={s.num} className="flex items-center gap-2 md:gap-4">
              <div
                className={`flex items-center gap-2.5 rounded-full px-4 py-2 transition-colors ${
                  step === s.num
                    ? 'bg-gold-400/15 border border-gold-400/40'
                    : step > s.num
                    ? 'border border-gold-400/20 text-gold-300'
                    : 'border border-ink-600 text-ink-400'
                }`}
              >
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
                    step === s.num
                      ? 'bg-gold-400 text-ink-950'
                      : step > s.num
                      ? 'bg-gold-400/20 text-gold-300'
                      : 'bg-ink-700 text-ink-400'
                  }`}
                >
                  {step > s.num ? <Check className="h-3.5 w-3.5" /> : s.num}
                </span>
                <span className="hidden text-sm font-medium sm:inline">
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <span
                  className={`h-px w-4 md:w-12 ${
                    step > s.num ? 'bg-gold-400/40' : 'bg-ink-600'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Form card */}
        <div className="mt-10 rounded-3xl border border-ink-700 bg-ink-900 p-6 md:p-10">
          {/* Step 1: Package */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-display text-2xl font-medium text-ink-100">
                Choose Your Package
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setSelectedService(service)}
                    className={`flex items-start gap-4 rounded-2xl border p-5 text-left transition-all ${
                      selectedService?.id === service.id
                        ? 'border-gold-400/50 bg-gold-400/10'
                        : 'border-ink-600 bg-ink-800 hover:border-ink-500'
                    }`}
                  >
                    <span
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                        selectedService?.id === service.id
                          ? 'border-gold-400 bg-gold-400 text-ink-950'
                          : 'border-ink-500'
                      }`}
                    >
                      {selectedService?.id === service.id && (
                        <Check className="h-3.5 w-3.5" />
                      )}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-ink-100">
                          {service.name}
                        </p>
                        <span className="text-sm font-medium text-gold-300">
                          ${service.price.toLocaleString()}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-ink-400">
                        {service.tagline}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Event Details */}
          {step === 2 && (
            <div className="space-y-6">
              <h3 className="font-display text-2xl font-medium text-ink-100">
                Event Details
              </h3>

              <div>
                <label className="text-sm font-medium text-ink-200">
                  Event Type
                </label>
                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {eventTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => {
                        setEventType(type);
                        setHours(type.baseHours);
                      }}
                      className={`rounded-xl border p-4 text-center transition-all ${
                        eventType.id === type.id
                          ? 'border-gold-400/50 bg-gold-400/10'
                          : 'border-ink-600 bg-ink-800 hover:border-ink-500'
                      }`}
                    >
                      <span className="text-sm font-medium text-ink-100">
                        {type.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-ink-200">
                    Event Date
                  </label>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="mt-3 w-full rounded-xl border border-ink-600 bg-ink-800 px-4 py-3 text-ink-100 placeholder-ink-400 transition-colors focus:border-gold-400/50 focus:outline-none focus:ring-1 focus:ring-gold-400/30 [color-scheme:dark]"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-ink-200">
                    Duration: {hours} hours
                  </label>
                  <input
                    type="range"
                    min={2}
                    max={8}
                    value={hours}
                    onChange={(e) => setHours(Number(e.target.value))}
                    className="mt-5 w-full accent-gold-400"
                  />
                  <div className="mt-1 flex justify-between text-xs text-ink-400">
                    <span>2h</span>
                    <span>8h</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Add-ons */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="font-display text-2xl font-medium text-ink-100">
                Premium Add-Ons
              </h3>
              <p className="text-sm text-ink-400">
                Enhance your experience with any of these optional extras.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {addOns.map((addon) => (
                  <button
                    key={addon.id}
                    onClick={() => toggleAddOn(addon.id)}
                    className={`flex items-start gap-4 rounded-2xl border p-5 text-left transition-all ${
                      selectedAddOns.includes(addon.id)
                        ? 'border-gold-400/50 bg-gold-400/10'
                        : 'border-ink-600 bg-ink-800 hover:border-ink-500'
                    }`}
                  >
                    <span
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                        selectedAddOns.includes(addon.id)
                          ? 'border-gold-400 bg-gold-400 text-ink-950'
                          : 'border-ink-500'
                      }`}
                    >
                      {selectedAddOns.includes(addon.id) && (
                        <Check className="h-3.5 w-3.5" />
                      )}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-ink-100">
                          {addon.name}
                        </p>
                        <span className="text-sm font-medium text-gold-300">
                          +${addon.price}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-ink-400">
                        {addon.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Contact */}
          {step === 4 && (
            <div className="space-y-6">
              <h3 className="font-display text-2xl font-medium text-ink-100">
                Your Contact Details
              </h3>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-ink-200">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    className="mt-3 w-full rounded-xl border border-ink-600 bg-ink-800 px-4 py-3 text-ink-100 placeholder-ink-500 transition-colors focus:border-gold-400/50 focus:outline-none focus:ring-1 focus:ring-gold-400/30"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-ink-200">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@example.com"
                    className="mt-3 w-full rounded-xl border border-ink-600 bg-ink-800 px-4 py-3 text-ink-100 placeholder-ink-500 transition-colors focus:border-gold-400/50 focus:outline-none focus:ring-1 focus:ring-gold-400/30"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-ink-200">
                  Additional Notes (Optional)
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  placeholder="Tell us about your event vision..."
                  className="mt-3 w-full resize-none rounded-xl border border-ink-600 bg-ink-800 px-4 py-3 text-ink-100 placeholder-ink-500 transition-colors focus:border-gold-400/50 focus:outline-none focus:ring-1 focus:ring-gold-400/30"
                />
              </div>

              {error && (
                <div className="flex items-center gap-2.5 rounded-xl border border-accent-500/30 bg-accent-500/10 px-4 py-3 text-sm text-accent-400">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {error}
                </div>
              )}
            </div>
          )}

          {/* Live estimate bar */}
          <div className="mt-8 flex items-center justify-between rounded-2xl border border-ink-600 bg-ink-800/50 px-6 py-4">
            <div>
              <p className="text-xs uppercase tracking-wider text-ink-400">
                Estimated Total
              </p>
              <p className="font-display text-3xl font-light text-gold-300">
                ${estimate.toLocaleString()}
              </p>
            </div>
            <div className="text-right text-xs text-ink-400">
              {selectedService && <p>{selectedService.name}</p>}
              <p>
                {hours}h · {selectedAddOns.length} add-on
                {selectedAddOns.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              disabled={step === 1}
              className="rounded-full px-6 py-3 text-sm font-semibold text-ink-300 transition-colors hover:text-ink-100 disabled:cursor-not-allowed disabled:opacity-30"
            >
              Back
            </button>

            {step < 4 ? (
              <button
                onClick={() => setStep((s) => s + 1)}
                disabled={!canProceed()}
                className="rounded-full bg-gold-400 px-8 py-3 text-sm font-semibold text-ink-950 transition-all hover:bg-gold-300 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Continue
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canProceed() || submitting}
                className="inline-flex items-center gap-2 rounded-full bg-gold-400 px-8 py-3 text-sm font-semibold text-ink-950 transition-all hover:bg-gold-300 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Booking Request'
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
