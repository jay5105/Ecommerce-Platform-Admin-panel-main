import React from 'react';
import { Button, Container, Typography, Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AdminLandingPage = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/register');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <Container
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: '24px',
      }}
    >
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} md={6}>
          <img
            src="https://i.pinimg.com/474x/58/ab/24/58ab24ea0d1715ff6dd699c581ab7387.jpg"
            alt="Admin working in office"
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '8px',
            }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            padding: '24px',
            backgroundColor: '#ffffff',
            borderRadius: '8px',
          }}
        >
          <Typography
            variant="h3"
            style={{
              marginBottom: '16px',
              fontWeight: 'bold',
              color: '#007bff',
              textAlign: 'left', // Align text to the left
            }}
          >
            Welcome to Admin Portal
          </Typography>
          <Typography
            variant="h6"
            style={{
              marginBottom: '16px',
              color: '#666666',
              textAlign: 'left', // Align text to the left
            }}
          >
            Manage your platform with ease or create new content.
          </Typography>
          <Typography
            variant="body1"
            style={{
              marginBottom: '24px',
              color: '#555555',
              lineHeight: '1.6',
              textAlign: 'left', // Align text to the left
            }}
          >
            Our platform provides powerful tools and insights tailored for administrators. Whether you're overseeing
            operations, managing users, or implementing new features, we offer a robust set of resources to support
            your role. Join us today to streamline your management processes and drive platform growth.
          </Typography>
          <Box
            style={{
              display: 'flex',
              gap: '16px',
            }}
          >
            
            <Button
              variant="contained"
              style={{
                backgroundColor: '#007bff',
                color: '#ffffff',
              }}
              onClick={handleLogin}
            >
              Login
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminLandingPage;
