import React from 'react'
const { withAxios } = require('react-axios')
import { useSelector } from 'react-redux'
import { datasetSelector } from '../redux/selectors'
import Router from 'next/router'

const AuthProvider = ({ children }: any) => {
    //const dispatch = useDispatch()
    const auth_token = useSelector((state: any) => datasetSelector(state, 'auth_token'))

    const checkAuth = React.useCallback(async () => {
        let url_nodes = window.location.pathname
            .split('/')
            .filter(s => !!s)
            .reverse()

        let url_slug = url_nodes?.[0]

        if ((url_slug === 'login' || url_slug === 'register') && !!auth_token) Router.replace('/dashboard')
        else if ((url_slug !== 'login' || url_slug !== 'register') && !auth_token) Router.replace('/login')
    }, [])

    React.useEffect(() => {
        checkAuth()
    }, [auth_token])

    return <React.Fragment>{children}</React.Fragment>
}

export default AuthProvider
