import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram } from 'lucide-react';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

const Lookbook = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const lookbookImages = [
    { src: '/images/new_image_21.jpg', alt: 'Style moment 1', span: 'row-span-2' },
    { src: '/images/new_image_22.jpg', alt: 'Style moment 2', span: '' },
    { src: '/images/new_image_23.jpg', alt: 'Style moment 3', span: '' },
    { src: '/images/new_image_24.jpg', alt: 'Style moment 4', span: '' },
    { src: '/images/new_image_25.jpg', alt: 'Style moment 5', span: 'row-span-2' },
  ];

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        
        const directions = [
          { x: '-12vw', y: 0 },
          { x: 0, y: '-8vh' },
          { x: 0, y: '8vh' },
          { x: '12vw', y: 0 },
          { x: '12vw', y: 0 },
        ];

        gsap.fromTo(
          card,
          { x: directions[index].x, y: directions[index].y, opacity: 0 },
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="lookbook"
      className="section-flowing bg-blush z-[70]"
    >
      <div className="px-6 md:px-[7vw] py-16 md:py-24">
        {/* Heading */}
        <div ref={headingRef} className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="font-display font-black text-black text-4xl md:text-6xl uppercase">
              {t('lookbook.title')}
            </h2>
            <p className="font-body text-black/60 mt-4 text-lg">
              {t('lookbook.subtitle')}
            </p>
          </div>
          <a
            href="https://www.instagram.com/fabi_pets_?igsh=NXQ1YTFydmh2YWsx"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 text-black font-body hover:text-camel transition-colors"
          >
            <Instagram className="w-5 h-5" />
            {t('lookbook.followInstagram')}
          </a>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[250px]">
          {/* Left Tall Card */}
          <div
            ref={(el) => { cardsRef.current[0] = el; }}
            className="row-span-2"
          >
            <div className="fabipets-card overflow-hidden hover-lift group cursor-pointer h-full">
              <img
                src={lookbookImages[0].src}
                alt={lookbookImages[0].alt}
                className="w-full h-full object-cover image-zoom"
              />
            </div>
          </div>

          {/* Center Top Wide Card */}
          <div
            ref={(el) => { cardsRef.current[1] = el; }}
            className="col-span-2"
          >
            <div className="fabipets-card-sm overflow-hidden hover-lift group cursor-pointer h-full">
              <img
                src={lookbookImages[1].src}
                alt={lookbookImages[1].alt}
                className="w-full h-full object-cover image-zoom"
              />
            </div>
          </div>

          {/* Far Right Tall Card */}
          <div
            ref={(el) => { cardsRef.current[4] = el; }}
            className="row-span-2"
          >
            <div className="fabipets-card overflow-hidden hover-lift group cursor-pointer h-full">
              <img
                src={lookbookImages[4].src}
                alt={lookbookImages[4].alt}
                className="w-full h-full object-cover image-zoom"
              />
            </div>
          </div>

          {/* Center Bottom Small Card */}
          <div
            ref={(el) => { cardsRef.current[2] = el; }}
          >
            <div className="fabipets-card-sm overflow-hidden hover-lift group cursor-pointer h-full">
              <img
                src={lookbookImages[2].src}
                alt={lookbookImages[2].alt}
                className="w-full h-full object-cover image-zoom"
              />
            </div>
          </div>

          {/* Right Tall Card */}
          <div
            ref={(el) => { cardsRef.current[3] = el; }}
          >
            <div className="fabipets-card-sm overflow-hidden hover-lift group cursor-pointer h-full">
              <img
                src={lookbookImages[3].src}
                alt={lookbookImages[3].alt}
                className="w-full h-full object-cover image-zoom"
              />
            </div>
          </div>
        </div>

        {/* Mobile Instagram Link */}
        <a
          href="https://www.instagram.com/fabi_pets_?igsh=NXQ1YTFydmh2YWsx"
          target="_blank"
          rel="noopener noreferrer"
          className="md:hidden inline-flex items-center gap-2 text-black font-body hover:text-camel transition-colors mt-8"
        >
          <Instagram className="w-5 h-5" />
          {t('lookbook.followInstagram')}
        </a>
      </div>
    </section>
  );
};

export default Lookbook;
