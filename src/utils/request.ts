//import fetch from 'isomorphic-unfetch'
import { AxiosRequestConfig } from 'axios'
import { axiosInstance } from '../providers/AxiosProvider'
import { OK } from 'http-status'
import { showToast } from './showToast'
import i18n from 'i18next'
export interface Response {
    data: any;
    error: boolean;
    message: string;
    response: any;
}

export interface Options extends AxiosRequestConfig {
    show_message?: boolean;
    debug?: boolean;
}

const request = async (options: Options = { show_message: false, debug: false }) => {
    var result: Response = { data: null, error: false, message: '', response: null }

    try {
        if (options.debug) console.log(`<=== === REQUEST === ===> [${options.url}]`, { ...options })
        let response = await axiosInstance.request(options)

        if (options.debug) console.log(`<=== === RESPONSE === ===> [${options.url}]`, { response, options })

        if (response?.status === OK) result = { error: false, data: response?.data, message: i18n.t(response?.data?.message) || response?.statusText, response }
        else result = { error: true, data: response?.data, message: i18n.t(response?.data?.message) || response?.statusText, response }
    } catch (error) {
        console.log(`<=== === ERROR-CATCHED === ===> [${options.url}]`, { error, error_json: error.toJSON() })

        if (!!error?.response?.config)
            result = {
                error: true,
                message: i18n.t(error?.response?.data?.message) || error.message,
                data: error?.response?.data || null,
                response: error?.response,
            }
        else result = { error: true, message: i18n.t(error?.response?.data?.message) || error.message, data: error, response: error?.response }

        if (!!result['message'] && options?.['show_message'])
            showToast({ message: result['message'], type: !!error ? 'error' : 'info', title: !!error ? 'ERROR:' : 'INFO:' })
    }

    if (options.debug) console.log(`<=== === RESULT === ===> [${options.url}]`, { result })

    return result
}

export default request
