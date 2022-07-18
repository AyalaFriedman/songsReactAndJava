import { IconButton, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { getSongsListApi } from "../../api/songs.api";
import { Song } from '../../models/songModel.model';
import Title from '../../components/title/title';
import Row from '../../components/row/row';
import { useNavigate } from "react-router-dom";

export const SongLandingPage: React.FC = (props) => {

    var array: Song[] = [];

    const [songsList, setSongsList] = useState(array);

    const getSongsList = async () => {
        try {
            const response = await getSongsListApi() as Song[];
            console.log(response);
            setSongsList(response);
            return response;
        }
        catch (err: any) {
            console.error(err);
        }
    }

    let navigate = useNavigate();

    const filterByArtist = async (artist: String) => {
        console.log(artist);
        const data = await getSongsList();
        let artistToFilter = artist.toUpperCase();
        if (typeof data !== 'undefined') {
            let temp: Song[] = [];
            let songs = data as Song[];
            for (let i = 0; i < songs.length; i++) {
                let a = songs[i].artist;
                if (a.toUpperCase().indexOf(artistToFilter) > -1) {
                    temp.push(songs[i]);
                }
            }
            setSongsList(temp);
        }
    }

    useEffect(() => {
        getSongsList();
    }, [])
    useEffect(() => {
        console.log(songsList);
    }, [songsList])

    return (
        <>
            <br />
            <IconButton aria-label="delete" size="large" onClick={() => navigate('/addSong')}>
                <AddIcon fontSize="inherit" />
            </IconButton>
            <br />
            <TextField id="outlined-basic" label="Search by Artist" variant="outlined" placeholder="Search by Artist"
                onChange={(e) => { filterByArtist(e.target.value) }} />
            <br />
            <Title></Title>
            {songsList && songsList.map((row: any) => (
                <div>
                    <Row data={row} getSongsList={getSongsList}></Row>
                    <br />
                </div>
            ))}
        </>
    )
}