import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from '@mui/material';
import { Close } from '@mui/icons-material';

const EditarEntrenadorModal = ({ open, onClose, onSave, entrenador }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    telefono: '',
    sede: '',
    especialidad: '',
    experiencia: '',
    estado: 'Activo',
    certificaciones: []
  });

  const [newCertificacion, setNewCertificacion] = useState('');

  // Cargar datos del entrenador cuando se abre el modal
  useEffect(() => {
    if (entrenador && open) {
      const [firstName, ...lastNameParts] = (entrenador.entrenador || entrenador.user || '').split(' ');
      const lastName = lastNameParts.join(' ');
      
      setFormData({
        firstName: firstName || '',
        lastName: lastName || '',
        email: entrenador.email || '',
        telefono: entrenador.telefono || '',
        sede: entrenador.sede || '',
        especialidad: entrenador.especialidad || '',
        experiencia: entrenador.experiencia || '',
        estado: entrenador.estado || 'Activo',
        certificaciones: entrenador.certificaciones || []
      });
    }
  }, [entrenador, open]);

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    });
  };

  const handleAddCertificacion = () => {
    if (newCertificacion.trim() && !formData.certificaciones.includes(newCertificacion.trim())) {
      setFormData({
        ...formData,
        certificaciones: [...formData.certificaciones, newCertificacion.trim()]
      });
      setNewCertificacion('');
    }
  };

  const handleRemoveCertificacion = (index) => {
    const newCertificaciones = formData.certificaciones.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      certificaciones: newCertificaciones
    });
  };

  const handleSave = () => {
    const updatedEntrenador = {
      ...entrenador,
      entrenador: `${formData.firstName} ${formData.lastName}`.trim(),
      user: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email,
      telefono: formData.telefono,
      sede: formData.sede,
      especialidad: formData.especialidad,
      experiencia: formData.experiencia,
      estado: formData.estado,
      certificaciones: formData.certificaciones
    };
    
    onSave(updatedEntrenador);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      telefono: '',
      sede: '',
      especialidad: '',
      experiencia: '',
      estado: 'Activo',
      certificaciones: []
    });
    setNewCertificacion('');
    onClose();
  };

  if (!entrenador) return null;

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 1,
          maxWidth: '600px'
        }
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 600, color: '#374151' }}>
            Editar Entrenador
          </Typography>
          <IconButton onClick={handleClose} sx={{ color: '#6b7280' }}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        {/* Información personal */}
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500, color: '#374151' }}>
          Información Personal
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <TextField
            label="Nombre *"
            value={formData.firstName}
            onChange={handleChange('firstName')}
            fullWidth
            size="medium"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              }
            }}
          />
          <TextField
            label="Apellido *"
            value={formData.lastName}
            onChange={handleChange('lastName')}
            fullWidth
            size="medium"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              }
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <TextField
            label="Email"
            value={formData.email}
            onChange={handleChange('email')}
            fullWidth
            type="email"
            size="medium"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              }
            }}
          />
          <TextField
            label="Teléfono"
            value={formData.telefono}
            onChange={handleChange('telefono')}
            fullWidth
            size="medium"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              }
            }}
          />
        </Box>

        {/* Información profesional */}
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500, color: '#374151' }}>
          Información Profesional
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <FormControl fullWidth size="medium">
            <InputLabel>Sede</InputLabel>
            <Select
              value={formData.sede}
              onChange={handleChange('sede')}
              label="Sede"
              sx={{ borderRadius: 2 }}
            >
              <MenuItem value="Sede Norte">Sede Norte</MenuItem>
              <MenuItem value="Sede Sur">Sede Sur</MenuItem>
              <MenuItem value="Sede Centro">Sede Centro</MenuItem>
              <MenuItem value="Sede Este">Sede Este</MenuItem>
              <MenuItem value="Sede Oeste">Sede Oeste</MenuItem>
            </Select>
          </FormControl>
          
          <FormControl fullWidth size="medium">
            <InputLabel>Estado</InputLabel>
            <Select
              value={formData.estado}
              onChange={handleChange('estado')}
              label="Estado"
              sx={{ borderRadius: 2 }}
            >
              <MenuItem value="Activo">Activo</MenuItem>
              <MenuItem value="Inactivo">Inactivo</MenuItem>
              <MenuItem value="Suspendido">Suspendido</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <TextField
            label="Especialidad"
            value={formData.especialidad}
            onChange={handleChange('especialidad')}
            fullWidth
            size="medium"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              }
            }}
          />
          <TextField
            label="Experiencia"
            value={formData.experiencia}
            onChange={handleChange('experiencia')}
            fullWidth
            size="medium"
            placeholder="ej: 5 años"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              }
            }}
          />
        </Box>

        {/* Certificaciones */}
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500, color: '#374151' }}>
          Certificaciones
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField
            label="Nueva certificación"
            value={newCertificacion}
            onChange={(e) => setNewCertificacion(e.target.value)}
            fullWidth
            size="medium"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleAddCertificacion();
              }
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              }
            }}
          />
          <Button
            onClick={handleAddCertificacion}
            variant="outlined"
            sx={{
              textTransform: 'none',
              borderColor: '#9333ea',
              color: '#9333ea',
              borderRadius: 2,
              minWidth: '100px',
              '&:hover': {
                borderColor: '#7e22ce',
                bgcolor: '#f3e8ff',
              }
            }}
          >
            Agregar
          </Button>
        </Box>

        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
          {formData.certificaciones.map((cert, index) => (
            <Chip
              key={index}
              label={cert}
              onDelete={() => handleRemoveCertificacion(index)}
              sx={{
                bgcolor: '#f3e8ff',
                color: '#9333ea',
                '& .MuiChip-deleteIcon': {
                  color: '#9333ea',
                }
              }}
            />
          ))}
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, gap: 2 }}>
        <Button
          onClick={handleClose}
          variant="outlined"
          sx={{
            textTransform: 'none',
            borderColor: '#e0e0e0',
            color: '#6b7280',
            borderRadius: 2,
            px: 3,
            '&:hover': {
              borderColor: '#9333ea',
              color: '#9333ea',
            }
          }}
        >
          CANCELAR
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          sx={{
            textTransform: 'none',
            bgcolor: '#06d6a0',
            borderRadius: 2,
            px: 3,
            '&:hover': {
              bgcolor: '#059669',
            }
          }}
        >
          GUARDAR CAMBIOS
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditarEntrenadorModal;