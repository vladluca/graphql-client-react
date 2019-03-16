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
  protected setApiUrl(apiUrl: string): HttpClientConfig {
    this.apiUrl = apiUrl;

    return this;
  }

  /**
   * @returns {string}
   */
  protected getApiUrl(): string {
    return this.apiUrl;
  }
}
