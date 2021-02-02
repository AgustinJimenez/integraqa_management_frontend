import React from 'react'
import { useDispatch } from 'react-redux'
import AdminLayout from '../../layouts/AdminLayout'
import { requestSagaAction } from '../../sagas/actions'

const LoginPage = (props: any) => {
    const dispatch = useDispatch()

    React.useEffect(() => {}, [])

    return <AdminLayout></AdminLayout>
}

export async function getStaticProps() {
    //let { data, erro  r, message } = await request({ url: url_list_all_by_letter, params: { s: '' } })
    //console.log('HOMEPAGE-response ===> ', { data, error, message })
    return { props: {} }
}
export default LoginPage
