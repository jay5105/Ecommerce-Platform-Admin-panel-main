import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, CircularProgress } from '@mui/material';

function Sellers() {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const token = localStorage.getItem('Token'); // Get the token from local storage
        if (!token) {
          setError('Authorization token not provided');
          setLoading(false);
          return;
        }

        const response = await axios.get('http://localhost:5000/Admin/AllSellers', {
          headers: {
            'auth': token // Include the token in the headers
          }
        });

        if (response.data.status === 'Success') {
          setSellers(response.data.data);
        } else {
          setError('Failed to fetch sellers: ' + response.data.message);
        }
      } catch (err) {
        console.error(err);
        setError('An error occurred while fetching sellers');
      } finally {
        setLoading(false);
      }
    };

    fetchSellers();
  }, []);

  const handleStatusChange = async (sellerId, newStatus) => {
    try {
      const token = localStorage.getItem('Token');
      const response = await axios.post(`http://localhost:5000/Admin/updateSellerStatus/${sellerId}`, { status: newStatus }, {
        headers: {
          'auth': token
        }
      });

      if (response.data.status === 'Success') {
        setSellers(sellers.map(seller => seller._id === sellerId ? { ...seller, status: newStatus } : seller));
      } else {
        setError('Failed to update seller status');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while updating seller status');
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
          Seller List
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Store Name</TableCell>
                <TableCell>Store Description</TableCell>
                <TableCell>GST Number</TableCell>
                <TableCell>Contact Number</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sellers.map((seller) => (
                <TableRow key={seller._id}>
                  <TableCell>{seller.name}</TableCell>
                  <TableCell>{seller.email}</TableCell>
                  <TableCell>{seller.storeName}</TableCell>
                  <TableCell>{seller.storeDescription}</TableCell>
                  <TableCell>{seller.gstNumber}</TableCell>
                  <TableCell>{seller.contactNumber}</TableCell>
                  <TableCell>{seller.status}</TableCell>
                  <TableCell>
                    <Select
                      value={seller.status}
                      onChange={(e) => handleStatusChange(seller._id, e.target.value)}
                    >
                      <MenuItem value="under process">Under Process</MenuItem>
                      <MenuItem value="approved">Approved</MenuItem>
                      <MenuItem value="deactivate">Deactivate</MenuItem>
                      <MenuItem value="rejected">Rejected</MenuItem>
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

export default Sellers;
