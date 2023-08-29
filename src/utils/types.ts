export interface Movie {
  country: string;
  director: string;
  duration: number;
  year: string;
  description: string;
  trailerLink: string;
  nameRU: string;
  nameEN: string;
  
  image: string;
  thumbnail: string;
  movieId: number;
  
  owner: { _id: string };
}

export interface MovieBd extends Movie {
  _id: string;
}

export interface MovieYaApi {
  country: string;
  director: string;
  duration: number;
  year: string;
  description: string;
  trailerLink: string;
  nameRU: string;
  nameEN: string;
  
  image: {
    url: string,
    formats: { thumbnail: { url: string } }
  };
  id: number;
}

export interface User {
  _id: string;
  email: string;
  name: string;
}

export interface UserRegistration {
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