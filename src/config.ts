// Centralized configuration for Fabipets

export const CONTACT = {
  whatsapp: {
    phone: '584142490629',
    get url() {
      return `https://api.whatsapp.com/send/?phone=${this.phone}&text&type=phone_number&app_absent=0`;
    },
  },
  email: 'info@fabipets.com',
  instagram: 'https://www.instagram.com/fabi_pets_?igsh=NXQ1YTFydmh2YWsx',
  tiktok: 'https://www.tiktok.com/@fabipets?_r=1&_t=ZS-94X3hBbcVAi',
} as const;

export const WEB3FORMS = {
  accessKey: '3ad313e0-1f45-4cd9-8735-7bb8144e08e1',
  endpoint: 'https://api.web3forms.com/submit',
} as const;

export const BRAND = {
  name: 'Fabipets',
  tagline: {
    es: 'Moda y estilo para tu mascota.',
    en: 'Designer fashion for pets. Made with love.',
  },
} as const;
