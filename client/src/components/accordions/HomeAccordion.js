import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function HomeAccordion({data}) {
  return (
    <div>
      <Accordion disableGutters>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Student Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {
            Object.entries(data).map(([key, value]) => (
              <div className="inputContainer" key={`div ${key}`}>
              <Typography component="span" key={`key ${key}`} variant="body2" color="primary">{key.toUpperCase()}</Typography>
              <Typography component="span" key={`value ${key}`} variant="body2">{value}</Typography>
              </div>
            )

            )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
