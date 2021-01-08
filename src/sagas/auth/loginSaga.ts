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
    let csrf_response = yield call(request, {
        baseURL: api_domain,
        url: '/sanctum/csrf-cookie',
    })
    if (csrf_response['error'] && csrf_response['response']['status'] !== NO_CONTENT) return
    if (!!csrf_response?.response?.config?.headers?.['X-XSRF-TOKEN'])
        yield put(setDatasetToReducer(csrf_response.response.config.headers['X-XSRF-TOKEN'], 'csrf_token'))

    let login_response: any = yield call(request, {
        method: 'POST',
        url: '/login',
        //debug: true,
        data: {
            email,
            password,
        },
    })
    if (login_response.error) {
        if (login_response?.response?.status === UNPROCESSABLE_ENTITY) {
            let errors = login_response?.data?.errors || {}
            let errorMessage = Object.keys(errors)
                .map(fieldName => `${capitalizeWords(fieldName)}: ${errors[fieldName].join('\n')}`)
                .join('\n')

            showToast({
                message: errorMessage,
                title: login_response?.data?.message,
                type: 'error',
            })
        }
        return
    }
    yield put(setDatasetToReducer(true, 'user_has_auth'))
    Router.replace('/dashboard')
}

export default function* saga() {
    yield takeLatest(AUTH_LOGIN_SAGA, loginSaga)
}
