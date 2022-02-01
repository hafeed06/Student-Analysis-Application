import React from 'react';
import Chart from 'chart.js/auto';
import { useEffect } from 'react';

const HomePieChart = () => {

    const data = {
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
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }]
      };

    const config = {
        type: 'doughnut',
        data: data,
      };

      useEffect(() => {
        const ctx = document.getElementById('homePieChart');
        const homePieChart = new Chart(ctx, config) 
      },[])



  return (

    <div className='container' style={{width: '200px', height: '200px'}}>
        <canvas id="homePieChart" ></canvas>
    </div>


  )
};

export default HomePieChart;
