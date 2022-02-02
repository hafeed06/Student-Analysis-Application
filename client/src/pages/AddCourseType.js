import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import { Button, Typography, Paper } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Link } from "react-router-dom"
import api from '../utils/api';
import '../index.css'
import goHome from '../utils/goHome';
import headers from '../utils/Headers';
// Inline Styles for MUI 
import { fatPaper } from '../styles/inlineStyles';

const bigInput = { width: '95%', marginBottom: 1, marginTop: 1, marginRight: 1, marginLeft: 1 }
const smallInput = { width: '46%', marginBottom: 1, marginTop: 1, marginRight: 1, marginLeft: 1 }

const AddCourseType = () => {


    // Submit and Error Management 
    const [submitted, setSubmitted] = useState(null)
    const [sError, setError] = useState(null)
    // State Management
    const initialDate = new Date()
    const initialState = {
        nameTypeCourse: '',
    }
    const [data, setData] = useState(initialState)
    // Date State
    const [value, setValue] = useState(new Date(initialDate));

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    // TimePicker Handling 
    const handleDateChange = (newValue) => {
        setValue(newValue);
        setData({ ...data, birthdate: newValue })
    };
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const addCourseType = await api.post('typeCourse/create', data, 
            {headers: headers}
            )
            console.log("Course added Added")
            setError(false)
            // Creating the Course

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
    }, [data])
    // Redirect after Sign up useEffect 
    // useEffect(() => {
    //     (submitted && !sError) && setTimeout(goHome(), 6000)
    // }, [submitted])
    return (

        <div className="container">
            <Grid container spacing={2} className="gridHolder">
                <Grid item xs={3} ml="auto" mr="auto">
                    <Typography variant="h6" sx={{ textAlign: 'center' }} pb={2} color="primary">Add a Course Type</Typography>
                    <Paper style={fatPaper}>
                        {(submitted && sError) && <Typography variant="body2" color="error">An Error occured, please try again</Typography>}
                        {(!submitted || sError) && (
                            <form onSubmit={handleSubmit}>
                                <div className="inputContainerCenter">
                                <TextField name="nameTypeCourse" label="Type of Course" variant="outlined" sx={bigInput} onChange={handleChange}/>
                                </div>
                                <Button variant="contained" type="submit" color="primary" sx={{ width: '50%' }}>Add Course Type</Button>
                            </form>
                        )}
                        {(submitted && !sError) && (
                        <><Typography variant="h6" color="success">Course Type was added successfully !  </Typography><Button sx={{margin:2}}color="success" variant="contained" onClick={() => {setSubmitted(false)}}>Add Another Course Type</Button></>
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default AddCourseType