import { useEffect, useRef } from 'react';
import { 
  Container, 
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

  useEffect(() => {
    const getPatents = async () => {
      if (debouncedSearchQuery.length === 0 || debouncedSearchQuery.length >= 3) {
        setLoading(true);
        setError(null);
        try {
          const data = await fetchPatents(debouncedSearchQuery);
          setPatents(data);
          setPage(1);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
    };

    getPatents();
  }, [debouncedSearchQuery, setLoading, setError, setPatents, setPage]);

  useEffect(() => {
    const filtered = patents.filter(patent => 
      patent.patent_title.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    );

    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    paginatedPatentsRef.current = filtered.slice(start, end);

    totalPagesRef.current = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  }, [patents, debouncedSearchQuery, page]);

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <AppBar position="fixed">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 0, textAlign: 'center' }}>
            Patent Catalog
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
        </Toolbar>
      </AppBar>
      
      <Toolbar /> 

      <Container maxWidth={false} sx={{ py: 4, flex: 1, width: '100%' }}>
        <SearchBar />

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ minHeight: 'calc(100vh - 200px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 3 }}>
              {paginatedPatentsRef.current.map((patent) => (
                <Box key={patent.patent_id}>
                  <PatentCard 
                    patent={patent} 
                    onClick={() => setSelectedPatent(patent)}
                  />
                </Box>
              ))}
            </Box>

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
                    No Patents Found
                  </Typography>
                </Box>
              )}
            </>
          )}
        </Box>

        <PatentModal 
          patent={selectedPatent}
          open={Boolean(selectedPatent)}
          onClose={() => setSelectedPatent(null)}
        />
      </Container>

      <Box component="footer" sx={{ py: 3, bgcolor: 'background.paper', width: '100%' }}>
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            © 2024 Patent Catalog
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