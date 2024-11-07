import { TextField } from '@mui/material';
import { usePatentContext } from '../../context/PatentContext';
import { searchBarStyles } from './styles';

const SearchBar = () => {
  const { searchQuery, setSearchQuery } = usePatentContext();

  return (
    <TextField
      fullWidth
      label="Pesquisar patentes"
      variant="outlined"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
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