import './row.css';
import { Song } from '../../models/songModel.model';
import { useEffect } from 'react';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { deleteSongApi, getSongsListApi } from "../../api/songs.api";
import { useNavigate } from 'react-router-dom';


const Row: React.FC<any> = (props: any) => {

    const { data, getSongsList } = props;

    const deleteSong = async (id: String) => {
        try {
            debugger
            const response = await deleteSongApi(id);
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

    useEffect(() => {
        console.log(data)
    }, [])

    return (
        <>
            <div className="row">
                <div>
                    <IconButton aria-label="delete" onClick={() => deleteSong(data.id)}>
                        <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => editSong(data)}>
                        <ModeEditOutlineIcon />
                    </IconButton>
                    <span className="rowData">{data.title}</span>
                    <span className="rowData">{data.artist}</span>
                    <span className="rowData">{data.price}</span>
                </div>
            </div>
        </>
    )
}

export default Row;