import * as axios from "axios";


export default class Api {
  constructor() {
    this.api_token = null;
    this.client = null;
    this.api_url = "https://reqres.in/api";
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
      timeout: 31000,
      headers: headers,
    });

    return this.client;
  };

  getUserList = (params) => {
    return this.init().get("/users", { params: params });
  };

  addNewUser = (data) => {
    return this.init().post("/users", data);
  };
}