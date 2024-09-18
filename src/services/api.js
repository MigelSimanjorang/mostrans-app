import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CharactersList from './pages/CharactersList';
import CharacterDetail from '../pages/CharacterDetail';
import CharacterByLocation from './pages/CharacterByLocation';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CharactersList />} />
        <Route path="/character/:id" element={<CharacterDetail />} />
        <Route path="/locations" element={<CharacterByLocation />} />
      </Routes>
    </Router>
  );
}

export default App;
