import React from 'react'
const { withAxios } = require('react-axios')
import { useSelector } from 'react-redux'
import { datasetSelector } from '../redux/selectors'
import Router from 'next/router'

const AuthProvider = ({ children }: any) => {
    //const dispatch = useDispatch()
    const user_has_auth = useSelector((state: any) => datasetSelector(state, 'user_has_auth'))

    const checkAuth = React.useCallback(async () => {
        let url_nodes = window.location.pathname
            .split('/')
            .filter(s => !!s)
            .reverse()
        let url_slug = url_nodes?.[0]
        console.log('user_has_auth change!!!', { user_has_auth })
        if ((url_slug !== 'login' || url_slug !== 'register') && !user_has_auth) Router.replace('/login')
    }, [])

    React.useEffect(() => {
        checkAuth()
    }, [user_has_auth])

    return <React.Fragment>{children}</React.Fragment>
}

export default AuthProvider
