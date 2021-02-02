import http_request, { Options, Response } from '../utils/request'
import { takeLatest, put, call, select } from 'redux-saga/effects'
import { REQUEST_SAGA } from './actions'
//import {} from '../../redux/selectors'
import { datasetSelector } from '../redux/selectors'
import { setDatasetToReducer } from '../redux/actions'
import { UNAUTHORIZED } from 'http-status'
import Router from 'next/router'

function* authCheck(response: any) {
    const auth_token = yield select(state => datasetSelector(state, 'auth_token'))
    if (response['status'] === UNAUTHORIZED) {
        if (auth_token) yield put(setDatasetToReducer(false, 'auth_token'))
        Router.replace('/login')
    }
}

export function* request(options: Options): object {
    const auth_token = yield select(state => datasetSelector(state, 'auth_token'))

    options.headers = {
        ...options.headers,
        'Content-Type': 'application/json',
        Accept: 'application/json, text/plain',
        //'X-Requested-With': 'XMLHttpRequest',
    }
    if (!!auth_token) {
        options.headers['Authorization'] = `Bearer ${auth_token}`
    }

    let result: Response = yield call(http_request, options)

    yield call(authCheck, result['response'])

    return result
}

export default function* saga() {
    yield takeLatest(REQUEST_SAGA, request)
}
