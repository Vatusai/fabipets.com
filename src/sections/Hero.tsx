import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const images = [
  { src: '/images/new_image_01.png', alt: 'Dog with flower crown' },
  { src: '/images/new_image_02.png', alt: 'Elegant cat' },
  { src: '/images/new_image_03.jpg', alt: 'Dog in costume' },
  { src: '/images/new_image_04.jpg', alt: 'Dog with bow tie' },
  { src: '/images/new_image_05.jpg', alt: 'Dog with sunglasses' },
  { src: '/images/new_image_06.jpg', alt: 'Pet paws closeup' },
];

// Paw print component: 1 main pad + 4 toe pads (correct anatomy)
const PawPrint = ({ size, opacity = 0.25 }: { size: number; opacity?: number }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="white" style={{ opacity }}>
    {/* Main pad */}
    <ellipse cx="32" cy="46" rx="14" ry="12" />
    {/* 4 toe pads */}
    <ellipse cx="13" cy="28" rx="7" ry="9" transform="rotate(-20 13 28)" />
    <ellipse cx="25" cy="19" rx="7" ry="9" transform="rotate(-6 25 19)" />
    <ellipse cx="39" cy="19" rx="7" ry="9" transform="rotate(6 39 19)" />
    <ellipse cx="51" cy="28" rx="7" ry="9" transform="rotate(20 51 28)" />
  </svg>
);

const Hero = () => {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState<'left' | 'right'>('right');
  const [animating, setAnimating] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const go = (next: number, direction: 'left' | 'right') => {
    if (animating) return;
    setDir(direction);
    setAnimating(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setCurrent(next);
      setAnimating(false);
    }, 350);
  };

  const prev = () => go((current - 1 + images.length) % images.length, 'left');
  const next = () => go((current + 1) % images.length, 'right');

  // Visible indices: prev, current, next
  const getVisible = () => {
    const p = (current - 1 + images.length) % images.length;
    const n = (current + 1) % images.length;
    return [p, current, n];
  };

  const [prevIdx, curIdx, nextIdx] = getVisible();

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center z-10 overflow-hidden">

      {/* Floating paw prints */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {[
          { size: 42, left: '8%',  top: '20%', delay: '0s',   dur: '7s'  },
          { size: 30, left: '18%', top: '55%', delay: '1.5s', dur: '9s'  },
          { size: 36, left: '75%', top: '15%', delay: '0.8s', dur: '8s'  },
          { size: 24, left: '88%', top: '60%', delay: '2.2s', dur: '10s' },
          { size: 30, left: '45%', top: '75%', delay: '1s',   dur: '7.5s'},
          { size: 21, left: '60%', top: '30%', delay: '3s',   dur: '11s' },
        ].map((p, i) => (
          <div key={i} className="hero-paw absolute" style={{ width: p.size, height: p.size, left: p.left, top: p.top, animationDelay: p.delay, animationDuration: p.dur }}>
            <PawPrint size={p.size} />
          </div>
        ))}
      </div>

      {/* Carousel */}
      <div className="relative w-full flex items-center justify-center gap-4 px-16 md:px-24">

        {/* Left arrow */}
        <button
          onClick={prev}
          className="carousel-arrow left-4 md:left-8"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Images */}
        <div className="flex items-center justify-center gap-4 w-full overflow-hidden">

          {/* Previous — half visible, dimmed */}
          <div className="hidden md:block flex-shrink-0 carousel-side-card">
            <div
              className="fabipets-card-sm overflow-hidden"
              style={{ width: 'clamp(140px, 15vw, 220px)', height: 'clamp(180px, 20vw, 290px)' }}
            >
              <img
                src={images[prevIdx].src}
                alt={images[prevIdx].alt}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover p-2 rounded-[18px]"
              />
            </div>
          </div>

          {/* Current — center, large */}
          <div
            className={`flex-shrink-0 carousel-main-card ${animating ? (dir === 'right' ? 'slide-out-left' : 'slide-out-right') : 'slide-in'}`}
          >
            <div
              className="fabipets-card overflow-hidden"
              style={{ width: 'clamp(220px, 28vw, 400px)', height: 'clamp(290px, 38vw, 520px)' }}
            >
              <img
                src={images[curIdx].src}
                alt={images[curIdx].alt}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover p-2.5 rounded-[26px]"
              />
            </div>
          </div>

          {/* Next — half visible, dimmed */}
          <div className="hidden md:block flex-shrink-0 carousel-side-card">
            <div
              className="fabipets-card-sm overflow-hidden"
              style={{ width: 'clamp(140px, 15vw, 220px)', height: 'clamp(180px, 20vw, 290px)' }}
            >
              <img
                src={images[nextIdx].src}
                alt={images[nextIdx].alt}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover p-2 rounded-[18px]"
              />
            </div>
          </div>
        </div>

        {/* Right arrow */}
        <button
          onClick={next}
          className="carousel-arrow right-4 md:right-8"
          aria-label="Siguiente"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i, i > current ? 'right' : 'left')}
            className={`rounded-full transition-all duration-300 ${i === current ? 'w-6 h-2 bg-black' : 'w-2 h-2 bg-black/30 hover:bg-black/50'}`}
            aria-label={`Imagen ${i + 1}`}
          />
        ))}
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white/80 to-transparent pointer-events-none z-10" />

      {/* Headline */}
      <div
        className="absolute font-display font-black text-black uppercase leading-none z-20"
        style={{ left: '7vw', bottom: '10vh', fontSize: 'clamp(32px, 5vw, 72px)' }}
      >
        <div>{t('hero.headline1')}</div>
        <div>{t('hero.headline2')}<span className="text-camel">.</span></div>
      </div>

      {/* Subheadline */}
      <p
        className="absolute font-body text-black/60 text-sm md:text-base max-w-md z-20"
        style={{ left: '7vw', bottom: '5vh' }}
      >
        {t('hero.subtitle')}
      </p>

      {/* Organic wave divider */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
        <svg viewBox="0 0 1440 70" preserveAspectRatio="none" className="w-full" style={{ height: '70px' }}>
          <path className="wave-path-1" d="M0,35 C240,70 480,0 720,35 C960,70 1200,0 1440,35 L1440,70 L0,70 Z" fill="rgba(255,255,255,0.08)" />
          <path className="wave-path-2" d="M0,50 C360,20 720,65 1080,30 C1260,15 1380,55 1440,50 L1440,70 L0,70 Z" fill="rgba(255,255,255,0.12)" />
          <path d="M0,60 C480,40 960,70 1440,55 L1440,70 L0,70 Z" fill="white" />
        </svg>
      </div>

    </section>
  );
};

export default Hero;
