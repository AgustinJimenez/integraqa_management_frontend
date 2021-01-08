import React from 'react'
import AdminLayout from '../../layouts/AdminLayout'

const LoginPage = (props: any) => {
    return <AdminLayout></AdminLayout>
}

export async function getStaticProps() {
    //let { data, erro  r, message } = await request({ url: url_list_all_by_letter, params: { s: '' } })
    //console.log('HOMEPAGE-response ===> ', { data, error, message })
    return { props: {} }
}
export default LoginPage
