export const cardStyles = {
    card: {
      height: '100%',
      cursor: 'pointer',
      '&:hover': { 
        transform: 'scale(1.02)',
        boxShadow: 3,
      },
      transition: 'transform 0.2s, box-shadow 0.2s',
    },
    content: {
      padding: 2,
    },
    title: {
      mb: 1,
      fontSize: '1.1rem',
      fontWeight: 'bold',
    },
    subtitle: {
      color: 'text.secondary',
      fontSize: '0.9rem',
    },
  };
  