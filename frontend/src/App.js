import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PlaylistsView from './views/playlistView';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PlaylistsView />} />
      </Routes>
    </Router>
  );
}
