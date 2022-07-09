import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SongLandingPage } from './pages/songsLandingPage/songsLandingPage';
import EditSong from './pages/editSong/editSong';
import AddSong from './pages/addSong/addSong';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SongLandingPage />} />
        <Route path="/songsList" element={<SongLandingPage />} />
        <Route path="/editSong" element={<EditSong />} />
        <Route path="/addSong" element={<AddSong />} />
      </Routes>
    </BrowserRouter>

  </React.StrictMode>
);

reportWebVitals();
