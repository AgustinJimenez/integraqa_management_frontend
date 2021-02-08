import { Options } from '../utils/request'

export const SAGA_SEARCH_MEAL: string = 'SAGA_SEARCH_MEAL'
export const AUTH_REGISTER_SAGA: string = 'AUTH_REGISTER_SAGA'
export const AUTH_LOGIN_SAGA: string = 'AUTH_LOGIN_SAGA'
export const AUTH_LOGOUT_SAGA: string = 'AUTH_LOGOUT_SAGA'
export const REQUEST_SAGA: string = 'REQUEST_SAGA'

export const sagaSearchMealAction = ({}: any = {}) => ({
    type: SAGA_SEARCH_MEAL,
})

export const requestSagaAction = (options: Options) => ({
    type: REQUEST_SAGA,
    ...options,
})

export const authRegisterSagaAction = ({ email, password, name }: any = {}) => ({
    type: AUTH_REGISTER_SAGA,
    email,
    password,
    name,
})

export const authLoginSagaAction = ({ email, password, rememberMe }: any = {}) => ({
    type: AUTH_LOGIN_SAGA,
    email,
    password,
    rememberMe,
})

export const authLogoutSagaAction = () => ({
    type: AUTH_LOGOUT_SAGA,
})
