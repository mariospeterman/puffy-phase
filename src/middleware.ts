import { defineMiddleware } from 'astro:middleware';
import { detectLanguage } from './i18n/utils';
import { ui, defaultLang } from './i18n/ui';

// Type for Locals from env.d.ts
type Locals = {
  lang: keyof typeof ui;
};

export const onRequest = defineMiddleware(async ({ request, locals, cookies, redirect }, next) => {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  // Skip for static assets
  if (
    pathname.startsWith('/assets/') || 
    pathname.startsWith('/styles/') || 
    pathname.match(/\.(ico|png|jpg|jpeg|svg|css|js)$/)
  ) {
    return next();
  }
  
  // Check if URL already has a language prefix
  const [, langPathSegment] = pathname.split('/');
  const hasLangPrefix = Object.keys(ui).includes(langPathSegment);
  
  // If no language in URL, detect and redirect
  if (!hasLangPrefix && pathname !== '/') {
    // Get cookie if exists
    const preferredLang = cookies.get('preferredLanguage')?.value;
    // Detect language from browser or cookie
    const detectedLang = detectLanguage(request.headers, preferredLang);
    
    // Redirect to language path
    const newPath = detectedLang === defaultLang ? pathname : `/${detectedLang}${pathname}`;
    return redirect(newPath);
  }
  
  // For root path / - redirect to detected language
  if (pathname === '/') {
    const preferredLang = cookies.get('preferredLanguage')?.value;
    const detectedLang = detectLanguage(request.headers, preferredLang);
    
    // Redirect to language homepage
    return redirect(`/${detectedLang}/`);
  }
  
  // Extract language from URL for pages with language prefix
  if (hasLangPrefix) {
    (locals as Locals).lang = langPathSegment as keyof typeof ui;
  } else {
    (locals as Locals).lang = defaultLang;
  }
  
  return next();
}); 