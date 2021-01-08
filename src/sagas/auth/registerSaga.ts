import request from '../../utils/request'
import { takeLatest, put, call, select } from 'redux-saga/effects'
import { AUTH_REGISTER_SAGA } from '../actions'
import { setDatasetListToReducer, setDatasetToReducer } from '../../redux/actions'
import {} from '../../redux/selectors'

function* registerSaga(action: any) {
    //console.log('here===>', { url, params, meals })
    //yield put(setDatasetListToReducer(meals || [], 'meals', { keyName: 'idMeal' }))
    //yield put(setDatasetToReducer(meals?.map((m: any) => +m?.idMeal) || [], 'searched_meals'))
}

export default function* saga() {
    yield takeLatest(AUTH_REGISTER_SAGA, registerSaga)
}
