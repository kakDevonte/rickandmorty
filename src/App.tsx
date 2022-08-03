import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { EpisodesPage } from './pages/EpisodesPage';
import { EpisodePage } from './pages/EpisodePage';
import './App.css';

export const App: React.FC = () => {
  return (
    <div className="wrapper">
      <h1 className="title">Rick and Morty</h1>
      <Routes>
        <Route path="/" element={<EpisodesPage />} />
        <Route path="/episode/:id" element={<EpisodePage />} />
        <Route path="*" element={<h2>Page Not Found</h2>} />
      </Routes>
    </div>
  );
};
