import React, { useEffect } from 'react'
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Button, Typography, Paper } from '@mui/material';
import axios from 'axios'
import Cookies from 'universal-cookie'

const cookies = new Cookies(); 

const bigInput = {width:'95%', marginBottom:1, marginTop:1, marginRight:1, marginLeft:1}
// const smallInput = {width:'46%', marginBottom:1, marginTop:1, marginRight:1, marginLeft:1}

const api = axios.create({
  baseURL: process.env.REACT_APP_API
})

const Login = () => {
  const headers = {
    'Authorization': `Bearer ${cookies.get('token')}`
  }
  useEffect(() => {
  
  },[])

  const testAPI = async () => {
    console.log("Token is => " + cookies.get('token'))
    try {
      const res = await api.get('/users', {headers: headers}
      )
      console.log(res.data)
    } catch (error) {
      console.log(error.response.data)
    }
  }

    const initialState = {
        username:'',
        email:'',
        password:'',

    }
    // Submition State 
    const [submitted, setSubmitted] = useState(false) 
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
          console.log(res.data.token)
        }
        
        catch (error) {
          console.log(error.response.data)
        }
      }
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
            <form onSubmit={handleSubmit}>
            <TextField name="username" label="Username" variant="outlined" sx={bigInput} onChange={handleChange}/>
            <TextField name="email" label="Email" variant="outlined" sx={bigInput} onChange={handleChange}/>
            <TextField name="password" label="Password" type="password" variant="outlined" sx={bigInput} onChange={handleChange}/>
            <Button type="submit" variant="contained" color="primary" sx={{width:'50%'}}> Login</Button>
            <br />
            <Button variant="contained" color="secondary" sx={{width:'50%'}} onClick={testAPI}> API TEST</Button>
            <Typography p={1} variant="subtitle2">First time using APA? Sign up! </Typography>
            {submitted && <Typography variant="h4" color="green">Successfully Authenticated</Typography>}

            </form>
          </Paper>
        </Grid>
      </Grid>
    </Box>
    </div>
    )
}

export default Login