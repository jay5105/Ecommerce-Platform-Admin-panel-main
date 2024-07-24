import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, CircularProgress } from '@mui/material';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('Token');
        const response = await axios.get('http://localhost:5000/Admin/Category', {
          headers: {
            'auth': token
          }
        });

        if (response.data.status !== 'Success') {
          setError('Failed to fetch categories: ' + response.data.message);
        }
      } catch (err) {
        console.error(err);
        setError('An error occurred while fetching categories');
      }
    };

    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('Token');
        if (!token) {
          setError('Authorization token not provided');
          setLoading(false);
          return;
        }

        const response = await axios.get('http://localhost:5000/Admin/AllProduct', {
          headers: {
            'auth': token
          }
        });

        if (response.data.status === 'Success') {
          setProducts(response.data.data);
        } else {
          setError('Failed to fetch products: ' + response.data.message);
        }
      } catch (err) {
        console.error(err);
        setError('An error occurred while fetching products');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
    fetchProducts();
  }, []);

  const handleStatusChange = async (productId, newStatus) => {
    try {
      const token = localStorage.getItem('Token');
      const response = await axios.patch(`http://localhost:5000/Admin/ChangeProduct/${productId}`, { status: newStatus }, {
        headers: {
          'auth': token
        }
      });

      if (response.data.status === 'Success') {
        setProducts(products.map(product => product._id === productId ? { ...product, status: newStatus } : product));
      } else {
        setError('Failed to update product status');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while updating product status');
    }
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
          Product List
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>
                    <img
                      src={`http://localhost:5000/images/${product.image[0]}`}
                      alt={product.name}
                      height="50"
                    />
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>
                    {product.description.length > 100 ? `${product.description.substring(0, 100)}...` : product.description}
                  </TableCell>
                  <TableCell>{product.status}</TableCell>
                  <TableCell>
                    <Select
                      value={product.status}
                      onChange={(e) => handleStatusChange(product._id, e.target.value)}
                    >
                      <MenuItem value="under review">Under Review</MenuItem>
                      <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="deactivate">Deactivate</MenuItem>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}

export default ProductList;
