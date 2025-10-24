import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  IconButton,
  Divider,
  Chip,
  Avatar,
} from '@mui/material';
import { Close, Email, Phone, FitnessCenter, CalendarToday } from '@mui/icons-material';

const VerEntrenadorModal = ({ open, onClose, entrenador }) => {
  if (!entrenador) return null;

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
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
            Detalles del Entrenador
          </Typography>
          <IconButton onClick={onClose} sx={{ color: '#6b7280' }}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        {/* Header con avatar y nombre */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar 
            sx={{ 
              width: 64, 
              height: 64, 
              bgcolor: '#9333ea',
              fontSize: '24px',
              fontWeight: 600,
              mr: 2
            }}
          >
            {entrenador.entrenador?.charAt(0) || entrenador.user?.charAt(0) || 'E'}
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#374151' }}>
              {entrenador.entrenador || entrenador.user}
            </Typography>
            <Typography variant="body2" sx={{ color: '#6b7280' }}>
              Entrenador Profesional
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Información de contacto */}
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600, color: '#374151' }}>
          Información de Contacto
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Email sx={{ color: '#6b7280', mr: 2, fontSize: 20 }} />
            <Typography variant="body2" sx={{ color: '#374151' }}>
              {entrenador.email || 'No especificado'}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Phone sx={{ color: '#6b7280', mr: 2, fontSize: 20 }} />
            <Typography variant="body2" sx={{ color: '#374151' }}>
              {entrenador.telefono || 'No especificado'}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <FitnessCenter sx={{ color: '#6b7280', mr: 2, fontSize: 20 }} />
            <Typography variant="body2" sx={{ color: '#374151' }}>
              Sede: {entrenador.sede || 'No asignada'}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Información profesional */}
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600, color: '#374151' }}>
          Información Profesional
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ color: '#6b7280', mb: 1 }}>
            Especialidad:
          </Typography>
          <Typography variant="body2" sx={{ color: '#374151' }}>
            {entrenador.especialidad || 'Entrenamiento general'}
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ color: '#6b7280', mb: 1 }}>
            Experiencia:
          </Typography>
          <Typography variant="body2" sx={{ color: '#374151' }}>
            {entrenador.experiencia || 'No especificada'}
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ color: '#6b7280', mb: 1 }}>
            Certificaciones:
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
            {entrenador.certificaciones && entrenador.certificaciones.length > 0 ? (
              entrenador.certificaciones.map((cert, index) => (
                <Chip 
                  key={index}
                  label={cert} 
                  size="small" 
                  sx={{ 
                    bgcolor: '#f3e8ff', 
                    color: '#9333ea',
                    fontWeight: 500
                  }} 
                />
              ))
            ) : (
              <Typography variant="body2" sx={{ color: '#374151' }}>
                No especificadas
              </Typography>
            )}
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Estado y estadísticas */}
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600, color: '#374151' }}>
          Estado y Estadísticas
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 3, mb: 2 }}>
          <Box>
            <Typography variant="body2" sx={{ color: '#6b7280', mb: 1 }}>
              Estado:
            </Typography>
            <Chip 
              label={entrenador.estado || 'Activo'} 
              size="small"
              sx={{ 
                bgcolor: entrenador.estado === 'Activo' ? '#dcfce7' : '#fef3c7',
                color: entrenador.estado === 'Activo' ? '#16a34a' : '#d97706'
              }} 
            />
          </Box>
          <Box>
            <Typography variant="body2" sx={{ color: '#6b7280', mb: 1 }}>
              Clientes Asignados:
            </Typography>
            <Typography variant="h6" sx={{ color: '#374151', fontWeight: 600 }}>
              {entrenador.clientesAsignados || '0'}
            </Typography>
          </Box>
        </Box>

        {entrenador.fechaIngreso && (
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            <CalendarToday sx={{ color: '#6b7280', mr: 2, fontSize: 20 }} />
            <Typography variant="body2" sx={{ color: '#6b7280' }}>
              Fecha de ingreso: {entrenador.fechaIngreso}
            </Typography>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            textTransform: 'none',
            bgcolor: '#9333ea',
            borderRadius: 2,
            px: 3,
            '&:hover': {
              bgcolor: '#7e22ce',
            }
          }}
        >
          CERRAR
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default VerEntrenadorModal;