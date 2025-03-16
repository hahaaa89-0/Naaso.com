import { create } from 'zustand';

type Language = 'en' | 'np';

type TranslationKey = 
  | 'nav.products'
  | 'nav.blog'
  | 'nav.about'
  | 'hero.title'
  | 'hero.subtitle'
  | 'hero.cta';

interface Translations {
  [key: string]: {
    [K in TranslationKey]: string;
  };
}

const translations: Translations = {
  en: {
    'nav.products': 'Products',
    'nav.blog': 'Blog',
    'nav.about': 'About',
    'hero.title': 'From Our Village To Your Table',
    'hero.subtitle': 'Discover the authentic taste of organic products from our village farms',
    'hero.cta': 'Shop Now',
  },
  np: {
    'nav.products': 'उत्पादनहरू',
    'nav.blog': 'ब्लग',
    'nav.about': 'हाम्रोबारे',
    'hero.title': 'हाम्रो गाउँबाट तपाईंको टेबलमा',
    'hero.subtitle': 'हाम्रो गाउँका प्राङ्गारिक उत्पादनहरूको प्रामाणिक स्वाद पत्ता लगाउनुहोस्',
    'hero.cta': 'किन्नुहोस्',
  }
};

interface LanguageStore {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

export const useLanguage = create<LanguageStore>((set, get) => ({
  language: 'en',
  setLanguage: (lang) => set({ language: lang }),
  t: (key) => translations[get().language][key] || key,
}));