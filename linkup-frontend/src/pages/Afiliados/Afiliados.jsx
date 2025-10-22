import React, { useState, useMemo } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Chip,
  IconButton,
  TablePagination,
  InputAdornment,
  Avatar,
  MenuItem,
} from '@mui/material';
import {
  FilterList,
  LocationOn,
  Search,
} from '@mui/icons-material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import MainLayout from '../../components/layout/MainLayout';
import { afiliadosData } from './afiliadosData';

// Configurar dayjs en español
dayjs.locale('es');

const Afiliados = () => {
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [attribute, setAttribute] = useState('Property');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Función para manejar selección de todos los elementos
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const newSelected = afiliadosData.map((row) => row.id);
      setSelected(newSelected);
    } else {
      setSelected([]);
    }
  };

  // Función para manejar selección individual
  const handleSelectOne = (id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  // Función para cambiar página
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Función para cambiar filas por página
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Datos filtrados basados en el término de búsqueda
  const filteredData = useMemo(() => {
    return afiliadosData.filter((row) =>
      row.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Datos paginados
  const paginatedData = useMemo(() => {
    const startIndex = page * rowsPerPage;
    return filteredData.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredData, page, rowsPerPage]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MainLayout breadcrumbs={['Dashboard', 'Administracion', 'Afiliados']}>
        <Box>
          {/* Header con Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
            <Avatar
              src="/src/assets/images/linkup-logo.png"
              alt="LinkUp Logo"
              sx={{
                width: 56,
                height: 56,
                bgcolor: '#9333ea',
                '& img': {
                  objectFit: 'contain',
                },
              }}
            >
              L
            </Avatar>
            <Typography variant="h4" sx={{ fontWeight: 500, color: '#1a1a1a' }}>
              Lista de Afiliados
            </Typography>
          </Box>

          <Paper sx={{ p: 3, borderRadius: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            {/* Filtros mejorados */}
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                mb: 3,
                flexWrap: 'wrap',
                alignItems: 'flex-end',
              }}
            >
              {/* Search mejorado */}
              <TextField
                placeholder="Buscar por nombre, email, etc..."
                variant="outlined"
                size="small"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{
                  flex: '1 1 200px',
                  '& .MuiOutlinedInput-root': {
                    bgcolor: 'white',
                    borderRadius: 2,
                  },
                }}
                label="Buscar"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: '#666' }} />
                    </InputAdornment>
                  ),
                }}
              />

              {/* Fecha Inicio */}
              <DatePicker
                label="Fecha inicio"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                slotProps={{
                  textField: {
                    size: 'small',
                    sx: {
                      flex: '1 1 150px',
                      '& .MuiOutlinedInput-root': {
                        bgcolor: 'white',
                        borderRadius: 2,
                      },
                    },
                  },
                }}
              />

              {/* Fecha Fin */}
              <DatePicker
                label="Fecha fin"
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
                slotProps={{
                  textField: {
                    size: 'small',
                    sx: {
                      flex: '1 1 150px',
                      '& .MuiOutlinedInput-root': {
                        bgcolor: 'white',
                        borderRadius: 2,
                      },
                    },
                  },
                }}
              />

              {/* Attribute */}
              <TextField
                select
                value={attribute}
                onChange={(e) => setAttribute(e.target.value)}
                size="small"
                sx={{
                  flex: '1 1 200px',
                  '& .MuiOutlinedInput-root': {
                    bgcolor: 'white',
                    borderRadius: 2,
                  },
                }}
                label="Atributo"
              >
                <MenuItem value="Property">Propiedad</MenuItem>
                <MenuItem value="Status">Estado</MenuItem>
                <MenuItem value="Location">Ubicación</MenuItem>
              </TextField>

              {/* Filter Button */}
              <IconButton
                sx={{
                  bgcolor: 'white',
                  border: '1px solid #e0e0e0',
                  borderRadius: 2,
                  '&:hover': {
                    bgcolor: '#f5f5f5',
                  },
                }}
              >
                <FilterList />
              </IconButton>

              {/* Buttons */}
              <Button
                variant="outlined"
                sx={{
                  textTransform: 'none',
                  borderColor: '#e0e0e0',
                  color: '#666',
                  borderRadius: 2,
                  '&:hover': {
                    borderColor: '#9333ea',
                    color: '#9333ea',
                  },
                }}
              >
                Exportar
              </Button>
              <Button
                variant="contained"
                sx={{
                  textTransform: 'none',
                  bgcolor: '#9333ea',
                  borderRadius: 2,
                  '&:hover': {
                    bgcolor: '#7e22ce',
                  },
                }}
              >
                Nuevo
              </Button>
            </Box>

            {/* Tabla */}
            <TableContainer sx={{ borderRadius: 2, border: '1px solid #f0f0f0' }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: '#f8f9fa' }}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selected.length === filteredData.length && filteredData.length > 0}
                        indeterminate={
                          selected.length > 0 &&
                          selected.length < filteredData.length
                        }
                        onChange={handleSelectAll}
                        sx={{
                          color: '#9333ea',
                          '&.Mui-checked': {
                            color: '#9333ea',
                          },
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Usuario</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Email</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Ubicación</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Estado</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Configuración</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedData.map((row, index) => (
                    <TableRow
                      key={row.id}
                      hover
                      sx={{ 
                        '&:last-child td, &:last-child th': { border: 0 },
                        '&:hover': {
                          bgcolor: '#f9fafb',
                        },
                      }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selected.indexOf(row.id) !== -1}
                          onChange={() => handleSelectOne(row.id)}
                          sx={{
                            color: '#9333ea',
                            '&.Mui-checked': {
                              color: '#9333ea',
                            },
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar 
                            sx={{ 
                              width: 32, 
                              height: 32, 
                              bgcolor: '#9333ea',
                              fontSize: '14px',
                              fontWeight: 600,
                            }}
                          >
                            {row.user.charAt(0).toUpperCase()}
                          </Avatar>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {row.user}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ color: '#6b7280' }}>
                          {row.email}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LocationOn sx={{ fontSize: 18, color: '#9333ea' }} />
                          <Typography variant="body2" sx={{ color: '#6b7280' }}>
                            {row.location}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={row.status}
                          size="small"
                          sx={{
                            bgcolor: row.status === 'Active' ? '#dcfce7' : '#fef3c7',
                            color: row.status === 'Active' ? '#166534' : '#92400e',
                            fontWeight: 500,
                            borderRadius: 2,
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          size="small"
                          sx={{
                            textTransform: 'none',
                            fontSize: '12px',
                            fontWeight: 600,
                            borderColor: '#06b6d4',
                            color: '#06b6d4',
                            borderRadius: 2,
                            '&:hover': {
                              borderColor: '#0891b2',
                              bgcolor: '#f0fdff',
                            },
                          }}
                        >
                          Editar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Paginación */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                mt: 2,
              }}
            >
              <TablePagination
                component="div"
                count={filteredData.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
                labelRowsPerPage="Filas por página:"
                labelDisplayedRows={({ from, to, count }) =>
                  `${from}-${to} de ${count}`
                }
                sx={{
                  '& .MuiTablePagination-selectLabel': {
                    color: '#6b7280',
                  },
                  '& .MuiTablePagination-displayedRows': {
                    color: '#6b7280',
                  },
                }}
              />
            </Box>
          </Paper>
        </Box>
      </MainLayout>
    </LocalizationProvider>
  );
};

export default Afiliados;