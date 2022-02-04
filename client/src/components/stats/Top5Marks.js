import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import headers from '../../utils/Headers';
import api from '../../utils/api';
import '../../index.css'

const Top5Marks = () => {

    const [topMarks, setTopMarks] = useState([])

    useEffect(() => {
        api.post('evaluate/allMarksUser/', {}, {headers : headers})
        .then(res => {
            let marks = res.data
            const x = res.data.sort(function(a, b) {
                var x = Number(a.result); var y = new Number(b.result)
                return ((x < y) ? 1 : ((x > y) ? -1 : 0));
            });

            const limitedMarks = []
            x.map((e,k) => k < 5 && limitedMarks.push(e))

            setTopMarks(limitedMarks)
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
