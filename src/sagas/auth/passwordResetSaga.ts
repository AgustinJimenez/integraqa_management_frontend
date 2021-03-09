import { takeLatest, put, call } from 'redux-saga/effects'
import { PASSWORD_RESET_SAGA } from '../actions'
import { setDatasetToReducer } from '../../redux/actions'
import { request } from '../requestSaga'
import { NOT_FOUND } from 'http-status'
import Router from 'next/router'
import { showToast } from '../../utils/showToast'

function* passwordResetSaga({ new_password, reset_code }: any = {}) {
    yield put(setDatasetToReducer(true, 'is_loading_reset_email_submit'))
    const { error, response } = yield call(request, {
        method: 'POST',
        url: 'auth/password_reset',
        //debug: true,
        data: {
            new_password,
            reset_code,
        },
        show_message: true,
    })
    yield put(setDatasetToReducer(false, 'is_loading_reset_email_submit'))

    if (!!error) {
        if (response['status'] === NOT_FOUND)
            showToast({
                message: 'there_is_a_problem_with_the_code',
                type: 'error',
            })
    } else {
        showToast({
            message: 'password_updated_correctly',
            type: 'success',
        })
        Router.replace('/login')
    }
}

export default function* saga() {
    yield takeLatest(PASSWORD_RESET_SAGA, passwordResetSaga)
}
