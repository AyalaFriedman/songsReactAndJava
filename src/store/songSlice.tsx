import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Song, AddSong } from '../models/songModel.model';
// import { AddSong } from "../pages/addSong/addSong";
import { AppDispatch } from './store';
import saveSongApi, { getSongsListApi, deleteSongApi } from '../api/songs.api';

interface SongState {
    songs: Song[]
}

const initialState: SongState = {
    songs: []
};

const SongSlice = createSlice({
    name: 'songs',
    initialState,
    reducers: {
        getSongs(state, action: PayloadAction<Song[]>) {
            state.songs = action.payload;
            console.log("current song receivedSongs", state.songs);
        },
        addSong(state, action: PayloadAction<Song>) {
            const song = action.payload;
            state.songs.push(song);
            console.log("current song addSong", (state.songs))
        },
        deleteSongRedux(state, action: PayloadAction<String>) {
            const id = action.payload;
            state.songs = state.songs.filter((song) => {
                return song._id !== id
            })
            console.log("current song deleteSongRedux", (state.songs))
        },
        editSong(state, action: PayloadAction<Song>) {
            const songUpdated = action.payload;
            state.songs = state.songs.filter((song) => { return song._id !== songUpdated._id });
            state.songs.push(songUpdated);
            console.log("current song editSong", (state.songs))
        }
    }
});

export const getSongsAction = () => {
    return async (dispatch: AppDispatch) => {
        const songs: Song[] | string = await getSongsListApi();
        if (songs !== null)
            if (typeof songs !== "string")
                dispatch(getSongs(songs))
            else alert(songs)
    }
}

export const addSongsAction = (song: AddSong) => {
    return async (dispatch: AppDispatch) => {
        const Newsong: Song | string = await saveSongApi(song);
        if (Newsong !== null)
            if (typeof Newsong !== "string")
                dispatch(addSong(Newsong))
            else alert(Newsong)
    }
}

// export const getSongsByArtist = (artist: string) => {

//     return async (dispatch: AppDispatch) => {

//         const songs: Song[] | string = await geSongsByArtist(artist)
//         if (songs === null || songs.length === 0) {
//             alert("no songs found for artist: " + artist)
//             //find out if this is nessery/menning do we need to re render home page to show all songs 
//             //or is the last song search okay?
//             dispatch(getSongsAction());
//         }
//         else if (typeof songs !== "string")
//             dispatch(receivedSongs(songs))

//     }
// }

export const deleteSongAction = (id: string) => {

    return async (dispatch: AppDispatch) => {
        const data: string = await deleteSongApi(id)
        alert(data);
        if (data === "deleted document")
            dispatch(deleteSongRedux(id))

    }
}

export const editSongThunk = (song: Song) => {
    return async (dispatch: AppDispatch) => {
        const data: Song | string | any = await editSong(song)
        if (typeof data !== 'string') {
            dispatch(editSong(song))
        }
        else alert(data);
    }
}

export type addSongtype = typeof addSong;
export const { addSong, editSong, deleteSongRedux, getSongs } = SongSlice.actions;
export default SongSlice.reducer;