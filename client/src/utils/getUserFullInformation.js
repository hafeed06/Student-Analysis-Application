import React from 'react';
import Cookies from 'universal-cookie'; 
import headers from './Headers';
import api from './api';

const getUserFullInformation = async () => {
  let fullData = {}
  try {
      let res = await api.get('/users/current', {headers: headers})
      console.log("getUserFullInformation => Success")
      console.log(res.data)
      fullData = {...res.data}
      
  } catch (error) {
      console.error("getUserFullInformation => Failure")
      console.log(error)
  }
  return fullData
};

export default getUserFullInformation;