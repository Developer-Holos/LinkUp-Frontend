import React from 'react';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import Header from './Header';

const MainLayout = ({ children, breadcrumbs }) => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Header breadcrumbs={breadcrumbs} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 4,
            bgcolor: '#f5f5f5',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;