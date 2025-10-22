import React, { useState } from 'react';
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
  StarBorder,
} from '@mui/icons-material';
import logoImage from '../../assets/images/logo.png';

const Sidebar = () => {
  const [openClientes, setOpenClientes] = useState(false);
  const [openAdministracion, setOpenAdministracion] = useState(true);

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
          <ListItemButton onClick={() => setOpenClientes(!openClientes)}>
            <ListItemIcon>
              <PersonOutline />
            </ListItemIcon>
            <ListItemText primary="Clientes" />
            {openClientes ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={openClientes} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {[1, 2, 3, 4].map((item) => (
              <ListItemButton key={item} sx={{ pl: 4 }}>
                <ListItemIcon>
                  <StarBorder sx={{ fontSize: 20 }} />
                </ListItemIcon>
                <ListItemText primary="List item" />
              </ListItemButton>
            ))}
          </List>
        </Collapse>

        {/* Referidores */}
        <ListItem disablePadding sx={{ mt: 1 }}>
          <ListItemButton>
            <ListItemIcon>
              <WorkOutline />
            </ListItemIcon>
            <ListItemText primary="Referidores" />
            <ExpandMore />
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
            <ListItemButton sx={{ pl: 4, bgcolor: '#c8e6e3' }}>
              <ListItemIcon>
                <StarBorder sx={{ fontSize: 20 }} />
              </ListItemIcon>
              <ListItemText primary="Afiliados" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <StarBorder sx={{ fontSize: 20 }} />
              </ListItemIcon>
              <ListItemText primary="Entrenadores" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <StarBorder sx={{ fontSize: 20 }} />
              </ListItemIcon>
              <ListItemText primary="Sedes" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </Drawer>
  );
};

export default Sidebar;