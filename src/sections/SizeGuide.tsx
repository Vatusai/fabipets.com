import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, Check, RefreshCw, Truck } from 'lucide-react';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

const SizeGuide = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightTopRef = useRef<HTMLDivElement>(null);
  const rightBottomRef = useRef<HTMLDivElement>(null);

  const sizeSteps = [
    {
      icon: Clock,
      title: t('sizeGuide.steps.measure.title'),
      description: t('sizeGuide.steps.measure.description'),
    },
    {
      icon: Check,
      title: t('sizeGuide.steps.adjust.title'),
      description: t('sizeGuide.steps.adjust.description'),
    },
    {
      icon: RefreshCw,
      title: t('sizeGuide.steps.returns.title'),
      description: t('sizeGuide.steps.returns.description'),
    },
    {
      icon: Truck,
      title: t('sizeGuide.steps.shipping.title'),
      description: t('sizeGuide.steps.shipping.description'),
    },
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

      gsap.fromTo(
        leftCardRef.current,
        { x: '-12vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: leftCardRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        rightTopRef.current,
        { x: '12vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: rightTopRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        rightBottomRef.current,
        { x: '12vw', y: '6vh', opacity: 0 },
        {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: rightBottomRef.current,
            start: 'top 80%',
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
      className="section-flowing z-50"
    >
      <div className="px-6 md:px-[7vw] py-16 md:py-24">
        {/* Heading */}
        <div ref={headingRef} className="mb-12">
          <h2 className="font-display font-black text-black text-4xl md:text-6xl uppercase">
            {t('sizeGuide.title')}
          </h2>
          <p className="font-body text-black/60 mt-4 text-lg">
            {t('sizeGuide.subtitle')}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left Size Guide Card */}
          <div
            ref={leftCardRef}
            className="md:col-span-6"
          >
            <div className="fabipets-card p-6 md:p-8">
              <h3 className="font-display font-bold text-black text-xl mb-6">
                {t('sizeGuide.howToMeasure')}
              </h3>
              
              {/* Size Guide Images - Orden numérico */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="overflow-hidden rounded-[18px] border border-black/10">
                  <picture>
                    <source srcSet="/images/size_guide_1.webp" type="image/webp" />
                    <img
                      src="/images/size_guide_1.jpg"
                      alt="Tabla de medidas para gatos - Cuerpo"
                      className="w-full h-auto object-cover"
                    />
                  </picture>
                </div>
                <div className="overflow-hidden rounded-[18px] border border-black/10">
                  <picture>
                    <source srcSet="/images/size_guide_2.webp" type="image/webp" />
                    <img
                      src="/images/size_guide_2.jpg"
                      alt="Tabla de medidas para gatos - Cabeza"
                      className="w-full h-auto object-cover"
                    />
                  </picture>
                </div>
                <div className="overflow-hidden rounded-[18px] border border-black/10">
                  <picture>
                    <source srcSet="/images/size_guide_3.webp" type="image/webp" />
                    <img
                      src="/images/size_guide_3.jpg"
                      alt="Tabla de medidas para perros - Cuerpo"
                      className="w-full h-auto object-cover"
                    />
                  </picture>
                </div>
                <div className="overflow-hidden rounded-[18px] border border-black/10">
                  <picture>
                    <source srcSet="/images/size_guide_4.webp" type="image/webp" />
                    <img
                      src="/images/size_guide_4.jpg"
                      alt="Tabla de medidas para perros - Cabeza"
                      className="w-full h-auto object-cover"
                    />
                  </picture>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="md:col-span-6 flex flex-col gap-6">
            {/* Right Top - Image */}
            <div
              ref={rightTopRef}
              className="fabipets-card-sm overflow-hidden"
            >
              <picture>
                <source srcSet="/images/new_image_17.webp" type="image/webp" />
                <img
                  src="/images/new_image_17.jpg"
                  alt="Size guide demonstration"
                  className="w-full h-48 md:h-56 object-cover p-2 rounded-[18px]"
                />
              </picture>
            </div>

            {/* Right Bottom - Info Cards */}
            <div
              ref={rightBottomRef}
              className="fabipets-card p-6 flex-1"
            >
              <h3 className="font-display font-bold text-black text-xl mb-6">
                {t('sizeGuide.ourPromise')}
              </h3>
              <div className="space-y-4">
                {sizeSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-camel/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <step.icon className="w-5 h-5 text-camel" />
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-black">
                        {step.title}
                      </h4>
                      <p className="font-body text-black/60 text-sm mt-1">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SizeGuide;
