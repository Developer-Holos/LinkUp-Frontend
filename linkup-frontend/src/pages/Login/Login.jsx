import React, { useState } from 'react';
import { Box, Card, TextField, Button, Typography, Link } from '@mui/material';
import logoImage from '../../assets/images/logo.jpg';
import backgroundImage from '../../assets/images/background.jpg';
import ForgotPasswordFlow from '../ForgotPassword/ForgotPasswordFlow';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login:', { email, password });
  };

  const handleForgotPasswordClick = () => {
    setShowForgotPassword(true);
  };

  const handleBackToLogin = () => {
    setShowForgotPassword(false);
  };

  if (showForgotPassword) {
    return (
      <ForgotPasswordFlow 
        onBackToLogin={handleBackToLogin}
        onPasswordResetSuccess={() => {
          // Opcional: limpiar el formulario
          setEmail('');
          setPassword('');
        }}
      />
    );
  }

  return (
    // ...existing code...
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        overflow: 'visible',
        py: 12,
        px: 2,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          pointerEvents: 'none',
        }
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: 500,
          pt: 8,
        }}
      >
        <Card
          sx={{
            width: '100%',
            px: 5,
            pt: 8,
            pb: 5,
            borderRadius: 4,
            boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
            position: 'relative',
            bgcolor: '#ffffff',
            zIndex: 1,
            overflow: 'visible'
          }}
        >
          {/* Logo Circular con Imagen */}
          <Box
            sx={{
              position: 'absolute',
              top: -50,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 100,
              height: 100,
              borderRadius: '50%',
              bgcolor: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              border: '4px solid #f3f4f6',
              overflow: 'hidden',
              zIndex: 2
            }}
          >
            <img 
              src={logoImage} 
              alt="Link Up Logo" 
              style={{
                width: '80%',
                height: '80%',
                objectFit: 'contain'
              }}
            />
          </Box>

          {/* Título */}
          <Typography
            variant="h5"
            sx={{
              textAlign: 'center',
              mb: 4,
              fontWeight: 400,
              color: '#4b5563',
              fontSize: '24px'
            }}
          >
            Inicio de Sesión
          </Typography>

          {/* Formulario */}
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              placeholder="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                mb: 2.5,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#ffffff',
                  '& fieldset': {
                    borderColor: '#d1d5db',
                    borderWidth: '1px',
                  },
                  '&:hover fieldset': {
                    borderColor: '#9ca3af',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#06b6d4',
                    borderWidth: '2px',
                  },
                },
                '& .MuiOutlinedInput-input': {
                  padding: '14px 16px',
                  fontSize: '15px',
                  color: '#374151',
                  '&::placeholder': {
                    color: '#9ca3af',
                    opacity: 1,
                  }
                }
              }}
            />

            <TextField
              fullWidth
              type="password"
              placeholder="Password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#ffffff',
                  '& fieldset': {
                    borderColor: '#d1d5db',
                    borderWidth: '1px',
                  },
                  '&:hover fieldset': {
                    borderColor: '#9ca3af',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#06b6d4',
                    borderWidth: '2px',
                  },
                },
                '& .MuiOutlinedInput-input': {
                  padding: '14px 16px',
                  fontSize: '15px',
                  color: '#374151',
                  '&::placeholder': {
                    color: '#9ca3af',
                    opacity: 1,
                  }
                }
              }}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                bgcolor: '#06b6d4',
                color: '#ffffff',
                py: 1.8,
                fontSize: '15px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                borderRadius: 1,
                mb: 2,
                boxShadow: 'none',
                '&:hover': {
                  bgcolor: '#0891b2',
                  boxShadow: '0 4px 12px rgba(6, 182, 212, 0.3)',
                }
              }}
            >
              Ingresar
            </Button>

            <Box sx={{ textAlign: 'center' }}>
              <Link
                onClick={handleForgotPasswordClick}
                underline="hover"
                sx={{
                  color: '#9333ea',
                  fontSize: '14px',
                  fontWeight: 400,
                  cursor: 'pointer',
                  '&:hover': {
                    color: '#7e22ce'
                  }
                }}
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </Box>
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

export default Login;