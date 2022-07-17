import { Box, Button, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import PaidIcon from '@mui/icons-material/Paid';
import React, { useEffect, useState } from 'react';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate, useLocation } from "react-router-dom";
import { editSong } from '../../api/songs.api';
import { Genre, Song } from "../../models/songModel.model";

export const EditSong: React.FC<{ editSong: Function }> = (props) => {

    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [genre, setGenre] = useState(Genre.CLASSICAL);
    const [length, setLength] = useState<Number>(0);
    const [price, setPrice] = useState<Number>(0);
    const [_id, set_id] = useState<String>('');

    const navigate = useNavigate();

    const saveEditSong = async (_id: String) => {
        let editedSong: Song;
        editedSong = {
            _id: _id,
            title: title,
            artist: artist,
            genre: genre,
            length: length,
            price: price
        }
        //const response = await props.editSong(editedSong);
        const response = await editSong(editedSong);
        navigate('/songsList');
    }

    const { state } = useLocation();

    useEffect(() => {
        console.log(state);
        let data: any;
        data = state;
        setTitle(data.song.title);
        setArtist(data.song.artist);
        setPrice(data.song.price);
        setLength(data.song.length);
        setGenre(data.song.genre);
        set_id(data.song.id);
    }, []);

    return (
        <div id="body">
            <span>edit Song</span>
            <br />
            <TextField
                id="input-with-icon-textfield"
                label="title"
                value={title}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <BorderColorIcon />
                        </InputAdornment>
                    ),
                }}
                onChange={(e) => { setTitle(e.target.value) }}
                variant="standard"
            />
            <br />
            <TextField
                id="input-with-icon-textfield"
                label="artist name"
                value={artist}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <PersonIcon />
                        </InputAdornment>
                    ),
                }}
                onChange={(e) => { setArtist(e.target.value) }}
                variant="standard"
            />
            <br />
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small">genre</InputLabel>
                <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={genre}
                    label="genre"
                // onChange={(e) => { setGenre(e.) }}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={"POP"}>POP</MenuItem>
                    <MenuItem value={"ROCK"}>ROCK</MenuItem>
                    <MenuItem value={"RAP"}>RAP</MenuItem>
                    <MenuItem value={"CLASSICAL"}>CLASSICAL</MenuItem>
                </Select>
            </FormControl>
            <br />
            <TextField
                id="input-with-icon-textfield"
                label="length"
                type="number"
                value={length}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <WatchLaterIcon />
                        </InputAdornment>
                    ),
                }}
                onChange={(e) => setLength(parseInt(e.target.value))
                }
                variant="standard"
            />
            <br /><br />
            <TextField
                id="input-with-icon-textfield"
                label="price"
                value={price}
                type="number"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <PaidIcon />
                        </InputAdornment>
                    ),
                }}
                onChange={(e) => setPrice(parseInt(e.target.value))}
                variant="standard"
            />
            <Box sx={{ '& button': { m: 1 } }}>
                <Button variant="contained" size="medium" onClick={() => saveEditSong(_id)}>
                    save
                </Button >
            </Box>
        </div>
    )
}
