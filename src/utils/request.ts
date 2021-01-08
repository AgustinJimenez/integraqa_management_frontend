//import fetch from 'isomorphic-unfetch'
import { AxiosRequestConfig } from 'axios'
import { axiosInstance } from '../providers/AxiosProvider'
import { OK } from 'http-status'
import { showToast } from './showToast'

const { toast } = require('react-nextjs-toast')

export interface Response {
    data: any;
    error: boolean;
    message: string;
    response: any;
}

export interface Options extends AxiosRequestConfig {
    show_message: boolean;
}

const debug: boolean = false

const request = async (options: Options = { show_message: false }) => {
    var result: Response = { data: null, error: false, message: '', response: null }
    try {
        if (debug) console.log(`<=== === REQUEST === ===> [${options.url}]`, { ...options })
        let response = await axiosInstance.request(options)
        if (debug) console.log(`<=== === RESPONSE === ===> [${options.url}]`, { response, options })
        if (response?.status === OK) result = { error: false, data: response?.data, message: response?.statusText, response }
        else result = { error: true, data: response?.data, message: response?.statusText, response }
    } catch (error) {
        console.log(`<=== === ERROR-CATCHED === ===> [${options.url}]`, { error, error_json: error.toJSON() })
        if (!!error?.response?.config) result = { error: true, message: error.message, data: error?.response?.data || null, response: error?.response }
        else result = { error: true, message: error.message, data: error, response: error?.response }

        if (!!result['message'] && options?.['show_message'])
            showToast({ message: result['message'], type: !!error ? 'error' : 'info', title: !!error ? 'ERROR:' : 'INFO:' })
    }

    if (debug) console.log(`<=== === RESULT === ===> [${options.url}]`, { result })

    return result
}

export default request
