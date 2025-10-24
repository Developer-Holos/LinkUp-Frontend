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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Chip,
  Paper,
} from '@mui/material';
import { Close, Email, Phone } from '@mui/icons-material';

const VerEntrenadoresSedeModal = ({ open, onClose, sede, onVerEntrenador }) => {
  if (!sede) return null;

  // Datos simulados de entrenadores para la sede
  const entrenadoresDeLaSede = [
    {
      id: 1,
      entrenador: 'Carlos Martínez',
      email: 'carlos.martinez@gym.com',
      telefono: '+1 (555) 123-4567',
      especialidad: 'Musculación',
      estado: 'Activo',
      clientesAsignados: 15,
      sede: sede.nombre
    },
    {
      id: 2,
      entrenador: 'Ana García',
      email: 'ana.garcia@gym.com',
      telefono: '+1 (555) 234-5678',
      especialidad: 'Cardio',
      estado: 'Activo',
      clientesAsignados: 12,
      sede: sede.nombre
    },
    {
      id: 3,
      entrenador: 'Luis Rodríguez',
      email: 'luis.rodriguez@gym.com',
      telefono: '+1 (555) 345-6789',
      especialidad: 'Funcional',
      estado: 'Inactivo',
      clientesAsignados: 8,
      sede: sede.nombre
    }
  ];

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'Activo':
        return { bgcolor: '#dcfce7', color: '#16a34a' };
      case 'Inactivo':
        return { bgcolor: '#fef3c7', color: '#d97706' };
      default:
        return { bgcolor: '#f3f4f6', color: '#6b7280' };
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 1,
          maxWidth: '700px'
        }
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 600, color: '#374151' }}>
            Entrenadores - {sede.nombre}
          </Typography>
          <IconButton onClick={onClose} sx={{ color: '#6b7280' }}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        {/* Información de la sede */}
        <Box sx={{ mb: 3, p: 2, bgcolor: '#f8f9fa', borderRadius: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#374151', mb: 1 }}>
            {sede.nombre}
          </Typography>
          <Typography variant="body2" sx={{ color: '#6b7280', mb: 1 }}>
            📍 {sede.direccion}, {sede.ciudad}
          </Typography>
          <Typography variant="body2" sx={{ color: '#6b7280' }}>
            👥 Total de entrenadores: {entrenadoresDeLaSede.length}
          </Typography>
        </Box>

        {/* Tabla de entrenadores */}
        <TableContainer component={Paper} sx={{ borderRadius: 2, border: '1px solid #f0f0f0' }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#f8f9fa' }}>
                <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Entrenador</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Contacto</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Especialidad</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Estado</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Clientes</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Acción</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {entrenadoresDeLaSede.map((entrenador) => (
                <TableRow key={entrenador.id} sx={{ '&:hover': { bgcolor: '#f9fafb' } }}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar 
                        sx={{ 
                          width: 32, 
                          height: 32, 
                          bgcolor: '#9333ea',
                          fontSize: '14px',
                          mr: 2
                        }}
                      >
                        {entrenador.entrenador.charAt(0)}
                      </Avatar>
                      <Typography variant="body2" sx={{ fontWeight: 500, color: '#374151' }}>
                        {entrenador.entrenador}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                        <Email sx={{ fontSize: 14, color: '#6b7280', mr: 1 }} />
                        <Typography variant="body2" sx={{ fontSize: '12px', color: '#6b7280' }}>
                          {entrenador.email}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Phone sx={{ fontSize: 14, color: '#6b7280', mr: 1 }} />
                        <Typography variant="body2" sx={{ fontSize: '12px', color: '#6b7280' }}>
                          {entrenador.telefono}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ color: '#374151' }}>
                      {entrenador.especialidad}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={entrenador.estado}
                      size="small"
                      sx={{
                        ...getEstadoColor(entrenador.estado),
                        fontWeight: 500,
                        borderRadius: 2,
                        fontSize: '12px',
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#374151' }}>
                      {entrenador.clientesAsignados}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="text"
                      size="small"
                      onClick={() => onVerEntrenador(entrenador)}
                      sx={{
                        textTransform: 'none',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#9333ea',
                        '&:hover': {
                          bgcolor: '#f3e8ff',
                        },
                      }}
                    >
                      Ver Detalles
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {entrenadoresDeLaSede.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body1" sx={{ color: '#6b7280' }}>
              No hay entrenadores asignados a esta sede
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

export default VerEntrenadoresSedeModal;