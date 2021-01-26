import React from "react";
import axios from "axios";
const endpoint = "http://localhost:5000";

const headers = {
  "Content-Type": "Application/json",
};



export const login = (email, password) => {
    axios
      .post(
        "/signin",
        { email: email, password: password },
        { headers: headers }
      )
      .then((user) => {
          localStorage.setItem("auth_token",`barer ${user.token}`)
          console.log(user);
          return user;
      })
      .catch((error) => {
        alert(error);
      });
  };

function userP(params) {


}
