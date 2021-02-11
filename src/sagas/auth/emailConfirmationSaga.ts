import { takeLatest, put } from 'redux-saga/effects'
import { EMAIL_CONFIRMATION_SAGA } from '../actions'
import { setDatasetToReducer } from '../../redux/actions'
import { request } from '../requestSaga'
import Router from 'next/router'
import { showToast } from '../../utils/showToast'

function* emailConfirmation({ verification_code }: any = {}) {
    yield put(setDatasetToReducer(true, 'is_loading_email_verification'))

    var { error }: any = yield request({
        method: 'POST',
        url: 'auth/email_confirmation',
        //debug: true,
        data: {
            verification_code,
        },
        show_message: true,
    })
    //console.log('EMAIL-CONFIRMATION ===> ', { data, error, response })
    yield put(setDatasetToReducer(false, 'is_loading_email_verification'))
    Router.replace('/login')
    if (!error)
        return showToast({
            title: 'INFO',
            message: 'user_has_been_verified',
            type: 'success',
        })
}

export default function* saga() {
    yield takeLatest(EMAIL_CONFIRMATION_SAGA, emailConfirmation)
}
