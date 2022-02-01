import React, { useState } from 'react';
import { Button, Typography, Alert } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import '../index.css'

const CSVInput = () => {

    const [file, setFile] = useState(null)

    const onFileChange = e => {
        setFile(e.target.files[0])
        setMessage(e.target.files[0].name + " was uploaded successfully!")
        handleClick()
    }
    const onFileUpload = () => {
        console.log(file)

    }
    /// SnackBar Stuff ///
    /////////////////////
    /////////////////////
    const [message, setMessage] = useState(null)
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
      setOpen(true);
    };
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
    const action = (
        <React.Fragment>
          <Button color="secondary" size="small" onClick={handleClose}>
            UNDO
          </Button>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      );
    ///////////////////
    //////////////////
    //////////////////

    return (
    <div>

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

<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%', border: 'solid 1px #10540B' }}>
          {message}
        </Alert>
      </Snackbar>

    </div>
    )
};

export default CSVInput;
