import React from 'react';
import {EpisodesPage} from './pages/EpisodesPage';
import './App.css';

export const App: React.FC = () => {


    return <div className="wrapper">
        <h1 className="title">Rick and Morty</h1>
        <EpisodesPage />
    </div>
}