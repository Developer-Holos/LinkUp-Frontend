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
  Tooltip,
} from '@mui/material';
import {
  FilterList,
  Search,
  Email,
  Edit,
  PersonOff,
} from '@mui/icons-material';
import MainLayout from '../../components/layout/MainLayout';
import { entrenadosData } from './entrenadosData';
import CrearEntrenadoModal from '../../components/modals/CrearEntrenadoModal';
import EditarEntrenadoModal from '../../components/modals/EditarEntrenadoModal';
import EliminarEntrenadoModal from '../../components/modals/EliminarEntrenadoModal';

const Entrenados = () => {
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sedeFilter, setSedeFilter] = useState('');
  const [entrenadorFilter, setEntrenadorFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isVerModalOpen, setIsVerModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEntrenado, setSelectedEntrenado] = useState(null);

  // Función para manejar selección de todos los elementos
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const newSelected = entrenadosData.map((row) => row.id);
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
    const dataToExport = filteredData.map(row => ({
      'Nombre': row.nombre,
      'Email': row.email,
      'Sede': row.sede,
      'Estado': row.status,
      'Entrenador': row.entrenador
    }));

    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Entrenados');

    const fileName = `entrenados_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(wb, fileName);
  };

  // Funciones para manejar modales
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveEntrenado = (entrenadoData) => {
    console.log('Nuevo entrenado:', entrenadoData);
    // Aquí puedes agregar la lógica para guardar el entrenado
  };

  // Funciones para modal de ver entrenado
  const handleVerEntrenado = (entrenado) => {
    setSelectedEntrenado(entrenado);
    setIsVerModalOpen(true);
  };

  const handleCloseVerModal = () => {
    setIsVerModalOpen(false);
    setSelectedEntrenado(null);
  };

  // Funciones para modal de editar entrenado
  const handleEditarEntrenado = (entrenado) => {
    setSelectedEntrenado(entrenado);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedEntrenado(null);
  };

  const handleSaveEditEntrenado = (entrenadoActualizado) => {
    console.log('Entrenado actualizado:', entrenadoActualizado);
    // Aquí puedes agregar la lógica para actualizar el entrenado
  };

  // Función para eliminar entrenado
  const handleEliminarEntrenado = (entrenado) => {
    setSelectedEntrenado(entrenado);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedEntrenado(null);
  };

  const handleConfirmDelete = () => {
    console.log('Eliminar entrenado:', selectedEntrenado);
    // Aquí puedes agregar la lógica para eliminar el entrenado
    setIsDeleteModalOpen(false);
    setSelectedEntrenado(null);
  };

  // Datos filtrados
  const filteredData = useMemo(() => {
    return entrenadosData.filter((row) => {
      const matchesSearch = 
        row.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.entrenador.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.sede.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === '' || row.status === statusFilter;
      const matchesSede = sedeFilter === '' || row.sede === sedeFilter;
      const matchesEntrenador = entrenadorFilter === '' || row.entrenador === entrenadorFilter;
      
      return matchesSearch && matchesStatus && matchesSede && matchesEntrenador;
    });
  }, [searchTerm, statusFilter, sedeFilter, entrenadorFilter]);

  // Datos paginados
  const paginatedData = useMemo(() => {
    const startIndex = page * rowsPerPage;
    return filteredData.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredData, page, rowsPerPage]);

  // Obtener entrenadores y sedes únicos para los filtros
  const entrenadoresUnicos = [...new Set(entrenadosData.map(item => item.entrenador))];
  const sedesUnicas = [...new Set(entrenadosData.map(item => item.sede))];

  // Función para obtener el color del estado
  const getStatusColor = (status) => {
    switch (status) {
      case 'Activo':
        return { bgcolor: '#dcfce7', color: '#166534' };
      case 'Inactivo':
        return { bgcolor: '#fee2e2', color: '#991b1b' };
      case 'Suspendido':
        return { bgcolor: '#e0e7ff', color: '#3730a3' };
      case 'En Pausa':
        return { bgcolor: '#fef3c7', color: '#92400e' };
      default:
        return { bgcolor: '#f3f4f6', color: '#374151' };
    }
  };

  return (
    <MainLayout breadcrumbs={['Dashboard', 'Gestión', 'Entrenados']}>
      <Box>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 500, color: '#1a1a1a' }}>
            Lista de Entrenados
          </Typography>
          <Typography variant="body2" sx={{ color: '#666', mt: 1 }}>
            Gestiona los entrenados asignados a cada entrenador
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
            {/* Búsqueda general */}
            <TextField
              placeholder="Buscar por nombre, email, sede..."
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                flex: '1 1 250px',
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
              <MenuItem value="Activo">Activo</MenuItem>
              <MenuItem value="Inactivo">Inactivo</MenuItem>
              <MenuItem value="Suspendido">Suspendido</MenuItem>
              <MenuItem value="En Pausa">En Pausa</MenuItem>
            </TextField>

            {/* Filtro por Sede */}
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
                },
              }}
              label="Sede"
            >
              <MenuItem value="">Todas las sedes</MenuItem>
              {sedesUnicas.map((sede) => (
                <MenuItem key={sede} value={sede}>
                  {sede}
                </MenuItem>
              ))}
            </TextField>

            {/* Filtro por Entrenador */}
            <TextField
              select
              value={entrenadorFilter}
              onChange={(e) => setEntrenadorFilter(e.target.value)}
              size="small"
              sx={{
                minWidth: 150,
                '& .MuiOutlinedInput-root': {
                  bgcolor: 'white',
                  borderRadius: 2,
                },
              }}
              label="Entrenador"
            >
              <MenuItem value="">Todos los entrenadores</MenuItem>
              {entrenadoresUnicos.map((entrenador) => (
                <MenuItem key={entrenador} value={entrenador}>
                  {entrenador}
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
                bgcolor: '#10b981',
                borderRadius: 2,
                '&:hover': {
                  bgcolor: '#059669',
                },
              }}
            >
              Crear Entrenado
            </Button>
          </Box>

          {/* Tabla */}
          <TableContainer sx={{ borderRadius: 2, border: '1px solid #e5e7eb' }}>
            <Table>
              <TableHead sx={{ bgcolor: '#f9fafb' }}>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      indeterminate={selected.length > 0 && selected.length < entrenadosData.length}
                      checked={entrenadosData.length > 0 && selected.length === entrenadosData.length}
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Entrenado</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Sede</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Entrenador</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Estado</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedData.map((row) => (
                  <TableRow 
                    key={row.id} 
                    hover
                    sx={{ 
                      '&:hover': { bgcolor: '#f9fafb' },
                      cursor: 'pointer'
                    }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selected.indexOf(row.id) !== -1}
                        onChange={() => handleSelectOne(row.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar 
                          sx={{ 
                            width: 40, 
                            height: 40, 
                            bgcolor: '#10b981',
                            fontSize: '14px'
                          }}
                        >
                          {row.nombre.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 500, color: '#1f2937' }}>
                            {row.nombre}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                            <Email sx={{ fontSize: 14, color: '#6b7280' }} />
                            <Typography variant="caption" sx={{ color: '#6b7280' }}>
                              {row.email}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {row.sede}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {row.entrenador}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={row.status}
                        size="small"
                        sx={{
                          ...getStatusColor(row.status),
                          fontWeight: 500,
                          minWidth: 80,
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="Editar">
                          <IconButton 
                            size="small" 
                            onClick={() => handleEditarEntrenado(row)}
                            sx={{ color: '#059669' }}
                          >
                            <Edit fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Eliminar">
                          <IconButton 
                            size="small" 
                            onClick={() => handleEliminarEntrenado(row)}
                            sx={{ color: '#dc2626' }}
                          >
                            <PersonOff fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Paginación */}
          <Box sx={{ mt: 2 }}>
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
                `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`
              }
            />
          </Box>
        </Paper>

        {/* Modales */}
        <CrearEntrenadoModal
          open={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveEntrenado}
        />

        <EditarEntrenadoModal
          open={isEditModalOpen}
          onClose={handleCloseEditModal}
          onSave={handleSaveEditEntrenado}
          entrenado={selectedEntrenado}
        />

        <EliminarEntrenadoModal
          open={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          onConfirm={handleConfirmDelete}
          entrenado={selectedEntrenado}
        />
      </Box>
    </MainLayout>
  );
};

export default Entrenados;