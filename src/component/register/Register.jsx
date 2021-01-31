import React, { useState } from "react";
import InputLogin from "../common/InputForm";
import { Link } from "react-router-dom";
import joi from 'joi-browser'
import _ from 'lodash'
import AuthService from '../shared/auth'
const initialStateForm = {
    data :  {username: "", password: "", email: "", phone: ""},
    errors : {},
    message : {}
 };
 const auth = new AuthService();

function Register(props) {
  const [form, setform] = useState(initialStateForm);

  const schema = {
      username : joi.string().required().min(4).max(15).label('Username'),
      password  : joi.string().required().min(8).max(30).label('Password'),
      email : joi.string().required().email().label('Email'),
      phone : joi.string().regex(/07(7|8|9)\d{7}/).label('Phone')
  }

  const validate = () =>{
      const result = joi.validate(form.data, schema,{abortEarly : false})
      console.log(result);
      if (!result.error) return null;
      const errors = {}
      for (let err of result.error.details) {
          errors[err.path[0]] = err.message;
      }
      return errors
  }



  const submitHandler = (event) => {
    event.preventDefault();
    const errors =  validate()
    setform({ ...form, errors :errors || {} })
    if (errors) return;

    
    auth.register(form.data).then(
        result =>{
          setform( {...form,message : result.message})
          console.log(result)
        }
    ).catch(err =>{
      console.log(err.response.data);
      setform( {...form,message : err.response.data.error});
     })
      
  };

  React.useEffect(()=>{
       console.log(form);
  }, [form] )

  const validateProperty = ({name,value}) =>{
     
      const obj = { [name] : value }
      console.log("OPbj",obj,typeof(name));
      const result = joi.validate(obj,schema[name])
      console.log(name,value);
      console.log("error",result);
     return result ?result.error.details[0].message : null        
       
  }
  const handleChange = ({ currentTarget: input }) => {
      const data = { ...form.data }
      const errors = { ...form.errors}

      const errorsMessage= validateProperty(input)
      console.log(errorsMessage);
      if (errorsMessage) {
          errors[input.name] = errorsMessage
          setform({ ...form,errors})
      }else{delete form.errors[input.name] }
      
      data[input.name] = input.value;
      const formObj = {data,errors}
      setform(formObj)
      
  };

  return (
    <div>
     
      <form onSubmit={submitHandler}>
        <div className="form-container">
          <h2>Register</h2>

          <InputLogin
            onChange={handleChange}
            font_awesome_class="fas fa-user"
            name="username"
            value={form.data.username}
            error={form.errors.username}
          />
          <InputLogin
            onChange={handleChange}
            font_awesome_class=""
            name="email"
            value={form.data.email}
            error={form.errors.email}
          />
          <InputLogin
            onChange={handleChange}
            font_awesome_class="fas fa-user-lock"
            class_main_div="input-phone"
            name="password"
            value={form.data.password}
            error={form.errors.password}
          />
          <InputLogin
            onChange={handleChange}
            font_awesome_class=""
            name="phone"
            value={form.data.phone}
            error={form.errors.phone}
          />
          {!_.isEmpty(form.message) && <span>{form.message}</span>}
          <button type="submit">Register</button>
          <center>or</center>
          <Link to="/login" style={{ color: "black" }}>
            Login
          </Link>
        </div>
      </form>
     
    </div>
  );
}

export default Register;
