import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageToggle from './LanguageToggle';
import { CONTACT } from '../config';

const Navigation = () => {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: t('nav.contact'), href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-10 py-4">

        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center z-10"
        >
          <img
            src="/logo-horizontal.png"
            alt="FabiPets"
            className={`w-auto object-contain transition-all duration-500 ${scrolled ? 'h-9' : 'h-11 md:h-14'}`}
          />
        </a>

        {/* Desktop — glass pill */}
        <div
          className={`hidden md:flex items-center gap-6 px-6 py-2.5 rounded-full transition-all duration-500 ${
            scrolled
              ? 'glass-nav-pill-scrolled'
              : 'glass-nav-pill'
          }`}
        >
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className="font-body text-sm font-medium text-white/90 hover:text-white transition-colors duration-200"
            >
              {link.label}
            </button>
          ))}
          <div className="w-px h-4 bg-white/30" />
          <LanguageToggle />
          <a
            href={CONTACT.whatsapp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-black font-display font-semibold text-xs px-4 py-2 rounded-full hover:bg-black hover:text-white transition-colors duration-300"
          >
            {t('nav.orderWhatsApp')}
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden z-10 p-2 rounded-full glass-nav-pill text-white"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        style={{ background: 'rgba(104, 71, 150, 0.92)', backdropFilter: 'blur(20px)' }}
      >
        {navLinks.map((link) => (
          <button
            key={link.href}
            onClick={() => scrollToSection(link.href)}
            className="font-display text-2xl text-white font-black uppercase hover:text-white/70 transition-colors"
          >
            {link.label}
          </button>
        ))}
        <LanguageToggle />
        <a
          href={CONTACT.whatsapp.url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-black font-display font-semibold px-8 py-3 rounded-full mt-2"
        >
          {t('nav.orderWhatsApp')}
        </a>
      </div>
    </>
  );
};

export default Navigation;
