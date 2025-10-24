import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowBack } from '@mui/icons-material';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
          gap: 3,
        }}
      >
        <Typography variant="h1" sx={{ fontSize: '8rem', color: '#9333ea' }}>
          404
        </Typography>
        
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
          Página no encontrada
        </Typography>
        
        <Typography variant="body1" sx={{ color: '#6b7280', mb: 4 }}>
          La página que buscas no existe.
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<Home />}
            onClick={() => navigate('/')}
            sx={{ bgcolor: '#9333ea' }}
          >
            Ir al inicio
          </Button>
          
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={() => navigate(-1)}
            sx={{ borderColor: '#9333ea', color: '#9333ea' }}
          >
            Volver
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default NotFound;