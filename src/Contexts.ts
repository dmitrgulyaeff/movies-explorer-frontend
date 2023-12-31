import { createContext } from 'react';
import { User, Filter, ApiMoviesResponses } from './utils/types';
import { WebMovie, BdMovie } from './utils/types';
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
  savedMovies: BdMovie[] | undefined;
  yaMovies: WebMovie[] | undefined;
  setYaMovies: React.Dispatch<React.SetStateAction<WebMovie[] | undefined>>;
  setSavedMovies: React.Dispatch<React.SetStateAction<BdMovie[] | undefined>>
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

interface FilterContextType {
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>
} 

interface ResponsesMoviesContextType {
  apiMoviesResponses: ApiMoviesResponses;
  setApiMoviesResponses: React.Dispatch<React.SetStateAction<ApiMoviesResponses>>;
}

interface ButtonClickContextType {
  clickFrom: string,
  setClickFrom: React.Dispatch<React.SetStateAction<string>>
}

export const PopupContext = createContext<PopupContextType>({} as PopupContextType);
export const AuthorizedContext = createContext<AuthorizedContextType>({} as AuthorizedContextType);
export const MoviesContext = createContext<MoviesContextType>({} as MoviesContextType);
export const CurrentUserContext = createContext<CurrentUserContextType>({} as CurrentUserContextType);
export const PathnameContext = createContext<PathnameContextType>({} as PathnameContextType)
export const TokenContext = createContext<TokenContextType>({} as TokenContextType)
export const FilterContext = createContext<FilterContextType>({} as FilterContextType)
export const ResponsesMoviesContext = createContext<ResponsesMoviesContextType>({} as ResponsesMoviesContextType)
export const ButtonClickContext = createContext<ButtonClickContextType>({} as ButtonClickContextType)
