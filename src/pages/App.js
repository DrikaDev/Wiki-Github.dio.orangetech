import { useState } from "react";
import GitLogo from "../assets/github.svg"
import Button from "../components/Button";
import Input from "../components/Input"
import ItemRepo from "../components/ItemRepo";
import { api } from "../services/api"
import { Container } from "./styles"

export default function App() {

  const [currentRepo, setCurrentRepo] = useState('');
  const [repos, setRepos] = useState([]);

  const handleSearchRepo = async () => {
    const { data } = await api.get(`repos/${currentRepo}`)
    if (data.id) {
      const isExist = repos.find(repo => repo.id === data.id);
      if (!isExist) {
        setRepos(prev => [...prev, data]);
        setCurrentRepo('')
        return
      }
    }
    alert('Repositório não encontrado')
  }

  const handleRemoveRepo = (id) => {
    const newRepos = repos.filter((repo) => repo.id !== id);
    setRepos(newRepos);
  }

  return (
    <Container>
      <img src={GitLogo} width={72} height={72} alt="github logo" />
      <Input value={currentRepo}
        onChange={(e) => setCurrentRepo(e.target.value)} />
      <Button onClick={handleSearchRepo} />
      {repos.map((repo, index) =>
        <ItemRepo key={index}
          handleRemoveRepo={handleRemoveRepo}
          repo={repo} />
      )}
    </Container>
  );
}
