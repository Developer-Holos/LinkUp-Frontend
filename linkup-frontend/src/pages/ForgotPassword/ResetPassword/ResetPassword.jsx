import React, { useState } from 'react';
import { Box, Card, TextField, Button, Typography } from '@mui/material';
import { Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import logoImage from '../../../assets/images/logo.jpg';
import backgroundImage from '../../../assets/images/background.jpg';

const ResetPassword = ({ onSuccess }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    
    if (password.length < 8) {
      alert('La contraseña debe tener al menos 8 caracteres');
      return;
    }
    
    console.log('New password set:', password);
    // Simular cambio exitoso
    onSuccess();
  };

  return (
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
          {/* Logo Circular */}
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
              mb: 2,
              fontWeight: 400,
              color: '#4b5563',
              fontSize: '24px'
            }}
          >
            Nueva Contraseña
          </Typography>

          {/* Descripción */}
          <Typography
            variant="body2"
            sx={{
              textAlign: 'center',
              mb: 4,
              color: '#6b7280',
              fontSize: '14px',
              lineHeight: 1.5
            }}
          >
            Ingresa tu nueva contraseña. Debe tener al menos 8 caracteres.
          </Typography>

          {/* Formulario */}
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              placeholder="Nueva contraseña"
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                startAdornment: (
                  <Lock sx={{ color: '#9ca3af', mr: 1 }} />
                ),
                endAdornment: (
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
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
              placeholder="Confirmar contraseña"
              variant="outlined"
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              InputProps={{
                startAdornment: (
                  <Lock sx={{ color: '#9ca3af', mr: 1 }} />
                ),
                endAdornment: (
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#ffffff',
                  '& fieldset': {
                    borderColor: password && confirmPassword && password !== confirmPassword ? '#ef4444' : '#d1d5db',
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

            {password && confirmPassword && password !== confirmPassword && (
              <Typography
                variant="body2"
                sx={{
                  color: '#ef4444',
                  fontSize: '12px',
                  mb: 2,
                  textAlign: 'center'
                }}
              >
                Las contraseñas no coinciden
              </Typography>
            )}

            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={!password || !confirmPassword || password !== confirmPassword || password.length < 8}
              sx={{
                bgcolor: '#06b6d4',
                color: '#ffffff',
                py: 1.8,
                fontSize: '15px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                borderRadius: 1,
                boxShadow: 'none',
                '&:hover': {
                  bgcolor: '#0891b2',
                  boxShadow: '0 4px 12px rgba(6, 182, 212, 0.3)',
                },
                '&:disabled': {
                  bgcolor: '#d1d5db',
                  color: '#9ca3af',
                }
              }}
            >
              Cambiar Contraseña
            </Button>
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

export default ResetPassword;