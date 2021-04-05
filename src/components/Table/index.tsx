import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import FirstPageIcon from '@material-ui/icons/FirstPage'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import LastPageIcon from '@material-ui/icons/LastPage'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import TablePagination from '@material-ui/core/TablePagination'
import TableFooter from '@material-ui/core/TableFooter'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import useStyles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { tableLoadSagaAction } from '../../sagas/actions'
import { datasetSelector } from '../../redux/selectors'
import { TABLE_DATASET_NAME } from '../../constants'
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import moment from 'moment'

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
    return { name, calories, fat, carbs, protein }
}

const useStylesTablePagination = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexShrink: 0,
            marginLeft: theme.spacing(2.5),
        },
    }),
)

const TableCellValue = ({ value, type }: any) => {
    if (type === 'date') return moment(value).format('DD/MM/YYYY')
    else if (typeof value === 'boolean') return <>{!!value ? <CheckBoxOutlinedIcon color='primary' /> : <CheckBoxOutlineBlankIcon color='primary' />}</>

    return value
}

const AppTable = ({ dataset_name, url, columns }: any) => {
    const tableDatasetName: string = TABLE_DATASET_NAME(dataset_name)
    const columnsFieldNames = Object.keys(columns)
    const columnsFieldLabels = columnsFieldNames.map((field_name: string) => columns[field_name]['label'])
    const dispatch = useDispatch()
    const classes = useStyles()
    const tablePaginationClasses = useStylesTablePagination()
    const tableDataset = useSelector(state => datasetSelector(state, tableDatasetName, { default_value: {} }))
    const datasetData = useSelector(state => datasetSelector(state, dataset_name, { list_type: 'array', id: tableDataset['data_ids'] }))
    const page = tableDataset['current_page'] || 0
    const rowsPerPage = tableDataset?.['per_page'] || 5
    const loadTable = React.useCallback(({ rows_per_page, page_number } = {}) => {
        dispatch(tableLoadSagaAction({ dataset_name, url, rows_per_page, page_number }))
    }, [])

    const handleBackButtonClick = React.useCallback(() => {
        loadTable({ page_number: tableDataset['current_page'] - 1 })
    }, [tableDataset])

    const handleNextButtonClick = React.useCallback(() => {
        loadTable({ page_number: tableDataset['current_page'] + 1 })
    }, [tableDataset])
    const handleFirstPageButtonClick = React.useCallback(() => {
        loadTable({ page_number: 0 })
    }, [])

    const handleLastPageButtonClick = React.useCallback(() => {
        loadTable({ page_number: tableDataset['last_page'] })
    }, [tableDataset])

    React.useEffect(() => {
        loadTable()
    }, [])

    const handleChangeRowsPerPage = React.useCallback(
        (event: any) => {
            loadTable({ rows_per_page: +event.target.value, page_number: tableDataset['last_page'] })
        },
        [tableDataset],
    )

    //console.log('AppTable ===> ', { datasetData, tableDataset, columns, columnsLabels: columnsFieldLabels, columnsFieldNames })

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} /* size='small' */ aria-label='a dense table'>
                <TableHead>
                    <TableRow>
                        {columnsFieldLabels.map((label, key) => (
                            <TableCell key={key}>
                                <Typography component='b' color='primary'>
                                    {label}
                                </Typography>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {datasetData.map((row: any, key: number) => (
                        <TableRow key={key}>
                            {columnsFieldNames.map((field_name: string, key2: number) => (
                                <TableCell component='th' scope='row' key={key2}>
                                    <TableCellValue value={row[field_name]} type={columns[field_name]['type']} />
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            page={tableDataset['current_page'] - 1}
                            rowsPerPage={tableDataset['per_page']}
                            count={tableDataset['total']}
                            colSpan={3}
                            SelectProps={{
                                inputProps: { 'aria-label': 'rows per page' },
                                native: true,
                            }}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            ActionsComponent={() => (
                                <div className={tablePaginationClasses.root}>
                                    <IconButton onClick={handleFirstPageButtonClick} disabled={tableDataset['current_page'] === 1} aria-label='first page'>
                                        <FirstPageIcon color='primary' />
                                    </IconButton>
                                    <IconButton onClick={handleBackButtonClick} disabled={tableDataset['current_page'] === 1} aria-label='previous page'>
                                        <KeyboardArrowLeft color='primary' />
                                    </IconButton>
                                    <IconButton
                                        onClick={handleNextButtonClick}
                                        disabled={tableDataset['current_page'] > tableDataset['last_page']}
                                        aria-label='next page'
                                    >
                                        <KeyboardArrowRight color='primary' />
                                    </IconButton>
                                    <IconButton
                                        onClick={handleLastPageButtonClick}
                                        disabled={tableDataset['current_page'] === tableDataset['last_page']}
                                        aria-label='last page'
                                    >
                                        <LastPageIcon color='primary' />
                                    </IconButton>
                                </div>
                            )}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    )
}
export default AppTable
