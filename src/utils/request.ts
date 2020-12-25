//import fetch from 'isomorphic-unfetch'
import axios, { AxiosRequestConfig } from 'axios'
import { domain } from '../api'

const axiosInstance = axios.create({
    baseURL: domain,
    timeout: 5000,
    responseType: 'json',
    //headers: {'X-Custom-Header': 'foobar'}
})

const request = async (options: AxiosRequestConfig) => {
    //console.log('REQUEST-REQUEST ===> ', { options })
    let response = await axiosInstance.request(options)
    //console.log('REQUEST-RESPONSE ===> ', { response })
    if (response.status !== 200) return { error: true, data: null, message: response.statusText }
    return { error: false, data: response.data, message: response.statusText }
}

export default request
