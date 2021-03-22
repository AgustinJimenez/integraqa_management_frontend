const db = {
    datasets: {
        users: {
            1: { id: 1, name: 'Agus' },
            2: { id: 2, name: 'Agus2' },
            3: { id: 3, name: 'Agus3' },
            4: { id: 4, name: 'Agus4' },
            5: { id: 5, name: 'Agus5' },
        },
        roles: ['Admin', 'SuperAdmin', 'User'],
        active: false,
        time: 20,
        date: '2021-03-12 10:12:13',
    },
}

const collect = require('collect.js')
const getDataset = (state, datasetName) => db['datasets'][datasetName]

const datasetSelector = (state, datasetName) => {
    let selected_dataset = getDataset(state, datasetName)

    if (Array.isArray(selected_dataset)) selected_dataset = collect(selected_dataset)

    return selected_dataset
}

const single = datasetSelector(null, 'users', { id: 1, list: true })
const multiple = datasetSelector(null, 'users', { id: [1, 5, 3], list: true })
console.log({ single, multiple })
