import './App.css';
import {
  PopupContext,
  AuthorizedContext,
  MoviesContext,
  CurrentUserContext,
  PathnameContext,
  TokenContext,
  FilterContext,
  ResponsesMoviesContext,
  ButtonClickContext,
} from '../../Contexts';
import {
  WebMovie,
  BdMovie,
  User,
  Filter,
  ApiMoviesResponses,
} from '../../utils/types';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router';
import { useLocation } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../MainMovies/MainMovies';
import Footer from '../Footer/Footer';
import mainApi from '../../utils/MainApi';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import {
  ONLY_SHORT_FILMS_STORAGE_KEY,
  SEARCH_FILM_STORAGE_KEY,
  TOKEN_STORAGE_KEY,
} from '../../utils/constants';

export default function App() {
  const { pathname, hash } = useLocation();

  const [isPopupOpened, setPopupOpened] = useState(false);
  const [token, setToken] = useState(localStorage.getItem(TOKEN_STORAGE_KEY));
  const [isAuthorized, setAuthorized] = useState<boolean | undefined>();
  const [yaMovies, setYaMovies] = useState<WebMovie[]>();
  const [savedMovies, setSavedMovies] = useState<BdMovie[]>();
  const [currentUser, setCurrentUser] = useState<User>({
    _id: '',
    email: '',
    name: '',
  });

  const [filter, setFilter] = useState<Filter>({
    showOnlyShortFilms:
      localStorage.getItem(ONLY_SHORT_FILMS_STORAGE_KEY) === 'true',
    name: localStorage.getItem(SEARCH_FILM_STORAGE_KEY) || '',
  });

  const [apiMoviesResponses, setApiMoviesResponses] =
    useState<ApiMoviesResponses>({ main: undefined, ya: undefined });

  const [clickFrom, setClickFrom] = useState<string>('');

  const resetStates = () => {
    localStorage.clear();
    setPopupOpened(false);
    setToken(null);
    setAuthorized(false);
    setYaMovies(undefined);
    setSavedMovies(undefined);
    setCurrentUser({ _id: '', email: '', name: '' });
    setFilter({
      showOnlyShortFilms: false,
      name: '',
    });
    setApiMoviesResponses({ main: undefined, ya: undefined });
  };

  useEffect(() => {
    const checkAuthorization = async () => {
      try {
        const response = await mainApi.getUser();
        setAuthorized(true);
        const responseData = (await response.json()) as User;
        setCurrentUser(responseData);
      } catch (error) {
        resetStates();
      }
    };
    if (token) {
      localStorage.setItem(TOKEN_STORAGE_KEY, token);
      setTimeout(() => {
        checkAuthorization();
      }, 0);
    } else {
      setAuthorized(false);
    }
  }, [token]);

  return (
    <TokenContext.Provider value={{ setToken }}>
      <PopupContext.Provider value={{ isPopupOpened, setPopupOpened }}>
        <AuthorizedContext.Provider value={{ isAuthorized, setAuthorized }}>
          <MoviesContext.Provider
            value={{ yaMovies, setYaMovies, savedMovies, setSavedMovies }}
          >
            <CurrentUserContext.Provider
              value={{ currentUser, setCurrentUser }}
            >
              <PathnameContext.Provider value={{ pathname, hash }}>
                <FilterContext.Provider value={{ filter, setFilter }}>
                  <ResponsesMoviesContext.Provider
                    value={{ apiMoviesResponses, setApiMoviesResponses }}
                  >
                    <ButtonClickContext.Provider
                      value={{ clickFrom, setClickFrom }}
                    >
                      <Navigation />
                      <Header />
                      {isAuthorized !== undefined && (
                        <Routes>
                          <Route path="/" element={<Main />} />

                          <Route
                            path="/movies"
                            element={
                              <ProtectedRoute AuthRequired={true}>
                                <Movies />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/saved-movies"
                            element={
                              <ProtectedRoute AuthRequired={true}>
                                <Movies />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/signup"
                            element={
                              <ProtectedRoute AuthRequired={false}>
                                <Register />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/signin"
                            element={
                              <ProtectedRoute AuthRequired={false}>
                                <Login />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/profile"
                            element={
                              <ProtectedRoute AuthRequired={true}>
                                <Profile resetStates={resetStates} />
                              </ProtectedRoute>
                            }
                          />

                          <Route path="/*" element={<NotFoundPage />} />
                        </Routes>
                      )}
                      <Footer />
                    </ButtonClickContext.Provider>
                  </ResponsesMoviesContext.Provider>
                </FilterContext.Provider>
              </PathnameContext.Provider>
            </CurrentUserContext.Provider>
          </MoviesContext.Provider>
        </AuthorizedContext.Provider>
      </PopupContext.Provider>
    </TokenContext.Provider>
  );
}
