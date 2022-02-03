import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import headers from '../../utils/Headers';
import api from '../../utils/api';

const Top5Marks = () => {

    const [topMarks, setTopMarks] = useState([])

    useEffect(() => {
        api.post('evaluate/topGrade', {}, {headers: headers})
        .then(res => {
            let marks = res.data
            console.log(marks)
            })
        .catch(error => console.log(error))
    },[])

  return (
  <div>
      {topMarks.length > 0 && (
          <Typography variant="caption"> { topMarks[0].result }</Typography>
      )}
  </div>)
};

export default Top5Marks;
