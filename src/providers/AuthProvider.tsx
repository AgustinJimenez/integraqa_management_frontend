import React from 'react'
import { useSelector } from 'react-redux'
import { datasetSelector } from '../redux/selectors'
import Router from 'next/router'

const urlSlugsWithoutAuth = ['login', 'register', 'email_confirmation']

const AuthProvider = ({ children }: any) => {
    //const dispatch = useDispatch()
    const auth_token = useSelector((state: any) => datasetSelector(state, 'auth_token'))

    const checkAuth = React.useCallback(async () => {
        let url_nodes = window.location.pathname
            .split('/')
            .filter(s => !!s)
            .reverse()

        let url_slug = url_nodes?.[0] || ''
        let urlSlugRequiresAuth = !urlSlugsWithoutAuth.includes(url_slug)
        let redirectToAdmin = urlSlugRequiresAuth && !!auth_token
        let redirectToLogin = urlSlugRequiresAuth && !auth_token
        //console.log('AuthProvider ===> ', { urlSlugRequiresAuth, auth_token, url_nodes, url_slug, redirectToAdmin, redirectToLogin })
        if (redirectToAdmin) Router.replace('/dashboard')
        else if (redirectToLogin) Router.replace('/login')
    }, [auth_token])

    React.useEffect(() => {
        checkAuth()
    }, [auth_token])

    return <React.Fragment>{children}</React.Fragment>
}

export default AuthProvider
