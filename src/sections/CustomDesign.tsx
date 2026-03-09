import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Eye } from 'lucide-react';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

const CustomDesign = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const leftPhotoRef = useRef<HTMLDivElement>(null);
  const rightTopRef = useRef<HTMLDivElement>(null);
  const rightBottomRef = useRef<HTMLDivElement>(null);
  const formPanelRef = useRef<HTMLDivElement>(null);
  const stampRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    petName: '',
    idea: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t('custom.form.successMessage'));
    setFormData({ name: '', whatsapp: '', petName: '', idea: '' });
  };

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
        formPanelRef.current,
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: formPanelRef.current,
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
      id="custom"
      className="relative w-full min-h-screen bg-blush flex items-center justify-center z-40 py-16 md:py-24"
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
                src="/images/custom_fit_main.jpg"
                alt="Custom fit design"
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
                  src="/images/custom_fit_detail.jpg"
                  alt="Custom fit detail"
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
                  src="/images/size_guide_photo.jpg"
                  alt="Size guide"
                  className="w-full h-full object-cover rounded-[14px]"
                />
              </div>
            </div>
          </div>

          {/* Form Panel */}
          <div
            ref={formPanelRef}
            className="md:col-span-3 bg-white card-border rounded-[28px] p-6 md:p-8 flex flex-col"
          >
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-black/60">
                {t('custom.label')}
              </span>
              <h2 className="font-display font-black text-black text-xl md:text-2xl mt-3 leading-tight">
                {t('custom.title')}
              </h2>
              <p className="font-body text-black/70 text-sm mt-3 leading-relaxed">
                {t('custom.description')}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 flex flex-col mt-6 gap-3">
              <input
                type="text"
                placeholder={t('custom.form.namePlaceholder')}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full text-sm"
                required
              />
              <input
                type="tel"
                placeholder={t('custom.form.whatsappPlaceholder')}
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                className="w-full text-sm"
                required
              />
              <input
                type="text"
                placeholder={t('custom.form.petNamePlaceholder')}
                value={formData.petName}
                onChange={(e) => setFormData({ ...formData, petName: e.target.value })}
                className="w-full text-sm"
                required
              />
              <textarea
                placeholder={t('custom.form.ideaPlaceholder')}
                value={formData.idea}
                onChange={(e) => setFormData({ ...formData, idea: e.target.value })}
                className="w-full text-sm flex-1 resize-none"
                rows={3}
              />
              <button
                type="submit"
                className="w-full btn-primary flex items-center justify-center gap-2 text-sm"
              >
                <Send className="w-4 h-4" />
                {t('custom.form.submit')}
              </button>
            </form>

            <a
              href="#lookbook"
              className="inline-flex items-center gap-2 mt-4 text-black/70 font-body text-sm hover:text-camel transition-colors"
            >
              <Eye className="w-4 h-4" />
              {t('custom.seeExamples')}
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
          <span className="font-display font-black text-white text-sm text-center leading-tight">
            {t('custom.stamp')}
          </span>
        </div>
      </div>
    </section>
  );
};

export default CustomDesign;
