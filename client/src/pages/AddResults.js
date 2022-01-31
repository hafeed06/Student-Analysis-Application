import React, { useState, useEffect } from 'react';
import CSVReader from 'react-csv-reader'
import { useFormControl } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Button, Typography, Paper } from '@mui/material';
import EvaluationInputs from '../components/evaluationsinputs/EvaluationInputs';
import CSVInput from '../components/CSVInput';

const AddResults = () => {

    const [file, setFile] = useState(null)
    const [method, setMethod] = useState(null)

    const formData = new FormData();
    const onFileChange = e => setFile(e.target.files[0])
    const onFileUpload = () => {
        console.log(file)
    }

    // Refs 

    const [manualVariant, setManualVariant] = useState("outlined")
    const [csvVariant, setCsvVariant] = useState("outlined")

    const handleMethod = e => {
        setMethod(e.target.name)
        if(e.target.name === "csv") {
            setCsvVariant("contained")
            setManualVariant("outlined")
        }
        else if(e.target.name === "manual") {
            setCsvVariant("outlined")
            setManualVariant("contained")
        }
    }

    useEffect(() => {
        console.log(method)
    }, [method]);



    return (
        <div>
            {/* <CSVReader onFileLoaded={(data, fileInfo, originalFile) => console.dir(data, fileInfo, originalFile)} /> */}


            <Box sx={{ flexGrow: 1 }} mt={10} >
                <Grid container spacing={2}>
                    <Grid item xs={11} sm={11} md={11} ml="auto" mr="auto">

                        <Paper sx={{ paddingTop: 2, paddingLeft: 2, paddingRight: 2, paddingBottom: 3, justifyContent: 'center', textAlign: 'center' }}>

                            <Typography variant="h4" color="primary" pb={2}> <strong>Add Student Results</strong></Typography>
                            <Button
                                name="manual"
                                variant={manualVariant}
                                style={{ marginRight: '5px' }}
                                onClick={handleMethod}>Add Manually</Button>

                            <Button name="csv" variant={csvVariant} onClick={handleMethod}>Import CSV File</Button>
                            <br />
                            {/* Here the input methods */}

                            {method && method === 'csv' && (<CSVInput />)}
                            {method && method === 'manual' && (<EvaluationInputs />)}
                        


                        </Paper>
                    </Grid>
                </Grid>
            </Box>




        </div>
    )
};

export default AddResults
