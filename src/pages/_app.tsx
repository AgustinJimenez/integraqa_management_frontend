import { Provider } from 'react-redux'
import { useStore } from '../redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import './app.scss'

export default function App({ Component, pageProps }: any) {
    const { store, persistor } = useStore(pageProps.initialReduxState)

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Component {...pageProps} />
            </PersistGate>
        </Provider>
    )
}
