import React from 'react'
import { useDispatch } from 'react-redux'
import AppTable from '../../components/Table'
import Grid from '@material-ui/core/Grid'
import AdminLayout from '../../layouts/AdminLayout'
import { usersPageSagaAction } from '../../sagas/actions'

const UsersPage = (props: any) => {
    const dispatch = useDispatch()

    const fetchUsers = React.useCallback(() => {
        dispatch(usersPageSagaAction())
    }, [])

    React.useEffect(() => {
        //fetchUsers()
    }, [])

    return (
        <AdminLayout title='Users'>
            <Grid container>
                <AppTable dataset_name='users' url='users' />
            </Grid>
        </AdminLayout>
    )
}

export async function getStaticProps() {
    //let { data, erro  r, message } = await request({ url: url_list_all_by_letter, params: { s: '' } })
    //console.log('HOMEPAGE-response ===> ', { data, error, message })
    return { props: {} }
}
export default UsersPage
