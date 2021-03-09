import { takeLatest, put, call } from 'redux-saga/effects'
import { PASSWORD_RESET_CODE_CHECK_SAGA } from '../actions'
import { setDatasetToReducer } from '../../redux/actions'
import { request } from '../requestSaga'
import Router from 'next/router'
import { showToast } from '../../utils/showToast'

function* passwordResetCodeCheck({ reset_code, callback }: any = {}) {
    yield put(setDatasetToReducer(true, 'is_loading_reset_code_check'))
    const { error } = yield call(request, {
        method: 'POST',
        url: 'auth/password_reset_code_check',
        //debug: true,
        data: {
            reset_code,
        },
        //show_message: true,
    })
    yield put(setDatasetToReducer(false, 'is_loading_reset_code_check'))

    if (!!error) {
        showToast({
            message: 'the_code_is_invalid',
            type: 'error',
        })
        Router.replace('/login')
    }
    if (!!callback) callback?.()
}

export default function* saga() {
    yield takeLatest(PASSWORD_RESET_CODE_CHECK_SAGA, passwordResetCodeCheck)
}
