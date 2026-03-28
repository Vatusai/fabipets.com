import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { Ruler, Check, Truck } from 'lucide-react';
import { useTranslation } from 'react-i18next';


const sizeData = [
  { size: 'XS', neck: '20-25cm', chest: '30-35cm', length: '20-25cm' },
  { size: 'S', neck: '25-30cm', chest: '35-45cm', length: '25-30cm' },
  { size: 'M', neck: '30-35cm', chest: '45-55cm', length: '30-35cm' },
  { size: 'L', neck: '35-45cm', chest: '55-70cm', length: '35-45cm' },
  { size: 'XL', neck: '45-55cm', chest: '70-85cm', length: '45-55cm' },
];

const SizeGuide = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightTopRef = useRef<HTMLDivElement>(null);
  const rightBottomRef = useRef<HTMLDivElement>(null);

  const sizeSteps = [
    {
      icon: Ruler,
      title: t('sizeGuide.steps.measure.title'),
      description: t('sizeGuide.steps.measure.description'),
    },
    {
      icon: Check,
      title: t('sizeGuide.steps.adjust.title'),
      description: t('sizeGuide.steps.adjust.description'),
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
            <div className="fabipets-card p-6 md:p-8 h-full">
              <h3 className="font-display font-bold text-black text-xl mb-6">
                {t('sizeGuide.howToMeasure')}
              </h3>
              
              {/* Size Chart - How to measure */}
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-black/10">
                  <span className="font-body text-black/70">{t('sizeGuide.measurements.neck.label')}</span>
                  <span className="font-mono text-black">{t('sizeGuide.measurements.neck.value')}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-black/10">
                  <span className="font-body text-black/70">{t('sizeGuide.measurements.chest.label')}</span>
                  <span className="font-mono text-black">{t('sizeGuide.measurements.chest.value')}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-black/10">
                  <span className="font-body text-black/70">{t('sizeGuide.measurements.length.label')}</span>
                  <span className="font-mono text-black">{t('sizeGuide.measurements.length.value')}</span>
                </div>
              </div>

              {/* Desktop Table */}
              <div className="mt-8 hidden md:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-black">
                      <th className="text-left py-2 font-display font-bold">{t('sizeGuide.table.size')}</th>
                      <th className="text-left py-2 font-display font-bold">{t('sizeGuide.table.neck')}</th>
                      <th className="text-left py-2 font-display font-bold">{t('sizeGuide.table.chest')}</th>
                      <th className="text-left py-2 font-display font-bold">{t('sizeGuide.table.length')}</th>
                    </tr>
                  </thead>
                  <tbody className="font-body">
                    {sizeData.map((row) => (
                      <tr key={row.size} className="border-b border-black/10">
                        <td className="py-2 font-semibold">{row.size}</td>
                        <td className="py-2">{row.neck}</td>
                        <td className="py-2">{row.chest}</td>
                        <td className="py-2">{row.length}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="mt-8 md:hidden space-y-3">
                {sizeData.map((row) => (
                  <div 
                    key={row.size} 
                    className="bg-black/5 rounded-xl p-4 border border-black/10"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-display font-bold text-lg bg-camel text-white px-3 py-1 rounded-full">
                        {row.size}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div className="text-center">
                        <p className="font-mono text-black/50 text-xs uppercase">{t('sizeGuide.table.neck')}</p>
                        <p className="font-body text-black font-medium">{row.neck}</p>
                      </div>
                      <div className="text-center border-x border-black/10">
                        <p className="font-mono text-black/50 text-xs uppercase">{t('sizeGuide.table.chest')}</p>
                        <p className="font-body text-black font-medium">{row.chest}</p>
                      </div>
                      <div className="text-center">
                        <p className="font-mono text-black/50 text-xs uppercase">{t('sizeGuide.table.length')}</p>
                        <p className="font-body text-black font-medium">{row.length}</p>
                      </div>
                    </div>
                  </div>
                ))}
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
              <img
                src="/images/new_image_17.jpg"
                alt="Size guide demonstration"
                loading="lazy"
                decoding="async"
                className="w-full h-48 md:h-56 object-cover p-2 rounded-[18px]"
              />
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
