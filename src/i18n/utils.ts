import { ui, defaultLang } from './ui';
import path from 'node:path';

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  }
}

/**
 * Calculates a relative path from the current URL to a target absolute path.
 * This is essential for static deployments where the base path might vary.
 */
export function getRelativeLink(url: URL, target: string) {
  const currentPath = url.pathname;
  let absoluteTarget = target;
  
  if (target.endsWith('/')) {
    absoluteTarget += 'index.html';
  } else if (!target.includes('.') && !target.includes('#')) {
    // If it's a directory-like path without dot or hash, assume it's a route
    absoluteTarget += '/index.html';
  }
  
  // Normalize double slashes
  absoluteTarget = absoluteTarget.replace(/\/+/g, '/');
  
  // Calculate relative to the directory of the current file
  const currentDir = currentPath.endsWith('/') ? currentPath : path.posix.dirname(currentPath);
  
  let rel = path.posix.relative(currentDir, absoluteTarget);
  
  // Handle root level
  if (rel === '') rel = 'index.html';
  
  return rel;
}
