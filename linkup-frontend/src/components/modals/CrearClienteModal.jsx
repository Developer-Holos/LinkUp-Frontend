import React, { useState } from 'react';
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

const CrearClienteModal = ({ open, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    afiliado: '',
    entrenador: '',
    sede: ''
  });

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    });
  };

  const handleSave = () => {
    // Aquí puedes agregar validación
    onSave(formData);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      afiliado: '',
      entrenador: '',
      sede: ''
    });
    onClose();
  };

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
            Crear Cliente
          </Typography>
          <IconButton onClick={handleClose} sx={{ color: '#6b7280' }}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        {/* Datos del Cliente */}
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500, color: '#374151' }}>
          Datos del Cliente
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <TextField
            label="First name *"
            placeholder="First name*"
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
            label="Last name *"
            placeholder="Last name*"
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
            label="Email *"
            placeholder="email@example.com"
            value={formData.email}
            onChange={handleChange('email')}
            fullWidth
            size="medium"
            type="email"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              }
            }}
          />
          <TextField
            label="Phone *"
            placeholder="+1 (555) 000-0000"
            value={formData.phone}
            onChange={handleChange('phone')}
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
              sx={{
                borderRadius: 2,
              }}
            >
              <MenuItem value="Juan Pérez">Juan Pérez</MenuItem>
              <MenuItem value="María García">María García</MenuItem>
              <MenuItem value="Carlos López">Carlos López</MenuItem>
            </Select>
          </FormControl>
          
          <FormControl fullWidth size="medium">
            <InputLabel>Entrenador</InputLabel>
            <Select
              value={formData.entrenador}
              onChange={handleChange('entrenador')}
              label="Entrenador"
              sx={{
                borderRadius: 2,
              }}
            >
              <MenuItem value="Ana Martínez">Ana Martínez</MenuItem>
              <MenuItem value="Luis Rodriguez">Luis Rodriguez</MenuItem>
              <MenuItem value="Sofia Hernández">Sofia Hernández</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <FormControl fullWidth size="medium" sx={{ mb: 3 }}>
          <InputLabel>Sede</InputLabel>
          <Select
            value={formData.sede}
            onChange={handleChange('sede')}
            label="Sede"
            sx={{
              borderRadius: 2,
            }}
          >
            <MenuItem value="Sede Norte">Sede Norte</MenuItem>
            <MenuItem value="Sede Sur">Sede Sur</MenuItem>
            <MenuItem value="Sede Centro">Sede Centro</MenuItem>
            <MenuItem value="Sede Este">Sede Este</MenuItem>
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
          GUARDAR
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CrearClienteModal;