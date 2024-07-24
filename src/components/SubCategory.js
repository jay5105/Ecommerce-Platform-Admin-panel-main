import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, MenuItem, Select, FormControl, InputLabel, CircularProgress } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function SubCategory() {
  const [subCategories, setSubCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [updatedSubCategory, setUpdatedSubCategory] = useState({ name: '', description: '', category: '' });

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const token = localStorage.getItem('Token'); // Get the token from local storage
        const [subCategoryResponse, categoryResponse] = await Promise.all([
          axios.get('http://localhost:5000/Admin/SubCategory', {
            headers: { 'auth': token } // Include the token in the headers
          }),
          axios.get('http://localhost:5000/Admin/Category', {
            headers: { 'auth': token } // Include the token in the headers
          })
        ]);

        if (subCategoryResponse.data.status === 'Success' && categoryResponse.data.status === 'Success') {
          setSubCategories(subCategoryResponse.data.subcategories);
          setCategories(categoryResponse.data.categories);
        } else {
          setError('Failed to fetch data');
        }
      } catch (err) {
        setError('An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchSubCategories();
  }, []);

  const handleUpdateClick = (subCategory) => {
    setSelectedSubCategory(subCategory);
    setUpdatedSubCategory({ 
      name: subCategory.name, 
      description: subCategory.description, 
      category: subCategory.category ? subCategory.category._id : '' 
    });
    setOpen(true);
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('Token');
      const response = await axios.put(`http://localhost:5000/Admin/updateSubcategory/${selectedSubCategory._id}`, updatedSubCategory, {
        headers: {
          'auth': token
        }
      });

      if (response.data.status === 'Success') {
        setSubCategories(subCategories.map(subCat => (subCat._id === selectedSubCategory._id ? { ...subCat, ...updatedSubCategory, category: categories.find(cat => cat._id === updatedSubCategory.category) } : subCat)));
        setOpen(false);
      } else {
        setError('Failed to update subcategory');
      }
    } catch (err) {
      setError('An error occurred while updating subcategory');
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('Token');
      const response = await axios.delete(`http://localhost:5000/Admin/deleteSubcategory/${id}`, {
        headers: {
          'auth': token
        }
      });

      if (response.data.status === 'Success') {
        setSubCategories(subCategories.filter(subCategory => subCategory._id !== id));
      } else {
        setError('Failed to delete subcategory');
      }
    } catch (err) {
      setError('An error occurred while deleting subcategory');
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedSubCategory(null);
    setUpdatedSubCategory({ name: '', description: '', category: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedSubCategory({ ...updatedSubCategory, [name]: value });
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
          Sub Categories
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Category Name</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subCategories.map((subCategory) => (
                <TableRow key={subCategory._id}>
                  <TableCell>
                    <img
                      src={`http://localhost:5000/images/${subCategory.image}`}
                      alt={subCategory.name}
                      height="50"
                    />
                  </TableCell>
                  <TableCell>{subCategory.name}</TableCell>
                  <TableCell>{subCategory.description}</TableCell>
                  <TableCell>{subCategory.category ? subCategory.category.name : 'N/A'}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleUpdateClick(subCategory)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(subCategory._id)}>
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
        <DialogTitle>Update SubCategory</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            value={updatedSubCategory.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            value={updatedSubCategory.description}
            onChange={handleChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              name="category"
              value={updatedSubCategory.category}
              onChange={handleChange}
              label="Category"
            >
              {categories.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default SubCategory;
