const { toast } = require('react-nextjs-toast')

export const showToast = ({ message = '', type = '', title = '' }) => {
    toast.notify(message, { type, title })
}
