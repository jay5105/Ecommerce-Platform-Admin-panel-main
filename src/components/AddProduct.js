import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, Container, FormControl, InputLabel, Input, Typography, Paper } from '@mui/material';

function AddCategory() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('Token'); // Get the token from local storage

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:5000/Admin/addCategory', formData, {
        headers: {
          'auth': token, // Include the token in the headers
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.status === 'Success') {
        console.log(response);
        setSuccess('Category added successfully');
        setError(null);
        setName('');
        setDescription('');
        setImage(null);
      } else {
        setError('Failed to add category');
        setSuccess(null);
      }
    } catch (err) {
      setError('An error occurred while adding category');
      setSuccess(null);
    }
  };

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Paper elevation={3} sx={{ padding: 4, width: '100%', maxWidth: 600 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Add Category
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          {success && <Typography color="primary">{success}</Typography>}
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="description">Description</InputLabel>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                multiline
                rows={4}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="image">Image</InputLabel>
              <Input type="file" id="image" onChange={handleImageChange} />
            </FormControl>
            <Button variant="contained" color="primary" type="submit" fullWidth sx={{ marginTop: 2 }}>
              Add Category
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}

export default AddCategory;
