import axios from "axios";
import { Song, AddSong } from '../models/songModel.model';

export default async function saveSongApi(song: AddSong) {
    try {
        const url = 'http://localhost:8080/songs/addSong';
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(song)
        });
        const data = response.json();
        console.log(data);
        return data;
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
            // 👇️ error: AxiosError<any, any>
            return error.message;
        }
        else {
            console.log('unexpected error: ', error);
            return 'An unexpected error occurred';
        }
    }
}

export async function editSong(song: Song): Promise<Song | string> {
    try {
        const url = `http://localhost:8080/songs/updateSong/${song._id}`;
        const { data } = await axios.put<Song>(url, song,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });
        console.log(data);
        return data;
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
            // 👇️ error: AxiosError<any, any>
            return error.message;
        }
        else {
            console.log('unexpected error: ', error);
            return 'An unexpected error occurred';
        }
    }
}

export async function deleteSongApi(id: String): Promise<string> {
    try {
        debugger
        // 👇️ const data: UpdateUserResponse
        const url = `http://localhost:8080/songs/delete/${id}`;
        const { data, status } = await axios.delete<string>(
            url,
            {
                headers: {
                    Accept: 'application/json',
                },
            },
        );
        console.log('response is: ', data);
        // 👇️ response status is: 204
        console.log('response status is: ', status);
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
            // 👇️ error: AxiosError<any, any>
            return error.message;
        } else {
            console.log('unexpected error: ', error);
            return 'An unexpected error occurred';
        }
    }
}

export async function getSongsListApi(): Promise<Song[] | string> {
    try {
        const url = "http://localhost:8080/songs/getAllSongs";
        const { data, status } = await axios.get<Song[]>(
            url,
            {
                headers: {
                    Accept: 'application/json',
                },
            },
        );

        console.log(JSON.stringify(data, null, 4));

        // 👇️ "response status is: 200"
        console.log('response status is: ', status);
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
            return error.message;
        } else {
            console.log('unexpected error: ', error);
            return 'An unexpected error occurred';
        }
    }
}