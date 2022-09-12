export interface Artist {
  name: string;
  genre: string;
}

export interface ArtistInDB extends Artist {
  id: number;
}