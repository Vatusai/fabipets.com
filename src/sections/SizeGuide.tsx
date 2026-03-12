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
  const imagesGridRef = useRef<HTMLDivElement>(null);
  const infoCardRef = useRef<HTMLDivElement>(null);

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

  // Array de imágenes de tallas ordenadas numéricamente
  const sizeImages = [
    { src: '/images/size-1.JPG', alt: 'Guía de tallas 1' },
    { src: '/images/size-2.JPG', alt: 'Guía de tallas 2' },
    { src: '/images/size-3.JPG', alt: 'Guía de tallas 3' },
    { src: '/images/size-4.JPG', alt: 'Guía de tallas 4' },
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
        imagesGridRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: imagesGridRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        infoCardRef.current,
        { x: '12vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: infoCardRef.current,
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
          {/* Left - Size Guide Images */}
          <div
            ref={imagesGridRef}
            className="md:col-span-7"
          >
            <div className="fabipets-card p-4 md:p-6 h-full">
              <h3 className="font-display font-bold text-black text-xl mb-6">
                {t('sizeGuide.howToMeasure')}
              </h3>
              
              {/* Images Grid - 2x2 layout */}
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {sizeImages.map((image, index) => (
                  <div 
                    key={index}
                    className="relative overflow-hidden rounded-xl bg-white"
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-auto object-contain rounded-xl"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Info Cards */}
          <div className="md:col-span-5 flex flex-col gap-6">
            {/* Info Card */}
            <div
              ref={infoCardRef}
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
