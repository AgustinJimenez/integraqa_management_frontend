import { takeLatest, put, call } from 'redux-saga/effects'
import { AUTH_LOGOUT_SAGA } from '../actions'
import { setDatasetToReducer } from '../../redux/actions'
import { request } from '../requestSaga'
import { NO_CONTENT, UNPROCESSABLE_ENTITY } from 'http-status'
import { api_domain } from '../../../env.json'
import Router from 'next/router'
import { dashboardPageRouteProps } from '../../routes'
import { showToast } from '../../utils/showToast'
import capitalizeWords from '../../utils/capitalizeWords'

function* logoutSaga() {
    let logout_response = yield call(request, {
        method: 'POST',
        url: 'logout',
        debug: true,
    })

    yield put(setDatasetToReducer(null, 'auth_token'))
    Router.replace('/login')
}

export default function* saga() {
    yield takeLatest(AUTH_LOGOUT_SAGA, logoutSaga)
}
