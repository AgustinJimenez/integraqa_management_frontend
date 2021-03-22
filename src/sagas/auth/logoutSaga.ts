import { takeLatest, put, call } from 'redux-saga/effects'
import { AUTH_LOGOUT_SAGA } from '../actions'
import { setDatasetToReducer } from '../../redux/actions'
import { request } from '../requestSaga'
import Router from 'next/router'

function* logoutSaga() {
    yield call(request, {
        method: 'POST',
        url: 'logout',
        //debug: true,
    })

    yield put(setDatasetToReducer(null, 'auth_token'))
    Router.replace('/login')
}

export default function* saga() {
    yield takeLatest(AUTH_LOGOUT_SAGA, logoutSaga)
}
