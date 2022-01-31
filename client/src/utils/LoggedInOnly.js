import React, {useEffect} from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import headers from './Headers';


const cookies = new Cookies(); 
const api = axios.create({
    baseURL: process.env.REACT_APP_API
  })



const LoggedInOnly = () => {

    useEffect(() => {
        const checkAuth = async () => {
            console.log("Token is => " + cookies.get('token'))
            try {
                let res = await api.get('/users/current', {headers: headers})
                console.log(res)
                console.log("User is Logged")
            } catch (error) {
                console.log(error.response.data)
                console.log("User is not logged")
            }
        }
        checkAuth();
    }, []);
    

  return (
      <h1>
          {cookies.get('token')}
      </h1>
  )
};

export default LoggedInOnly;
