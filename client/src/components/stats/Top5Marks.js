import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import headers from '../../utils/Headers';
import api from '../../utils/api';
import '../../index.css'

const Top5Marks = () => {

    const [topMarks, setTopMarks] = useState([])

    useEffect(() => {
        api.post('evaluate/topGrade', {}, {headers: headers})
        .then(res => {
            let marks = res.data
            setTopMarks(marks)
            })
        .catch(error => console.log(error))
    },[])

  return (
    <>
      {topMarks.length > 0 && topMarks.map((e,k) => (
    <div className = "inputContainer" key={`topgrade${k}`}>
                  <Typography variant="body2">{k+1}. {e.course}</Typography>
                  <Typography variant="body2">{e.result}</Typography>
                  </div>
      ))}
  </>
  )
};

export default Top5Marks;
