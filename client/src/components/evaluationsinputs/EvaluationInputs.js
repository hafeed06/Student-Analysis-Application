import { TextField, Typography, Button } from '@mui/material'
import React, { useState, useEffect } from 'react'
import '../../index.css'
import AddIcon from '@mui/icons-material/Add';
import IosShareIcon from '@mui/icons-material/IosShare';
import EvaluationInputsList from './EvaluationInputsList';

const EvaluationInputs = () => {


    const [inputs, setInputs] = useState([        {
        "studentId": "",
        "courseName": "",
        "courseType": "",
        "semester": "",
        "evaluationDate": "",
        "resultDate": "",
    }]);


    const handleAddMore = () => {
        setInputs(prevState => [...prevState, {}])
    }

    ////////////////////// 
    useEffect(() => {
        console.log(inputs)
      }, [inputs]);

    //////////////////////////////

    return (
        <div>

            <div className='lineBreaker'></div>
            {
            inputs.map((e, k) => 
            <EvaluationInputsList key={k} id={k} inputs = {inputs} setInputs = {setInputs} />
            )}

            <div className="inputContainer">
                <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddMore}>Add More</Button>
                <Button variant="contained" startIcon={<IosShareIcon />} sx={{ background: "#0FA097" }}>Send Results</Button>
            </div>

        </div>
    )
}

export default EvaluationInputs
