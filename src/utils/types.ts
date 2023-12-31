interface baseMovie {
  country: string;
  director: string;
  duration: number;
  year: string;
  description: string;
  trailerLink: string;
  nameRU: string;
  nameEN: string;
}

export interface createMovie extends baseMovie {
  image: string;
  thumbnail: string;
  movieId: number;
}

export interface WebMovie extends createMovie{
  owner?: string;
}

export interface BdMovie extends WebMovie {
  _id: string;
  owner: string;
}

export interface YaApiMovie extends baseMovie { 
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

export interface Filter {
  showOnlyShortFilms: boolean;
  name: string; 
}

export interface Response {
  success: boolean,
  message?: string
}

export interface ApiMoviesResponses {
  main: Response | undefined,
  ya: Response | undefined
}