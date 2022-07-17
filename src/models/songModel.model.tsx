export class Song {

    constructor(
        public _id: String, public title: String, public artist: String, public genre: Genre, public length: Number, public price: Number) {
        this.artist = artist;
        this.length = length;
        this.price = price;
        this.genre = genre;
        this.title = title;
    }
}

export enum Genre {
    ROCK, POP, RAP, CLASSICAL
}

export interface AddSong {
    id?: string
    title: string,
    artist: string,
    genre?: Genre,
    length: number,
    price: number
};