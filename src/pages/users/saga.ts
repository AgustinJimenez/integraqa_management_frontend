import { takeLatest, put } from 'redux-saga/effects'
import { USERS_PAGE_SAGA } from '../../sagas/actions'
import { setDatasetListToReducer, setDatasetToReducer } from '../../redux/actions'
import { request } from '../../sagas/requestSaga'

function* usersPageSaga() {
    yield put(setDatasetToReducer(true, 'users_page_is_loading'))
    /* const { error, data } = yield request({
        url: 'users',
        debug: true,
    }) */

    yield put(setDatasetToReducer(false, 'users_page_is_loading'))
    /* 
    yield put(setDatasetToReducer(false, 'is_loading_register_submit'))

    if (!error) {
        showToast({
            message: 'user_created_successful_email_sended',
            type: 'success',
        })
        Router.replace('/login')
    }
 */

    yield put(setDatasetListToReducer(data['users'], 'users', { debug: true }))
}

export default function* saga() {
    yield takeLatest(USERS_PAGE_SAGA, usersPageSaga)
}
