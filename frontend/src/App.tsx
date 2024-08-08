import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SongsList from './components/SongsList';
import SongDetails from './components/SongDetails';

function App() {
  return (
    <Router>
      <div className="App">
      <Routes>
          <Route path="/" element={<SongsList />} />
          <Route path="/song/:id" element={<SongDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
