import { defaultLanguage, ui } from './ui'

export function getLanguageFromUrl(url: URL) {
  const [, language] = url.pathname.split('/')
  if (language in ui) {
    return language as keyof typeof ui
  }

  return defaultLanguage
}

export function useTranslations(language: keyof typeof ui) {
  return function t(key: keyof (typeof ui)[typeof defaultLanguage]) {
    return ui[language][key] || ui[defaultLanguage][key]
  }
}
