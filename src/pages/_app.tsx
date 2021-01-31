import React from 'react'
import { Provider } from 'react-redux'
import { useStore } from '../redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import './app.scss'
import AxiosProvider from '../providers/AxiosProvider'
import AuthProvider from '../providers/AuthProvider'
const { ToastContainer } = require('react-nextjs-toast')
import { Loader } from '../components/Loader'
import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({})

const App = ({ Component, pageProps }: any) => {
    const { store, persistor } = useStore(pageProps.initialReduxState)

    return (
        <Provider store={store}>
            <AxiosProvider>
                <PersistGate loading={<Loader />} persistor={persistor}>
                    <AuthProvider>
                        <Component {...pageProps} />
                        <ToastContainer />
                    </AuthProvider>
                </PersistGate>
            </AxiosProvider>
        </Provider>
    )
}

export default App
