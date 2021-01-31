import { all } from 'redux-saga/effects'
import sagaSearchMeal from './sagaSearchMeal'
import registerSaga from './auth/registerSaga'
import loginSaga from './auth/loginSaga'
import requestSaga from './requestSaga'
import logoutSaga from './auth/logoutSaga'

const allSagas: any[] = [sagaSearchMeal(), registerSaga(), loginSaga(), requestSaga(), logoutSaga()]

export default function* rootSaga() {
    yield all(allSagas)
}
