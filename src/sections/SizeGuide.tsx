import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Ruler, Check, RefreshCw } from 'lucide-react';
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
      icon: RefreshCw,
      title: t('sizeGuide.steps.returns.title'),
      description: t('sizeGuide.steps.returns.description'),
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
      className="section-flowing bg-blush z-50"
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
              
              {/* Size Chart */}
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

              {/* Size Table */}
              <div className="mt-8 overflow-x-auto">
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
                    <tr className="border-b border-black/10">
                      <td className="py-2">XS</td>
                      <td className="py-2">20-25cm</td>
                      <td className="py-2">30-35cm</td>
                      <td className="py-2">20-25cm</td>
                    </tr>
                    <tr className="border-b border-black/10">
                      <td className="py-2">S</td>
                      <td className="py-2">25-30cm</td>
                      <td className="py-2">35-45cm</td>
                      <td className="py-2">25-30cm</td>
                    </tr>
                    <tr className="border-b border-black/10">
                      <td className="py-2">M</td>
                      <td className="py-2">30-35cm</td>
                      <td className="py-2">45-55cm</td>
                      <td className="py-2">30-35cm</td>
                    </tr>
                    <tr className="border-b border-black/10">
                      <td className="py-2">L</td>
                      <td className="py-2">35-45cm</td>
                      <td className="py-2">55-70cm</td>
                      <td className="py-2">35-45cm</td>
                    </tr>
                    <tr>
                      <td className="py-2">XL</td>
                      <td className="py-2">45-55cm</td>
                      <td className="py-2">70-85cm</td>
                      <td className="py-2">45-55cm</td>
                    </tr>
                  </tbody>
                </table>
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
