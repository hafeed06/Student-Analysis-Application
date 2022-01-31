import React from 'react';
import Cookies from 'universal-cookie'; 
import headers from './Headers';
import api from './api';

const cookies = new Cookies();

const CheckAuth = async () => {
    let isAuth = null; 
    try {
        let res = await api.get('/users/current', {headers: headers})
        isAuth = true
        console.log("Auth Succeeded")
    } catch (error) {
        isAuth = false; 
        console.log("Auth Failed")
        console.log(error)
    }
    return isAuth
};
export default CheckAuth;
