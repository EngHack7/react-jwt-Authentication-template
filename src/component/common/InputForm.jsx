import React from 'react'

function InputLogin({value, name, class_main_div, font_awesome_class, onChange,error}) {
    return (
        <div className={class_main_div}>
          <label>
           
          <i className={font_awesome_class}></i> {name}
          </label>
          <input
            onChange={onChange}
            name={name}
            
            id={name}
            type="text"
            value={value}
            placeholder={name}
          />
          { error &&  <div style={{color : 'red' , }} className="" >{name === "phone" ?"Enter correct phone number" : error}</div>}
        </div>
    )
}

export default InputLogin
