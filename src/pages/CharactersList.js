import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CharactersList.css'; // Pastikan file CSS ini diimpor

const CharactersList = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    axios.get('https://rickandmortyapi.com/api/character')
      .then(response => setCharacters(response.data.results))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="characters-list-page">
      <div className="container my-5">
        <div className="card shadow p-4">
          <h1 className="text-center mb-4">Characters List</h1>
          <ul className="list-group list-group-flush">
            {characters.map((character) => (
              <li key={character.id} className="list-group-item">
                <Link to={`/character/${character.id}`} className="text-decoration-none text-primary">
                  {character.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CharactersList;
