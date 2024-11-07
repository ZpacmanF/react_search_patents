import { useEffect, useRef } from 'react';
import { 
  Container, 
  Grid, 
  AppBar, 
  Typography, 
  Box, 
  Alert,
  Toolbar,
  Pagination,
  Stack
} from '@mui/material';
import { PatentProvider, usePatentContext } from './context/PatentContext';
import SearchBar from './components/SearchBar';
import PatentCard from './components/PatentCard';
import PatentModal from './components/PatentModal';
import LoadingSpinner from './components/LoadingSpinner';
import { fetchPatents } from './services/patentAPI';
import { useDebounce } from './hooks/useDebounce';

const ITEMS_PER_PAGE = 12;

const PatentCatalog = () => {
  const { 
    patents, 
    setPatents,
    loading, 
    setLoading,
    error, 
    setError,
    searchQuery,
    page,
    setPage,
    selectedPatent,
    setSelectedPatent
  } = usePatentContext();

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const paginatedPatentsRef = useRef([]);
  const totalPagesRef = useRef(0);

  // Fetch patents when search query changes
  useEffect(() => {
    const getPatents = async () => {
      if (debouncedSearchQuery.length === 0 || debouncedSearchQuery.length >= 3) {
        setLoading(true);
        setError(null);
        try {
          const data = await fetchPatents(debouncedSearchQuery);
          setPatents(data);
          setPage(1); // Reset to first page on new search
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
    };

    getPatents();
  }, [debouncedSearchQuery]);

  useEffect(() => {
    const filtered = patents.filter(patent => 
      patent.patent_title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    paginatedPatentsRef.current = filtered.slice(start, end);

    totalPagesRef.current = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  }, [patents, searchQuery, page]);

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Catálogo de Patentes
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Toolbar /> 

      <Container sx={{ py: 4, flex: 1 }}>
        <SearchBar />

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <Grid container spacing={3} sx={{ mb: 4 }}>
              {paginatedPatentsRef.current.map((patent) => (
                <Grid item xs={12} sm={6} md={4} key={patent.patent_id}>
                  <PatentCard 
                    patent={patent} 
                    onClick={() => setSelectedPatent(patent)}
                  />
                </Grid>
              ))}
            </Grid>

            {paginatedPatentsRef.current.length > 0 ? (
              <Stack spacing={2} alignItems="center">
                <Pagination 
                  count={totalPagesRef.current}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                  size="large"
                />
              </Stack>
            ) : (
              <Box textAlign="center" py={4}>
                <Typography variant="h6" color="text.secondary">
                  Nenhuma patente encontrada
                </Typography>
              </Box>
            )}
          </>
        )}

        <PatentModal 
          patent={selectedPatent}
          open={Boolean(selectedPatent)}
          onClose={() => setSelectedPatent(null)}
        />
      </Container>

      <Box component="footer" sx={{ py: 3, bgcolor: 'background.paper' }}>
        <Container>
          <Typography variant="body2" color="text.secondary" align="center">
            © 2024 Catálogo de Patentes
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

const App = () => {
  return (
    <PatentProvider>
      <PatentCatalog />
    </PatentProvider>
  );
};

export default App;