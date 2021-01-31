import React from 'react'
import axios from 'axios'
import { api_domain, api_slug } from '../../env.json'
const { AxiosProvider /* , Request, Get, Delete, Head, Post, Put, Patch, withAxios */ } = require('react-axios')

axios.defaults.withCredentials = true
export const axiosInstance = axios.create({
    baseURL: `${api_domain}/${api_slug}`,
    timeout: 6000,
    headers: { 'X-Custom-Header': 'foobar' },
    responseType: 'json',
})

const Provider = ({ children = null }) => {
    return <AxiosProvider instance={axiosInstance}>{children}</AxiosProvider>
}
export default Provider
