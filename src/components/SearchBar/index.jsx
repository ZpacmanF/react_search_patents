import React, { useRef, useState } from 'react';
import { Box, TextField, InputAdornment, Alert } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { usePatentContext } from '../../context/PatentContext';
import { useDebounce } from '../../hooks/useDebounce';

const SearchBar = () => {
  const searchRef = useRef('');
  const { setSearchQuery } = usePatentContext();
  const [error, setError] = useState('');

  const debouncedSearch = useDebounce((value) => {
    if (!value.trim()) {
      setError('The search field cannot be empty.');
    } else {
      setError('');
      setSearchQuery(value);
    }
  }, 300);

  const handleSearch = (event) => {
    const value = event.target.value;
    searchRef.current = value;
    debouncedSearch(value);
  };

  return (
    <Box sx={{ width: '100%', mb: 3 }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search patents..."
        onChange={handleSearch}
        error={!!error}
        helperText={error}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default SearchBar;