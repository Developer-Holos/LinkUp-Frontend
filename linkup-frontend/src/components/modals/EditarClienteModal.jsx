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

const EditarClienteModal = ({ open, onClose, onSave, cliente }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    telefono: '',
    afiliado: '',
    entrenador: '',
    sede: '',
    estado: 'Activo',
    tipo: 'Regular'
  });

  // Cargar datos del cliente cuando se abre el modal
  useEffect(() => {
    if (cliente && open) {
      const [firstName, ...lastNameParts] = (cliente.user || '').split(' ');
      const lastName = lastNameParts.join(' ');
      
      setFormData({
        firstName: firstName || '',
        lastName: lastName || '',
        email: cliente.email || '',
        telefono: cliente.telefono || '',
        afiliado: cliente.afiliado || '',
        entrenador: cliente.entrenador || '',
        sede: cliente.sede || '',
        estado: cliente.estado || 'Activo',
        tipo: cliente.tipo || 'Regular'
      });
    }
  }, [cliente, open]);

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    });
  };

  const handleSave = () => {
    const updatedCliente = {
      ...cliente,
      user: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email,
      telefono: formData.telefono,
      afiliado: formData.afiliado,
      entrenador: formData.entrenador,
      sede: formData.sede,
      estado: formData.estado,
      tipo: formData.tipo
    };
    
    onSave(updatedCliente);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      telefono: '',
      afiliado: '',
      entrenador: '',
      sede: '',
      estado: 'Activo',
      tipo: 'Regular'
    });
    onClose();
  };

  if (!cliente) return null;

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
            Editar Cliente
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

        {/* Asignaciones */}
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500, color: '#374151' }}>
          Asignaciones
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <FormControl fullWidth size="medium">
            <InputLabel>Afiliado</InputLabel>
            <Select
              value={formData.afiliado}
              onChange={handleChange('afiliado')}
              label="Afiliado"
              sx={{ borderRadius: 2 }}
            >
              <MenuItem value="Juan Pérez">Juan Pérez</MenuItem>
              <MenuItem value="María García">María García</MenuItem>
              <MenuItem value="Carlos López">Carlos López</MenuItem>
              <MenuItem value="Ana Martínez">Ana Martínez</MenuItem>
            </Select>
          </FormControl>
          
          <FormControl fullWidth size="medium">
            <InputLabel>Entrenador</InputLabel>
            <Select
              value={formData.entrenador}
              onChange={handleChange('entrenador')}
              label="Entrenador"
              sx={{ borderRadius: 2 }}
            >
              <MenuItem value="Ana Martínez">Ana Martínez</MenuItem>
              <MenuItem value="Luis Rodriguez">Luis Rodriguez</MenuItem>
              <MenuItem value="Sofia Hernández">Sofia Hernández</MenuItem>
              <MenuItem value="Carlos Ruiz">Carlos Ruiz</MenuItem>
            </Select>
          </FormControl>
        </Box>

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

        <FormControl fullWidth size="medium" sx={{ mb: 3 }}>
          <InputLabel>Tipo de Cliente</InputLabel>
          <Select
            value={formData.tipo}
            onChange={handleChange('tipo')}
            label="Tipo de Cliente"
            sx={{ borderRadius: 2 }}
          >
            <MenuItem value="Regular">Regular</MenuItem>
            <MenuItem value="Premium">Premium</MenuItem>
            <MenuItem value="VIP">VIP</MenuItem>
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

export default EditarClienteModal;