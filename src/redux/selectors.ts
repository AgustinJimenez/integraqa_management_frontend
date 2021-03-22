import collect from 'collect.js'

const getDataset = (state: any, datasetName: string): any => state['datasets'][datasetName]

const isArray = (val: any) => Array.isArray(val)

export const datasetSelector = (state: any, datasetName: string, { id = -1 || [], list_type = 'array' || 'collection', debug = false } = {}) => {
    let selected_dataset = getDataset(state, datasetName)
    if (debug) console.log('datasetSelector raw data ===> ', { selected_dataset })
    if (!!id && id !== -1) {
        if (isArray(id)) selected_dataset = id.filter((key: any) => !!selected_dataset[key]).map((key: any) => selected_dataset[key])
        else selected_dataset = selected_dataset[id]
    }

    switch (list_type) {
        case 'collection':
            selected_dataset = collect(selected_dataset)
            break

        case 'array':
            if (typeof selected_dataset === 'object') selected_dataset = Object.keys(selected_dataset).map((key: any) => selected_dataset[key])
            break

        default:
            break
    }

    if (debug) console.log('datasetSelector end ===> ', { datasetName, id, list_type, selected_dataset })

    return selected_dataset
}
