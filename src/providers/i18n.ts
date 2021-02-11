import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import translationData from '../assets/lang/data.json'
import detector from 'i18next-browser-languagedetector'

const getTransDataByLang = (lang_id = '') => {
    let dataLang: any = {}
    Object.keys(translationData).map(key => {
        dataLang[key] = translationData?.[key]?.[lang_id]
    })
    return dataLang
}

i18n.use(detector)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources: {
            en: {
                translation: getTransDataByLang('en'),
            },
            es: {
                translation: getTransDataByLang('es'),
            },
        },
        //lng: 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    })
export default i18n
