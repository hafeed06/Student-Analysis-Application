import React, { useEffect } from 'react'
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Button, Typography, Paper } from '@mui/material';
import axios from 'axios'
import Cookies from 'universal-cookie'
import api from '../utils/api';
import headers from '../utils/Headers';
import { Link } from 'react-router-dom';
import { useLocation} from 'react-router-dom';

const cookies = new Cookies(); 

const bigInput = {width:'95%', marginBottom:1, marginTop:1, marginRight:1, marginLeft:1}
// const smallInput = {width:'46%', marginBottom:1, marginTop:1, marginRight:1, marginLeft:1}


const Login = () => {

  // History for redirecting if login is successful 

  const location = useLocation()

  // const testAPI = async () => {
  //   console.log("Token is => " + cookies.get('token'))
  //   try {
  //     const res = await api.get('/users', {headers: headers}
  //     )
  //     console.log(res.data)
  //   } catch (error) {
  //     console.log(error.response.data)
  //   }
  // }

    const initialState = {
        username:'',
        email:'',
        password:'',

    }
    // Errors and Submission States 
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState(false); 

    // Data Handling 
    const [data, setData] = useState(initialState)
    const handleChange = (e) => {
        setData({...data, [e.target.name]:e.target.value})
        console.log(data)
    }
      /////////////////////////////////////// SUBMISSION /////////////////////////////
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
          let res = await api.post('/users/authenticate', data)
          cookies.remove('token')
          cookies.set("token", res.data.token, {'path': '/'})
          setError(false)
          // Simple good old JS redirection, keeping it simple because we Can! :) 
          window.location.href = '/'; //one level up
        }
        catch (error) {
          console.log(error.response)
          setError(true)
        }
        setSubmitted(true)
      }
      // UseEffect --- Just for testing purposes 
      useEffect(() => {
        console.log(data)
        console.log(submitted)
      }, [data, submitted])

    return (
        <div>
        <Box sx={{ flexGrow: 1 }} mt={10} >
        <Grid container spacing={2}>
        <Grid item xs={12} sm={8} md={4} ml="auto" mr="auto">
        <Typography variant="h4" sx={{textAlign:'center'}} pb={2}color="primary">Log in to APA </Typography>
        <Paper sx={{paddingTop:2, paddingLeft:2, paddingRight:2, justifyContent:'center', textAlign:'center'}}>
          {/* This error will show if the form is submitted and there was an error */}
          {submitted && error && <Typography variant="body2" color="error">Incorrect Credentials ... Please Try again</Typography> }
            {(!submitted || error) && (
            <form onSubmit={handleSubmit}>
            <TextField name="username" label="Username" variant="outlined" sx={bigInput} onChange={handleChange}/>
            <TextField name="email" label="Email" variant="outlined" sx={bigInput} onChange={handleChange}/>
            <TextField name="password" label="Password" type="password" variant="outlined" sx={bigInput} onChange={handleChange}/>
            <Button type="submit" variant="contained" color="primary" sx={{width:'50%'}}> Login</Button>
            {/* <br />
            <Button variant="contained" color="secondary" sx={{width:'50%'}} onClick={testAPI}> API TEST</Button> */}
            <Typography p={1} variant="subtitle2">First time using APA? <Link to="/signup">Sign up!</Link> </Typography>
            </form>
            )}
            {(submitted && !error) && <Typography variant="h3" color="success">You have been Authenticated ! </Typography>}
          </Paper>
        </Grid>
      </Grid>
    </Box>
    </div>
    )
}

export default Login