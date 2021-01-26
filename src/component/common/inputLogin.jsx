import React from 'react'

function InputLogin({value, name, class_main_div, font_awesome_class, onChange,error}) {
    return (
        <div className={class_main_div}>
          <label>
           
          <i className={font_awesome_class}></i> Email
          </label>
          <input
            onChange={onChange}
            name={name}
            
            id={name}
            type="email"
            value={value}
            placeholder={name}
          />
          { error &&  <div className="alert alert-danger" >{error}</div>}
        </div>
    )
}

export default InputLogin
