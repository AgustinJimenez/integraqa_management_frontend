import { takeLatest, put, call, select } from 'redux-saga/effects'
import { AUTH_REGISTER_SAGA } from '../actions'
import { setDatasetToReducer } from '../../redux/actions'
import { datasetSelector } from '../../redux/selectors'
import { request } from '../requestSaga'
import Router from 'next/router'
import { showToast } from '../../utils/showToast'

function* registerSaga({ email, password, name }: any = {}) {
    yield put(setDatasetToReducer(true, 'is_loading_register_submit'))
    let is_loading_register_submit: boolean = yield select(state => datasetSelector(state, 'is_loading_register_submit'))
    var { error, data, response }: any = yield request({
        method: 'POST',
        url: 'auth/register',
        //debug: true,
        data: {
            name,
            email,
            password,
        },
        show_message: true,
    })
    console.log('REGISTER SAGA !!!', { email, name, password, response, error })
    yield put(setDatasetToReducer(false, 'is_loading_register_submit'))

    if (!error)
        showToast({
            message: 'user_created_successful_email_sended',
            type: 'success',
        })

    Router.replace('/login')
}

export default function* saga() {
    yield takeLatest(AUTH_REGISTER_SAGA, registerSaga)
}
