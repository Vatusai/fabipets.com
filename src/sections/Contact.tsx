import { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageCircle, Mail, Send, Instagram } from 'lucide-react';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const leftPhotoRef = useRef<HTMLDivElement>(null);
  const rightTopRef = useRef<HTMLDivElement>(null);
  const rightBottomRef = useRef<HTMLDivElement>(null);
  const contactPanelRef = useRef<HTMLDivElement>(null);
  const stampRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t('contact.form.successMessage'));
    setFormData({ name: '', email: '', message: '' });
  };

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftPhotoRef.current,
        { x: '-12vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: leftPhotoRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        [rightTopRef.current, rightBottomRef.current],
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
        contactPanelRef.current,
        { x: '12vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contactPanelRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        stampRef.current,
        { scale: 0.2, rotation: -120, opacity: 0 },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'back.out(1.8)',
          scrollTrigger: {
            trigger: stampRef.current,
            start: 'top 85%',
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
      id="contact"
      className="section-flowing bg-dark z-[90] relative"
    >
      <div className="px-6 md:px-[7vw] py-16 md:py-24">
        <div className="relative min-h-[80vh]">
          {/* Left Photo Card (large) */}
          <div
            ref={leftPhotoRef}
            className="absolute fabipets-card overflow-hidden hidden md:block"
            style={{
              left: '0',
              top: '0',
              width: '46vw',
              height: '72vh',
            }}
          >
            <img
              src="/images/new_image_03.jpg"
              alt="Contact us"
              className="w-full h-full object-cover p-2.5 rounded-[28px]"
            />
          </div>

          {/* Right Top Photo Card (small) */}
          <div
            ref={rightTopRef}
            className="absolute fabipets-card-sm overflow-hidden hidden md:block"
            style={{
              left: '50vw',
              top: '0',
              width: '18vw',
              height: '22vh',
            }}
          >
            <img
              src="/images/new_image_04.jpg"
              alt="Happy pet"
              className="w-full h-full object-cover p-2 rounded-[18px]"
            />
          </div>

          {/* Right Bottom Photo Card (medium) */}
          <div
            ref={rightBottomRef}
            className="absolute fabipets-card-sm overflow-hidden hidden md:block"
            style={{
              left: '50vw',
              top: '28vh',
              width: '18vw',
              height: '44vh',
            }}
          >
            <img
              src="/images/new_image_05.jpg"
              alt="Elegant cat"
              className="w-full h-full object-cover p-2 rounded-[18px]"
            />
          </div>

          {/* Contact Panel (right, large) */}
          <div
            ref={contactPanelRef}
            className="md:absolute bg-camel card-border rounded-[28px] p-6 md:p-8 flex flex-col justify-between md:ml-auto"
            style={{
              right: '0',
              top: '0',
              width: '100%',
              maxWidth: '360px',
              minHeight: '72vh',
            }}
          >
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-white/80">
                {t('contact.label')}
              </span>
              <h2 className="font-display font-black text-white text-2xl md:text-3xl mt-4 leading-tight">
                {t('contact.title')}
              </h2>
              <p className="font-body text-white/90 text-sm mt-4 leading-relaxed">
                {t('contact.description')}
              </p>

              {/* Primary CTA */}
              <a
                href="https://api.whatsapp.com/send/?phone=584142490629&text&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 bg-white text-black font-display font-semibold text-sm px-5 py-3 rounded-full hover:bg-black hover:text-white transition-colors duration-300"
              >
                <MessageCircle className="w-4 h-4" />
                {t('contact.orderWhatsApp')}
              </a>

              {/* Secondary CTA */}
              <a
                href="mailto:info@fabipets.com"
                className="inline-flex items-center gap-2 mt-3 text-white font-body text-sm hover:underline"
              >
                <Mail className="w-4 h-4" />
                {t('contact.emailUs')}
              </a>
            </div>

            {/* Mini Form */}
            <form onSubmit={handleSubmit} className="mt-8 space-y-3">
              <input
                type="text"
                placeholder={t('contact.form.namePlaceholder')}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full text-sm bg-white/10 border-white/30 text-white placeholder:text-white/50"
                required
              />
              <input
                type="email"
                placeholder={t('contact.form.emailPlaceholder')}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full text-sm bg-white/10 border-white/30 text-white placeholder:text-white/50"
                required
              />
              <textarea
                placeholder={t('contact.form.messagePlaceholder')}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full text-sm bg-white/10 border-white/30 text-white placeholder:text-white/50 resize-none"
                rows={3}
                required
              />
              <button
                type="submit"
                className="w-full bg-white text-black font-display font-semibold text-sm px-5 py-3 rounded-full hover:bg-black hover:text-white transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                {t('contact.form.send')}
              </button>
            </form>

            {/* Social Links */}
            <div className="mt-6 pt-6 border-t border-white/20">
              <p className="font-mono text-xs uppercase tracking-widest text-white/60 mb-4">
                {t('contact.followUs')}
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="https://www.instagram.com/fabi_pets_?igsh=NXQ1YTFydmh2YWsx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 text-white" />
                </a>
                <a
                  href="https://www.tiktok.com/@fabipets?_r=1&_t=ZS-94X3hBbcVAi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="TikTok"
                >
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Stamp */}
          <div
            ref={stampRef}
            className="absolute bg-camel border-2 border-white rounded-full flex items-center justify-center stamp-rotate hidden md:flex"
            style={{
              left: '42vw',
              top: '60vh',
              width: '10vw',
              height: '10vw',
              minWidth: '80px',
              minHeight: '80px',
            }}
          >
            <span className="font-display font-black text-white text-lg md:text-xl">
              {t('contact.stamp')}
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-6 md:px-[7vw]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-display font-bold text-xl text-white">
            Fabipets<span className="text-camel">.</span>
          </div>
          <p className="font-body text-white/60 text-sm text-center">
            {t('contact.footer.tagline')}
          </p>
          <p className="font-mono text-white/40 text-xs">
            {t('contact.footer.copyright', { year: new Date().getFullYear() })}
          </p>
        </div>
      </footer>
    </section>
  );
};

export default Contact;
