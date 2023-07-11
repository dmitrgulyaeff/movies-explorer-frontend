import {createContext } from 'react';
import { User } from './utils/types';
import { MovieMyApi, MovieYaApi } from './utils/types';
interface PopupContextType {
  isPopupOpened: boolean;
  setPopupOpened: (x: boolean) => void;
}

interface AuthorizedContextType {
  isAuthorized: boolean | undefined;
  setAuthorized: (x: boolean) => void;
}


interface MoviesContextType {
  savedMovies: MovieMyApi[] | undefined;
  yaMovies: MovieYaApi[] | undefined;
  setYaMovies: (x: MovieYaApi[]) => void;
  setSavedMovies: (x: MovieMyApi[]) => void;
}

interface CurrentUserContextType {
  user?: User;
}


export const PopupContext = createContext<PopupContextType>({} as PopupContextType);
export const AuthorizedContext = createContext<AuthorizedContextType>({} as AuthorizedContextType);
export const MoviesContext = createContext<MoviesContextType>({} as MoviesContextType);
export const CurrentUserContext = createContext<CurrentUserContextType>({} as CurrentUserContextType);