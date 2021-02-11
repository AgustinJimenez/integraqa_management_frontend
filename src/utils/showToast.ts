const { toast } = require('react-nextjs-toast')
import i18n from 'i18next'

export const showToast = ({ message = '', type = '', title = '' }) => {
    toast.notify(i18n.t(message), { type, title })
}
