import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import { Button, Typography, Paper } from '@mui/material';
import {Select, MenuItem, FormControl, InputLabel} from '@mui/material'
import { Link } from "react-router-dom"
import api from '../utils/api';
import '../index.css'
import goHome from '../utils/goHome';
import headers from '../utils/Headers';
// Inline Styles for MUI 
import { fatPaper } from '../styles/inlineStyles';
import { bigInput, smallInput, smallerInput } from '../styles/inlineStyles';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import getRawDate from '../utils/getRawDate';

const AddEvaluation = () => {

  // Submit and Error Management 
  const [submitted, setSubmitted] = useState(null)
  const [sError, setError] = useState(null)
  // State Management
  const initialDate = new Date()
  const initialState = {
    "dateEvaluation": initialDate,
    "course": ""
  }
  const [selectData, setSelectData] = useState(initialState)
  const [courseList, setCourseList] = useState([])
  const [courseListLoaded, setCourseListLoaded] = useState(null)
  const [data, setData] = useState(initialState)
  // Date State
  const [value, setValue] = useState(new Date(initialDate));

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }
  // TimePicker Handling 
  const handleDateChange = (newValue) => {
    setValue(newValue);
    setData({ ...data, dateEvaluation: newValue })
  };
  const handleSubmit = async (e) => {
    e.preventDefault()
    const myDate = getRawDate(data.dateEvaluation)
    const apiData = {...data, dateEvaluation: myDate}
    console.log(apiData)
    try {
      const addEvaluation = await api.post('evaluate/create', data,
        { headers: headers }
      )
      console.log("Evaluation Added")
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
  // Courses useEffect 

  useEffect(() => {

    const coursesFetcher = async () => {
      try {
        const temp = await api.get('/course', { headers })
        setCourseList(temp.data)
        setCourseListLoaded(true)
        console.log(temp.data[0].id )
         setData({ ...data, course: temp.data[0].id})
        console.log(courseList)
      } catch (error) {
        console.log(error)
      }
      // setCourseTypeList()
      // !courseTypeListLoaded && setCourseTypeListLoaded(true)
    }
    coursesFetcher();
  }, [courseListLoaded]);



  return (

    <div className="container">
      <Grid container spacing={2} className="gridHolder">
        <Grid item xs={3} ml="auto" mr="auto">
          <Typography variant="h6" sx={{ textAlign: 'center' }} pb={2} color="primary">Add an Evaluation Date (Exam Date)</Typography>
          <Paper style={fatPaper}>
            {(submitted && sError) && <Typography variant="body2" color="error">An Error occured, please try again</Typography>}
            {(!submitted || sError) && (
              <form onSubmit={handleSubmit}>
                <div className="inputContainerCenter">
                <FormControl style={{minWidth: '90%'}}>
                <InputLabel id="demo-simple-select-helper-label">Course Name</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    label="Course Name"
                    id="demo-simple-select"
                    name="course"
                    onChange={handleChange}
                    sx={{ width: "90%" }}
                  >
                    {courseList.map(e => <MenuItem key={e.id} value={e.id}>{e.nameCourse}</MenuItem>)}
                  </Select>
                  </FormControl>
                </div>
                <div className="inputContainerCenter">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      name="testDate"
                      inputFormat="dd/MM/yyyy"
                      label="Result Date"
                      required
                      value={value}
                      onChange={handleDateChange}
                      renderInput={(params) => <TextField style={bigInput} {...params} />}
                    />
                  </LocalizationProvider>
                </div>
                <Button variant="contained" type="submit" color="primary" sx={{ width: '50%' }}>Add Evaluation</Button>
              </form>
            )}
            {(submitted && !sError) && (
              <><Typography variant="h6" color="success">Evaluation was added successfully !  </Typography><Button sx={{ margin: 2 }} color="success" variant="contained" onClick={() => { setSubmitted(false) }}>Add Another Semester</Button></>
            )}
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default AddEvaluation