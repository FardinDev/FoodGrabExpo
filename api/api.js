import * as axios from "axios";


export default class Api {
  constructor() {
    this.api_token = null;
    this.client = null;
    this.api_url = "http://logitav2-api.sslwireless.com/api";
  }

  init = () => {
    this.api_token = null;

    let headers = {
      Accept: "application/json",
    };

    if (this.api_token) {
      headers.Authorization = `Bearer ${this.api_token}`;
    }

    this.client = axios.create({
      baseURL: this.api_url,
      timeout: 500000,
      headers: headers,
    });

    return this.client;
  };

  getUserList = (params) => {
    return this.init().get("/users", { params: params });
  };

  login = (data) => {
    return this.init().post("/v1/login", data);
  };
}