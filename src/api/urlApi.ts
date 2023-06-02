import BaseApi from "./baseApi";

class urlApi extends BaseApi {
  async getUrlList() {
    const { data } = await this.axios.get(`/`);
  }

  getOneUrl() {}
}
