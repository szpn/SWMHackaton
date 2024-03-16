import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import { Box } from '@mui/material';

export default function DetailsCard(params: { name: string, description: string, address: string, link: string, phone: string, rate: number }) {
  const [value, setValue] = React.useState<number | null>(params.rate);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" height="80%">
      <Card sx={{ width: '60%', maxWidth: '80%', height: '80%', display: 'flex', flexDirection: 'row' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <CardMedia
            component="img"
            alt="green iguana"
            height="300"
            image="https://upload.wikimedia.org/wikipedia/commons/1/16/Donner_Kebab%2C_Cologne%2C_Germany_%281057919169%29.jpg"
          />
          <CardContent sx={{ flex: '1 0 auto', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography gutterBottom variant="h5" component="div">
                {params.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {params.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Telefon kontaktowy: {params.phone}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Adres: {params.address}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Strona internetowa: <a href={params.link} target="_blank" rel="noopener noreferrer">{params.link}</a>
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', mr: 2 }}>
              <Typography component="legend">Ocena</Typography>
              <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
            </Box>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
}
