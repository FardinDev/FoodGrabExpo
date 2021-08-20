import AsyncStorage from "@react-native-async-storage/async-storage";
import * as axios from "axios";


export default class Api {
  constructor() {
    this.api_token = null;
    this.client = null;
    this.api_url = "http://192.168.0.117:8000/api/v1";
    // this.api_url = "https://foodgrab.net/demo/api/v1";
  

    
  }

  init = () => {
     AsyncStorage.getItem("userToken").then(token => this.api_token = token );
    
    let headers = {
      Accept: "application/json",
    };

    if (this.api_token) {
      headers.Authorization = `Bearer ${this.api_token}`;
    }


    this.client = axios.create({
      baseURL: this.api_url,
      timeout: 15000,
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

  setToken = (data) => {
    
    return this.init().post("/user/store-notification-token", data);
  };


  getRestaurants = () => {

    return this.init().get("/restaurant/list", { params: {paginate: false} } );
  };


  getRestaurant = (id) => {

    return this.init().get("/restaurant/list", { params: {paginate: false, id: id} } );
  };

  getRecomended = () => {

    return this.init().get("/restaurant/list/recomended");
  };

  getLocations = () => {

    return this.init().get("/location/list");
  };

  getValues = (data) => {
    
    return this.init().post("/restaurant/get-values", data);
  };

  placeOrder = (data) => {
    
    return this.init().post("/order/create", data);
  };

  orderList = () => {
    return this.init().get("/order/list");
  };

}