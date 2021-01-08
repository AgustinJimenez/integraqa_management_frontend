import { Provider } from 'react-redux'
import { useStore } from '../redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import './app.scss'
import AxiosProvider from '../providers/AxiosProvider'
import AuthProvider from '../providers/AuthProvider'
const { ToastContainer } = require('react-nextjs-toast')

export default function App({ Component, pageProps }: any) {
    const { store, persistor } = useStore(pageProps.initialReduxState)
    return (
        <Provider store={store}>
            <AxiosProvider>
                <AuthProvider>
                    <PersistGate loading={null} persistor={persistor}>
                        <Component {...pageProps} />
                    </PersistGate>
                </AuthProvider>
                <ToastContainer />
            </AxiosProvider>
        </Provider>
    )
}
