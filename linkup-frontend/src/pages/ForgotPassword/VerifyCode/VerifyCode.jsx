import React, { useState } from 'react';
import { Box, Card, TextField, Button, Typography, Link } from '@mui/material';
import { ArrowBack, LockReset } from '@mui/icons-material';
import logoImage from '../../../assets/images/logo.jpg';
import backgroundImage from '../../../assets/images/background.jpg';


const VerifyCode = ({ email, onNext, onBack }) => {
  const [code, setCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Verify code:', code);
    // Simular verificación y pasar al siguiente paso
    if (code.length >= 6) {
      onNext();
    }
  };

  const handleResendCode = () => {
    console.log('Resend code to:', email);
    // Simular reenvío de código
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

          {/* Botón Volver */}
          <Button
            startIcon={<ArrowBack />}
            onClick={onBack}
            sx={{
              position: 'absolute',
              top: 16,
              left: 16,
              color: '#6b7280',
              fontSize: '14px',
              textTransform: 'none',
              '&:hover': {
                bgcolor: 'rgba(0,0,0,0.04)'
              }
            }}
          >
            Volver
          </Button>

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
            Verificar Código
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
            Hemos enviado un código de verificación a <strong>{email}</strong>. 
            Ingresa el código para continuar.
          </Typography>

          {/* Formulario */}
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              placeholder="Código de verificación"
              variant="outlined"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              inputProps={{
                maxLength: 6,
                style: { textAlign: 'center', fontSize: '20px' }
              }}
              InputProps={{
                startAdornment: (
                  <LockReset sx={{ color: '#9ca3af', mr: 1 }} />
                ),
              }}
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
              disabled={code.length < 6}
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
                },
                '&:disabled': {
                  bgcolor: '#d1d5db',
                  color: '#9ca3af',
                }
              }}
            >
              Verificar Código
            </Button>

            <Box sx={{ textAlign: 'center' }}>
              <Link
                onClick={handleResendCode}
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
                ¿No recibiste el código? Reenviar
              </Link>
            </Box>
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

export default VerifyCode;