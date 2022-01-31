import React from 'react';
import Cookies from 'universal-cookie';
import goHome from './goHome';

const cookies = new Cookies(); 
const Logout = () => {
    cookies.remove('token')
    goHome(); 
};

export default Logout;
