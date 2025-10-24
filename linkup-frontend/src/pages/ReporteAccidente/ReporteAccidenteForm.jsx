import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Alert,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
  styled
} from '@mui/material';
import { CloudUpload, Warning } from '@mui/icons-material';
import backgroundImage from '../../assets/images/background.jpg';
import logoImage from '../../assets/images/logo.png';
import './ReporteAccidente.css';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
}));

const BackgroundContainer = styled(Box)({
  minHeight: '100vh',
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  display: 'flex',
  alignItems: 'center',
  padding: '20px 0',
});

const LogoContainer = styled(Box)({
  position: 'absolute',
  bottom: '30px',
  left: '30px',
  zIndex: 10,
});

const Logo = styled('img')({
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  backgroundColor: 'white',
  padding: '10px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1)',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
  }
});

const StyledButton = styled(Button)({
  background: 'linear-gradient(45deg, #8B5CF6, #A855F7)',
  color: 'white',
  padding: '12px 40px',
  borderRadius: '25px',
  textTransform: 'none',
  fontSize: '16px',
  fontWeight: 600,
  '&:hover': {
    background: 'linear-gradient(45deg, #7C3AED, #9333EA)',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 20px rgba(139, 92, 246, 0.3)',
  },
  transition: 'all 0.3s ease',
});

const UploadBox = styled(Box)(({ theme }) => ({
  border: '2px dashed #A855F7',
  borderRadius: '12px',
  padding: theme.spacing(3),
  textAlign: 'center',
  backgroundColor: 'rgba(168, 85, 247, 0.05)',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(168, 85, 247, 0.1)',
    borderColor: '#8B5CF6',
  },
}));

const ReporteAccidenteForm = () => {
  const [formData, setFormData] = useState({
    nombreCompleto: '',
    telefono: '',
    tienePasajeros: '',
    fechaAccidente: '',
    lugarAccidente: '',
    nombreReferencia: '',
    deParte: '',
    informacionAdicional: '',
    fotoReporte: null
  });

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setFormData({
      ...formData,
      fotoReporte: file
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Formulario de reporte de accidente enviado:', formData);
    // Aquí puedes agregar la lógica para enviar el formulario
  };

  return (
    <BackgroundContainer>
      <Container maxWidth="md">
        <StyledPaper elevation={0} className="form-container glass-container">
          <Box sx={{ mb: 4 }}>
            <Typography 
              variant="h3" 
              className="form-title"
              sx={{ 
                fontWeight: 'bold',
                color: '#1F2937',
                mb: 2,
                lineHeight: 1.2
              }}
            >
              ¿TUVISTE UN ACCIDENTE O CONOCES A ALGUIEN QUE LO TUVO?
            </Typography>
            
            <Typography 
              variant="body1" 
              sx={{ 
                color: '#4B5563',
                mb: 2,
                fontSize: '16px'
              }}
            >
              Este es el formulario oficial para reportar un accidente y recibir asistencia inmediata.
            </Typography>

            <Alert 
              severity="warning" 
              sx={{ 
                mb: 3, 
                '& .MuiAlert-message': { 
                  fontSize: '14px' 
                }
              }}
            >
              ⚠️ Es obligatorio completar todos los campos para que nuestro equipo de intake pueda 
              comunicarse de inmediato con la persona afectada y brindarle la ayuda que necesita.
            </Alert>

            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ color: '#EF4444', fontWeight: 600, mb: 1 }}>
                ✓ IMPORTANTE:
              </Typography>
              <Typography variant="body2" sx={{ color: '#4B5563', mb: 1 }}>
                ✓ La información proporcionada será tratada con total confidencialidad.
              </Typography>
              <Typography variant="body2" sx={{ color: '#4B5563', mb: 1 }}>
                ✓ Completar este formulario no tiene costo ni compromiso.
              </Typography>
              <Typography variant="body2" sx={{ color: '#4B5563', mb: 2 }}>
                ✓ Un especialista se pondrá en contacto de inmediato.
              </Typography>
              <Typography variant="body2" sx={{ color: '#4B5563', fontStyle: 'italic' }}>
                Haz clic en "Empezar" para continuar.
              </Typography>
            </Box>
          </Box>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Nombre completo */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nombre completo de la persona que sufrió el accidente"
                  value={formData.nombreCompleto}
                  onChange={handleChange('nombreCompleto')}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                    }
                  }}
                />
              </Grid>

              {/* Teléfono */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Teléfono de contacto del accidentado"
                  value={formData.telefono}
                  onChange={handleChange('telefono')}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                    }
                  }}
                />
              </Grid>

              {/* ¿Tiene pasajeros? y Fecha del accidente */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="¿Tiene pasajeros?"
                  value={formData.tienePasajeros}
                  onChange={handleChange('tienePasajeros')}
                  placeholder="Sí/No"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                    }
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Indica la fecha del accidente"
                  type="date"
                  value={formData.fechaAccidente}
                  onChange={handleChange('fechaAccidente')}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                    }
                  }}
                />
              </Grid>

              {/* Lugar del accidente */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Indica el lugar del accidente"
                  value={formData.lugarAccidente}
                  onChange={handleChange('lugarAccidente')}
                  multiline
                  rows={2}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                    }
                  }}
                />
              </Grid>

              {/* Nombre de referencia */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nombre de la persona que lo refiere"
                  value={formData.nombreReferencia}
                  onChange={handleChange('nombreReferencia')}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                    }
                  }}
                />
              </Grid>

              {/* De parte de quien llamamos */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="De parte de quien llamamos"
                  value={formData.deParte}
                  onChange={handleChange('deParte')}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                    }
                  }}
                />
              </Grid>

              {/* Información adicional */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Comparte aquí información relevante / hora recomendada para contactar al accidentado (opcional)"
                  value={formData.informacionAdicional}
                  onChange={handleChange('informacionAdicional')}
                  multiline
                  rows={4}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                    }
                  }}
                />
              </Grid>

              {/* Upload de foto */}
              <Grid item xs={12}>
                <Typography variant="body2" sx={{ mb: 2, color: '#6B7280' }}>
                  Foto del reporte policial y del ID del caso <em>(opcional)</em>
                </Typography>
                
                <input
                  accept="image/*,.svg,.png,.jpg,.jpeg,.gif"
                  style={{ display: 'none' }}
                  id="foto-upload"
                  type="file"
                  onChange={handleFileUpload}
                />
                <label htmlFor="foto-upload">
                  <UploadBox className="upload-area upload-hover">
                    <CloudUpload sx={{ fontSize: 48, color: '#A855F7', mb: 2 }} />
                    <Typography variant="body1" sx={{ color: '#8B5CF6', fontWeight: 600, mb: 1 }}>
                      {formData.fotoReporte ? formData.fotoReporte.name : 'Link'}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#6B7280' }}>
                      or drag and drop
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#9CA3AF', mt: 1, display: 'block' }}>
                      SVG, PNG, JPG or GIF (max. 3MB)
                    </Typography>
                  </UploadBox>
                </label>
              </Grid>

              {/* Botón de envío */}
              <Grid item xs={12} sx={{ textAlign: 'center', mt: 2 }}>
                <StyledButton
                  type="submit"
                  size="large"
                >
                  ENVIAR
                </StyledButton>
              </Grid>
            </Grid>
          </form>
        </StyledPaper>
      </Container>

      {/* Logo en la esquina inferior izquierda */}
      <LogoContainer>
        <Logo src={logoImage} alt="LinkUp Logo" />
      </LogoContainer>
    </BackgroundContainer>
  );
};

export default ReporteAccidenteForm;