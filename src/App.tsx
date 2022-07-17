import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SongLandingPage } from './pages/songsLandingPage/songsLandingPage';
import { EditSong } from './pages/editSong/editSong';
import { useAppSelector, useAppDispatch } from './store/hooks';
import { getSongs } from './store/songSlice';
import { Song, AddSong } from './models/songModel.model';
import { getSongsAction, deleteSongAction, editSongThunk, addSongsAction } from './store/songSlice';
import { AddNewSong } from './pages/addSong/addSong';

function App() {
  const dispatch = useAppDispatch();
  const Songs: Song[] = useAppSelector(state => state.songs.songs)
  useEffect(() => {
    //get products from api
    dispatch(getSongsAction());
  }, [])

  const addNewSong = (newSong: AddSong) => {
    dispatch(addSongsAction(newSong));
  }

  const editSong = (values: Song) => {
    dispatch(editSongThunk(values));
  }
  const deleteSong = (id: string) => {
    dispatch(deleteSongAction(id));
  }


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SongLandingPage />} />
        <Route path="/songsList" element={<SongLandingPage />} />
        <Route path="/editSong" element={<EditSong editSong={editSong} />} />
        <Route path="/addSong" element={<AddNewSong addNewSong={addNewSong} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
