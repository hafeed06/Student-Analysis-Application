import React from 'react';
import Cookies from 'universal-cookie'; 
import headers from './Headers';
import api from './api';

const getUserFullInformation = async () => {
  let fullData = {}
  try {
      let res = await api.get('/users/current', {headers: headers})
      // console.log("getUserFullInformation => Success")
      // console.log(res.data)
      fullData = {...res.data}
      let userId = res.data.id
      try {
        let res2 = await api.get(`/contacts/${userId}`, {headers: headers})
        // console.log("getSecondFullInformation => Success")
        
        fullData = {...fullData, ...res2.data}
        delete fullData.id 
        delete fullData.user
        // console.log(fullData)
      } catch (error) {
          console.log(error.response.message)
      }
  } catch (error) {
      console.error("getUserFullInformation => Failure")
      console.log(error.response.message)
  }
  return fullData
};

export default getUserFullInformation;