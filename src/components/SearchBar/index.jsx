import { TextField } from '@mui/material';
import { usePatentContext } from '../../context/PatentContext';
import { searchBarStyles } from './styles';

const SearchBar = () => {
  const { searchQuery, setSearchQuery } = usePatentContext();

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  return (
    <TextField
      fullWidth
      label="Search Patents"
      variant="outlined"
      value={searchQuery}
      onChange={handleSearchChange}
      sx={searchBarStyles.textField}
      error={searchQuery.length > 0 && searchQuery.length < 3}
      helperText={
        searchQuery.length > 0 && searchQuery.length < 3 
          ? "Digite pelo menos 3 caracteres" 
          : ""
      }
    />
  );
};

export default SearchBar;