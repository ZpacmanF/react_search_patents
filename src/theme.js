import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1B3F8B',
      light: '#435EA3',
      dark: '#122C61',
    },
    secondary: {
      main: '#626879',
      light: '#7D8293',
      dark: '#4A4F5C',
    },
    background: {
      default: '#F5F7FA',
      paper: '#FFFFFF',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1B3F8B',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#FFFFFF',
            '&:hover fieldset': {
              borderColor: '#1B3F8B',
            },
          },
        },
      },
    },
  },
});

export default theme;