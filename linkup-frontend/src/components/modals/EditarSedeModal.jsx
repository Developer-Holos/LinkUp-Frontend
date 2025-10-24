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
} from '@mui/material';
import { Close } from '@mui/icons-material';

const EditarSedeModal = ({ open, onClose, onSave, sede }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    ciudad: '',
    telefono: '',
    email: '',
    capacidad: '',
    tipo: 'Gimnasio',
    estado: 'Activo',
    entrenadores: '',
    clientes: ''
  });

  // Cargar datos de la sede cuando se abre el modal
  useEffect(() => {
    if (sede && open) {
      setFormData({
        nombre: sede.nombre || '',
        direccion: sede.direccion || '',
        ciudad: sede.ciudad || '',
        telefono: sede.telefono || '',
        email: sede.email || '',
        capacidad: sede.capacidad || '',
        tipo: sede.tipo || 'Gimnasio',
        estado: sede.estado || 'Activo',
        entrenadores: sede.entrenadores || '',
        clientes: sede.clientes || ''
      });
    }
  }, [sede, open]);

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    });
  };

  const handleSave = () => {
    const updatedSede = {
      ...sede,
      nombre: formData.nombre,
      direccion: formData.direccion,
      ciudad: formData.ciudad,
      telefono: formData.telefono,
      email: formData.email,
      capacidad: formData.capacidad,
      tipo: formData.tipo,
      estado: formData.estado,
      entrenadores: formData.entrenadores,
      clientes: formData.clientes
    };
    
    onSave(updatedSede);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      nombre: '',
      direccion: '',
      ciudad: '',
      telefono: '',
      email: '',
      capacidad: '',
      tipo: 'Gimnasio',
      estado: 'Activo',
      entrenadores: '',
      clientes: ''
    });
    onClose();
  };

  if (!sede) return null;

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
            Editar Sede
          </Typography>
          <IconButton onClick={handleClose} sx={{ color: '#6b7280' }}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        {/* Información básica */}
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500, color: '#374151' }}>
          Información Básica
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <TextField
            label="Nombre de la Sede *"
            value={formData.nombre}
            onChange={handleChange('nombre')}
            fullWidth
            size="medium"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              }
            }}
          />
          <FormControl fullWidth size="medium">
            <InputLabel>Tipo</InputLabel>
            <Select
              value={formData.tipo}
              onChange={handleChange('tipo')}
              label="Tipo"
              sx={{ borderRadius: 2 }}
            >
              <MenuItem value="Gimnasio">Gimnasio</MenuItem>
              <MenuItem value="Estudio">Estudio</MenuItem>
              <MenuItem value="Centro Deportivo">Centro Deportivo</MenuItem>
              <MenuItem value="Spa">Spa</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Ubicación */}
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500, color: '#374151' }}>
          Ubicación
        </Typography>
        
        <TextField
          label="Dirección"
          value={formData.direccion}
          onChange={handleChange('direccion')}
          fullWidth
          size="medium"
          sx={{
            mb: 3,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            }
          }}
        />

        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <TextField
            label="Ciudad"
            value={formData.ciudad}
            onChange={handleChange('ciudad')}
            fullWidth
            size="medium"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              }
            }}
          />
          <TextField
            label="Capacidad"
            value={formData.capacidad}
            onChange={handleChange('capacidad')}
            fullWidth
            size="medium"
            type="number"
            placeholder="Número de personas"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              }
            }}
          />
        </Box>

        {/* Contacto */}
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500, color: '#374151' }}>
          Información de Contacto
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
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
        </Box>

        {/* Estadísticas */}
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500, color: '#374151' }}>
          Estadísticas y Estado
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <TextField
            label="Número de Entrenadores"
            value={formData.entrenadores}
            onChange={handleChange('entrenadores')}
            fullWidth
            size="medium"
            type="number"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              }
            }}
          />
          <TextField
            label="Número de Clientes"
            value={formData.clientes}
            onChange={handleChange('clientes')}
            fullWidth
            size="medium"
            type="number"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              }
            }}
          />
        </Box>

        <FormControl fullWidth size="medium" sx={{ mb: 3 }}>
          <InputLabel>Estado</InputLabel>
          <Select
            value={formData.estado}
            onChange={handleChange('estado')}
            label="Estado"
            sx={{ borderRadius: 2 }}
          >
            <MenuItem value="Activo">Activo</MenuItem>
            <MenuItem value="Inactivo">Inactivo</MenuItem>
            <MenuItem value="En Mantenimiento">En Mantenimiento</MenuItem>
            <MenuItem value="Próxima Apertura">Próxima Apertura</MenuItem>
          </Select>
        </FormControl>
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

export default EditarSedeModal;