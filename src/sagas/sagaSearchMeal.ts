import request from '../utils/request'
import { takeLatest, put, call, select } from 'redux-saga/effects'
import { SAGA_SEARCH_MEAL } from './actions'
import { setDatasetListToReducer, setDatasetToReducer } from '../redux/actions'
import { url_list_meals_by_name, url_list_meals_by_category, url_list_meals_by_ingredient } from '../api'
import { datasetSelector } from '../redux/selectors'

function* searchMeals(action: any) {
    let search_text: string = yield select(state => datasetSelector(state, 'search_input'))
    let search_meal_filter: string = yield select(state => datasetSelector(state, 'search_meal_filter'))
    let url: string = ''
    let params: any = {}
    //console.log('searchMeals ===> ', { action, search_meal_filter, search_text })
    switch (search_meal_filter) {
        case 'name':
            url = url_list_meals_by_name
            params = { s: search_text }
            break
        case 'ingredient':
            url = url_list_meals_by_ingredient
            params = { i: search_text }
            break
        case 'category':
            url = url_list_meals_by_category
            params = { c: search_text }
            break

        default:
            break
    }
    let {
        data: { meals = [] },
        error,
    } = yield call(request, { url, params })
    if (error) return
    //console.log('here===>', { url, params, meals })
    yield put(setDatasetListToReducer(meals || [], 'meals', { keyName: 'idMeal' }))
    yield put(setDatasetToReducer(meals?.map((m: any) => +m?.idMeal) || [], 'searched_meals'))
}

export default function* saga() {
    yield takeLatest(SAGA_SEARCH_MEAL, searchMeals)
}
