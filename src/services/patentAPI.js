const BASE_URL = 'https://api.patentsview.org/patents/query';

export const fetchPatents = async (query = '') => {
  // Configuração padrão para buscar todos os dados se não houver uma query específica
  const defaultQuery = {
    q: query ? { "_text_any": { "patent_title": query } } : { "_gte": { "patent_date": "2000-01-01" } },
    f: [
      "patent_id",
      "patent_title",
      "patent_date",
      "patent_abstract",
      "inventor_first_name",
      "inventor_last_name",
      "assignee_organization"
    ],
    o: {
      per_page: 50,
      page: 1,
      matched_subentities_only: true,
      sort: [{ "patent_date": "desc" }]
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
    return data.patents || [];
  } catch (error) {
    throw new Error(error.message);
  }
};