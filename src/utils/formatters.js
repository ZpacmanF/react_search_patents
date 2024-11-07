export const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };
  
  export const truncateText = (text, maxLength = 100) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };