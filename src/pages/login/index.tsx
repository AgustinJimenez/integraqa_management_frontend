import React from 'react'
import AuthLayout from '../../layouts/AuthLayout'

const LoginPage = (props: any) => {
    return <AuthLayout></AuthLayout>
}

export async function getStaticProps() {
    //let { data, erro  r, message } = await request({ url: url_list_all_by_letter, params: { s: '' } })
    //console.log('HOMEPAGE-response ===> ', { data, error, message })
    return { props: {} }
}
export default LoginPage
