import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import { Button, Typography, Paper } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { Link } from "react-router-dom"
import '../index.css'

const bigInput = {width:'95%', marginBottom:1, marginTop:1, marginRight:1, marginLeft:1}
const smallInput = {width:'46%', marginBottom:1, marginTop:1, marginRight:1, marginLeft:1}

const Signup = () => {

        // State Management
        const initialDate = new Date()
        const initialState = {
          firstname:'',
          lastname:'',
          username:'',
          password:'',
          email:'',
          country:'',
          area:'',
          city:'',
          number:'',
          street:'',
          }
        const [submitted, setSubmitted] = useState(false)
        const [data, setData] = useState(initialState)
        // Date State
        const [value, setValue] = useState(new Date(initialDate));
    
        const handleChange = (e) => {
            setData({...data, [e.target.name]:e.target.value})
        }
        // TimePicker Handling 
        const handleDateChange = (newValue) => {
          setValue(newValue);
          setData({...data, birthdate:newValue})
        };
        const handleSubmit = async (e) => {
          e.preventDefault()
          // Call to javaAPI
        //   addUser(data)
        }
    
        // Logging  - Dev Only 
        useEffect(() => {
          console.log(data)
                        },[data])
    

    return (

        <div>
            <Grid container spacing={2} className="gridHolder">
                <Grid item xs={5} ml="auto" mr="auto">
                <Typography variant="h4" sx={{textAlign:'center'}} pb={2}color="primary">Create an Account </Typography>
        <Paper sx={{paddingTop:2, paddingLeft:2, paddingRight:2, justifyContent:'center', textAlign:'center'}}>
        <form onSubmit={handleSubmit}>
            <TextField name="firstname" label="First Name" variant="outlined" sx={smallInput} onChange={handleChange}/>
            <TextField name="lastname" label="Last Name" variant="outlined" sx={smallInput} onChange={handleChange}/>
            <TextField name="username" label="Username" variant="outlined" sx={bigInput} onChange={handleChange}/>
            <TextField name="password" label="Password" type="password" variant="outlined" sx={bigInput} onChange={handleChange}/>
            <TextField name="email" label="Email" variant="outlined" sx={bigInput} onChange={handleChange}/>
            <TextField name="country" label="Country" variant="outlined" sx={smallInput} onChange={handleChange}/>
            <TextField name="area" label="Area" variant="outlined" sx={smallInput} onChange={handleChange}/>
            <TextField name="city" label="City" variant="outlined" sx={smallInput} onChange={handleChange}/>
            <TextField name="number" label="Number" variant="outlined" sx={smallInput} onChange={handleChange}/>
            <TextField name="street" label="Street" variant="outlined" sx={bigInput} onChange={handleChange}/>
            <Button variant="contained" type="submit" color="primary" sx={{width:'50%'}}>Signup</Button>
          </form>
            <Typography p={1} variant="subtitle2">Already have an account?&nbsp;
              {/* <Link to="/Signup" >
               Sign in! 
              </Link> */}
            </Typography>
          </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default Signup