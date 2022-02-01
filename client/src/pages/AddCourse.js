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
// Inline Styles for MUI 
import { fatPaper } from '../styles/inlineStyles';

const bigInput = { width: '95%', marginBottom: 1, marginTop: 1, marginRight: 1, marginLeft: 1 }
const smallInput = { width: '46%', marginBottom: 1, marginTop: 1, marginRight: 1, marginLeft: 1 }

const AddCourse = () => {


    // Submit and Error Management 
    const [submitted, setSubmitted] = useState(null)
    const [sError, setError] = useState(null)
    // State Management
    const initialDate = new Date()
    const initialState = {
        typeCourse: 'Technical',
        semester: 'S1'
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
            const addUser = await api.post('course/create', data)
            console.log("Course added Added")
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
    useEffect(() => {
        (submitted && !sError) && setTimeout(goHome(), 6000)
    }, [submitted])


    return (

        <div className="container">
            <Grid container spacing={2} className="gridHolder">
                <Grid item xs={3} ml="auto" mr="auto">
                    <Typography variant="h6" sx={{ textAlign: 'center' }} pb={2} color="primary">Add a Course</Typography>
                    <Paper style={fatPaper}>
                        {(submitted && sError) && <Typography variant="body2" color="error">An Error occured, please try again</Typography>}
                        {(!submitted || sError) && (
                            <form onSubmit={handleSubmit}>
                                <div className="inputContainerCenter">
                                 <div style={{width:'95%', marginBottom:'3px', marginTop:'8px'}}>
                                 <InputLabel id="demo-simple-select-label">Course Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={data.typeCourse}
                                    name="typeCourse"
                                    label="Age"
                                    onChange={handleChange}
                                    sx={{width:"90%"}}
                                >
                                    <MenuItem value='Technical'>Technical</MenuItem>
                                    <MenuItem value='Management'>Management</MenuItem>
                                </Select>
                                </div>
                                <div style={{width:'95%', marginBottom:'3px', marginTop:'8px'}}>
                                 <InputLabel id="demo-simple-select-label">Semester</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={data.semester}
                                    name="semester"
                                    label="Age"
                                    onChange={handleChange}
                                    sx={{width:"90%"}}
                                >
                                    <MenuItem value='S1'>Semester 1</MenuItem>
                                    <MenuItem value='S2'>Semester 2</MenuItem>
                                    <MenuItem value='S3'>Semester 3</MenuItem>
                                    <MenuItem value='S4'>Semester 4</MenuItem>
                                </Select>
                                </div>
                                </div>
                                <Button variant="contained" type="submit" color="primary" sx={{ width: '50%' }}>Add Course</Button>
                            </form>
                        )}
                        {(submitted && !sError) && (<Typography variant="h6" color="success">Course was added successfully !  </Typography>)}
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default AddCourse