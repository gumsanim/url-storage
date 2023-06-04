import BaseApi from "./baseApi";

class UrlApi extends BaseApi {
  async getUrlDetail(url: string, timestamp?: string) {
    try {
      return this.axios.get(`?url=${url}`);
    } catch {
      throw new Error();
    }
  }

  async getDecadeUrlHistory(url: string) {
    try {
      return this.axios.get(`/cdx/search/cdx?url=${url}`);
    } catch {
      throw new Error();
    }
  }
}

const urlApi = new UrlApi();
export default urlApi;
