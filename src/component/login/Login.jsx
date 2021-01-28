import React, { useState,  } from "react";
import { Link, useHistory } from "react-router-dom";
import "./login.css";
import InputLogin from "../common/InputForm";
import { UserContext } from "../../App";

function Login(props) {
  let history = useHistory();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [errors, seterrors] = useState({});


    
  const validateProperty = ({ name, value }) => {
    if (name === "email") {
        // condition when change here
      if (value.trim() === "") return "user email error something in change";
    }
    if(name ==="password") {
        // condition when change here
        if (value.trim() === '' ) return "user email error something in change"
    }

  };

  const handleChange = ({ currentTarget: input }) => {
    const ferrors = { ...errors};
    const errorMessage = validateProperty(input);
    if (errorMessage) ferrors[input.name] = errorMessage;
    else delete ferrors[input.name];

    if (input.name === "email") {
      setemail(input.value);
      seterrors(ferrors)
    } else {
      setpassword(input.value);
      seterrors(ferrors)
    }
  };

  //   validate for submit the form
  const validate = () => {
    const fError = {};
    if (email.trim() === "") {
      fError.email = "user email required";
    }
    if (password.trim() === "") {
      fError.password = "user password required";
    }
    return Object.keys(fError) === 0 ? null : fError;
  };
  const submitHandler = (e) => {
    console.log("submit");
    e.preventDefault();
    const errors = validate();

    seterrors(errors || {});

    if (errors) return;
    doSubmit()
  };

  const doSubmit =()=>{
      props.Login(email, password);
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="form-container">
        <h2>Login</h2>
        <InputLogin
          onChange={handleChange}
          name="email"
          class_main_div="input-email"
          value={email}
          error={errors.email}
        />
        <InputLogin
          font_awesome_class="fas fa-user-lock"
          onChange={handleChange}
          name="password"
          class_main_div="input-password"
          value={password}
          error={errors.password}
        />

        <h3>
          <span style={{ color: "red" }} id="success"></span>
        </h3>

        <button type="submit">Login</button>
        <center>or</center>

        <Link to="/register" style={{ color: "black" }}>
          REGISTER
        </Link>
      </div>
    </form>
  );
}

export default Login;
