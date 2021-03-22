export const SET_ITEM_TO_DATASET_REDUCER: string = 'SET_ITEM_TO_DATASET_REDUCER'

interface setDatasetOptions {
    key?: string;
    keyName?: string;
    type?: 'single' | 'list';
    replaceList?: boolean;
    debug?: boolean;
}

const parseArrayToObjList = (data: any[] = [], key: string = 'id') => {
    let obj: any = {}
    data.map((item: any) => {
        let identification_key = item[key]
        obj[identification_key] = item
    })
    return obj
}
export default parseArrayToObjList

export const setDatasetToReducer = (data: any, dataset_name: string, options: setDatasetOptions = {}) => ({
    type: SET_ITEM_TO_DATASET_REDUCER,
    dataset_name,
    data,
    options: { ...options, multiple: false, type: 'single' },
})

export const setDatasetListToReducer = (dataList: any[], dataset_name: string, options: setDatasetOptions = {}) => ({
    type: SET_ITEM_TO_DATASET_REDUCER,
    dataset_name,
    data: dataList,
    options: { ...options, multiple: false, type: 'list' },
})

export const setMultipleDatasetsToReducer = (actions = {}) => ({
    type: SET_ITEM_TO_DATASET_REDUCER,
    actions,
    options: { multiple: true },
})
