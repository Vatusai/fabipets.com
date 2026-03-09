import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const leftPhotoRef = useRef<HTMLDivElement>(null);
  const rightTopRef = useRef<HTMLDivElement>(null);
  const rightBottomRef = useRef<HTMLDivElement>(null);
  const quotePanelRef = useRef<HTMLDivElement>(null);
  const stampRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftPhotoRef.current,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: leftPhotoRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        [rightTopRef.current, rightBottomRef.current],
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: rightTopRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        quotePanelRef.current,
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: quotePanelRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        stampRef.current,
        { scale: 0.5, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: stampRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-blush flex items-center justify-center z-[60] py-16 md:py-24"
    >
      <div className="relative w-full px-6 md:px-[6vw]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-start">
          {/* Left Photo Card (large) */}
          <div
            ref={leftPhotoRef}
            className="md:col-span-6 fabipets-card overflow-hidden"
          >
            <div className="aspect-[4/5] p-2">
              <img
                src="/images/new_image_18.jpg"
                alt="Happy customer"
                className="w-full h-full object-cover rounded-[20px]"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="md:col-span-3 flex flex-col gap-4 md:gap-6">
            {/* Right Top Photo Card (small) */}
            <div
              ref={rightTopRef}
              className="fabipets-card-sm overflow-hidden"
            >
              <div className="aspect-square p-2">
                <img
                  src="/images/new_image_19.jpg"
                  alt="Another happy pet"
                  className="w-full h-full object-cover rounded-[14px]"
                />
              </div>
            </div>

            {/* Right Bottom Photo Card (medium) */}
            <div
              ref={rightBottomRef}
              className="fabipets-card-sm overflow-hidden"
            >
              <div className="aspect-[4/5] p-2">
                <img
                  src="/images/new_image_20.jpg"
                  alt="Pet in outfit"
                  className="w-full h-full object-cover rounded-[14px]"
                />
              </div>
            </div>
          </div>

          {/* Quote Panel */}
          <div
            ref={quotePanelRef}
            className="md:col-span-3 bg-camel card-border rounded-[28px] p-6 md:p-8 flex flex-col justify-between"
          >
            <div>
              <Quote className="w-8 h-8 text-white/40 mb-4" />
              <blockquote className="font-body text-white text-lg md:text-xl leading-relaxed">
                &ldquo;{t('testimonials.quote')}&rdquo;
              </blockquote>
              <p className="font-mono text-white/80 text-sm mt-6">
                {t('testimonials.author')}
              </p>
            </div>

            <a
              href="#"
              className="inline-flex items-center gap-2 text-white font-body text-sm hover:underline mt-6"
            >
              {t('testimonials.readMore')}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Stamp */}
        <div
          ref={stampRef}
          className="absolute bg-camel card-border rounded-full flex items-center justify-center stamp-rotate hidden md:flex"
          style={{
            left: '45%',
            bottom: '5%',
            width: '80px',
            height: '80px',
          }}
        >
          <span className="font-display font-black text-white text-lg">
            {t('testimonials.stamp')}
          </span>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
