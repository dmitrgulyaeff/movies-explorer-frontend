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

export default function App() {
  const { pathname, hash } = useLocation();

  const [isPopupOpened, setPopupOpened] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuthorized, setAuthorized] = useState<boolean | undefined>();
  const [yaMovies, setYaMovies] = useState<WebMovie[]>();
  const [savedMovies, setSavedMovies] = useState<BdMovie[]>();
  const [currentUser, setCurrentUser] = useState<User>({
    _id: '',
    email: '',
    name: '',
  });

  const [filter, setFilter] = useState<Filter>({
    showOnlyShortFilms: localStorage.getItem('showOnlyShortFilms') === 'true',
    name: localStorage.getItem('name') || '',
  });

  const [apiMoviesResponses, setApiMoviesResponses] =
    useState<ApiMoviesResponses>({ main: undefined, ya: undefined });

  const [clickFrom, setClickFrom] = useState<string>('');

  const resetStates = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('showOnlyShortFilms');
    localStorage.removeItem('name');
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
      localStorage.setItem('token', token);
      setTimeout(() => {
        checkAuthorization();
      }, 0);
    } else {
      setAuthorized(false);
    }
  }, [token]);

  // получить сохр. фильмы при переходе на страницу сохр.-фильмы
  useEffect(() => {
    if (pathname === '/saved-movies') {
      if (!savedMovies) setClickFrom(pathname);
    }
  }, [pathname, savedMovies]);

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
                              <ProtectedRoute>
                                <Movies />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/saved-movies"
                            element={
                              <ProtectedRoute>
                                <Movies />
                              </ProtectedRoute>
                            }
                          />
                          <Route path="/signup" element={<Register />} />
                          <Route path="/signin" element={<Login />} />
                          <Route
                            path="/profile"
                            element={
                              <ProtectedRoute>
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
