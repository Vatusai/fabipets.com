import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Shield, Sparkles, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CraftCare = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftPhotoRef = useRef<HTMLDivElement>(null);
  const rightTopRef = useRef<HTMLDivElement>(null);
  const rightBottomRef = useRef<HTMLDivElement>(null);
  const valuesPanelRef = useRef<HTMLDivElement>(null);
  const stampRef = useRef<HTMLDivElement>(null);

  const values = [
    {
      icon: Heart,
      title: 'Soft, pet-safe fabrics',
      description: 'Only the gentlest materials for your furry friend',
    },
    {
      icon: Shield,
      title: 'Reinforced stitching',
      description: 'Built to last through all their adventures',
    },
    {
      icon: Sparkles,
      title: 'Easy to wash & wear',
      description: 'Machine washable for your convenience',
    },
  ];

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
        valuesPanelRef.current,
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: valuesPanelRef.current,
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
      className="relative w-full min-h-screen bg-blush flex items-center justify-center z-[80] py-16 md:py-24"
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
                src="/images/craft_main.jpg"
                alt="Craft and care"
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
                  src="/images/craft_detail.jpg"
                  alt="Craft detail"
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
                  src="/images/hero_dog_flowers.jpg"
                  alt="Pet in outfit"
                  className="w-full h-full object-cover rounded-[14px]"
                />
              </div>
            </div>
          </div>

          {/* Values Panel */}
          <div
            ref={valuesPanelRef}
            className="md:col-span-3 bg-camel card-border rounded-[28px] p-6 md:p-8 flex flex-col justify-between"
          >
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-white/80">
                Our Values
              </span>
              <h2 className="font-display font-black text-white text-xl md:text-2xl mt-3 leading-tight">
                MADE WITH CARE
              </h2>

              <div className="mt-6 space-y-4">
                {values.map((value, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <value.icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-white text-sm">
                        {value.title}
                      </h4>
                      <p className="font-body text-white/70 text-xs mt-1">
                        {value.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <a
              href="#"
              className="inline-flex items-center gap-2 text-white font-body text-sm hover:underline mt-6"
            >
              See materials
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
            CARE
          </span>
        </div>
      </div>
    </section>
  );
};

export default CraftCare;
