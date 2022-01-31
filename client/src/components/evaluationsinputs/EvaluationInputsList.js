import React, {useState} from 'react';
import { TextField, Typography, Button} from '@mui/material'

const EvaluationInputsList = ({id, inputs, setInputs}) => {

    const [inputDetails, setInputDetails] = useState(
        {
        "studentId": "",
        "courseName": "",
        "courseType": "",
        "semester": "",
        "evaluationDate": "",
        "resultDate": "",
    }
    )

    const handleFieldChange = (e) => {

        setInputDetails({...inputDetails, [e.target.name]:e.target.value})
        // setInputs(prevState => [...prevState, prevState[id] = inputDetails])
        // console.log(" INSIDE EvaluationInputList")
        // console.log(id)
        // console.log(inputDetails)
        // console.log("________________")
        const updatedInputs = inputs; 
        // console.log(id)
        updatedInputs[id][e.target.name] = e.target.value; 
        setInputs(updatedInputs)
        console.log(inputs)

    }

        return (
            <div className="inputContainer">
            <TextField label="Student ID" name="studentId" onChange={handleFieldChange} / >
            <TextField label="Course Name" name="courseName" onChange={handleFieldChange}/ >
            <TextField label="Course Type" name="courseType" onChange={handleFieldChange}/ >
            <TextField label="Semester" name="semester" onChange={handleFieldChange}/ >
            <TextField label="Evaluation Date" name="evaluationDate"onChange={handleFieldChange}/ >
            <TextField label="Result" name="result" onChange={handleFieldChange} / >
            <TextField label="Result Date" name="resultDate" onChange={handleFieldChange}/ >
        </div>
        )
};

export default EvaluationInputsList;