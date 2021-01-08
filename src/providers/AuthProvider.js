import React from 'react'
import axios from 'axios'
const { withAxios } = require('react-axios')
import { api_domain } from '../../env.json'

const AuthProvider = ({ children, axios }) => {
    //sanctum/csrf-cookie
    //console.log('AuthProvider ===> ', { axios, api_domain })
    const fetchCsrf = React.useCallback(async () => {
        //let response = await axios.get('/sanctum/csrf-cookie')
        //console.log('fetchCsrf ===> ', { response })
    })
    React.useEffect(() => {
        fetchCsrf()
    }, [])

    return <>{children}</>
}
export default withAxios(AuthProvider)
