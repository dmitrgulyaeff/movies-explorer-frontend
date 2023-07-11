export interface MovieMyApi {
  country: string;
  director: string;
  duration: number;
  year: string;
  description: string;
  image: string;
  trailerLink: string;
  thumbnail: string;
  owner: { _id: string };
  movieId: number;
  nameRU: string;
  nameEN: string;
}

export interface MovieYaApi {
  country: string;
  director: string;
  duration: number;
  year: string;
  description: string;
  image: {
    url: string;
  };
  trailerLink: string;
  thumbnail: { image: { formats: { thumbnail: { url: string } } } };
  id: number;
  nameRU: string;
  nameEN: string;
}

export interface User {
  email: string;
  password: string;
  name: string;
}

export interface UserAuthorization {
  email: string;
  password: string;
}

export interface UserUpdate {
  email: string;
  name: string;
}