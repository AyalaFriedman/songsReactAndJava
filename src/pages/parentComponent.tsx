import { useAppSelector, useAppDispatch } from '../store/hooks';
import { getSongs } from '../store/songSlice';
import { Song, AddSong } from '../models/songModel.model';
import { getSongsAction, deleteSongAction, editSongThunk, addSongsAction } from '../store/songSlice';
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SongLandingPage } from './songsLandingPage/songsLandingPage';
import { EditSong } from './editSong/editSong';
import { AddNewSong } from './addSong/addSong';

export const ParentComponnent = () => {
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
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<SongLandingPage />} />
                    <Route path="/songsList" element={<SongLandingPage />} />
                    <Route path="/editSong" element={<EditSong editSong={editSong} />} />
                    <Route path="/addSong" element={<AddNewSong addNewSong={addNewSong} />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}