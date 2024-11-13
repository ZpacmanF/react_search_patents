import { Modal, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const PatentModal = ({ patent, open, onClose }) => {
  if (!patent) return null;

  return (
    <Modal 
      open={open} 
      onClose={onClose}
      aria-labelledby="patent-modal-title"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: '90%', sm: 600 },
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
        maxHeight: '90vh',
        overflow: 'auto'
      }}>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography id="patent-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
          {patent.patent_title}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          ID: {patent.patent_id}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Data: {patent.patent_date}
        </Typography>

        {patent.patent_abstract && (
          <>
            <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: 'bold' }}>
              Resumo
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              {patent.patent_abstract}
            </Typography>
          </>
        )}

        {patent.inventors && patent.inventors.length > 0 && (
          <>
            <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: 'bold' }}>
              Inventores
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              {patent.inventors.map(inv => 
                `${inv.inventor_first_name} ${inv.inventor_last_name}`
              ).join(', ')}
            </Typography>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default PatentModal;