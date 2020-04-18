import React from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = React.useState([]);

  React.useEffect(() => {
    api.get('/repositories').then(response => setRepositories(response.data))
  }, [])

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `Front-end alkjsgd ${Date.now()}`,
      url: 'https://aoisuhfas.com',
      techs: ['reactJS']
    });

    console.log('repos: ', repositories)

    const repository = response.data

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    setRepositories(repositories.filter(repository => repository.id !== id))
    await api.delete(`/repositories/${id}`)
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
          {repository.title}

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
