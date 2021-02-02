import { takeLatest, put, call } from 'redux-saga/effects'
import { AUTH_LOGIN_SAGA } from '../actions'
import { setDatasetToReducer } from '../../redux/actions'
import { request } from '../requestSaga'
import { NO_CONTENT, UNPROCESSABLE_ENTITY } from 'http-status'
import { api_domain } from '../../../env.json'
import Router from 'next/router'
import { dashboardPageRouteProps } from '../../routes'
import { showToast } from '../../utils/showToast'
import capitalizeWords from '../../utils/capitalizeWords'

function* loginSaga({ email, password, rememberMe }: any = {}) {
    var { data, error, message }: any = yield call(request, {
        method: 'POST',
        url: '/auth/login',
        //debug: true,
        data: {
            email,
            password,
        },
    })

    if (error) {
        showToast({
            message: message,
            //title: login_response?.message,
            type: 'error',
        })
        return
    }
    yield put(setDatasetToReducer(data?.access_token, 'auth_token'))

    var { data, error, message }: any = yield call(request, {
        url: '/auth/me',
        //debug: true,
    })
    yield put(setDatasetToReducer(data, 'user'))
    showToast({
        message: 'Access granted',
        title: 'INFO:',
        type: 'success',
    })
    Router.replace('/dashboard')
}

export default function* saga() {
    yield takeLatest(AUTH_LOGIN_SAGA, loginSaga)
}
