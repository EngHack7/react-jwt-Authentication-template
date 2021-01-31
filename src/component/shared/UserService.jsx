import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios';
import auth_header from './authHeader'


class UserService   {
    profile(){
        return axios.get('/profile',{headers : auth_header()})
    }

    home(){
        return axios.get('/getHome',{headers : auth_header()})
    }

}
export default UserService;
