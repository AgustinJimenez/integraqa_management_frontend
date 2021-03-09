import { all } from 'redux-saga/effects'

import registerSaga from './auth/registerSaga'
import loginSaga from './auth/loginSaga'
import requestSaga from './requestSaga'
import logoutSaga from './auth/logoutSaga'
import emailConfirmationSaga from './auth/emailConfirmationSaga'
import passwordRecoverySaga from './auth/passwordRecoverySaga'
import passwordResetSaga from './auth/passwordResetSaga'
import passwordResetCodeCheckSaga from './auth/passwordResetCodeCheckSaga'

const allSagas: any[] = [
    registerSaga(),
    loginSaga(),
    requestSaga(),
    logoutSaga(),
    emailConfirmationSaga(),
    passwordRecoverySaga(),
    passwordResetSaga(),
    passwordResetCodeCheckSaga(),
]

export default function* rootSaga() {
    yield all(allSagas)
}
