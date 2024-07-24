import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Box, CircularProgress } from '@mui/material';

const AuthWrapper = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('Token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/Admin/validateTokenAdmin', {
          headers: { 'auth': token } 
        });

        console.log('Token Validation Response:', response.data);

        if (response.data.status !== 'Success') {
          navigate('/login');
        } else {
          setLoading(false);
          if (location.pathname === '/login') {
            navigate('/admin'); // Redirect to '/admin' upon successful authentication
          }
        }
      } catch (error) {
        console.error('Token Validation Error:', error);
        navigate('/login');
      }
    };

    checkAuth();
  }, [navigate, location.pathname]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="40vh">
        <CircularProgress />
      </Box>
    );
  }

  return <>{children}</>;
};

export default AuthWrapper;
