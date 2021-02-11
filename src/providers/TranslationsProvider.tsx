import React from 'react'
import i18n from 'i18next'
import { useSelector } from 'react-redux'
import { datasetSelector } from '../redux/selectors'
import { I18nextProvider } from 'react-i18next'
import './i18n.ts'

export const TranslationsProvider = ({ children }: any) => {
    const language = useSelector((state: any) => datasetSelector(state, 'language'))

    React.useEffect(() => {
        if (!!language) {
            i18n.changeLanguage(language)
        }
    }, [language])

    return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}
