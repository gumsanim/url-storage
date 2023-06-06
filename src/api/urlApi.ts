import BaseApi from './baseApi';

class UrlApi extends BaseApi {
  async getUrlDetail(url: string) {
    try {
      const { data } = await this.axios.get(`?url=${url}`);
      return data;
    } catch {
      throw new Error();
    }
  }

  async getUrlHistory(url: string, timestamp: string) {
    try {
      const { data } = await this.axios.get(`?url=${url}&timestamp=${timestamp}`);
      return data;
    } catch {
      throw new Error();
    }
  }
}

const urlApi = new UrlApi();
export default urlApi;
