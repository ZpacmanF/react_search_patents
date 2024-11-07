import { Card, CardContent, Typography } from '@mui/material';
import { cardStyles } from './styles';

const PatentCard = ({ patent, onClick }) => {
  return (
    <Card 
      sx={cardStyles.card}
      onClick={() => onClick(patent)}
    >
      <CardContent sx={cardStyles.content}>
        <Typography sx={cardStyles.title} variant="h6" component="div">
          {patent.patent_title}
        </Typography>
        <Typography sx={cardStyles.subtitle} variant="body2">
          ID: {patent.patent_id}
        </Typography>
        <Typography sx={cardStyles.subtitle} variant="body2">
          Data: {patent.patent_date}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PatentCard;
