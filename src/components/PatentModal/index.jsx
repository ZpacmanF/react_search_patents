import { Modal, Box, Typography } from '@mui/material';
import { modalStyles } from './styles';

const PatentModal = ({ patent, open, onClose }) => {
  if (!patent) return null;

  const getInventorNames = (inventors) => {
    return inventors.map(inv => `${inv.inventor_first_name} ${inv.inventor_last_name}`).join(', ') || 'Não disponível';
  };

  return (
    <Modal 
      open={open} 
      onClose={onClose}
      aria-labelledby="patent-modal-title"
    >
      <Box sx={modalStyles.modal}>
        <Typography id="patent-modal-title" variant="h5" sx={modalStyles.title}>
          {patent.patent_title}
        </Typography>
        
        <Box sx={modalStyles.section}>
          <Typography sx={modalStyles.label}>ID da Patente</Typography>
          <Typography>{patent.patent_id}</Typography>
        </Box>
        
        <Box sx={modalStyles.section}>
          <Typography sx={modalStyles.label}>Data</Typography>
          <Typography>{patent.patent_date}</Typography>
        </Box>

        <Box sx={modalStyles.section}>
          <Typography sx={modalStyles.label}>Inventores</Typography>
          <Typography>
            {getInventorNames(patent.inventors)}
          </Typography>
        </Box>

        <Box sx={modalStyles.section}>
          <Typography sx={modalStyles.label}>Resumo</Typography>
          <Typography>
            {patent.patent_abstract || 'Resumo não disponível'}
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
};

export default PatentModal;