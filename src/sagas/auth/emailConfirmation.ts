import { takeLatest, put, call, select } from 'redux-saga/effects'
import { EMAIL_CONFIRMATION_SAGA } from '../actions'
import { setDatasetToReducer } from '../../redux/actions'
import { datasetSelector } from '../../redux/selectors'
import sleep from '../../utils/sleep'

function* emailConfirmation({ verification_code }: any = {}) {
    yield put(setDatasetToReducer(true, 'is_loading_email_verification'))

    console.log('EMAIL-CONFIRMATION ===> ', verification_code)
    yield sleep(2000)

    //console.log('here===>', { url, params, meals })
    //yield put(setDatasetListToReducer(meals || [], 'meals', { keyName: 'idMeal' }))
    //yield put(setDatasetToReducer(meals?.map((m: any) => +m?.idMeal) || [], 'searched_meals'))
    yield put(setDatasetToReducer(false, 'is_loading_email_verification'))
}

export default function* saga() {
    yield takeLatest(EMAIL_CONFIRMATION_SAGA, emailConfirmation)
}
