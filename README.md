# Patent Catalog

**Patent Catalog** é uma aplicação web que permite pesquisar, visualizar e filtrar patentes utilizando a [PatentsView API](https://patentsview.org/apis/purpose). A aplicação faz uso da **Context API** do React para gerenciamento de estado e utiliza **Material-UI** para a interface do usuário.

## Funcionalidades

- **Busca de Patentes:** Realize buscas por título de patente. A pesquisa é realizada com parâmetros enviados para a API PatentsView.
- **Validação de Campos:** Campos obrigatórios na busca são validados antes de enviar os dados.
- **Paginamento:** A navegação entre os resultados das patentes é feita com paginação.
- **Modais de Detalhes:** Ao clicar em uma patente, um modal exibe informações detalhadas sobre ela.
- **Feedback de Erros:** Mensagens de erro são apresentadas para indicar problemas com a busca ou com a API.

## Tecnologias Utilizadas

- **React.js:** Biblioteca principal para o desenvolvimento da interface de usuário.
- **Material-UI:** Biblioteca de componentes React para criar a interface de forma rápida e bonita.
- **Context API:** Gerenciamento de estado compartilhado entre componentes.
- **useRef:** Usado para armazenar referências de elementos DOM de forma persistente entre renderizações, sem causar re-renderizações adicionais.
- **API PatentsView:** API utilizada para buscar informações sobre patentes.
- **Webpack (ou Vite):** Empacotamento e otimização do projeto.

## Estrutura do Projeto

- **`/src`**: Contém todos os arquivos principais do aplicativo.
  - **`/components`**: Componentes reutilizáveis como `SearchBar`, `PatentCard`, `PatentModal`, `LoadingSpinner`.
  - **`/context`**: Contexto React para o gerenciamento de estado global da aplicação.
  - **`/services`**: Contém funções para interagir com APIs, como a `fetchPatents`.
  - **`/hooks`**: Hooks customizados, como `useDebounce`.
  - **`/App.js`**: Arquivo principal que integra todos os componentes.
  


Como Funciona

Contexto e Estado Global

Utilizamos a Context API para fornecer o estado global da aplicação de maneira eficiente. O estado do projeto, como lista de patentes, erros, e controle de página, é compartilhado entre os componentes por meio do contexto PatentContext.

Ref e Armazenamento de Referências

Usamos o useRef para armazenar referências a elementos DOM específicos, como o campo de busca ou botões de navegação. Isso permite a manipulação desses elementos sem causar re-renderizações adicionais da aplicação.

Paginamento

A aplicação suporta paginação para exibir as patentes em blocos de 12 por página. O número total de páginas é calculado com base no número total de resultados filtrados.

Modal de Detalhes

Cada patente pode ser clicada para abrir um modal contendo detalhes adicionais sobre a patente.

Funcionalidades Adicionais

	•	Validação de Formulários: Antes de enviar a pesquisa para a API, verificamos se todos os campos obrigatórios foram preenchidos.
	•	Mensagens de Erro: Se ocorrer um erro ao buscar as patentes ou durante a validação, uma mensagem de erro será exibida.

API

A aplicação interage com a API PatentsView para buscar informações sobre patentes. A requisição é feita com parâmetros baseados na busca do usuário e retorna dados como título, data da patente, nome dos inventores, entre outros.