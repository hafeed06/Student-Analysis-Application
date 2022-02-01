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
import api from '../utils/api';
import '../index.css'
import goHome from '../utils/goHome';

const bigInput = {width:'95%', marginBottom:1, marginTop:1, marginRight:1, marginLeft:1}
const smallInput = {width:'46%', marginBottom:1, marginTop:1, marginRight:1, marginLeft:1}

const Signup = () => {


        // Submit and Error Management 
        const [submitted, setSubmitted] = useState(null)
        const [sError, setError] = useState(null)
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
          const userData = 
            {
              "username": data.username,
              "email": data.email,
              "password": data.password
            }
          const contactData = 
            {
              "area": data.area,
              "country": data.country,
              "city": data.city,
              "street": data.street,
              "number": data.number,
              "user": ""
            }
            
            try {
              const addUser = await api.post('/users/register', userData)
              contactData.user = addUser.data.id 
              console.log("User Added")
              // Creating the contanct 
                try {
                    const addContact = await api.post('/contacts/create', contactData)
                    console.log(addContact.data)
                    console.log("Contact Added")
                    // Everything submitted 
                } catch (error) {
                  console.log(error.response.data)
                  setError(true)
                }
            } catch (error) {
              console.log(error.response.data)
              setError(true)
            }
            setSubmitted(true)
            console.log("Error State => " + sError)
            console.log("Submission State => " + submitted)
        }
    
        // Logging  - Dev Only 
        useEffect(() => {
          console.log(data)
        },[data])
        // Redirect after Sign up useEffect 
        useEffect(() => {
          (submitted && !sError) && setTimeout(goHome(), 6000)
        },[submitted])


    return (

        <div className="container">
            <Grid container spacing={2} className="gridHolder">
                <Grid item xs={5} ml="auto" mr="auto">
                <Typography variant="h4" sx={{textAlign:'center'}} pb={2}color="primary">Create an Account </Typography>
        <Paper sx={{paddingTop:2, paddingLeft:2, paddingRight:2, justifyContent:'center', textAlign:'center'}}>
        {(submitted && sError) && <Typography variant="body2" color="error">An Error occured, please try again</Typography> }
        {(!submitted || sError) && (
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
            <Typography p={1} variant="subtitle2">Already have an account?&nbsp;  
              <Link to="/login" >
               Sign in! 
              </Link>
            </Typography>
          </form>
  )}
              {(submitted && !sError) && (<Typography variant="h6" color="success">You Signed up successfully !  </Typography>)}
          </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default Signup