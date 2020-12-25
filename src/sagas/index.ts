import { all } from 'redux-saga/effects'
import sagaSearchMeal from './sagaSearchMeal'

const allSagas: any[] = [sagaSearchMeal()]

export default function* rootSaga() {
    yield all(allSagas)
}
