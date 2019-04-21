import axios, { AxiosError, AxiosInstance, AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios';

import { HttpClientConfig } from '../HttpClientConfig/HttpClientConfig';

export default class HttpClient {

  private axiosInstance: AxiosInstance;

  constructor(httpClientConfig: HttpClientConfig) {
    this.axiosInstance = axios.create({
      baseURL: httpClientConfig.getApiUrl()
    });

    // request interceptors
    const requestInterceptor: (config: AxiosRequestConfig) => AxiosRequestConfig = httpClientConfig.getRequestInterceptor();
    const requestInterceptorErrorHandler: (
      error: AxiosError
    ) => Promise<any> = httpClientConfig.getRequestInterceptorErrorHandler();

    this.axiosInstance.interceptors.request.use(
      requestInterceptor ? requestInterceptor : undefined,
      requestInterceptorErrorHandler ? requestInterceptorErrorHandler : undefined
    );

    // response interceptors
    const responseInterceptor: (response: AxiosResponse) => AxiosResponse = httpClientConfig.getResponseInterceptor();
    const responseInterceptorErrorHandler: (
      error: AxiosError
    ) => Promise<any> = httpClientConfig.getResponseInterceptorErrorHandler();

    this.axiosInstance.interceptors.response.use(
      responseInterceptor ? responseInterceptor : undefined,
      responseInterceptorErrorHandler ? responseInterceptorErrorHandler : undefined
    );
  }

  public post(data: any): AxiosPromise {
    return this.axiosInstance.post('', data);
  }
}
