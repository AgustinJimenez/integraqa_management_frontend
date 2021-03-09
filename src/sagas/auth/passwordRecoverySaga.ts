import { takeLatest, put, call, select } from 'redux-saga/effects'
import { PASSWORD_RECOVERY_SAGA } from '../actions'
import { setDatasetToReducer } from '../../redux/actions'
import { datasetSelector } from '../../redux/selectors'
import { request } from '../requestSaga'
import { NOT_FOUND } from 'http-status'
import Router from 'next/router'
import { showToast } from '../../utils/showToast'

function* passwordRecoverySaga({ email }: any = {}) {
    yield put(setDatasetToReducer(true, 'is_loading_recovery_email_submit'))
    const { error, response } = yield call(request, {
        method: 'POST',
        url: 'auth/password_recovery',
        //debug: true,
        data: {
            email,
        },
        show_message: true,
    })
    yield put(setDatasetToReducer(false, 'is_loading_recovery_email_submit'))

    if (!!error) {
        if (response['status'] === NOT_FOUND)
            showToast({
                message: 'the_email_not_registered',
                type: 'error',
            })
    } else {
        showToast({
            message: 'password_recovery_email_was_sended',
            type: 'success',
        })
        Router.replace('/login')
    }
}

export default function* saga() {
    yield takeLatest(PASSWORD_RECOVERY_SAGA, passwordRecoverySaga)
}
