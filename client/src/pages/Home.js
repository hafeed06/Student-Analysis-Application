import { Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import getUserFullInformation from '../utils/getUserFullInformation';
import { Paper, Grid, Box } from '@mui/material';
import CustomLocaleTextGrid from '../components/DataGrid';
import HomeUserCard from '../components/cards/HomeUserCard';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import blueGradient from '../styles/blueGradient';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import HomePieChart from '../components/charts/HomePieChart';
import Top5Marks from '../components/stats/Top5Marks';
import LatestResults from '../components/stats/LatestResults'

const Home = () => {
    const [userInformation, setUserInformation] = useState(null);
    const [userInformationLoaded, setUserInformationLoaded] = useState(null)
    useEffect(() => {

        const userInformationFunction = async () => {
            setUserInformation(await getUserFullInformation())
            !userInformationLoaded && setUserInformationLoaded(true)
        }
        console.log("Home useEffect Re-Rendered! ")
        userInformationFunction();
    }, [userInformationLoaded]);

    return (
        <div className='container'>
            <Grid container spacing={2} className="gridHolder">
                <Grid item xs={3} >
                    {userInformation && <HomeUserCard image="./graduating-student.png" data={userInformation} />}
                </Grid>
                <Grid item xs={6} >
                    <Box style={{ border: "solid 1px #D5D8DB", borderRadius: '4px', padding: "10px" }} sx={{ background: blueGradient }}>
                        <Typography variant="h6" className="centered" color="white">
                            <AnalyticsIcon /> Latest Grades
                            {/* <strong>{userInformation && userInformation.username}</strong> */}
                        </Typography>
                        <LatestResults />
                    </Box>
                </Grid >
                <Grid item xs={2}>
                    <Box style={{ border: "solid 1px #D5D8DB", borderRadius: '4px', padding: "10px" }} sx={{ background: blueGradient }}>
                        <Typography variant="h6" className="centered" color="white">
                           <StarOutlineIcon /> Top Subjects
                           </Typography>
                           <Paper style={{padding:'5px'}}>
                               <Top5Marks /> 
                           </Paper>
                           <Paper style={{padding:'5px', marginTop:'10px'}}>
                               <HomePieChart /> 
                           </Paper>
                    </Box>
                </Grid>
            </Grid>


            {/* Grid 2 */}

            <Grid container spacing={2} className="gridHolder">
                <Grid item xs={11} >
                    <CustomLocaleTextGrid />
                </Grid>
            </Grid>
        </div>
    )
}

export default Home
