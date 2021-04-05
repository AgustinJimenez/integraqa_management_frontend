import { takeLatest, put, select } from 'redux-saga/effects'
import { TABLE_LOAD_SAGA } from '../../sagas/actions'
import { setDatasetListToReducer, setDatasetToReducer, setMultipleDatasetsToReducer } from '../../redux/actions'
import { request } from '../../sagas/requestSaga'
import { datasetSelector } from '../../redux/selectors'
import { TABLE_DATASET_NAME } from '../../constants'

type TableType = {
    is_loading?: boolean,
    data_ids?: any[],
    current_page?: number,
    per_page?: number,
    last_page?: number,
    from?: number,
    to?: number,
    total?: number,
}

function* tableLoad({ url = '', dataset_name = '', rows_per_page = 5, page_number = 1 }) {
    const tableDatasetName: string = TABLE_DATASET_NAME(dataset_name)
    let tableDataset: any = select(state => datasetSelector(state, tableDatasetName))
    tableDataset['is_loading'] = true
    yield put(setDatasetToReducer(tableDataset, tableDataset))
    const { error, data } = yield request({
        url,
        params: {
            rows_per_page,
            page_number,
        },
        //debug: true,
    })
    if (!error) {
        const table: TableType = {
            is_loading: false,
            data_ids: data['data'].map(({ id }: any) => id),
            current_page: data['current_page'],
            per_page: data['per_page'],
            last_page: data['last_page'],
            from: data['from'],
            to: data['to'],
            total: data['total'],
        }

        yield put(setMultipleDatasetsToReducer([setDatasetListToReducer(data['data'], dataset_name), setDatasetToReducer(table, tableDatasetName)]))
    }
}

export default function* saga() {
    yield takeLatest(TABLE_LOAD_SAGA, tableLoad)
}
