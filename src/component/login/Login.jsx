import React, { useState,  } from "react";
import { Link, useHistory } from "react-router-dom";
import "./login.css";
import InputLogin from "../common/InputForm";
import AuthService from '../shared/auth'
import _ from 'lodash'

const _authService = new AuthService()
const initialForm = {
 data : {
  email : '',
  password : ''
 },
  errors : {},
}
function Login(props) {
  // let history = useHistory();
  const [form, setForm] = useState(initialForm)

  React.useEffect(() =>{
      console.log(`error`,form);
  },[form])
    
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
    const ferrors = { ...form.errors};
    const errorMessage = validateProperty(input);
    var data ;
    console.log('data',data);
    if (errorMessage) ferrors[input.name] = errorMessage;
    else delete ferrors[input.name];

    if (input.name === "email") {
      data=  { ...form.data,[input.name] : input.value}
      setForm({ ...form, data, errors : ferrors });
    } else {
      data =   { ...form.data,[input.name] : input.value}
      setForm({ ...form,data, errors : ferrors})
    }
  };

  //   validate for submit the form
  const validate = () => {
    const fError = {};
    if (form.data.email.trim() === "") {
      fError.email = "user email required";
    }
    if (form.data.password.trim() === "") {
      fError.password = "user password required";
    }
    return Object.keys(fError) === 0 ? null : fError;
  };


  const submitHandler = (e) => {
    console.log("submit");
    e.preventDefault();
    const errors = validate();
    setForm({ ...form, errors : errors ||{}})
    if (!_.isEmpty(form.errors)) return;
    // console.log('after check ',errors);
    doSubmit()
  };

  const doSubmit =()=>{
    console.log("do submit work");
    _authService.login(form.data)
    .then((user) => {
      console.log(user.data.token);
      localStorage.setItem("user",user.data.token);
      props.history.push('/profile')
      window.location.reload();
      // return user;
    })
    .catch((error) => {
      console.log(error);
      console.log('error',error);
      let errors = { ...form.errors,serverError : error.response.data.error}
      setForm({...form,errors })
    });
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="form-container">
        <h2>Login</h2>
        <InputLogin
          onChange={handleChange}
          name="email"
          class_main_div="input-email"
          value={form.data.email}
          error={form.errors.email}
        />
        <InputLogin
          font_awesome_class="fas fa-user-lock"
          onChange={handleChange}
          name="password"
          class_main_div="input-password"
          value={form.data.password}
          error={form.errors.password}
        />

        <h3>
          <span style={{ color: "red" }} id="success"></span>
        </h3>
        {!_.isEmpty(form.errors.serverError) && 
        <span style={{color : 'red'}}  >{form.errors.serverError}</span> }
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
