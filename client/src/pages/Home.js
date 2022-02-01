import { Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import getUserFullInformation from '../utils/getUserFullInformation';
import { Paper, Grid, Box } from '@mui/material';
import CustomLocaleTextGrid from '../components/DataGrid';
import ActionAreaCard from '../components/cards/HomeUserCard';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import blueGradient from '../styles/blueGradient';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

const Home = () => {

    const [userInformation, setUserInformation] = useState(null);
    useEffect(() => {

        const userInformationFunction = async () => {
            setUserInformation(await getUserFullInformation())
        }

        userInformationFunction();

    }, []);

    return (
        <div className='container'>


            <Grid container spacing={2} className="gridHolder">
                <Grid item xs={3} >
                    {userInformation && <ActionAreaCard image="./student.jpg" data={userInformation} />}
                </Grid>
                <Grid item xs={6} >
                    <Box style={{ border: "solid 1px #D5D8DB", borderRadius: '4px', padding: "10px" }} sx={{ background: blueGradient }}>
                        <Typography variant="h6" className="centered" color="white">
                            <AnalyticsIcon /> Latest Grades
                            {/* <strong>{userInformation && userInformation.username}</strong> */}
                        </Typography>
                        <CustomLocaleTextGrid />
                    </Box>
                </Grid >
                <Grid item xs={2}>
                    <Box style={{ border: "solid 1px #D5D8DB", borderRadius: '4px', padding: "10px" }} sx={{ background: blueGradient }}>
                        <Typography variant="h6" className="centered" color="white">
                           <StarOutlineIcon /> Top Subjects
                           </Typography>
                           <Paper style={{padding:'5px'}}>
                               <div className = "inputContainer">
                               <Typography variant="body2">1. Advanced C</Typography>
                               <Typography variant="body2">20</Typography>
                               </div>
                               <div className = "inputContainer">
                               <Typography variant="body2">2. UML & Java</Typography>
                               <Typography variant="body2">18</Typography>
                               </div>
                               <div className = "inputContainer">
                               <Typography variant="body2">3. Communication for Leaders</Typography>
                               <Typography variant="body2">15</Typography>
                               </div>
                               <div className = "inputContainer">
                               <Typography variant="body2">4. Relational Databases</Typography>
                               <Typography variant="body2">13</Typography>
                               </div>
                               <div className = "inputContainer">
                               <Typography variant="body2">5. Algebra Advanced</Typography>
                               <Typography variant="body2">10</Typography>
                               </div>

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
