import { ui, defaultLang, showDefaultLang, languages } from './ui';

// Get language from URL
export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

// Get language from browser settings or saved preference
export function detectLanguage(headers: Headers, cookieLang?: string): keyof typeof ui {
  // First check for cookie preference
  if (cookieLang && cookieLang in ui) {
    return cookieLang as keyof typeof ui;
  }
  
  // Then check Accept-Language header
  try {
    const acceptLang = headers.get('accept-language');
    if (acceptLang) {
      // Parse the Accept-Language header
      const browserLangs = acceptLang.split(',')
        .map(lang => {
          const [tag, q = '1'] = lang.split(';q=');
          return { tag: tag.trim().split('-')[0], q: Number(q) };
        })
        .sort((a, b) => b.q - a.q);
      
      // Find first matching language
      for (const { tag } of browserLangs) {
        // Direct match
        if (tag in ui) {
          return tag as keyof typeof ui;
        }
        
        // Check for matches like 'en-US' -> 'en'
        const langCode = Object.keys(ui).find(l => tag.startsWith(l));
        if (langCode) {
          return langCode as keyof typeof ui;
        }
      }
    }
  } catch (e) {
    console.error('Error parsing Accept-Language header:', e);
  }
  
  // Default fallback
  return defaultLang;
}

// Translation function
export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  }
}

// Path translation helper
export function useTranslatedPath(lang: keyof typeof ui) {
  return function translatePath(path: string, l: string = lang) {
    const langPath = l as keyof typeof ui;
    return !showDefaultLang && langPath === defaultLang 
      ? path 
      : `/${langPath}${path.startsWith('/') ? path : `/${path}`}`;
  }
}

// RTL language check
export function isRTL(lang: string): boolean {
  return lang === 'ar';
} 