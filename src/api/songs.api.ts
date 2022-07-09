import axios from "axios";

type song = {
    _id: String,
    title: String,
    artist: String,
    genre: String,
    length: Number,
    price: Number
};

export default async function saveSongApi(title: String, artist: String, genre: String, length: Number, price: Number) {
    try {
        let song = {
            title: title,
            artist: artist,
            genre: genre,
            length: length,
            price: price
        }
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
    catch (err: any) {
        console.error(err);
    }
}

export const editSong = async (song: song) => {
    try {
        debugger
        const url = `http://localhost:8080/songs/updateSong/${song._id}`;
        const response = await axios.put<song>(url, song,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });
        console.log(response);
        return response;
    }
    catch (err: any) {
        console.error(err);
    }
}

// (
//     'http://localhost:8989/Songs/' + id,
//     song,
//     {
//         headers: {
//             'Content-Type': 'application/json',
//             Accept: 'application/json',
//         },
//     },
//   );

// console.log(JSON.stringify(data, null, 4));

// return data;
// } catch (error) {
//     if (axios.isAxiosError(error)) {
//         console.log('error message: ', error.message);
//         // 👇️ error: AxiosError<any, any>
//         return error.message;
//     } else {
//         console.log('unexpected error: ', error);
//         return 'An unexpected error occurred';
//     }
