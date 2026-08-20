import {
  Camera,
  Sparkles,
  Scan,
  Share2,
  Palette,
  Wand2,
  type LucideIcon,
} from 'lucide-react';

export type ServiceTier = {
  id: string;
  name: string;
  tagline: string;
  price: number;
  duration: string;
  icon: LucideIcon;
  features: string[];
  highlight?: boolean;
};

export const services: ServiceTier[] = [
  {
    id: 'editorial',
    name: 'Editorial Spotlight',
    tagline: 'Studio-grade portraits with professional lighting and backdrops.',
    price: 1200,
    duration: '3 hours',
    icon: Camera,
    features: [
      'Full studio lighting setup',
      'Custom editorial backdrop',
      'Unlimited digital prints',
      'On-site attendant',
      'Premium print delivery',
    ],
  },
  {
    id: 'glam',
    name: 'Glam Booth',
    tagline: 'Flawless beauty-grade shots with skin smoothing and retouching.',
    price: 1500,
    duration: '4 hours',
    icon: Sparkles,
    features: [
      'Beauty-ring lighting',
      'Real-time skin retouching',
      'Custom AR filters',
      'Instant social sharing',
      'Glam print station',
    ],
    highlight: true,
  },
  {
    id: '360',
    name: '360 Video Capture',
    tagline: 'Cinematic rotating video booth for shareable motion content.',
    price: 2000,
    duration: '4 hours',
    icon: Scan,
    features: [
      'Motorized 360 platform',
      '4K video capture',
      'Instant GIF + reel export',
      'Custom overlay branding',
      'Cloud delivery within 24h',
    ],
  },
  {
    id: 'ai-headshots',
    name: 'AI Headshot Studio',
    tagline: 'AI-powered transformations: corporate, cinematic, editorial styles.',
    price: 1800,
    duration: '3 hours',
    icon: Wand2,
    features: [
      'AI style transfer (5 looks)',
      'Professional headshot generation',
      'Background replacement',
      'Batch delivery via email',
      'Commercial usage license',
    ],
  },
  {
    id: 'digital-qr',
    name: 'Digital QR Package',
    tagline: 'Digital-only sharing with instant QR-code delivery to guests.',
    price: 900,
    duration: '3 hours',
    icon: Share2,
    features: [
      'QR code instant delivery',
      'Custom branded gallery',
      'No physical prints',
      'Cloud storage 90 days',
      'Analytics dashboard',
    ],
  },
  {
    id: 'custom',
    name: 'Custom Brand Activation',
    tagline: 'Fully bespoke booth build with branded overlays and props.',
    price: 2500,
    duration: '5 hours',
    icon: Palette,
    features: [
      'Custom booth wrap design',
      'Branded photo overlays',
      'Interactive digital props',
      'Dedicated brand manager',
      'Post-event content report',
    ],
  },
];

export type AddOn = {
  id: string;
  name: string;
  price: number;
  description: string;
};

export const addOns: AddOn[] = [
  { id: 'extra-hour', name: 'Additional Hour', price: 350, description: 'Extend any package by one hour.' },
  { id: 'custom-backdrop', name: 'Custom Backdrop', price: 450, description: 'Bespoke designed backdrop for your event.' },
  { id: 'print-station', name: 'Premium Print Station', price: 500, description: 'Unlimited physical prints with frames.' },
  { id: 'gif-boomerang', name: 'GIF + Boomerang Pack', price: 300, description: 'Animated captures for social sharing.' },
  { id: 'brand-overlay', name: 'Custom Brand Overlay', price: 400, description: 'Logo + event branding on every photo.' },
  { id: 'guest-book', name: 'Luxury Guest Book', price: 250, description: 'Premium album with photo inserts.' },
];

export type EventType = {
  id: string;
  label: string;
  baseHours: number;
  multiplier: number;
};

export const eventTypes: EventType[] = [
  { id: 'wedding', label: 'Wedding', baseHours: 4, multiplier: 1.0 },
  { id: 'corporate', label: 'Corporate Activation', baseHours: 3, multiplier: 1.15 },
  { id: 'brand', label: 'Brand Event', baseHours: 4, multiplier: 1.25 },
  { id: 'private', label: 'Private Party', baseHours: 3, multiplier: 0.9 },
];

export type GalleryItem = {
  id: string;
  url: string;
  alt: string;
  span: string;
  tag: string;
};

export const galleryItems: GalleryItem[] = [
  {
    id: 'g1',
    url: 'https://images.pexels.com/photos/13788485/pexels-photo-13788485.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Wedding photobooth props',
    span: 'md:col-span-2 md:row-span-2',
    tag: 'Wedding',
  },
  {
    id: 'g2',
    url: 'https://images.pexels.com/photos/17200372/pexels-photo-17200372.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Editorial portrait with dramatic lighting',
    span: '',
    tag: 'Editorial',
  },
  {
    id: 'g3',
    url: 'https://images.pexels.com/photos/6405751/pexels-photo-6405751.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Corporate event celebration',
    span: '',
    tag: 'Corporate',
  },
  {
    id: 'g4',
    url: 'https://images.pexels.com/photos/20459105/pexels-photo-20459105.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Studio glamour portrait',
    span: 'md:row-span-2',
    tag: 'Glam Booth',
  },
  {
    id: 'g5',
    url: 'https://images.pexels.com/photos/9342943/pexels-photo-9342943.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Friends at photobooth party',
    span: '',
    tag: 'Brand Event',
  },
  {
    id: 'g6',
    url: 'https://images.pexels.com/photos/15551978/pexels-photo-15551978.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Elegant social gathering',
    span: 'md:col-span-2',
    tag: 'Gala',
  },
  {
    id: 'g7',
    url: 'https://images.pexels.com/photos/34751807/pexels-photo-34751807.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Moody red-lit portrait',
    span: '',
    tag: 'Editorial',
  },
  {
    id: 'g8',
    url: 'https://images.pexels.com/photos/10360899/pexels-photo-10360899.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Wedding reception under string lights',
    span: '',
    tag: 'Wedding',
  },
];

export const heroImages = [
  'https://images.pexels.com/photos/13788485/pexels-photo-13788485.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/17200372/pexels-photo-17200372.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/6405751/pexels-photo-6405751.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/20459105/pexels-photo-20459105.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
];

export const navLinks = [
  { id: 'services', label: 'Services' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'booking', label: 'Book Now' },
];
