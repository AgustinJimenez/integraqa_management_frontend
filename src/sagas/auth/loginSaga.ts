import { takeLatest, put, call } from 'redux-saga/effects'
import { AUTH_LOGIN_SAGA } from '../actions'
import { setDatasetToReducer } from '../../redux/actions'
import { request } from '../requestSaga'
import Router from 'next/router'
import { showToast } from '../../utils/showToast'

function* loginSaga({ email, password, rememberMe }: any = {}) {
    var { data, error, message } = yield call(request, {
        method: 'POST',
        url: '/auth/login',
        //debug: true,
        data: {
            email,
            password,
        },
    })

    if (error)
        return showToast({
            message: message,
            //title: login_response?.message,
            type: 'error',
        })

    yield put(setDatasetToReducer(data?.access_token, 'auth_token', { debug: true }))

    var { data, error, message } = yield call(request, {
        url: '/auth/me',
        //debug: true,
    })
    yield put(setDatasetToReducer(data, 'user'))
    showToast({
        message: 'Access granted',
        type: 'success',
    })
    Router.replace('/dashboard')
}

export default function* saga() {
    yield takeLatest(AUTH_LOGIN_SAGA, loginSaga)
}
