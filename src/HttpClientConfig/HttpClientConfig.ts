/**
 * HttpClientConfig
 */
export class HttpClientConfig {

  /**
   * apiUrl: string
   */
  private apiUrl: string;

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
}
