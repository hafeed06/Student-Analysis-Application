import React, { useEffect } from 'react';
import checkAuth from '../utils/checkAuth';

const AuthenticationTester = () => {

    useEffect(() => {

        const AuthResult = async () => {
            let result; 
            result = await checkAuth(); 
            console.log(result)
        }
        AuthResult(); 

    }, []);
    

  return (<div>
  </div>);

};

export default AuthenticationTester;
