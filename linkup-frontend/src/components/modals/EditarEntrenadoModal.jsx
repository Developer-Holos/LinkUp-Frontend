import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  MenuItem,
  Typography,
  IconButton,
} from '@mui/material';
import { Close } from '@mui/icons-material';

const EditarEntrenadoModal = ({ open, onClose, onSave, entrenado }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    sede: '',
    status: 'Activo',
    entrenador: ''
  });

  const [errors, setErrors] = useState({});

  // Datos de ejemplo para los selectores
  const sedes = ['Sede Norte', 'Sede Centro', 'Sede Sur'];
  const entrenadores = ['Maria García', 'Carlos Silva', 'Juan Pérez'];
  const estados = ['Activo', 'Inactivo', 'Suspendido', 'En Pausa'];

  // Cargar datos del entrenado cuando se abre el modal
  useEffect(() => {
    if (entrenado && open) {
      setFormData({
        nombre: entrenado.nombre || '',
        email: entrenado.email || '',
        sede: entrenado.sede || '',
        status: entrenado.status || 'Activo',
        entrenador: entrenado.entrenador || ''
      });
    }
  }, [entrenado, open]);

  const handleChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
    
    // Limpiar error cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'El formato del email no es válido';
    }

    if (!formData.sede) {
      newErrors.sede = 'La sede es requerida';
    }

    if (!formData.entrenador) {
      newErrors.entrenador = 'El entrenador es requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSave({
        ...entrenado,
        ...formData
      });
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      nombre: '',
      email: '',
      sede: '',
      status: 'Activo',
      entrenador: ''
    });
    setErrors({});
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        pb: 2
      }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a1a1a' }}>
          Editar Entrenado
        </Typography>
        <IconButton onClick={handleClose} size="small">
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 1 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Nombre */}
          <TextField
            label="Nombre completo"
            value={formData.nombre}
            onChange={handleChange('nombre')}
            error={!!errors.nombre}
            helperText={errors.nombre}
            fullWidth
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />

          {/* Email */}
          <TextField
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange('email')}
            error={!!errors.email}
            helperText={errors.email}
            fullWidth
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />

          {/* Sede */}
          <TextField
            select
            label="Sede"
            value={formData.sede}
            onChange={handleChange('sede')}
            error={!!errors.sede}
            helperText={errors.sede}
            fullWidth
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          >
            {sedes.map((sede) => (
              <MenuItem key={sede} value={sede}>
                {sede}
              </MenuItem>
            ))}
          </TextField>

          {/* Entrenador */}
          <TextField
            select
            label="Entrenador"
            value={formData.entrenador}
            onChange={handleChange('entrenador')}
            error={!!errors.entrenador}
            helperText={errors.entrenador}
            fullWidth
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          >
            {entrenadores.map((entrenador) => (
              <MenuItem key={entrenador} value={entrenador}>
                {entrenador}
              </MenuItem>
            ))}
          </TextField>

          {/* Estado */}
          <TextField
            select
            label="Estado"
            value={formData.status}
            onChange={handleChange('status')}
            fullWidth
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          >
            {estados.map((estado) => (
              <MenuItem key={estado} value={estado}>
                {estado}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, pt: 2, gap: 1 }}>
        <Button
          onClick={handleClose}
          variant="outlined"
          sx={{
            textTransform: 'none',
            borderRadius: 2,
            borderColor: '#e0e0e0',
            color: '#666',
            '&:hover': {
              borderColor: '#9333ea',
              color: '#9333ea',
            },
          }}
        >
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            textTransform: 'none',
            bgcolor: '#10b981',
            borderRadius: 2,
            '&:hover': {
              bgcolor: '#059669',
            },
          }}
        >
          Guardar Cambios
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditarEntrenadoModal;