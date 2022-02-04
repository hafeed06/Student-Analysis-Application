import { Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Paper, Grid, Box } from '@mui/material';
import blueGradient from '../styles/blueGradient';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import LineChart from '../components/charts/LineChart';
import BarChart from '../components/charts/BarChart';
import RadarChart from '../components/charts/RadarChart';
import BarChartIcon from '@mui/icons-material/BarChart';
import RadarIcon from '@mui/icons-material/Radar';
import HomePieChart from '../components/charts/HomePieChart';
import PolarChart from '../components/charts/PolarChart';

const Performance = () => {
  return (
    <div className='container'>
                <Typography variant="h4" color="primary" sx={{textAlign:'center'}}>
                    <LeaderboardIcon /> Performance Metrics 
                    </Typography>

    <Grid container spacing={2} className="gridHolder">

        <Grid item xs={6}>
            <Box style={{ border: "solid 1px #D5D8DB", borderRadius: '4px', padding: "10px" }} sx={{ background: blueGradient }}>
                <Typography variant="h6" className="centered" color="white">
                    <BarChartIcon /> Average Grade Per Month in the last 6 Months
                   </Typography>
                   <Paper style={{padding:'5px'}}>
                   <LineChart />
                   </Paper>
                   <Paper style={{padding:'5px', marginTop:'10px'}}>
                       <BarChart /> 
                   </Paper>
            </Box>
        </Grid>
        <Grid item xs={6}>
            <Box style={{ border: "solid 1px #D5D8DB", borderRadius: '4px', padding: "10px" }} sx={{ background: blueGradient }}>
                <Typography variant="h6" className="centered" color="white">
                    <RadarIcon /> Performance by Course Type in the last 2 Months
                   </Typography>
                   <Paper style={{padding:'5px'}}>
                      <RadarChart /> 
                   </Paper>
                   {/* <Paper style={{padding:'5px', marginTop:'10px'}}>
                       <PolarChart /> 
                   </Paper> */}
            </Box>
        </Grid>
    </Grid>


    {/* Grid 2 */}

    <Grid container spacing={2} className="gridHolder">
        <Grid item xs={11} >
            {/* <CustomLocaleTextGrid /> */}
        </Grid>
    </Grid>
</div>
  )
};

export default Performance;
