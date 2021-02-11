const { toast } = require('react-nextjs-toast')
import i18n from 'i18next'

export const showToast = ({ message = '', type = '', title = '' }) => {
    if (!title && type === 'error') title = 'ERROR'
    else if (!title && type === 'success') title = 'INFO'

    toast.notify(i18n.t(message), { type, title })
}
