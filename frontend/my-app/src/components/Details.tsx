import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { AttractionDetailsType } from '../types/AttractionDetailsType';


export default function DetailsCard(params: {id? : string}) {
  const [value, setValue] = useState<number | null>();
  const url = `http://192.168.123.92:5000/place/${params.id}/`;
  const [data, setData] = useState<AttractionDetailsType | null>(null);
  const [name, setName] = useState<string | null>('');
  const [long_description, setLongDescription] = useState<string | null>('')
  const [address, setAddress] = useState<string | null>('')
  const [contact_link, setContactLink] = useState<string>('')
  const [contact_phone, setContactPhone] = useState<string>('')
  const [rated, setRated] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
        setName(data['name'])
        setLongDescription(data['long_description'])
        setAddress(data['address'])
        setContactLink(data['contact_link'])
        setContactPhone(data['contact_phone'])
        setValue(data['average_rating'])
        console.log(data)
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData(); 
  }, [url]); 
    return <>
      {data && value !== null && (
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
                    {name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {long_description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Telefon kontaktowy: {contact_phone}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Adres: {address}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Strona internetowa: <a href={contact_link} target="_blank" rel="noopener noreferrer">{contact_link}</a>
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', mr: 2 }}>
                  <Typography component="legend">Ocena</Typography>
                  <Rating
                    precision={0.1}
                    name="simple-controlled"
                    value={value}
                    disabled = {rated}
                    onChange={(event, newValue) => {
                      const requestOptions = {
                        method: 'POST',
                        headers: {'Content-Type' : 'application/json'},
                        body: JSON.stringify({"place_id" : params.id, "rating" : newValue})
                      };
                      fetch('http://192.168.123.92:5000/add_rating/', requestOptions)
                      .then(response => response.json())
                      .then(data => {
                        setValue(data['avg_rating'])
                        setRated(true)
                      })
                      .catch(err => console.log(err))
                    }}
                  />
                </Box>
              </CardContent>
            </Box>
          </Card>
        </Box>
      )}
    </>;
  }