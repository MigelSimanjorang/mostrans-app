import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CharacterByLocation.css'; // Pastikan file CSS diimpor

const CharacterByLocation = () => {
  const [locations, setLocations] = useState({});
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    const storedLocations = JSON.parse(localStorage.getItem('locations')) || {};
    setLocations(storedLocations);
  }, []);

  const handleLocationSelect = (locationName) => {
    setSelectedLocation(locationName);
  };

  const handleDeleteLocation = (locationName) => {
    const updatedLocations = { ...locations };
    delete updatedLocations[locationName]; // Hapus lokasi dari objek

    setLocations(updatedLocations); // Update state
    localStorage.setItem('locations', JSON.stringify(updatedLocations)); // Update localStorage

    // Jika lokasi yang sedang dipilih dihapus, reset selectedLocation
    if (selectedLocation === locationName) {
      setSelectedLocation(null);
    }
  };

  return (
    <div className="character-location-page">
      <div className="container">
        <div className="card-container">
          <h1 className="text-center mb-4">Characters By Location</h1>

          {/* Display Locations */}
          {Object.keys(locations).length === 0 ? (
            <p className="text-center">No locations assigned yet.</p>
          ) : (
            <div className="list-group">
              {Object.keys(locations).map((location) => (
                <div
                  key={location}
                  className="d-flex justify-content-between align-items-center list-group-item"
                >
                  <button
                    className="btn btn-link text-start w-100"
                    onClick={() => handleLocationSelect(location)}
                  >
                    {location}
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteLocation(location)}
                  >
                    Hapus
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Display Characters in Selected Location */}
          {selectedLocation && (
            <div className="mt-4">
              <h3 className="text-center">Characters in {selectedLocation}:</h3>
              <ul className="list-group">
                {locations[selectedLocation].map((character) => (
                  <li key={character.id} className="list-group-item">
                    {character.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharacterByLocation;
