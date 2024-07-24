import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, CircularProgress } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function Category() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatedCategory, setUpdatedCategory] = useState({ name: '', description: '' });

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
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleUpdateClick = (category) => {
    setSelectedCategory(category);
    setUpdatedCategory({ name: category.name, description: category.description });
    setOpen(true);
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('Token');
      const response = await axios.patch(`http://localhost:5000/Admin/UpdateCategory/${selectedCategory._id}`, updatedCategory, {
        headers: {
          'auth': token
        }
      });

      if (response.data.status === 'Success') {
        setCategories(categories.map(cat => (cat._id === selectedCategory._id ? { ...cat, ...updatedCategory } : cat)));
        setOpen(false);
      } else {
        setError('Failed to update category');
      }
    } catch (err) {
      setError('An error occurred while updating category');
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('Token');
      const response = await axios.delete(`http://localhost:5000/Admin/DeleteCategory/${id}`, {
        headers: {
          'auth': token
        }
      });

      if (response.data.status === 'Success') {
        setCategories(categories.filter(category => category._id !== id));
      } else {
        setError('Failed to delete category');
      }
    } catch (err) {
      setError('An error occurred while deleting category');
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCategory(null);
    setUpdatedCategory({ name: '', description: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCategory({ ...updatedCategory, [name]: value });
  };

  if (loading) {
    return (
      <Box>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography>{error}</Typography>;
  }

  return (
    <Container>
      <Box>
        <Typography variant="h4" component="h1" gutterBottom>
          Categories
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category._id}>
                  <TableCell>
                    <img
                      src={`http://localhost:5000/images/${category.image}`}
                      alt={category.name}
                      height="50"
                    />
                  </TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>{category.description}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleUpdateClick(category)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(category._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Category</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            value={updatedCategory.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            value={updatedCategory.description}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Category;
