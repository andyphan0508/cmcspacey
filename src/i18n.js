import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import vi from './locales/vi'
import en from './locales/en'
import zh from './locales/zh'

const saved = (typeof localStorage !== 'undefined' && localStorage.getItem('lang')) || 'vi'

i18n.use(initReactI18next).init({
  resources: {
    vi: { translation: vi },
    en: { translation: en },
    zh: { translation: zh },
  },
  lng: saved,
  fallbackLng: 'vi',
  interpolation: { escapeValue: false },
})

document.documentElement.lang = saved

i18n.on('languageChanged', lng => {
  localStorage.setItem('lang', lng)
  document.documentElement.lang = lng
})

export default i18n
