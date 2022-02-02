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

const AddCourse = () => {


    // Submit and Error Management 
    const [submitted, setSubmitted] = useState(null)
    const [sError, setError] = useState(null)
    //////// ContentState ////////////
    const [semesterList, setSemesterList] = useState([])
    const [courseTypeList, setCourseTypeList] = useState([])
    const [semesterListLoaded, setSemesterListLoaded] = useState(null)
    const [courseTypeListLoaded, setCourseTypeListLoaded] = useState(null)

    // State Management
    const initialState = {
        nameCourse:'',
        typeCourse: '',
        semester: ''
    }
    const [data, setData] = useState(initialState)
    // Date State

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const addUser = await api.post('course/create', data, {headers: headers})
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

    useEffect(() => {

        const courseTypeAndSemesterFetcher = async () => {
            try {
                const temp = await api.get('/typeCourse', {headers})
                setCourseTypeList(temp.data)
                setCourseTypeListLoaded(true)
                !data ? setData({typeCourse: temp.data[0].id }) 
                : setData({...data, typeCourse: temp.data[0].id })
                console.log(courseTypeList)
            } catch (error) {
                console.log(error)
            }
            try {
                const temp = await api.get('/semester', {headers})
                setSemesterList(temp.data)
                setSemesterListLoaded(true)
                setData({ ...data, semester: temp.data[0].id })
                console.log(semesterList)
            } catch (error) {
                console.log(error)
            }
            // setCourseTypeList()
            // !courseTypeListLoaded && setCourseTypeListLoaded(true)
        }
        console.log("Home useEffect Re-Rendered! ")
        courseTypeAndSemesterFetcher();
    }, [courseTypeListLoaded, semesterListLoaded]);


    return (

        <div className="container">
            <Grid container spacing={2} className="gridHolder">
                <Grid item xs={3} ml="auto" mr="auto">
                    <Typography variant="h6" sx={{ textAlign: 'center' }} pb={2} color="primary">Add a Course</Typography>
                    <Paper style={fatPaper}>
                        {(submitted && sError) && <Typography variant="body2" color="error">An Error occured, please try again</Typography>}
                        {(!submitted || sError) && (courseTypeList.length > 0 && semesterList.length > 0) && (
                            <form onSubmit={handleSubmit}>
                                 <TextField name="nameCourse" label="Name of the Course" variant="outlined" sx={bigInput} onChange={handleChange}/>
                                <div className="inputContainerCenter">
                                 <div style={{width:'95%', marginBottom:'3px', marginTop:'8px'}}>
                                 <InputLabel id="demo-simple-select-label">Course Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={data.typeCourse}
                                    name="typeCourse"
                                    onChange={handleChange}
                                    sx={{width:"90%"}}
                                >
                                    {courseTypeList.map(e => <MenuItem key={e.id} value={e.id}>{e.nameTypeCourse}</MenuItem>)}
                                </Select>
                                </div>
                                <div style={{width:'95%', marginBottom:'3px', marginTop:'8px'}}>
                                 <InputLabel id="demo-simple-select-label">Semester</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={data.semester}
                                    name="semester"
                                    onChange={handleChange}
                                    sx={{width:"90%"}}
                                >
                                   {semesterList.map(e => <MenuItem key={e.id} value={e.id}>{e.nameSemester}</MenuItem>)}

                                </Select>
                                </div>
                                </div>
                                <Button variant="contained" type="submit" color="primary" sx={{ width: '50%' }}>Add Course</Button>
                            </form>

                        )}
                        {(submitted && !sError) && (
                        <><Typography variant="h6" color="success">Course was added successfully !  </Typography><Button sx={{margin:2}}color="success" variant="contained" onClick={() => {setSubmitted(false)}}>Add Another Course</Button></>
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default AddCourse