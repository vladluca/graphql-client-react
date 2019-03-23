import axios, { AxiosInstance, AxiosPromise } from 'axios';

import { HttpClientConfig } from '../HttpClientConfig/HttpClientConfig';

export default class HttpClient {

  private axiosInstance: AxiosInstance;

  constructor(httpClientConfig: HttpClientConfig) {
    this.axiosInstance = axios.create({
      baseURL: httpClientConfig.getApiUrl()
    });
  }

  public post(data: any): AxiosPromise {
    return this.axiosInstance.post('', data);
  }
}
