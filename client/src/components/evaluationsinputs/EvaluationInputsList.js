import React, { useState, useEffect } from 'react';
import { TextField, Typography, Button } from '@mui/material'
import IosShareIcon from '@mui/icons-material/IosShare';
import api from '../../utils/api'
import headers from '../../utils/Headers'
import getRawDate from '../../utils/getRawDate'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import {Select, MenuItem, FormControl, InputLabel} from '@mui/material'
import { bigInput, smallInput, smallerInput } from '../../styles/inlineStyles'
import capitalize from '../../utils/capitalize'
import { responsiveProperty } from '@mui/material/styles/cssUtils';
import { getFrenchDate, getHyphenFrenchDate } from '../../utils/getRawDate';


const EvaluationInputsList = ({ id, inputs, setInputs }) => {

    const initialDate = new Date();

    const [evaluationDates, setEvaluationDates] = useState([])
    const [parsedDate, setParsedDate] = useState('') // Must Always be a String
    const [inputDetails, setInputDetails] = useState(
        {
            "username": "",
            "course": "",
            "result": "",
            "date": new Date(),
        }
    )

    // Courses and Users Lists 
    const initialState = {
        nameCourse: '',
        username: '',
    }
    const [selectData, setSelectData] = useState(initialState)
    const [courseList, setCourseList] = useState([])
    const [users, setUsers] = useState([])
    const [courseListLoaded, setCourseListLoaded] = useState(null)
    const [usersLoaded, setUsersLoaded] = useState(null)
    // Date Management 

    // Evaluate Custom Management 
    const [customEvaluateList, setCustomEvaluateList] = useState([])



    const [value, setValue] = useState(new Date(initialDate));
    const handleDateChange = (newValue) => {
        setValue(newValue);
        setParsedDate(getRawDate(newValue))
        setInputDetails({ ...inputDetails, date: newValue })
    };


    const handleFieldChange = async (e) => {

        setInputDetails({ ...inputDetails, [e.target.name]: e.target.value })
        const updatedInputs = inputs;
        updatedInputs[id][e.target.name] = e.target.value;
        setInputs(updatedInputs)

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const subResult = await api.post('/upload/evaluation', inputDetails, { headers: headers })
            console.log(subResult)
        } catch (error) {
            console.log(error.response.data)
        }
    }


    useEffect(() => {
        console.log(inputDetails)
    }, [inputDetails]);

    // Get Students and Courses List 

    useEffect(() => {

        const usersAndCoursesFetcher = async () => {
            try {
                const temp = await api.get('/course', { headers })
                setCourseList(temp.data)
                setCourseListLoaded(true)
                !selectData ? setSelectData({ nameCourse: temp.data[0].nameCourse })
                    : setSelectData({ ...selectData, nameCourse: temp.data[0].nameCourse })
                console.log(courseList)
            } catch (error) {
                console.log(error)
            }
            try {
                const temp = await api.get('/users', { headers })
                setUsers(temp.data)
                setUsersLoaded(true)
                setSelectData({ ...selectData, username: temp.data[0].username })
                console.log(users)
            } catch (error) {
                console.log(error)
            }
            // setCourseTypeList()
            // !courseTypeListLoaded && setCourseTypeListLoaded(true)
        }
        usersAndCoursesFetcher();
    }, [usersLoaded, courseListLoaded]);

    useEffect(() => { 
        api.get(`/evaluate/dateEvaluation/${inputDetails.course}`, {headers: headers})
        .then(res => {
            console.log(" => Fetching NameCourse: " + inputDetails.course)
            console.log(res.data)
            setCustomEvaluateList(res.data)
            console.log("___________ ***** ")
            console.log(res.data[0].dateEvaluation)
            setInputDetails({...inputDetails, date : res.data[0].dateEvaluation })
        })
        .catch(e => console.log(e))
    },[inputDetails.course])


    return (

        <form onSubmit={handleSubmit}>
            <div className="inputContainer" style={{ width: "90%" }}>
                <FormControl>
                <InputLabel id="demo-simple-select-helper-label">Student ID</InputLabel>
                <Select
                    labelId="demo-simple-select-label" id="demo-simple-select" value={inputDetails.username} name="username" onChange={handleFieldChange}
                    sx={{width:"200px"}} label ="Student ID"
                >
                    {users.map(e => <MenuItem key={e.username} value={e.username}>{e.stdCode.toUpperCase()}</MenuItem>)}

                </Select>
                </FormControl>
                {/* <TextField label="Student Username" name="username" onChange={handleFieldChange} /> */}


                <FormControl>
                <InputLabel id="demo-simple-select-helper-label">Course Name</InputLabel>
                <Select
                    labelId="demo-simple-select-label" id="demo-simple-select" value={inputDetails.course} name="course" onChange={handleFieldChange}
                    sx={{width:"200px"}} label ="Course Name"
                >
                    {courseList.map(e => <MenuItem key={e.nameCourse} value={e.nameCourse}>{e.nameCourse}</MenuItem>)}

                </Select>
                </FormControl>


                


                {/* <TextField label="Course Name" name="course" onChange={handleFieldChange} /> */}
                <TextField type="number" label="Result" name="result" onChange={handleFieldChange} required />
                {/* <TextField label="Result Date" name="date" onChange={handleFieldChange}/ > */}
                {/* <div style={{maxWidth:'30%'}}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            name="testDate"
                            inputFormat="dd/MM/yyyy"
                            label="Evaluation Date"
                            required
                            value={value}
                            onChange={handleDateChange}
                            renderInput={(params) => <TextField style={bigInput} {...params} />}
                        />
                    </LocalizationProvider>
                </div> */}

                <FormControl>
                <InputLabel id="demo-simple-select-helper-label">EVALUATION DATE</InputLabel>
                <Select
                    labelId="demo-simple-select-label" id="demo-simple-select" 
                    sx={{width:"200px"}} label ="EVALUATION DATE"
                    name="date" onChange={handleFieldChange}
                >
                    {customEvaluateList.map(e => <MenuItem key={e.dateEvaluation} value={e.dateEvaluation}>{getFrenchDate(e.dateEvaluation)}</MenuItem>)}

                </Select>
                </FormControl>

                <Button type="submit" variant="contained" startIcon={<IosShareIcon />} sx={{ background: "#0FA097" }}>Send Results</Button>
            </div>
        </form>
    )
};

export default EvaluationInputsList;