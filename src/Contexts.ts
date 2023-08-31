import { createContext } from 'react';
import { User } from './utils/types';
import { Movie, MovieBd } from './utils/types';
interface PopupContextType {
  isPopupOpened: boolean;
  setPopupOpened: (x: boolean) => void;
}

interface AuthorizedContextType {
  isAuthorized: boolean | undefined;
  setAuthorized: (x: boolean) => void;
}

interface TokenContextType {
  // token: string | null;
  setToken: (x: string) => void;
}


export interface MoviesContextType {
  savedMovies: MovieBd[] | undefined;
  yaMovies: Movie[] | undefined;
  setYaMovies: React.Dispatch<React.SetStateAction<Movie[] | undefined>>;
  setSavedMovies: React.Dispatch<React.SetStateAction<MovieBd[] | undefined>>
  ;
}

export interface CurrentUserContextType {
  currentUser: User;
  setCurrentUser: (x: User) => void;
}

export interface PathnameContextType {
  pathname: string,
  hash: string
}

export const PopupContext = createContext<PopupContextType>({} as PopupContextType);
export const AuthorizedContext = createContext<AuthorizedContextType>({} as AuthorizedContextType);
export const MoviesContext = createContext<MoviesContextType>({} as MoviesContextType);
export const CurrentUserContext = createContext<CurrentUserContextType>({} as CurrentUserContextType);
export const PathnameContext = createContext<PathnameContextType>({} as PathnameContextType)
export const TokenContext = createContext<TokenContextType>({} as TokenContextType)