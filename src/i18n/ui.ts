import { ui as enUI } from './languages/en'
import { ui as esUI } from './languages/es'

export const languages = {
  en: 'English',
  es: 'Español'
}

export const defaultLanguage = 'en'

export const ui = {
  en: enUI,
  es: esUI
} as const
