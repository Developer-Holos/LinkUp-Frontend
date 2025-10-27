import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  styled
} from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import backgroundImage from '../../assets/images/background.jpg';
import logoImage from '../../assets/images/logo.png';
import './ReporteAccidente.css';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: 'rgba(255, 255, 255, 0.98)',
  backdropFilter: 'blur(8px)',
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  border: '1px solid rgba(0, 0, 0, 0.05)'
}));

const BackgroundContainer = styled(Box)({
  minHeight: '100vh',
  height: '100vh',
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 1,
  },
  '& > *': {
    position: 'relative',
    zIndex: 2,
  },
});

const CardContainer = styled(Paper)(({ theme }) => ({
  width: '100%',
  maxWidth: '1200px',
  minHeight: '80vh',
  maxHeight: '90vh',
  padding: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.98)',
  backdropFilter: 'blur(12px)',
  borderRadius: '20px',
  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.15)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  display: 'flex',
  overflow: 'hidden',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    maxHeight: '95vh',
    minHeight: '85vh',
  },
}));

const LeftColumn = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'showForm',
})(({ showForm, theme }) => ({
  flex: showForm ? '0 0 400px' : '1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  backgroundColor: 'rgba(139, 92, 246, 0.05)',
  borderRadius: '12px',
  border: '1px solid rgba(139, 92, 246, 0.1)',
  padding: theme.spacing(3),
  minHeight: '70vh',
  margin: theme.spacing(2),
  transition: 'all 0.6s ease',
}));

const RightColumn = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'showForm',
})(({ showForm, theme }) => ({
  flex: showForm ? '1' : '0',
  width: showForm ? 'auto' : '0',
  opacity: showForm ? 1 : 0,
  display: 'flex',
  flexDirection: 'column',
  padding: showForm ? theme.spacing(4) : 0,
  backgroundColor: 'white',
  overflow: 'auto',
  transition: 'all 0.6s ease',
  transform: showForm ? 'translateX(0)' : 'translateX(20px)',
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: '#f1f1f1',
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#c1c1c1',
    borderRadius: '4px',
    '&:hover': {
      background: '#a8a8a8',
    },
  },
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  bottom: '20px',
  left: '20px',
  zIndex: 1000,
  [theme.breakpoints.down('sm')]: {
    bottom: '10px',
    left: '10px',
  },
}));

const Logo = styled('img')(({ theme }) => ({
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
  },
  [theme.breakpoints.down('sm')]: {
    width: '60px',
    height: '60px',
    padding: '8px',
  },
}));

const ReporteAccidenteForm = () => {
  const [showForm, setShowForm] = useState(false);
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

  const handleStartForm = () => {
    setShowForm(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Formulario de reporte de accidente enviado:', formData);
    // Aquí puedes agregar la lógica para enviar el formulario
  };

  return (
    <BackgroundContainer>
      <CardContainer>
          {/* Columna izquierda - Información fija */}
          <LeftColumn showForm={showForm}>
            <Box sx={{ 
              textAlign: showForm ? 'left' : 'center',
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              position: 'relative',
              zIndex: 1,
              transition: 'all 0.5s ease'
            }}>
            <Typography 
              variant="h3" 
              sx={{ 
                fontFamily: 'Bebas Neue, cursive',
                fontSize: showForm ? { xs: '1.5rem', sm: '1.8rem', md: '2rem' } : { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
                fontWeight: 'bold',
                color: '#1a1a1a',
                mb: showForm ? 2 : 4,
                lineHeight: 1.1,
                letterSpacing: '1px',
                transition: 'all 0.5s ease',
                textAlign: 'center'
              }}
            >
              ¿TUVISTE UN ACCIDENTE O CONOCES A ALGUIEN QUE LO TUVO?
            </Typography>
            
            <Typography 
              variant="body1" 
              sx={{ 
                fontFamily: 'Poppins, sans-serif',
                color: '#1a1a1a',
                fontSize: showForm ? { xs: '12px', md: '13px' } : { xs: '16px', md: '18px' },
                mb: showForm ? 2 : 4,
                fontWeight: 400,
                lineHeight: 1.5,
                transition: 'all 0.5s ease',
                textAlign: 'center'
              }}
            >
              Este es el formulario oficial para reportar un accidente y recibir asistencia inmediata.
            </Typography>

            <Box sx={{ mb: showForm ? 2 : 4, transition: 'all 0.5s ease' }}>
              <Typography variant="body2" sx={{ 
                color: '#F59E0B', 
                fontWeight: 600, 
                mb: showForm ? 1 : 2,
                fontFamily: 'Poppins, sans-serif',
                fontSize: showForm ? { xs: '11px', md: '12px' } : { xs: '14px', md: '15px' },
                lineHeight: 1.4,
                transition: 'all 0.5s ease',
                textAlign: showForm ? 'left' : 'center'
              }}>
                ⚠️ Es obligatorio completar todos los campos para que nuestro equipo de intake pueda comunicarse de inmediato con la persona afectada y brindarle la ayuda que necesita.
              </Typography>
            </Box>

            <Box sx={{ mb: showForm ? 2 : 4, transition: 'all 0.5s ease' }}>
              <Typography variant="body2" sx={{ 
                color: '#1a1a1a', 
                fontWeight: 600, 
                mb: showForm ? 1 : 1.5,
                fontFamily: 'Poppins, sans-serif',
                fontSize: showForm ? { xs: '11px', md: '12px' } : { xs: '14px', md: '15px' },
                transition: 'all 0.5s ease',
                textAlign: showForm ? 'left' : 'center'
              }}>
                ✓ IMPORTANTE:
              </Typography>
              <Typography variant="body2" sx={{ 
                color: '#1a1a1a', 
                mb: showForm ? 0.5 : 1, 
                fontFamily: 'Poppins, sans-serif',
                fontSize: showForm ? { xs: '10px', md: '11px' } : { xs: '13px', md: '14px' },
                lineHeight: 1.4,
                transition: 'all 0.5s ease',
                textAlign: showForm ? 'left' : 'center'
              }}>
                ✓ La información proporcionada será tratada con total confidencialidad.
              </Typography>
              <Typography variant="body2" sx={{ 
                color: '#1a1a1a', 
                mb: showForm ? 0.5 : 1, 
                fontFamily: 'Poppins, sans-serif',
                fontSize: showForm ? { xs: '10px', md: '11px' } : { xs: '13px', md: '14px' },
                lineHeight: 1.4,
                transition: 'all 0.5s ease',
                textAlign: showForm ? 'left' : 'center'
              }}>
                ✓ Completar este formulario no tiene costo ni compromiso.
              </Typography>
              <Typography variant="body2" sx={{ 
                color: '#1a1a1a', 
                mb: showForm ? 1 : 2, 
                fontFamily: 'Poppins, sans-serif',
                fontSize: showForm ? { xs: '10px', md: '11px' } : { xs: '13px', md: '14px' },
                lineHeight: 1.4,
                transition: 'all 0.5s ease',
                textAlign: showForm ? 'left' : 'center'
              }}>
                ✓ Un especialista se pondrá en contacto de inmediato.
              </Typography>
              {!showForm && (
                <Typography variant="body2" sx={{ 
                  color: '#1a1a1a', 
                  fontStyle: 'italic',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '14px',
                  mb: 2,
                  textAlign: 'center'
                }}>
                  Haz clic en "Empezar" para continuar.
                </Typography>
              )}
            </Box>

            <Box sx={{ textAlign: 'center', mt: 'auto' }}>
              {!showForm ? (
                <Button
                  onClick={handleStartForm}
                  variant="contained"
                  size="large"
                  sx={{
                    fontFamily: 'Bebas Neue, cursive',
                    fontSize: '18px',
                    letterSpacing: '2px',
                    padding: '16px 48px',
                    borderRadius: '50px',
                    backgroundColor: '#8B5CF6',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#7C3AED'
                    },
                    textTransform: 'none',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease',
                    fontWeight: 'bold'
                  }}
                >
                  EMPEZAR
                </Button>
              ) : (
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '12px',
                    color: '#8B5CF6',
                    fontWeight: 600,
                    textAlign: 'center'
                  }}
                >
                  Completa el formulario →
                </Typography>
              )}
            </Box>
            </Box>
          </LeftColumn>

          {/* Columna derecha - Formulario (aparece después de hacer clic en Empezar) */}
          <RightColumn showForm={showForm}>
            {showForm && (
              <>
                <Box sx={{ 
                  mb: 4, 
                  textAlign: 'center', 
                  pb: 3, 
                  borderBottom: '1px solid #E5E7EB',
                  animation: showForm ? 'slideInFromRight 0.8s ease-out' : 'none',
                  '@keyframes slideInFromRight': {
                    '0%': {
                      opacity: 0,
                      transform: 'translateX(30px)'
                    },
                    '100%': {
                      opacity: 1,
                      transform: 'translateX(0)'
                    }
                  }
                }}>
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      fontFamily: 'Bebas Neue, cursive',
                      fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
                      fontWeight: 'bold',
                      color: '#1a1a1a',
                      mb: 1,
                      letterSpacing: '1px'
                    }}
                  >
                    FORMULARIO DE REPORTE
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      fontFamily: 'Poppins, sans-serif',
                      color: '#6B7280',
                      fontSize: '14px'
                    }}
                  >
                    Complete todos los campos para procesar su solicitud
                  </Typography>
                </Box>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={4}>
                  {/* Todos los campos con más espaciado */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Nombre completo de la persona que sufrió el accidente"
                      placeholder=""
                      value={formData.nombreCompleto}
                      onChange={handleChange('nombreCompleto')}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                          backgroundColor: 'white',
                          fontSize: '16px',
                          padding: '4px 0'
                        },
                        '& .MuiInputLabel-root': {
                          fontFamily: 'Poppins, sans-serif',
                          color: '#8B5CF6',
                          fontSize: '14px'
                        },
                        '& .MuiOutlinedInput-input': {
                          fontFamily: 'Poppins, sans-serif',
                          fontSize: '16px',
                          padding: '16px 14px'
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Teléfono de contacto del accidentado"
                      placeholder=""
                      value={formData.telefono}
                      onChange={handleChange('telefono')}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                          backgroundColor: 'white',
                          fontSize: '16px'
                        },
                        '& .MuiInputLabel-root': {
                          fontFamily: 'Poppins, sans-serif',
                          color: '#8B5CF6',
                          fontSize: '14px'
                        },
                        '& .MuiOutlinedInput-input': {
                          fontFamily: 'Poppins, sans-serif',
                          fontSize: '16px',
                          padding: '16px 14px'
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="¿Tiene pasajeros?"
                      placeholder=""
                      value={formData.tienePasajeros}
                      onChange={handleChange('tienePasajeros')}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                          backgroundColor: 'white',
                          fontSize: '16px'
                        },
                        '& .MuiInputLabel-root': {
                          fontFamily: 'Poppins, sans-serif',
                          color: '#8B5CF6',
                          fontSize: '14px'
                        },
                        '& .MuiOutlinedInput-input': {
                          fontFamily: 'Poppins, sans-serif',
                          fontSize: '16px',
                          padding: '16px 14px'
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Indica la fecha del accidente"
                      type="date"
                      value={formData.fechaAccidente}
                      onChange={handleChange('fechaAccidente')}
                      required
                      InputLabelProps={{
                        shrink: true,
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                          backgroundColor: 'white',
                          fontSize: '16px'
                        },
                        '& .MuiInputLabel-root': {
                          fontFamily: 'Poppins, sans-serif',
                          color: '#8B5CF6',
                          fontSize: '14px'
                        },
                        '& .MuiOutlinedInput-input': {
                          fontFamily: 'Poppins, sans-serif',
                          fontSize: '16px',
                          padding: '16px 14px'
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Indica el lugar del accidente"
                      placeholder=""
                      value={formData.lugarAccidente}
                      onChange={handleChange('lugarAccidente')}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                          backgroundColor: 'white',
                          fontSize: '16px'
                        },
                        '& .MuiInputLabel-root': {
                          fontFamily: 'Poppins, sans-serif',
                          color: '#8B5CF6',
                          fontSize: '14px'
                        },
                        '& .MuiOutlinedInput-input': {
                          fontFamily: 'Poppins, sans-serif',
                          fontSize: '16px',
                          padding: '16px 14px'
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Nombre de la persona que lo refiere"
                      placeholder=""
                      value={formData.nombreReferencia}
                      onChange={handleChange('nombreReferencia')}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                          backgroundColor: 'white',
                          fontSize: '16px'
                        },
                        '& .MuiInputLabel-root': {
                          fontFamily: 'Poppins, sans-serif',
                          color: '#8B5CF6',
                          fontSize: '14px'
                        },
                        '& .MuiOutlinedInput-input': {
                          fontFamily: 'Poppins, sans-serif',
                          fontSize: '16px',
                          padding: '16px 14px'
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="De parte de quien llamamos"
                      placeholder=""
                      value={formData.deParte}
                      onChange={handleChange('deParte')}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                          backgroundColor: 'white',
                          fontSize: '16px'
                        },
                        '& .MuiInputLabel-root': {
                          fontFamily: 'Poppins, sans-serif',
                          color: '#8B5CF6',
                          fontSize: '14px'
                        },
                        '& .MuiOutlinedInput-input': {
                          fontFamily: 'Poppins, sans-serif',
                          fontSize: '16px',
                          padding: '16px 14px'
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Comparte aquí información relevante / hora recomendada para contactar al accidentado (opcional)"
                      placeholder=""
                      value={formData.informacionAdicional}
                      onChange={handleChange('informacionAdicional')}
                      multiline
                      rows={4}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                          backgroundColor: 'white',
                          fontSize: '16px'
                        },
                        '& .MuiInputLabel-root': {
                          fontFamily: 'Poppins, sans-serif',
                          color: '#8B5CF6',
                          fontSize: '14px'
                        },
                        '& .MuiOutlinedInput-input': {
                          fontFamily: 'Poppins, sans-serif',
                          fontSize: '16px',
                          padding: '16px 14px'
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="body2" sx={{ 
                      mb: 2, 
                      color: '#8B5CF6',
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '14px'
                    }}>
                      Foto del reporte policial y del ID del caso (opcional)
                    </Typography>
                    
                    <input
                      accept="image/*"
                      style={{ display: 'none' }}
                      id="foto-upload"
                      type="file"
                      onChange={handleFileUpload}
                    />
                    <Box sx={{ 
                      border: '2px dashed #D1D5DB',
                      borderRadius: '8px',
                      padding: '30px',
                      textAlign: 'center',
                      backgroundColor: 'white',
                      cursor: 'pointer',
                      '&:hover': {
                        borderColor: '#8B5CF6'
                      }
                    }}>
                      <label htmlFor="foto-upload" style={{ cursor: 'pointer', width: '100%', display: 'block' }}>
                        <CloudUpload sx={{ fontSize: 32, color: '#8B5CF6', mb: 2 }} />
                        <Typography variant="body1" sx={{ 
                          fontFamily: 'Poppins, sans-serif',
                          color: '#8B5CF6',
                          fontWeight: 500,
                          fontSize: '14px',
                          mb: 1
                        }}>
                          {formData.fotoReporte ? formData.fotoReporte.name : 'Link'}
                        </Typography>
                        <Typography variant="body2" sx={{ 
                          fontFamily: 'Poppins, sans-serif',
                          color: '#6B7280',
                          fontSize: '12px',
                          mb: 1
                        }}>
                          or drag and drop
                        </Typography>
                        <Typography variant="caption" sx={{ 
                          fontFamily: 'Poppins, sans-serif',
                          color: '#9CA3AF',
                          fontSize: '11px'
                        }}>
                          SVG, PNG, JPG or GIF (max. 3MB)
                        </Typography>
                      </label>
                    </Box>
                  </Grid>

                  {/* Botón de envío */}
                  <Grid item xs={12} sx={{ textAlign: 'right', mt: 3 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      sx={{
                        fontFamily: 'Bebas Neue, cursive',
                        fontSize: '16px',
                        letterSpacing: '1px',
                        padding: '12px 32px',
                        borderRadius: '8px',
                        backgroundColor: '#8B5CF6',
                        '&:hover': {
                          backgroundColor: '#7C3AED'
                        },
                        textTransform: 'none'
                      }}
                    >
                      ENVIAR
                    </Button>
                  </Grid>
                </Grid>
              </form>
              </>
            )}
          </RightColumn>
        </CardContainer>

        {/* Logo en la esquina inferior izquierda */}
        <LogoContainer>
          <Logo src={logoImage} alt="LinkUp Logo" />
        </LogoContainer>
    </BackgroundContainer>
  );
};

export default ReporteAccidenteForm;