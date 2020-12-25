import { DELETE_ITEM_FROM_DATASET_LIST_REDUCER, SET_ITEM_TO_DATASET_LIST_REDUCER, SET_ITEM_TO_DATASET_REDUCER } from './actions'
import initialState from './initialState'

const debug: boolean = false

const datasetReducer = (state: any = initialState, action: any) => {
    let { type, data, dataset_name, options = { key: '', keyName: 'id', replaceList: false } } = action
    let keyName: string = options.keyName
    if (debug) console.log('REDUCERS - datasetReducer ===> ', { action })
    //throw 'REDUCER FETCH NAME IS REQUIRED'

    switch (type) {
        case SET_ITEM_TO_DATASET_REDUCER:
            if (!dataset_name) state = { ...state, ...data }
            else if (!!options['key']) state[dataset_name][options.key] = data
            else state[dataset_name] = data
            state = { ...state }
            break

        case SET_ITEM_TO_DATASET_LIST_REDUCER:
            if (!Array.isArray(data)) data = [data]
            if (options.replaceList) state[dataset_name] = {}
            for (let item of data) if (!!item[keyName] && !!state[dataset_name]) state[dataset_name][item[keyName]] = item

            state = { ...state }
            break
        case DELETE_ITEM_FROM_DATASET_LIST_REDUCER:
            if (!!data[keyName] && !!state[dataset_name] && !!state[dataset_name][data[keyName]]) {
                delete state[dataset_name][data[keyName]]
                state = { ...state }
            }
            break
    }
    return state
}
export default datasetReducer
