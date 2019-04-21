import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * HttpClientConfig
 */
export class HttpClientConfig {

  /**
   * apiUrl: string
   */
  private apiUrl: string;

  /**
   * equestInterceptor
   */
  private requestInterceptor: (config: AxiosRequestConfig) => AxiosRequestConfig;

  /**
   * requestInterceptorErrorHandler
   */
  private requestInterceptorErrorHandler: (error: AxiosError) => Promise<any>;

  /**
   * responseInterceptor
   */
  private responseInterceptor: (response: AxiosResponse) => AxiosResponse;

  /**
   * responseInterceptorErrorHandler
   */
  private responseInterceptorErrorHandler: (error: AxiosError) => Promise<any>;

  /**
   * @param apiUrl
   */
  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  /**
   * @param apiUrl
   * @returns {HttpClientConfig}
   */
  public setApiUrl(apiUrl: string): HttpClientConfig {
    this.apiUrl = apiUrl;

    return this;
  }

  /**
   * @returns {string}
   */
  public getApiUrl(): string {
    return this.apiUrl;
  }

  /**
   * @param requestInterceptor
   */
  public setRequestInterceptor(requestInterceptor: (config: AxiosRequestConfig) => AxiosRequestConfig): HttpClientConfig {
    this.requestInterceptor = requestInterceptor;

    return this;
  }

  public getRequestInterceptor(): (config: AxiosRequestConfig) => AxiosRequestConfig {
    return this.requestInterceptor;
  }

  /**
   * @param requestInterceptorErrorHandler
   */
  public setRequestInterceptorErrorHandler(
    requestInterceptorErrorHandler: (error: AxiosError) => Promise<any>
  ): HttpClientConfig {
    this.requestInterceptorErrorHandler = requestInterceptorErrorHandler;

    return this;
  }

  /**
   * requestInterceptorErrorHandler
   */
  public getRequestInterceptorErrorHandler(): (error: AxiosError) => Promise<any> {
    return this.requestInterceptorErrorHandler;
  }

  /**
   * @param responseInterceptor
   */
  public setResponseInterceptor(responseInterceptor: (response: AxiosResponse) => AxiosResponse): HttpClientConfig {
    this.responseInterceptor = responseInterceptor;

    return this;
  }

  /**
   * responseInterceptor
   */
  public getResponseInterceptor(): (response: AxiosResponse) => AxiosResponse {
    return this.responseInterceptor;
  }

  /**
   * @param responseInterceptorErrorHandler
   */
  public setResponseInterceptorErrorHandler(
    responseInterceptorErrorHandler: (error: AxiosError) => Promise<any>
  ): HttpClientConfig {
    this.responseInterceptorErrorHandler = responseInterceptorErrorHandler;

    return this;
  }

  /**
   * responseInterceptorErrorHandler
   */
  public getResponseInterceptorErrorHandler(): (error: AxiosError) => Promise<any> {
    return this.responseInterceptorErrorHandler;
  }
}
