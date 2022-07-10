import { TipsAndUpdates, Title } from "@mui/icons-material";
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';

export const SongLandingPage: React.FC = () => {

    type song = {
        id: String,
        title: String,
        artist: String,
        genre: String,
        length: Number,
        price: String
    };

    var array : song[] = [];

    const [songsList, setSongsList] = useState(array);

    const getSongsList = async () => {
        try {
            const url = "http://localhost:8080/songs/getAllSongs";
            const response = await axios.get(url);
            console.log(response.data);
            setSongsList(response.data)
            return response.data;
        }
        catch (err: any) {
            console.error(err);
        }

    }

    const deleteSong = async (id: String) => {
        try {
            const url = `http://localhost:8080/songs/delete/${id}`;
            const response = await axios.delete(url);
            getSongsList();
        }
        catch (err: any) {
            console.error(err);
        }
    }

    let navigate = useNavigate();
    const editSong = (song: any) => {
        navigate('/editSong', { state: { song } });
    }
    const filterByArtist = async (artist: String) => {
        console.log(artist);
        let data: song[];
        data = await getSongsList();
        let artistToFilter = artist.toUpperCase();
        let temp : song[] = [];
        for (let i = 0; i < data.length; i++) {
            let a = data[i].artist;
            if(a.toUpperCase().indexOf(artistToFilter) > -1) {
                temp.push(data[i]);
            }
        }
        setSongsList(temp);
    }

    useEffect(() => {
        getSongsList();
    }, [])
    useEffect(() => {
        console.log(songsList);
    }, [songsList])

    return (
        <>
            <Title>songs list</Title>
            <br />
            <IconButton aria-label="delete" size="large" onClick={()=>navigate('/addSong')}>
                <AddIcon fontSize="inherit" />
            </IconButton>
            <br />

            <TextField id="outlined-basic" label="Search by Artist" variant="outlined" placeholder="Search by Artist"
                onChange={(e) => { filterByArtist(e.target.value) }} />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell align="right">artist</TableCell>
                            <TableCell align="right">price&nbsp;</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {songsList.map((row: any) => (
                            <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <IconButton aria-label="delete" onClick={() => deleteSong(row.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                    <IconButton aria-label="delete" onClick={() => editSong(row)}>
                                        <ModeEditOutlineIcon />
                                    </IconButton>
                                    {row.title}
                                </TableCell>
                                <TableCell align="right">{row.artist}</TableCell>
                                <TableCell align="right">{row.price}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}