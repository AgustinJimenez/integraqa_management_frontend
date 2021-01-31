import { useMemo } from 'react'
import initialState from './initialState'
import reducer from './reducer'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistStore, persistReducer } from 'redux-persist'
import storage from './storage'
import createSagaMiddleware from 'redux-saga'
import sagas from '../sagas'
import { show_redux_logs } from '../../env.json'

const persistConfig = {
    key: 'root',
    storage,
    timeout: undefined,
}
const persistedReducer = persistReducer(persistConfig, reducer)

let store: any

function initStore(preloadedState = initialState) {
    const sagaMiddleware = createSagaMiddleware()
    const middlewares = [sagaMiddleware]

    if (process.env.NODE_ENV === `development` && show_redux_logs) {
        const { logger } = require(`redux-logger`)
        middlewares.push(logger)
    }
    let store = createStore(persistedReducer, preloadedState, composeWithDevTools(applyMiddleware(...middlewares)))
    sagaMiddleware.run(sagas)
    return store
}

export const initializeStore = (preloadedState: any) => {
    let _store = store ?? initStore(preloadedState)

    // After navigating to a page with an initial Redux state, merge that state
    // with the current state in the store, and create a new store
    if (preloadedState && store) {
        _store = initStore({
            ...store.getState(),
            ...preloadedState,
        })
        // Reset the current store
        store = undefined
    }

    // For SSG and SSR always create a new store
    if (typeof window === 'undefined') return _store
    // Create the store once in the client
    if (!store) store = _store

    return _store
}

export function useStore(initialState: any) {
    const store = useMemo(() => initializeStore(initialState), [initialState])
    let persistor = persistStore(store)
    return { store, persistor }
}
