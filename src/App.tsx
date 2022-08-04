import React from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import { EpisodesPage } from './pages/EpisodesPage';
import { EpisodePage } from './pages/EpisodePage';
import { CharacterPage } from './pages/CharacterPage';
import { LocationPage } from './pages/LocationPage';
import './App.css';

export const App: React.FC = () => {
  return (
    <div className="wrapper">
      <div className="title">
        <NavLink to={'/'}>
          <span>Rick and Morty</span>
        </NavLink>
      </div>
      <Routes>
        <Route path="/" element={<EpisodesPage />} />
        <Route path="/episode/:id" element={<EpisodePage />} />
        <Route path="/character/:id" element={<CharacterPage />} />
        <Route path="/location/:id" element={<LocationPage />} />
        <Route path="*" element={<h2>Page Not Found</h2>} />
      </Routes>
    </div>
  );
};
