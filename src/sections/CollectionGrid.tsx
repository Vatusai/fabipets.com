import { useRef, useLayoutEffect, useCallback } from 'react';
import gsap from 'gsap';
import { useTranslation } from 'react-i18next';

const useTilt = (intensity = 8) => {
  const ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const pending = useRef<{ x: number; y: number } | null>(null);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    pending.current = {
      x: ((e.clientX - rect.left) / rect.width - 0.5) * intensity,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * intensity,
    };
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      if (!ref.current || !pending.current) return;
      const { x, y } = pending.current;
      ref.current.style.transform = `perspective(900px) rotateX(${-y}deg) rotateY(${x}deg) scale3d(1.025,1.025,1.025)`;
      ref.current.style.transition = 'transform 0.1s ease-out';
    });
  }, [intensity]);

  const onMouseLeave = useCallback(() => {
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
    pending.current = null;
    if (!ref.current) return;
    ref.current.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    ref.current.style.transition = 'transform 0.4s ease-out';
  }, []);

  return { ref, onMouseMove, onMouseLeave };
};

const CollectionGrid = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const card4Ref = useRef<HTMLDivElement>(null);

  const tilt1 = useTilt(6);
  const tilt2 = useTilt(8);
  const tilt3 = useTilt(8);
  const tilt4 = useTilt(5);

  const collections = [
    { name: t('collection.categories.dresses.name'), image: '/images/new_image_10.png', description: t('collection.categories.dresses.description') },
    { name: t('collection.categories.shirts.name'), image: '/images/new_image_11.png', description: t('collection.categories.shirts.description') },
    { name: t('collection.categories.costumes.name'), image: '/images/new_image_12.jpg', description: t('collection.categories.costumes.description') },
    { name: t('collection.categories.accessories.name'), image: '/images/new_image_13.jpg', description: t('collection.categories.accessories.description') },
  ];

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: headingRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } });
      gsap.fromTo(card1Ref.current, { x: '-12vw', opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: card1Ref.current, start: 'top 80%', toggleActions: 'play none none reverse' } });
      gsap.fromTo(card2Ref.current, { x: '12vw', y: '-6vh', opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: card2Ref.current, start: 'top 80%', toggleActions: 'play none none reverse' } });
      gsap.fromTo(card3Ref.current, { x: '12vw', y: '6vh', opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: card3Ref.current, start: 'top 80%', toggleActions: 'play none none reverse' } });
      gsap.fromTo(card4Ref.current, { y: '10vh', opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: card4Ref.current, start: 'top 85%', toggleActions: 'play none none reverse' } });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="collection" className="section-flowing z-30">
      <div className="px-6 md:px-[7vw] py-16 md:py-24">

        <div ref={headingRef} className="mb-12">
          <h2 className="font-display font-black text-black text-4xl md:text-6xl uppercase">
            {t('collection.title')}
          </h2>
          <p className="font-body text-black/60 mt-4 text-lg">
            {t('collection.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* Card 1 — Large left */}
          <div ref={card1Ref} className="md:col-span-6 md:row-span-2">
            <div
              ref={tilt1.ref}
              onMouseMove={tilt1.onMouseMove}
              onMouseLeave={tilt1.onMouseLeave}
              className="fabipets-card overflow-hidden cursor-pointer h-full tilt-card"
            >
              <div className="relative h-64 md:h-[500px] overflow-hidden rounded-[26px]">
                <img src={collections[0].image} alt={collections[0].name} loading="lazy" decoding="async" className="w-full h-full object-cover image-zoom" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5">
                  <div className="glass-badge">
                    <h3 className="font-display font-bold text-white text-lg leading-tight">{collections[0].name}</h3>
                    <p className="font-body text-white/80 text-xs mt-1">{collections[0].description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 — Top right */}
          <div ref={card2Ref} className="md:col-span-6">
            <div
              ref={tilt2.ref}
              onMouseMove={tilt2.onMouseMove}
              onMouseLeave={tilt2.onMouseLeave}
              className="fabipets-card overflow-hidden cursor-pointer tilt-card"
            >
              <div className="relative h-48 md:h-56 overflow-hidden rounded-[26px]">
                <img src={collections[1].image} alt={collections[1].name} loading="lazy" decoding="async" className="w-full h-full object-cover image-zoom" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <div className="glass-badge">
                    <h3 className="font-display font-bold text-white text-base">{collections[1].name}</h3>
                    <p className="font-body text-white/80 text-xs mt-0.5">{collections[1].description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 — Mid right */}
          <div ref={card3Ref} className="md:col-span-6">
            <div
              ref={tilt3.ref}
              onMouseMove={tilt3.onMouseMove}
              onMouseLeave={tilt3.onMouseLeave}
              className="fabipets-card overflow-hidden cursor-pointer tilt-card"
            >
              <div className="relative h-48 md:h-56 overflow-hidden rounded-[26px]">
                <img src={collections[2].image} alt={collections[2].name} loading="lazy" decoding="async" className="w-full h-full object-cover image-zoom" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <div className="glass-badge">
                    <h3 className="font-display font-bold text-white text-base">{collections[2].name}</h3>
                    <p className="font-body text-white/80 text-xs mt-0.5">{collections[2].description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4 — Bottom banner */}
          <div ref={card4Ref} className="md:col-span-12">
            <div
              ref={tilt4.ref}
              onMouseMove={tilt4.onMouseMove}
              onMouseLeave={tilt4.onMouseLeave}
              className="fabipets-card overflow-hidden cursor-pointer tilt-card"
            >
              <div className="relative h-48 md:h-64 overflow-hidden rounded-[26px]">
                <img src={collections[3].image} alt={collections[3].name} loading="lazy" decoding="async" className="w-full h-full object-cover image-zoom" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5">
                  <div className="glass-badge">
                    <h3 className="font-display font-bold text-white text-xl">{collections[3].name}</h3>
                    <p className="font-body text-white/80 text-sm mt-1">{collections[3].description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CollectionGrid;
