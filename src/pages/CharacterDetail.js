import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CharacterDetail.css';  // Mengimpor file CSS untuk styling background

const CharacterDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    axios.get(`https://rickandmortyapi.com/api/character/${id}`)
      .then(response => setCharacter(response.data))
      .catch(error => console.log(error));
  }, [id]);

  const assignCharacterToLocation = (locationName) => {
    if (!character) return;

    let locations = JSON.parse(localStorage.getItem('locations')) || {};

    if (!locations[locationName]) {
      locations[locationName] = [];
    }

    Object.keys(locations).forEach((loc) => {
      locations[loc] = locations[loc].filter((char) => char.id !== character.id);
    });

    locations[locationName].push(character);
    localStorage.setItem('locations', JSON.stringify(locations));

    alert(`${character.name} has been assigned to ${locationName}`);
    navigate('/locations');
  };

  if (!character) return <div className="text-center">Loading...</div>;

  return (
    <div className="character-detail-page container-fluid mt-4">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-8">
          <div className="card shadow-sm d-flex flex-column flex-md-row align-items-center">
            <img
              src={character.image}
              className="rounded-start"
              alt={character.name}
              style={{ width: '100%', maxWidth: '150px', height: 'auto', objectFit: 'cover', margin: '10px' }}
            />
            <div className="card-body">
              <h2 className="card-title text-center text-md-start">{character.name}</h2>
              <p className="card-text"><strong>Status:</strong> {character.status}</p>
              <p className="card-text"><strong>Species:</strong> {character.species}</p>
              <p className="card-text"><strong>Location:</strong> {character.location.name}</p>
            </div>
          </div>

          <div className="card mt-4 shadow-sm p-4">
            <h5 className="text-center">Assign Character to Location</h5>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Enter Location Name"
              id="locationInput"
            />
            <button
              className="btn btn-success btn-block w-100"
              onClick={() => {
                const locationName = document.getElementById('locationInput').value.trim();
                if (locationName) {
                  assignCharacterToLocation(locationName);
                } else {
                  alert('Please enter a valid location name.');
                }
              }}
            >
              Assign to Location
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetail;
