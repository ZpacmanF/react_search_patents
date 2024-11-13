import { useMemo, useContext } from 'react';
import { PatentContext } from '../context/PatentContext';

export const usePatentSearch = () => {
  const { patents, searchQuery } = useContext(PatentContext);

  const filteredPatents = useMemo(() => {
    if (!searchQuery) return patents;
    
    return patents.filter((patent) =>
      patent.patent_title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [patents, searchQuery]);

  return filteredPatents;
};