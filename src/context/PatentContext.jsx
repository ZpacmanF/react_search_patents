import { createContext, useContext, useState } from 'react';

const PatentContext = createContext();

export const PatentProvider = ({ children }) => {
  const [patents, setPatents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [selectedPatent, setSelectedPatent] = useState(null);

  const value = {
    patents,
    setPatents,
    loading,
    setLoading,
    error,
    setError,
    searchQuery,
    setSearchQuery,
    page,
    setPage,
    selectedPatent,
    setSelectedPatent,
  };

  return (
    <PatentContext.Provider value={value}>
      {children}
    </PatentContext.Provider>
  );
};

export { PatentContext };

export const usePatentContext = () => {
  return useContext(PatentContext);
};