import React from "react";
import axios from "axios";
// const endpoint = "http://localhost:5000";


class AuthService{
 
  login(form){
   return axios
    .post("/signin", form)
  
  }

  logout(){localStorage.removeItem('user');}

  register(form){

    return axios.post('register',form)
  }

  getCurrentUser(){
    return JSON.parse(localStorage.getItem('user'))
  }

}
export default AuthService;

