import React from 'react'
import { useSelector } from 'react-redux'
import { datasetSelector } from '../redux/selectors'
import Router from 'next/router'

const urlSlugsWithoutAuth = ['', 'login', 'register', 'email_confirmation', 'password_recovery', 'password_reset']

const debug: boolean = false

const AuthProvider = ({ children }: any) => {
    //const dispatch = useDispatch()
    const auth_token = useSelector((state: any) => datasetSelector(state, 'auth_token'))

    const checkAuth = React.useCallback(async () => {
        let url_nodes = window.location.pathname
            .split('/')
            .filter(s => !!s)
            .reverse()

        let url_slug = url_nodes?.[0] || ''
        if (!url_slug) {
            if (!auth_token) Router.replace('/login')
            else Router.replace('/dashboard')
            return
        }
        let pageRequiresAuth = !urlSlugsWithoutAuth.includes(url_slug)
        let redirectToLogin = pageRequiresAuth && !auth_token

        //console.log('AuthProvider ===> ', { urlSlugRequiresAuth: pageRequiresAuth, auth_token, url_nodes, url_slug, redirectToLogin })
        if (redirectToLogin) {
            if (debug) console.log('AuthProvider ==> redirect to /login', { pageRequiresAuth, redirectToLogin, url_slug, auth_token })
            Router.replace('/login')
        }
    }, [auth_token])

    React.useEffect(() => {
        checkAuth()
    }, [auth_token])

    return <React.Fragment>{children}</React.Fragment>
}

export default AuthProvider
