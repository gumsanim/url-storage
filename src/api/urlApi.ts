import BaseApi from "./baseApi";

class UrlApi extends BaseApi {
  async getUrlDetail(url: string) {
    try {
      return this.axios.get(`?url=${url}`);
    } catch {
      throw new Error();
    }
  }

}

const urlApi = new UrlApi();
export default urlApi;
