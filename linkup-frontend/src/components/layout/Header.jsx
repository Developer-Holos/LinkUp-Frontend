import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Avatar, 
  Breadcrumbs, 
  Link, 
  Menu, 
  MenuItem, 
  ListItemIcon, 
  ListItemText,
  Divider,
  IconButton
} from '@mui/material';
import { 
  NavigateNext, 
  Person, 
  Settings, 
  Logout, 
  AccountCircle 
} from '@mui/icons-material';

const Header = ({ breadcrumbs, userName = "holos dev" }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    // Aquí puedes navegar a la página de perfil
    console.log('Navegar a perfil de usuario');
    handleClose();
  };

  const handleSettings = () => {
    // Aquí puedes navegar a configuraciones
    console.log('Navegar a configuraciones');
    handleClose();
  };

  const handleLogout = () => {
    // Aquí puedes manejar el cierre de sesión
    console.log('Cerrar sesión');
    // Ejemplo: localStorage.removeItem('token');
    // Ejemplo: navigate('/login');
    handleClose();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        py: 2,
        px: 4,
        borderBottom: '1px solid #e0e0e0',
        bgcolor: '#fafafa',
      }}
    >
      {/* Breadcrumbs */}
      <Breadcrumbs
        separator={<NavigateNext fontSize="small" />}
        sx={{ fontSize: '15px' }}
      >
        {breadcrumbs.map((crumb, index) => (
          <Link
            key={index}
            underline="hover"
            color="inherit"
            href="#"
            sx={{ color: index === breadcrumbs.length - 1 ? '#000' : '#666' }}
          >
            {crumb}
          </Link>
        ))}
      </Breadcrumbs>

      {/* User Avatar con menú desplegable */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <IconButton
          onClick={handleClick}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            p: 1,
            borderRadius: 2,
            '&:hover': {
              bgcolor: '#f0f0f0',
            },
          }}
          aria-controls={open ? 'user-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar
            sx={{
              bgcolor: '#9333ea',
              width: 40,
              height: 40,
              fontSize: '14px',
              fontWeight: 'bold',
            }}
          >
            OP
          </Avatar>
          <Typography variant="body2" sx={{ color: '#666' }}>
            {userName}
          </Typography>
        </IconButton>

        {/* Menú desplegable */}
        <Menu
          id="user-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 3,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
              mt: 1.5,
              minWidth: 200,
              borderRadius: 2,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {/* Header del menú con info del usuario */}
          <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid #f0f0f0' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Avatar
                sx={{
                  bgcolor: '#9333ea',
                  width: 40,
                  height: 40,
                  fontSize: '14px',
                  fontWeight: 'bold',
                }}
              >
                OP
              </Avatar>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  {userName}
                </Typography>
                <Typography variant="caption" sx={{ color: '#666' }}>
                  usuario@linkup.com
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Opciones del menú */}
          <MenuItem onClick={handleProfile} sx={{ py: 1.5 }}>
            <ListItemIcon>
              <Person sx={{ fontSize: 20, color: '#666' }} />
            </ListItemIcon>
            <ListItemText 
              primary="Mi Perfil" 
              primaryTypographyProps={{ fontSize: '14px' }}
            />
          </MenuItem>

          <MenuItem onClick={handleSettings} sx={{ py: 1.5 }}>
            <ListItemIcon>
              <Settings sx={{ fontSize: 20, color: '#666' }} />
            </ListItemIcon>
            <ListItemText 
              primary="Configuración" 
              primaryTypographyProps={{ fontSize: '14px' }}
            />
          </MenuItem>

          <Divider sx={{ my: 1 }} />

          <MenuItem 
            onClick={handleLogout} 
            sx={{ 
              py: 1.5,
              color: '#dc2626',
              '&:hover': {
                bgcolor: '#fef2f2',
              },
            }}
          >
            <ListItemIcon>
              <Logout sx={{ fontSize: 20, color: '#dc2626' }} />
            </ListItemIcon>
            <ListItemText 
              primary="Cerrar Sesión" 
              primaryTypographyProps={{ fontSize: '14px', color: '#dc2626' }}
            />
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Header;