import request from '../../utils/request'
import { takeLatest, put, call, select } from 'redux-saga/effects'
import { AUTH_REGISTER_SAGA } from '../actions'
import { setDatasetToReducer } from '../../redux/actions'
import { datasetSelector } from '../../redux/selectors'
import sleep from '../../utils/sleep'

function* registerSaga({ email, password, name }: any = {}) {
    yield put(setDatasetToReducer(true, 'is_loading_register_submit'))
    let is_loading_register_submit: boolean = yield select(state => datasetSelector(state, 'is_loading_register_submit'))
    yield sleep(2000)
    console.log('REGISTER SAGA !!!', { email, name, password })
    //console.log('here===>', { url, params, meals })
    //yield put(setDatasetListToReducer(meals || [], 'meals', { keyName: 'idMeal' }))
    //yield put(setDatasetToReducer(meals?.map((m: any) => +m?.idMeal) || [], 'searched_meals'))
    yield put(setDatasetToReducer(false, 'is_loading_register_submit'))
}

export default function* saga() {
    yield takeLatest(AUTH_REGISTER_SAGA, registerSaga)
}
