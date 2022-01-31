import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import '../index.css'

const CSVInput = () => {

    const [file, setFile] = useState(null)

    const onFileChange = e => setFile(e.target.files[0])
    const onFileUpload = () => {
        console.log(file)
    }

    return (<div>

        <div className='lineBreaker'></div>


        <label htmlFor="upload-file">
            <input
                style={{ display: 'none' }}
                id="upload-file"
                name="upload-file"
                type="file"
                onChange={onFileChange} 
            />

            <Button variant="contained" component="span" onClick={onFileUpload} color="success" startIcon={<UploadFileIcon /> }>
                Choose and Upload File
            </Button>
        </label>
        <br />
        <br />
        {!file ? <Typography variant="body2">Uploaded File : None</Typography>
            : <Typography variant="body2">Uploaded File: {file.name}</Typography>
        }
    </div>
    )
};

export default CSVInput;
