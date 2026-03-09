import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FeaturedOutfit = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftPhotoRef = useRef<HTMLDivElement>(null);
  const rightTopRef = useRef<HTMLDivElement>(null);
  const rightBottomRef = useRef<HTMLDivElement>(null);
  const textPanelRef = useRef<HTMLDivElement>(null);
  const stampRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Subtle reveal animations on scroll
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
        textPanelRef.current,
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: textPanelRef.current,
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
      className="relative w-full min-h-screen bg-blush flex items-center justify-center z-20 py-16 md:py-24"
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
                src="/images/featured_suit_main.jpg"
                alt="Statement Suit"
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
                  src="/images/featured_suit_detail.jpg"
                  alt="Suit detail"
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
                  src="/images/collection_accessories.jpg"
                  alt="Accessories"
                  className="w-full h-full object-cover rounded-[14px]"
                />
              </div>
            </div>
          </div>

          {/* Text Panel */}
          <div
            ref={textPanelRef}
            className="md:col-span-3 bg-camel card-border rounded-[28px] p-6 md:p-8 flex flex-col justify-between"
          >
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-white/80">
                Featured Outfit
              </span>
              <h2 className="font-display font-black text-white text-2xl md:text-3xl mt-4 leading-tight">
                STATEMENT SUIT
              </h2>
              <p className="font-body text-white/90 text-sm mt-4 leading-relaxed">
                Tailored silhouette, breathable lining, and adjustable straps for a perfect fit.
              </p>
            </div>

            <div className="mt-6">
              <p className="font-display font-bold text-white text-xl md:text-2xl">
                From $49
              </p>
              <a
                href="https://api.whatsapp.com/send/?phone=584142490629&text&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 bg-white text-black font-display font-semibold text-sm px-5 py-3 rounded-full hover:bg-black hover:text-white transition-colors duration-300"
              >
                <MessageCircle className="w-4 h-4" />
                Ask on WhatsApp
              </a>
            </div>
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
            NEW
          </span>
        </div>
      </div>
    </section>
  );
};

export default FeaturedOutfit;
