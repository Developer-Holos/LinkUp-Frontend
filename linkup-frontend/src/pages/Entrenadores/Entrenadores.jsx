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
  Phone,
  Email,
} from '@mui/icons-material';

import MainLayout from '../../components/layout/MainLayout';
import { entrenadoresData } from './entrenadoresData';
import CrearEntrenadorModal from '../../components/modals/CrearEntrenadorModal';
import VerEntrenadorModal from '../../components/modals/VerEntrenadorModal';
import EditarEntrenadorModal from '../../components/modals/EditarEntrenadorModal';

const Entrenadores = () => {
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [sedeFilter, setSedeFilter] = useState('Todos');
  const [statusFilter, setStatusFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVerModalOpen, setIsVerModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEntrenador, setSelectedEntrenador] = useState(null);

  // Función para manejar selección de todos los elementos
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const newSelected = entrenadoresData.map((row) => row.id);
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
      'Entrenador': row.entrenador,
      'Sede': row.sede,
      'Email': row.email,
      'Teléfono': row.telefono,
      'Estado de Cuenta': row.accountStatus,
      'Especialidad': row.especialidad,
      'Experiencia': row.experiencia,
      'Certificaciones': row.certificaciones.join(', ')
    }));

    // Crear el libro de trabajo
    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Entrenadores');

    // Generar y descargar el archivo
    const fileName = `entrenadores_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(wb, fileName);
  };

  // Funciones para manejar el modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveEntrenador = (entrenadorData) => {
    console.log('Nuevo entrenador:', entrenadorData);
    // Aquí puedes agregar la lógica para guardar el entrenador
  };

  // Funciones para modal de ver entrenador
  const handleVerEntrenador = (entrenador) => {
    setSelectedEntrenador(entrenador);
    setIsVerModalOpen(true);
  };

  const handleCloseVerModal = () => {
    setIsVerModalOpen(false);
    setSelectedEntrenador(null);
  };

  // Funciones para modal de editar entrenador
  const handleEditarEntrenador = (entrenador) => {
    setSelectedEntrenador(entrenador);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedEntrenador(null);
  };

  const handleSaveEditEntrenador = (entrenadorActualizado) => {
    console.log('Entrenador actualizado:', entrenadorActualizado);
    // Aquí puedes agregar la lógica para actualizar el entrenador
    // Por ejemplo, actualizar el estado local o hacer una llamada a la API
  };

  // Datos filtrados basados en el término de búsqueda, sede y estado
  const filteredData = useMemo(() => {
    return entrenadoresData.filter((row) => {
      const matchesSearch = 
        row.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.entrenador.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.sede.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesSede = sedeFilter === 'Todos' || row.sede === sedeFilter;
      const matchesStatus = statusFilter === '' || row.accountStatus === statusFilter;
      
      return matchesSearch && matchesSede && matchesStatus;
    });
  }, [searchTerm, sedeFilter, statusFilter]);

  // Datos paginados
  const paginatedData = useMemo(() => {
    const startIndex = page * rowsPerPage;
    return filteredData.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredData, page, rowsPerPage]);

  // Función para obtener el color del estado
  const getAccountStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return { bgcolor: '#dcfce7', color: '#166534' };
      case 'Suspended':
        return { bgcolor: '#e0e7ff', color: '#3730a3' };
      case 'Inactive':
        return { bgcolor: '#fee2e2', color: '#991b1b' };
      default:
        return { bgcolor: '#f3f4f6', color: '#374151' };
    }
  };

  // Obtener sedes únicas para el filtro
  const sedesUnicas = [...new Set(entrenadoresData.map(item => item.sede))];

  return (
    <MainLayout breadcrumbs={['Dashboard', 'Administración', 'Entrenadores']}>
      <Box>
          {/* Header */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 500, color: '#1a1a1a' }}>
              Lista de Entrenadores
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
                  minWidth: 120,
                  '& .MuiOutlinedInput-root': {
                    bgcolor: 'white',
                    borderRadius: 2,
                  },
                }}
                label="Estado"
              >
                <MenuItem value="">Todos los estados</MenuItem>
                <MenuItem value="Active">Activo</MenuItem>
                <MenuItem value="Suspended">Suspendido</MenuItem>
                <MenuItem value="Inactive">Inactivo</MenuItem>
              </TextField>

              {/* Filtro de Sede */}
              <TextField
                select
                value={sedeFilter}
                onChange={(e) => setSedeFilter(e.target.value)}
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
                label="Sede"
              >
                <MenuItem value="Todos">Todos</MenuItem>
                {sedesUnicas.map((sede) => (
                  <MenuItem key={sede} value={sede}>
                    {sede}
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
                    <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Entrenador</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Sede</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Account status</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Configuración</TableCell>
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
                        <Typography variant="body2" sx={{ color: '#6b7280' }}>
                          {row.entrenador}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LocationOn sx={{ fontSize: 16, color: '#6b7280' }} />
                          <Typography variant="body2" sx={{ color: '#6b7280' }}>
                            {row.sede}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={row.accountStatus}
                          size="small"
                          sx={{
                            ...getAccountStatusColor(row.accountStatus),
                            fontWeight: 500,
                            borderRadius: 2,
                            fontSize: '12px',
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleEditarEntrenador(row)}
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

        {/* Modal para crear entrenador */}
        <CrearEntrenadorModal
          open={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveEntrenador}
        />

        {/* Modal para ver entrenador */}
        <VerEntrenadorModal
          open={isVerModalOpen}
          onClose={handleCloseVerModal}
          entrenador={selectedEntrenador}
        />

        {/* Modal para editar entrenador */}
        <EditarEntrenadorModal
          open={isEditModalOpen}
          onClose={handleCloseEditModal}
          onSave={handleSaveEditEntrenador}
          entrenador={selectedEntrenador}
        />
      </MainLayout>
  );
};

export default Entrenadores;