import React from 'react';
import Chart from 'chart.js/auto';
import { useEffect, useState } from 'react';
import api from '../../utils/api';
import headers from '../../utils/Headers';

const HomePieChart = () => {

    const [newDataLoaded, setNewDataLoad] = useState(null)
    const initialData = {
      labels: [
        'Advanced C',
        'Advanced JavaScript',
        'CFL'
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [20, 19, 10],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'rgb(235, 97, 47)',
          'rgb(135, 194, 76)'
        ],
        hoverOffset: 4
      }]
    };

    const [data, setData] = useState(initialData)

    const config = {
      type: 'doughnut',
      data: data,
    };

    const reloadChart = () => {
      
    }

  useEffect(() => {

    api.post('evaluate/allMarksUser/', {}, {headers : headers})
    .then(res => {
      const newResults = []
      const newLabels = []
      res.data.map((e,k) => {
        if(k < 5) {
        newResults.push(Number(e.result))
        newLabels.push(e.course)
      }
      })
      const newData = {...data}
      newData.datasets[0].data = newResults
      newData.datasets[0].label = newLabels
      newData.labels = newLabels
      setData(newData)
      const ctx = document.getElementById('homePieChart');
      const homePieChart = new Chart(ctx, config)
      setNewDataLoad(true)
      // console.log(newData.datasets)
    })
    .catch(error => console.log(error))
  }, [newDataLoaded])



  return (

    <div className='inputContainerCenter' style={{ width: '250px', }}>
      {newDataLoaded && <canvas id="homePieChart" ></canvas> }
    </div>


  )
};

export default HomePieChart;
