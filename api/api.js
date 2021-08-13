import * as axios from "axios";


export default class Api {
  constructor() {
    this.api_token = null;
    this.client = null;
    this.api_url = "http://192.168.0.117:8000/api/v1";
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
      timeout: 1000,
      headers: headers,
    });

    return this.client;
  };

  getUserList = (params) => {
    return this.init().get("/users", { params: params });
  };

  register = (data) => {
    return this.init().post("/register", data);
  };

  login = (data) => {
    return this.init().post("/login", data);
  };

  verify = (data) => {
    return this.init().post("/verify", data);
  };

  getOtp = (data) => {
    return this.init().post("/get-otp", data);
  };

  resetPassword = (data) => {
    return this.init().post("/reset-password", data);
  };
}