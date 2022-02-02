import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import '../../index.css'
import HomeAccordion from '../accordions/HomeAccordion';
import blueGradient from '../../styles/blueGradient';
import capitalize from '../../utils/capitalize';

export default function HomeUserCard({image, data}) {

    const backgroundStyle = `/* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#499bea+0,207ce5+100;Blue+3d+%237 */
    background: #499bea; /* Old browsers */
    background: -moz-linear-gradient(top,  #499bea 0%, #207ce5 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(top,  #499bea 0%,#207ce5 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to bottom,  #499bea 0%,#207ce5 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#499bea', endColorstr='#207ce5',GradientType=0 ); /* IE6-9 */
    `    

  return (
    <Card sx={{ maxWidth: 345, background:blueGradient, border:'dashed solid 1px'}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="300"
          image={image}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" color="white">
           <SchoolIcon size="large"/> {capitalize(data.username)}
          </Typography>
          <HomeAccordion data = {data} /> 
        </CardContent>
      </CardActionArea>
    </Card>
  );
}