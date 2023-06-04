import BaseApi from "./baseApi";

class UrlApi extends BaseApi {
  async getUrlList(url: string) {
    try {
      const result = await this.axios.get(`?url=${url}`);
      return result;
    } catch (error) {
      throw new Error();
    }
  }

  getOneUrl() {}
}

const urlApi = new UrlApi();
export default urlApi;
