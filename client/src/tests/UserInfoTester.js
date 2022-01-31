import React, { useEffect } from 'react';
import getUserFullInformation from '../utils/getUserFullInformation';

const UserInfoTester = () => {

    useEffect(() => {

        const AuthResult = async () => {
            getUserFullInformation(); 
        }
        AuthResult(); 

    }, []);
    

  return (<div>
  </div>);

};

export default UserInfoTester;
