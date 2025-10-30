import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import { Close, Warning } from '@mui/icons-material';

const EliminarEntrenadoModal = ({ open, onClose, onConfirm, entrenado }) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
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
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#dc2626' }}>
          Eliminar Entrenado
        </Typography>
        <IconButton onClick={onClose} size="small">
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 1 }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          gap: 2,
          py: 2
        }}>
          <Warning 
            sx={{ 
              fontSize: 64, 
              color: '#f59e0b',
              mb: 1 
            }} 
          />
          
          <Typography 
            variant="h6" 
            sx={{ 
              textAlign: 'center', 
              color: '#1f2937',
              fontWeight: 500
            }}
          >
            ¿Estás seguro de que deseas eliminar este entrenado?
          </Typography>
          
          {entrenado && (
            <Box sx={{ 
              bgcolor: '#f9fafb', 
              p: 2, 
              borderRadius: 2, 
              width: '100%',
              border: '1px solid #e5e7eb'
            }}>
              <Typography variant="body2" sx={{ color: '#6b7280', mb: 1 }}>
                <strong>Nombre:</strong> {entrenado.nombre}
              </Typography>
              <Typography variant="body2" sx={{ color: '#6b7280', mb: 1 }}>
                <strong>Email:</strong> {entrenado.email}
              </Typography>
              <Typography variant="body2" sx={{ color: '#6b7280', mb: 1 }}>
                <strong>Sede:</strong> {entrenado.sede}
              </Typography>
              <Typography variant="body2" sx={{ color: '#6b7280' }}>
                <strong>Entrenador:</strong> {entrenado.entrenador}
              </Typography>
            </Box>
          )}
          
          <Typography 
            variant="body2" 
            sx={{ 
              textAlign: 'center', 
              color: '#6b7280',
              mt: 1
            }}
          >
            Esta acción no se puede deshacer. El entrenado será eliminado permanentemente del sistema.
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, pt: 2, gap: 1 }}>
        <Button
          onClick={onClose}
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
          onClick={handleConfirm}
          variant="contained"
          sx={{
            textTransform: 'none',
            bgcolor: '#dc2626',
            borderRadius: 2,
            '&:hover': {
              bgcolor: '#b91c1c',
            },
          }}
        >
          Eliminar Entrenado
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EliminarEntrenadoModal;