import axios from "axios";

class BaseApi {
  public readonly axios;
  constructor() {
    this.axios = BaseApi.axiosConfig();
  }

  private static axiosConfig() {
    return axios.create({
      baseURL: "",
      timeout: 5000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export default BaseApi;
