const BASE_URL = 'https://api.patentsview.org/patents/query';

export const fetchPatents = async (query = '') => {
  const defaultQuery = {
    q: query || '*:*',
    f: [
      "patent_id",
      "patent_title",
      "patent_date",
      "abstract",
      "inventors"
    ],
    o: {
      "per_page": 50,
      "page": 1,
      "sort": [{"patent_date": "desc"}]
    }
  };

  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(defaultQuery),
    });

    if (!response.ok) throw new Error('Falha ao buscar patentes');
    
    const data = await response.json();
    return data.patents;
  } catch (error) {
    throw new Error(error.message);
  }
};