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
  People,
  FitnessCenter,
} from '@mui/icons-material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import MainLayout from '../../components/layout/MainLayout';
import { sedesData } from './sedesData';
import CrearSedeModal from '../../components/modals/CrearSedeModal';
import VerEntrenadoresSedeModal from '../../components/modals/VerEntrenadoresSedeModal';
import VerEntrenadorModal from '../../components/modals/VerEntrenadorModal';

// Configurar dayjs en español
dayjs.locale('es');

const Sedes = () => {
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [tipoFiltro, setTipoFiltro] = useState('Todos');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVerEntrenadoresModalOpen, setIsVerEntrenadoresModalOpen] = useState(false);
  const [isVerEntrenadorModalOpen, setIsVerEntrenadorModalOpen] = useState(false);
  const [selectedSede, setSelectedSede] = useState(null);
  const [selectedEntrenador, setSelectedEntrenador] = useState(null);

  // Función para manejar selección de todos los elementos
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const newSelected = sedesData.map((row) => row.id);
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
      'Nombre': row.nombre,
      'Dirección': row.direccion,
      'Ciudad': row.ciudad,
      'Teléfono': row.telefono,
      'Email': row.email,
      'Estado': row.estado,
      'Tipo': row.tipo,
      'Entrenadores': row.entrenadores,
      'Clientes': row.clientes,
      'Capacidad': row.capacidad
    }));

    // Crear el libro de trabajo
    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sedes');

    // Generar y descargar el archivo
    const fileName = `sedes_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(wb, fileName);
  };

  // Funciones para manejar el modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveSede = (sedeData) => {
    console.log('Nueva sede:', sedeData);
    // Aquí puedes agregar la lógica para guardar la sede
  };

  // Funciones para ver entrenadores de una sede
  const handleVerEntrenadoresSede = (sede) => {
    setSelectedSede(sede);
    setIsVerEntrenadoresModalOpen(true);
  };

  const handleCloseVerEntrenadoresModal = () => {
    setIsVerEntrenadoresModalOpen(false);
    setSelectedSede(null);
  };

  // Funciones para ver detalles de un entrenador específico
  const handleVerEntrenadorDetalle = (entrenador) => {
    setSelectedEntrenador(entrenador);
    setIsVerEntrenadorModalOpen(true);
    // Cerrar el modal de lista de entrenadores
    setIsVerEntrenadoresModalOpen(false);
  };

  const handleCloseVerEntrenadorModal = () => {
    setIsVerEntrenadorModalOpen(false);
    setSelectedEntrenador(null);
  };

  // Datos filtrados basados en el término de búsqueda y tipo
  const filteredData = useMemo(() => {
    return sedesData.filter((row) => {
      const matchesSearch = 
        row.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.direccion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.ciudad.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.estado.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTipo = tipoFiltro === 'Todos' || row.tipo === tipoFiltro;
      
      return matchesSearch && matchesTipo;
    });
  }, [searchTerm, tipoFiltro]);

  // Datos paginados
  const paginatedData = useMemo(() => {
    const startIndex = page * rowsPerPage;
    return filteredData.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredData, page, rowsPerPage]);

  // Función para obtener el color del estado
  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'Activa':
        return { bgcolor: '#dcfce7', color: '#166534' };
      case 'En Mantenimiento':
        return { bgcolor: '#fef3c7', color: '#92400e' };
      case 'Inactiva':
        return { bgcolor: '#fee2e2', color: '#991b1b' };
      default:
        return { bgcolor: '#f3f4f6', color: '#374151' };
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MainLayout breadcrumbs={['Dashboard', 'Administración', 'Sedes']}>
        <Box>
          {/* Header */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 500, color: '#1a1a1a' }}>
              Lista de Sedes
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
                placeholder="Buscar por sede, dirección, ciudad..."
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

              {/* Tipo de Sede */}
              <TextField
                select
                value={tipoFiltro}
                onChange={(e) => setTipoFiltro(e.target.value)}
                size="small"
                sx={{
                  flex: '1 1 150px',
                  '& .MuiOutlinedInput-root': {
                    bgcolor: 'white',
                    borderRadius: 2,
                  },
                }}
                label="Tipo"
              >
                <MenuItem value="Todos">Todos</MenuItem>
                <MenuItem value="Principal">Principal</MenuItem>
                <MenuItem value="Sucursal">Sucursal</MenuItem>
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
                    <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Sede</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Configuración</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Entrenadores</TableCell>
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
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <LocationOn sx={{ fontSize: 20, color: '#9333ea' }} />
                          </Box>
                          <Box>
                            <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                              {row.nombre}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                              <LocationOn sx={{ fontSize: 14, color: '#6b7280' }} />
                              <Typography variant="body2" sx={{ color: '#6b7280' }}>
                                {row.direccion}
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                              <Phone sx={{ fontSize: 14, color: '#6b7280' }} />
                              <Typography variant="body2" sx={{ color: '#6b7280' }}>
                                {row.telefono}
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Email sx={{ fontSize: 14, color: '#6b7280' }} />
                              <Typography variant="body2" sx={{ color: '#6b7280' }}>
                                {row.email}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
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
                      <TableCell>
                        <Button
                          variant="text"
                          size="small"
                          onClick={() => handleVerEntrenadoresSede(row)}
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
                          Ver
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
                Filas por página: {rowsPerPage}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="body2" sx={{ color: '#6b7280' }}>
                  1-{Math.min(rowsPerPage, filteredData.length)} de {filteredData.length}
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

        {/* Modal para crear sede */}
        <CrearSedeModal
          open={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveSede}
        />

        {/* Modal para ver entrenadores de una sede */}
        <VerEntrenadoresSedeModal
          open={isVerEntrenadoresModalOpen}
          onClose={handleCloseVerEntrenadoresModal}
          sede={selectedSede}
          onVerEntrenador={handleVerEntrenadorDetalle}
        />

        {/* Modal para ver detalles de un entrenador */}
        <VerEntrenadorModal
          open={isVerEntrenadorModalOpen}
          onClose={handleCloseVerEntrenadorModal}
          entrenador={selectedEntrenador}
        />
      </MainLayout>
    </LocalizationProvider>
  );
};

export default Sedes;