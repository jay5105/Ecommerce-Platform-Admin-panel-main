import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState({});
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('Token');
        
        if (!token) {
          setError('Authorization token not provided');
          setLoading(false);
          return;
        }

        const response = await axios.get('http://localhost:5000/Admin/AllOrders', {
          headers: {
            'auth': token
          }
        });

        if (response.data.status === 'Success') {
          setOrders(response.data.data);
        } else {
          setError('Failed to fetch orders: ' + response.data.message);
        }
      } catch (err) {
        console.error(err);
        setError('An error occurred while fetching orders');
      }
    };

    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('Token');
        const response = await axios.get('http://localhost:5000/Admin/AllUsers', {
          headers: {
            'auth': token
          }
        });

        if (response.data.status === 'Success') {
          const userMap = {};
          response.data.data.forEach(user => {
            userMap[user._id] = user;
          });
          setUsers(userMap);
        } else {
          setError('Failed to fetch users: ' + response.data.message);
        }
      } catch (err) {
        console.error(err);
        setError('An error occurred while fetching users');
      }
    };

    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('Token');
        const response = await axios.get('http://localhost:5000/Admin/AllProduct', {
          headers: {
            'auth': token
          }
        });

        if (response.data.status === 'Success') {
          const productMap = {};
          response.data.data.forEach(product => {
            productMap[product._id] = product;
          });
          setProducts(productMap);
        } else {
          setError('Failed to fetch products: ' + response.data.message);
        }
      } catch (err) {
        console.error(err);
        setError('An error occurred while fetching products');
      }
    };

    const fetchData = async () => {
      await fetchUsers();
      await fetchProducts();
      await fetchOrders();
      setLoading(false);
    };

    fetchData();
  }, []);

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
          Order List
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Address</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>
                    {products[order.productId] ? (
                      <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                        <img
                          src={`http://localhost:5000/images/${products[order.productId].image[0]}`}
                          alt={products[order.productId].name}
                          height="50"
                          style={{ marginRight: '5px' }}
                        />
                        <div>{products[order.productId].name}</div>
                      </div>
                    ) : (
                      'Unknown Product'
                    )}
                  </TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>
                    {users[order.userId] ? users[order.userId].name : 'Unknown User'}
                  </TableCell>
                  <TableCell>
                    {users[order.userId] && users[order.userId].addresses ? (
                      users[order.userId].addresses.map((address, index) => (
                        <div key={index}>
                          {address.street}, {address.city}, {address.state}, {address.pinCode}, {address.country}
                        </div>
                      ))
                    ) : (
                      'No Address'
                    )}
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

export default OrderList;
