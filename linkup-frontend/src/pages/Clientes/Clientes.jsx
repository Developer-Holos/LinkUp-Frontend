import React, { useState, useMemo } from 'react';
import * as XLSX from 'xlsx';
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
  MenuItem,
} from '@mui/material';
import {
  FilterList,
  LocationOn,
  Search,
  Phone,
  LocalHospital,
} from '@mui/icons-material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import MainLayout from '../../components/layout/MainLayout';
import { clientesData } from './clientesData';
import CrearClienteModal from '../../components/modals/CrearClienteModal';

// Configurar dayjs en español
dayjs.locale('es');

const Clientes = () => {
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [attributeFilter, setAttributeFilter] = useState('Todos');
  const [startDate, setStartDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Función para manejar selección de todos los elementos
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const newSelected = clientesData.map((row) => row.id);
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

  // Función para exportar datos a Excel
  const handleExport = () => {
    // Preparar los datos para exportar
    const dataToExport = filteredData.map(row => ({
      'Usuario': row.user,
      'Teléfono': row.phone,
      'Ubicación': row.location,
      'Centro Médico': row.medicalCenter,
      'Número de Terapias': row.numberOfTherapies,
      'Email': row.email,
      'Estado': row.estado,
      'Tipo': row.tipo
    }));

    // Crear el libro de trabajo
    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Clientes');

    // Generar y descargar el archivo
    const fileName = `clientes_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(wb, fileName);
  };

  // Funciones para manejar el modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveCliente = (clienteData) => {
    console.log('Nuevo cliente:', clienteData);
    // Aquí puedes agregar la lógica para guardar el cliente
  };

  // Datos filtrados basados en el término de búsqueda y atributo
  const filteredData = useMemo(() => {
    return clientesData.filter((row) => {
      const matchesSearch = 
        row.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.medicalCenter.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesAttribute = attributeFilter === 'Todos' || row.location === attributeFilter;
      
      return matchesSearch && matchesAttribute;
    });
  }, [searchTerm, attributeFilter]);

  // Datos paginados
  const paginatedData = useMemo(() => {
    const startIndex = page * rowsPerPage;
    return filteredData.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredData, page, rowsPerPage]);

  // Obtener ubicaciones únicas para el filtro
  const ubicacionesUnicas = [...new Set(clientesData.map(item => item.location))];

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MainLayout breadcrumbs={['Dashboard', 'Clientes']}>
        <Box>
          {/* Header */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 500, color: '#1a1a1a' }}>
              Lista de clientes
            </Typography>
          </Box>

          <Paper sx={{ p: 3, borderRadius: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            {/* Filtros */}
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                mb: 3,
                flexWrap: 'wrap',
                alignItems: 'flex-end',
              }}
            >
              {/* Search */}
              <TextField
                placeholder="Name, email, etc..."
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
                label="Search"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: '#666' }} />
                    </InputAdornment>
                  ),
                }}
              />

              {/* Start date */}
              <DatePicker
                label="Start date"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                slotProps={{
                  textField: {
                    size: 'small',
                    placeholder: 'MM/DD/YYYY',
                    sx: {
                      flex: '1 1 150px',
                      '& .MuiOutlinedInput-root': {
                        bgcolor: 'white',
                        borderRadius: 2,
                      },
                    },
                  },
                }}
                format="MM/DD/YYYY"
              />

              {/* Attribute Filter */}
              <TextField
                select
                value={attributeFilter}
                onChange={(e) => setAttributeFilter(e.target.value)}
                size="small"
                sx={{
                  minWidth: 120,
                  '& .MuiOutlinedInput-root': {
                    bgcolor: 'white',
                    borderRadius: 2,
                    color: '#06b6d4',
                    fontWeight: 600,
                  },
                }}
                label="Attribute"
              >
                <MenuItem value="Todos">Todos</MenuItem>
                {ubicacionesUnicas.map((ubicacion) => (
                  <MenuItem key={ubicacion} value={ubicacion}>
                    {ubicacion}
                  </MenuItem>
                ))}
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
                onClick={handleExport}
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
                onClick={handleOpenModal}
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
                    <TableCell sx={{ fontWeight: 600, color: '#374151' }}>User</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Phone</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Location</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Medical Center</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Number Of Therapies</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedData.map((row) => (
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
                        <Typography variant="body2" sx={{ fontWeight: 500, color: '#374151' }}>
                          {row.user}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Phone sx={{ fontSize: 16, color: '#6b7280' }} />
                          <Typography variant="body2" sx={{ color: '#6b7280' }}>
                            {row.phone}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LocationOn sx={{ fontSize: 16, color: '#6b7280' }} />
                          <Typography variant="body2" sx={{ color: '#6b7280' }}>
                            {row.location}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LocalHospital sx={{ fontSize: 16, color: '#6b7280' }} />
                          <Typography variant="body2" sx={{ color: '#6b7280' }}>
                            {row.medicalCenter}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ color: '#6b7280', textAlign: 'center' }}>
                          {row.numberOfTherapies}
                        </Typography>
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
                justifyContent: 'space-between',
                alignItems: 'center',
                mt: 2,
              }}
            >
              <Typography variant="body2" sx={{ color: '#6b7280' }}>
                Rows per page: {rowsPerPage}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="body2" sx={{ color: '#6b7280' }}>
                  1-{Math.min(rowsPerPage, filteredData.length)} of {filteredData.length}
                </Typography>
                <TablePagination
                  component="div"
                  count={filteredData.length}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  rowsPerPageOptions={[5, 10, 25]}
                  labelRowsPerPage=""
                  labelDisplayedRows={() => ''}
                  sx={{
                    '& .MuiTablePagination-toolbar': {
                      minHeight: 'auto',
                      paddingLeft: 0,
                      paddingRight: 0,
                    },
                    '& .MuiTablePagination-selectLabel': {
                      display: 'none',
                    },
                    '& .MuiTablePagination-select': {
                      display: 'none',
                    },
                    '& .MuiTablePagination-displayedRows': {
                      display: 'none',
                    },
                  }}
                />
              </Box>
            </Box>
          </Paper>
        </Box>

        {/* Modal para crear cliente */}
        <CrearClienteModal
          open={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveCliente}
        />
      </MainLayout>
    </LocalizationProvider>
  );
};

export default Clientes;