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
  Avatar,
  MenuItem,
} from '@mui/material';
import {
  FilterList,
  LocationOn,
  Search,
} from '@mui/icons-material';

import MainLayout from '../../components/layout/MainLayout';
import { afiliadosData } from './afiliadosData';
import CrearAfiliadoModal from '../../components/modals/CrearAfiliadoModal';
import EditarAfiliadoModal from '../../components/modals/EditarAfiliadoModal';

const Afiliados = () => {
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAfiliado, setSelectedAfiliado] = useState(null);

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

  // Función para exportar datos a Excel
  const handleExport = () => {
    // Preparar los datos para exportar
    const dataToExport = filteredData.map(row => ({
      'Usuario': row.user,
      'Email': row.email,
      'Ubicación': row.location,
      'Estado': row.status
    }));

    // Crear el libro de trabajo
    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Afiliados');

    // Generar y descargar el archivo
    const fileName = `afiliados_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(wb, fileName);
  };

  // Funciones para manejar el modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveAfiliado = (afiliadoData) => {
    console.log('Nuevo afiliado:', afiliadoData);
    // Aquí puedes agregar la lógica para guardar el afiliado
  };

  // Funciones para modal de editar afiliado
  const handleEditarAfiliado = (afiliado) => {
    setSelectedAfiliado(afiliado);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedAfiliado(null);
  };

  const handleSaveEditAfiliado = (afiliadoActualizado) => {
    console.log('Afiliado actualizado:', afiliadoActualizado);
    // Aquí puedes agregar la lógica para actualizar el afiliado
  };

  // Datos filtrados basados en el término de búsqueda y estado
  const filteredData = useMemo(() => {
    return afiliadosData.filter((row) => {
      const matchesSearch = searchTerm === '' || 
        row.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.status.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === '' || row.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  // Datos paginados
  const paginatedData = useMemo(() => {
    const startIndex = page * rowsPerPage;
    return filteredData.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredData, page, rowsPerPage]);

  return (
    <MainLayout breadcrumbs={['Dashboard', 'Administracion', 'Afiliados']}>
      <Box>
          {/* Header */}
          <Box sx={{ mb: 4 }}>
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

              {/* Filtro por Estado */}
              <TextField
                select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                size="small"
                sx={{
                  flex: '1 1 200px',
                  '& .MuiOutlinedInput-root': {
                    bgcolor: 'white',
                    borderRadius: 2,
                  },
                }}
                label="Filtrar por Estado"
              >
                <MenuItem value="">Todos los estados</MenuItem>
                <MenuItem value="Activo">Activo</MenuItem>
                <MenuItem value="Inactivo">Inactivo</MenuItem>
                <MenuItem value="Pendiente">Pendiente</MenuItem>
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
                          onClick={() => handleEditarAfiliado(row)}
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

        {/* Modal para crear afiliado */}
        <CrearAfiliadoModal
          open={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveAfiliado}
        />

        {/* Modal para editar afiliado */}
        <EditarAfiliadoModal
          open={isEditModalOpen}
          onClose={handleCloseEditModal}
          onSave={handleSaveEditAfiliado}
          afiliado={selectedAfiliado}
        />
      </MainLayout>
  );
};

export default Afiliados;