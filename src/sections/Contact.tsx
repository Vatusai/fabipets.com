import { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { MessageCircle, Mail, Send, Instagram } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CONTACT, WEB3FORMS } from '../config';
import { supabase } from '../lib/supabase';

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
    phone: '',
    subject: '',
    pet: '',
    message: '',
  });
  const [photo, setPhoto] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const body = new FormData();
      body.append('access_key', WEB3FORMS.accessKey);
      body.append('name', formData.name);
      body.append('email', formData.email);
      body.append('phone', formData.phone);
      body.append('subject', formData.subject);
      body.append('pet', formData.pet);
      body.append('message', formData.message);
      if (photo) body.append('attachment', photo);

      const res = await fetch(WEB3FORMS.endpoint, {
        method: 'POST',
        body,
      });

      const data = await res.json();

      if (data.success) {
        // Guardar en Supabase
        await supabase.from('messages').insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          subject: formData.subject || null,
          pet: formData.pet || null,
          message: formData.message || null,
        });

        setStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: '', pet: '', message: '' });
        setPhoto(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
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
        {/* Mobile/Tablet: Grid layout | Desktop: Absolute positioning */}
        <div className="grid grid-cols-1 lg:block relative min-h-[auto] lg:min-h-[80vh]">
          
          {/* Left Photo Card (large) - Hidden on mobile, visible on lg+ */}
          <div
            ref={leftPhotoRef}
            className="hidden lg:block fabipets-card overflow-hidden absolute"
            style={{
              left: '0',
              top: '0',
              width: '46vw',
              height: '72vh',
            }}
          >
            <img
              src="/images/new_image_02.png"
              alt="Contact us"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover p-2.5 rounded-[28px]"
            />
          </div>

          {/* Mobile Hero Image */}
          <div className="lg:hidden mb-6">
            <div className="fabipets-card overflow-hidden">
              <img
                src="/images/new_image_02.png"
                alt="Contact us"
                loading="lazy"
                decoding="async"
                className="w-full h-64 object-cover p-2 rounded-[20px]"
              />
            </div>
          </div>

          {/* Right Top Photo Card (small) - Hidden on mobile */}
          <div
            ref={rightTopRef}
            className="hidden lg:block fabipets-card-sm overflow-hidden absolute"
            style={{
              left: '50vw',
              top: '0',
              width: '18vw',
              height: '22vh',
            }}
          >
            <img
              src="/images/new_image_03.jpg"
              alt="Happy pet"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover p-2 rounded-[18px]"
            />
          </div>

          {/* Right Bottom Photo Card (medium) - Hidden on mobile */}
          <div
            ref={rightBottomRef}
            className="hidden lg:block fabipets-card-sm overflow-hidden absolute"
            style={{
              left: '50vw',
              top: '28vh',
              width: '18vw',
              height: '44vh',
            }}
          >
            <img
              src="/images/new_image_04.jpg"
              alt="Elegant cat"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover p-2 rounded-[18px]"
            />
          </div>

          {/* Contact Panel - Full width on mobile, positioned on desktop */}
          <div
            ref={contactPanelRef}
            className="lg:absolute bg-camel card-border rounded-[28px] p-6 md:p-8 flex flex-col justify-between lg:ml-auto w-full lg:max-w-[360px] lg:w-auto"
            style={{
              right: '0',
              top: '0',
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
                href={CONTACT.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 bg-white text-black font-display font-semibold text-sm px-5 py-3 rounded-full hover:bg-black hover:text-white transition-colors duration-300"
              >
                <MessageCircle className="w-4 h-4" />
                {t('contact.orderWhatsApp')}
              </a>

              {/* Secondary CTA */}
              <a
                href={`mailto:${CONTACT.email}`}
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
                className="w-full text-sm bg-white/10 border-white/30 text-white placeholder:text-white/50 min-h-[44px] touch-manipulation"
                required
              />
              <input
                type="email"
                placeholder={t('contact.form.emailPlaceholder')}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full text-sm bg-white/10 border-white/30 text-white placeholder:text-white/50 min-h-[44px] touch-manipulation"
                required
              />
              <input
                type="tel"
                placeholder={t('contact.form.phonePlaceholder')}
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full text-sm bg-white/10 border-white/30 text-white placeholder:text-white/50 min-h-[44px] touch-manipulation"
              />
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full text-sm bg-white/10 border border-white/30 text-white rounded-lg px-3 py-3 appearance-none min-h-[44px]"
                required
              >
                <option value="" disabled className="bg-neutral-800">{t('contact.form.subjectPlaceholder')}</option>
                <option value="dog" className="bg-neutral-800">{t('contact.form.subjectOptions.dog')}</option>
                <option value="cat" className="bg-neutral-800">{t('contact.form.subjectOptions.cat')}</option>
                <option value="rabbit" className="bg-neutral-800">{t('contact.form.subjectOptions.rabbit')}</option>
                <option value="other" className="bg-neutral-800">{t('contact.form.subjectOptions.other')}</option>
              </select>
              <input
                type="text"
                placeholder={t('contact.form.petPlaceholder')}
                value={formData.pet}
                onChange={(e) => setFormData({ ...formData, pet: e.target.value })}
                className="w-full text-sm bg-white/10 border-white/30 text-white placeholder:text-white/50 min-h-[44px] touch-manipulation"
              />
              {/* Photo upload */}
              <label className="flex flex-col items-center justify-center w-full border border-dashed border-white/30 rounded-lg px-3 py-4 cursor-pointer hover:border-white/60 transition-colors min-h-[44px]">
                <span className="text-white/50 text-xs text-center">
                  {photo ? photo.name : t('contact.form.photoPlaceholder')}
                </span>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setPhoto(e.target.files?.[0] ?? null)}
                />
              </label>

              <textarea
                placeholder={t('contact.form.messagePlaceholder')}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full text-sm bg-white/10 border-white/30 text-white placeholder:text-white/50 resize-none touch-manipulation"
                rows={3}
                required
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-white text-black font-display font-semibold text-sm px-5 py-3 rounded-full hover:bg-black hover:text-white transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed min-h-[48px]"
              >
                <Send className="w-4 h-4" />
                {status === 'loading' ? t('contact.form.sending') : t('contact.form.send')}
              </button>

              {status === 'success' && (
                <p className="text-white/90 text-sm text-center mt-1">
                  ✓ {t('contact.form.successMessage')}
                </p>
              )}
              {status === 'error' && (
                <p className="text-red-300 text-sm text-center mt-1">
                  {t('contact.form.errorMessage')}
                </p>
              )}
            </form>

            {/* Social Links */}
            <div className="mt-6 pt-6 border-t border-white/20">
              <p className="font-mono text-xs uppercase tracking-widest text-white/60 mb-4">
                {t('contact.followUs')}
              </p>
              <div className="flex items-center gap-4">
                <a
                  href={CONTACT.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 text-white" />
                </a>
                <a
                  href={CONTACT.tiktok}
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

          {/* Stamp - Hidden on mobile */}
          <div
            ref={stampRef}
            className="hidden lg:flex absolute bg-camel border-2 border-white rounded-full items-center justify-center stamp-rotate"
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
