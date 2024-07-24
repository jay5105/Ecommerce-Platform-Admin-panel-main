import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Container, FormControl, InputLabel, Input, Typography, Paper, Select, MenuItem } from '@mui/material';

function AddSCategory() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('Token'); // Get the token from local storage
        const response = await axios.get('http://localhost:5000/Admin/Category', {
          headers: {
            'auth': token // Include the token in the headers
          }
        });

        if (response.data.status === 'Success') {
          setCategories(response.data.categories);
        } else {
          setError('Failed to fetch categories');
        }
      } catch (err) {
        setError('An error occurred while fetching categories');
      }
    };

    fetchCategories();
  }, []);

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
    formData.append('category', category);

    try {
      const response = await axios.post('http://localhost:5000/Admin/addSubcategory', formData, {
        headers: {
          'auth': token, // Include the token in the headers
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.status === 'Success') {
        console.log(response);
        setSuccess('Subcategory added successfully');
        setError(null);
        setName('');
        setDescription('');
        setImage(null);
        setCategory('');
      } else {
        setError('Failed to add subcategory');
        setSuccess(null);
      }
    } catch (err) {
      setError('An error occurred while adding subcategory');
      setSuccess(null);
    }
  };

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Paper elevation={3} sx={{ padding: 4, width: '100%', maxWidth: 600 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Add Subcategory
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
              <InputLabel htmlFor="category">Category</InputLabel>
              <Select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat._id} value={cat._id}>{cat.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="image">Image</InputLabel>
              <Input type="file" id="image" onChange={handleImageChange} />
            </FormControl>
            <Button variant="contained" color="primary" type="submit" fullWidth sx={{ marginTop: 2 }}>
              Add Subcategory
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}

export default AddSCategory;
