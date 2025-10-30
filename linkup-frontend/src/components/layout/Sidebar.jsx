import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
} from '@mui/material';
import {
  PersonOutline,
  WorkOutline,
  AdminPanelSettings,
  ExpandLess,
  ExpandMore,
  Groups,
  FitnessCenter,
  LocationOn,
  StarBorder,
  School,
} from '@mui/icons-material';
import logoImage from '../../assets/images/logo.png';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openAdministracion, setOpenAdministracion] = useState(true);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 270,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 270,
          boxSizing: 'border-box',
          bgcolor: '#e0f2f1',
          borderRight: 'none',
        },
      }}
    >
    {/* Logo */}
    <Box sx={{ 
      p: 3, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      overflow: 'hidden',
      height: '100px', // Aumentamos la altura del contenedor
    }}>
      <img 
        src={logoImage} 
        alt="Link Up Logo" 
        style={{
          width: '160px', // Aumentamos el ancho
          height: '120px', // Aumentamos la altura
          objectFit: 'contain',
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))', // Añadimos una sombra sutil
          transition: 'transform 0.2s ease-in-out', // Transición suave
        }}
        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'} // Efecto hover
        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
      />
    </Box>

      <List sx={{ px: 2 }}>
        {/* Clientes */}
        <ListItem disablePadding>
          <ListItemButton 
            sx={{
              bgcolor: isActive('/clientes') ? '#c8e6e3' : 'transparent',
              '&:hover': {
                bgcolor: '#b2dfdb',
              }
            }}
            onClick={() => handleNavigation('/clientes')}
          >
            <ListItemIcon>
              <PersonOutline sx={{
                color: isActive('/clientes') ? '#059669' : '#6b7280'
              }} />
            </ListItemIcon>
            <ListItemText 
              primary="Clientes" 
              sx={{
                '& .MuiListItemText-primary': {
                  fontWeight: isActive('/clientes') ? 600 : 400,
                  color: isActive('/clientes') ? '#059669' : '#374151'
                }
              }}
            />
          </ListItemButton>
        </ListItem>

        {/* Administración */}
        <ListItem disablePadding sx={{ mt: 1 }}>
          <ListItemButton onClick={() => setOpenAdministracion(!openAdministracion)}>
            <ListItemIcon>
              <AdminPanelSettings />
            </ListItemIcon>
            <ListItemText primary="Administración" />
            {openAdministracion ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={openAdministracion} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton 
              sx={{ 
                pl: 4, 
                bgcolor: isActive('/afiliados') ? '#c8e6e3' : 'transparent',
                '&:hover': {
                  bgcolor: '#b2dfdb',
                }
              }}
              onClick={() => handleNavigation('/afiliados')}
            >
              <ListItemIcon>
                <Groups sx={{ 
                  fontSize: 20, 
                  color: isActive('/afiliados') ? '#059669' : '#6b7280' 
                }} />
              </ListItemIcon>
              <ListItemText 
                primary="Afiliados" 
                sx={{
                  '& .MuiListItemText-primary': {
                    fontWeight: isActive('/afiliados') ? 600 : 400,
                    color: isActive('/afiliados') ? '#059669' : '#374151'
                  }
                }}
              />
            </ListItemButton>
            <ListItemButton 
              sx={{ 
                pl: 4,
                bgcolor: isActive('/entrenadores') ? '#c8e6e3' : 'transparent',
                '&:hover': {
                  bgcolor: '#b2dfdb',
                }
              }}
              onClick={() => handleNavigation('/entrenadores')}
            >
              <ListItemIcon>
                <FitnessCenter sx={{ 
                  fontSize: 20, 
                  color: isActive('/entrenadores') ? '#059669' : '#6b7280' 
                }} />
              </ListItemIcon>
              <ListItemText 
                primary="Entrenadores" 
                sx={{
                  '& .MuiListItemText-primary': {
                    fontWeight: isActive('/entrenadores') ? 600 : 400,
                    color: isActive('/entrenadores') ? '#059669' : '#374151'
                  }
                }}
              />
            </ListItemButton>
            <ListItemButton 
              sx={{ 
                pl: 4,
                bgcolor: isActive('/entrenados') ? '#c8e6e3' : 'transparent',
                '&:hover': {
                  bgcolor: '#b2dfdb',
                }
              }}
              onClick={() => handleNavigation('/entrenados')}
            >
              <ListItemIcon>
                <School sx={{ 
                  fontSize: 20, 
                  color: isActive('/entrenados') ? '#059669' : '#6b7280' 
                }} />
              </ListItemIcon>
              <ListItemText 
                primary="Entrenados" 
                sx={{
                  '& .MuiListItemText-primary': {
                    fontWeight: isActive('/entrenados') ? 600 : 400,
                    color: isActive('/entrenados') ? '#059669' : '#374151'
                  }
                }}
              />
            </ListItemButton>
            <ListItemButton 
              sx={{ 
                pl: 4,
                bgcolor: isActive('/sedes') ? '#c8e6e3' : 'transparent',
                '&:hover': {
                  bgcolor: '#b2dfdb',
                }
              }}
              onClick={() => handleNavigation('/sedes')}
            >
              <ListItemIcon>
                <LocationOn sx={{ 
                  fontSize: 20, 
                  color: isActive('/sedes') ? '#059669' : '#6b7280' 
                }} />
              </ListItemIcon>
              <ListItemText 
                primary="Sedes" 
                sx={{
                  '& .MuiListItemText-primary': {
                    fontWeight: isActive('/sedes') ? 600 : 400,
                    color: isActive('/sedes') ? '#059669' : '#374151'
                  }
                }}
              />
            </ListItemButton>
            <ListItemButton 
              sx={{ 
                pl: 4,
                bgcolor: isActive('/referidores') ? '#c8e6e3' : 'transparent',
                '&:hover': {
                  bgcolor: '#b2dfdb',
                }
              }}
              onClick={() => handleNavigation('/referidores')}
            >
              <ListItemIcon>
                <WorkOutline sx={{ 
                  fontSize: 20, 
                  color: isActive('/referidores') ? '#059669' : '#6b7280' 
                }} />
              </ListItemIcon>
              <ListItemText 
                primary="Referidores" 
                sx={{
                  '& .MuiListItemText-primary': {
                    fontWeight: isActive('/referidores') ? 600 : 400,
                    color: isActive('/referidores') ? '#059669' : '#374151'
                  }
                }}
              />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </Drawer>
  );
};

export default Sidebar;