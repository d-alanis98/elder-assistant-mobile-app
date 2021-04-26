import axios, { AxiosInstance, AxiosRequestConfig, AxiosStatic } from 'axios';
//Requests contract
import Requests from './Requests';

/**
 * @author Damián Alanís Ramírez
 * @version 1.1.1
 * @description Class to make HTTP requests using axios. It allow us to intercept the request, which is very convenient for
 * many use cases, ie: to add authentication headers to it.
 */
export default class AxiosRequest implements Requests<AxiosRequestConfig> {
    static _axios: AxiosInstance;  
    static token?: string;
    static loggedIn?: boolean;

    constructor() {
        AxiosRequest.setInstance();
    }
    
    public get instance() {
        if(!AxiosRequest._axios)
            AxiosRequest.setInstance();
        return AxiosRequest._axios;
    }


    public get = async (url: string, configuration?: AxiosRequestConfig): Promise<AxiosRequestConfig> => (
        AxiosRequest.get(url, configuration)
    );

    public post = async (url: string, data?: any, configuration?: AxiosRequestConfig): Promise<AxiosRequestConfig> => (
        AxiosRequest.post(url, data, configuration)
    );

    public put = async (url: string, data?: any, configuration?: AxiosRequestConfig): Promise<AxiosRequestConfig> => (
        AxiosRequest.put(url, data, configuration)
    );

    public delete = async (url: string, configuration?: AxiosRequestConfig) => (
        AxiosRequest.delete(url, configuration)
    );

    //Facade

    static instance = () => AxiosRequest._axios;


    static get = async (url: string, configuration?: AxiosRequestConfig): Promise<AxiosRequestConfig> => (
        AxiosRequest.instance().get(url, configuration)
    );

    static post = async (url: string, data?: any, configuration?: AxiosRequestConfig): Promise<AxiosRequestConfig> => (
        AxiosRequest.instance().post(url, data, configuration)
    );

    static put = async (url: string, data?: any, configuration?: AxiosRequestConfig): Promise<AxiosRequestConfig> => (
        AxiosRequest.instance().put(url, data, configuration)
    );

    static delete = async (url: string, configuration?: AxiosRequestConfig): Promise<AxiosRequestConfig> => (
        AxiosRequest.instance().delete(url, configuration)
    );

    //Internal helpers

    static setInstance = () => {
        //We get the axios ref
        AxiosRequest._axios = axios.create();
        //We set the interceptors
        AxiosRequest.setInterceptors();
    }

    static setInterceptors = () => {
        AxiosRequest.instance().interceptors.request.use(
            AxiosRequest.requestHandler
        )
    }

    static requestHandler = (request: AxiosRequestConfig): AxiosRequestConfig | Promise<AxiosRequestConfig> => {
        const { token, loggedIn } = AxiosRequest;
        if(loggedIn)
            request.headers['Authorization'] = `Bearer ${ token }`;
        return request;
    }


}
