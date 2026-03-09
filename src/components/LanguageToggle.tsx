import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageToggle = () => {
  const { i18n, t } = useTranslation();
  const isSpanish = i18n.language.startsWith('es');

  const toggleLanguage = () => {
    i18n.changeLanguage(isSpanish ? 'en' : 'es');
  };

  return (
    <button
      onClick={toggleLanguage}
      aria-label={t('language.toggle')}
      className="flex items-center gap-1.5 text-sm font-body transition-colors duration-300 hover:text-camel"
    >
      <Globe className="w-4 h-4" />
      <span className={`${isSpanish ? 'text-camel font-semibold' : 'text-black/60'}`}>
        {t('language.es')}
      </span>
      <span className="text-black/40">/</span>
      <span className={`${!isSpanish ? 'text-camel font-semibold' : 'text-black/60'}`}>
        {t('language.en')}
      </span>
    </button>
  );
};

export default LanguageToggle;
