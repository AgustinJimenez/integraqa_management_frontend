import http_request, { Options, Response } from '../utils/request'
import { takeLatest, put, call, select } from 'redux-saga/effects'
import { REQUEST_SAGA } from './actions'
//import {} from '../../redux/selectors'
import { datasetSelector } from '../redux/selectors'
import { setDatasetToReducer } from '../redux/actions'
import { UNAUTHORIZED } from 'http-status'
import Router from 'next/router'

function* authCheck(response: any) {
    const user_has_auth = yield select(state => datasetSelector(state, 'user_has_auth'))
    if (response['status'] === UNAUTHORIZED) {
        if (user_has_auth) yield put(setDatasetToReducer(false, 'user_has_auth'))
        Router.replace('/login')
    }
}

export function* request(options: Options): object {
    const csrf_token = yield select(state => datasetSelector(state, 'csrf_token'))

    options.headers = {
        ...options.headers,
        Authorization: `Bearer ${csrf_token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json, text/plain',
        'X-Requested-With': 'XMLHttpRequest',
    }
    if (!!csrf_token) {
        options.headers['X-XSRF-TOKEN'] = csrf_token
        options.headers['Authorization'] = csrf_token
    }

    let result: Response = yield call(http_request, options)

    yield call(authCheck, result['response'])

    if (!!result?.['response']?.['config']?.['headers']?.['X-XSRF-TOKEN'] && result?.['response']?.['config']?.['headers']?.['X-XSRF-TOKEN'] !== csrf_token)
        yield put(setDatasetToReducer(result?.['response']?.['config']?.['headers']?.['X-XSRF-TOKEN'], 'csrf_token'))

    return result
}

export default function* saga() {
    yield takeLatest(REQUEST_SAGA, request)
}
