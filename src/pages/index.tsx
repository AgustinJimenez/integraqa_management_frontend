import React from 'react'
import Router from 'next/router'

const HomePage = (props: any) => {
    React.useEffect(() => {
        Router.replace('/dashboard')
    }, [])

    return <></>
}

export async function getStaticProps() {
    //let { data, erro  r, message } = await request({ url: url_list_all_by_letter, params: { s: '' } })
    //console.log('HOMEPAGE-response ===> ', { data, error, message })
    return { props: {} }
}
export default HomePage
