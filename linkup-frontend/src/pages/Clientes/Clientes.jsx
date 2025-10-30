import React, { useState, useMemo, useEffect } from 'react';
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
  LinearProgress,
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
// import { clientesData } from './clientesData';
import CrearClienteModal from '../../components/modals/CrearClienteModal';
import { useSearchParams } from 'react-router-dom';

// Configurar dayjs en español
dayjs.locale('es');

// Lista estática de etapas con sus IDs (nombre y valor)
const STAGES = [
  { name: 'Lead information', id: 73075903 },
  { name: 'Initial contact', id: 73074731 },
  { name: 'Pending verification', id: 76855675 },
  { name: 'Qualified lead', id: 73074735 },
  { name: 'Attorney assigment', id: 73074739 },
  { name: 'Signed case', id: 73074743 },
  { name: 'Asigned medical center', id: 73075907 },
  { name: '1st Appt schedule w/ Med. Center', id: 73075911 },
  { name: 'therapy follow up', id: 73075915 },
  { name: 'active', id: 79829423 },
  { name: 'caution', id: 79829011 },
  { name: 'inactive', id: 79829427 },
  { name: 'finalized', id: 73075919 },
  { name: 'fl attorney validation', id: 76849839 },
  { name: 'other states validation', id: 76670511 },
  { name: 'closed won', id: 142 },
  { name: 'closed lost', id: 143 },
];

const status_id_TO_NAME = Object.fromEntries(STAGES.map(s => [String(s.id), s.name]));

const Clientes = () => {
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [attributeFilter, setAttributeFilter] = useState('Todos');
  const [startDate, setStartDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clientesData, setClientesData] = useState([]);
  const [stageIdFilter, setStageIdFilter] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);


  useEffect(()=>{
    const fetchClientes = async () => {
      try {
        setLoading(true);
        const isSearching = (searchTerm ?? '').trim().length > 0;
        const url = isSearching
          ? '/superadmin/clientes'
          : (stageIdFilter
              ? `/superadmin/clientes?status_id=${encodeURIComponent(stageIdFilter)}`
              : '/superadmin/clientes');
        const response = await fetch(url, { credentials: 'include' });
        const {leads} = await response.json();
        
        
        console.log(`leads: ${leads}`)

        // Mapear a la estructura usada por la tabla
        const mapped = leads.map((item, idx) => {
          const fullName = [item.first_name, item.last_name].filter(Boolean).join(' ');
          const user = item.name ?? '';
          const phone = item.custom_fields_values?.find((cfv)=>cfv.field_id === 981772)?.values?.[0]?.value ?? ''
          const location = item.custom_fields_values?.find((cfv)=>cfv.field_id === 978440)?.values?.[0]?.value ?? ''
          const medicalCenter = item.custom_fields_values?.find((cfv)=>cfv.field_id === 978474)?.values?.[0]?.value ?? ''
          const numberOfTherapies = item.custom_fields_values?.find((cfv)=>cfv.field_id === 988836)?.values?.[0]?.value ?? ''
          const email = item.email ?? item.correo ?? item.email_address ?? '';
          const stage = item.stage ?? item.etapa ?? item.status ?? item.estado ?? item.leadStage ?? item.lead_stage ?? item.status_name ?? '';
          const stageId = item.status_id ?? null;
          return {
            id: item.id ?? item._id ?? idx,
            user,
            phone,
            location,
            medicalCenter,
            numberOfTherapies,
            email,
            stage,
            stageId,
            estado: item.estado ?? item.status ?? '',
            tipo: item.tipo ?? item.type ?? ''
          };
        });
        setClientesData(mapped);
      } catch (error) {
        console.error('Error fetching clientes:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchClientes();
  },[stageIdFilter, searchTerm])

  // Leer status_id de la URL y preseleccionar nombre y ID
  useEffect(() => {
    const stageIdFromUrl = searchParams.get('status_id');
    if (stageIdFromUrl) {
      const name = status_id_TO_NAME[String(stageIdFromUrl)];
      if (name) {
        setAttributeFilter(name);
        setStageIdFilter(String(stageIdFromUrl));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Escribir status_id en la URL cuando cambia el select “Etapas”
  useEffect(() => {
    const currentId = searchParams.get('status_id');
    const params = new URLSearchParams(searchParams);
    if (stageIdFilter) {
      if (String(stageIdFilter) !== currentId) {
        params.set('status_id', String(stageIdFilter));
        setSearchParams(params);
      }
    } else if (currentId !== null) {
      params.delete('status_id');
      setSearchParams(params);
    }
  }, [stageIdFilter, searchParams, setSearchParams]);


  // Función para manejar selección de todos los elementos
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const newSelected = clientesData.map((row) => row.id);
      console.log(newSelected)
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
        String(row.user || '').toLowerCase().includes(String(searchTerm || '').toLowerCase()) ||
        String(row.phone || '').toLowerCase().includes(String(searchTerm || '').toLowerCase()) ||
        String(row.location || '').toLowerCase().includes(String(searchTerm || '').toLowerCase()) ||
        String(row.medicalCenter || '').toLowerCase().includes(String(searchTerm || '').toLowerCase());

      const isSearching = String(searchTerm || '').trim().length > 0;
      // Si se está buscando, no aplicamos filtro de etapa (equivale a "Todos")
      const matchesStage = isSearching
        ? true
        : (stageIdFilter
            ? String(row.stageId ?? '') === String(stageIdFilter)
            : (attributeFilter === 'Todos' || row.stage === attributeFilter));

      return matchesSearch && matchesStage;
    });
  }, [clientesData, searchTerm, attributeFilter, stageIdFilter]);

  // Datos paginados
  const paginatedData = useMemo(() => {
    const startIndex = page * rowsPerPage;
    return filteredData.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredData, page, rowsPerPage]);

  // Obtener etapas únicas para el filtro (estáticas + dinámicas)
  const etapasUnicas = Array.from(new Set([
    ...STAGES.map(s => s.name),
    ...((clientesData || []).map(item => item.stage).filter(Boolean))
  ]));

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
              {/* <TextField
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
                label="Atributte"
              >
                <MenuItem value="Todos">Todos</MenuItem>
                {etapasUnicas.map((etapa) => (
                  <MenuItem key={etapa} value={etapa}>
                    {etapa}
                  </MenuItem>
                ))}
              </TextField> */}

              {/* Segundo select: Etapas (valor=ID, escribe status_id en URL) */}
              <TextField
                select
                value={stageIdFilter || 'Todos'}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === 'Todos') {
                    setStageIdFilter('');
                    setAttributeFilter('Todos');
                  } else {
                    setStageIdFilter(String(val));
                    const name = status_id_TO_NAME[String(val)];
                    if (name) setAttributeFilter(name);
                  }
                }}
                size="small"
                sx={{
                  minWidth: 150,
                  '& .MuiOutlinedInput-root': {
                    bgcolor: 'white',
                    borderRadius: 2,
                  },
                }}
                label="Etapas"
              >
                <MenuItem value="Todos">Todos</MenuItem>
                {STAGES.map(({ name, id }) => (
                  <MenuItem key={id} value={String(id)}>
                    {name}
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

            {/* Indicador de carga mientras se traen nuevos resultados */}
            {loading && (
              <Box sx={{ mb: 2 }}>
                <LinearProgress />
              </Box>
            )}

            {/* Tabla */}
            <TableContainer sx={{ borderRadius: 2, border: '1px solid #f0f0f0', opacity: loading ? 0.6 : 1, transition: 'opacity 150ms ease' }} aria-busy={loading}>
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
                  {paginatedData.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} sx={{ textAlign: 'center', color: '#6b7280' }}>
                        No hay datos para mostrar
                      </TableCell>
                    </TableRow>
                  ) : paginatedData.map((row) => (
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