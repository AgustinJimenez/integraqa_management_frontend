import { Options } from '../utils/request'

export const SAGA_SEARCH_MEAL: string = 'SAGA_SEARCH_MEAL'
export const AUTH_REGISTER_SAGA: string = 'AUTH_REGISTER_SAGA'
export const AUTH_LOGIN_SAGA: string = 'AUTH_LOGIN_SAGA'
export const AUTH_LOGOUT_SAGA: string = 'AUTH_LOGOUT_SAGA'
export const REQUEST_SAGA: string = 'REQUEST_SAGA'
export const EMAIL_CONFIRMATION_SAGA: string = 'EMAIL_CONFIRMATION_SAGA'
export const PASSWORD_RECOVERY_SAGA: string = 'PASSWORD_RECOVERY_SAGA'
export const PASSWORD_RESET_SAGA: string = 'PASSWORD_RESET_SAGA'
export const PASSWORD_RESET_CODE_CHECK_SAGA: string = 'PASSWORD_RESET_CODE_CHECK_SAGA'

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

export const emailConfirmationSagaAction = ({ verification_code = '' }: any = {}) => ({
    type: EMAIL_CONFIRMATION_SAGA,
    verification_code,
})

export const passwordRecoverySagaAction = ({ email = '' }: any = {}) => ({
    type: PASSWORD_RECOVERY_SAGA,
    email,
})
export const passwordResetSagaAction = ({ new_password = '', reset_code = '' }: any = {}) => ({
    type: PASSWORD_RESET_SAGA,
    new_password,
    reset_code,
})

export const passwordResetCodeCheckSagaAction = ({ reset_code = '', callback = () => {} }: any = {}) => ({
    type: PASSWORD_RESET_CODE_CHECK_SAGA,
    reset_code,
    callback,
})
