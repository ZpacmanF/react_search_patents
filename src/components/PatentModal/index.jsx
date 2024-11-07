import { Modal, Box, Typography } from '@mui/material';
import { modalStyles } from './styles';

const PatentModal = ({ patent, open, onClose }) => {
  if (!patent) return null;

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
            {patent.inventors?.map(inv => inv.inventor_name).join(', ') || 'Não disponível'}
          </Typography>
        </Box>

        <Box sx={modalStyles.section}>
          <Typography sx={modalStyles.label}>Resumo</Typography>
          <Typography>
            {patent.abstract || 'Resumo não disponível'}
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
};

export default PatentModal;
