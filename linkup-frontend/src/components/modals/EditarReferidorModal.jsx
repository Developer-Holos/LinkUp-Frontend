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

const EditarReferidorModal = ({ open, onClose, onSave, referidor }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    telefono: '',
    urlReferido: '',
    comisionTotal: '',
    referidosActivos: '',
    estado: 'Activo'
  });

  // Cargar datos del referidor cuando se abre el modal
  useEffect(() => {
    if (referidor && open) {
      const [firstName, ...lastNameParts] = (referidor.user || '').split(' ');
      const lastName = lastNameParts.join(' ');
      
      setFormData({
        firstName: firstName || '',
        lastName: lastName || '',
        email: referidor.email || '',
        telefono: referidor.telefono || '',
        urlReferido: referidor.urlPersonalizado || '',
        comisionTotal: referidor.comisionTotal || '',
        referidosActivos: referidor.referidosActivos || '',
        estado: referidor.estado || 'Activo'
      });
    }
  }, [referidor, open]);

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    });
  };

  const handleSave = () => {
    const updatedReferidor = {
      ...referidor,
      user: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email,
      telefono: formData.telefono,
      urlPersonalizado: formData.urlReferido,
      comisionTotal: formData.comisionTotal,
      referidosActivos: formData.referidosActivos,
      estado: formData.estado
    };
    
    onSave(updatedReferidor);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      telefono: '',
      urlReferido: '',
      comisionTotal: '',
      referidosActivos: '',
      estado: 'Activo'
    });
    onClose();
  };

  if (!referidor) return null;

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 1,
          maxWidth: '500px'
        }
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 600, color: '#374151' }}>
            Editar Referidor
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

        {/* URL del Referido */}
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500, color: '#374151' }}>
          URL del Referido
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <Typography sx={{ color: '#6b7280', fontSize: '14px' }}>
            https://mi.dominio.com/
          </Typography>
          <TextField
            placeholder="usuario"
            value={formData.urlReferido}
            onChange={handleChange('urlReferido')}
            size="medium"
            sx={{
              flex: 1,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              }
            }}
          />
        </Box>

        {/* Información de comisiones */}
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500, color: '#374151' }}>
          Información de Comisiones
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <TextField
            label="Comisión Total"
            value={formData.comisionTotal}
            onChange={handleChange('comisionTotal')}
            fullWidth
            size="medium"
            placeholder="$0.00"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              }
            }}
          />
          <TextField
            label="Referidos Activos"
            value={formData.referidosActivos}
            onChange={handleChange('referidosActivos')}
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
            <MenuItem value="Suspendido">Suspendido</MenuItem>
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

export default EditarReferidorModal;