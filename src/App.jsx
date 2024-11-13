import { useEffect, useRef } from 'react';
import { 
  Container, 
  AppBar, 
  Typography, 
  Box, 
  Alert,
  Toolbar,
} from '@mui/material';
import { PatentProvider, usePatentContext } from './context/PatentContext';
import SearchBar from './components/SearchBar';
import PatentCard from './components/PatentCard';
import PatentModal from './components/PatentModal';
import LoadingSpinner from './components/LoadingSpinner';
import { fetchPatents } from './services/patentAPI';
import { usePatentSearch } from './hooks/usePatentSearch';

const PatentCatalog = () => {
  const { 
    patents, 
    setPatents,
    loading, 
    setLoading,
    error, 
    setError,
    selectedPatent,
    setSelectedPatent,
    searchQuery
  } = usePatentContext();

  const filteredPatents = usePatentSearch();

  console.log('Filtered Patents:', filteredPatents);
  console.log('Search Query:', searchQuery);

  useEffect(() => {
    const getPatents = async () => {
      console.log('Fetching patents...');
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPatents(searchQuery);
        console.log('Fetched data:', data);
        setPatents(data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    getPatents();
  }, [setLoading, setError, setPatents, searchQuery]);

  const handlePatentClick = (patent) => {
    console.log('Patent clicked:', patent);
    setSelectedPatent(patent);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Catálogo de Patentes
          </Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <SearchBar />
        
        {error && (
          <Alert severity="error" sx={{ my: 2 }}>
            {error}
          </Alert>
        )}

        {loading ? (
          <LoadingSpinner />
        ) : (
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: 3,
            mt: 4
          }}>
            {filteredPatents.map((patent) => (
              <PatentCard 
                key={patent.patent_id} 
                patent={patent}
                onClick={() => handlePatentClick(patent)}
              />
            ))}
          </Box>
        )}

        <PatentModal 
          patent={selectedPatent}
          open={Boolean(selectedPatent)}
          onClose={() => setSelectedPatent(null)}
        />
      </Container>
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