import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function AddPlaceForm() {
  const [open, setOpen] = React.useState(false);
  const [address, setAddress] = React.useState("");
  const [type, setType] = React.useState("");


  const [products, setProducts] = useState([]);
    useEffect(() => {
        handleGetProducts();
    }, []);

    const handleGetProducts = async () => {
      try {
          const response = await fetch('http://192.168.123.92:5000/type/');
          const data = await response.json();
          setProducts(data);
      } catch (error) {
          console.error('Error fetching products:', error);
      }
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value);
  };

  const url = "http://192.168.123.92:5000/type/";


  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add place
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const requestOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(formJson)
          };
          fetch('http://192.168.123.92:5000/add_place/', requestOptions)
          .then(response => response.json())
          .then(data => console.log(data))
          .catch(err => console.log(err))
            // handleClose();
          },
        }}
      >
        <DialogTitle>Add new place form
        <DialogContentText style={{minWidth: '500px'}}>
            Give some information about place.
        </DialogContentText>
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Place Name"
            type="Name"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            
            margin="dense"
            id="name"
            name="address"
            label="Address"
            type="Name"
            fullWidth
            variant="standard"
          />
      <FormControl sx={{ m: 1, minWidth: 200,display: 'flex',justifyContent: 'center' }}>
        <InputLabel id="demo-simple-select-autowidth-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={type}
          name="type_id"
          onChange={handleChange}
          autoWidth
          label="Age"
          required
        >
          {products.map((product) => (
                    <MenuItem value={product['id']}>{product['name']}</MenuItem>
                ))}
        </Select>
      </FormControl>
          <TextField
            required
            margin="dense"
            id="description"
            name="description_short"
            label="Short description"
            type="Description"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="description"
            name="description_long"
            label="Long description"
            type="Description"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="phone"
            name="contact_phone"
            label="Phone number"
            type="phone"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id=""
            name="contact_link"
            label="Website"
            type="link"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="name"
            name="location_lat"
            label="X-coords"
            type="X-cord"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="name"
            name="location_lon"
            label="Y-coords"
            type="Y_cord"
            fullWidth
            variant="standard"
          />
      </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Subscribe</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}