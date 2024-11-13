import { Card, CardContent, Typography, Box } from '@mui/material';

const PatentCard = ({ patent, onClick }) => {
  return (
    <Card
      sx={{
        height: '100%',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: (theme) => theme.shadows[4],
        },
        display: 'flex',
        flexDirection: 'column',
      }}
      onClick={() => onClick(patent)}
    >
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Typography
          variant="h6"
          component="div"
          sx={{
            mb: 2,
            fontSize: '1.1rem',
            fontWeight: 600,
            color: 'primary.main',
          }}
        >
          {patent.patent_title}
        </Typography>
        <Box sx={{ mt: 'auto' }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: '0.9rem', mb: 0.5 }}
          >
            ID: {patent.patent_id}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: '0.9rem' }}
          >
            Data: {patent.patent_date}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PatentCard;