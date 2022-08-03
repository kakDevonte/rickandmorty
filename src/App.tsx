import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { EpisodesPage } from './pages/EpisodesPage';
import './App.css';

export const App: React.FC = () => {
  return (
    <div className="wrapper">
      <h1 className="title">Rick and Morty</h1>
      <Routes>
        <Route path={'/'} element={<EpisodesPage />} />
      </Routes>
    </div>
  );
};
