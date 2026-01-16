import en from '@/locales/en.json'
import { currentLocaleCodes } from './i18n'

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  availableLocales: currentLocaleCodes,
  fallbackLocale: 'en', // 區配不到的語言就用en
  messages: {
    en,
  },
}))
